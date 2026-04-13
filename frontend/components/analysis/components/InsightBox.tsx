import { motion } from 'framer-motion';
import { StepMeta, RANK_DISTRIBUTION } from '../data';

interface Props {
  step:      StepMeta;
  stepIndex: number;
}

// Steps that are "behavioural" (fetched from MongoDB)
const BEHAV_STEPS = new Set([4, 5, 6, 7, 8]);

export function InsightBox({ step, stepIndex }: Props) {
  const isBehav = BEHAV_STEPS.has(stepIndex);

  return (
    <motion.div
      className="insight-card"
      style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
    >
      {/* Header */}
      <div>
        <p style={{
          fontSize: '11px',
          color: isBehav ? '#c4b5fd' : 'rgba(167,139,250,0.75)',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '6px',
          fontWeight: 500,
          fontFamily: "'Inter', sans-serif",
        }}>
          {isBehav ? '✦ Behavioural Insight' : 'Insight'}
        </p>
        <h3 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(16px, 2vw, 21px)',
          color: '#fff',
          fontWeight: 400,
          lineHeight: 1.3,
          margin: 0,
        }}>
          {step.insightTitle}
        </h3>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: isBehav
          ? 'linear-gradient(90deg, rgba(167,139,250,0.3), transparent)'
          : 'rgba(167,139,250,0.15)',
      }} />

      {/* Body text */}
      <p style={{
        fontSize: '13.5px',
        color: 'rgba(210,200,235,0.88)',
        lineHeight: 1.68,
        margin: 0,
        maxWidth: '55ch',
      }}>
        {step.insightText}
      </p>

      {/* Bullets */}
      <ul className="insight-bullets" style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: 0, padding: 0 }}>
        {step.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      {/* Stat chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginTop: '4px' }}>
        {step.stats.map((s, i) => (
          <div key={i} className="stat-chip">
            <span className="stat-label">{s.label}</span>
            <span className="stat-value">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Rank legend (step 2 only) */}
      {stepIndex === 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
          {RANK_DISTRIBUTION.slice(0, 6).map((r) => (
            <span
              key={r.rank}
              className="rank-chip"
              style={{
                background: r.color + '22',
                border: `1px solid ${r.color}55`,
                color: r.color === '#0000FF' ? '#6699ff' : r.color,
              }}
            >
              {r.rank}
            </span>
          ))}
        </div>
      )}

      {/* Growth legend (step 3 only) */}
      {stepIndex === 2 && (
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '4px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', color: '#c4b5fd' }}>
            <span style={{ width: '22px', height: '2px', background: '#a78bfa', display: 'inline-block', borderRadius: '2px' }} />
            Cumulative
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', color: '#6ee7b7' }}>
            <span style={{ width: '22px', height: '0', borderTop: '2px dashed #34d399', display: 'inline-block' }} />
            New / year
          </span>
        </div>
      )}

      {/* Behavioural data source badge */}
      {isBehav && (
        <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
          <span style={{
            fontSize: '10px',
            color: 'rgba(167,139,250,0.5)',
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#34d399',
              display: 'inline-block',
              boxShadow: '0 0 6px #34d399',
            }} />
            Live · MongoDB Atlas · cluster1/behaviours
          </span>
        </div>
      )}
    </motion.div>
  );
}
