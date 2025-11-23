import { useEffect, useRef } from 'react'
import { useAnalytics, type SectionName } from '@/lib/analytics'

export function useSectionView<T extends Element = HTMLElement>(section: SectionName) {
  const ref = useRef<T | null>(null)
  const { trackSection } = useAnalytics()
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true
            trackSection(section)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [section, trackSection])

  return ref
}
