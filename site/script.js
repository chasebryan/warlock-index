const corpus = window.WARLOCK_INDEX_CORPUS || [];

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const output = document.querySelector("#terminal-output");
const latestList = document.querySelector("#latest-list");
const resultStatus = document.querySelector("#result-status");
const resultCount = document.querySelector("#result-count");
const statusUpdated = document.querySelector("#status-updated");
const suggestionButtons = document.querySelectorAll("[data-query]");

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

const defaultResults = productItems.slice(0, 5);

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
    return defaultResults;
  }

  const terms = normalized.split(" ").filter(Boolean);
  return productItems
    .map((item) => ({ item, score: scoreItem(item, terms) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || itemDate(b.item).getTime() - itemDate(a.item).getTime())
    .slice(0, 5)
    .map((entry) => entry.item);
}

function routeLine(query, results) {
  if (!query.trim()) {
    return "Default: recent indexed entries.";
  }

  if (results.length === 0) {
    return `No direct hit for "${query}".`;
  }

  const types = [...new Set(results.map((item) => item.type))].slice(0, 3).join(", ");
  return `Matched "${query}" across ${results.length} route${results.length === 1 ? "" : "s"}: ${types}.`;
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

function renderResultRow(item) {
  const date = itemDate(item);
  return `
    <tr>
      <td>
        <div class="result-title-cell">
          <span class="doc-glyph" aria-hidden="true"></span>
          <div>
            <a class="result-title" href="${escapeHtml(item.path)}">${escapeHtml(item.title)}</a>
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

function renderResults(query, results) {
  const fallback = results.length ? results : defaultResults;
  output.innerHTML = fallback.map(renderResultRow).join("");
  resultStatus.textContent = routeLine(query, results);
  resultCount.textContent = `Showing results 1-${fallback.length} of ${productItems.length}`;
}

function renderLatest() {
  latestList.innerHTML = productItems.slice(0, 5).map((item) => `
    <article class="latest-item">
      <time class="latest-date" datetime="${escapeHtml(itemDate(item)?.toISOString() || "")}">
        ${escapeHtml(formatShortDate(itemDate(item)))}
      </time>
      <a href="${escapeHtml(item.path)}">${escapeHtml(item.title)}</a>
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
