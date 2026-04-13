import { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:4000';

// ── Types ──────────────────────────────────────────────────────────────────
export interface BehaviourRecord {
  handle:               string;
  rating:               number;
  avg_difficulty:       number;
  contest_count:        number;
  title:                string;
  accuracy:             number;
  total_problems_solved: number;
}

export interface RankSummary {
  _id:            string;   // rank title
  avgDifficulty:  number;
  avgContests:    number;
  avgProblems:    number;
  avgRating:      number;
  avgAccuracy:    number;
  count:          number;
}

export interface BehaviourData {
  records:  BehaviourRecord[];
  summary:  RankSummary[];
}

type Status = 'idle' | 'loading' | 'success' | 'error';

// ── Rank ordering for consistent chart axis order ──────────────────────────
export const RANK_ORDER = [
  'newbie',
  'pupil',
  'specialist',
  'expert',
  'candidate master',
  'master',
  'grandmaster',
];

export const CF_COLOURS: Record<string, string> = {
  newbie:                    '#808080',
  pupil:                     '#008000',
  specialist:                '#03A89E',
  expert:                    '#6688FF',   // brightened blue for dark bg
  'candidate master':        '#CC44CC',   // brightened purple for dark bg
  master:                    '#FF8C00',
  'international master':    '#FF8C00',
  grandmaster:               '#FF4444',   // brightened red for dark bg
  'international grandmaster': '#FF4444',
  'legendary grandmaster':   '#FF4444',
};

export function cfColor(title: string): string {
  return CF_COLOURS[title?.toLowerCase()] ?? '#808080';
}

// ── Hook ───────────────────────────────────────────────────────────────────
export function useBehaviourData() {
  const [status, setStatus]   = useState<Status>('idle');
  const [data, setData]       = useState<BehaviourData | null>(null);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    async function fetchAll() {
      try {
        const [recRes, sumRes] = await Promise.all([
          fetch(`${API_BASE}/api/behaviours`),
          fetch(`${API_BASE}/api/behaviours/summary`),
        ]);

        if (!recRes.ok || !sumRes.ok) {
          throw new Error(`API error: ${recRes.status} / ${sumRes.status}`);
        }

        const [recJson, sumJson] = await Promise.all([
          recRes.json() as Promise<{ ok: boolean; data: BehaviourRecord[] }>,
          sumRes.json() as Promise<{ ok: boolean; data: RankSummary[]   }>,
        ]);

        if (!cancelled) {
          // Sort summary by CF rank order
          const sortedSummary = [...recJson.ok ? [] : [], ...sumJson.data].sort(
            (a, b) =>
              RANK_ORDER.indexOf(a._id.toLowerCase()) -
              RANK_ORDER.indexOf(b._id.toLowerCase())
          );

          setData({ records: recJson.data, summary: sortedSummary });
          setStatus('success');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
          setStatus('error');
        }
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return { status, data, error };
}
