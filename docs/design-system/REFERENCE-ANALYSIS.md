# Claude Client reference analysis

## Scope and authority

The following screenshots are the binding visual direction references supplied
on 2026-08-20:

| Reference | Native size | Primary evidence |
| --- | ---: | --- |
| `2026-08-20_15-34.png` | 1686 × 1318 | Main application shell and sidebar |
| `2026-08-20_15-34_1.png` | 1105 × 893 | Settings, forms, and secondary navigation |
| `2026-08-20_15-35.png` | 1175 × 775 | Workspace, selections, tabs, and compact controls |

The images are analyzed but are not copied into this repository. Claude is a
structural and atmospheric reference. Its brand, exact geometry, typefaces,
copy, colors, assets, and distinctive decoration are not source material.

The stricter Simple Business rules always win: completely flat surfaces, no
shadows, gradients, glow, or glass; radius at most 6 px; no pill buttons; muted
pastel accents; RAL 5015 as the default accent; and one shared product shell.

## 1. Main shell and sidebar

### Observed structure

The first reference establishes one strong, full-height desktop split. A narrow
left sidebar is separated from a large workspace by a single vertical rule.
There is no permanent horizontal top bar consuming the full content width. The
main content can therefore read as one calm working surface rather than a stack
of floating panels.

The sidebar has a stable vertical rhythm:

- brand/product identity and compact utility actions at the top;
- a small switcher or mode selection near the identity;
- short primary navigation rows with outline icons and visible labels;
- quiet section labels that divide contextual groups without cards;
- denser secondary items below;
- account and persistent utility areas anchored to the bottom.

Active items use a quiet surface change rather than a saturated sidebar-wide
fill. Small icons, regular text weights, restrained labels, and one-pixel rules
keep the navigation legible without turning it into the dominant visual object.

### Simple Business translation

Simple Business adopts the full-height left shell, compact labeled navigation,
bottom account area, top search access, and absence of an empty global top bar.
The shell becomes more explicitly product-oriented: the `simple` wordmark,
product symbol, product name, and product switcher create a recognizable family
identity. The active row may combine a pastel accent surface, accent icon,
darker accent text, and a narrow accent edge. This makes the product visibly
more colorful than the reference while keeping the sidebar neutral overall.

The sidebar toggle is a semantic panel control beside the product identity. It
uses `PanelLeftClose` when expanded and `PanelLeftOpen` when collapsed; the
generic hamburger motif is never used. The collapsed desktop state is an icon
rail with the same item order and a persistent browser-local preference.

## 2. Settings surface

### Observed structure

The second reference uses a large central settings surface with two internal
columns. A narrow settings navigation contains a search field, quiet group
labels, small outline icons, and a low-contrast active row. The right content
column scrolls independently and retains a visible close action in its upper
corner.

The content uses headings and spacing to form sections. Individual settings are
rows separated by thin horizontal borders, not cards. Labels sit left or above;
compact inputs, selects, or segmented controls align consistently right or
below. Explanatory copy is visually secondary. This produces high information
density without feeling compressed.

### Simple Business translation

The two-column anatomy is binding whether settings appear as a route, drawer,
or dialog. Products may choose the outer container according to task and
viewport, but the internal navigation, search, close action, separators, form
hierarchy, and independent scrolling remain consistent.

Settings entry always reads `Einstellungen` or `Settings` and always uses the
gear. The reference's larger container radius and any perceived elevation are
removed. Borders and neutral surface steps alone establish hierarchy. Theme is
a three-option `System` / `Hell` / `Dunkel` segmented control, never a binary
toggle.

## 3. Workspace, tabs, and compact controls

### Observed structure

The third reference demonstrates a spacious central task area with a clear
display headline, one primary working region, compact inline controls, and a
secondary selection area. Tabs, search, list/grid controls, select chevrons,
and template choices remain small and explicit. A restrained display serif is
used for the large prompt while functional controls remain sans-serif.

The composition favors one strong work surface over many independent cards.
Controls are grouped by proximity and separators rather than decorative
containers. Selected tabs and choices remain visible through surface, border,
and text changes.

### Simple Business translation

Workspaces keep generous neutral breathing room and reserve cards for actual
bounded objects. Tabs are compact, non-pill controls whose selected state is
recognizable through at least two signals. At least two of the five concepts
may use a serif display face for large greetings or marketing headings; tables,
forms, navigation, and data remain sans-serif.

RAL 5015 and its muted tonal scale appear functionally in the product identity,
primary actions, active navigation, selected tabs, focus rings, links, selected
rows, active filters, and meaningful highlights. It must be visible on every
central work view, not reduced to a decorative dot.

## Adopted principles

1. One full-height left sidebar and one dominant workspace.
2. No permanent top bar unless page context genuinely requires one.
3. Compact outline icons with visible text labels in the expanded sidebar.
4. Stable grouping through spacing, quiet labels, and one-pixel separators.
5. Search near the top and account identity anchored at the bottom.
6. Settings with internal navigation and row-based forms rather than card piles.
7. Compact controls, restrained helper text, and predictable alignment.
8. Active, selected, hover, and focus states with clearly different strength.
9. Optional display typography separated from interface typography.
10. More functional color presence than Claude, while large fields stay neutral.

## Deliberately not adopted

- Claude branding, wordmark, starburst, copy, or product-specific information
  architecture;
- its exact dark palette or accent colors;
- exact dimensions, spacing, typography, control arrangement, or artwork;
- large corner radii, rounded capsules, circular panel buttons, or pill tabs;
- any shadow, gradient, glow, glass, blur, or floating-panel treatment;
- a generic `Menu`/hamburger icon for sidebar or mobile navigation;
- icon-only actions without accessible labels and tooltips;
- settings represented by pencils, sliders, tools, or edit-language.

## Resulting Simple Business identity

The resulting identity is calm, precise, useful, and visibly its own. Neutral
planes and thin borders carry structure. RAL 5015 provides consistent product
energy, while controlled pastel surfaces make state visible without visual
noise. The `simple` wordmark and product symbol own the brand layer; Lucide-style
outline semantics own the interaction layer. The system feels related to the
reference through hierarchy and restraint, not through imitation.
