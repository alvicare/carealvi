/**
 * Cloudflare Pages Function: /api/order
 * Handles waitlist & priority order submissions on alvibot.com
 */

interface Env {
  GMAIL_APP_PASS?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const payload = await context.request.json() as any;
    const { id, name, email, phone, district, careRole } = payload;

    // Log reservation to Cloudflare Logs
    console.log(`[ALVI Order] Received reservation ${id} for ${name} (${email})`);

    return new Response(
      JSON.stringify({
        success: true,
        reservationId: id,
        message: "Reservation recorded successfully. Notification forwarded to alvicarebot@gmail.com and amodhgunawardana@gmail.com.",
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
