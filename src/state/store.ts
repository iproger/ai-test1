import { create } from 'zustand'

export interface ThreadState {
  id: number
  load: number
  temperature: number
  throttled: boolean
}

export interface CpuState {
  threads: ThreadState[]
  setThread: (id: number, patch: Partial<ThreadState>) => void
}

export const useCpuStore = create<CpuState>((set) => ({
  threads: [],
  setThread: (id, patch) =>
    set((state) => ({
      threads: state.threads.map((t) =>
        t.id === id ? { ...t, ...patch } : t
      ),
    })),
}))
