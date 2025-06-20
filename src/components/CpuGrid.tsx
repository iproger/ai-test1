import React from 'react';
import { useAppState } from '../state/AppContext';

function ThreadBox({ id, load, showNumbers }: { id: number; load: number; showNumbers: boolean }) {
  let fillColor = 'bg-success-subtle';
  if (load > 70) fillColor = 'bg-danger';
  else if (load > 30) fillColor = 'bg-warning';
  return (
    <div
      className="position-relative border rounded shadow-sm bg-body-tertiary d-flex align-items-end justify-content-center"
      style={{ width: '50px', height: '75px' }}
    >
      <div
        className={`position-absolute bottom-0 start-0 ${fillColor}`}
        style={{ width: '100%', height: `${load}%`, transition: 'height 0.3s ease-in-out' }}
      />
      {showNumbers && (
        <span className="position-relative small" style={{ zIndex: 1 }}>{id}</span>
      )}
    </div>
  );
}

function CpuGrid() {
  const { cores, settings } = useAppState();
  return (
    <div className="d-flex flex-wrap gap-2">
      {cores.map((core) => (
        <ThreadBox key={core.id} id={core.id} load={core.load} showNumbers={settings.showNumbers} />
      ))}
    </div>
  );
}

export default CpuGrid;
