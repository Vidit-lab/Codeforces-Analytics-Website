import { TooltipProps } from 'recharts';

interface CustomTooltipProps extends TooltipProps<number, string> {
  formatter?: (value: number, name: string) => string;
}

export function CustomTooltip({ active, payload, label, formatter }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="custom-tooltip">
      <p className="tt-label">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="tt-value" style={{ color: entry.color ?? '#e2d9ff' }}>
          {formatter
            ? formatter(entry.value as number, entry.name as string)
            : (entry.value as number).toLocaleString()}
        </p>
      ))}
    </div>
  );
}
