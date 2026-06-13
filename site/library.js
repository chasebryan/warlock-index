const filterInput = document.querySelector("#doc-filter");
const sidebar = document.querySelector(".reader-sidebar");
const links = [...document.querySelectorAll(".doc-link")];
const groups = [...document.querySelectorAll(".doc-group")];

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function applyFilter() {
  const query = normalize(filterInput?.value || "");
  let visibleCount = 0;

  links.forEach((link) => {
    const haystack = normalize(link.textContent);
    const isVisible = !query || haystack.includes(query);
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
