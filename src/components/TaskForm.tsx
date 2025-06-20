import React, { useState } from 'react';
import { useAppState } from '../state/AppContext';

function TaskForm() {
  const { addTask } = useAppState();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(5);

  return (
    <form
      className="space-y-2 p-2 border rounded"
      onSubmit={(e) => {
        e.preventDefault();
        addTask(name || `Task`, duration);
        setName('');
      }}
    >
      <input
        className="w-full p-2 bg-gray-700"
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        className="w-full p-2 bg-gray-700"
        value={duration}
        min={1}
        max={60}
        onChange={(e) => setDuration(parseInt(e.target.value))}
      />
      <button type="submit" className="w-full bg-blue-600 p-2 rounded">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
