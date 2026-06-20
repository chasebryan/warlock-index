# Map Source Caveat Playbook

**UNCLASSIFIED//OPEN SOURCE**

**Map Resource ID:** WI-MAPS-CAVEATS-2026-0001

**Prepared UTC:** 2026-06-18T19:07:00Z

**Information cutoff UTC:** 2026-06-18T19:07:00Z

**Source base:** Map/geospatial register, confidence and caveat taxonomy, theater map index, and current map products.

**Analytic confidence:** High for internal caveat definitions.

**Topics:** maps; caveats; source evaluation; disputed geography; map reference

**Source classes:** Internal guide; Official U.S.; Allied official; National mapping agency; Commercial data; Archival map

**Freshness status:** Current

**Last source check UTC:** 2026-06-19T00:00:00Z

**Next refresh UTC:** 2026-06-26T00:00:00Z

**Caveat tags:** map-reference-only; legal-status-uncertain; commercial-data-limit; translation-risk; archival-reference

**Related products:** WI-STD-007; WI-SOURCE-REGISTER-MAPGEO-2026-0001

**Safety boundary:** Caveat guide only. Does not provide legal advice, operational guidance, targeting, live tracking, or vulnerability analysis.

## Caveat Library

| Caveat | Use when | Required language |
| --- | --- | --- |
| `map-reference-only` | A map provides orientation or source provenance. | Map use is for orientation and source routing only. |
| `legal-status-uncertain` | Boundaries, claims, sanctions, recognition, or treaty status are unresolved or contested. | This map is not legal advice and does not settle sovereignty, control, or rights. |
| `commercial-data-limit` | Commercial map, AIS, shipping, satellite, or market data is used. | Coverage, latency, licensing, filtering, and sampling may limit the data. |
| `translation-risk` | A national or foreign-language map label matters. | Preserve issuer-language and do not silently normalize contested names. |
| `source-lag` | Official map publication may trail events. | The map may lag current facts on the ground or at sea. |
| `archival-reference` | Historical maps or older static products are used. | Treat as a dated snapshot, not a current source. |
| `current-watch` | The map lane changes frequently. | Recheck before claim-level reuse. |

## Claim Discipline

| Do not write | Safer wording |
| --- | --- |
| The map proves control of the area. | The map shows the publisher's public depiction or framing as of the cited date. |
| The route is available. | The source supports broad geographic orientation; route availability requires separate official and current evidence. |
| No vessel is present because AIS is absent. | Public AIS did not provide a sufficient source basis for that claim. |
| The base is vulnerable because it appears on a map. | WARLOCK-INDEX does not assess facility vulnerability from public maps. |
| The border is settled because this map shows it. | The map is one source's depiction and must be paired with legal and diplomatic sources. |
| The AOR map shows operational priorities. | The AOR map shows public command-area framing only. |

## Required Pairings

- Map plus legal-source record for sovereignty, maritime claim, arbitration, treaty, or boundary issues.
- Map plus official statement for command-area or alliance geography claims.
- Map plus dated source packet for theater orientation in contested areas.
- AIS lead plus official maritime, port, IMO, or shipping source before claim-level reuse.
- Historical map plus date, publisher, and archival context.

## Cross References

- [Maps hub](README.md)
- [Documentation Index](../index.md)
- [Source Registers](../source-registers/README.md)
- [Collections](../collections/README.md)

