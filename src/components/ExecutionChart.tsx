import { LineChart, Line, XAxis, YAxis } from 'recharts'
import { scheduler } from '../utils/simulationLoop'

export function ExecutionChart() {
  const data = scheduler.tasks.map((t, i) => ({ name: i + 1, progress: t.progress }))
  return (
    <div className="p-4">
      <LineChart width={300} height={150} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line type="monotone" dataKey="progress" stroke="#8884d8" />
      </LineChart>
    </div>
  )
}
