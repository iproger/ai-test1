import { TaskAgent } from './TaskAgent'

export class SchedulerAgent {
  tasks: TaskAgent[] = []
  addTask(task: TaskAgent) {
    this.tasks.push(task)
  }
  tick(dt: number) {
    this.tasks = this.tasks.filter((t) => t.tick(dt))
  }
}
