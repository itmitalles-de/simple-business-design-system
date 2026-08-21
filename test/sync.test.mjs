import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { syncNextcloudAssets } from "../bin/simple-business-sync-nextcloud.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("Nextcloud assets are deterministic and checkable", async (context) => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "simple-business-sync-"));
  const target = path.join(temporaryRoot, "assets");
  context.after(() => rm(temporaryRoot, { recursive: true, force: true }));

  const initialDrift = await syncNextcloudAssets({ packageRoot: root, target });
  assert.equal(initialDrift.length, 3);
  assert.deepEqual(await syncNextcloudAssets({ packageRoot: root, target, check: true }), []);

  const manifest = JSON.parse(
    await readFile(path.join(target, "simple-business-manifest.json"), "utf8")
  );
  assert.equal(manifest.version, "0.1.1");
  assert.equal(manifest.generated, true);
});
