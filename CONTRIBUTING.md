# Contributing to WARLOCK-INDEX

**UNCLASSIFIED//OPEN SOURCE**

Thank you for considering a contribution. WARLOCK-INDEX exists to support source-disciplined, dated strategic research using only open sources. All contributions must preserve the project's core boundaries.

## Operating Boundaries (non-negotiable)

- Open sources only.
- Strategic understanding, warning context, and research continuity — **no policy recommendations, no operational guidance, no target lists, no tactics, no force deployment**.
- Every product carries: Product ID, Prepared UTC, Information cutoff UTC, Source base, Analytic confidence, clear separation of evidence vs. judgment.
- See [docs/standards/product-standard.md](docs/standards/product-standard.md), [docs/standards/source-evaluation.md](docs/standards/source-evaluation.md), and [docs/standards/assessment-style-guide.md](docs/standards/assessment-style-guide.md).

## How to Contribute

### 1. Propose before you write (recommended for new products)

Open an issue using one of the templates:
- **New Assessment / Source Packet Proposal**
- **Source Treatment Question**
- **Bug or correction to existing product**

Describe scope, primary source families, information cutoff, and any boundary considerations.

### 2. Use the templates and standards

- Start from `docs/templates/assessment-template.md` or `docs/templates/explainer-template.md` (or appropriate pattern for trackers, packets, matrices, notes, etc.).
- Follow datetime/versioning, style, source evaluation, and product-type rules exactly.
- Use consistent IDs (see product-standard.md and relevant product standard).
- Mark every product `UNCLASSIFIED//OPEN SOURCE`.
- Update the relevant collection README (under `docs/collections/`) and the Documentation Index when adding new material.

### 3. Local workflow

1. Edit or add Markdown under `docs/`.
2. Run the build + check:
   ```sh
   node site/build-library.mjs
   node site/check-library.mjs
   ```
3. The check will fail if output is stale — commit the refreshed `site/library/`, `site/corpus.js`, `site/feed.xml`, `site/sitemap.xml`, and `site/robots.txt` together with your docs changes.
4. Verify the new/updated pages look correct in `site/library/`.

### 4. Pull requests

- Keep PRs focused (one assessment or a small coherent set of updates).
- Update or add cross-references in the Documentation Index, the collection/standards/source-registers/templates hubs, and relevant READMEs when appropriate.
- Do not add tracking, server components, or external dependencies to the static site layer without strong justification that preserves the "local corpus terminal" design.

## What Gets Accepted

- High-fidelity source packets and dated assessments that follow the standards.
- Improvements to navigation, search, build tooling, export quality, and discoverability (RSS, better filters, print, citation support) that stay static and offline-friendly.
- Corrections to existing products with clear source justification and a new dated snapshot when appropriate.

## What Is Out of Scope

- Policy recommendations or "actionable" language.
- Operational, tactical, or targeting material.
- Addition of classified, paywalled-only, or non-public sources without explicit public release handling.
- Heavy visual dashboards or client frameworks that would break the minimal static contract.

## Questions?

Open a discussion or issue. The project favors clarity and restraint over volume.

Thank you for helping keep the corpus useful and trustworthy.