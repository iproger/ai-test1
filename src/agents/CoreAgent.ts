import { useCpuStore } from '../state/store';
import type { ThreadState } from '../state/store'

export class CoreAgent {
  thread: ThreadState
  constructor(thread: ThreadState) {
    this.thread = thread
  }
  tick(load: number) {
    const temp = Math.min(100, this.thread.temperature + load * 0.1)
    const throttled = temp > 90
    useCpuStore.getState().setThread(this.thread.id, { load, temperature: temp, throttled })
  }
}
