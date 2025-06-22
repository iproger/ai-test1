export interface CoreInfo {
  freq: number;
  cache: number;
  class: 'P' | 'E';
  smt: boolean;
}

export function perfScore(info: CoreInfo): number {
  const base = info.class === 'P' ? 20 : 10;
  return (
    base +
    info.freq * 10 +
    info.cache * 0.5 -
    (info.smt ? 5 : 0)
  );
}
