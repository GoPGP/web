import { Shield, ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Footer } from './Footer'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 tracking-tight">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-stone-600 dark:text-stone-400 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <header className="bg-stone-900 dark:bg-stone-50 border-b border-stone-800 dark:border-stone-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
              <span className="text-base font-bold text-stone-50 dark:text-stone-900">goPGP</span>
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-stone-300 dark:text-stone-600 hover:text-white dark:hover:text-stone-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-stone-500">Last updated: February 2026</p>

        <Section title="No Data Collection">
          <p>
            goPGP does not collect, store, or transmit any personal data to
            external servers. All your data&nbsp;&mdash; PGP keys, contacts, and
            messages&nbsp;&mdash; is stored exclusively on your device using
            Apple&rsquo;s SwiftData framework.
          </p>
        </Section>

        <Section title="On-Device Storage">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              PGP keys and contact information are stored in an on-device
              database.
            </li>
            <li>
              The app uses an App Group shared container so that the Share
              Extension can access the same data. This data never leaves your
              device.
            </li>
          </ul>
        </Section>

        <Section title="Network Access">
          <p>goPGP makes a single optional network request:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-stone-900 dark:text-stone-100">
                PGP Keyserver Lookup
              </strong>
              &nbsp;&mdash; When you search for a key, the app queries{' '}
              <code className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-sm font-mono">
                pgp.circl.lu
              </code>{' '}
              with the email address you enter. No other data is sent. This
              lookup is entirely optional and user-initiated.
            </li>
          </ul>
        </Section>

        <Section title="No Analytics or Tracking">
          <p>
            goPGP contains no analytics, telemetry, advertising SDKs, or
            third-party tracking of any kind.
          </p>
        </Section>

        <Section title="No Third-Party Services">
          <p>
            goPGP does not integrate with any third-party services beyond the
            optional keyserver lookup described above.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            If you have questions about this privacy policy, contact us at{' '}
            <a
              href="mailto:contact@gopgp.org"
              className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2"
            >
              contact@gopgp.org
            </a>
            .
          </p>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
