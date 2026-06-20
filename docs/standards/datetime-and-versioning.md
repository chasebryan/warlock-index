# Datetime And Versioning Standard

**UNCLASSIFIED//OPEN SOURCE**

**Standard ID:** WI-STD-004

**Prepared UTC:** 2026-06-19T00:00:00Z

**Information cutoff UTC:** 2026-06-19T00:00:00Z

**Source base:** ISO 8601 UTC timestamp convention and WARLOCK-INDEX product
versioning requirements.

**Analytic confidence:** High for internal timestamp and version-control
requirements.

**Topics:** tradecraft; datetime; versioning; filenames
**Source classes:** Internal standard
**Safety boundary:** Timestamp and versioning conventions for documentation
corpus only.

## Timestamp Format

Use ISO 8601 UTC timestamps:

`YYYY-MM-DDTHH:MM:SSZ`

For filenames, use compact UTC:

`YYYY-MM-DDTHHMMZ-short-title.md`

Example:

`2026-06-12T2320Z-strategic-environment-baseline.md`

## Information Cutoff

Every product must state an information cutoff. The cutoff is the latest
timestamp at which sources were considered, not the time the product was
finished.

## Product IDs

Use:

`WI-ASMT-AREA-YEAR-NNNN`

Examples:

- `WI-ASMT-GLOBAL-2026-0001`
- `WI-ASMT-INDOPAC-2026-0001`

Non-assessment products use typed IDs (e.g. WI-EXPLAINER-..., WI-SOURCEPACKET-... ). See the relevant product standard or template.

## Revisions

For minor corrections, update the file and add a short revision note. For major
analytic changes, create a new dated assessment and link the older product as a
previous baseline.

## Cross References

- [Standards hub](README.md)
- [Product Standard](product-standard.md)
- [Assessment Style Guide](assessment-style-guide.md)
