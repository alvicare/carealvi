"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export interface BotTopic {
  id: string;
  num: string;
  title: string;
  headline: string;
  description: string;
}

export const BOT_TOPICS: BotTopic[] = [
  {
    id: "empathy",
    num: "01",
    title: "Autonomous Empathy Engine",
    headline: "Natural expressions that comfort and reassure.",
    description:
      "ALVI recognizes household faces through edge vision, greeting family with gentle micro-interactions and empathetic gaze.",
  },
  {
    id: "medication",
    num: "02",
    title: "Scheduled Medication Verification",
    headline: "Clear visual guidance when dose time arrives.",
    description:
      "A soft audible chime and high-contrast prompts illuminate, staying present until onboard sensors confirm the regimen is complete.",
  },
  {
    id: "telepresence",
    num: "03",
    title: "Two-Way Telehealth & Family Link",
    headline: "Instant low-latency connection across any distance.",
    description:
      "Directional beamforming audio and encrypted video bring physicians and loved ones directly to the bedside with a single tap.",
  },
];

const TOTAL_FRAMES = 239;
const FRAMES_BASE_URL = "/bot_frames/frame_";
const FALLBACK_IMAGE = "/bot.webp";
const STATEMENT = "Always present. Never intrusive.";
const STAGES = [
  { start: 0, end: 0.13, label: "THE MOMENT" },
  { start: 0.13, end: 0.29, label: "ALVI ARRIVES" },
  { start: 0.29, end: 0.47, label: "01 · EMPATHY" },
  { start: 0.47, end: 0.65, label: "02 · MEDICATION" },
  { start: 0.65, end: 0.83, label: "03 · FAMILY LINK" },
  { start: 0.83, end: 0.97, label: "ALWAYS PRESENT" },
];

type BeatCopy = { eyebrow: string; title: string; description?: string };
const BEATS: BeatCopy[] = [
  {
    eyebrow: "A CARE MOMENT, CONTINUED",
    title: "The moment continues at home.",
  },
  {
    eyebrow: "A FAMILIAR PRESENCE",
    title: "ALVI arrives in the room.",
    description: "A calm companion, ready when care calls for it.",
  },
  {
    eyebrow: "01 · AUTONOMOUS EMPATHY ENGINE",
    title: BOT_TOPICS[0].headline,
    description: BOT_TOPICS[0].description,
  },
  {
    eyebrow: "02 · SCHEDULED MEDICATION VERIFICATION",
    title: BOT_TOPICS[1].headline,
    description: BOT_TOPICS[1].description,
  },
  {
    eyebrow: "03 · TWO-WAY TELEHEALTH & FAMILY LINK",
    title: "A familiar face, on ALVI’s display.",
    description: BOT_TOPICS[2].description,
  },
  {
    eyebrow: "ALVI AT HOME",
    title: STATEMENT,
    description: "Three thoughtful capabilities. One familiar presence.",
  },
];

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smooth(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function stageVisibility(progress: number, start: number, end: number) {
  const local = (progress - start) / (end - start);
  const fadeIn = smooth(local / 0.14);
  const fadeOut = smooth((1 - local) / 0.14);
  return Math.min(fadeIn, fadeOut);
}

export function TelepresenceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameNumbersRef = useRef<number[]>([]);
  const drawCurrentFrameRef = useRef<() => void>(() => {});

  const [scrollProgress, setScrollProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    updateViewport();
    setPrefersReducedMotion(mediaQuery.matches);
    window.addEventListener("resize", updateViewport);
    const handleMediaChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      window.removeEventListener("resize", updateViewport);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let remainingLoaded = false;
    const frameNumbers = Array.from({ length: TOTAL_FRAMES }, (_, index) => index).filter(
      (index) => !isMobile || index % 2 === 0
    );
    if (frameNumbers[frameNumbers.length - 1] !== TOTAL_FRAMES - 1) {
      frameNumbers.push(TOTAL_FRAMES - 1);
    }
    const images: HTMLImageElement[] = new Array(frameNumbers.length);
    frameNumbersRef.current = frameNumbers;
    imagesRef.current = images;

    const loadFrame = (slot: number) => {
      if (cancelled || images[slot]) return;
      const image = new Image();
      images[slot] = image;
      image.onload = () => {
        if (cancelled) return;
        if (slot === 0) setImagesLoaded(true);
        drawCurrentFrameRef.current();
      };
      image.src = `${FRAMES_BASE_URL}${String(frameNumbers[slot] + 1).padStart(4, "0")}.webp`;
    };
    loadFrame(0);

    const observer = new IntersectionObserver((entries) => {
      if (remainingLoaded || !entries.some((entry) => entry.isIntersecting)) return;
      remainingLoaded = true;
      for (let slot = 1; slot < frameNumbers.length; slot += 1) loadFrame(slot);
      observer.disconnect();
    }, { rootMargin: "100% 0px" });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      cancelled = true;
      observer.disconnect();
      imagesRef.current = [];
      frameNumbersRef.current = [];
    };
  }, [isMobile]);

  useEffect(() => {
    let animationFrameId = 0;
    const updateProgress = () => {
      if (!containerRef.current || prefersReducedMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = containerRef.current.offsetHeight - window.innerHeight;
      const next = scrollable <= 0 ? 0 : clamp01(-rect.top / scrollable);
      if (stageRef.current) stageRef.current.style.setProperty("--scroll-progress", String(next));
      setScrollProgress((current) => (Math.abs(current - next) > 0.002 ? next : current));
    };
    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateProgress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateProgress();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  const frameIndex = useMemo(() => {
    const frameNumbers = frameNumbersRef.current;
    if (!frameNumbers.length) return 0;

    // Keep the existing animation beats aligned with the storyboard: expressive
    // eyes, medication prompt, family call, then the clinician connection.
    const frameAt = (start: number, end: number, first: number, last: number) =>
      first + smooth((scrollProgress - start) / (end - start)) * (last - first);
    let targetFrame = 0;
    if (scrollProgress < 0.29) targetFrame = 0;
    else if (scrollProgress < 0.47) targetFrame = frameAt(0.29, 0.47, 0, 25);
    else if (scrollProgress < 0.65) targetFrame = frameAt(0.47, 0.65, 25, 88);
    else if (scrollProgress < 0.83) targetFrame = frameAt(0.65, 0.83, 88, 160);
    else targetFrame = frameAt(0.83, 0.97, 160, TOTAL_FRAMES - 1);

    const slot = frameNumbers.findIndex((frameNumber) => frameNumber >= targetFrame);
    return slot === -1 ? frameNumbers.length - 1 : slot;
  }, [scrollProgress, isMobile, imagesLoaded]);

  const drawCurrentFrame = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const image = imagesRef.current[frameIndex];
    if (!canvas || !context || !image?.complete || image.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
  };
  drawCurrentFrameRef.current = drawCurrentFrame;

  useEffect(() => {
    drawCurrentFrame();
  }, [frameIndex, imagesLoaded, isMobile]);

  const activeBeatIndex = useMemo(() => {
    const index = STAGES.findIndex((stage) => scrollProgress >= stage.start && scrollProgress < stage.end);
    return index === -1 ? STAGES.length - 1 : index;
  }, [scrollProgress]);

  const robotIn = smooth((scrollProgress - 0.07) / 0.2);
  const robotOut = 1 - smooth((scrollProgress - 0.94) / 0.06);
  const robotOpacity = prefersReducedMotion ? 1 : robotIn * robotOut;
  const copy = BEATS[activeBeatIndex];
  const copyOpacity = stageVisibility(scrollProgress, STAGES[activeBeatIndex].start, STAGES[activeBeatIndex].end);
  const handoffProgress = smooth(scrollProgress / 0.19);
  const familyPush = smooth((scrollProgress - STAGES[4].start) / (STAGES[4].end - STAGES[4].start));
  const familySettle = smooth((scrollProgress - STAGES[4].end) / 0.06);
  const familyCameraScale = 1 + 0.28 * familyPush * (1 - familySettle);
  const showFinal = activeBeatIndex === 5;
  const activeLabel = STAGES[activeBeatIndex].label;

  if (prefersReducedMotion) {
    return (
      <section id="telepresence" className="bg-brand-dark px-6 py-20 text-white sm:px-10" aria-label="ALVICARE Telepresence and Expressive Interface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="mb-4 font-mono text-xs tracking-[.18em] text-brand-mint-bright">ALVI AT HOME</p>
            <h2 className="font-heading text-4xl leading-tight tracking-[-.035em] text-brand-mint-bright sm:text-5xl">{STATEMENT}</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">The moment continues at home. ALVI brings a familiar presence, thoughtful support, and a clearer connection to family.</p>
            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              {BOT_TOPICS.map((topic) => (
                <article key={topic.id}>
                  <span className="font-mono text-xs text-brand-mint-bright">{topic.num}</span>
                  <h3 className="mt-2 font-heading text-lg leading-snug text-white">{topic.title}</h3>
                </article>
              ))}
            </div>
          </div>
          <img src={FALLBACK_IMAGE} alt="ALVI care companion robot" className="mx-auto w-full max-w-md object-contain" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="telepresence"
      ref={containerRef}
      className={`relative w-full ${isMobile ? "h-[320svh]" : "h-[480svh]"} bg-brand-dark text-white selection:bg-white/20`}
      aria-label="ALVICARE Telepresence and Expressive Interface"
    >
      <div ref={stageRef} className="sticky top-0 h-[100svh] w-full overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_45%,rgba(20,184,166,.18),transparent_42%),linear-gradient(120deg,#083B37_0%,#072B28_100%)]" />
        <div className="absolute -right-[12%] top-[10%] h-[70vh] w-[60vw] rounded-full bg-brand-teal/10 blur-[100px]" />

        <div className="absolute left-6 top-7 z-30 sm:left-10 sm:top-9 md:left-16">
          <p className="font-mono text-[10px] tracking-[.2em] text-brand-mint-bright sm:text-xs">ALVI · CARE, CLOSE TO HOME</p>
        </div>

        <div
          className="absolute right-[-8%] top-[4%] z-10 h-[44svh] w-[116vw] sm:right-[-2%] sm:top-[1%] sm:h-[68%] sm:w-[68%] md:right-[-4%] md:top-[-4%] md:h-[106%] md:w-[65%]"
          style={{ opacity: robotOpacity, transform: `translate3d(${(1 - robotIn) * 90}px, 0, 0) scale(${familyCameraScale})`, transformOrigin: "58% 52%" }}
          aria-hidden="true"
        >
          <canvas ref={canvasRef} className="block h-full w-full drop-shadow-[0_28px_65px_rgba(0,0,0,.48)]" />
        </div>

        <svg
          className="absolute left-[5%] top-[20%] z-20 h-24 w-64 sm:left-[10%] sm:top-[22%] md:left-[38%] md:top-[22%]"
          viewBox="0 0 260 96"
          aria-hidden="true"
          style={{ opacity: 1 - handoffProgress, transform: `translateX(${handoffProgress * 130}px) scale(${1 - handoffProgress * 0.3})` }}
        >
          <rect x="30" y="36" width="60" height="24" rx="12" transform="rotate(-22 60 48)" fill="#F3F7F4" />
          <rect x="38" y="36" width="60" height="24" rx="12" transform="rotate(-22 68 48)" fill="#54C2B4" fillOpacity=".85" />
          <rect x="151" y="19" width="72" height="58" rx="20" fill="#54C2B4" fillOpacity=".055" stroke="#A6ECDD" strokeOpacity=".56" strokeWidth="1.5" transform={`rotate(${handoffProgress * 14} 187 48)`} />
          <circle cx="130" cy="48" r="3" fill="#F4C38F" opacity={handoffProgress} />
        </svg>

        <div className="absolute inset-x-6 bottom-[12%] z-30 h-[32%] sm:inset-x-10 md:bottom-auto md:left-[7%] md:right-auto md:top-1/2 md:h-[54%] md:w-[36%] md:-translate-y-1/2">
          {BEATS.map((beat, index) => {
            const stage = STAGES[index];
            const visibility = index === activeBeatIndex
              ? stageVisibility(scrollProgress, stage.start, stage.end)
              : 0;
            return (
              <div
                key={beat.eyebrow}
                className="absolute inset-0"
                style={{ opacity: visibility, transform: `translate3d(0, ${(1 - visibility) * 18}px, 0)`, pointerEvents: visibility > 0.65 ? "auto" : "none" }}
                aria-hidden={visibility < 0.05}
              >
                <p className="mb-3 font-mono text-[10px] tracking-[.16em] text-brand-mint-bright sm:text-xs">{beat.eyebrow}</p>
                <h2 className="max-w-[680px] font-heading text-[clamp(30px,4.15vw,62px)] font-medium leading-[1.05] tracking-[-.045em] text-brand-mint-bright">{beat.title}</h2>
                {beat.description && <p className="mt-4 max-w-[540px] text-sm leading-6 text-white/72 sm:text-base sm:leading-7">{beat.description}</p>}
              </div>
            );
          })}

          {showFinal && (
            <div className="pointer-events-none absolute left-0 top-full mt-6 hidden space-y-3 md:block" style={{ opacity: copyOpacity }}>
              {BOT_TOPICS.map((topic) => (
                <div key={topic.id} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brand-mint-bright/60 bg-brand-mint/20 font-mono text-[10px] text-brand-mint-bright">{topic.num}</span>
                  <span className="font-heading text-lg text-white/85">{topic.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {activeBeatIndex === 3 && (
          <div
            className="absolute bottom-[34%] left-6 z-20 flex items-center gap-3 rounded-full border border-white/20 bg-white/[.08] px-4 py-2.5 text-xs text-white/90 shadow-[0_12px_35px_rgba(0,0,0,.14)] backdrop-blur-xl sm:left-10 md:bottom-[22%] md:left-[7%]"
            style={{ opacity: copyOpacity, transform: `translateY(${(1 - copyOpacity) * 12}px)` }}
            aria-hidden="true"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-mint/20 text-brand-mint-bright">✓</span>
            <span className="font-medium">Scheduled dose · sensor confirmation</span>
          </div>
        )}

        <div className="absolute bottom-6 left-6 z-30 sm:bottom-8 sm:left-10 md:bottom-10 md:left-[7%]">
          <p className="font-heading text-base tracking-[-.02em] text-white sm:text-lg">The moment continues <span className="text-brand-mint-bright">at home.</span></p>
        </div>
        <div className="absolute bottom-8 right-6 z-30 font-mono text-[9px] tracking-[.15em] text-white/50 sm:right-10 md:bottom-10 md:right-[7%]">
          {String(activeBeatIndex + 1).padStart(2, "0")} <span className="text-brand-mint-bright">/</span> 06 · {activeLabel}
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-20 w-full bg-gradient-to-b from-transparent to-white/10" />
      </div>
    </section>
  );
}
