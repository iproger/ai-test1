import { useState } from 'react'
import { scheduler } from '../utils/simulationLoop'
import { TaskAgent } from '../agents/TaskAgent'
import { getCores } from '../state/cores'
import { taskProfiles } from '../models/taskProfiles'

export function TaskForm() {
  const [duration, setDuration] = useState(5)
  const [intensity, setIntensity] = useState(0.5)
  const [profile, setProfile] = useState('medium')

  const cores = getCores()
  return (
    <form
      className="p-4 flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        scheduler.addTask(
          new TaskAgent({ duration, intensity, cores, profile: taskProfiles[profile] })
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
      <label>
        Profile
        <select
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          className="ml-2 border p-1"
        >
          {Object.keys(taskProfiles).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
      <button className="bg-blue-600 text-white px-2 py-1" type="submit">
        Add Task
      </button>
    </form>
  )
}
