# Defensive Cyber And Space Source Register

**UNCLASSIFIED//OPEN SOURCE**

**Source Register ID:** WI-SR-CYBER-SPACE-2026-0001

**Prepared UTC:** 2026-06-18T18:32:00Z

**Information cutoff UTC:** 2026-06-18T18:32:00Z

**Source base:** Official U.S. cybersecurity advisories, vulnerability databases, allied cyber centers, vendor advisories, standards bodies, space situational awareness references, and existing cyber/space products in the corpus.

**Analytic confidence:** High for source-family routing; moderate for completeness because cyber and space source lanes change frequently.

**Topics:** cyber; space; critical infrastructure; telecommunications; vulnerability disclosure; defensive sources

**Source classes:** Official U.S.; Allied official; Standards; Vendor advisory; Vulnerability database; Research; Space domain awareness

**Freshness status:** Watch

**Last source check UTC:** 2026-06-18T18:32:00Z

**Next refresh UTC:** 2026-06-25T18:32:00Z

**Caveat tags:** current-watch; defensive-cyber-only; source-lag; commercial-data-limit

**Safety boundary:** Defensive source register only. Excludes exploit steps, evasion, credential abuse, target selection, scanning tasking, or operational use.

## Use

Use this register to route defensive cyber, critical infrastructure, telecommunications, and space resilience research into reliable open-source lanes. It is intended for evidence management, watchlist construction, and source freshness review.

## Core Defensive Cyber Sources

| Source family | Primary use | Notes |
| --- | --- | --- |
| CISA Known Exploited Vulnerabilities Catalog | Vulnerability prioritization signal | Use for defensive exposure management context only. |
| CISA Cybersecurity Advisories | U.S. government alerting and mitigations | Prefer advisory text and linked vendor guidance over secondary summaries. |
| NSA Cybersecurity Advisories | Hardening, secure configuration, and joint advisory context | Use as defensive guidance source; do not transform into offensive procedures. |
| FBI Internet Crime Complaint Center | Cybercrime trend reporting | Useful for fraud, ransomware, BEC, and victimization trends. |
| FBI, DOJ, Treasury/OFAC, and State/RFJ cyber legal/status routes | Nation-state cyber source events, legal actions, sanctions/designations, and reward notices | Preserve source class and actor wording; do not provide sanctions advice, evasion guidance, tip-channel mechanics, or technical cyber detail. |
| NIST National Vulnerability Database | CVE metadata and CVSS context | Treat publication dates and enrichment lag as caveats. |
| MITRE ATT&CK and CWE | Technique and weakness taxonomy | Use for classification and defensive mapping, not procedure reproduction. |
| CIS Controls and MS-ISAC | Baseline controls and state/local/tribal/territorial context | Useful for defensive maturity and priority framing. |
| Vendor security advisories | Product-specific affected-version and mitigation record | Prefer vendor source of record for patch availability and version scope. |

## Allied And Multilateral Cyber Sources

| Source family | Primary use | Notes |
| --- | --- | --- |
| NCSC-UK | Allied advisories and guidance | Strong cross-check for PRC, Russia, ransomware, and critical infrastructure items. |
| ACSC Australia | Joint advisories and critical infrastructure guidance | Useful for Indo-Pacific allied defensive context. |
| Canadian Centre for Cyber Security | Allied advisories and baseline controls | Useful for Five Eyes and critical infrastructure cross-checking. |
| ENISA | EU threat landscape and policy context | Good for annual trend framing and sector risk categories. |
| CERT-EU | EU institutional cybersecurity advisories | Use for European institutional source routing. |
| NATO and EU cyber routes | Multilateral cyber policy, resilience, and allied-warning context | Use for source routing and strategic context; do not infer national attribution beyond the cited source language. |

## Space And Counterspace Public Sources

| Source family | Primary use | Notes |
| --- | --- | --- |
| U.S. Space Force and U.S. Space Command releases | Official posture and organizational updates | Good for public posture, not capability details beyond official release. |
| Space-Track and CelesTrak | Public orbital reference and catalog context | Use as reference data with licensing and precision caveats. |
| Secure World Foundation | Counterspace and space sustainability research | Useful for unclassified trend framing. |
| CSIS Aerospace Security Project | Space threat and policy analysis | Research source, not official source of record. |
| NASA and NOAA space weather sources | Space weather and civil space context | Useful for resilience and non-adversary disruption lanes. |

## Required Handling

Every cyber product that draws from this register should include:

- `Safety boundary: Defensive cyber source routing only. Excludes exploit steps, targeting, evasion, credential abuse, or operational tasking.`
- `Caveat tags: defensive-cyber-only` when cyber advisories, CVEs, or TTP taxonomies appear.
- `Freshness status: Watch` when vulnerability, incident, or advisory status is changing.
