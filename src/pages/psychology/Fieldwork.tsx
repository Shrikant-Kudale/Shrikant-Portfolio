import React, { useState } from 'react';
import { getPsychologyFieldwork } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { LazyImage } from '../../components/ui/LazyImage';
import { Modal } from '../../components/ui/Modal';
import { TurnThePage } from '../../components/shell/TurnThePage';

interface PsychFieldworkProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function PsychFieldwork({ onNavigateCounterpart }: PsychFieldworkProps) {
  const fieldwork = getPsychologyFieldwork();
  const [activePhoto, setActivePhoto] = useState<typeof fieldwork.entries[0] | null>(null);

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Fieldwork & Visual Memories"
        description="Field photographs, dissertation viva voce gallery, and community cognitive workshops."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            MEMORY / 05 / FIELDWORK
          </span>
        </div>

        <div className="mb-14">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-3">
            Fieldwork & Visual Memories
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl font-body">
            Observational field records from research trials, viva voce defense, and cognitive literacy sessions.
          </p>
        </div>

        {/* 1. MASONRY PHOTO GALLERY (Section 9.5: 4:3 photos with journal-style captions) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {fieldwork.entries.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="p-4 bg-surface border border-border hover:border-accent/60 rounded-2xl transition-all duration-300 cursor-pointer group shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="shape-pebble overflow-hidden bg-surface-2 border border-border/80 mb-4">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    fallbackLabel={item.title}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-meta text-muted mb-2">
                  <span className="text-accent font-semibold">{item.category}</span>
                  <span>{item.date}</span>
                </div>

                <h3 className="font-display font-bold text-lg text-text group-hover:text-accent transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-text/80 font-body leading-relaxed italic border-l-2 border-accent/40 pl-3">
                  "{item.caption}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border/60 text-[11px] font-meta text-muted">
                Location: {item.location}
              </div>
            </div>
          ))}
        </section>

        {/* 2. COMMUNITY WORKSHOPS */}
        <section className="mb-24">
          <div className="mb-8">
            <span className="text-xs font-meta uppercase tracking-widest text-accent block mb-1">
              Knowledge Sharing
            </span>
            <h2 className="text-3xl font-display font-bold text-text">
              Community Demonstrations & Workshops
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fieldwork.workshops.map((w, idx) => (
              <div key={idx} className="p-8 bg-surface border border-border rounded-2xl">
                <div className="flex items-center justify-between text-xs font-meta text-muted mb-2">
                  <span className="text-accent font-semibold">{w.audience}</span>
                  <span>{w.date}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-text mb-2">
                  {w.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed font-body">
                  {w.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <Modal
          isOpen={!!activePhoto}
          onClose={() => setActivePhoto(null)}
          title={activePhoto.title}
          subtitle={activePhoto.category}
        >
          <div className="space-y-4">
            <div className="shape-pebble overflow-hidden bg-surface-2 border border-border">
              <LazyImage
                src={activePhoto.image}
                alt={activePhoto.title}
                fallbackLabel={activePhoto.title}
              />
            </div>
            <p className="text-base text-text italic font-body leading-relaxed">
              "{activePhoto.caption}"
            </p>
            <p className="text-xs font-meta text-muted">
              {activePhoto.location} · {activePhoto.date}
            </p>
          </div>
        </Modal>
      )}

      {/* Turn the Page bridge block */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
