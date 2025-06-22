import { TaskAgent } from './TaskAgent'
import { getCores } from '../state/cores'

export class SchedulerAgent {
  tasks: TaskAgent[] = []
  addTask(task: TaskAgent) {
    this.tasks.push(task)
  }
  killTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id)
  }
  tick(dt: number) {
    this.tasks = this.tasks.filter((t) => t.tick(dt))
    getCores().forEach((c) => c.flush())
  }
}
