import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Header } from './components/Header'

describe('Header', () => {
  it('shows version', () => {
    render(<Header onCpuChange={() => {}} onSettings={() => {}} />)
    expect(screen.getByText(`v${import.meta.env.VITE_APP_VERSION}`)).toBeTruthy()
  })
})

