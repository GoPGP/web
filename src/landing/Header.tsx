import { useState, useEffect, useRef } from 'react'
import { Menu, X, Shield } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'

const navLinks = [
  { label: 'Engine', href: '#engine', target: 'engine' },
  { label: 'iOS', href: '#ios', target: 'ios' },
  { label: 'Open Source', href: '#open-source', target: 'open_source' },
  { label: 'Download', href: '#download', target: 'download' },
]

const currentPath = () =>
  typeof window !== 'undefined' ? window.location.pathname : '/'

type Polarity = 'dark' | 'light'

const isDarkMode = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

const polarityFor = (el: Element): Polarity => {
  const attr = isDarkMode() ? 'data-bg-dark' : 'data-bg-light'
  return (el.getAttribute(attr) as Polarity | null) ?? 'dark'
}

export function Header() {
  // Default to a dark section assumption — Hero (the first section) is always
  // dark, so the header initializes to its light-backdrop polarity. This
  // avoids a flash of wrong colors before the observer fires.
  const [activeBg, setActiveBg] = useState<Polarity>('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const activeRef = useRef<Element | null>(null)
  const { trackNav, trackMenu } = useAnalytics()

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    trackMenu(next ? 'opened' : 'closed')
  }

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-bg-light], [data-bg-dark]'),
    )
    if (sections.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeRef.current = entry.target
            setActiveBg(polarityFor(entry.target))
          }
        }
      },
      { rootMargin: '-64px 0px -85% 0px', threshold: 0 },
    )

    for (const s of sections) io.observe(s)

    const themeObserver = new MutationObserver(() => {
      if (activeRef.current) setActiveBg(polarityFor(activeRef.current))
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      io.disconnect()
      themeObserver.disconnect()
    }
  }, [])

  // activeBg describes the section behind the header. The header inverts:
  // dark section → light header; light section → dark header.
  const isLightHeader = activeBg === 'dark'

  const cls = isLightHeader
    ? {
        header: 'bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-sm',
        logo: 'text-stone-900',
        shield: 'text-emerald-600',
        nav: 'text-stone-600 hover:text-stone-900',
        hamburger: 'text-stone-600 hover:text-stone-900',
        mobileMenu: 'bg-white/95 border-stone-200',
        mobileLink: 'text-stone-600 hover:text-stone-900',
      }
    : {
        header: 'bg-stone-950/90 backdrop-blur-md border-b border-stone-100/10 shadow-sm',
        logo: 'text-stone-50',
        shield: 'text-emerald-400',
        nav: 'text-stone-300 hover:text-white',
        hamburger: 'text-stone-300 hover:text-white',
        mobileMenu: 'bg-stone-950/95 border-stone-800',
        mobileLink: 'text-stone-300 hover:text-white',
      }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${cls.header}`}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            onClick={() => trackNav('top', 'header', currentPath())}
            className="flex items-center gap-2 group"
          >
            <Shield className={`w-6 h-6 transition-transform group-hover:scale-110 ${cls.shield}`} />
            <span className={`text-lg font-bold ${cls.logo}`}>
              goPGP
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => trackNav(link.target, 'header', currentPath())}
                className={`text-sm font-medium transition-colors ${cls.nav}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              className={`p-2 transition-colors ${cls.hamburger}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className={`md:hidden backdrop-blur-md border-t ${cls.mobileMenu}`}>
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${cls.mobileLink}`}
                onClick={() => {
                  trackNav(link.target, 'menu', currentPath())
                  setMenuOpen(false)
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
