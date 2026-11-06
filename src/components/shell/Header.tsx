import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { usePersona } from '../../lib/persona';
import { getSiteConfig } from '../../lib/content';
import { SKMonogram, SparklesIcon, MenuIcon } from '../icons';
import { PersonaToggle } from './PersonaToggle';
import { ThemeToggle } from './ThemeToggle';
import { SoundToggle } from './SoundToggle';
import { Drawer } from './Drawer';
import { soundEngine } from '../../lib/audio';

interface HeaderProps {
  onTogglePersona: (target: 'tech' | 'psychology') => void;
  onOpenAssistant: () => void;
}

export function Header({ onTogglePersona, onOpenAssistant }: HeaderProps) {
  const { persona } = usePersona();
  const location = useLocation();
  const site = getSiteConfig();
  const navItems = site.nav[persona] || [];

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        const progress = Math.min(Math.max(scrollY / winHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = () => {
    soundEngine.playTick();
  };

  const homePath = persona === 'tech' ? '/tech' : '/psychology';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-canvas/85 backdrop-blur-md border-b border-border/80 shadow-xs'
          : 'py-4 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 flex items-center justify-between gap-6">
        {/* Left Zone: Monogram & Name */}
        <Link
          to={homePath}
          onClick={handleNavClick}
          className="flex items-center gap-3 select-none shrink-0 group"
        >
          <SKMonogram className="transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-display font-bold text-base sm:text-lg text-text tracking-tight whitespace-nowrap">
              Shrikant Kudale
            </span>
            <span className="font-meta text-[10px] uppercase tracking-wider text-muted -mt-0.5 whitespace-nowrap hidden sm:block">
              {persona === 'tech' ? 'AI & Engineering' : 'Psychology & Memory'}
            </span>
          </div>
        </Link>

        {/* Center Zone: Persona Pill Toggle (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center">
          <PersonaToggle onToggleRequest={onTogglePersona} />
        </div>

        {/* Right Zone: Navigation Links & Actions */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-meta">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `relative py-1 text-xs tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 ${
                    isActive ? 'text-accent font-semibold' : 'text-muted hover:text-text'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {/* The Thread underline for active link (Section 2B.1) */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-thread rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Utility Toggles */}
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle />
            <SoundToggle />
          </div>

          {/* Ask AI Trigger Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playTick();
              onOpenAssistant();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-meta uppercase tracking-wider font-semibold rounded-lg bg-surface border border-border hover:border-accent hover:text-accent text-text transition-all duration-200 cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
          >
            <SparklesIcon size={15} className="text-thread" />
            <span>Ask AI</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playTick();
              setIsDrawerOpen(true);
            }}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 rounded-lg bg-surface border border-border text-text hover:text-accent transition-colors"
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </div>

      {/* The Thread Reading Progress Bar under the header (Section 2B.1) */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/40 overflow-hidden">
        <div
          className="h-full bg-thread transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenAssistant={onOpenAssistant}
        onTogglePersona={onTogglePersona}
      />
    </header>
  );
}
