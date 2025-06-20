import React, { useEffect, useState } from 'react';
import { CPUSimulator } from '../simulator/CPUSimulator';

interface Props {
  simulator: CPUSimulator;
}

interface Metric { id: number; name: string; ops: number; }

export default function ExecutionConsole({ simulator }: Props) {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setMetrics(simulator.getTaskMetrics());
    }, 500);
    return () => clearInterval(id);
  }, [simulator]);

  return (
    <div className="bg-gray-800 p-2 text-sm space-y-1">
      {metrics.map(m => (
        <div key={m.id} className="flex justify-between">
          <span>{m.name}</span>
          <span>{m.ops} ops/s</span>
        </div>
      ))}
      {metrics.length === 0 && <div>No active tasks</div>}
    </div>
  );
}
