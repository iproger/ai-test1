import React from 'react';
import { useAppState } from '../state/AppContext';

function ThreadBox({ load }: { load: number }) {
  return (
    <div className="w-[50px] h-[75px] border rounded overflow-hidden bg-gray-900 relative">
      <div
        className="absolute bottom-0 w-full bg-green-500 transition-all duration-150 ease-linear"
        style={{ height: `${load}%` }}
      />
    </div>
  );
}

function CpuGrid() {
  const { cores } = useAppState();
  return (
    <div className="grid grid-cols-4 gap-2">
      {cores.map((core) => (
        <ThreadBox key={core.id} load={core.load} />
      ))}
    </div>
  );
}

export default CpuGrid;
