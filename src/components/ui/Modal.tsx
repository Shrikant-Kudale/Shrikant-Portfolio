import React, { useEffect, useRef } from 'react';
import { CloseIcon } from '../icons';
import { soundEngine } from '../../lib/audio';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-4xl'
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        soundEngine.playTick();
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={() => {
          soundEngine.playTick();
          onClose();
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidth} max-h-[90vh] flex flex-col bg-surface border border-border rounded-xl shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border/80 bg-surface-2/40">
          <div>
            {subtitle && (
              <span className="text-xs font-meta tracking-wider uppercase text-accent mb-1 block">
                {subtitle}
              </span>
            )}
            <h3 className="text-xl sm:text-2xl font-bold font-display text-text">
              {title}
            </h3>
          </div>
          <button
            onClick={() => {
              soundEngine.playTick();
              onClose();
            }}
            aria-label="Close dialog"
            className="p-2 text-muted hover:text-text hover:bg-surface-2 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}
