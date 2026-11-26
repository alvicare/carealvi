"use client";

import React, { useRef, useState, useEffect } from "react";
import { RobotCanvas } from "./RobotCanvas";
import { WatchHeroLayer } from "./WatchHeroLayer";
import { HERO_SCROLL_PHASES } from "./heroScrollPhases";

interface HeroScrollSectionProps {
  onOpenWaitlist: () => void;
}

export function HeroScrollSection({ onOpenWaitlist }: HeroScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // One shared timeline keeps the positioning and watch-scrub phases in sync.
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const effectiveProgress = mediaQuery.matches ? 0.85 : progress;
        scrollProgressRef.current = effectiveProgress;

        const wordmarkOpacity = mediaQuery.matches
          ? 0
          : effectiveProgress <= 0.04
          ? 1
          : Math.max(0, 1 - (effectiveProgress - 0.04) / 0.28);
        const wordmarkTranslateY =
          effectiveProgress <= 0.04 ? 0 : -(effectiveProgress - 0.04) * 24;
        const leftColOpacity = mediaQuery.matches
          ? 1
          : effectiveProgress <= 0.12
          ? 0
          : Math.min(1, (effectiveProgress - 0.12) / 0.26);
        const leftColTranslateY = mediaQuery.matches
          ? 0
          : effectiveProgress <= 0.12
          ? 20
          : 20 * (1 - Math.min(1, (effectiveProgress - 0.12) / 0.26));

        if (wordmarkRef.current) {
          wordmarkRef.current.style.opacity = String(wordmarkOpacity);
          wordmarkRef.current.style.transform = `translateY(${wordmarkTranslateY}px)`;
        }
        if (leftColumnRef.current) {
          leftColumnRef.current.style.opacity = String(leftColOpacity);
          leftColumnRef.current.style.transform = `translateY(${leftColTranslateY}px)`;
        }
        if (scrollHintRef.current) {
          scrollHintRef.current.style.opacity =
            !mediaQuery.matches && effectiveProgress < 0.25 ? "1" : "0";
          scrollHintRef.current.style.visibility =
            !mediaQuery.matches && effectiveProgress < 0.25 ? "visible" : "hidden";
        }
      });
    };

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      handleScroll();
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${
        prefersReducedMotion ? "h-[100svh]" : "h-[285svh] md:h-[340vh]"
      } bg-white`}
      aria-label="ALVICARE Hero Overview"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between">
        {/* Giant Background Wordmark: ALVICARE */}
        <div
          ref={wordmarkRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 px-4 transition-all duration-300"
          style={{
            opacity: 1,
            transform: "translateY(0px)",
          }}
        >
          <h1
            className="text-center font-medium uppercase leading-none hero-wordmark-gradient"
            style={{
              fontSize: "clamp(76px, 13.5vw, 210px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.0,
            }}
          >
            ALVICARE
          </h1>
        </div>

        {/* Photorealistic Smartwatch Layer (Positioned at z-[5] Behind the 3D Robot Model) */}
        <WatchHeroLayer scrollProgressRef={scrollProgressRef} />

        {/* Full-bleed 3D Canvas with Scaled-Down Product */}
        <div className="absolute inset-0 z-10">
          <RobotCanvas
            scrollProgressRef={scrollProgressRef}
            showHotspots={false}
          />
        </div>

        {/* Left Hero Column: Minimal Apple-Grade Product Lockup */}
        <div
          ref={leftColumnRef}
          className="relative z-20 pointer-events-none w-full h-full flex items-end pb-[56px] px-6 sm:px-12 md:items-center md:pb-0 md:px-16 lg:px-24"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="max-w-[440px] pointer-events-auto">
            {/* Pure Product Title Lockup */}
            <h2 className="text-[32px] tracking-tight leading-tight mb-2">
              <span className="text-brand-teal font-bold">ALVI</span>{" "}
              <span className="text-brand-deep font-normal">One</span>
            </h2>

            {/* Whisper-Quiet Subline */}
            <p className="text-[16px] text-muted leading-[1.45] font-normal mb-8">
              The world&apos;s most advanced / autonomous home-care companion
            </p>

            {/* Dark Pill CTA */}
            <div>
              <button
                onClick={onOpenWaitlist}
                className="h-[45px] px-[28px] rounded-[100px] bg-brand-teal hover:bg-brand-deep text-white text-[14px] font-medium tracking-tight transition-all duration-300 transform active:scale-95 shadow-[0_4px_16px_rgba(15,118,110,0.2)] focus:outline-none focus:ring-2 focus:ring-brand-teal"
              >
                Reserve Early Access
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div ref={scrollHintRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none transition-opacity duration-500">
            <span className="text-[11px] text-numeral tracking-[0.16em] uppercase font-light">
              Scroll to explore
            </span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-numeral to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
