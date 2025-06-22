import React from 'react';
import Header from './components/Header';
import CpuGrid from './components/CpuGrid';
import CpuDetails from './components/CpuDetails';
import TaskForm from './components/TaskForm';
import TaskQueue from './components/TaskQueue';
import ExecutionChart from './components/ExecutionChart';
import CpuGraph from './components/CpuGraph';
import SettingsDrawer from './components/SettingsDrawer';
import { AppProvider } from './state/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-vh-100 bg-dark text-light">
        <Header />
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-md-8">
              <CpuGrid />
              <div className="mt-3">
                <CpuGraph />
              </div>
              <div className="mt-3">
                <ExecutionChart />
              </div>
            </div>
            <div className="col-md-4">
              <CpuDetails />
              <div className="mt-3">
                <TaskForm />
              </div>
              <div className="mt-3">
                <TaskQueue />
              </div>
            </div>
          </div>
        </div>
        <SettingsDrawer />
      </div>
    </AppProvider>
  );
}

export default App;
