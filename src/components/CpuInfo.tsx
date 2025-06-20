import React from 'react';
import { CPUModel } from '../models/cpu';

interface Props { cpu: CPUModel; }

export default function CpuInfo({ cpu }: Props) {
  return (
    <div className="bg-gray-800 p-2 text-sm space-y-2">
      <div className="font-bold">{cpu.name}</div>
      <div>Brand: {cpu.brand}</div>
      <div>Released: {cpu.releaseYear}</div>
      <div className="space-y-1">
        {cpu.clusters.map((c, i) => (
          <div key={i}>
            {c.name}: {c.cores}C/{c.threadsPerCore}T {c.baseFrequencyGHz} - {c.maxFrequencyGHz}GHz
          </div>
        ))}
      </div>
    </div>
  );
}
