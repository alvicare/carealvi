"use client";

import React, { useState } from "react";
import { AlviCareLogo } from "./origami-logo";
import { VelourBolster } from "./VelourBolster";

interface NavigationProps {
  onOpenWaitlist: () => void;
  onOpenVideo?: () => void;
  activeSegment: "home-care" | "caregiver-app";
  onSegmentChange: (segment: "home-care" | "caregiver-app") => void;
}

export function Navigation({
  onOpenWaitlist,
  onOpenVideo,
  activeSegment,
  onSegmentChange,
}: NavigationProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");

  return (
    <header className="fixed top-0 left-0 w-full h-[90px] z-50 flex items-center justify-between px-6 sm:px-10 md:px-14 pointer-events-none transition-all duration-300">
      {/* LEFT: Official AlviCare Logo + Brand Wordmark + Language Selector */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <a
          href="#"
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-85"
          aria-label="ALVICARE Home"
        >
          <AlviCareLogo className="w-7 h-7 rounded-lg shadow-[0_2px_8px_rgba(15,118,110,0.22)] transition-transform duration-500 group-hover:scale-105" />
          <span className="font-semibold text-[15px] tracking-tight text-[#1D1D1F]">ALVICARE</span>
        </a>

        {/* Minimal Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="text-[13px] text-[#6E6E73] hover:text-[#454545] font-normal tracking-tight flex items-center gap-1 transition-colors px-1 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-[#BEBEBE]"
            aria-label="Select Language"
            aria-expanded={langOpen}
          >
            <span>{selectedLang}</span>
            <span className="text-[10px] text-[#BEBEBE] mt-[1px]">⌄</span>
          </button>

          {langOpen && (
            <div className="absolute top-8 left-0 w-24 py-1.5 bg-white/95 backdrop-blur-xl border border-[#DEDEDE] rounded-xl shadow-lg z-50 flex flex-col">
              {["EN", "SIN", "TA"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setLangOpen(false);
                  }}
                  className={`px-3 py-1 text-[12px] text-left transition-colors ${
                    selectedLang === lang
                      ? "text-[#454545] font-medium bg-[#F3F3F6]"
                      : "text-[#6E6E73] hover:text-[#454545] hover:bg-[#F8F9FA]"
                  }`}
                >
                  {lang === "EN" ? "English" : lang === "SIN" ? "සිංහල" : "தமிழ்"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CENTRE: Frosted Glass Segmented Pill */}
      <div className="hidden sm:flex items-center pointer-events-auto">
        <nav
          className="flex items-center p-[4px] rounded-[100px] border border-[rgba(222,222,222,0.6)] shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          style={{
            backgroundColor: "rgba(232, 232, 237, 0.72)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          aria-label="Primary Navigation Segments"
        >
          <button
            onClick={() => onSegmentChange("home-care")}
            className={`px-4 py-1.5 rounded-[100px] text-[13px] font-normal transition-all duration-300 ${
              activeSegment === "home-care"
                ? "bg-white text-[#454545] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                : "text-[#6E6E73] hover:text-[#454545]"
            }`}
          >
            Home Care
          </button>
          <button
            onClick={() => onSegmentChange("caregiver-app")}
            className={`px-4 py-1.5 rounded-[100px] text-[13px] font-normal transition-all duration-300 ${
              activeSegment === "caregiver-app"
                ? "bg-white text-[#454545] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                : "text-[#6E6E73] hover:text-[#454545]"
            }`}
          >
            Caregiver App
          </button>
        </nav>
      </div>

      {/* RIGHT: Watch Film + Waitlist CTA */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 pointer-events-auto">
        {onOpenVideo && (
          <button
            onClick={onOpenVideo}
            className="hidden md:inline-flex items-center gap-1.5 h-[32px] px-3.5 rounded-[100px] border border-[#DEDEDE] bg-white/80 hover:bg-white text-[#454545] text-[13px] font-normal tracking-tight transition-all duration-200 backdrop-blur-md"
            aria-label="Watch ALVI One Launch Film"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Watch Film (41s)
          </button>
        )}
        <VelourBolster
          text="Join Waitlist"
          fabric="#0F766E"
          textColor="#FFFFFF"
          buttonWidth={120}
          buttonHeight={32}
          radius={16}
          compact={true}
          onClick={onOpenWaitlist}
          font={{
            fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: "-0.01em",
          }}
        />
      </div>
    </header>
  );
}
