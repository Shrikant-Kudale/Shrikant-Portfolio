import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfile, getTechProjects } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { ContactStrip } from '../../components/shell/ContactStrip';
import { Marquee } from '../../components/ui/Marquee';
import { CountUp } from '../../components/ui/CountUp';
import { Reveal } from '../../components/ui/Reveal';
import { LazyImage } from '../../components/ui/LazyImage';
import { TurnThePage } from '../../components/shell/TurnThePage';
import {
  DownloadIcon,
  ArrowRightIcon,
  BrainIcon,
  VisionIcon,
  ChartIcon,
  AwardIcon,
  CpuIcon
} from '../../components/icons';
import { soundEngine } from '../../lib/audio';

interface TechHomeProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function TechHome({ onNavigateCounterpart }: TechHomeProps) {
  const profile = getProfile();
  const projects = getTechProjects();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);

  // Typewriter title effect
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const titles = profile.titles.tech;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [titles.length]);

  const strip1 = [
    'Python', 'Deep Learning', 'Machine Learning', 'YOLOv8', 'PyTorch',
    'TensorFlow', 'Docker', 'Raspberry Pi Zero 2 W', 'Flask REST API', 'SQL',
    'Transformers', 'U-Net', 'Mask R-CNN', 'LangGraph'
  ];

  const strip2 = [
    'Tableau (LOD)', 'Power BI', 'scikit-learn', 'XGBoost', 'Streamlit',
    'OpenCV', 'Pandas', 'NumPy', 'Time Series Forecasting', 'Edge AI', 'Agile / Scrum'
  ];

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="AI & Analytics Engineer"
        description="Shrikant Subhash Kudale: AI & Analytics Engineer bridging machine perception, edge deployment, and deep neural architectures."
      />

      {/* 1. HERO SECTION (Clean, uncluttered, balanced 7/5 grid) */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 min-h-[calc(100vh-9rem)] flex flex-col justify-center mb-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            SIGNAL / 01 / HOME
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column (7 cols): Editorial Typography & Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Live Role Badge */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-accent/10 border border-accent/30 text-accent font-meta text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                AI Engineer Intern · CRIEYA (MIT-ADT)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-2 border border-border text-muted font-meta text-xs">
                Pune, India
              </span>
            </div>

            {/* Clean, Cohesive Display Name */}
            <h1 className="font-display font-bold text-text tracking-tight leading-[1.05] text-balance mb-4">
              <span className="block text-4xl sm:text-6xl md:text-7xl">
                Shrikant Subhash Kudale
              </span>
            </h1>

            {/* Typewriter Line */}
            <div className="h-7 flex items-center mb-5">
              <span className="text-base sm:text-lg font-meta text-accent font-medium tracking-wide">
                {titles[currentTitleIndex]}
              </span>
              <span className="w-1.5 h-4 bg-accent ml-2 animate-pulse" />
            </div>

            {/* Current Bio Summary */}
            <p className="text-base sm:text-lg text-text/85 max-w-2xl font-body leading-relaxed mb-8">
              AI Engineer Intern at CRIEYA (MIT-ADT) engineering low-latency edge AI systems (YOLOv8 & ToF depth sensors) on Raspberry Pi Zero 2 W. Author of an 87.4% accuracy Transformer architecture published in IJARSCT, with hands-on mastery in PyTorch, Docker, SQL, and executive dashboards.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href={profile.resumePdf}
                download="Shrikant_Kudale_Resume.pdf"
                onClick={() => soundEngine.playTick()}
              >
                <Button variant="primary" icon={<DownloadIcon size={16} />}>
                  Download Resume
                </Button>
              </a>
              <Link to="/tech/projects">
                <Button variant="secondary" icon={<ArrowRightIcon size={16} />}>
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): Uncluttered 4:3 Portrait with Clean Border */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="w-full rounded-2xl overflow-hidden bg-surface border border-border shadow-2xl transition-all duration-300 hover:border-accent/50">
              <LazyImage
                src="/assets/shrikant_portrait.jpg"
                alt="Shrikant Subhash Kudale - AI Engineer"
                fallbackLabel="Shrikant Kudale"
                containerClassName="w-full"
              />
            </div>

            {/* Contact Strip & Resume Block */}
            <div className="mt-5 p-4 sm:p-5 bg-surface/80 border border-border rounded-xl space-y-3">
              <div>
                <span className="text-[11px] font-meta uppercase tracking-wider text-muted block mb-2">
                  Direct Verification & Contact
                </span>
                <ContactStrip />
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-meta text-muted">
                <span>Resume: Tech CV (PDF)</span>
                <span className="text-accent font-medium">Updated 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DUAL SKILL MARQUEES */}
      <section className="w-full py-8 border-y border-border/80 bg-surface/30 my-16 space-y-3">
        <Marquee items={strip1} direction="left" speed={30} />
        <Marquee items={strip2} direction="right" speed={32} />
      </section>

      {/* 4. KEY METRICS BAR */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 my-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 p-6 sm:p-8 bg-surface border border-border rounded-2xl shadow-sm">
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-accent">
              <CountUp value={profile.metrics.modelAccuracy} />
            </span>
            <span className="text-xs font-meta uppercase tracking-wider text-muted mt-1">
              Model Accuracy (PAC)
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-accent">
              <CountUp value={profile.metrics.papersPublished} />
            </span>
            <span className="text-xs font-meta uppercase tracking-wider text-muted mt-1">
              Published Paper (IJARSCT)
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-accent">
              <CountUp value={profile.metrics.copyrightsRegistered} />
            </span>
            <span className="text-xs font-meta uppercase tracking-wider text-muted mt-1">
              Govt. Copyright (LD-20250172223)
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-accent">
              <CountUp value={profile.metrics.hackathonHonors} />
            </span>
            <span className="text-xs font-meta uppercase tracking-wider text-muted mt-1">
              Hackathon Honors
            </span>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col">
            <span className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-accent">
              <CountUp value={profile.metrics.cgpa} />
            </span>
            <span className="text-xs font-meta uppercase tracking-wider text-muted mt-1">
              B.Tech CGPA (MIT-ADT)
            </span>
          </div>
        </div>
      </section>

      {/* 5. EXPLORE HUB (Asymmetric 7/5 & 5/7 layout, not three identical cards) */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 my-20">
        <div className="mb-10">
          <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
            Navigation Nexus
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">
            Explore the Technical Architecture
          </h2>
        </div>

        <div className="space-y-6">
          {/* Row 1: 7 / 5 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <Link
              to="/tech/projects"
              className="md:col-span-7 group p-8 sm:p-10 bg-surface border border-border hover:border-accent rounded-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-meta text-accent uppercase tracking-wider">
                  Signal / 03 · Deployments
                </span>
                <BrainIcon size={24} className="text-accent" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-text group-hover:text-accent transition-colors mb-2">
                Applied AI & Vision Projects
              </h3>
              <p className="text-sm sm:text-base text-muted max-w-xl mb-6">
                From Transformer PAC biomarkers down to embedded YOLOv8 inference on Raspberry Pi Zero 2 W and multi-agent hospital scheduling.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-meta uppercase font-semibold tracking-wider text-accent group-hover:translate-x-1 transition-transform">
                <span>View Full Registry</span>
                <ArrowRightIcon size={14} />
              </span>
            </Link>

            <Link
              to="/tech/coding"
              className="md:col-span-5 group p-8 sm:p-10 bg-surface border border-border hover:border-accent rounded-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-meta text-accent uppercase tracking-wider">
                  Signal / 04 · Live Telemetry
                </span>
                <ChartIcon size={24} className="text-accent" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-text group-hover:text-accent transition-colors mb-2">
                Competitive Coding & GitHub
              </h3>
              <p className="text-sm text-muted mb-6">
                53-week contribution matrix, LeetCode problem breakdown, and topic mastery distribution.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-meta uppercase font-semibold tracking-wider text-accent group-hover:translate-x-1 transition-transform">
                <span>Inspect Algorithms</span>
                <ArrowRightIcon size={14} />
              </span>
            </Link>
          </div>

          {/* Row 2: 5 / 7 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <Link
              to="/tech/experience"
              className="md:col-span-5 group p-8 sm:p-10 bg-surface border border-border hover:border-accent rounded-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-meta text-accent uppercase tracking-wider">
                  Signal / 05 · Research & Roles
                </span>
                <VisionIcon size={24} className="text-accent" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-text group-hover:text-accent transition-colors mb-2">
                Experience & Publications
              </h3>
              <p className="text-sm text-muted mb-6">
                CRIEYA Edge AI internship, Zidio vision-language engineering, and IJARSCT journal paper with BibTeX citation.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-meta uppercase font-semibold tracking-wider text-accent group-hover:translate-x-1 transition-transform">
                <span>View Timeline</span>
                <ArrowRightIcon size={14} />
              </span>
            </Link>

            <Link
              to="/tech/jd-match"
              className="md:col-span-7 group p-8 sm:p-10 bg-surface border border-border hover:border-accent rounded-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-meta text-accent uppercase tracking-wider">
                  Signal / 08 · AI Evaluator
                </span>
                <AwardIcon size={24} className="text-thread" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-text group-hover:text-accent transition-colors mb-2">
                Job Description Matcher & PDF Brief
              </h3>
              <p className="text-sm sm:text-base text-muted max-w-xl mb-6">
                Paste any Data Science or AI Engineer role description to receive an objective Gemini-scored suitability breakdown and export a candidate PDF brief.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-meta uppercase font-semibold tracking-wider text-accent group-hover:translate-x-1 transition-transform">
                <span>Run Role Matcher</span>
                <ArrowRightIcon size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROJECTS (Flagship duo) */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 my-20">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Evidence
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">
              Flagship Engineering Deployments
            </h2>
          </div>
          <Link to="/tech/projects" className="text-xs font-meta uppercase text-accent hover:underline">
            View all 8 projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((p) => (
            <div
              key={p.id}
              className="p-8 bg-surface border border-border hover:border-accent/60 rounded-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-meta text-accent font-semibold uppercase tracking-wider">
                    {p.category}
                  </span>
                  <span className="text-xs font-meta text-muted">{p.date}</span>
                </div>

                <h3 className="text-2xl font-display font-bold text-text mb-3">
                  {p.title}
                </h3>

                <p className="text-sm text-text/80 mb-4 leading-relaxed">
                  {p.summary}
                </p>

                <div className="p-4 bg-surface-2/60 border border-border/80 rounded-xl mb-4 space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-text font-meta">Problem: </span>
                    <span className="text-muted">{p.problem}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-accent font-meta">Impact: </span>
                    <span className="text-muted">{p.impact}</span>
                  </div>
                </div>

                {/* Tech chips */}
                <div className="flex items-center gap-1.5 flex-wrap mb-6">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-meta px-2 py-0.5 rounded bg-surface-2 text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <Link to={`/tech/projects/${p.slug}`}>
                  <Button variant="secondary" size="sm" icon={<ArrowRightIcon size={14} />}>
                    Explore Architecture
                  </Button>
                </Link>
                {p.humanSide && (
                  <Link
                    to={p.humanSide.route}
                    className="text-xs font-meta text-thread hover:underline"
                  >
                    Human side: {p.humanSide.conceptName} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHY HIRE ME: Editorial 2-column section */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 my-24">
        <div className="p-8 sm:p-14 bg-surface/50 border border-border rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-2">
                Candidate Defense
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text leading-tight text-balance">
                Taking machine learning from mathematical formulation to edge hardware.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-text/80 leading-relaxed font-body">
              <div className="p-5 bg-surface border border-border/80 rounded-xl">
                <h3 className="font-bold font-display text-text text-base mb-1">
                  1. Full Lifecycle Ownership
                </h3>
                <p className="text-muted">
                  Unlike models that remain locked in exploratory Jupyter notebooks, Shrikant packages pipelines into production containers. At CRIEYA, he optimized YOLOv8 to run locally on a Raspberry Pi Zero 2 W with Time-of-Flight sensors inside Docker containers with sub-120ms latency.
                </p>
              </div>

              <div className="p-5 bg-surface border border-border/80 rounded-xl">
                <h3 className="font-bold font-display text-text text-base mb-1">
                  2. Peer-Reviewed Algorithmic Rigor
                </h3>
                <p className="text-muted">
                  Authored and published research in IJARSCT (Vol. 6, Issue 17) introducing a self-attention Transformer correlating Phase-Amplitude Coupling across brain oscillations for preclinical tumor detection with 87.4% accuracy.
                </p>
              </div>

              <div className="p-5 bg-surface border border-border/80 rounded-xl">
                <h3 className="font-bold font-display text-text text-base mb-1">
                  3. Agile Leadership Under Pressure
                </h3>
                <p className="text-muted">
                  Led a 6-member engineering squad at Smart India Hackathon 2025 to develop Smart Student Assist. Translated educational stakeholder needs into system architecture and managed sprint deliverables to secure national honours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TURN THE PAGE BRIDGE BLOCK (Section 2B.4) */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
