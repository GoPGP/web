# goPGP

**Open-source PGP encryption for mobile — iOS and Android, powered by a single audited crypto engine.**

## Problems & Solutions

### 1. No Trustworthy Mobile PGP App
There is no actively maintained, open-source PGP app for either major mobile platform. On iOS, existing options are closed-source, abandoned, or lack modern encryption standards. On Android, OpenKeychain has been unmaintained since 2021 and relies on Spongy Castle — incompatible with GPG 2.3+ and RFC 9580.

**Solution:** goPGP is fully open-source (GPLv3), actively maintained, and uses an audited crypto backend (GopenPGP by ProtonMail, audited by SEC Consult). A single Go codebase compiles to both iOS (xcframework) and Android (AAR) via gomobile.

### 2. Closed-Source Alternatives
Apps like iPGMail ($3.99) are closed-source and unaudited — users must blindly trust the developer with their encryption.

**Solution:** Every line of goPGP's code is publicly available on GitHub. Users and security researchers can verify the implementation themselves.

### 3. Outdated Encryption Standards
Most PGP apps still use legacy CFB mode encryption, which lacks authenticated encryption and is vulnerable to certain attacks. On Android, OpenKeychain's Spongy Castle backend doesn't support AEAD, Argon2 S2K, or X25519 — making it incompatible with messages from GPG 2.3+.

**Solution:** goPGP defaults to RFC 9580 AEAD encryption (AES-256-OCB) while maintaining full backward compatibility with legacy messages. Both platforms share the same GopenPGP engine, ensuring consistent cryptographic behavior.

## Key Features

### Shared (Both Platforms)
1. **Encrypt & Decrypt** — AEAD (RFC 9580) + legacy CFB support
2. **Sign & Verify** — Cleartext PGP signatures with trust indicators
3. **GopenPGP Engine** — ProtonMail's audited crypto library via gomobile
4. **670+ Tests** — Go + GnuPG interoperability test matrix

### iOS
5. **Share Extension** — Encrypt/decrypt from any iOS app
6. **Siri Shortcuts** — Automate crypto operations with App Intents
7. **Face ID / Touch ID** — Biometric protection for private keys
8. **Paste Services** — Share via Pastebin or burn-after-reading Privnote

### Android (Coming Soon)
9. **OpenKeychain-compatible UX** — Familiar interface for existing users
10. **Android Intents** — Integrate with other apps via the standard Android intent system
11. **Material Design** — Native Android look and feel

## Developed By

BRIGHT EUROPE S.R.L. — Milan, Italy
Website: https://bright-eu.com
Contact: contact@gopgp.org
