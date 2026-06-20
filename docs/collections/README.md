# Collections

**UNCLASSIFIED//OPEN SOURCE**

**Product ID:** WI-DOCS-COLLECTIONS-2026-0001

**Prepared UTC:** 2026-06-20T00:00:00Z

**Information cutoff UTC:** 2026-06-20T00:00:00Z

**Source base:** Existing WARLOCK-INDEX collection products, sub-READMEs, and documentation index structure.

**Analytic confidence:** High for navigation structure.

**Topics:** navigation; collections; corpus structure
**Source classes:** Internal documentation
**Safety boundary:** Documentation structure only. No analytic or operational claims.

Collections hold the supporting infrastructure of the WARLOCK-INDEX corpus. They organize reusable evidence (source packets), collection workflow tools (trackers), explanatory context (explainers), synthesis products (matrices and crosswalks), dated event sequences (timelines), actor framing (profiles), and provenance records (source notes).

Collections are not standalone assessments. They support the assessments, explainers, and registers by preserving source discipline, enabling cross-product consistency, and providing durable navigation surfaces.

## Product Types

| Type | Purpose | Main File |
|------|---------|-----------|
| Explainers | Reader-facing explanations ("what is this and why does it matter?") | [explainers/README.md](explainers/README.md) |
| Global Assimilation | Cross-cutting matrices and synthesis across actors/domains | [global-assimilation/README.md](global-assimilation/README.md) |
| Trackers | Source collection queues, freshness, gaps | [trackers/README.md](trackers/README.md) |
| Source Packets | Organized evidence bundles with access notes and caveats | [source-packets/README.md](source-packets/README.md) |
| Event Timelines | Dated event sequences with sources | [event-timelines/README.md](event-timelines/README.md) |
| Actor Profiles | Standing actor classifications and framing | [actor-profiles/README.md](actor-profiles/README.md) |
| Source Notes | Provenance, treatment, and handling notes | [source-notes/README.md](source-notes/README.md) |
| Coverage Map | High-level corpus coverage overview | [coverage-map.md](coverage-map.md) |

## Usage Rules

- Always prefer the most recent dated product in a series for current judgments.
- Source packets and registers are the authoritative source-family records.
- Trackers and source notes are workflow artifacts; they do not substitute for assessments.
- Explainers provide context and should point to packets, assessments, and registers rather than duplicate them.
- When adding a new collection product, update the relevant sub-README, the [Documentation Index](../index.md), and the [Coverage Map](coverage-map.md) as appropriate.
- Follow the [Product Standard](../standards/product-standard.md), the specific standard for the product type, and the [Assessment Style Guide](../standards/assessment-style-guide.md) (adapted to product class).
- New navigation hubs (this file, standards/README.md, etc.) should be kept in sync with actual products.
- After changes under docs/, always run the build+check (see standards or templates hubs).

## Cross References

- [Documentation Index](../index.md)
- [Standards](../standards/README.md)
- [Source Registers](../source-registers/README.md)
- [Templates](../templates/README.md)
- [Assessments Index](../assessments/README.md)
- [Maps](../maps/README.md)
