import { Shield, ArrowLeft, Github, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { useAnalytics } from '@/lib/analytics'

const ISSUES_URL = 'https://github.com/gopgp/ios/issues'

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

function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
        {question}
      </h3>
      <div className="mt-2 text-stone-600 dark:text-stone-400 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export function Support() {
  const { trackNav, trackOutbound } = useAnalytics()
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <header className="bg-stone-900 dark:bg-stone-50 border-b border-stone-800 dark:border-stone-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a
              href="/"
              onClick={() => trackNav('home', 'header', '/support')}
              className="flex items-center gap-2"
            >
              <Shield className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
              <span className="text-base font-bold text-stone-50 dark:text-stone-900">goPGP</span>
            </a>
            <a
              href="/"
              onClick={() => trackNav('home', 'header', '/support')}
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
          Support
        </h1>
        <p className="mt-3 text-stone-600 dark:text-stone-400 leading-relaxed">
          goPGP is an open-source hobby project. We do our best to help, but
          there is no SLA &mdash; expect best-effort responses.
        </p>

        <Section title="Get in touch">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Github className="w-5 h-5 mt-0.5 text-stone-500 dark:text-stone-400 shrink-0" />
              <div>
                <div className="text-stone-900 dark:text-stone-100 font-medium">
                  GitHub Issues
                </div>
                <div className="text-sm">
                  Report bugs or request features at{' '}
                  <a
                    href={ISSUES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutbound(ISSUES_URL, 'github.com/gopgp/ios/issues', 'support')}
                    className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2"
                  >
                    github.com/gopgp/ios/issues
                  </a>
                  . Public issues help other users too &mdash; preferred channel.
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 mt-0.5 text-stone-500 dark:text-stone-400 shrink-0" />
              <div>
                <div className="text-stone-900 dark:text-stone-100 font-medium">
                  Email
                </div>
                <div className="text-sm">
                  For private matters: <span className="font-mono">contact@gopgp.org</span>
                </div>
              </div>
            </li>
          </ul>
        </Section>

        <Section title="Frequently asked questions">
          <div className="space-y-6">
            <FaqItem question="How do I import an existing PGP key?">
              <p>
                Open the Keys tab and tap the <em>+</em> button. Choose{' '}
                <em>Import</em> and paste your armored public or private key
                (a block starting with{' '}
                <code className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-sm font-mono">
                  -----BEGIN PGP&nbsp;
                </code>
                ). Private keys protected by a passphrase will prompt for it on
                first use.
              </p>
            </FaqItem>

            <FaqItem question="Does goPGP work offline?">
              <p>
                Yes. All encryption, decryption, signing, and key management run
                on-device. The only optional network call is a public keyserver
                lookup at{' '}
                <code className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-sm font-mono">
                  pgp.circl.lu
                </code>{' '}
                when you search for a contact&rsquo;s key &mdash; you can skip
                it and import keys manually instead.
              </p>
            </FaqItem>

            <FaqItem question="Is my data sent to any server?">
              <p>
                No. Keys, contacts, and message content stay on your device in
                Apple&rsquo;s SwiftData store. goPGP contains no analytics, no
                telemetry, and no third-party SDKs. See the{' '}
                <a
                  href="/privacy"
                  onClick={() => trackNav('privacy', 'footer', '/support')}
                  className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2"
                >
                  Privacy Policy
                </a>{' '}
                for details.
              </p>
            </FaqItem>

            <FaqItem question="Can I use a YubiKey?">
              <p>
                Smartcard / YubiKey support is not available in the current
                release. iOS exposes only a limited subset of CCID over
                Lightning/USB-C, and integrating it cleanly with GopenPGP is on
                the roadmap rather than shipped. Track progress on the{' '}
                <a
                  href={ISSUES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound(ISSUES_URL, 'goPGP iOS issue tracker', 'support')}
                  className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2"
                >
                  goPGP iOS issue tracker
                </a>
                .
              </p>
            </FaqItem>

            <FaqItem question="What if I lose my passphrase?">
              <p>
                There is no recovery. PGP private keys are protected by your
                passphrase using strong key derivation; without it, the key
                material is mathematically inaccessible. Keep an offline backup
                of your passphrase &mdash; a password manager, paper in a safe,
                or a hardware token. goPGP cannot help recover a lost
                passphrase, and neither can anyone else.
              </p>
            </FaqItem>
          </div>
        </Section>

        <Section title="Response expectations">
          <p>
            goPGP is maintained as an open-source side project. We aim to
            triage GitHub issues within a few days and respond to email when we
            can. There is no service-level agreement, no paid support tier, and
            no guaranteed turnaround time. If your issue is urgent, filing it
            publicly on GitHub gets the most eyes on it.
          </p>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
