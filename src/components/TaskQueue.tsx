import { scheduler } from '../utils/simulationLoop'

export function TaskQueue() {
  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">Tasks</h2>
      <ul>
        {scheduler.tasks.map((t, i) => (
          <li key={i}>Task #{i + 1} - {Math.round(t.progress)}s</li>
        ))}
      </ul>
    </div>
  )
}
