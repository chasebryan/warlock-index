import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(siteRoot, "..");
const libraryRoot = path.join(siteRoot, "library");
const corpusPath = path.join(siteRoot, "corpus.js");
const corpusJsonPath = path.join(siteRoot, "corpus.json");
const corpusCsvPath = path.join(siteRoot, "corpus.csv");
const corpusHealthPath = path.join(siteRoot, "corpus-health.json");
const globalMapUpdatesPath = path.join(siteRoot, "global-map-updates.json");
const previewGlobalMapUpdatesPath = path.join(siteRoot, "previews", "global-map-updates.json");
const workspaceCorpusPath = path.join(siteRoot, "workspace", "corpus.js");
const workspaceCorpusJsonPath = path.join(siteRoot, "workspace", "corpus.json");
const workspaceCorpusHealthPath = path.join(siteRoot, "workspace", "corpus-health.json");
const workspaceServiceWorkerPath = path.join(siteRoot, "workspace", "service-worker.js");
const feedHtmlPath = path.join(siteRoot, "feed.html");
const feedPath = path.join(siteRoot, "feed.xml");
const robotsPath = path.join(siteRoot, "robots.txt");
const sitemapPath = path.join(siteRoot, "sitemap.xml");
const buildScript = path.join(siteRoot, "build-library.mjs");

const normalizeSlash = (value) => value.split(path.sep).join("/");

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") return false;
    throw error;
  }
}

async function collectFiles(directory) {
  if (!await fileExists(directory)) return [];

  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function hashFile(filePath) {
  const content = await readFile(filePath);
  return createHash("sha256").update(content).digest("hex");
}

async function generatedSnapshot() {
  const generatedRootFiles = [];
  for (const filePath of [
    corpusPath,
    corpusJsonPath,
    corpusCsvPath,
    corpusHealthPath,
    globalMapUpdatesPath,
    previewGlobalMapUpdatesPath,
    workspaceCorpusPath,
    workspaceCorpusJsonPath,
    workspaceCorpusHealthPath,
    workspaceServiceWorkerPath,
    feedHtmlPath,
    feedPath,
    robotsPath,
    sitemapPath
  ]) {
    if (await fileExists(filePath)) generatedRootFiles.push(filePath);
  }

  const files = [
    ...await collectFiles(libraryRoot),
    ...generatedRootFiles
  ];
  const snapshot = new Map();

  for (const file of files.sort()) {
    snapshot.set(normalizeSlash(path.relative(repoRoot, file)), await hashFile(file));
  }

  return snapshot;
}

function compareSnapshots(before, after) {
  const added = [];
  const changed = [];
  const removed = [];

  for (const [file, hash] of after.entries()) {
    if (!before.has(file)) {
      added.push(file);
    } else if (before.get(file) !== hash) {
      changed.push(file);
    }
  }

  for (const file of before.keys()) {
    if (!after.has(file)) removed.push(file);
  }

  return { added, changed, removed };
}

function printList(label, files) {
  if (!files.length) return;
  console.error(`${label}:`);
  files.slice(0, 20).forEach((file) => console.error(`  - ${file}`));
  if (files.length > 20) console.error(`  ... ${files.length - 20} more`);
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function validateCorpusHealth() {
  const corpus = await readJson(corpusJsonPath);
  const workspaceCorpus = await readJson(workspaceCorpusJsonPath);
  const health = await readJson(corpusHealthPath);
  const workspaceHealth = await readJson(workspaceCorpusHealthPath);

  if (!Array.isArray(corpus) || !corpus.length) {
    throw new Error("site/corpus.json must contain a non-empty array.");
  }
  if (JSON.stringify(corpus) !== JSON.stringify(workspaceCorpus)) {
    throw new Error("site/corpus.json and site/workspace/corpus.json differ.");
  }
  if (JSON.stringify(health) !== JSON.stringify(workspaceHealth)) {
    throw new Error("site/corpus-health.json and site/workspace/corpus-health.json differ.");
  }
  if (health.recordCount !== corpus.length) {
    throw new Error(`corpus-health recordCount ${health.recordCount} does not match corpus length ${corpus.length}.`);
  }

  const requiredFields = [
    "metadataCompleteness",
    "refreshDue",
    "daysUntilRefresh",
    "sourceHealthStatus",
    "sourceHealthFlags",
    "sourceHash"
  ];
  const missingField = corpus.find((record) => requiredFields.some((field) => !(field in record)));
  if (missingField) {
    throw new Error(`Corpus record is missing health fields: ${missingField.title || missingField.path || "unknown record"}.`);
  }
}

const before = await generatedSnapshot();
const build = spawnSync(process.execPath, [buildScript], {
  cwd: repoRoot,
  stdio: "inherit"
});

if (build.status !== 0) {
  process.exit(build.status || 1);
}

const after = await generatedSnapshot();
const drift = compareSnapshots(before, after);
const driftCount = drift.added.length + drift.changed.length + drift.removed.length;

if (driftCount > 0) {
  console.error("");
  console.error("Generated website output was stale.");
  console.error("The build has refreshed generated site output; review and commit those changes with the docs update.");
  printList("Added", drift.added);
  printList("Changed", drift.changed);
  printList("Removed", drift.removed);
  process.exit(1);
}

try {
  await validateCorpusHealth();
} catch (error) {
  console.error("");
  console.error("Generated corpus health validation failed.");
  console.error(error?.message || error);
  process.exit(1);
}

console.log("Generated website output is in sync with docs.");
