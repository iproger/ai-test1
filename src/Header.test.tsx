import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Header } from './components/Header'
import { BUILD_NUMBER } from './build'

describe('Header', () => {
  it('shows build number', () => {
    render(<Header onCpuChange={() => {}} onSettings={() => {}} />)
    expect(screen.getByText(`Build ${BUILD_NUMBER}`)).toBeTruthy()
  })
})
