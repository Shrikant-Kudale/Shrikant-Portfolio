import React from 'react';
import { usePersona } from '../../lib/persona';
import { SunIcon, MoonIcon } from '../icons';
import { soundEngine } from '../../lib/audio';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = usePersona();

  const handleToggle = () => {
    soundEngine.playTick();
    toggleTheme();
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={`p-2 rounded-lg text-muted hover:text-text bg-surface/80 hover:bg-surface-2 border border-border/80 transition-all duration-200 cursor-pointer shadow-2xs ${className}`}
    >
      {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}
