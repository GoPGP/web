import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { init } from '@plausible-analytics/tracker/plausible.js'
import { PostHogProvider } from 'posthog-js/react'
import './index.css'
import { router } from '@/lib/router'

const POSTHOG_KEY = 'phc_tXvgPJu5GNjuTNxpbx9puZV568wjxwHDpvaxK58enrPE'
const POSTHOG_HOST = 'https://eu.i.posthog.com'

init({
  domain: 'gopgp.org',
  autoCapturePageviews: true,
  outboundLinks: false,
})

const tree = <RouterProvider router={router} />

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {import.meta.env.PROD ? (
      <PostHogProvider
        apiKey={POSTHOG_KEY}
        options={{
          api_host: POSTHOG_HOST,
          capture_pageview: 'history_change',
          capture_pageleave: true,
          defaults: '2025-05-24',
          persistence: 'memory',
          autocapture: false,
          respect_dnt: true,
          disable_session_recording: true,
        }}
      >
        {tree}
      </PostHogProvider>
    ) : (
      tree
    )}
  </StrictMode>,
)
