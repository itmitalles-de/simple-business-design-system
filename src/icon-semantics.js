export const iconSemantics = Object.freeze({
  "settings.open": "Settings",
  "content.edit": "Pencil",
  "sidebar.state": "PanelLeft",
  "sidebar.collapse": "PanelLeftClose",
  "sidebar.expand": "PanelLeftOpen",
  "navigation.open": "PanelLeftOpen",
  "navigation.close": "PanelLeftClose",
  search: "Search",
  close: "X",
  "select.expand": "ChevronDown",
  "theme.system": "Monitor",
  "theme.light": "Sun",
  "theme.dark": "Moon"
});

export const accessibleLabels = Object.freeze({
  "sidebar.collapse": Object.freeze({ de: "Sidebar einklappen", en: "Collapse sidebar" }),
  "sidebar.expand": Object.freeze({ de: "Sidebar ausklappen", en: "Expand sidebar" }),
  "navigation.open": Object.freeze({ de: "Navigation öffnen", en: "Open navigation" }),
  "navigation.close": Object.freeze({ de: "Navigation schließen", en: "Close navigation" }),
  "settings.open": Object.freeze({ de: "Einstellungen", en: "Settings" }),
  "theme.system": Object.freeze({ de: "System", en: "System" }),
  "theme.light": Object.freeze({ de: "Hell", en: "Light" }),
  "theme.dark": Object.freeze({ de: "Dunkel", en: "Dark" })
});

export const forbiddenIconSemantics = Object.freeze({
  navigationIcons: Object.freeze(["Menu", "Hamburger", "Bars3", "☰"]),
  settingsIcons: Object.freeze([
    "Pencil",
    "Pen",
    "PenLine",
    "SquarePen",
    "FilePen",
    "Edit",
    "Edit2",
    "Edit3",
    "Sliders",
    "Wrench"
  ]),
  settingsLabels: Object.freeze([
    "Einstellungen bearbeiten",
    "Konfiguration editieren",
    "Edit settings"
  ])
});

export function getIconName(semanticKey) {
  const iconName = iconSemantics[semanticKey];
  if (!iconName) {
    throw new Error(`Unknown Simple Business icon semantic: ${semanticKey}`);
  }
  return iconName;
}

export function getAccessibleLabel(semanticKey, locale = "en") {
  const labels = accessibleLabels[semanticKey];
  if (!labels) {
    throw new Error(`No Simple Business accessible label for: ${semanticKey}`);
  }
  return labels[locale] ?? labels.en;
}
