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
