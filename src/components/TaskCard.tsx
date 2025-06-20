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
        <span>
          {task.name} - {task.type}
        </span>
        <span className="badge bg-secondary">{task.priority}</span>
      </div>
      <div className="progress" style={{ height: '4px' }}>
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      {open && (
        <div className="card-body pt-2">
          <p className="small mb-2">{task.cores} cores, {task.duration}s</p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
