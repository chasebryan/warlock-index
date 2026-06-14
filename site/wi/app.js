const corpus = Array.isArray(window.WARLOCK_INDEX_CORPUS)
  ? window.WARLOCK_INDEX_CORPUS
  : [];

const SITE_ROOT = "https://www.warlock-index.org/";
const STORAGE_KEY = "wi.queue.paths";
const DEFAULT_QUERY = "strategic weapons";

const routes = [
  { id: "all", label: "All records", match: () => true },
  { id: "assessments", label: "Assessments", match: (item) => item.type === "Assessment" },
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
  queue: readQueue()
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
  clearQueue: document.querySelector("#clear-queue")
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

function pathUrl(path) {
  try {
    return new URL(String(path || ""), SITE_ROOT).href;
  } catch {
    return SITE_ROOT;
  }
}

function fileNameFromPath(path) {
  return String(path || "warlock-index-record.html").split("/").filter(Boolean).pop() || "warlock-index-record.html";
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

function readQueue() {
  try {
    const paths = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(paths) ? paths.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function writeQueue() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.queue));
}

function toggleQueue(path) {
  if (!path) return;
  if (state.queue.includes(path)) {
    state.queue = state.queue.filter((entry) => entry !== path);
  } else {
    state.queue = [path, ...state.queue].slice(0, 18);
  }
  writeQueue();
  render();
}

function removeQueueItem(path) {
  state.queue = state.queue.filter((entry) => entry !== path);
  writeQueue();
  render();
}

function clearQueue() {
  state.queue = [];
  writeQueue();
  render();
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
    navigator.serviceWorker.register("./service-worker.js").catch(() => undefined);
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
        <a class="action-button" href="${escapeHtml(pathUrl(item.path))}" download="${escapeHtml(fileNameFromPath(item.path))}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-install"></use></svg>
          <span>Download file</span>
        </a>
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

els.input.value = state.query;
setupInstallPrompt();
registerServiceWorker();
render();
