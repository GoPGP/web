import { Github, ExternalLink } from 'lucide-react'

export function Hero() {
  return (
    <section
      data-bg-light="dark"
      data-bg-dark="dark"
      className="relative min-h-screen flex items-center bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Open Source &middot; Audited &middot; Free Forever
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              goPGP
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-emerald-400 font-medium">
              Open-Source PGP for Mobile
            </p>
            <p className="mt-6 text-lg text-stone-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Encrypt, decrypt, sign and verify&nbsp;&mdash; powered by a single
              audited crypto engine on iOS and Android. No tracking. No backend.
              Free&nbsp;forever.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#download"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors shadow-lg shadow-emerald-600/25"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Coming to App Store
              </a>
              <a
                href="https://github.com/gopgp/ios"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white font-medium transition-colors"
              >
                <Github className="w-5 h-5" />
                View on GitHub
                <ExternalLink className="w-3.5 h-3.5 opacity-50" />
              </a>
            </div>

            {/* Android coming soon badge */}
            <div className="mt-6 flex items-center justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800/50 border border-stone-700/50 text-stone-400 text-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 2.392l-5.513 9.553 5.513 9.553H6.477L.964 11.945 6.477 2.392h11.046zm-2.311 1.5H7.788L3.276 11.945l4.512 8.053h7.424l-4.512-8.053 4.512-8.053z" />
                </svg>
                Android coming soon
              </div>
            </div>
          </div>

          {/* iPhone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-75" />
              {/* Phone frame */}
              <div className="relative bg-stone-800 rounded-[3rem] p-3 shadow-2xl ring-1 ring-stone-700/50">
                <div className="bg-black rounded-[2.5rem] overflow-hidden w-[260px] sm:w-[280px]">
                  <img
                    src="/screenshots/02-encryption.png"
                    alt="goPGP encryption screen"
                    className="w-full"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
