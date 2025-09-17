import {
  ShieldCheck,
  Lock,
  EyeOff,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import type { ReactNode } from 'react'

interface EngineItem {
  icon: ReactNode
  title: string
  description: string
}

const items: EngineItem[] = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Powered by GopenPGP',
    description:
      "ProtonMail's open-source crypto library (MIT), audited by SEC Consult. Battle-tested across millions of users.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'RFC 9580 Compliance',
    description:
      'The latest OpenPGP standard — AEAD encryption (AES-256-OCB), Argon2 S2K, X25519 key agreement. Full backward compatibility with legacy messages.',
  },
  {
    icon: <EyeOff className="w-6 h-6" />,
    title: 'Zero Telemetry',
    description:
      'No analytics, no tracking, no backend. All keys and messages stay on your device — nothing is ever transmitted to any server.',
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: '670+ Tests',
    description:
      'Unified test matrix: unit, integration, UI, and GnuPG interoperability tests ensure reliability across both platforms.',
  },
]

export function Engine() {
  return (
    <section
      id="engine"
      data-bg-light="dark"
      data-bg-dark="dark"
      className="py-24 sm:py-32 bg-stone-950 dark:bg-stone-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            The Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            One crypto stack, every platform
          </h2>
          <p className="mt-4 text-lg text-stone-400">
            goPGP isn't two separate apps — it's a single audited Go codebase
            that compiles to native libraries for iOS and Android.
          </p>
        </div>

        {/* gomobile diagram */}
        <div className="mb-16 max-w-2xl mx-auto">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/50 dark:bg-stone-800/50 p-6 sm:p-8">
            <div className="flex flex-col items-center gap-4">
              {/* Go source */}
              <div className="px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-sm font-medium">
                GopenPGP (Go)
              </div>
              <ArrowRight className="w-5 h-5 text-stone-600 rotate-90" />
              {/* gomobile */}
              <div className="px-5 py-3 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 font-mono text-sm font-medium">
                gomobile
              </div>
              <ArrowRight className="w-5 h-5 text-stone-600 rotate-90" />
              {/* Platform outputs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                <div className="px-5 py-3 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="font-mono">.xcframework</span>
                </div>
                <span className="text-stone-600 text-sm">+</span>
                <div className="px-5 py-3 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 2.392l-5.513 9.553 5.513 9.553H6.477L.964 11.945 6.477 2.392h11.046zm-2.311 1.5H7.788L3.276 11.945l4.512 8.053h7.424l-4.512-8.053 4.512-8.053z" />
                  </svg>
                  <span className="font-mono">.aar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust items grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-stone-900/50 dark:bg-stone-800/50 border border-stone-800 dark:border-stone-700"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-stone-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
