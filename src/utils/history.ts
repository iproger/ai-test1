export function pushHistory(history: number[], value: number, limit = 50): number[] {
  const newHist = [...history, value];
  if (newHist.length > limit) newHist.shift();
  return newHist;
}
