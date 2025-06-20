import React, { useEffect, useState } from 'react';
import { CPUSimulator } from '../simulator/CPUSimulator';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

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

  const data = {
    labels: metrics.map(m => m.name),
    datasets: [
      {
        label: 'Ops/s',
        data: metrics.map(m => m.ops),
        backgroundColor: '#3b82f6',
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-2 text-sm">
      {metrics.length === 0 ? (
        <div>No active tasks</div>
      ) : (
        <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      )}
    </div>
  );
}
