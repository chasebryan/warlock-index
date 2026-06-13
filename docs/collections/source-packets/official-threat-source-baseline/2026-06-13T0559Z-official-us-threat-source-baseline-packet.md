# Official U.S. Threat Source Baseline Packet

**UNCLASSIFIED//OPEN SOURCE**

**Source Packet ID:** WI-SOURCEPACKET-US-THREAT-2026-0001

**Prepared UTC:** 2026-06-13T05:59:00Z

**Information cutoff UTC:** 2026-06-13T05:59:00Z

**Source base:** ODNI Annual Threat Assessment 2026; CIA World Leaders; CIA
World Factbook sunset notice; FBI terrorism, counterintelligence, cyber, WMD,
and transnational organized crime public pages; NCTC terrorist group guide;
DHS Homeland Threat Assessment product family; CISA Known Exploited
Vulnerabilities catalog and advisories; NSA cybersecurity advisories; State
Department FTO and Country Reports on Terrorism source families; Treasury
OFAC and illicit-finance sources; DEA, ATF, CBP, Coast Guard, DOJ NSD, and
NGA public source families; existing WARLOCK-INDEX official U.S. source
registers, actor profiles, trackers, and baselines.

**Analytic confidence:** High for source identity where current official pages
or stable agency product families are identified. Moderate for current
document recency across dynamic agency pages because some public URLs change,
block automated verification, or point to product families rather than a
single static PDF.

**Purpose:** Provide a reusable baseline packet for official U.S. threat
source collection inside WARLOCK-INDEX.

**Scope:** Public official sources from intelligence, homeland security,
law enforcement, sanctions, border, cyber, maritime, counterterrorism,
counternarcotics, WMD, and geospatial reference agencies.

**Boundary:** Strategic research support only. This packet does not identify
private persons or domestic political opponents as threats, does not produce
target packages, and does not include operational, tactical, investigative,
surveillance, cyber exploitation, route-selection, or enforcement guidance.

## Bottom Line

WARLOCK-INDEX now has enough official U.S. source structure to treat threat
coverage as a disciplined source-collection problem rather than a loose list
of adversaries. The correct model is an agency-source lattice: ODNI for
public IC-wide threat framing; CIA for foreign leadership and legacy country
reference; FBI for terrorism, counterintelligence, cyber, WMD, and criminal
program framing; DHS/CISA for homeland and infrastructure risk; State and
Treasury for designations, terrorism, sanctions, and illicit finance; DEA,
ATF, CBP, Coast Guard, and DOJ for public law-enforcement source streams; and
NGA or CIA map products for strategic geographic orientation.

The packet deliberately avoids a domestic "enemies" frame. Domestic coverage
is limited to official public threat categories involving violence, criminal
conduct, terrorism, illicit finance, cybercrime, trafficking, weapons,
border/maritime threat vectors, or other lawful public-source security
definitions. It does not profile political belief, protected speech, religion,
ethnicity, nationality, protest, journalism, or association.

## Extraction Rules

1. Treat official sources as authoritative for what the issuing agency says,
   not as neutral or complete truth.
2. Separate legal designations, intelligence assessments, statistics,
   advisories, sanctions, prosecutions, and maps.
3. Use current agency pages for source identity and product family routing,
   then create dated source packets for specific PDFs or reports.
4. Do not reproduce operational details from terrorism, WMD, cyber,
   interdiction, trafficking, border, firearms, or investigative sources.
5. Use aggregate statistics and strategic categories only.
6. Do not identify private persons, lawful domestic groups, or protected
   activity as threats unless an official public legal source does so, and
   even then keep the product at legal-source context rather than targeting.
7. Maps are for strategic orientation and source navigation only.

## Agency Source Ledger

| Agency/source family | Primary value | Use inside WARLOCK-INDEX | Limits |
| --- | --- | --- | --- |
| ODNI Annual Threat Assessment | IC-wide public threat baseline | Global operating picture, actor baselines, source packet anchors | Public release constraints and policy-era framing |
| CIA World Leaders | Foreign government leadership reference | Leadership and government reference layer | Not a threat list or targeting source |
| CIA World Factbook legacy and CIA maps | Legacy country and map context | Historical country/geography and map reference | Factbook sunset in 2026; refresh current facts elsewhere |
| FBI terrorism page | Terrorism definitions and program framing | International and domestic terrorism source lane | No political profiling or tactics extraction |
| FBI counterintelligence page | Foreign intelligence and espionage framing | Counterintelligence source lane | No identification of private persons absent official legal record |
| FBI cyber and IC3 | Cybercrime and reported cyber incident trend source | Cyber threat and crime trend packet | No exploit steps or victim-targeting logic |
| FBI WMD page | WMD prevention and threat framing | WMD terrorism source lane | No materials, methods, or device detail |
| NCTC group guide | Historical terrorist group reference | Group-name and designation context | Stale; avoid tactics detail and refresh current status |
| DHS Homeland Threat Assessment | Homeland threat environment | Homeland assessment and tracker | Dynamic URL/product family; recency check required |
| CISA KEV and advisories | Exploited vulnerability and defensive advisory source | Cyber defense source packet | No offensive reproduction or scanning detail |
| NSA cybersecurity advisories | Defensive cyber guidance | Cyber actor and sector source lane | No exploit procedure extraction |
| State FTO and terrorism reports | Designations and annual terrorism reporting | Terrorism source register and actor profiles | U.S. diplomatic perspective |
| Treasury OFAC and risk assessments | Sanctions and illicit finance | Illicit finance, terrorism, cyber, narcotics, proliferation source lane | No evasion or compliance circumvention guidance |
| DEA threat sources | Narcotics and cartel source family | TCO and narcotics baseline | No production, smuggling, concealment, or distribution guidance |
| ATF data/statistics | Firearms commerce, tracing, explosives source family | Firearms trafficking and violent-crime context | No procurement, trafficking, or device guidance |
| CBP statistics | Border, seizure, encounter, and trade enforcement data | Border and TCO strategic source lane | Definitions matter; no evasion or route guidance |
| Coast Guard public sources | Maritime security, port security, counterdrug, IUU fishing | Maritime homeland and transnational source lane | No patrol or interdiction detail |
| DOJ NSD | Public cases and legal action | Legal-source tracker for national security cases | Allegations are case-specific and require careful labeling |
| NGA public sources | Public maps and geospatial references | Strategic map/source register | No targeting or infrastructure vulnerability mapping |

## Threat Families Covered

### Foreign State Adversary And Competitor Sources

ODNI, CIA World Leaders, DoD, DIA, State, Treasury, and DOJ provide the
primary official source families for foreign state actor coverage. The
existing WARLOCK-INDEX China, Russia, Iran, North Korea, Arctic, Taiwan,
strategic weapons, cyber, and space products already use parts of this lane.
The next expansion should create a foreign leadership and government-source
packet that pairs CIA World Leaders with State, ODNI, DoD, and sanctions
material without creating personal dossiers.

### Terrorism And Nonstate Armed Network Sources

FBI, NCTC, State, Treasury, DHS, ODNI, and DOJ provide the official public
terrorism source families. NCTC's public group guide is useful as historical
taxonomy, but it is not current enough to carry modern judgments by itself.
State FTO lists and terrorism reports, Treasury sanctions, FBI terrorism
pages, ODNI assessments, and DHS homeland-threat products should carry current
status.

### Domestic Terrorism And Domestic Violent Extremism Sources

Domestic threat coverage belongs only where official public sources define
violence, criminal activity, or terrorism categories. The FBI terrorism page
distinguishes international and domestic terrorism and notes the civil
liberties boundary between protected activity and criminal violence. WARLOCK-INDEX should use that distinction as a structural rule: ideology is not
enough; lawful expression is not enough; source products must remain about
violence, criminal conduct, official public definitions, and aggregate
security trends.

### Cyber Threat Sources

CISA, FBI, NSA, ODNI, Treasury, and DOJ provide the core public cyber source
families. CISA KEV and advisories are especially useful for defensive trend
analysis and public-source actor/sector mapping. WARLOCK-INDEX should extract
actor names, sectors, vulnerability classes, and defensive themes at high
level only. It must not reproduce exploit chains, scanning logic, malware
operation, credential theft methods, or evasion techniques.

### Transnational Criminal Organization Sources

DEA, Treasury, FBI, DHS/HSI, CBP, Coast Guard, ATF, DOJ, and State provide
the main source families for cartels, narcotics trafficking, firearms
trafficking, illicit finance, human smuggling, cyber-enabled fraud, and
maritime criminal networks. Products should separate legal designation,
criminal investigation, public safety effect, financial networks, and border
statistics. They must not include smuggling routes, concealment methods,
production steps, or enforcement evasion.

### Maps And Geospatial Reference Sources

CIA legacy maps, CIA World Leaders, State country pages, DoD command maps,
NGA public geospatial references, USCG maritime regions, and CBP public
statistics can support strategic geography. WARLOCK-INDEX should use maps to
orient readers to theaters, governments, chokepoints, and official
jurisdictions. It should not publish operational overlays, sensitive facility
locations, live movement, patrol patterns, surveillance fields, vulnerability
maps, or targeting geospatial data.

## Follow-On Packet Queue

| Packet | Purpose | Source families |
| --- | --- | --- |
| CIA Foreign Government And Map Reference Packet | Replace older Factbook dependence with current CIA World Leaders and safe map-source rules | CIA World Leaders, CIA maps legacy, State country pages, NGA public sources |
| DHS Homeland Threat Assessment Packet | Pull dated DHS threat-assessment products into the corpus | DHS HTA, I&A, CISA, FEMA, CBP, Coast Guard |
| FBI Program Threat Source Packet | Organize FBI terrorism, cyber, counterintelligence, WMD, TCO, and violent-crime source pages | FBI program pages, IC3, DOJ NSD |
| CISA/NSA Cyber Advisory Packet | Extract defensive cyber actor and sector trends from advisories | CISA KEV, CISA advisories, NSA advisories, FBI IC3, ODNI |
| Treasury Illicit Finance And Sanctions Packet | Connect sanctions, illicit finance, terrorism finance, cyber finance, narcotics, and proliferation finance | OFAC, Treasury risk assessments, State, DOJ |
| DEA/ATF/CBP/USCG TCO Source Packet | Build transnational criminal and border/maritime strategic source lane | DEA, ATF, CBP, Coast Guard, Treasury, DOJ |

## Information Gaps

- Agency pages are dynamic; dated source packets should capture exact product
  URLs and access times.
- CIA World Factbook is no longer a current source and must be treated as
  legacy after its 2026 sunset.
- DHS, DEA, ATF, CBP, and CISA pages can block automated checks while still
  remaining official web sources; manual date capture may be needed.
- Public sources do not reveal classified intelligence, investigative methods,
  sensitive collection, or operational details, and WARLOCK-INDEX should not
  infer those details.
- Domestic threat products must keep civil liberties boundaries explicit.

## Cross References

- [Official U.S. Intelligence And Law Enforcement Source Register](../../../source-registers/us-intelligence-law-enforcement.md)
- [U.S. Official Threat Source Operating Picture](../../../assessments/homeland-hemisphere/2026-06-13T0558Z-us-official-threat-source-operating-picture.md)
- [Official Threat Source Collection Tracker](../../trackers/2026-06-13T0600Z-official-threat-source-collection-tracker.md)
- [Official U.S. Threat Source Assimilation Matrix](../../global-assimilation/2026-06-13T0601Z-official-us-threat-source-assimilation-matrix.md)
