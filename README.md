# goPGP

**OpenPGP for iPhone and iPad — the missing free GPG app for Apple's ecosystem.**

Android has had OpenKeychain for years. iOS had nothing that handled modern GPG 2.4+ keys — AEAD, Argon2, X25519. goPGP fixes that. Crypto engine: [GopenPGP](https://github.com/ProtonMail/gopenpgp), Proton's audited OpenPGP library — the same one Proton Mail uses. No backend, no telemetry, no clouds; keys never leave your device.

goPGP succeeds [PGPro](https://github.com/lucanaef/PGPro), Luca Naef's GPLv3 PGP app for iOS. PGPro bloomed from 2019 to 2022, left the App Store in early 2025, and no longer runs well on modern iOS.

## What it does

- **Encrypt & decrypt** messages and files with PGP keys
- **Sign & verify** to prove authorship and detect tampering
- **Modern GPG 2.4+** — AEAD (AES-256-OCB), Argon2, X25519 ECDH
- **Share Extension** — encrypt or decrypt directly from Safari, Mail, or any app
- **Shortcuts & Siri** — encrypt, decrypt, sign, and verify from iOS Shortcuts
- **Biometric protection** — optional Face ID / Touch ID gate for private key operations
- **Free and open-source** under GPL-3.0

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
