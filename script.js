const corpus = window.WARLOCK_INDEX_CORPUS || [];

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const output = document.querySelector("#terminal-output");
const latestList = document.querySelector("#latest-list");
const resultStatus = document.querySelector("#result-status");
const resultCount = document.querySelector("#result-count");
const statusUpdated = document.querySelector("#status-updated");
const suggestionButtons = document.querySelectorAll("[data-query]");

const PAGE_SIZE = 5;
let currentQuery = "";
let currentAllResults = [];
let currentPage = 1;

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

function parseDate(value) {
  const source = String(value || "");
  const match = source.match(/(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):?(\d{2})?(?::?(\d{2}))?Z?)?/);
  if (!match) return null;

  const [, year, month, day, hour = "00", minute = "00", second = "00"] = match;
  const date = new Date(Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute || "00"),
    Number(second || "00")
  ));

  return Number.isNaN(date.getTime()) ? null : date;
}

function itemDate(item) {
  return parseDate(item.preparedUtc) || parseDate(item.cutoffUtc) || parseDate(item.path);
}

function isProduct(item) {
  return item
    && item.path
    && !["Directory", "Navigation"].includes(item.type)
    && itemDate(item);
}

const productItems = corpus
  .filter(isProduct)
  .sort((a, b) => itemDate(b).getTime() - itemDate(a).getTime() || a.title.localeCompare(b.title));

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
    item.tags.join(" ")
  ].join(" "));
}

function routeTypeForTerms(terms) {
  const joined = terms.join(" ");
  const routes = {
    "source packets": "source packet",
    "actor profiles": "actor profile",
    assessments: "assessment",
    collections: "document",
    trackers: "tracker",
    timelines: "timeline",
    standards: "standard",
    matrices: "matrix",
    maps: "map resource"
  };
  return routes[joined] || "";
}

function scoreItem(item, terms) {
  const haystack = itemHaystack(item);
  const title = normalize(item.title);
  const tagText = normalize(item.tags.join(" "));
  const routeType = routeTypeForTerms(terms);
  let score = 0;

  terms.forEach((term) => {
    if (title.includes(term)) score += 8;
    if (tagText.includes(term)) score += 5;
    if (haystack.includes(term)) score += 2;
  });

  if (terms.length > 1 && haystack.includes(terms.join(" "))) {
    score += 7;
  }

  if (routeType && normalize(item.type) === routeType) {
    score += 16;
  }

  if (terms.includes("official") && terms.includes("sources")) {
    if (normalize(item.type) === "source register") score += 12;
    if (title.includes("official") || haystack.includes("threat source")) score += 8;
  }

  if (itemDate(item)) {
    score += 1;
  }

  return score;
}

function searchCorpus(query) {
  const normalized = normalize(query);
  if (!normalized) {
    return productItems;
  }

  const terms = normalized.split(" ").filter(Boolean);
  return productItems
    .map((item) => ({ item, score: scoreItem(item, terms) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || itemDate(b.item).getTime() - itemDate(a.item).getTime())
    .map((entry) => entry.item);
}

function routeLine(query, results, totalMatches) {
  if (!query || !query.trim()) {
    return "Default: recent indexed entries.";
  }

  const matchCount = (typeof totalMatches === "number" && totalMatches > 0) ? totalMatches : results.length;

  if (results.length === 0) {
    return `No direct hit for "${query}".`;
  }

  const types = [...new Set(results.map((item) => item.type))].slice(0, 3).join(", ");
  return `Matched "${query}" across ${matchCount} route${matchCount === 1 ? "" : "s"}: ${types}.`;
}

function formatShortDate(value) {
  const date = value instanceof Date ? value : parseDate(value);
  if (!date) return "UNDATE";

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase();
  return `${day} ${month} ${date.getUTCFullYear()}`;
}

function formatStatusDate(date) {
  if (!date) return "";
  const pad = (value) => String(value).padStart(2, "0");
  return [
    date.getUTCFullYear(),
    "-",
    pad(date.getUTCMonth() + 1),
    "-",
    pad(date.getUTCDate()),
    " ",
    pad(date.getUTCHours()),
    ":",
    pad(date.getUTCMinutes()),
    ":",
    pad(date.getUTCSeconds()),
    "Z"
  ].join("");
}

function displaySummary(value) {
  return String(value ?? "")
    .replace(/\bWARLOCK-INDEX\b/g, "the corpus")
    .replace(/\bWarlock-Index\b/g, "the corpus")
    .replace(/\bwarlock-index\b/g, "the corpus");
}

function trimSummary(value, maxLength = 180) {
  const summary = displaySummary(value).replace(/\s+/g, " ").trim();
  if (summary.length <= maxLength) return summary;
  return `${summary.slice(0, maxLength - 1).trim()}…`;
}

function collectionLabel(item) {
  const path = item.path || "";
  if (path.includes("/assessments/")) return "Assessments";
  if (path.includes("/collections/")) return "Collections";
  if (path.includes("/source-registers/")) return "Sources";
  if (path.includes("/standards/")) return "Standards";
  if (path.includes("/maps/")) return "Maps";
  return item.domain || item.theater || "Corpus";
}

function itemBadges(item) {
  const badges = Array.isArray(item.badges) && item.badges.length
    ? item.badges
    : [item.type, item.theater, item.domain].filter(Boolean);
  return [...new Set(badges)].slice(0, 5);
}

function renderBadges(item) {
  return `
    <div class="doc-badges">
      ${itemBadges(item).map((badge) => `<span>${escapeHtml(badge)}</span>`).join("")}
    </div>
  `;
}

function renderResultRow(item) {
  const date = itemDate(item);
  return `
    <tr>
      <td>
        <div class="result-title-cell">
          <span class="doc-glyph" aria-hidden="true"></span>
          <div>
            <a class="result-title" href="${escapeHtml(item.path)}">${escapeHtml(item.title)}</a>
            ${renderBadges(item)}
            <p class="result-summary">${escapeHtml(trimSummary(item.summary))}</p>
          </div>
        </div>
      </td>
      <td>${escapeHtml(item.type || "Document")}</td>
      <td>${escapeHtml(formatShortDate(date))}</td>
      <td>${escapeHtml(collectionLabel(item))}</td>
      <td>HTML</td>
    </tr>
  `;
}

function renderCurrentPage() {
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pageItems = currentAllResults.slice(startIdx, startIdx + PAGE_SIZE);
  const total = currentAllResults.length;
  const startNum = total > 0 ? startIdx + 1 : 0;
  const endNum = Math.min(startIdx + PAGE_SIZE, total);

  output.innerHTML = pageItems.map(renderResultRow).join("");
  resultStatus.textContent = routeLine(currentQuery, pageItems, currentAllResults.length);

  if (!currentQuery || !currentQuery.trim()) {
    resultCount.textContent = total > 0
      ? `Showing results ${startNum}-${endNum} of ${total}`
      : "No results";
  } else if (total === 0) {
    resultCount.textContent = `No matching results for "${currentQuery}"`;
  } else {
    resultCount.textContent = `Showing results ${startNum}-${endNum} of ${total} matches`;
  }

  renderPager(total);
}

function renderPager(total) {
  const pagerEl = document.querySelector(".results-footer .pager");
  if (!pagerEl) return;
  pagerEl.innerHTML = "";

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (totalPages <= 1) {
    const span = document.createElement("span");
    span.className = "is-current";
    span.textContent = "1";
    pagerEl.appendChild(span);
    return;
  }

  const addPageSpan = (p, isCurrent) => {
    const span = document.createElement("span");
    if (isCurrent) span.className = "is-current";
    span.textContent = String(p);
    span.style.cursor = "pointer";
    span.addEventListener("click", () => {
      if (currentPage !== p) {
        currentPage = p;
        renderCurrentPage();
      }
    });
    pagerEl.appendChild(span);
  };

  const addEllipsis = () => {
    const span = document.createElement("span");
    span.textContent = "...";
    pagerEl.appendChild(span);
  };

  // Show a window of pages similar to original visual density
  const windowSize = 2;
  const toShow = new Set([1, totalPages, currentPage]);
  for (let d = -windowSize; d <= windowSize; d += 1) {
    const p = currentPage + d;
    if (p >= 1 && p <= totalPages) toShow.add(p);
  }

  const sortedPages = Array.from(toShow).sort((a, b) => a - b);
  let prevShown = 0;
  sortedPages.forEach((p) => {
    if (p > prevShown + 1) addEllipsis();
    addPageSpan(p, p === currentPage);
    prevShown = p;
  });

  // Next
  const nextSpan = document.createElement("span");
  nextSpan.textContent = "Next »";
  if (currentPage < totalPages) {
    nextSpan.style.cursor = "pointer";
    nextSpan.addEventListener("click", () => {
      currentPage = Math.min(currentPage + 1, totalPages);
      renderCurrentPage();
    });
  }
  pagerEl.appendChild(nextSpan);
}

function renderResults(query, results) {
  // Back-compat shim: treat provided results as the full set for this query
  currentQuery = query || "";
  currentAllResults = Array.isArray(results) ? results : [];
  currentPage = 1;
  renderCurrentPage();
}

function renderLatest() {
  latestList.innerHTML = productItems.slice(0, 5).map((item) => `
    <article class="latest-item">
      <time class="latest-date" datetime="${escapeHtml(itemDate(item)?.toISOString() || "")}">
        ${escapeHtml(formatShortDate(itemDate(item)))}
      </time>
      <a href="${escapeHtml(item.path)}">${escapeHtml(item.title)}</a>
      ${renderBadges(item)}
    </article>
  `).join("");

  const latest = itemDate(productItems[0]);
  if (latest && statusUpdated) {
    statusUpdated.dateTime = latest.toISOString();
    statusUpdated.textContent = formatStatusDate(latest);
  }
}

function setActiveRoute(query) {
  const normalized = normalize(query);
  suggestionButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(normalize(button.dataset.query) === normalized));
  });
}

function updateSearchUrl(query) {
  const url = new URL(window.location.href);
  if (query.trim()) {
    url.searchParams.set("q", query.trim());
  } else {
    url.searchParams.delete("q");
  }
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = input.value;
  renderResults(query, searchCorpus(query));
  setActiveRoute(query);
  updateSearchUrl(query);
});

suggestionButtons.forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    input.value = button.dataset.query;
    renderResults(input.value, searchCorpus(input.value));
    setActiveRoute(input.value);
    updateSearchUrl(input.value);
    input.focus();
  });
});

renderLatest();

const initialQuery = new URLSearchParams(window.location.search).get("q") || "";
if (initialQuery) {
  input.value = initialQuery;
}
renderResults(initialQuery, searchCorpus(initialQuery));
setActiveRoute(initialQuery);

const globalMap = {
  panel: document.querySelector(".global-map-panel"),
  stage: document.querySelector(".global-map-stage"),
  markers: document.querySelector("#global-map-markers"),
  filters: document.querySelector("#global-map-filters"),
  count: document.querySelector("#global-map-count"),
  fullscreen: document.querySelector("#global-map-fullscreen"),
  reset: document.querySelector("#global-map-reset"),
  title: document.querySelector("#global-map-selected-title"),
  summary: document.querySelector("#global-map-selected-summary"),
  placement: document.querySelector("#global-map-selected-placement"),
  link: document.querySelector("#global-map-selected-link"),
  updates: [],
  selectedId: "",
  category: "all"
};

function visibleMapUpdates() {
  if (globalMap.category === "all") return globalMap.updates;
  return globalMap.updates.filter((item) => item.category === globalMap.category);
}

function renderGlobalMapFilters() {
  const categories = ["all", ...new Set(globalMap.updates.map((item) => item.category))];
  globalMap.filters.innerHTML = categories.map((category) => `
    <button
      type="button"
      data-map-filter="${escapeHtml(category)}"
      aria-pressed="${category === globalMap.category ? "true" : "false"}"
    >${escapeHtml(category)}</button>
  `).join("");
}

function renderGlobalMapMarkers(updates) {
  globalMap.markers.innerHTML = updates.map((item) => `
    <button
      class="global-map-marker"
      type="button"
      data-map-id="${escapeHtml(item.id)}"
      data-title="${escapeHtml(`${item.title} / ${item.anchor || item.region}`)}"
      data-shape="${escapeHtml(item.shape)}"
      data-category="${escapeHtml(item.category)}"
      data-status="${escapeHtml(item.status)}"
      style="left:${Number(item.x)}%;top:${Number(item.y)}%"
      aria-label="${escapeHtml(`${item.title}, ${item.anchor || item.region}`)}"
    ></button>
  `).join("");
  globalMap.count.textContent = `${updates.length} update${updates.length === 1 ? "" : "s"}`;
}

function selectGlobalMapUpdate(id) {
  globalMap.selectedId = id;
  const item = globalMap.updates.find((update) => update.id === id);
  document.querySelectorAll("[data-map-id]").forEach((element) => {
    element.classList.toggle("is-active", element.dataset.mapId === id);
  });

  if (!item) {
    globalMap.stage?.classList.remove("is-selected");
    globalMap.title.textContent = "Choose a map point";
    globalMap.summary.textContent = "Select a marker to open the record behind it.";
    if (globalMap.placement) {
      globalMap.placement.textContent = "";
      globalMap.placement.hidden = true;
    }
    globalMap.link.hidden = true;
    return;
  }

  globalMap.stage?.classList.add("is-selected");
  globalMap.title.textContent = item.title;
  globalMap.summary.textContent = `${item.region} / ${item.category} / ${item.date}. ${item.summary}`;
  if (globalMap.placement) {
    globalMap.placement.textContent = `${item.anchor || item.region}. ${item.placement || "Marker placement follows the record's primary geographic source lane."}`;
    globalMap.placement.hidden = false;
  }
  globalMap.link.href = item.url;
  globalMap.link.hidden = false;
}

function renderGlobalMap() {
  const updates = visibleMapUpdates();
  renderGlobalMapFilters();
  renderGlobalMapMarkers(updates);

  if (globalMap.selectedId && !updates.some((item) => item.id === globalMap.selectedId)) {
    selectGlobalMapUpdate("");
  } else if (globalMap.selectedId) {
    selectGlobalMapUpdate(globalMap.selectedId);
  }
}

function updateGlobalMapFullscreenState() {
  if (!globalMap.fullscreen || !globalMap.panel) return;
  const isFullscreen = document.fullscreenElement === globalMap.panel;
  globalMap.fullscreen.textContent = isFullscreen ? "Exit full screen" : "Full screen";
  globalMap.fullscreen.setAttribute("aria-pressed", String(isFullscreen));
}

async function initGlobalMap() {
  if (!globalMap.markers || !globalMap.filters) return;

  if (!globalMap.panel?.requestFullscreen || !document.exitFullscreen) {
    globalMap.fullscreen?.setAttribute("hidden", "");
  }

  try {
    const response = await fetch("global-map-updates.json");
    if (!response.ok) throw new Error(`Map update request failed: ${response.status}`);
    globalMap.updates = await response.json();
    renderGlobalMap();
  } catch (error) {
    globalMap.count.textContent = "Map updates unavailable";
  }

  globalMap.markers.addEventListener("click", (event) => {
    const target = event.target.closest("[data-map-id]");
    if (!target) return;
    selectGlobalMapUpdate(target.dataset.mapId);
  });

  globalMap.stage?.addEventListener("click", (event) => {
    if (event.target.closest("[data-map-id], .global-map-drawer, .global-map-legend")) return;
    selectGlobalMapUpdate("");
  });

  globalMap.filters.addEventListener("click", (event) => {
    const target = event.target.closest("[data-map-filter]");
    if (!target) return;
    globalMap.category = target.dataset.mapFilter;
    renderGlobalMap();
  });

  globalMap.reset.addEventListener("click", () => {
    globalMap.category = "all";
    renderGlobalMap();
    selectGlobalMapUpdate("");
  });

  globalMap.fullscreen?.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement === globalMap.panel) {
        await document.exitFullscreen();
      } else {
        await globalMap.panel.requestFullscreen();
      }
    } catch (error) {
      globalMap.fullscreen.setAttribute("hidden", "");
    } finally {
      updateGlobalMapFullscreenState();
    }
  });

  document.addEventListener("fullscreenchange", updateGlobalMapFullscreenState);
  updateGlobalMapFullscreenState();
}

initGlobalMap();
