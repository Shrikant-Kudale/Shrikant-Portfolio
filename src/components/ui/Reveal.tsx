import React, { useEffect, useRef, useState } from 'react';
import { useDevice } from '../../lib/useDevice';

interface RevealProps {
  children: React.ReactNode;
  delay?: number; // ms
  className?: string;
  direction?: 'up' | 'none';
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up'
}: RevealProps) {
  const { prefersReducedMotion } = useDevice();
  const [hasRevealed, setHasRevealed] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasRevealed(true);
      return;
    }

    if (!domRef.current || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const transformStyle = direction === 'up'
    ? hasRevealed ? 'translateY(0)' : 'translateY(16px)'
    : 'none';

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[450ms] ${className}`}
      style={{
        opacity: hasRevealed ? 1 : 0,
        transform: transformStyle,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      {children}
    </div>
  );
}
