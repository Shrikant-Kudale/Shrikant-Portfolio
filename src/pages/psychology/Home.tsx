import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfile, getPsychologyDissertation } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { ContactStrip } from '../../components/shell/ContactStrip';
import { LazyImage } from '../../components/ui/LazyImage';
import { TurnThePage } from '../../components/shell/TurnThePage';
import {
  BrainIcon,
  BookIcon,
  ArrowRightIcon,
  DownloadIcon,
  SparklesIcon
} from '../../components/icons';
import { soundEngine } from '../../lib/audio';

interface PsychHomeProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function PsychHome({ onNavigateCounterpart }: PsychHomeProps) {
  const profile = getProfile();
  const dissertation = getPsychologyDissertation();

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const titles = profile.titles.psychology;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [titles.length]);

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Cognitive Researcher & Psychology Graduate"
        description="Shrikant Subhash Kudale: B.A. (Hons) Psychology exploring cognitive offloading, spatial memory, and human-AI interaction."
      />

      {/* 1. HERO SECTION (Warm, organic, editorial) */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 min-h-[calc(100vh-8rem)] flex flex-col justify-center mb-16 sm:mb-24">
        {/* Folio Label (Section 2B.3) */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            MEMORY / 01 / HOME
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Researcher Identity & Degree Badge */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="font-display font-bold text-xl text-text">
                Shrikant Subhash Kudale
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-meta text-xs uppercase font-semibold">
                <span>B.A. (Hons) Psychology · 70% First Class</span>
              </span>
            </div>

            {/* Huge Headline in Fraunces */}
            <h1 className="font-display font-extrabold text-text tracking-tight text-balance mb-6 leading-[1.08] text-4xl sm:text-6xl md:text-7xl">
              Understanding the human mind in a world of machines.
            </h1>

            {/* Typewriter Line */}
            <div className="h-8 flex items-center mb-6">
              <span className="text-base sm:text-xl font-meta text-accent-2 font-medium tracking-wide">
                {titles[currentTitleIndex]}
              </span>
              <span className="w-2 h-5 bg-accent-2 ml-2 animate-pulse" />
            </div>

            {/* Summary */}
            <p className="text-base sm:text-lg text-text/80 max-w-2xl font-body leading-relaxed mb-8">
              {profile.summary.psychology}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link to="/psychology/dissertation">
                <Button variant="primary" icon={<ArrowRightIcon size={16} />}>
                  Read Dissertation
                </Button>
              </Link>
              <Link to="/psychology/concepts">
                <Button variant="secondary" icon={<SparklesIcon size={16} />}>
                  Explore 120 Concepts
                </Button>
              </Link>
              {profile.psychCvUrl && (
                <a
                  href={profile.psychCvUrl}
                  download="Shrikant_Kudale_Psychology_CV.pdf"
                  onClick={() => soundEngine.playTick()}
                >
                  <Button variant="outline" icon={<DownloadIcon size={16} />}>
                    Download CV
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): 4:3 Portrait with organic shape */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="shape-pebble overflow-hidden bg-surface border border-border shadow-2xl relative">
              <LazyImage
                src="/assets/shrikant_psychology.jpg"
                alt="Shrikant Kudale - Psychology Graduate"
                fallbackLabel="Shrikant Kudale · Research"
                containerClassName="w-full"
              />
            </div>

            <div className="mt-6 p-4 sm:p-5 bg-surface/70 border border-border rounded-2xl space-y-4">
              <div>
                <span className="text-[11px] font-meta uppercase tracking-wider text-muted block mb-2">
                  Academic Channels & Inquiries
                </span>
                <ContactStrip />
              </div>
              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-meta text-muted">
                <span>Dissertation: Defended via Viva Voce</span>
                <span className="text-accent font-semibold">120 Participants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY PSYCHOLOGY AND AI ESSAY (Section 9.1: Drop cap, pull quote, serif body) */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 my-20">
        <div className="p-8 sm:p-14 bg-surface/60 border border-border/80 rounded-3xl">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-meta uppercase tracking-widest text-accent font-bold block mb-2">
              Philosophical Foundation
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-text mb-8">
              Why Artificial Intelligence Demands Cognitive Science
            </h2>

            <div className="text-base sm:text-xl font-body text-text/85 leading-relaxed space-y-6">
              <p>
                <span className="float-left text-5xl sm:text-6xl font-display font-bold text-accent mr-3 leading-none">
                  T
                </span>
                echnology is never cognitively neutral. Every algorithmic architecture we construct—from real-time object classification to predictive text suggestion—acts as an external prosthetic upon the human attentional budget. When engineers treat deep neural models purely as statistical input-output functions, they ignore the cognitive load, behavioral dependency, and memory offloading that these systems inevitably trigger.
              </p>

              {/* Pull Quote */}
              <blockquote className="my-10 p-6 sm:p-8 border-y border-thread/80 bg-surface text-center">
                <p className="text-xl sm:text-2xl font-display italic text-text text-balance">
                  "If machines remember everything for us, what remains of human spatial intuition and cognitive endurance?"
                </p>
                <cite className="text-xs font-meta uppercase text-thread font-semibold block mt-3">
                  — Shrikant Kudale, Dissertation Research Notes
                </cite>
              </blockquote>

              <p>
                By studying cognitive psychology, psychometrics, and human perception alongside computer engineering, I ensure that intelligent systems are evaluated with human minds in view. My dissertation rigorously examined this threshold across 120 technical undergraduates, measuring how habitual cognitive offloading associates with subjective forgetfulness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DISSERTATION HUB CARD (Section 9.1) */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 my-20">
        <div className="p-8 sm:p-12 bg-surface border border-border hover:border-accent/60 rounded-3xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-meta uppercase tracking-widest text-accent font-bold block mb-2">
                Undergraduate Honors Dissertation · IGNOU
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-text mb-4 leading-tight">
                {dissertation.title}
              </h2>
              <p className="text-sm sm:text-base text-text/80 leading-relaxed font-body mb-6">
                {dissertation.abstract}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-surface-2/60 border border-border/80 rounded-xl mb-6 text-xs font-meta">
                <div>
                  <span className="text-muted block">Cohort Sample</span>
                  <span className="text-text font-bold text-sm">120 Engineering Students</span>
                </div>
                <div>
                  <span className="text-muted block">Primary Instrument</span>
                  <span className="text-text font-bold text-sm">CFQ (25 Items)</span>
                </div>
                <div>
                  <span className="text-muted block">Key Correlation</span>
                  <span className="text-accent font-bold text-sm">r = 0.46 (p &lt; 0.001)</span>
                </div>
              </div>

              <Link to="/psychology/dissertation">
                <Button variant="primary" icon={<ArrowRightIcon size={16} />}>
                  Open Complete Dissertation Hub
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-4">
              <div className="shape-pebble-alt overflow-hidden bg-surface-2 border border-border shadow-lg">
                <LazyImage
                  src="/assets/viva_defense.jpg"
                  alt="Dissertation Viva Voce Defense"
                  fallbackLabel="Viva Defense · May 2026"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PORTALS: Concept Universe & Wellness Lab (Section 9.1: Two large differently shaped blocks) */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 my-24">
        <div className="mb-10">
          <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
            Exploratory Spaces
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">
            Interactive Psychological Environments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Portal 1: Concept Universe (Floating bubble preview) */}
          <Link
            to="/psychology/concepts"
            className="p-8 sm:p-10 bg-surface border border-border hover:border-accent rounded-3xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-meta uppercase tracking-wider text-accent font-semibold">
                  Memory / 08 · Signature Archive
                </span>
                <BrainIcon size={24} className="text-accent" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-text group-hover:text-accent transition-colors mb-2">
                The 120 Concepts Universe
              </h3>
              <p className="text-sm sm:text-base text-muted mb-6 leading-relaxed">
                An interactive physics-driven glass bubble simulation spanning 7 psychology domains, complete with mechanisms and everyday examples.
              </p>

              {/* Visual mini-bubble preview cluster */}
              <div className="h-28 flex items-center justify-center gap-3 py-2 bg-surface-2/40 border border-border/60 rounded-2xl mb-6 overflow-hidden">
                <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-[10px] font-meta text-accent font-semibold animate-bounce">
                  Flow
                </div>
                <div className="w-18 h-18 rounded-full bg-accent-2/20 border border-accent-2/40 flex items-center justify-center text-[10px] font-meta text-accent-2 font-semibold">
                  Memory
                </div>
                <div className="w-12 h-12 rounded-full bg-accent-4/20 border border-accent-4/40 flex items-center justify-center text-[9px] font-meta text-accent-4 font-semibold animate-pulse">
                  Nudge
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 text-xs font-meta uppercase font-semibold tracking-wider text-accent group-hover:translate-x-1 transition-transform">
              <span>Enter Bubble Simulation</span>
              <ArrowRightIcon size={14} />
            </span>
          </Link>

          {/* Portal 2: Wellness & Perception Lab (Breathing preview) */}
          <Link
            to="/psychology/wellness"
            className="p-8 sm:p-10 bg-surface border border-border hover:border-accent rounded-3xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-meta uppercase tracking-wider text-accent font-semibold">
                  Memory / 06 · Cognitive Laboratory
                </span>
                <SparklesIcon size={24} className="text-accent" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-text group-hover:text-accent transition-colors mb-2">
                Wellness & Perception Lab
              </h3>
              <p className="text-sm sm:text-base text-muted mb-6 leading-relaxed">
                Seven interactive client-side psychometric and reflective tools: Stroop interference, Breathing Guide, Reaction Timer, and Visual Illusions.
              </p>

              {/* Visual pulsing breathing circle preview */}
              <div className="h-28 flex items-center justify-center py-2 bg-surface-2/40 border border-border/60 rounded-2xl mb-6">
                <div className="w-16 h-16 rounded-full bg-accent-2/30 border border-accent-2/50 flex items-center justify-center text-[10px] font-meta text-accent-2 font-bold animate-ping" />
              </div>
            </div>

            <span className="inline-flex items-center gap-2 text-xs font-meta uppercase font-semibold tracking-wider text-accent group-hover:translate-x-1 transition-transform">
              <span>Open 7 Interactive Activities</span>
              <ArrowRightIcon size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* Turn the Page bridge block (Section 2B.4) */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
