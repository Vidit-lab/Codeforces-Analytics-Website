import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Cell, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { RankSummary, RANK_ORDER, cfColor } from '../../../hooks/useBehaviourData';
import { CustomTooltip } from '../../CustomTooltip';

type Metric = 'avgContests' | 'avgDifficulty' | 'avgProblems' | 'avgAccuracy' | 'avgRating' | 'count';

const METRIC_META: Record<Metric, { label: string; unit: string; decimals: number }> = {
  avgContests:   { label: 'Avg Contests Participated',   unit: '',   decimals: 0 },
  avgDifficulty: { label: 'Avg Problem Difficulty',      unit: '',   decimals: 2 },
  avgProblems:   { label: 'Avg Problems Solved',         unit: '',   decimals: 0 },
  avgAccuracy:   { label: 'Avg Submission Accuracy (%)', unit: '%',  decimals: 1 },
  avgRating:     { label: 'Avg Rating',                  unit: '',   decimals: 0 },
  count:         { label: 'User Count per Rank',         unit: ' users', decimals: 0 },
};

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

interface Props { summary: RankSummary[]; height: number }

export function BehaviourBarChart({ summary, height }: Props) {
  const [metric, setMetric] = useState<Metric>('avgContests');
  const meta = METRIC_META[metric];

  const data = RANK_ORDER
    .map((rank) => {
      const s = summary.find((r) => r._id?.toLowerCase() === rank);
      if (!s) return null;
      return {
        label: rank.charAt(0).toUpperCase() + rank.slice(1),
        value: +((s[metric] as number) ?? 0).toFixed(meta.decimals),
        color: cfColor(rank),
        rank,
      };
    })
    .filter(Boolean) as { label: string; value: number; color: string; rank: string }[];

  const avg = data.length ? data.reduce((acc, d) => acc + d.value, 0) / data.length : 0;

  return (
    <div style={{ width: '100%' }}>
      {/* Metric selector */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', color: 'rgba(167,139,250,0.75)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Metric</span>
        <select style={selectStyle} value={metric} onChange={(e) => setMetric(e.target.value as Metric)}>
          {(Object.keys(METRIC_META) as Metric[]).map((m) => (
            <option key={m} value={m}>{METRIC_META[m].label}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={height - 52}>
        <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 16 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: 'rgba(200,190,230,0.75)' }}
            angle={-30} textAnchor="end" interval={0} tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'rgba(200,190,230,0.7)' }}
            tickLine={false} axisLine={false} width={40}
            tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)}
          />
          <ReferenceLine
            y={avg}
            stroke="rgba(167,139,250,0.45)"
            strokeDasharray="5 3"
            label={{ value: `avg ${avg.toFixed(meta.decimals)}${meta.unit}`, position: 'right', fill: '#a78bfa', fontSize: 10 }}
          />
          <Tooltip
            content={
              <CustomTooltip
                formatter={(v) => `${v.toFixed(meta.decimals)}${meta.unit}`}
              />
            }
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} name={meta.label}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color + 'cc'} stroke={d.color} strokeWidth={0.8} />
            ))}
          </Bar>
          </BarChart>
        </ResponsiveContainer>
    </div>
  );
}
