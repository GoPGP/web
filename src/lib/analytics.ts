import { useCallback } from 'react'
import { track } from '@plausible-analytics/tracker/plausible.js'
import { getPostHog } from './posthog'

export type CtaName = 'app_store' | 'github'
export type SectionName = 'hero' | 'engine' | 'ios' | 'open_source' | 'about' | 'footer'
export type CtaLocation = 'hero' | 'ios' | 'open_source' | 'about' | 'footer'
export type NavLocation = 'header' | 'footer' | 'menu'
export type OutboundLocation = 'about' | 'footer' | 'support'
export type ContactLocation = 'about' | 'privacy' | 'support'
export type ScrollDepth = 25 | 50 | 75 | 100

type Props = Record<string, string | number>

function capture(event: string, props?: Props) {
  if (props) {
    const stringProps: Record<string, string> = {}
    for (const [k, v] of Object.entries(props)) stringProps[k] = String(v)
    track(event, { props: stringProps })
  } else {
    track(event, {})
  }

  const posthogPromise = getPostHog()
  if (posthogPromise) {
    posthogPromise.then((ph) => ph.capture(event, props)).catch(() => {})
  }
}

export function useAnalytics() {
  const trackCta = useCallback(
    (name: CtaName, location: CtaLocation, href: string) =>
      capture('cta_clicked', { name, location, href }),
    [],
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
    [],
  )

  const trackNav = useCallback(
    (target: string, location: NavLocation, from: string) =>
      capture('nav_link_clicked', { target, location, from }),
    [],
  )

  const trackMenu = useCallback(
    (state: 'opened' | 'closed') => capture('mobile_menu_toggled', { state }),
    [],
  )

  const trackContact = useCallback(
    (location: ContactLocation) => capture('contact_clicked', { location }),
    [],
  )

  const trackSection = useCallback(
    (section: SectionName) => capture('section_viewed', { section }),
    [],
  )

  const trackScrollDepth = useCallback(
    (depth: ScrollDepth) => capture('scroll_depth', { depth }),
    [],
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
