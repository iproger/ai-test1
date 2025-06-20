import React from 'react';

function TaskForm() {
  return (
    <form className="space-y-2 p-2 border rounded">
      <input className="w-full p-2 bg-gray-700" placeholder="Task name" />
      <button type="submit" className="w-full bg-blue-600 p-2 rounded">Add Task</button>
    </form>
  );
}

export default TaskForm;
