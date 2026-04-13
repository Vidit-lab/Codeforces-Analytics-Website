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

export function SkeletonInsight() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {[0.4, 0.8, 0.65, 0.9, 0.5].map((w, i) => (
        <motion.div
          key={i}
          {...pulse}
          transition={{ ...pulse.transition, delay: i * 0.1 }}
          style={{
            height: i === 0 ? '22px' : '14px',
            width: `${w * 100}%`,
            background: 'rgba(167,139,250,0.1)',
            borderRadius: '4px',
          }}
        />
      ))}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100%', gap: '12px', padding: '24px',
    }}>
      <div style={{ fontSize: '28px' }}>⚠️</div>
      <p style={{ color: 'rgba(255,100,100,0.85)', fontSize: '13px', textAlign: 'center', margin: 0, lineHeight: 1.6 }}>
        Could not load behavioural data.<br />
        <span style={{ color: 'rgba(200,180,230,0.5)', fontSize: '12px' }}>{message}</span>
      </p>
      <p style={{ color: 'rgba(167,139,250,0.6)', fontSize: '12px', margin: 0 }}>
        Make sure the API server is running on port 4000.
      </p>
    </div>
  );
}
