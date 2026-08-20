# Current state

- This private repository is the single source of truth for Simple Business UI
  rules and generated consumer assets. Initial commit
  `e508cc211777e7c251f68e8769d5d6d7ae2d04bf` is pushed to `origin/main`.
- Version `0.1.0` contains the initial Claude-reference analysis, binding UI
  contract, tokens, semantic icon registry, SVG sprite, lint CLI, Nextcloud sync
  CLI, and five-concept showcase.
- The package is private and unlicensed pending an explicit ownership and
  distribution decision.
- Consumer repositories must pin exact releases; no runtime remote asset load is
  permitted.
- All four local product repositories pin commit `e508cc2` and package version
  `0.1.0` through `.simple-business-design-system.json`; product package and CI
  activation is not yet claimed.
- Local validation and browser interaction checks pass. GitHub-hosted CI is
  blocked before checkout by the account billing or Actions spending-limit
  state, so package publication and consumer Actions access remain pending.
