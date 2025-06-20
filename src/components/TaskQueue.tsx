import React, { useState, useEffect } from 'react';
import { CPUSimulator } from '../simulator/CPUSimulator';
import { TaskInstance, LoadProfile, Intensity } from '../models/task';

interface Props {
  simulator: CPUSimulator;
}

export default function TaskQueue({ simulator }: Props) {
  const [tasks, setTasks] = useState<TaskInstance[]>([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(5);
  const [intensity, setIntensity] = useState<Intensity>('medium');
  const [profile, setProfile] = useState<LoadProfile>('INT');

  useEffect(() => {
    const id = setInterval(() => {
      setTasks([...simulator.getTasks()]);
    }, 200);
    return () => clearInterval(id);
  }, [simulator]);

  const addTask = () => {
    if (!name) return;
    simulator.addTask({
      name,
      durationMs: duration * 1000,
      loadProfile: profile,
      intensity,
      assignedThreads: [],
    });
    setName('');
  };

  const pause = (id: number) => simulator.pauseTask(id);
  const resume = (id: number) => simulator.resumeTask(id);
  const cancel = (id: number) => simulator.cancelTask(id);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Task name"
          className="bg-gray-700 p-1 col-span-2"
        />
        <input
          type="number"
          min="1"
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
          className="bg-gray-700 p-1"
          placeholder="Duration (s)"
        />
        <select
          value={intensity}
          onChange={e => setIntensity(e.target.value as Intensity)}
          className="bg-gray-700 p-1"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          value={profile}
          onChange={e => setProfile(e.target.value as LoadProfile)}
          className="bg-gray-700 p-1"
        >
          <option value="INT">INT</option>
          <option value="FP">FP</option>
          <option value="AVX">AVX</option>
          <option value="MIXED">MIXED</option>
        </select>
        <button
          onClick={addTask}
          className="col-span-2 bg-blue-600 text-white py-1 rounded"
        >
          Add Task
        </button>
      </div>
      <div className="space-y-2">
        {tasks.map(t => (
          <div key={t.id} className="bg-gray-800 p-2 rounded text-sm space-y-1">
            <div className="flex justify-between">
              <span className="font-medium">{t.name}</span>
              <span className="text-gray-400">{t.status}</span>
            </div>
            <div className="flex gap-2 text-xs">
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
        ))}
        {tasks.length === 0 && <div className="text-sm text-gray-400">No tasks</div>}
      </div>
    </div>
  );
}
