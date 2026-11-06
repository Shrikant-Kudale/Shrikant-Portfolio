import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/ui/Seo';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
      <Seo title="Page Not Found" />
      <span className="text-xs font-meta uppercase tracking-widest text-muted block mb-3">
        Error 404 · Signal Lost
      </span>
      <h1 className="text-4xl sm:text-6xl font-display font-bold text-text mb-4">
        Page Not Located
      </h1>
      <p className="text-muted max-w-md mb-8 leading-relaxed text-sm sm:text-base">
        The requested pathway does not exist within the Signal or Memory archives.
      </p>
      <div className="flex items-center gap-4">
        <Link to="/tech">
          <Button variant="primary">Return to Tech</Button>
        </Link>
        <Link to="/psychology">
          <Button variant="secondary">Return to Psychology</Button>
        </Link>
      </div>
    </div>
  );
}
