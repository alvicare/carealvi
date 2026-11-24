"use client";

import React from "react";

interface PreorderBannerProps {
  onOpenWaitlist: () => void;
}

export function PreorderBannerSection({ onOpenWaitlist }: PreorderBannerProps) {
  return (
    <section
      id="reserve"
      className="w-full py-28 sm:py-36 bg-[#F3F3F6] border-t border-[#DEDEDE]"
      aria-label="Priority Waitlist Allocation"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12 md:px-16 text-center">
        <div className="max-w-[660px] mx-auto">
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

          <p className="text-[15px] sm:text-[16px] text-[#6E6E73] leading-[1.6] font-normal mb-8">
            Be the first to bring intelligent, dignified home care to your loved ones. Early waitlist members secure priority Batch 01 allocation, unlimited caregiver app licenses, and white-glove in-home setup in Sri Lanka.
          </p>

          <button
            onClick={onOpenWaitlist}
            className="h-[48px] px-8 rounded-full bg-[#0F766E] hover:bg-[#0D655E] text-white text-[14px] font-medium tracking-tight transition-all duration-300 transform active:scale-95 shadow-[0_4px_16px_rgba(15,118,110,0.3)] focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          >
            Join Priority Waitlist
          </button>
        </div>
      </div>
    </section>
  );
}
