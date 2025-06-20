export interface CPUCluster {
  name: string;
  cores: number;
  threadsPerCore: number;
  baseFrequencyGHz: number;
  maxFrequencyGHz: number;
  l1CacheKB: number;
  l2CacheKB: number;
  l3CacheKB?: number;
  avx: boolean;
  efficiency?: boolean;
}

export interface CPUModel {
  name: string;
  brand: string;
  releaseYear: number;
  clusters: CPUCluster[];
  maxTemperatureC: number;
  throttleTemperatureC: number;
}
