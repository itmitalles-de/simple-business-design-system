# Simple Business icon semantics

Icons communicate product-wide meanings. Product code consumes semantic names
from the registry instead of choosing a convenient glyph locally.

## Mandatory mappings

| Semantic key | Lucide symbol | Meaning |
| --- | --- | --- |
| `settings.open` | `Settings` | Open product, account, integration, permission, or preference settings |
| `content.edit` | `Pencil` | Directly edit actual user content such as text, title, note, filename, or manual record |
| `sidebar.state` | `PanelLeft` | Static sidebar/panel representation |
| `sidebar.collapse` | `PanelLeftClose` | Collapse the visible desktop sidebar |
| `sidebar.expand` | `PanelLeftOpen` | Expand the collapsed desktop sidebar |
| `navigation.open` | `PanelLeftOpen` | Open the mobile left navigation drawer |
| `navigation.close` | `PanelLeftClose` | Close the mobile left navigation drawer |
| `search` | `Search` | Search content or navigation |
| `close` | `X` | Close a surface without implying deletion |
| `select.expand` | `ChevronDown` | Open a select or disclosure |
| `theme.system` | `Monitor` | Follow the operating-system theme |
| `theme.light` | `Sun` | Use the light theme |
| `theme.dark` | `Moon` | Use the dark theme |

`Settings` is the only general settings glyph. Do not substitute `Pencil`,
`Edit`, `SquarePen`, a file-with-pen symbol, sliders, or a wrench.

`Pencil` is allowed only when the immediate action directly edits real content.
It is prohibited for preferences, themes, account/product configuration,
integrations, permissions, navigation customization, or any route leading to a
configuration surface.

## Prohibited navigation symbols

Never use generic `Menu`, `☰`, or three unqualified horizontal lines for desktop
collapse or mobile navigation. The icon must depict a left panel or split
surface. This remains true even when a component library names its hamburger
control `menu`.

## Required labels

| State | German | English |
| --- | --- | --- |
| Desktop expanded | `Sidebar einklappen` | `Collapse sidebar` |
| Desktop collapsed | `Sidebar ausklappen` | `Expand sidebar` |
| Mobile closed | `Navigation öffnen` | `Open navigation` |
| Mobile open | `Navigation schließen` | `Close navigation` |

The state-specific string is both the `aria-label` and tooltip text. The panel
button is lightly squared, at most 4 px radius, may use one clear one-pixel
border, and never uses a circular or pill shape.

Settings is visibly named exactly `Einstellungen` or `Settings`. Avoid labels
such as `Einstellungen bearbeiten`, `Konfiguration editieren`, or `Edit
settings`.

## Accessibility

- Decorative icons are hidden from the accessibility tree.
- Icon-only controls always have a state-appropriate accessible name and
  tooltip.
- Visible text and accessible names describe the action, not the glyph.
- Selected and active states expose semantic state (`aria-current`,
  `aria-selected`, or checked radio state) in addition to appearance.
- Changing the sidebar icon never changes navigation order or focus order.

## Enforcement

`simple-business-lint` rejects the forbidden labels, hamburger pattern in
navigation controls, and edit icons assigned to settings navigation/actions.
It also validates this registry, ensuring the mandatory mappings cannot drift.
