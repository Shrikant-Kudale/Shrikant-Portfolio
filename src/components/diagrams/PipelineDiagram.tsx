import React from 'react';
import { PipelineNode, PipelineEdge } from '../../lib/content';

interface PipelineDiagramProps {
  nodes: PipelineNode[];
  edges: PipelineEdge[];
  className?: string;
}

export function PipelineDiagram({ nodes, edges, className = '' }: PipelineDiagramProps) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className={`w-full overflow-x-auto py-6 px-4 bg-surface-2/40 border border-border/80 rounded-xl ${className}`}>
      <div className="flex items-center justify-between min-w-[680px] gap-4 relative">
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1;
          return (
            <React.Fragment key={node.id}>
              {/* Pipeline Node */}
              <div className="flex-1 min-w-[120px] max-w-[170px] p-3.5 bg-surface border border-border rounded-lg shadow-2xs hover:border-accent transition-all duration-200 text-center relative group">
                <span className="text-[10px] font-meta text-accent font-semibold block mb-0.5">
                  Step 0{index + 1}
                </span>
                <h4 className="text-xs sm:text-sm font-bold font-display text-text leading-tight mb-1">
                  {node.label}
                </h4>
                <p className="text-[11px] font-meta text-muted">
                  {node.sub}
                </p>
              </div>

              {/* Animated connector arrow */}
              {!isLast && (
                <div className="flex items-center justify-center shrink-0 w-8 sm:w-12 relative">
                  <svg width="40" height="16" viewBox="0 0 40 16" fill="none" className="overflow-visible">
                    <line
                      x1="0"
                      y1="8"
                      x2="32"
                      y2="8"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      className="animate-[dash_1s_linear_infinite]"
                    />
                    <polygon
                      points="32,4 40,8 32,12"
                      fill="var(--accent)"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -7;
          }
        }
      `}</style>
    </div>
  );
}
