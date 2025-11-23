import {
  Share2,
  Mic,
  Fingerprint,
  Clipboard,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useAnalytics } from '@/lib/analytics'
import { useSectionView } from '@/lib/useSectionView'

interface Feature {
  icon: ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <Share2 className="w-5 h-5" />,
    title: 'Share Extension',
    description:
      'Encrypt or decrypt text directly from Safari, Mail, Notes, or any app that supports iOS sharing.',
  },
  {
    icon: <Mic className="w-5 h-5" />,
    title: 'Siri Shortcuts',
    description:
      'Automate crypto operations with App Intents — build custom workflows with the Shortcuts app.',
  },
  {
    icon: <Fingerprint className="w-5 h-5" />,
    title: 'Face ID / Touch ID',
    description:
      'Protect your private keys with biometric authentication. Keys are stored in the iOS Keychain.',
  },
  {
    icon: <Clipboard className="w-5 h-5" />,
    title: 'Paste Services',
    description:
      'Share encrypted text via Pastebin or burn-after-reading Privnote — built right into the app.',
  },
]

const screenshots = [
  { src: '/screenshots/02-encryption.png', alt: 'Encryption' },
  { src: '/screenshots/01-decryption.png', alt: 'Decryption' },
  { src: '/screenshots/03-signing.png', alt: 'Signing' },
  { src: '/screenshots/04-verify.png', alt: 'Verification' },
  { src: '/screenshots/05-keychain.png', alt: 'Keychain' },
  { src: '/screenshots/06-keydetail.png', alt: 'Key Details' },
  { src: '/screenshots/07-settings.png', alt: 'Settings' },
]

export function IOSSection() {
  const ref = useSectionView<HTMLElement>('ios')
  const { trackCta } = useAnalytics()
  return (
    <section
      ref={ref}
      id="ios"
      data-bg-light="light"
      data-bg-dark="dark"
      className="py-24 sm:py-32 bg-white dark:bg-stone-950"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-medium mb-6">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            goPGP for iOS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Native SwiftUI experience
          </h2>
          <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">
            A complete PGP toolkit designed for the way you actually use your
            iPhone and iPad.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex gap-4 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors"
            >
              <div className="w-10 h-10 shrink-0 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots gallery */}
      <div className="mb-12">
        <div
          className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Left spacer for centering */}
          <div className="shrink-0 w-[calc((100vw-1152px)/2)] hidden xl:block" />

          {screenshots.map((shot) => (
            <div key={shot.src} className="shrink-0 snap-center">
              <div className="bg-stone-800 rounded-[2rem] p-2 shadow-xl ring-1 ring-stone-700/30 dark:ring-stone-600/20">
                <img
                  src={shot.src}
                  alt={`goPGP — ${shot.alt}`}
                  className="rounded-[1.75rem] w-[220px] sm:w-[250px]"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-center text-xs font-medium text-stone-500">
                {shot.alt}
              </p>
            </div>
          ))}

          {/* Right spacer */}
          <div className="shrink-0 w-[calc((100vw-1152px)/2)] hidden xl:block" />
        </div>
      </div>

      {/* App Store CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <a
            href="#download"
            onClick={() => trackCta('app_store', 'ios', '#download')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors shadow-lg shadow-emerald-600/25"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Coming to App Store
          </a>
        </div>
      </div>
    </section>
  )
}
