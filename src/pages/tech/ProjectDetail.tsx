import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTechProjectBySlug } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { PipelineDiagram } from '../../components/diagrams/PipelineDiagram';
import { Button } from '../../components/ui/Button';
import { ExternalLinkIcon, GithubIcon, ArrowRightIcon } from '../../components/icons';

interface ProjectDetailProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function ProjectDetail({ onNavigateCounterpart }: ProjectDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const project = getTechProjectBySlug(slug || '');

  if (!project) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 pt-36 pb-24 text-center">
        <h1 className="text-3xl font-display font-bold text-text mb-4">Project Not Found</h1>
        <p className="text-muted mb-6">The requested deployment slug does not exist.</p>
        <Link to="/tech/projects">
          <Button variant="primary">Return to Projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 sm:pt-36 pb-24">
      <Seo title={project.title} description={project.summary} />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        <div className="mb-6">
          <Link
            to="/tech/projects"
            className="text-xs font-meta text-accent uppercase tracking-wider hover:underline inline-flex items-center gap-1.5"
          >
            ← Back to All Projects
          </Link>
        </div>

        <div className="max-w-4xl">
          <span className="text-xs font-meta text-accent font-semibold uppercase tracking-widest block mb-2">
            {project.category} · {project.date}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-text tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-lg text-text/80 leading-relaxed font-body mb-8">
            {project.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <div className="p-6 bg-surface border border-border rounded-xl">
              <h3 className="text-xs font-meta uppercase tracking-wider text-accent font-bold mb-2">
                Problem Statement
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 bg-surface border border-border rounded-xl">
              <h3 className="text-xs font-meta uppercase tracking-wider text-accent font-bold mb-2">
                Impact & Metric Results
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {project.impact}
              </p>
            </div>
          </div>

          {project.pipeline && (
            <div className="my-10">
              <h3 className="text-xs font-meta uppercase tracking-wider text-muted font-bold mb-3">
                Pipeline Architecture Flow
              </h3>
              <PipelineDiagram
                nodes={project.pipeline.nodes}
                edges={project.pipeline.edges}
              />
            </div>
          )}

          <div className="my-8">
            <h3 className="text-xs font-meta uppercase tracking-wider text-muted font-bold mb-3">
              Technologies & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="text-xs font-meta px-3 py-1.5 rounded-md bg-surface border border-border text-text font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-6 border-t border-border">
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-border hover:border-accent text-xs font-meta font-semibold uppercase text-text transition-colors"
              >
                <GithubIcon size={16} />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.links.paper && (
              <a
                href={project.links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-xs font-meta font-semibold uppercase transition-colors"
              >
                <ExternalLinkIcon size={16} />
                <span>Read Publication</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
