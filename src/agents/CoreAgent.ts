export interface CoreState {
  load: number;
  temperature: number;
}

export function createCores(count: number): CoreState[] {
  return Array.from({ length: count }, () => ({ load: 0, temperature: 40 }));
}
