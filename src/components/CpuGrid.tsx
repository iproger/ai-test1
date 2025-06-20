import React from 'react';

function ThreadBox({ id }: { id: number }) {
  return (
    <div className="w-[50px] h-[75px] border rounded overflow-hidden bg-gray-900 relative">
      <div className="absolute bottom-0 w-full bg-green-500 transition-all duration-150 ease-linear" style={{ height: `${Math.random() * 100}%` }} />
    </div>
  );
}

function CpuGrid() {
  const threads = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div className="grid grid-cols-4 gap-2">
      {threads.map((id) => (
        <ThreadBox key={id} id={id} />
      ))}
    </div>
  );
}

export default CpuGrid;
