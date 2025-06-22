import { useCpuStore } from '../state/store'

export class ThermalAgent {
  cool(dt: number) {
    const { threads, setThread } = useCpuStore.getState()
    threads.forEach((t) => {
      const temp = Math.max(20, t.temperature - dt * 5)
      setThread(t.id, { temperature: temp, throttled: temp > 90 })
    })
  }
}
