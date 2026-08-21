# Repository agent guide

This repository is the single source of truth for the visual contract shared by
the Simple Business product family. Consumer repositories pin immutable package
versions. Do not copy-edit generated consumer assets; change the source here,
release a version, and update consumers through reviewable pull requests.

## Required reading

Before visual or component work, read:

1. `docs/design-system/REFERENCE-ANALYSIS.md`
2. `docs/design-system/UI-CONTRACT.md`
3. `docs/design-system/ICON-SEMANTICS.md`

The user-supplied requirements and these files override aesthetic preferences.
Claude is a structural and atmospheric reference, never a color or brand source.

## Non-negotiable rules

- Flat design only: no shadows, gradients, glow, glass, or backdrop blur.
- Border radius is at most 6 px. Buttons are at most 4 px and never pills.
- RAL 5015 is the corporate default accent; large surfaces stay neutral.
- Desktop uses a persistent left sidebar and no empty permanent top bar.
- Sidebar controls use `PanelLeft`, `PanelLeftClose`, or `PanelLeftOpen`, never a
  hamburger or generic `Menu` icon.
- Settings always use the `Settings` gear. Pencil/edit icons are reserved for
  direct content editing.
- Every icon-only action has an accessible name and tooltip.
- Theme selection is a three-option System/Light/Dark segmented control.
- The five concepts vary expression, not structure, semantics, or behavior.

## Validation

Run `npm run validate`. Keep tests dependency-free where practical so consumer
checks can run in every stack. Never weaken a rule to accommodate legacy UI;
use an explicit, time-bounded migration exception in the consumer instead.

## Release boundary

- Never publish from an unreviewed working tree.
- Package versions are exact and immutable.
- Consumer updates happen by pull request and must pass the consumer's own CI.
- Do not fetch an unpinned branch, CDN asset, or remote CSS at runtime.
- The source and release artifacts are public but unlicensed. Public
  availability does not grant reuse rights until ownership and distribution
  terms are explicitly resolved.
