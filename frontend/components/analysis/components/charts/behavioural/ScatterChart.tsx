import { useState, useMemo } from 'react';
import {
  ScatterChart as RCScatterChart, Scatter, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ZAxis,
} from 'recharts';
import { BehaviourRecord, RANK_ORDER, cfColor } from '../../../hooks/useBehaviourData';

interface Props { records: BehaviourRecord[]; height: number; isMobile: boolean }

type Field = 'rating' | 'avg_difficulty' | 'contest_count' | 'total_problems_solved' | 'accuracy';

const FIELD_LABELS: Record<Field, string> = {
  rating:                'Rating',
  avg_difficulty:        'Avg Difficulty',
  contest_count:         'Contest Count',
  total_problems_solved: 'Problems Solved',
  accuracy:              'Accuracy (%)',
};

const FIELDS: Field[] = ['rating', 'avg_difficulty', 'contest_count', 'total_problems_solved', 'accuracy'];

const selectStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(167,139,250,0.25)',
  borderRadius: '8px',
  color: 'rgba(220,210,240,0.9)',
  fontSize: '12px',
  padding: '5px 10px',
  cursor: 'pointer',
  outline: 'none',
  fontFamily: "'Inter', sans-serif",
};

function ScatterTooltip({ active, payload }: { active?: boolean; payload?: { payload: BehaviourRecord & { x: number; y: number; z: number } }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="custom-tooltip">
      <p className="tt-label" style={{ fontWeight: 500, color: cfColor(d.title) }}>@{d.handle}</p>
      <p className="tt-label">{d.title}</p>
      <p className="tt-value">x: {d.x?.toFixed ? d.x.toFixed(1) : d.x}</p>
      <p className="tt-value">y: {d.y?.toFixed ? d.y.toFixed(1) : d.y}</p>
    </div>
  );
}

export function BehaviourScatterChart({ records, height, isMobile }: Props) {
  const [xField, setXField] = useState<Field>('contest_count');
  const [yField, setYField] = useState<Field>('avg_difficulty');

  const chartData = useMemo(() =>
    records.map((r) => ({
      ...r,
      x: r[xField] as number,
      y: r[yField] as number,
      z: Math.max(2, Math.sqrt((r.total_problems_solved ?? 10) / 5)),
    })),
    [records, xField, yField]
  );

  // Group by rank for coloring
  const byRank = useMemo(() => {
    const groups: Record<string, typeof chartData> = {};
    chartData.forEach((d) => {
      const t = d.title?.toLowerCase() ?? 'newbie';
      if (!groups[t]) groups[t] = [];
      groups[t].push(d);
    });
    return groups;
  }, [chartData]);

  return (
    <div style={{ width: '100%' }}>
      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: 'rgba(167,139,250,0.75)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Axes</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select style={selectStyle} value={xField} onChange={(e) => setXField(e.target.value as Field)}>
            {FIELDS.map((f) => <option key={f} value={f}>{FIELD_LABELS[f]}</option>)}
          </select>
          <span style={{ color: 'rgba(167,139,250,0.5)', fontSize: '12px' }}>vs</span>
          <select style={selectStyle} value={yField} onChange={(e) => setYField(e.target.value as Field)}>
            {FIELDS.map((f) => <option key={f} value={f}>{FIELD_LABELS[f]}</option>)}
          </select>
        </div>
        {!isMobile && (
          <span style={{ fontSize: '11px', color: 'rgba(167,139,250,0.5)', marginLeft: 'auto' }}>
            dot size = problems solved
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={height - 52}>
        <RCScatterChart margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number" dataKey="x" name={FIELD_LABELS[xField]}
              tick={{ fontSize: 10, fill: 'rgba(200,190,230,0.7)' }} tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
              label={{ value: FIELD_LABELS[xField], position: 'insideBottom', offset: -2, fill: 'rgba(200,190,230,0.5)', fontSize: 11 }}
            />
            <YAxis
              type="number" dataKey="y" name={FIELD_LABELS[yField]}
              tick={{ fontSize: 10, fill: 'rgba(200,190,230,0.7)' }} tickLine={false} axisLine={false} width={36}
            />
            <ZAxis type="number" dataKey="z" range={[20, 120]} />
            <Tooltip content={<ScatterTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(167,139,250,0.3)' }} />
            {RANK_ORDER.filter((r) => byRank[r]?.length).map((rank) => (
              <Scatter key={rank} name={rank} data={byRank[rank]} fill={cfColor(rank)} fillOpacity={0.7} />
            ))}
          </RCScatterChart>
      </ResponsiveContainer>

      {/* Compact rank legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
        {RANK_ORDER.map((r) => byRank[r] ? (
          <span key={r} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: cfColor(r) + '22', border: `1px solid ${cfColor(r)}44`, color: cfColor(r) }}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </span>
        ) : null)}
      </div>
    </div>
  );
}
