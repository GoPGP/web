import { createBrowserRouter } from 'react-router-dom'
import { LandingPage } from '@/landing/LandingPage'
import { PrivacyPolicy } from '@/landing/PrivacyPolicy'
import { Support } from '@/landing/Support'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/privacy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/support',
    element: <Support />,
  },
])
