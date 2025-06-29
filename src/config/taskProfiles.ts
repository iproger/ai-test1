export interface LoadPoint {
  t: number; // 0..1 normalized time
  load: number; // load %
}

export interface TaskProfile {
  id: string;
  name: string;
  pattern: LoadPoint[];
}

function wave(length: number, min: number, max: number): LoadPoint[] {
  const points: LoadPoint[] = [];
  for (let i = 0; i <= length; i++) {
    const t = i / length;
    const angle = t * Math.PI * 2;
    const load = min + (Math.sin(angle) * 0.5 + 0.5) * (max - min);
    points.push({ t, load });
  }
  return points;
}

export const taskProfiles: TaskProfile[] = [
  {
    id: 'gta5',
    name: 'GTA V',
    pattern: wave(20, 40, 95),
  },
  {
    id: 'flightsim',
    name: 'Microsoft Flight Simulator',
    pattern: wave(30, 60, 100),
  },
  {
    id: 'blender',
    name: 'Blender Render',
    pattern: Array.from({ length: 10 }, (_, i) => ({ t: i / 10, load: 95 })),
  },
  {
    id: 'idle',
    name: 'Idle',
    pattern: Array.from({ length: 10 }, (_, i) => ({ t: i / 10, load: 5 })),
  },
];

export function getProfile(id: string): TaskProfile {
  return taskProfiles.find(p => p.id === id) || taskProfiles[0];
}
