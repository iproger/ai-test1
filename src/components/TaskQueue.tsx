import { scheduler } from '../utils/simulationLoop'

export function TaskQueue() {
  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">Tasks</h2>
      <ul>
        {scheduler.tasks.map((t) => (
          <li key={t.id} className="flex justify-between items-center">
            <span>
              Task #{t.id} - {Math.round(t.progress)}s
            </span>
            <button
              className="text-red-500"
              onClick={() => scheduler.killTask(t.id)}
            >
              Kill
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
