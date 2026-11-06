import React, { useState } from 'react';
import { getPsychologyDissertation } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { Tabs } from '../../components/ui/Tabs';
import { LazyImage } from '../../components/ui/LazyImage';
import { Button } from '../../components/ui/Button';
import { TurnThePage } from '../../components/shell/TurnThePage';
import { DownloadIcon, AwardIcon, CheckIcon } from '../../components/icons';
import { soundEngine } from '../../lib/audio';

interface PsychDissertationProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function PsychDissertation({ onNavigateCounterpart }: PsychDissertationProps) {
  const dissertation = getPsychologyDissertation();
  const [activeTab, setActiveTab] = useState('abstract');

  const tabs = [
    { id: 'abstract', label: 'Abstract & Overview' },
    { id: 'sample', label: 'Sample & Demographics' },
    { id: 'methodology', label: 'Instruments & Design' },
    { id: 'findings', label: 'Statistical Findings' },
    { id: 'discussion', label: 'Discussion & Limitations' },
    { id: 'pdf', label: 'Full Manuscript' }
  ];

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Undergraduate Honors Dissertation"
        description="To Study the Relationship Between Reliance on AI for Information Storage, Spatial Memory Performance, and Subjective Forgetfulness."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            MEMORY / 03 / DISSERTATION
          </span>
        </div>

        {/* Header Block with Viva Defense Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 pb-12 border-b border-border/80">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/30 text-xs font-meta font-bold uppercase">
                <AwardIcon size={14} />
                <span>{dissertation.status}</span>
              </span>
              <span className="text-xs font-meta text-muted">
                {dissertation.institution} · {dissertation.year}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-bold text-text mb-4 leading-tight text-balance">
              {dissertation.title}
            </h1>
            <p className="text-base sm:text-lg text-text/80 font-body leading-relaxed max-w-3xl">
              An empirical cross-sectional inquiry investigating how habitual reliance on conversational AI and digital storage correlates with spatial orientation degradation and subjective cognitive slips.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="shape-pebble overflow-hidden bg-surface border border-border shadow-lg">
              <LazyImage
                src="/assets/viva_defense.jpg"
                alt="Dissertation Viva Voce Defense"
                fallbackLabel="Viva Defense · May 2026"
              />
            </div>
            <p className="text-[11px] font-meta text-muted text-center mt-2">
              Dissertation day, defended successfully before the external academic committee.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-10">
          <Tabs tabs={tabs} activeId={activeTab} onChange={(id) => setActiveTab(id)} />
        </div>

        {/* Tab Content Panels */}
        <div className="min-h-[420px] mb-20">
          {activeTab === 'abstract' && (
            <div className="p-8 sm:p-12 bg-surface border border-border rounded-3xl space-y-6 animate-in fade-in duration-200">
              <span className="text-xs font-meta uppercase tracking-wider text-accent font-bold block">
                Research Abstract
              </span>
              <p className="text-base sm:text-xl font-body text-text leading-relaxed">
                {dissertation.abstract}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border/60">
                <div className="p-4 bg-surface-2 rounded-xl">
                  <span className="text-xs font-meta text-muted block mb-1">Participants</span>
                  <span className="text-2xl font-display font-bold text-text">120 Students</span>
                </div>
                <div className="p-4 bg-surface-2 rounded-xl">
                  <span className="text-xs font-meta text-muted block mb-1">Core Instrument</span>
                  <span className="text-2xl font-display font-bold text-text">CFQ (25 Items)</span>
                </div>
                <div className="p-4 bg-surface-2 rounded-xl">
                  <span className="text-xs font-meta text-muted block mb-1">Key Correlation</span>
                  <span className="text-2xl font-display font-bold text-accent">r = 0.46</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sample' && (
            <div className="p-8 sm:p-12 bg-surface border border-border rounded-3xl space-y-6 animate-in fade-in duration-200">
              <span className="text-xs font-meta uppercase tracking-wider text-accent font-bold block">
                Sample Characteristics & Criteria
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-surface-2 rounded-2xl">
                  <h3 className="font-display font-bold text-lg text-text mb-2">Participant Cohort</h3>
                  <p className="text-sm text-text/80 mb-3">{dissertation.sample.demographics}</p>
                  <p className="text-xs font-meta text-muted font-semibold">Gender: {dissertation.sample.genderDistribution}</p>
                </div>

                <div className="p-6 bg-surface-2 rounded-2xl">
                  <h3 className="font-display font-bold text-lg text-text mb-2">Inclusion Criteria</h3>
                  <p className="text-sm text-text/80 leading-relaxed">{dissertation.sample.inclusionCriteria}</p>
                </div>
              </div>
              <div className="p-6 bg-surface-2/60 border border-border/80 rounded-2xl">
                <h4 className="text-xs font-meta uppercase tracking-wider text-muted font-bold mb-1">Sampling Strategy</h4>
                <p className="text-sm text-text/80 leading-relaxed">{dissertation.sample.samplingMethod}</p>
              </div>
            </div>
          )}

          {activeTab === 'methodology' && (
            <div className="p-8 sm:p-12 bg-surface border border-border rounded-3xl space-y-6 animate-in fade-in duration-200">
              <span className="text-xs font-meta uppercase tracking-wider text-accent font-bold block">
                Methodological Instruments & Reliability
              </span>
              <div className="space-y-6">
                {dissertation.methodology.instruments.map((inst, idx) => (
                  <div key={idx} className="p-6 bg-surface-2 border border-border/80 rounded-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="font-display font-bold text-lg text-text">{inst.name}</h4>
                      <span className="text-xs font-meta text-accent font-semibold px-2.5 py-0.5 rounded bg-accent/15 border border-accent/30">
                        {inst.reliability}
                      </span>
                    </div>
                    <p className="text-sm text-text/80 mb-2 leading-relaxed">{inst.description}</p>
                    <span className="text-xs font-meta text-muted">Structure: {inst.items}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'findings' && (
            <div className="p-8 sm:p-12 bg-surface border border-border rounded-3xl space-y-6 animate-in fade-in duration-200">
              <span className="text-xs font-meta uppercase tracking-wider text-accent font-bold block">
                Empirical Correlation Results
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dissertation.findings.map((f, idx) => (
                  <div key={idx} className="p-6 bg-surface-2 border border-border/80 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-2xl font-display font-extrabold text-accent block mb-2">
                        {f.statistic}
                      </span>
                      <h4 className="font-display font-bold text-base text-text mb-2">
                        {f.metric}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {f.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="p-8 sm:p-12 bg-surface border border-border rounded-3xl space-y-8 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-meta uppercase tracking-wider text-accent font-bold block mb-2">
                  Theoretical Synthesis
                </span>
                <p className="text-base text-text/85 font-body leading-relaxed">
                  {dissertation.discussion}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border/80">
                <div className="p-6 bg-surface-2 rounded-2xl">
                  <h4 className="font-display font-bold text-base text-text mb-3">Study Limitations</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted">
                    {dissertation.limitations.map((l, lIdx) => (
                      <li key={lIdx} className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">▸</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-surface-2 rounded-2xl">
                  <h4 className="font-display font-bold text-base text-text mb-3">Future Research Horizons</h4>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {dissertation.futureWork}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="p-8 sm:p-12 bg-surface border border-border rounded-3xl text-center space-y-6 animate-in fade-in duration-200">
              <span className="text-xs font-meta uppercase tracking-wider text-accent font-bold block">
                Complete Academic Manuscript
              </span>
              <p className="text-sm text-muted max-w-lg mx-auto">
                The full 68-page defended dissertation manuscript is available for academic peers and researchers upon request or via the download link below.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <Button
                  variant="primary"
                  onClick={() => soundEngine.playTick()}
                  icon={<DownloadIcon size={16} />}
                >
                  Download Manuscript (PDF)
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Turn the Page bridge block */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
