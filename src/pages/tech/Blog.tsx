import React from 'react';
import { Link } from 'react-router-dom';
import { getTechBlog } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { TurnThePage } from '../../components/shell/TurnThePage';
import { ArrowRightIcon } from '../../components/icons';

interface TechBlogProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function TechBlog({ onNavigateCounterpart }: TechBlogProps) {
  const blog = getTechBlog();

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Technical Notes & Architecture Logs"
        description="Engineering notes on edge computer vision, quantised neural networks, and multimodal biomarker signal processing."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            SIGNAL / 07 / NOTES
          </span>
        </div>

        <div className="mb-14">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-3">
            Technical Notes & Architecture Logs
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl font-body">
            Field dispatches, memory benchmarks, and practical optimization guides from edge vision and neural signal processing.
          </p>
        </div>

        {/* 1. PUBLISHED POSTS */}
        <section className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Published Logs
            </span>
            <h2 className="text-2xl font-display font-bold text-text">
              Recent Engineering Dispatches
            </h2>
          </div>

          <div className="space-y-6">
            {blog.posts.map((post) => (
              <div
                key={post.id}
                className="p-8 bg-surface border border-border hover:border-accent/60 rounded-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-meta text-accent font-semibold uppercase tracking-wider">
                    {post.category} · {post.readTime}
                  </span>
                  <span className="text-xs font-meta text-muted">{post.date}</span>
                </div>

                <h3 className="text-2xl font-display font-bold text-text mb-3">
                  {post.title}
                </h3>

                <p className="text-sm sm:text-base text-text/80 leading-relaxed font-body mb-6">
                  {post.summary}
                </p>

                {/* Inline markdown excerpt */}
                <div className="p-6 bg-surface-2/60 border border-border/80 rounded-xl text-xs sm:text-sm text-muted leading-relaxed font-mono whitespace-pre-line mb-6">
                  {post.content.slice(0, 360)}...
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-meta uppercase text-accent font-semibold">
                    <span>Full Log Verified</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. HONEST EMPTY STATE & UPCOMING PREVIEWS (Section 8.6) */}
        <section className="mb-24 p-8 sm:p-12 bg-surface/50 border border-border rounded-2xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-meta uppercase tracking-widest text-thread font-bold block mb-1">
              Editorial Pipeline
            </span>
            <h3 className="text-2xl font-display font-bold text-text mb-2">
              Upcoming In-Depth Monographs
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {blog.emptyStateMessage}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blog.upcomingPreviews.map((prev) => (
              <div
                key={prev.id}
                className="p-6 bg-surface border border-border/80 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-meta uppercase text-accent font-semibold">
                      {prev.topic}
                    </span>
                    <span className="text-xs font-meta text-muted">{prev.estimatedDate}</span>
                  </div>
                  <h4 className="text-base font-display font-bold text-text mb-2">
                    {prev.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {prev.summary}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-border/60 text-[11px] font-meta text-muted/70">
                  Status: Drafting in laboratory
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
