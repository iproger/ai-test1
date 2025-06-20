import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useAppState } from '../state/AppContext';

function ExecutionChart() {
  const { cores } = useAppState();
  const data = cores.map(c => ({ name: c.id.toString(), load: c.load }));
  return (
    <BarChart width={300} height={200} data={data} className="mx-auto">
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]} />
      <Bar dataKey="load" fill="#38bdf8" />
    </BarChart>
  );
}

export default ExecutionChart;
