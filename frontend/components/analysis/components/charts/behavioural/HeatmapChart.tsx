import { useMemo, useState } from 'react';
import { BehaviourRecord } from '../../../data/behaviours';

interface Props { records: BehaviourRecord[] }

const VARS = [
  { key: 'rating',                label: 'Rating' },
  { key: 'contest_count',         label: 'Contests' },
  { key: 'avg_difficulty',        label: 'Avg Diff.' },
  { key: 'total_problems_solved', label: 'Problems' },
  { key: 'accuracy',              label: 'Accuracy' },
] as const;

type VarKey = typeof VARS[number]['key'];

function pearson(xs: number[], ys: number[]): number {
  const n = xs.length;
  if (n === 0) return 0;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  const num = xs.reduce((acc, x, i) => acc + (x - mx) * (ys[i] - my), 0);
  const dx  = Math.sqrt(xs.reduce((acc, x) => acc + (x - mx) ** 2, 0));
  const dy  = Math.sqrt(ys.reduce((acc, y) => acc + (y - my) ** 2, 0));
  return (dx && dy) ? num / (dx * dy) : 0;
}

function corrColor(r: number): string {
  // Viridis-inspired: dark purple (neg) → teal (0) → yellow (pos)
  if (r >= 0) {
    const t = r;
    const R = Math.round(50 + t * 200);
    const G = Math.round(100 + t * 155);
    const B = Math.round(160 - t * 100);
    return `rgb(${R},${G},${B})`;
  } else {
    const t = -r;
    const R = Math.round(50 + t * 100);
    const G = Math.round(40 + t * 20);
    const B = Math.round(100 + t * 130);
    return `rgb(${R},${G},${B})`;
  }
}

export function HeatmapChart({ records }: Props) {
  const [hovered, setHovered] = useState<{ i: number; j: number } | null>(null);

  const matrix = useMemo(() => {
    const cols = VARS.map(({ key }) =>
      records.map((r) => (r[key as VarKey] as number) ?? 0).filter(Number.isFinite)
    );
    return VARS.map((_, i) =>
      VARS.map((_, j) => +pearson(cols[i], cols[j]).toFixed(3))
    );
  }, [records]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Scale bar */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
        {[-1, -0.5, 0, 0.5, 1].map((v) => (
          <span key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
            <span style={{ width: '24px', height: '10px', borderRadius: '2px', background: corrColor(v), display: 'block' }} />
            <span style={{ fontSize: '9px', color: 'rgba(200,190,230,0.6)' }}>{v}</span>
          </span>
        ))}
        <span style={{ fontSize: '10px', color: 'rgba(200,190,230,0.5)', marginLeft: '4px' }}>Correlation</span>
      </div>

      {/* Grid: label column + one column per variable; cells shrink with the card width */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `auto repeat(${VARS.length}, minmax(0, 1fr))`,
        gap: '2px',
        width: '100%',
        maxWidth: '420px',
        alignItems: 'center',
      }}>
        <div />
        {VARS.map(({ label }) => (
          <div key={label} style={{ fontSize: '10px', color: 'rgba(200,190,230,0.7)', textAlign: 'center', fontFamily: "'Inter', sans-serif", lineHeight: 1.3, paddingBottom: '2px' }}>
            {label}
          </div>
        ))}

        {matrix.map((row, i) => (
          <div key={i} style={{ display: 'contents' }}>
            {/* Row label */}
            <div style={{ fontSize: '10px', color: 'rgba(200,190,230,0.7)', textAlign: 'right', paddingRight: '6px', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}>
              {VARS[i].label}
            </div>

            {row.map((val, j) => {
              const isHov = hovered?.i === i && hovered?.j === j;
              return (
                <div
                  key={j}
                  onMouseEnter={() => setHovered({ i, j })}
                  onMouseLeave={() => setHovered(null)}
                  title={`${VARS[i].label} × ${VARS[j].label}: ${val}`}
                  style={{
                    aspectRatio: '1',
                    background: corrColor(val),
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(9px, 2.6vw, 12px)',
                    fontWeight: 700,
                    color: '#000000',
                    cursor: 'default',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    transform: isHov ? 'scale(1.12)' : 'scale(1)',
                    boxShadow: isHov ? `0 0 16px ${corrColor(val)}88` : 'none',
                    zIndex: isHov ? 2 : 1,
                    position: 'relative',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {val.toFixed(2)}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {hovered && (
        <p style={{ marginTop: '10px', fontSize: '12px', color: 'rgba(200,190,230,0.8)', textAlign: 'center' }}>
          <strong style={{ color: '#e2d9ff' }}>{VARS[hovered.i].label}</strong> × <strong style={{ color: '#e2d9ff' }}>{VARS[hovered.j].label}</strong>
          {' '}= <strong style={{ color: corrColor(matrix[hovered.i][hovered.j]) }}>{matrix[hovered.i][hovered.j]}</strong>
        </p>
      )}
    </div>
  );
}
