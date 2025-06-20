export type LoadProfile = 'AVX' | 'FP' | 'INT' | 'MIXED';
export type Intensity = 'low' | 'medium' | 'high';

export interface TaskDefinition {
  name: string;
  durationMs: number;
  loadProfile: LoadProfile;
  intensity: Intensity;
}

export interface TaskInstance extends TaskDefinition {
  id: number;
  remainingMs: number;
  assignedThreads: number[]; // indexes of threads
  status: 'queued' | 'running' | 'paused' | 'completed';
}
