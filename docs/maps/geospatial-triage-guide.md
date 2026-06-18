# Geospatial Triage Guide

**UNCLASSIFIED//OPEN SOURCE**

**Map Resource ID:** WI-MAPS-TRIAGE-2026-0001

**Prepared UTC:** 2026-06-18T19:05:00Z

**Information cutoff UTC:** 2026-06-18T19:05:00Z

**Source base:** WARLOCK-INDEX map/geospatial register, theater map index, NGA public map source family, USGS, NOAA, BGN, combatant-command AOR pages, NATO public map references, national mapping agencies, and maritime source lanes.

**Analytic confidence:** High for internal triage rules; moderate for individual map currency pending dated source refresh.

**Topics:** maps; geospatial; triage; source routing; theater orientation

**Source classes:** Official U.S.; Allied official; National mapping agency; Nautical chart; Geographic names; Commercial data; Archival map

**Freshness status:** Current

**Last source check UTC:** 2026-06-18T19:05:00Z

**Next refresh UTC:** 2026-06-25T19:05:00Z

**Caveat tags:** map-reference-only; commercial-data-limit; source-lag

**Related products:** WI-MAPS-RESOURCE-DIRECTORY-2026-0001; WI-SOURCE-REGISTER-MAPGEO-2026-0001; WI-MAPINDEX-THEATER-2026-0001

**Safety boundary:** Strategic orientation and source triage only. Excludes targeting, live tracking, route planning, collection geometry, sensitive facility overlays, and infrastructure vulnerability mapping.

## Purpose

Use this guide when a product needs a map source but the right map lane is not obvious. The goal is to choose the least risky public source family that answers the orientation question without drifting into operational use.

## Triage Questions

| Question | Preferred source lane | Output label |
| --- | --- | --- |
| Where is the theater or country in broad context? | NGA public maps, CIA legacy maps where already source-classed | Static orientation map |
| What does a U.S. command include in its public theater framing? | Combatant-command AOR pages | Command-area framing |
| What is the U.S. federal name for a place? | BGN, GNIS, NGA geographic-name tools | Naming-source basis |
| What is the official U.S. topographic source for domestic geography? | USGS The National Map | U.S. topographic reference |
| What is the public U.S. nautical chart source family? | NOAA Office of Coast Survey | Navigation-source reference only |
| What does an ally or partner call a feature? | National mapping agency, foreign ministry, official gazette | Issuer perspective |
| What is the alliance geography reference? | NATO on the Map, NATO member-country pages | Alliance map reference |
| Is a maritime traffic claim worth following up? | MarineTraffic or other public AIS source as lead only | Commercial AIS source-discovery lead |
| Is a historic claim map-dependent? | Library of Congress, National Archives, historical map collections | Historical or archival map |

## Decision Rule

1. Start with the source question, not the map image.
2. Use official static sources when the need is orientation.
3. Use issuer sources when the need is naming, claim language, or public position.
4. Use nautical and AIS sources only as provenance or discovery aids.
5. Pair every map-dependent claim with non-map evidence before reuse.
6. Do not combine layers into a new product if the combination would create tactical, targeting, surveillance, or vulnerability value.

## Minimum Citation Block

Every map-dependent product should preserve:

- Publisher.
- Map or product title.
- URL.
- Accessed UTC.
- Publication, release, or update date when available.
- Map type: static, command-area, topographic, nautical, naming-source, issuer-perspective, archival, commercial-data lead, or interactive reference.
- Boundary or naming caveat.
- Product safety boundary.

## Common Failure Modes

- Treating a map as evidence of control or sovereignty.
- Treating a command-area map as evidence of force posture.
- Treating a nautical chart as a route recommendation.
- Treating AIS visibility as proof that a vessel is or is not present.
- Combining public layers into a sensitive facility, logistics, route, or vulnerability product.
- Flattening disputed names into one normalized label without issuer caveats.

