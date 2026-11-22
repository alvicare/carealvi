"use client";

import React, { useEffect, useState } from "react";

const BOOT_LOGS = [
  "INITIALIZING ESP32-S3 FREERTOS KERNEL (240MHz)...",
  "CALIBRATING 4x SOLID-STATE ToF LASER ARRAY...",
  "30mm CLIFF DROP SAFETY WATCHDOG ARMED...",
  "5-CYLINDER HERMETIC CAROUSEL HOMED (72° STEP)...",
  "SMARTWATCH BLE GATT LINK ONLINE (0x180D)...",
  "SYSTEM ONLINE · ALVICARE ONE COMPANION ENGAGED",
];

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check session storage to avoid annoying repeat delays
    const hasSeenIntro = sessionStorage.getItem("alvi_intro_seen");
    if (hasSeenIntro) {
      // Rapid boot sequence for returning navigations
      setProgress(100);
      setLogIndex(BOOT_LOGS.length - 1);
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => setIsDismissed(true), 400);
      }, 350);
      return () => clearTimeout(timer);
    }

    // Lock body scroll during initial preloader
    document.body.style.overflow = "hidden";

    // Telemetry Progress Interval (0% to 100% over ~2.0 seconds)
    const startTime = Date.now();
    const duration = 2100; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Exponential ease-out progression curve
      const eased = Math.round((1 - Math.pow(1 - rawProgress, 3)) * 100);
      setProgress(eased);

      // Advance boot telemetry logs smoothly
      const currentLog = Math.min(
        Math.floor(rawProgress * BOOT_LOGS.length),
        BOOT_LOGS.length - 1
      );
      setLogIndex(currentLog);

      if (rawProgress >= 1) {
        clearInterval(interval);
        sessionStorage.setItem("alvi_intro_seen", "true");
        setTimeout(() => {
          setIsFadingOut(true);
          document.body.style.overflow = "";
          setTimeout(() => setIsDismissed(true), 600);
        }, 300);
      }
    }, 32);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        clearInterval(interval);
        dismissImmediately();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  const dismissImmediately = () => {
    sessionStorage.setItem("alvi_intro_seen", "true");
    setIsFadingOut(true);
    document.body.style.overflow = "";
    setTimeout(() => setIsDismissed(true), 400);
  };

  if (!mounted || isDismissed) return null;

  return (
    <div
      role="dialog"
      aria-label="System Initializing"
      aria-modal="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 sm:p-10 select-none bg-[#0C0C0B] transition-all duration-700 ease-out ${
        isFadingOut
          ? "opacity-0 scale-[1.03] pointer-events-none filter blur-[2px]"
          : "opacity-100 scale-100"
      }`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 45%, rgba(15, 118, 110, 0.22) 0%, rgba(12, 12, 11, 0.98) 75%)",
      }}
    >
      {/* Top Header: System Status & Skip */}
      <div className="w-full max-w-4xl flex items-center justify-between text-xs font-mono text-[#6E6E73] tracking-wider">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[#9E9E9E] font-medium uppercase tracking-widest text-[11px]">
            ALVI Core OS &bull; v2.4.1 Boot Sequence
          </span>
        </div>

        <button
          onClick={dismissImmediately}
          className="text-[11px] text-[#A0A0A5] hover:text-white px-3 py-1 rounded-full border border-white/10 hover:border-white/20 transition-all font-mono"
        >
          Skip Intro <span className="opacity-50 text-[10px]">[Esc]</span>
        </button>
      </div>

      {/* Center: Brand Assembly & Logo Construction */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        {/* Animated Brand Mark Squircle */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-4 bg-teal-500/20 rounded-3xl blur-xl transition-all duration-1000 group-hover:bg-teal-500/30" />
          
          <svg
            viewBox="0 0 512 512"
            className="relative w-20 h-20 sm:w-24 sm:h-24 shadow-[0_8px_32px_rgba(15,118,110,0.4)] rounded-3xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="preloaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F766E" />
                <stop offset="100%" stopColor="#0B4F4A" />
              </linearGradient>
            </defs>

            {/* Squircle Base Tile */}
            <rect width="512" height="512" rx="128" fill="url(#preloaderGrad)" />

            {/* Robotic Arm Stroke Draw */}
            <path
              d="M128 200 L240 376 L384 136"
              stroke="#FFFFFF"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray="400"
              strokeDashoffset={400 - (progress / 100) * 400}
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />

            {/* Warm Peach Care Heart (Pops in after 60% progress) */}
            <path
              d="M384 100 C374 72 320 80 330 118 C340 146 384 166 384 176 C384 166 428 146 438 118 C448 80 394 72 384 100 Z"
              fill="#F59E5B"
              className={`transition-all duration-500 transform ${
                progress >= 55
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-50"
              }`}
              style={{ transformOrigin: "384px 138px" }}
            />
          </svg>
        </div>

        {/* Brand Wordmark & Tagline */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 font-sans">
          ALVICARE <span className="text-teal-400 font-light">ONE</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#8E8E93] max-w-sm font-sans tracking-wide">
          Autonomous Living &amp; Vitality Intelligence
        </p>

        {/* Live Telemetry Boot Ticker */}
        <div className="mt-8 px-4 py-2 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm max-w-md w-full">
          <p className="text-[11px] sm:text-xs font-mono text-teal-400 text-center truncate tracking-wide">
            {BOOT_LOGS[logIndex]}
          </p>
        </div>
      </div>

      {/* Bottom: Progress Bar & Verification Matrix */}
      <div className="w-full max-w-md flex flex-col items-center gap-3">
        {/* Progress Track */}
        <div className="w-full bg-white/10 h-[3px] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-teal-300 to-emerald-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(20,184,166,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry Counter */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#6E6E73]">
          <span>4x Solid-State ToF Arrays &bull; 0.3 m/s Safe Cruising</span>
          <span className="font-semibold text-teal-400">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
