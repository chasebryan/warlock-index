import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.dirname(fileURLToPath(import.meta.url));
const siteOrigin = "https://www.warlock-index.org";
const host = "www.warlock-index.org";
const key = "8f1b4a36-2f20-4dd5-b8a7-5e3e877ff926";
const keyLocation = `${siteOrigin}/${key}.txt`;
const endpoint = "https://api.indexnow.org/indexnow";
const args = new Set(process.argv.slice(2));

function extractUrls(sitemapXml) {
  return [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter((url) => url.startsWith(`${siteOrigin}/`));
}

async function readSitemap() {
  if (args.has("--live")) {
    const response = await fetch(`${siteOrigin}/sitemap.xml`);
    if (!response.ok) {
      throw new Error(`Could not fetch live sitemap: ${response.status} ${response.statusText}`);
    }
    return response.text();
  }

  return readFile(path.join(siteRoot, "sitemap.xml"), "utf8");
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

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "content-type": "application/json; charset=utf-8"
  },
  body: JSON.stringify(payload)
});

const body = await response.text();
console.log(`IndexNow response: ${response.status} ${response.statusText}`);
if (body.trim()) console.log(body);

if (![200, 202].includes(response.status)) {
  process.exit(1);
}
