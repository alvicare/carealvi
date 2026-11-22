# ALVI (Team 43) — Stakeholder Requirements Elicitation Interview Guide & Questionnaires
## Bilingual English & Sinhala Master Edition (ද්විභාෂා සංස්කරණය)

**Institution:** University of Westminster | Informatics Institute of Technology (IIT)  
**Module:** Agile Team Project (5COSC021W / 5COSC021C)  
**Institutional Ethics Clearance:** Ref #CS-43-2026 (`atp.ethics@iit.ac.lk`)  
**Retrospective Withdrawal Deadline:** 7 calendar days post-interview or prior to 20 November 2026  
**Data Retention & Security:** AES-256 encrypted repository; permanent deletion post-exam board (31 May 2027) under Sri Lanka PDPA No. 9 of 2022 & UK GDPR.  
**Traceability:** Chapter 1 (1.3 Problem Statement), Chapter 3 (3.7 Personas & User Stories), Chapter 4 (4.2 Onion Model & 4.7 FRs/NFRs), Chapter 5 (PDPA/GDPR Compliance).  
**Jira Traceability:** EPIC-3 (`SCRUM-25`), US-05 (`SCRUM-43`), ST-05.1 (`SCRUM-44`).  
**1-Hour Consultation Booking:** [Google Meet Calendar Booking](https://calendar.app.google/L2kHYD7m6tSSFTBs8)

---

## 1. Executive Orientation: The Problem & The Proposed Solution
### මූලික හැඳින්වීම: පවතින ගැටලුව සහ අපගේ තාක්ෂණික විසඳුම

> [!IMPORTANT]
> **Facilitator Briefing Note:** Before starting the interview, spend 2–3 minutes walking the stakeholder through the real-world problem and ALVI's proposed solution. This grounds the discussion and enables the participant to give targeted, practical feedback.

### A. The Real-World Problem (අභියෝගය සහ ගැටලුව)
1. **Elderly Living Alone & Daytime Solitude (වැඩිහිටියන් නිවෙස්වල තනිවීම):**  
   Sri Lanka's aging population is expanding rapidly, while adult children commute or work full-time, leaving elderly parents alone or unsupervised for 8–10 hours every day.  
   *(ශ්‍රී ලංකාවේ දරුවන් රැකියාවන් සඳහා දිනකට පැය 8-10ක් නිවසින් බැහැරව සිටීම නිසා වැඩිහිටි දෙමව්පියන් දිවා කාලයේදී කිසිවෙකුගේ රැකවරණයක් නොමැතිව සම්පූර්ණයෙන්ම තනිවීම.)*
2. **Medication Non-Adherence & Confusion (බෙහෙත් අමතක වීම සහ වැරදීම):**  
   Seniors managing multiple chronic conditions (hypertension, diabetes, heart disease) frequently skip doses, accidentally double-dose due to memory lapses, or swallow pills without adequate water, triggering avoidable acute hospitalizations.  
   *(අධික රුධිර පීඩනය, දියවැඩියාව, හෘද රෝග වැනි නිදන්ගත රෝග සඳහා දිනපතා පෙති වර්ග කිහිපයක් ගන්නා වැඩිහිටියන්ට වේලාවට බෙහෙත් ගැනීම අමතක වීම, වැරදීමකින් දෙවරක් ගැනීම, හෝ වතුර නොමැතිව පෙති ගිලීම නිසා රෝහල්ගත වීමට සිදුවීම.)*
3. **Domestic Slip/Fall Accidents & "The Long-Lie" (නිවසේදී සිදුවන වැටීම් සහ බිම වැටී සිටීම):**  
   Falls represent the #1 cause of accidental trauma for seniors. When an elder slips or falls while home alone, they often remain stranded on the floor for hours before anyone notices ('long-lie'), leading to hypothermia, dehydration, pressure ulcers, and high mortality.  
   *(වැඩිහිටියන් තනිව සිටින විට ලිස්සා ඇදවැටුණහොත් උදව්වක් නොමැතිව පැය ගණනාවක් බිම වැටී සිටීමට සිදුවීම නිසා බරපතල අතුරු ආබාධ සහ ජීවිත අවදානම් ඇතිවීම.)*
4. **Caregiver Anxiety vs. Elderly Independence (දරුවන්ගේ මානසික පීඩනය සහ වැඩිහිටියන්ගේ ස්වාධීනත්වය):**  
   Working adult children suffer constant anxiety during meetings, repeatedly placing check-up calls; in turn, elderly parents feel micromanaged, nagged, and stripped of their domestic dignity.  
   *(කාර්යාලයේ සිටින දරුවන් නිතර දුරකථනයෙන් විමසීම නිසා වැඩිහිටියන්ට තම නිදහස අහිමි වන අතර, ඇමතුමකට පිළිතුරු නොදුන් විට දරුවන් දැඩි බියට හා නොසන්සුන්තාවයට පත්වීම.)*
5. **Prohibitive Cost of Private Caregivers (පෞද්ගලික සාත්තු සේවක වියදම් අධික වීම):**  
   Hiring a private full-time home caregiver in Sri Lanka costs Rs. 60,000 to Rs. 100,000+ per month—an unsustainable ongoing expense for middle-class families.  
   *(පෞද්ගලික සාත්තු සේවකයෙකු (Home nurse) වෙනුවෙන් මසකට රු. 60,000 සිට 100,000කට වැඩි මුදලක් දැරීමට සිදුවීම සාමාන්‍ය පවුල්වලට ආර්ථික වශයෙන් දැරිය නොහැකි වීම.)*

---

### B. The Proposed ALVI Solution (අප යෝජනා කරන ALVI තාක්ෂණික විසඳුම)
1. **5-Cylinder Automated Pill Dispenser (P1):**  
   ALVI drives directly to the senior's chair at scheduled dose times, dispensing the exact pill counts from 5 segregated cylindrical chambers—eliminating confusion from loose blister packs.  
   *(නියමිත වේලාවට රොබෝවරයා වැඩිහිටියා වාඩිවී සිටින තැනටම පැමිණ, සිලින්ඩර 5කින් නියමිත පෙති සංඛ්‍යාව පමණක් කෝප්පයට ලබාදෙයි. පැකට් කැඩීම හෝ පෙති මාරුවීම සම්පූර්ණයෙන්ම වළක්වයි.)*
2. **Built-in Fresh Drinking Water Carrier (P1):**  
   Carries a fresh drinking water bottle directly beside the dispensing cup, so elderly individuals never have to risk a fall walking to the kitchen for a glass of water.  
   *(බෙහෙත් කෝප්පය අසලම පානීය ජල බෝතලයක් රඳවාගෙන පැමිණෙන බැවින්, වතුර වීදුරුවක් ගැනීමට කුස්සියට ගොස් ඇදවැටීමේ අවදානම නැති කරයි.)*
3. **3-Step Computer Vision & Sensor Intake Verification (P1):**  
   Goes beyond simple beeping boxes: (1) PIR detects hand placement under chute, (2) IR break-beam confirms pills fall into the cup, and (3) camera vision verifies the tablet is brought to the mouth—providing clinical proof of ingestion.  
   *(නිකම්ම සද්ද කරන පෙට්ටි මෙන් නොව: (1) අත තැබීම හඳුනාගැනීම, (2) පෙත්ත වැටීම තහවුරු කිරීම, සහ (3) කැමරාවෙන් පෙත්ත මුව වෙත ගෙනගිය බව තහවුරු කරගැනීම — එමඟින් බෙහෙත් ඇත්තටම බිව් බවට වෛද්‍යවරයාට සහ දරුවන්ට සාක්ෂි ලැබේ.)*
4. **Dual-Trigger Fall Detection & Voice Triage (P5):**  
   Fuses Smartwatch impact telemetry with robot camera body-pose analysis. If the senior remains motionless for 10 seconds, ALVI asks: *"Fall detected. Say cancel if you are okay."* If uncancelled within 5 seconds, ALVI automatically dials the caregiver's mobile phone.  
   *(ස්මාර්ට් ඔරලෝසුව සහ රොබෝ කැමරාව මඟින් වැටීමක් හඳුනාගෙන, තත්පර 10ක් නිසලව සිටීනම් 'ඔබට ගැටලුවක් නැත්නම් Cancel කියන්න' යැයි විමසයි. තත්පර 5ක් තුළ පිළිතුරක් නැතිනම් දරුවාගේ ජංගම දුරකථනයට ස්වයංක්‍රීයව කතා කරයි.)*
5. **Contactless Vitals Monitoring (P5):**  
   Measures wrist/forehead skin temperature in 0.5s without touching using an infrared sensor during pill pickup, and streams continuous resting heart rate (BPM) from a lightweight BLE smartwatch.  
   *(බෙහෙත් ගන්නා විට නොගෑවී නළලේ/මැණික්කටුවේ උෂ්ණත්වය තත්පර භාගයකින් මනින අතර, ස්මාර්ට් ඔරලෝසුව මඟින් හෘද ස්පන්දන වේගය (BPM) නිරන්තරයෙන් නිරීක්ෂණය කරයි.)*
6. **Safe Autonomous 2D LiDAR Mobility (P4):**  
   Equipped with 2D LiDAR navigation featuring Summon Mode (parks quietly at charging dock until called) and Follow Mode (trails behind at 1.2m–1.5m safe distance at a steady 0.4 m/s geriatric walking pace).  
   *(කාමරයට කැඳවූ විට පැමිණීම (Summon Mode) හෝ බාධක මගහරිමින් මීටර් 1.2–1.5ක ආරක්ෂිත දුරකින් වැඩිහිටියා පිටුපසින් සෙමින් ගමන් කිරීම (Follow Mode - 0.4 m/s වේගය).)*
7. **7-Screen Caregiver Web App & Hands-Free Video (P3 & Tier 4):**  
   Family members monitor real-time telemetry, pill stock, and room maps from their phone/PC, and can launch instant hands-free video calls through ALVI's speakerphone without requiring the parent to operate a touchscreen.  
   *(දරුවන්ට තම දුරකථනයෙන් බෙහෙත් තොරතුරු බැලිය හැකි අතර, වැඩිහිටියා කිසිදු බටනයක් නොඑබුවද රොබෝවරයා හරහා සෘජුවම වීඩියෝ ඇමතුම් මඟින් කතා කළ හැක.)*
8. **Locally Affordable Bill of Materials (BOM):**  
   Optimized for Sri Lankan homes with a local MVP build cost of Rs. 106,000–150,000 (laptop-assisted)—a one-time investment equivalent to just 1–2 months of nursing fees.  
   *(දේශීයව නිෂ්පාදනය කළ හැකි බැවින් (රු. 106,000–150,000) මාස එකක් හෝ දෙකක සාත්තු සේවක වියදමට සමාන එක්වරක් පමණක් වැයවන සාධාරණ ආයෝජනයකි.)*

---

## 2. Standard 60-Minute Interview Pacing & Ethical Protocol
### පැය 1ක සම්මුඛ පරීක්ෂණ සැලසුම සහ සදාචාරාත්මක පිළිවෙත්

| Time Block | Stage & Focus | Team 43 Action & Specification Deliverables |
| :--- | :--- | :--- |
| **Mins 00–05** | **1. Welcome & Ethical Consent**<br>ආචාර කිරීම සහ කැමැත්ත ලබාගැනීම | Greet participant as Team 43 (IIT / UoW), verify signed PDPA Informed Consent Form V2 (Clearance #CS-43-2026), explain 7-day retrospective withdrawal clause, and confirm consent for Google Meet recording (feeds Chapter 5 & Appendix B/C). |
| **Mins 05–20** | **2. Context, Routine & Pain Points**<br>දෛනික රටාව සහ පවතින ගැටලු | Ask open-ended conversational questions regarding daily schedule, medication habits, past emergencies, and emotional stressors (feeds Chapter 1 Problem Background & Chapter 3 Personas). |
| **Mins 20–45** | **3. Deep-Dive on ALVI Features**<br>ALVI විසඳුම් සහ නීති පරීක්ෂාව | Evaluate ALVI features: 5-cylinder pill dispenser, 3-step AI mouth-intake verification, built-in water bottle, fall detection (10s still + 5s voice cancel), vitals telemetry, and LiDAR navigation (feeds Chapter 4 FRs/NFRs). |
| **Mins 45–55** | **4. Live Screen Share & Feedback**<br>ප්‍රතිරූප සහ තිර පරීක්ෂාව | Share screen displaying ALVI 3D Model and Caregiver Web App wireframes (7 screens: Vitals, Pills, Map, Video, Alerts, Permissions) to capture live usability feedback (feeds Chapter 6 UI/UX & MoSCoW prioritization). |
| **Mins 55–60** | **5. Direct Quote & Wrap-Up**<br>සාරාංශ උපුටනය සහ අවසන් කිරීම | Capture a 1-sentence verbatim quote for the Persona Card, confirm preference for Option A (Named Credit) vs Option B (Strict Anonymity under PDPA Section 10), and thank participant. |

---

## 3. Questionnaire A: Doctors & Medical Specialists (1-Hour Guide)
### ප්‍රශ්නාවලිය A: වෛද්‍යවරුන් සහ විශේෂඥයින් සඳහා

**Target Onion Model Ring:** Ring 3 — Containing System (Clinical Experts & Medical Collaborators)  
**Primary ALVI Modules Validated:** P1 (5-Cylinder Dispenser & 3-Step Verification), P4 (Safe Gait Pace), and P5 (Vitals & Dual-Confirmed Fall Triage)

- **Q1. Elderly Patient Demographics & Daytime Solitude** `[Chapter 1 (Problem 1.3) & Persona 4 Context]`  
  *English:* In your clinical practice in Sri Lanka, roughly what percentage of elderly patients (aged 65+) live alone or spend long hours unsupervised while family members work? What major medical vulnerabilities do you observe among these solo seniors?  
  *සිංහල (වැඩිහිටි රෝගීන් දිවා කාලයේ තනිව සිටීම සහ පවතින අවදානම්):* ඔබගේ සායනික අත්දැකීම් අනුව, වයස අවුරුදු 65ට වැඩි රෝගීන්ගෙන් කොපමණ ප්‍රතිශතයක් දිවා කාලයේදී නිවෙස්වල තනිව හෝ අවධානයෙන් තොරව සිටිනවාද? එවැනි රෝගීන් මුහුණ දෙන ප්‍රධාන සෞඛ්‍ය අවදානම් මොනවාද?

- **Q2. Common Medication Mistakes at Home** `[Module P1 Dispenser Rationale & Chapter 4 FRs]`  
  *English:* From your clinical experience, what are the most frequent mistakes geriatric patients make when taking their daily oral medicines at home (e.g., completely forgetting doses, accidental double-dosing due to memory lapses, or taking pills without water)?  
  *සිංහල (දිනපතා බෙහෙත් ගැනීමේදී සිදුවන ප්‍රධාන වැරදි):* වැඩිහිටි රෝගීන් නිවසේදී දිනපතා බෙහෙත් ගැනීමේදී බහුලව සිදුකරන වැරදි මොනවාද — උදාහරණයක් ලෙස බෙහෙත් ගැනීම අමතක වීම, වැරදීමකින් දෙවරක් ගැනීම, හෝ වතුර නොමැතිව පෙති ගිලීම?

- **Q3. Health Repercussions of Missed Doses** `[Clinical Urgency & Escalation Rules]`  
  *English:* When an elderly patient with conditions like hypertension, diabetes, or heart disease misses their medication for 24 to 48 hours, what acute health complications typically follow?  
  *සිංහල (බෙහෙත් වේලක් හෝ දෙකක් මඟහැරුණු විට ඇතිවන බරපතල තත්ත්වයන්):* අධික රුධිර පීඩනය, දියවැඩියාව හෝ හෘද රෝග ඇති වැඩිහිටියෙකුට දිනක් හෝ දෙකක් බෙහෙත් වේල මඟහැරුණහොත් ඔවුන්ගේ සෞඛ්‍යයට කෙබඳු බරපතල බලපෑමක් ඇතිවිය හැකිද?

- **Q4. Domestic Falls & The Dangerous 'Long-Lie'** `[Module P5 Fall Detection & Chapter 1 Statistics]`  
  *English:* When an elderly patient is admitted following a domestic fall while alone at home, how long does it typically take before family discovers them? How does lying on the floor for extended hours affect their survival and recovery?  
  *සිංහල (නිවසේදී ඇදවැටීම් සහ දිගු වේලාවක් බිම වැටී සිටීමේ අතුරු ආබාධ):* වැඩිහිටියෙකු නිවසේදී තනිව සිටියදී ඇදවැටුණු විට, සාමාන්‍යයෙන් කෙනෙකුගේ පිහිට ලැබීමට කොපමණ වේලාවක් ගතවෙනවාද? එම ප්‍රමාදය (Long-lie) ඔවුන්ගේ ජීවිතයට සහ සුවය ලැබීමට කෙතරම් අහිතකර ලෙස බලපායිද?

- **Q5. Automated Timed Pill Dispensing (5 Compartments)** `[Module P1 Physical Carousel & Capacity]`  
  *English:* ALVI provides 5 separate cylindrical compartments to store and dispense exact oral pills on schedule. For an elderly Sri Lankan patient managing multiple chronic prescriptions, how would having pills brought straight to their chair improve daily adherence?  
  *සිංහල (සිලින්ඩර 5ක බෙහෙත් කළමනාකරණය සහ නියමිත වේලාවට ලබාදීම):* නියමිත වේලාවට රොබෝවරයෙකු විසින් නියමිත පෙති පමණක් රෝගියා වාඩිවී සිටින තැනටම රැගෙන ආවොත්, එය රෝගීන්ට දිනපතා බෙහෙත් නිවැරදිව ගැනීමට කොතරම් උපකාරී වේද?

- **Q6. Visual Ingestion Proof vs. Unverified Pillboxes** `[Module P1 Vision AI Intake Verification]`  
  *English:* Traditional pillboxes only register when a lid is opened. ALVI uses camera verification to confirm that the pill was brought to the mouth. From a medical standpoint, how valuable is visual confirmation that pills were actually swallowed?  
  *සිංහල (බෙහෙත් සැබවින්ම මුව වෙත ගෙනගිය බව තහවුරු කිරීමේ වටිනාකම):* නිකම්ම පෙට්ටිය ඇරියාද කියා බලනවාට වඩා, රෝගියා ඇත්තටම පෙත්ත මුව වෙත ගෙනගොස් ගිලින බව කැමරාවකින් තහවුරු කරගැනීම වෛද්‍යවරයෙකු ලෙස ඔබට කෙතරම් වැදගත්ද?

- **Q7. Safe Grace Window Before Alerting Caregivers** `[Module P1 Escalation Logic & Alert Fatigue]`  
  *English:* If a senior doesn't collect their medicine on time, what is a safe grace window (e.g., 15, 30, or 45 minutes) for gentle audio reminders before escalating an alert to their working family members?  
  *සිංහල (පවුලේ අයට දැනුම්දීමට පෙර ලබාදිය යුතු කාලය - Grace Window):* රෝගියා වේලාවට බෙහෙත් නොගත් විට, කාර්යාලයේ සිටින දරුවන්ට පණිවිඩයක් යැවීමට පෙර රොබෝවරයා මතක් කරමින් කොපමණ වේලාවක් (මිනිත්තු 15, 30 ආදී) රැඳී සිටිය යුතුද?

- **Q8. Fall Detection Protocol (Smartwatch + Camera + Voice Triage)** `[Module P5 Dual-Trigger Fall Rule]`  
  *English:* ALVI detects falls using smartwatch telemetry combined with robot camera pose analysis, asks 'Are you okay?', and dials family if uncancelled within 5 seconds. How effective is this protocol for rapid emergency response while preventing false alarms?  
  *සිංහල (වැටීම් හඳුනාගැනීම සහ වැරදි ඇඟවීම් වළක්වාගැනීම):* ස්මාර්ට් ඔරලෝසුව සහ කැමරාව මඟින් වැටීමක් හඳුනාගෙන, 'ඔබට කරදරයක් නැද්ද?' කියා විමසා, පිළිතුරක් නැතිනම් දරුවන්ට කතා කිරීමේ ක්‍රමය හදිසි අවස්ථාවකදී කෙතරම් සුදුසුද?

- **Q9. Vitals Monitoring Thresholds (Heart Rate & Temperature)** `[Module P5 Contactless Vitals & Webhooks]`  
  *English:* ALVI logs resting heart rate (BPM) via smartwatch and contactless skin temperature during pill pickups. What threshold changes in pulse or temperature should immediately trigger an urgent notification to family members?  
  *සිංහල (හෘද ස්පන්දන වේගය සහ උෂ්ණත්ව අනතුරු ඇඟවීමේ සීමාවන්):* ස්පර්ශයකින් තොරව උෂ්ණත්වය මැනීම සහ ස්පන්දන වේගය බැලීම මඟින්, පවුලේ අයට ක්ෂණිකව අනතුරු ඇඟවිය යුතු වෙනස්කම් මොනවාද?

- **Q10. Safe Robot Walking Pace Around Frail Elders** `[Module P4 LiDAR Navigation & Geriatric Gait]`  
  *English:* ALVI moves at a gentle walking speed (0.4 m/s) and keeps a 1.2–1.5 meter buffer using 2D LiDAR navigation. In your view, how safe is this speed and clearance around frail, slow-walking seniors?  
  *සිංහල (වැඩිහිටියන් සමඟ ගමන් කිරීමේ ආරක්ෂිත වේගය සහ දුර):* රොබෝවරයා වැඩිහිටියෙකු ඇවිදින ඉතා සෙමින් (තත්පරයට මීටර් 0.4ක්) සහ මීටර් 1.5ක ආරක්ෂිත දුරකින් ගමන් කිරීම, ඔවුන්ගේ සමබරතාවයට සහ ආරක්ෂාවට සුදුසුද?

- **Q11. Clinical Value of an Exportable 30-Day Health Summary** `[Chapter 6 UI/UX & Clinical Audit Trail]`  
  *English:* If a family brings a printed 30-day ALVI clinical report to your clinic—showing daily verified pill intake, missed dose events, and resting pulse trends—how would this assist your clinical decisions compared to relying on patient recall?  
  *සිංහල (දින 30ක සවිස්තරාත්මක සෞඛ්‍ය වාර්තාවක වෛද්‍යමය වටිනාකම):* දින 30ක් පුරා බෙහෙත් බිව් වේලාවන්, මඟහැරුණු දින සහ හෘද ස්පන්දන සටහන් ඇතුළත් සාරාංශ වාර්තාවක් සායනයට ගෙන ආවොත්, රෝගියාට ප්‍රතිකාර නියම කිරීමට එය ඔබට කෙසේ උපකාරී වේද?

- **Q12. One-Sentence Clinical Perspective Quote** `[Persona 4 Card Direct Verbatim Quote]`  
  *English:* In a single sentence, what is the single greatest medical benefit an autonomous, intake-verifying companion robot could bring to home healthcare in Sri Lanka?  
  *සිංහල (සාරාංශ වෛද්‍ය අදහස):* ශ්‍රී ලංකාවේ වැඩිහිටි සත්කාරය වෙනුවෙන් මෙවැනි සහකාර රොබෝවරයෙකුගෙන් ලැබෙන වටිනාම ප්‍රයෝජනය එක වාක්‍යයකින් පවසන්නේ නම් කුමක්ද?

---

## 4. Questionnaire B: Primary & Secondary Family Caregivers (1-Hour Guide)
### ප්‍රශ්නාවලිය B: පවුලේ රැකබලාගන්නන් සඳහා

**Target Onion Model Ring:** Ring 3 (Functional/Financial Buyer — Primary Caregiver) & Ring 2 (Operational Helper — Secondary Caregiver)  
**Primary ALVI Modules Validated:** Tier 4 Caregiver Web App (Screens 1–7), P1 (Stock & Missed Dose Alerts), P3 (WebRTC Calls & Permissions), BOM Affordability

- **Q1. Workday Routine & Distance from Aging Parents** `[Persona 1 (Nuwan) Background Context]`  
  *English:* Can you share what a typical working day looks like for you and your aging parent? How far away do you live or work, and what is your parent's living arrangement while you are away?  
  *සිංහල (ඔබගේ රැකියා දිනචරියාව සහ දෙමව්පියන්ගෙන් ඇති දුර):* ඔබගේ සාමාන්‍ය දවස ගෙවෙන්නේ කෙසේද? ඔබ රැකියාවේ සිටින විට දෙමව්පියන්ගෙන් කොපමණ දුරකින්ද සිටින්නේ, සහ ඒ වේලාවට නිවසේ ඔවුන් සමඟ කවුරුන් හෝ සිටිනවාද?

- **Q2. Workplace Anxiety & Unanswered Phone Calls** `[Chapter 1 Pain Points & Caregiver Stress]`  
  *English:* How often do you feel the need to call home to check on your parent while working, and what thoughts go through your mind if they don't answer right away?  
  *සිංහල (දිනපතා දුරකථන ඇමතුම් සහ පිළිතුරු නොලැබෙන විට ඇතිවන බිය):* රැකියාවේ සිටින විට දෙමව්පියන්ගේ සුවදුක් බැලීමට ඔබ කී වතාවක් කතා කරනවාද? ඔවුන් ක්ෂණිකව පිළිතුරු නොදුන් විට ඔබට කෙබඳු බියක් හෝ නොසන්සුන්තාවයක් දැනෙනවාද?

- **Q3. Organizing Daily Medicines & Past Mix-Ups** `[Module P1 Dispenser Rationale]`  
  *English:* How do you currently organize your parent's daily medications (e.g., pill organizers, written notes, alarms)? Have you ever discovered that pills were missed, mixed up, or accidentally taken twice?  
  *සිංහල (දැනට ඖෂධ කළමනාකරණය කරන ආකාරය සහ අත්දැකීම්):* දැනට ඔබ දෙමව්පියන්ගේ බෙහෙත් පිළියෙළ කරන්නේ කෙසේද? බෙහෙත් ගැනීම අමතක වීම හෝ පෙති මාරුවීම වැනි අවස්ථාවන්ට ඔබ මුහුණ දී තිබේද?

- **Q4. Past Domestic Scares & Daytime Fears** `[Module P5 Fall Triage & Critical Alerts]`  
  *English:* Has your parent ever experienced a slip, fall, dizzy spell, or medical scare while alone at home? What is your single biggest fear while sitting in office meetings or commuting?  
  *සිංහල (නිවසේදී සිදුවූ හදිසි අනතුරු සහ ඔබ තුළ පවතින බිය):* ඔබ නිවසේ නොසිටි වේලාවක දෙමව්පියන් ඇදවැටීමක් හෝ හදිසි කරකැවිල්ලක් වැනි කරදරයකට මුහුණ දී තිබේද? ඔවුන් තනිව තබා යන විට ඔබේ සිතේ ඇති ප්‍රධානතම බිය කුමක්ද?

- **Q5. Chair-Side Pill Delivery & Low-Stock Alerts** `[Caregiver Web App Screen 3 (Pill Inventory)]`  
  *English:* ALVI brings the right pills directly to your parent's chair on time, and alerts your phone when pill stocks are running low. How would automated stock tracking simplify your weekly pharmacy shopping and care handovers?  
  *සිංහල (පුටුව ළඟටම බෙහෙත් ගෙන ඒම සහ තොග අවසන්වීමේ පණිවිඩ):* රොබෝවරයා නියමිත වේලාවට පුටුව ළඟටම බෙහෙත් ගෙනැවිත් දී, පෙති ඉවරවේගන එන විට ඔබේ දුරකථනයට දැනුම් දුන්නොත්, එය ඔබේ දෛනික කටයුතුවලට සහ සිතේ සැනසිල්ලට කොතරම් පහසුවක් වේද?

- **Q6. Progressive 3-Stage Reminders vs. Work Distractions** `[Caregiver Web App Screen 4 (Dose Logs)]`  
  *English:* When medication is due, ALVI gives gentle audio reminders first, and only sends a notification to your phone if uncollected after 15 minutes. Does this progression fit smoothly into your workday without causing notification overload?  
  *සිංහල (පියවර 3ක අනතුරු ඇඟවීමේ ක්‍රියාවලිය):* බෙහෙත් වේලාවට රොබෝවරයා මුලින්ම ආදරයෙන් මතක් කර, විනාඩි 15කින් නොගත්තොත් පමණක් ඔබේ දුරකථනයට පණිවිඩයක් එවන්නේ නම්, එය ඔබේ කාර්යාල වැඩවලට බාධාවක් නොවී ක්‍රියාත්මක වේද?

- **Q7. Hands-Free Video Calls vs. Smartphone Frustration** `[Module P3 WebRTC Video Console]`  
  *English:* Many elderly parents struggle with mobile touchscreens or leave phones in another room. With ALVI, you can start a hands-free video call where the robot drives to their room and connects over a loud speaker. How would this improve your daily connection?  
  *සිංහල (ස්වයංක්‍රීය Hands-Free වීඩියෝ ඇමතුම්):* බොහෝ වැඩිහිටියන්ට ස්මාර්ට්ෆෝන් භාවිතය අපහසුය. ALVI හරහා ඔබට කාමරයටම වීඩියෝ ඇමතුමක් ගෙන ඔවුන් සමඟ කතා කිරීමට හැකිවීම ඔබට කෙතරම් ප්‍රයෝජනවත්ද?

- **Q8. Sharing Access with Siblings, Relatives, or Helpers** `[Persona 3 (Kamala) Role Permissions]`  
  *English:* Our app allows you to grant access to siblings, nearby relatives, or a visiting domestic helper with custom permissions (e.g. view pill stock or receive fall alerts). Who would you invite, and what permissions would you give them?  
  *සිංහල (සහායක රැකබලාගන්නන් සම්බන්ධ කරගැනීම):* ඔබේ සහෝදර සහෝදරියන්ට, ළඟම ඥාතීන්ට හෝ ගෙදරට එන සහායිකාවකටත් බෙහෙත් තොරතුරු සහ හදිසි පණිවිඩ ලැබෙන සේ App එක හරහා සම්බන්ධ කරගැනීමට ඔබ කැමති කාටද?

- **Q9. Emergency Fall Auto-Dial & Twilio SMS Calls** `[Twilio Telephony & Emergency Routing]`  
  *English:* If a fall is confirmed and your parent does not cancel the voice alert, ALVI immediately triggers an automated voice phone call and SMS to your mobile. Is an immediate phone call the most dependable way to reach you during busy hours?  
  *සිංහල (හදිසි ඇදවැටීමකදී ස්වයංක්‍රීය දුරකථන ඇමතුම්):* හදිසි ඇදවැටීමක් සිදුවී දෙමව්පියන්ට කතා කළ නොහැකි වුවහොත්, රොබෝවරයා ක්ෂණිකව ඔබගේ දුරකථනයට ස්වයංක්‍රීයව කතා කර SMS පණිවිඩයක් එවයි. කාර්යාල වේලාවේදී ඔබව සම්බන්ධ කරගැනීමට මෙය වඩාත්ම සාර්ථක ක්‍රමයද?

- **Q10. Caregiver Web App Screens Walkthrough** `[Chapter 6 UI/UX Screen Share Validation]`  
  *English:* Reviewing our 7 app screens (Dashboard, Live Vitals, Pill Inventory, Dose Logs, Room Map, Video Console, Emergency Permissions), how clear and intuitive does the layout appear from your smartphone?  
  *සිංහල (Caregiver Web App හි තිර 7 පිළිබඳ ඔබගේ අදහස):* දුරකථනයෙන් බෙහෙත් බිව් බව, හෘද ස්පන්දනය, සහ වීඩියෝ ඇමතුම් ලබාගත හැකි තිර පරීක්ෂා කිරීමේදී, ඒවා භාවිතය ඔබට කෙතරම් පහසු සහ පැහැදිලි ලෙස පෙනේද?

- **Q11. Affordability: One-Time Build vs. Monthly Nurse Fees** `[Economic Feasibility & BOM Validation]`  
  *English:* Hiring a private full-time caregiver in Sri Lanka costs Rs. 60,000–100,000 every single month. ALVI's local build cost is an estimated one-time Rs. 106,000–150,000. How realistic and affordable is this one-time price point for your household budget?  
  *සිංහල (ආර්ථික වශයෙන් දැරිය හැකි මිල සහ වටිනාකම):* ලංකාවේ සාත්තු සේවකයෙකුට මසකට රු. 60,000–100,000ක් වැයවන පසුබිමක, රොබෝවරයා වෙනුවෙන් එක්වරක් පමණක් වැයවන රු. 106,000–150,000ක මුදල ඔබේ පවුලේ අයවැයට කෙතරම් සාධාරණද?

- **Q12. One-Sentence Caregiver Summary Quote** `[Persona 1 Card Direct Verbatim Quote]`  
  *English:* In one sentence, what capability in ALVI would give you the deepest peace of mind while caring for your parent from work?  
  *සිංහල (සාරාංශ අදහස):* දෙමව්පියන් නිවසේ තබා සිතේ බියක් නැතිව රැකියාවට යාමට ALVI වෙතින් ඔබ බලාපොරොත්තු වන ලොකුම සහනය එක වාක්‍යයකින් පවසන්නේ නම් කුමක්ද?

---

## 5. Questionnaire C: Elderly Patients Living Independently (1-Hour Guide)
### ප්‍රශ්නාවලිය C: තනිව වෙසෙන වැඩිහිටි පුරවැසියන් සඳහා

**Target Onion Model Ring:** Ring 2 — The System (Direct Functional Beneficiary / Assisted Senior)  
**Primary ALVI Modules Validated:** P1 (Physical Ergonomics & Water Carrier), P2 (Voice AI), P4 (Summon & Follow), P5 (Smartwatch Comfort & 5s Voice Cancel)

- **Q1. Daily Routine & Favourite Places in the House** `[Persona 2 (Bandula) Lifestyle & Autonomy]`  
  *English:* Could you tell us about a typical day at home when your children or family are away at work? What do you enjoy doing, and which rooms or chairs do you spend the most time in?  
  *සිංහල (දෛනික ජීවිතය සහ නිවසේ වැඩිපුර ගතකරන ස්ථාන):* ඔබ සාමාන්‍යයෙන් නිවසේ දවස ගතකරන්නේ කෙසේද? පොතක් කියවීමට, රූපවාහිනිය නැරඹීමට හෝ විවේකීව සිටීමට ඔබ වැඩිපුරම කැමති කාමරය හෝ ස්ථානය කුමක්ද?

- **Q2. Walking Around the Home & Floor Layout** `[Module P4 LiDAR Floor Mapping & Obstacles]`  
  *English:* How easy is it for you to walk between rooms inside your house? Are there slippery tiles, carpets, small doorsteps, or tight furniture corners where you need to be extra careful?  
  *සිංහල (නිවස ඇතුළත ඇවිදීම සහ බිම සැකැස්ම):* නිවස ඇතුළත කාමර අතර ඇවිදීම ඔබට පහසුද? ලිස්සන සුළු ටයිල්, පඩිපෙළ හෝ අල්ලාගෙන යාමට සිදුවන තැන් තිබේද?

- **Q3. Taking Daily Tablets & Fetching Drinking Water** `[Module P1 Carousel & Water Bottle Rationale]`  
  *English:* How many tablets do you take each day? Do you ever find it hard to open tight medicine bottles, remember if you took your morning tablets, or walk all the way to the kitchen to fetch a glass of water?  
  *සිංහල (දිනපතා පෙති ගැනීම සහ වතුර වීදුරුවක් ලබාගැනීම):* ඔබ සාමාන්‍යයෙන් දිනකට බෙහෙත් පෙති කීයක් ගන්නවාද? බෙහෙත් පැකට් කැඩීම, උදේ පෙත්ත බිව්වාද කියා මතක තබාගැනීම, හෝ වතුර වීදුරුවක් ගැනීමට කුස්සියට යාම ඔබට අපහසු අවස්ථා තිබේද?

- **Q4. Telephone Calls & Keeping in Touch with Family** `[Module P3 Far-Field Video Speakerphone]`  
  *English:* Where do you usually keep your telephone or mobile phone during the day? Have you ever missed a call from your children because the phone was in another room or you couldn't reach it in time?  
  *සිංහල (දුරකථන ඇමතුම් සහ දරුවන් සමඟ කතාබහ කිරීම):* ඔබේ දුරකථනය සාමාන්‍යයෙන් තබාගන්නේ කොහේද? දරුවන් කතා කරන විට දුරකථනය වෙනත් තැනක තිබීම නිසා ඔබට වේලාවට කතා කිරීමට නොහැකි වූ අවස්ථා තිබේද?

- **Q5. Medicine Delivery to Your Chair with a Fresh Water Bottle** `[Module P1 Physical Ergonomics & Reachability]`  
  *English:* Imagine ALVI quietly rolls directly to your chair with your exact medicine dropped into a small cup, with a fresh drinking water bottle right beside it so you don't have to stand up. How comfortable would that be for you?  
  *සිංහල (ඔබ වාඩිවී සිටින තැනටම බෙහෙත් සහ වතුර බෝතලය රැගෙන ඒම):* ඔබ වාඩිවී සිටින තැනටම කුඩා සහකාර රොබෝවරයෙකු පැමිණ, ඔබේ පෙති සහ වතුර බෝතලය ඔබේ අත ළඟටම ලබාදුනහොත්, එය ඔබට කෙතරම් පහසුවක් වේද?

- **Q6. Gentle Intake Confirmation in Front of the Robot** `[Module P1 AI Vision & Patient Dignity]`  
  *English:* When you pick up the cup, ALVI gently checks your temperature without touching you and verifies that you took the medicine, so your children are immediately assured that you are safe without calling to ask repeatedly. Would you feel comfortable taking your tablet in front of the robot?  
  *සිංහල (රොබෝවරයා ඉදිරියේ බෙහෙත් ගැනීම සහ උෂ්ණත්වය මැනීම):* ඔබේ ඇඟේ නොගෑවී උෂ්ණත්වය මැන, ඔබ පෙත්ත බිව් බව රොබෝවරයා සටහන් කරගන්නේ නම් (දරුවන්ට එය බලාගත හැකි නිසා ඔවුන් නිතර කතා කර කරදර කරන්නේ නැත), මෙයට ඔබ කැමතිද?

- **Q7. Speaking Naturally to the Robot (Sinhala / English)** `[Module P2 Voice AI (Sinhala/English)]`  
  *English:* Instead of pressing tiny buttons on a screen, you can simply speak out loud: 'ALVI, come here', 'What medicine is this?', or 'Call my daughter'. Would you like ALVI to speak with you in Sinhala or English, and what kind of voice feels best to you?  
  *සිංහල (රොබෝවරයා සමඟ කටහඬින් කතා කිරීම):* තිරයේ බටන් ඔබන්නේ නැතිව ඔබට සාමාන්‍ය පරිදි 'ALVI මෙහාට එන්න' හෝ 'මගේ දුවට කතා කරන්න' කියා කටහඬින් පැවසිය හැක. රොබෝවරයා ඔබ සමඟ සිංහලෙන් කතා කරනවාටද ඉංග්‍රීසියෙන් කතා කරනවාටද ඔබ කැමති? කෙබඳු කටහඬකටද ඔබ වඩාත් කැමති?

- **Q8. Summon Mode vs. Follow Mode** `[Module P4 LiDAR Follow vs Summon Autonomy]`  
  *English:* ALVI can either stay parked at its charging station until you call it (Summon Mode), or follow behind you at a safe two-step distance so your water bottle and safety net are always right near you (Follow Mode). Which would feel more comfortable for you?  
  *සිංහල (කාමරයට කැඳවීම සහ පිටුපසින් පැමිණීම):* රොබෝවරයා ඔබ කතා කරන තුරු තමන්ගේ තැන නැවතී සිටිනවාටද, නැතහොත් ඔබ ඇවිදින විට පියවර දෙකක් පිටුපසින් ආරක්ෂිතව පැමිණෙනවාටද ඔබ වඩාත් කැමති?

- **Q9. Wearing a Lightweight Safety Watch** `[Module P5 BLE Smartwatch Wearability]`  
  *English:* To check your pulse and ensure you are immediately helped if you ever slip, our system includes a lightweight watch on your wrist. Do you feel comfortable wearing a wristwatch during the day at home?  
  *සිංහල (සැහැල්ලු ස්මාර්ට් අත් ඔරලෝසුවක් පැළඳීම):* කරකැවිල්ලක් හෝ ලිස්සා වැටීමක් සිදුවුවහොත් ක්ෂණිකව උදව් ලබාගැනීම සඳහා, දවාලට අතේ සැහැල්ලු ඔරලෝසුවක් පැළඳ සිටීමට ඔබ කැමතිද?

- **Q10. Hands-Free Video Calls from Family** `[Module P3 Privacy & Call Acceptance]`  
  *English:* When your children video call you through ALVI, would you prefer the robot to announce their name and connect automatically without you touching anything, or would you prefer it to ask you: 'Would you like to answer?' first?  
  *සිංහල (දරුවන්ගෙන් ලැබෙන Hands-Free වීඩියෝ ඇමතුම්):* දරුවන් රොබෝවරයා හරහා කතා කරන විට, ඔබ කිසිවක් නොඑබුවද ස්වයංක්‍රීයව ඔවුන්ගේ හඬ සහ රූපය සම්බන්ධ වෙනවාට ඔබ කැමතිද, නැතහොත් 'කතා කරනවාද?' කියා ඔබෙන් අසා සම්බන්ධ කරනවාට ඔබ කැමතිද?

- **Q11. 5-Second Voice Cancel for Fall Alerts** `[Module P5 Voice Cancel Timing]`  
  *English:* If you ever sit down heavily in an armchair and ALVI announces: 'Fall detected. Say cancel if you are okay', is a few seconds enough time for you to speak out loud and say 'Cancel' or 'I am fine'?  
  *සිංහල (වැටීම් අනතුරු ඇඟවීම අවලංගු කිරීමට කාලය ප්‍රමාණවත්ද?):* ඔබ පුටුවක තදින් වාඩිවූ විට රොබෝවරයා 'ඔබට කරදරයක් නැද්ද? කමක් නැත්නම් Cancel කියන්න' යැයි ඇසුවහොත්, ඔබට 'Cancel' යැයි පැවසීමට ප්‍රමාණවත් කාලයක් ලැබේද?

- **Q12. Living Safely & Independently at Home** `[Persona 2 Card Direct Verbatim Quote]`  
  *English:* What would make you feel most happy, safe, and independent living in your home with a helper robot like ALVI?  
  *සිංහල (නිවසේ නිදහසේ සහ ගෞරවාන්විතව ජීවත්වීම):* මෙවැනි සහකාර රොබෝවරයෙකු සමඟ ඔබේම නිවසේ නිදහසේ, ගෞරවාන්විතව සහ ආරක්ෂිතව ජීවත්වීමට ඔබට වඩාත්ම වැදගත් වන්නේ කුමක්ද?

---

## 6. Post-Interview Documentation Template (For Field Notes)
### සම්මුඛ පරීක්ෂණ සටහන් පත්‍රිකාව

| Portfolio Audit Field | Captured Field Data & Specification Evidence |
| :--- | :--- |
| **Interview ID & Session Wave** | e.g. `INT-01` \| Wave 1 Qualitative Consultation |
| **Date, Time & Duration** | e.g. 18 November 2026, 14:00–15:00 (+05:30) \| 60 Minutes |
| **Stakeholder Category & Onion Ring** | `[ ]` Doctor (Ring 3: Containing System)<br>`[ ]` Primary Caregiver (Ring 3: Financial Buyer)<br>`[ ]` Secondary Caregiver (Ring 2: Operational Helper)<br>`[ ]` Elderly Patient (Ring 2: Direct System Beneficiary) |
| **Participant Identity / Codename** | Anonymized Code: `DOC-01` / `CAR-01` / `PAT-01` (Option B)<br>*(Named Specialist only if Registered Clinical Doctor per Option A)* |
| **Consent Status & Ethics Clearance** | Signed PDPA Form V2 Verified (`Ref #CS-43-2026`) \| `PASS` |
| **Team 43 Facilitators & Roles** | Lead Interviewer: ____________ \| Live Note-Taker: ____________ |
| **Primary Verified Pain Points** | • Ch. 1 (1.3 Problem Alignment):<br>• Ch. 3 (Persona Frustrations Alignment): |
| **Direct Verbatim Quote (Persona)** | *"____________________________________________________________________"* |
| **Traceable FR / NFR Engineering Impact** | • Confirmed FR / NFR (Chapter 4 Section 4.7):<br>• User Story / Jira Ticket Refinement (`SCRUM-63` to `SCRUM-74`): |
