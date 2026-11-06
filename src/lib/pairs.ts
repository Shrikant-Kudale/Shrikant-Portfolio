/**
 * Route pairing and counterpart mapping between Tech and Psychology personas
 */

export const ROUTE_PAIRS: Record<string, string> = {
  '/tech': '/psychology',
  '/psychology': '/tech',
  '/tech/about': '/psychology/about',
  '/psychology/about': '/tech/about',
  '/tech/projects': '/psychology/dissertation',
  '/psychology/dissertation': '/tech/projects',
  '/tech/coding': '/psychology/methods',
  '/psychology/methods': '/tech/coding',
  '/tech/experience': '/psychology/fieldwork',
  '/psychology/fieldwork': '/tech/experience',
  '/tech/hackathons': '/psychology/wellness',
  '/psychology/wellness': '/tech/hackathons',
  '/tech/blog': '/psychology/writings',
  '/psychology/writings': '/tech/blog',
  '/tech/jd-match': '/psychology',
  '/psychology/concepts': '/tech/about'
};

export function getPairedRoute(pathname: string): string {
  const clean = pathname.replace(/\/$/, '') || '/tech';
  if (ROUTE_PAIRS[clean]) {
    return ROUTE_PAIRS[clean];
  }

  // Handle dynamic project detail routes -> dissertation
  if (clean.startsWith('/tech/projects/')) {
    return '/psychology/dissertation';
  }
  // Handle dynamic blog routes -> writings
  if (clean.startsWith('/tech/blog/')) {
    return '/psychology/writings';
  }
  if (clean.startsWith('/psychology/writings/')) {
    return '/tech/blog';
  }

  return clean.startsWith('/tech') ? '/psychology' : '/tech';
}
