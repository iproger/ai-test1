import React, { useState } from 'react';
import { Task } from '../state/AppContext';

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const progress = 100 - (task.remaining / task.duration) * 100;
  const [open, setOpen] = useState(false);
  return (
    <div className="card mb-2">
      <div
        className="card-body p-2 d-flex justify-content-between align-items-center"
        onClick={() => setOpen(!open)}
        role="button"
      >
        <span className="me-2">
          {task.name}
        </span>
        <span className="me-auto text-end small">
          {task.value.toFixed(1)} {task.metricName}
        </span>
        <span className="badge bg-secondary ms-2">{task.priority}</span>
      </div>
      <div className="progress" style={{ height: '4px' }}>
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      {open && (
        <div className="card-body pt-2">
          <p className="small mb-1">Cores: [{task.assigned.join(', ')}]</p>
          <p className="small mb-1">Time left: {task.remaining.toFixed(1)}s / {task.duration}s</p>
          <p className="small mb-0 text-secondary">Type: {task.category}</p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
