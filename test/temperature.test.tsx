import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { AppProvider, useAppState } from '../src/state/AppContext';
import { renderHook, act } from '@testing-library/react';

const wrapper = ({ children }: any) => <AppProvider>{children}</AppProvider>;

describe('temperature', () => {
  it('rises gradually with load', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAppState(), { wrapper });
    act(() => {
      result.current.addTask({ duration: 5, category: 'game', presetId: 'gta5', cores: 2, priority: 'Low' });
    });
    const t0 = result.current.cores[0].temperature;
    act(() => {
      vi.advanceTimersByTime(result.current.settings.updateInterval * 5);
    });
    const t1 = result.current.cores[0].temperature;
    expect(t1).toBeGreaterThan(t0);
    expect(t1 - t0).toBeLessThan(20);
  });
});
