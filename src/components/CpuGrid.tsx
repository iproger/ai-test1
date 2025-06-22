import React, { useEffect, useRef } from 'react';
import { useAppState } from '../state/AppContext';

interface BoxProps {
  id: number;
  load: number;
  history: number[];
  showNumbers: boolean;
  tasksOnCore: string[];
}

function ThreadBox({ id, load, history, showNumbers, tasksOnCore }: BoxProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    const step = width / history.length;
    ctx.fillStyle = '#198754';
    history.forEach((val, i) => {
      const x = width - (i + 1) * step;
      const h = (val / 100) * height;
      ctx.fillRect(x, height - h, step - 1, h);
    });
  }, [history]);

  return (
    <div
      className="position-relative border rounded shadow-sm bg-body-tertiary"
      style={{ width: '75px', height: '100px' }}
      title={`Core ${id}\nUtilization: ${load.toFixed(0)}%\nTasks: ${tasksOnCore.join(', ') || 'none'}`}
    >
      <canvas ref={canvasRef} width={75} height={100} className="w-100 h-100" />
      {showNumbers && (
        <span className="position-absolute top-0 start-0 small text-white px-1" style={{ fontSize: '0.6rem' }}>{id}</span>
      )}
    </div>
  );
}

function CpuGrid() {
  const { cores, tasks, settings } = useAppState();
  return (
    <div className="d-flex flex-wrap gap-2">
      {cores.map((core) => {
        const tasksOnCore = tasks.filter(t => t.assigned.includes(core.id)).map(t => t.name);
        return (
          <ThreadBox
            key={core.id}
            id={core.id}
            load={core.load}
            history={core.history}
            tasksOnCore={tasksOnCore}
            showNumbers={settings.showNumbers}
          />
        );
      })}
    </div>
  );
}

export default CpuGrid;
