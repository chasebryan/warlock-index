# Map And Geospatial Reference Source Register

**UNCLASSIFIED//OPEN SOURCE**

**Source Register ID:** WI-SOURCE-REGISTER-MAPGEO-2026-0001

**Prepared UTC:** 2026-06-13T09:33:00Z

**Information cutoff UTC:** 2026-06-13T09:33:00Z

**Purpose:** Define source-routing rules for public map, geographic-name,
topographic, nautical, command-area, and geospatial reference material used
inside Warlock Index.

**Boundary:** This register supports strategic orientation and source
provenance only. It does not create targeting maps, sensitive facility
overlays, infrastructure vulnerability maps, live movement layers,
collection geometry, patrol-pattern analysis, route-selection tools,
interdiction guidance, operational planning, surveillance products, or
investigative direction.

## Framing Rule

Maps are evidence containers, not conclusions. A public map can identify a
publisher's boundary, naming, area-of-responsibility, navigation, or
orientation framing. It does not independently prove intent, capability,
threat status, control, sovereignty, access, vulnerability, or operational
feasibility.

Warlock Index products should keep these evidence types separate:

- Static public orientation maps.
- Official command-area and theater maps.
- Geographic names and boundary-source records.
- Topographic, hydrographic, and nautical chart sources.
- Declassified or historical imagery and map archives.
- Live movement, operational, or tactical geospatial data.
- Strategic analysis supported by non-map evidence.

## Source Precedence

| Reference need | First source | Cross-check source | Required label |
| --- | --- | --- | --- |
| Public U.S. strategic orientation map | NGA Maps for Download | DoD command pages, State maps, CIA legacy maps where appropriate | Strategic orientation only |
| GEOINT product-family routing | NGA Products and Services | Official product owner pages, USGS, NOAA, Library of Congress, National Archives | Source family, not operational authority |
| U.S. topographic context | USGS The National Map | State, local, or tribal authoritative sources where relevant | U.S. topographic reference |
| U.S. nautical chart context | NOAA Office of Coast Survey | NOAA chart fact sheets, U.S. Coast Guard, port or waterway authorities | Navigation-source reference only |
| Geographic names | U.S. Board on Geographic Names and NGA geographic-name tools | USGS GNIS, State, foreign official sources, UN or allied sources | Naming-source basis |
| Combatant command geography | Official combatant command area-of-responsibility pages | DoD posture statements, State country pages, NGA public maps | U.S. command-area framing |
| Historical map or imagery reference | Library of Congress, National Archives, NGA declassified or historical product pages | USGS, NOAA historical products, academic collections | Historical or archival snapshot |
| Foreign or allied map source | Official foreign government, allied defense, national mapping agency, or multilateral source | NGA, State, USGS, NOAA, UN | Issuer perspective and access date |

## Core Source Families

### NGA Maps For Download

- **Source class:** A
- **Publisher:** National Geospatial-Intelligence Agency
- **Accessed UTC:** 2026-06-13T09:33:00Z
- **URL:** https://www.nga.mil/resources/NGA_Maps_for_Download.html
- **Use:** Public-release static maps for broad theater, country, alliance,
  and regional orientation.
- **Reliability note:** Authoritative for NGA's released public map set and
  map titles. Use as orientation and provenance, not as current operational
  mapping, tactical detail, or authority to add sensitive overlays.

### NGA Products And Services

- **Source class:** A
- **Publisher:** National Geospatial-Intelligence Agency
- **Accessed UTC:** 2026-06-13T09:33:00Z
- **URL:** https://www.nga.mil/resources/Products_%26_Services.html
- **Use:** Public routing source for NGA product families including public
  CIA maps, declassified imagery, GPS and WGS84-related products, Map of the
  World, maritime safety products, topographic maps, the U.S. Board on
  Geographic Names, and World Magnetic Model.
- **Reliability note:** Authoritative for public product-family identity.
  Product existence does not imply public access to all underlying data,
  suitability for Warlock Index use, or permission to produce operational
  geospatial products.

### USGS The National Map

- **Source class:** A
- **Publisher:** U.S. Geological Survey
- **Accessed UTC:** 2026-06-13T09:33:00Z
- **URL:** https://www.usgs.gov/programs/national-geospatial-program/national-map
- **Use:** U.S. topographic, elevation, hydrography, geographic-name,
  boundary, land-cover, orthoimagery, US Topo, OnDemand Topo, and historical
  topographic map reference.
- **Reliability note:** Authoritative U.S. public geospatial source for
  national topographic reference. Avoid extracting facility vulnerability,
  infrastructure attack-surface, route-selection, or surveillance products.

### NOAA Office Of Coast Survey

- **Source class:** A
- **Publisher:** National Oceanic and Atmospheric Administration
- **Accessed UTC:** 2026-06-13T09:33:00Z
- **URL:** https://nauticalcharts.noaa.gov/
- **Use:** U.S. nautical chart, electronic navigational chart, chart locator,
  NOAA Custom Chart, navigation update, historical chart, maritime boundary,
  and hydrographic-source routing.
- **Reliability note:** Authoritative public U.S. charting source for
  navigation products. Warlock Index uses it for source provenance and broad
  maritime context, not voyage planning, route recommendation, or live
  movement analysis.

### NOAA Nautical Chart Explainer

- **Source class:** A
- **Publisher:** NOAA National Ocean Service
- **Accessed UTC:** 2026-06-13T09:33:00Z
- **URL:** https://oceanservice.noaa.gov/facts/nautical_chart.html
- **Use:** Plain-language source for what a nautical chart depicts and why it
  matters for safe navigation.
- **Reliability note:** Useful context for chart interpretation. Do not
  convert safety-of-navigation material into Warlock Index route-selection or
  interdiction guidance.

### U.S. Board On Geographic Names

- **Source class:** A
- **Publisher:** U.S. Geological Survey / U.S. Board on Geographic Names
- **Accessed UTC:** 2026-06-13T09:33:00Z
- **URL:** https://www.usgs.gov/us-board-on-geographic-names
- **Use:** U.S. federal geographic-name standardization, naming policy,
  domestic and foreign names source routing, and naming-caveat support.
- **Reliability note:** Authoritative for U.S. federal naming standards and
  policy. Naming standardization should not be treated as sovereignty,
  recognition, legal-status, or conflict-control evidence by itself.

### U.S. Combatant Command Area-Of-Responsibility Pages

- **Source class:** A
- **Publisher:** U.S. combatant commands
- **Accessed UTC:** 2026-06-13T09:33:00Z
- **Representative URLs:**
  - https://www.centcom.mil/AREA-OF-RESPONSIBILITY/
  - https://www.africom.mil/area-of-responsibility
  - https://www.southcom.mil/About/Area-of-Responsibility/
- **Use:** Official public U.S. command-area framing, theater boundaries, and
  high-level regional orientation.
- **Reliability note:** Authoritative for command public framing. Do not
  infer current operations, basing, patrol patterns, force posture, access,
  or operational priorities from AOR maps alone.

## Theater-Lane Routing

| Warlock Index lane | Priority map source families | Current use | Boundary note |
| --- | --- | --- | --- |
| Global strategic operating picture | NGA world maps, BGN, State, UN, USGS/NOAA where relevant | High-level orientation and naming caveats | No operational overlays |
| Europe / Russia / Ukraine | NGA public maps, NATO public maps, State, allied government maps | Theater orientation and alliance geography | No front-line tracking or target mapping |
| Indo-Pacific / Taiwan / first island chain | NGA public maps, DoD command maps, allied government maps, BGN | Regional orientation and boundary/naming caveats | No basing, route, or movement inference |
| Middle East / Red Sea / Hormuz | NGA public maps, CENTCOM AOR pages, NOAA maritime chart families, State | Chokepoint and command-area context | No vessel routing, interdiction, or live maritime layer |
| Africa | AFRICOM AOR pages, NGA public maps, State, UN/AU maps | Theater and subregion orientation | Avoid sensitive facility, route, or conflict-zone tactical detail |
| Homeland / Western Hemisphere | USGS The National Map, NOAA charts, SOUTHCOM/NORTHCOM public pages, State | U.S. and hemisphere orientation | No domestic surveillance or vulnerability mapping |
| Arctic / High North | NGA, NOAA, USGS, Canada, Norway, NATO, Arctic Council sources | Strategic geography and maritime context | No route advisories or infrastructure vulnerability mapping |

## Map Extraction Rules

1. Record publisher, URL, accessed UTC, publication or release date where
   available, map title, map scale or size where relevant, and whether the
   map is static, historical, current, or product-family routing.
2. Identify naming, boundary, recognition, disputed-territory, or policy
   caveats when the map touches contested geography.
3. Treat combatant command maps as U.S. command-area framing, not proof of
   operations, control, basing, or access.
4. Treat NOAA nautical charts and chart tools as navigation-source material,
   not Warlock Index route-selection or operational-planning sources.
5. Treat USGS topographic and built-environment layers as public U.S.
   geospatial reference. Do not convert them into vulnerability maps or
   targetable infrastructure inventories.
6. Use geographic-name sources to preserve source language. Do not silently
   normalize contested names or statuses.
7. Do not combine public maps with live movement, sensitive facility,
   collection, readiness, or exploitation layers inside Warlock Index.

## Prohibited Product Patterns

- Targeting maps, target folders, or target-selection aids.
- Sensitive facility overlays, access-point mapping, or infrastructure
  vulnerability labels.
- Route-selection, interdiction, patrol-pattern, or evasion guidance.
- Live vessel, aircraft, ground-force, or convoy tracking.
- Collection geometry, sensor coverage, watch zones, or surveillance tasking.
- Domestic political, protest, immigration, or community surveillance maps.
- Claims that a public map proves legal sovereignty, military control, threat
  intent, or operational feasibility without separate evidence.

## Minimum Product Fields

When a Warlock Index product uses this register, include:

- Source family.
- Publisher.
- URL.
- Accessed UTC.
- Publication, release, or update date where available.
- Map title or product family.
- Static, historical, current, chart, topographic, command-area, or naming
  source label.
- Reliability note.
- Boundary note for contested geography, navigation material, command-area
  maps, or any geospatial material that could be over-read.

## Information Gaps

- NGA public map titles and file links can change; refresh exact map pages
  before making dated map-specific claims.
- State country and area pages should be refreshed before using them as
  current diplomatic map or country-context sources.
- Many official map products carry policy, naming, boundary, recognition, or
  projection choices. Products should preserve those caveats.
- This register does not replace ODNI, DoD, DIA, Treasury, State, DOJ, CISA,
  FBI, UN, NATO, or allied sources for threat, legal, sanctions, military, or
  operational claims.

## Source List

- National Geospatial-Intelligence Agency, NGA Maps For Download: `https://www.nga.mil/resources/NGA_Maps_for_Download.html`
- National Geospatial-Intelligence Agency, Products And Services: `https://www.nga.mil/resources/Products_%26_Services.html`
- U.S. Geological Survey, The National Map: `https://www.usgs.gov/programs/national-geospatial-program/national-map`
- NOAA Office of Coast Survey: `https://nauticalcharts.noaa.gov/`
- NOAA National Ocean Service, What Is A Nautical Chart?: `https://oceanservice.noaa.gov/facts/nautical_chart.html`
- U.S. Board on Geographic Names: `https://www.usgs.gov/us-board-on-geographic-names`
- U.S. Central Command, Area Of Responsibility: `https://www.centcom.mil/AREA-OF-RESPONSIBILITY/`
- U.S. Africa Command, Area Of Responsibility: `https://www.africom.mil/area-of-responsibility`
- U.S. Southern Command, Area Of Responsibility: `https://www.southcom.mil/About/Area-of-Responsibility/`

## Cross References

- [Theater Map Index](../collections/source-notes/2026-06-13T1733Z-theater-map-index.md)
- [Indo-Pacific And Taiwan Map Reference Source Packet](../collections/source-packets/theater-map-reference/2026-06-13T1810Z-indo-pacific-taiwan-map-reference-source-packet.md)
- [CIA, State, And NGA Foreign Government And Map Reference Packet](../collections/source-packets/official-threat-source-baseline/2026-06-13T0831Z-cia-foreign-government-map-reference-packet.md)
- [Foreign Government Reference Source Register](foreign-government-reference.md)
- [Maritime Chokepoints Source Register](maritime-chokepoints.md)
- [Official U.S. Intelligence And Law Enforcement Source Register](us-intelligence-law-enforcement.md)
- [Official U.S. Sources](official-us.md)
- [Allied And Multilateral Source Register](allied-multilateral.md)
