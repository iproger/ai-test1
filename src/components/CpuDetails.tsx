import React from 'react';
import { useAppState } from '../state/AppContext';

const CpuDetails: React.FC = () => {
  const { model } = useAppState();
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
      </div>
    </div>
  );
};

export default CpuDetails;
