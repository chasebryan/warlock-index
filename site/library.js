const filterInput = document.querySelector("#doc-filter");
const sidebar = document.querySelector(".reader-sidebar");
const docNav = document.querySelector(".doc-nav");

if (docNav && !docNav.querySelector("[data-site-route='workspace']")) {
  docNav.insertAdjacentHTML("afterbegin", `
    <section class="doc-group site-routes">
      <h2>Site</h2>
      <a class="doc-link site-route-link" href="/workspace/" data-site-route="workspace" data-filter="workspace wi browse records download application pwa android apple ios ipad macos windows linux">
        <strong>Workspace</strong>
        <span>Browse / download</span>
      </a>
    </section>
  `);
}

const links = [...document.querySelectorAll(".doc-link")];
const groups = [...document.querySelectorAll(".doc-group")];

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function tokensFor(value) {
  return normalize(value).split(" ").filter(Boolean);
}

function applyFilter() {
  const queryTokens = tokensFor(filterInput?.value || "");
  let visibleCount = 0;

  links.forEach((link) => {
    const haystack = normalize(`${link.textContent} ${link.getAttribute("href") || ""}`);
    const isVisible = !queryTokens.length || queryTokens.every((token) => haystack.includes(token));
    link.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  groups.forEach((group) => {
    group.hidden = !group.querySelector(".doc-link:not([hidden])");
  });

  sidebar?.classList.toggle("is-empty", visibleCount === 0);
}

filterInput?.addEventListener("input", applyFilter);
applyFilter();

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
