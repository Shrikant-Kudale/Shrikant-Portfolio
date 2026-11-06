import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description?: string;
  persona?: 'tech' | 'psychology';
  folio?: string;
}

export function Seo({
  title,
  description = 'Dual-persona portfolio of Shrikant Subhash Kudale: AI & Analytics Engineer and Cognitive Science Researcher.',
  folio
}: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} · Shrikant Subhash Kudale`;
    document.title = fullTitle;

    // Update meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }
  }, [title, description, folio]);

  return null;
}
