import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { iconSemantics } from "../src/icon-semantics.js";
import { validateContract } from "../bin/simple-business-lint.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

test("machine-readable contract satisfies binding invariants", async () => {
  assert.deepEqual(await validateContract(root), []);
});

test("JavaScript and JSON icon registries cannot drift", async () => {
  const registry = await readJson("src/icon-semantics.json");
  assert.deepEqual(iconSemantics, registry.icons);
});

test("five concepts preserve comparison and color requirements", async () => {
  const [tokens, contract] = await Promise.all([
    readJson("src/tokens.json"),
    readJson("src/ui-contract.json")
  ]);
  assert.equal(tokens.concepts.length, 5);
  assert.equal(new Set(tokens.concepts.map((concept) => concept.id)).size, 5);
  assert.ok(tokens.concepts.filter((concept) => concept.displaySerif).length >= 2);
  assert.ok(tokens.concepts.filter((concept) => concept.moreColorfulThanReference).length >= 3);
  assert.equal(contract.concepts.sameContent, true);
  assert.equal(contract.concepts.sameViewports, true);
});

test("showcase renders the five concepts from one shared content template", async () => {
  const [html, application] = await Promise.all([
    readFile(path.join(root, "showcase/index.html"), "utf8"),
    readFile(path.join(root, "showcase/app.js"), "utf8")
  ]);
  assert.match(html, /id="concept-list"/);
  assert.equal([...application.matchAll(/\n\s+id: "[1-5]"/g)].length, 5);
  assert.match(application, /concepts\.map\(conceptMarkup\)/);
  assert.match(application, /Desktop · 1440 × 900/);
  assert.match(application, /Mobil · 390 × 844/);
  assert.match(application, /role="radiogroup" aria-label="Darstellung"/);
  assert.doesNotMatch(application, /☰/);
});

test("package exports immutable framework-neutral consumer assets", async () => {
  const packageJson = await readJson("package.json");
  assert.equal(packageJson.exports["./tokens.css"], "./src/tokens.css");
  assert.equal(packageJson.exports["./icons.svg"], "./src/icons.svg");
  assert.equal(packageJson.exports["./rules.json"], "./src/ui-contract.json");
  assert.equal(packageJson.publishConfig.registry, "https://npm.pkg.github.com");
  assert.equal(packageJson.license, "UNLICENSED");
});
