import type posthogJs from 'posthog-js'

const POSTHOG_KEY = 'phc_tXvgPJu5GNjuTNxpbx9puZV568wjxwHDpvaxK58enrPE'
const POSTHOG_HOST = 'https://eu.i.posthog.com'

let cached: Promise<typeof posthogJs> | null = null

export function getPostHog(
  enabled: boolean = import.meta.env.PROD,
): Promise<typeof posthogJs> | null {
  if (!enabled) return null
  if (!cached) {
    cached = import('posthog-js').then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: 'history_change',
        capture_pageleave: true,
        defaults: '2025-05-24',
        persistence: 'memory',
        autocapture: false,
        respect_dnt: true,
        disable_session_recording: true,
      })
      return posthog
    })
  }
  return cached
}

export function resetPostHogForTest(): void {
  cached = null
}
