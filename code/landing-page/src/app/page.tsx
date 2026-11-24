"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroScrollSection } from "@/components/HeroScrollSection";
import { StatementSection } from "@/components/StatementSection";
import { PillDispenserScrollSection } from "@/components/PillDispenserScrollSection";
import { TelepresenceSection } from "@/components/TelepresenceSection";
import { SystemCarouselSection } from "@/components/SystemCarouselSection";
import { EngineeringSection } from "@/components/EngineeringSection";
import { TeamSection } from "@/components/TeamSection";
import { DailyRhythmSection } from "@/components/DailyRhythmSection";
import { EcosystemSection } from "@/components/EcosystemSection";
import { TechSpecsSection } from "@/components/TechSpecsSection";
import { PreorderBannerSection } from "@/components/PreorderBannerSection";
import { WaitlistModal } from "@/components/WaitlistModal";
import { VideoModal } from "@/components/VideoModal";
import { Footer } from "@/components/Footer";
import { WelcomeAudio } from "@/components/WelcomeAudio";
import { Preloader } from "@/components/Preloader";

export default function HomePage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState<"home-care" | "caregiver-app">(
    "home-care"
  );

  const handleSegmentChange = (segment: "home-care" | "caregiver-app") => {
    setActiveSegment(segment);
    if (segment === "caregiver-app") {
      const target = document.getElementById("ecosystem");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-white text-primary">
      {/* 0. Cinematic SaaS Telemetry Preloader */}
      <Preloader />

      {/* 1. Top Fixed Navigation */}
      <Navigation
        onOpenWaitlist={() => setIsWaitlistOpen(true)}
        onOpenVideo={() => setIsVideoOpen(true)}
        activeSegment={activeSegment}
        onSegmentChange={handleSegmentChange}
      />

      {/* 2. Section 1: Giant ALVICARE Wordmark + Pinned 3D Robot Scroll Sequence */}
      <HeroScrollSection onOpenWaitlist={() => setIsWaitlistOpen(true)} />

      {/* 3. Section 2: Word-by-Word Scroll-Reveal Statement */}
      <div id="statement-philosophy">
        <StatementSection />
      </div>

      {/* 4. Section 3: "One system, two parts." Architectural Carousel + Numbered Columns */}
      <div id="system-architecture">
        <SystemCarouselSection />
      </div>

      {/* 5. Section 4: Contactless Pill Dispensing Pinned Scroll Sequence */}
      <div id="pill-dispensing">
        <PillDispenserScrollSection />
      </div>

      {/* 6. Section 5: Multimodal Telepresence & Expressive Companion Interface */}
      <div id="telepresence-display">
        <TelepresenceSection />
      </div>

      {/* 5. Section 4: Architectural Engineering & Precision Breakdown */}
      <EngineeringSection />

      {/* Team Lanyard Rail: The Minds Behind ALVICARE */}
      <TeamSection />

      {/* 6. Section 5: 24-Hour Rhythm Timeline */}
      <DailyRhythmSection />

      {/* 7. Section 6: Caregiver Ecosystem & Smartwatch Sync */}
      <EcosystemSection />

      {/* 8. Section 7: Technical Specifications Matrix */}
      <TechSpecsSection />

      {/* 9. Section 8: Priority Waitlist Allocation Banner */}
      <PreorderBannerSection onOpenWaitlist={() => setIsWaitlistOpen(true)} />

      {/* 10. Minimal Industrial Footer */}
      <Footer />

      {/* 11. Sleek Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      {/* 11b. Master Launch Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* 12. Cinematic Welcome Audio System */}
      <WelcomeAudio />
    </main>
  );
}
