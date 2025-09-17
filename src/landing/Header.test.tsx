import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from './Header'

type IOEntry = Pick<IntersectionObserverEntry, 'isIntersecting' | 'target' | 'intersectionRatio'>

interface IOInstance {
  callback: IntersectionObserverCallback
  observed: Element[]
  trigger: (entries: IOEntry[]) => void
}

function installIntersectionObserverMock() {
  const instances: IOInstance[] = []

  class MockIO {
    private cb: IntersectionObserverCallback
    private observed: Element[] = []

    constructor(cb: IntersectionObserverCallback) {
      this.cb = cb
      const inst: IOInstance = {
        callback: cb,
        observed: this.observed,
        trigger: (entries) => {
          act(() => {
            this.cb(entries as IntersectionObserverEntry[], this as unknown as IntersectionObserver)
          })
        },
      }
      instances.push(inst)
    }
    observe(el: Element) { this.observed.push(el) }
    unobserve(el: Element) {
      const i = this.observed.indexOf(el)
      if (i >= 0) this.observed.splice(i, 1)
    }
    disconnect() { this.observed.length = 0 }
    takeRecords() { return [] }
    root = null
    rootMargin = ''
    thresholds = []
  }

  const original = (globalThis as { IntersectionObserver?: typeof IntersectionObserver }).IntersectionObserver
  ;(globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver =
    MockIO as unknown as typeof IntersectionObserver

  return {
    instances,
    restore() {
      ;(globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver | undefined }).IntersectionObserver = original
    },
  }
}

function makeEntry(target: Element, isIntersecting: boolean): IOEntry {
  return { isIntersecting, target, intersectionRatio: isIntersecting ? 1 : 0 }
}

describe('Header', () => {
  it('renders all 4 nav links with anchor hrefs', () => {
    render(<Header />)
    const expected = [
      ['Engine', '#engine'],
      ['iOS', '#ios'],
      ['Open Source', '#open-source'],
      ['Download', '#download'],
    ]
    for (const [label, href] of expected) {
      const link = screen.getAllByRole('link', { name: label })[0]
      expect(link).toHaveAttribute('href', href)
    }
  })

  it('logo links to home', () => {
    render(<Header />)
    const logo = screen.getByRole('link', { name: /goPGP/i })
    expect(logo).toHaveAttribute('href', '#')
  })

  it('mobile menu toggles open then closed', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })

    expect(screen.queryAllByRole('link', { name: 'Engine' })).toHaveLength(1)

    await user.click(toggle)
    expect(screen.getAllByRole('link', { name: 'Engine' }).length).toBeGreaterThan(1)

    await user.click(toggle)
    expect(screen.queryAllByRole('link', { name: 'Engine' })).toHaveLength(1)
  })

  it('clicking a mobile menu link closes the menu', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })

    await user.click(toggle)
    const mobileLinks = screen.getAllByRole('link', { name: 'Engine' })
    expect(mobileLinks.length).toBeGreaterThan(1)

    await user.click(mobileLinks[mobileLinks.length - 1])
    expect(screen.queryAllByRole('link', { name: 'Engine' })).toHaveLength(1)
  })

  // Section-aware polarity. Header must contrast with the section currently
  // behind it: light backdrop + dark text over a dark section, dark backdrop +
  // light text over a light section. Polarity reflects the *visual* color in
  // the active theme — declared per-mode via data-bg-light / data-bg-dark.
  describe('polarity tracks the section currently behind the header', () => {
    let mock: ReturnType<typeof installIntersectionObserverMock>

    beforeEach(() => {
      document.documentElement.classList.remove('dark')
      mock = installIntersectionObserverMock()
    })

    afterEach(() => {
      mock.restore()
      document.documentElement.classList.remove('dark')
      vi.restoreAllMocks()
    })

    it('uses light backdrop and dark text when a dark section is active', () => {
      const section = document.createElement('section')
      section.setAttribute('data-bg-light', 'dark')
      section.setAttribute('data-bg-dark', 'dark')
      document.body.appendChild(section)

      const { container } = render(<Header />)

      mock.instances[0].trigger([makeEntry(section, true)])

      const header = container.querySelector('header')!
      expect(header.className).toMatch(/\bbg-white(\/\d{1,3})?\b/)
      expect(header.className).toContain('backdrop-blur')

      const logo = container.querySelector('header a[href="#"] span')!
      expect(logo.className).toContain('text-stone-900')
      expect(logo.className).not.toContain('text-stone-50')

      const navLink = container.querySelector('header nav a')!
      expect(navLink.className).toContain('text-stone-600')

      document.body.removeChild(section)
    })

    it('uses dark backdrop and light text when a light section is active', () => {
      const section = document.createElement('section')
      section.setAttribute('data-bg-light', 'light')
      section.setAttribute('data-bg-dark', 'dark')
      document.body.appendChild(section)

      const { container } = render(<Header />)

      mock.instances[0].trigger([makeEntry(section, true)])

      const header = container.querySelector('header')!
      expect(header.className).toMatch(/\bbg-stone-950(\/\d{1,3})?\b/)
      expect(header.className).toContain('backdrop-blur')

      const logo = container.querySelector('header a[href="#"] span')!
      expect(logo.className).toMatch(/text-stone-(50|100)/)
      expect(logo.className).not.toContain('text-stone-900')

      const navLink = container.querySelector('header nav a')!
      expect(navLink.className).toMatch(/text-(white|stone-(100|200|300))/)

      document.body.removeChild(section)
    })

    it('flips polarity when the html.dark class is toggled', async () => {
      const section = document.createElement('section')
      section.setAttribute('data-bg-light', 'light')
      section.setAttribute('data-bg-dark', 'dark')
      document.body.appendChild(section)

      const { container } = render(<Header />)

      mock.instances[0].trigger([makeEntry(section, true)])

      const logoLightMode = container.querySelector('header a[href="#"] span')!
      expect(logoLightMode.className).toMatch(/text-stone-(50|100)/)

      await act(async () => {
        document.documentElement.classList.add('dark')
        await Promise.resolve()
      })

      const header = container.querySelector('header')!
      expect(header.className).toMatch(/\bbg-white(\/\d{1,3})?\b/)
      const logoDarkMode = container.querySelector('header a[href="#"] span')!
      expect(logoDarkMode.className).toContain('text-stone-900')

      document.body.removeChild(section)
    })

    it('defaults to light header (assumes dark section behind) before observer fires', () => {
      const { container } = render(<Header />)
      const header = container.querySelector('header')!
      expect(header.className).toMatch(/\bbg-white(\/\d{1,3})?\b/)
      const logo = container.querySelector('header a[href="#"] span')!
      expect(logo.className).toContain('text-stone-900')
    })

    it('does not render the dark stone-950 gradient overlay (regression guard)', () => {
      const { container } = render(<Header />)
      const header = container.querySelector('header')!
      expect(header.innerHTML).not.toMatch(/from-stone-950/)
    })
  })
})
