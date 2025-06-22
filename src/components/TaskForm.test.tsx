import { render } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { TaskForm } from './TaskForm'
import { useCpuStore } from '../state/store'

describe('TaskForm', () => {
  beforeEach(() => {
    useCpuStore.setState({ threads: [] })
  })
  it.skip('renders button', () => {
    const { getByText } = render(<TaskForm />)
    expect(getByText('Add Task')).toBeTruthy()
  })
})

