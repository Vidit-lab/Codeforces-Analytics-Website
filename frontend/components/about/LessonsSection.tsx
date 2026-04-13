"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LESSONS } from "@/lib/about-data";
import { fadeUp, fadeIn } from "@/lib/motion-variants";

export default function LessonsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32"
      aria-label="Lessons learned"
    >
      {/* Rule lines */}
      <hr className="section-rule mx-auto max-w-2xl mb-20 md:mb-28" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="mb-16 md:mb-20"
        >
          <span className="font-mono text-xs text-violet-400 tracking-[0.25em] uppercase mb-4 block">
            Distilled truth
          </span>
          <h2
            className="font-display font-light text-white/90"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            What I&apos;ve learned.
          </h2>
        </motion.div>

        {/* Lessons list */}
        <div className="flex flex-col gap-10 md:gap-14">
          {LESSONS.map((lesson, i) => (
            <motion.div
              key={lesson.label}
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.2 + i * 0.2}
              className="group"
            >
              <div className="flex items-center justify-center gap-4 md:gap-8">
                {/* Label (winner) */}
                <span
                  className="font-display font-light text-white/90 tracking-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}
                >
                  {lesson.label}
                </span>

                {/* Operator */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
                  <span className="font-mono text-[10px] text-violet-400/80 tracking-widest">
                    &gt;
                  </span>
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
                </div>

                {/* Loser (struck) */}
                <span
                  className="font-display font-light text-white/20 line-through decoration-white/15"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}
                >
                  {lesson.sub}
                </span>
              </div>

              {/* Micro divider */}
              {i < LESSONS.length - 1 && (
                <div className="mt-10 md:mt-14 w-px h-8 mx-auto bg-gradient-to-b from-white/0 via-white/10 to-white/0" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <hr className="section-rule mx-auto max-w-2xl mt-20 md:mt-28" />
    </section>
  );
}
