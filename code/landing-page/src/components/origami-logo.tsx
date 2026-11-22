import React from "react";

export function AlviCareLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AlviCare Official Logo"
    >
      <defs>
        <linearGradient id="alviNavTileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#0B4F4A" />
        </linearGradient>
      </defs>
      {/* Squircle Tile */}
      <rect width="512" height="512" rx="128" fill="url(#alviNavTileGrad)" />
      {/* Robotic Arm Lift */}
      <path
        d="M128 200 L240 376 L384 136"
        stroke="#FFFFFF"
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Care Heart */}
      <path
        d="M384 100 C374 72 320 80 330 118 C340 146 384 166 384 176 C384 166 428 146 438 118 C448 80 394 72 384 100 Z"
        fill="#F59E5B"
      />
    </svg>
  );
}

export const OrigamiLogo = AlviCareLogo;
