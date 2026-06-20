# Confidence And Caveat Taxonomy

**UNCLASSIFIED//OPEN SOURCE**

**Standard ID:** WI-STD-007

**Prepared UTC:** 2026-06-20T00:00:00Z

**Information cutoff UTC:** 2026-06-20T00:00:00Z

**Source base:** WARLOCK-INDEX product standard, source evaluation standard, and current source-sweep practice.

**Analytic confidence:** High for internal taxonomy definitions.

**Topics:** confidence; caveats; source evaluation; analytic tradecraft

**Source classes:** Internal standard; analytic tradecraft

**Safety boundary:** Provides uncertainty labels for open-source analysis only. Does not assign policy priority, collection priority, or operational risk.

## Purpose

This taxonomy gives analysts a compact way to tag uncertainty, source limitations, and refresh needs across all topics. It supplements analytic confidence by making the reason for caution searchable.

## Confidence Levels

- `High`: Core facts are official, directly observable, or corroborated by multiple reliable independent sources.
- `Moderate`: The main judgment is supported, but source recency, access, interpretation, or cross-source consistency leaves meaningful uncertainty.
- `Low`: Evidence is sparse, contested, rapidly changing, or indirect.

## Caveat Tags

- `current-watch`: The topic is changing quickly and requires recurring checks.
- `implementation-gap`: Public statements exist, but implementation evidence is incomplete.
- `source-lag`: Official publication cycles trail events.
- `single-source`: The claim depends on one source family.
- `translation-risk`: Meaning depends on translation, official phrasing, or issuer-language interpretation.
- `commercial-data-limit`: Data comes from commercial feeds with coverage, licensing, or sampling constraints.
- `map-reference-only`: Geographic material is for orientation, not precise targeting.
- `defensive-cyber-only`: Cyber material is limited to defensive source routing and mitigation context.
- `legal-status-uncertain`: Legal instrument, sanctions status, treaty status, or policy standing is unresolved in public sources.
- `media-reporting-unverified`: Media reporting is useful for cueing but awaits official or primary-source corroboration.
- `archival-reference`: Product remains useful historically but is not current without a refresh.

## Usage Rules

1. Apply caveat tags when the limitation changes how the product should be reused.
2. Prefer a specific caveat tag over broad caution language.
3. Pair `current-watch` with a `Next refresh UTC` field.
4. Pair `implementation-gap` with a source requirement or tracker row.
5. Pair `defensive-cyber-only` with an explicit exclusion of exploit steps, targeting, evasion, and vulnerability reproduction.

## Cross References

- [Standards hub](README.md)
- [Product Standard](product-standard.md)
- [Structured Metadata And Export Standard](structured-metadata-and-export-standard.md)

