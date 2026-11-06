import React from 'react';
import { SparklesIcon } from '../icons';
import { soundEngine } from '../../lib/audio';

interface AssistantLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AssistantLauncher({ isOpen, onToggle }: AssistantLauncherProps) {
  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={() => {
        soundEngine.playTick();
        onToggle();
      }}
      aria-label="Open AI Assistant"
      title="Ask AI about Shrikant's projects & research"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-surface hover:bg-surface-2 border border-border hover:border-accent text-text rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
    >
      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
        <SparklesIcon size={14} className="text-thread" />
      </div>
      <span className="font-meta text-xs tracking-wider uppercase font-semibold">
        Ask AI
      </span>
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    </button>
  );
}
