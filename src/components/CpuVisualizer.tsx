import { useAppStore } from '../state/store';

export function CpuVisualizer() {
  const cores = useAppStore((s) => s.cores);
  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {cores.map((core) => (
        <div
          key={core.id}
          className="w-12 h-20 border rounded flex flex-col justify-end overflow-hidden relative"
        >
          <div
            className="bg-green-500 transition-all duration-100"
            style={{ height: `${core.load}%` }}
          />
          <span className="absolute top-0 left-0 text-xs p-1">
            {core.temperature.toFixed(0)}°C
          </span>
          {core.throttled && (
            <span className="absolute bottom-0 left-0 text-red-600 text-xs p-1">
              T
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
