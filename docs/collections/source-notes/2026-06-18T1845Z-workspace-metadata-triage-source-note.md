# Workspace Metadata Triage Source Note

**UNCLASSIFIED//OPEN SOURCE**

**Source Note ID:** WI-SN-WORKSPACE-2026-0001

**Prepared UTC:** 2026-06-18T18:45:00Z

**Information cutoff UTC:** 2026-06-18T18:45:00Z

**Source base:** WARLOCK-INDEX workspace, structured metadata standard, confidence and caveat taxonomy, generated corpus exports, and source freshness trackers.

**Analytic confidence:** High for repository workflow; moderate for downstream user workflows because external systems will vary.

**Topics:** workspace; metadata; triage; source freshness; export

**Source classes:** Internal source note; Generated metadata; Analytic workflow

**Freshness status:** Current

**Last source check UTC:** 2026-06-18T18:45:00Z

**Next refresh UTC:** 2026-06-25T18:45:00Z

**Caveat tags:** current-watch; archival-reference

**Related products:** WI-STD-006; WI-STD-007; WI-TRK-FRESHNESS-2026-0001; WI-TRK-GAPS-2026-0001

**Safety boundary:** Workflow note only. Does not assign operational priorities, collection requirements, target priorities, or policy recommendations.

## Purpose

The workspace should function as a triage surface for the enriched corpus, not only as a document browser. Metadata-aware routes make it possible to quickly isolate records that need refresh, carry caveats, or belong to defensive cyber source lanes.

## Workspace Routes Added

| Route | Use | Metadata basis |
| --- | --- | --- |
| Watch queue | Find records with `Freshness status: Watch`. | `freshnessStatus` |
| Gap register | Find records marked as gaps or implementation-gap caveats. | `freshnessStatus`, `caveatTags` |
| Defensive cyber | Find defensive cyber products and caveated cyber records. | `caveatTags`, metadata search |

## Search And Preview Behavior

Workspace search now uses structured metadata fields in addition to title, summary, tags, and product IDs. Search terms can match source classes, actors, caveats, related products, source URLs, source hashes, freshness status, and safety boundaries.

The preview panel now exposes:

- Freshness status.
- Last source check.
- Next refresh.
- Source classes.
- Actors.
- Caveat tags.
- Related product IDs.
- Source hash.
- Safety boundary.

## Export Behavior

Reader packets and text bundles now carry structured metadata with each record. This supports downstream review, record comparison, and source freshness triage without requiring the user to reopen each page.

## Review Rule

If a queued packet contains any record with `Freshness status: Watch`, `Gap`, or `Superseded`, the packet should be treated as a working research bundle, not a final source base.

