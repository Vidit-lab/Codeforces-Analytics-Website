import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts';
import { USER_GROWTH } from '../../data';
import { CustomTooltip } from '../CustomTooltip';

interface Props { height: number; isMobile: boolean }

export function GrowthChart({ height, isMobile }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={USER_GROWTH}
          margin={{ top: 12, right: 16, left: isMobile ? 0 : 8, bottom: 4 }}
        >
        <defs>
          <linearGradient id="cumGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.18} />
            <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#34d399" stopOpacity={0.14} />
            <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: 'rgba(200,190,230,0.7)' }}
          tickLine={false}
          axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          interval={isMobile ? 3 : 1}
        />
        <YAxis
          yAxisId="cum"
          orientation="left"
          tick={{ fontSize: 10, fill: '#c4b5fd' }}
          tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
          tickLine={false}
          axisLine={false}
          width={36}
        />
        <YAxis
          yAxisId="new"
          orientation="right"
          tick={{ fontSize: 10, fill: '#6ee7b7' }}
          tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
          tickLine={false}
          axisLine={false}
          width={36}
        />
        <Tooltip
          content={
            <CustomTooltip
              formatter={(v) => v.toLocaleString()}
            />
          }
          cursor={{ stroke: 'rgba(167,139,250,0.2)', strokeWidth: 1 }}
        />
        <ReferenceLine
          yAxisId="new"
          x={2020}
          stroke="rgba(52,211,153,0.4)"
          strokeDasharray="5 3"
          label={{ value: '2020 peak', position: 'top', fill: '#34d399', fontSize: 10 }}
        />
        <ReferenceLine
          yAxisId="new"
          x={2022}
          stroke="rgba(167,139,250,0.45)"
          strokeDasharray="5 3"
          label={{ value: 'HFT craze', position: 'top', fill: '#c4b5fd', fontSize: 10 }}
        />
        <Area
          yAxisId="cum"
          type="monotone"
          dataKey="cumulative"
          stroke="#a78bfa"
          strokeWidth={2.5}
          fill="url(#cumGrad)"
          dot={false}
          activeDot={{ r: 5, fill: '#a78bfa', stroke: 'rgba(167,139,250,0.3)', strokeWidth: 4 }}
          name="Cumulative users"
        />
        <Line
          yAxisId="new"
          type="monotone"
          dataKey="new_users"
          stroke="#34d399"
          strokeWidth={2}
          strokeDasharray="6 3"
          dot={false}
          activeDot={{ r: 4, fill: '#34d399', stroke: 'rgba(52,211,153,0.3)', strokeWidth: 3 }}
          name="New users / year"
        />
        {!isMobile && (
          <Legend
            wrapperStyle={{ fontSize: '11px', color: 'rgba(200,190,230,0.75)', paddingTop: '12px' }}
            formatter={(value) => <span style={{ color: 'rgba(200,190,230,0.75)' }}>{value}</span>}
          />
        )}
        </ComposedChart>
    </ResponsiveContainer>
  );
}
