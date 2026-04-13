import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Cell, ResponsiveContainer, LabelList,
} from 'recharts';
import { TOP_CITIES } from '../../data';
import { CustomTooltip } from '../CustomTooltip';

const CITY_COLORS = [
  '#a78bfa','#818cf8','#38bdf8','#34d399','#fb923c',
  '#f472b6','#a78bfa','#818cf8','#38bdf8','#34d399',
  '#fb923c','#f472b6','#a78bfa','#818cf8','#38bdf8',
];

interface Props { height: number; isMobile: boolean }

export function CitiesChart({ height, isMobile }: Props) {
  const data = isMobile ? TOP_CITIES.slice(0, 10) : TOP_CITIES;

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: isMobile ? 50 : 70, left: isMobile ? 64 : 82, bottom: 4 }}
          barCategoryGap="16%"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 10, fill: 'rgba(200,190,230,0.7)' }}
            tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            type="category"
            dataKey="city"
            tick={{ fontSize: isMobile ? 10.5 : 12, fill: 'rgba(210,200,235,0.9)' }}
            tickLine={false}
            axisLine={false}
            width={isMobile ? 62 : 80}
          />
          <Tooltip
            content={<CustomTooltip formatter={(v) => `${v.toLocaleString()} users`} />}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={CITY_COLORS[i] + 'cc'} stroke={CITY_COLORS[i]} strokeWidth={0.8} />
            ))}
            <LabelList
              dataKey="count"
              position="right"
              formatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)}
              style={{ fontSize: 10, fill: 'rgba(200,190,230,0.7)' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
