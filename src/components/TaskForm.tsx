import { useState } from 'react'
import { scheduler } from '../utils/simulationLoop'
import { CoreAgent } from '../agents/CoreAgent'
import { TaskAgent } from '../agents/TaskAgent'
import { useCpuStore } from '../state/store'

export function TaskForm() {
  const [duration, setDuration] = useState(5)
  const [intensity, setIntensity] = useState(0.5)
  const cores = useCpuStore((s) => s.threads.map((t) => new CoreAgent(t)))

  return (
    <form
      className="p-4 flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        scheduler.addTask(
          new TaskAgent({ duration, intensity, cores })
        )
      }}
    >
      <label>
        Duration
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(+e.target.value)}
          className="border ml-2 p-1 w-20"
        />
      </label>
      <label>
        Intensity
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={intensity}
          onChange={(e) => setIntensity(+e.target.value)}
          className="ml-2"
        />
      </label>
      <button className="bg-blue-600 text-white px-2 py-1" type="submit">
        Add Task
      </button>
    </form>
  )
}
