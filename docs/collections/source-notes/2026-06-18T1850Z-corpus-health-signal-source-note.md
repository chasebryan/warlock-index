# Corpus Health Signal Source Note

**UNCLASSIFIED//OPEN SOURCE**

**Source Note ID:** WI-SN-HEALTH-2026-0001

**Prepared UTC:** 2026-06-18T18:50:00Z

**Information cutoff UTC:** 2026-06-18T18:50:00Z

**Source base:** WARLOCK-INDEX generator, structured metadata standard, confidence and caveat taxonomy, and workspace triage source note.

**Analytic confidence:** High for generated-field behavior; moderate for interpretation because corpus health is a workflow aid, not an analytic judgment.

**Topics:** corpus health; metadata; refresh due; audit; workspace

**Source classes:** Internal source note; Generated metadata; Analytic workflow

**Freshness status:** Current

**Last source check UTC:** 2026-06-18T18:50:00Z

**Next refresh UTC:** 2026-06-25T18:50:00Z

**Caveat tags:** current-watch; archival-reference

**Related products:** WI-STD-006; WI-STD-007; WI-SN-WORKSPACE-2026-0001

**Safety boundary:** Corpus health signal only. Does not score operational value, policy priority, target value, or collection priority.

## Purpose

The generator now adds source-health fields to each corpus export record. These fields make it easier to find under-described, stale, gap-marked, watchlisted, or refresh-due records without manually reading every product.

## Generated Fields

| Field | Meaning |
| --- | --- |
| `metadataCompleteness` | Percentage score based on whether key product, source, freshness, caveat, and audit fields are present. |
| `refreshDue` | Boolean set when `Next refresh UTC` is earlier than the corpus health generation date. |
| `daysUntilRefresh` | Days between the corpus health generation date and `Next refresh UTC`. Negative values are overdue. |
| `sourceHealthStatus` | Derived status: `ready`, `watch`, `gap`, `refresh-due`, `stale`, or `needs-metadata`. |
| `sourceHealthFlags` | Searchable flags such as `missing-safety-boundary`, `missing-source-classes`, `watch`, `gap`, or `refresh-due`. |

## Export Locations

- `site/corpus.json` and `site/workspace/corpus.json` include per-record health fields.
- `site/corpus.csv` includes health fields for spreadsheet review.
- `site/corpus-health.json` and `site/workspace/corpus-health.json` summarize corpus-wide health counts.

## Interpretation Rules

1. `metadataCompleteness` measures documentation structure, not truth or importance.
2. `sourceHealthStatus: ready` means the record is structurally complete enough for reuse, not that the underlying issue is settled.
3. `sourceHealthStatus: needs-metadata` should trigger metadata enrichment before external reuse.
4. `sourceHealthStatus: refresh-due` should trigger a source check before reuse.
5. `sourceHealthStatus: gap` should preserve the uncertainty in downstream products.
6. `sourceHealthStatus: watch` should be treated as a living source lane.

