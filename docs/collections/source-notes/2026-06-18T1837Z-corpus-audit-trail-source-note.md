# Corpus Audit Trail Source Note

**UNCLASSIFIED//OPEN SOURCE**

**Source Note ID:** WI-SN-AUDIT-2026-0001

**Prepared UTC:** 2026-06-18T18:37:00Z

**Information cutoff UTC:** 2026-06-18T18:37:00Z

**Source base:** Current corpus generator behavior, product standard, and new metadata/export standard.

**Analytic confidence:** High for repository behavior after local generation.

**Topics:** audit; corpus export; source hash; metadata

**Source classes:** Internal source note; Generated metadata

**Freshness status:** Current

**Last source check UTC:** 2026-06-18T18:37:00Z

**Next refresh UTC:** 2026-06-25T18:37:00Z

**Caveat tags:** archival-reference

**Related products:** WI-STD-006; WI-STD-007

**Safety boundary:** Audit note only. Does not validate truth of external source claims.

## Audit Trail Behavior

The generator adds a `sourceHash` field to each exported corpus record. The hash is a short SHA-256 digest of the Markdown source text and is intended to help identify whether a product changed between generated exports.

## Uses

- Compare two JSON or CSV exports to identify changed records.
- Check whether a rendered product corresponds to the current Markdown source.
- Preserve a light provenance trail for products that are reused in external research workflows.

## Limits

- `sourceHash` is not a cryptographic signature.
- It does not prove source accuracy or external publication authenticity.
- It does not replace product IDs, prepared times, or revision notes.

