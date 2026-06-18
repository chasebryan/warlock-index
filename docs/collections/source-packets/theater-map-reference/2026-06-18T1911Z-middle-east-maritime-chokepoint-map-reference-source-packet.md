# Middle East Maritime Chokepoint Map Reference Source Packet

**UNCLASSIFIED//OPEN SOURCE**

**Source Packet ID:** WI-SP-MAPS-ME-MARITIME-2026-0001

**Prepared UTC:** 2026-06-18T19:11:00Z

**Information cutoff UTC:** 2026-06-18T19:11:00Z

**Source base:** WARLOCK-INDEX maps desk, maritime AIS map handling guide, map/geospatial register, maritime chokepoints register, Hormuz source packet, Red Sea products, NGA public map source family, CENTCOM AOR pages, NOAA chart source family, IMO, Suez Canal Authority and other public maritime source lanes, port-authority, shipping, and insurance source families.

**Analytic confidence:** High for source-lane routing and safety boundaries; moderate for individual map currency and commercial-data coverage.

**Topics:** maps; middle east; red sea; strait of hormuz; bab el-mandeb; suez; maritime chokepoints; AIS

**Actors:** CENTCOM; IMO; Iran; Houthis; Egypt; Gulf states; shipping and insurance source families; port authorities

**Source classes:** Official U.S.; Official maritime; Nautical chart; Commercial data; Port authority; Shipping and insurance; Multilateral

**Freshness status:** Watch

**Last source check UTC:** 2026-06-18T19:11:00Z

**Next refresh UTC:** 2026-06-25T19:11:00Z

**Caveat tags:** map-reference-only; commercial-data-limit; current-watch; legal-status-uncertain

**Related products:** WI-MAPS-AIS-2026-0001; WI-SOURCE-REGISTER-MARITIME-CHOKEPOINTS-2026-0001; WI-SOURCEPACKET-HORMUZ-CHOKEPOINT-2026-0001

**Safety boundary:** Strategic orientation and source routing only. Excludes vessel tracking, live AIS layers, route guidance, interdiction support, sanctions targeting, port approach detail, patrol-pattern inference, evasion, blockade mechanics, or operational maritime assessment.

## Bottom Line

Middle East maritime map work should support static chokepoint orientation and source routing, not live maritime analysis. Hormuz, Bab el-Mandeb, the Red Sea, Suez, and Eastern Mediterranean lanes require strong separation between map orientation, nautical chart source provenance, legal/diplomatic source claims, and commercial AIS leads.

## Source Lane Matrix

| Need | First source lane | Cross-check | Product use |
| --- | --- | --- | --- |
| Broad regional orientation | NGA public map source family; CENTCOM AOR | State, allied and regional official sources | Static orientation and command-area framing. |
| Hormuz chokepoint context | Hormuz source packet; NGA/CENTCOM; NOAA chart source family | IMO, port/maritime authorities, shipping/insurance sources | Chokepoint orientation and source routing only. |
| Red Sea / Bab el-Mandeb context | Red Sea products; NGA/CENTCOM; NOAA/IMO source families | Suez Canal Authority, shipping/insurance, official maritime notices | Static maritime context and disruption-source routing. |
| Suez canal context | Suez Canal Authority public source family | IMO, shipping/insurance, market data | Official canal-source context, not route or operational advice. |
| Maritime traffic lead | MarineTraffic/public AIS source family | Official notices, port authorities, IMO, shipping/insurance | Lead source only; no live layer or vessel monitoring. |
| Legal or sanctions context | State, Treasury/OFAC, UN, court or official enforcement sources | Flag-state, port-state, official maritime sources | Legal-source routing only, not map-derived enforcement. |

## Extraction Rules

1. Record map or source title, publisher, URL, accessed UTC, and publication/update date where available.
2. Label maps as static orientation, command-area framing, nautical-source reference, official maritime source, port-authority source, commercial AIS lead, or legal-source companion.
3. For any AIS use, state the cued question and the non-AIS source that corroborates the claim.
4. Do not embed live layers, screenshots that imply live tracking, route lines, vessel trails, or interdiction-relevant labels.
5. Carry forward `commercial-data-limit` for AIS or market-data-derived map context.

## Prohibited Uses

- Vessel monitoring, live ship tracking, route recommendations, or port approach detail.
- Interdiction support, blockade mechanics, evasion guidance, sanctions targeting, or patrol-pattern inference.
- Treating missing AIS as proof of absence.
- Converting nautical charts into WARLOCK-INDEX voyage planning.
- Mapping critical infrastructure vulnerabilities, cables, ports, pipelines, military facilities, or chokepoint closure mechanics.

## Information Gaps

- Product-level dated capture is still needed for Suez Canal Authority, IMO, regional port authorities, and official maritime notices.
- Hormuz and Red Sea products need recurring checks when crisis reporting changes quickly.
- Future products should separate legal status, maritime safety, shipping economics, and military posture rather than blending them into one map claim.
