# Product Standard

**UNCLASSIFIED//OPEN SOURCE**

**Standard ID:** WI-STD-001

**Prepared UTC:** 2026-06-19T00:00:00Z

**Information cutoff UTC:** 2026-06-19T00:00:00Z

**Source base:** WARLOCK-INDEX operating boundary, source evaluation
standard, datetime/versioning standard, assessment style guide, structured
metadata standard, and initial corpus product requirements.

**Analytic confidence:** High for internal repository product requirements
and safety boundaries.

**Topics:** tradecraft; product requirements; standards
**Source classes:** Internal standard
**Safety boundary:** Defines required structure and prohibited content for
open-source research products only. Does not authorize operational, targeting,
or policy content.

## Purpose

This standard defines the minimum structure for WARLOCK-INDEX analytical
products. It is designed to keep the repository useful to defense researchers
and decision-support readers while preventing drift into unsupported claims,
policy advocacy, or operational instruction.

## Required Header Fields

Assessments use the Classification-style header documented in the assessment
style guide. Other products use typed-ID headers (Explainer ID, Source Packet
ID, etc.). See assessment-style-guide.md and the specific standard for the
product type.

Every assessment must include:

- `Classification`: Always `UNCLASSIFIED//OPEN SOURCE` unless a future approved
  public-release label is more specific.
- `Handling`: Public open-source research.
- `Product ID`: Stable identifier using the format `WI-ASMT-AREA-YEAR-NNNN`.
- `Prepared UTC`: ISO 8601 timestamp.
- `Information cutoff UTC`: ISO 8601 timestamp for the latest information
  reflected in the product.
- `Scope`: What the product covers.
- `Exclusions`: What it deliberately does not cover.
- `Source base`: Short source summary with full source list at the end.
- `Analytic confidence`: High, moderate, or low.

Non-assessment products document equivalent fields using their typed ID format
and must still carry Prepared UTC, Information cutoff UTC, Source base, and
Analytic confidence.

## Recommended Machine-Readable Fields

See the Structured Metadata And Export Standard for the current recommended and
generated fields. The list below is retained for continuity:

- `Topics`: Human-readable topical labels for search and crosswalks.
- `Actors`: States, agencies, organizations, sectors, or institutions covered.
- `Source classes`: Official, allied, vendor, vulnerability database,
  academic, legal, media, geospatial, maritime, or other source classes.
- `Safety boundary`: Short statement of what the product deliberately excludes.
- `Freshness status`: Current, Watch, Gap, Reference, Superseded, or Stale.
- `Last source check UTC`: Most recent source-sweep timestamp.
- `Next refresh UTC`: Next required review timestamp.
- `Caveat tags`: Standard caveat labels.
- `Primary sources`: Semicolon-separated source families or URLs.
- `Related products`: Product IDs for connected products.

## Analytic Confidence

- `High`: Multiple reliable sources converge; core facts are official,
  directly observable, or otherwise well corroborated.
- `Moderate`: Main judgment is supported, but source recency, access, or
  interpretation leaves meaningful uncertainty.
- `Low`: Sparse, contested, rapidly changing, or indirectly sourced evidence.

Confidence is not a measure of importance. It is a measure of evidentiary
strength, source quality, and analytic stability.

## Estimative Language

Use consistent probability language:

- `Almost certainly`: very high likelihood.
- `Likely`: strong likelihood.
- `Probably`: more likely than not.
- `May` or `could`: plausible but uncertain.
- `Unclear`: evidence is insufficient or contradictory.

Avoid false precision. Do not assign numeric probabilities unless the source
itself provides a defensible basis.

## Required Assessment Sections

Assessment products should normally include:

- Bottom line.
- Key judgments.
- Scope and information cutoff.
- Strategic context.
- Evidence and analysis.
- Indicators to monitor.
- Information gaps.
- Source base.

## Prohibited Content

WARLOCK-INDEX products must not include:

- Recommendations for U.S. or allied action.
- Target packages, target prioritization, or target selection.
- Weapons employment procedures.
- Tactical instructions for military, cyber, intelligence, or covert activity.
- Exploit steps, evasion methods, or instructions to bypass security controls.
- Classified, leaked, personal, or otherwise improperly obtained information.
- Unsupported claims presented as fact.

## Revision Practice

Do not silently overwrite major judgments. If a product changes materially,
create a new dated product or add a clearly labeled revision note explaining
what changed, why it changed, and what source base caused the change.

## Cross References

- [Standards hub](README.md)
- [Assessment Style Guide](assessment-style-guide.md)
- [Datetime and Versioning Standard](datetime-and-versioning.md)
- [Source Evaluation Standard](source-evaluation.md)
- [Structured Metadata And Export Standard](structured-metadata-and-export-standard.md)
- [Explainer Standard](explainer-standard.md)
- [Confidence And Caveat Taxonomy](confidence-caveat-taxonomy.md)
- [Templates](../templates/README.md)

## Minimal Header Example (Assessment)

```
**Classification:** UNCLASSIFIED//OPEN SOURCE
**Handling:** Public open-source research
**Product ID:** WI-ASMT-GLOBAL-2026-0002
**Prepared UTC:** 2026-06-13T00:49:30Z
**Information cutoff UTC:** 2026-06-13T00:49:30Z
**Scope:** ...
**Exclusions:** ...
**Source base:** ...
**Analytic confidence:** ...
```
