# WARLOCK-INDEX

**UNCLASSIFIED//OPEN SOURCE**

WARLOCK-INDEX is an open-source strategic research corpus for dated
assessments, explainers, source packets, trackers, timelines, actor profiles,
and source registers.

The project is built for source discipline and research continuity. It is not
a policy shop, target package, operational playbook, intelligence tasking
system, or substitute for classified government analysis.

## Operating Boundary

Every product in this repository must remain within the following lane:

- Use open sources only unless a future source is explicitly cleared for public
  release.
- Write for strategic understanding, warning context, and research continuity.
- Do not recommend government, military, intelligence, cyber, or diplomatic
  actions.
- Do not provide target selection, weapons employment guidance, exploit steps,
  evasion methods, force deployment instructions, or tactical procedures.
- Mark information cutoff, preparation time, source base, confidence, and
  limitations.
- Preserve source traceability so a reader can distinguish evidence from
  analytic judgment.

## Repository Map

- [docs/index.md](docs/index.md) - navigation hub for the documentation corpus.
- [docs/standards](docs/standards) - product standards, source rules, style, and
  tradecraft guidance.
- [docs/templates](docs/templates) - repeatable product templates, including
  assessment and explainer templates.
- [docs/source-registers](docs/source-registers) - vetted source registries.
- [docs/collections/explainers](docs/collections/explainers) - reader-facing
  explanations for major topics.
- [docs/collections](docs/collections) - source notes, timelines, trackers,
  matrices, and actor profile material.
- [docs/assessments](docs/assessments) - finished and in-progress analytical
  products by theater and domain.
- [site](site) - static public website, generated library, search data, and
  installable Workspace app.

## Website And Workspace

WARLOCK-INDEX is managed on two fronts: canonical Markdown under `docs/` and
public website output under `site/`.

- `site/index.html` is the public homepage and search entry point.
- `site/library/` is generated from the canonical Markdown corpus.
- `site/corpus.js` powers client-side search and route suggestions.
- `site/feed.html` provides a browser-readable recent-updates page.
- `site/feed.xml` provides the RSS feed of recent dated products.
- `site/workspace/` publishes the installable Workspace app for browsing and
  downloading selected corpus records (HTML packets or plain text bundles).
- Homepage shows recent updates and improved date-aware search. Document pages include "Cite" support.

After changing `docs/`, run:

```sh
node site/build-library.mjs
node site/check-library.mjs
```

The check rebuilds the website and fails if generated output was stale.

The public website is published at `https://www.warlock-index.org/`.
The canonical brand is `WARLOCK-INDEX`. Site metadata also includes
search-discovery aliases for `Warlock-Index`, `warlock-index`, and `warlock
index` so browser search engines can associate common phrase variants with the
same project.

## Product Standard

The baseline standard is documented in
[docs/standards/product-standard.md](docs/standards/product-standard.md).
All assessment and explainer products should include:

- Classification/handling label: `UNCLASSIFIED//OPEN SOURCE`.
- Product ID.
- Prepared timestamp in UTC.
- Information cutoff timestamp in UTC.
- Source base and source reliability notes.
- Analytic confidence.
- Key judgments separated from evidence.
- No recommendations or operational guidance.

## Initial Source Corpus

The initial source registers are deliberately official-source heavy:

- U.S. Intelligence Community annual threat assessments.
- U.S. Department of Defense strategy and military power reports.
- NATO summit declarations and public strategic documents.
- Carefully separated research and media sources for current-event context.

As the corpus grows, official documents should remain the anchor for major
judgments, while current reporting and research should be used to update
timelines, indicators, and uncertainty.
