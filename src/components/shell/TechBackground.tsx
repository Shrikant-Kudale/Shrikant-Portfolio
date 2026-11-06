import React from 'react';
import { useDevice } from '../../lib/useDevice';

export function TechBackground() {
  const { isDesktop, prefersReducedMotion } = useDevice();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Subtle radial ambient lift behind the hero */}
      <div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full opacity-25 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)'
        }}
      />

      {/* Subtle blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      {/* Desktop blueprint vector traces */}
      {isDesktop && !prefersReducedMotion && (
        <svg
          className="absolute right-0 top-12 w-[600px] h-[600px] opacity-[0.14] stroke-accent"
          viewBox="0 0 600 600"
          fill="none"
          strokeWidth="1.2"
        >
          {/* Circuit bus traces */}
          <path d="M50 50 H 200 L 250 100 H 450 L 500 150 V 350" />
          <path d="M100 120 H 220 L 260 160 H 420" />
          <path d="M300 200 V 380 L 350 430 H 550" />
          <circle cx="50" cy="50" r="3" fill="var(--accent)" />
          <circle cx="450" cy="100" r="3" fill="var(--accent-2)" />
          <circle cx="550" cy="430" r="3" fill="var(--accent)" />

          {/* HUD framing bracket */}
          <path d="M520 80 H 580 V 140" strokeWidth="1.5" />
          <path d="M580 520 V 580 H 520" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}
