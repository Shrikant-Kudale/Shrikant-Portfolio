import React, { useState } from 'react';
import { getTechCoding } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { TurnThePage } from '../../components/shell/TurnThePage';
import { GithubIcon, LeetcodeIcon, ExternalLinkIcon } from '../../components/icons';

interface TechCodingProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function TechCoding({ onNavigateCounterpart }: TechCodingProps) {
  const coding = getTechCoding();
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number } | null>(null);

  // Generate 53 weeks x 7 days grid for GitHub heatmap
  const weeks = 53;
  const daysPerWeek = 7;
  const gridCells = Array.from({ length: weeks * daysPerWeek }).map((_, i) => {
    // Deterministic distribution simulating commit patterns
    const seed = (i * 17 + (i % 7) * 23) % 100;
    let count = 0;
    let tier = 0;
    if (seed > 30 && seed <= 65) { count = 1; tier = 1; }
    else if (seed > 65 && seed <= 85) { count = 3; tier = 2; }
    else if (seed > 85 && seed <= 95) { count = 5; tier = 3; }
    else if (seed > 95) { count = 8; tier = 4; }

    return { id: i, count, tier };
  });

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return 'rgba(91, 155, 255, 0.25)';
      case 2: return 'rgba(91, 155, 255, 0.50)';
      case 3: return 'rgba(91, 155, 255, 0.75)';
      case 4: return 'var(--accent)';
      default: return 'var(--surface-2)';
    }
  };

  const { leetcode, github } = coding;

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Competitive Programming & Contributions"
        description="GitHub contributions matrix, LeetCode algorithmic problem breakdowns, and topic mastery distribution."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            SIGNAL / 04 / CODING
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-3">
              Competitive Programming & Code Telemetry
            </h1>
            <p className="text-base sm:text-lg text-muted max-w-2xl font-body">
              Algorithmic problem-solving metrics, LeetCode performance distribution, and verified open-source contributions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-meta uppercase px-2.5 py-1 rounded bg-accent/15 text-accent border border-accent/30 font-semibold">
              Sample Data Snapshot
            </span>
            <span className="text-xs font-meta text-muted">
              Last updated: {github.lastUpdated}
            </span>
          </div>
        </div>

        {/* 1. GITHUB CONTRIBUTIONS HEATMAP (Section 8.3b) */}
        <section className="p-6 sm:p-8 bg-surface border border-border rounded-2xl mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <GithubIcon size={22} className="text-text" />
              <div>
                <h3 className="font-display font-bold text-lg text-text">
                  GitHub Contribution Grid
                </h3>
                <a
                  href={github.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-meta text-accent hover:underline inline-flex items-center gap-1"
                >
                  <span>@{github.username}</span>
                  <ExternalLinkIcon size={12} />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs font-meta">
              <div>
                <span className="text-muted block">Annual Total</span>
                <span className="text-lg font-bold text-text font-display tabular-nums">
                  {github.totalContributions} commits
                </span>
              </div>
              <div>
                <span className="text-muted block">Longest Streak</span>
                <span className="text-lg font-bold text-accent font-display tabular-nums">
                  {github.longestStreak} days
                </span>
              </div>
            </div>
          </div>

          {/* 53-week SVG Heatmap */}
          <div className="w-full overflow-x-auto pb-4 no-scrollbar">
            <div className="min-w-[760px]">
              <div
                className="grid grid-flow-col gap-1"
                style={{ gridTemplateRows: 'repeat(7, 11px)', gridAutoColumns: '11px' }}
              >
                {gridCells.map((cell) => (
                  <div
                    key={cell.id}
                    onMouseEnter={() => setHoveredCell({ date: `Week ${Math.floor(cell.id / 7) + 1}`, count: cell.count })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className="w-[11px] h-[11px] rounded-[2px] transition-transform hover:scale-125 cursor-pointer"
                    style={{ backgroundColor: getTierColor(cell.tier) }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Legend and Tooltip footer */}
          <div className="flex items-center justify-between text-xs font-meta text-muted pt-3 border-t border-border/60">
            <div>
              {hoveredCell ? (
                <span className="text-text">
                  <strong>{hoveredCell.count}</strong> contributions on {hoveredCell.date}
                </span>
              ) : (
                <span>Hover over grid cells for contribution counts</span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-surface-2" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-accent/25" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-accent/50" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-accent/75" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-accent" />
              <span>More</span>
            </div>
          </div>
        </section>

        {/* 2. LEETCODE BREAKDOWN & TOPIC MASTERY (Section 8.3b) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* LeetCode Donut Card (5 cols) */}
          <div className="lg:col-span-5 p-8 bg-surface border border-border rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <LeetcodeIcon size={22} className="text-[#FFA116]" />
                  <h3 className="font-display font-bold text-xl text-text">LeetCode Metrics</h3>
                </div>
                <a
                  href={leetcode.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-meta text-accent hover:underline"
                >
                  View Profile ↗
                </a>
              </div>

              {/* Solved Summary */}
              <div className="text-center py-6 border-y border-border/80 my-4">
                <span className="text-5xl font-display font-extrabold text-text tabular-nums block">
                  {leetcode.totalSolved}
                </span>
                <span className="text-xs font-meta uppercase text-muted tracking-wider">
                  Problems Solved · {leetcode.ranking}
                </span>
                <span className="text-xs font-meta text-accent block mt-1">
                  Acceptance Rate: {leetcode.acceptanceRate}
                </span>
              </div>

              {/* Difficulty Breakdown Bars */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-meta mb-1">
                    <span className="text-emerald-400 font-semibold">Easy</span>
                    <span className="text-muted tabular-nums">{leetcode.categories.easy.solved} / {leetcode.categories.easy.total}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(leetcode.categories.easy.solved / 150) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-meta mb-1">
                    <span className="text-amber-400 font-semibold">Medium</span>
                    <span className="text-muted tabular-nums">{leetcode.categories.medium.solved} / {leetcode.categories.medium.total}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${(leetcode.categories.medium.solved / 150) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-meta mb-1">
                    <span className="text-rose-400 font-semibold">Hard</span>
                    <span className="text-muted tabular-nums">{leetcode.categories.hard.solved} / {leetcode.categories.hard.total}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{ width: `${(leetcode.categories.hard.solved / 50) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Topic Strengths & Pinned Repos (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 bg-surface border border-border rounded-2xl">
              <h3 className="font-display font-bold text-xl text-text mb-6">
                Topic Mastery & Algorithmic Proficiency
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {leetcode.topicStrengths.map((item) => (
                  <div key={item.topic} className="p-4 bg-surface-2/60 border border-border/80 rounded-xl">
                    <div className="flex justify-between text-xs font-meta mb-2">
                      <span className="text-text font-medium">{item.topic}</span>
                      <span className="text-accent font-bold tabular-nums">{item.percent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Pinned Repositories */}
            <div className="p-8 bg-surface border border-border rounded-2xl">
              <h3 className="font-display font-bold text-xl text-text mb-4">
                Curated Open-Source Repositories
              </h3>
              <div className="space-y-3">
                {github.pinnedRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-surface-2/50 border border-border/80 hover:border-accent rounded-xl flex items-center justify-between gap-4 transition-all duration-200 group block"
                  >
                    <div>
                      <h4 className="text-sm font-bold font-display text-text group-hover:text-accent transition-colors flex items-center gap-2">
                        <span>{repo.name}</span>
                        <ExternalLinkIcon size={12} />
                      </h4>
                      <p className="text-xs text-muted mt-1 max-w-lg">
                        {repo.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-meta text-muted shrink-0">
                      <span>{repo.language}</span>
                      <span>★ {repo.stars}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Turn the Page bridge block */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
