# Explainer Standard

**UNCLASSIFIED//OPEN SOURCE**

**Standard ID:** WI-STD-005

**Prepared UTC:** 2026-06-19T00:00:00Z

**Information cutoff UTC:** 2026-06-19T00:00:00Z

**Purpose:** Define how WARLOCK-INDEX explanatory documentation should teach a
topic without becoming a policy recommendation, operational guide, or source
packet duplicate.

**Analytic confidence:** High for internal product requirements and corpus
structure.

**Topics:** tradecraft; explainers; documentation products
**Source classes:** Internal standard
**Safety boundary:** Explainer structure and boundaries for reader-facing
explanation only.

## Bottom Line

Explainers are reader-facing documentation products. They should answer the
basic question a careful reader brings to the corpus: what is this topic, why
does it matter, how does the system work, what claims are strong or weak, and
what should be watched next?

Source packets remain evidence maps. Trackers remain collection queues.
Assessments remain dated analytic products. Explainers sit between those
products and make the corpus legible.

## Required Sections

Every explainer should include:

- **Bottom Line:** The shortest accurate explanation of the topic.
- **Why It Matters:** Strategic relevance without policy recommendations.
- **How The System Works:** The main moving parts and relationships.
- **Key Dynamics:** The recurring forces that shape the issue.
- **Evidence And Source Caveats:** How to read sources without overclaiming.
- **Common Misreadings:** Mistakes the corpus should help readers avoid.
- **What To Watch:** Public indicators that change understanding.
- **Boundaries:** What the explainer does not provide.
- **Cross References:** Source packets, assessments, trackers, matrices, and
  registers that support the explainer.

## Writing Rules

- Explain before routing. A reader should learn the subject before being sent
  to source packets.
- Keep source-family claims separate from evidence claims. A source route is
  not proof of implementation.
- Prefer plain language over bureaucratic labels unless the label is necessary.
- Define terms the first time they are used.
- Use examples that clarify relationships, not examples that become tactical
  instruction.
- Do not write advice to governments, militaries, investors, companies, or
  operators.
- Do not provide target selection, facility vulnerability, route guidance,
  weapons employment, cyber exploitation, evasion, or procurement guidance.
- End with cross references so the reader can move from explanation to
  evidence.

## Minimum Quality Gate

An explainer is not complete until it:

- Has a product ID, prepared timestamp, cutoff timestamp, source base, and
  analytic confidence statement.
- States its boundary explicitly.
- Provides enough context for a non-specialist reader to understand the topic.
- Separates strong public evidence from uncertain inference.
- Links back to at least one source packet or source register.
- Links sideways to any relevant tracker, matrix, actor profile, or assessment.

## Minimal Header Example

```
**UNCLASSIFIED//OPEN SOURCE**
**Explainer ID:** WI-EXPLAINER-DIB-2026-0001
**Prepared UTC:** 2026-06-18T08:42:00Z
**Information cutoff UTC:** 2026-06-18T08:42:00Z
**Source base:** ...
**Analytic confidence:** ...
**Boundary:** ...
```

## Cross References

- [Standards hub](README.md)
- [Product Standard](product-standard.md)
- [Assessment Style Guide](assessment-style-guide.md)
- [Templates](../templates/README.md)
