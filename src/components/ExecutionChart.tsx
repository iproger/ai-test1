import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useAppState } from '../state/AppContext';

function ExecutionChart() {
  const { cores } = useAppState();
  const data = cores.map(c => ({ name: c.id.toString(), load: c.load }));
  return (
    <div className="card bg-body-secondary text-body">
      <div className="card-body">
        <BarChart width={300} height={200} data={data} className="mx-auto">
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Bar dataKey="load" fill="#0d6efd" isAnimationActive={false} />
        </BarChart>
      </div>
    </div>
  );
}

export default ExecutionChart;
