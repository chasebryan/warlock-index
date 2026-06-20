# Templates

**UNCLASSIFIED//OPEN SOURCE**

**Product ID:** WI-DOCS-TEMPLATES-2026-0001

**Prepared UTC:** 2026-06-19T00:00:00Z

**Information cutoff UTC:** 2026-06-19T00:00:00Z

**Source base:** Assessment and explainer templates and related standards.

**Analytic confidence:** High for structure.

**Topics:** templates; onboarding
**Source classes:** Internal documentation
**Safety boundary:** Documentation structure only.

Templates provide the canonical starting structure for new products. Always
begin from the template that matches the product type and then adapt content
while preserving required header fields and sections.

## Current Templates

- [Assessment Template](assessment-template.md)
- [Explainer Template](explainer-template.md)

## Guidance

- Follow the [Product Standard](../standards/product-standard.md).
- Follow the [Assessment Style Guide](../standards/assessment-style-guide.md) or
  [Explainer Standard](../standards/explainer-standard.md).
- Use correct ID format and UTC timestamps.
- State Scope, Exclusions / Boundary, Source base, and Analytic confidence.
- After drafting, run the site build and check to keep generated output in sync:
  node site/build-library.mjs
  node site/check-library.mjs
- Update the relevant collection README and main index when publishing.
- Every product must carry UNCLASSIFIED//OPEN SOURCE, clear boundary language, and traceable sources.

## Cross References

- [Standards](../standards/README.md)
- [Documentation Index](../index.md)
- [Collections](../collections/README.md)

Start new assessments from assessment-template.md and explainers from explainer-template.md. Other products (trackers, packets, notes, matrices) follow patterns in the existing dated files and their collection READMEs.
