"use client";

import React, { useRef, useEffect, useState, useMemo, type MutableRefObject } from "react";
import { HERO_SCROLL_PHASES } from "./heroScrollPhases";

/**
 * ==============================================================================
 *  WATCH CONFIGURATION VARIABLES
 * ==============================================================================
 *  Tweak any of these variables to change how the watch appears, scales,
 *  positions, and animates behind the 3D robot model.
 * ==============================================================================
 */
export const WATCH_CONFIG = {
  /**
   * 1. DISPLAY MODE:
   *  - "scroll": Scrubs through the 120 transparent exploded frames as you scroll down.
   *  - "loop":   Autoplays the continuous animated transparent WebP in an infinite loop.
   */
  mode: "scroll" as "scroll" | "loop",

  // ----------------------------------------------------------------------------
  // SIZING & SCALE ("make the thing a little bit bigger")
  // ----------------------------------------------------------------------------
  /**
   * Master scale multiplier.
   * Increased to 0.88 for a bolder, more prominent presence behind the robot.
   * Increase (e.g. 0.92, 0.96) or decrease (e.g. 0.82, 0.78).
   */
  scale: 0.88,
  /** Mobile uses a wider transparent frame so the watch itself stays legible. */
  mobileScale: 0.88,
  mobileWidth: "min(62vw, 280px)",
  mobileMaxWidth: "280px",
  mobileMaxHeight: "none",

  /**
   * Maximum bounding width across desktop screens (increased from 520px).
   */
  maxWidth: "680px",

  /**
   * Maximum bounding height relative to viewport height.
   */
  maxHeight: "75vh",

  // ----------------------------------------------------------------------------
  // TWO-STAGE POSITIONING ("first initial frame goes to position a bit more to top")
  // ----------------------------------------------------------------------------
  /**
   * Initial vertical position (percentage 0-100) behind the robot at rest.
   * 48% aligns directly with the robot's chest/torso at the start.
   */
  initialTop: 48,
  mobileInitialTop: 54,

  /**
   * Final vertical position (percentage 0-100) reached after initial scroll glide.
   * "a bit more to the top in the last position" -> 34% elevates the watch
   * so it crowns prominently above the robot's shoulders in the final layout.
   */
  finalTop: 34,
  mobileFinalTop: 24,

  /**
   * Initial horizontal position (percentage 0-100).
   * 50% centers it dead-center behind the robot (matching robot X=0).
   */
  initialLeft: 50,

  /**
   * Final horizontal position (percentage 0-100).
   * 50% keeps it centered on stage. Adjust to e.g. 52% or 54% if desired.
   */
  finalLeft: 50,

  /**
   * Fine-tune horizontal anchor offset (default "-50%" centers the element).
   */
  translateX: "-50%",

  /**
   * Fine-tune vertical anchor offset (default "-50%" centers the element).
   */
  translateY: "-50%",

  // ----------------------------------------------------------------------------
  // STAGE 1: GLIDE / POSITION TIMING (Synchronized with 3D Robot Model)
  // ----------------------------------------------------------------------------
  /**
   * Scroll progress (0.0 to 1.0) where the watch starts gliding from initialTop to finalTop.
   */
  glideStart: 0.02,

  /**
   * Scroll progress (0.0 to 1.0) where the watch reaches its final upper position.
   * Matches the 3D robot model's TRANSITION_END (0.38).
   * During this phase, frames remain strictly locked on Frame 1 (assembled watch).
   */
  glideEnd: HERO_SCROLL_PHASES.positioningEnd,

  // ----------------------------------------------------------------------------
  // STAGE 2: EXPLODED FRAME SCRUB TIMING ("when everything is in position only then scroll anim starts")
  // ----------------------------------------------------------------------------
  /**
   * Scroll progress (0.0 to 1.0) where the exploded disassembly sequence starts.
   * Strictly set at glideEnd (0.38) so the animation only starts after arriving in position.
   */
  scrollStart: HERO_SCROLL_PHASES.positioningEnd,

  /**
   * Scroll progress (0.0 to 1.0) where the exploded sequence reaches the final frame.
   */
  scrollEnd: HERO_SCROLL_PHASES.watchSequenceEnd,

  // ----------------------------------------------------------------------------
  // VISIBILITY & OPACITY FADE
  // ----------------------------------------------------------------------------
  /**
   * If true, the watch is hidden at scroll=0 and smoothly emerges as scroll begins.
   * Set to false if you want the watch visible even at scroll=0.
   */
  hideInInitialFrame: true,

  /**
   * Scroll progress (0.0 to 1.0) where the watch starts to fade in.
   */
  emergeStart: 0.01,

  /**
   * Scroll progress (0.0 to 1.0) where the watch reaches full visibility.
   */
  emergeEnd: 0.16,

  /**
   * Master maximum opacity (0.0 to 1.0).
   */
  opacity: 0.98,

  /**
   * Soft depth shadow behind the watch to match Apple studio lighting.
   */
  dropShadow: "drop-shadow(0 25px 45px rgba(0, 0, 0, 0.12))",

  /**
   * Z-Index layering:
   *  - zIndex 5 places the watch BEHIND the 3D RobotCanvas (z-10)
   *    and in FRONT of the giant background wordmark (z-0).
   */
  zIndex: 5,

  // ----------------------------------------------------------------------------
  // ASSET SOURCES
  // ----------------------------------------------------------------------------
  /**
   * Total number of extracted transparent WebP frames in public/watch_frames/
   */
  totalFrames: 120,

  /**
   * Base URL path for frame sequence.
   */
  framesBaseUrl: "/watch_frames/frame_",

  /**
   * Animated WebP asset source used when mode === "loop"
   */
  loopSrc: "/watch_720p.webp",
};

interface WatchHeroLayerProps {
  scrollProgressRef: MutableRefObject<number>;
  customConfig?: Partial<typeof WATCH_CONFIG>;
}

export function WatchHeroLayer({
  scrollProgressRef,
  customConfig,
}: WatchHeroLayerProps) {
  // Merge default config with any custom overrides passed via props
  const config = useMemo(
    () => ({ ...WATCH_CONFIG, ...customConfig }),
    [customConfig]
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameNumbersRef = useRef<number[]>([]);
  const drawFrameRef = useRef<(force?: boolean) => void>(() => {});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  // Load the first frame immediately and defer the rest until the hero is near.
  useEffect(() => {
    if (config.mode !== "scroll") return;

    let isCancelled = false;
    let remainingLoaded = false;
    const frameNumbers = Array.from({ length: config.totalFrames }, (_, i) => i)
      .filter((index) => !isMobile || index % 2 === 0);
    if (frameNumbers[frameNumbers.length - 1] !== config.totalFrames - 1) {
      frameNumbers.push(config.totalFrames - 1);
    }
    frameNumbersRef.current = frameNumbers;
    const images: HTMLImageElement[] = new Array(frameNumbers.length);

    const loadFrame = (slot: number) => {
      if (isCancelled || images[slot]) return;
      const img = new Image();
      const frameNum = String(frameNumbers[slot] + 1).padStart(4, "0");
      img.src = `${config.framesBaseUrl}${frameNum}.webp`;
      img.onload = () => {
        if (isCancelled) return;
        drawFrameRef.current(true);
      };
      images[slot] = img;
    };
    loadFrame(0);

    imagesRef.current = images;
    const observer = new IntersectionObserver(
      (entries) => {
        if (remainingLoaded || !entries.some((entry) => entry.isIntersecting)) return;
        remainingLoaded = true;
        for (let slot = 1; slot < frameNumbers.length; slot++) loadFrame(slot);
        observer.disconnect();
      },
      { rootMargin: "100% 0px" }
    );
    const host = wrapperRef.current;
    if (host) observer.observe(host);

    return () => {
      isCancelled = true;
      observer.disconnect();
    };
  }, [config.mode, config.totalFrames, config.framesBaseUrl, isMobile]);

  // Ref-driven draw loop: scroll never causes a React render in the hero.
  useEffect(() => {
    if (config.mode !== "scroll") return;
    let rafId: number | null = null;
    let previousSlot = -1;
    const drawFrame = (force = false) => {
      const progress = scrollProgressRef.current;
      const initialTop = isMobile ? config.mobileInitialTop : config.initialTop;
      const finalTop = isMobile ? config.mobileFinalTop : config.finalTop;
      const initialLeft = config.initialLeft;
      const finalLeft = config.finalLeft;
      let top = initialTop;
      let left = initialLeft;
      if (progress >= config.glideEnd) {
        top = finalTop;
        left = finalLeft;
      } else if (progress > config.glideStart) {
        const p = (progress - config.glideStart) / (config.glideEnd - config.glideStart);
        const ease = 1 - Math.pow(1 - p, 3);
        top += (finalTop - initialTop) * ease;
        left += (finalLeft - initialLeft) * ease;
      }
      let opacity = config.opacity;
      if (config.hideInInitialFrame) {
        if (progress <= config.emergeStart) opacity = 0;
        else if (progress < config.emergeEnd) {
          const revealP = (progress - config.emergeStart) / (config.emergeEnd - config.emergeStart);
          opacity *= 1 - Math.pow(1 - revealP, 3);
        }
      }
      const wrapper = wrapperRef.current;
      if (wrapper) {
        wrapper.style.top = `${top.toFixed(2)}%`;
        wrapper.style.left = `${left.toFixed(2)}%`;
        wrapper.style.opacity = String(opacity);
        wrapper.style.visibility = opacity <= 0 ? "hidden" : "visible";
      }

      const frames = frameNumbersRef.current;
      const sequenceProgress = progress < config.scrollStart
        ? 0
        : Math.min(1, Math.max(0, (progress - config.scrollStart) / (config.scrollEnd - config.scrollStart)));
      const slot = Math.min(frames.length - 1, Math.floor(sequenceProgress * (frames.length - 1)));
      if (slot === previousSlot && !force) return;
      previousSlot = slot;
      const canvas = canvasRef.current;
      const currentImg = imagesRef.current[slot];
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !currentImg?.complete || currentImg.naturalWidth === 0) return;
      if (canvas.width !== currentImg.naturalWidth || canvas.height !== currentImg.naturalHeight) {
        canvas.width = currentImg.naturalWidth;
        canvas.height = currentImg.naturalHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(currentImg, 0, 0);
    };
    drawFrameRef.current = drawFrame;
    const scheduleDraw = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = null;
        drawFrame();
      });
    };
    window.addEventListener("scroll", scheduleDraw, { passive: true });
    window.addEventListener("resize", scheduleDraw);
    drawFrame(true);
    return () => {
      window.removeEventListener("scroll", scheduleDraw);
      window.removeEventListener("resize", scheduleDraw);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [config, isMobile, scrollProgressRef]);

  return (
    <div
      ref={wrapperRef}
      className="absolute pointer-events-none select-none transition-opacity duration-200 ease-out"
      style={{
        zIndex: config.zIndex,
        top: `${isMobile ? config.mobileInitialTop : config.initialTop}%`,
        left: `${config.initialLeft}%`,
        transform: `translate(${config.translateX}, ${config.translateY}) scale(${isMobile ? config.mobileScale : config.scale})`,
        width: isMobile ? config.mobileWidth : "100%",
        maxWidth: isMobile ? config.mobileMaxWidth : config.maxWidth,
        maxHeight: isMobile ? config.mobileMaxHeight : config.maxHeight,
        opacity: 0,
        filter: config.dropShadow,
        visibility: "hidden",
        willChange: "top, opacity",
      }}
      aria-hidden="true"
    >
      {config.mode === "scroll" ? (
        <canvas
          ref={canvasRef}
          className="w-full h-auto object-contain block"
          style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
          }}
        />
      ) : (
        /* Looping Animated WebP Mode */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={config.loopSrc}
          alt="ALVI CareWatch Exploded View"
          className="w-full h-auto object-contain block"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      )}
    </div>
  );
}
