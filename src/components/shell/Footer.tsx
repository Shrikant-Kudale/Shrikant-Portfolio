import React from 'react';
import { Link } from 'react-router-dom';
import { usePersona } from '../../lib/persona';
import { getProfile, getSiteConfig } from '../../lib/content';
import { ContactStrip } from './ContactStrip';
import { SKMonogram } from '../icons';
import { soundEngine } from '../../lib/audio';

export function Footer() {
  const { persona } = usePersona();
  const profile = getProfile();
  const site = getSiteConfig();
  const navItems = site.nav[persona] || [];

  const handleLinkClick = () => {
    soundEngine.playTick();
  };

  const closingText = profile.footerClosing[persona] || "Built to be understood.";

  return (
    <footer className="relative w-full bg-surface border-t border-border/80 pt-16 pb-12 mt-24">
      {/* The Thread hairline at top of footer */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-thread opacity-85" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Top: Editorial Closing Statement */}
        <div className="mb-12">
          <p className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-text/90 tracking-tight text-balance">
            {closingText}
          </p>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border/70">
          {/* Identity & Direct Contact (Col 1-5) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <SKMonogram />
              <div>
                <h3 className="font-display font-bold text-xl text-text leading-tight">
                  Shrikant Subhash Kudale
                </h3>
                <span className="text-xs font-meta text-accent">
                  {persona === 'tech' ? 'AI & Analytics Engineer' : 'Cognitive Science Researcher'}
                </span>
              </div>
            </div>

            <p className="text-sm text-muted max-w-md leading-relaxed">
              {persona === 'tech'
                ? 'Engineering real-time edge intelligence on single-board computers, published neural Transformers, and full-lifecycle data pipelines.'
                : 'Investigating the cognitive trade-offs of artificial intelligence reliance, spatial memory retention, and mental workload.'}
            </p>

            <div className="pt-2">
              <span className="text-xs font-meta uppercase tracking-wider text-muted/80 block mb-2">
                Connect Directly
              </span>
              <ContactStrip />
            </div>

            <div className="text-xs font-meta text-muted space-y-1.5 pt-2">
              <p>
                <span className="text-muted/70">Direct Email: </span>
                <a
                  href={`mailto:${profile.email}`}
                  onClick={handleLinkClick}
                  className="text-text hover:text-accent font-medium underline transition-colors"
                >
                  {profile.email}
                </a>
              </p>
              <p>
                <span className="text-muted/70">Phone / WhatsApp: </span>
                <a
                  href={`tel:${profile.phone}`}
                  onClick={handleLinkClick}
                  className="text-text hover:text-accent transition-colors"
                >
                  {profile.phone}
                </a>
              </p>
              <p>
                <span className="text-muted/70">Location: </span>
                <span className="text-text">{profile.location}</span>
              </p>
            </div>
          </div>

          {/* Navigation Sitemap (Col 6-8) */}
          <div className="md:col-span-4">
            <span className="text-xs font-meta uppercase tracking-wider text-muted/80 block mb-4">
              Sitemap · {persona === 'tech' ? 'Technical Stream' : 'Psychology Archives'}
            </span>
            <div className="grid grid-cols-2 gap-2 text-sm font-meta">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className="text-muted hover:text-text transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal and Metadata (Col 9-12) */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-meta uppercase tracking-wider text-muted/80 block mb-4">
                Protocols & IP
              </span>
              <ul className="space-y-2 text-xs font-meta text-muted">
                <li>
                  <Link
                    to="/privacy"
                    onClick={handleLinkClick}
                    className="hover:text-text transition-colors"
                  >
                    Privacy Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    onClick={handleLinkClick}
                    className="hover:text-text transition-colors"
                  >
                    Intellectual Property & Terms
                  </Link>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <span className="text-xs font-meta text-muted/60 block">
                Dual Persona Portfolio Architecture
              </span>
              <span className="text-xs font-meta text-thread font-medium">
                Signal & Memory · Pune, India
              </span>
            </div>
          </div>
        </div>

        {/* Custom Proprietary & Copyright Notice (Prominent Warning) */}
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-surface-2/60 border border-border/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs font-meta text-muted leading-relaxed">
              <span className="font-bold text-thread uppercase tracking-wider block sm:inline sm:mr-2">
                Proprietary & Copyright Notice:
              </span>
              All content, experimental research, neural architectures, psychometric analyses, and source code are the proprietary intellectual property of <strong className="text-text font-semibold">Shrikant Subhash Kudale</strong> (Govt. of India Copyright Certificate No. <span className="font-mono text-accent">LD-20250172223</span>). Unauthorized reproduction, redistribution, or automated web scraping without written consent is strictly prohibited.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-meta text-muted">
          <p>© 2026 Shrikant Subhash Kudale. All rights reserved.</p>
          <p className="text-muted/70">
            Primary Contact: <a href={`mailto:${profile.email}`} className="text-accent hover:underline">{profile.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
