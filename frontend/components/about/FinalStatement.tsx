"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn, fadeUp } from "@/lib/motion-variants";

export default function FinalStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 flex flex-col items-center justify-center overflow-hidden"
      aria-label="Final statement"
    >
      {/* Deep background glow */}
      <div
        className="ambient-glow w-[700px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 animate-pulseGlow"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99, 60, 220, 0.2) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-3">
            <div className="w-4 h-px bg-violet-500/40" />
            <span className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase">
              The road ahead
            </span>
            <div className="w-4 h-px bg-violet-500/40" />
          </div>
        </motion.div>

        {/* Main statement */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.3}
          className="font-display font-light leading-[1.1] tracking-tight mb-8"
          style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
        >
          <span className="gradient-headline">
            This is just
          </span>
          <br />
          <span className="gradient-headline">
            the beginning.
          </span>
        </motion.h2>

        {/* Subtle closing line */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.7}
          className="font-body text-gray-600 text-sm tracking-wider italic"
        >
          — and the story is still being written.
        </motion.p>

        {/* Decorative constellation dots */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1.0}
          className="mt-16 flex items-center justify-center gap-3 opacity-30"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 2 ? "6px" : i === 1 || i === 3 ? "4px" : "2px",
                height: i === 2 ? "6px" : i === 1 || i === 3 ? "4px" : "2px",
                background:
                  i === 2
                    ? "rgba(139, 92, 246, 0.8)"
                    : "rgba(139, 92, 246, 0.4)",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Footer hint */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={1.3}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <span className="font-mono text-[9px] text-gray-700 tracking-[0.4em] uppercase">
          Growth · Ambition · Craft
        </span>
      </motion.div>
    </section>
  );
}
