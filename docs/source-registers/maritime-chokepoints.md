# Maritime Chokepoints Source Register

**UNCLASSIFIED//OPEN SOURCE**

**Source Register ID:** WI-SOURCE-REGISTER-MARITIME-2026-0001

**Prepared UTC:** 2026-06-13T05:20:00Z

**Information cutoff UTC:** 2026-06-13T05:20:00Z

**Purpose:** Organize source families for maritime chokepoint analysis across
Red Sea/Suez, Hormuz, Malacca/Singapore, Panama, Black Sea, and Arctic lanes.

**Boundary:** This register supports strategic open-source research only. It
does not provide recommendations, route selection, vessel movement detail,
operational planning, escort guidance, targeting support, or tactical
instructions.

## Use Rules

1. Separate official, multilateral, industry, research, and media sources.
2. Treat canal and port statistics as infrastructure data, not proof of
   motive for individual commercial decisions.
3. Treat insurance and broker reporting as commercial-market evidence, not as
   official government assessment.
4. Keep live movement data, sensitive operational details, and route-selection
   logic out of Warlock-Index products.
5. Create dated source packets when a chokepoint lane gains enough sources for
   high-confidence analysis.

## Core Red Sea / Suez Sources

### UN Security Council Resolution 2722: Red Sea Maritime Security

- **Source class:** A
- **Publisher:** United Nations Security Council
- **Publication date:** 2024-01-10
- **Accessed UTC:** 2026-06-13T05:20:00Z
- **URL:** https://undocs.org/S/RES/2722(2024)
- **Use:** Legal-diplomatic baseline for the Security Council response to
  attacks against merchant and commercial vessels in the Red Sea, including
  freedom-of-navigation and commercial-vessel security framing.
- **Reliability note:** Authoritative for resolution text and diplomatic
  record. It does not independently quantify attack tempo, commercial loss, or
  military operations.

### Council Of The European Union Launch Of EUNAVFOR ASPIDES

- **Source class:** A
- **Publisher:** Council of the European Union
- **Publication date:** 2024-02-19
- **Accessed UTC:** 2026-06-13T05:20:00Z
- **URL:** https://www.consilium.europa.eu/en/press/press-releases/2024/02/19/security-and-freedom-of-navigation-in-the-red-sea-council-launches-eunavfor-aspides/
- **Use:** Allied and multilateral source for the European Union maritime
  security response to Houthi attacks in the Red Sea and adjacent approaches.
- **Reliability note:** Authoritative for EU Council public framing and
  mandate language. It is not an incident dataset or operational record.

### UNCTAD Review Of Maritime Transport 2024

- **Source class:** A
- **Publisher:** United Nations Trade and Development
- **Publication date:** 2024-10-22
- **Accessed UTC:** 2026-06-13T05:20:00Z
- **URL:** https://unctad.org/publication/review-maritime-transport-2024
- **Use:** Multilateral source for chokepoint vulnerability, Red Sea and Suez
  disruption, freight-rate effects, ton-mile demand, insurance costs, port
  congestion, emissions, and vulnerable-economy exposure.
- **Reliability note:** Authoritative for UNCTAD public analysis and data
  presentation. It contains policy language; Warlock-Index uses it for data
  and framing without adopting recommendations.

### Suez Canal Authority Annual Navigation Reports

- **Source class:** A
- **Publisher:** Suez Canal Authority
- **Publication date:** Annual reports for 2024 and 2025
- **Accessed UTC:** 2026-06-13T05:20:00Z
- **URL:** https://www.suezcanal.gov.eg/English/Navigation/Pages/NavigationStatistics.aspx
- **Use:** Official canal-operator source for vessel counts, net tonnage,
  monthly traffic, ship-type distribution, cargo direction, and annual
  navigation report downloads.
- **Reliability note:** Authoritative for Suez Canal Authority public
  statistics. Canal traffic does not independently prove shipper motive,
  insurance pricing, revenue effects, or final cargo delay.

### Federal Register Executive Order 14175: Designation Of Ansar Allah

- **Source class:** A
- **Publisher:** Federal Register / Executive Office of the President
- **Publication date:** 2025-01-31
- **Accessed UTC:** 2026-06-13T05:20:00Z
- **URL:** https://www.federalregister.gov/documents/2025/01/31/2025-02103/designation-of-ansar-allah-as-a-foreign-terrorist-organization
- **Use:** Public U.S. legal and policy framing for Ansar Allah, including
  designation context, Iran support language, Red Sea disruption, commercial
  vessel pressure, and global maritime-trade effects.
- **Reliability note:** Authoritative for the published executive order and
  Federal Register metadata. It is legal and policy framing, not neutral
  independent intelligence assessment.

### ODNI Annual Threat Assessment 2026

- **Source class:** A
- **Publisher:** Office of the Director of National Intelligence
- **Publication date:** 2026-03
- **Accessed UTC:** 2026-06-13T05:20:00Z
- **URL:** https://www.dni.gov/files/ODNI/documents/assessments/ATA-2026-Unclassified-Report.pdf
- **Use:** Public Intelligence Community source for Houthi resilience, Red
  Sea location, coercive leverage, Iran-linked regional network context, and
  broader strategic threat environment.
- **Reliability note:** Authoritative for public IC assessment framing. It
  omits sensitive detail and should not be overread for command relationships
  or operational specifics.

### Allianz Commercial Safety And Shipping Review 2025

- **Source class:** B
- **Publisher:** Allianz Commercial
- **Publication date:** May 2025
- **Accessed UTC:** 2026-06-13T05:20:00Z
- **URL:** https://commercial.allianz.com/news-and-insights/reports/shipping-safety.html
- **Use:** Industry source for marine insurance, shipping-loss trends,
  geopolitical risk, war cover, premium pressure, accumulation risk, and
  commercial maritime risk.
- **Reliability note:** Specialist insurance-industry source with useful risk
  framing. It reflects commercial market perspective and should be paired with
  official or multilateral sources for major judgments.

## Comparative Source Families

| Chokepoint lane | Priority source families | Current register status | Notes |
| --- | --- | --- | --- |
| Red Sea / Suez | UN, EU, ODNI, Federal Register, UNCTAD, Suez Canal Authority, insurance industry | Active source packet exists | Strongest current Warlock-Index lane |
| Strait of Hormuz | EIA, IEA, ODNI, State, Treasury, Gulf official sources, IMO, insurance industry | Queue | Needed for Iran maritime and energy exposure analysis |
| Malacca / Singapore | Singapore, Malaysia, Indonesia, ASEAN, UNCTAD, EIA/IEA, port authorities, insurance industry | Queue | Needed for Indo-Pacific trade, energy, and logistics concentration |
| Panama Canal | Panama Canal Authority, UNCTAD, climate agencies, trade datasets, insurance industry | Queue | Needed for climate-infrastructure and canal-capacity analysis |
| Black Sea | UN, Turkey, Ukraine, Russia, NATO, EU, grain and insurance sources | Queue | Needed for Russia-Ukraine maritime and food-security analysis |
| Arctic maritime routes | DoD Arctic Strategy, Canada, Norway, NATO, NORAD, Arctic Council sources, UNCTAD, insurance industry | Partial through Arctic products | Needs dedicated maritime transit and infrastructure packet |

## Extraction Fields

| Field | Why it matters | Example source family | Boundary |
| --- | --- | --- | --- |
| Legal-diplomatic framing | Establishes public international response and mandate language | UN, EU, national governments | No legal advice or operational authority inference |
| Canal and port statistics | Provides infrastructure traffic baseline | SCA, Panama Canal Authority, port authorities | No vessel-level movement analysis |
| Commercial shipping effects | Shows schedule, cost, ton-mile, and flow pressure | UNCTAD, shipping analytics | No route or commercial decision guidance |
| Insurance effects | Tracks risk pricing and confidence | Allianz, IUMI, Lloyd's-linked sources, P&I clubs | No proprietary data extraction or insurer advice |
| Actor pressure | Links state or nonstate behavior to chokepoint effects | ODNI, State, Treasury, UN, allied sources | No targeting or tactical analysis |
| Humanitarian logistics | Shows effects on aid, food security, and vulnerable economies | UN OCHA, WFP, IMO, NGOs | No movement planning |
| Energy and commodities | Tracks exposure for oil, LNG, grain, fertilizer, and fuels | EIA, IEA, UNCTAD, official energy sources | No market recommendations |

## Cross References

- [Red Sea Maritime Disruption Strategic Baseline](../assessments/middle-east/2026-06-13T0516Z-red-sea-maritime-disruption-strategic-baseline.md)
- [Red Sea Maritime Disruption Strategic Tracker](../collections/trackers/2026-06-13T0518Z-red-sea-maritime-disruption-strategic-tracker.md)
- [Maritime Chokepoint Strategic Assimilation Matrix](../collections/global-assimilation/2026-06-13T0519Z-maritime-chokepoint-strategic-assimilation-matrix.md)
- [Red Sea Maritime Economics And Insurance Source Packet](../collections/source-packets/red-sea-maritime-economics/2026-06-13T0258Z-red-sea-maritime-economics-insurance-source-packet.md)
- [Allied And Multilateral Source Register](allied-multilateral.md)
- [Official U.S. Sources](official-us.md)
- [Research And Media Source Register](research-and-media.md)
