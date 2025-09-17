import { Header } from './Header'
import { Hero } from './Hero'
import { Engine } from './Engine'
import { IOSSection } from './IOSSection'
import { OpenSource } from './OpenSource'
import { About } from './About'
import { Footer } from './Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <Header />
      <main>
        <Hero />
        <Engine />
        <IOSSection />
        <OpenSource />
        <About />
      </main>
      <Footer />
    </div>
  )
}
