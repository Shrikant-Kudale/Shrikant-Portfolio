import React, { useState, useEffect, useRef } from 'react';
import { usePersona } from '../../lib/persona';
import { getPlaceholderSvg } from '../../lib/image';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  fallbackLabel?: string;
}

export function LazyImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = '4/3',
  fallbackLabel = 'Image coming soon',
  ...props
}: LazyImageProps) {
  const { persona } = usePersona();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const placeholderSvg = getPlaceholderSvg(fallbackLabel, persona);
  const effectiveSrc = !src || hasError ? placeholderSvg : src;

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-surface border border-border/60 ${containerClassName}`}
      style={{ aspectRatio }}
    >
      {/* Visual background placeholder while loading */}
      <div
        className={`absolute inset-0 bg-surface flex items-center justify-center transition-opacity duration-500 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="text-xs font-meta tracking-wider uppercase text-muted/60">
          4:3 · {fallbackLabel}
        </span>
      </div>

      {isVisible && (
        <img
          src={effectiveSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
}
