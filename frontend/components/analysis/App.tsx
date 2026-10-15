"use client";

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWindowSize } from './hooks/useWindowSize';
import { STEPS } from './data';
import { ChartPanel } from './components/ChartPanel';
import { InsightBox } from './components/InsightBox';

const BG_URL =
  'https://res.cloudinary.com/de703619c/image/upload/f_auto,q_auto/GazingChild_ed9ebk';

const TOTAL_STEPS = STEPS.length; // 9

export default function App() {
  const [step, setStep]           = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const { isMobile, isTablet, isDesktop, height } = useWindowSize();

  const goNext = useCallback(() => {
    if (step < TOTAL_STEPS - 1) { setDirection(1); setStep((s) => s + 1); }
  }, [step]);

  const goPrev = useCallback(() => {
    if (step > 0) { setDirection(-1); setStep((s) => s - 1); }
  }, [step]);

  const isLast  = step === TOTAL_STEPS - 1;
  const isFirst = step === 0;

  // New chapter starts at the top (content may be taller than the viewport)
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  // Responsive chart height; the page scrolls, so never squeeze below a readable size
  const chartH = isMobile
    ? 340
    : isTablet
    ? 380
    : Math.max(360, Math.min(440, height - 320));

  const isVertical   = !isDesktop;
  const currentStep  = STEPS[step];
  const isBehavStep  = step >= 4;

  // Dot groups: split into static (0-3) and behavioural (4-8)
  const staticDots      = [0, 1, 2, 3];
  const behaviouralDots = [4, 5, 6, 7, 8];

  return (
    <div className="analysis-root" style={{ width: '100%', position: 'relative', overflowX: 'hidden' }}>
      {/* ── Background ── */}
      <div
        className="page-bg"
        style={{ backgroundImage: `url(${BG_URL})` }}
        aria-hidden="true"
      />
      <div className="page-overlay" aria-hidden="true" />

      {/* ── Scrollable Content ── */}
      <div className="page-content">
        <div
          style={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            // bottom padding clears the fixed navigation bar
            padding: isMobile ? '20px 12px 140px' : isTablet ? '28px 24px 140px' : '32px 32px 130px',
          }}
        >
          {/* ── Section badge (Behavioural steps) ── */}
          {isBehavStep && (
            <motion.div
              key="behav-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginBottom: isMobile ? '8px' : '10px',
                background: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(79,70,229,0.12))',
                border: '1px solid rgba(167,139,250,0.28)',
                borderRadius: '999px',
                padding: '4px 14px',
                fontSize: '11px',
                color: '#c4b5fd',
                letterSpacing: '0.8px',
                textTransform: 'uppercase' as const,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              ✦ Behavioural Analysis
            </motion.div>
          )}

          {/* ── Step Header ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`header-${step}`}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                textAlign: 'center',
                marginBottom: isMobile ? '12px' : '18px',
                width: '100%',
              }}
            >
              <p
                style={{
                  fontSize: '11px',
                  color: isBehavStep ? '#c4b5fd' : 'rgba(167,139,250,0.7)',
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  marginBottom: '7px',
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {currentStep.stepLabel}
              </p>

              <h1
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: isMobile
                    ? 'clamp(24px, 6.5vw, 32px)'
                    : isTablet
                    ? 'clamp(28px, 4vw, 40px)'
                    : 'clamp(32px, 3.2vw, 48px)',
                  fontWeight: 400,
                  color: '#fff',
                  margin: '0 0 6px',
                  lineHeight: 1.1,
                  letterSpacing: '-0.5px',
                  textShadow: '0 2px 24px rgba(0,0,0,0.7)',
                }}
              >
                {currentStep.title}
              </h1>

              <p
                style={{
                  fontSize: isMobile ? '12.5px' : '14px',
                  color: 'rgba(200,190,230,0.7)',
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.5,
                  maxWidth: '560px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                {currentStep.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* ── Content Row ── */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`content-${step}`}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, y: d > 0 ? 28 : -28 }),
                center: { opacity: 1, y: 0 },
                exit:  (d: number) => ({ opacity: 0, y: d > 0 ? -20 : 20 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                flexDirection: isVertical ? 'column' : 'row',
                gap: isMobile ? '14px' : isTablet ? '18px' : '26px',
                width: '100%',
                maxWidth: '1100px',
              }}
            >
              <ChartPanel
                stepIndex={step}
                chartHeight={chartH}
                isMobile={isMobile}
              />
              <div style={{ flex: isVertical ? 'unset' : '0.8', minWidth: 0 }}>
                <InsightBox step={currentStep} stepIndex={step} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Navigation Bar ── */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          padding: isMobile ? '10px 16px 16px' : '12px 32px 18px',
          background: 'linear-gradient(to top, rgba(2,4,18,0.85) 0%, transparent 100%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        aria-label="Journey navigation"
      >
        {/* Two dot rows: static + behavioural */}
        <div style={{ display: 'flex', gap: isMobile ? '12px' : '20px', alignItems: 'center' }}>
          {/* Static dots group */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {staticDots.map((i) => (
              <button
                key={i}
                className={`step-dot ${i === step ? 'active' : ''}`}
                onClick={() => { setDirection(i > step ? 1 : -1); setStep(i); }}
                aria-label={`Chapter ${i + 1}`}
                title={STEPS[i].title}
              />
            ))}
          </div>

          {/* Divider */}
          <div style={{
            width: '1px', height: '14px',
            background: 'rgba(167,139,250,0.25)',
            borderRadius: '1px',
          }} />

          {/* Behavioural dots group */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {behaviouralDots.map((i) => (
              <button
                key={i}
                className={`step-dot ${i === step ? 'active' : ''}`}
                style={i === step ? {} : { background: 'rgba(167,139,250,0.2)' }}
                onClick={() => { setDirection(i > step ? 1 : -1); setStep(i); }}
                aria-label={`Chapter ${i + 1}`}
                title={STEPS[i].title}
              />
            ))}
          </div>
        </div>

        {/* Prev / Next buttons */}
        <div style={{ display: 'flex', gap: isMobile ? '10px' : '16px', alignItems: 'center' }}>
          <button
            className="btn-prev"
            onClick={goPrev}
            disabled={isFirst}
            aria-label="Previous chapter"
          >
            ← Back
          </button>

          {/* Step counter */}
          <span style={{
            fontSize: '11px',
            color: 'rgba(167,139,250,0.6)',
            fontFamily: "'Inter', sans-serif",
            minWidth: '48px',
            textAlign: 'center',
          }}>
            {step + 1} / {TOTAL_STEPS}
          </span>

          <button
            className="btn-next"
            onClick={goNext}
            disabled={isLast}
            aria-label={isLast ? 'Journey complete' : 'Next chapter'}
          >
            {isLast ? 'Complete ✦' : 'Next →'}
          </button>
        </div>
      </nav>
    </div>
  );
}
