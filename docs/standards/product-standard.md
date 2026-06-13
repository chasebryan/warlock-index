# Product Standard

**UNCLASSIFIED//OPEN SOURCE**

**Standard ID:** WI-STD-001

**Prepared UTC:** 2026-06-12T23:20:35Z

## Purpose

This standard defines the minimum structure for WARLOCK-INDEX analytical
products. It is designed to keep the repository useful to defense researchers
and decision-support readers while preventing drift into unsupported claims,
policy advocacy, or operational instruction.

## Required Header Fields

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

