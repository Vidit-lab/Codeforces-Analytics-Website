"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SOCIALS = [
  {
    id: "codeforces",
    label: "Codeforces",
    href: "https://codeforces.com/profile/vidit_shrimali",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden>
        <path d="M4.5 7.5A1.5 1.5 0 0 1 6 6h2a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 8 18H6a1.5 1.5 0 0 1-1.5-1.5v-9ZM11 4.5A1.5 1.5 0 0 1 12.5 3h2A1.5 1.5 0 0 1 16 4.5v12a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 11 16.5v-12ZM17.5 10.5A1.5 1.5 0 0 1 19 9h2a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 21 19h-2a1.5 1.5 0 0 1-1.5-1.5v-7Z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Vidit-lab",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vidit-shrimali-71a26331a/",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/vidit_shrimali27/",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
      </svg>
    ),
  },
];

export default function SocialBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative py-10 md:py-14 flex justify-center items-center overflow-hidden"
      aria-label="Social links"
    >
      {/* Subtle rule above */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)",
        }}
      />

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
        className="flex items-center gap-6 md:gap-10"
      >
        {SOCIALS.map((s) => (
          <motion.a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group relative flex flex-col items-center gap-2"
          >
            {/* Icon wrapper */}
            <motion.div
              variants={{
                rest: {
                  scale: 1,
                  boxShadow: "0 0 0px rgba(139,92,246,0)",
                },
                hover: {
                  scale: 1.18,
                  boxShadow: "0 0 22px rgba(139,92,246,0.45)",
                  transition: { duration: 0.3, ease: "easeOut" },
                },
              }}
              className="relative flex items-center justify-center w-12 h-12 rounded-2xl transition-colors duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Shimmer icon color: white → purple → white in sync */}
              <motion.span
                variants={{
                  rest: { color: "rgba(255,255,255,0.55)" },
                  hover: {
                    color: "#a78bfa",
                    transition: { duration: 0.3 },
                  },
                }}
                className="social-icon-shimmer"
              >
                {s.svg}
              </motion.span>

              {/* Hover glow behind icon */}
              <motion.div
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1, transition: { duration: 0.3 } },
                }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(139,92,246,0.2), transparent 70%)",
                }}
              />
            </motion.div>

            {/* Label */}
            <motion.span
              variants={{
                rest: { opacity: 0.3, y: 0 },
                hover: { opacity: 0.9, y: -1, transition: { duration: 0.25 } },
              }}
              className="font-mono text-[9px] tracking-[0.2em] uppercase text-gray-400"
            >
              {s.label}
            </motion.span>
          </motion.a>
        ))}
      </motion.div>

      {/* Subtle rule below */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)",
        }}
      />

      {/* Synced shimmer animation for all icons */}
      <style>{`
        @keyframes iconShimmer {
          0%   { color: rgba(255,255,255,0.55); }
          50%  { color: rgba(167,139,250,0.9); }
          100% { color: rgba(255,255,255,0.55); }
        }
        .social-icon-shimmer {
          animation: iconShimmer 4s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}
