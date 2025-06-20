import React, { createContext, useContext, useState, useEffect } from 'react';
import { modelList, CpuModel } from '../models';

export interface Core {
  id: number;
  load: number;
  temperature: number;
}

export interface Task {
  id: number;
  name: string;
  duration: number; // seconds
  remaining: number; // seconds
}

interface AppState {
  model: CpuModel;
  cores: Core[];
  tasks: Task[];
  addTask: (name: string, duration: number) => void;
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
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setCores(createCores(model));
  }, [model]);

  useEffect(() => {
    const id = setInterval(() => {
      setCores(prev => prev.map(core => ({
        ...core,
        load: tasks.length ? 100 : Math.max(0, core.load - 5),
        temperature: 40 + core.load * 0.5,
      })));
      setTasks(prev => prev
        .map(t => ({ ...t, remaining: t.remaining - 0.1 }))
        .filter(t => t.remaining > 0));
    }, 100);
    return () => clearInterval(id);
  }, [tasks]);

  const addTask = (name: string, duration: number) => {
    setTasks(prev => [
      ...prev,
      { id: prev.length + 1, name, duration, remaining: duration },
    ]);
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
