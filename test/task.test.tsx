import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { AppProvider, useAppState } from '../src/state/AppContext';
import { renderHook, act } from '@testing-library/react';

function setup() {
  const wrapper = ({ children }: any) => <AppProvider>{children}</AppProvider>;
  return renderHook(() => useAppState(), { wrapper });
}

describe('task removal', () => {
  it('clears core load when task killed', () => {
    vi.useFakeTimers();
    const { result } = setup();
    act(() => {
      result.current.addTask({ duration: 10, category: 'game', presetId: 'gta5', cores: 2, priority: 'Low' });
    });
    vi.advanceTimersByTime(result.current.settings.updateInterval * 2);
    act(() => {
      result.current.removeTask(1);
    });
    expect(result.current.tasks.length).toBe(0);
    expect(result.current.cores.every(c => c.load === 0)).toBe(true);
  });
});
