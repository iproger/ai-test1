import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { useEffect, useRef } from 'react';
import { useAppStore } from '../state/store';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale);

export function ExecutionChart() {
  const cores = useAppStore((s) => s.cores);
  const chartRef = useRef<any>(null);
  const data = {
    labels: cores.map((c) => `C${c.id}`),
    datasets: [
      {
        label: 'Load',
        data: cores.map((c) => c.load),
        borderColor: 'rgb(75,192,192)',
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [cores]);

  return <Line ref={chartRef} data={data} />;
}
