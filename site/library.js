const filterInput = document.querySelector("#doc-filter");
const sidebar = document.querySelector(".reader-sidebar");
const docNav = document.querySelector(".doc-nav");
const queueControl = document.querySelector("[data-queue-control]");
const queueInput = queueControl?.querySelector("input[type='checkbox']");
const queueText = queueControl?.querySelector(".queue-toggle-text");
const QUEUE_STORAGE_KEY = "wi.queue.paths";
const MAX_QUEUE_ITEMS = 18;

if (docNav && !docNav.querySelector("[data-site-route='workspace']")) {
  docNav.insertAdjacentHTML("afterbegin", `
    <section class="doc-group site-routes is-open" data-default-open="true">
      <h2>
        <button class="doc-group-toggle" type="button" aria-expanded="true" aria-controls="doc-group-site-panel">
          <span>Site</span>
          <span class="doc-group-count">1</span>
        </button>
      </h2>
      <div class="doc-group-links" id="doc-group-site-panel">
        <a class="doc-link site-route-link" href="/workspace/" data-site-route="workspace" data-filter="workspace wi browse records download application pwa android apple ios ipad macos windows linux">
          <strong>Workspace</strong>
          <span>Browse / download</span>
        </a>
      </div>
    </section>
  `);
}

const links = [...document.querySelectorAll(".doc-link")];
const groups = [...document.querySelectorAll(".doc-group")];
const groupToggles = [...document.querySelectorAll(".doc-group-toggle")];
let wasFiltering = false;
let userAdjustedGroups = false;

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function tokensFor(value) {
  return normalize(value).split(" ").filter(Boolean);
}

function readQueue() {
  try {
    const paths = JSON.parse(localStorage.getItem(QUEUE_STORAGE_KEY) || "[]");
    return Array.isArray(paths) ? paths.filter((path) => typeof path === "string" && path.trim()) : [];
  } catch {
    return [];
  }
}

function writeQueue(paths) {
  const seen = new Set();
  const cleanPaths = paths
    .filter((path) => typeof path === "string" && path.trim())
    .filter((path) => {
      if (seen.has(path)) return false;
      seen.add(path);
      return true;
    })
    .slice(0, MAX_QUEUE_ITEMS);

  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(cleanPaths));
  } catch {
    return readQueue();
  }

  return cleanPaths;
}

function setQueueControlState(isQueued) {
  if (!queueControl || !queueInput) return;
  queueInput.checked = isQueued;
  queueControl.classList.toggle("is-queued", isQueued);
  queueControl.setAttribute("aria-label", isQueued ? "Remove this record from Workspace queue" : "Queue this record for Workspace");
  if (queueText) queueText.textContent = isQueued ? "Queued for Workspace" : "Queue for Workspace";
}

function syncQueueControl() {
  const queuePath = queueControl?.dataset.queuePath;
  if (!queuePath || !queueInput) return;
  setQueueControlState(readQueue().includes(queuePath));
}

function toggleCurrentQueue() {
  const queuePath = queueControl?.dataset.queuePath;
  if (!queuePath) return;
  const queue = readQueue();
  const isQueued = queue.includes(queuePath);
  const nextQueue = isQueued
    ? queue.filter((path) => path !== queuePath)
    : [queuePath, ...queue];
  const savedQueue = writeQueue(nextQueue);
  setQueueControlState(savedQueue.includes(queuePath));
}

function setGroupExpanded(group, isExpanded) {
  const toggle = group.querySelector(".doc-group-toggle");
  const panel = group.querySelector(".doc-group-links");
  group.classList.toggle("is-open", isExpanded);
  toggle?.setAttribute("aria-expanded", String(isExpanded));
  if (panel) panel.hidden = !isExpanded;
}

function isPageDefaultGroup(group) {
  return group.dataset.defaultOpen === "true"
    || group.classList.contains("site-routes")
    || !!group.querySelector(".doc-link.is-active, .doc-link[aria-current='page']");
}

function resetLinksForUnfilteredView() {
  links.forEach((link) => {
    link.hidden = false;
  });

  groups.forEach((group) => {
    group.hidden = !group.querySelector(".doc-link");
  });
}

function resetToPageDefaults() {
  wasFiltering = false;
  userAdjustedGroups = false;

  if (filterInput) filterInput.value = "";
  resetLinksForUnfilteredView();

  groups.forEach((group) => {
    delete group.dataset.preFilterOpen;
    setGroupExpanded(group, isPageDefaultGroup(group));
  });

  sidebar?.classList.remove("is-empty");
}

function applyFilter() {
  const queryTokens = tokensFor(filterInput?.value || "");
  const hasQuery = queryTokens.length > 0;
  let visibleCount = 0;

  if (hasQuery && !wasFiltering) {
    groups.forEach((group) => {
      group.dataset.preFilterOpen = String(group.classList.contains("is-open"));
    });
  }

  links.forEach((link) => {
    const haystack = normalize(`${link.textContent} ${link.dataset.filter || ""} ${link.getAttribute("href") || ""}`);
    const isVisible = !queryTokens.length || queryTokens.every((token) => haystack.includes(token));
    link.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  groups.forEach((group) => {
    const hasVisibleLink = !!group.querySelector(".doc-link:not([hidden])");
    group.hidden = !hasVisibleLink;
    if (hasQuery) {
      setGroupExpanded(group, hasVisibleLink);
    } else if (wasFiltering) {
      setGroupExpanded(group, group.dataset.preFilterOpen === "true");
      delete group.dataset.preFilterOpen;
    } else if (!userAdjustedGroups) {
      setGroupExpanded(group, isPageDefaultGroup(group));
    } else {
      setGroupExpanded(group, group.classList.contains("is-open"));
    }
  });

  sidebar?.classList.toggle("is-empty", visibleCount === 0);
  wasFiltering = hasQuery;
}

groupToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const group = toggle.closest(".doc-group");
    if (!group) return;
    userAdjustedGroups = true;
    setGroupExpanded(group, !group.classList.contains("is-open"));
  });
});

filterInput?.addEventListener("input", applyFilter);
queueInput?.addEventListener("change", toggleCurrentQueue);
window.addEventListener("storage", (event) => {
  if (event.key === QUEUE_STORAGE_KEY) syncQueueControl();
});
resetToPageDefaults();
applyFilter();
syncQueueControl();

window.addEventListener("pageshow", (event) => {
  const navigation = performance.getEntriesByType?.("navigation")?.[0];
  if (event.persisted || navigation?.type === "back_forward") resetToPageDefaults();
});

// Cite this support
(function initCite() {
  const articleHead = document.querySelector(".article-head");
  if (!articleHead) return;

  const citeBtn = articleHead.querySelector(".cite-button");
  const details = articleHead.querySelector(".cite-box");
  const pre = articleHead.querySelector(".cite-text");
  const copyBtn = articleHead.querySelector(".copy-cite");

  if (!citeBtn || !details || !pre) return;

  const title = document.querySelector(".article-head h1")?.textContent?.trim() || document.title;
  const sourcePathEl = articleHead.querySelector(".source-path");
  const sourcePath = sourcePathEl ? sourcePathEl.textContent.trim() : "";
  const metaEls = Array.from(articleHead.querySelectorAll(".article-meta span"));
  const type = metaEls[0]?.textContent?.trim() || "";
  const theater = metaEls[1]?.textContent?.trim() || "";
  const prepared = Array.from(document.querySelectorAll(".markdown-body strong, .markdown-body p, .markdown-body li"))
    .map(el => el.textContent || "")
    .find(t => /Prepared UTC/i.test(t)) || "";

  const url = location.href.split("#")[0];
  const today = new Date().toISOString().slice(0, 10);

  const citation = `WARLOCK-INDEX. "${title}". ${type ? type + ", " : ""}${theater ? theater + ". " : ""}Prepared ${prepared ? prepared.replace(/^.*Prepared UTC:\s*/i, "").trim() : "unstated"}. ${url} Accessed ${today}. UNCLASSIFIED//OPEN SOURCE.`;

  pre.textContent = citation;

  citeBtn.addEventListener("click", () => {
    details.hidden = !details.hidden;
    if (!details.hidden) details.open = true;
  });

  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.textContent);
      const orig = copyBtn.textContent;
      copyBtn.textContent = "Copied";
      setTimeout(() => { copyBtn.textContent = orig; }, 1400);
    } catch (e) {
      // fallback select
      const range = document.createRange();
      range.selectNodeContents(pre);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });
})();
