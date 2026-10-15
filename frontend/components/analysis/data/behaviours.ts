// Static snapshot of Analysis/final_cleaned_user_data.csv (369 users, names stripped).
// Previously served live from MongoDB; baked in so charts 5–9 never depend on a server.
// accuracy is stored as a percentage (0–100).
import records from './behaviours.json';

export interface BehaviourRecord {
  handle:                string;
  rating:                number;
  avg_difficulty:        number;
  contest_count:         number;
  title:                 string;
  accuracy:              number;
  total_problems_solved: number;
}

export const BEHAVIOUR_RECORDS: BehaviourRecord[] = records;

export const RANK_ORDER = [
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

export const CF_COLOURS: Record<string, string> = {
  newbie:                      '#808080',
  pupil:                       '#008000',
  specialist:                  '#03A89E',
  expert:                      '#6688FF',   // brightened blue for dark bg
  'candidate master':          '#CC44CC',   // brightened purple for dark bg
  master:                      '#FF8C00',
  'international master':      '#FFB347',
  grandmaster:                 '#FF4444',
  'international grandmaster': '#FF6F6F',
  'legendary grandmaster':     '#FF9A9A',
};

export function cfColor(title: string): string {
  return CF_COLOURS[title?.toLowerCase()] ?? '#808080';
}

export function titleCase(rank: string): string {
  return rank.replace(/\b\w/g, (c) => c.toUpperCase());
}
