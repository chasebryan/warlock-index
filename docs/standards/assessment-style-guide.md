# Assessment Style Guide

**UNCLASSIFIED//OPEN SOURCE**

**Standard ID:** WI-STD-003

**Prepared UTC:** 2026-06-19T00:00:00Z

**Information cutoff UTC:** 2026-06-19T00:00:00Z

**Source base:** WARLOCK-INDEX product standard, source evaluation standard,
datetime and versioning standard, structured metadata standard, explainer
standard, and accumulated practice across the assessment corpus.

**Analytic confidence:** High for internal style guidance and repository
writing requirements.

**Topics:** tradecraft; style; writing standards; assessments
**Source classes:** Internal standard; analytic tradecraft
**Safety boundary:** Style and voice guidance only. Does not authorize policy
recommendations, operational detail, targeting, or any prohibited content.

## Voice

Write in clear, disciplined prose. The tone should be sober, direct, and human:
more like a serious defense assessment than a generic report.

Use active sentences where possible. Avoid slogans, hype, filler, and theatrical
language. Explain why a fact matters, but do not drift into policy advice.

## Structure

Lead with the bottom line. Then present key judgments, evidence, analysis,
indicators, and source base.

Separate:

- What is known.
- What is assessed.
- What is uncertain.
- What would change the assessment.

## No Recommendations

Do not write "the United States should" or equivalent prescriptive language in
assessment products. Preferred alternatives:

- "Decision relevance:"
- "Strategic significance:"
- "Implication for U.S. interests:"
- "Indicator to monitor:"
- "Information gap:"

## Treatment Of Adversaries

Use precise actor names. Avoid caricature. Identify stated objectives,
capabilities, constraints, and behavior. Strategic clarity is more useful than
emotional language.

## Dates

Use UTC timestamps for product metadata. Use absolute dates in the body when
describing events. Avoid unsupported phrases such as "recently" unless the date
is also provided.

Filename format: `YYYY-MM-DDTHHMMZ-short-descriptive-title.md`

## Header Fields (Assessments)

Assessments use this header style:

```
**Classification:** UNCLASSIFIED//OPEN SOURCE
**Handling:** Public open-source research
**Product ID:** WI-ASMT-AREA-YEAR-NNNN
**Prepared UTC:** YYYY-MM-DDTHH:MM:SSZ
**Information cutoff UTC:** YYYY-MM-DDTHH:MM:SSZ
**Scope:** ...
**Exclusions:** ...
**Source base:** ...
**Analytic confidence:** ...
```

Other product types (explainers, source packets, trackers, source notes, actor
profiles, maps) use a bare classification line followed by a typed ID:

```
**UNCLASSIFIED//OPEN SOURCE**
**Explainer ID:** WI-EXPLAINER-...
**Prepared UTC:** ...
```

See product-standard.md and the relevant product-type standard for exact
requirements. Always include Prepared UTC and Information cutoff UTC.

## Boundaries And Safety Language

Every product must state its boundary explicitly. Use the language in the
relevant template and product standard.

Common required exclusions:
- No recommendations for government, military, or intelligence action.
- No target selection, weapons employment, or tactical procedures.
- No exploit steps, evasion methods, or cyber attack instructions.
- No facility vulnerability mapping or operational planning support.

State the boundary early (often in the header block and again in a dedicated
section or the Bottom Line area).

## Source Attribution In Text

- Cite by publisher, document title or series, and date.
- Distinguish official statements from analysis.
- Use short quotes when wording is analytically important; otherwise summarize.
- Record full source details in the Source Base section and in the linked source
  packet when one exists.

## Estimative Language

Use consistent probability language (see also product-standard.md):

- `Almost certainly`: very high likelihood.
- `Likely`: strong likelihood.
- `Probably`: more likely than not.
- `May` or `could`: plausible but uncertain.
- `Unclear`: evidence is insufficient or contradictory.

Avoid false precision. Do not assign numeric probabilities unless the source
itself provides a defensible basis.

## Revision Practice

Do not silently overwrite major judgments. For material changes create a new
dated product and link the prior version. For minor corrections, update in
place and add a short revision note at the end or in a dedicated section.

See datetime-and-versioning.md and product-standard.md for more detail.

Use the [Standards hub](README.md), [Collections hub](../collections/README.md), and [Documentation Index](../index.md) for navigation and related material.

## Cross References

- [Standards hub](README.md)
- [Product Standard](product-standard.md)
- [Explainer Standard](explainer-standard.md)
- [Templates](../templates/README.md)
