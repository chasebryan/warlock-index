import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const defaultSiteRoot = path.dirname(fileURLToPath(import.meta.url));

const locationProfiles = [
  {
    id: "iran-hormuz",
    region: "Iran / Strait of Hormuz",
    anchor: "Strait of Hormuz / Persian Gulf",
    placement: "Placed on the Hormuz chokepoint because the active Iran lane is tied to sanctions, IAEA, maritime access, and Gulf implementation questions.",
    x: 63.4,
    y: 47.2,
    terms: ["iran", "hormuz", "persian gulf", "iaea", "mou", "middle east", "sanctions"]
  },
  {
    id: "red-sea",
    region: "Red Sea / Bab el-Mandeb",
    anchor: "Bab el-Mandeb / Red Sea",
    placement: "Placed at the southern Red Sea chokepoint where Houthi disruption, Yemen context, shipping, and Suez exposure converge.",
    x: 58.6,
    y: 55.4,
    terms: ["red sea", "houthi", "bab el-mandeb", "yemen", "maritime disruption"]
  },
  {
    id: "ukraine-black-sea",
    region: "Ukraine / Black Sea",
    anchor: "Ukraine / Black Sea approaches",
    placement: "Placed over the Ukraine-Black Sea theater rather than central Europe because these records concern the war-support and Black Sea security file.",
    x: 55.7,
    y: 37.4,
    terms: ["ukraine", "black sea", "europe-russia"]
  },
  {
    id: "russia-strategic",
    region: "Russia / strategic forces",
    anchor: "Western Russia strategic-forces lane",
    placement: "Placed in western Russia as a strategic-weapons anchor for Russia nuclear-signaling and strategic-forces records, separate from the Ukraine war marker.",
    x: 61.6,
    y: 30.8,
    terms: ["russia strategic weapons", "russian strategic weapons", "russia nuclear", "russian nuclear", "russia strategic forces"]
  },
  {
    id: "nato-eastern-europe",
    region: "NATO eastern Europe",
    anchor: "NATO eastern flank",
    placement: "Placed on NATO's eastern flank because these records track force presence, allied readiness, and Europe-Ukraine source packets.",
    x: 53.1,
    y: 34.8,
    terms: ["nato", "europe force presence", "allied capacity", "poland", "romania", "baltic", "europe-russia"]
  },
  {
    id: "china-taiwan",
    region: "China / Taiwan Strait",
    anchor: "Taiwan Strait / first island chain",
    placement: "Placed at the Taiwan Strait and first-island-chain problem set, which is the corpus anchor for China, PLA, and Taiwan records.",
    x: 76.8,
    y: 45.8,
    terms: ["china", "prc", "pla", "taiwan", "first island chain", "indo-pacific"]
  },
  {
    id: "south-china-sea",
    region: "South China Sea / Philippines",
    anchor: "South China Sea approaches",
    placement: "Placed over the South China Sea and Philippine approaches for claimant-state, maritime-zone, and West Philippine Sea source packets.",
    x: 76.2,
    y: 52.2,
    terms: ["south china sea", "philippines", "asean", "maritime", "indo-pacific allied"]
  },
  {
    id: "korean-peninsula",
    region: "Korean Peninsula",
    anchor: "Korean Peninsula",
    placement: "Placed on the Korean Peninsula for DPRK, ROK, missile, nuclear, and extended-deterrence records.",
    x: 80.3,
    y: 39.2,
    terms: ["north korea", "dprk", "korea", "rok", "republic of korea"]
  },
  {
    id: "japan",
    region: "Japan",
    anchor: "Japan / northeast first island chain",
    placement: "Placed on Japan as the corpus anchor for Japanese defense buildup, ATLA, U.S.-Japan, and northeast first-island-chain records.",
    x: 82.2,
    y: 41.5,
    terms: ["japan", "atla", "japan defense", "us-japan"]
  },
  {
    id: "aukus-australia",
    region: "Australia / AUKUS",
    anchor: "Australia / AUKUS depth",
    placement: "Placed on Australia for AUKUS, SRF-West, undersea, industrial-depth, and southern Indo-Pacific posture records.",
    x: 80.5,
    y: 71.8,
    terms: ["australia", "aukus", "submarine rotational force", "srF-west"]
  },
  {
    id: "arctic-high-north",
    region: "Arctic / High North",
    anchor: "High North / North Atlantic gateway",
    placement: "Placed in the North Atlantic-High North band because these records combine Arctic access, Greenland, Nordic defense, NORAD, and NATO northern-flank issues.",
    x: 49.6,
    y: 14.8,
    terms: ["arctic", "high north", "norad", "greenland", "norway", "finland", "sweden", "denmark", "iceland"]
  },
  {
    id: "north-america-homeland",
    region: "United States / Homeland",
    anchor: "United States homeland",
    placement: "Placed over the United States for homeland, FBI, DHS, DOJ, official-threat, and domestic security source lanes.",
    x: 25.3,
    y: 40.5,
    terms: ["homeland", "fbi", "dhs", "doj", "law enforcement", "official threat", "western hemisphere"]
  },
  {
    id: "mexico-caribbean",
    region: "Mexico / Caribbean / Western Hemisphere",
    anchor: "Mexico-Caribbean approaches",
    placement: "Placed at the Mexico-Caribbean approaches for western-hemisphere, border, transnational-criminal, and regional security records.",
    x: 26.5,
    y: 51.7,
    terms: ["mexico", "caribbean", "western hemisphere", "transnational criminal", "border"]
  },
  {
    id: "africa",
    region: "Africa",
    anchor: "Central Africa continental reference",
    placement: "Placed near central Africa as a continent-level source lane; marker text should identify the specific subregion when a product is narrower.",
    x: 53.8,
    y: 63.5,
    terms: ["africa", "sahel", "nigeria", "ethiopia", "somalia", "libya", "sudan"]
  },
  {
    id: "europe-allies",
    region: "Western Europe / Allied capacity",
    anchor: "Western Europe allied-capacity lane",
    placement: "Placed over western Europe for UK, France, Germany, EU security, and allied-capacity records that are not specifically eastern-flank items.",
    x: 48.5,
    y: 35.2,
    terms: ["united kingdom", "france", "germany", "eu security", "allied official", "nato allied"]
  },
  {
    id: "global-maritime",
    region: "Global maritime chokepoints",
    anchor: "Indian Ocean maritime crossroads",
    placement: "Placed in open water as a global maritime-source anchor, not as a claim about a single incident location.",
    x: 66.6,
    y: 62.1,
    terms: ["shipping", "ais", "marinetracker"]
  },
  {
    id: "middle-east-maritime",
    region: "Middle East maritime chokepoints",
    anchor: "Suez-Red Sea-Hormuz corridor",
    placement: "Placed between the Red Sea and Gulf chokepoint system for records that cover Hormuz, Bab el-Mandeb, Suez, and related Middle East maritime lanes together.",
    x: 60.4,
    y: 51.8,
    terms: ["middle east maritime", "maritime chokepoint", "hormuz", "bab el-mandeb", "red sea", "suez", "eastern mediterranean"]
  },
  {
    id: "global-dib",
    region: "Global defense industrial base",
    anchor: "North Atlantic industrial base lane",
    placement: "Placed in the North Atlantic industrial-base corridor as a cross-theater marker for U.S., allied, munitions, shipbuilding, and supply-chain records.",
    x: 39.4,
    y: 39.6,
    terms: ["defense industrial base", "defense-industrial-base", "industrial capacity", "munitions", "shipbuilding", "critical materials", "supply chain", "counter-uas"]
  },
  {
    id: "global-cyber-space",
    region: "Global cyber / space",
    anchor: "North Pacific cyber-space lane",
    placement: "Placed in open Pacific space as a non-territorial anchor for global cyber, space, counterspace, telecommunications, and critical-infrastructure records.",
    x: 87.0,
    y: 31.8,
    terms: ["cyber", "space", "counterspace", "critical infrastructure", "telecommunications", "salt typhoon"]
  },
  {
    id: "global-strategy-research",
    region: "Global strategy and warfare research",
    anchor: "Atlantic strategic-research lane",
    placement: "Placed in open Atlantic space as a non-territorial anchor for arms control, strategic stability, academic research, and cross-theater strategy records.",
    x: 40.5,
    y: 47.4,
    terms: ["all topic", "current source sweep", "refresh queue", "new start", "arms control", "arms-control", "strategic stability", "stratagems", "strategy and warfare", "academic research", "research source"]
  }
];

const categoryByType = new Map([
  ["Tracker", "tracker"],
  ["Source Packet", "source collection"],
  ["Map Resource", "map reference"],
  ["Assessment", "assessment"],
  ["Matrix", "matrix"],
  ["Explainer", "explainer"],
  ["Timeline", "timeline"],
  ["Actor Profile", "actor profile"]
]);

function parseDate(value) {
  const parsed = Date.parse(value || "");
  return Number.isNaN(parsed) ? 0 : parsed;
}

function markerDate(record) {
  const date = parseDate(record.preparedUtc) || parseDate(record.cutoffUtc);
  return date ? new Date(date).toISOString().slice(0, 10) : "";
}

function normalizeText(value) {
  return String(value || "").toLowerCase().replace(/[-_/]+/g, " ");
}

function searchableFields(record) {
  return [
    { value: record.title, weight: 4 },
    { value: record.path, weight: 4 },
    { value: record.theater, weight: 4 },
    { value: record.domain, weight: 3 },
    { value: record.type, weight: 2 },
    { value: record.summary, weight: 1 },
    { value: record.topics, weight: 3 },
    { value: record.tags, weight: 3 },
    { value: record.actors, weight: 2 },
    { value: record.topicTags, weight: 3 },
    { value: record.badges, weight: 2 }
  ].map((field) => ({
    text: Array.isArray(field.value) ? normalizeText(field.value.join(" ")) : normalizeText(field.value),
    weight: field.weight
  }));
}

function matchScore(fields, profile) {
  return profile.terms.reduce((score, term) => {
    const normalized = normalizeText(term);
    const termWeight = Math.max(1, normalized.split(/\s+/).length);
    const fieldScore = fields.reduce((subtotal, field) => {
      return field.text.includes(normalized) ? subtotal + (termWeight * field.weight) : subtotal;
    }, 0);
    return score + fieldScore;
  }, 0);
}

function chooseProfile(record) {
  const fields = searchableFields(record);
  return locationProfiles
    .map((profile) => ({ profile, score: matchScore(fields, profile) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.profile.id.localeCompare(b.profile.id))[0]?.profile || null;
}

function categoryFor(record) {
  if (/theater-map-reference|\/maps\//i.test(`${record.path} ${record.title} ${record.domain}`)) return "map reference";
  return categoryByType.get(record.type) || String(record.type || "document").toLowerCase();
}

function shapeFor(record) {
  if (record.type === "Tracker" || record.refreshDue) return "square";
  return "dot";
}

function statusFor(record, newestTime) {
  const recordTime = parseDate(record.preparedUtc) || parseDate(record.cutoffUtc);
  const ageDays = recordTime && newestTime ? Math.floor((newestTime - recordTime) / 86400000) : 999;
  if (record.sourceHealthStatus === "refresh-due") return "active";
  if (record.sourceHealthStatus === "watch" || /watch/i.test(record.freshnessStatus || "")) return "active";
  if (ageDays <= 7) return "updated";
  return "watch";
}

function markerId(record, profile, usedIds) {
  const source = String(record.productId || record.path || record.title || profile.id)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 54) || profile.id;
  let id = `${profile.id}-${source}`.slice(0, 72).replace(/-+$/g, "");
  let suffix = 2;
  while (usedIds.has(id)) {
    const base = id.slice(0, 68).replace(/-+$/g, "");
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  usedIds.add(id);
  return id;
}

function rankRecord(record, newestTime) {
  const dateScore = parseDate(record.preparedUtc) || parseDate(record.cutoffUtc);
  const typeWeight = {
    Tracker: 80,
    "Source Packet": 70,
    "Map Resource": 68,
    Assessment: 60,
    Matrix: 56,
    Explainer: 42,
    Timeline: 40,
    "Actor Profile": 38
  }[record.type] || 20;
  const healthWeight = {
    "refresh-due": 35,
    watch: 30,
    gap: 22,
    ready: 12,
    "needs-metadata": 5,
    stale: 0
  }[record.sourceHealthStatus] || 8;
  const recencyWeight = newestTime && dateScore ? Math.max(0, 28 - Math.floor((newestTime - dateScore) / 86400000)) : 0;
  return typeWeight + healthWeight + recencyWeight + (record.metadataCompleteness || 0) / 20;
}

function isMarkerEligible(record) {
  const pathValue = String(record.path || "");
  const titleValue = String(record.title || "");
  const joined = normalizeText(`${titleValue} ${pathValue} ${record.productId || ""}`);

  if (/collection gap register|source freshness dashboard|all topic current source sweep|map source caveat playbook/.test(joined)) {
    return false;
  }
  if (/\/maps\/index\.html$/.test(pathValue)) {
    return false;
  }
  if (record.theater === "Collections" && !/theater-map-reference|maritime-ais-map-handling/.test(pathValue)) {
    return false;
  }

  return true;
}

function markerFromRecord(record, profile, newestTime, usedIds) {
  const fallbackSummary = `${record.type || "Corpus"} update covering ${profile.region}.`;
  const summary = !record.summary || record.summary === "WARLOCK-INDEX documentation product."
    ? fallbackSummary
    : record.summary;
  return {
    id: markerId(record, profile, usedIds),
    title: record.title,
    region: profile.region,
    anchor: profile.anchor,
    placement: profile.placement,
    category: categoryFor(record),
    date: markerDate(record),
    x: profile.x,
    y: profile.y,
    shape: shapeFor(record),
    status: statusFor(record, newestTime),
    summary: shortSummary(summary),
    url: record.path
  };
}

function shortSummary(value, maxLength = 280) {
  const summary = String(value || "").replace(/\s+/g, " ").trim();
  if (summary.length <= maxLength) return summary;
  return `${summary.slice(0, maxLength - 1).trim()}…`;
}

function spreadSharedCoordinates(markers) {
  const offsets = [
    [0, 0],
    [0.7, -0.55],
    [-0.7, 0.55],
    [0.9, 0.55],
    [-0.9, -0.55]
  ];
  const counts = new Map();

  return markers.map((marker) => {
    const key = `${marker.x}:${marker.y}`;
    const count = counts.get(key) || 0;
    counts.set(key, count + 1);
    const [dx, dy] = offsets[count % offsets.length];
    return {
      ...marker,
      x: Number((marker.x + dx).toFixed(2)),
      y: Number((marker.y + dy).toFixed(2))
    };
  });
}

function selectMarkerRecords(corpus, limit = 18) {
  const newestTime = Math.max(...corpus.map((record) => parseDate(record.preparedUtc) || parseDate(record.cutoffUtc)).filter(Boolean));
  const candidates = corpus
    .filter((record) => record.path && record.title && isMarkerEligible(record))
    .map((record) => ({ record, profile: chooseProfile(record) }))
    .filter((entry) => entry.profile)
    .map((entry) => ({ ...entry, score: rankRecord(entry.record, newestTime) }))
    .sort((a, b) => b.score - a.score || String(a.record.title).localeCompare(String(b.record.title)));

  const selected = [];
  const profileCounts = new Map();
  const categoryCounts = new Map();

  for (const candidate of candidates) {
    const profileCount = profileCounts.get(candidate.profile.id) || 0;
    const category = categoryFor(candidate.record);
    const categoryCount = categoryCounts.get(category) || 0;
    if (profileCount >= 2) continue;
    if (categoryCount >= 7) continue;

    selected.push(candidate);
    profileCounts.set(candidate.profile.id, profileCount + 1);
    categoryCounts.set(category, categoryCount + 1);
    if (selected.length >= limit) break;
  }

  const usedIds = new Set();
  return spreadSharedCoordinates(selected
    .map((entry) => markerFromRecord(entry.record, entry.profile, newestTime, usedIds))
    .sort((a, b) => b.date.localeCompare(a.date) || a.region.localeCompare(b.region) || a.title.localeCompare(b.title)));
}

function previewMarkers(markers) {
  return markers.map((marker) => ({
    ...marker,
    url: marker.url.startsWith("../") ? marker.url : `../${marker.url}`
  }));
}

export async function generateMapUpdates({ siteRoot = defaultSiteRoot, limit = 18 } = {}) {
  const corpusPath = path.join(siteRoot, "corpus.json");
  const corpus = JSON.parse(await readFile(corpusPath, "utf8"));
  const markers = selectMarkerRecords(corpus, limit);

  if (!markers.length) {
    throw new Error("No map markers were generated from the corpus.");
  }

  await writeFile(path.join(siteRoot, "global-map-updates.json"), `${JSON.stringify(markers, null, 2)}\n`, "utf8");
  await writeFile(path.join(siteRoot, "previews", "global-map-updates.json"), `${JSON.stringify(previewMarkers(markers), null, 2)}\n`, "utf8");
  return markers;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const markers = await generateMapUpdates();
  console.log(`Generated ${markers.length} global map markers.`);
}
