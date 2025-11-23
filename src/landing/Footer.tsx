import { Shield, Github } from 'lucide-react'
import type { Ref } from 'react'
import { useAnalytics } from '@/lib/analytics'

const GITHUB_URL = 'https://github.com/gopgp/ios'
const BRIGHT_URL = 'https://bright-eu.com'
const GPL_URL = 'https://www.gnu.org/licenses/gpl-3.0.html'

const currentPath = () =>
  typeof window !== 'undefined' ? window.location.pathname : '/'

export function Footer({ sectionRef }: { sectionRef?: Ref<HTMLElement> }) {
  const { trackCta, trackOutbound, trackNav } = useAnalytics()
  return (
    <footer ref={sectionRef} className="bg-stone-950 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-base font-bold text-white">goPGP</span>
            </div>
            <p className="mt-3 text-sm text-stone-400 leading-relaxed">
              Open-source PGP encryption for mobile. Powered by GopenPGP.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#engine"
                  onClick={() => trackNav('engine', 'footer', currentPath())}
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Engine
                </a>
              </li>
              <li>
                <a
                  href="#ios"
                  onClick={() => trackNav('ios', 'footer', currentPath())}
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  iOS
                </a>
              </li>
              <li>
                <a
                  href="#download"
                  onClick={() => trackNav('download', 'footer', currentPath())}
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Download
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCta('github', 'footer', GITHUB_URL)}
                  className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={() => trackNav('privacy', 'footer', currentPath())}
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  onClick={() => trackNav('support', 'footer', currentPath())}
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={BRIGHT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound(BRIGHT_URL, 'BRIGHT EUROPE', 'footer')}
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  BRIGHT EUROPE
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-stone-500 space-y-1">
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <a
                href={BRIGHT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutbound(BRIGHT_URL, 'BRIGHT EUROPE SRL UNIPERSONALE', 'footer')}
                className="text-stone-400 hover:text-white transition-colors"
              >
                BRIGHT EUROPE SRL UNIPERSONALE
              </a>
            </p>
            <p>Via Carlo Pisacane 34/A, 20129 Milano, Italy</p>
            <p>VAT: IT12113220961</p>
          </div>
          <p className="text-xs text-stone-500">
            goPGP is licensed under{' '}
            <a
              href={GPL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutbound(GPL_URL, 'GPLv3', 'footer')}
              className="text-stone-400 hover:text-white transition-colors"
            >
              GPLv3
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
