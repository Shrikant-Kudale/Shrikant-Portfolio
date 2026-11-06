import React, { useState } from 'react';
import { soundEngine } from '../../lib/audio';

export interface TimelineEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  current?: boolean;
  location?: string;
  summary: string;
  bullets?: string[];
  skills?: string[];
}

interface TimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

export function Timeline({ entries, className = '' }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(entries[0]?.id || null);

  const toggleExpand = (id: string) => {
    soundEngine.playTick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={`relative pl-6 sm:pl-8 border-l border-border/80 space-y-8 ${className}`}>
      {entries.map((item) => {
        const isExpanded = expandedId === item.id;
        return (
          <div key={item.id} className="relative group">
            {/* Timeline node marker */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-colors duration-200 ${
                item.current
                  ? 'bg-accent border-accent shadow-[0_0_10px_rgba(91,155,255,0.6)]'
                  : 'bg-surface border-border group-hover:border-accent'
              }`}
            />

            {/* Entry Box */}
            <div className="bg-surface/60 border border-border/80 hover:border-accent/40 rounded-xl p-5 sm:p-6 transition-all duration-200">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-bold font-display text-text">
                      {item.role}
                    </h3>
                    {item.current && (
                      <span className="text-[11px] font-meta uppercase px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 font-semibold">
                        Present
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-accent mt-0.5">
                    {item.organization}
                    {item.location && <span className="text-muted font-normal"> · {item.location}</span>}
                  </p>
                </div>
                <span className="text-xs font-meta text-muted shrink-0 tabular-nums">
                  {item.period}
                </span>
              </div>

              <p className="text-sm text-text/80 mb-3 leading-relaxed">
                {item.summary}
              </p>

              {/* Collapsible Details */}
              {item.bullets && item.bullets.length > 0 && (
                <div>
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="text-xs font-meta text-accent hover:underline inline-flex items-center gap-1 cursor-pointer mb-3"
                  >
                    <span>{isExpanded ? 'Hide responsibilities' : 'View responsibilities & deliverables'}</span>
                    <span className="text-xs">{isExpanded ? '↑' : '↓'}</span>
                  </button>

                  {isExpanded && (
                    <ul className="space-y-2 mb-4 border-t border-border/60 pt-3">
                      {item.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-xs sm:text-sm text-muted leading-relaxed flex items-start gap-2">
                          <span className="text-accent shrink-0 mt-1">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Skill chips */}
              {item.skills && item.skills.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-border/40">
                  {item.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-meta px-2 py-0.5 rounded bg-surface-2 text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
