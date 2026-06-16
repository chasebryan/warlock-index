const corpus = window.WARLOCK_INDEX_CORPUS || [];

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const output = document.querySelector("#terminal-output");
const suggestionButtons = document.querySelectorAll("[data-query]");
const defaultResults = corpus.slice(0, 4);
const cosmosCanvas = document.querySelector("#cosmos-canvas");

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
    trackers: "tracker",
    timelines: "timeline",
    standards: "standard",
    matrices: "matrix"
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
    if (title.includes(term)) score += 6;
    if (tagText.includes(term)) score += 4;
    if (haystack.includes(term)) score += 2;
  });

  if (terms.length > 1 && haystack.includes(terms.join(" "))) {
    score += 5;
  }

  if (routeType && normalize(item.type) === routeType) {
    score += 14;
  }

  if (terms.includes("official") && terms.includes("sources")) {
    if (normalize(item.type) === "source register") score += 12;
    if (title.includes("official") || title.includes("intelligence and law enforcement")) score += 8;
    if (haystack.includes("threat source")) score += 8;
  }

  return score;
}

function searchCorpus(query) {
  const normalized = normalize(query);
  if (!normalized) {
    return defaultResults;
  }

  const terms = normalized.split(" ").filter(Boolean);
  return corpus
    .map((item) => ({ item, score: scoreItem(item, terms) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, 6)
    .map((entry) => entry.item);
}

function routeLine(query, results) {
  if (!query.trim()) {
    return "Standing by with core corpus routes.";
  }

  if (results.length === 0) {
    return `No direct hit for "${query}". Routing to the documentation index and source registers.`;
  }

  const types = [...new Set(results.map((item) => item.type))].slice(0, 3).join(", ");
  return `Matched "${query}" across ${results.length} route${results.length === 1 ? "" : "s"}: ${types}.`;
}

function findTitleIncludes(value) {
  const needle = normalize(value);
  return corpus.find((item) => normalize(item.title).includes(needle));
}

function formatUtcDate(value) {
  if (!value) return "";
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : value;
}

function confidenceLabel(value) {
  if (!value) return "";
  const match = String(value).match(/^(high|moderate(?:\s+to\s+high)?|low)\b/i);
  return match ? match[1].replace(/\b\w/g, (letter) => letter.toUpperCase()) : value;
}

function resultFacts(item) {
  return [
    item.preparedUtc ? `Prepared ${formatUtcDate(item.preparedUtc)}` : "",
    item.confidence ? `Confidence ${confidenceLabel(item.confidence)}` : "",
    item.productId || ""
  ].filter(Boolean);
}

function renderCard(item) {
  const facts = resultFacts(item);
  return `
    <a class="result-card" href="${escapeHtml(item.path)}">
      <span class="result-meta">
        <span>${escapeHtml(item.type)}</span>
        <span>${escapeHtml(item.theater)}</span>
        <span>${escapeHtml(item.domain)}</span>
      </span>
      <strong>${escapeHtml(item.title)}</strong>
      ${facts.length ? `
        <span class="result-facts">
          ${facts.map((fact) => `<span>${escapeHtml(fact)}</span>`).join("")}
        </span>
      ` : ""}
      <p>${escapeHtml(item.summary)}</p>
    </a>
  `;
}

function renderResults(query, results) {
  const fallback = results.length ? results : [
    corpus[0],
    findTitleIncludes("Official U.S."),
    findTitleIncludes("Source Evaluation Standard")
  ].filter(Boolean);

  output.innerHTML = `
    <p class="agent-line"><strong>wi</strong> ${escapeHtml(routeLine(query, results))}</p>
    ${fallback.map(renderCard).join("")}
  `;
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

window.addEventListener("scroll", () => {
  document
    .querySelector(".site-header")
    .setAttribute("data-elevated", String(window.scrollY > 12));
}, { passive: true });

const initialQuery = new URLSearchParams(window.location.search).get("q") || "";
if (initialQuery) {
  input.value = initialQuery;
}
renderResults(initialQuery, searchCorpus(initialQuery));
setActiveRoute(initialQuery);

function createCosmos(canvas) {
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let stars = [];
  let lights = [];
  let landPoints = [];
  let animationId = 0;
  let start = performance.now();

  const rand = (seed) => {
    let value = seed;
    return () => {
      value = (value * 1664525 + 1013904223) >>> 0;
      return value / 4294967296;
    };
  };

  const random = rand(2149);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = Array.from({ length: Math.round(Math.min(width * height / 6500, 150)) }, () => ({
      x: random() * width,
      y: random() * height * 0.78,
      r: 0.24 + random() * 0.5,
      phase: random() * Math.PI * 2,
      speed: 0.35 + random() * 0.85,
      hue: random() > 0.84 ? "rune" : random() > 0.72 ? "violet" : "warm"
    }));

    landPoints = makeLandPoints();
    lights = makeCityLights();
  }

  function makeLandPoints() {
    const localRandom = rand(4817);
    const clusters = [
      { lat: 50, lon: -104, sx: 54, sy: 24, n: 92 },
      { lat: 37, lon: -82, sx: 34, sy: 18, n: 62 },
      { lat: -15, lon: -59, sx: 30, sy: 34, n: 58 },
      { lat: 51, lon: 12, sx: 36, sy: 18, n: 82 },
      { lat: 4, lon: 21, sx: 32, sy: 42, n: 82 },
      { lat: 25, lon: 44, sx: 32, sy: 18, n: 48 },
      { lat: 24, lon: 79, sx: 30, sy: 22, n: 74 },
      { lat: 34, lon: 105, sx: 42, sy: 24, n: 96 },
      { lat: 1, lon: 109, sx: 34, sy: 18, n: 46 },
      { lat: -25, lon: 135, sx: 28, sy: 14, n: 42 }
    ];

    return clusters.flatMap((cluster) => Array.from({ length: cluster.n }, () => ({
      lat: Math.max(-68, Math.min(74, cluster.lat + (localRandom() - 0.5) * cluster.sy)),
      lon: cluster.lon + (localRandom() - 0.5) * cluster.sx,
      size: 0.45 + localRandom() * 0.92
    })));
  }

  function makeCityLights() {
    const localRandom = rand(9283);
    const clusters = [
      { lat: 40.7, lon: -74, sx: 10, sy: 7, n: 26, size: 0.82, tone: "warm" },
      { lat: 34.1, lon: -118.2, sx: 11, sy: 7, n: 18, size: 0.72, tone: "warm" },
      { lat: 41.9, lon: -87.6, sx: 12, sy: 8, n: 18, size: 0.68, tone: "warm" },
      { lat: 19.4, lon: -99.1, sx: 9, sy: 8, n: 16, size: 0.66, tone: "rune" },
      { lat: -23.6, lon: -46.6, sx: 13, sy: 9, n: 22, size: 0.72, tone: "warm" },
      { lat: -34.6, lon: -58.4, sx: 10, sy: 7, n: 14, size: 0.62, tone: "warm" },
      { lat: 51.5, lon: -0.1, sx: 12, sy: 8, n: 30, size: 0.86, tone: "warm" },
      { lat: 48.9, lon: 2.3, sx: 10, sy: 7, n: 26, size: 0.82, tone: "warm" },
      { lat: 52.5, lon: 13.4, sx: 13, sy: 8, n: 24, size: 0.72, tone: "rune" },
      { lat: 41.9, lon: 12.5, sx: 10, sy: 8, n: 15, size: 0.64, tone: "warm" },
      { lat: 30.1, lon: 31.2, sx: 8, sy: 12, n: 20, size: 0.68, tone: "rune" },
      { lat: 6.5, lon: 3.4, sx: 10, sy: 8, n: 16, size: 0.62, tone: "warm" },
      { lat: 25.2, lon: 55.3, sx: 10, sy: 7, n: 16, size: 0.66, tone: "rune" },
      { lat: 28.6, lon: 77.2, sx: 12, sy: 10, n: 28, size: 0.82, tone: "warm" },
      { lat: 19.1, lon: 72.9, sx: 10, sy: 9, n: 20, size: 0.74, tone: "warm" },
      { lat: 39.9, lon: 116.4, sx: 14, sy: 8, n: 30, size: 0.84, tone: "rune" },
      { lat: 31.2, lon: 121.5, sx: 12, sy: 8, n: 34, size: 0.88, tone: "warm" },
      { lat: 22.5, lon: 114.1, sx: 10, sy: 7, n: 22, size: 0.76, tone: "warm" },
      { lat: 35.7, lon: 139.7, sx: 11, sy: 7, n: 30, size: 0.84, tone: "warm" },
      { lat: 37.6, lon: 127, sx: 9, sy: 7, n: 20, size: 0.72, tone: "rune" },
      { lat: 1.3, lon: 103.8, sx: 9, sy: 7, n: 18, size: 0.7, tone: "warm" },
      { lat: -6.2, lon: 106.8, sx: 12, sy: 9, n: 18, size: 0.64, tone: "warm" },
      { lat: -33.9, lon: 151.2, sx: 12, sy: 8, n: 20, size: 0.72, tone: "warm" }
    ];

    return clusters.flatMap((cluster) => Array.from({ length: cluster.n }, () => ({
      lat: cluster.lat + (localRandom() - 0.5) * cluster.sy,
      lon: cluster.lon + (localRandom() - 0.5) * cluster.sx,
      size: cluster.size * (0.55 + localRandom() * 0.85),
      pulse: localRandom() * Math.PI * 2,
      tone: cluster.tone
    })));
  }

  function project(lat, lon, rotation, cx, cy, radius) {
    const phi = lat * Math.PI / 180;
    const theta = (lon + rotation) * Math.PI / 180;
    const x = Math.cos(phi) * Math.sin(theta);
    const y = Math.sin(phi);
    const z = Math.cos(phi) * Math.cos(theta);
    if (z < -0.12) return null;

    const perspective = 0.84 + z * 0.16;
    return {
      x: cx + x * radius * perspective,
      y: cy - y * radius * perspective,
      z,
      alpha: Math.max(0, Math.min(1, (z + 0.12) / 1.12))
    };
  }

  function drawStars(time) {
    stars.forEach((star) => {
      const twinkle = 0.38 + Math.sin(time * star.speed + star.phase) * 0.22 + 0.28;
      const colors = {
        warm: `rgba(244, 234, 219, ${0.34 * twinkle})`,
        rune: `rgba(217, 255, 45, ${0.4 * twinkle})`,
        violet: `rgba(139, 53, 255, ${0.32 * twinkle})`
      };
      ctx.beginPath();
      ctx.fillStyle = colors[star.hue];
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function strokeProjectedLine(points, style, widthPx) {
    ctx.beginPath();
    let started = false;
    points.forEach((point) => {
      if (!point) {
        started = false;
        return;
      }
      if (!started) {
        ctx.moveTo(point.x, point.y);
        started = true;
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.strokeStyle = style;
    ctx.lineWidth = widthPx;
    ctx.stroke();
  }

  function drawGlobe(time) {
    const isCompact = width <= 900;
    const radius = isCompact ? Math.min(width * 0.22, 108) : Math.min(width * 0.16, height * 0.34, 280);
    const cx = width > 900 ? width * 0.91 : width * 0.86;
    const cy = width > 900 ? height * 0.49 : height * 0.18;
    const rotation = reducedMotion ? -24 : ((time * 6.2) - 24) % 360;

    const glow = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.55);
    glow.addColorStop(0, "rgba(93, 23, 189, 0)");
    glow.addColorStop(0.62, "rgba(93, 23, 189, 0.075)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.55, 0, Math.PI * 2);
    ctx.fill();

    const sphere = ctx.createRadialGradient(cx + radius * 0.16, cy + radius * 0.12, radius * 0.08, cx, cy, radius);
    sphere.addColorStop(0, "rgba(9, 11, 10, 0.86)");
    sphere.addColorStop(0.42, "rgba(5, 8, 7, 0.92)");
    sphere.addColorStop(0.78, "rgba(5, 4, 8, 0.97)");
    sphere.addColorStop(1, "rgba(1, 1, 1, 0.98)");
    ctx.fillStyle = sphere;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    [-60, -35, -15, 0, 15, 35, 60].forEach((lat) => {
      const points = [];
      for (let lon = -180; lon <= 180; lon += 6) {
        points.push(project(lat, lon, rotation, cx, cy, radius));
      }
      strokeProjectedLine(points, "rgba(217, 255, 45, 0.052)", 0.55);
    });

    for (let lon = -180; lon < 180; lon += 45) {
      const points = [];
      for (let lat = -78; lat <= 78; lat += 5) {
        points.push(project(lat, lon, rotation, cx, cy, radius));
      }
      strokeProjectedLine(points, "rgba(201, 198, 189, 0.052)", 0.55);
    }

    landPoints.forEach((land) => {
      const point = project(land.lat, land.lon, rotation, cx, cy, radius);
      if (!point) return;
      ctx.fillStyle = `rgba(217, 255, 45, ${0.025 + point.alpha * 0.06})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, land.size * (0.75 + point.z * 0.22), 0, Math.PI * 2);
      ctx.fill();
    });

    lights.forEach((light) => {
      const point = project(light.lat, light.lon, rotation, cx, cy, radius);
      if (!point) return;
      const pulse = 0.62 + Math.sin(time * 1.45 + light.pulse) * 0.18;
      const tone = light.tone === "rune" ? "217, 255, 45" : "244, 234, 219";
      ctx.fillStyle = `rgba(${tone}, ${point.alpha * pulse * 0.42})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, light.size, 0, Math.PI * 2);
      ctx.fill();
    });

    const terminator = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
    terminator.addColorStop(0, "rgba(0, 0, 0, 0.08)");
    terminator.addColorStop(0.48, "rgba(0, 0, 0, 0)");
    terminator.addColorStop(1, "rgba(0, 0, 0, 0.42)");
    ctx.fillStyle = terminator;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    ctx.restore();

    ctx.strokeStyle = "rgba(244, 234, 219, 0.11)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(217, 255, 45, 0.055)";
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.04, -0.45, Math.PI * 1.32);
    ctx.stroke();
  }

  function draw(timeStamp) {
    const time = (timeStamp - start) / 1000;
    ctx.clearRect(0, 0, width, height);
    drawStars(time);
    drawGlobe(time);
    if (!reducedMotion) {
      animationId = requestAnimationFrame(draw);
    }
  }

  window.addEventListener("resize", () => {
    resize();
    if (reducedMotion) draw(performance.now());
  });

  resize();
  draw(start);
}

createCosmos(cosmosCanvas);
