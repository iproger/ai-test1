import { useEffect, useState } from 'react'
import cpuModels from '../models/cpuModels'


interface Props {
  onCpuChange: (name: string) => void
  onSettings: () => void
}

export function Header({ onCpuChange, onSettings }: Props) {
  const [selected, setSelected] = useState('Apple M1')
  useEffect(() => onCpuChange(selected), [selected, onCpuChange])
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <select
        className="bg-gray-700 p-2 rounded"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {Object.keys(cpuModels).map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>
      <h1 className="text-lg hidden sm:block">CPU Simulator</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm">v{import.meta.env.VITE_APP_VERSION}</span>
        <button className="p-2" onClick={onSettings}>Settings</button>
      </div>
    </header>
  )
}

