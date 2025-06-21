import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CpuCoreBox } from './CpuCoreBox'
import type { ThreadState } from '../state/store'

describe('CpuCoreBox', () => {
  it('renders temperature color', () => {
    const thread: ThreadState = { id: 1, load: 0.5, temperature: 80, throttled: false }
    const { container } = render(<CpuCoreBox thread={thread} />)
    expect((container.firstChild as HTMLElement).className).toContain('border-orange-500')
  })
})

