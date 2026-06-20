# Maritime AIS Map Handling

**UNCLASSIFIED//OPEN SOURCE**

**Map Resource ID:** WI-MAPS-AIS-2026-0001

**Prepared UTC:** 2026-06-18T19:08:00Z

**Information cutoff UTC:** 2026-06-18T19:08:00Z

**Source base:** Map/geospatial register, maritime chokepoints register, MarineTraffic public AIS source family, NOAA chart source family, IMO, port-authority, shipping, and insurance source lanes.

**Analytic confidence:** High for handling boundaries; moderate for source availability because public AIS services vary by access, latency, and licensing.

**Topics:** maritime; AIS; maps; MarineTraffic; chokepoints; commercial data

**Source classes:** Commercial data; Nautical chart; Official maritime; Port authority; Shipping and insurance

**Freshness status:** Watch

**Last source check UTC:** 2026-06-19T00:00:00Z

**Next refresh UTC:** 2026-06-26T00:00:00Z

**Caveat tags:** commercial-data-limit; map-reference-only; current-watch

**Related products:** WI-SOURCE-REGISTER-MAPGEO-2026-0001; WI-SOURCE-REGISTER-MARITIME-CHOKEPOINTS-2026-0001

**Safety boundary:** Source-discovery handling only. Excludes live vessel tracking, vessel monitoring, interdiction support, route guidance, patrol-pattern inference, sanctions enforcement targeting, or AIS-only claims.

## Bottom Line

MarineTraffic and similar public AIS tools can help discover a maritime question, but they should not become a WARLOCK-INDEX map layer or operational product. Use AIS sources to cue follow-on research into official maritime notices, port authorities, NOAA chart families, IMO records, shipping/insurance reporting, and dated source packets.

## Allowed Uses

- Broad source-discovery lead for chokepoint, port, or congestion reporting.
- Vessel identity cross-check when already present in public reporting.
- Context for why a maritime source packet needs official follow-up.
- Evidence of commercial-data availability or limitation, not operational truth.

## Prohibited Uses

- Embedding live AIS maps or live vessel layers.
- Monitoring an individual vessel or fleet.
- Inferring patrol patterns, evasion, blockade mechanics, route selection, or interdiction points.
- Treating AIS gaps as proof of absence.
- Publishing route guidance, port approach detail, or enforcement recommendations.
- Supporting sanctions targeting, maritime interdiction, or tactical assessment.

## Corroboration Ladder

| Claim type | AIS role | Required follow-up |
| --- | --- | --- |
| Chokepoint traffic disruption | Lead only | Official maritime notice, port authority, shipping/insurance reporting, or market data. |
| Port congestion | Lead only | Port authority, terminal operator public notice, shipping/insurance source, local official release. |
| Vessel identity in public reporting | Cross-check only | IMO/public registry, owner/operator source, official statement, or reputable maritime reporting. |
| Maritime safety issue | Context only | Coast guard, hydrographic office, maritime safety agency, or official notice. |
| Sanctions or interdiction issue | Not sufficient | Treasury/OFAC, UN, court, flag-state, or official enforcement source. |

## Product Template

When AIS is used as a lead source, include:

- Source family: `MarineTraffic / public AIS source family`.
- Accessed UTC.
- Whether access was restricted, delayed, filtered, or incomplete.
- What question the AIS source cued.
- Which official or non-AIS sources corroborated the claim.
- Caveat tags: `commercial-data-limit`, `map-reference-only`, and `current-watch`.
- Safety boundary: no live tracking, no route guidance, no vessel monitoring, no interdiction support.

## Cross References

- [Maps hub](README.md)
- [Documentation Index](../index.md)
- [Maritime Chokepoints Source Register](../source-registers/maritime-chokepoints.md)
- [Collections](../collections/README.md)

