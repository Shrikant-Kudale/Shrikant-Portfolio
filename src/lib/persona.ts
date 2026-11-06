import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import React from 'react';

export type Persona = 'tech' | 'psychology';
export type Theme = 'dark' | 'light';

interface PersonaContextType {
  persona: Persona;
  setPersona: (p: Persona) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  togglePersona: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (s: boolean) => void;
  toggleSound: () => void;
}

const PersonaContext = createContext<PersonaContextType | null>(null);

const STORAGE_KEY_PERSONA = 'sk_portfolio_persona';
const STORAGE_KEY_THEME_TECH = 'sk_portfolio_theme_tech';
const STORAGE_KEY_THEME_PSYCH = 'sk_portfolio_theme_psych';
const STORAGE_KEY_SOUND = 'sk_portfolio_sound';

export function PersonaProvider({ children }: { children: ReactNode }) {
  // Initial persona from localStorage or default 'tech'
  const [persona, setPersonaState] = useState<Persona>(() => {
    if (typeof window === 'undefined') return 'tech';
    const saved = localStorage.getItem(STORAGE_KEY_PERSONA);
    if (saved === 'psychology') return 'psychology';
    return 'tech';
  });

  // Themes are remembered separately for each persona
  // Default: Tech = dark, Psychology = light
  const [techTheme, setTechTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem(STORAGE_KEY_THEME_TECH);
    return saved === 'light' ? 'light' : 'dark';
  });

  const [psychTheme, setPsychTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem(STORAGE_KEY_THEME_PSYCH);
    return saved === 'dark' ? 'dark' : 'light';
  });

  // Sound preference (off by default until user gesture)
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY_SOUND) === 'true';
  });

  const currentTheme = persona === 'tech' ? techTheme : psychTheme;

  // Apply DOM attributes
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-persona', persona);
    root.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [persona, currentTheme]);

  const setPersona = (newPersona: Persona) => {
    setPersonaState(newPersona);
    localStorage.setItem(STORAGE_KEY_PERSONA, newPersona);
  };

  const setTheme = (newTheme: Theme) => {
    if (persona === 'tech') {
      setTechTheme(newTheme);
      localStorage.setItem(STORAGE_KEY_THEME_TECH, newTheme);
    } else {
      setPsychTheme(newTheme);
      localStorage.setItem(STORAGE_KEY_THEME_PSYCH, newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const togglePersona = () => {
    setPersona(persona === 'tech' ? 'psychology' : 'tech');
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    localStorage.setItem(STORAGE_KEY_SOUND, enabled ? 'true' : 'false');
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return React.createElement(
    PersonaContext.Provider,
    {
      value: {
        persona,
        setPersona,
        theme: currentTheme,
        setTheme,
        toggleTheme,
        togglePersona,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
      },
    },
    children
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}
