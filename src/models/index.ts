import amdModel from './cpuModels/amd.json';
import appleModel from './cpuModels/apple.json';
import intelModel from './cpuModels/intel.json';
import snapdragonModel from './cpuModels/snapdragon.json';

export type CpuModel = typeof amdModel;

export const models = {
  amd: amdModel,
  apple: appleModel,
  intel: intelModel,
  snapdragon: snapdragonModel,
};

export const modelList = Object.values(models);
