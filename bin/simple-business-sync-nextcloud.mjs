#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function parseArguments(argv) {
  const options = { check: false, target: null };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--check") {
      options.check = true;
    } else if (argument === "--target") {
      options.target = argv[index + 1] ?? null;
      index += 1;
    } else if (argument === "--help" || argument === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  return options;
}

function printHelp() {
  process.stdout.write(
    "Usage: simple-business-sync-nextcloud --target <asset-directory> [--check]\n"
  );
}

function assertSafeTarget(target) {
  const resolved = path.resolve(target);
  const filesystemRoot = path.parse(resolved).root;
  if (resolved === filesystemRoot || resolved === path.resolve("/home") || resolved === path.resolve("/home/tim")) {
    throw new Error(`Refusing broad asset target: ${resolved}`);
  }
  return resolved;
}

export async function expectedAssets(packageRoot) {
  const packageJson = JSON.parse(await readFile(path.join(packageRoot, "package.json"), "utf8"));
  const [tokens, icons] = await Promise.all([
    readFile(path.join(packageRoot, "src/tokens.css"), "utf8"),
    readFile(path.join(packageRoot, "src/icons.svg"), "utf8")
  ]);
  const manifest = `${JSON.stringify(
    {
      generated: true,
      package: packageJson.name,
      version: packageJson.version,
      files: ["simple-business-tokens.css", "simple-business-icons.svg"]
    },
    null,
    2
  )}\n`;
  return new Map([
    ["simple-business-tokens.css", tokens],
    ["simple-business-icons.svg", icons],
    ["simple-business-manifest.json", manifest]
  ]);
}

export async function syncNextcloudAssets({ packageRoot, target, check = false }) {
  const resolvedTarget = assertSafeTarget(target);
  const assets = await expectedAssets(packageRoot);
  const drift = [];

  if (!check) {
    await mkdir(resolvedTarget, { recursive: true });
  }

  for (const [filename, expected] of assets) {
    const destination = path.join(resolvedTarget, filename);
    let current = null;
    if (existsSync(destination)) {
      current = await readFile(destination, "utf8");
    }
    if (current !== expected) {
      drift.push(destination);
      if (!check) {
        await writeFile(destination, expected, "utf8");
      }
    }
  }
  return drift;
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (!options.target) {
    printHelp();
    process.exitCode = 2;
    return;
  }

  const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const drift = await syncNextcloudAssets({
    packageRoot,
    target: options.target,
    check: options.check
  });

  if (options.check && drift.length > 0) {
    for (const file of drift) {
      process.stderr.write(`Generated Simple Business asset is stale: ${file}\n`);
    }
    process.exitCode = 1;
  } else if (options.check) {
    process.stdout.write("Generated Simple Business Nextcloud assets are current.\n");
  } else {
    process.stdout.write(`Synchronized ${drift.length} Simple Business asset(s).\n`);
  }
}

const invokedPath = process.argv[1] ? realpathSync(process.argv[1]) : "";
if (invokedPath === realpathSync(fileURLToPath(import.meta.url))) {
  await main();
}
