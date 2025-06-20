import React, { useEffect, useState } from 'react';
import { CPUSimulator } from './simulator/CPUSimulator';
import { defaultCPUs } from './cpuModels';
import Header from './components/Header';
import CpuVisualizer from './components/CpuVisualizer';
import TaskQueue from './components/TaskQueue';
import ExecutionConsole from './components/ExecutionConsole';
import CpuInfo from './components/CpuInfo';
import SettingsPanel from './components/SettingsPanel';

export default function App() {
  const [cpuIndex, setCpuIndex] = useState(0);
  const [sim, setSim] = useState(() => new CPUSimulator(defaultCPUs[0]));
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const newSim = new CPUSimulator(defaultCPUs[cpuIndex]);
    setSim(newSim);
  }, [cpuIndex]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cpuIndex={cpuIndex} setCpuIndex={setCpuIndex} openSettings={() => setSettingsOpen(true)} />
      <div className="flex-1 p-4 space-y-4 grid md:grid-cols-2 md:gap-4 overflow-y-auto">
        <div className="space-y-4">
          <CpuVisualizer simulator={sim} />
          <TaskQueue simulator={sim} />
        </div>
        <div className="space-y-4">
          <CpuInfo cpu={sim.cpu} />
          <ExecutionConsole simulator={sim} />
        </div>
      </div>
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
