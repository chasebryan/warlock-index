import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.dirname(fileURLToPath(import.meta.url));
const siteOrigin = "https://www.warlock-index.org";
const host = "www.warlock-index.org";
const key = "59c2fae48b47cbb2869f673165235550";
const keyLocation = `${siteOrigin}/${key}.txt`;
const endpoint = "https://api.indexnow.org/indexnow";
const args = new Set(process.argv.slice(2));
const liveMode = args.has("--live");
const maxAttempts = Number(process.env.INDEXNOW_ATTEMPTS ?? (liveMode ? 6 : 1));
const retryDelayMs = Number(process.env.INDEXNOW_RETRY_DELAY_MS ?? 60000);
const retryStatuses = new Set([403, 429, 500, 502, 503, 504]);
const requestHeaders = {
  "user-agent": "WARLOCK-INDEX IndexNow submitter/1.0"
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractUrls(sitemapXml) {
  return [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter((url) => url.startsWith(`${siteOrigin}/`));
}

async function readSitemap() {
  if (liveMode) {
    const response = await fetch(`${siteOrigin}/sitemap.xml`, {
      cache: "no-store",
      headers: requestHeaders
    });
    if (!response.ok) {
      throw new Error(`Could not fetch live sitemap: ${response.status} ${response.statusText}`);
    }
    return response.text();
  }

  return readFile(path.join(siteRoot, "sitemap.xml"), "utf8");
}

async function verifyLiveKey() {
  const response = await fetch(`${keyLocation}?indexnow-check=${Date.now()}`, {
    cache: "no-store",
    headers: {
      ...requestHeaders,
      "cache-control": "no-cache"
    }
  });

  if (!response.ok) {
    throw new Error(`Could not fetch live IndexNow key: ${response.status} ${response.statusText}`);
  }

  const liveKey = (await response.text()).trim();
  if (liveKey !== key) {
    throw new Error(`Live IndexNow key did not match expected key at ${keyLocation}`);
  }
}

const sitemapXml = await readSitemap();
const urlList = [...new Set(extractUrls(sitemapXml))];

if (!urlList.length) {
  throw new Error("No WARLOCK-INDEX URLs found in sitemap.");
}

const payload = {
  host,
  key,
  keyLocation,
  urlList
};

if (args.has("--dry-run")) {
  console.log(`IndexNow dry run: ${urlList.length} URLs ready for ${endpoint}`);
  console.log(`Key location: ${keyLocation}`);
  process.exit(0);
}

if (liveMode) {
  await verifyLiveKey();
  console.log(`Verified live IndexNow key at ${keyLocation}`);
}

let lastStatus = 0;

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      ...requestHeaders,
      "content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  lastStatus = response.status;
  const body = await response.text();
  console.log(`IndexNow response: ${response.status} ${response.statusText}`);
  if (body.trim()) console.log(body);

  if ([200, 202].includes(response.status)) {
    process.exit(0);
  }

  if (!liveMode || attempt === maxAttempts || !retryStatuses.has(response.status)) {
    break;
  }

  console.log(
    `Retrying IndexNow submission in ${Math.round(retryDelayMs / 1000)}s ` +
      `(attempt ${attempt + 1}/${maxAttempts}) after HTTP ${response.status}.`
  );
  await sleep(retryDelayMs);
}

console.error(`IndexNow submission failed after ${maxAttempts} attempt(s); last status ${lastStatus}.`);
process.exit(1);
