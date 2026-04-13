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
import { SkeletonChart, ErrorState } from './SkeletonChart';
import { BehaviourData } from '../hooks/useBehaviourData';

// Lazy-load the heavy Three.js 3D component only when needed
const Cube3DChart = lazy(() =>
  import('./charts/behavioural/Cube3DChart').then((m) => ({ default: m.Cube3DChart }))
);

interface Props {
  stepIndex:       number;
  chartHeight:     number;
  isMobile:        boolean;
  behaviourData:   BehaviourData | null;
  behaviourStatus: 'idle' | 'loading' | 'success' | 'error';
  behaviourError:  string | null;
}

const IS_BEHAVIOURAL = [4, 5, 6, 7, 8];

export function ChartPanel({
  stepIndex,
  chartHeight,
  isMobile,
  behaviourData,
  behaviourStatus,
  behaviourError,
}: Props) {
  const isBehavioural = IS_BEHAVIOURAL.includes(stepIndex);

  if (isBehavioural && behaviourStatus === 'loading') {
    return (
      <motion.div
        className="glass-card"
        style={{ padding: '20px', flex: '1.4', minWidth: 0 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <SkeletonChart height={chartHeight} />
      </motion.div>
    );
  }

  if (isBehavioural && (behaviourStatus === 'error' || !behaviourData)) {
    return (
      <motion.div
        className="glass-card"
        style={{ padding: '20px', flex: '1.4', minWidth: 0, minHeight: chartHeight }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <ErrorState message={behaviourError ?? 'Check that the API server is running on port 4000'} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="glass-card"
      style={{ padding: '20px', flex: '1.4', minWidth: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {stepIndex === 0 && <RatingChart height={chartHeight} />}
      {stepIndex === 1 && <RankChart height={chartHeight} isMobile={isMobile} />}
      {stepIndex === 2 && <GrowthChart height={chartHeight} isMobile={isMobile} />}
      {stepIndex === 3 && <CitiesChart height={chartHeight} isMobile={isMobile} />}

      {stepIndex === 4 && behaviourData && (
        <BoxPlotChart records={behaviourData.records} height={chartHeight} />
      )}
      {stepIndex === 5 && behaviourData && (
        <BehaviourScatterChart
          records={behaviourData.records}
          height={chartHeight}
          isMobile={isMobile}
        />
      )}
      {stepIndex === 6 && behaviourData && (
        <HeatmapChart records={behaviourData.records} height={chartHeight} />
      )}
      {stepIndex === 7 && behaviourData && (
        <Suspense fallback={<SkeletonChart height={chartHeight} />}>
          <Cube3DChart records={behaviourData.records} height={chartHeight} />
        </Suspense>
      )}
      {stepIndex === 8 && (
        <BehaviourRadarChart height={chartHeight} />
      )}
    </motion.div>
  );
}
