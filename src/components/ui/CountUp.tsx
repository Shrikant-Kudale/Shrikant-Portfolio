import React, { useEffect, useRef, useState } from 'react';
import { useDevice } from '../../lib/useDevice';

interface CountUpProps {
  value: string; // e.g. "87.4%", "8.25", "2", "1"
  duration?: number; // ms
  className?: string;
}

export function CountUp({ value, duration = 1200, className = '' }: CountUpProps) {
  const { prefersReducedMotion } = useDevice();
  const [displayValue, setDisplayValue] = useState('0');
  const [hasStarted, setHasStarted] = useState(false);
  const domRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    if (!domRef.current || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion, value]);

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) {
      if (prefersReducedMotion) setDisplayValue(value);
      return;
    }

    // Extract numeric portion and suffix (e.g. "87.4%" -> num: 87.4, suffix: "%")
    const match = value.match(/^([0-9.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2] || '';
    const isFloat = match[1].includes('.');
    const decimalPlaces = isFloat ? match[1].split('.')[1].length : 0;

    let startTime: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * eased;

      setDisplayValue(`${current.toFixed(decimalPlaces)}${suffix}`);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [hasStarted, value, duration, prefersReducedMotion]);

  return (
    <span ref={domRef} className={`tabular-nums ${className}`}>
      {displayValue}
    </span>
  );
}
