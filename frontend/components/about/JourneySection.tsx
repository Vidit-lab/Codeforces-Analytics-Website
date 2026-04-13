"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { JOURNEY_CARDS } from "@/lib/about-data";
import JourneyCard from "./JourneyCard";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

export default function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden"
      aria-label="Journey"
    >
      {/* Background glow */}
      <div
        className="ambient-glow w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
        style={{ background: "rgba(99, 60, 220, 0.15)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-violet-500/60" />
            <span className="font-mono text-xs text-violet-400 tracking-[0.25em] uppercase">
              The Path
            </span>
          </div>
          <h2 className="font-display font-light text-white/90 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            The journey
            <span className="block text-white/40 font-light italic"> so far.</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {JOURNEY_CARDS.map((card, i) => (
            <JourneyCard
              key={card.id}
              tag={card.tag}
              title={card.title}
              insight={card.insight}
              detail={card.detail}
              icon={card.icon}
              accent={card.accent}
              borderGlow={card.borderGlow}
              delay={i * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
