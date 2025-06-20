import React from 'react';
import { useAppState } from '../state/AppContext';

function TaskQueue() {
  const { tasks } = useAppState();
  return (
    <div className="list-group">
      {tasks.length === 0 && (
        <div className="list-group-item list-group-item-secondary text-center">
          No tasks
        </div>
      )}
      {tasks.map((t) => (
        <div key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span>{t.name}: {t.remaining.toFixed(1)}s</span>
        </div>
      ))}
    </div>
  );
}

export default TaskQueue;
