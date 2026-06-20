# Structured Metadata And Export Standard

**UNCLASSIFIED//OPEN SOURCE**

**Standard ID:** WI-STD-006

**Prepared UTC:** 2026-06-20T00:00:00Z

**Information cutoff UTC:** 2026-06-20T00:00:00Z

**Source base:** WARLOCK-INDEX product standard, source evaluation standard, generated corpus export requirements, and current documentation structure.

**Analytic confidence:** High for repository metadata behavior and required field definitions.

**Topics:** tradecraft; metadata; export; source routing; audit

**Source classes:** Internal standard; generated corpus metadata

**Safety boundary:** Defines documentation metadata only. Does not create operational, collection, targeting, or technical exploitation requirements.

## Purpose

This standard makes WARLOCK-INDEX products easier to use in analytic systems by giving each product a stable set of machine-readable fields. The static generator now exports the documentation corpus as browser JavaScript, JSON, and CSV.

## Export Locations

- `site/corpus.js` remains the browser and workspace corpus bundle.
- `site/workspace/corpus.js` remains the workspace copy.
- `site/corpus.json` is the machine-readable corpus export.
- `site/workspace/corpus.json` is the workspace-local JSON export.
- `site/corpus-health.json` is the generated corpus-health summary.
- `site/workspace/corpus-health.json` is the workspace-local corpus-health summary.
- `site/corpus.csv` is the tabular export for spreadsheet and data pipeline review.

## Recommended Metadata Fields

Products should include these fields when the information is available:

- `Topics`: Human-readable topical labels that can be more specific than generated topic hubs.
- `Actors`: States, organizations, networks, sectors, or institutions materially covered by the product.
- `Source classes`: Official, allied, vendor, vulnerability database, academic, legal, media, geospatial, maritime, or other source-class labels.
- `Safety boundary`: Short statement of what the product does not provide.
- `Freshness status`: Current, Watch, Stale, Gap, Superseded, or Reference.
- `Last source check UTC`: UTC timestamp for the most recent source sweep.
- `Next refresh UTC`: UTC timestamp or date for the next required review.
- `Caveat tags`: Standard caveat labels from the confidence and caveat taxonomy.
- `Primary sources`: Semicolon-separated source families or URLs.
- `Related products`: Stable product IDs for connected products.

## Generated Fields

The generator also derives:

- `sourceUrls`: HTTP and HTTPS URLs found in the Markdown source.
- `sourceHash`: Short SHA-256 hash of the Markdown source text.
- `metadataCompleteness`: Percentage score for presence of key metadata fields.
- `refreshDue`: Boolean derived from `Next refresh UTC`.
- `daysUntilRefresh`: Days until the next recorded refresh date.
- `sourceHealthStatus`: Derived status for triage: ready, watch, gap, refresh-due, stale, or needs-metadata.
- `sourceHealthFlags`: Searchable flags explaining missing fields, watch/gap status, or refresh due state.
- `topics`, `badges`, and `tags`: Generated routing, display, and search labels.
- `path`: Generated site path for the rendered product.

## Export Rules

1. Do not put classified, leaked, personal, or improperly obtained material into metadata fields.
2. Use source-class labels instead of long prose when possible.
3. Use `Freshness status: Gap` when the product identifies a source requirement but lacks a current capture.
4. Use `Freshness status: Watch` for rapidly changing topics that need repeated source checks.
5. Use `Caveat tags` to make uncertainty searchable across the corpus.
6. Use related product IDs for internal routing and avoid ambiguous prose-only references.
7. Treat generated health fields as workflow aids; they do not measure policy priority, operational value, or source truth.

## Cross References

- [Standards hub](README.md)
- [Product Standard](product-standard.md)
- [Confidence And Caveat Taxonomy](confidence-caveat-taxonomy.md)
