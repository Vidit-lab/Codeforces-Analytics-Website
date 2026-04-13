"use client";

import { motion } from "framer-motion";
import { cardHover, fadeUp } from "@/lib/motion-variants";

interface JourneyCardProps {
  tag: string;
  title: string;
  insight: string;
  detail: string;
  icon: string;
  accent: string;
  borderGlow: string;
  delay?: number;
}

export default function JourneyCard({
  tag,
  title,
  insight,
  detail,
  icon,
  borderGlow,
  delay = 0,
}: JourneyCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        variants={cardHover}
        className="relative h-full rounded-2xl p-6 md:p-7 glass-card group cursor-default overflow-hidden transition-all duration-500"
        style={{
          border: `1px solid ${borderGlow}`,
        }}
      >
        {/* Background glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, ${borderGlow}, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4 h-full">
          {/* Top row: tag + icon */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">
              {tag}
            </span>
            <span
              className="text-xl opacity-40 group-hover:opacity-80 transition-opacity duration-300"
              aria-hidden
            >
              {icon}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl md:text-3xl font-light text-white/90 leading-tight">
            {title}
          </h3>

          {/* Separator */}
          <div
            className="w-8 h-px transition-all duration-500 group-hover:w-16"
            style={{
              background: `linear-gradient(90deg, ${borderGlow}, transparent)`,
            }}
          />

          {/* Insight */}
          <p className="font-body text-sm text-gray-300 leading-relaxed italic">
            &ldquo;{insight}&rdquo;
          </p>

          {/* Detail */}
          <p className="font-body text-xs text-gray-500 leading-relaxed mt-auto pt-2">
            {detail}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
