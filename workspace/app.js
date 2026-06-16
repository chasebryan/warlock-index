const corpus = Array.isArray(window.WARLOCK_INDEX_CORPUS)
  ? window.WARLOCK_INDEX_CORPUS
  : [];

const SITE_ROOT = "https://www.warlock-index.org/";
const LEGACY_QUEUE_STORAGE_KEY = "wi.queue.paths";
const DEFAULT_QUERY = "strategic weapons";
const EXPORT_STYLE_VERSION = "20260613-reader-packet";
const TRAFFIC_SUMMARY_URL = "../assets/traffic-summary.json";

const routes = [
  { id: "all", label: "All records", match: () => true },
  { id: "assessments", label: "Assessments", match: (item) => item.type === "Assessment" },
  { id: "maps", label: "Maps", match: (item) => item.type === "Map Resource" || String(item.path || "").startsWith("library/maps/") },
  { id: "source-packets", label: "Source packets", match: (item) => item.type === "Source Packet" },
  { id: "trackers", label: "Trackers", match: (item) => item.type === "Tracker" },
  { id: "matrices", label: "Matrices", match: (item) => /matrix/i.test(item.type) },
  { id: "standards", label: "Standards", match: (item) => item.type === "Standard" },
  { id: "actor-profiles", label: "Actor profiles", match: (item) => item.type === "Actor Profile" },
  { id: "source-registers", label: "Source registers", match: (item) => item.type === "Source Register" },
  { id: "timelines", label: "Timelines", match: (item) => item.type === "Timeline" },
  { id: "directories", label: "Directories", match: (item) => item.type === "Directory" }
];

const quickRoutes = [
  "Strategic weapons",
  "Official sources",
  "Maps",
  "Source packets",
  "Actor profiles",
  "Arctic",
  "Red Sea",
  "Indo-Pacific",
  "Taiwan",
  "Cyber",
  "Standards"
];

function initialQuery() {
  const query = new URLSearchParams(window.location.search).get("q");
  return query?.trim() || DEFAULT_QUERY;
}

const state = {
  query: initialQuery(),
  scope: "all",
  selectedPath: "",
  queue: initialQueue(),
  exporting: false,
  exportStatus: ""
};

let deferredInstallPrompt = null;

const els = {
  app: document.querySelector("#app"),
  form: document.querySelector("#search-form"),
  input: document.querySelector("#search-input"),
  installApp: document.querySelector("#install-app"),
  corpusCount: document.querySelector("#corpus-count"),
  routeList: document.querySelector("#route-list"),
  activeScopeLabel: document.querySelector("#active-scope-label"),
  heading: document.querySelector("#results-heading"),
  resultCount: document.querySelector("#result-count"),
  quickRoutes: document.querySelector("#quick-routes"),
  resultList: document.querySelector("#result-list"),
  preview: document.querySelector("#preview-panel"),
  queue: document.querySelector("#queue-list"),
  clearQueue: document.querySelector("#clear-queue"),
  downloadQueue: document.querySelector("#download-queue"),
  queueStatus: document.querySelector("#queue-status"),
  trafficWidgets: document.querySelectorAll("[data-traffic-state]")
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function normalize(value) {
  return String(value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function words(value) {
  return normalize(value).split(" ").filter(Boolean);
}

function itemHaystack(item) {
  return normalize([
    item.title,
    item.type,
    item.summary,
    item.theater,
    item.domain,
    item.productId,
    item.preparedUtc,
    item.cutoffUtc,
    item.confidence,
    ...(item.tags || [])
  ].join(" "));
}

function formatCount(value, noun) {
  if (noun === "match") {
    return `${value} ${value === 1 ? "match" : "matches"}`;
  }
  return `${value} ${noun}${value === 1 ? "" : "s"}`;
}

function formatUtc(value) {
  if (!value) return "Unstated";
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : value;
}

function confidenceLabel(value) {
  if (!value) return "Unstated";
  const match = String(value).match(/^(high|moderate(?:\s+to\s+high)?|low)\b/i);
  return match ? match[1].replace(/\b\w/g, (letter) => letter.toUpperCase()) : value;
}

function metricNumber(value) {
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

function formatMetric(value) {
  const number = metricNumber(value);
  return number === null ? "--" : new Intl.NumberFormat("en-US").format(number);
}

function renderTrafficSummary(summary) {
  const viewers = summary?.viewers ?? summary?.totalViewers ?? summary?.visits;
  const active = summary?.activeViewers ?? summary?.active ?? summary?.realtimeViewers;
  const isConnected = metricNumber(viewers) !== null || metricNumber(active) !== null;
  const trafficState = isConnected ? "connected" : (summary?.status || "pending");

  els.trafficWidgets.forEach((widget) => {
    widget.dataset.trafficState = trafficState;
    widget.hidden = !isConnected;
    widget.querySelectorAll('[data-traffic-value="viewers"]').forEach((node) => {
      node.textContent = formatMetric(viewers);
    });
    widget.querySelectorAll('[data-traffic-value="active"]').forEach((node) => {
      node.textContent = formatMetric(active);
    });
    if (summary?.updatedUtc) {
      widget.title = `Updated ${summary.updatedUtc}`;
    }
  });
}

async function loadTrafficSummary() {
  if (!els.trafficWidgets.length) return;
  try {
    const response = await fetch(TRAFFIC_SUMMARY_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`Traffic summary unavailable: ${response.status}`);
    renderTrafficSummary(await response.json());
  } catch {
    renderTrafficSummary({ status: "pending" });
  }
}

function pathUrl(path) {
  try {
    return new URL(String(path || ""), SITE_ROOT).href;
  } catch {
    return SITE_ROOT;
  }
}

function localSiteUrl(path) {
  try {
    const siteRoot = new URL("../", window.location.href);
    return new URL(String(path || ""), siteRoot).href;
  } catch {
    return pathUrl(path);
  }
}

function fileNameFromPath(path) {
  return String(path || "warlock-index-record.html").split("/").filter(Boolean).pop() || "warlock-index-record.html";
}

function fileBaseFromPath(path) {
  return fileNameFromPath(path).replace(/\.html?$/i, "");
}

function slugify(value) {
  const slug = normalize(value).replace(/\s+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "record";
}

function exportFileName(items) {
  if (items.length === 1) {
    return `${fileBaseFromPath(items[0].path)}-reader.html`;
  }

  const date = new Date().toISOString().slice(0, 10);
  return `warlock-index-reader-packet-${date}-${items.length}-records.html`;
}

function itemForPath(path) {
  return corpus.find((item) => item.path === path);
}

function uniqueItemsForPaths(paths) {
  const seen = new Set();
  return paths
    .map(itemForPath)
    .filter(Boolean)
    .filter((item) => {
      if (seen.has(item.path)) return false;
      seen.add(item.path);
      return true;
    });
}

function routeById(id) {
  return routes.find((route) => route.id === id) || routes[0];
}

function routeTypeBonus(item, terms) {
  const joined = terms.join(" ");
  const typeMap = {
    "source packets": "source packet",
    "actor profiles": "actor profile",
    assessments: "assessment",
    trackers: "tracker",
    timelines: "timeline",
    standards: "standard",
    matrices: "matrix",
    registers: "source register"
  };
  const wanted = typeMap[joined] || "";
  return wanted && normalize(item.type).includes(wanted) ? 14 : 0;
}

function scoreItem(item, terms) {
  if (!terms.length) return 1;

  const haystack = itemHaystack(item);
  const title = normalize(item.title);
  const tagText = normalize((item.tags || []).join(" "));
  let score = routeTypeBonus(item, terms);

  terms.forEach((term) => {
    if (title.includes(term)) score += 7;
    if (tagText.includes(term)) score += 5;
    if (haystack.includes(term)) score += 2;
  });

  if (terms.length > 1 && haystack.includes(terms.join(" "))) {
    score += 6;
  }

  if (terms.includes("official") && terms.includes("sources")) {
    if (normalize(item.type) === "source register") score += 12;
    if (title.includes("official")) score += 8;
    if (haystack.includes("threat source")) score += 8;
  }

  return score;
}

function filteredItems() {
  const route = routeById(state.scope);
  const terms = words(state.query);

  return corpus
    .filter(route.match)
    .map((item) => ({ item, score: scoreItem(item, terms) }))
    .filter((entry) => !terms.length || entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .map((entry) => entry.item);
}

function bestInitialSelection(results) {
  if (results.some((item) => item.path === state.selectedPath)) return state.selectedPath;
  return results[0]?.path || "";
}

function setQuery(query) {
  state.query = query.trim();
  els.input.value = state.query;
  updateSearchUrl(state.query);
  render();
}

function setScope(scope) {
  state.scope = scope;
  state.selectedPath = "";
  render();
}

function selectItem(path) {
  state.selectedPath = path;
  render();
}

function clearLegacyQueueStorage() {
  try {
    localStorage.removeItem(LEGACY_QUEUE_STORAGE_KEY);
  } catch {
  }
}

function initialQueue() {
  clearLegacyQueueStorage();
  return [];
}

function syncQueueStorage() {
  clearLegacyQueueStorage();
}

function toggleQueue(path) {
  if (!path) return;
  if (state.queue.includes(path)) {
    state.queue = state.queue.filter((entry) => entry !== path);
  } else {
    state.queue = [path, ...state.queue].slice(0, 18);
  }
  syncQueueStorage();
  render();
}

function removeQueueItem(path) {
  state.queue = state.queue.filter((entry) => entry !== path);
  syncQueueStorage();
  render();
}

function clearQueue() {
  state.queue = [];
  syncQueueStorage();
  render();
}

function setExportStatus(message, tone = "") {
  state.exportStatus = message;
  if (els.queueStatus) {
    els.queueStatus.textContent = message;
    els.queueStatus.dataset.tone = tone;
  }
}

function exportSourceUrls(path) {
  return [...new Set([localSiteUrl(path), pathUrl(path)])];
}

async function fetchDocumentForExport(item) {
  const urls = exportSourceUrls(item.path);
  let lastError = null;

  for (const url of urls) {
    try {
      const response = await fetch(url, { credentials: "omit" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const html = await response.text();
      const parsed = new DOMParser().parseFromString(html, "text/html");
      const body = parsed.querySelector(".markdown-body");
      if (!body) throw new Error("Reader body missing");

      body.querySelectorAll("script, style").forEach((node) => node.remove());

      return {
        item,
        sourceUrl: response.url,
        title: parsed.querySelector(".article-head h1")?.textContent?.trim() || item.title,
        summary: parsed.querySelector(".article-summary")?.textContent?.trim() || item.summary || "",
        body
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(`Could not fetch ${item.path}: ${lastError?.message || "unknown error"}`);
}

function selectedTargetMap(documents) {
  const targets = new Map();

  documents.forEach((document) => {
    targets.set(String(document.item.path || "").replace(/^\/+/, ""), document.id);

    try {
      const urlPath = new URL(document.sourceUrl).pathname.replace(/^\/+/, "");
      targets.set(urlPath, document.id);
    } catch {
      // The source URL is best-effort; the corpus path above is the durable key.
    }
  });

  return targets;
}

function linkifyCodeUrls(root) {
  root.querySelectorAll("code").forEach((code) => {
    if (code.querySelector("a")) return;
    const value = code.textContent.trim();
    if (!/^https?:\/\/[^\s<>"']+$/i.test(value)) return;

    const link = document.createElement("a");
    link.href = value;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.className = "source-url";
    link.textContent = value;
    code.replaceChildren(link);
  });
}

function prepareDocumentBody(document, targets) {
  const root = document.body.cloneNode(true);

  root.querySelectorAll("[id]").forEach((node) => {
    node.id = `${document.id}-${node.id}`;
  });

  root.querySelectorAll("a[href]").forEach((link) => {
    const original = link.getAttribute("href") || "";
    if (!original) return;

    if (original.startsWith("#")) {
      link.setAttribute("href", `#${document.id}-${original.slice(1)}`);
      return;
    }

    try {
      const resolved = new URL(original, document.sourceUrl);
      const path = resolved.pathname.replace(/^\/+/, "");
      const targetId = targets.get(path);

      if (targetId) {
        const hash = resolved.hash ? `-${resolved.hash.slice(1)}` : "";
        link.setAttribute("href", `#${targetId}${hash}`);
        link.removeAttribute("target");
        link.removeAttribute("rel");
      } else {
        link.setAttribute("href", resolved.href);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noreferrer");
      }
    } catch {
      link.setAttribute("href", pathUrl(document.item.path));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer");
    }
  });

  linkifyCodeUrls(root);
  return root.innerHTML;
}

function readerPacketStyles() {
  return `
    :root {
      color-scheme: light;
      --paper: #f6f2e9;
      --sheet: #fffdf8;
      --ink: #171512;
      --muted: #645f55;
      --quiet: #8b8375;
      --line: #d9d0c1;
      --accent: #4e6530;
      --accent-strong: #263c18;
      --code: #f0eadf;
      --radius: 8px;
      --serif: Georgia, "Times New Roman", serif;
      --sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      --mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    }

    * { box-sizing: border-box; }

    html {
      min-width: 320px;
      scroll-behavior: smooth;
      background: var(--paper);
    }

    body {
      margin: 0;
      background: var(--paper);
      color: var(--ink);
      font-family: var(--sans);
      font-size: 17px;
      line-height: 1.65;
      letter-spacing: 0;
    }

    a {
      color: var(--accent-strong);
      text-decoration-color: rgba(78, 101, 48, 0.36);
      text-underline-offset: 0.18em;
    }

    .packet-shell {
      width: min(100% - 2rem, 980px);
      margin: 0 auto;
      padding: clamp(1.4rem, 4vw, 3rem) 0 4rem;
    }

    .packet-head {
      display: grid;
      gap: 0.85rem;
      padding: 0 0 clamp(1.3rem, 3vw, 2rem);
      border-bottom: 1px solid var(--line);
    }

    .packet-brand,
    .packet-meta,
    .doc-meta,
    .source-path {
      font-family: var(--mono);
      font-size: 0.74rem;
      line-height: 1.35;
      text-transform: uppercase;
    }

    .packet-brand {
      color: var(--accent);
      font-weight: 800;
    }

    .packet-head h1 {
      max-width: 780px;
      margin: 0;
      font-family: var(--serif);
      font-size: clamp(2.1rem, 5vw, 4rem);
      line-height: 1.02;
    }

    .packet-summary {
      max-width: 740px;
      margin: 0;
      color: var(--muted);
      font-size: 1.04rem;
    }

    .packet-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem 0.8rem;
      color: var(--quiet);
    }

    .packet-toc,
    .reader-doc {
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--sheet);
      box-shadow: 0 18px 42px rgba(35, 31, 24, 0.08);
    }

    .packet-toc {
      margin: clamp(1rem, 3vw, 1.6rem) 0;
      padding: clamp(1rem, 3vw, 1.35rem);
    }

    .packet-toc h2 {
      margin: 0 0 0.75rem;
      color: var(--accent);
      font-family: var(--mono);
      font-size: 0.82rem;
      text-transform: uppercase;
    }

    .packet-toc ol {
      display: grid;
      gap: 0.55rem;
      margin: 0;
      padding-left: 1.35rem;
    }

    .packet-toc a {
      font-weight: 700;
    }

    .packet-toc span {
      display: block;
      color: var(--quiet);
      font-family: var(--mono);
      font-size: 0.72rem;
      text-transform: uppercase;
    }

    .reader-doc {
      margin-top: clamp(1rem, 3vw, 1.6rem);
      overflow: hidden;
    }

    .doc-head {
      display: grid;
      gap: 0.72rem;
      padding: clamp(1rem, 3vw, 1.6rem);
      border-bottom: 1px solid var(--line);
      background: linear-gradient(180deg, #fffdf8, #faf6ee);
    }

    .doc-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.42rem 0.72rem;
      color: var(--quiet);
    }

    .doc-head h2 {
      max-width: 760px;
      margin: 0;
      font-family: var(--serif);
      font-size: clamp(1.7rem, 4vw, 2.85rem);
      line-height: 1.08;
    }

    .doc-summary {
      max-width: 760px;
      margin: 0;
      color: var(--muted);
    }

    .source-path {
      color: var(--quiet);
      overflow-wrap: anywhere;
      text-transform: none;
    }

    .doc-body {
      padding: clamp(1rem, 3vw, 1.7rem);
    }

    .markdown-body > *:first-child {
      margin-top: 0;
    }

    .markdown-body h1,
    .markdown-body h2,
    .markdown-body h3,
    .markdown-body h4 {
      color: var(--ink);
      line-height: 1.2;
    }

    .markdown-body h1 {
      margin: 0 0 1rem;
      font-family: var(--serif);
      font-size: 2rem;
    }

    .markdown-body h2 {
      margin: 2rem 0 0.75rem;
      padding-top: 0.45rem;
      border-top: 1px solid var(--line);
      color: var(--accent);
      font-family: var(--mono);
      font-size: 1rem;
      text-transform: uppercase;
    }

    .markdown-body h3 {
      margin: 1.45rem 0 0.55rem;
      font-family: var(--serif);
      font-size: 1.35rem;
    }

    .markdown-body h4 {
      margin: 1.2rem 0 0.45rem;
      color: var(--accent);
      font-family: var(--mono);
      font-size: 0.9rem;
      text-transform: uppercase;
    }

    .markdown-body p,
    .markdown-body li {
      color: var(--muted);
    }

    .markdown-body p {
      margin: 0.85rem 0;
    }

    .markdown-body ul,
    .markdown-body ol {
      margin: 0.8rem 0 1rem;
      padding-left: 1.35rem;
    }

    .markdown-body li + li {
      margin-top: 0.38rem;
    }

    .markdown-body strong {
      color: var(--ink);
    }

    .markdown-body code {
      padding: 0.08rem 0.25rem;
      border: 1px solid var(--line);
      border-radius: 4px;
      background: var(--code);
      color: var(--ink);
      font-family: var(--mono);
      font-size: 0.9em;
      overflow-wrap: anywhere;
    }

    .markdown-body pre {
      overflow: auto;
      margin: 1rem 0;
      padding: 1rem;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--code);
    }

    .markdown-body pre code {
      padding: 0;
      border: 0;
      background: transparent;
    }

    .markdown-body blockquote {
      margin: 1rem 0;
      padding: 0.1rem 0 0.1rem 1rem;
      border-left: 3px solid var(--line);
      color: var(--muted);
    }

    .table-wrap {
      overflow: auto;
      margin: 1.1rem 0;
      border: 1px solid var(--line);
      border-radius: var(--radius);
    }

    table {
      width: 100%;
      min-width: 720px;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 0.62rem 0.75rem;
      border-bottom: 1px solid var(--line);
      text-align: left;
      vertical-align: top;
    }

    th {
      color: var(--accent);
      font-family: var(--mono);
      font-size: 0.72rem;
      text-transform: uppercase;
    }

    td {
      color: var(--muted);
    }

    @media (max-width: 640px) {
      body {
        font-size: 16px;
      }

      .packet-shell {
        width: min(100% - 1rem, 980px);
        padding-top: 1rem;
      }
    }

    @media print {
      html,
      body {
        background: #fff;
      }

      .packet-shell {
        width: 100%;
        padding: 0;
      }

      .packet-toc,
      .reader-doc {
        box-shadow: none;
        break-inside: avoid;
      }

      .reader-doc {
        page-break-before: auto;
      }
    }
  `;
}

function renderReaderPacket(documents) {
  const targets = selectedTargetMap(documents);
  const generatedUtc = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const packetTitle = documents.length === 1
    ? documents[0].title
    : `WARLOCK-INDEX Reader Packet`;
  const summary = documents.length === 1
    ? documents[0].summary
    : `${documents.length} selected WARLOCK-INDEX records packaged for quiet offline reading.`;

  const toc = documents.map((document, index) => `
    <li>
      <a href="#${escapeAttr(document.id)}">${escapeHtml(document.title)}</a>
      <span>${escapeHtml(document.item.type || "Document")} / ${escapeHtml(document.item.theater || "Global")}</span>
    </li>
  `).join("");

  const records = documents.map((document, index) => `
    <section class="reader-doc" id="${escapeAttr(document.id)}">
      <header class="doc-head">
        <div class="doc-meta">
          <span>${escapeHtml(document.item.type || "Document")}</span>
          <span>${escapeHtml(document.item.theater || "Global")}</span>
          <span>${escapeHtml(document.item.domain || "Corpus")}</span>
          <span>${escapeHtml(document.item.preparedUtc ? `Prepared ${formatUtc(document.item.preparedUtc)}` : "Prepared unstated")}</span>
        </div>
        <h2>${escapeHtml(document.title)}</h2>
        <p class="doc-summary">${escapeHtml(document.summary || "WARLOCK-INDEX documentation product.")}</p>
        <a class="source-path" href="${escapeAttr(pathUrl(document.item.path))}" target="_blank" rel="noreferrer">${escapeHtml(document.item.path)}</a>
      </header>
      <div class="doc-body markdown-body">
${prepareDocumentBody(document, targets)}
      </div>
    </section>
  `).join("");

  return `<!doctype html>
<html lang="en" data-export-style="${EXPORT_STYLE_VERSION}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>${escapeHtml(packetTitle)} | WARLOCK-INDEX</title>
    <style>${readerPacketStyles()}</style>
  </head>
  <body>
    <main class="packet-shell">
      <header class="packet-head">
        <div class="packet-brand">WARLOCK-INDEX / READER PACKET</div>
        <h1>${escapeHtml(packetTitle)}</h1>
        <p class="packet-summary">${escapeHtml(summary)}</p>
        <div class="packet-meta">
          <span>Generated ${escapeHtml(generatedUtc)}</span>
          <span>${escapeHtml(formatCount(documents.length, "record"))}</span>
          <span>UNCLASSIFIED//OPEN SOURCE</span>
        </div>
      </header>
      <nav class="packet-toc" aria-label="Packet contents">
        <h2>Contents</h2>
        <ol>${toc}</ol>
      </nav>
${records}
    </main>
  </body>
</html>
`;
}

function downloadHtml(filename, html) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function exportReaderPacket(paths) {
  const items = uniqueItemsForPaths(paths);

  if (!items.length) {
    setExportStatus("Queue is empty.", "warning");
    return;
  }

  state.exporting = true;
  setExportStatus(`Building ${formatCount(items.length, "record")}...`);
  render();

  try {
    const documents = await Promise.all(items.map(fetchDocumentForExport));
    documents.forEach((document, index) => {
      document.id = `record-${index + 1}-${slugify(document.title).slice(0, 52)}`;
    });

    downloadHtml(exportFileName(items), renderReaderPacket(documents));
    setExportStatus(`Downloaded ${formatCount(items.length, "record")}.`, "success");
  } catch (error) {
    console.error(error);
    setExportStatus("Could not build packet. Open the hosted workspace or run the site from the repository root.", "error");
  } finally {
    state.exporting = false;
    render();
  }
}

function updateSearchUrl(query) {
  const url = new URL(window.location.href);
  if (query.trim() && normalize(query) !== normalize(DEFAULT_QUERY)) {
    url.searchParams.set("q", query.trim());
  } else {
    url.searchParams.delete("q");
  }
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function setupInstallPrompt() {
  if (!els.installApp || isStandaloneMode()) return;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    els.installApp.hidden = false;
  });

  els.installApp.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    els.installApp.hidden = true;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice.catch(() => undefined);
    deferredInstallPrompt = null;
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    els.installApp.hidden = true;
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js", { updateViaCache: "none" })
      .then((registration) => registration.update().catch(() => undefined))
      .catch(() => undefined);
  });
}

function renderRoutes() {
  els.routeList.innerHTML = routes
    .map((route) => {
      const count = corpus.filter(route.match).length;
      return `
        <button class="route-link" type="button" data-route="${escapeHtml(route.id)}" aria-current="${route.id === state.scope}">
          <strong>${escapeHtml(route.label)}</strong>
          <span>${escapeHtml(String(count))}</span>
        </button>
      `;
    })
    .join("");
}

function renderQuickRoutes() {
  const active = normalize(state.query);
  els.quickRoutes.innerHTML = quickRoutes
    .map((label) => `
      <button type="button" data-query="${escapeHtml(label)}" aria-pressed="${normalize(label) === active}">
        ${escapeHtml(label)}
      </button>
    `)
    .join("");
}

function renderResults(results) {
  if (!results.length) {
    els.resultList.innerHTML = `<div class="empty-state">No matching corpus route</div>`;
    return;
  }

  els.resultList.innerHTML = results
    .slice(0, 80)
    .map((item) => {
      const facts = [
        item.preparedUtc ? `Prepared ${formatUtc(item.preparedUtc)}` : "",
        item.confidence ? `Confidence ${confidenceLabel(item.confidence)}` : "",
        item.productId || ""
      ].filter(Boolean);
      return `
        <button class="result-row ${item.path === state.selectedPath ? "is-selected" : ""}" type="button" data-path="${escapeHtml(item.path)}" role="listitem">
          <span class="row-main">
            <span class="row-meta">
              <strong>${escapeHtml(item.type || "Document")}</strong>
              <span>${escapeHtml(item.theater || "Global")}</span>
              <span>${escapeHtml(item.domain || "Corpus")}</span>
            </span>
            <strong class="row-title">${escapeHtml(item.title)}</strong>
            <span class="row-summary">${escapeHtml(item.summary || "WARLOCK-INDEX documentation product.")}</span>
            <span class="row-facts">
              ${facts.map((fact) => `<span>${escapeHtml(fact)}</span>`).join("")}
            </span>
          </span>
          <span class="row-path">${escapeHtml(item.path)}</span>
        </button>
      `;
    })
    .join("");
}

function renderPreview(item) {
  if (!item) {
    els.preview.innerHTML = `
      <div class="preview-head">
        <p class="preview-kicker">No selection</p>
        <h2 class="preview-title">Select a corpus record</h2>
      </div>
    `;
    return;
  }

  const queued = state.queue.includes(item.path);
  const tags = (item.tags || []).slice(0, 12);

  els.preview.innerHTML = `
    <div class="preview-head">
      <p class="preview-kicker">${escapeHtml(item.type || "Document")}</p>
      <h2 class="preview-title">${escapeHtml(item.title)}</h2>
      <p class="preview-summary">${escapeHtml(item.summary || "WARLOCK-INDEX documentation product.")}</p>
      <div class="preview-actions">
        <a class="action-button" href="${escapeHtml(pathUrl(item.path))}" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-open"></use></svg>
          <span>Open on site</span>
        </a>
        <button class="action-button" type="button" id="download-selected"${state.exporting ? " disabled" : ""}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-package"></use></svg>
          <span>Reader file</span>
        </button>
        <button class="action-button" type="button" id="queue-selected">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="${queued ? "#icon-check" : "#icon-plus"}"></use></svg>
          <span>${queued ? "Queued" : "Queue"}</span>
        </button>
      </div>
    </div>
    <div class="preview-body">
      <div class="detail-grid">
        ${detail("Theater", item.theater || "Global")}
        ${detail("Domain", item.domain || "Corpus")}
        ${detail("Prepared", formatUtc(item.preparedUtc))}
        ${detail("Cutoff", formatUtc(item.cutoffUtc))}
        ${detail("Confidence", confidenceLabel(item.confidence))}
        ${detail("Product ID", item.productId || "Unstated")}
        ${detail("Path", item.path || "")}
      </div>
      <div class="tag-list" aria-label="Tags">
        ${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
    </div>
  `;
}

function detail(label, value) {
  return `
    <div class="detail">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderQueue() {
  const items = state.queue
    .map((path) => corpus.find((item) => item.path === path))
    .filter(Boolean);

  if (!items.length) {
    els.queue.innerHTML = `<p class="queue-empty">No queued records</p>`;
    return;
  }

  els.queue.innerHTML = items
    .map((item) => `
      <div class="queue-item">
        <button type="button" data-select="${escapeHtml(item.path)}" title="Select queued record">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-open"></use></svg>
        </button>
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.type || "Document")}</span>
        </div>
        <button type="button" data-remove="${escapeHtml(item.path)}" title="Remove from queue" aria-label="Remove ${escapeHtml(item.title)} from queue">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-x"></use></svg>
        </button>
      </div>
    `)
    .join("");
}

function render() {
  const results = filteredItems();
  state.selectedPath = bestInitialSelection(results);
  const selected = corpus.find((item) => item.path === state.selectedPath);
  const route = routeById(state.scope);

  els.corpusCount.textContent = formatCount(corpus.length, "record");
  els.activeScopeLabel.textContent = route.label;
  els.heading.textContent = state.query || route.label;
  els.resultCount.textContent = formatCount(results.length, "match");

  renderRoutes();
  renderQuickRoutes();
  renderResults(results);
  renderPreview(selected);
  renderQueue();
  if (els.downloadQueue) {
    els.downloadQueue.disabled = !state.queue.length || state.exporting;
  }
  if (els.queueStatus) {
    els.queueStatus.textContent = state.exportStatus;
    els.queueStatus.dataset.tone = state.exportStatus ? (els.queueStatus.dataset.tone || "") : "";
  }
  els.app.dataset.ready = "true";
}

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  setQuery(els.input.value);
});

els.routeList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-route]");
  if (button) setScope(button.dataset.route);
});

els.quickRoutes.addEventListener("click", (event) => {
  const button = event.target.closest("[data-query]");
  if (button) setQuery(button.dataset.query);
});

els.resultList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-path]");
  if (button) selectItem(button.dataset.path);
});

els.preview.addEventListener("click", (event) => {
  if (event.target.closest("#download-selected")) {
    exportReaderPacket([state.selectedPath]);
  }

  if (event.target.closest("#queue-selected")) {
    toggleQueue(state.selectedPath);
  }
});

els.queue.addEventListener("click", (event) => {
  const remove = event.target.closest("[data-remove]");
  const select = event.target.closest("[data-select]");
  if (remove) removeQueueItem(remove.dataset.remove);
  if (select) selectItem(select.dataset.select);
});

els.clearQueue.addEventListener("click", clearQueue);
els.downloadQueue?.addEventListener("click", () => exportReaderPacket(state.queue));

els.input.value = state.query;
setupInstallPrompt();
registerServiceWorker();
render();
loadTrafficSummary();
