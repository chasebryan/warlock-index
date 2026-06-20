# Cyber Nation-State Actor And APT Source Tracker

**UNCLASSIFIED//OPEN SOURCE**

**Tracker ID:** WI-TRACKER-CYBER-APT-2026-0001

**Prepared UTC:** 2026-06-18T11:54:34Z

**Information cutoff UTC:** 2026-06-18T11:54:34Z

**Source base:** FBI cyber and nation-state threat overview pages; CISA
cybersecurity advisory source family; NSA cybersecurity advisories and guidance;
IC3 source family; Treasury/OFAC cyber-sanctions source family; State Rewards
for Justice foreign malicious cyber activity source family; Canadian Centre for
Cyber Security alerts and advisories; New Zealand NCSC news and alerts routing;
existing WARLOCK-INDEX global cyber baseline, cyber explainer, PRC cyber
defensive source packet, Salt Typhoon telecommunications defensive source note,
PRC APT/Typhoon label crosswalk and advisory refresh source packet, Russia
state cyber source packet,
official U.S. threat-source tracker, U.S. intelligence and law-enforcement
register, coverage map, and global actor-domain assimilation matrix.

**Analytic confidence:** High for source-family routing, safety boundaries, and
the need for a dedicated state-actor/APT collection lane. Moderate for
actor-label completeness because official, allied, law-enforcement, and private
research naming schemes change and do not always align.

**Purpose:** Create a standing source-safe control surface for expanding
WARLOCK-INDEX cyber coverage across nation-state cyber actors, APT labels,
defensive advisories, law-enforcement source events, sanctions, rewards, allied
cyber-center cross-checks, and commercial/research support material.

**Boundary:** Strategic defensive source organization only. This tracker does
not provide exploit steps, vulnerability weaponization, scanning procedures,
commands, IOCs, malware behavior sequences, detection signatures, YARA/Sigma/
Snort rules, credential-theft workflows, infrastructure targeting,
provider-specific vulnerability mapping, incident-response playbooks,
sanctions-evasion guidance, or operational cyber guidance.

## Bottom Line

WARLOCK-INDEX already has a strong PRC cyber and critical-infrastructure lane,
including a Salt Typhoon telecommunications note and a PRC APT/Typhoon label
crosswalk. The Russia lane now has its first dedicated state-cyber source
packet, which separates GRU, FSB, queued SVR, Ukraine-war, legal-action,
sanctions/reward, advisory, and allied-warning source classes. The remaining
gap is to build out Iranian, DPRK, allied cyber-center, and state-crime overlap
cyber coverage without turning APT coverage into a technical playbook or
unsourced alias encyclopedia.

The useful next move is not to chase every new advisory. It is to create
actor-specific packets from this tracker, with exact source-class labels:
official threat assessment, defensive advisory, law-enforcement case,
sanctions/designation, reward notice, allied cyber-center warning, commercial
research, or WARLOCK-INDEX analytic synthesis.

## Actor Naming Rules

1. Use the strategic actor first: PRC, Russia, Iran, DPRK, or state-crime
   overlap.
2. Preserve official wording exactly where possible: "state-sponsored,"
   "state-linked," "government-sponsored," "affiliated," "contract hacker,"
   "hacktivist," "criminal," "ransomware," or "activity" are not
   interchangeable labels.
3. Treat APT, Typhoon, Chollima, GRU/SVR/FSB, IRGC-linked, and vendor names as
   source labels until a dated source packet records who used the label and why.
4. Do not merge vendor aliases into official attribution without a source-class
   note.
5. Do not build private-person, victim, infrastructure, or provider dossiers
   unless an official public legal or sanctions record requires a strategic
   reference.
6. Retain uncertainty where public sources are partial, dynamic, or deliberately
   limited.

## Collection Matrix

| Actor lane | Current WARLOCK-INDEX anchor | Official source families to refresh | Next source product | Boundary |
| --- | --- | --- | --- | --- |
| PRC state cyber actors | PRC cyber defensive source packet; Salt Typhoon telecommunications note; PRC APT/Typhoon label crosswalk; China/PLA source tracker; cyber baseline | ODNI, DoD PRC report, CISA/NSA/FBI advisories, FBI China cyber overview, DOJ disruption releases, Treasury/OFAC, State/RFJ, FCC/Senate oversight, allied cyber centers | PRC advisory page-level refresh; FCC telecom cybersecurity source refresh; OFAC designation refresh; allied PRC cyber cross-check packet | No telecom diagrams, lawful-intercept detail, provider vulnerability mapping, SOHO-router replication, commands, IOCs, or technical procedures |
| Russian state cyber actors | Global cyber baseline; Russia actor profile; Russia strategic-weapons packet; official threat-source tracker; Russia state cyber source packet | ODNI, CISA/NSA/FBI advisories, FBI cyber page, DOJ NSD, Treasury/OFAC, State/RFJ, UK/NCSC, Canada Cyber Centre, ASD/ACSC, NATO/EU cyber routes | Russia advisory metadata refresh; SVR/APT29 source packet; allied Russia cyber-center crosswalk | No destructive-malware procedure, exploit-chain detail, intrusion reproduction, target/victim mapping, or operational Ukraine-war cyber guidance |
| Iranian state and affiliated cyber actors | Iran actor profile; Iran WMD/missile packet; cyber baseline; official threat-source tracker | FBI Iran cyber overview, CISA/NSA/FBI advisories, DOJ NSD, Treasury/OFAC, State/RFJ, DHS/CISA ICS and critical-infrastructure routes, allied and regional official cyber sources | Iran cyber source packet separating IRGC-linked, government-sponsored, hacktivist, ransomware-enabling, election/influence, and ICS/critical-infrastructure lanes | No industrial-control procedures, PLC/device detail, credential methods, ransomware playbooks, disinformation amplification guidance, or retaliation guidance |
| DPRK cyber and cyber-finance actors | DPRK actor profile; DPRK strategic-weapons packet; cyber baseline; official threat-source tracker | FBI cyber page, IC3, CISA/NSA/FBI advisories, DOJ NSD, Treasury/OFAC, State/RFJ, UN sanctions routes, ROK/Japan/allied cyber centers | DPRK cyber-finance and IT-worker source packet separating revenue generation, crypto/financial theft, IT-worker, espionage, sanctions, and missile/WMD funding context | No wallet/address lists, laundering steps, exchange targeting, credential theft, malware, exploit, or sanctions-evasion guidance |
| State-tolerated, proxy, and state-crime overlap | TCO actor profile; cyber baseline; U.S. law-enforcement threat source assessment | FBI/IC3, DOJ NSD, Treasury/OFAC, CISA/NSA/FBI advisories, State/RFJ, Europol/allied cybercrime routes where captured | Cybercrime-state overlap source packet for ransomware, proxy activity, sanctions, and state benefit claims | No ransomware operation, extortion script, payment, laundering, affiliate, infrastructure, or victim-selection guidance |

## APT Label Queue

| Label family | Strategic actor lane | Source treatment | Follow-on requirement |
| --- | --- | --- | --- |
| Typhoon labels, including Salt, Volt, Flax, and related PRC advisory labels where official sources use them | PRC | Official/advisory/legal label where captured; vendor labels only after source-class review | Use the completed PRC APT/Typhoon label crosswalk; continue only page-level advisory metadata refreshes |
| APT40 and other PRC-linked labels found in official advisories or legal actions | PRC | Use only where the source uses the label; separate MSS, PLA, contract-hacker, and company-linked claims | Capture exact advisory/legal record title, date, issuing agencies, actor language, and safety boundaries |
| GRU, SVR, FSB, APT28/APT29, Sandworm, and related Russian labels where official sources use them | Russia | Official intelligence-service or advisory/legal label; vendor alias as support only | Use the completed Russia state cyber source packet for GRU/FSB/legal/status lanes; add SVR/APT29 and allied advisory metadata before broad alias normalization |
| IRGC-linked, Iranian government-sponsored, Emennet Pasargad, and other Iranian labels where official sources use them | Iran | Official legal/advisory label when present; avoid collapsing hacktivist, contractor, and state language | Build Iran packet with separate election/influence, critical-infrastructure, ransomware-enabling, and ICS lanes |
| Lazarus, Hidden Cobra, Kimsuky, APT38, Chollima-family, IT-worker, and other DPRK labels where official sources use them | DPRK | Official/advisory/legal label when captured; vendor alias only as source-classed support | Build DPRK packet with cyber-finance, IT-worker, sanctions, legal case, and missile/WMD-funding context separated |
| Ransomware and cybercrime labels with possible state benefit or tolerance | State-crime overlap | Criminal label first unless an official source states direction, control, sponsorship, or benefit | Create source rules for separating criminal tradecraft, state tolerance, state direction, and sanctions/legal evidence |

## Safe Extraction Profile

Products derived from this tracker should extract only:

- Publisher, title, date, access date, source class, and issuing agencies.
- Actor label exactly as written by the source.
- Country or government linkage exactly as written by the source.
- Strategic sector category, such as telecommunications, energy, transportation,
  water, health, finance, cloud/data centers, defense industrial base, space
  services, election systems, or government networks.
- High-level activity type, such as espionage, pre-positioning, disruption,
  revenue generation, sanctions evasion, influence, or criminal proxy overlap.
- Defensive theme at category level only: patching, asset visibility, logging,
  identity hygiene, segmentation, secure-by-design procurement, end-of-life
  device replacement, and reporting pathways.

Products derived from this tracker should not extract:

- Commands, scripts, queries, exploit chains, file paths, hashes, IP addresses,
  domains, email addresses, YARA/Sigma/Snort content, malware execution steps,
  vulnerable-product lists, or CVE-level exploitation detail.
- Victim names, provider architecture, network diagrams, lawful-intercept
  detail, device inventories, facility dependencies, or operational timelines
  unless a public strategic legal record makes a narrow reference necessary.
- Sanctions-compliance advice, evasion techniques, cryptocurrency laundering
  detail, or exchange/platform targeting.

## Source-Family Refresh Queue

| Priority | Refresh lane | Primary source families | Output |
| --- | --- | --- | --- |
| Done | PRC APT/Typhoon label crosswalk | FBI China cyber overview, CISA/NSA/FBI advisories, DOJ, Treasury/OFAC, State/RFJ, FCC/Senate, allied cyber centers, existing PRC cyber packet | Alias/source-class table plus advisory-refresh queue without technical detail |
| Done | Russia state cyber packet | DOJ NSD, Treasury/OFAC, State/RFJ, UK/NCSC, CISA/NSA/FBI advisory routes, Canada Cyber Centre, ASD/ACSC, NATO/EU | Russia actor-source packet separating GRU, FSB, queued SVR, war, sanctions, advisory, and allied-warning evidence |
| 1 | Iran cyber packet | FBI Iran cyber overview, CISA/NSA/FBI advisories, DOJ NSD, Treasury/OFAC, State/RFJ, DHS/CISA ICS routes, allied/regional official sources | Iranian actor-source packet separating government-sponsored, IRGC-linked, hacktivist, ransomware, influence, and infrastructure lanes |
| 2 | DPRK cyber-finance packet | FBI/IC3, CISA/NSA/FBI advisories, DOJ NSD, Treasury/OFAC, State/RFJ, UN, ROK/Japan/allied cyber centers | DPRK actor-source packet tying cyber-finance, IT-worker, sanctions, and weapons-funding context without financial or technical procedure |
| 3 | Allied cyber-center crosswalk | UK NCSC, Canada Cyber Centre, ASD/ACSC, New Zealand NCSC, Japan cyber routes, NATO/EU cyber routes | Allied source register update and country/source-class crosswalk for state-actor cyber warnings |
| 4 | Commercial/research intake rule | Major threat-intelligence vendors, research institutions, telecom/sector reports, academic work | Source-class standard for using nonofficial APT aliases without laundering them into official attribution |

## Update Triggers

- CISA, NSA, FBI, or allied agencies publish a major joint advisory tied to a
  state actor, APT label, critical infrastructure, telecommunications, election
  systems, ICS/OT, cloud identity, or defense industrial base.
- DOJ announces a cyber legal action involving foreign government direction,
  contractors, intelligence services, sanctions evasion, cyber-enabled theft, or
  state-crime overlap.
- Treasury/OFAC or State/RFJ publishes a cyber designation, reward notice, or
  cyber-related sanctions action.
- FBI updates country cyber overview pages or IC3 publishes a new annual report.
- ODNI, DHS, or DoD publishes a new public threat assessment with cyber actor
  language.
- Allied cyber centers publish a coordinated state-actor advisory or a national
  cyber threat report with actor-source relevance.
- A major private-sector APT report introduces or changes an alias that appears
  likely to affect official-source products, requiring source-class review.

## Open Gaps

- Iran and DPRK do not yet have dedicated WARLOCK-INDEX cyber source packets
  equivalent to the PRC cyber packet; Russia now has a first state-cyber source
  packet but still needs SVR/APT29 and advisory metadata follow-ons.
- APT aliases are currently scattered across official advisories, law-enforcement
  records, sanctions, allied warnings, and commercial research. They need a
  dated label crosswalk before broad use in assessments.
- Allied cyber-center source families are present across country packets but
  need a cyber-specific crosswalk.
- Commercial threat-intelligence sources need a source-class rule before they
  are used to fill actor aliases or behavior summaries.
- Cyber and space overlap remains linked in the category sweep, but the
  immediate operator-directed build lane is cyber/APT/state actors.

## Cross References

- [Global Cyber And Critical Infrastructure Strategic Baseline](../../assessments/technology-cyber-space/2026-06-13T0129Z-global-cyber-critical-infrastructure-strategic-baseline.md)
- [Cyber And Critical Infrastructure Explainer](../explainers/2026-06-18T1056Z-cyber-critical-infrastructure-explainer.md)
- [PRC Cyber And Critical Infrastructure Defensive Source Packet](../source-packets/indo-pacific-adversary-posture/2026-06-14T1956Z-prc-cyber-critical-infrastructure-defensive-source-packet.md)
- [Salt Typhoon And Telecommunications Defensive Source Note](../source-packets/indo-pacific-adversary-posture/2026-06-17T2106Z-salt-typhoon-telecommunications-defensive-source-note.md)
- [PRC APT/Typhoon Label Crosswalk And Advisory Refresh Source Packet](../source-packets/indo-pacific-adversary-posture/2026-06-18T1213Z-prc-apt-typhoon-label-crosswalk-source-packet.md)
- [Russia State Cyber Source Packet](../source-packets/defensive-cyber-space/2026-06-20T0035Z-russia-state-cyber-source-packet.md)
- [Official Threat Source Collection Tracker](2026-06-13T0600Z-official-threat-source-collection-tracker.md)
- [Current Category Source Sweep Tracker](2026-06-18T1049Z-current-category-source-sweep-tracker.md)
- [Official U.S. Intelligence And Law Enforcement Source Register](../../source-registers/us-intelligence-law-enforcement.md)
- [Allied And Multilateral Source Register](../../source-registers/allied-multilateral.md)
- [Coverage Map](../coverage-map.md)
- [Global Actor-Domain Assimilation Matrix](../global-assimilation/2026-06-13T0049Z-global-actor-domain-assimilation-matrix.md)

## Source Base

- FBI, Cyber: `https://www.fbi.gov/investigate/cyber`
- FBI, Cyber Threat Overview: China:
  `https://www.fbi.gov/investigate/cyber/cyber-threat-overview-china`
- FBI, Cyber Threat Overview: Iran:
  `https://www.fbi.gov/investigate/cyber/cyber-threat-overview-iran`
- CISA, Cybersecurity Advisories:
  `https://www.cisa.gov/news-events/cybersecurity-advisories`
- NSA, Cybersecurity Advisories and Guidance:
  `https://www.nsa.gov/Press-Room/Cybersecurity-Advisories-Guidance/`
- State Department Rewards for Justice, Foreign Malicious Cyber Activity Against
  U.S. Critical Infrastructure:
  `https://rewardsforjustice.net/rewards/foreign-malicious-cyber-activity-against-u-s-critical-infrastructure/`
- Canadian Centre for Cyber Security, Alerts and Advisories:
  `https://www.cyber.gc.ca/en/alerts-advisories`
- New Zealand NCSC, News and Alerts routing:
  `https://www.ncsc.govt.nz/news/`
