import type { ThreadState } from '../state/store'

interface Props {
  thread: ThreadState
}

export function CpuCoreBox({ thread }: Props) {
  const color = thread.throttled
    ? 'border-red-500'
    : thread.temperature > 70
    ? 'border-orange-500'
    : 'border-green-500'
  return (
    <div className={`w-12 h-20 border-2 ${color} m-2 flex items-end`}>
      <div
        className="bg-blue-500 w-full"
        style={{ height: `${thread.load * 100}%` }}
      />
    </div>
  )
}
