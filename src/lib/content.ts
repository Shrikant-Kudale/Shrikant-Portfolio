import profileData from '../../content/profile.json';
import siteData from '../../content/site.json';
import projectsData from '../../content/tech/projects.json';
import experienceData from '../../content/tech/experience.json';
import achievementsData from '../../content/tech/achievements.json';
import publicationsData from '../../content/tech/publications.json';
import codingData from '../../content/tech/coding.json';
import blogData from '../../content/tech/blog.json';
import dissertationData from '../../content/psychology/dissertation.json';
import methodsData from '../../content/psychology/methods.json';
import fieldworkData from '../../content/psychology/fieldwork.json';
import writingsData from '../../content/psychology/writings.json';
import conceptsData from '../../content/psychology/concepts.json';
import wellnessData from '../../content/psychology/wellness.json';

export interface Profile {
  name: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  leetcode: string;
  resumePdf: string;
  psychCvUrl: string;
  titles: {
    tech: string[];
    psychology: string[];
  };
  summary: {
    tech: string;
    psychology: string;
  };
  metrics: {
    modelAccuracy: string;
    papersPublished: string;
    copyrightsRegistered: string;
    hackathonHonors: string;
    cgpa: string;
  };
  footerClosing: {
    tech: string;
    psychology: string;
  };
  education: Array<{
    degree: string;
    institution: string;
    duration: string;
    score: string;
    badge: string;
    highlights: string;
  }>;
  skills: Array<{
    category: string;
    skills: Array<{
      name: string;
      level: 'core' | 'familiar';
    }>;
  }>;
}

export interface SiteConfig {
  siteName: string;
  domain: string;
  imageRatio: number;
  imageRatioString: string;
  featureFlags: {
    soundEnabled: boolean;
    assistantEnabled: boolean;
    wellnessLabEnabled: boolean;
    conceptUniverseEnabled: boolean;
    jdMatcherEnabled: boolean;
  };
  nav: {
    tech: Array<{ label: string; path: string; folio: string }>;
    psychology: Array<{ label: string; path: string; folio: string }>;
  };
  pagePairs: Record<string, string>;
  bridgeSentences: Record<string, { sentence: string; target: string; targetLabel: string }>;
}

export interface PipelineNode {
  id: string;
  label: string;
  sub: string;
}

export interface PipelineEdge {
  from: string;
  to: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  impact: string;
  stack: string[];
  date: string;
  featured: boolean;
  order: number;
  hidden: boolean;
  image?: string;
  icon?: string;
  humanSide?: {
    conceptId: string;
    conceptName: string;
    route: string;
  };
  links: {
    repo?: string;
    paper?: string;
    demo?: string;
    video?: string;
  };
  pipeline?: {
    nodes: PipelineNode[];
    edges: PipelineEdge[];
  };
}

export interface Concept {
  id: string;
  name: string;
  category: string;
  weight: number;
  definition: string;
  mechanism: string;
  example: string;
  theorist: string;
  year: number;
  related: string[];
  dissertation: boolean;
}

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getSiteConfig(): SiteConfig {
  return siteData as SiteConfig;
}

export function getTechProjects(): Project[] {
  return (projectsData as Project[]).filter((p) => !p.hidden);
}

export function getTechProjectBySlug(slug: string): Project | undefined {
  return (projectsData as Project[]).find((p) => p.slug === slug);
}

export function getTechExperience() {
  return experienceData;
}

export function getTechAchievements() {
  return achievementsData;
}

export function getTechPublications() {
  return publicationsData;
}

export function getTechCoding() {
  return codingData;
}

export function getTechBlog() {
  return blogData;
}

export function getPsychologyDissertation() {
  return dissertationData;
}

export function getPsychologyMethods() {
  return methodsData;
}

export function getPsychologyFieldwork() {
  return fieldworkData;
}

export function getPsychologyWritings() {
  return writingsData;
}

export function getPsychologyConcepts(): Concept[] {
  return conceptsData as Concept[];
}

export function getPsychologyWellness() {
  return wellnessData;
}

export function getBridgeSentence(path: string) {
  const norm = path.replace(/\/$/, '');
  const base = norm === '' ? '/tech' : norm;
  return siteData.bridgeSentences[base as keyof typeof siteData.bridgeSentences] || {
    sentence: "Discover the counterpart dimension of this research.",
    target: base.startsWith('/tech') ? '/psychology' : '/tech',
    targetLabel: base.startsWith('/tech') ? 'Psychology World' : 'AI & Engineering World'
  };
}

export function getPairedPath(currentPath: string): string {
  const norm = currentPath.replace(/\/$/, '') || '/tech';
  if (siteData.pagePairs[norm as keyof typeof siteData.pagePairs]) {
    return siteData.pagePairs[norm as keyof typeof siteData.pagePairs];
  }
  // Fallbacks for deep project/blog routes
  if (norm.startsWith('/tech/projects/')) return '/psychology/dissertation';
  if (norm.startsWith('/tech/blog/')) return '/psychology/writings';
  if (norm.startsWith('/psychology/writings/')) return '/tech/blog';
  return norm.startsWith('/tech') ? '/psychology' : '/tech';
}
