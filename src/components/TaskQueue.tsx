import React, { useState, useEffect } from 'react';
import { CPUSimulator } from '../simulator/CPUSimulator';
import { TaskInstance } from '../models/task';

interface Props {
  simulator: CPUSimulator;
}

export default function TaskQueue({ simulator }: Props) {
  const [name, setName] = useState('Task');
  const [tasks, setTasks] = useState<TaskInstance[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setTasks([...simulator.getTasks()]);
    }, 200);
    return () => clearInterval(id);
  }, [simulator]);

  const addTask = () => {
    simulator.addTask({
      name,
      durationMs: 5000,
      loadProfile: 'INT',
      intensity: 'medium',
      assignedThreads: [0],
    });
    setName('');
  };

  const pause = (id: number) => simulator.pauseTask(id);
  const resume = (id: number) => simulator.resumeTask(id);
  const cancel = (id: number) => simulator.cancelTask(id);

  return (
    <div className="space-y-2">
      <div className="flex">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="bg-gray-700 p-1 flex-1"
        />
        <button onClick={addTask} className="ml-2 bg-blue-600 px-2 text-white">
          Add
        </button>
      </div>
      <ul className="space-y-1">
        {tasks.map(t => (
          <li key={t.id} className="text-sm flex items-center space-x-2">
            <span className="flex-1">{t.name} - {t.status}</span>
            {t.status === 'running' && (
              <button onClick={() => pause(t.id)} className="text-xs bg-yellow-600 px-1">Pause</button>
            )}
            {t.status === 'paused' && (
              <button onClick={() => resume(t.id)} className="text-xs bg-green-600 px-1">Resume</button>
            )}
            {t.status !== 'completed' && (
              <button onClick={() => cancel(t.id)} className="text-xs bg-red-600 px-1">Cancel</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
