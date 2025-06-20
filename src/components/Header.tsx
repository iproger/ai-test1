import React from 'react';
import { defaultCPUs } from '../cpuModels';

interface Props {
  cpuIndex: number;
  setCpuIndex: (i: number) => void;
}

export default function Header({ cpuIndex, setCpuIndex }: Props) {
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
    </header>
  );
}
