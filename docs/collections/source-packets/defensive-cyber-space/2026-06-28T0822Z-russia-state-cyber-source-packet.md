# Russia State Cyber Source Packet

**UNCLASSIFIED//OPEN SOURCE**

**Source Packet ID:** WI-SOURCEPACKET-RUSSIA-CYBER-2026-0001

**Prepared UTC:** 2026-06-28T08:22:00Z

**Information cutoff UTC:** 2026-06-28T08:22:00Z

**Source base:** FBI Cyber hub and alerts; IC3/FBI/CISA Russian Intelligence
Services commercial messaging application public service announcements dated
2026-03-20 and 2026-06-26; FBI GRU 29155 Cyber Actors wanted page; DOJ
Operation MEDUSA / Snake disruption release; UK NCSC Star Blizzard advisory;
CISA Russian cyber advisory routes; NSA cybersecurity advisory route;
Treasury/OFAC cyber-sanctions route; State Rewards for Justice foreign
malicious cyber activity route; existing WARLOCK-INDEX cyber nation-state
actor/APT tracker, defensive cyber source lane packet, global cyber baseline,
Russia actor profile, official U.S. intelligence and law-enforcement source
register, allied/multilateral source register, coverage map, and global
actor-domain assimilation matrix.

**Analytic confidence:** High for captured FBI, IC3, DOJ, and UK NCSC page
identity and source-class separation. Moderate for completeness of CISA, NSA,
Treasury/OFAC, State/RFJ, Canada, Australia, New Zealand, NATO, and EU page
coverage because several advisory or status routes require a later
page-level refresh or were access-caveated in this browser pass.

**Purpose:** Create a safe Russia state-cyber source packet that separates
Russian Intelligence Services, GRU, FSB, SVR, legal-action, disruption,
sanctions/reward, allied-warning, and commercial/research source lanes without
turning state-actor cyber coverage into a technical playbook.

**Boundary:** Strategic defensive source organization only. This packet does
not provide exploit steps, commands, indicators, malware procedures, phishing
templates, credential workflows, vulnerability lists, victim lists, targeting
support, infrastructure mapping, sanctions advice, sanctions-evasion guidance,
incident-response playbooks, or operational cyber guidance.

## Bottom Line

The Russia state-cyber lane is now packetized. The current official-source
record supports four safe extraction lanes:

1. **Russian Intelligence Services / commercial messaging applications:**
   IC3/FBI/CISA issued a March 20, 2026 PSA and a June 26, 2026 update. Treat
   this as a current FBI/CISA public warning lane and extract only issuer,
   date, actor wording, high-level target category, and defensive source class.
2. **GRU Unit 29155 / destructive and disruptive cyber case lane:** The FBI
   wanted page and linked State/RFJ reward route support a legal/reward source
   lane for GRU Unit 29155. Keep individual names tied to the public legal
   source event; do not build private-person dossiers.
3. **FSB / Turla / Snake disruption lane:** DOJ's Operation MEDUSA release
   supports a law-enforcement disruption source lane for the FSB-linked Snake
   network. Do not copy malware mechanics or court-authorized remediation
   details into WARLOCK-INDEX products.
4. **FSB / Star Blizzard allied-warning lane:** UK NCSC and partner agencies
   provide an allied advisory route for Star Blizzard / FSB Centre 18
   source-class treatment. Extract actor label, issuer list, date, and broad
   sector category only.

This packet does not complete every Russia cyber source route. It creates the
safe source-class anchor needed before later products use GRU, SVR, FSB,
Sandworm, APT28, APT29, Star Blizzard, Turla, or related labels.

## Source Ledger

| Source family | Publisher | Date or access state | Primary value | Limits |
| --- | --- | --- | --- | --- |
| FBI Cyber hub and alert index | Federal Bureau of Investigation | Accessed 2026-06-28 | FBI public cyber mission framing, alert chronology, and country-level source routing for Russia, China, Iran, North Korea, ransomware, and cybercrime | Hub route, not a complete actor dossier; do not extract IOCs or procedural guidance |
| RIS commercial messaging application update | IC3 / FBI / CISA | Published 2026-06-26 | Current official warning update for Russian Intelligence Services activity against commercial messaging application accounts | No phishing samples, account-takeover mechanics, recovery-key detail, or user-specific targeting detail extracted |
| RIS commercial messaging application baseline PSA | IC3 / FBI / CISA | Published 2026-03-20 | Baseline source for the March 2026 FBI/CISA public warning lane and actor wording | Use only high-level source metadata and actor/target-category framing |
| GRU 29155 Cyber Actors wanted page | FBI; State/RFJ referenced | Accessed 2026-06-28; arrest warrants noted as 2024-08-07 | Legal/reward source lane for GRU Unit 29155 cyber actors and public wanted-record status | Public allegations and reward route only; avoid personal dossiers, target lists, or technical attack detail |
| Operation MEDUSA / Snake disruption release | Department of Justice | Published 2023-05-09; updated 2025-02-06 | Law-enforcement disruption source for FSB-linked Snake/Turla cyberespionage source treatment | Do not reproduce malware operation, tool mechanics, remote access detail, or remediation procedure |
| Star Blizzard allied advisory | UK NCSC with U.S., Five Eyes, and partner agencies | Published 2023-12-07 | Allied-warning source lane for Star Blizzard and FSB Centre 18 source-class handling | Do not extract MITRE technique rows, phishing infrastructure details, or spear-phishing procedure |
| CISA Russian cyber advisory routes | CISA and joint partners | Direct advisory fetch returned 403 in this pass | Required follow-on route for exact CISA advisory titles, co-seal agency lists, dates, and actor labels | Treat as queued route until page-level capture succeeds |
| NSA cybersecurity advisory route | National Security Agency | Active source-family route | Joint advisory and defensive guidance cross-check for Russian state cyber coverage | Use issuer/title/date only unless a later safe extraction pass is created |
| Treasury/OFAC cyber sanctions route | Treasury / OFAC | Active source-family route | Cyber-related legal/status source for Russian cyber sanctions and designations | No sanctions advice, evasion, wallet/account tracing, or compliance workflow |
| State Rewards for Justice cyber route | Department of State / Rewards for Justice | Active source-family route | Reward-source route for foreign malicious cyber activity, including Russia-related records where captured | Do not reproduce reporting-channel mechanics or investigative guidance |
| Allied cyber-center routes | UK NCSC, Canada Cyber Centre, ASD/ACSC, New Zealand NCSC, NATO/EU where captured | Active source-family route | Cross-check allied actor labels and co-seal advisory status | Allied labels are not interchangeable with U.S. legal, sanctions, or FBI source language |

## Russia Cyber Label Crosswalk

| Label or source phrase | First source captured in this packet | Source class | WARLOCK-INDEX treatment | Follow-on control |
| --- | --- | --- | --- | --- |
| Russian Intelligence Services / RIS | IC3/FBI/CISA March and June 2026 PSAs | Official public warning | Current source lane for commercial messaging application targeting at strategic level | Extract only issuer, date, actor wording, and high-level audience/sector category |
| GRU Unit 29155 | FBI wanted page; State/RFJ reward route | Legal/reward source lane | Public legal-source route for GRU-linked cyber allegations and reward status | Keep named persons tied to official wanted/reward records only |
| FSB / Turla / Snake | DOJ Operation MEDUSA release | Law-enforcement disruption source | FSB-linked cyberespionage and disruption-source lane | Do not reproduce malware or FBI tool mechanics |
| Star Blizzard / FSB Centre 18 | UK NCSC advisory with partner agencies | Allied official advisory | Allied-warning source lane for FSB-linked spear-phishing source treatment | Do not normalize all aliases until allied crosswalk is complete |
| SVR / APT29 / cloud or software supply-chain labels | Existing tracker queue; CISA/NSA/FBI routes pending | Queued official/advisory source route | Russia state-cyber follow-on lane, not yet packet-complete here | Capture exact advisory titles and issuer lists before using labels broadly |
| Sandworm / APT28 / GRU-linked labels | Existing tracker queue; CISA/DOJ/allied routes pending | Queued official/advisory/legal source route | Russia state-cyber follow-on lane with Ukraine-war/disruption caveat | Keep Ukraine-war, destructive/disruptive, espionage, and sanctions evidence separated |

## Extraction Rules

Products derived from this packet may extract:

- Publisher, title, date, access date, source class, issuing agencies, and
  actor label exactly as written.
- Broad source lane: public warning, legal action, disruption, sanctions,
  reward notice, allied advisory, or research/commercial support.
- High-level activity category: espionage, disruptive activity, public
  warning, messaging-app account compromise, sanctions/reward status,
  Ukraine-war adjacent activity, or allied warning.
- High-level sector or audience category where the source itself uses it.

Products derived from this packet must not extract:

- Commands, scripts, hashes, IP addresses, domains, URLs from phishing
  samples, exploit chains, malware behavior sequences, infrastructure
  operation, TTP tables, detection signatures, or remediation playbooks.
- Victim names, provider architecture, network diagrams, account-recovery
  procedures, credential or recovery-key workflows, facility dependencies, or
  operational timelines.
- Sanctions-compliance advice, evasion techniques, investigative direction,
  wallet/account tracing, or reporting-channel mechanics.

## Assimilation Notes

- Keep GRU, SVR, FSB, RIS, Star Blizzard, Turla, Snake, APT28, APT29, and
  Sandworm labels source-classed until a dated source packet captures who used
  the label and in what context.
- Separate public-warning records from legal actions, sanctions, reward
  notices, and allied advisories.
- Treat the June 26, 2026 FBI/CISA PSA as a current source update, not as a
  reason to revise every Russia assessment.
- Treat the CISA 403 condition in this pass as an access caveat, not as a
  claim that the advisory does not exist.

## Follow-On Queue

| Product | Purpose | Primary source families |
| --- | --- | --- |
| Russia CISA/NSA/FBI Advisory Metadata Refresh | Capture exact advisory titles, dates, co-seal agencies, actor labels, and source-access notes for GRU, SVR, FSB, Sandworm, APT28, APT29, and RIS source lanes | CISA, NSA, FBI, IC3, Cyber Command/CNMF where public |
| Russia Cyber Sanctions And Reward Refresh | Separate Treasury/OFAC designations, State/RFJ reward records, DOJ actions, and court records | Treasury, OFAC, State/RFJ, DOJ NSD, Federal Register where needed |
| Allied Russia Cyber Crosswalk | Capture UK, Canada, Australia, New Zealand, NATO, and EU labels before broad alias normalization | UK NCSC, Canada Cyber Centre, ASD/ACSC, New Zealand NCSC, NATO/EU |
| Ukraine-War Cyber Source Treatment Note | Separate Russia-Ukraine war cyber source events from broader Russian intelligence-service and criminal-overlap lanes | DOJ, CISA, NSA, FBI, State, NATO, EU, Ukraine official/public routes |

## Information Gaps

- CISA Russian advisory pages require later page-level capture because direct
  advisory fetches returned a 403 condition in this pass.
- SVR/APT29, APT28, Sandworm, and some GRU advisory routes still need exact
  title/date/issuer capture before broad use.
- Treasury/OFAC and State/RFJ Russia-specific cyber routes require a later
  legal/status refresh before designations or reward records are treated as
  complete.
- Commercial threat-intelligence aliases remain outside this packet unless a
  later commercial/research source-class rule admits them with explicit
  source treatment.

## Cross References

- [Cyber Nation-State Actor And APT Source Tracker](../../trackers/2026-06-18T1154Z-cyber-nation-state-actor-source-tracker.md)
- [Weekly Current Source Sweep Tracker](../../trackers/2026-06-28T0822Z-weekly-current-source-sweep-tracker.md)
- [Defensive Cyber Source Lane Packet](2026-06-18T1833Z-defensive-cyber-source-lane-packet.md)
- [Global Cyber And Critical Infrastructure Strategic Baseline](../../../assessments/technology-cyber-space/2026-06-13T0129Z-global-cyber-critical-infrastructure-strategic-baseline.md)
- [Russia Actor Profile](../../actor-profiles/russia.md)
- [Official U.S. Intelligence And Law Enforcement Source Register](../../../source-registers/us-intelligence-law-enforcement.md)
- [Defensive Cyber And Space Source Register](../../../source-registers/defensive-cyber-space.md)
- [Allied And Multilateral Source Register](../../../source-registers/allied-multilateral.md)
- [Coverage Map](../../coverage-map.md)
- [Global Actor-Domain Assimilation Matrix](../../global-assimilation/2026-06-13T0049Z-global-actor-domain-assimilation-matrix.md)

## Source Base

- FBI, *Cyber*:
  `https://www.fbi.gov/investigate/cyber`
- FBI, *Cyber Alerts*:
  `https://www.fbi.gov/investigate/cyber/alerts`
- IC3 / FBI / CISA, *Russian Intelligence Services Continue to Target
  Commercial Messaging Applications*:
  `https://www.ic3.gov/PSA/2026/PSA260626`
- IC3 / FBI / CISA, *Russian Intelligence Services Target Commercial
  Messaging Application Accounts*:
  `https://www.ic3.gov/PSA/2026/PSA260320`
- FBI, *GRU 29155 Cyber Actors*:
  `https://www.fbi.gov/wanted/cyber/gru-29155-cyber-actors`
- U.S. Department of Justice, *Justice Department Announces Court-Authorized
  Disruption of Snake Malware Network Controlled by Russia's Federal Security
  Service*:
  `https://www.justice.gov/archives/opa/pr/justice-department-announces-court-authorized-disruption-snake-malware-network-controlled`
- UK National Cyber Security Centre, *Russian FSB cyber actor Star Blizzard
  continues worldwide spear-phishing campaigns*:
  `https://www.ncsc.gov.uk/news/star-blizzard-continues-spear-phishing-campaigns`
- CISA, cybersecurity advisories source family:
  `https://www.cisa.gov/news-events/cybersecurity-advisories`
- NSA, cybersecurity advisories and guidance source family:
  `https://www.nsa.gov/Press-Room/Cybersecurity-Advisories-Guidance/`
- OFAC, cyber-related sanctions source route:
  `https://ofac.treasury.gov/sanctions-programs-and-country-information/sanctions-related-to-significant-malicious-cyber-enabled-activities`
- State Department Rewards for Justice, *Foreign Malicious Cyber Activity
  Against U.S. Critical Infrastructure*:
  `https://rewardsforjustice.net/rewards/foreign-malicious-cyber-activity-against-u-s-critical-infrastructure/`
