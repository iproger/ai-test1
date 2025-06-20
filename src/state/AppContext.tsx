import React, { createContext, useContext, useState, useEffect } from 'react';
import { modelList, CpuModel } from '../models';
import { taskCategories, TaskPreset, getPresetMetric } from '../config/taskTypes';

export interface Core {
  id: number;
  load: number;
  temperature: number;
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
  baseCores: number;
  metricName: string;
  baseValue: number;
  value: number;
}

interface AppState {
  model: CpuModel;
  cores: Core[];
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'name' | 'remaining' | 'baseCores' | 'metricName' | 'baseValue' | 'value'>) => void;
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
  }));
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [model, setModel] = useState<CpuModel>(modelList[0]);
  const [cores, setCores] = useState<Core[]>(createCores(modelList[0]));
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });
  const [nextId, setNextId] = useState<number>(() => {
    const stored = localStorage.getItem('nextTaskId');
    return stored ? Number(stored) : 1;
  });

  useEffect(() => {
    setCores(createCores(model));
  }, [model]);

  useEffect(() => {
    const id = setInterval(() => {
      setCores(prev => {
        const newCores = prev.map(core => ({ ...core, load: Math.max(0, core.load - 5) }));
        tasks.forEach(task => {
          for (let i = 0; i < task.cores && i < newCores.length; i++) {
            newCores[i].load = Math.min(100, newCores[i].load + 100 / task.cores);
          }
        });
        return newCores.map(c => ({
          ...c,
          temperature: 40 + c.load * 0.5,
        }));
      });
      setTasks(prev => {
        const conflict = prev.length > 1 ? 0.7 : 1;
        return prev
          .map(t => {
            const newRemaining = t.remaining - 0.1;
            const value = t.baseValue * Math.min(1, t.cores / t.baseCores) * conflict;
            return { ...t, remaining: newRemaining, value };
          })
          .filter(t => t.remaining > 0);
      });
    }, 100);
    return () => clearInterval(id);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('nextTaskId', nextId.toString());
  }, [tasks, nextId]);

  const addTask = (
    task: Omit<Task, 'id' | 'name' | 'remaining' | 'baseCores' | 'metricName' | 'baseValue' | 'value'>
  ) => {
    const preset = taskCategories
      .find(c => c.id === task.category)?.presets.find(p => p.id === task.presetId) as TaskPreset;
    const { metricName, baseValue } = getPresetMetric(preset);
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
        ...task,
      },
    ]);
    setNextId(prev => prev + 1);
  };

  return (
    <AppContext.Provider value={{ model, cores, tasks, addTask, setModel }}>
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
