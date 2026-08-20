# Simple Business design system

This repository is the versioned source of truth for Simple Business interface
rules, tokens, semantic icons, static validation, and the five-direction design
comparison. It is intentionally product-logic-free.

## Contents

- `docs/design-system/REFERENCE-ANALYSIS.md`: evidence-based analysis of the
  three supplied Claude Client references and the deliberate Simple Business
  departures.
- `docs/design-system/UI-CONTRACT.md`: binding shell, settings, form,
  typography, navigation, color, responsive, and concept rules.
- `docs/design-system/CONSUMER-INTEGRATION.md`: private package access,
  exact-version consumption, and the Nextcloud generation path.
- `docs/design-system/ICON-SEMANTICS.md`: shared icon meanings and accessible
  labels.
- `src/tokens.css` and `src/tokens.json`: framework-neutral tokens and five
  controlled concept variants.
- `src/icon-semantics.*` and `src/icons.svg`: machine-readable semantics and a
  framework-neutral Lucide-derived SVG sprite.
- `bin/simple-business-lint.mjs`: architecture lint for visual and icon rules.
- `bin/simple-business-sync-nextcloud.mjs`: deterministic generation of assets
  for Node-free Nextcloud production deployments.
- `showcase/`: dependency-free comparison UI using identical content and
  viewports for all five concepts.

## Consumer model

Products install an exact package version. JavaScript products import the CSS,
contract, and icon semantics at build time. Nextcloud products run the sync CLI
in development/CI and commit the generated CSS/SVG files into their app assets.
Automated dependency pull requests propose new versions; no product downloads
design assets at runtime.

```text
simple-business-design-system release
              |
              +-- exact npm version --> Calls / Freelancer / Merchant
              |
              +-- deterministic sync --> Office Nextcloud app assets
              |
              +-- update pull requests --> product CI and review
```

## Local verification

```bash
npm run validate
npm run showcase
```

The local showcase is then available at `http://127.0.0.1:4173`.
