import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const initMock = vi.fn()
const captureMock = vi.fn()
const posthogStub = { init: initMock, capture: captureMock }

vi.mock('posthog-js', () => ({
  default: posthogStub,
}))

import { getPostHog, resetPostHogForTest } from './posthog'

const originalDnt = Object.getOwnPropertyDescriptor(Navigator.prototype, 'doNotTrack')

function setDnt(value: string | null) {
  Object.defineProperty(navigator, 'doNotTrack', {
    configurable: true,
    get: () => value,
  })
}

function setGpc(value: boolean | undefined) {
  if (value === undefined) {
    // @ts-expect-error globalPrivacyControl is non-standard
    delete navigator.globalPrivacyControl
    return
  }
  Object.defineProperty(navigator, 'globalPrivacyControl', {
    configurable: true,
    get: () => value,
  })
}

beforeEach(() => {
  initMock.mockClear()
  captureMock.mockClear()
  resetPostHogForTest()
  setDnt(null)
  setGpc(undefined)
})

afterEach(() => {
  if (originalDnt) Object.defineProperty(Navigator.prototype, 'doNotTrack', originalDnt)
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

  it('returns null when navigator.doNotTrack is "1" (DNT signal)', () => {
    setDnt('1')
    expect(getPostHog(true)).toBeNull()
    expect(initMock).not.toHaveBeenCalled()
  })

  it('returns null when navigator.globalPrivacyControl is true (Sec-GPC signal)', () => {
    setGpc(true)
    expect(getPostHog(true)).toBeNull()
    expect(initMock).not.toHaveBeenCalled()
  })

  it('still loads when DNT is "0" or unset', async () => {
    setDnt('0')
    const promise = getPostHog(true)
    expect(promise).not.toBeNull()
    await promise
    expect(initMock).toHaveBeenCalledTimes(1)
  })
})
