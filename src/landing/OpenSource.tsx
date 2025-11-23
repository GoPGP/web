import { Github, Scale, Code2, ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { useAnalytics } from '@/lib/analytics'
import { useSectionView } from '@/lib/useSectionView'

const GITHUB_URL = 'https://github.com/gopgp/ios'

interface OSItem {
  icon: ReactNode
  title: string
  description: string
}

const items: OSItem[] = [
  {
    icon: <Scale className="w-6 h-6" />,
    title: 'GPLv3 Licensed',
    description:
      'Free as in freedom. You can use, modify, and distribute goPGP under the GNU General Public License v3.',
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Fully Auditable',
    description:
      'Every line of code is publicly available. Verify the security yourself or have an independent expert review it.',
  },
  {
    icon: <Github className="w-6 h-6" />,
    title: 'Community-Driven',
    description:
      'Report issues, suggest features, or contribute code. goPGP is built in the open.',
  },
]

export function OpenSource() {
  const ref = useSectionView<HTMLElement>('open_source')
  const { trackCta } = useAnalytics()
  return (
    <section
      ref={ref}
      id="open-source"
      data-bg-light="light"
      data-bg-dark="dark"
      className="py-24 sm:py-32 bg-white dark:bg-stone-950"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium mb-6">
              Open Source
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Transparency is not optional
            </h2>
            <p className="mt-4 text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              For a security tool, trust starts with the source code. goPGP is
              fully open-source so you never have to take our word for it.
            </p>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta('github', 'open_source', GITHUB_URL)}
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 font-medium transition-colors"
            >
              <Github className="w-5 h-5" />
              View on GitHub
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </a>
          </div>

          {/* Right — cards */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
