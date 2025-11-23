import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { PostHogProvider } from 'posthog-js/react'
import './index.css'
import { router } from '@/lib/router'
import { checkAnalyticsEnv } from '@/lib/checkAnalyticsEnv'

const posthogKey = import.meta.env.VITE_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_POSTHOG_HOST ?? 'https://eu.i.posthog.com'

checkAnalyticsEnv({ key: posthogKey, dev: import.meta.env.DEV }, console.warn)

const tree = <RouterProvider router={router} />

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {posthogKey ? (
      <PostHogProvider
        apiKey={posthogKey}
        options={{
          api_host: posthogHost,
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
