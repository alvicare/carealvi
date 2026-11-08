# Team 43: Complete Jira, GitHub & MCP Integration Guide
**Project:** ALVI (Autonomous Home-Care Companion Robot & Caregiver Web App)  
**Institution:** Informatics Institute of Technology (IIT) / University of Westminster  
**Jira Site:** `https://iit-team-v4kklicw.atlassian.net`  
**Project Key:** `SCRUM` (Name: `CS-43` | Board ID: `1`)  
**Repository Policy:** Governed by [`AGENTS.md`](file:///mnt/Disk0_Vol1/Amodh%20Gunawardana/ATP/AGENTS.md) and [`logs.md`](file:///mnt/Disk0_Vol1/Amodh%20Gunawardana/ATP/logs.md)  

---

## Table of Contents
1. [Core Policy: Mandatory Specification Check & Audit Logging](#1-core-policy-mandatory-specification-check--audit-logging)
2. [How a Jira Ticket Works (Point-by-Point)](#2-how-a-jira-ticket-works-point-by-point)
3. [Option B: GitHub ⇄ Jira App Integration (Recommended)](#3-option-b-github--jira-app-integration-recommended)
4. [Coursework Specifications & Automated Google Drive Sync](#4-coursework-specifications--automated-google-drive-sync)
5. [How to Connect Jira MCP to Antigravity / AI Assistants](#5-how-to-connect-jira-mcp-to-antigravity--ai-assistants)
6. [Team Quick Reference & Atlassian Account IDs](#6-team-quick-reference--atlassian-account-ids)
7. [Example Prompts for Team Members](#7-example-prompts-for-team-members)

---

## 1. Core Policy: Mandatory Specification Check & Audit Logging

> [!IMPORTANT]
> **MANDATORY TEAM & AGENT DIRECTIVE:**  
> Before committing code, creating pull requests, or updating Jira ticket statuses, **EVERY team member and AI assistant MUST**:
> 1. Verify deliverables against the official module specifications (`5COSC021W`), marking scheme, PDPA 2022, and UK GDPR.
> 2. Ensure compliance with [`AGENTS.md`](file:///mnt/Disk0_Vol1/Amodh%20Gunawardana/ATP/AGENTS.md).
> 3. Record every submission, ticket transition, and artifact link inside [`logs.md`](file:///mnt/Disk0_Vol1/Amodh%20Gunawardana/ATP/logs.md).

If an artifact (e.g. consent form, diagram, or test suite) fails academic criteria, flag it immediately with a warning in `logs.md` rather than submitting non-compliant work.

---

## 2. How a Jira Ticket Works (Point-by-Point)

A Jira ticket is a single unit of work tracked in Agile Scrum. For our University of Westminster / IIT coursework, every ticket follows this structure:

### 1. The Ticket Key (`SCRUM-XX`)
* Every ticket has a unique ID (e.g., `SCRUM-30`, `SCRUM-43`, `SCRUM-44`).
* Always include this key in your **Git branch names**, **commit messages**, **PR titles**, and **CW1 Portfolio references**.

### 2. Issue Hierarchy
* **Epic (Level 1):** Large body of work spanning multiple sprints (e.g., `EPIC-1: Agile Governance`, `EPIC-2: UI/UX & Landing Page`, `EPIC-4: P1 Medicine Dispenser`).
* **User Story (Level 0):** A user-centric feature sized in Story Points (`As a <role>, I want <goal> so that <benefit>`).
* **Sub-task (Level -1):** Specific technical checklist item under a Story (e.g., "Wire interactive Figma noodles", "Draft ethics consent form").

### 3. Workflow Lifecycle (Statuses)
Every item moves left-to-right across our Scrum board:
1. **Idea / To Do:** Scheduled for the sprint, ready to start.
2. **In Progress:** Developer/lead is actively working on it.
3. **In Review:** Work is complete; peer review underway (checking Figma mockups, reviewing PRs, or bench testing circuits).
4. **Done:** Meets the team's **Definition of Done (DoD)** (code committed, tested, documented with evidence).

### 4. Story Points (SP)
* Represents **relative effort and complexity** using the Fibonacci scale (`1, 2, 3, 5, 8, 13`).
* Balanced across all 5 team members (~5 SP each per week).

### 5. Acceptance Criteria
* The exact checklist required to mark a ticket as **Done** (`Given <context>, When <action>, Then <result>`).
* Both assessors and the Scrum Master verify acceptance criteria during Sprint Reviews.

### 6. Activity & Evidence Stream (Crucial for CW1 Grading!)
* Assessors evaluate **Comments**, **Attachments**, and **Git Links** as proof of authentic teamwork:
  * Upload meeting consent forms, Figma screenshot mockups, sensor wiring diagrams.
  * Post progress updates (e.g., *"Conducted 2 doctor interviews today, notes attached."*).

---

## 3. Option B: GitHub ⇄ Jira App Integration (Recommended)

Option B uses the official **GitHub for Jira** application from the Atlassian Marketplace. It provides real-time bi-directional synchronization between our GitHub repositories and our Jira Scrum board.

### Step-by-Step Setup Guide (For Scrum Master / Admin — Nethum):
1. **Install the App:**
   - In Jira, click **Apps** in the top navigation bar > **Explore more apps**.
   - Search for **"GitHub for Jira"** (by Atlassian) and click **Get app** / **Install**.
2. **Connect GitHub Organization:**
   - Navigate to **Jira Settings > Apps > GitHub for Jira**.
   - Click **Connect GitHub organization**.
   - Grant Atlassian access to our team repositories (`Landing-Page`, `ALVI-Hardware`, `ALVI-Caregiver-App`).
3. **Enable Smart Automation Rules:**
   - In your Jira Project Settings > **Automation**, enable rules so that:
     * When a **branch is created** containing `SCRUM-XX` ➔ Move issue to **In Progress**.
     * When a **Pull Request is opened** mentioning `SCRUM-XX` ➔ Move issue to **In Review**.
     * When a **Pull Request is merged** to `main` ➔ Move issue to **Done**!

### How Developers Use the Integration:

#### 1. Branch Naming Convention:
Include the Jira issue key in your branch name:
```bash
# Format: feature/<ISSUE-KEY>-short-description
git checkout -b feature/SCRUM-30-landing-page-3d
git checkout -b feature/SCRUM-48-hardware-pinout
git checkout -b feature/SCRUM-85-fastapi-backend
```

#### 2. Commit Message Convention:
```bash
# General commit:
git commit -m "SCRUM-30: Integrate Three.js 3D robot model with scroll scrubbing"

# Advanced Smart Commit actions (updates time & transitions):
git commit -m "SCRUM-48 #time 2h Working on BTS7960 motor driver pinout"
git commit -m "SCRUM-85 #resolve Closes FastAPI Swagger schema"
```

#### 3. Pull Request Title:
```text
SCRUM-40: Complete High-Fidelity Figma Prototype & Tailwind Design Tokens
```
Once opened, Jira automatically displays the PR status, reviewer approvals, and commit history directly inside the **"Development"** panel of the Jira issue!

---

## 4. Coursework Specifications & Automated Google Drive Sync

Our project specifications, rubric templates, and guidelines are hosted in our shared Google Drive folder:
**Folder URL:** `https://drive.google.com/drive/folders/14HcIjDPtD6ziBM-y2I3IuTX-OQQQnjNJ?usp=sharing`  
**Folder ID:** `14HcIjDPtD6ziBM-y2I3IuTX-OQQQnjNJ`

### Automated Download & Sync Command:
To download or refresh all specification files into your local `./specs` directory, run this command in your terminal:

```bash
# Automated Spec Downloader (uses a lightweight isolated Python environment)
python3 -m venv /tmp/atp_specs_venv && \
/tmp/atp_specs_venv/bin/pip install -q gdown && \
mkdir -p "./specs" && \
/tmp/atp_specs_venv/bin/gdown --folder "https://drive.google.com/drive/folders/14HcIjDPtD6ziBM-y2I3IuTX-OQQQnjNJ?usp=sharing" -O "./specs"
```

> **Local Fallback Archive:**  
> If you are working offline or without Google Drive API access, full local copies of all initial build guides, proposals, and weekly progress templates are already archived in:
> * `/home/amodh/Downloads/ATP-Team43-20261029T091840Z-1-001.zip`
> * `/home/amodh/Downloads/Caregiving Robot - Complete MVP Specification & Build Guide.docx`

---

## 5. How to Connect Jira MCP to Antigravity / AI Assistants

The **Model Context Protocol (MCP)** enables AI assistants (Antigravity CLI, Antigravity IDE, Cursor, Claude Code) to create, query, and manage Jira tickets directly via natural language.

### Step 1: Generate Your Atlassian API Token
1. Go to [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens).
2. Click **Create API token**.
3. Label it: `antigravity-mcp`.
4. Copy the generated token string (e.g., `ATATT3xFfGF...`).

### Step 2: Configure MCP Server
Add the configuration to `~/.gemini/config/mcp_config.json`:

```json
{
  "mcpServers": {
    "jira": {
      "command": "npx",
      "args": [
        "-y",
        "@nexus2520/jira-mcp-server"
      ],
      "env": {
        "JIRA_BASE_URL": "https://iit-team-v4kklicw.atlassian.net",
        "JIRA_EMAIL": "your-email@domain.com",
        "JIRA_API_TOKEN": "YOUR_PASTED_ATLASSIAN_API_TOKEN"
      }
    },
    "atlassian": {
      "disabled": false,
      "url": "https://mcp.atlassian.com/v2/mcp",
      "serverUrl": "https://mcp.atlassian.com/v2/mcp",
      "httpUrl": "https://mcp.atlassian.com/v2/mcp",
      "headers": {
        "Authorization": "Basic BASE64_ENCODED_EMAIL_COLON_TOKEN"
      }
    }
  }
}
```

*(Note: Create `BASE64_ENCODED_EMAIL_COLON_TOKEN` using `echo -n "your-email@domain.com:YOUR_TOKEN" | base64`)*.

### Step 3: Fast 1-Click Interactive Login Helper
Alternatively, run our built-in browser configuration helper:
```bash
node ~/.gemini/antigravity-cli/bin/jira-auth.js
```
Open `http://localhost:9005` in your browser, enter your credentials, and it automatically tests and writes your MCP configuration!

---

## 6. Team Quick Reference & Atlassian Account IDs

| Member | Student ID | Primary Technical Ownership | Jira Account ID |
| :--- | :--- | :--- | :--- |
| **Amodh Gunawardana** | `W22133081` | Product Owner / Tech Architect / Landing Page & Voice AI Lead | `712020:eb146379-993f-4916-b4b6-f7003da072c8` |
| **Thisara Chandima** | `W2212870` | Embedded Hardware Lead / ESP32-S3, Pi 4, LiDAR & BOM Lead | `712020:0ee56454-882c-4caa-9f8f-f55649099c35` |
| **Thevindu Herath** | `W2212837` | Lead UI/UX Designer / High-Fidelity Figma Prototype & Tokens | `712020:de35bea6-1d62-4ed1-816f-7f5184ce20cf` |
| **Sithil Hettiarachchi** | `W2212867` | Portfolio Documentation Lead / UML Models & Use Cases | `712020:4e72275e-5923-4ca6-a005-85e6b6f934ac` |
| **Nethum Liyanage** | `W2212876` | Scrum Master / Jira Admin / FastAPI Backend & Ethics Lead | `712020:7de7ad06-094e-4829-abc2-4d2c4b30a488` |

---

## 7. Example Prompts for Team Members

Once MCP is connected, you can manage the project naturally:
* *"Show all tickets currently in progress for Sprint 1A."*
* *"Create a subtask under SCRUM-48 to test the BTS7960 motor driver pinout."*
* *"Move my ticket SCRUM-40 to In Review and link my Figma prototype URL."*
* *"Summarize our sprint velocity and check if all submitted artifacts meet specifications."*
