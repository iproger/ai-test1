import { useState } from 'react';
import { useAppStore } from '../state/store';

export function TaskForm() {
  const addTask = useAppStore((s) => s.addTask);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(10);
  const [intensity, setIntensity] = useState(0.5);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTask({ name, duration, intensity, cores: [0] });
        setName('');
      }}
      className="p-4 space-y-2"
    >
      <input
        className="border p-1 w-full"
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-2">
        <input
          type="number"
          className="border p-1 w-1/2"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <input
          type="number"
          step="0.1"
          className="border p-1 w-1/2"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
        />
      </div>
      <button className="bg-blue-600 text-white px-3 py-1 rounded" type="submit">
        Start Task
      </button>
    </form>
  );
}
