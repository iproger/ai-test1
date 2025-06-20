import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const data = [
  { name: 't1', value: 0 },
  { name: 't2', value: 0 },
];

function ExecutionChart() {
  return (
    <LineChart width={300} height={200} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}

export default ExecutionChart;
