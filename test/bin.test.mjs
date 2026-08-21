import assert from "node:assert/strict";
import { execFile as execFileCallback } from "node:child_process";
import { mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFile = promisify(execFileCallback);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("npm-style bin symlinks execute both CLIs", async (context) => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "simple-business-bin-"));
  context.after(() => rm(temporaryRoot, { recursive: true, force: true }));

  const lintBin = path.join(temporaryRoot, "simple-business-lint");
  const syncBin = path.join(temporaryRoot, "simple-business-sync-nextcloud");
  await Promise.all([
    symlink(path.join(root, "bin/simple-business-lint.mjs"), lintBin),
    symlink(path.join(root, "bin/simple-business-sync-nextcloud.mjs"), syncBin)
  ]);

  const lintTarget = path.join(temporaryRoot, "navigation.tsx");
  await writeFile(
    lintTarget,
    '<button aria-label="Navigation öffnen"><PanelLeftOpen /></button>\n',
    "utf8"
  );
  const lintResult = await execFile(lintBin, ["--rules", "icons", lintTarget]);
  assert.match(lintResult.stdout, /design lint passed/i);

  const assetTarget = path.join(temporaryRoot, "assets");
  const syncResult = await execFile(syncBin, ["--target", assetTarget]);
  assert.match(syncResult.stdout, /Synchronized 3 Simple Business asset/);
  const manifest = JSON.parse(
    await readFile(path.join(assetTarget, "simple-business-manifest.json"), "utf8")
  );
  assert.equal(manifest.version, "0.1.1");
});
