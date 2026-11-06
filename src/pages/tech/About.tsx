import React from 'react';
import { Link } from 'react-router-dom';
import { getProfile, getTechAchievements } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { Chip } from '../../components/ui/Chip';
import { LazyImage } from '../../components/ui/LazyImage';
import { TurnThePage } from '../../components/shell/TurnThePage';
import { AwardIcon, TerminalIcon, ArrowRightIcon } from '../../components/icons';

interface TechAboutProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function TechAbout({ onNavigateCounterpart }: TechAboutProps) {
  const profile = getProfile();
  const achievements = getTechAchievements();

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="About & Technical Stack"
        description="Shrikant Subhash Kudale: Educational background, 12 skill matrices, certifications, and engineering methodology."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label (Section 2B.3) */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            SIGNAL / 02 / ABOUT AND STACK
          </span>
        </div>

        {/* Bio Header Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 pb-16 border-b border-border/80">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-6">
              Engineering with Mathematical Rigor & Systems Discipline
            </h1>
            <div className="space-y-4 text-base sm:text-lg text-text/80 font-body leading-relaxed max-w-3xl">
              <p>
                I am a final-year B.Tech Computer Science student in Artificial Intelligence & Analytics at MIT School of Computing, MIT-ADT University (CGPA 8.25), concurrently completing a First Class B.A. (Hons) in Psychology from IGNOU.
              </p>
              <p>
                My work centers on the intersection of deep neural representations and physical hardware constraints. Whether it is engineering low-latency vision pipelines on Raspberry Pi single-board computers for assistive navigation or optimizing multimodal Transformer attention maps for early biomarker discovery, I prioritize transparent validation over opaque black-box heuristics.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="clip-chamfer bg-surface border border-border shadow-xl overflow-hidden">
              <LazyImage
                src="/assets/shrikant_working.jpg"
                alt="Shrikant Kudale at workstation"
                fallbackLabel="Workstation · Pune"
              />
            </div>
          </div>
        </section>

        {/* SKILLS MATRIX WITH STICKY LEGEND (Section 8.2) */}
        <section className="mb-24 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
                Taxonomy of Competence
              </span>
              <h2 className="text-3xl font-display font-bold text-text">
                The 12 Engineering Skill Matrices
              </h2>
            </div>

            {/* Sticky Legend (Section 8.2) */}
            <div className="inline-flex items-center gap-4 p-2.5 bg-surface border border-border rounded-xl shadow-xs self-start md:self-auto">
              <span className="text-xs font-meta uppercase text-muted">Matrix Legend:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-meta font-medium text-accent">Core (Production / Labs)</span>
              </div>
              <span className="text-muted/40">|</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full border border-muted" />
                <span className="text-xs font-meta text-muted">Familiar (Working Knowledge)</span>
              </div>
            </div>
          </div>

          {/* 12 Skill Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.skills.map((group, idx) => (
              <div
                key={group.category}
                className="p-6 bg-surface border border-border hover:border-accent/50 rounded-2xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-meta text-muted tracking-wider">
                      Matrix 0{idx + 1}
                    </span>
                    <TerminalIcon size={18} className="text-accent/60" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-text mb-4">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <Chip key={s.name} label={s.name} level={s.level} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Foundational Training
            </span>
            <h2 className="text-3xl font-display font-bold text-text">
              Formal Education History
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 bg-surface border border-border rounded-2xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-meta text-accent font-semibold px-2 py-0.5 rounded bg-accent/15 border border-accent/30">
                    {edu.badge}
                  </span>
                  <span className="text-xs font-meta text-muted">{edu.duration}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-text mb-1">
                  {edu.degree}
                </h3>
                <p className="text-sm font-medium text-accent mb-2">
                  {edu.institution}
                </p>
                <p className="text-sm font-meta text-muted mb-4 font-semibold">
                  Performance: {edu.score}
                </p>
                <p className="text-xs sm:text-sm text-text/80 leading-relaxed">
                  {edu.highlights}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* REGISTERED COPYRIGHT BANNER (Section 8.2) */}
        <section className="mb-24 p-8 sm:p-10 bg-surface/70 border border-thread/50 rounded-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-meta uppercase tracking-widest text-thread font-bold block mb-1">
                Intellectual Property · Govt. of India
              </span>
              <h3 className="text-2xl font-display font-bold text-text mb-2">
                Registered Copyright: {achievements.copyright.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Certificate No: <strong className="text-text font-mono">{achievements.copyright.certificateNo}</strong>. Mentored by {achievements.copyright.mentors.join(', ')}. Registered for desktop financial regression forecasting and visual UI telemetry architecture.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-thread/15 border border-thread/40 text-thread font-meta text-xs font-semibold uppercase">
                <AwardIcon size={16} />
                <span>Certificate Verified</span>
              </span>
            </div>
          </div>
        </section>

        {/* TRAININGS & INTENSIVE WORKSHOPS */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Immersion
            </span>
            <h2 className="text-3xl font-display font-bold text-text">
              Specialized Labs & Technical Trainings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.trainings.map((t, idx) => (
              <div key={idx} className="p-6 bg-surface border border-border rounded-xl">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-lg text-text">
                    {t.title}
                  </h3>
                  <span className="text-xs font-meta text-muted">{t.date}</span>
                </div>
                <p className="text-xs font-meta text-accent mb-2">{t.institution}</p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* BRIDGE TO PSYCHOLOGY ABOUT */}
        <div className="p-8 bg-surface-2/40 border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-meta uppercase tracking-widest text-thread font-semibold block mb-1">
              The Other Half
            </span>
            <h3 className="text-xl font-display font-bold text-text mb-1">
              Curious about the Cognitive Science Training?
            </h3>
            <p className="text-sm text-muted">
              Explore academic credentials, psychometric methodology, and experimental trial design from IGNOU.
            </p>
          </div>
          <Link
            to="/psychology/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border hover:border-accent text-accent font-meta text-xs uppercase tracking-wider font-semibold hover:translate-x-1 transition-all shrink-0"
          >
            <span>View Psychology About</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>

      {/* Turn the Page bridge block */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
