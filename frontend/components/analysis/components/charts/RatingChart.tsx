import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Cell, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { RATING_DISTRIBUTION, cfRatingColor } from '../../data';
import { CustomTooltip } from '../CustomTooltip';

interface Props { height: number }

const MEDIAN = 1179;
const MEDIAN_BAND_INDEX = 6; // 1100–1200

export function RatingChart({ height }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={RATING_DISTRIBUTION}
        margin={{ top: 8, right: 16, left: 0, bottom: 40 }}
        barCategoryGap="8%"
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="range"
          tick={{ fontSize: 10, fill: 'rgba(200,190,230,0.7)' }}
          angle={-45}
          textAnchor="end"
          interval={0}
          tickLine={false}
          axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'rgba(200,190,230,0.7)' }}
          tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
          tickLine={false}
          axisLine={false}
          width={36}
        />
        <Tooltip
          content={
            <CustomTooltip
              formatter={(v) => `${v.toLocaleString()} users`}
            />
          }
          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
        />
        <ReferenceLine
          x={RATING_DISTRIBUTION[MEDIAN_BAND_INDEX].range}
          stroke="rgba(167,139,250,0.55)"
          strokeDasharray="5 3"
          label={{ value: `Median ${MEDIAN}`, position: 'top', fill: '#a78bfa', fontSize: 10 }}
        />
        <Bar dataKey="count" radius={[3, 3, 0, 0]}>
          {RATING_DISTRIBUTION.map((entry, i) => (
            <Cell key={i} fill={cfRatingColor(entry.midpoint) + 'cc'} stroke={cfRatingColor(entry.midpoint)} strokeWidth={0.8} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
