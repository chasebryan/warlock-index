import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(siteRoot, "..");
const docsRoot = path.join(repoRoot, "docs");
const libraryRoot = path.join(siteRoot, "library");
const posix = path.posix;
const siteOrigin = "https://www.warlock-index.org";
const siteName = "WARLOCK-INDEX";
const libraryAssetVersion = "20260617-green-press";
const feedAssetVersion = "20260617-green-press";
const feedItemLimit = 40;

const preferredOrder = [
  "index.md",
  "assessments/README.md",
  "collections/coverage-map.md",
  "standards/product-standard.md",
  "standards/source-evaluation.md",
  "source-registers/official-us.md",
  "source-registers/allied-multilateral.md",
  "source-registers/research-and-media.md",
  "maps/README.md"
];

const groupOrder = [
  "Navigation",
  "Assessments",
  "Collections",
  "Maps",
  "Actor Profiles",
  "Source Packets",
  "Trackers",
  "Event Timelines",
  "Source Registers",
  "Standards",
  "Templates"
];

const escapeHtml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

const escapeAttr = (value) => escapeHtml(value).replace(/"/g, "&quot;");

const escapeXml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const stripTrailingWhitespace = (value) => value.replace(/[ \t]+$/gm, "");

function absoluteUrl(outputRel = "index.html") {
  const cleanRel = outputRel.replace(/^\/+/, "");
  return cleanRel === "index.html" ? `${siteOrigin}/` : `${siteOrigin}/${cleanRel}`;
}

function parseUtcDate(value) {
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

function feedDateForDoc(doc) {
  return parseUtcDate(doc.preparedUtc)
    || parseUtcDate(doc.cutoffUtc)
    || parseUtcDate(doc.rel);
}

const titleCase = (value) => value
  .replace(/\.md$/i, "")
  .split(/[-_./\s]+/)
  .filter(Boolean)
  .map((word) => {
    const lower = word.toLowerCase();
    const keepUpper = new Set(["us", "u", "uk", "prc", "dprk", "nato", "wmd"]);
    if (keepUpper.has(lower)) return lower.toUpperCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  })
  .join(" ");

const normalizeSlash = (value) => value.split(path.sep).join("/");

const shortHash = (value) => createHash("sha256").update(value).digest("hex").slice(0, 12);

async function collectMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function outputRelForDoc(rel) {
  if (rel === "index.md") return "library/index.html";
  if (posix.basename(rel) === "README.md") {
    const dir = posix.dirname(rel);
    return dir === "." ? "library/index.html" : `library/${dir}/index.html`;
  }
  return `library/${rel.replace(/\.md$/, ".html")}`;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function extractTitle(markdown, rel) {
  const heading = markdown.split("\n").find((line) => /^#\s+/.test(line));
  if (heading) return heading.replace(/^#\s+/, "").trim();
  if (posix.basename(rel) === "README.md") return `${titleCase(posix.dirname(rel))} Index`;
  return titleCase(posix.basename(rel, ".md"));
}

function firstParagraphAfter(lines, startIndex) {
  const paragraph = [];
  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line && paragraph.length) break;
    if (!line) continue;
    if (/^#{1,6}\s+/.test(line)) {
      if (paragraph.length) break;
      continue;
    }
    paragraph.push(line);
  }
  return paragraph.join(" ").trim();
}

function extractSummary(markdown) {
  const lines = markdown.split("\n");
  const bottomLine = lines.findIndex((line) => /^##\s+Bottom Line\b/i.test(line));
  const candidate = bottomLine >= 0 ? firstParagraphAfter(lines, bottomLine + 1) : "";
  if (candidate) return trimSummary(candidate);

  const fieldCandidate = extractField(markdown, ["Purpose", "Summary", "Use"]);
  if (fieldCandidate) return trimSummary(fieldCandidate);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line || /^#{1,6}\s+/.test(line)) continue;
    if (/^\s+\S/.test(lines[index])) continue;
    if (/^\*?\.?\*?UNCLASSIFIED\/\/OPEN SOURCE\*?\.?\*?$/i.test(line.replace(/\s+/g, " "))) continue;
    if (/^\*\*[^*]+:\*\*/.test(line)) continue;
    if (/^\|/.test(line) || /^[-*+]\s+/.test(line) || /^\d+\.\s+/.test(line)) continue;
    return trimSummary(firstParagraphAfter(lines, index));
  }

  return "WARLOCK-INDEX documentation product.";
}

function trimSummary(value) {
  const cleaned = value.replace(/\*\*/g, "").replace(/`/g, "").trim();
  return cleaned;
}

function displaySummary(value) {
  return String(value ?? "")
    .replace(/\bWARLOCK-INDEX\b/g, "the corpus")
    .replace(/\bWarlock-Index\b/g, "the corpus")
    .replace(/\bwarlock-index\b/g, "the corpus");
}

function cleanMetadataValue(value) {
  return value
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractField(markdown, labels) {
  const lines = markdown.split("\n");
  const labelPattern = labels.map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const startPattern = new RegExp(`^(?:[-*+]\\s+)?\\*\\*(?:${labelPattern}):\\*\\*\\s*(.*)$`, "i");
  const fieldPattern = /^(?:[-*+]\s+)?\*\*[^*]+:\*\*/;

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].trim().match(startPattern);
    if (!match) continue;

    const valueLines = [match[1].trim()].filter(Boolean);
    for (let next = index + 1; next < lines.length; next += 1) {
      const line = lines[next].trim();
      if (!line || /^#{1,6}\s+/.test(line) || fieldPattern.test(line)) break;
      valueLines.push(line);
    }

    return cleanMetadataValue(valueLines.join(" "));
  }

  return "";
}

function extractProductId(markdown) {
  return extractField(markdown, [
    "Product ID",
    "Profile ID",
    "Tracker ID",
    "Timeline ID",
    "Matrix ID",
    "Source Packet ID",
    "Source Register ID",
    "Standard ID"
  ]);
}

function extractConfidence(markdown) {
  const confidence = extractField(markdown, ["Analytic confidence"]);
  return confidence;
}

function inferType(rel) {
  if (rel === "index.md") return "Navigation";
  if (rel.startsWith("maps/")) return "Map Resource";
  if (posix.basename(rel) === "README.md") return "Directory";
  if (rel.startsWith("assessments/")) return "Assessment";
  if (rel.startsWith("source-registers/")) return "Source Register";
  if (rel.startsWith("standards/")) return "Standard";
  if (rel.startsWith("templates/")) return "Template";
  if (rel.includes("/source-packets/")) return "Source Packet";
  if (rel.includes("/actor-profiles/")) return "Actor Profile";
  if (rel.includes("/event-timelines/")) return "Timeline";
  if (rel.includes("/trackers/")) return "Tracker";
  if (rel.includes("/global-assimilation/")) return "Matrix";
  return "Document";
}

function inferGroup(rel, type) {
  if (rel === "index.md") return "Navigation";
  if (rel.startsWith("assessments/")) return "Assessments";
  if (rel.startsWith("maps/")) return "Maps";
  if (rel.includes("/actor-profiles/")) return "Actor Profiles";
  if (rel.includes("/source-packets/")) return "Source Packets";
  if (rel.includes("/trackers/")) return "Trackers";
  if (rel.includes("/event-timelines/")) return "Event Timelines";
  if (rel.startsWith("source-registers/")) return "Source Registers";
  if (rel.startsWith("standards/")) return "Standards";
  if (rel.startsWith("templates/")) return "Templates";
  if (rel.startsWith("collections/")) return "Collections";
  return type;
}

function inferTheater(rel) {
  const parts = rel.split("/");
  if (rel === "index.md") return "Global";
  if (parts[0] === "maps") return "Global";
  if (parts[0] === "assessments" && parts[1] && parts[1] !== "README.md") return titleCase(parts[1]);
  if (parts.includes("indo-pacific-allies-and-partners")) return "Indo-Pacific";
  if (parts.includes("nato-and-major-us-allies")) return "NATO / Allies";
  if (parts.includes("strategic-weapons")) return "Global";
  if (parts.includes("arctic-infrastructure")) return "Arctic / High North";
  if (parts.includes("red-sea-maritime-economics")) return "Middle East / Maritime";
  return parts[0] === "standards" || parts[0] === "source-registers" ? "Global" : titleCase(parts[0] || "Global");
}

function inferDomain(rel, type) {
  const parts = rel.split("/");
  if (rel === "index.md") return "Corpus";
  if (parts[0] === "maps") return "Maps";
  if (posix.basename(rel) === "README.md") {
    const dirParts = parts.slice(0, -1);
    return titleCase(dirParts[dirParts.length - 1] || parts[0] || "Corpus");
  }
  if (parts[0] === "collections" && parts[1]) return titleCase(parts[1]);
  if (parts[0] === "assessments" && parts[1]) return titleCase(parts[1]);
  if (parts[0] === "standards") return "Tradecraft";
  if (parts[0] === "source-registers") return "Sources";
  if (parts[0] === "templates") return "Templates";
  return type;
}

function tagsFor(doc) {
  const tokens = (value) => value.toLowerCase().split(/[^a-z0-9:-]+/);
  return [...new Set([
    ...tokens(doc.title),
    ...tokens(doc.rel.replace(/\.md$/, "")),
    doc.type.toLowerCase(),
    doc.theater.toLowerCase(),
    doc.domain.toLowerCase(),
    ...tokens(doc.productId),
    ...tokens(doc.preparedUtc),
    ...tokens(doc.cutoffUtc),
    ...tokens(doc.confidence)
  ].filter((tag) => tag.length > 1))];
}

function priorityIndex(rel) {
  const index = preferredOrder.indexOf(rel);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function relativeUrl(fromOutputRel, toOutputRel) {
  const fromDir = posix.dirname(fromOutputRel);
  const rel = posix.relative(fromDir, toOutputRel);
  return rel || posix.basename(toOutputRel);
}

function makeResolver(relToOutput, currentDoc) {
  return (href) => {
    if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
    if (href.startsWith("#")) return href;

    const [targetPart, hashPart] = href.split("#");
    if (!targetPart) return hashPart ? `#${hashPart}` : href;

    let target = targetPart.replace(/\\/g, "/");
    if (target.startsWith("/")) target = target.replace(/^\/+/, "");
    if (target.startsWith("docs/")) {
      target = target.slice("docs/".length);
    } else {
      target = posix.normalize(posix.join(posix.dirname(currentDoc.rel), target));
    }
    target = target.replace(/^\.\//, "");

    const outputRel = relToOutput.get(target);
    if (!outputRel) return href;

    const hash = hashPart ? `#${hashPart}` : "";
    return `${relativeUrl(currentDoc.outputRel, outputRel)}${hash}`;
  };
}

function renderInline(raw, currentDoc, relToOutput) {
  const resolveHref = makeResolver(relToOutput, currentDoc);
  let html = escapeHtml(raw);

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const cleanHref = href.replace(/&amp;/g, "&");
    const resolved = resolveHref(cleanHref);
    return `<a href="${escapeAttr(resolved)}">${label}</a>`;
  });
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return html;
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function splitTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function isListLine(line) {
  return /^\s*[-*+]\s+/.test(line) || /^\s*\d+\.\s+/.test(line);
}

function isBlockStart(line, nextLine = "") {
  return /^#{1,6}\s+/.test(line)
    || /^```/.test(line)
    || /^>\s?/.test(line)
    || isListLine(line)
    || /^\s*---+\s*$/.test(line)
    || (line.includes("|") && isTableSeparator(nextLine));
}

function renderMarkdown(markdown, currentDoc, relToOutput) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const usedIds = new Map();
  const html = [];
  let index = 0;
  let skippedTitle = false;

  const uniqueId = (text) => {
    const base = slugify(text);
    const count = usedIds.get(base) || 0;
    usedIds.set(base, count + 1);
    return count ? `${base}-${count + 1}` : base;
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (/^```/.test(trimmed)) {
      const fence = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index].trim())) {
        fence.push(lines[index]);
        index += 1;
      }
      index += 1;
      html.push(`<pre><code>${escapeHtml(fence.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      if (level === 1 && !skippedTitle && text === currentDoc.title) {
        skippedTitle = true;
        index += 1;
        continue;
      }
      const id = uniqueId(text);
      html.push(`<h${level} id="${escapeAttr(id)}">${renderInline(text, currentDoc, relToOutput)}</h${level}>`);
      index += 1;
      continue;
    }

    if (trimmed.includes("|") && isTableSeparator(lines[index + 1] || "")) {
      const header = splitTableRow(trimmed);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      html.push([
        '<div class="table-wrap"><table>',
        `<thead><tr>${header.map((cell) => `<th>${renderInline(cell, currentDoc, relToOutput)}</th>`).join("")}</tr></thead>`,
        `<tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell, currentDoc, relToOutput)}</td>`).join("")}</tr>`).join("")}</tbody>`,
        "</table></div>"
      ].join(""));
      continue;
    }

    if (isListLine(trimmed)) {
      const ordered = /^\s*\d+\.\s+/.test(trimmed);
      const items = [];
      while (index < lines.length) {
        if (!lines[index].trim()) {
          const nextListIndex = index + 1;
          if (nextListIndex < lines.length && isListLine(lines[nextListIndex].trim())) {
            index = nextListIndex;
            continue;
          }
          break;
        }
        if (!isListLine(lines[index].trim())) break;

        const itemLines = [
          lines[index].trim().replace(ordered ? /^\d+\.\s+/ : /^[-*+]\s+/, "")
        ];
        index += 1;
        while (
          index < lines.length
          && lines[index].trim()
          && !isListLine(lines[index].trim())
          && !isBlockStart(lines[index].trim(), lines[index + 1] || "")
        ) {
          itemLines.push(lines[index].trim());
          index += 1;
        }
        const item = itemLines.join(" ");
        items.push(`<li>${renderInline(item, currentDoc, relToOutput)}</li>`);
      }
      html.push(`<${ordered ? "ol" : "ul"}>${items.join("")}</${ordered ? "ol" : "ul"}>`);
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quote = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      html.push(`<blockquote><p>${renderInline(quote.join(" "), currentDoc, relToOutput)}</p></blockquote>`);
      continue;
    }

    if (/^\s*---+\s*$/.test(trimmed)) {
      html.push("<hr>");
      index += 1;
      continue;
    }

    const paragraph = [trimmed];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index].trim(), lines[index + 1] || "")) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${renderInline(paragraph.join(" "), currentDoc, relToOutput)}</p>`);
  }

  return html.join("\n");
}

function navGroups(docs) {
  const groups = new Map();
  docs.forEach((doc) => {
    if (!groups.has(doc.group)) groups.set(doc.group, []);
    groups.get(doc.group).push(doc);
  });

  return [...groups.entries()].sort(([a], [b]) => {
    const ai = groupOrder.indexOf(a);
    const bi = groupOrder.indexOf(b);
    if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    return a.localeCompare(b);
  });
}

function renderDocNav(currentDoc, docs) {
  const workspaceApp = relativeUrl(currentDoc.outputRel, "workspace/index.html");
  const feedUrl = relativeUrl(currentDoc.outputRel, "feed.xml");
  const siteRoutes = `
    <section class="doc-group site-routes">
      <h2>Site</h2>
      <a class="doc-link site-route-link" href="${escapeAttr(workspaceApp)}" data-site-route="workspace" data-filter="workspace wi browse records download application pwa android apple ios ipad macos windows linux">
        <strong>Workspace</strong>
        <span>Browse / download</span>
      </a>
      <a class="doc-link site-route-link" href="${escapeAttr(feedUrl)}" data-site-route="feed" data-filter="feed rss latest updates new recent source packets assessments trackers">
        <strong>Updates Feed</strong>
        <span>Recent updates</span>
      </a>
    </section>
  `;

  return siteRoutes + navGroups(docs).map(([group, entries]) => `
    <section class="doc-group">
      <h2>${escapeHtml(group)}</h2>
      ${entries.map((doc) => `
        <a class="doc-link${doc.rel === currentDoc.rel ? " is-active" : ""}" href="${escapeAttr(relativeUrl(currentDoc.outputRel, doc.outputRel))}" data-filter="${escapeAttr(filterTextForDoc(doc))}"${doc.rel === currentDoc.rel ? ' aria-current="page"' : ""}>
          <strong>${escapeHtml(doc.title)}</strong>
          <span>${escapeHtml(doc.type)} ${escapeHtml(doc.theater)}</span>
        </a>
      `).join("")}
    </section>
  `).join("");
}

function filterTextForDoc(doc) {
  return [
    doc.title,
    doc.type,
    doc.group,
    doc.theater,
    doc.domain,
    doc.summary,
    doc.productId,
    doc.preparedUtc,
    doc.cutoffUtc,
    doc.confidence,
    doc.rel,
    doc.outputRel,
    ...(doc.tags || [])
  ].filter(Boolean).join(" ");
}

function headerHtml(currentDoc) {
  const home = relativeUrl(currentDoc.outputRel, "index.html");
  const about = relativeUrl(currentDoc.outputRel, "about.html");
  const assessments = relativeUrl(currentDoc.outputRel, "library/assessments/index.html");
  const collections = relativeUrl(currentDoc.outputRel, "library/collections/coverage-map.html");
  const maps = relativeUrl(currentDoc.outputRel, "library/maps/index.html");
  const standards = relativeUrl(currentDoc.outputRel, "library/standards/product-standard.html");
  const workspaceApp = relativeUrl(currentDoc.outputRel, "workspace/index.html");
  const feedUrl = relativeUrl(currentDoc.outputRel, "feed.xml");
  const activeSection = primaryNavSection(currentDoc.outputRel);
  const navAttrs = (section) => section === activeSection ? ' class="is-active" aria-current="page"' : "";
  return `
    <header class="site-header">
      <a class="brand-panel" href="${escapeAttr(home)}" aria-label="WARLOCK-INDEX home">
        <span class="brand-copy">
          <strong>WARLOCK-INDEX</strong>
          <span>UNCLASSIFIED//OPEN SOURCE</span>
          <em>Strategic Research Corpus &amp; Knowledge Arsenal</em>
        </span>
      </a>
      <div class="status-terminal" aria-label="Local corpus terminal status">
        <p>LOCAL CORPUS TERMINAL</p>
        <p>STATUS: ONLINE</p>
        <p>MODE: READ-ONLY</p>
        <p>UPDATED: <time datetime="2026-06-17">2026-06-17</time></p>
      </div>
    </header>
    <nav class="primary-nav" aria-label="Primary navigation">
      <a href="${escapeAttr(home)}">Home</a>
      <a href="${escapeAttr(about)}">About</a>
      <a${navAttrs("assessments")} href="${escapeAttr(assessments)}">Assessments</a>
      <a${navAttrs("collections")} href="${escapeAttr(collections)}">Collections</a>
      <a${navAttrs("maps")} href="${escapeAttr(maps)}">Maps</a>
      <a${navAttrs("standards")} href="${escapeAttr(standards)}">Standards</a>
      <a href="${escapeAttr(feedUrl)}">Feed</a>
      <a href="${escapeAttr(workspaceApp)}">Workspace</a>
    </nav>
  `;
}

function primaryNavSection(outputRel) {
  if (outputRel.startsWith("library/assessments/")) return "assessments";
  if (outputRel.startsWith("library/maps/")) return "maps";
  if (outputRel.startsWith("library/standards/")) return "standards";
  if (outputRel.startsWith("library/collections/")) return "collections";
  if (outputRel.startsWith("library/source-registers/")) return "collections";
  return "";
}

function renderPage(currentDoc, docs, relToOutput) {
  const rootCss = `${relativeUrl(currentDoc.outputRel, "library.css")}?v=${libraryAssetVersion}`;
  const rootJs = `${relativeUrl(currentDoc.outputRel, "library.js")}?v=${libraryAssetVersion}`;
  const docsIndex = relativeUrl(currentDoc.outputRel, "library/index.html");
  const body = renderMarkdown(currentDoc.markdown, currentDoc, relToOutput);
  const canonicalUrl = absoluteUrl(currentDoc.outputRel);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeAttr(currentDoc.summary)}">
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="${escapeAttr(canonicalUrl)}">
    <link rel="alternate" type="application/rss+xml" title="WARLOCK-INDEX recent updates feed" href="/feed.xml">
    <link rel="icon" href="/favicon.png?v=20260617-netscape-lite" type="image/png" sizes="180x180">
    <link rel="icon" href="/favicon.svg?v=20260617-netscape-lite" type="image/svg+xml">
    <link rel="shortcut icon" href="/favicon.png?v=20260617-netscape-lite" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="mask-icon" href="/favicon.svg?v=20260617-netscape-lite" color="#006b2b">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#c0c0c0">
    <meta property="og:title" content="${escapeAttr(`${currentDoc.title} | ${siteName}`)}">
    <meta property="og:description" content="${escapeAttr(currentDoc.summary)}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${escapeAttr(canonicalUrl)}">
    <meta property="og:site_name" content="${escapeAttr(siteName)}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${escapeAttr(`${currentDoc.title} | ${siteName}`)}">
    <meta name="twitter:description" content="${escapeAttr(currentDoc.summary)}">
    <title>${escapeHtml(currentDoc.title)} | ${siteName}</title>
    <link rel="stylesheet" href="${escapeAttr(rootCss)}">
  </head>
  <body>
    <a class="skip-link" href="#content">Skip to content</a>
    <div class="page-shell" id="top">
      ${headerHtml(currentDoc)}
      <main class="reader-shell">
        <aside class="reader-sidebar" aria-label="Document map">
          <div class="sidebar-head">
            <div class="sidebar-mark">Corpus index</div>
            <p>Documentation corpus</p>
            <label class="sidebar-search" for="doc-filter">
              <span aria-hidden="true">wi:</span>
              <input id="doc-filter" type="search" autocomplete="off" spellcheck="false" placeholder="Filter documents...">
            </label>
          </div>
          <nav class="doc-nav">
            ${renderDocNav(currentDoc, docs)}
          </nav>
          <p class="empty-filter">No matching document.</p>
        </aside>
        <article class="doc-article" id="content">
          <header class="article-head">
            <div class="article-meta">
              <span>${escapeHtml(currentDoc.type)}</span>
              <span>${escapeHtml(currentDoc.theater)}</span>
              <span>${escapeHtml(currentDoc.domain)}</span>
              <span class="source-path">docs/${escapeHtml(currentDoc.rel)}</span>
            </div>
            <h1>${escapeHtml(currentDoc.title)}</h1>
            <p class="article-summary">${escapeHtml(displaySummary(currentDoc.summary))}</p>
            <div class="article-actions">
              <a href="${escapeAttr(docsIndex)}">Full Index</a>
            </div>
          </header>
          <div class="markdown-body">
${body}
          </div>
        </article>
      </main>
      <footer class="site-maintainer-footer">
        <p>Maintained by The Better Science Foundation</p>
      </footer>
    </div>
    <script src="${escapeAttr(rootJs)}"></script>
  </body>
</html>
`;
}

function latestFeedDocs(docs) {
  return docs
    .map((doc) => ({ ...doc, feedDate: feedDateForDoc(doc) }))
    .filter((doc) => doc.feedDate)
    .sort((a, b) => b.feedDate.getTime() - a.feedDate.getTime() || a.title.localeCompare(b.title))
    .slice(0, feedItemLimit);
}

function renderFeed(docs) {
  const items = latestFeedDocs(docs);
  const latestDate = items[0]?.feedDate || new Date(Date.UTC(2026, 5, 13, 0, 0, 0));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<?xml-stylesheet type="text/xsl" href="/feed.xsl?v=${feedAssetVersion}"?>`,
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(siteName)} Recent Corpus Updates</title>`,
    `    <link>${escapeXml(siteOrigin)}/</link>`,
    `    <atom:link href="${escapeXml(`${siteOrigin}/feed.xml`)}" rel="self" type="application/rss+xml"/>`,
    "    <description>Recent entries from the open-source strategic research corpus: source packets, trackers, matrices, assessments, and registers.</description>",
    "    <language>en-us</language>",
    `    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>`,
    "    <generator>WARLOCK-INDEX static site generator</generator>",
    ...items.map((doc) => {
      const url = absoluteUrl(doc.outputRel);
      return [
        "    <item>",
        `      <title>${escapeXml(doc.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${doc.feedDate.toUTCString()}</pubDate>`,
        `      <category>${escapeXml(doc.type)}</category>`,
        `      <category>${escapeXml(doc.theater)}</category>`,
        `      <category>${escapeXml(doc.domain)}</category>`,
        `      <description>${escapeXml(displaySummary(doc.summary))}</description>`,
        "    </item>"
      ].join("\n");
    }),
    "  </channel>",
    "</rss>",
    ""
  ].join("\n");
}

async function build() {
  const files = await collectMarkdownFiles(docsRoot);
  const docs = [];

  for (const file of files) {
    const rel = normalizeSlash(path.relative(docsRoot, file));
    const markdown = await readFile(file, "utf8");
    const type = inferType(rel);
    const doc = {
      rel,
      sourcePath: file,
      outputRel: outputRelForDoc(rel),
      markdown,
      title: extractTitle(markdown, rel),
      summary: extractSummary(markdown),
      productId: extractProductId(markdown),
      preparedUtc: extractField(markdown, ["Prepared UTC"]),
      cutoffUtc: extractField(markdown, ["Information cutoff UTC"]),
      confidence: extractConfidence(markdown),
      type,
      group: inferGroup(rel, type),
      theater: inferTheater(rel),
      domain: inferDomain(rel, type)
    };
    doc.tags = tagsFor(doc);
    docs.push(doc);
  }

  docs.sort((a, b) => priorityIndex(a.rel) - priorityIndex(b.rel) || a.group.localeCompare(b.group) || a.title.localeCompare(b.title));

  const relToOutput = new Map(docs.map((doc) => [doc.rel, doc.outputRel]));

  await rm(libraryRoot, { recursive: true, force: true });

  for (const doc of docs) {
    const outputPath = path.join(siteRoot, doc.outputRel);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, stripTrailingWhitespace(renderPage(doc, docs, relToOutput)), "utf8");
  }

  const corpus = docs.map((doc) => ({
    title: doc.title,
    type: doc.type,
    path: doc.outputRel,
    summary: doc.summary,
    productId: doc.productId,
    preparedUtc: doc.preparedUtc,
    cutoffUtc: doc.cutoffUtc,
    confidence: doc.confidence,
    theater: doc.theater,
    domain: doc.domain,
    tags: doc.tags
  }));

  const corpusScript = `window.WARLOCK_INDEX_CORPUS=${JSON.stringify(corpus)};\n`;
  await writeFile(path.join(siteRoot, "corpus.js"), corpusScript, "utf8");
  await writeFile(path.join(siteRoot, "workspace", "corpus.js"), corpusScript, "utf8");

  const workspaceShellHashSource = [
    corpusScript,
    ...await Promise.all(["index.html", "styles.css", "app.js", "manifest.webmanifest"]
      .map((file) => readFile(path.join(siteRoot, "workspace", file), "utf8")))
  ].join("\n");
  const serviceWorkerPath = path.join(siteRoot, "workspace", "service-worker.js");
  const serviceWorker = await readFile(serviceWorkerPath, "utf8");
  await writeFile(
    serviceWorkerPath,
    serviceWorker.replace(
      /const CACHE_NAME = "(?:wi|workspace)-pwa-[^"]+";/,
      `const CACHE_NAME = "workspace-pwa-${shortHash(workspaceShellHashSource)}";`
    ),
    "utf8"
  );

  const sitemapUrls = [
    { loc: absoluteUrl("index.html"), priority: "1.0" },
    { loc: absoluteUrl("about.html"), priority: "0.8" },
    { loc: `${siteOrigin}/workspace/`, priority: "0.85" },
    ...docs.map((doc) => ({
      loc: absoluteUrl(doc.outputRel),
      priority: doc.rel === "index.md" ? "0.9" : "0.7"
    }))
  ];

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapUrls.map((entry) => [
      "  <url>",
      `    <loc>${escapeXml(entry.loc)}</loc>`,
      `    <priority>${entry.priority}</priority>`,
      "  </url>"
    ].join("\n")),
    "</urlset>",
    ""
  ].join("\n");

  const robots = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteOrigin}/sitemap.xml`,
    ""
  ].join("\n");

  await writeFile(path.join(siteRoot, "sitemap.xml"), sitemap, "utf8");
  await writeFile(path.join(siteRoot, "robots.txt"), robots, "utf8");
  await writeFile(path.join(siteRoot, "feed.xml"), renderFeed(docs), "utf8");

  console.log(`Generated ${docs.length} documentation pages, corpus.js, feed.xml, sitemap.xml, and robots.txt`);
}

await build();
