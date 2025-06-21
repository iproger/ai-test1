import { useEffect, useRef } from 'react'
import type { ThreadState } from '../state/store'

interface Props {
  thread: ThreadState
}

export function CpuCoreBox({ thread }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const historyRef = useRef<number[]>(new Array(30).fill(0))

  useEffect(() => {
    const history = historyRef.current
    history.push(thread.load)
    if (history.length > 30) history.shift()
    const canvas = canvasRef.current
    if (!canvas) return
    let ctx: CanvasRenderingContext2D | null = null
    try {
      ctx = canvas.getContext('2d')
    } catch {
      return
    }
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const barWidth = 2
    const gap = 1
    history.forEach((value, idx) => {
      const x = canvas.width - (idx + 1) * (barWidth + gap)
      const h = value * canvas.height
      ctx.fillStyle = '#3b82f6'
      ctx.fillRect(x, canvas.height - h, barWidth, h)
    })
  }, [thread.load])

  const color = thread.throttled
    ? 'border-red-500'
    : thread.temperature > 70
    ? 'border-orange-500'
    : 'border-green-500'

  return (
    <div
      className={`w-12 h-20 border ${color} m-2 relative`}
      title={`Core ${thread.id}\nUtilization: ${(thread.load * 100).toFixed(0)}%`}
    >
      <canvas
        ref={canvasRef}
        width={50}
        height={80}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
