import { CoreState } from './CoreAgent';

export function updateThermals(cores: CoreState[]) {
  cores.forEach((core) => {
    core.temperature = 40 + core.load * 0.6;
  });
}
