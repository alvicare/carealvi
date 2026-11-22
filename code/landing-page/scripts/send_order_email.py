#!/usr/bin/env python3
"""
ALVI Care — Automated Order & Waitlist Email Dispatch Service
Sender: alvicarebot@gmail.com
Recipients: alvicarebot@gmail.com, amodhgunawardana@gmail.com
Customer confirmation with mailto:alvicarebot@gmail.com
"""

import sys
import os
import json
import argparse
import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

GMAIL_USER = os.environ.get("GMAIL_USER", "alvicarebot@gmail.com")
GMAIL_APP_PASS = os.environ.get("GMAIL_APP_PASS", "")

# Load from .env.local or .env if not found in environment
if not GMAIL_APP_PASS:
    env_paths = [
        os.path.join(os.path.dirname(__file__), "..", ".env.local"),
        os.path.join(os.path.dirname(__file__), "..", ".env"),
    ]
    for p in env_paths:
        if os.path.isfile(p):
            with open(p, "r", encoding="utf-8") as f:
                for line in f:
                    if line.strip().startswith("GMAIL_APP_PASS="):
                        GMAIL_APP_PASS = line.strip().split("=", 1)[1].strip().strip('"').strip("'")
                        break
        if GMAIL_APP_PASS:
            break

ADMIN_RECIPIENTS = ["alvicarebot@gmail.com", "amodhgunawardana@gmail.com"]

def send_waitlist_emails(reservation: dict) -> bool:
    """
    Sends team admin notification and customer confirmation emails.
    """
    res_id = reservation.get("id", f"ALVI-2026-{int(datetime.now().timestamp()) % 10000:04d}")
    name = reservation.get("name", "Prospective Caregiver")
    email = reservation.get("email", "").strip()
    phone = reservation.get("phone", "Not provided")
    district = reservation.get("district", "Colombo")
    care_role = reservation.get("careRole", "Primary Family Caregiver")
    timestamp = reservation.get("timestamp", datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC"))

    # 1. Admin Notification Email
    admin_subject = f"[ALVI One Priority Waitlist] New Reservation: {res_id} - {name} ({district})"
    
    admin_html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F4F5F2; margin: 0; padding: 24px; color: #1E2023; }}
    .card {{ max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }}
    .header {{ border-bottom: 2px solid #0F766E; padding-bottom: 16px; margin-bottom: 24px; }}
    .badge {{ display: inline-block; background-color: #CCFBF1; color: #0F766E; font-size: 12px; font-weight: 700; padding: 4px 12px; rounded: 100px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px; }}
    h2 {{ margin: 12px 0 4px 0; color: #0F766E; font-size: 22px; }}
    .sub {{ color: #64748B; font-size: 14px; margin: 0; }}
    .details-table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
    .details-table td {{ padding: 10px 12px; border-bottom: 1px solid #F1F5F9; font-size: 14px; }}
    .details-table td.label {{ color: #64748B; font-weight: 600; width: 35%; }}
    .details-table td.value {{ color: #1E2023; font-weight: 500; }}
    .footer {{ margin-top: 24px; padding-top: 16px; border-top: 1px solid #F1F5F9; font-size: 12px; color: #94A3B8; text-align: center; }}
    .btn {{ display: inline-block; background-color: #0F766E; color: #FFFFFF !important; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; margin-top: 16px; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">Priority Reservation Captured</span>
      <h2>New ALVI One Waitlist Contact</h2>
      <p class="sub">Submitted live via <strong>alvibot.com</strong></p>
    </div>
    <table class="details-table">
      <tr><td class="label">Reservation ID</td><td class="value"><strong>{res_id}</strong></td></tr>
      <tr><td class="label">Full Name</td><td class="value"><strong>{name}</strong></td></tr>
      <tr><td class="label">Email Address</td><td class="value"><a href="mailto:{email}">{email}</a></td></tr>
      <tr><td class="label">Contact Phone</td><td class="value"><strong>{phone}</strong></td></tr>
      <tr><td class="label">District (Sri Lanka)</td><td class="value">{district}</td></tr>
      <tr><td class="label">Caregiver Role</td><td class="value">{care_role}</td></tr>
      <tr><td class="label">Submission Time</td><td class="value">{timestamp}</td></tr>
    </table>
    <div style="text-align: center;">
      <a href="mailto:{email}?subject=Regarding%20Your%20ALVI%20One%20Reservation%20{res_id}" class="btn">Reply to Customer</a>
    </div>
    <div class="footer">
      ALVI Autonomous Home-Care Companion &bull; Informatics Institute of Technology / University of Westminster<br>
      Official Team Inbox: <a href="mailto:alvicarebot@gmail.com">alvicarebot@gmail.com</a> &bull; Production Domain: <a href="https://alvibot.com">alvibot.com</a>
    </div>
  </div>
</body>
</html>
"""

    admin_msg = MIMEMultipart("alternative")
    admin_msg["Subject"] = admin_subject
    admin_msg["From"] = f"ALVI Care Systems <{GMAIL_USER}>"
    admin_msg["To"] = ", ".join(ADMIN_RECIPIENTS)
    if email:
        admin_msg["Reply-To"] = email
    
    admin_text = f"""[ALVI One Priority Waitlist]
New Reservation: {res_id}
Customer: {name}
Email: {email}
Phone: {phone}
District: {district}
Role: {care_role}
Time: {timestamp}
Domain: https://alvibot.com
"""
    admin_msg.attach(MIMEText(admin_text, "plain"))
    admin_msg.attach(MIMEText(admin_html, "html"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=12) as server:
            server.login(GMAIL_USER, GMAIL_APP_PASS)
            # Send to admin team
            server.sendmail(GMAIL_USER, ADMIN_RECIPIENTS, admin_msg.as_string())
            print(f"[OK] Admin notification email dispatched to: {', '.join(ADMIN_RECIPIENTS)}")

            # 2. Customer Confirmation Email (if valid customer email provided)
            if email and "@" in email and "." in email:
                cust_subject = f"Your ALVI One Priority Waitlist Confirmation ({res_id})"
                cust_html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F8F9FA; margin: 0; padding: 24px; color: #1E2023; }}
    .card {{ max-width: 560px; margin: 0 auto; background: #FFFFFF; border-radius: 18px; border: 1px solid #E2E8F0; padding: 36px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }}
    .brand {{ color: #0F766E; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 12px; }}
    h1 {{ font-size: 22px; font-weight: 700; margin: 8px 0 16px 0; color: #1E2023; }}
    p {{ font-size: 15px; line-height: 1.6; color: #475569; margin: 10px 0; }}
    .res-box {{ background: #F0FDFA; border: 1px solid #99F6E4; border-radius: 12px; padding: 18px; margin: 24px 0; text-align: center; }}
    .res-num {{ font-size: 26px; font-weight: 800; color: #0F766E; letter-spacing: 1px; margin-top: 4px; }}
    .btn {{ display: inline-block; background-color: #0F766E; color: #FFFFFF !important; text-decoration: none; padding: 12px 28px; border-radius: 100px; font-size: 14px; font-weight: 600; margin-top: 20px; }}
    .footer {{ margin-top: 32px; padding-top: 20px; border-top: 1px solid #F1F5F9; font-size: 12px; color: #94A3B8; text-align: center; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="brand">ALVICARE</div>
    <h1>Thank you for joining the ALVI One Priority Waitlist!</h1>
    <p>Dear {name},</p>
    <p>We are delighted to confirm your early reservation for the <strong>ALVI One Autonomous Home-Care Companion Robot</strong>. Your spot has been secured in Batch 01 allocation.</p>
    
    <div class="res-box">
      <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #0F766E; letter-spacing: 1px;">Confirmed Reservation ID</div>
      <div class="res-num">{res_id}</div>
      <div style="font-size: 13px; color: #0D9488; margin-top: 4px;">Registered Role: {care_role} &bull; {district}</div>
    </div>

    <p>Our engineering team at Informatics Institute of Technology (IIT) in collaboration with University of Westminster is finalizing the prototype fabrication, 5-cylinder hermetic pill dispenser, and 24/7 dual-trigger fall safety system.</p>

    <p>Have questions, special care requirements, or feedback? You can contact our team anytime directly by emailing us at:</p>

    <div style="text-align: center;">
      <a href="mailto:alvicarebot@gmail.com?subject=Inquiry%20from%20Reservation%20{res_id}" class="btn">Email ALVI Bot Support</a>
    </div>

    <div class="footer">
      ALVICARE Systems &bull; Colombo, Sri Lanka<br>
      Website: <a href="https://alvibot.com">https://alvibot.com</a> &bull; Direct Support: <a href="mailto:alvicarebot@gmail.com">alvicarebot@gmail.com</a>
    </div>
  </div>
</body>
</html>
"""
                cust_msg = MIMEMultipart("alternative")
                cust_msg["Subject"] = cust_subject
                cust_msg["From"] = f"ALVI Care Team <{GMAIL_USER}>"
                cust_msg["To"] = email
                cust_msg["Reply-To"] = GMAIL_USER
                
                cust_text = f"""Thank you for joining the ALVI One Priority Waitlist!

Dear {name},
Your reservation has been confirmed with ID: {res_id} ({district}).
Our team is preparing Batch 01 production.

If you have questions, please email us directly at: alvicarebot@gmail.com

Best regards,
ALVICARE Systems Team
https://alvibot.com
"""
                cust_msg.attach(MIMEText(cust_text, "plain"))
                cust_msg.attach(MIMEText(cust_html, "html"))
                server.sendmail(GMAIL_USER, [email], cust_msg.as_string())
                print(f"[OK] Customer confirmation email dispatched to: {email}")

        return True
    except Exception as e:
        print(f"[ERROR] Failed to send email via SMTP: {e}", file=sys.stderr)
        return False

def main():
    parser = argparse.ArgumentParser(description="ALVI Order & Waitlist Email Dispatcher")
    parser.add_argument("--test", action="store_true", help="Send a test reservation email")
    parser.add_argument("--json", type=str, help="JSON string with reservation payload")
    args = parser.parse_args()

    if args.test:
        sample = {
            "id": f"ALVI-TEST-{int(datetime.now().timestamp()) % 10000:04d}",
            "name": "Amodh Gunawardana (Lead Architect Test)",
            "email": "amodhgunawardana@gmail.com",
            "phone": "+94 77 123 4567",
            "district": "Colombo",
            "careRole": "Product Owner / Family Caregiver",
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC")
        }
        print("Dispatching live verification email to admin team and customer...")
        success = send_waitlist_emails(sample)
        sys.exit(0 if success else 1)

    if args.json:
        data = json.loads(args.json)
        success = send_waitlist_emails(data)
        sys.exit(0 if success else 1)

    # If stdin provided
    if not sys.stdin.isatty():
        raw = sys.stdin.read().strip()
        if raw:
            data = json.loads(raw)
            success = send_waitlist_emails(data)
            sys.exit(0 if success else 1)

    parser.print_help()

if __name__ == "__main__":
    main()
