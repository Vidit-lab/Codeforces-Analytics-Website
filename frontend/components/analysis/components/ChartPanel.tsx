import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { RatingChart } from './charts/RatingChart';
import { RankChart } from './charts/RankChart';
import { GrowthChart } from './charts/GrowthChart';
import { CitiesChart } from './charts/CitiesChart';
import { BoxPlotChart } from './charts/behavioural/BoxPlotChart';
import { BehaviourScatterChart } from './charts/behavioural/ScatterChart';
import { HeatmapChart } from './charts/behavioural/HeatmapChart';
import { BehaviourRadarChart } from './charts/behavioural/RadarChart';
import { SkeletonChart } from './SkeletonChart';
import { BEHAVIOUR_RECORDS as records } from '../data/behaviours';

// Lazy-load the heavy Three.js 3D component only when needed
const Cube3DChart = lazy(() =>
  import('./charts/behavioural/Cube3DChart').then((m) => ({ default: m.Cube3DChart }))
);

interface Props {
  stepIndex:   number;
  chartHeight: number;
  isMobile:    boolean;
}

export function ChartPanel({ stepIndex, chartHeight, isMobile }: Props) {
  return (
    <motion.div
      className="glass-card"
      style={{ padding: isMobile ? '14px' : '20px', flex: '1.4', minWidth: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {stepIndex === 0 && <RatingChart height={chartHeight} isMobile={isMobile} />}
      {stepIndex === 1 && <RankChart height={chartHeight} isMobile={isMobile} />}
      {stepIndex === 2 && <GrowthChart height={chartHeight} isMobile={isMobile} />}
      {stepIndex === 3 && <CitiesChart height={chartHeight} isMobile={isMobile} />}

      {stepIndex === 4 && (
        <BoxPlotChart height={chartHeight} isMobile={isMobile} />
      )}
      {stepIndex === 5 && (
        <BehaviourScatterChart
          records={records}
          height={chartHeight}
          isMobile={isMobile}
        />
      )}
      {stepIndex === 6 && (
        <HeatmapChart records={records} />
      )}
      {stepIndex === 7 && (
        <Suspense fallback={<SkeletonChart height={chartHeight} />}>
          <Cube3DChart records={records} height={chartHeight} />
        </Suspense>
      )}
      {stepIndex === 8 && (
        <BehaviourRadarChart height={chartHeight} isMobile={isMobile} />
      )}
    </motion.div>
  );
}
