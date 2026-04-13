import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Cell, ResponsiveContainer, LabelList,
} from 'recharts';
import { RANK_DISTRIBUTION } from '../../data';
import { CustomTooltip } from '../CustomTooltip';

interface Props { height: number; isMobile: boolean }

export function RankChart({ height, isMobile }: Props) {
  const data = isMobile ? RANK_DISTRIBUTION.slice(0, 7) : RANK_DISTRIBUTION;

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: isMobile ? 50 : 70, left: isMobile ? 72 : 100, bottom: 4 }}
          barCategoryGap="18%"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 10, fill: 'rgba(200,190,230,0.7)' }}
            tickFormatter={(v) => v.toLocaleString()}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            type="category"
            dataKey="rank"
            tick={{ fontSize: isMobile ? 10 : 12, fill: 'rgba(210,200,235,0.9)' }}
            tickLine={false}
            axisLine={false}
            width={isMobile ? 70 : 98}
          />
          <Tooltip
            content={
              <CustomTooltip
                formatter={(v) => `${v.toLocaleString()} users`}
              />
            }
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color + 'cc'} stroke={entry.color} strokeWidth={0.8} />
            ))}
            <LabelList
              dataKey="count"
              position="right"
              formatter={(v: number) => v.toLocaleString()}
              style={{ fontSize: 11, fill: 'rgba(200,190,230,0.75)' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
