import React from 'react';
import { useAppState } from '../state/AppContext';
import TaskCard from './TaskCard';

function TaskQueue() {
  const { tasks } = useAppState();
  return (
    <div>
      {tasks.length === 0 && (
        <div className="text-center text-secondary py-2">No tasks</div>
      )}
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </div>
  );
}

export default TaskQueue;
