# Theater Map Dashboard

**UNCLASSIFIED//OPEN SOURCE**

**Map Resource ID:** WI-MAPS-DASHBOARD-2026-0001

**Prepared UTC:** 2026-06-18T19:06:00Z

**Information cutoff UTC:** 2026-06-18T19:06:00Z

**Source base:** Theater map index, map/geospatial register, current source packets, and public map lanes listed in the maps directory.

**Analytic confidence:** Moderate. The dashboard is complete enough for routing but individual theater map anchors require dated refresh before claim-level use.

**Topics:** maps; theater dashboard; source routing; map lanes

**Source classes:** Official U.S.; Allied official; National mapping agency; Multilateral; Commercial data; Research; Archival map

**Freshness status:** Watch

**Last source check UTC:** 2026-06-18T19:06:00Z

**Next refresh UTC:** 2026-06-25T19:06:00Z

**Caveat tags:** map-reference-only; current-watch; source-lag

**Related products:** WI-MAPINDEX-THEATER-2026-0001; WI-SOURCE-REGISTER-MAPGEO-2026-0001

**Safety boundary:** Dashboard for source routing only. Excludes operational overlays, live movement tracking, targeting, route planning, or vulnerability mapping.

## Dashboard

| Lane | Primary map source | Secondary source | Active products | Refresh need |
| --- | --- | --- | --- | --- |
| Global | NGA public world maps; BGN | State, UN, Library of Congress | Theater Map Index; map register | Add product-level dated capture for frequently cited NGA maps. |
| Indo-Pacific / Taiwan | NGA Taiwan map; USINDOPACOM AOR | Taiwan official source lanes, BGN, allied maps | Indo-Pacific and Taiwan map packet | Refresh official Taiwan and allied map-source links. |
| South China Sea / Philippines | NGA; NAMRIA; USINDOPACOM | PCA, State Limits in the Seas, Philippine issuer sources | Philippines and South China Sea map packet; SCS legal-source packet | Preserve issuer-language and legal-source separation. |
| Europe / NATO / Ukraine | NGA NATO and Ukraine maps; NATO on the Map; EUCOM AOR | Allied national map sources, State, UN | Europe, NATO, and Ukraine map packet | Maintain active-war caveats; no front-line or route products. |
| Middle East / Hormuz / Red Sea | NGA regional maps; CENTCOM AOR; NOAA chart source family | IMO, canal authorities, port authorities, maritime sources | Hormuz packet; Red Sea products | Expand static chokepoint orientation without live maritime layers. |
| Africa | AFRICOM AOR; NGA public maps | AU, UN, State, national mapping agencies | Africa assessment and explainer | Add Africa-specific map packet when source volume warrants. |
| Arctic / High North | NGA, NOAA, USGS, Canadian and Nordic source lanes | Arctic Council, NATO, national mapping agencies | Arctic source packets and assessment | Add Arctic map packet with ice, infrastructure, and route caveats. |
| Homeland / Western Hemisphere | USGS The National Map; NOAA; SOUTHCOM/NORTHCOM public pages | State, BGN, local official sources | Homeland assessment; map register | Keep domestic surveillance and vulnerability restrictions explicit. |
| Maritime traffic awareness | MarineTraffic public AIS as lead only | NOAA, IMO, port authorities, shipping/insurance sources | Maritime chokepoints; Hormuz; map register | Treat as commercial lead source; no live layer or vessel tracking. |
| Space / orbital reference | Space-Track, CelesTrak, NASA/NOAA space weather, research sources | USSF, USSPACECOM, SWF, CSIS | Cyber/space refresh queue | Add a dedicated space map/reference packet. |

## Work Queue

| Priority | Product to add | Reason |
| --- | --- | --- |
| 1 | Arctic and High North map reference packet | Arctic map use cuts across maritime, infrastructure, NORAD, NATO, and climate/source caveats. |
| 1 | Middle East maritime chokepoint map packet | Hormuz and Red Sea products need a non-live orientation packet with strong AIS and route boundaries. |
| 2 | Africa map reference packet | Africa lane needs command-area, UN/AU, country, and subregion routing in one safe place. |
| 2 | Space and orbital reference packet | Space records need public catalog, space weather, and counterspace research caveats. |
| 3 | Homeland geospatial reference note | USGS/NOAA/CBP/Coast Guard lanes need explicit domestic non-surveillance boundaries. |

## Review Rule

If a map lane is used in an assessment, source packet, or tracker, carry forward its caveat tag: `map-reference-only`, `commercial-data-limit`, `source-lag`, or `current-watch`.

