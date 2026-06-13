# Foreign Government Reference Source Register

**UNCLASSIFIED//OPEN SOURCE**

**Source Register ID:** WI-SOURCE-REGISTER-FGOV-2026-0001

**Prepared UTC:** 2026-06-13T09:28:00Z

**Information cutoff UTC:** 2026-06-13T09:28:00Z

**Purpose:** Define source-routing rules for foreign government leadership,
officeholder, diplomatic, country, and official-government reference material
used inside WARLOCK-INDEX.

**Boundary:** This register supports strategic reference and source
organization only. It does not create personal dossiers, target packages,
surveillance lists, vulnerability profiles, travel-pattern analysis,
collection tasking, operational planning, investigative direction, sanctions
evasion, or domestic political profiling.

## Framing Rule

Foreign government reference is not threat analysis by itself. A public
officeholder listing, country page, diplomatic statement, ministry page, map,
or embassy source can support context, provenance, and dated source routing.
It does not independently prove strategic intent, capability, command
authority, legal status, or threat relevance.

WARLOCK-INDEX products should keep these evidence types separate:

- Leadership and officeholder reference.
- Diplomatic and bilateral framing.
- Official foreign-government statements.
- Intelligence or defense assessments.
- Legal designations, sanctions, indictments, and regulatory actions.
- Maps and geospatial reference.
- Independent research or media reporting.

## Source Precedence

| Reference need | First source | Cross-check source | Required label |
| --- | --- | --- | --- |
| Current foreign leadership and cabinet membership | CIA World Leaders country page | Official foreign government pages, State country pages where accessible, embassy pages | Current as of access date and page update date where available |
| Historical leadership snapshot | CIA World Leaders historical data | State releases, official foreign government archives, reputable research | Snapshot date |
| U.S. diplomatic framing | State country and area pages, State releases, embassy pages | CIA World Leaders, CRS/GAO, allied foreign ministries | U.S. diplomatic perspective |
| Foreign government's stated position | Official head-of-state, cabinet, foreign ministry, defense ministry, or parliament source | Embassy pages, allied government sources, reputable media | Issuer perspective |
| Sanctions or legal status | Treasury OFAC, State designation pages, Federal Register, DOJ public legal record | UN or allied sanctions sources | Legal/status evidence only |
| Strategic threat relevance | ODNI, DoD, DIA, FBI, CISA/NSA/FBI cyber, Treasury, State reports | Allied intelligence or defense sources, research institutions | Assessment or advisory evidence |
| Map or geographic context | NGA public maps, CIA legacy maps where appropriate, State or DoD public maps | USGS, NOAA, allied public maps | Strategic orientation only |

## Core Source Families

### CIA World Leaders

- **Source class:** A
- **Publisher:** Central Intelligence Agency
- **Publication cadence:** CIA states that the online directory is updated
  weekly.
- **Accessed UTC:** 2026-06-13T09:28:00Z
- **URL:** https://www.cia.gov/resources/world-leaders/
- **Use:** Current foreign government leadership, cabinet, central bank,
  ambassador, and permanent representative reference source.
- **Reliability note:** Authoritative public CIA directory for leadership and
  officeholder reference. It is not a threat assessment and must not be used
  as a dossier, targeting source, or independent evidence of policy control.

### CIA World Leaders All Foreign Governments

- **Source class:** A
- **Publisher:** Central Intelligence Agency
- **Accessed UTC:** 2026-06-13T09:28:00Z
- **URL:** https://www.cia.gov/resources/world-leaders/foreign-governments/
- **Use:** Country-page routing for the CIA World Leaders directory.
- **Reliability note:** Authoritative for the directory's public country list
  and page routing. Country names and recognition caveats should be preserved
  as source language rather than silently normalized.

### CIA World Leaders Historical Data

- **Source class:** A
- **Publisher:** Central Intelligence Agency
- **Accessed UTC:** 2026-06-13T09:28:00Z
- **URL:** https://www.cia.gov/resources/world-leaders/historical-data/
- **Use:** Historical leadership snapshots and archive continuity.
- **Reliability note:** Useful for dated leadership-change context. Historical
  snapshots do not carry current claims unless a product explicitly refreshes
  the current source.

### CIA World Leaders Key To Abbreviations

- **Source class:** A
- **Publisher:** Central Intelligence Agency
- **Accessed UTC:** 2026-06-13T09:28:00Z
- **URL:** https://www.cia.gov/resources/world-leaders/key-to-abbreviations/
- **Use:** Abbreviation definitions, including office and diplomatic-status
  labels used in World Leaders entries.
- **Reliability note:** Use to decode CIA directory fields without inventing
  local expansions. Abbreviations should be kept as source conventions.

### State Department Countries And Areas Source Family

- **Source class:** A
- **Publisher:** U.S. Department of State
- **Access check UTC:** 2026-06-13T09:28:00Z
- **URL:** https://www.state.gov/countries-areas/
- **Use:** U.S. diplomatic framing, bilateral relationship context, country
  pages, embassy links, official statements, and public policy-era language.
- **Reliability note:** The landing page and tested country pages returned a
  public technical-difficulties response during this access check. Treat State
  as a required official source family, but verify exact page URLs and access
  dates before using it for current country claims.

### Official Foreign Government Source Family

- **Source class:** A for official public government pages; B where page
  authenticity, translation quality, or archive stability is uncertain.
- **Publisher:** Foreign head-of-state offices, prime minister or cabinet
  offices, foreign ministries, defense ministries, parliaments, central banks,
  election authorities, statistical offices, and embassies.
- **Use:** Issuer's public statements, office structure, leadership
  confirmations, cabinet announcements, diplomatic positions, treaty text,
  budget statements, and official statistical releases.
- **Reliability note:** Authoritative for what the issuing government publicly
  says. It is not neutral evidence, and products should identify translation,
  propaganda, censorship, legal, recognition, or wartime constraints where
  relevant.

### Embassy And Mission Source Family

- **Source class:** A for official embassy/mission pages; B where archive or
  authentication is unclear.
- **Publisher:** Foreign embassies, permanent missions to the United Nations,
  consulates, and diplomatic missions.
- **Use:** Diplomatic statements, leadership references, consular updates,
  bilateral messaging, and UN mission positions.
- **Reliability note:** Useful for diplomatic-public framing. Do not treat
  embassy messaging as independent verification of military capability,
  security behavior, or internal decision authority.

## Existing Actor-Lane Routing

| Actor lane | CIA World Leaders route | State route status | Official-government source role | Required caution |
| --- | --- | --- | --- | --- |
| China | `https://www.cia.gov/resources/world-leaders/foreign-governments/china/` | State China page returned technical-difficulties response in this environment | Use PRC State Council, foreign ministry, defense ministry, party-state, central bank, and embassy pages as issuer-perspective sources where needed | Separate state, party, military, Hong Kong, Macau, Taiwan, and sanctions/legal evidence |
| Russia | `https://www.cia.gov/resources/world-leaders/foreign-governments/russia/` | State Russia page returned technical-difficulties response in this environment | Use Kremlin, government, foreign ministry, defense ministry, central bank, parliament, and embassy pages as issuer-perspective sources where needed | Separate official Russian claims from ODNI/DoD/NATO threat assessments and legal evidence |
| Iran | `https://www.cia.gov/resources/world-leaders/foreign-governments/iran/` | State country page requires manual refresh | Use presidency, supreme-leader office, foreign ministry, central bank, parliament, and mission sources as issuer-perspective sources where needed | Note CIA no-diplomatic-exchange marking and separate officeholder reference from sanctions, terrorism, nuclear, or proxy analysis |
| North Korea | `https://www.cia.gov/resources/world-leaders/foreign-governments/korea-north/` | State country page requires manual refresh | Use official DPRK state/media material only as issuer-perspective evidence and cross-read with U.S., UN, ROK, Japanese, and allied sources | High propaganda and access constraints; avoid inferring command detail beyond public source |
| NATO and major U.S. allies | Use individual CIA country pages for national leadership | State country pages require per-page refresh | Use national ministries, parliaments, statistics offices, central banks, and embassies | Do not collapse alliance membership, public pledge, budget authority, and delivered capability |
| Indo-Pacific allies and partners | Use individual CIA country pages for Japan, Republic of Korea, Australia, Philippines, India, and others | State country pages require per-page refresh | Use national government, defense, foreign ministry, and parliamentary sources | Distinguish diplomatic statement, legal authority, budget, basing/access language, and operational implementation |
| Africa and regional state lanes | Use individual CIA country pages as leadership anchor | State country pages require per-page refresh | Use national government, AU/regional, election, mining, port, and security ministry sources where official and public | Avoid over-weighting weak or captured official sources; cross-read with UN, AU, ECOWAS/SADC/IGAD, and reputable research |

## Extraction Rules

1. Record the source family before extracting content: directory, country
   page, official statement, ministry page, legal record, sanctions page,
   intelligence assessment, map, or research source.
2. For leadership entries, capture office title, name, country page URL,
   access date, and page update date where shown.
3. Do not infer personal intent, private network, travel pattern, vulnerability,
   policy control, or command responsibility from a leadership listing.
4. For State Department sources, treat country pages as U.S. diplomatic
   perspective and refresh exact URLs before current-use claims.
5. For official foreign-government sources, label the issuer perspective and
   avoid laundering propaganda, legal claims, or wartime messaging into
   independent assessment.
6. For translated material, identify whether the source is official English,
   official translation, machine translation, or third-party translation.
7. Do not use maps or government-reference sources to create targeting,
   surveillance, facility-vulnerability, route-selection, or live movement
   products.

## Minimum Product Fields

When an actor profile or theater product uses this register, include:

- Source family.
- Publisher.
- URL.
- Accessed UTC.
- Page update or publication date where available.
- Whether the source is a directory, diplomatic page, issuer statement,
  legal/status source, assessment, statistic, or map.
- Reliability note.
- Boundary note when leadership, map, sanctions, or military source material
  could be over-read.

## Information Gaps

- State Department country and area pages need manual refresh because current
  access checks returned technical-difficulties responses.
- CIA World Leaders country-page update dates vary by country; each actor
  profile should capture the country-specific update date rather than relying
  only on the directory's weekly cadence.
- Official foreign-government sources can be unstable, censored, propagandistic,
  archived poorly, machine translated, or unavailable in crisis.
- Recognition disputes and naming conventions require source labels. Do not
  silently normalize contested names or statuses.
- This register does not replace ODNI, DoD, DIA, Treasury, State designation,
  DOJ, CISA, FBI, UN, NATO, or allied sources for threat, legal, sanctions,
  military, cyber, or operational claims.

## Source List

- Central Intelligence Agency, World Leaders: `https://www.cia.gov/resources/world-leaders/`
- Central Intelligence Agency, All Foreign Governments: `https://www.cia.gov/resources/world-leaders/foreign-governments/`
- Central Intelligence Agency, World Leaders Historical Data: `https://www.cia.gov/resources/world-leaders/historical-data/`
- Central Intelligence Agency, World Leaders Key To Abbreviations: `https://www.cia.gov/resources/world-leaders/key-to-abbreviations/`
- Central Intelligence Agency, China World Leaders page: `https://www.cia.gov/resources/world-leaders/foreign-governments/china/`
- Central Intelligence Agency, Russia World Leaders page: `https://www.cia.gov/resources/world-leaders/foreign-governments/russia/`
- Central Intelligence Agency, Iran World Leaders page: `https://www.cia.gov/resources/world-leaders/foreign-governments/iran/`
- Central Intelligence Agency, Korea, North World Leaders page: `https://www.cia.gov/resources/world-leaders/foreign-governments/korea-north/`
- U.S. Department of State, Countries And Areas source family: `https://www.state.gov/countries-areas/`

## Cross References

- [CIA, State, And NGA Foreign Government And Map Reference Packet](../collections/source-packets/official-threat-source-baseline/2026-06-13T0831Z-cia-foreign-government-map-reference-packet.md)
- [Map And Geospatial Reference Source Register](map-geospatial-reference.md)
- [Official U.S. Intelligence And Law Enforcement Source Register](us-intelligence-law-enforcement.md)
- [Official U.S. Sources](official-us.md)
- [Allied And Multilateral Source Register](allied-multilateral.md)
