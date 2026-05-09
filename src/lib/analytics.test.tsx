import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

const trackMock = vi.fn()
const posthogCaptureMock = vi.fn()
const getPostHogMock = vi.fn()

vi.mock('@plausible-analytics/tracker/plausible.js', () => ({
  track: (...args: unknown[]) => trackMock(...args),
}))

vi.mock('./posthog', () => ({
  getPostHog: (...args: unknown[]) => getPostHogMock(...args),
}))

import { useAnalytics } from './analytics'

beforeEach(() => {
  trackMock.mockClear()
  posthogCaptureMock.mockClear()
  getPostHogMock.mockReset()
})

describe('useAnalytics — Plausible payload', () => {
  beforeEach(() => {
    getPostHogMock.mockReturnValue(null)
  })

  it('trackCta sends cta_clicked with name, location, href', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackCta('app_store', 'hero', '#download'))
    expect(trackMock).toHaveBeenCalledWith('cta_clicked', {
      props: { name: 'app_store', location: 'hero', href: '#download' },
    })
  })

  it('trackOutbound parses domain from href', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() =>
      result.current.trackOutbound('https://bright-eu.com/page', 'BRIGHT EUROPE', 'about'),
    )
    expect(trackMock).toHaveBeenCalledWith('outbound_clicked', {
      props: {
        domain: 'bright-eu.com',
        href: 'https://bright-eu.com/page',
        text: 'BRIGHT EUROPE',
        location: 'about',
      },
    })
  })

  it('trackOutbound falls back to raw href on parse failure', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackOutbound('not-a-url', 'broken', 'footer'))
    expect(trackMock).toHaveBeenCalledWith('outbound_clicked', {
      props: {
        domain: 'not-a-url',
        href: 'not-a-url',
        text: 'broken',
        location: 'footer',
      },
    })
  })

  it('trackNav sends target/location/from', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackNav('engine', 'header', '/'))
    expect(trackMock).toHaveBeenCalledWith('nav_link_clicked', {
      props: { target: 'engine', location: 'header', from: '/' },
    })
  })

  it('trackMenu sends mobile_menu_toggled with state', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackMenu('opened'))
    act(() => result.current.trackMenu('closed'))
    expect(trackMock).toHaveBeenNthCalledWith(1, 'mobile_menu_toggled', {
      props: { state: 'opened' },
    })
    expect(trackMock).toHaveBeenNthCalledWith(2, 'mobile_menu_toggled', {
      props: { state: 'closed' },
    })
  })

  it('trackContact sends contact_clicked with location', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackContact('about'))
    expect(trackMock).toHaveBeenCalledWith('contact_clicked', {
      props: { location: 'about' },
    })
  })

  it('trackSection sends section_viewed', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackSection('hero'))
    expect(trackMock).toHaveBeenCalledWith('section_viewed', {
      props: { section: 'hero' },
    })
  })

  it('trackScrollDepth coerces depth to string', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackScrollDepth(50))
    expect(trackMock).toHaveBeenCalledWith('scroll_depth', {
      props: { depth: '50' },
    })
  })
})

describe('useAnalytics — PostHog dual-tracking', () => {
  it('forwards to PostHog asynchronously after the SDK promise resolves', async () => {
    getPostHogMock.mockReturnValue(
      Promise.resolve({ capture: posthogCaptureMock }),
    )
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackCta('github', 'about', 'https://github.com/GoPGP'))
    await Promise.resolve()
    await Promise.resolve()
    expect(posthogCaptureMock).toHaveBeenCalledWith('cta_clicked', {
      name: 'github',
      location: 'about',
      href: 'https://github.com/GoPGP',
    })
  })

  it('forwards numeric depth to PostHog without string coercion', async () => {
    getPostHogMock.mockReturnValue(
      Promise.resolve({ capture: posthogCaptureMock }),
    )
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackScrollDepth(75))
    await Promise.resolve()
    await Promise.resolve()
    expect(posthogCaptureMock).toHaveBeenCalledWith('scroll_depth', { depth: 75 })
  })

  it('skips PostHog entirely when getPostHog returns null (dev mode)', async () => {
    getPostHogMock.mockReturnValue(null)
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackSection('hero'))
    await Promise.resolve()
    await Promise.resolve()
    expect(posthogCaptureMock).not.toHaveBeenCalled()
    expect(trackMock).toHaveBeenCalledTimes(1)
  })

  it('swallows posthog SDK load errors without affecting Plausible', async () => {
    getPostHogMock.mockReturnValue(Promise.reject(new Error('network down')))
    const { result } = renderHook(() => useAnalytics())
    expect(() =>
      act(() => result.current.trackContact('about')),
    ).not.toThrow()
    await Promise.resolve()
    await Promise.resolve()
    expect(trackMock).toHaveBeenCalledTimes(1)
  })
})
