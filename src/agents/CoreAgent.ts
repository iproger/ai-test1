import { useCpuStore } from '../state/store';
import type { ThreadState } from '../state/store'

export class CoreAgent {
  thread: ThreadState
  private buffer = 0
  constructor(thread: ThreadState) {
    this.thread = thread
  }
  addLoad(load: number) {
    this.buffer += load
  }
  flush() {
    const load = Math.min(1, this.buffer)
    this.buffer = 0
    const temp = Math.min(100, this.thread.temperature + load * 0.1)
    const throttled = temp > 90
    useCpuStore.getState().setThread(this.thread.id, {
      load,
      temperature: temp,
      throttled,
    })
  }
}
