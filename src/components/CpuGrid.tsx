import React from 'react';
import { useAppState } from '../state/AppContext';

function ThreadBox({ load }: { load: number }) {
  const fillColor = load > 80 ? 'bg-success' : load > 20 ? 'bg-success-subtle' : 'bg-success-subtle';
  return (
    <div
      className="position-relative border rounded shadow-sm bg-body-tertiary"
      style={{ width: '40px', height: '70px' }}
    >
      <div
        className={`position-absolute bottom-0 start-0 ${fillColor}`}
        style={{ width: '100%', height: `${load}%`, transition: 'height 0.3s ease-in-out' }}
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
