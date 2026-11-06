import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { PersonaProvider, usePersona } from './lib/persona';
import { getPairedRoute } from './lib/pairs';
import { soundEngine } from './lib/audio';

// Shell Components
import { Header } from './components/shell/Header';
import { Footer } from './components/shell/Footer';
import { Cursor } from './components/shell/Cursor';
import { TechBackground } from './components/shell/TechBackground';
import { PsychologyBackground } from './components/shell/PsychologyBackground';
import { PersonaTransition, TransitionDirection } from './components/shell/PersonaTransition';
import { AssistantLauncher } from './components/assistant/AssistantLauncher';
import { AssistantWindow } from './components/assistant/AssistantWindow';

// Pages
import TechHome from './pages/tech/Home';
import TechAbout from './pages/tech/About';
import TechProjects from './pages/tech/Projects';
import ProjectDetail from './pages/tech/ProjectDetail';
import TechCoding from './pages/tech/Coding';
import TechExperience from './pages/tech/Experience';
import TechHackathons from './pages/tech/Hackathons';
import TechBlog from './pages/tech/Blog';
import TechJdMatch from './pages/tech/JdMatch';

import PsychHome from './pages/psychology/Home';
import PsychAbout from './pages/psychology/About';
import PsychDissertation from './pages/psychology/Dissertation';
import PsychMethods from './pages/psychology/Methods';
import PsychFieldwork from './pages/psychology/Fieldwork';
import PsychWritings from './pages/psychology/Writings';
import PsychConcepts from './pages/psychology/Concepts';
import PsychWellness from './pages/psychology/Wellness';

import DynamicPage from './pages/DynamicPage';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { persona, setPersona } = usePersona();

  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>(null);
  const [targetPathAfterTransition, setTargetPathAfterTransition] = useState<string | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Sync persona with current URL
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/tech') && persona !== 'tech') {
      setPersona('tech');
    } else if (path.startsWith('/psychology') && persona !== 'psychology') {
      setPersona('psychology');
    }
  }, [location.pathname, persona, setPersona]);

  // Handle Persona Toggle Switch (from Header or Turn The Page)
  const handleTogglePersona = (target: 'tech' | 'psychology') => {
    if (target === persona) return;
    const direction: TransitionDirection = target === 'psychology' ? 'to-psychology' : 'to-tech';
    const counterpartPath = getPairedRoute(location.pathname);

    setTargetPathAfterTransition(counterpartPath);
    setTransitionDirection(direction);
  };

  const handleNavigateCounterpart = (counterpartPath: string) => {
    const targetPersona = counterpartPath.startsWith('/tech') ? 'tech' : 'psychology';
    if (targetPersona === persona) {
      navigate(counterpartPath);
      return;
    }
    const direction: TransitionDirection = targetPersona === 'psychology' ? 'to-psychology' : 'to-tech';
    setTargetPathAfterTransition(counterpartPath);
    setTransitionDirection(direction);
  };

  const handleTransitionMidpoint = () => {
    if (targetPathAfterTransition) {
      navigate(targetPathAfterTransition);
      const newPersona = targetPathAfterTransition.startsWith('/tech') ? 'tech' : 'psychology';
      setPersona(newPersona);
      soundEngine.setPersona(newPersona);
    }
  };

  const handleTransitionComplete = () => {
    setTransitionDirection(null);
    setTargetPathAfterTransition(null);
  };

  const isTech = persona === 'tech';

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-thread selection:text-slate-900">
      {/* Signature Transition Overlay (Section 7.3) */}
      <PersonaTransition
        direction={transitionDirection}
        onMidpoint={handleTransitionMidpoint}
        onComplete={handleTransitionComplete}
      />

      {/* Dynamic Background */}
      {isTech ? <TechBackground /> : <PsychologyBackground />}

      {/* Custom Desktop Cursor */}
      <Cursor />

      {/* Fixed Header */}
      <Header
        onTogglePersona={handleTogglePersona}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <Routes>
          {/* Root redirect to last saved persona or /tech */}
          <Route path="/" element={<Navigate to="/tech" replace />} />

          {/* AI & Engineering Pages */}
          <Route path="/tech" element={<TechHome onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/tech/about" element={<TechAbout onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/tech/projects" element={<TechProjects onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/tech/projects/:slug" element={<ProjectDetail onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/tech/coding" element={<TechCoding onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/tech/experience" element={<TechExperience onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/tech/hackathons" element={<TechHackathons onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/tech/blog" element={<TechBlog onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/tech/jd-match" element={<TechJdMatch onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/tech/:slug" element={<DynamicPage />} />

          {/* Psychology Pages */}
          <Route path="/psychology" element={<PsychHome onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/psychology/about" element={<PsychAbout onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/psychology/dissertation" element={<PsychDissertation onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/psychology/methods" element={<PsychMethods onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/psychology/fieldwork" element={<PsychFieldwork onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/psychology/writings" element={<PsychWritings onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/psychology/concepts" element={<PsychConcepts onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/psychology/wellness" element={<PsychWellness onNavigateCounterpart={handleNavigateCounterpart} />} />
          <Route path="/psychology/:slug" element={<DynamicPage />} />

          {/* Shared Legal & Auxiliary */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Shared Footer */}
      <Footer />

      {/* Intelligent Research Assistant Launcher & Modal */}
      <AssistantLauncher
        isOpen={isAssistantOpen}
        onToggle={() => setIsAssistantOpen(true)}
      />
      <AssistantWindow
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PersonaProvider>
        <AppContent />
      </PersonaProvider>
    </BrowserRouter>
  );
}
