import { Building2, Mail, ExternalLink } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'
import { useSectionView } from '@/lib/useSectionView'

const BRIGHT_URL = 'https://bright-eu.com'
const CONTACT_EMAIL = 'mailto:support@gopgp.org'

export function About() {
  const ref = useSectionView<HTMLElement>('about')
  const { trackCta, trackOutbound, trackContact } = useAnalytics()
  return (
    <section
      ref={ref}
      id="download"
      data-bg-light="light"
      data-bg-dark="dark"
      className="py-24 sm:py-32 bg-stone-50 dark:bg-stone-900/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            About goPGP
          </h2>
          <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">
            An open-source project published by{' '}
            <a
              href={BRIGHT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutbound(BRIGHT_URL, 'BRIGHT EUROPE', 'about')}
              className="text-stone-900 dark:text-stone-100 underline underline-offset-2"
            >BRIGHT&nbsp;EUROPE</a>.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={BRIGHT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutbound(BRIGHT_URL, 'bright-eu.com', 'about')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-500 font-medium transition-colors"
            >
              <Building2 className="w-4 h-4" />
              bright-eu.com
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </a>
            <a
              href={CONTACT_EMAIL}
              onClick={() => trackContact('about')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-500 font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              support@gopgp.org
            </a>
          </div>

          {/* App Store CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
            <h3 className="text-2xl font-bold">Get goPGP</h3>
            <p className="mt-2 text-emerald-100">
              Coming soon to the App Store. Free. No ads. No subscriptions.
            </p>
            <div className="mt-6">
              <a
                href="#"
                onClick={() => trackCta('app_store', 'about', '#')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium backdrop-blur-sm transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Coming to App Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
