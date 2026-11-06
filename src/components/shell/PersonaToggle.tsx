import React from 'react';
import { usePersona } from '../../lib/persona';
import { soundEngine } from '../../lib/audio';

interface PersonaToggleProps {
  onToggleRequest?: (targetPersona: 'tech' | 'psychology') => void;
  className?: string;
}

export function PersonaToggle({ onToggleRequest, className = '' }: PersonaToggleProps) {
  const { persona, setPersona } = usePersona();

  const handleSelect = (target: 'tech' | 'psychology') => {
    if (target === persona) return;
    soundEngine.playTick();
    if (onToggleRequest) {
      onToggleRequest(target);
    } else {
      setPersona(target);
    }
  };

  const isTech = persona === 'tech';

  return (
    <div
      role="radiogroup"
      aria-label="Persona Selector"
      className={`relative inline-flex items-center p-1 bg-surface border border-border rounded-full select-none shadow-inner ${className}`}
    >
      {/* Sliding Background Indicator */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out shadow-sm ${
          isTech
            ? 'left-1 bg-accent/20 border border-accent/40'
            : 'left-[calc(50%+2px)] bg-accent/25 border border-accent/40'
        }`}
      />

      {/* Tech Option */}
      <button
        type="button"
        role="radio"
        aria-checked={isTech}
        onClick={() => handleSelect('tech')}
        className={`relative z-10 px-3.5 py-1.5 text-xs font-meta tracking-wide transition-colors duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
          isTech ? 'text-accent font-semibold' : 'text-muted hover:text-text'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent/80" />
        <span>AI & Tech</span>
      </button>

      {/* Psychology Option */}
      <button
        type="button"
        role="radio"
        aria-checked={!isTech}
        onClick={() => handleSelect('psychology')}
        className={`relative z-10 px-3.5 py-1.5 text-xs font-meta tracking-wide transition-colors duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
          !isTech ? 'text-accent font-semibold' : 'text-muted hover:text-text'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent/80" />
        <span>Psychology</span>
      </button>
    </div>
  );
}
