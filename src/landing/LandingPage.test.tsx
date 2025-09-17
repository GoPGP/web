import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LandingPage } from './LandingPage'

describe('LandingPage', () => {
  it('every header anchor href has a matching section[id]', () => {
    const { container } = render(<LandingPage />)
    const header = container.querySelector('header')
    expect(header).not.toBeNull()

    const anchors = [...header!.querySelectorAll('a[href^="#"]')]
      .map((a) => (a.getAttribute('href') ?? '').slice(1))
      .filter(Boolean)

    expect(anchors.length).toBeGreaterThan(0)

    for (const id of anchors) {
      expect(
        container.querySelector(`[id="${id}"]`),
        `expected an element with id="${id}" to exist for anchor #${id}`,
      ).not.toBeNull()
    }
  })

  it('renders all top-level sections', () => {
    const { container } = render(<LandingPage />)
    expect(container.querySelector('header')).not.toBeNull()
    expect(container.querySelector('main')).not.toBeNull()
    expect(container.querySelector('footer')).not.toBeNull()
  })
})
