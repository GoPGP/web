import { Header } from './Header'
import { Hero } from './Hero'
import { Engine } from './Engine'
import { IOSSection } from './IOSSection'
import { OpenSource } from './OpenSource'
import { About } from './About'
import { Footer } from './Footer'
import { useScrollDepth } from '@/lib/useScrollDepth'
import { useSectionView } from '@/lib/useSectionView'

export function LandingPage() {
  useScrollDepth()
  const footerRef = useSectionView<HTMLElement>('footer')
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
      <Footer sectionRef={footerRef} />
    </div>
  )
}
