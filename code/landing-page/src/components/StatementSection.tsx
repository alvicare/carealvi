"use client";

import React, { useRef, useState, useEffect } from "react";

const STATEMENT_TEXT =
  "Care shouldn't mean compromise. No missed medication doses, no unnoticed falls, and no hospital clutter in your home. ALVI runs on quiet autonomous intelligence, the easiest and safest way to look after your parents in their own environment.";

export function StatementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const words = STATEMENT_TEXT.split(" ");

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable =
        containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      // 1. When rect.top > 0, the section is still entering the screen from below.
      // Progress stays strictly 0 (no words reveal, previous section scrolls away completely).
      if (rect.top > 0) {
        animationFrameId = requestAnimationFrame(() => {
          setScrollProgress(0);
        });
        return;
      }

      // 2. Once rect.top <= 0, the section is locked sticky at top: 0!
      // Scroll progress scrubs from 0.0 to 1.0 strictly while fixed in place.
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));

      animationFrameId = requestAnimationFrame(() => {
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[180vh] md:h-[220vh] bg-surface"
      aria-label="ALVICARE Statement"
    >
      {/* Sticky Full-Viewport Stage: locks into place when it reaches the top */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex items-center justify-center px-6 sm:px-12 md:px-20 lg:px-24">
        {/* Soft Blurred Out-Of-Focus Macro Abstract Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Soft Aluminium Base Macro Highlight */}
          <div
            className="absolute -top-36 left-1/4 w-[700px] h-[700px] rounded-full bg-white/80"
            style={{ filter: "blur(85px)" }}
          />
          {/* Slate Blue-Grey (#0F766E) Organic Depth Gradient */}
          <div
            className="absolute top-1/3 -right-24 w-[760px] h-[760px] rounded-full bg-brand-teal/18"
            style={{ filter: "blur(95px)" }}
          />
          {/* Warm Studio Aluminium Curve */}
          <div
            className="absolute -bottom-28 left-1/3 w-[560px] h-[560px] rounded-full bg-brand-pale/90"
            style={{ filter: "blur(85px)" }}
          />
          {/* Subtle Macro Material Texture */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(#1E2023 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Centered Large Minimal Statement Typography Container */}
        <div className="relative z-10 max-w-[960px] mx-auto text-center">
          {/* Word-by-Word Scrubbed Reveal (Activates only when pinned) */}
          <p
            className="text-[26px] sm:text-[34px] md:text-[42px] lg:text-[46px] leading-[1.3] sm:leading-[1.28] font-light tracking-[-0.02em] text-center"
            style={{ color: "#1E2023" }}
          >
            {words.map((word, index) => {
              // Keep the opening promise in brand teal as the rest of the sentence reveals.
              let opacity = 0.25;

              if (index <= 1) {
                opacity = 1;
              } else {
                // Map remaining words across scroll progress
                const totalRemaining = words.length - 2;
                const wordTargetProgress = (index - 2) / totalRemaining;

                if (scrollProgress >= wordTargetProgress) {
                  const localProgress = Math.min(
                    1,
                    Math.max(
                      0,
                      (scrollProgress - wordTargetProgress) *
                        (totalRemaining / 2.0)
                    )
                  );
                  opacity = 0.25 + 0.75 * localProgress;
                }
              }

              return (
                <span
                  key={index}
                  className="inline-block mx-[0.16em] transition-opacity duration-150"
                  style={{
                    opacity,
                    color: index <= 3 ? "var(--brand-teal)" : "#1E2023",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
