export interface CpuCluster {
  name: string
  cores: number
  threadsPerCore: number
}

export interface CpuModel {
  name: string
  clusters: CpuCluster[]
}
