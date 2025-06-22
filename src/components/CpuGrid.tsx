import { useCpuStore } from '../state/store'
import { CpuCoreBox } from './CpuCoreBox'

export function CpuGrid() {
  const threads = useCpuStore((s) => s.threads)
  return (
    <div className="flex flex-wrap justify-center p-4">
      {threads.map((t) => (
        <CpuCoreBox key={t.id} thread={t} />
      ))}
    </div>
  )
}
