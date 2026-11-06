import React from 'react';
import { usePersona } from '../../lib/persona';

interface ChipProps {
  label: string;
  level?: 'core' | 'familiar';
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({
  label,
  level,
  icon,
  active = false,
  onClick,
  className = ''
}: ChipProps) {
  const { persona } = usePersona();
  const isTech = persona === 'tech';
  const shapeClass = isTech ? 'rounded-md' : 'rounded-full';

  // If interactive filter tab
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-meta tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 border ${shapeClass} ${
          active
            ? 'bg-accent text-white border-accent shadow-sm'
            : 'bg-surface text-muted hover:text-text hover:bg-surface-2 border-border'
        } ${className}`}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
      </button>
    );
  }

  // Skills matrix display chips
  if (level === 'core') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-meta tracking-wider uppercase border border-accent/40 bg-accent/15 text-accent font-medium whitespace-nowrap shrink-0 ${shapeClass} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
      </span>
    );
  }

  if (level === 'familiar') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-meta tracking-wider uppercase border border-border/80 bg-surface/60 text-muted whitespace-nowrap shrink-0 ${shapeClass} ${className}`}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
      </span>
    );
  }

  // Generic tag chip
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-meta tracking-wider text-muted/90 bg-surface/80 border border-border/70 whitespace-nowrap shrink-0 ${shapeClass} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}
