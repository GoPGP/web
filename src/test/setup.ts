import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

vi.mock('@plausible-analytics/tracker/plausible.js', () => ({
  init: vi.fn(),
  track: vi.fn(),
}))

afterEach(() => {
  cleanup()
})
