import { useCallback } from 'react'
import { usePostHog } from 'posthog-js/react'

export type CtaName = 'app_store' | 'github'
export type SectionName = 'hero' | 'engine' | 'ios' | 'open_source' | 'about' | 'footer'
export type CtaLocation = 'hero' | 'ios' | 'open_source' | 'about' | 'footer'
export type NavLocation = 'header' | 'footer' | 'menu'
export type OutboundLocation = 'about' | 'footer' | 'support'
export type ContactLocation = 'about' | 'privacy' | 'support'
export type ScrollDepth = 25 | 50 | 75 | 100

export function useAnalytics() {
  const posthog = usePostHog()

  const capture = useCallback(
    (event: string, props?: Record<string, unknown>) => {
      posthog?.capture(event, props)
    },
    [posthog],
  )

  const trackCta = useCallback(
    (name: CtaName, location: CtaLocation, href: string) =>
      capture('cta_clicked', { name, location, href }),
    [capture],
  )

  const trackOutbound = useCallback(
    (href: string, text: string, location: OutboundLocation) => {
      let domain = href
      try {
        domain = new URL(href).hostname
      } catch {
        // keep raw href if URL parsing fails
      }
      capture('outbound_clicked', { domain, href, text, location })
    },
    [capture],
  )

  const trackNav = useCallback(
    (target: string, location: NavLocation, from: string) =>
      capture('nav_link_clicked', { target, location, from }),
    [capture],
  )

  const trackMenu = useCallback(
    (state: 'opened' | 'closed') => capture('mobile_menu_toggled', { state }),
    [capture],
  )

  const trackContact = useCallback(
    (location: ContactLocation) => capture('contact_clicked', { location }),
    [capture],
  )

  const trackSection = useCallback(
    (section: SectionName) => capture('section_viewed', { section }),
    [capture],
  )

  const trackScrollDepth = useCallback(
    (depth: ScrollDepth) => capture('scroll_depth', { depth }),
    [capture],
  )

  return {
    trackCta,
    trackOutbound,
    trackNav,
    trackMenu,
    trackContact,
    trackSection,
    trackScrollDepth,
  }
}
