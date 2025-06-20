import React, { useEffect, useState } from 'react';
import { CPUSimulator } from '../simulator/CPUSimulator';

interface Props {
  simulator: CPUSimulator;
}

export default function CpuVisualizer({ simulator }: Props) {
  const [loads, setLoads] = useState<number[]>([]);
  const [throttles, setThrottles] = useState<number[]>([]);

  useEffect(() => {
    simulator.start();
    const id = setInterval(() => {
      setLoads(Array.from(simulator.getLoads()));
      setThrottles(Array.from(simulator.getThrottling()));
    }, 50);
    return () => {
      clearInterval(id);
      simulator.stop();
    };
  }, [simulator]);

  const threadCount = loads.length;
  const columns = Math.ceil(Math.sqrt(threadCount || 1));

  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {loads.map((load, i) => (
        <div
          key={i}
          className="w-6 h-6"
          style={{
            backgroundColor: throttles[i] ? '#b91c1c' : '#3b82f6',
            opacity: load,
          }}
        />
      ))}
    </div>
  );
}
