import { useAppStore } from '../state/store';

export function TaskQueue() {
  const tasks = useAppStore((s) => s.tasks);
  return (
    <div className="p-4 space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="border p-2">
          <div className="flex justify-between">
            <span>{task.name}</span>
            <span>{task.remaining.toFixed(1)}s</span>
          </div>
        </div>
      ))}
    </div>
  );
}
