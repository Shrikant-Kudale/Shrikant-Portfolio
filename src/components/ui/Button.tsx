import React, { useRef } from 'react';
import { usePersona } from '../../lib/persona';
import { soundEngine } from '../../lib/audio';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'thread';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const { persona } = usePersona();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundEngine.playTick();
    if (onClick) onClick(e);
  };

  const isTech = persona === 'tech';

  // Shape per persona
  const shapeClass = isTech ? 'clip-chamfer' : 'rounded-full';

  // Size sizing
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3.5 gap-1.5',
    md: 'text-sm py-2.5 px-5 gap-2',
    lg: 'text-base py-3 px-6 gap-2.5'
  }[size];

  // Variant styling
  const variantClasses = {
    primary: isTech
      ? 'bg-accent text-white hover:bg-accent/90 shadow-sm border border-accent/40'
      : 'bg-accent text-white hover:bg-accent/90 shadow-sm border border-accent/30',
    secondary: 'bg-surface text-text hover:bg-surface-2 border border-border',
    outline: 'bg-transparent text-text hover:bg-surface/60 border border-border',
    ghost: 'bg-transparent text-muted hover:text-text hover:bg-surface/40',
    thread: 'bg-thread text-slate-900 font-semibold hover:bg-thread/90 shadow-sm border border-thread/40'
  }[variant];

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-meta font-medium tracking-wide transition-all duration-200 cursor-pointer select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-thread/80 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap shrink-0 ${shapeClass} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
