# Standards

**UNCLASSIFIED//OPEN SOURCE**

**Product ID:** WI-DOCS-STANDARDS-2026-0001

**Prepared UTC:** 2026-06-20T00:00:00Z

**Information cutoff UTC:** 2026-06-20T00:00:00Z

**Source base:** The seven standards documents and their cross-references.

**Analytic confidence:** High for documentation structure.

**Topics:** standards; tradecraft; governance
**Source classes:** Internal documentation
**Safety boundary:** Documentation structure only.

These standards govern product structure, source handling, style, timestamps,
metadata, confidence labeling, and explainer content across the WARLOCK-INDEX
corpus.

All contributors and products must follow the standards. The standards
themselves are maintained as dated corpus products. When editing a standard,
bump its Prepared UTC and Information cutoff UTC and add cross references.

## Core Standards

- [Product Standard](product-standard.md) — minimum structure, header fields, prohibited content, revision practice (WI-STD-001).
- [Source Evaluation Standard](source-evaluation.md) — source classes (A/B/C/D), corroboration, reliability notes (WI-STD-002).
- [Assessment Style Guide](assessment-style-guide.md) — voice, structure, estimative language, boundaries, attribution, headers (WI-STD-003).
- [Datetime and Versioning Standard](datetime-and-versioning.md) — UTC timestamps, filenames, cutoff, Product ID format (WI-STD-004).
- [Explainer Standard](explainer-standard.md) — required sections, writing rules, boundaries for reader-facing docs (WI-STD-005).
- [Structured Metadata And Export Standard](structured-metadata-and-export-standard.md) — machine-readable fields, generated exports (WI-STD-006).
- [Confidence And Caveat Taxonomy](confidence-caveat-taxonomy.md) — High/Moderate/Low + searchable caveat tags (WI-STD-007).

## Related

- [Templates](../templates/)
- [Documentation Index](../index.md)
- [Assessment Index](../assessments/README.md)
- [Collections](../collections/README.md)

## Maintenance Note

Standards are part of the corpus. Keep them short, precise, and cross-linked.
Do not add operational or policy content.

After editing any standard or template, run:
```
node site/build-library.mjs
node site/check-library.mjs
```
to keep the generated library, corpus data, and site outputs in sync.

## Quick Start for New Products
1. Choose the right template (assessment or explainer).
2. Copy the required header fields from the relevant standard.
3. Follow the section structure and writing rules.
4. Add cross-references to related registers, packets, trackers, and the Documentation Index.
5. Run the build + check before considering the change complete.
