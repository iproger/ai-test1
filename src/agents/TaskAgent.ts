import { CoreAgent } from './CoreAgent'

export interface TaskOptions {
  duration: number
  intensity: number
  cores: CoreAgent[]
}

export class TaskAgent {
  opts: TaskOptions
  progress = 0
  constructor(opts: TaskOptions) {
    this.opts = opts
  }
  tick(dt: number) {
    if (this.progress >= this.opts.duration) return false
    this.progress += dt
    const load = this.opts.intensity
    this.opts.cores.forEach((core) => core.tick(load))
    return true
  }
}
