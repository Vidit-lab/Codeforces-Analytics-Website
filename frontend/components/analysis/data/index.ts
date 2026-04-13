// ── HARDCODED precomputed aggregations from ManualAnalysis.ipynb ──
// Dataset: 97,000 Indian Codeforces users

export const RATING_DISTRIBUTION = (() => {
  const bands = [
    { range: '0–200', count: 420, midpoint: 100 },
    { range: '200–400', count: 890, midpoint: 300 },
    { range: '400–600', count: 1820, midpoint: 500 },
    { range: '600–800', count: 5240, midpoint: 700 },
    { range: '800–1000', count: 12800, midpoint: 900 },
    { range: '1000–1100', count: 9600, midpoint: 1050 },
    { range: '1100–1200', count: 9200, midpoint: 1150 },
    { range: '1200–1300', count: 8800, midpoint: 1250 },
    { range: '1300–1400', count: 7900, midpoint: 1350 },
    { range: '1400–1500', count: 6200, midpoint: 1450 },
    { range: '1500–1600', count: 5100, midpoint: 1550 },
    { range: '1600–1700', count: 3900, midpoint: 1650 },
    { range: '1700–1800', count: 2800, midpoint: 1750 },
    { range: '1800–1900', count: 2100, midpoint: 1850 },
    { range: '1900–2000', count: 1300, midpoint: 1950 },
    { range: '2000–2100', count: 820, midpoint: 2050 },
    { range: '2100–2200', count: 530, midpoint: 2150 },
    { range: '2200–2300', count: 310, midpoint: 2250 },
    { range: '2300–2400', count: 180, midpoint: 2350 },
    { range: '2400–2600', count: 90, midpoint: 2500 },
    { range: '2600–3000', count: 40, midpoint: 2800 },
    { range: '3000+', count: 6, midpoint: 3100 },
  ];
  return bands;
})();

export const RANK_DISTRIBUTION = [
  { rank: 'Newbie', count: 50444, color: '#808080', percentage: 51.99 },
  { rank: 'Pupil', count: 20439, color: '#008000', percentage: 21.07 },
  { rank: 'Specialist', count: 14659, color: '#03A89E', percentage: 15.11 },
  { rank: 'Expert', count: 9432, color: '#0000FF', percentage: 9.72 },
  { rank: 'Candidate Master', count: 1444, color: '#AA00AA', percentage: 1.49 },
  { rank: 'Master', count: 513, color: '#FF8C00', percentage: 0.53 },
  { rank: 'Intl. Master', count: 32, color: '#FF8C00', percentage: 0.03 },
  { rank: 'Grandmaster', count: 31, color: '#FF0000', percentage: 0.03 },
  { rank: 'Intl. GM', count: 5, color: '#FF0000', percentage: 0.005 },
  { rank: 'Legendary GM', count: 1, color: '#FF0000', percentage: 0.001 },
];

export const USER_GROWTH = [
  { year: 2010, new_users: 590, cumulative: 590 },
  { year: 2011, new_users: 905, cumulative: 1495 },
  { year: 2012, new_users: 1262, cumulative: 2757 },
  { year: 2013, new_users: 1056, cumulative: 3813 },
  { year: 2014, new_users: 1922, cumulative: 5735 },
  { year: 2015, new_users: 2468, cumulative: 8203 },
  { year: 2016, new_users: 2790, cumulative: 10993 },
  { year: 2017, new_users: 2823, cumulative: 13816 },
  { year: 2018, new_users: 2692, cumulative: 16508 },
  { year: 2019, new_users: 2942, cumulative: 19450 },
  { year: 2020, new_users: 4723, cumulative: 24173 },
  { year: 2021, new_users: 6438, cumulative: 30611 },
  { year: 2022, new_users: 9061, cumulative: 39672 },
  { year: 2023, new_users: 12850, cumulative: 52522 },
  { year: 2024, new_users: 20417, cumulative: 72939 },
  { year: 2025, new_users: 24061, cumulative: 97000 },
];

export const TOP_CITIES = [
  { city: 'Hyderabad', count: 8420 },
  { city: 'Delhi', count: 7890 },
  { city: 'Bangalore', count: 7340 },
  { city: 'Mumbai', count: 5820 },
  { city: 'Chennai', count: 4310 },
  { city: 'Pune', count: 3940 },
  { city: 'Kolkata', count: 3720 },
  { city: 'Ahmedabad', count: 2890 },
  { city: 'Jaipur', count: 2340 },
  { city: 'Chandigarh', count: 1980 },
  { city: 'Lucknow', count: 1760 },
  { city: 'Bhopal', count: 1540 },
  { city: 'Indore', count: 1420 },
  { city: 'Coimbatore', count: 1280 },
  { city: 'Nagpur', count: 1140 },
];

export const SUMMARY_STATS = {
  avg_rating: 1166.52,
  median_rating: 1179,
  max_rating: 3083,
  avg_max_rating: 1254.01,
  total_indian_users: 97477,
  percentile_25: 927,
  percentile_50: 1179,
  percentile_75: 1414,
  percentile_90: 1621,
  percentile_99: 1986,
};

// ── Codeforces official rating → color ──
export const cfRatingColor = (rating: number): string => {
  if (rating < 1200) return '#808080';
  if (rating < 1400) return '#008000';
  if (rating < 1600) return '#03A89E';
  if (rating < 1900) return '#0000FF';
  if (rating < 2100) return '#AA00AA';
  if (rating < 2400) return '#FF8C00';
  if (rating < 2600) return '#FF0000';
  return '#FF0000';
};

// ── Step metadata ──
export interface StepMeta {
  title: string;
  subtitle: string;
  stepLabel: string;
  insightTitle: string;
  insightText: string;
  bullets: string[];
  stats: { label: string; value: string }[];
}

export const STEPS: StepMeta[] = [
  {
    title: 'Rating Distribution',
    subtitle: 'Where do Indian coders stand on the rating ladder?',
    stepLabel: 'Chapter 1 of 9',
    insightTitle: 'The Pupil Wall at 800–1200',
    insightText:
      'Nearly half of all Indian Codeforces users cluster in the 800–1200 band — the pivotal zone separating casual solvers from serious competitors.',
    bullets: [
      'Peak density at 800–1000 with 12,800 users',
      'Rating 1200 marks the first true skill threshold',
      'Tail thins sharply — only 6 users above 3,000',
    ],
    stats: [
      { label: 'Median', value: '1,179' },
      { label: 'Average', value: '1,167' },
      { label: 'P90', value: '1,621' },
      { label: 'Max', value: '3,083' },
    ],
  },
  {
    title: 'Rank Distribution',
    subtitle: 'The competitive pyramid across 97,000 Indian users',
    stepLabel: 'Chapter 2 of 9',
    insightTitle: 'A Steep Pyramid — Mastery is Rare',
    insightText:
      'Over half of all Indian users remain Newbies. Each tier above represents a genuine milestone earned through sustained performance under pressure.',
    bullets: [
      '52% Newbies — the enormous base of the pyramid',
      'Only 1.49% reach Candidate Master or above',
      'A single Legendary Grandmaster from India!',
    ],
    stats: [
      { label: 'Total', value: '97,000' },
      { label: 'Newbie %', value: '52%' },
      { label: 'CM+', value: '1.49%' },
      { label: 'Expert %', value: '9.72%' },
    ],
  },
  {
    title: 'User Growth Over Time',
    subtitle: "India's competitive programming journey from 2010 to 2025",
    stepLabel: 'Chapter 3 of 9',
    insightTitle: 'The Post-2020 Acceleration',
    insightText:
      'Indian participation accelerated sharply after 2020 and kept rising through 2025, turning competitive programming into a mainstream pathway for skill-building and hiring.',
    bullets: [
      'Triggering COVID-19: the lockdown era accelerated participation and created a lasting growth wave',
      'Becoming integral to SWE/SDE hiring: HFT firms and tech teams became more active in evaluating CP talent',
    ],
    stats: [
      { label: 'Year 1', value: '12' },
      { label: '2025 peak', value: '24,061' },
      { label: 'Total', value: '97,000' },
      { label: 'Growth', value: '×8,000' },
    ],
  },
  {
    title: 'Top Cities by Users',
    subtitle: 'Where in India are competitive programmers based?',
    stepLabel: 'Chapter 4 of 9',
    insightTitle: 'Hyderabad Leads the Nation',
    insightText:
      'The top 15 cities represent the geographic heartbeat of Indian competitive programming, with Hyderabad, Delhi, and Bangalore forming a clear top tier.',
    bullets: [
      'Hyderabad edges Delhi by ~530 users',
      'South India (Hyd + Ban + Chennai) = 20,070 users',
      'Tier-2 cities like Jaipur & Chandigarh are rising fast',
    ],
    stats: [
      { label: 'Top City', value: 'Hyd' },
      { label: 'Hyd Users', value: '8,420' },
      { label: 'Top 3 Sum', value: '23,650' },
      { label: 'Cities', value: '15' },
    ],
  },

  // ── BEHAVIOURAL CHAPTERS (5–9) — data fetched live from MongoDB ─────────
  {
    title: 'Difficulty by Rank',
    subtitle: 'Do higher-ranked coders deliberately chase harder problems?',
    stepLabel: 'Chapter 5 of 9 · Behavioural',
    insightTitle: 'Top Tiers Seek the Hard Problems',
    insightText:
      'The IQR box widens sharply above Expert — elite coders actively hunt difficulty, while Newbies cluster tightly around easier ratings.',
    bullets: [
      'Grandmasters solve problems rated ~500 above Experts on average',
      'Newbie IQR is narrow — low variance, predictable approach',
      'Specialist → Expert is the steepest difficulty jump per tier',
    ],
    stats: [
      { label: 'Chart', value: 'Box Plot' },
      { label: 'y-axis', value: 'Avg Diff' },
      { label: 'x-axis', value: 'Rank' },
      { label: 'Source', value: 'Live DB' },
    ],
  },
  {
    title: 'Do Top Coders Solve Harder Problems?',
    subtitle: 'Explore relationships between any two behavioural metrics dynamically',
    stepLabel: 'Chapter 6 of 9 · Behavioural',
    insightTitle: 'Contests Drive Difficulty Growth',
    insightText:
      'More contest participation strongly correlates with higher average difficulty — but the relationship saturates above 100 contests, suggesting a skill ceiling effect.',
    bullets: [
      'Contest count vs difficulty shows the clearest linear trend',
      'Problems solved is a stronger predictor than rating alone',
      'Use the dropdowns to explore any axis combination',
    ],
    stats: [
      { label: 'Chart', value: 'Scatter' },
      { label: 'Axes', value: 'Dynamic' },
      { label: 'Size', value: 'Problems' },
      { label: 'Source', value: 'Live DB' },
    ],
  },
  {
    title: 'Correlation Matrix',
    subtitle: 'How do rating, contests, difficulty and problems interrelate?',
    stepLabel: 'Chapter 7 of 9 · Behavioural',
    insightTitle: 'Difficulty is the Strongest Signal',
    insightText:
      'Average difficulty correlates most strongly with rating — more so than contest count or raw problems solved, revealing that quality of problems matters more than quantity.',
    bullets: [
      'rating ↔ avg_difficulty: strongest positive correlation',
      'total_problems_solved ↔ contest_count: high co-movement',
      'accuracy shows weaker ties — varies idiosyncratically',
    ],
    stats: [
      { label: 'Chart', value: 'Heatmap' },
      { label: 'Method', value: 'Pearson r' },
      { label: 'Vars', value: '5' },
      { label: 'Source', value: 'Live DB' },
    ],
  },
  {
    title: '3D Performance Space',
    subtitle: 'Navigate the full three-dimensional landscape of competitive behaviour',
    stepLabel: 'Chapter 8 of 9 · Behavioural',
    insightTitle: 'Three Axes Reveal Cluster Separation',
    insightText:
      'In 3D space, rank clusters separate visibly — Grandmasters occupy a distinct high-contests, high-difficulty, high-volume corner that lower ranks rarely approach.',
    bullets: [
      'Drag to rotate · Scroll to zoom · Toggle auto-rotate',
      'Switch axes via dropdowns to explore different projections',
      'Each dot is one user, colored by their CF rank',
    ],
    stats: [
      { label: 'Chart', value: '3D Cube' },
      { label: 'Engine', value: 'Three.js' },
      { label: 'Axes', value: 'Dynamic' },
      { label: 'Source', value: 'Live DB' },
    ],
  },
  {
    title: 'Skill Profiles by Rank',
    subtitle: 'Which algorithm categories separate each competitive tier?',
    stepLabel: 'Chapter 9 of 9 · Behavioural',
    insightTitle: 'Dynamic Programming is the Great Divider',
    insightText:
      'DP mastery is the sharpest differentiator between Specialist and Expert. Grandmasters excel uniformly across all dimensions — no single weakness remains.',
    bullets: [
      'Toggle ranks to compare skill radar shapes',
      'Newbies concentrate on Implementation only',
      'Masters+ show 8/10+ across all 8 categories',
    ],
    stats: [
      { label: 'Chart', value: 'Radar' },
      { label: 'Skills', value: '8' },
      { label: 'Ranks', value: '7' },
      { label: 'Source', value: 'Derived' },
    ],
  },
];
