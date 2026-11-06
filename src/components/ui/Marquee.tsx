import React from 'react';
import { useDevice } from '../../lib/useDevice';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number; // seconds per loop
  className?: string;
}

export function Marquee({
  items,
  direction = 'left',
  speed = 28,
  className = ''
}: MarqueeProps) {
  const { prefersReducedMotion } = useDevice();

  // Double the items for seamless looping
  const displayItems = [...items, ...items];

  if (prefersReducedMotion) {
    return (
      <div className={`overflow-x-auto py-2 flex items-center gap-3 no-scrollbar ${className}`}>
        {items.map((item, idx) => (
          <span
            key={idx}
            className="px-3.5 py-1.5 text-xs font-meta uppercase tracking-wider bg-surface border border-border text-muted whitespace-nowrap shrink-0 rounded-md"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div className={`relative w-full overflow-hidden group select-none py-1 ${className}`}>
      {/* Edge gradient masks for clean fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-canvas to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-canvas to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center gap-3 w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        {displayItems.map((item, index) => (
          <span
            key={index}
            className="px-3.5 py-1.5 text-xs font-meta uppercase tracking-wider bg-surface/80 border border-border/70 text-text/90 hover:border-accent hover:text-accent transition-colors duration-200 whitespace-nowrap shrink-0 rounded-md shadow-2xs"
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}
