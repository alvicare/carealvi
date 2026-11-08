# ALVI — Autonomous Home-Care Companion Robot & Caregiver Web Application

**Institution:** Informatics Institute of Technology (IIT) in collaboration with University of Westminster  
**Module:** Agile Team Project (ATP — 5COSC021W)  
**Team ID:** Team 43 (CS-43)  
**Project Key:** `SCRUM` | **Board ID:** `1`  

---

## 1. Project Overview

ALVI is an autonomous, in-home robotic caregiving companion designed to assist elderly individuals living independently and support remote family caregivers. The system incorporates:
* **P1: Automated 5-Cylinder Pill & Water Dispenser** with 3-step physical and vision AI intake verification (Google MediaPipe).
* **P2: Conversational Voice AI Pipeline** (Faster-Whisper STT + LLM dialogue reasoning + Piper TTS).
* **P3: Zero-Latency Two-Way Video Calling** via LiveKit WebRTC.
* **P4: Autonomous Indoor Mobile Navigation** (2D 360° LiDAR, Follow Me, Summon, and Visual Guidance modes).
* **P5: Commercial Smartwatch Integration** (Live Heart Rate BPM over BLE UUID `0x180D`, Z-axis fall spike detection).
* **P6: Caregiver Remote Web & Mobile Dashboard** (Real-time telemetry, pill scheduling, Twilio emergency auto-alerts).

---

## 2. 4-Tier Hybrid Architecture

1. **Tier 1 (Real-Time Hardware & Actuation):** ESP32-S3 microcontroller managing BTS7960 motor drivers, NEMA 17 stepper, IR break-beam, and PIR sensors.
2. **Tier 2 (Onboard Sensor & Media Bridge):** Raspberry Pi 4 handling HD USB camera, USB conference speakerphone, RPLiDAR A1, and Smartwatch BLE telemetry.
3. **Tier 3 (AI Perception Brain):** Laptop edge server running YOLOv8-Pose fall detection, MediaPipe intake confirmation, Faster-Whisper STT, ROS 2 Nav2 SLAM, and FastAPI.
4. **Tier 4 (Caregiver Web Application & Cloud Dashboard):** Next.js / React responsive web application providing live vitals, pill schedule configuration, and LiveKit WebRTC video calls.

---

## 3. Team Member Ownership Matrix

| Member | Student ID (UoW) | Scrum Role & Ownership |
| :--- | :--- | :--- |
| **Amodh Gunawardana** | `W22133081` | Product Owner / Tech Architect / Landing Page, Voice AI & Vision Pipeline Lead |
| **Thisara Chandima** | `W2212870` | Embedded Hardware Lead / ESP32-S3, Pi 4, LiDAR, Smartwatch BLE & BOM Lead |
| **Thevindu Herath** | `W2212837` | Lead UI/UX Designer / High-Fidelity Figma Prototype & Tailwind Design System |
| **Sithil Hettiarachchi** | `W2212867` | Portfolio Documentation Lead / UML Models (Sequence, Activity, Use Cases) |
| **Nethum Liyanage** | `W2212876` | Scrum Master / Jira Admin / FastAPI Backend, Class/DFD & Ethics/Test Lead |

---

## 4. Repository Structure

```text
├── README.md               # Project architecture and team documentation
└── code/
    ├── landing-page/       # Next.js 14 marketing landing page with interactive 3D robot
    ├── caregiver-app/      # (Sprint 2) React caregiver dashboard & telemetry client
    ├── backend-fastapi/    # (Sprint 2) FastAPI REST & WebSocket server
    └── hardware-firmware/  # (Sprint 2) ESP32-S3 Arduino/C++ firmware
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
