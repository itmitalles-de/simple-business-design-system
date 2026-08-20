export type SimpleBusinessLocale = "de" | "en";

export type IconSemanticKey =
  | "settings.open"
  | "content.edit"
  | "sidebar.state"
  | "sidebar.collapse"
  | "sidebar.expand"
  | "navigation.open"
  | "navigation.close"
  | "search"
  | "close"
  | "select.expand"
  | "theme.system"
  | "theme.light"
  | "theme.dark";

export declare const iconSemantics: Readonly<Record<IconSemanticKey, string>>;
export declare const accessibleLabels: Readonly<
  Partial<Record<IconSemanticKey, Readonly<Record<SimpleBusinessLocale, string>>>>
>;
export declare const forbiddenIconSemantics: Readonly<{
  navigationIcons: readonly string[];
  settingsIcons: readonly string[];
  settingsLabels: readonly string[];
}>;
export declare function getIconName(semanticKey: IconSemanticKey): string;
export declare function getAccessibleLabel(
  semanticKey: IconSemanticKey,
  locale?: SimpleBusinessLocale
): string;
