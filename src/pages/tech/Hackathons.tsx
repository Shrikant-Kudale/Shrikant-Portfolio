import React from 'react';
import { getTechAchievements } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { TurnThePage } from '../../components/shell/TurnThePage';
import { AwardIcon, ExternalLinkIcon } from '../../components/icons';

interface TechHackathonsProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function TechHackathons({ onNavigateCounterpart }: TechHackathonsProps) {
  const achievements = getTechAchievements();

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Hackathons & Certifications"
        description="Innovatex 2.0 2nd Prize, TECHNOVA 2026 National Finalist, and professional credentials from IBM and University of Glasgow."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            SIGNAL / 06 / HACKATHONS
          </span>
        </div>

        <div className="mb-14">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-3">
            Hackathons & Professional Honors
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl font-body">
            Competitive sprint engineering results under rigorous time constraints, alongside verified professional credentials.
          </p>
        </div>

        {/* 1. HACKATHONS GRID (Section 8.5) */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Competitive Trials
            </span>
            <h2 className="text-3xl font-display font-bold text-text">
              National & Intercollegiate Hackathons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.hackathons.map((hack) => (
              <div
                key={hack.id}
                className="p-8 bg-surface border border-border hover:border-accent/60 rounded-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/30 text-xs font-meta font-bold uppercase">
                      <AwardIcon size={14} />
                      <span>{hack.award}</span>
                    </span>
                    <span className="text-xs font-meta text-muted">{hack.date}</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-text mb-2">
                    {hack.title}
                  </h3>

                  <p className="text-xs font-meta text-accent mb-4">
                    {hack.organization}
                  </p>

                  <p className="text-sm text-text/80 leading-relaxed font-body mb-6">
                    {hack.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-4 border-t border-border/60">
                  {hack.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-meta px-2 py-0.5 rounded bg-surface-2 text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. CERTIFICATIONS GRID (Section 8.5) */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Credentials
            </span>
            <h2 className="text-3xl font-display font-bold text-text">
              Verified Industry Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-6 bg-surface border border-border hover:border-accent/40 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-meta uppercase tracking-wider text-accent font-semibold">
                      {cert.badge}
                    </span>
                    <span className="text-xs font-meta text-muted">{cert.date}</span>
                  </div>

                  <h3 className="text-base font-display font-bold text-text mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-meta text-muted mb-3">{cert.issuer}</p>

                  <p className="text-xs text-text/80 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-meta text-accent hover:underline inline-flex items-center gap-1 pt-3 border-t border-border/60"
                >
                  <span>Verify Credential</span>
                  <ExternalLinkIcon size={12} />
                </a>
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
