import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SettingsDrawer } from './SettingsDrawer'

describe('SettingsDrawer', () => {
  it('calls onClose when backdrop clicked', () => {
    const close = vi.fn()
    const { getByText } = render(<SettingsDrawer open onClose={close} />)
    fireEvent.click(getByText('Close'))
    expect(close).toHaveBeenCalled()
  })
})

