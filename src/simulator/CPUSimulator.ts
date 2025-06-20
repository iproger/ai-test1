import { CPUModel } from '../models/cpu';
import { TaskInstance } from '../models/task';

export interface SimulatorOptions {
  tickRateMs?: number;
  heatRisePerLoad?: number; // degrees per second at full load
  coolingPerSecond?: number; // degrees per second when idle
}

export class CPUSimulator {
  readonly cpu: CPUModel;
  private options: Required<SimulatorOptions>;
  private timers: { interval?: ReturnType<typeof setInterval> } = {};

  private tasks: TaskInstance[] = [];
  private threadLoad: Float32Array;
  private threadTemp: Float32Array;
  private threadThrottle: Uint8Array;

  private nextTaskId = 1;
  private startTime = 0;

  constructor(cpu: CPUModel, options: SimulatorOptions = {}) {
    this.cpu = cpu;
    this.options = {
      tickRateMs: options.tickRateMs ?? 16,
      heatRisePerLoad: options.heatRisePerLoad ?? 0.05,
      coolingPerSecond: options.coolingPerSecond ?? 0.1,
    };
    const threadCount = cpu.clusters.reduce((sum, c) => sum + c.cores * c.threadsPerCore, 0);
    this.threadLoad = new Float32Array(threadCount);
    this.threadTemp = new Float32Array(threadCount);
    this.threadThrottle = new Uint8Array(threadCount);
  }

  addTask(def: Omit<TaskInstance, 'id' | 'remainingMs' | 'status'>): TaskInstance {
    const task: TaskInstance = {
      ...def,
      id: this.nextTaskId++,
      remainingMs: def.durationMs,
      status: 'running',
    };
    this.tasks.push(task);
    return task;
  }

  getTasks() {
    return this.tasks;
  }

  pauseTask(id: number) {
    const t = this.tasks.find(t => t.id === id);
    if (t && t.status === 'running') t.status = 'paused';
  }

  resumeTask(id: number) {
    const t = this.tasks.find(t => t.id === id);
    if (t && t.status === 'paused') t.status = 'running';
  }

  cancelTask(id: number) {
    const t = this.tasks.find(t => t.id === id);
    if (t && t.status !== 'completed') {
      t.status = 'completed';
      t.assignedThreads = [];
      t.remainingMs = 0;
    }
  }

  start() {
    if (this.timers.interval) return;
    this.startTime = Date.now();
    this.timers.interval = setInterval(() => this.step(), this.options.tickRateMs);
  }

  stop() {
    if (this.timers.interval) clearInterval(this.timers.interval);
    this.timers.interval = undefined;
  }

  private step() {
    const now = Date.now();
    const elapsed = now - this.startTime;
    this.startTime = now;

    this.updateTasks(elapsed);
    this.updateThermals(elapsed);
  }

  private updateTasks(deltaMs: number) {
    for (const task of this.tasks) {
      if (task.status !== 'running') continue;
      const load = this.getIntensityLoad(task.intensity);
      const perThreadLoad = load / (task.assignedThreads.length || 1);
      for (const thread of task.assignedThreads) {
        this.threadLoad[thread] = Math.min(1, this.threadLoad[thread] + perThreadLoad);
      }
      task.remainingMs -= deltaMs;
      if (task.remainingMs <= 0) {
        task.status = 'completed';
        task.assignedThreads = [];
      }
    }
    // decay load
    for (let i = 0; i < this.threadLoad.length; i++) {
      this.threadLoad[i] *= 0.9;
    }
  }

  private updateThermals(deltaMs: number) {
    const seconds = deltaMs / 1000;
    const maxTemp = this.cpu.maxTemperatureC;
    const throttleTemp = this.cpu.throttleTemperatureC;

    for (let i = 0; i < this.threadLoad.length; i++) {
      const load = this.threadLoad[i];
      const rise = load * this.options.heatRisePerLoad * seconds;
      const cool = this.options.coolingPerSecond * seconds;
      this.threadTemp[i] = Math.max(0, this.threadTemp[i] + rise - cool);
      if (this.threadTemp[i] > maxTemp) {
        this.threadTemp[i] = maxTemp;
      }
      this.threadThrottle[i] = this.threadTemp[i] > throttleTemp ? 1 : 0;
    }
  }

  private getIntensityLoad(intensity: 'low' | 'medium' | 'high'): number {
    switch (intensity) {
      case 'low':
        return 0.25;
      case 'medium':
        return 0.5;
      case 'high':
        return 1.0;
    }
  }

  /** Getters for visualization */
  getLoads() {
    return this.threadLoad.slice();
  }

  getTemperatures() {
    return this.threadTemp.slice();
  }

  getThrottling() {
    return this.threadThrottle.slice();
  }

  getTaskMetrics() {
    return this.tasks.map(t => {
      const load = this.getIntensityLoad(t.intensity);
      const throttle = t.assignedThreads.some(i => this.threadThrottle[i]) ? 0.5 : 1;
      const ops = Math.round(100 * load * throttle);
      return { id: t.id, name: t.name, ops };
    });
  }
}
