import { CoreAgent } from '../agents/CoreAgent'
import type { ThreadState } from './store'

let cores: CoreAgent[] = []

export function initCores(threads: ThreadState[]) {
  cores = threads.map((t) => new CoreAgent(t))
}

export function getCores() {
  return cores
}
