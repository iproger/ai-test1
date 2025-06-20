import { useEffect } from 'react';
import { Header } from './components/Header';
import { CpuVisualizer } from './components/CpuVisualizer';
import { TaskForm } from './components/TaskForm';
import { TaskQueue } from './components/TaskQueue';
import { ExecutionChart } from './components/ExecutionChart';
import { startSimulation } from './utils/simulationLoop';
import { useAppStore } from './state/store';
import './index.css';

function App() {
  const theme = useAppStore((s) => s.settings.theme);
  useEffect(() => {
    startSimulation();
  }, []);
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <Header />
      <div className="grid md:grid-cols-2">
        <div>
          <CpuVisualizer />
          <ExecutionChart />
        </div>
        <div>
          <TaskForm />
          <TaskQueue />
        </div>
      </div>
    </div>
  );
}

export default App;
