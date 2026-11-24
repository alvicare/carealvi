/**
 * Cloudflare Pages Function: /api/waitlist
 * Handles ALVI One Priority Waitlist submissions & dispatches email notifications.
 * Sends notification to alvicarebot@gmail.com & amodhgunawardana@gmail.com,
 * and confirmation email to the user.
 */

interface Env {
  GMAIL_APP_PASS?: string;
  RESEND_API_KEY?: string;
  ADMIN_EMAIL?: string;
}

interface WaitlistPayload {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  district?: string;
  careRole?: string;
  timestamp?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const payload = (await context.request.json()) as WaitlistPayload;
    const {
      id = `ALVI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name = "Prospective Caregiver",
      email = "",
      phone = "Not provided",
      district = "Colombo",
      careRole = "Primary Family Caregiver",
      timestamp = new Date().toISOString(),
    } = payload;

    console.log(`[ALVI Waitlist] New submission ${id} from ${name} (${email}, ${district})`);

    const adminHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F8F9FA; margin: 0; padding: 24px; color: #1E2023; }
    .card { max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
    .header { border-bottom: 2px solid #0F766E; padding-bottom: 16px; margin-bottom: 24px; }
    .badge { display: inline-block; background-color: #CCFBF1; color: #0F766E; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px; }
    h2 { margin: 12px 0 4px 0; color: #0F766E; font-size: 22px; }
    .sub { color: #64748B; font-size: 14px; margin: 0; }
    .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .details-table td { padding: 10px 12px; border-bottom: 1px solid #F1F5F9; font-size: 14px; }
    .details-table td.label { color: #64748B; font-weight: 600; width: 35%; }
    .details-table td.value { color: #1E2023; font-weight: 500; }
    .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #F1F5F9; font-size: 12px; color: #94A3B8; text-align: center; }
    .btn { display: inline-block; background-color: #0F766E; color: #FFFFFF !important; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">Priority Waitlist Entry</span>
      <h2>New ALVI One Waitlist Registration</h2>
      <p class="sub">Submitted live via <strong>alvibot.com</strong></p>
    </div>
    <table class="details-table">
      <tr><td class="label">Waitlist ID</td><td class="value"><strong>${id}</strong></td></tr>
      <tr><td class="label">Full Name</td><td class="value"><strong>${name}</strong></td></tr>
      <tr><td class="label">Email Address</td><td class="value"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td class="label">Contact Phone</td><td class="value"><strong>${phone}</strong></td></tr>
      <tr><td class="label">District (Sri Lanka)</td><td class="value">${district}</td></tr>
      <tr><td class="label">Caregiver Role</td><td class="value">${careRole}</td></tr>
      <tr><td class="label">Submission Time</td><td class="value">${timestamp}</td></tr>
    </table>
    <div style="text-align: center;">
      <a href="mailto:${email}?subject=Regarding%20Your%20ALVI%20One%20Waitlist%20Spot%20${id}" class="btn">Reply to Prospective User</a>
    </div>
    <div class="footer">
      ALVI Autonomous Home-Care Companion &bull; Informatics Institute of Technology / University of Westminster<br>
      Team Inbox: <a href="mailto:alvicarebot@gmail.com">alvicarebot@gmail.com</a> &bull; Production Domain: <a href="https://alvibot.com">alvibot.com</a>
    </div>
  </div>
</body>
</html>`;

    let emailDispatched = false;

    // 1. Dispatch via Cloudflare MailChannels (Zero external credentials required)
    try {
      const mailChannelsRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalizations: [
            {
              to: [
                { email: "alvicarebot@gmail.com", name: "ALVI Care Admin" },
                { email: "amodhgunawardana@gmail.com", name: "Amodh Gunawardana" },
              ],
            },
          ],
          from: {
            email: "waitlist@alvibot.com",
            name: "ALVI One Care Systems",
          },
          subject: `[ALVI One Waitlist] New Registration: ${id} - ${name} (${district})`,
          content: [
            {
              type: "text/html",
              value: adminHtml,
            },
          ],
        }),
      });

      if (mailChannelsRes.ok) {
        emailDispatched = true;
        console.log(`[ALVI Waitlist] Dispatched admin email via MailChannels`);
      }
    } catch (e) {
      console.warn(`[ALVI Waitlist] MailChannels attempt:`, e);
    }

    // 2. Dispatch Customer Confirmation via MailChannels (if valid email provided)
    if (email && email.includes("@")) {
      const custHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F8F9FA; margin: 0; padding: 24px; color: #1E2023; }
    .card { max-width: 560px; margin: 0 auto; background: #FFFFFF; border-radius: 18px; border: 1px solid #E2E8F0; padding: 36px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .brand { color: #0F766E; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 8px; }
    h1 { font-size: 22px; font-weight: 700; margin: 8px 0 16px 0; color: #1E2023; }
    p { font-size: 15px; line-height: 1.6; color: #475569; margin: 10px 0; }
    .res-box { background: #F0FDFA; border: 1px solid #99F6E4; border-radius: 12px; padding: 18px; margin: 24px 0; text-align: center; }
    .res-num { font-size: 26px; font-weight: 800; color: #0F766E; letter-spacing: 1px; margin-top: 4px; }
    .btn { display: inline-block; background-color: #0F766E; color: #FFFFFF !important; text-decoration: none; padding: 12px 28px; border-radius: 100px; font-size: 14px; font-weight: 600; margin-top: 20px; }
    .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #F1F5F9; font-size: 12px; color: #94A3B8; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="brand">ALVICARE</div>
    <h1>You are on the ALVI One Priority Waitlist!</h1>
    <p>Dear ${name},</p>
    <p>We are delighted to confirm your early waitlist spot for the <strong>ALVI One Autonomous Home-Care Companion Robot</strong>. Your registration has been secured for Batch 01 allocation in ${district}.</p>
    
    <div class="res-box">
      <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #0F766E; letter-spacing: 1px;">Confirmed Waitlist Pass</div>
      <div class="res-num">${id}</div>
      <div style="font-size: 13px; color: #0D9488; margin-top: 4px;">Role: ${careRole} &bull; ${district}, Sri Lanka</div>
    </div>

    <p>Our engineering team at Informatics Institute of Technology (IIT) in collaboration with University of Westminster is finalizing prototype testing, 5-cylinder hermetic pill dispensing, and 24/7 dual-trigger fall safety.</p>

    <div style="text-align: center;">
      <a href="mailto:alvicarebot@gmail.com?subject=Inquiry%20from%20Waitlist%20Pass%20${id}" class="btn">Contact ALVI Engineering Team</a>
    </div>

    <div class="footer">
      ALVICARE Systems &bull; Colombo, Sri Lanka<br>
      Website: <a href="https://alvibot.com">https://alvibot.com</a> &bull; Support: <a href="mailto:alvicarebot@gmail.com">alvicarebot@gmail.com</a>
    </div>
  </div>
</body>
</html>`;

      try {
        await fetch("https://api.mailchannels.net/tx/v1/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            personalizations: [{ to: [{ email, name }] }],
            from: { email: "support@alvibot.com", name: "ALVI Care Systems" },
            subject: `Your ALVI One Priority Waitlist Confirmation (${id})`,
            content: [{ type: "text/html", value: custHtml }],
          }),
        });
      } catch (e) {
        console.warn(`[ALVI Waitlist] Customer confirmation attempt:`, e);
      }
    }

    // 3. Fallback to Local Python Service if running locally
    try {
      await fetch("http://127.0.0.1:8088/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Local daemon optional
    }

    return new Response(
      JSON.stringify({
        success: true,
        reservationId: id,
        emailDispatched,
        message: "Waitlist registration recorded successfully. Notifications dispatched to team.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Invalid request" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
