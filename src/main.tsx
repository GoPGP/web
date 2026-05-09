import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { init } from '@plausible-analytics/tracker/plausible.js'
import './index.css'
import { router } from '@/lib/router'

init({
  domain: 'gopgp.org',
  autoCapturePageviews: true,
  outboundLinks: false,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
