import React from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { LazyImage } from '../../components/ui/LazyImage';
import { TurnThePage } from '../../components/shell/TurnThePage';
import { BrainIcon, ArrowRightIcon } from '../../components/icons';

interface PsychAboutProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function PsychAbout({ onNavigateCounterpart }: PsychAboutProps) {
  const profile = getProfile();

  const coreSubjects = [
    { title: 'Biopsychology & Neuroanatomy', desc: 'Synaptic transmission, hemispheric lateralization, hippocampal memory consolidation, and endocrine stress pathways.' },
    { title: 'Cognitive Processes', desc: 'Baddeley working memory model, attentional filters (Treisman, Broadbent), mental maps, and spatial heuristics.' },
    { title: 'Social Psychology', desc: 'Attribution theory, cognitive dissonance, group conformity, obedience dynamics, and transactive memory systems.' },
    { title: 'Psychopathology & Clinical Foundations', desc: 'Diagnostic taxonomies, affective disorders, cognitive distortions, and evidence-based therapeutic modalities.' },
    { title: 'Developmental Psychology', desc: 'Lifespan development, Eriksonian psychosocial crises, Piagetian operational stages, and attachment working models.' }
  ];

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Psychology Credentials & Methodology"
        description="Academic training, psychometric methodology, and cognitive research philosophy of Shrikant Kudale."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            MEMORY / 02 / ABOUT
          </span>
        </div>

        {/* Bio Header Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 pb-16 border-b border-border/80">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-6">
              Cognitive Science, Psychometrics & Human Memory
            </h1>
            <div className="space-y-4 text-base sm:text-lg text-text/80 font-body leading-relaxed max-w-3xl">
              <p>
                Graduated with First Class honors (70%) in B.A. (Hons) Psychology from Indira Gandhi National Open University (IGNOU, 2023—2026). My academic focus examines how digital environments reshape biological memory, spatial orientation, and executive control.
              </p>
              <p>
                Rather than treating human interaction with AI as an afterthought, my research investigates the empirical cognitive consequences of tool reliance. By pairing validated psychometric self-reports with experimental route recall trials, I formulate human factors models that bridge psychological theory with interface architecture.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="shape-pebble bg-surface border border-border shadow-xl overflow-hidden">
              <LazyImage
                src="/assets/shrikant_psych_reading.jpg"
                alt="Shrikant Kudale in academic library"
                fallbackLabel="Academic Archives · Pune"
              />
            </div>
          </div>
        </section>

        {/* 1. METHODOLOGICAL PROFICIENCIES */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Methodological Rigor
            </span>
            <h2 className="text-3xl font-display font-bold text-text">
              Scientific Proficiencies & Statistical Tooling
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-surface border border-border rounded-2xl">
              <span className="text-xs font-meta text-accent uppercase font-bold block mb-2">
                01 · Psychometrics & Scaling
              </span>
              <h3 className="text-xl font-display font-bold text-text mb-3">
                Scale Validation & Reliability
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Expertise in Likert inventory construction, Cognitive Failures Questionnaire (CFQ) administration, item-total correlations, and internal consistency evaluation via Cronbach's alpha.
              </p>
            </div>

            <div className="p-8 bg-surface border border-border rounded-2xl">
              <span className="text-xs font-meta text-accent uppercase font-bold block mb-2">
                02 · Inferential Statistics
              </span>
              <h3 className="text-xl font-display font-bold text-text mb-3">
                Parametric & Rank Analysis
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Proficient in bivariate Pearson linear correlation, Spearman non-parametric rank order, ANOVA variance decomposition, and linear regression modeling in IBM SPSS and Python SciPy.
              </p>
            </div>

            <div className="p-8 bg-surface border border-border rounded-2xl">
              <span className="text-xs font-meta text-accent uppercase font-bold block mb-2">
                03 · Cognitive Trial Design
              </span>
              <h3 className="text-xl font-display font-bold text-text mb-3">
                Controlled Experimental Protocols
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Formulating double-blind experimental trials, spatial wayfinding benchmarks, informed consent ethics protocols, and structured debriefing procedures.
              </p>
            </div>
          </div>
        </section>

        {/* 2. CORE ACADEMIC SUBJECTS */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Theoretical Foundation
            </span>
            <h2 className="text-3xl font-display font-bold text-text">
              Core Academic Curricula
            </h2>
          </div>

          <div className="space-y-4">
            {coreSubjects.map((subj, idx) => (
              <div key={idx} className="p-6 bg-surface border border-border rounded-xl">
                <h3 className="font-display font-bold text-lg text-text mb-1">
                  {subj.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed font-body">
                  {subj.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. LINK TO 120 CONCEPTS */}
        <div className="p-8 sm:p-10 bg-surface-2/40 border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-meta uppercase tracking-widest text-accent font-semibold block mb-1">
              Curated Concept Map
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-text mb-1">
              The 120 Concepts Universe
            </h3>
            <p className="text-sm text-muted">
              Explore interactive force-directed bubbles covering Counselling, Lifespan, Social, Workplace, Corporate, Positive, and Behavioural psychology.
            </p>
          </div>
          <Link
            to="/psychology/concepts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-meta text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-all shrink-0"
          >
            <span>Launch Simulation</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>

      {/* Turn the Page bridge block */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
