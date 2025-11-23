import { useEffect, useRef } from 'react'
import { useAnalytics, type ScrollDepth } from '@/lib/analytics'

const THRESHOLDS: ScrollDepth[] = [25, 50, 75, 100]

export function useScrollDepth() {
  const { trackScrollDepth } = useAnalytics()
  const fired = useRef<Set<ScrollDepth>>(new Set())
  const ticking = useRef(false)

  useEffect(() => {
    const compute = () => {
      ticking.current = false
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      if (scrollable <= 0) {
        // page shorter than viewport — treat as 100% on first scroll attempt
        for (const t of THRESHOLDS) {
          if (!fired.current.has(t)) {
            fired.current.add(t)
            trackScrollDepth(t)
          }
        }
        return
      }
      const pct = (window.scrollY / scrollable) * 100
      for (const t of THRESHOLDS) {
        if (pct >= t && !fired.current.has(t)) {
          fired.current.add(t)
          trackScrollDepth(t)
        }
      }
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(compute)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // capture initial state in case page loads scrolled (anchor link, refresh)
    compute()
    return () => window.removeEventListener('scroll', onScroll)
  }, [trackScrollDepth])
}
