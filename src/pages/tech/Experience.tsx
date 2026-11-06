import React, { useState } from 'react';
import { getTechExperience, getTechPublications, getTechAchievements } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { Timeline } from '../../components/ui/Timeline';
import { TurnThePage } from '../../components/shell/TurnThePage';
import { FileTextIcon, AwardIcon, CheckIcon, ExternalLinkIcon } from '../../components/icons';
import { soundEngine } from '../../lib/audio';

interface TechExperienceProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function TechExperience({ onNavigateCounterpart }: TechExperienceProps) {
  const experiences = getTechExperience();
  const publications = getTechPublications();
  const achievements = getTechAchievements();

  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const handleCopyBibtex = (bibtex: string) => {
    soundEngine.playTick();
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2400);
  };

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Experience & Publications"
        description="Internships at CRIEYA and Zidio, Smart India Hackathon leadership, and peer-reviewed research published in IJARSCT."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            SIGNAL / 05 / EXPERIENCE
          </span>
        </div>

        <div className="mb-14">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-3">
            Experience & Research Publications
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl font-body">
            Professional internships in Edge AI and vision-language systems, accompanied by peer-reviewed neural research.
          </p>
        </div>

        {/* 1. TIMELINE OF ROLES & INTERNSHIPS (Section 8.4) */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Career Trajectory
            </span>
            <h2 className="text-3xl font-display font-bold text-text">
              Engineering Roles & Internships
            </h2>
          </div>

          <Timeline entries={experiences} />
        </section>

        {/* 2. PEER-REVIEWED PUBLICATIONS BLOCK (Section 8.4) */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Peer-Reviewed Literature
            </span>
            <h2 className="text-3xl font-display font-bold text-text">
              Academic Research Paper
            </h2>
          </div>

          <div className="space-y-6">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="p-8 sm:p-10 bg-surface border border-border hover:border-accent/60 rounded-2xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <span className="text-xs font-meta text-accent font-semibold uppercase tracking-wider">
                    {pub.journal} · {pub.volume}
                  </span>
                  <span className="text-xs font-meta text-muted">{pub.date}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-text mb-4 leading-tight">
                  {pub.title}
                </h3>

                <p className="text-xs font-meta text-muted mb-4">
                  Authors: {pub.authors.join(', ')} · Mentored by {pub.mentor} · {pub.institution}
                </p>

                <p className="text-sm sm:text-base text-text/80 leading-relaxed font-body mb-6">
                  {pub.abstract}
                </p>

                <div className="p-4 bg-surface-2/60 border border-border/80 rounded-xl mb-6">
                  <span className="text-xs font-meta text-muted block mb-1">DOI Reference:</span>
                  <span className="text-xs font-mono text-accent">{pub.doi}</span>
                </div>

                {/* Actions: BibTeX, PDF, Certificate */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => handleCopyBibtex(pub.bibtex)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface-2 hover:bg-surface border border-border rounded-lg text-xs font-meta text-text transition-colors cursor-pointer"
                  >
                    {copiedBibtex ? <CheckIcon size={14} className="text-emerald-400" /> : <FileTextIcon size={14} />}
                    <span>{copiedBibtex ? 'BibTeX Copied' : 'Copy BibTeX Citation'}</span>
                  </button>

                  <a
                    href="https://ijarsct.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-xs font-meta font-semibold uppercase transition-colors"
                  >
                    <ExternalLinkIcon size={14} />
                    <span>View Journal Portal</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. REGISTERED COPYRIGHT BANNER (Section 8.4) */}
        <section className="p-8 sm:p-10 bg-surface/80 border border-thread/60 rounded-2xl mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-meta uppercase tracking-widest text-thread font-bold block mb-1">
                Intellectual Property Verification
              </span>
              <h3 className="text-2xl font-display font-bold text-text mb-2">
                Registered Copyright: {achievements.copyright.title}
              </h3>
              <p className="text-sm text-muted max-w-2xl leading-relaxed">
                Registered with the Copyright Office, Government of India (Reg. No. <strong className="text-text font-mono">{achievements.copyright.certificateNo}</strong>). Covers predictive spending algorithms and telemetry architecture.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-thread/15 text-thread border border-thread/40 rounded-lg text-xs font-meta font-semibold uppercase">
                <AwardIcon size={16} />
                <span>Verified Registration</span>
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Turn the Page bridge block */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
