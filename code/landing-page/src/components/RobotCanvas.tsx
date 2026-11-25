"use client";

import React, { useState, useEffect, type MutableRefObject } from "react";
import dynamic from "next/dynamic";

const RobotCanvasImpl = dynamic(
  () => import("./RobotCanvasImpl").then((mod) => mod.RobotCanvasImpl),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-divider border-t-brand-teal animate-spin" />
        </div>
      </div>
    ),
  }
);

interface RobotCanvasProps {
  scrollProgressRef: MutableRefObject<number>;
  showHotspots?: boolean;
}

export function RobotCanvas(props: RobotCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-divider border-t-brand-teal animate-spin" />
        </div>
      </div>
    );
  }

  return <RobotCanvasImpl {...props} />;
}
