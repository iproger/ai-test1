export interface Task {
  id: number;
  name: string;
  duration: number;
}

export function createTask(id: number, name: string, duration: number): Task {
  return { id, name, duration };
}
