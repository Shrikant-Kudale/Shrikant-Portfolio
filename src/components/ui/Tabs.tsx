import React from 'react';
import { soundEngine } from '../../lib/audio';

interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeId, onChange, className = '' }: TabsProps) {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center gap-1.5 p-1 bg-surface border border-border rounded-lg max-w-full overflow-x-auto no-scrollbar ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              soundEngine.playTick();
              onChange(tab.id);
            }}
            className={`px-3.5 py-1.5 text-xs font-meta font-medium tracking-wide rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
              isActive
                ? 'bg-accent text-white shadow-xs'
                : 'text-muted hover:text-text hover:bg-surface-2/60'
            }`}
          >
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                  isActive ? 'bg-white/20 text-white' : 'bg-surface-2 text-muted'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
