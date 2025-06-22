import { SchedulerAgent } from '../agents/SchedulerAgent'
import { ThermalAgent } from '../agents/ThermalAgent'

const scheduler = new SchedulerAgent()
const thermal = new ThermalAgent()

let last = performance.now()
function loop() {
  const now = performance.now()
  const dt = (now - last) / 1000
  last = now
  scheduler.tick(dt)
  thermal.cool(dt)
  requestAnimationFrame(loop)
}

export function startSimulation() {
  requestAnimationFrame(loop)
}

export { scheduler }
