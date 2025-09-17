import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders the current year in copyright', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(`${year}\\s*BRIGHT EUROPE`))).toBeInTheDocument()
  })

  it('Support link uses a valid mailto URI', () => {
    render(<Footer />)
    const support = screen.getByRole('link', { name: /support/i })
    const href = support.getAttribute('href') ?? ''
    expect(href).toMatch(/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/)
  })

  it('GitHub link points to github.com', () => {
    render(<Footer />)
    const github = screen.getByRole('link', { name: /github/i })
    expect(github).toHaveAttribute('href', expect.stringMatching(/^https:\/\/github\.com\//))
  })

  it('all external links open in a new tab with safe rel attrs', () => {
    render(<Footer />)
    const externals = screen
      .getAllByRole('link')
      .filter((a) => (a.getAttribute('href') ?? '').startsWith('http'))
    expect(externals.length).toBeGreaterThan(0)
    for (const a of externals) {
      expect(a).toHaveAttribute('target', '_blank')
      const rel = a.getAttribute('rel') ?? ''
      expect(rel).toContain('noopener')
      expect(rel).toContain('noreferrer')
    }
  })

  it('renders product nav links pointing to in-page anchors', () => {
    render(<Footer />)
    for (const [label, href] of [
      ['Engine', '#engine'],
      ['iOS', '#ios'],
      ['Download', '#download'],
    ] as const) {
      const link = screen.getByRole('link', { name: label })
      expect(link).toHaveAttribute('href', href)
    }
  })

  // The About section above the Footer uses bg-stone-50 (light). The Footer
  // therefore has to be dark so the boundary between the two sections is a
  // visible alternation rather than an invisible blend.
  it('uses a dark backdrop to contrast against the light section above', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')!
    expect(footer.className).toMatch(/bg-stone-9\d{2}|bg-black/)
    expect(footer.className).not.toMatch(/\bbg-stone-50\b/)
    expect(footer.className).not.toMatch(/\bbg-white\b/)
  })

  it('renders the brand wordmark in a light color suitable for a dark backdrop', () => {
    const { container } = render(<Footer />)
    const wordmark = container.querySelector('footer span')!
    expect(wordmark.className).toMatch(/text-(white|stone-(50|100))/)
  })
})
