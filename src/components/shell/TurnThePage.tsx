import React from 'react';
import { useLocation } from 'react-router-dom';
import { usePersona } from '../../lib/persona';
import { getBridgeSentence, getPairedPath } from '../../lib/content';
import { ArrowRightIcon } from '../icons';
import { soundEngine } from '../../lib/audio';

interface TurnThePageProps {
  onNavigateCounterpart: (targetPath: string) => void;
  className?: string;
}

export function TurnThePage({ onNavigateCounterpart, className = '' }: TurnThePageProps) {
  const location = useLocation();
  const { persona } = usePersona();
  const bridge = getBridgeSentence(location.pathname);
  const targetPath = getPairedPath(location.pathname);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    soundEngine.playTick();
    onNavigateCounterpart(targetPath);
  };

  const isTech = persona === 'tech';

  return (
    <section className={`relative w-full py-16 sm:py-24 my-8 overflow-hidden ${className}`}>
      {/* The Thread hairline joining both worlds */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-thread opacity-80" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 sm:p-12 bg-surface/50 border border-border/80 rounded-2xl relative">
          <div className="max-w-2xl">
            <span className="text-xs font-meta tracking-widest uppercase text-thread font-semibold mb-3 block">
              Turn the page · {isTech ? 'Cognitive Counterpart' : 'Engineering Counterpart'}
            </span>
            <p className="text-lg sm:text-2xl font-display font-medium text-text leading-snug text-balance">
              "{bridge.sentence}"
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={handleClick}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-surface text-text hover:text-accent border border-border hover:border-accent font-meta text-sm font-semibold tracking-wide rounded-xl shadow-sm transition-all duration-300 hover:translate-x-1 cursor-pointer group"
            >
              <span>Explore {bridge.targetLabel}</span>
              <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
