import { createCores, CoreState } from '../agents/CoreAgent';
import { createTask, Task } from '../agents/TaskAgent';
import { schedule } from '../agents/SchedulerAgent';
import { updateThermals } from '../agents/ThermalAgent';

export interface AppState {
  cores: CoreState[];
  tasks: Task[];
}

const state: AppState = {
  cores: createCores(8),
  tasks: [],
};

export function addTask(name: string, duration: number) {
  const id = state.tasks.length + 1;
  state.tasks.push(createTask(id, name, duration));
}

export function step() {
  state.cores = schedule(state.cores, state.tasks);
  updateThermals(state.cores);
}

export default state;
