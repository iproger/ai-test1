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
    <div className="space-y-4">
      {simulator.cpu.clusters.map((cluster, cIdx) => {
        const cores = [];
        for (let i = 0; i < cluster.cores; i++) {
          const threads = [];
          for (let t = 0; t < cluster.threadsPerCore; t++) {
            const load = loads[index] ?? 0;
            const temp = temps[index] ?? 0;
            const thr = throttles[index] ?? 0;
            threads.push(
              <div
                key={index}
                className="w-12 h-20 bg-gray-800 relative rounded overflow-hidden"
              >
                <div
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all"
                  style={{ height: `${Math.round(load * 100)}%` }}
                />
                <span className="absolute top-0 left-0 text-[10px] px-1">
                  {index}
                </span>
              </div>
            );
            index++;
          }
          cores.push(
            <div
              key={`core-${i}`}
              className="flex gap-1 p-1 border rounded border-gray-600"
            >
              {threads}
            </div>
          );
        }
        return (
          <div key={cIdx} className="space-y-1">
            <div className="text-xs text-gray-300">{cluster.name}</div>
            <div className="flex flex-wrap gap-1">{cores}</div>
          </div>
        );
      })}
    </div>
  );
}
