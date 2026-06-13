# Legacy Factbook Replacement Note

**UNCLASSIFIED//OPEN SOURCE**

**Source Note ID:** WI-SOURCE-NOTE-FACTBOOK-2026-0001

**Prepared UTC:** 2026-06-13T09:38:00Z

**Information cutoff UTC:** 2026-06-13T09:38:00Z

**Purpose:** Define replacement-source routing for country, government,
geographic, demographic, economic, and policy-reference fields that older
Warlock-Index products might otherwise have sourced to the CIA World
Factbook.

**Boundary:** This note supports source hygiene and strategic reference only.
It does not create country threat rankings, personal dossiers, targeting
packages, sanctions-evasion guidance, investment advice, migration guidance,
operational planning, route selection, infrastructure vulnerability analysis,
or domestic political profiling.

## Bottom Line

CIA announced on February 4, 2026, that The World Factbook had sunset. Warlock-Index should treat the Factbook as a legacy reference after that date. It can
support historical context where a product clearly marks the archival cutoff,
but it should not carry current country facts.

The replacement pattern is field-specific. No single source replaces the
Factbook. Current leadership should route to CIA World Leaders. Diplomatic and
bilateral framing should route to State Department country and area sources
when accessible. Economic and demographic indicators should route to current
statistical publishers such as the World Bank, IMF, UN, and national
statistical authorities. Maps, geography, and naming should route to the
Warlock-Index map/geospatial register. Congressional and oversight context
should route to CRS and GAO where those products directly address the country
or issue.

## Replacement Matrix

| Former Factbook need | Replacement source family | Required label | Boundary |
| --- | --- | --- | --- |
| Current leadership and cabinet | CIA World Leaders; official foreign government pages | Current leadership reference, access date | No personal dossiers, targeting, or inferred intent |
| Historical leadership snapshot | CIA World Leaders historical data; archived official sources | Snapshot date | Do not use historical snapshots for current claims |
| Diplomatic relationship with the United States | State country and area pages; embassy pages; State releases | U.S. diplomatic perspective | Verify exact URL and access date before current claims |
| Government structure and official statements | Official foreign government pages; parliaments; ministries; embassies | Issuer perspective | Do not treat official claims as independent verification |
| Country geography and maps | Map/geospatial reference register: NGA, USGS, NOAA, BGN, DoD/State maps | Strategic orientation only | No targeting maps, sensitive overlays, or route selection |
| Geographic names and disputed names | U.S. Board on Geographic Names; NGA geographic-name tools; State; UN or allied sources | Naming-source basis | Naming does not independently prove sovereignty or control |
| Population and demographic indicators | World Bank World Development Indicators; UNdata; UN Population Division; national statistical offices | Statistical-source definition and year | Note estimates, revisions, coverage limits, and missing data |
| GDP, inflation, fiscal, and macroeconomic indicators | IMF Data Portal and WEO databases; World Bank WDI; national statistical offices; central banks | Dataset, unit, vintage, and year | No investment advice or market calls |
| Trade, development, infrastructure, and social indicators | World Bank WDI; UNdata; national statistical offices; sector agencies | Indicator definition and reporting year | Do not collapse indicators into threat judgments |
| U.S. policy, congressional, or oversight context | CRS products; GAO reports and testimonies; Federal Register where relevant | U.S. policy or oversight perspective | Not neutral country data; preserve scope and publication date |
| Threat, sanctions, terrorism, cyber, or military claims | ODNI, DoD, DIA, State, Treasury, DOJ, CISA, FBI, UN, NATO, allied sources | Assessment, legal/status, or advisory evidence | Factbook replacement note does not authorize threat labels |

## Use Rules

1. Do not use the CIA World Factbook for current country facts after the
   February 2026 sunset unless the product explicitly labels the material as
   archival and refreshes current claims elsewhere.
2. Record the field being replaced before choosing a source family:
   leadership, diplomatic context, government statement, geographic name,
   map, demographic statistic, economic indicator, military/security claim,
   legal status, or policy/oversight context.
3. Preserve dataset definitions, units, vintages, and reporting years for
   statistical sources. A country statistic without its source definition is
   not a usable Warlock-Index claim.
4. Treat State country pages as required diplomatic-source routing, but
   verify exact URLs during each dated product because the current access
   check returned a public technical-difficulties/forbidden response.
5. Treat official foreign-government pages as issuer perspective. Do not
   launder propaganda, wartime claims, legal assertions, or diplomatic
   messaging into independent assessment.
6. Do not use map or geographic sources for sensitive facility overlays,
   vulnerability mapping, operational movement, live tracking, interdiction,
   collection geometry, or route-selection products.
7. Use CRS and GAO for U.S. congressional research or oversight framing, not
   as a universal substitute for statistical datasets or official foreign
   government records.

## Current Access Ledger

| Source family | Access status | Warlock-Index role | Note |
| --- | --- | --- | --- |
| CIA World Factbook farewell story | Verified 2026-06-13 | Legacy-status control | CIA says the Factbook has sunset |
| CIA World Leaders | Verified 2026-06-13 | Current leadership and officeholder reference | CIA states the online directory is updated weekly |
| State Countries And Areas | Access check returned technical-difficulties/forbidden response 2026-06-13 | U.S. diplomatic country-source family | Manual refresh required before current-use claims |
| World Bank World Development Indicators | Verified 2026-06-13 | Development, demographic, economic, and social indicators | Capture indicator definition, country, unit, and year |
| IMF Data Portal | Verified 2026-06-13 | Macroeconomic and financial data, WEO and related datasets | IMF notes the current portal is `data.imf.org` |
| UNdata | Verified 2026-06-13 | UN statistical datasets and datamarts | Use dataset-specific definitions and update dates |
| CRS products | Verified 2026-06-13 | Congressional research context | Preserve report date, scope, and U.S. policy perspective |
| GAO reports and testimonies | Verified 2026-06-13 | U.S. oversight and audit context | Preserve report scope and agency focus |

## Minimum Product Fields

When a Warlock-Index product replaces a Factbook-style claim, include:

- Former field type, if relevant.
- Replacement source family.
- Publisher.
- URL.
- Accessed UTC.
- Publication, update, dataset, vintage, or reporting year where available.
- Unit and definition for statistical indicators.
- Perspective label: directory, diplomatic, issuer, statistical, map,
  assessment, legal/status, congressional research, or oversight.
- Reliability note.
- Boundary note where a source could be over-read.

## Information Gaps

- State country and area pages need manual refresh before current dated use in
  this environment.
- Some current datasets revise prior-year values. Products should preserve
  dataset vintage, not only indicator year.
- National statistical offices and foreign government pages can be unstable,
  politicized, censored, inconsistently translated, or unavailable in crisis.
- Factbook-style fields often mixed neutral reference, policy-sensitive
  geography, and analytic context. Warlock-Index should split those into
  separate evidence types instead of recreating a single omnibus country
  page.

## Source List

- Central Intelligence Agency, Spotlighting The World Factbook As We Bid A Fond Farewell: `https://www.cia.gov/the-world-factbook/`
- Central Intelligence Agency, World Leaders: `https://www.cia.gov/resources/world-leaders/`
- U.S. Department of State, Countries And Areas source family: `https://www.state.gov/countries-areas/`
- World Bank DataBank, World Development Indicators: `https://databank.worldbank.org/source/world-development-indicators`
- International Monetary Fund, IMF Data: `https://www.imf.org/en/data`
- United Nations, UNdata: `https://data.un.org/`
- Library of Congress / Congress.gov, CRS Products: `https://crsreports.congress.gov/`
- U.S. Government Accountability Office, Reports And Testimonies: `https://www.gao.gov/reports-testimonies`

## Cross References

- [CIA, State, And NGA Foreign Government And Map Reference Packet](../source-packets/official-threat-source-baseline/2026-06-13T0831Z-cia-foreign-government-map-reference-packet.md)
- [Foreign Government Reference Source Register](../../source-registers/foreign-government-reference.md)
- [Map And Geospatial Reference Source Register](../../source-registers/map-geospatial-reference.md)
- [Official U.S. Intelligence And Law Enforcement Source Register](../../source-registers/us-intelligence-law-enforcement.md)
- [Official Threat Source Collection Tracker](../trackers/2026-06-13T0600Z-official-threat-source-collection-tracker.md)
