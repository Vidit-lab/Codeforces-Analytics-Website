"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { PROFILE_IMAGE } from "@/lib/about-data";
import { fadeIn, fadeUp, scaleIn } from "@/lib/motion-variants";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="ambient-glow w-[600px] h-[600px] top-[-100px] left-[-100px]"
          style={{ background: "rgba(99, 60, 220, 0.12)" }}
        />
        <div
          className="ambient-glow w-[400px] h-[400px] bottom-[0px] right-[10%]"
          style={{ background: "rgba(59, 100, 246, 0.08)" }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        style={{ y: parallaxY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">

          {/* ── IMAGE ── */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            custom={0}
            className="relative w-full max-w-[560px] lg:w-[52%] flex-shrink-0"
          >
            {/* Glow behind image */}
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 animate-pulseGlow"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99, 60, 220, 0.4), rgba(59, 130, 246, 0.3))",
              }}
            />

            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 z-10 rounded-2xl"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              />
              <Image
                src={PROFILE_IMAGE}
                alt="Profile"
                width={960}
                height={540}
                className="w-full object-cover"
                priority
                style={{ aspectRatio: "16/9" }}
              />
              {/* Soft vignette on image */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(6,6,8,0.2) 0%, transparent 40%, transparent 60%, rgba(6,6,8,0.3) 100%)",
                }}
              />
            </div>

            {/* Floating tag */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.8}
              className="absolute -bottom-4 -right-4 glass-card px-4 py-2 rounded-xl"
            >
              <span className="font-mono text-xs text-violet-300 tracking-widest uppercase">
                In Progress
              </span>
            </motion.div>
          </motion.div>

          {/* ── TEXT ── */}
          <div className="flex flex-col gap-6 lg:pt-8 text-center lg:text-left">

            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.15}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="w-8 h-px bg-violet-500/60" />
              <span className="font-mono text-xs text-violet-400 tracking-[0.25em] uppercase">
                About Me
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="font-display font-light leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              <span className="gradient-headline block">
                Always aiming
              </span>
              <span className="gradient-headline block">
                for the stars.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="font-body text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              I don&apos;t just solve problems.{" "}
              <span className="text-gray-300">
                I live them.
              </span>
            </motion.p>

            {/* Decorative separator */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.7}
              className="flex items-center gap-4 justify-center lg:justify-start pt-2"
            >
              <div className="w-2 h-2 rounded-full bg-violet-500/60 animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
              <div className="w-1 h-1 rounded-full bg-blue-500/40" />
            </motion.div>

            {/* Scroll nudge */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={1.0}
              className="pt-6 flex flex-col items-center lg:items-start gap-1 opacity-40"
            >
              <div className="w-px h-8 bg-gradient-to-b from-white/0 via-white/60 to-white/0 animate-float" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500">
                Scroll
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
