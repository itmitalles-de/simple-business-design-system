# Simple Business UI contract

This document is normative. Product-specific UI may specialize content and
workflow, but not the shared structure, semantics, or interaction rules below.

## Shared application shell

```text
SimpleAppShell
├── SimpleSidebar
│   ├── BrandRow
│   │   ├── ProductIdentity
│   │   ├── SidebarToggle
│   │   └── SearchAction
│   ├── ProductSwitcher
│   ├── PrimaryNavigation
│   ├── ContextSections
│   ├── SecondaryNavigation
│   └── AccountArea
└── SimpleMain
    ├── OptionalContextBar
    ├── PageHeader
    └── PageContent
```

- Desktop sidebar is visible by default, spans the full viewport height, and is
  separated from main by one neutral one-pixel border.
- Expanded sidebar shows outline icons and text labels. Collapsed sidebar is a
  narrow icon rail; item order never changes.
- Collapse state is stored persistently for the local user.
- `SimpleHeader` is optional on desktop. No empty permanent cross-window bar.
- `OptionalContextBar` exists only for real breadcrumbs, page-level actions, or
  additional navigation.
- Search is near the top; account identity and persistent utilities stay at the
  bottom.

On mobile, the same panel symbol opens a left drawer containing the identical
navigation hierarchy. Opening moves focus into the drawer. Tab remains trapped
inside it, Escape closes it, and focus returns to the trigger.

## Flat construction

- No `box-shadow`, `text-shadow`, drop shadow, gradient, glow, glass, backdrop
  filter, or decorative blur.
- Maximum radius is 6 px. Buttons use at most 4 px. Pills and circular action
  buttons are prohibited.
- Hierarchy uses neutral surface steps, one-pixel borders, spacing, and type.
- Decorative containers are avoided; cards represent real bounded objects only.

## Color

RAL 5015 sky blue is the corporate default. `#2271B3` is the documented sRGB
approximation for digital UI; physical RAL samples remain authoritative for
print and material production.

Accent color is functionally visible in product identity, primary buttons,
active navigation, selected tabs, product switcher, checked controls, focus
rings, links, selected table rows, active filters, status chips, chart emphasis,
and functional empty-state illustration. It is not confined to one tiny mark.

Large base surfaces remain neutral. The full sidebar is never saturated.
Semantic error, warning, and success colors remain independent of the product
accent. Every state must also have a non-color signal.

## Navigation states

- Row structure is outline icon left, visible label right, compact line height.
- Navigation rows are not pills.
- Hover is weaker than active. Focus is clearer than hover.
- Active may combine pastel accent surface, accent icon, darker accent text,
  stronger weight, and a narrow accent edge.
- Active state remains recognizable without color through weight, edge, or
  structure.
- Badges appear only when they convey necessary state or count.

## Settings anatomy

- Large central content surface with a narrow internal left navigation.
- Search field at the top; categorized entries use small outline icons.
- Active category uses a quiet neutral or pastel surface plus a non-color cue.
- Content scrolls independently; close action remains available at the top end.
- Setting rows use fine horizontal separators, not an individual card each.
- Labels appear left or above; controls align consistently right or below.
- Helper text is subdued and immediately associated with its control.
- Primary entry is `Settings` / `Einstellungen` with the `Settings` gear.

## Forms and controls

- Compact controls, clear one-pixel borders, and subtle neutral surface steps.
- Sections are formed by heading and spacing rather than decorative cards.
- Selects use a small chevron. Icon-only actions require tooltip and accessible
  name.
- Theme selection is a compact radio-like segmented control with exactly
  `System`, `Light` / `Hell`, and `Dark` / `Dunkel`, optionally using Monitor,
  Sun, and Moon. It is not a binary toggle.
- Focus uses a clearly visible RAL-5015-derived outline and is never removed
  without an equivalent replacement.

## Typography

- Interface, navigation, forms, tables, and data use a calm sans-serif stack.
- Display serif is optional for large greetings and marketing headings only.
- Section labels are small and quiet; ordinary labels use regular or medium
  weight instead of blanket bold.
- Compact line heights never compromise readability.
- The `simple` wordmark remains independent and does not imitate Claude.

## Five controlled concepts

Every comparison uses identical German content and the same simulated desktop
and mobile viewports. Concepts vary only the dimensions listed here:

| # | Working name | Color presence | Active navigation | Identity/type | Density |
| --- | --- | --- | --- | --- | --- |
| 1 | Precise Line | Restrained | pale fill + 2 px edge | sans wordmark, line symbol | compact |
| 2 | Balanced Ledger | Balanced | pale fill + accent icon/text | serif display, framed symbol | regular |
| 3 | Clear Signal | Pronounced | stronger pastel + 3 px edge | high-clarity sans, solid symbol field | regular |
| 4 | Pastel Workspace | Surface-oriented pastel | broader pale field + underline | serif display, paired identity block | relaxed |
| 5 | Focused Contrast | Higher muted contrast | darker text + bordered selection | condensed hierarchy, cut-corner symbol | dense |

Concepts 2 and 4 use a serif display face. Concepts 3, 4, and 5 must be visibly
more colorful than the Claude reference in every central workspace. All five
remain inside the same blue-led Simple Business family.

The following never varies: sidebar position, collapse/drawer behavior, icon
semantics, settings gear, hamburger prohibition, flat construction, maximum
radius, navigation order, core accessibility behavior, and shared content.

## Third-party surfaces

Product-owned UI must comply. Embedded or upstream-owned interfaces such as the
base Nextcloud shell or Vendure dashboard require an explicit documented
exception and must not be silently restyled in a way that jeopardizes upgrades.
Repository-owned extensions inside those platforms use the shared tokens and
semantics wherever the host contract permits.
