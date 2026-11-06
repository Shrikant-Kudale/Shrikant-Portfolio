import React from 'react';
import { useDevice } from '../../lib/useDevice';

export function PsychologyBackground() {
  const { isDesktop, prefersReducedMotion } = useDevice();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Drifting organic warm gradient blobs */}
      <div
        className={`absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.16] blur-[100px] ${
          !prefersReducedMotion && isDesktop ? 'animate-pulse' : ''
        }`}
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          animationDuration: '12s'
        }}
      />

      <div
        className={`absolute top-1/3 -right-24 w-[650px] h-[650px] rounded-full opacity-[0.14] blur-[110px] ${
          !prefersReducedMotion && isDesktop ? 'animate-pulse' : ''
        }`}
        style={{
          background: 'radial-gradient(circle, var(--accent-2) 0%, transparent 70%)',
          animationDuration: '15s',
          animationDelay: '3s'
        }}
      />

      <div
        className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full opacity-[0.12] blur-[120px]"
        style={{
          background: 'radial-gradient(circle, var(--accent-4) 0%, transparent 70%)'
        }}
      />

      {/* Subtle organic contour lines for psychology */}
      {isDesktop && !prefersReducedMotion && (
        <svg
          className="absolute left-8 top-1/4 w-[450px] h-[450px] opacity-[0.08] stroke-accent"
          viewBox="0 0 450 450"
          fill="none"
          strokeWidth="1.2"
        >
          <path d="M 50,225 C 50,100 200,50 300,150 C 400,250 350,380 200,380 C 80,380 50,300 50,225 Z" />
          <path d="M 100,225 C 100,140 180,90 260,160 C 340,230 300,320 200,320 C 120,320 100,280 100,225 Z" />
        </svg>
      )}
    </div>
  );
}
