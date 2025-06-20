export { default as amd } from './cpuModels/amd.json';
export { default as apple } from './cpuModels/apple.json';
export { default as intel } from './cpuModels/intel.json';
export { default as snapdragon } from './cpuModels/snapdragon.json';
export type CpuModel = typeof amd;
export const models = { amd, apple, intel, snapdragon };
export const modelList = Object.values(models);
