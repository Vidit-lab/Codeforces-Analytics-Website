import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, TooltipProps,
} from 'recharts';
import { RANK_ORDER, cfColor } from '../../../data/behaviours';

interface Props { height: number; isMobile: boolean }

type BoxSummary = {
  rank: string;
  label: string;
  count: number;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

// Precomputed summary values provided by analysis notebook.
const BOX_SUMMARY: BoxSummary[] = [
  {
    rank: 'newbie',
    label: 'Newbie',
    count: 50,
    min: 800.0,
    q1: 838.794643,
    median: 901.488095,
    q3: 953.013783,
    max: 1426.470588,
  },
  {
    rank: 'pupil',
    label: 'Pupil',
    count: 50,
    min: 800.0,
    q1: 934.574468,
    median: 1014.568066,
    q3: 1101.097286,
    max: 1391.139241,
  },
  {
    rank: 'specialist',
    label: 'Specialist',
    count: 50,
    min: 905.128205,
    q1: 1006.083665,
    median: 1156.8081,
    q3: 1251.255805,
    max: 1439.664804,
  },
  {
    rank: 'expert',
    label: 'Expert',
    count: 50,
    min: 953.551913,
    q1: 1157.228568,
    median: 1248.435973,
    q3: 1329.713091,
    max: 1665.737705,
  },
  {
    rank: 'candidate master',
    label: 'Candidate Master',
    count: 50,
    min: 1036.363636,
    q1: 1301.043169,
    median: 1390.989427,
    q3: 1520.108681,
    max: 1724.719101,
  },
  {
    rank: 'master',
    label: 'Master',
    count: 50,
    min: 1225.125628,
    q1: 1380.226119,
    median: 1471.824461,
    q3: 1544.205169,
    max: 1867.476908,
  },
  {
    rank: 'international master',
    label: 'International Master',
    count: 32,
    min: 1374.054759,
    q1: 1509.449953,
    median: 1579.74958,
    q3: 1653.157081,
    max: 1830.930931,
  },
  {
    rank: 'grandmaster',
    label: 'Grandmaster',
    count: 31,
    min: 1427.659574,
    q1: 1577.758044,
    median: 1656.404321,
    q3: 1755.774334,
    max: 2084.356895,
  },
  {
    rank: 'international grandmaster',
    label: 'International Grandmaster',
    count: 5,
    min: 1689.844852,
    q1: 1698.360656,
    median: 1716.122307,
    q3: 1736.226415,
    max: 1806.139053,
  },
  {
    rank: 'legendary grandmaster',
    label: 'Legendary Grandmaster',
    count: 1,
    min: 1792.140266,
    q1: 1792.140266,
    median: 1792.140266,
    q3: 1792.140266,
    max: 1792.140266,
  },
];

const SHORT: Record<string, string> = {
  newbie: 'N', pupil: 'P', specialist: 'S', expert: 'E', 'candidate master': 'CM',
  master: 'M', 'international master': 'IM', grandmaster: 'GM',
  'international grandmaster': 'IGM', 'legendary grandmaster': 'LGM',
};

type BoxDatum = BoxSummary & { short: string; base: number; box: number; color: string };

function formatSummary(v: number): string {
  return v.toFixed(0);
}

function BoxTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as BoxDatum;

  return (
    <div className="custom-tooltip">
      <p className="tt-label" style={{ margin: '0 0 6px', color: d.color, fontWeight: 600 }}>
        {d.label}
      </p>
      <p className="tt-value" style={{ margin: 0 }}>Max: {formatSummary(d.max)}</p>
      <p className="tt-value" style={{ margin: 0 }}>Q3: {formatSummary(d.q3)}</p>
      <p className="tt-value" style={{ margin: 0 }}>Median: {formatSummary(d.median)}</p>
      <p className="tt-value" style={{ margin: 0 }}>Q1: {formatSummary(d.q1)}</p>
      <p className="tt-value" style={{ margin: 0 }}>Min: {formatSummary(d.min)}</p>
      <p className="tt-label" style={{ margin: '6px 0 0', opacity: 0.8 }}>n = {d.count}</p>
    </div>
  );
}

// Draws one full box (whiskers, IQR box, median) on top of the stacked "box" bar.
// The bar's top edge is q3; the background rect spans the whole y-domain, giving pixels-per-unit.
function BoxShape(props: { x?: number; y?: number; width?: number; height?: number; payload?: BoxDatum; background?: { height: number } }) {
  const { x = 0, y = 0, width = 0, height = 0, payload: d, background } = props;
  if (!d || !background) return null;
  const ppu = background.height / (DOMAIN[1] - DOMAIN[0]);
  const yAt = (v: number) => y + (d.q3 - v) * ppu;
  const cx = x + width / 2;
  const cap = width * 0.25;
  const stroke = 'rgba(255,255,255,0.6)';
  return (
    <g>
      <line x1={cx} x2={cx} y1={yAt(d.max)} y2={yAt(d.q3)} stroke={stroke} strokeWidth={1.2} />
      <line x1={cx} x2={cx} y1={yAt(d.q1)} y2={yAt(d.min)} stroke={stroke} strokeWidth={1.2} />
      <line x1={cx - cap} x2={cx + cap} y1={yAt(d.max)} y2={yAt(d.max)} stroke={stroke} strokeWidth={1.2} />
      <line x1={cx - cap} x2={cx + cap} y1={yAt(d.min)} y2={yAt(d.min)} stroke={stroke} strokeWidth={1.2} />
      <rect x={x} y={y} width={width} height={Math.max(height, 1)} rx={3} fill={d.color + 'bb'} stroke={d.color} strokeWidth={1.2} />
      <line x1={x} x2={x + width} y1={yAt(d.median)} y2={yAt(d.median)} stroke="#fff" strokeWidth={2} />
    </g>
  );
}

const DOMAIN: [number, number] = [700, 2200];

const STATS: BoxDatum[] = [...BOX_SUMMARY]
  .sort((a, b) => RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank))
  .map((s) => ({
    ...s,
    short: SHORT[s.rank] ?? s.label,
    base: s.q1,
    box: s.q3 - s.q1,
    color: cfColor(s.rank),
  }));

export function BoxPlotChart({ height, isMobile }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={STATS} margin={{ top: 16, right: 8, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={isMobile ? 'short' : 'label'}
          tick={{ fontSize: isMobile ? 10 : 11, fill: 'rgba(200,190,230,0.75)' }}
          angle={isMobile ? 0 : -35} textAnchor={isMobile ? 'middle' : 'end'}
          height={isMobile ? 24 : 96}
          interval={0} tickLine={false}
          axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
        />
        <YAxis
          domain={DOMAIN} allowDataOverflow ticks={[800, 1100, 1400, 1700, 2000]}
          tick={{ fontSize: 11, fill: 'rgba(200,190,230,0.7)' }}
          tickLine={false} axisLine={false} width={48}
          label={{ value: 'Avg Difficulty', angle: -90, position: 'insideLeft', fill: 'rgba(200,190,230,0.5)', fontSize: 11, dy: 40 }}
        />
        <Tooltip content={<BoxTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        {/* Invisible base lifts the box to start at q1 */}
        <Bar dataKey="base" stackId="box" fill="transparent" isAnimationActive={false} />
        <Bar dataKey="box" stackId="box" name="IQR (Q1–Q3)" shape={<BoxShape />} isAnimationActive={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
