import assert from "node:assert/strict";
import test from "node:test";

import { lintCss, lintMarkup } from "../bin/simple-business-lint.mjs";

test("visual lint accepts flat controls within the radius limit", () => {
  const css = `
    .control {
      border: 1px solid var(--sb-color-border);
      border-radius: 4px;
      background: var(--sb-color-surface);
    }
  `;
  assert.deepEqual(lintCss("valid.css", css), []);
});

test("visual lint rejects effects, gradients, and excessive radius", () => {
  const css = `
    .bad {
      border-radius: 999px;
      box-shadow: 0 4px 12px #000;
      background: linear-gradient(#fff, #eee);
      backdrop-filter: blur(12px);
    }
  `;
  const rules = new Set(lintCss("bad.css", css).map((entry) => entry.rule));
  assert.ok(rules.has("visual/max-radius"));
  assert.ok(rules.has("visual/no-shadow"));
  assert.ok(rules.has("visual/no-gradient"));
  assert.ok(rules.has("visual/no-backdrop-filter"));
});

test("icon lint rejects edit icons assigned to settings", () => {
  const source = `const item = { label: "Einstellungen", icon: Pencil };`;
  assert.ok(
    lintMarkup("navigation.tsx", source).some(
      (entry) => entry.rule === "icons/settings-must-use-gear"
    )
  );
});

test("icon lint allows pencil for direct content editing", () => {
  const source = `const item = { label: "Titel bearbeiten", icon: Pencil };`;
  assert.deepEqual(lintMarkup("editor.tsx", source), []);
});

test("icon lint rejects generic menu in sidebar navigation", () => {
  const source = `<button aria-label="Navigation öffnen"><Menu /></button>`;
  assert.ok(
    lintMarkup("shell.tsx", source).some((entry) => entry.rule === "icons/no-hamburger")
  );
});

test("icon lint accepts semantic panel controls", () => {
  const source = `<button aria-label="Navigation öffnen"><PanelLeftOpen /></button>`;
  assert.deepEqual(lintMarkup("shell.tsx", source), []);
});
