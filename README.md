# goPGP

**Open-source PGP encryption for mobile.**

Encrypt, decrypt, sign and verify on iOS and Android — powered by [GopenPGP](https://github.com/ProtonMail/gopenpgp), the same audited crypto engine used by Proton Mail.

## What you can do

- 🔐 **Encrypt & decrypt** messages and files with PGP keys
- ✍️ **Sign & verify** to prove authorship and detect tampering
- 📱 **Mobile-first** — built for iOS and Android, not a desktop port
- 🆓 **Free and open-source** under GPL-3.0
- 🛡️ **Audited crypto engine** — GopenPGP, used in production by Proton Mail

## Status

**iOS app:** in active development. Source: [github.com/gopgp/ios](https://github.com/gopgp/ios)
**Android:** planned.

## Learn more

→ [**gopgp.org**](https://gopgp.org)

---

## About this repository

This is the source for the **landing site** at [gopgp.org](https://gopgp.org). The iOS app lives in a separate repo: [gopgp/ios](https://github.com/gopgp/ios).

Stack: React 19 + Vite 7 + Tailwind v4. Static SPA deployed to GitHub Pages.

### Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

### Build

```bash
pnpm build
```

### Test

```bash
pnpm test:run     # unit tests (vitest)
pnpm test:visual  # visual regression
```

## License

GPL-3.0 — see [LICENSE](./LICENSE).

© Bright Europe Srl Unipersonale (Milano, Italy).
