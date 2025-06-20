import React, { useEffect, useState } from 'react';
import { CPUSimulator } from '../simulator/CPUSimulator';

interface Props {
  simulator: CPUSimulator;
}

export default function CpuVisualizer({ simulator }: Props) {
  const [loads, setLoads] = useState<number[]>([]);
  const [throttles, setThrottles] = useState<number[]>([]);
  const [temps, setTemps] = useState<number[]>([]);

  useEffect(() => {
    simulator.start();
    const id = setInterval(() => {
      setLoads(Array.from(simulator.getLoads()));
      setThrottles(Array.from(simulator.getThrottling()));
      setTemps(Array.from(simulator.getTemperatures()));
    }, 50);
    return () => {
      clearInterval(id);
      simulator.stop();
    };
  }, [simulator]);

  const colorFor = (load: number, temp: number, throttle: number) => {
    if (throttle) return '#b91c1c';
    const hue = 200 - Math.round(load * 120);
    return `hsl(${hue},70%,50%)`;
  };

  let index = 0;
  return (
    <div className="space-y-2">
      {simulator.cpu.clusters.map((cluster, cIdx) => {
        const count = cluster.cores * cluster.threadsPerCore;
        const columns = Math.ceil(Math.sqrt(count));
        const tiles = [];
        for (let i = 0; i < count; i++) {
          const load = loads[index] ?? 0;
          const temp = temps[index] ?? 0;
          const thr = throttles[index] ?? 0;
          tiles.push(
            <div
              key={index}
              className="w-5 h-5 md:w-6 md:h-6 transition-colors"
              style={{
                backgroundColor: colorFor(load, temp, thr),
                opacity: 0.7 + load * 0.3,
              }}
            />
          );
          index++;
        }
        return (
          <div key={cIdx} className="border border-gray-600 p-1 rounded">
            <div className="text-xs mb-1 text-gray-300">{cluster.name}</div>
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: `repeat(${columns},1fr)` }}
            >
              {tiles}
            </div>
          </div>
        );
      })}
    </div>
  );
}
