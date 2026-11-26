"use client";

import React, { useRef, useState, useEffect } from "react";
import { jumpToScrollPosition, lockForwardScroll } from "./scrollAutoplayLock";

/**
 * ==============================================================================
 *  PILL DISPENSER SECTION CONFIGURATION
 * ==============================================================================
 *  Change any value here to tune frame alignment, timed drop, and edge softness.
 *  You can also use the interactive on-screen control pill on the site itself!
 * ==============================================================================
 */
export const PILL_CONFIG = {
  /**
   * Rendering mode:
   * - "custom_frames": Plays transparent WebP frames in public/dispenser_frames/ extracted from pill.mp4
   * - "raw_frames": Fallback to raw frames
   * - "video": Plays pill_dispenser_2s_to_5s.mp4 directly
   */
  mode: "custom_frames" as "custom_frames" | "raw_frames" | "video",

  totalFrames: 71,
  autoPlayDurationMs: 2600,
  rawFramesBaseUrl: "/dispenser_raw_frames/frame_",
  customFramesBaseUrl: "/dispenser_frames/frame_",
  videoSrc: "/pill_dispenser_2s_to_5s.mp4",

  // 1. HORIZONTAL OFFSET ("take the set of frames /video bit right give me a value ill change it and see")
  // Set to -120px as requested (negative pulls dispenser left and leaves maximum whitespace for text)
  offsetX: -120,

  // 2. SCALE: 1.0 makes the frame height match 100% of the section height
  // ("make sure the height of the sectin and the height of the frames are same so the heigts should be equat")
  scale: 1.0,

  // Lock the stage at this point and play the drop independently of scrolling.
  lockStartBuffer: 0.08,
  lockEndBuffer: 0.06,

  // 4. WHITE BLURRED OVERLAY: Horizontal position (%) where the soft white blur begins
  // ("put a small white bluured overlay so that only the needed part and the hand it shown and the text its not covered")
  blurOverlayLeftPercent: 42,

  // Typography copy
  title: "Pill dispensing.",
  subline:
    "All you have to do is hold out your hand, and let the advanced autonomous system verify and deliver the exact scheduled dose.",
};

export function PillDispenserScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const drawCurrentFrameRef = useRef<() => void>(() => {});
  const playbackProgressRef = useRef(0);
  const previousFrameRef = useRef(-1);
  const playbackStateRef = useRef({
    startedAt: null as number | null,
    completed: false,
    blockedUntilReset: false,
  });
  const autoplayUnlockRef = useRef<(() => void) | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Live on-screen adjustable values so user can change and test in real-time
  const [offsetX, setOffsetX] = useState(PILL_CONFIG.offsetX);
  const [scale, setScale] = useState(PILL_CONFIG.scale);
  const [blurLeft, setBlurLeft] = useState(PILL_CONFIG.blurOverlayLeftPercent);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  // Scroll only brings the dispenser into its pinned position. The pill then falls on a timer.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable =
        containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;
      const rawProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      const playback = playbackStateRef.current;
      const triggerProgress = PILL_CONFIG.lockStartBuffer;

      if (rawProgress < triggerProgress - 0.002) {
        if (playback.startedAt !== null) {
          playback.startedAt = null;
          if (autoplayTimerRef.current !== null) {
            window.clearTimeout(autoplayTimerRef.current);
            autoplayTimerRef.current = null;
          }
          autoplayUnlockRef.current?.();
          autoplayUnlockRef.current = null;
        }
        playback.completed = false;
        playback.blockedUntilReset = false;
        playbackProgressRef.current = 0;
        previousFrameRef.current = -1;
        if (PILL_CONFIG.mode === "video" && videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
        drawCurrentFrameRef.current();
      } else if (
        !mediaQuery.matches &&
        !playback.blockedUntilReset &&
        !playback.completed
      ) {
        if (playback.startedAt === null) {
          playback.startedAt = performance.now();
          playbackProgressRef.current = 0;
          previousFrameRef.current = -1;
          window.dispatchEvent(new Event("pill-dispenser-playback-start"));
          autoplayUnlockRef.current = lockForwardScroll(() => {
            playback.startedAt = null;
            playback.completed = false;
            playback.blockedUntilReset = true;
            playbackProgressRef.current = 0;
            previousFrameRef.current = -1;
            if (autoplayTimerRef.current !== null) {
              window.clearTimeout(autoplayTimerRef.current);
              autoplayTimerRef.current = null;
            }
            if (PILL_CONFIG.mode === "video" && videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
            drawCurrentFrameRef.current();
            autoplayUnlockRef.current = null;
          });
          if (PILL_CONFIG.mode === "video" && videoRef.current) {
            videoRef.current.currentTime = 0;
            void videoRef.current.play();
          }
          autoplayTimerRef.current = window.setTimeout(() => {
            playback.startedAt = null;
            playback.completed = true;
            playbackProgressRef.current = 1;
            autoplayTimerRef.current = null;
            autoplayUnlockRef.current?.();
            autoplayUnlockRef.current = null;
            drawCurrentFrameRef.current();
          }, PILL_CONFIG.autoPlayDurationMs);
        }

        const boundaryY = window.scrollY + rect.top + totalScrollable * triggerProgress;
        if (Math.abs(window.scrollY - boundaryY) > 1) jumpToScrollPosition(boundaryY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("scroll", handleScroll);
      if (autoplayTimerRef.current !== null) window.clearTimeout(autoplayTimerRef.current);
      autoplayUnlockRef.current?.();
    };
  }, []);

  // 2. Load frame zero immediately and defer the rest until the section is near.
  useEffect(() => {
    if (PILL_CONFIG.mode === "video") return;

    let isCancelled = false;
    let remainingLoaded = false;

    const baseUrl =
      PILL_CONFIG.mode === "raw_frames"
        ? PILL_CONFIG.rawFramesBaseUrl
        : PILL_CONFIG.customFramesBaseUrl;

    const frameNumbers = Array.from({ length: PILL_CONFIG.totalFrames }, (_, i) => i)
      .filter((index) => !isMobile || index % 2 === 0);
    if (frameNumbers[frameNumbers.length - 1] !== PILL_CONFIG.totalFrames - 1) {
      frameNumbers.push(PILL_CONFIG.totalFrames - 1);
    }
    const images: HTMLImageElement[] = new Array(frameNumbers.length);

    const loadFrame = (slot: number) => {
      if (isCancelled || images[slot]) return;
      const img = new Image();
      const frameNum = String(frameNumbers[slot] + 1).padStart(4, "0");
      img.src = `${baseUrl}${frameNum}.webp`;

      img.onload = () => {
        if (isCancelled) return;
        if (slot === 0) {
          setImagesLoaded(true);
        }
        drawCurrentFrameRef.current();
      };
      images[slot] = img;
    };
    imagesRef.current = images;
    loadFrame(0);

    const observer = new IntersectionObserver((entries) => {
      if (remainingLoaded || !entries.some((entry) => entry.isIntersecting)) return;
      remainingLoaded = true;
      for (let slot = 1; slot < frameNumbers.length; slot++) loadFrame(slot);
      observer.disconnect();
    }, { rootMargin: "100% 0px" });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      isCancelled = true;
      observer.disconnect();
      imagesRef.current = [];
    };
  }, [isMobile]);

  // Render each timed frame directly; playback does not cause React renders.
  const drawCurrentFrame = () => {
    if (PILL_CONFIG.mode === "video") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameCount = imagesRef.current.length;
    const currentFrameIndex = Math.min(
      frameCount - 1,
      Math.floor(playbackProgressRef.current * Math.max(0, frameCount - 1))
    );
    if (currentFrameIndex === previousFrameRef.current) return;
    const currentImg = imagesRef.current[currentFrameIndex];
    if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
      previousFrameRef.current = currentFrameIndex;
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (
        canvas.width !== displayWidth * dpr ||
        canvas.height !== displayHeight * dpr
      ) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Height of the frame matches the height of the section
      const drawHeight = displayHeight * scale;
      const aspect = currentImg.naturalWidth / currentImg.naturalHeight;
      const drawWidth = drawHeight * aspect;

      // Vertical centering + horizontal shift
      const y = (displayHeight - drawHeight) / 2;
      const x = offsetX;

      ctx.drawImage(currentImg, x, y, drawWidth, drawHeight);
      ctx.restore();
    }
  };
  drawCurrentFrameRef.current = drawCurrentFrame;

  useEffect(() => {
    drawCurrentFrame();
  }, [imagesLoaded, offsetX, scale, isMobile]);

  // Drive the frame canvas from elapsed time rather than the scroll position.
  useEffect(() => {
    let rafId: number | null = null;
    const tick = () => {
      const playback = playbackStateRef.current;
      if (playback.startedAt === null) {
        rafId = null;
        return;
      }
      playbackProgressRef.current = Math.min(
        1,
        (performance.now() - playback.startedAt) / PILL_CONFIG.autoPlayDurationMs
      );
      drawCurrentFrameRef.current();
      rafId = requestAnimationFrame(tick);
    };
    const handlePlaybackStart = () => {
      if (playbackStateRef.current.startedAt !== null && rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("pill-dispenser-playback-start", handlePlaybackStart);
    return () => {
      window.removeEventListener("pill-dispenser-playback-start", handlePlaybackStart);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${
        prefersReducedMotion ? "h-auto py-24" : "h-[220vh] md:h-[280vh]"
      } bg-white`}
      aria-label="ALVICARE Pill Dispensing Feature"
    >
      {/* Sticky Full-Viewport Stage: Height matches 100vh */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden bg-white flex items-center justify-between">
        
        {/* Full-Height Canvas Stage spanning section height */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {PILL_CONFIG.mode === "video" ? (
            <video
              ref={videoRef}
              src={PILL_CONFIG.videoSrc}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover select-none pointer-events-none"
              style={{
                transform: `translateX(${offsetX}px) scale(${scale})`,
                filter: "blur(0.7px)",
              }}
            />
          ) : (
            <canvas
              ref={canvasRef}
              className="w-full h-full select-none pointer-events-none block"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                filter: "blur(0.7px)",
              }}
            />
          )}
        </div>

        {/* Soft White Blurred Overlay:
            Dissolves the forearm into pure white so only the dispenser and hand are shown,
            and the typography on the right remains 100% uncovered and crisp */}
        <div
          className="absolute inset-y-0 right-0 pointer-events-none z-10 transition-all duration-75"
          style={{
            left: `${blurLeft}%`,
            background:
              "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.65) 20%, rgba(255,255,255,0.95) 55%, #FFFFFF 85%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 100%)",
          }}
        />

        {/* Right Column: Airform-Style Minimalist Typography placed above overlay (z-20) */}
        <div className="relative z-20 w-full h-full flex items-center justify-end px-6 sm:px-12 md:px-16 lg:px-24 pointer-events-none">
          <div className="w-full max-w-[500px] pointer-events-auto">
            {/* Title: 51px/400 weight matching Airform "Just add water." */}
            <h2
              className="font-normal text-brand-deep mb-4 tracking-[-0.015em]"
              style={{
                fontSize: "clamp(36px, 4.2vw, 54px)",
                lineHeight: 1.1,
              }}
            >
              {PILL_CONFIG.title}
            </h2>

            {/* Subtitle: 16-17px clean muted grotesk */}
            <p className="text-[16px] sm:text-[17px] text-muted font-normal leading-[1.6] max-w-[460px]">
              {PILL_CONFIG.subline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
