import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

vi.mock('@plausible-analytics/tracker/plausible.js', () => ({
  init: vi.fn(),
  track: vi.fn(),
}))

vi.mock('posthog-js/react', () => ({
  PostHogProvider: ({ children }: { children: React.ReactNode }) => children,
  usePostHog: () => undefined,
}))

afterEach(() => {
  cleanup()
})
