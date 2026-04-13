"use client";

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

export default function App() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [leaving, setLeaving] = useState(false);

  function navigateToAnalysis() {
    setLeaving(true);
    // Give the fade-out animation 100ms then redirect
    setTimeout(() => {
      router.push('/analysis');
    }, 100);
  }

  function navigateToAbout() {
    setLeaving(true);
    // Give the fade-out animation 100ms then redirect
    setTimeout(() => {
      router.push('/about');
    }, 100);
  }

  return (
    <div
      className="landing-root relative w-full min-h-screen overflow-hidden"
      style={{
        transition: 'opacity 0.6s ease',
        opacity: leaving ? 0 : 1,
      }}
    >
      {/* ── Fullscreen Video Background ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay loop muted playsInline
        src={VIDEO_URL}
      />

      {/* ── Page Content ── */}
      <div className="relative z-10 flex min-h-screen flex-col">

        {/* ── Navigation ── */}
        <nav className="w-full">
          <div className="max-w-7xl mx-auto flex flex-row items-center justify-between px-8 py-6">
            {/* Logo */}
            <span
              className="select-none text-3xl tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Welcome
            </span>

            {/* Nav CTA */}
            <button
              onClick={navigateToAbout}
              className="liquid-glass cursor-pointer rounded-full px-6 py-2.5 text-sm text-white transition-transform duration-200 hover:scale-[1.03]"
              type="button"
            >
              About Me
            </button>
          </div>
        </nav>

        {/* Subtext */}
          {/* <p
            className="animate-fade-rise-delay text-black text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            15 Years, 1 Lakh Coders, One Story: Inside India’s Codeforces Journey.
          </p> */}

        {/* ── Hero Section ── */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-6 -mt-16">
          {/* H1 */}
          <h1
            className="animate-fade-rise max-w-7xl text-5xl font-normal text-white sm:text-7xl md:text-8xl"
            style={{
              fontFamily: "'Instrument Serif', serif",
              lineHeight: 0.95,
              letterSpacing: '-2.46px',
            }}
          >
            15 Years,{' '}
            <em className="not-italic text-gray-400">1 Lakh Coders</em> One Story:{' '}
            <em className="not-italic text-gray-400">
               Inside India’s </em> Codeforces Journey.
          </h1>

          {/* Hero CTA → navigates to analysis */}
          <button
            onClick={navigateToAnalysis}
            className="animate-fade-rise-delay-2 liquid-glass mt-12 cursor-pointer rounded-full px-14 py-5 text-base text-white transition-transform duration-200 hover:scale-[1.03]"
            type="button"
          >
            Begin Journey
          </button>
        </section>
      </div>
    </div>
  );
}
