import { CoreAgent } from './CoreAgent'

export interface TaskOptions {
  duration: number
  intensity: number
  cores: CoreAgent[]
  profile?: number[]
}

export class TaskAgent {
  opts: TaskOptions
  progress = 0
  step = 0
  id: number
  private static nextId = 1
  constructor(opts: TaskOptions) {
    this.opts = opts
    this.id = TaskAgent.nextId++
  }
  tick(dt: number) {
    if (this.progress >= this.opts.duration) return false
    this.progress += dt
    const profile = this.opts.profile || [1]
    const factor = profile[this.step % profile.length]
    this.step += 1
    let load = this.opts.intensity * factor
    load += (Math.random() - 0.5) * 0.1 * this.opts.intensity
    load = Math.max(0, Math.min(1, load))
    this.opts.cores.forEach((core) => core.addLoad(load))
    return true
  }
}
