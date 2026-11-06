/**
 * Image configuration and transformation helper
 * Global 4:3 ratio rule
 */

export const IMAGE_RATIO = 4 / 3;
export const IMAGE_RATIO_STRING = "4:3";

export interface ImageKitTransformOptions {
  width?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
}

/**
 * Builds ImageKit transformation URL respecting the strict 4:3 ratio
 */
export function buildImageKitUrl(baseUrl: string, options: ImageKitTransformOptions = {}): string {
  if (!baseUrl) return '';
  const { width = 800, quality = 80, format = 'auto' } = options;

  // If already an ImageKit URL, inject transformation
  if (baseUrl.includes('ik.imagekit.io')) {
    const tr = `tr=w-${width},ar-4-3,fo-auto,q-${quality},f-${format}`;
    if (baseUrl.includes('?')) {
      return `${baseUrl}&${tr}`;
    }
    return `${baseUrl}?${tr}`;
  }

  return baseUrl;
}

/**
 * Generates an elegant, theme-aware inline SVG 4:3 placeholder
 * avoiding external broken URL dependencies
 */
export function getPlaceholderSvg(
  label: string = 'Image coming soon',
  persona: 'tech' | 'psychology' = 'tech'
): string {
  const isTech = persona === 'tech';
  const bg = isTech ? '#16213A' : '#F2E8DB';
  const stroke = isTech ? '#2B3C61' : '#E2D3BF';
  const text = isTech ? '#9AA9C4' : '#6B7280';
  const accent = isTech ? '#5B9BFF' : '#C86D51';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <rect width="800" height="600" fill="${bg}" />
    <rect x="20" y="20" width="760" height="560" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="6 6" rx="8" />
    <circle cx="400" cy="270" r="36" fill="none" stroke="${accent}" stroke-width="2" opacity="0.4" />
    <path d="M380 270 L420 270 M400 250 L400 290" stroke="${accent}" stroke-width="2" opacity="0.6" />
    <text x="400" y="340" fill="${text}" font-family="system-ui, sans-serif" font-size="18" font-weight="500" text-anchor="middle" letter-spacing="0.05em">
      ${label}
    </text>
    <text x="400" y="370" fill="${stroke}" font-family="monospace" font-size="12" text-anchor="middle" letter-spacing="0.1em">
      4:3 LANDSCAPE
    </text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
