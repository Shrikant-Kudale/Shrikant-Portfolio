import React from 'react';
import { getProfile } from '../../lib/content';
import {
  GithubIcon,
  LinkedinIcon,
  EmailIcon,
  WhatsappIcon,
  LeetcodeIcon
} from '../icons';
import { soundEngine } from '../../lib/audio';

interface ContactStripProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function ContactStrip({ className = '', size = 'md' }: ContactStripProps) {
  const profile = getProfile();

  const handleLinkClick = () => {
    soundEngine.playTick();
  };

  const buttonSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 16 : 18;

  const contacts = [
    { label: 'GitHub', href: profile.github, icon: <GithubIcon size={iconSize} /> },
    { label: 'LinkedIn', href: profile.linkedin, icon: <LinkedinIcon size={iconSize} /> },
    { label: 'Email', href: `mailto:${profile.email}`, icon: <EmailIcon size={iconSize} /> },
    { label: 'WhatsApp', href: profile.whatsapp, icon: <WhatsappIcon size={iconSize} /> },
    { label: 'LeetCode', href: profile.leetcode, icon: <LeetcodeIcon size={iconSize} /> },
  ];

  return (
    <div className={`flex items-center gap-2.5 flex-wrap ${className}`}>
      {contacts.map((c) => (
        <a
          key={c.label}
          href={c.href}
          target={c.href.startsWith('mailto:') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          aria-label={c.label}
          onClick={handleLinkClick}
          className={`${buttonSize} flex items-center justify-center rounded-lg bg-surface border border-border/80 text-muted hover:text-text hover:border-accent hover:bg-surface-2 transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 active:scale-95`}
        >
          {c.icon}
        </a>
      ))}
    </div>
  );
}
