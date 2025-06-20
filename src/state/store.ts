import { create } from 'zustand';

export interface CoreState {
  id: number;
  load: number; // 0-100
  temperature: number; // C
  throttled: boolean;
}

export interface TaskState {
  id: string;
  name: string;
  intensity: number; // 0-1
  duration: number; // seconds
  remaining: number; // seconds
  cores: number[]; // assigned core ids
  running: boolean;
}

export interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  maxTemperature: number;
  throttling: boolean;
}

export interface AppState {
  cores: CoreState[];
  tasks: TaskState[];
  settings: SettingsState;
  tick: () => void;
  addTask: (task: Partial<Omit<TaskState, 'id' | 'remaining'>>) => void;
  setTheme: (theme: SettingsState['theme']) => void;
}

let taskCounter = 0;

export const useAppStore = create<AppState>((set, get) => ({
  cores: Array.from({ length: 8 }, (_, i) => ({
    id: i,
    load: 0,
    temperature: 35,
    throttled: false,
  })),
  tasks: [],
  settings: { theme: 'system', maxTemperature: 90, throttling: true },
  tick() {
    const state = get();
    const updatedCores = state.cores.map((core) => ({ ...core, load: 0 }));
    const updatedTasks = state.tasks.map((task) => {
      if (!task.running) return task;
      task.remaining = Math.max(task.remaining - 0.1, 0);
      if (task.remaining === 0) task.running = false;
      task.cores.forEach((cId) => {
        const core = updatedCores[cId];
        core.load += task.intensity * 100;
        core.temperature += task.intensity * 0.5;
      });
      return task;
    });
    updatedCores.forEach((core) => {
      core.temperature -= 0.2;
      if (core.temperature > state.settings.maxTemperature && state.settings.throttling) {
        core.throttled = true;
        core.load = core.load / 2;
      } else {
        core.throttled = false;
      }
      core.temperature = Math.max(30, core.temperature);
    });
    set({ cores: updatedCores, tasks: updatedTasks });
  },
  addTask(task) {
    const id = `task-${taskCounter++}`;
    const duration = task.duration ?? 10;
    const newTask: TaskState = {
      id,
      name: task.name ?? id,
      intensity: task.intensity ?? 0.5,
      duration,
      remaining: duration,
      cores: task.cores ?? [0],
      running: true,
    };
    set((s) => ({ tasks: [...s.tasks, newTask] }));
  },
  setTheme(theme) {
    set((s) => ({ settings: { ...s.settings, theme } }));
  },
}));
