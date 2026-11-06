import React from 'react';
import { NavLink } from 'react-router-dom';
import { usePersona } from '../../lib/persona';
import { getSiteConfig } from '../../lib/content';
import { PersonaToggle } from './PersonaToggle';
import { ThemeToggle } from './ThemeToggle';
import { SoundToggle } from './SoundToggle';
import { CloseIcon, SparklesIcon } from '../icons';
import { soundEngine } from '../../lib/audio';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAssistant: () => void;
  onTogglePersona: (target: 'tech' | 'psychology') => void;
}

export function Drawer({
  isOpen,
  onClose,
  onOpenAssistant,
  onTogglePersona
}: DrawerProps) {
  const { persona } = usePersona();
  const site = getSiteConfig();
  const navItems = site.nav[persona] || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-canvas/98 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Drawer Top Bar */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <PersonaToggle onToggleRequest={(p) => {
          onTogglePersona(p);
          onClose();
        }} />
        <button
          onClick={() => {
            soundEngine.playTick();
            onClose();
          }}
          aria-label="Close menu"
          className="p-2 text-muted hover:text-text rounded-lg bg-surface border border-border"
        >
          <CloseIcon size={20} />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col justify-center gap-5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              soundEngine.playTick();
              onClose();
            }}
            className={({ isActive }) =>
              `text-2xl sm:text-3xl font-display font-medium transition-colors ${
                isActive ? 'text-accent' : 'text-text/75 hover:text-text'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

        <div className="pt-6 border-t border-border mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SoundToggle />
          </div>

          <button
            onClick={() => {
              soundEngine.playTick();
              onClose();
              onOpenAssistant();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white font-meta text-xs uppercase tracking-wider font-semibold"
          >
            <SparklesIcon size={16} />
            <span>Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
}
