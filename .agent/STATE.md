# Current state

- This public repository is the single source of truth for Simple Business UI
  rules and generated consumer assets. Initial commit
  `e508cc211777e7c251f68e8769d5d6d7ae2d04bf` is pushed to `origin/main`.
- Version `0.1.1` contains the initial Claude-reference analysis, binding UI
  contract, tokens, semantic icon registry, SVG sprite, lint CLI, Nextcloud sync
  CLI, and five-concept showcase. It also fixes installed npm-bin invocation and
  includes regression coverage for both packaged CLIs.
- The source and release are public. The package remains unlicensed pending an
  explicit ownership and distribution decision.
- Consumer repositories must pin exact releases; no runtime remote asset load is
  permitted.
- Exact `v0.1.1` consumer integrations are pushed for all four products: Calls
  `5827b53`, Freelancer `692d9ec`, Merchant `db90f4d`, and Office `e791d65`.
  React consumers load central tokens before local styles and run the shared
  icon-semantics check. Office commits deterministic app-local assets and checks
  drift without requiring Node in production.
- GitHub-hosted CI is operational after the suite repositories became public.
  Release `v0.1.1`, its public npm tarball, and the authenticated GitHub Package
  were published successfully. An anonymous release-artifact install exercised
  both installed npm bins, generated both Office asset sets, and passed drift
  checking. Consumers must not activate superseded `v0.1.0`.
- Consumer activation does not claim that legacy product interfaces already
  satisfy every visual rule; full visual lint remains an explicit migration.
