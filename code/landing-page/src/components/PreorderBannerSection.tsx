"use client";

import React from "react";
import VenomButton from "./VenomButton";

interface PreorderBannerProps {
  onOpenWaitlist: () => void;
}

export function PreorderBannerSection({ onOpenWaitlist }: PreorderBannerProps) {
  return (
    <section
      id="reserve"
      className="w-full py-20 sm:py-28 bg-[#F3F3F6] border-t border-[#DEDEDE]"
      aria-label="Priority Waitlist Allocation"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12 md:px-16 text-center">
        <div className="max-w-[700px] mx-auto">
          {/* Subtle Live Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DEDEDE] mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wide text-[#6E6E73] uppercase font-medium">
              Batch 01 Priority Waitlist · 184 of 250 Claimed
            </span>
          </div>

          <h2
            className="font-normal text-[#454545] tracking-[-0.01em] mb-4"
            style={{
              fontSize: "clamp(34px, 4vw, 51px)",
              lineHeight: 1.1,
            }}
          >
            Join the ALVI One Priority Waitlist.
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#6E6E73] leading-[1.6] font-normal mb-6">
            Be the first to bring intelligent, dignified home care to your loved ones. Early waitlist members secure priority Batch 01 allocation, unlimited caregiver app licenses, and white-glove in-home setup in Sri Lanka.
          </p>

          {/* Interactive Symbiote Venom Button CTA */}
          <div className="relative w-full flex items-center justify-center -my-4">
            <VenomButton
              label="Join Priority Waitlist"
              onClick={onOpenWaitlist}
              size={56}
              background="transparent"
              gooColor="#0A0A0C"
              textColor="#FFFFFF"
              font={{
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
              style={{
                width: "100%",
                maxWidth: "700px",
                height: "260px",
                minHeight: "240px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
