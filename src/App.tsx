import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { CpuGrid } from './components/CpuGrid'
import { TaskForm } from './components/TaskForm'
import { TaskQueue } from './components/TaskQueue'
import { ExecutionChart } from './components/ExecutionChart'
import { SettingsDrawer } from './components/SettingsDrawer'
import { CpuConfigEditor } from './components/CpuConfigEditor'
import cpuModels from './models/cpuModels'
import type { CpuModel } from "./models/cpuModels/types"
import { useCpuStore } from './state/store'
import { startSimulation } from './utils/simulationLoop'

function initCpu(name: string) {
  const model = (cpuModels as Record<string, CpuModel>)[name]
  const threads = []
  let id = 0
  for (const cluster of model.clusters) {
    for (let c = 0; c < cluster.cores; c++) {
      for (let t = 0; t < cluster.threadsPerCore; t++) {
        threads.push({ id: id++, load: 0, temperature: 30, throttled: false })
      }
    }
  }
  useCpuStore.setState({ threads })
}

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [cpuEditOpen, setCpuEditOpen] = useState(false)

  useEffect(() => {
    initCpu('Apple M1')
    startSimulation()
  }, [])

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <Header onCpuChange={initCpu} onSettings={() => setSettingsOpen(true)} />
      <main className="grid md:grid-cols-3 gap-4">
        <div>
          <TaskForm />
          <TaskQueue />
        </div>
        <CpuGrid />
        <ExecutionChart />
      </main>
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <CpuConfigEditor open={cpuEditOpen} onClose={() => setCpuEditOpen(false)} />
    </div>
  )
}

export default App
