import { Loader2 } from 'lucide-react';

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  isRefreshing: boolean;
  threshold: number;
}

export default function PullToRefreshIndicator({
  pullDistance,
  isRefreshing,
  threshold,
}: PullToRefreshIndicatorProps) {
  const progress = Math.min((pullDistance / threshold) * 100, 100);
  const opacity = Math.min(pullDistance / threshold, 1);

  return (
    <div
      className="absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200"
      style={{
        transform: `translateY(${pullDistance}px)`,
        opacity: opacity,
        height: '60px',
      }}
    >
      <div className="flex flex-col items-center gap-1">
        {isRefreshing ? (
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        ) : (
          <div className="relative w-6 h-6">
            <svg className="w-6 h-6 transform -rotate-90">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 10}`}
                strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
                className="transition-all duration-100"
              />
            </svg>
          </div>
        )}
        <span className="text-xs text-white/60">
          {isRefreshing ? 'Refreshing...' : pullDistance >= threshold ? 'Release to refresh' : 'Pull to refresh'}
        </span>
      </div>
    </div>
  );
}
