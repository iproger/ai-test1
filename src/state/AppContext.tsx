import React, { createContext, useContext, useState, useEffect } from 'react';
import { modelList, CpuModel } from '../models';
import { taskCategories, TaskPreset, getPresetMetric } from '../config/taskTypes';
import { getProfile, TaskProfile } from '../config/taskProfiles';

export interface Core {
  id: number;
  load: number;
  temperature: number;
  history: number[];
}

export interface Settings {
  updateInterval: number;
  showNumbers: boolean;
  showTemp: boolean;
  throttling: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: number;
  name: string;
  duration: number; // seconds
  remaining: number; // seconds
  category: string;
  presetId: string;
  cores: number;
  priority: TaskPriority;
  assigned: number[];
  profile: TaskProfile;
  profileStep: number;
  baseCores: number;
  metricName: string;
  baseValue: number;
  value: number;
}

interface AppState {
  model: CpuModel;
  cores: Core[];
  tasks: Task[];
  settings: Settings;
  setSettings: (s: Settings) => void;
  addTask: (task: Omit<Task, 'id' | 'name' | 'remaining' | 'assigned' | 'profile' | 'profileStep' | 'baseCores' | 'metricName' | 'baseValue' | 'value'>) => void;
  setModel: (model: CpuModel) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

function createCores(model: CpuModel): Core[] {
  let totalThreads = 0;
  model.clusters.forEach(c => {
    totalThreads += c.cores * c.threadsPerCore;
  });
  return Array.from({ length: totalThreads }, (_, i) => ({
    id: i,
    load: 0,
    temperature: 40,
    history: [],
  }));
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [model, setModel] = useState<CpuModel>(modelList[0]);
  const [cores, setCores] = useState<Core[]>(createCores(modelList[0]));
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('tasks');
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((t: any) => {
        const preset = taskCategories
          .find(c => c.id === t.category)?.presets.find(p => p.id === t.presetId) as TaskPreset | undefined;
        const profile = t.profile || getProfile(t.presetId);
        const metric = preset ? getPresetMetric(preset) : { metricName: '', baseValue: 0 };
        return {
          id: t.id ?? 0,
          name: t.name || `${preset?.name ?? 'Task'} #${t.id}`,
          duration: t.duration ?? 0,
          remaining: t.remaining ?? t.duration ?? 0,
          category: t.category,
          presetId: t.presetId,
          cores: t.cores ?? preset?.defaultCores ?? 1,
          priority: t.priority ?? 'Low',
          assigned: Array.isArray(t.assigned) ? t.assigned : [],
          profile,
          profileStep: t.profileStep ?? 0,
          baseCores: t.baseCores ?? preset?.defaultCores ?? 1,
          metricName: t.metricName ?? metric.metricName,
          baseValue: t.baseValue ?? metric.baseValue,
          value: t.value ?? metric.baseValue,
        } as Task;
      });
    } catch {
      return [];
    }
  });
  const [nextId, setNextId] = useState<number>(() => {
    const stored = localStorage.getItem('nextTaskId');
    return stored ? Number(stored) : 1;
  });
  const [settings, setSettings] = useState<Settings>(() => {
    const s = localStorage.getItem('settings');
    return s
      ? JSON.parse(s)
      : {
          updateInterval: 100,
          showNumbers: false,
          showTemp: false,
          throttling: true,
          theme: 'auto',
        };
  });

  useEffect(() => {
    setCores(createCores(model));
  }, [model]);

  useEffect(() => {
    const id = setInterval(() => {
      setCores(prev => {
        const newCores = prev.map(core => ({ ...core, load: Math.max(0, core.load - 5) }));
        tasks.forEach(task => {
          const step = task.profile.pattern[task.profileStep % task.profile.pattern.length];
          task.assigned.forEach(idx => {
            if (newCores[idx]) {
              newCores[idx].load = Math.min(100, newCores[idx].load + step.load / task.assigned.length);
            }
          });
        });
        return newCores.map(c => {
          const history = [...c.history, c.load];
          if (history.length > 50) history.shift();
          return {
            ...c,
            temperature: 40 + c.load * 0.5,
            history,
          };
        });
      });
      setTasks(prev => {
        const conflict = prev.length > 1 ? 0.7 : 1;
        return prev
          .map(t => {
            const newRemaining = t.remaining - settings.updateInterval / 1000;
            const value = t.baseValue * Math.min(1, t.cores / t.baseCores) * conflict;
            const nextStep = (t.profileStep + 1) % t.profile.pattern.length;
            return { ...t, remaining: newRemaining, value, profileStep: nextStep };
          })
          .filter(t => t.remaining > 0);
      });
    }, settings.updateInterval);
    return () => clearInterval(id);
  }, [tasks, settings.updateInterval]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('nextTaskId', nextId.toString());
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [tasks, nextId, settings]);

  const addTask = (
    task: Omit<Task, 'id' | 'name' | 'remaining' | 'assigned' | 'profile' | 'profileStep' | 'baseCores' | 'metricName' | 'baseValue' | 'value'>
  ) => {
    const preset = taskCategories
      .find(c => c.id === task.category)?.presets.find(p => p.id === task.presetId) as TaskPreset;
    const { metricName, baseValue } = getPresetMetric(preset);
    // assign least loaded cores
    const sorted = [...cores].sort((a,b)=>a.load-b.load).map(c=>c.id);
    const assigned = sorted.slice(0, task.cores);
    setTasks(prev => [
      ...prev,
      {
        id: nextId,
        name: `${preset.name} #${nextId}`,
        remaining: task.duration,
        baseCores: preset.defaultCores,
        metricName,
        baseValue,
        value: baseValue,
        assigned,
        profile: getProfile(preset.id),
        profileStep: 0,
        ...task,
      },
    ]);
    setNextId(prev => prev + 1);
  };

  return (
    <AppContext.Provider value={{ model, cores, tasks, settings, setSettings, addTask, setModel }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('AppContext missing');
  return ctx;
}

export { modelList } from '../models';
