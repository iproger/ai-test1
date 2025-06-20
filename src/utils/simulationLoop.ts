import state, { step } from '../state/store';

export function startLoop(callback: () => void) {
  function tick() {
    step();
    callback();
    setTimeout(tick, 1000);
  }
  tick();
}
