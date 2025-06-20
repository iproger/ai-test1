import React from 'react';
import { useAppState } from '../state/AppContext';

function ThreadBox({ load }: { load: number }) {
  return (
    <div
      className="position-relative bg-body-tertiary border border-secondary rounded"
      style={{ width: '50px', height: '75px' }}
    >
      <div
        className="position-absolute bottom-0 start-0 bg-success"
        style={{ width: '100%', height: `${load}%`, transition: 'height 0.15s linear' }}
      />
    </div>
  );
}

function CpuGrid() {
  const { cores } = useAppState();
  return (
    <div className="d-flex flex-wrap gap-2">
      {cores.map((core) => (
        <ThreadBox key={core.id} load={core.load} />
      ))}
    </div>
  );
}

export default CpuGrid;
