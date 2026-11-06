import React from 'react';
import { usePersona } from '../../lib/persona';
import { SoundOnIcon, SoundOffIcon } from '../icons';
import { soundEngine } from '../../lib/audio';

interface SoundToggleProps {
  className?: string;
}

export function SoundToggle({ className = '' }: SoundToggleProps) {
  const { soundEnabled, toggleSound, persona } = usePersona();

  const handleToggle = () => {
    const nextState = !soundEnabled;
    toggleSound();
    if (nextState) {
      soundEngine.start(persona);
    } else {
      soundEngine.stop();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
      title={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
      className={`p-2 rounded-lg text-muted hover:text-text bg-surface/80 hover:bg-surface-2 border border-border/80 transition-all duration-200 cursor-pointer shadow-2xs ${
        soundEnabled ? 'text-accent border-accent/40' : ''
      } ${className}`}
    >
      {soundEnabled ? <SoundOnIcon size={18} /> : <SoundOffIcon size={18} />}
    </button>
  );
}
