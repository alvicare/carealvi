# ALVI — Autonomous Home-Care Companion Robot & Caregiver Application

**Institution:** Informatics Institute of Technology (IIT) in collaboration with University of Westminster  
**Module:** Agile Team Project (ATP — 5COSC021W)  
**Team ID:** Team 43 (CS-43)  
**Project Key:** `SCRUM` | **Board ID:** `1`  
**Production Landing Page:** [https://alvibot.com](https://alvibot.com)  

---

## 1. Project Overview

ALVI is an autonomous, in-home robotic caregiving companion designed to assist elderly individuals living independently and support remote family caregivers. The system incorporates:
* **P1: Automated 5-Cylinder Pill & Water Dispenser** with non-contact MLX90614 thermal hand verification and Google MediaPipe vision intake verification.
* **P2: Conversational Voice AI Pipeline** (Faster-Whisper STT + LLM dialogue reasoning + Piper TTS).
* **P3: Zero-Latency Two-Way Video Calling** via LiveKit WebRTC.
* **P4: Autonomous Indoor Mobile Navigation** (4-sensor solid-state VL53L1X Time-of-Flight (ToF) laser rangefinder array; spinning LiDAR excluded due to cost and mechanical/firmware complexity).
* **P5: Commercial Smartwatch Integration** (Live Heart Rate BPM over BLE UUID `0x180D`, Z-axis accelerometer fall spike detection).
* **P6: Caregiver Remote Web Landing & Mobile App** (Real-time telemetry, pill scheduling, Twilio emergency auto-alerts).

---

## 2. 4-Tier Hybrid Architecture

1. **Tier 1 (Real-Time Hardware & Actuation):** ESP32-S3 microcontroller managing BTS7960 motor drivers, NEMA 17 stepper, MLX90614 thermal sensor, and safety auto-braking watchdog.
2. **Tier 2 (Onboard Sensor & Media Bridge):** Raspberry Pi 4 handling HD USB camera, USB conference speakerphone, 4x VL53L1X solid-state ToF sensor array, and Smartwatch BLE telemetry.
3. **Tier 3 (AI Perception Brain):** Edge laptop compute running YOLOv8-Pose fall detection, MediaPipe intake confirmation, Faster-Whisper STT, and local telemetry dispatch.
4. **Tier 4 (Caregiver Mobile Application & Cloud Services):** Cloud-hosted Spring Boot REST/WebSocket APIs on AWS, PostgreSQL database, and Flutter Caregiver Mobile App, accompanied by a Next.js 14 public marketing landing page ([https://alvibot.com](https://alvibot.com)).

---

## 3. Team Member Ownership Matrix

| Member | Student ID (UoW) | Scrum Role & Ownership |
| :--- | :--- | :--- |
| **Amodh Gunawardana** | `W22133081` | Product Owner & Technical Architect / Co-Lead Backend Development (Spring Boot & AWS Infrastructure), Landing Page & Voice/Vision AI Pipeline |
| **Sithil Hettiarachchi** | `W2212867` | Co-Lead Backend Development (Spring Boot REST/WebSocket, Doctor Verification System HITL & AWS Services) / Portfolio Models |
| **Thisara Chandima** | `W2212870` | Embedded Hardware Lead / ESP32-S3 FreeRTOS, Pi 4 Hub, 4x ToF Navigation Array (No LiDAR), Smartwatch BLE & BOM Procurement |
| **Thevindu Herath** | `W2212837` | Lead UI/UX Designer / High-Fidelity Figma Mobile Design System, Tailwind Tokens & Caregiver Flutter UI |
| **Nethum Liyanage** | `W2212876` | Scrum Master & Jira Administrator / Portfolio Documentation Lead, UML Architecture (Class/DFD), Ethics Clearance & QA/Test Automation |

*(All team members contribute to backend API and microservice endpoints, with core architectural leadership shared between Amodh Gunawardana and Sithil Hettiarachchi).*

---

## 4. Repository Structure

```text
├── README.md               # Project architecture and team documentation
├── docs/                   # Coursework portfolio HTML deliverables, evidence, and survey charts
│   ├── evidence/           # Survey data and 300 DPI visualization charts
│   └── diagrams/           # System architecture, circuit schematics, and UML diagrams
├── specs/                  # Ethics clearance, team agreements, and engineering specifications
└── code/
    ├── landing-page/       # Next.js 14 marketing landing page (deployed at https://alvibot.com)
    ├── caregiver-app/      # (Sprint 2) Flutter caregiver mobile application
    ├── backend-spring/     # (Sprint 2) Spring Boot cloud backend & AWS service integration
    └── hardware-firmware/  # (Sprint 2) ESP32-S3 Arduino/C++ firmware & Raspberry Pi 4 bridge
```

---

## 5. Development & Branching Policy

This repository strictly enforces **Ticket-Driven Feature Branching (GitHub Flow)**:
* `main` branch is protected and contains reviewed, production-ready code.
* All feature development occurs on branches prefixed with the Jira ticket key:
  ```bash
  feature/SCRUM-<ID>-<short-description>
  ```
* Every feature requires a Pull Request with peer review and verification before merging.
