import { CPUSimulator } from './simulator/CPUSimulator';
import { defaultCPUs } from './cpuModels';

const cpu = defaultCPUs[1];
const sim = new CPUSimulator(cpu);

const task = sim.addTask({
  name: 'Prime95',
  durationMs: 10000,
  loadProfile: 'INT',
  intensity: 'high',
  assignedThreads: Array.from({ length: cpu.clusters[0].cores * cpu.clusters[0].threadsPerCore }, (_, i) => i),
});

task.status = 'running';
sim.start();

setTimeout(() => {
  sim.stop();
  console.log('Loads', sim.getLoads());
  console.log('Temps', sim.getTemperatures());
  console.log('Throttle', sim.getThrottling());
}, 2000);
