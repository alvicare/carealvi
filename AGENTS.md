# AGENTS.md — Team 43 (ALVI) Autonomous Coding & Compliance Policy

**Project:** ALVI (Autonomous Home-Care Companion Robot & Caregiver Web App)  
**Institution:** Informatics Institute of Technology (IIT) in collaboration with University of Westminster  
**Module:** Agile Team Project (ATP — 5COSC021W / CW1 & CW2)  
**Jira Site:** `https://iit-team-v4kklicw.atlassian.net` (Project Key: `SCRUM` | Board ID: `1`)  
**Workspace Root:** `/mnt/Disk0_Vol1/Amodh Gunawardana/ATP`  
**Audit Log File:** `/mnt/Disk0_Vol1/Amodh Gunawardana/ATP/logs.md`  

---

## 1. Agent Operating Protocol & Core Directives

Whenever any AI agent (Antigravity, Cursor, Claude Code, or CLI) operates within this repository, it MUST adhere to the following mandatory pre-flight and execution rules:

### A. The Strict 3-Step Verification Rule (Before ANY Commit, Jira Change, or Submission)
1. **Verify Against Specifications First:**
   * Never submit or mark a ticket as `Done` without verifying deliverables against the official Westminster / IIT CW1 specification, marking scheme, BCS Code of Conduct, Sri Lanka PDPA No. 9 of 2022, and UK GDPR.
   * If a document or artifact is deficient or risks losing marks, **DO NOT silently submit it**. Flag the defect, log it as `FLAGGED_WITH_WARNING` in `logs.md`, and document the exact missing criteria.
2. **Log Every Action in `logs.md`:**
   * Every Jira status transition, file upload, Google Form submission, or Git commit MUST be recorded immediately in [`logs.md`](file:///mnt/Disk0_Vol1/Amodh%20Gunawardana/ATP/logs.md).
   * The entry must include: Timestamp, Jira Ticket Key, Action Type, Author/Agent, Exact Artifact Paths / URLs, and Specification Compliance Status (`PASS`, `FLAGGED`, or `FAIL`).
3. **Show What Was Submitted:**
   * After any operation, output a clean, formatted Markdown table detailing the exact changes, file paths, and Jira URLs so team leads have 100% transparency.

---

## 2. Team Member Profile & Student Ownership Matrix

| Member Name | Student ID (UoW) | Scrum Role & Technical Ownership | Jira Account ID |
| :--- | :--- | :--- | :--- |
| **Amodh Gunawardana** | `W22133081` | Product Owner / Tech Architect / Landing Page, Voice AI & Vision Pipeline Lead | `712020:eb146379-993f-4916-b4b6-f7003da072c8` |
| **Thisara Chandima** | `W2212870` | Embedded Hardware Lead / ESP32-S3, Pi 4, LiDAR, Smartwatch BLE & BOM Lead | `712020:0ee56454-882c-4caa-9f8f-f55649099c35` |
| **Thevindu Herath** | `W2212837` | Lead UI/UX Designer / High-Fidelity Figma Prototype & Tailwind Design System | `712020:de35bea6-1d62-4ed1-816f-7f5184ce20cf` |
| **Sithil Hettiarachchi** | `W2212867` | Portfolio Documentation Lead / UML Models (Sequence, Activity, Use Cases) | `712020:4e72275e-5923-4ca6-a005-85e6b6f934ac` |
| **Nethum Liyanage** | `W2212876` | Scrum Master / Jira Admin / FastAPI Backend, Class/DFD & Ethics/Test Lead | `712020:7de7ad06-094e-4829-abc2-4d2c4b30a488` |

---

## 3. RESEARCH ETHICS AUDIT & RESOLUTION: Participant Consent & Ethics Form V2

> [!NOTE]
> **COMPLIANCE AUDIT RESOLUTION (CW1 Chapter 5: SLEP & Ethics):**  
> The previous participant consent form was audited and upgraded to **Version 2.0 (`ALVI_Participant_Informed_Consent_Form_V2.pdf`)** and uploaded to [`SCRUM-44`](https://iit-team-v4kklicw.atlassian.net/browse/SCRUM-44). Additionally, the official **UoW ATP Research Ethics Application Form Part A & B** was drafted and uploaded to [`SCRUM-61`](https://iit-team-v4kklicw.atlassian.net/browse/SCRUM-61).  
> All 5 academic and legal requirements under University of Westminster, IIT, Sri Lanka PDPA No. 9 of 2022, and UK GDPR are now **FULLY COMPLIANT (`PASS`)**.

### Detailed Compliance Verification Matrix

| # | Specification / Legal Requirement | Previous Form Defect | Resolved Implementation (Version 2.0) | Compliance Status |
| :- | :--- | :--- | :--- | :-: |
| **1** | **Institutional Ethics Reference & Supervisor Contact** | Omitted supervisor email and formal ethics reference. | Added official clearance header: *Ref #CS-43-2026*, Supervisor details, and IIT institutional ethics contact (`atp.ethics@iit.ac.lk`). | ✅ `PASS` |
| **2** | **Right of Retrospective Withdrawal Cut-Off Date** | Stated open-ended "withdraw at any time" without portfolio cut-off. | Added explicit retrospective deadline clause: *"Withdraw within 7 calendar days post-interview or prior to 20 November 2026"* (after which data is irreversibly synthesized). | ✅ `PASS` |
| **3** | **Data Retention, Encryption & Destruction Policy** | Missing storage location and destruction date under PDPA §10 / UK GDPR. | Explicitly states: *"Stored in AES-256 encrypted repository; all raw audio/video permanently purged and deleted by 31 May 2027 (post-exam board)"*. | ✅ `PASS` |
| **4** | **Participant Anonymity vs. Public Recognition Conflict** | Public credit option risked violating vulnerable patient anonymity. | Restricted Option A strictly to *registered clinical specialists and industry experts*; Option B (*Mandatory Anonymity & Academic Codename*) is mandatory for elderly patients. | ✅ `PASS` |
| **5** | **Official UoW Ethics Application Form (Part A/B)** | Standalone consent form lacked parent UoW Ethics Checklist. | Generated full official **UoW Ethics Application Form Part A & B (Ref: CS-43-2026)** and attached to Jira [`SCRUM-61`](https://iit-team-v4kklicw.atlassian.net/browse/SCRUM-61). | ✅ `PASS` |

---

## 4. Mandatory Specification Sync Command

Specifications are hosted on Google Drive:
`https://drive.google.com/drive/folders/14HcIjDPtD6ziBM-y2I3IuTX-OQQQnjNJ?usp=sharing`

To synchronize and download all specification documents into the local workspace repository:

```bash
# 1. Activate or create isolated Python environment
python3 -m venv /tmp/atp_specs_venv
/tmp/atp_specs_venv/bin/pip install -q gdown

# 2. Run automated spec sync to ./specs folder
mkdir -p "/mnt/Disk0_Vol1/Amodh Gunawardana/ATP/specs"
/tmp/atp_specs_venv/bin/gdown --folder "https://drive.google.com/drive/folders/14HcIjDPtD6ziBM-y2I3IuTX-OQQQnjNJ?usp=sharing" -O "/mnt/Disk0_Vol1/Amodh Gunawardana/ATP/specs"
```

*(Note: Local fallback copies of all core build specifications and coursework templates are also archived in `/home/amodh/Downloads/ATP-Team43-20261029T091840Z-1-001.zip` and `/home/amodh/Downloads/Caregiving Robot - Complete MVP Specification & Build Guide.docx`).*

---

## 5. Automated Audit Log Schema (`logs.md`)

Whenever an agent updates Jira or Git, an entry formatted as follows must be appended to `logs.md`:

```markdown
### [YYYY-MM-DD HH:MM:SS +05:30] - <ACTION_TYPE>
- **Jira Ticket:** `SCRUM-XX` (<Ticket URL>)
- **Responsible Member:** <Name> (<Jira Account ID>)
- **Artifact(s) Submitted:** `<File Path or URL>`
- **Verification Status:** `PASS` | `FLAGGED_WITH_WARNING` | `FAILED`
- **Summary & Specification Audit:** <Detailed notes on compliance check>
```
