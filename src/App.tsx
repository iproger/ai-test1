import React, { useEffect, useState } from 'react';
import { CPUSimulator } from './simulator/CPUSimulator';
import { defaultCPUs } from './cpuModels';
import Header from './components/Header';
import CpuVisualizer from './components/CpuVisualizer';
import TaskQueue from './components/TaskQueue';

export default function App() {
  const [cpuIndex, setCpuIndex] = useState(0);
  const [sim, setSim] = useState(() => new CPUSimulator(defaultCPUs[0]));

  useEffect(() => {
    const newSim = new CPUSimulator(defaultCPUs[cpuIndex]);
    setSim(newSim);
  }, [cpuIndex]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cpuIndex={cpuIndex} setCpuIndex={setCpuIndex} />
      <div className="flex-1 p-4 space-y-4">
        <CpuVisualizer simulator={sim} />
        <TaskQueue simulator={sim} />
      </div>
    </div>
  );
}
