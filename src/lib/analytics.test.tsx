import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

const captureMock = vi.fn()

vi.mock('posthog-js/react', () => ({
  usePostHog: () => ({ capture: captureMock }),
}))

import { useAnalytics } from './analytics'

beforeEach(() => {
  captureMock.mockClear()
})

describe('useAnalytics', () => {
  it('trackCta sends cta_clicked with name, location, href', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackCta('app_store', 'hero', '#download'))
    expect(captureMock).toHaveBeenCalledWith('cta_clicked', {
      name: 'app_store',
      location: 'hero',
      href: '#download',
    })
  })

  it('trackOutbound parses domain from href', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() =>
      result.current.trackOutbound('https://bright-eu.com/page', 'BRIGHT EUROPE', 'about'),
    )
    expect(captureMock).toHaveBeenCalledWith('outbound_clicked', {
      domain: 'bright-eu.com',
      href: 'https://bright-eu.com/page',
      text: 'BRIGHT EUROPE',
      location: 'about',
    })
  })

  it('trackOutbound falls back to raw href on parse failure', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackOutbound('not-a-url', 'broken', 'footer'))
    expect(captureMock).toHaveBeenCalledWith('outbound_clicked', {
      domain: 'not-a-url',
      href: 'not-a-url',
      text: 'broken',
      location: 'footer',
    })
  })

  it('trackNav sends target/location/from', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackNav('engine', 'header', '/'))
    expect(captureMock).toHaveBeenCalledWith('nav_link_clicked', {
      target: 'engine',
      location: 'header',
      from: '/',
    })
  })

  it('trackMenu sends mobile_menu_toggled with state', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackMenu('opened'))
    act(() => result.current.trackMenu('closed'))
    expect(captureMock).toHaveBeenNthCalledWith(1, 'mobile_menu_toggled', { state: 'opened' })
    expect(captureMock).toHaveBeenNthCalledWith(2, 'mobile_menu_toggled', { state: 'closed' })
  })

  it('trackContact sends contact_clicked with location', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackContact('about'))
    expect(captureMock).toHaveBeenCalledWith('contact_clicked', { location: 'about' })
  })

  it('trackSection sends section_viewed', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackSection('hero'))
    expect(captureMock).toHaveBeenCalledWith('section_viewed', { section: 'hero' })
  })

  it('trackScrollDepth sends scroll_depth with depth', () => {
    const { result } = renderHook(() => useAnalytics())
    act(() => result.current.trackScrollDepth(50))
    expect(captureMock).toHaveBeenCalledWith('scroll_depth', { depth: 50 })
  })
})

describe('useAnalytics without provider', () => {
  it('no-ops when usePostHog returns undefined', async () => {
    vi.resetModules()
    vi.doMock('posthog-js/react', () => ({
      usePostHog: () => undefined,
    }))
    const { useAnalytics: useAnalyticsNoProvider } = await import('./analytics')
    const { result } = renderHook(() => useAnalyticsNoProvider())
    expect(() => act(() => result.current.trackCta('github', 'hero', '#'))).not.toThrow()
  })
})
