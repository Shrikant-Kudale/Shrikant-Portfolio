import React from 'react';
import { useParams } from 'react-router-dom';
import { Seo } from '../components/ui/Seo';

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 pt-32 pb-24">
      <Seo title={`Page · ${slug || 'Custom'}`} />
      <div className="max-w-3xl">
        <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-2">
          Custom Archive · {slug}
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-text mb-6">
          {slug?.replace(/-/g, ' ').toUpperCase()}
        </h1>
        <div className="p-8 bg-surface border border-border rounded-xl">
          <p className="text-muted leading-relaxed">
            This page was provisioned dynamically via the Admin Authority console. Content updates made in GitHub will render here automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
