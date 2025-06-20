import { useEffect, useState } from 'react';
import { useAppStore } from '../state/store';
import intel from '../models/cpuModels/intel.json';
import amd from '../models/cpuModels/amd.json';
import apple from '../models/cpuModels/apple.json';
import snapdragon from '../models/cpuModels/snapdragon.json';

const models = [intel, amd, apple, snapdragon];

export function Header() {
  const [cpu, setCpu] = useState(models[0]);
  const setTheme = useAppStore((s) => s.setTheme);

  useEffect(() => {
    if (cpu.name) {
      document.title = `CPU Simulator - ${cpu.name}`;
    }
  }, [cpu]);

  return (
    <header className="p-4 flex justify-between items-center bg-gray-800 text-white dark:bg-gray-900">
      <div>
        <select
          className="text-black p-1 rounded"
          value={cpu.name}
          onChange={(e) => {
            const selected = models.find((m) => m.name === e.target.value);
            if (selected) setCpu(selected);
          }}
        >
          {models.map((m) => (
            <option key={m.name} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="text-black p-1 rounded"
          onChange={(e) => setTheme(e.target.value as any)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </header>
  );
}
