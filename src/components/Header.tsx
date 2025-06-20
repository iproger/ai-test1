import React from 'react';
import { defaultCPUs } from '../cpuModels';

interface Props {
  cpuIndex: number;
  setCpuIndex: (i: number) => void;
  openSettings: () => void;
}

export default function Header({ cpuIndex, setCpuIndex, openSettings }: Props) {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800">
      <select
        className="bg-gray-700 p-2"
        value={cpuIndex}
        onChange={e => setCpuIndex(Number(e.target.value))}
      >
        {defaultCPUs.map((cpu, i) => (
          <option key={cpu.name} value={i}>
            {cpu.name}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">v{__APP_VERSION__}</span>
        <button onClick={openSettings} className="bg-gray-700 px-2">⚙</button>
      </div>
    </header>
  );
}
