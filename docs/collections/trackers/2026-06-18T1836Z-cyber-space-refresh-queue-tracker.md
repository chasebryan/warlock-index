# Cyber And Space Refresh Queue Tracker

**UNCLASSIFIED//OPEN SOURCE**

**Tracker ID:** WI-TRK-CYBER-SPACE-2026-0001

**Prepared UTC:** 2026-06-18T18:36:00Z

**Information cutoff UTC:** 2026-06-18T18:36:00Z

**Source base:** Defensive cyber and space source register, current technology/cyber/space assessments, existing PRC cyber and space packets, and public advisory source lanes.

**Analytic confidence:** Moderate. Queue structure is stable, but source status changes rapidly.

**Topics:** cyber; space; critical infrastructure; telecommunications; source refresh

**Actors:** CISA; NSA; FBI; NIST; MITRE; USSF; USSPACECOM; NCSC-UK; ACSC; ENISA; CERT-EU

**Source classes:** Official U.S.; Allied official; Vendor advisory; Vulnerability database; Standards; Research; Space domain awareness

**Freshness status:** Watch

**Last source check UTC:** 2026-06-18T18:36:00Z

**Next refresh UTC:** 2026-06-25T18:36:00Z

**Caveat tags:** current-watch; defensive-cyber-only; source-lag; commercial-data-limit

**Related products:** WI-SR-CYBER-SPACE-2026-0001; WI-SP-CYBER-2026-0001

**Safety boundary:** Refresh queue only. Excludes exploit steps, target selection, collection tasking, offensive cyber procedure, or space targeting support.

## Queue

| Priority | Lane | Action | Output |
| --- | --- | --- | --- |
| Done | Russia state cyber source packet | Convert official Russia cyber legal, reward, sanctions, advisory, and allied-warning routes into a source packet | Russia actor-source packet with technical material excluded. |
| 1 | CISA KEV and advisories | Weekly source check and metadata extraction | Defensive cyber tracker row or source note. |
| 1 | NSA cybersecurity advisories | Capture new guidance and joint advisories | Source packet update with defensive caveat. |
| 2 | NIST NVD and MITRE | Refresh CVE/CWE/ATT&CK taxonomy references | Taxonomy crosswalk row without procedure reproduction. |
| 2 | Vendor advisories | Link mitigation source of record for high-profile public advisories | Source note with vendor-source caveat. |
| 2 | Telecom resilience | Track public Salt Typhoon and telecom advisory updates | Cyber/telecom source packet update. |
| 3 | Space posture | Refresh USSF, USSPACECOM, NASA/NOAA, SWF, and CSIS source lanes | Space source packet or caveat note. |
| 3 | Allied cyber centers | Monthly NCSC-UK, ACSC, Canadian Centre, ENISA, CERT-EU sweep | Allied cyber source cross-check. |

## Acceptance Criteria

- Every queue item has a product ID when converted into a source note, packet, or tracker.
- Cyber entries carry `defensive-cyber-only`.
- Space and map reference entries carry precision and non-targeting caveats when applicable.
- The generated JSON and CSV exports include freshness and caveat fields for the product.
