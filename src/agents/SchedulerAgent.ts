import { CoreState } from './CoreAgent';
import { Task } from './TaskAgent';

export function schedule(cores: CoreState[], tasks: Task[]) {
  // placeholder scheduling logic
  return cores.map((c, i) => ({ ...c, load: tasks.length ? 100 / cores.length : 0 }));
}
