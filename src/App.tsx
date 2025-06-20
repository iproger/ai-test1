import React from 'react';
import Header from './components/Header';
import CpuGrid from './components/CpuGrid';
import TaskForm from './components/TaskForm';
import TaskQueue from './components/TaskQueue';
import ExecutionChart from './components/ExecutionChart';
import SettingsDrawer from './components/SettingsDrawer';

function App() {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Header />
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <CpuGrid />
          <ExecutionChart />
        </div>
        <div className="space-y-4">
          <TaskForm />
          <TaskQueue />
        </div>
      </div>
      <SettingsDrawer />
    </div>
  );
}

export default App;
