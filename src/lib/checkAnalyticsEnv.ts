export function checkAnalyticsEnv(
  env: { key: string | undefined; dev: boolean },
  warn: (msg: string) => void,
) {
  if (env.dev && !env.key) {
    warn(
      '[analytics] VITE_POSTHOG_KEY is not set. PostHog disabled. ' +
        'If you just edited .env.local, restart the dev server — Vite reads env vars at startup.',
    )
  }
}
