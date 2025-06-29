import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useAppState } from '../state/AppContext';

const CpuGraph: React.FC = () => {
  const { cores } = useAppState();
  const data = cores.map(c => ({ name: c.id, load: c.load }));
  return (
    <BarChart width={300} height={150} data={data} className="mx-auto">
      <XAxis dataKey="name" hide={true} />
      <YAxis domain={[0,100]} hide={true} />
      <Bar dataKey="load" fill="#198754" isAnimationActive={false} />
    </BarChart>
  );
};

export default CpuGraph;
