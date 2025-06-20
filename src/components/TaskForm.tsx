import React, { useState } from 'react';
import { useAppState, TaskPriority, TaskType } from '../state/AppContext';

function TaskForm() {
  const { addTask } = useAppState();
  const [duration, setDuration] = useState(5);
  const [type, setType] = useState<TaskType>('INT');
  const [cores, setCores] = useState(1);
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [adding, setAdding] = useState(false);

  return (
    <form
      className="card p-3 text-body bg-body-secondary"
      onSubmit={(e) => {
        e.preventDefault();
        setAdding(true);
        addTask({ duration, type, cores, priority });
        setTimeout(() => setAdding(false), 300);
      }}
    >
      <div className="mb-2">
        <label className="form-label">Duration (s)</label>
        <input
          type="number"
          className="form-control"
          value={duration}
          min={1}
          max={60}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value as TaskType)}
        >
          <option>INT</option>
          <option>FLOAT</option>
          <option>MIXED</option>
          <option>IO</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="form-label">Cores</label>
        <input
          type="number"
          className="form-control"
          min={1}
          max={8}
          value={cores}
          onChange={(e) => setCores(parseInt(e.target.value))}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Priority</label>
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <p className="small text-secondary">
        {type} task, {cores} cores, {priority.toLowerCase()} priority
      </p>
      <button type="submit" className="btn btn-primary w-100">
        {adding ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
