import { describe, it, expect, vi } from 'vitest'
import { checkAnalyticsEnv } from './checkAnalyticsEnv'

describe('checkAnalyticsEnv', () => {
  it('warns in dev when key missing', () => {
    const warn = vi.fn()
    checkAnalyticsEnv({ key: undefined, dev: true }, warn)
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn.mock.calls[0][0]).toMatch(/VITE_POSTHOG_KEY/)
  })

  it('warns in dev when key empty', () => {
    const warn = vi.fn()
    checkAnalyticsEnv({ key: '', dev: true }, warn)
    expect(warn).toHaveBeenCalledTimes(1)
  })

  it('does not warn in dev when key present', () => {
    const warn = vi.fn()
    checkAnalyticsEnv({ key: 'phc_abc', dev: true }, warn)
    expect(warn).not.toHaveBeenCalled()
  })

  it('does not warn in production when key missing', () => {
    const warn = vi.fn()
    checkAnalyticsEnv({ key: undefined, dev: false }, warn)
    expect(warn).not.toHaveBeenCalled()
  })
})
