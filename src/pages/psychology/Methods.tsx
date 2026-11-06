import React, { useState } from 'react';
import { getPsychologyMethods } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { TurnThePage } from '../../components/shell/TurnThePage';
import { soundEngine } from '../../lib/audio';

interface PsychMethodsProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function PsychMethods({ onNavigateCounterpart }: PsychMethodsProps) {
  const methods = getPsychologyMethods();
  const [interactiveR, setInteractiveR] = useState(0.46);
  const [activeEthicsIndex, setActiveEthicsIndex] = useState<number | null>(0);

  const cfq = methods.instruments.find((i) => i.id === 'cfq');
  const spatial = methods.instruments.find((i) => i.id === 'spatial-recall');
  const ethics = methods.instruments.find((i) => i.id === 'ethics-protocol');
  const correlation = methods.instruments.find((i) => i.id === 'correlation-analysis');

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Methods & Psychometric Toolkit"
        description="Psychometric instruments: Cognitive Failures Questionnaire (CFQ), spatial route recall protocol, and correlation scatter analysis."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            MEMORY / 04 / METHODS
          </span>
        </div>

        <div className="mb-14">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-3">
            Methods & Psychometric Toolkit
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl font-body">
            Validated behavioral instruments, experimental wayfinding protocols, and ethical human research standards.
          </p>
        </div>

        {/* 1. CFQ SHOWCASE */}
        {cfq && (
          <section className="p-8 sm:p-12 bg-surface border border-border rounded-3xl mb-12 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
              <span className="text-xs font-meta text-accent uppercase tracking-widest font-bold">
                Instrument 01 · Psychometric Inventory
              </span>
              <span className="text-xs font-meta text-accent font-semibold px-2.5 py-0.5 rounded bg-accent/15 border border-accent/30">
                {cfq.reliability}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-2">
              {cfq.title}
            </h2>
            <p className="text-xs font-meta text-muted mb-4">{cfq.developer} · {cfq.format}</p>
            <p className="text-sm sm:text-base text-text/80 leading-relaxed font-body mb-6">
              {cfq.construct}
            </p>

            <div className="p-6 bg-surface-2/60 border border-border/80 rounded-2xl mb-4">
              <h4 className="text-xs font-meta uppercase tracking-wider text-muted font-bold mb-3">
                Representative Inventory Items:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-text/85">
                {Array.isArray(cfq.sampleItems) && cfq.sampleItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent font-mono text-xs">{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs font-meta text-muted">{cfq.scoring}</p>
          </section>
        )}

        {/* 2. SPATIAL ROUTE RECALL PROTOCOL */}
        {spatial && (
          <section className="p-8 sm:p-12 bg-surface border border-border rounded-3xl mb-12 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
              <span className="text-xs font-meta text-accent uppercase tracking-widest font-bold">
                Instrument 02 · Experimental Behavioral Trial
              </span>
              <span className="text-xs font-meta text-accent font-semibold px-2.5 py-0.5 rounded bg-accent/15 border border-accent/30">
                {spatial.reliability}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-2">
              {spatial.title}
            </h2>
            <p className="text-xs font-meta text-muted mb-4">{spatial.developer} · {spatial.format}</p>
            <p className="text-sm sm:text-base text-text/80 leading-relaxed font-body mb-6">
              {spatial.construct}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {Array.isArray(spatial.sampleItems) && spatial.sampleItems.map((step, idx) => (
                <div key={idx} className="p-4 bg-surface-2 rounded-xl">
                  <span className="text-[11px] font-meta text-accent font-bold block mb-1">
                    Phase {idx + 1}
                  </span>
                  <p className="text-xs text-text/80 leading-relaxed font-body">{step}</p>
                </div>
              ))}
            </div>
            <p className="text-xs font-meta text-muted">{spatial.scoring}</p>
          </section>
        )}

        {/* 3. INTERACTIVE CORRELATION SCATTERPLOT (Section 9.4) */}
        {correlation && (
          <section className="p-8 sm:p-12 bg-surface border border-border rounded-3xl mb-12 shadow-sm">
            <span className="text-xs font-meta text-accent uppercase tracking-widest font-bold block mb-2">
              Instrument 03 · Statistical Demonstration
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-2">
              Pearson & Spearman Association Model
            </h2>
            <p className="text-sm sm:text-base text-muted mb-8 leading-relaxed max-w-2xl">
              Drag the correlation coefficient slider below to observe how the simulated bivariate scatter shifts between weak, moderate (actual r = 0.46), and strong association.
            </p>

            {/* Slider */}
            <div className="max-w-md mb-8">
              <div className="flex justify-between text-xs font-meta mb-2">
                <span className="text-muted">Correlation Coefficient (r)</span>
                <span className="text-accent font-bold text-base tabular-nums">r = {interactiveR.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.95"
                step="0.05"
                value={interactiveR}
                onChange={(e) => setInteractiveR(parseFloat(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-meta text-muted mt-1">
                <span>0.00 (Zero)</span>
                <span className="text-accent">0.46 (Dissertation Observed)</span>
                <span>0.95 (Near Perfect)</span>
              </div>
            </div>

            {/* Interactive SVG Scatter Plot */}
            <div className="p-6 bg-surface-2 rounded-2xl overflow-x-auto">
              <svg width="600" height="260" viewBox="0 0 600 260" className="w-full max-w-[600px] mx-auto overflow-visible">
                {/* Axes */}
                <line x1="60" y1="20" x2="60" y2="210" stroke="var(--border)" strokeWidth="1.5" />
                <line x1="60" y1="210" x2="560" y2="210" stroke="var(--border)" strokeWidth="1.5" />

                {/* Axis Labels */}
                <text x="310" y="240" fill="var(--muted)" fontSize="11" textAnchor="middle" fontFamily="monospace">
                  AI Reliance & Cognitive Offloading Score →
                </text>
                <text x="30" y="115" fill="var(--muted)" fontSize="11" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 30 115)">
                  CFQ Forgetfulness Score →
                </text>

                {/* Regression Line */}
                <line
                  x1="70"
                  y1={200 - 30 * interactiveR}
                  x2="540"
                  y2={200 - 170 * interactiveR}
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Data points dynamically shifting with r */}
                {Array.isArray(correlation.scatterplotData) && correlation.scatterplotData.map((pt, idx) => {
                  const xNorm = 60 + (pt.x / 100) * 480;
                  const randomNoise = (Math.sin(idx * 7) * 35) * (1 - interactiveR);
                  const yIdeal = 210 - (pt.x / 100) * 170 * interactiveR;
                  const yVal = Math.max(30, Math.min(200, yIdeal + randomNoise));

                  return (
                    <circle
                      key={idx}
                      cx={xNorm}
                      cy={yVal}
                      r="5"
                      fill="var(--accent-2)"
                      stroke="var(--surface)"
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>
            </div>
          </section>
        )}

        {/* 4. ETHICS PROTOCOL ACCORDION */}
        {ethics && ethics.stages && (
          <section className="p-8 sm:p-12 bg-surface border border-border rounded-3xl mb-16 shadow-sm">
            <span className="text-xs font-meta text-accent uppercase tracking-widest font-bold block mb-2">
              Instrument 04 · Human Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-6">
              {ethics.title}
            </h2>

            <div className="space-y-4">
              {ethics.stages.map((stg, idx) => {
                const isOpen = activeEthicsIndex === idx;
                return (
                  <div key={idx} className="p-5 bg-surface-2 border border-border/80 rounded-2xl">
                    <button
                      onClick={() => {
                        soundEngine.playTick();
                        setActiveEthicsIndex(isOpen ? null : idx);
                      }}
                      className="w-full flex items-center justify-between text-left cursor-pointer"
                    >
                      <h4 className="font-display font-bold text-base sm:text-lg text-text">
                        {stg.stage}
                      </h4>
                      <span className="text-accent text-sm">{isOpen ? '▲' : '▼'}</span>
                    </button>
                    {isOpen && (
                      <p className="text-sm text-muted mt-3 pt-3 border-t border-border/60 leading-relaxed font-body">
                        {stg.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Tools row */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {methods.tools.map((t) => (
              <div key={t.name} className="p-4 bg-surface border border-border rounded-xl">
                <h5 className="font-display font-bold text-sm text-text mb-1">{t.name}</h5>
                <p className="text-[11px] font-meta text-muted">{t.role}</p>
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
