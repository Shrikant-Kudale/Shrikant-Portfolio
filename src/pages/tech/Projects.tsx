import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTechProjects, Project } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { PipelineDiagram } from '../../components/diagrams/PipelineDiagram';
import { LazyImage } from '../../components/ui/LazyImage';
import { TurnThePage } from '../../components/shell/TurnThePage';
import { ExternalLinkIcon, GithubIcon, ArrowRightIcon } from '../../components/icons';
import { soundEngine } from '../../lib/audio';

interface TechProjectsProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function TechProjects({ onNavigateCounterpart }: TechProjectsProps) {
  const allProjects = getTechProjects();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const tabs = [
    { id: 'all', label: 'All Deployments', count: allProjects.length },
    { id: 'vision', label: 'Vision & Edge AI', count: allProjects.filter((p) => p.category.includes('Vision') || p.category.includes('Edge')).length },
    { id: 'nlp', label: 'NLP & LLMs', count: allProjects.filter((p) => p.category.includes('NLP') || p.category.includes('LLM')).length },
    { id: 'analytics', label: 'Data Analytics', count: allProjects.filter((p) => p.category.includes('Analytics')).length }
  ];

  const filteredProjects = allProjects.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'vision') return p.category.includes('Vision') || p.category.includes('Edge');
    if (activeTab === 'nlp') return p.category.includes('NLP') || p.category.includes('LLM');
    if (activeTab === 'analytics') return p.category.includes('Analytics');
    return true;
  });

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="AI & Vision Projects"
        description="Applied machine learning, edge vision pipelines, multimodal biomarkers, and agentic LLM triage systems."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            SIGNAL / 03 / PROJECTS
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-3">
              Applied Systems & Deployments
            </h1>
            <p className="text-base sm:text-lg text-muted max-w-2xl font-body">
              Eight machine learning and analytical solutions built from problem formulation to verified deployment.
            </p>
          </div>

          <Tabs
            tabs={tabs}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id)}
          />
        </div>

        {/* Asymmetric Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-20">
          {filteredProjects.map((project, idx) => {
            // Asymmetric layout logic: Alternate wide (7 cols) and narrow (5 cols)
            const isWide = idx % 3 === 0;
            const colSpan = isWide ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <div
                key={project.id}
                className={`${colSpan} p-8 bg-surface border border-border hover:border-accent/60 rounded-2xl transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-meta text-accent font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-xs font-meta text-muted">{project.date}</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-text group-hover:text-accent transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="text-sm text-text/80 mb-6 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Problem & Impact Snippet */}
                  <div className="p-4 bg-surface-2/60 border border-border/80 rounded-xl mb-6 space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-text font-meta">Problem: </span>
                      <span className="text-muted">{project.problem}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-accent font-meta">Impact: </span>
                      <span className="text-muted">{project.impact}</span>
                    </div>
                  </div>

                  {/* Stack Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-6">
                    {project.stack.map((t) => (
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
                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                    >
                      Explore Project
                    </Button>
                    <Link
                      to={`/tech/projects/${project.slug}`}
                      className="text-xs font-meta text-muted hover:text-text"
                    >
                      Deep link ↗
                    </Link>
                  </div>

                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Repository"
                      className="p-2 text-muted hover:text-text rounded-lg bg-surface-2/60 border border-border transition-colors"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          subtitle={selectedProject.category}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-6">
            <p className="text-base text-text/90 leading-relaxed font-body">
              {selectedProject.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-surface-2 border border-border rounded-xl">
                <h4 className="text-xs font-meta uppercase tracking-wider text-accent font-bold mb-2">
                  Problem Formulation
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>

              <div className="p-4 bg-surface-2 border border-border rounded-xl">
                <h4 className="text-xs font-meta uppercase tracking-wider text-accent font-bold mb-2">
                  Observed Impact & Metrics
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  {selectedProject.impact}
                </p>
              </div>
            </div>

            {/* Architecture Pipeline Diagram (Section 8.3) */}
            {selectedProject.pipeline && (
              <div className="mt-6">
                <h4 className="text-xs font-meta uppercase tracking-wider text-muted font-bold mb-2">
                  Pipeline Architecture
                </h4>
                <PipelineDiagram
                  nodes={selectedProject.pipeline.nodes}
                  edges={selectedProject.pipeline.edges}
                />
              </div>
            )}

            {/* Technology Stack */}
            <div>
              <h4 className="text-xs font-meta uppercase tracking-wider text-muted font-bold mb-2">
                Technologies & Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-meta px-3 py-1 rounded-md bg-surface-2 border border-border text-text font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links Row */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/80">
              {selectedProject.links.repo && (
                <a
                  href={selectedProject.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border hover:border-accent text-xs font-meta font-semibold uppercase text-text"
                >
                  <GithubIcon size={16} />
                  <span>View Repository</span>
                </a>
              )}

              {selectedProject.links.paper && (
                <a
                  href={selectedProject.links.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-xs font-meta font-semibold uppercase"
                >
                  <ExternalLinkIcon size={16} />
                  <span>Read Paper</span>
                </a>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Turn the Page bridge block */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
