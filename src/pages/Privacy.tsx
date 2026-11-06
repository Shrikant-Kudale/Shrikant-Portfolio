import React from 'react';
import { Seo } from '../components/ui/Seo';

export default function Privacy() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 pt-32 pb-24">
      <Seo title="Privacy Protocol" description="Strict privacy principles of Shrikant Kudale's portfolio." />
      
      <div className="max-w-3xl">
        <span className="text-xs font-meta uppercase tracking-widest text-muted block mb-2">
          Documentation · Privacy
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text mb-8">
          Privacy Protocol
        </h1>

        <div className="space-y-8 text-sm sm:text-base text-text/80 leading-relaxed">
          <section className="p-6 bg-surface border border-border rounded-xl">
            <h2 className="text-lg font-bold font-display text-text mb-2">Zero Tracking & Analytics Policy</h2>
            <p>
              This portfolio site collects zero telemetry, zero analytics scripts, and zero advertising cookies.
              No third-party trackers (Google Analytics, Hotjar, Facebook Pixel, etc.) are embedded.
            </p>
          </section>

          <section className="p-6 bg-surface border border-border rounded-xl">
            <h2 className="text-lg font-bold font-display text-text mb-2">Browser LocalStorage Usage</h2>
            <p className="mb-3">
              Only four essential user preference keys are stored locally on your device:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted">
              <li><code>sk_portfolio_persona</code>: Stores your last viewed world (AI & Tech vs Psychology).</li>
              <li><code>sk_portfolio_theme_tech</code>: Stores light/dark preference for the tech world.</li>
              <li><code>sk_portfolio_theme_psych</code>: Stores light/dark preference for the psychology world.</li>
              <li><code>sk_portfolio_sound</code>: Stores ambient sound mute toggle state.</li>
              <li><code>sk_wellness_journal</code>: Private gratitude journal notes (kept entirely in browser).</li>
            </ul>
          </section>

          <section className="p-6 bg-surface border border-border rounded-xl">
            <h2 className="text-lg font-bold font-display text-text mb-2">Assistant AI Privacy</h2>
            <p>
              Conversations submitted to the AI assistant are processed ephemerally using Groq and Google Gemini APIs
              to generate contextual answers. Inquiries are never stored in a central database or used to train public models.
            </p>
          </section>

          {/* Tiny unlabeled link for administrative access (Section 7.2 & 11) */}
          <div className="pt-8 text-right">
            <a
              href="/admin.html"
              className="text-[11px] text-muted/30 hover:text-muted/60 transition-colors select-none font-mono"
            >
              sys·auth
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
