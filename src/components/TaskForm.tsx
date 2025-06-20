import React, { useState } from 'react';
import { useAppState } from '../state/AppContext';

function TaskForm() {
  const { addTask } = useAppState();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(5);

  return (
    <form
      className="card p-3 text-body bg-body-secondary"
      onSubmit={(e) => {
        e.preventDefault();
        addTask(name || `Task`, duration);
        setName('');
      }}
    >
      <div className="mb-2">
        <input
          className="form-control"
          placeholder="Task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <input
          type="number"
          className="form-control"
          value={duration}
          min={1}
          max={60}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
