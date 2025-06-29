import { pushHistory } from '../src/utils/history';
import { describe, it, expect } from 'vitest';

describe('pushHistory', () => {
  it('appends new value to the end and trims to limit', () => {
    let hist: number[] = [];
    for (let i = 0; i < 55; i++) {
      hist = pushHistory(hist, i, 50);
    }
    expect(hist.length).toBe(50);
    expect(hist[hist.length - 1]).toBe(54);
    expect(hist[0]).toBe(5);
  });
});
