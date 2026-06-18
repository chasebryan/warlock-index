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

const topicHubs = [
  {
    id: "indo-pacific",
    title: "Indo-Pacific",
    summary: "China, Taiwan, South China Sea, allied posture, partner source packets, and regional cross-checks.",
    terms: ["indo-pacific", "china", "prc", "pla", "taiwan", "south china sea", "philippines", "japan", "korea", "quad", "aukus", "asean"]
  },
  {
    id: "europe-russia",
    title: "Russia / Europe",
    summary: "Russia, NATO, Ukraine, European allied capacity, and continental defense-source lanes.",
    terms: ["russia", "europe", "ukraine", "nato", "allied", "france", "germany", "uk", "norway", "finland", "sweden", "denmark", "iceland", "eu"]
  },
  {
    id: "homeland",
    title: "Homeland",
    summary: "U.S. homeland, law-enforcement, border, sanctions, terrorism, cybercrime, and threat-source material.",
    terms: ["homeland", "law enforcement", "fbi", "dhs", "doj", "dea", "atf", "cbp", "coast guard", "treasury", "state", "terrorism", "border"]
  },
  {
    id: "strategic-weapons",
    title: "Strategic Weapons",
    summary: "Nuclear, missile, WMD, arms-control, strategic stability, and proliferation source packets.",
    terms: ["strategic weapons", "nuclear", "missile", "wmd", "arms control", "strategic stability", "proliferation", "dprk", "iran"]
  },
  {
    id: "cyber-space",
    title: "Cyber / Space",
    summary: "Cyber, critical infrastructure, telecommunications, counterspace, space, and resilience records.",
    terms: ["cyber", "space", "counterspace", "critical infrastructure", "telecommunications", "salt typhoon", "cisa", "nsa", "resilience"]
  },
  {
    id: "arctic",
    title: "Arctic",
    summary: "Arctic and High North security, NORAD, Nordic defense, infrastructure, and domain-awareness sources.",
    terms: ["arctic", "high north", "norad", "canada", "norway", "finland", "sweden", "denmark", "iceland", "nordic"]
  },
  {
    id: "middle-east",
    title: "Middle East",
    summary: "Iran, Red Sea, Houthi maritime disruption, WMD relevance, and regional source lanes.",
    terms: ["middle east", "iran", "red sea", "houthi", "maritime", "wmd", "missile", "gaza"]
  }
];

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

function formatUpdateTime(date) {
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
    "Source Note ID",
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

function topicHaystack(doc) {
  return [
    doc.title,
    doc.type,
    doc.group,
    doc.theater,
    doc.domain,
    doc.productId,
    doc.rel,
    ...(doc.tags || [])
  ].join(" ").toLowerCase();
}

function topicsForDoc(doc) {
  const haystack = topicHaystack(doc);
  return topicHubs
    .filter((topic) => topic.terms.some((term) => haystack.includes(term)))
    .map((topic) => topic.id);
}

function shortDisplaySummary(value, maxLength = 260) {
  const summary = displaySummary(value).replace(/\s+/g, " ").trim();
  if (summary.length <= maxLength) return summary;
  return `${summary.slice(0, maxLength - 1).trim()}…`;
}

function badgesForDoc(doc) {
  const badges = [doc.type, doc.theater, doc.domain].filter(Boolean);
  if (/official|source register|source packet/i.test(`${doc.title} ${doc.type} ${doc.domain}`)) badges.push("Official Source");
  if (/high/i.test(doc.confidence)) badges.push("High Confidence");
  if (feedDateForDoc(doc)) badges.push("Dated");
  return [...new Set(badges)].slice(0, 4);
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
  const feedUrl = relativeUrl(currentDoc.outputRel, "feed.html");
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
    ...(doc.topics || []),
    ...(doc.badges || []),
    ...(doc.tags || [])
  ].filter(Boolean).join(" ");
}

function docsForTopic(docs, topic) {
  return docs
    .filter((doc) => doc.topics?.includes(topic.id) && doc.type !== "Directory" && doc.type !== "Navigation")
    .map((doc) => ({ ...doc, feedDate: feedDateForDoc(doc) }))
    .sort((a, b) => {
      const bd = b.feedDate?.getTime() || 0;
      const ad = a.feedDate?.getTime() || 0;
      if (bd !== ad) return bd - ad;
      return a.title.localeCompare(b.title);
    });
}

function renderBadgeList(badges, className = "doc-badges") {
  return `<div class="${className}">${badges.map((badge) => `<span>${escapeHtml(badge)}</span>`).join("")}</div>`;
}

function headerHtml(currentDoc, latestUpdateStr = "2026-06-16 05:12:39Z", latestUpdateIso = "2026-06-16T05:12:39Z") {
  const home = relativeUrl(currentDoc.outputRel, "index.html");
  const about = relativeUrl(currentDoc.outputRel, "about.html");
  const assessments = relativeUrl(currentDoc.outputRel, "library/assessments/index.html");
  const topics = relativeUrl(currentDoc.outputRel, "topics/index.html");
  const collections = relativeUrl(currentDoc.outputRel, "library/collections/coverage-map.html");
  const maps = relativeUrl(currentDoc.outputRel, "library/maps/index.html");
  const standards = relativeUrl(currentDoc.outputRel, "library/standards/product-standard.html");
  const workspaceApp = relativeUrl(currentDoc.outputRel, "workspace/index.html");
  const feedUrl = relativeUrl(currentDoc.outputRel, "feed.html");
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
        <p>UPDATED: <time datetime="${latestUpdateIso}">${latestUpdateStr}</time></p>
      </div>
    </header>
    <nav class="primary-nav" aria-label="Primary navigation">
      <a href="${escapeAttr(home)}">Home</a>
      <a href="${escapeAttr(about)}">About</a>
      <a${navAttrs("assessments")} href="${escapeAttr(assessments)}">Assessments</a>
      <a href="${escapeAttr(topics)}">Topics</a>
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

function renderPage(currentDoc, docs, relToOutput, latestUpdateStr = "2026-06-16 05:12:39Z", latestUpdateIso = "2026-06-16T05:12:39Z") {
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
    <link rel="icon" href="/favicon.png?v=20260617-green-press" type="image/png" sizes="180x180">
    <link rel="icon" href="/favicon.svg?v=20260617-green-press" type="image/svg+xml">
    <link rel="shortcut icon" href="/favicon.png?v=20260617-green-press" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="mask-icon" href="/favicon.svg?v=20260617-green-press" color="#006b2b">
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
      ${headerHtml(currentDoc, latestUpdateStr, latestUpdateIso)}
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
            ${renderBadgeList(currentDoc.badges || [], "doc-badges article-badges")}
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
    '<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>',
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

function renderTopicPage(topic, docs, latestUpdateStr, latestUpdateIso) {
  const items = docsForTopic(docs, topic);
  const byType = ["Assessment", "Source Packet", "Tracker", "Matrix", "Actor Profile", "Source Register", "Timeline", "Map Resource"]
    .map((type) => ({ type, items: items.filter((doc) => doc.type === type).slice(0, 6) }))
    .filter((group) => group.items.length);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeAttr(topic.summary)}">
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="${escapeAttr(`${siteOrigin}/topics/${topic.id}.html`)}">
    <link rel="alternate" type="application/rss+xml" title="WARLOCK-INDEX recent updates feed" href="/feed.xml">
    <link rel="icon" href="/favicon.png?v=${feedAssetVersion}" type="image/png" sizes="180x180">
    <link rel="icon" href="/favicon.svg?v=${feedAssetVersion}" type="image/svg+xml">
    <link rel="shortcut icon" href="/favicon.png?v=${feedAssetVersion}" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="mask-icon" href="/favicon.svg?v=${feedAssetVersion}" color="#006b2b">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#c0c0c0">
    <meta property="og:title" content="${escapeAttr(`${topic.title} | ${siteName}`)}">
    <meta property="og:description" content="${escapeAttr(topic.summary)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${escapeAttr(`${siteOrigin}/topics/${topic.id}.html`)}">
    <meta property="og:site_name" content="${escapeAttr(siteName)}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${escapeAttr(`${topic.title} | ${siteName}`)}">
    <meta name="twitter:description" content="${escapeAttr(topic.summary)}">
    <title>${escapeHtml(topic.title)} | ${siteName}</title>
    <link rel="stylesheet" href="../styles.css?v=${feedAssetVersion}">
  </head>
  <body>
    <a class="skip-link" href="#topic-records">Skip to topic records</a>
    <div class="page-shell" id="top">
      <header class="site-header" data-elevated="false">
        <a class="brand-panel" href="../index.html" aria-label="WARLOCK-INDEX home">
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
          <p>UPDATED: <time datetime="${escapeAttr(latestUpdateIso)}">${escapeHtml(latestUpdateStr)}</time></p>
        </div>
      </header>
      <nav class="primary-nav" aria-label="Primary navigation">
        <a href="../index.html">Home</a>
        <a href="../about.html">About</a>
        <a href="../library/assessments/">Assessments</a>
        <a class="is-active" href="./" aria-current="page">Topics</a>
        <a href="../library/collections/coverage-map.html">Collections</a>
        <a href="../library/maps/">Maps</a>
        <a href="../library/standards/product-standard.html">Standards</a>
        <a href="../feed.html">Feed</a>
        <a href="../workspace/">Workspace</a>
      </nav>
      <main class="topic-page-shell" id="topic-records">
        <section class="topic-page-head" aria-labelledby="topic-title">
          <p class="feed-page-kicker">Topic hub</p>
          <h1 id="topic-title">${escapeHtml(topic.title)}</h1>
          <p>${escapeHtml(topic.summary)}</p>
          <div class="feed-page-meta">
            <span>${items.length} matched records</span>
            <span>${byType.length} active lanes</span>
            <a href="../workspace/?q=${escapeAttr(encodeURIComponent(topic.title))}">Open in Workspace</a>
          </div>
        </section>
        <section class="topic-lane-index" aria-label="Topic lanes">
          ${byType.map((group) => `
            <a href="#${escapeAttr(`${topic.id}-${slugify(group.type)}`)}">
              <strong>${escapeHtml(group.type)}</strong>
              <span>${group.items.length}</span>
            </a>
          `).join("")}
        </section>
        ${byType.map((group) => `
          <section class="topic-lane" aria-labelledby="${escapeAttr(`${topic.id}-${slugify(group.type)}`)}">
            <h2 id="${escapeAttr(`${topic.id}-${slugify(group.type)}`)}">${escapeHtml(group.type)}</h2>
            <div class="feed-page-list">
              ${group.items.map((doc) => `
                <article class="feed-page-item">
                  <div class="feed-page-item-meta">
                    <time datetime="${escapeAttr(doc.feedDate?.toISOString() || "")}">${escapeHtml(formatUpdateTime(doc.feedDate))}</time>
                    <span>${escapeHtml(doc.type)}</span>
                    <span>${escapeHtml(doc.theater)}</span>
                  </div>
                  ${renderBadgeList(doc.badges || [], "doc-badges")}
                  <h3><a href="../${escapeAttr(doc.outputRel)}">${escapeHtml(doc.title)}</a></h3>
                  <p>${escapeHtml(shortDisplaySummary(doc.summary, 320))}</p>
                </article>
              `).join("")}
            </div>
          </section>
        `).join("")}
      </main>
      <footer class="site-footer">
        <nav aria-label="Footer navigation">
          <a href="../how-to-use.html">How to use</a>
          <span>|</span>
          <a href="../feed.html">Feed</a>
          <span>|</span>
          <a href="../workspace/">Workspace</a>
        </nav>
        <div class="footer-copy">
          <p>This open-source research project publishes unclassified, source-routed corpus material.</p>
          <p class="site-maintainer">Maintained by The Better Science Foundation</p>
        </div>
      </footer>
    </div>
  </body>
</html>
`;
}

function renderTopicsIndexPage(docs, latestUpdateStr, latestUpdateIso) {
  const topicStats = topicHubs.map((topic) => {
    const items = docsForTopic(docs, topic);
    const lanes = [...new Set(items.map((doc) => doc.type).filter(Boolean))];
    const latest = items[0]?.feedDate || null;
    return { topic, items, lanes, latest };
  });

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Browse WARLOCK-INDEX topic hubs by theater and domain.">
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="${escapeAttr(`${siteOrigin}/topics/`)}">
    <link rel="alternate" type="application/rss+xml" title="WARLOCK-INDEX recent updates feed" href="/feed.xml">
    <link rel="icon" href="/favicon.png?v=${feedAssetVersion}" type="image/png" sizes="180x180">
    <link rel="icon" href="/favicon.svg?v=${feedAssetVersion}" type="image/svg+xml">
    <link rel="shortcut icon" href="/favicon.png?v=${feedAssetVersion}" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="mask-icon" href="/favicon.svg?v=${feedAssetVersion}" color="#006b2b">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#c0c0c0">
    <meta property="og:title" content="Topic Hubs | ${escapeAttr(siteName)}">
    <meta property="og:description" content="Browse WARLOCK-INDEX topic hubs by theater and domain.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${escapeAttr(`${siteOrigin}/topics/`)}">
    <meta property="og:site_name" content="${escapeAttr(siteName)}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Topic Hubs | ${escapeAttr(siteName)}">
    <meta name="twitter:description" content="Browse WARLOCK-INDEX topic hubs by theater and domain.">
    <title>Topic Hubs | ${siteName}</title>
    <link rel="stylesheet" href="../styles.css?v=${feedAssetVersion}">
  </head>
  <body>
    <a class="skip-link" href="#topics-index">Skip to topics</a>
    <div class="page-shell" id="top">
      <header class="site-header" data-elevated="false">
        <a class="brand-panel" href="../index.html" aria-label="WARLOCK-INDEX home">
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
          <p>UPDATED: <time datetime="${escapeAttr(latestUpdateIso)}">${escapeHtml(latestUpdateStr)}</time></p>
        </div>
      </header>
      <nav class="primary-nav" aria-label="Primary navigation">
        <a href="../index.html">Home</a>
        <a href="../about.html">About</a>
        <a href="../library/assessments/">Assessments</a>
        <a class="is-active" href="./" aria-current="page">Topics</a>
        <a href="../library/collections/coverage-map.html">Collections</a>
        <a href="../library/maps/">Maps</a>
        <a href="../library/standards/product-standard.html">Standards</a>
        <a href="../feed.html">Feed</a>
        <a href="../workspace/">Workspace</a>
      </nav>
      <main id="topics-index">
        <section class="route-search-panel topics-route-panel" aria-labelledby="topics-title">
          <nav class="route-list" aria-label="Topic routes">
            <h2>Topic Routes</h2>
            ${topicStats.map(({ topic }) => `<a href="${escapeAttr(`${topic.id}.html`)}">${escapeHtml(topic.title)}</a>`).join("")}
          </nav>
          <section class="search-console" aria-labelledby="topics-title">
            <h1 id="topics-title">Browse topic hubs</h1>
            <p class="topics-intro">Stable entry points for theater and domain routes across assessments, source packets, trackers, matrices, profiles, registers, and timelines.</p>
            <div class="terminal-suggestions" aria-label="Topic actions">
              <span>${topicHubs.length} hubs</span>
              <b aria-hidden="true">•</b>
              <span>${topicStats.reduce((sum, entry) => sum + entry.items.length, 0)} routed records</span>
              <b aria-hidden="true">•</b>
              <a href="../workspace/">Open Workspace</a>
            </div>
          </section>
        </section>

        <section class="results-shell topics-results-shell" aria-label="Topic hub index">
          <section class="results-panel topics-results-panel" aria-labelledby="topics-table-title">
            <div class="results-heading">
              <h2 id="topics-table-title">Topic Hubs</h2>
              <p>${topicStats.reduce((sum, entry) => sum + entry.items.length, 0)} routed records</p>
            </div>
            <div class="result-table-wrap">
              <table class="result-table topics-table">
                <thead>
                  <tr>
                    <th scope="col">Topic</th>
                    <th scope="col">Records</th>
                    <th scope="col">Lanes</th>
                    <th scope="col">Latest</th>
                  </tr>
                </thead>
                <tbody>
                  ${topicStats.map(({ topic, items, lanes, latest }) => `
                    <tr>
                      <td>
                        <a class="result-title" href="${escapeAttr(`${topic.id}.html`)}">${escapeHtml(topic.title)}</a>
                        <p class="result-summary">${escapeHtml(topic.summary)}</p>
                        <div class="doc-badges">
                          ${lanes.slice(0, 5).map((lane) => `<span>${escapeHtml(lane)}</span>`).join("")}
                        </div>
                      </td>
                      <td>${items.length}</td>
                      <td>${lanes.length}</td>
                      <td>${latest ? escapeHtml(formatUpdateTime(latest)) : "UNDATE"}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
      <footer class="site-footer">
        <nav aria-label="Footer navigation">
          <a href="../how-to-use.html">How to use</a>
          <span>|</span>
          <a href="../feed.html">Feed</a>
          <span>|</span>
          <a href="../workspace/">Workspace</a>
        </nav>
        <div class="footer-copy">
          <p>This open-source research project publishes unclassified, source-routed corpus material.</p>
          <p class="site-maintainer">Maintained by The Better Science Foundation</p>
        </div>
      </footer>
    </div>
  </body>
</html>
`;
}

function renderHowToUsePage(latestUpdateStr, latestUpdateIso) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="How to search, browse, cite, queue, and export WARLOCK-INDEX corpus records.">
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="${escapeAttr(`${siteOrigin}/how-to-use.html`)}">
    <link rel="alternate" type="application/rss+xml" title="WARLOCK-INDEX recent updates feed" href="/feed.xml">
    <link rel="icon" href="/favicon.png?v=${feedAssetVersion}" type="image/png" sizes="180x180">
    <link rel="icon" href="/favicon.svg?v=${feedAssetVersion}" type="image/svg+xml">
    <link rel="shortcut icon" href="/favicon.png?v=${feedAssetVersion}" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="mask-icon" href="/favicon.svg?v=${feedAssetVersion}" color="#006b2b">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#c0c0c0">
    <title>How to use | ${siteName}</title>
    <link rel="stylesheet" href="styles.css?v=${feedAssetVersion}">
  </head>
  <body>
    <a class="skip-link" href="#use-guide">Skip to guide</a>
    <div class="page-shell" id="top">
      <header class="site-header" data-elevated="false">
        <a class="brand-panel" href="index.html" aria-label="WARLOCK-INDEX home">
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
          <p>UPDATED: <time datetime="${escapeAttr(latestUpdateIso)}">${escapeHtml(latestUpdateStr)}</time></p>
        </div>
      </header>
      <nav class="primary-nav" aria-label="Primary navigation">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="library/assessments/">Assessments</a>
        <a href="topics/">Topics</a>
        <a href="library/collections/coverage-map.html">Collections</a>
        <a href="library/maps/">Maps</a>
        <a href="library/standards/product-standard.html">Standards</a>
        <a href="feed.html">Feed</a>
        <a href="workspace/">Workspace</a>
      </nav>
      <main class="use-page-shell" id="use-guide">
        <section class="feed-page-head">
          <p class="feed-page-kicker">Operator guide</p>
          <h1>How to use WARLOCK-INDEX</h1>
          <p>Use the site as a source-routed research corpus: start broad, follow dated products, then queue records in Workspace for export.</p>
        </section>
        <section class="use-step-grid" aria-label="Workflow">
          <article><h2>1. Browse by topic</h2><p>Use topic hubs to enter by theater or domain, then move into assessments, packets, trackers, matrices, and registers.</p></article>
          <article><h2>2. Search the corpus</h2><p>Search names, agencies, domains, product IDs, and source families. Result badges show record type, domain, source lane, and confidence cues.</p></article>
          <article><h2>3. Read source packets first</h2><p>Packets explain evidence families and limits. Use them before treating an assessment or tracker as a finished view.</p></article>
          <article><h2>4. Check trackers</h2><p>Trackers show what has been captured, what is queued, and where source gaps remain.</p></article>
          <article><h2>5. Cite records</h2><p>Document pages include stable titles, product metadata, source paths, and canonical URLs for references.</p></article>
          <article><h2>6. Use Workspace</h2><p>Open Workspace to filter, queue, compare, and export selected records as reader packets or text bundles.</p></article>
        </section>
      </main>
      <footer class="site-footer">
        <nav aria-label="Footer navigation">
          <a href="feed.html">Feed</a>
          <span>|</span>
          <a href="workspace/">Workspace</a>
          <span>|</span>
          <a href="https://github.com/chasebryan/warlock-index">GitHub</a>
        </nav>
        <div class="footer-copy">
          <p>This open-source research project publishes unclassified, source-routed corpus material.</p>
          <p class="site-maintainer">Maintained by The Better Science Foundation</p>
        </div>
      </footer>
    </div>
  </body>
</html>
`;
}

function renderFeedPage(docs, latestUpdateStr, latestUpdateIso) {
  const items = latestFeedDocs(docs);
  const updated = items[0]?.feedDate || parseUtcDate(latestUpdateIso) || new Date(Date.UTC(2026, 5, 13, 0, 0, 0));
  const weekStart = new Date(updated.getTime() - (7 * 24 * 60 * 60 * 1000));
  const typeFilters = [...new Set(items.map((doc) => doc.type).filter(Boolean))].sort();
  const domainFilters = [...new Set(items.map((doc) => doc.domain).filter(Boolean))].sort();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta
      name="description"
      content="Recent WARLOCK-INDEX corpus updates, with links to the RSS feed and generated documentation pages."
    >
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="${escapeAttr(`${siteOrigin}/feed.html`)}">
    <link rel="alternate" type="application/rss+xml" title="WARLOCK-INDEX recent updates feed" href="/feed.xml">
    <link rel="icon" href="/favicon.png?v=${feedAssetVersion}" type="image/png" sizes="180x180">
    <link rel="icon" href="/favicon.svg?v=${feedAssetVersion}" type="image/svg+xml">
    <link rel="shortcut icon" href="/favicon.png?v=${feedAssetVersion}" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="mask-icon" href="/favicon.svg?v=${feedAssetVersion}" color="#006b2b">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#c0c0c0">
    <meta property="og:title" content="Recent Updates | ${escapeAttr(siteName)}">
    <meta property="og:description" content="Recent entries from the open-source strategic research corpus.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${escapeAttr(`${siteOrigin}/feed.html`)}">
    <meta property="og:site_name" content="${escapeAttr(siteName)}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Recent Updates | ${escapeAttr(siteName)}">
    <meta name="twitter:description" content="Recent entries from the open-source strategic research corpus.">
    <title>Recent Updates | ${siteName}</title>
    <link rel="stylesheet" href="styles.css?v=${feedAssetVersion}">
  </head>
  <body>
    <a class="skip-link" href="#updates">Skip to updates</a>

    <div class="page-shell" id="top">
      <header class="site-header" data-elevated="false">
        <a class="brand-panel" href="index.html" aria-label="WARLOCK-INDEX home">
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
          <p>UPDATED: <time datetime="${escapeAttr(latestUpdateIso)}">${escapeHtml(latestUpdateStr)}</time></p>
        </div>
      </header>

      <nav class="primary-nav" aria-label="Primary navigation">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="library/assessments/">Assessments</a>
        <a href="topics/">Topics</a>
        <a href="library/collections/coverage-map.html">Collections</a>
        <a href="library/maps/">Maps</a>
        <a href="library/standards/product-standard.html">Standards</a>
        <a class="is-active" href="feed.html" aria-current="page">Feed</a>
        <a href="workspace/">Workspace</a>
      </nav>

      <main class="feed-page-shell" id="updates">
        <section class="feed-page-head" aria-labelledby="feed-title">
          <p class="feed-page-kicker">Recent updates</p>
          <h1 id="feed-title">Latest corpus entries</h1>
          <p>
            This page is the browser-readable update feed. The machine-readable RSS endpoint remains available at
            <a href="feed.xml">feed.xml</a>.
          </p>
          <div class="feed-page-meta">
            <span>${items.length} entries</span>
            <span>Updated <time datetime="${escapeAttr(updated.toISOString())}">${escapeHtml(formatUpdateTime(updated))}</time></span>
            <span>${items.filter((doc) => doc.feedDate >= weekStart).length} new this week</span>
          </div>
          <form class="feed-filter-bar" id="feed-filters" aria-label="Filter recent updates">
            <label>
              <span>Type</span>
              <select id="feed-type-filter">
                <option value="">All types</option>
                ${typeFilters.map((type) => `<option value="${escapeAttr(type)}">${escapeHtml(type)}</option>`).join("")}
              </select>
            </label>
            <label>
              <span>Domain</span>
              <select id="feed-domain-filter">
                <option value="">All domains</option>
                ${domainFilters.map((domain) => `<option value="${escapeAttr(domain)}">${escapeHtml(domain)}</option>`).join("")}
              </select>
            </label>
            <label class="feed-week-toggle">
              <input type="checkbox" id="feed-week-filter">
              <span>New this week</span>
            </label>
            <output id="feed-filter-count">${items.length} visible</output>
          </form>
        </section>

        <section class="feed-page-list" id="feed-page-list" aria-label="Latest corpus entries" data-week-start="${escapeAttr(weekStart.toISOString())}">
          ${items.map((doc) => `
            <article class="feed-page-item" data-type="${escapeAttr(doc.type)}" data-domain="${escapeAttr(doc.domain)}" data-date="${escapeAttr(doc.feedDate.toISOString())}">
              <div class="feed-page-item-meta">
                <time datetime="${escapeAttr(doc.feedDate.toISOString())}">${escapeHtml(formatUpdateTime(doc.feedDate))}</time>
                <span>${escapeHtml(doc.type)}</span>
                <span>${escapeHtml(doc.theater)}</span>
              </div>
              ${renderBadgeList(doc.badges || [], "doc-badges")}
              <h2><a href="${escapeAttr(doc.outputRel)}">${escapeHtml(doc.title)}</a></h2>
              <p>${escapeHtml(displaySummary(doc.summary))}</p>
            </article>
          `).join("")}
        </section>
      </main>

      <footer class="site-footer">
        <nav aria-label="Footer navigation">
          <a href="about.html">About</a>
          <span>|</span>
          <a href="library/standards/source-evaluation.html">Method</a>
          <span>|</span>
          <a href="feed.xml">RSS</a>
          <span>|</span>
          <a href="https://github.com/chasebryan/warlock-index">GitHub</a>
        </nav>
        <div class="footer-copy">
          <p>This open-source research project publishes unclassified, source-routed corpus material.</p>
          <p class="site-maintainer">Maintained by The Better Science Foundation</p>
        </div>
      </footer>
    </div>
    <script>
      (() => {
        const list = document.querySelector("#feed-page-list");
        const type = document.querySelector("#feed-type-filter");
        const domain = document.querySelector("#feed-domain-filter");
        const week = document.querySelector("#feed-week-filter");
        const count = document.querySelector("#feed-filter-count");
        if (!list || !type || !domain || !week || !count) return;
        const items = Array.from(list.querySelectorAll(".feed-page-item"));
        const weekStart = Date.parse(list.dataset.weekStart || "");
        const apply = () => {
          let visible = 0;
          items.forEach((item) => {
            const typeOk = !type.value || item.dataset.type === type.value;
            const domainOk = !domain.value || item.dataset.domain === domain.value;
            const weekOk = !week.checked || Date.parse(item.dataset.date || "") >= weekStart;
            const show = typeOk && domainOk && weekOk;
            item.hidden = !show;
            if (show) visible += 1;
          });
          count.textContent = visible + " visible";
        };
        [type, domain, week].forEach((control) => control.addEventListener("change", apply));
        apply();
      })();
    </script>
  </body>
</html>
`;
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
    doc.topics = topicsForDoc(doc);
    doc.badges = badgesForDoc(doc);
    doc.tags = tagsFor(doc);
    docs.push(doc);
  }

  docs.sort((a, b) => priorityIndex(a.rel) - priorityIndex(b.rel) || a.group.localeCompare(b.group) || a.title.localeCompare(b.title));

  const latestUpdateDate = docs
    .map((doc) => parseUtcDate(doc.preparedUtc) || parseUtcDate(doc.cutoffUtc))
    .filter(Boolean)
    .sort((a, b) => b.getTime() - a.getTime())[0] || new Date(Date.UTC(2026, 5, 16, 5, 12, 39));
  const latestUpdateStr = formatUpdateTime(latestUpdateDate);
  const latestUpdateIso = latestUpdateDate.toISOString().replace(/\.000Z$/, "Z");

  const relToOutput = new Map(docs.map((doc) => [doc.rel, doc.outputRel]));

  await rm(libraryRoot, { recursive: true, force: true });

  for (const doc of docs) {
    const outputPath = path.join(siteRoot, doc.outputRel);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, stripTrailingWhitespace(renderPage(doc, docs, relToOutput, latestUpdateStr, latestUpdateIso)), "utf8");
  }

  await mkdir(path.join(siteRoot, "topics"), { recursive: true });
  await writeFile(
    path.join(siteRoot, "topics", "index.html"),
    stripTrailingWhitespace(renderTopicsIndexPage(docs, latestUpdateStr, latestUpdateIso)),
    "utf8"
  );
  for (const topic of topicHubs) {
    await writeFile(
      path.join(siteRoot, "topics", `${topic.id}.html`),
      stripTrailingWhitespace(renderTopicPage(topic, docs, latestUpdateStr, latestUpdateIso)),
      "utf8"
    );
  }
  await writeFile(
    path.join(siteRoot, "how-to-use.html"),
    stripTrailingWhitespace(renderHowToUsePage(latestUpdateStr, latestUpdateIso)),
    "utf8"
  );

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
    topics: doc.topics,
    badges: doc.badges,
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
    { loc: absoluteUrl("how-to-use.html"), priority: "0.8" },
    { loc: `${siteOrigin}/topics/`, priority: "0.86" },
    { loc: absoluteUrl("feed.html"), priority: "0.75" },
    { loc: `${siteOrigin}/workspace/`, priority: "0.85" },
    ...topicHubs.map((topic) => ({
      loc: `${siteOrigin}/topics/${topic.id}.html`,
      priority: "0.82"
    })),
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
  await writeFile(path.join(siteRoot, "feed.html"), stripTrailingWhitespace(renderFeedPage(docs, latestUpdateStr, latestUpdateIso)), "utf8");

  console.log(`Generated ${docs.length} documentation pages, ${topicHubs.length} topic hubs, how-to-use.html, corpus.js, feed.html, feed.xml, sitemap.xml, and robots.txt`);
}

await build();
