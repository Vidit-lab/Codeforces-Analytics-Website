import { motion } from 'framer-motion';

interface Props { height?: number }

const pulse = {
  animate: { opacity: [0.3, 0.6, 0.3] },
  transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const },
};

export function SkeletonChart({ height = 340 }: Props) {
  return (
    <div style={{ width: '100%', height, display: 'flex', flexDirection: 'column', gap: '12px', padding: '2px 0' }}>
      {/* Fake bars */}
      {[0.85, 0.55, 0.7, 0.4, 0.9, 0.6, 0.75].map((h, i) => (
        <motion.div
          key={i}
          {...pulse}
          transition={{ ...pulse.transition, delay: i * 0.08 }}
          style={{
            height: `${Math.floor(((height - 80) / 7) * 0.7)}px`,
            width: `${h * 100}%`,
            background: 'rgba(167,139,250,0.12)',
            borderRadius: '4px',
          }}
        />
      ))}
      <motion.div
        {...pulse}
        style={{ height: '1px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', marginTop: 'auto' }}
      />
    </div>
  );
}
