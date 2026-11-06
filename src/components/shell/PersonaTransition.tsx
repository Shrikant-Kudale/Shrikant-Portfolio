import React, { useEffect, useState, useRef } from 'react';
import { useDevice } from '../../lib/useDevice';

export type TransitionDirection = 'to-psychology' | 'to-tech' | null;

interface PersonaTransitionProps {
  direction: TransitionDirection;
  onMidpoint: () => void;
  onComplete: () => void;
}

export function PersonaTransition({
  direction,
  onMidpoint,
  onComplete
}: PersonaTransitionProps) {
  const { prefersReducedMotion } = useDevice();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const midpointCalledRef = useRef(false);

  useEffect(() => {
    if (!direction) {
      setActive(false);
      setProgress(0);
      midpointCalledRef.current = false;
      return;
    }

    if (prefersReducedMotion) {
      onMidpoint();
      onComplete();
      return;
    }

    setActive(true);
    setProgress(0.1);
    midpointCalledRef.current = false;

    // Phase 1: Rapid thread sweep and gentle curtain in (0 -> 140ms)
    const sweepTimer = setTimeout(() => {
      setProgress(0.5);
      if (!midpointCalledRef.current) {
        midpointCalledRef.current = true;
        onMidpoint();
      }
    }, 140);

    // Phase 2: Fade out & clear (140ms -> 300ms)
    const fadeTimer = setTimeout(() => {
      setProgress(1);
    }, 240);

    // Phase 3: Complete & cleanup completely
    const completeTimer = setTimeout(() => {
      setActive(false);
      setProgress(0);
      onComplete();
    }, 320);

    // Safety watchdog: guarantees unblocking after 350ms even if something hangs
    const safetyWatchdog = setTimeout(() => {
      if (!midpointCalledRef.current) {
        onMidpoint();
      }
      onComplete();
      setActive(false);
    }, 350);

    return () => {
      clearTimeout(sweepTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      clearTimeout(safetyWatchdog);
    };
  }, [direction, prefersReducedMotion, onMidpoint, onComplete]);

  if (!direction || !active) {
    return null;
  }

  const isPsych = direction === 'to-psychology';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden"
    >
      {/* 1. Subtle Editorial Shutter Overlay (NO bubble, NO trapped ball) */}
      <div
        className={`absolute inset-0 transition-opacity duration-200 pointer-events-none ${
          progress >= 0.5 ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: isPsych
            ? 'linear-gradient(135deg, rgba(250, 244, 236, 0.85) 0%, rgba(242, 232, 219, 0.92) 100%)'
            : 'linear-gradient(135deg, rgba(6, 9, 17, 0.88) 0%, rgba(12, 19, 34, 0.94) 100%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* 2. The Golden Thread Laser Beam (Fast, elegant horizontal sweep) */}
      <div
        className="absolute left-0 right-0 h-[2.5px] pointer-events-none transition-transform duration-300 ease-out"
        style={{
          top: '50%',
          transform: `translateY(-50%) scaleX(${progress > 0 ? 1 : 0})`,
          transformOrigin: isPsych ? 'left center' : 'right center',
          background: 'linear-gradient(90deg, transparent 0%, #F59E0B 20%, #FBBF24 50%, #F59E0B 80%, transparent 100%)',
          boxShadow: '0 0 12px rgba(245, 158, 11, 0.75)',
        }}
      />

      {/* 3. Minimalist Center Persona Badge with immediate dismiss */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-xl transition-all duration-200 pointer-events-none ${
          progress >= 0.8 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{
          background: isPsych ? '#FAF4EC' : '#0C1322',
          borderColor: isPsych ? '#E2D3BF' : '#1E2E4E',
          color: isPsych ? '#2B3440' : '#F1F5F9',
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-ping"
          style={{ background: isPsych ? '#C86D51' : '#38BDF8' }}
        />
        <span className="text-xs font-mono tracking-wider uppercase font-semibold">
          {isPsych ? 'Cognitive Science Archive' : 'AI & Systems Engine'}
        </span>
      </div>
    </div>
  );
}
