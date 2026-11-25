"use client";

import React from "react";
import Image from "next/image";

export function EngineeringSection() {
  const specs = [
    {
      numeral: "01",
      title: "Monocoque Brushed Aluminium Shell",
      category: "MATERIALS & ACOUSTICS",
      desc: "Aerospace-grade 6061 aluminium finished with an antimicrobial matte powder coat. Architectural slate blue-grey fins provide structural rigidity and passive thermal dissipation without fan noise.",
      imageSrc: "/images/side_view.png",
      tag: "CNC Milled · Under 28dB",
    },
    {
      numeral: "02",
      title: "5-Cylinder Hermetic Carousel",
      category: "DISPENSING ARCHITECTURE",
      desc: "Hermetically sealed medicine canisters preserve pill potency against ambient humidity. Driven by a micro-stepper motor with millisecond infrared break-beam drop confirmation.",
      imageSrc: "/images/front_reference_match.png",
      tag: "PIR Hand Sense · 0.2mg–500mg",
    },
    {
      numeral: "03",
      title: "Solid-State Time-of-Flight (ToF) & Spatial Telemetry",
      category: "AUTONOMOUS NAVIGATION",
      desc: "4x solid-state VL53L1X laser rangefinders provide rapid obstacle detection and 30mm cliff-drop protection at 0.3 m/s safe cruising speed, completely eliminating mechanical wear and domestic dust failure.",
      imageSrc: "/images/perspective_beauty.png",
      tag: "Solid-State ToF · 30mm Cliff Drop",
    },
    {
      numeral: "04",
      title: "Whisper-Quiet Drive & Hydration Caddy",
      category: "CHASSIS & HYDRATION",
      desc: "Dual high-torque continuous crawler base with planetary dampening. Houses an integrated 750ml spring-retention water bottle caddy to bring fresh hydration directly with every dose.",
      imageSrc: "/images/Gemini_Generated_Image_amll3uamll3uamll.jpg",
      tag: "48V LiFePO4 · All-Terrain",
    },
  ];

  return (
    <section
      id="engineering"
      className="w-full py-28 sm:py-36 bg-surface border-t border-divider"
      aria-label="Engineering and Architecture"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Header */}
        <div className="max-w-[720px] mb-16 sm:mb-20">
          <span className="text-[11px] font-mono tracking-widest text-brand-teal uppercase block mb-3">
            ARCHITECTURAL ENGINEERING
          </span>
          <h2
            className="font-normal text-brand-deep tracking-[-0.01em] mb-4"
            style={{
              fontSize: "clamp(34px, 4vw, 51px)",
              lineHeight: 1.1,
            }}
          >
            Built for everyday care.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-muted leading-[1.5] font-normal">
            Every millimeter is engineered for quiet, unobtrusive presence in the home.
            Hospital-grade precision concealed inside pure residential design.
          </p>
        </div>

        {/* 2x2 Clean Industrial Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {specs.map((item) => (
            <div
              key={item.numeral}
              className="bg-white rounded-[32px] p-6 sm:p-8 border border-divider flex flex-col justify-between hover:shadow-lg transition-all duration-500 group"
            >
              {/* Image Preview */}
              <div className="relative w-full h-[240px] sm:h-[280px] rounded-[22px] overflow-hidden bg-surface mb-6">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 580px"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-brand-teal border border-white/60">
                  {item.tag}
                </div>
              </div>

              {/* Text Meta */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-divider mb-3">
                  <span className="text-[11px] font-mono tracking-wider text-brand-teal font-medium uppercase">
                    {item.category}
                  </span>
                  <span className="text-[20px] font-light text-numeral">
                    {item.numeral}
                  </span>
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-light text-brand-deep mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[14px] text-muted leading-[1.6]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EngineeringSection;
