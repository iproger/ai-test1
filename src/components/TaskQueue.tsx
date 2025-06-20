import React, { useState } from 'react';
import { CPUSimulator } from '../simulator/CPUSimulator';
import { TaskInstance } from '../models/task';

interface Props {
  simulator: CPUSimulator;
}

export default function TaskQueue({ simulator }: Props) {
  const [name, setName] = useState('Task');
  const [tasks, setTasks] = useState<TaskInstance[]>([]);

  const addTask = () => {
    const task = simulator.addTask({
      name,
      durationMs: 5000,
      loadProfile: 'INT',
      intensity: 'medium',
      assignedThreads: [0],
    });
    task.status = 'running';
    setTasks([...tasks, task]);
    setName('');
  };

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
          <li key={t.id} className="text-sm">
            {t.name} - {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
