import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getPsychologyWellness } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { TurnThePage } from '../../components/shell/TurnThePage';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { SparklesIcon, DownloadIcon, CheckIcon } from '../../components/icons';
import { soundEngine } from '../../lib/audio';

interface PsychWellnessProps {
  onNavigateCounterpart: (path: string) => void;
}

export default function PsychWellness({ onNavigateCounterpart }: PsychWellnessProps) {
  const wellness = getPsychologyWellness();
  const [activeActivityId, setActiveActivityId] = useState('breathing');

  const tabs = wellness.activities.map((a) => ({
    id: a.id,
    label: a.title
  }));

  const currentActivity = wellness.activities.find((a) => a.id === activeActivityId) || wellness.activities[0];

  // 1. BREATHING GUIDE STATE
  const [breathPattern, setBreathPattern] = useState<'box' | 'relax' | 'coherent'>('box');
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold Post'>('Inhale');
  const [breathCountdown, setBreathCountdown] = useState(4);
  const [isBreathingRunning, setIsBreathingRunning] = useState(true);

  useEffect(() => {
    if (!isBreathingRunning || activeActivityId !== 'breathing') return;

    const timer = setInterval(() => {
      setBreathCountdown((prev) => {
        if (prev > 1) return prev - 1;

        // Advance phase based on pattern
        if (breathPattern === 'box') {
          // 4-4-4-4
          if (breathPhase === 'Inhale') { setBreathPhase('Hold'); return 4; }
          if (breathPhase === 'Hold') { setBreathPhase('Exhale'); return 4; }
          if (breathPhase === 'Exhale') { setBreathPhase('Hold Post'); return 4; }
          setBreathPhase('Inhale'); return 4;
        } else if (breathPattern === 'relax') {
          // 4-7-8
          if (breathPhase === 'Inhale') { setBreathPhase('Hold'); return 7; }
          if (breathPhase === 'Hold') { setBreathPhase('Exhale'); return 8; }
          setBreathPhase('Inhale'); return 4;
        } else {
          // Coherent 5-5
          if (breathPhase === 'Inhale') { setBreathPhase('Exhale'); return 5; }
          setBreathPhase('Inhale'); return 5;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingRunning, breathPhase, breathPattern, activeActivityId]);

  // 2. MEMORY MATCH STATE
  const [cardGridSize, setCardGridSize] = useState<6 | 12 | 16>(6);
  const [cards, setCards] = useState<Array<{ id: number; symbol: string; flipped: boolean; matched: boolean }>>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchTurns, setMatchTurns] = useState(0);

  const initCards = (size: 6 | 12 | 16) => {
    const symbols = ['✦', '◆', '●', '▲', '★', '✿', '☾', '☀'];
    const pairCount = size / 2;
    const selected = symbols.slice(0, pairCount);
    const deck = [...selected, ...selected]
      .sort(() => Math.random() - 0.5)
      .map((symbol, idx) => ({ id: idx, symbol, flipped: false, matched: false }));
    setCards(deck);
    setFlippedIndices([]);
    setMatchTurns(0);
  };

  useEffect(() => {
    if (activeActivityId === 'memory-match') {
      initCards(cardGridSize);
    }
  }, [cardGridSize, activeActivityId]);

  const handleCardClick = (idx: number) => {
    if (cards[idx].flipped || cards[idx].matched || flippedIndices.length >= 2) return;
    soundEngine.playTick();

    const newCards = [...cards];
    newCards[idx].flipped = true;
    const newFlipped = [...flippedIndices, idx];
    setCards(newCards);
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMatchTurns((t) => t + 1);
      const [first, second] = newFlipped;
      if (newCards[first].symbol === newCards[second].symbol) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards(newCards);
          setFlippedIndices([]);
        }, 700);
      }
    }
  };

  // 3. STROOP TEST STATE
  const [stroopRound, setStroopRound] = useState(0);
  const [stroopWord, setStroopWord] = useState('GREEN');
  const [stroopColor, setStroopColor] = useState('#EF4444'); // Red ink
  const [stroopScore, setStroopScore] = useState({ correct: 0, total: 0 });
  const [stroopStartTime, setStroopStartTime] = useState(0);
  const [stroopLatencies, setStroopLatencies] = useState<number[]>([]);

  const colorOptions = [
    { name: 'RED', hex: '#EF4444' },
    { name: 'GREEN', hex: '#10B981' },
    { name: 'BLUE', hex: '#3B82F6' },
    { name: 'AMBER', hex: '#F59E0B' }
  ];

  const nextStroopRound = () => {
    const wordOpt = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const colorOpt = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    setStroopWord(wordOpt.name);
    setStroopColor(colorOpt.hex);
    setStroopStartTime(Date.now());
  };

  const handleStroopAnswer = (selectedHex: string) => {
    soundEngine.playTick();
    const isCorrect = selectedHex === stroopColor;
    const latency = Date.now() - stroopStartTime;
    setStroopLatencies((prev) => [...prev, latency]);
    setStroopScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    setStroopRound((r) => r + 1);
    if (stroopRound < 9) {
      nextStroopRound();
    }
  };

  // 4. REACTION TIMER STATE
  const [reactionState, setReactionState] = useState<'idle' | 'waiting' | 'ready' | 'result' | 'early'>('idle');
  const [reactionStart, setReactionStart] = useState(0);
  const [reactionMs, setReactionMs] = useState(0);
  const [reactionAttempts, setReactionAttempts] = useState<number[]>([]);
  const reactionTimerRef = useRef<number | null>(null);

  const startReactionTest = () => {
    soundEngine.playTick();
    setReactionState('waiting');
    const delay = Math.random() * 2500 + 1500;
    reactionTimerRef.current = window.setTimeout(() => {
      setReactionState('ready');
      setReactionStart(Date.now());
    }, delay);
  };

  const handleReactionClick = () => {
    if (reactionState === 'waiting') {
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
      setReactionState('early');
    } else if (reactionState === 'ready') {
      const ms = Date.now() - reactionStart;
      setReactionMs(ms);
      setReactionAttempts((prev) => [...prev.slice(-4), ms]);
      setReactionState('result');
      soundEngine.playTick();
    }
  };

  // 5. GRATITUDE JOURNAL STATE
  const [journalText, setJournalText] = useState('');
  const [journalEntries, setJournalEntries] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('sk_wellness_journal');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveJournal = () => {
    if (!journalText.trim()) return;
    soundEngine.playTick();
    const updated = [journalText.trim(), ...journalEntries];
    setJournalEntries(updated);
    setJournalText('');
    localStorage.setItem('sk_wellness_journal', JSON.stringify(updated));
  };

  const deleteJournal = (index: number) => {
    soundEngine.playTick();
    const updated = journalEntries.filter((_, i) => i !== index);
    setJournalEntries(updated);
    localStorage.setItem('sk_wellness_journal', JSON.stringify(updated));
  };

  // 6. VISUAL ILLUSIONS STATE
  const [illusionGuide, setIllusionGuide] = useState(false);

  // 7. MOOD REFLECTION (Affect Labelling)
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const moodList = [
    { word: 'Energized', note: 'High physiological alertness. Harness this clarity for complex architectural synthesis.' },
    { word: 'Curious', note: 'Heightened dopaminergic exploration. Optimal state for learning novel paradigms.' },
    { word: 'Thoughtful', note: 'Contemplative reflective integration. Fosters deep semantic memory consolidation.' },
    { word: 'Serene', note: 'Parasympathetic vagal dominance. The mind is settled and receptive.' },
    { word: 'Restless', note: 'Unfocused motor arousal. A brief physical walk helps recalibrate attention.' },
    { word: 'Overwhelmed', note: 'Working memory capacity nearing saturation. Practice 3 minutes of Box Breathing.' },
    { word: 'Grateful', note: 'Broaden-and-build affective activation. Counteracts biological negativity bias.' },
    { word: 'Determined', note: 'Goal-directed perseverance (grit). Focus single-mindedly on the next immediate step.' }
  ];

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Wellness & Perception Lab"
        description="Seven interactive psychometric tools: Stroop test, breathing regulation, reaction timing, and visual illusions."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            MEMORY / 06 / WELLNESS LAB
          </span>
        </div>

        {/* Permanent Non-Medical Disclaimer Banner (Section 9.8) */}
        <div className="p-4 bg-surface-2 border border-border/80 rounded-2xl mb-8 flex items-center justify-between gap-4 text-xs font-meta text-muted">
          <span>{wellness.disclaimer}</span>
          <span className="text-accent font-semibold shrink-0">Client-Side Only</span>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-3">
            Wellness & Perception Lab
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl font-body">
            Seven interactive behavioral experiments translating cognitive science and psychometrics into self-reflection.
          </p>
        </div>

        {/* Activities Tabs */}
        <div className="mb-10">
          <Tabs tabs={tabs} activeId={activeActivityId} onChange={(id) => setActiveActivityId(id)} />
        </div>

        {/* ACTIVE ACTIVITY INTERACTIVE STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Interactive Tool Canvas (7 cols) */}
          <div className="lg:col-span-7 p-8 bg-surface border border-border rounded-3xl min-h-[460px] flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* 1. BREATHING GUIDE */}
            {activeActivityId === 'breathing' && (
              <div className="flex flex-col items-center justify-center w-full py-6">
                <div className="flex items-center gap-2 mb-8">
                  {(['box', 'relax', 'coherent'] as const).map((pat) => (
                    <button
                      key={pat}
                      onClick={() => {
                        soundEngine.playTick();
                        setBreathPattern(pat);
                        setBreathPhase('Inhale');
                        setBreathCountdown(pat === 'coherent' ? 5 : 4);
                      }}
                      className={`px-3 py-1 text-xs font-meta rounded-lg capitalize transition-colors ${
                        breathPattern === pat ? 'bg-accent text-white font-semibold' : 'bg-surface-2 text-muted'
                      }`}
                    >
                      {pat === 'box' ? 'Box (4-4-4-4)' : pat === 'relax' ? 'Relax (4-7-8)' : 'Coherent (5-5)'}
                    </button>
                  ))}
                </div>

                {/* Animated Breathing Orb */}
                <div className="relative flex items-center justify-center my-6">
                  <div
                    className={`w-48 h-48 rounded-full border-2 border-accent-2/60 bg-accent-2/20 flex flex-col items-center justify-center transition-all ease-in-out ${
                      breathPhase === 'Inhale'
                        ? 'scale-125 duration-4000'
                        : breathPhase === 'Exhale'
                        ? 'scale-75 duration-4000'
                        : 'scale-100 duration-1000'
                    }`}
                  >
                    <span className="text-2xl font-display font-bold text-text">
                      {breathPhase}
                    </span>
                    <span className="text-4xl font-display font-extrabold text-accent-2 mt-1 tabular-nums">
                      {breathCountdown}s
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <button
                    onClick={() => setIsBreathingRunning(!isBreathingRunning)}
                    className="px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface border border-border text-xs font-meta uppercase tracking-wider font-semibold"
                  >
                    {isBreathingRunning ? 'Pause Cycle' : 'Resume Cycle'}
                  </button>
                </div>
              </div>
            )}

            {/* 2. MEMORY MATCH */}
            {activeActivityId === 'memory-match' && (
              <div className="w-full flex flex-col items-center py-4">
                <div className="flex items-center justify-between w-full max-w-md mb-6">
                  <div className="flex gap-2">
                    {([6, 12, 16] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setCardGridSize(sz)}
                        className={`px-3 py-1 text-xs font-meta rounded ${
                          cardGridSize === sz ? 'bg-accent text-white' : 'bg-surface-2 text-muted'
                        }`}
                      >
                        {sz} Cards
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-meta text-muted">Turns: {matchTurns}</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-md w-full">
                  {cards.map((card, idx) => (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(idx)}
                      className={`h-20 rounded-xl text-2xl font-bold flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        card.flipped || card.matched
                          ? 'bg-accent/20 border-accent text-accent border-2 rotate-y-180'
                          : 'bg-surface-2 hover:bg-surface-2/80 border border-border text-transparent'
                      }`}
                    >
                      {(card.flipped || card.matched) && card.symbol}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => initCards(cardGridSize)}
                  className="mt-6 text-xs font-meta text-accent hover:underline"
                >
                  Reset Cards
                </button>
              </div>
            )}

            {/* 3. STROOP TEST */}
            {activeActivityId === 'stroop-test' && (
              <div className="w-full flex flex-col items-center py-6">
                {stroopRound < 10 ? (
                  <>
                    <span className="text-xs font-meta text-muted mb-4">
                      Round {stroopRound + 1} of 10 · Identify the INK COLOR
                    </span>

                    <div className="my-8">
                      <span
                        className="text-5xl sm:text-6xl font-display font-extrabold tracking-wider select-none"
                        style={{ color: stroopColor }}
                      >
                        {stroopWord}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md w-full">
                      {colorOptions.map((opt) => (
                        <button
                          key={opt.name}
                          onClick={() => handleStroopAnswer(opt.hex)}
                          className="py-3 px-4 rounded-xl bg-surface-2 border border-border hover:border-accent text-xs font-meta font-bold uppercase transition-colors"
                        >
                          {opt.name}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-display font-bold text-text">Test Completed</h3>
                    <p className="text-base font-meta text-accent">
                      Accuracy: {stroopScore.correct} / 10 ({((stroopScore.correct / 10) * 100).toFixed(0)}%)
                    </p>
                    <p className="text-xs text-muted">
                      Mean Latency: {(stroopLatencies.reduce((a, b) => a + b, 0) / 10).toFixed(0)}ms
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setStroopRound(0);
                        setStroopScore({ correct: 0, total: 0 });
                        setStroopLatencies([]);
                        nextStroopRound();
                      }}
                    >
                      Retake Stroop Test
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* 4. REACTION TIMER */}
            {activeActivityId === 'reaction-timer' && (
              <div
                onClick={reactionState !== 'idle' ? handleReactionClick : undefined}
                className={`w-full h-80 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors select-none ${
                  reactionState === 'waiting'
                    ? 'bg-rose-950/40 border-2 border-rose-800'
                    : reactionState === 'ready'
                    ? 'bg-emerald-600 text-white animate-pulse'
                    : 'bg-surface-2 border border-border'
                }`}
              >
                {reactionState === 'idle' && (
                  <div>
                    <h3 className="text-2xl font-display font-bold text-text mb-2">Reaction Benchmark</h3>
                    <p className="text-xs text-muted mb-4">Click to begin, then click instantly when the canvas turns green.</p>
                    <Button variant="primary" onClick={startReactionTest}>Start Test</Button>
                  </div>
                )}

                {reactionState === 'waiting' && (
                  <span className="text-xl font-display font-bold text-rose-400">
                    Wait for green...
                  </span>
                )}

                {reactionState === 'ready' && (
                  <span className="text-3xl font-display font-extrabold text-white">
                    CLICK NOW!
                  </span>
                )}

                {reactionState === 'early' && (
                  <div>
                    <span className="text-xl font-display font-bold text-rose-400 block mb-2">Too Early!</span>
                    <p className="text-xs text-muted mb-4">You reacted before the stimulus appeared.</p>
                    <Button variant="secondary" onClick={startReactionTest}>Try Again</Button>
                  </div>
                )}

                {reactionState === 'result' && (
                  <div>
                    <span className="text-5xl font-display font-extrabold text-accent tabular-nums block mb-1">
                      {reactionMs} ms
                    </span>
                    <span className="text-xs font-meta text-muted block mb-4">
                      Sensorimotor Afferent Latency
                    </span>
                    <Button variant="primary" onClick={startReactionTest}>Test Again</Button>
                  </div>
                )}
              </div>
            )}

            {/* 5. GRATITUDE JOURNAL */}
            {activeActivityId === 'journal' && (
              <div className="w-full flex flex-col text-left py-2">
                <span className="text-xs font-meta uppercase text-muted mb-2">Private Browser Journal</span>
                <textarea
                  rows={3}
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="Record an observation, gratitude anchor, or reflection..."
                  className="w-full p-3 rounded-xl bg-surface-2 border border-border text-xs sm:text-sm text-text focus:outline-none focus:border-accent mb-3"
                />
                <Button variant="primary" size="sm" onClick={saveJournal}>Save Entry</Button>

                <div className="mt-6 space-y-2 max-h-48 overflow-y-auto">
                  {journalEntries.map((ent, i) => (
                    <div key={i} className="p-3 bg-surface-2/60 border border-border/80 rounded-xl flex items-center justify-between text-xs">
                      <span>{ent}</span>
                      <button onClick={() => deleteJournal(i)} className="text-muted hover:text-rose-400 ml-2">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. VISUAL ILLUSION GALLERY */}
            {activeActivityId === 'illusions' && (
              <div className="w-full flex flex-col items-center py-4">
                <div className="flex items-center justify-between w-full max-w-md mb-6">
                  <span className="text-xs font-meta text-muted">Müller-Lyer Illusion</span>
                  <button
                    onClick={() => setIllusionGuide(!illusionGuide)}
                    className="text-xs font-meta text-accent hover:underline cursor-pointer"
                  >
                    {illusionGuide ? 'Hide Guides' : 'Reveal Guides (Proof)'}
                  </button>
                </div>

                <svg width="340" height="140" viewBox="0 0 340 140" className="overflow-visible">
                  {/* Top Line with outward fins */}
                  <line x1="70" y1="40" x2="270" y2="40" stroke="var(--text)" strokeWidth="2.5" />
                  <line x1="70" y1="40" x2="50" y2="25" stroke="var(--text)" strokeWidth="2.5" />
                  <line x1="70" y1="40" x2="50" y2="55" stroke="var(--text)" strokeWidth="2.5" />
                  <line x1="270" y1="40" x2="290" y2="25" stroke="var(--text)" strokeWidth="2.5" />
                  <line x1="270" y1="40" x2="290" y2="55" stroke="var(--text)" strokeWidth="2.5" />

                  {/* Bottom Line with inward fins (appears shorter, but identical!) */}
                  <line x1="70" y1="100" x2="270" y2="100" stroke="var(--text)" strokeWidth="2.5" />
                  <line x1="70" y1="100" x2="90" y2="85" stroke="var(--text)" strokeWidth="2.5" />
                  <line x1="70" y1="100" x2="90" y2="115" stroke="var(--text)" strokeWidth="2.5" />
                  <line x1="270" y1="100" x2="250" y2="85" stroke="var(--text)" strokeWidth="2.5" />
                  <line x1="270" y1="100" x2="250" y2="115" stroke="var(--text)" strokeWidth="2.5" />

                  {/* Red Alignment Guides */}
                  {illusionGuide && (
                    <>
                      <line x1="70" y1="20" x2="70" y2="120" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="270" y1="20" x2="270" y2="120" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" />
                    </>
                  )}
                </svg>
                <p className="text-xs text-muted mt-4">Both shaft lines are exactly 200 pixels long.</p>
              </div>
            )}

            {/* 7. MOOD REFLECTION (Affect Labelling) */}
            {activeActivityId === 'mood' && (
              <div className="w-full flex flex-col items-center py-4">
                <span className="text-xs font-meta text-muted mb-4">Select the descriptor closest to your current feeling</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md w-full mb-6">
                  {moodList.map((m) => (
                    <button
                      key={m.word}
                      onClick={() => {
                        soundEngine.playTick();
                        setSelectedMood(m.word);
                      }}
                      className={`p-3 rounded-xl border text-xs font-meta uppercase font-bold transition-all cursor-pointer ${
                        selectedMood === m.word
                          ? 'bg-accent text-white border-accent'
                          : 'bg-surface-2 border-border text-text hover:border-accent'
                      }`}
                    >
                      {m.word}
                    </button>
                  ))}
                </div>

                {selectedMood && (
                  <div className="p-4 bg-surface-2 border border-border rounded-xl max-w-md text-xs leading-relaxed font-body animate-in fade-in">
                    <strong className="text-accent font-meta uppercase block mb-1">{selectedMood}:</strong>
                    <span>{moodList.find((m) => m.word === selectedMood)?.note}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Activity Three Info Sections (5 cols, Section 9.8) */}
          <div className="lg:col-span-5 p-8 bg-surface border border-border rounded-3xl space-y-6">
            <div>
              <span className="text-xs font-meta uppercase tracking-widest text-accent font-bold block mb-1">
                Activity Blueprint
              </span>
              <h3 className="text-2xl font-display font-bold text-text">
                {currentActivity.title}
              </h3>
              <p className="text-xs font-meta text-muted mt-1">{currentActivity.tagline}</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm font-body leading-relaxed">
              <div className="p-4 bg-surface-2 border border-border/80 rounded-xl">
                <h4 className="text-xs font-meta uppercase tracking-wider text-accent font-bold mb-1">
                  1. How To Use
                </h4>
                <p className="text-muted">{currentActivity.howToUse}</p>
              </div>

              <div className="p-4 bg-surface-2 border border-border/80 rounded-xl">
                <h4 className="text-xs font-meta uppercase tracking-wider text-accent font-bold mb-1">
                  2. What It Measures in Psychology
                </h4>
                <p className="text-muted">{currentActivity.whatItMeasures}</p>
              </div>

              <div className="p-4 bg-surface-2 border border-border/80 rounded-xl">
                <h4 className="text-xs font-meta uppercase tracking-wider text-accent font-bold mb-2">
                  3. Related Concepts in Universe
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentActivity.relatedConcepts.map((c) => (
                    <Link
                      key={c.id}
                      to="/psychology/concepts"
                      className="px-2.5 py-1 rounded bg-surface border border-border text-accent text-xs font-meta hover:underline"
                    >
                      {c.name} ↗
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Turn the Page bridge block */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
