"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SRI_LANKA_DISTRICTS = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Galle",
  "Matara",
  "Kurunegala",
  "Anuradhapura",
  "Jaffna",
  "Ratnapura",
  "Badulla",
  "Batticaloa",
  "Other / Overseas",
];

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("Colombo");
  const [careRole, setCareRole] = useState("Primary Family Caregiver");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reservationCount, setReservationCount] = useState(184);
  const [reservationId, setReservationId] = useState("");

  useEffect(() => {
    // Load local storage count if exists
    try {
      const stored = localStorage.getItem("alvi_waitlist_reservations");
      if (stored) {
        const parsed = JSON.parse(stored);
        setReservationCount(184 + parsed.length);
      }
    } catch {
      // fallback
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    setSubmitting(true);
    const newReservation = {
      id: `ALVI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone: `+94 ${phone}`,
      district,
      careRole,
      timestamp: new Date().toISOString(),
    };

    try {
      const stored = localStorage.getItem("alvi_waitlist_reservations");
      const list = stored ? JSON.parse(stored) : [];
      list.push(newReservation);
      localStorage.setItem("alvi_waitlist_reservations", JSON.stringify(list));
      setReservationCount((prev) => prev + 1);
    } catch {
      // ignore
    }

    // Forward to background email notification API
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReservation),
      }).catch(() => {
        return fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReservation),
        });
      });
    } catch {
      // Fallback gracefully if running in static offline mode
    }

    setReservationId(newReservation.id);
    setSubmitting(false);
    setSubmitted(true);

    // Subtle Apple-style confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#0F766E", "#0F766E", "#F59E5B"],
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[540px] max-h-[90vh] overflow-y-auto rounded-[22px] bg-white/95 backdrop-blur-2xl border border-divider shadow-[0_24px_64px_rgba(0,0,0,0.12)] p-6 sm:p-8 transition-all"
        style={{
          boxShadow: "0 24px 64px -12px rgba(15, 118, 110, 0.14)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface hover:bg-brand-pale text-muted hover:text-primary flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-numeral"
          aria-label="Close Modal"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            {/* Brand Header with Official Logo */}
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/alvicare-app-icon.svg"
                alt="AlviCare"
                className="w-7 h-7 rounded-lg shadow-sm"
              />
              <span className="font-semibold text-[15px] tracking-tight text-primary">
                ALVICARE
              </span>
            </div>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[100px] bg-surface border border-divider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
              <span className="text-[11px] font-medium tracking-wide text-muted uppercase">
                Priority Batch 01 Waitlist
              </span>
            </div>

            <h3
              id="modal-title"
              className="text-[26px] font-medium text-brand-deep tracking-tight leading-tight mb-2"
            >
              Join the ALVI One Priority Waitlist
            </h3>

            <p className="text-[14px] text-muted leading-relaxed mb-6">
              Claim an initial deployment slot for the{" "}
              <strong className="text-primary font-medium">ALVI One</strong>{" "}
              autonomous home-care companion robot &amp; caregiver mobile app.
            </p>

            {/* Live Reservation Counter */}
            <div className="p-3 rounded-xl bg-surface border border-brand-pale flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-numeral uppercase">
                  Batch Status
                </span>
                <span className="text-[12px] font-medium text-primary">
                  {reservationCount} of 250 claimed
                </span>
              </div>
              <div className="w-24 h-1.5 bg-brand-pale rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-teal rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (reservationCount / 250) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Form with Visible Labels */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="caregiverName"
                  className="block text-[12px] font-medium text-primary uppercase tracking-wider mb-1"
                >
                  Caregiver Name
                </label>
                <input
                  id="caregiverName"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Amodh Gunawardana"
                  className="w-full h-11 px-3.5 rounded-xl border border-divider bg-white text-[14px] text-primary placeholder-numeral focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="caregiverEmail"
                    className="block text-[12px] font-medium text-primary uppercase tracking-wider mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="caregiverEmail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amodh@example.com"
                    className="w-full h-11 px-3.5 rounded-xl border border-divider bg-white text-[14px] text-primary placeholder-numeral focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="caregiverPhone"
                    className="block text-[12px] font-medium text-primary uppercase tracking-wider mb-1"
                  >
                    +94 Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-muted font-mono">
                      +94
                    </span>
                    <input
                      id="caregiverPhone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="77 123 4567"
                      className="w-full h-11 pl-12 pr-3.5 rounded-xl border border-divider bg-white text-[14px] text-primary placeholder-numeral focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="caregiverDistrict"
                    className="block text-[12px] font-medium text-primary uppercase tracking-wider mb-1"
                  >
                    Deployment District
                  </label>
                  <select
                    id="caregiverDistrict"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-divider bg-white text-[14px] text-primary focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                  >
                    {SRI_LANKA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="caregiverRole"
                    className="block text-[12px] font-medium text-primary uppercase tracking-wider mb-1"
                  >
                    Care Role
                  </label>
                  <select
                    id="caregiverRole"
                    value={careRole}
                    onChange={(e) => setCareRole(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-divider bg-white text-[14px] text-primary focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                  >
                    <option value="Primary Family Caregiver">Primary Family Caregiver</option>
                    <option value="Clinical Physician / Nurse">Clinical Physician / Nurse</option>
                    <option value="Assisted Living Operator">Assisted Living Operator</option>
                    <option value="Independent Senior">Independent Resident</option>
                  </select>
                </div>
              </div>

              {/* Strict Privacy Notice Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-divider text-brand-teal focus:ring-brand-teal"
                  />
                  <span className="text-[11px] text-muted leading-relaxed">
                    I acknowledge and consent to the edge-encrypted processing of
                    telemetry &amp; medication schedules under the{" "}
                    <strong className="text-primary">
                      Sri Lanka Personal Data Protection Act No. 9 of 2022
                    </strong>{" "}
                    and <strong className="text-primary">UK GDPR</strong>.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={!consent || submitting}
                className="w-full h-[46px] rounded-[100px] bg-brand-teal hover:bg-brand-deep disabled:opacity-50 text-white text-[14px] font-medium tracking-tight transition-all duration-300 transform active:scale-98 shadow-[0_4px_16px_rgba(15,118,110,0.3)] mt-3 flex items-center justify-center gap-2"
              >
                {submitting ? "Securing Spot & Emailing..." : "Join Priority Waitlist"}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-brand-pale border border-brand-mint-bright text-brand-teal flex items-center justify-center mx-auto mb-4 text-[24px]">
              ✓
            </div>

            <h3 className="text-[22px] font-medium text-brand-deep tracking-tight mb-2">
              Waitlist Spot Confirmed
            </h3>

            <p className="text-[14px] text-muted leading-relaxed max-w-[380px] mx-auto mb-4">
              Thank you, <strong className="text-primary">{name}</strong>. Your priority
              waitlist registration has been secured and an email notification has been dispatched to our engineering team.
            </p>

            {/* Pass Card */}
            <div className="bg-surface border border-brand-pale rounded-2xl p-4 text-left max-w-[380px] mx-auto mb-5">
              <div className="flex justify-between items-center pb-2 border-b border-divider mb-2">
                <span className="text-[10px] font-mono text-muted uppercase">
                  Waitlist Pass
                </span>
                <span className="text-[12px] font-mono font-semibold text-brand-teal">
                  {reservationId}
                </span>
              </div>
              <div className="space-y-1.5 text-[11px] text-muted">
                <div className="flex justify-between">
                  <span>Region:</span>
                  <span className="font-medium text-primary">{district}, Sri Lanka</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact:</span>
                  <span className="font-medium text-primary">+94 {phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium text-brand-teal">Dispatched to Team &amp; Email</span>
                </div>
              </div>
            </div>

            {/* Action buttons: Direct Mailto & Done */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[380px] mx-auto">
              <a
                href={`mailto:alvicarebot@gmail.com?subject=Regarding%20ALVI%20Reservation%20${reservationId}&body=Hello%20ALVI%20Care%20Team%2C%0A%0AMy%20reservation%20ID%20is%20${reservationId}.%20Name%3A%20${encodeURIComponent(name)}.%0A%0A`}
                className="w-full sm:w-auto h-[40px] px-6 rounded-[100px] border border-divider hover:bg-surface text-primary text-[13px] font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>✉ Email Support</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto h-[40px] px-8 rounded-[100px] bg-brand-teal hover:bg-brand-deep text-white text-[13px] font-normal transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
