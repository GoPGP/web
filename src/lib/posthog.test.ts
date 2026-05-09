import { describe, it, expect, vi, beforeEach } from 'vitest'

const initMock = vi.fn()
const captureMock = vi.fn()
const posthogStub = { init: initMock, capture: captureMock }

vi.mock('posthog-js', () => ({
  default: posthogStub,
}))

import { getPostHog, resetPostHogForTest } from './posthog'

beforeEach(() => {
  initMock.mockClear()
  captureMock.mockClear()
  resetPostHogForTest()
})

describe('getPostHog', () => {
  it('returns null when disabled', () => {
    expect(getPostHog(false)).toBeNull()
    expect(initMock).not.toHaveBeenCalled()
  })

  it('returns a promise resolving to the posthog SDK when enabled', async () => {
    const promise = getPostHog(true)
    expect(promise).not.toBeNull()
    const ph = await promise!
    expect(ph).toBe(posthogStub)
  })

  it('calls posthog.init once with the hardcoded EU key and host', async () => {
    await getPostHog(true)
    await getPostHog(true)
    expect(initMock).toHaveBeenCalledTimes(1)
    const [key, options] = initMock.mock.calls[0]
    expect(key).toBe('phc_tXvgPJu5GNjuTNxpbx9puZV568wjxwHDpvaxK58enrPE')
    expect(options.api_host).toBe('https://eu.i.posthog.com')
    expect(options.persistence).toBe('memory')
    expect(options.respect_dnt).toBe(true)
    expect(options.autocapture).toBe(false)
    expect(options.disable_session_recording).toBe(true)
  })

  it('reuses the same promise across repeated enabled calls', () => {
    const a = getPostHog(true)
    const b = getPostHog(true)
    expect(a).toBe(b)
  })

  it('returns null even after a prior enabled call when later called with disabled', async () => {
    await getPostHog(true)
    expect(getPostHog(false)).toBeNull()
  })
})
