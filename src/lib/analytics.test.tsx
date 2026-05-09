import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import type { ReactNode } from 'react'

const trackMock = vi.fn()
const posthogCaptureMock = vi.fn()

vi.mock('@plausible-analytics/tracker/plausible.js', () => ({
  track: (...args: unknown[]) => trackMock(...args),
}))

vi.mock('posthog-js/react', () => ({
  PostHogProvider: ({ children }: { children: ReactNode }) => children,
  usePostHog: () => ({ capture: posthogCaptureMock }),
}))

import { useAnalytics } from './analytics'

beforeEach(() => {
  trackMock.mockClear()
  posthogCaptureMock.mockClear()
})

describe('useAnalytics — Plausible payload', () => {
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
  it('trackCta forwards same event to PostHog with raw props', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackCta('github', 'about', 'https://github.com/GoPGP'))
    expect(posthogCaptureMock).toHaveBeenCalledWith('cta_clicked', {
      name: 'github',
      location: 'about',
      href: 'https://github.com/GoPGP',
    })
  })

  it('trackScrollDepth forwards numeric depth to PostHog (no string coercion)', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackScrollDepth(75))
    expect(posthogCaptureMock).toHaveBeenCalledWith('scroll_depth', { depth: 75 })
  })

  it('both trackers receive every event', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackSection('hero'))
    expect(trackMock).toHaveBeenCalledTimes(1)
    expect(posthogCaptureMock).toHaveBeenCalledTimes(1)
  })
})
