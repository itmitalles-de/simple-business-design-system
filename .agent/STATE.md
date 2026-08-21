# Current state

- This public repository is the single source of truth for Simple Business UI
  rules and generated consumer assets. Initial commit
  `e508cc211777e7c251f68e8769d5d6d7ae2d04bf` is pushed to `origin/main`.
- Version `0.1.0` contains the initial Claude-reference analysis, binding UI
  contract, tokens, semantic icon registry, SVG sprite, lint CLI, Nextcloud sync
  CLI, and five-concept showcase.
- The source and release are public. The package remains unlicensed pending an
  explicit ownership and distribution decision.
- Consumer repositories must pin exact releases; no runtime remote asset load is
  permitted.
- All four local product repositories pin commit `e508cc2` and package version
  `0.1.0` through `.simple-business-design-system.json`; product package and CI
  activation is not yet claimed.
- GitHub-hosted CI is operational after the suite repositories became public.
  Release `v0.1.0`, its public npm tarball, and the authenticated GitHub Package
  were published successfully.
- A public-consumer probe found that both `0.1.0` CLI binaries do not execute
  through npm's bin symlinks. The `0.1.1` candidate resolves symlinks before the
  direct-invocation check, adds an installed-bin regression test, and passes all
  13 tests plus package validation. Consumers must not activate `0.1.0`.
