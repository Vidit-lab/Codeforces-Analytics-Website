import { useState } from 'react';
import {
  RadarChart as RCRadar, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

interface Props { height: number }

const RADAR_DIMS = [
  'Implementation',
  'Greedy / Constructive',
  'Dynamic Programming',
  'Graph Theory',
  'Number Theory',
  'Data Structures',
  'String Algorithms',
  'Geometry / Math',
];

const PROFILES: Record<string, number[]> = {
  'Newbie':           [4.0, 2.5, 1.0, 0.5, 0.5, 1.0, 0.5, 1.5],
  'Pupil':            [6.0, 4.0, 2.5, 1.5, 1.5, 2.5, 1.5, 2.5],
  'Specialist':       [7.5, 5.5, 4.5, 3.5, 3.0, 4.0, 3.0, 3.5],
  'Expert':           [8.0, 6.5, 6.0, 5.5, 4.5, 5.5, 4.5, 4.5],
  'Candidate Master': [8.5, 7.5, 7.5, 7.0, 6.5, 7.0, 6.0, 5.5],
  'Master':           [9.0, 8.5, 8.5, 8.0, 7.5, 8.0, 7.0, 7.0],
  'Grandmaster':      [9.5, 9.5, 9.5, 9.0, 9.0, 9.5, 8.5, 8.5],
};

const RANK_COLORS: Record<string, string> = {
  'Newbie':           '#808080',
  'Pupil':            '#008000',
  'Specialist':       '#03A89E',
  'Expert':           '#6688FF',
  'Candidate Master': '#CC44CC',
  'Master':           '#FF8C00',
  'Grandmaster':      '#FF4444',
};

// Data must be per-dim (one object per dim with all ranks as keys)
const chartData = RADAR_DIMS.map((dim, i) => {
  const entry: Record<string, string | number> = { dim };
  Object.entries(PROFILES).forEach(([rank, vals]) => { entry[rank] = vals[i]; });
  return entry;
});

const ALL_RANKS = Object.keys(PROFILES);

export function BehaviourRadarChart({ height }: Props) {
  const [selected, setSelected] = useState<string[]>(['Newbie', 'Specialist', 'Expert', 'Grandmaster']);

  return (
    <div style={{ width: '100%' }}>
      {/* Rank toggles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
        {ALL_RANKS.map((rank) => {
          const active = selected.includes(rank);
          const col    = RANK_COLORS[rank];
          return (
            <button
              key={rank}
              onClick={() =>
                setSelected((prev) =>
                  active ? prev.filter((r) => r !== rank) : [...prev, rank]
                )
              }
              style={{
                fontSize: '11px',
                padding: '3px 10px',
                borderRadius: '6px',
                border: `1px solid ${col}${active ? 'cc' : '44'}`,
                background: active ? col + '22' : 'rgba(255,255,255,0.03)',
                color: active ? col : 'rgba(180,170,210,0.5)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {rank}
            </button>
          );
        })}
      </div>

      <ResponsiveContainer width="100%" height={height - 60}>
        <RCRadar data={chartData} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis
            dataKey="dim"
            tick={{ fontSize: 10, fill: 'rgba(200,190,230,0.75)', fontFamily: "'Inter', sans-serif" }}
          />
          <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
          {selected.map((rank) => {
            const col = RANK_COLORS[rank];
            return (
              <Radar
                key={rank}
                name={rank}
                dataKey={rank}
                stroke={col}
                fill={col}
                fillOpacity={0.12}
                strokeWidth={1.8}
                dot={false}
                activeDot={{ r: 5 }}
              />
            );
          })}
          <Tooltip
            contentStyle={{
              background: 'rgba(14,8,32,0.94)',
              border: '1px solid rgba(167,139,250,0.28)',
              borderRadius: '10px',
              fontSize: '12px',
              fontFamily: "'Inter', sans-serif",
              color: '#e2d9ff',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
            formatter={(value: string) => (
              <span style={{ color: RANK_COLORS[value] ?? '#e2d9ff' }}>{value}</span>
            )}
          />
          </RCRadar>
        </ResponsiveContainer>
    </div>
  );
}
