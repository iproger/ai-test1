import React, { useState, useEffect } from 'react';
import { CPUSimulator } from '../simulator/CPUSimulator';
import { TaskInstance, LoadProfile, Intensity } from '../models/task';

interface Props {
  simulator: CPUSimulator;
}

export default function TaskQueue({ simulator }: Props) {
  const [tasks, setTasks] = useState<TaskInstance[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(5);
  const [intensity, setIntensity] = useState<Intensity>('medium');
  const [profile, setProfile] = useState<LoadProfile>('INT');

  useEffect(() => {
    const id = setInterval(() => setTasks([...simulator.getTasks()]), 200);
    return () => clearInterval(id);
  }, [simulator]);

  const addTask = () => {
    const finalName = name || `Task #${tasks.length + 1}`;
    simulator.addTask({
      name: finalName,
      durationMs: duration * 1000,
      loadProfile: profile,
      intensity,
      assignedThreads: [],
    });
    setName('');
  };

  const toggle = (id: number) => setExpanded(e => (e === id ? null : id));

  const pause = (id: number) => simulator.pauseTask(id);
  const resume = (id: number) => simulator.resumeTask(id);
  const cancel = (id: number) => simulator.cancelTask(id);

  return (
    <div className="space-y-4">
      <form
        onSubmit={e => {
          e.preventDefault();
          addTask();
        }}
        className="space-y-2"
      >
        <div>
          <label className="block text-sm font-medium">Task Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="bg-gray-700 w-full p-2 rounded"
            placeholder="Optional"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Duration (s)</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            className="bg-gray-700 w-full p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Intensity</label>
          <select
            value={intensity}
            onChange={e => setIntensity(e.target.value as Intensity)}
            className="bg-gray-700 w-full p-2 rounded"
          >
            <option value="low">Low (1-2 threads)</option>
            <option value="medium">Medium (half CPU)</option>
            <option value="high">High (all threads)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            value={profile}
            onChange={e => setProfile(e.target.value as LoadProfile)}
            className="bg-gray-700 w-full p-2 rounded"
          >
            <option value="INT">INT - integer load</option>
            <option value="FP">FP - floating point</option>
            <option value="AVX">AVX - vector heavy</option>
            <option value="MIXED">MIXED</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-1 rounded">
          Add Task
        </button>
      </form>
      <div className="space-y-2">
        {tasks.map(t => (
          <div key={t.id} className="bg-gray-800 rounded">
            <button
              onClick={() => toggle(t.id)}
              className="w-full flex justify-between items-center px-2 py-1 text-left"
            >
              <span className="font-medium">{t.name}</span>
              <span className="text-gray-400 text-sm">{t.status}</span>
            </button>
            {expanded === t.id && (
              <div className="p-2 space-y-1 text-xs">
                <div>Type: {t.loadProfile}</div>
                <div>Intensity: {t.intensity}</div>
                <div>Duration: {Math.round((t.durationMs - t.remainingMs) / 1000)} / {Math.round(t.durationMs / 1000)} s</div>
                <div className="flex gap-2 mt-1">
                  {t.status === 'running' && (
                    <button onClick={() => pause(t.id)} className="bg-yellow-600 px-2 rounded">Pause</button>
                  )}
                  {t.status === 'paused' && (
                    <button onClick={() => resume(t.id)} className="bg-green-600 px-2 rounded">Resume</button>
                  )}
                  {t.status !== 'completed' && (
                    <button onClick={() => cancel(t.id)} className="bg-red-600 px-2 rounded">Cancel</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {tasks.length === 0 && <div className="text-sm text-gray-400">No tasks</div>}
      </div>
    </div>
  );
}
