import React from 'react';
import { useAppState } from '../state/AppContext';

const CpuDetails: React.FC = () => {
  const { model, cores } = useAppState();
  const avgTemp = cores.reduce((a, c) => a + c.temperature, 0) / cores.length;
  return (
    <div className="card text-body bg-body-secondary">
      <div className="card-body">
        <h5 className="card-title">{model.name}</h5>
        <p className="card-text mb-1"><strong>Brand:</strong> {model.brand}</p>
        <p className="card-text mb-1"><strong>Released:</strong> {model.released}</p>
        <ul className="small ps-3">
          {model.clusters.map((c, idx) => (
            <li key={idx}>
              <strong>{c.name}</strong>: {c.cores}c/{c.threadsPerCore}t {c.baseFreq}-{c.turboFreq}GHz
            </li>
          ))}
        </ul>
        <p className="mb-1"><strong>Avg Temp:</strong> {avgTemp.toFixed(1)}°C</p>
        <p className="mb-1"><strong>Voltage:</strong> 1.1V</p>
        <p className="mb-0"><strong>Thermal State:</strong> {avgTemp > 80 ? 'Throttling' : 'Nominal'}</p>
      </div>
    </div>
  );
};

export default CpuDetails;
