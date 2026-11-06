import React from 'react';
import { getPsychologyWritings } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { TurnThePage } from '../../components/shell/TurnThePage';

interface PsychWritingsProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function PsychWritings({ onNavigateCounterpart }: PsychWritingsProps) {
  const writings = getPsychologyWritings();

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Writings & Cognitive Essays"
        description="Essays on digital amnesia, cognitive offloading, transactive memory, and the philosophy of mind."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            MEMORY / 07 / WRITINGS
          </span>
        </div>

        <div className="mb-14">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-3">
            Essays & Cognitive Reflections
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl font-body">
            Reflective writings on digital amnesia, human memory architecture, and human-in-the-loop systems.
          </p>
        </div>

        {/* 1. PUBLISHED ESSAYS */}
        <section className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Reflections
            </span>
            <h2 className="text-2xl font-display font-bold text-text">
              Current Manuscript Drafts
            </h2>
          </div>

          <div className="space-y-6">
            {writings.posts.map((post) => (
              <div
                key={post.id}
                className="p-8 sm:p-10 bg-surface border border-border hover:border-accent/60 rounded-3xl transition-all duration-300"
              >
                <div className="flex items-center justify-between text-xs font-meta text-muted mb-3">
                  <span className="text-accent font-semibold uppercase tracking-wider">
                    {post.category} · {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-text mb-4">
                  {post.title}
                </h3>

                <p className="text-base text-text/80 leading-relaxed font-body mb-6">
                  {post.summary}
                </p>

                <div className="p-6 bg-surface-2/60 border border-border/80 rounded-2xl text-sm text-text/85 font-body leading-relaxed whitespace-pre-line mb-6 italic">
                  {post.content.slice(0, 360)}...
                </div>

                <span className="text-xs font-meta text-accent uppercase font-semibold">
                  Manuscript archived in research portfolio
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. UPCOMING PREVIEWS */}
        <section className="mb-24 p-8 sm:p-12 bg-surface/50 border border-border rounded-3xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-meta uppercase tracking-widest text-accent font-bold block mb-1">
              Reflective Pipeline
            </span>
            <h3 className="text-2xl font-display font-bold text-text mb-2">
              Upcoming Inquiries
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {writings.emptyStateMessage}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {writings.upcomingPreviews.map((prev) => (
              <div
                key={prev.id}
                className="p-6 bg-surface border border-border/80 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-meta text-muted mb-2">
                    <span className="text-accent font-semibold">{prev.topic}</span>
                    <span>{prev.estimatedDate}</span>
                  </div>
                  <h4 className="text-base font-display font-bold text-text mb-2">
                    {prev.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed font-body">
                    {prev.summary}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-border/60 text-[11px] font-meta text-muted/70">
                  Status: In synthesis
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Turn the Page bridge block */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
