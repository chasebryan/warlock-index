# Russia State Cyber Source Packet

**UNCLASSIFIED//OPEN SOURCE**

**Source Packet ID:** WI-SOURCEPACKET-RUSSIA-CYBER-2026-0001

**Prepared UTC:** 2026-06-20T00:35:00Z

**Information cutoff UTC:** 2026-06-20T00:35:00Z

**Source base:** DOJ October 19, 2020 GRU Unit 74455 legal-action release;
State Rewards for Justice GRU Unit 29155 reward page; GOV.UK December 7, 2023
Star Blizzard/FSB release; Treasury/OFAC cyber-related sanctions route; CISA,
NSA, FBI, IC3, NCSC-UK, Canada Cyber Centre, ASD/ACSC, NATO, and EU
cyber-source routes; existing WARLOCK-INDEX Russia profile, Russia strategic
weapons packet, global cyber baseline, defensive cyber source-lane packet,
cyber nation-state actor/APT tracker, official U.S. and allied source
registers, coverage map, and global actor-domain matrix.

**Analytic confidence:** High for official public source identity, DOJ legal
source treatment of GRU Unit 74455, State/RFJ routing for GRU Unit 29155,
GOV.UK/NCSC treatment of Star Blizzard and FSB Centre 18, and Treasury/OFAC as
a cyber-related sanctions route. Moderate for current completeness because
cyber advisories, sanctions pages, reward notices, and allied warnings are
dynamic. Low for alias equivalence unless a cited official or source-classed
record uses the alias.

**Purpose:** Provide the first Russia-specific cyber source packet for
WARLOCK-INDEX, separating Russian intelligence-service, destructive/disruptive,
espionage, Ukraine-war, legal-action, sanctions/reward, and allied-warning
evidence without technical extraction.

**Boundary:** Strategic defensive source organization only. This packet does
not provide exploit steps, commands, scripts, IOCs, malware behavior sequences,
detection signatures, vulnerability lists, CVEs, victim/provider dossiers,
target maps, Ukraine operational guidance, sanctions evasion, incident-response
playbooks, or offensive cyber guidance.

## Bottom Line

The Russia cyber lane should not be treated as one undifferentiated APT list.
Public records mix GRU military-intelligence cases, FSB-linked political
interference and espionage warnings, possible SVR lanes that require separate
source capture, Ukraine-war disruptive activity, legal actions, sanctions,
reward notices, and allied cyber-center warnings.

WARLOCK-INDEX should therefore preserve the source class first: legal action,
reward notice, sanctions/status route, defensive advisory, allied warning,
official threat assessment, commercial research, or internal analytic
synthesis. Alias labels such as Sandworm, Star Blizzard, Callisto, SEABORGIUM,
COLDRIVER, APT28, APT29, Cozy Bear, and related vendor names should not be
normalized into one table until a dated source-class crosswalk records who used
the label and what relationship the source stated.

## Core Source Ledger

| Source | Source class | Main value | Extraction focus | Limits |
| --- | --- | --- | --- | --- |
| DOJ Office of Public Affairs, "Six Russian GRU Officers Charged..." (2020-10-19; archived) | Official U.S. legal-action release | Source route for GRU Unit 74455/Sandworm public legal-action treatment and high-level destructive/disruptive campaign context | Publisher, title, date, unit language, source-used labels, strategic target categories, legal-action status | Archived source; indictment allegations are legal claims; no technical detail, malware procedure, victim dossier, or operational extraction |
| State Rewards for Justice, GRU Officers - Unit 29155 (accessed 2026-06-20) | Official U.S. reward route | Source route for GRU Unit 29155, Ukraine-war critical-infrastructure context, and RFJ cyber-reward framing | Source identity, reward category, unit label, broad sector categories, strategic Ukraine/global critical-infrastructure context | Reward/investigative route; do not reproduce tip mechanics, private-person dossiers, scanning detail, or target mapping |
| GOV.UK, "UK exposes attempted Russian cyber interference..." (2023-12-07) | Allied official public attribution and sanctions release | Source route for FSB Centre 18, Star Blizzard, Callisto, SEABORGIUM, and COLDRIVER language | Publisher, date, issuing departments, FSB/Centre 18 language, affected public-institution categories, allied-sanctions context | UK government source; no phishing mechanics, personal targeting workflows, or document-leak amplification |
| Treasury/OFAC Cyber-Related Sanctions page (accessed 2026-06-20) | Official U.S. legal/status route | Dynamic route for cyber-related sanctions authorities, general licenses, recent actions, and Russia-relevant cyber designations where applicable | Program identity, legal/status route, action dates, designation category, source URLs | Status route, not analytic summary; no sanctions-compliance advice or evasion guidance |
| CISA cybersecurity advisory route, including the public AA24-249A route as a queued page-level refresh | Official U.S. defensive advisory route | Route for joint U.S. and allied defensive advisory metadata on Russian military cyber activity | Advisory title, date, issuing agencies, actor wording, sector categories, defensive-only caveat | Page-level extraction remains a follow-on task; do not copy IOCs, CVEs, mitigations, or technical procedure |
| NSA, FBI/IC3, NCSC-UK, Canada Cyber Centre, ASD/ACSC, NATO, and EU cyber routes | Official and allied source families | Cross-check routes for state-actor warnings, law-enforcement framing, annual threat context, and allied cyber-center treatment | Publisher, date, source class, actor wording, sector category, refresh status | Dynamic source families; keep country-source and advisory-source boundaries visible |

## Actor-Source Matrix

| Actor/source lane | Anchor sources | Current use | Boundary |
| --- | --- | --- | --- |
| GRU Unit 74455 / Sandworm-family labels | DOJ 2020 GRU Unit 74455 legal-action release; future CISA/NSA/FBI/allied advisory metadata | Preserve the legal-action lane for Russian military-intelligence destructive/disruptive activity and the source-used Sandworm-family labels | No malware procedure, exploit-chain detail, target mapping, infrastructure extraction, or Ukraine operational guidance |
| GRU Unit 29155 | State/RFJ Unit 29155 reward page; queued CISA/NSA/FBI advisory page-level refresh | Preserve the reward/legal-status lane for Unit 29155 and Ukraine/global critical-infrastructure context | No private-person dossiering beyond source identity, no tip-channel reproduction, no scanning or vulnerability detail |
| FSB Centre 18 / Star Blizzard / Callisto / SEABORGIUM / COLDRIVER | GOV.UK/NCSC public release and linked allied legal/status records | Preserve the allied official lane for political/democratic-process cyber interference and high-risk public-institution targeting categories | No phishing mechanics, document-leak amplification, victim targeting workflows, or account-compromise procedure |
| SVR / APT29 / Cozy Bear / Midnight Blizzard-family labels | Queued official U.S. and allied cyber advisory/legal-action refresh | Treat as a separate source-capture lane until official source packets identify exact issuer wording and alias treatment | Do not infer equivalence from commercial labels alone |
| State-crime overlap and Russia-aligned disruptive actors | OFAC, DOJ, FBI/IC3, CISA, allied cyber-center, and future sanctions/legal records | Track only where official public records state sponsorship, direction, control, tolerance, benefit, sanctions nexus, or legal status | No ransomware operation, payment, laundering, affiliate, infrastructure, or victim-selection detail |

## Extraction Rules

Products derived from this packet may extract only:

- Publisher, title, date, access date, URL, source class, and issuing agencies.
- Actor label exactly as written by the source.
- Intelligence-service, unit, government-linked, affiliated, or criminal label
  exactly as written by the source.
- High-level sector category, such as government, civil society,
  telecommunications, energy, water, transportation, health, finance, defense
  industrial base, cloud/data centers, election systems, or critical
  infrastructure.
- High-level activity category, such as espionage, interference, disruption,
  destructive activity, revenue generation, sanctions evasion, reward/legal
  action, or criminal-state overlap.
- Defensive source themes at category level only, such as reporting routes,
  asset visibility, identity hygiene, patching, logging, segmentation,
  end-of-life replacement, or secure-by-design procurement.

Products derived from this packet should not extract:

- Commands, scripts, queries, exploit chains, file paths, hashes, IP addresses,
  domains, email addresses, YARA/Sigma/Snort content, malware execution steps,
  vulnerable-product lists, or CVE-level exploitation detail.
- Victim names, provider architecture, network diagrams, device inventories,
  facility dependencies, operational timelines, or targeting logic unless a
  public strategic legal record makes a narrow reference necessary.
- Sanctions-compliance advice, sanctions-evasion techniques, cryptocurrency
  laundering detail, exchange/platform targeting, or incident-response
  playbooks.

## Follow-On Queue

| Priority | Follow-on lane | Purpose | Output |
| --- | --- | --- | --- |
| 1 | CISA/NSA/FBI Russia advisory metadata refresh | Capture titles, dates, issuing agencies, actor wording, source class, and safety boundaries for public Russia advisories | Advisory metadata table without IOCs, CVEs, mitigations, or technical detail |
| 2 | SVR/APT29 official-source packet | Separate SVR-linked source records from GRU and FSB records before using aliases broadly | Russia SVR cyber source packet or label crosswalk |
| 2 | OFAC/RFJ Russia cyber legal-status refresh | Track public sanctions and reward routes that change after this packet cutoff | Legal/status route update with no compliance or evasion guidance |
| 3 | Allied Russia cyber-center crosswalk | Cross-check UK, Canada, Australia, New Zealand, NATO, EU, and other allied source wording | Allied cyber-center crosswalk row |
| 3 | Ukraine-war cyber source packet | Preserve strategic Ukraine-war cyber evidence separately from generic Russia APT coverage | Strategic source packet with no operational or tactical cyber material |

## Open Gaps

- SVR-linked source treatment still needs a separate packet or dated label
  crosswalk before APT29/Cozy Bear/Midnight Blizzard-family aliases are used
  broadly across assessments.
- CISA/NSA/FBI Russia advisory pages need a page-level metadata refresh with
  technical material excluded.
- Allied cyber-center source families are present, but they still need a
  country/source-class crosswalk for Russia, PRC, Iran, DPRK, and state-crime
  overlap.
- Commercial threat-intelligence labels need a source-class rule before they
  are used to fill behavior summaries or aliases.
- Ukraine-war cyber evidence needs a strategic-only source packet that avoids
  operational cyber guidance, target mapping, and tactical incident details.

## Cross References

- [Cyber Nation-State Actor And APT Source Tracker](../../trackers/2026-06-18T1154Z-cyber-nation-state-actor-source-tracker.md)
- [Defensive Cyber Source Lane Packet](2026-06-18T1833Z-defensive-cyber-source-lane-packet.md)
- [Russia Actor Profile](../../actor-profiles/russia.md)
- [Russia Strategic Actor Classification](../../../assessments/europe-russia/2026-06-12T2342Z-russia-strategic-actor-classification.md)
- [Russia Strategic Weapons And Nuclear Signaling Source Packet](../strategic-weapons/2026-06-13T2051Z-russia-strategic-weapons-and-nuclear-signaling-source-packet.md)
- [Global Cyber And Critical Infrastructure Strategic Baseline](../../../assessments/technology-cyber-space/2026-06-13T0129Z-global-cyber-critical-infrastructure-strategic-baseline.md)
- [Defensive Cyber And Space Source Register](../../../source-registers/defensive-cyber-space.md)
- [Official U.S. Intelligence And Law Enforcement Source Register](../../../source-registers/us-intelligence-law-enforcement.md)
- [Allied And Multilateral Source Register](../../../source-registers/allied-multilateral.md)
- [Coverage Map](../../coverage-map.md)
- [Global Actor-Domain Assimilation Matrix](../../global-assimilation/2026-06-13T0049Z-global-actor-domain-assimilation-matrix.md)

## Source Base

- DOJ Office of Public Affairs, "Six Russian GRU Officers Charged in
  Connection with Worldwide Deployment of Destructive Malware and Other
  Disruptive Actions in Cyberspace":
  `https://www.justice.gov/archives/opa/pr/six-russian-gru-officers-charged-connection-worldwide-deployment-destructive-malware-and`
- State Rewards for Justice, "GRU Officers - Unit 29155":
  `https://rewardsforjustice.net/rewards/gru-officers-unit-29155/`
- GOV.UK, "UK exposes attempted Russian cyber interference in politics and
  democratic processes":
  `https://www.gov.uk/government/news/uk-exposes-attempted-russian-cyber-interference-in-politics-and-democratic-processes`
- Treasury/OFAC, Cyber-Related Sanctions:
  `https://ofac.treasury.gov/sanctions-programs-and-country-information/sanctions-related-to-significant-malicious-cyber-enabled-activities`
- CISA, Cybersecurity Advisories:
  `https://www.cisa.gov/news-events/cybersecurity-advisories`
- CISA, AA24-249A public route queued for page-level metadata refresh:
  `https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-249a`
- NSA, Cybersecurity Advisories and Guidance:
  `https://www.nsa.gov/Press-Room/Cybersecurity-Advisories-Guidance/`
- FBI, Cyber:
  `https://www.fbi.gov/investigate/cyber`
- IC3:
  `https://www.ic3.gov/`
- NCSC-UK:
  `https://www.ncsc.gov.uk/`
- Canadian Centre for Cyber Security, Alerts and Advisories:
  `https://www.cyber.gc.ca/en/alerts-advisories`
- Australian Signals Directorate, Alerts and Advisories:
  `https://www.cyber.gov.au/about-us/view-all-content/alerts-and-advisories`
