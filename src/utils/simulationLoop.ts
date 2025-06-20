import { useAppStore } from '../state/store';

export function startSimulation() {
  setInterval(() => {
    useAppStore.getState().tick();
  }, 100);
}
