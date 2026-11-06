import React, { useEffect, useState } from 'react';
import { usePersona } from '../../lib/persona';
import { useDevice } from '../../lib/useDevice';

export function Cursor() {
  const { persona } = usePersona();
  const { isDesktop, prefersReducedMotion, isTouch } = useDevice();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion || isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, [role="button"], [role="tab"], [role="radio"]');
        setIsHovered(!!interactive);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop, prefersReducedMotion, isTouch]);

  if (!isDesktop || prefersReducedMotion || isTouch) {
    return null;
  }

  const isTech = persona === 'tech';

  if (isTech) {
    // Tech: Crosshair ring
    return (
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        <div
          className={`rounded-full border border-accent/70 transition-all duration-200 ${
            isHovered
              ? 'w-10 h-10 border-accent bg-accent/10 scale-110'
              : 'w-6 h-6 border-accent/60'
          }`}
        />
        {/* Tiny center crosshair dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent" />
      </div>
    );
  }

  // Psychology: Soft translucent drifting orb
  return (
    <div
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    >
      <div
        className={`rounded-full transition-all duration-300 ${
          isHovered
            ? 'w-12 h-12 bg-accent/25 blur-xs scale-125'
            : 'w-7 h-7 bg-accent/20 blur-[1px]'
        }`}
      />
    </div>
  );
}
