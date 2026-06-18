# Cyber And Critical Infrastructure Source Crosswalk

**UNCLASSIFIED//OPEN SOURCE**

**Matrix ID:** WI-MAT-CYBER-CI-2026-0001

**Prepared UTC:** 2026-06-18T18:38:00Z

**Information cutoff UTC:** 2026-06-18T18:38:00Z

**Source base:** Defensive cyber source register, cyber source lane packet, official threat source baseline, and cyber/critical infrastructure assessment.

**Analytic confidence:** High for source-family alignment; moderate for completeness because advisory lanes change frequently.

**Topics:** cyber; critical infrastructure; telecommunications; source crosswalk

**Actors:** CISA; NSA; FBI; NIST; MITRE; MS-ISAC; sector risk management agencies; allied cyber centers; vendors

**Source classes:** Official U.S.; Allied official; Vulnerability database; Standards; Vendor advisory; Sector source

**Freshness status:** Watch

**Last source check UTC:** 2026-06-18T18:38:00Z

**Next refresh UTC:** 2026-06-25T18:38:00Z

**Caveat tags:** current-watch; defensive-cyber-only; source-lag; implementation-gap

**Related products:** WI-SR-CYBER-SPACE-2026-0001; WI-SP-CYBER-2026-0001; WI-TRK-CYBER-SPACE-2026-0001

**Safety boundary:** Defensive crosswalk only. Excludes exploit reproduction, target selection, scanning instructions, or operational cyber activity.

## Crosswalk

| Analytic question | Best first source | Cross-check | Output type |
| --- | --- | --- | --- |
| Is a publicly known vulnerability being actively exploited? | CISA KEV | Vendor advisory, NVD | Tracker row with defensive caveat. |
| What is the official U.S. mitigation source? | CISA or NSA advisory | Vendor advisory | Source note or source packet update. |
| Which sector is affected? | CISA, sector agency, vendor advisory | SRMA and industry source | Assessment caveat or sector row. |
| How should the behavior be categorized? | MITRE ATT&CK, CWE, NVD | CISA advisory | Taxonomy label without procedures. |
| Is the issue criminal, state-linked, or mixed? | FBI IC3, DOJ, CISA, NSA | Allied cyber center and vendor reporting | Source-routed actor caveat. |
| Is telecommunications infrastructure implicated? | CISA, FCC, NSA, allied advisories | Vendor and sector reporting | Cyber/telecom watch product. |
| Is a space or satellite dependency relevant? | USSF, USSPACECOM, NASA/NOAA | SWF, CSIS, public catalog references | Space resilience source note. |

## Reuse Rule

When a row feeds another product, carry forward the source class, caveat tag, and freshness status. Do not carry over technical details that would reproduce exploitation or offensive procedure.

