"use client";

import HeroSection from "./HeroSection";
import JourneySection from "./JourneySection";
import SocialBar from "./SocialBar";
import LessonsSection from "./LessonsSection";
import FinalStatement from "./FinalStatement";

/**
 * AboutPage — Cinematic personal about page
 * Sections: Hero → Journey → Lessons → Final Statement
 *
 * Integration note: This component is self-contained.
 * Drop <AboutPage /> anywhere in your App Router layout.
 * The dark background (#060608) is set in globals.css on <body>.
 * Override by wrapping in a div with your own bg class if needed.
 */
export default function AboutPage() {
  return (
    <main className="relative bg-[#060608] min-h-screen text-white selection:bg-violet-900/50">
      <HeroSection />      
      <JourneySection />
      <LessonsSection />
      <FinalStatement />
      <SocialBar />  
    </main>
  );
}
