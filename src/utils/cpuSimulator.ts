export interface SimTask {
  cores: number;
  duration: number;
}

export function simulateStep(cores: number[], tasks: SimTask[]): number[] {
  const newLoads = cores.map(l => Math.max(0, l - 5));
  tasks.forEach(t => {
    for (let i = 0; i < t.cores && i < newLoads.length; i++) {
      newLoads[i] = Math.min(100, newLoads[i] + 100 / t.cores);
    }
  });
  return newLoads;
}
