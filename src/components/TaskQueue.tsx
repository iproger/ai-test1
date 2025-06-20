import React from 'react';
import { useAppState } from '../state/AppContext';

function TaskQueue() {
  const { tasks } = useAppState();
  return (
    <div className="space-y-2">
      {tasks.length === 0 && <div className="p-2 border rounded">No tasks</div>}
      {tasks.map((t) => (
        <div key={t.id} className="p-2 border rounded">
          {t.name}: {t.remaining.toFixed(1)}s left
        </div>
      ))}
    </div>
  );
}

export default TaskQueue;
