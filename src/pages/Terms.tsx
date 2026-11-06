import React from 'react';
import { Seo } from '../components/ui/Seo';

export default function Terms() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 pt-32 pb-24">
      <Seo title="Terms & Intellectual Property" description="Intellectual property disclosures and terms of use." />

      <div className="max-w-3xl">
        <span className="text-xs font-meta uppercase tracking-widest text-muted block mb-2">
          Documentation · Legal & IP
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text mb-8">
          Terms & Intellectual Property
        </h1>

        <div className="space-y-8 text-sm sm:text-base text-text/80 leading-relaxed">
          <section className="p-6 bg-surface border border-border rounded-xl">
            <h2 className="text-lg font-bold font-display text-text mb-2">Registered Copyright</h2>
            <p>
              "AI-Powered Expense Tracker with GUI" is protected by Registered Copyright (Certificate No. LD-20250172223)
              under the Copyright Office, Government of India. All rights reserved by Shrikant Subhash Kudale and co-inventors.
            </p>
          </section>

          <section className="p-6 bg-surface border border-border rounded-xl">
            <h2 className="text-lg font-bold font-display text-text mb-2">Academic & Research Works</h2>
            <p>
              All published journal papers (including IJARSCT Vol. 6, Issue 17) and dissertation research datasets
              are provided for academic scrutiny, educational reference, and peer collaboration. Commercial re-distribution
              or unauthorized replication without attribution is prohibited.
            </p>
          </section>

          <section className="p-6 bg-surface border border-border rounded-xl">
            <h2 className="text-lg font-bold font-display text-text mb-2">Wellness Lab Non-Medical Disclaimer</h2>
            <p>
              The activities featured in the Wellness and Perception Lab (Breathing Guide, Stroop Test, Reaction Timer,
              Affect Labelling, etc.) are educational demonstrations designed to explore cognitive psychology principles.
              They are not medical devices, diagnostic assessments, or psychotherapeutic treatments.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
