import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Cell, ResponsiveContainer, ErrorBar,
} from 'recharts';
import { BehaviourRecord, cfColor } from '../../../hooks/useBehaviourData';
import { TooltipProps } from 'recharts';

interface Props { records: BehaviourRecord[]; height: number }

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

function formatSummary(v: number): string {
  return v.toFixed(3);
}

function BoxTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as {
    label: string;
    count: number;
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
    color: string;
  };

  return (
    <div className="custom-tooltip">
      <p className="tt-label" style={{ margin: '0 0 6px', color: d.color, fontWeight: 600 }}>
        {d.label}
      </p>
      <p className="tt-value" style={{ margin: 0 }}>Min: {formatSummary(d.min)}</p>
      <p className="tt-value" style={{ margin: 0 }}>Q1: {formatSummary(d.q1)}</p>
      <p className="tt-value" style={{ margin: 0 }}>Median: {formatSummary(d.median)}</p>
      <p className="tt-value" style={{ margin: 0 }}>Q3: {formatSummary(d.q3)}</p>
      <p className="tt-value" style={{ margin: 0 }}>Max: {formatSummary(d.max)}</p>
      <p className="tt-label" style={{ margin: '6px 0 0', opacity: 0.8 }}>n = {d.count}</p>
    </div>
  );
}

export function BoxPlotChart({ records: _records, height }: Props) {
  const BOX_RANK_ORDER = [
    'newbie',
    'pupil',
    'specialist',
    'expert',
    'candidate master',
    'master',
    'international master',
    'grandmaster',
    'international grandmaster',
    'legendary grandmaster',
  ];

  const stats = BOX_SUMMARY
    .sort((a, b) => {
      const ai = BOX_RANK_ORDER.indexOf(a.rank);
      const bi = BOX_RANK_ORDER.indexOf(b.rank);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    })
    .map((s) => ({
      ...s,
      base: +s.q1.toFixed(3),
      box: +(s.q3 - s.q1).toFixed(3),
      whiskerErr: [+(s.median - s.min).toFixed(3), +(s.max - s.median).toFixed(3)],
      color: cfColor(s.rank),
    }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={stats} margin={{ top: 16, right: 24, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: 'rgba(200,190,230,0.75)' }}
            angle={-30} textAnchor="end" interval={0} tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'rgba(200,190,230,0.7)' }}
            tickLine={false} axisLine={false} width={36}
            label={{ value: 'Avg Difficulty', angle: -90, position: 'insideLeft', fill: 'rgba(200,190,230,0.5)', fontSize: 11, dy: 50 }}
          />
          <Tooltip
            content={<BoxTooltip />}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          {/* Invisible base to stack the box on top */}
          <Bar dataKey="base" stackId="box" fill="transparent" />
          {/* IQR box */}
          <Bar dataKey="box" stackId="box" radius={[3, 3, 0, 0]} name="IQR (Q1–Q3)">
            {stats.map((s, i) => (
              <Cell key={i} fill={s.color + 'bb'} stroke={s.color} strokeWidth={1.2} />
            ))}
            <ErrorBar dataKey="whiskerErr" width={6} strokeWidth={1.5} stroke="rgba(255,255,255,0.55)" direction="y" />
          </Bar>
        </ComposedChart>
    </ResponsiveContainer>
  );
}
