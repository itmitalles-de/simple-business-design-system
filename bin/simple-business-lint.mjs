#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import { existsSync, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".mjs",
  ".php",
  ".svelte",
  ".ts",
  ".tsx",
  ".vue"
]);

const SKIPPED_DIRECTORIES = new Set([
  ".git",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "vendor"
]);

const FORBIDDEN_SETTINGS_LABELS = [
  "Einstellungen bearbeiten",
  "Konfiguration editieren",
  "Edit settings"
];

const EDIT_ICON_PATTERN =
  "(?:Pencil|Pen(?:Line)?|SquarePen|FilePen(?:Line)?|Edit(?:2|3)?)";
const SETTINGS_TERM_PATTERN =
  "(?:Settings|Einstellungen|settings\\.open|settings(?:Route|Action|Navigation|Nav))";

function lineNumber(source, offset) {
  return source.slice(0, offset).split("\n").length;
}

function addDiagnostic(diagnostics, file, source, offset, rule, message) {
  diagnostics.push({
    file,
    line: lineNumber(source, offset),
    rule,
    message
  });
}

function stripCssComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, (comment) =>
    comment.replace(/[^\n]/g, " ")
  );
}

export function lintCss(file, originalSource) {
  const source = stripCssComments(originalSource);
  const diagnostics = [];
  const forbiddenEffects = [
    {
      rule: "visual/no-gradient",
      regex: /(?:linear|radial|conic|repeating-linear|repeating-radial)-gradient\s*\(/gi,
      message: "Gradients are prohibited; use a flat semantic surface token."
    },
    {
      rule: "visual/no-backdrop-filter",
      regex: /(?:-webkit-)?backdrop-filter\s*:/gi,
      message: "Backdrop filtering and glass effects are prohibited."
    },
    {
      rule: "visual/no-drop-shadow",
      regex: /filter\s*:[^;}]*(?:drop-shadow|blur)\s*\(/gi,
      message: "Drop shadows, blur, glow, and glass effects are prohibited."
    }
  ];

  for (const check of forbiddenEffects) {
    for (const match of source.matchAll(check.regex)) {
      addDiagnostic(diagnostics, file, source, match.index, check.rule, check.message);
    }
  }

  for (const property of ["box-shadow", "text-shadow"]) {
    const regex = new RegExp(`${property}\\s*:\\s*([^;}]+)`, "gi");
    for (const match of source.matchAll(regex)) {
      if (match[1].trim().toLowerCase() !== "none") {
        addDiagnostic(
          diagnostics,
          file,
          source,
          match.index,
          "visual/no-shadow",
          `${property} is prohibited; use borders and neutral surface steps.`
        );
      }
    }
  }

  const radiusRegex = /border(?:-(?:start|end))?(?:-(?:start|end))?-radius\s*:\s*([^;}]+)/gi;
  for (const match of source.matchAll(radiusRegex)) {
    const value = match[1].trim();
    const dimensions = [...value.matchAll(/(-?\d*\.?\d+)\s*(px|rem|em|%)/gi)];
    for (const dimension of dimensions) {
      const amount = Number.parseFloat(dimension[1]);
      const unit = dimension[2].toLowerCase();
      const pixels = unit === "px" ? amount : unit === "%" ? Infinity : amount * 16;
      if (amount > 0 && pixels > 6) {
        addDiagnostic(
          diagnostics,
          file,
          source,
          match.index,
          "visual/max-radius",
          `Border radius ${dimension[0]} exceeds the 6 px maximum or is percentage-based.`
        );
      }
    }
  }

  return diagnostics;
}

export function lintMarkup(file, source) {
  const diagnostics = [];

  for (const label of FORBIDDEN_SETTINGS_LABELS) {
    let offset = source.indexOf(label);
    while (offset !== -1) {
      addDiagnostic(
        diagnostics,
        file,
        source,
        offset,
        "icons/settings-label",
        `Use the visible label Settings/Einstellungen, not “${label}”.`
      );
      offset = source.indexOf(label, offset + label.length);
    }
  }

  let hamburgerOffset = source.indexOf("☰");
  while (hamburgerOffset !== -1) {
    addDiagnostic(
      diagnostics,
      file,
      source,
      hamburgerOffset,
      "icons/no-hamburger",
      "Use PanelLeftOpen/PanelLeftClose for navigation, never a hamburger glyph."
    );
    hamburgerOffset = source.indexOf("☰", hamburgerOffset + 1);
  }

  const menuUsage = /(?:<Menu\b|icon\s*[:=]\s*[{<]?Menu\b|iconName\s*[:=]\s*["']Menu["'])/g;
  for (const match of source.matchAll(menuUsage)) {
    const context = source.slice(Math.max(0, match.index - 180), match.index + 240);
    if (/(?:sidebar|drawer|navigation|nav-trigger|open navigation|navigation öffnen)/i.test(context)) {
      addDiagnostic(
        diagnostics,
        file,
        source,
        match.index,
        "icons/no-hamburger",
        "Generic Menu is prohibited for sidebar or drawer navigation; use PanelLeft semantics."
      );
    }
  }

  const settingsThenEdit = new RegExp(
    `${SETTINGS_TERM_PATTERN}[\\s\\S]{0,180}(?:icon|glyph|leading|startIcon)\\s*[:=]\\s*[{<]?(?:${EDIT_ICON_PATTERN})\\b`,
    "gi"
  );
  const editThenSettings = new RegExp(
    `(?:icon|glyph|leading|startIcon)\\s*[:=]\\s*[{<]?(?:${EDIT_ICON_PATTERN})\\b[\\s\\S]{0,180}${SETTINGS_TERM_PATTERN}`,
    "gi"
  );

  for (const regex of [settingsThenEdit, editThenSettings]) {
    for (const match of source.matchAll(regex)) {
      addDiagnostic(
        diagnostics,
        file,
        source,
        match.index,
        "icons/settings-must-use-gear",
        "Settings navigation/actions must use the Settings gear; edit icons are content-only."
      );
    }
  }

  return diagnostics;
}

async function walk(target) {
  const resolved = path.resolve(target);
  const stat = await import("node:fs/promises").then(({ stat }) => stat(resolved));
  if (stat.isFile()) {
    return SOURCE_EXTENSIONS.has(path.extname(resolved).toLowerCase()) ? [resolved] : [];
  }

  const files = [];
  for (const entry of await readdir(resolved, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIPPED_DIRECTORIES.has(entry.name)) {
      continue;
    }
    const child = path.join(resolved, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(child)));
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(child);
    }
  }
  return files;
}

export async function lintPaths(targets, rules = new Set(["visual", "icons"])) {
  const diagnostics = [];
  for (const target of targets) {
    if (!existsSync(target)) {
      diagnostics.push({
        file: path.resolve(target),
        line: 1,
        rule: "input/missing",
        message: "Lint target does not exist."
      });
      continue;
    }
    for (const file of await walk(target)) {
      const source = await readFile(file, "utf8");
      if (rules.has("visual") && path.extname(file).toLowerCase() === ".css") {
        diagnostics.push(...lintCss(file, source));
      }
      if (rules.has("icons") && path.extname(file).toLowerCase() !== ".css") {
        diagnostics.push(...lintMarkup(file, source));
      }
    }
  }
  return diagnostics;
}

export async function validateContract(packageRoot) {
  const diagnostics = [];
  const [packageJson, tokens, contract, icons] = await Promise.all([
    readFile(path.join(packageRoot, "package.json"), "utf8").then(JSON.parse),
    readFile(path.join(packageRoot, "src/tokens.json"), "utf8").then(JSON.parse),
    readFile(path.join(packageRoot, "src/ui-contract.json"), "utf8").then(JSON.parse),
    readFile(path.join(packageRoot, "src/icon-semantics.json"), "utf8").then(JSON.parse)
  ]);
  const fail = (rule, message) =>
    diagnostics.push({
      file: packageRoot,
      line: 1,
      rule,
      message
    });

  if (tokens.corporateColor?.digitalApproximation !== "#2271B3") {
    fail("contract/ral-5015", "The digital RAL 5015 approximation must remain #2271B3.");
  }
  if (contract.visual?.maximumRadiusPx !== 6 || contract.visual?.maximumButtonRadiusPx !== 4) {
    fail("contract/radius", "Surface radius must be 6 px and button radius at most 4 px.");
  }
  for (const key of ["shadows", "gradients", "glow", "glass", "pillButtons"]) {
    if (contract.visual?.[key] !== false) {
      fail("contract/flat", `${key} must remain prohibited.`);
    }
  }
  if (tokens.concepts?.length !== 5) {
    fail("contract/concepts", "Exactly five controlled concepts are required.");
  } else {
    if (tokens.concepts.filter((concept) => concept.displaySerif).length < 2) {
      fail("contract/display-serif", "At least two concepts must use a display serif.");
    }
    if (tokens.concepts.filter((concept) => concept.moreColorfulThanReference).length < 3) {
      fail("contract/color-presence", "At least three concepts must be more colorful than Claude.");
    }
  }
  const requiredIcons = {
    "settings.open": "Settings",
    "content.edit": "Pencil",
    "sidebar.state": "PanelLeft",
    "sidebar.collapse": "PanelLeftClose",
    "sidebar.expand": "PanelLeftOpen",
    "navigation.open": "PanelLeftOpen",
    "navigation.close": "PanelLeftClose"
  };
  for (const [semantic, icon] of Object.entries(requiredIcons)) {
    if (icons.icons?.[semantic] !== icon) {
      fail("contract/icon-semantics", `${semantic} must map to ${icon}.`);
    }
  }
  if (packageJson.version !== tokens.version || packageJson.version !== contract.version || packageJson.version !== icons.version) {
    fail("contract/version", "Package, tokens, contract, and icon registry versions must match.");
  }
  return diagnostics;
}

function parseArguments(argv) {
  const options = {
    format: "text",
    rules: new Set(["visual", "icons"]),
    self: false,
    targets: []
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--self") {
      options.self = true;
    } else if (argument === "--format") {
      options.format = argv[index + 1] ?? "text";
      index += 1;
    } else if (argument === "--rules") {
      options.rules = new Set((argv[index + 1] ?? "").split(",").filter(Boolean));
      index += 1;
    } else if (argument === "--help" || argument === "-h") {
      options.help = true;
    } else {
      options.targets.push(argument);
    }
  }
  return options;
}

function printHelp() {
  process.stdout.write(`Usage: simple-business-lint [options] [paths...]\n\n`);
  process.stdout.write(`Options:\n`);
  process.stdout.write(`  --self                 Validate this package and showcase\n`);
  process.stdout.write(`  --rules visual,icons   Select rule groups\n`);
  process.stdout.write(`  --format text|json     Output format\n`);
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  let diagnostics = [];
  if (options.self) {
    diagnostics.push(...(await validateContract(packageRoot)));
    diagnostics.push(
      ...(await lintPaths(
        [path.join(packageRoot, "src/tokens.css"), path.join(packageRoot, "showcase")],
        options.rules
      ))
    );
  } else {
    const targets = options.targets.length > 0 ? options.targets : [process.cwd()];
    diagnostics = await lintPaths(targets, options.rules);
  }

  diagnostics.sort((left, right) =>
    `${left.file}:${left.line}:${left.rule}`.localeCompare(`${right.file}:${right.line}:${right.rule}`)
  );

  if (options.format === "json") {
    process.stdout.write(`${JSON.stringify({ diagnostics }, null, 2)}\n`);
  } else if (diagnostics.length === 0) {
    process.stdout.write("Simple Business design lint passed.\n");
  } else {
    for (const diagnostic of diagnostics) {
      process.stderr.write(
        `${diagnostic.file}:${diagnostic.line} ${diagnostic.rule} ${diagnostic.message}\n`
      );
    }
    process.stderr.write(`Simple Business design lint failed with ${diagnostics.length} issue(s).\n`);
  }

  if (diagnostics.length > 0) {
    process.exitCode = 1;
  }
}

const invokedPath = process.argv[1] ? realpathSync(process.argv[1]) : "";
if (invokedPath === realpathSync(fileURLToPath(import.meta.url))) {
  await main();
}
