"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  posterSrc?: string;
  title?: string;
}

export function VideoModal({
  isOpen,
  onClose,
  videoSrc = "/videos/alvi_launch_video.mp4",
  posterSrc = "/images/launch_video_poster.jpg",
  title = "ALVI One — Official Master Launch Video (41s · 1080p60)",
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback
        });
      }
    } else {
      document.body.style.overflow = "auto";
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-2xl bg-brand-dark border border-white/10 shadow-[0_32px_96px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-brand-deep/90 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-brand-mint animate-pulse" />
            <span
              id="video-modal-title"
              className="text-xs sm:text-sm font-medium tracking-wide text-white/90"
            >
              {title}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/10 text-white/70">
              Team 43 · UoW & IIT
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal"
            aria-label="Close video dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            controls
            playsInline
            className="w-full h-full object-contain"
          >
            Your browser does not support high-definition video playback.
          </video>
        </div>

        {/* Video Caption & Engineering Summary */}
        <div className="p-4 sm:p-5 bg-brand-deep border-t border-white/10 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs sm:text-sm text-white/80 font-normal">
              Autonomous Living & Vitality Intelligence (ALVI One) — 4-Tier Cyber-Physical Companion Robot & Caregiver Ecosystem.
            </p>
            <p className="text-[11px] text-white/50 font-mono mt-0.5">
              Ref #CS-43-2026 · Informatics Institute of Technology & University of Westminster
            </p>
          </div>
          <a
            href={videoSrc}
            download="ALVI_One_Launch_Video.mp4"
            className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
          >
            Download Master Video
          </a>
        </div>
      </div>
    </div>
  );
}
