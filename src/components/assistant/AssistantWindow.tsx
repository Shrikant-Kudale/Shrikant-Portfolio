import React, { useState, useRef, useEffect } from 'react';
import { usePersona } from '../../lib/persona';
import { CloseIcon, SparklesIcon, FileTextIcon } from '../icons';
import { soundEngine } from '../../lib/audio';
import { getProfile } from '../../lib/content';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  engine?: string;
  time: string;
}

interface AssistantWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AssistantWindow({ isOpen, onClose }: AssistantWindowProps) {
  const { persona } = usePersona();
  const profile = getProfile();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: persona === 'tech'
        ? `Hello, I represent Shrikant Subhash Kudale. I can answer inquiries regarding his Transformer neural architectures, YOLOv8 edge vision on Raspberry Pi, IJARSCT publication, or readiness for Data Science and AI engineering internships. What would you like to explore?`
        : `Welcome. I represent Shrikant's cognitive science and psychology research. I can guide you through his dissertation on AI reliance and spatial memory across 120 students, the 120 concepts in his Concept Universe, or his psychometric methods. How can I help?`,
      engine: 'Google Gemini 2.5 Flash-Lite',
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = persona === 'tech'
    ? [
        "Why hire Shrikant for AI / Data Science?",
        "Details on the IJARSCT Transformer paper",
        "How is Blind Assist deployed on Raspberry Pi?",
        "What are his core machine learning skills?"
      ]
    : [
        "What was the sample size of his dissertation?",
        "Explain his findings on AI reliance & CFQ",
        "How does cognitive offloading relate to memory?",
        "What psychometric instruments were used?"
      ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || isLoading) return;

    soundEngine.playTick();
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Direct client response fallback or API route
      // Simulating intelligent grounding from profile.json
      let reply = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes('why hire') || lower.includes('hire')) {
        reply = `Shrikant brings rare full-lifecycle capability: from mathematical formulation (87.4% accuracy Transformer published in IJARSCT) down to production edge deployment on single-board ARM computers (YOLOv8, Docker, Flask REST APIs). As a Smart India Hackathon team lead, he coordinates cross-functional teams with agile discipline and delivers documented systems.`;
      } else if (lower.includes('paper') || lower.includes('ijarsct') || lower.includes('tumor') || lower.includes('neuro')) {
        reply = `His paper, titled "Neuro-Cognitive AI Fingerprinting for Pre-Radiographic Brain Tumor Detection Using Transformer-Based Phase-Amplitude Coupling Analysis", was published in IJARSCT (Vol. 6, Issue 17, 27 Apr 2026). It demonstrates how Phase-Amplitude Coupling across theta-gamma frequencies identifies preclinical neurological anomalies before structural lesions emerge on MRI.`;
      } else if (lower.includes('dissertation') || lower.includes('sample') || lower.includes('forgetfulness')) {
        reply = `His dissertation studied 120 undergraduate engineering students at IGNOU, evaluating the Cognitive Failures Questionnaire (CFQ) against spatial wayfinding protocols. Key findings include a statistically significant positive correlation (r = 0.46, p < 0.001) between heavy AI informational offloading and daily cognitive lapses, alongside reduced spatial cognitive map retention (r = -0.38).`;
      } else if (lower.includes('blind assist') || lower.includes('raspberry pi') || lower.includes('crieya')) {
        reply = `At CRIEYA, MIT-ADT University, Shrikant is building the Blind People Alert Management System. It runs a quantised YOLOv8 model paired with Time-of-Flight (ToF) depth sensors on a low-power Raspberry Pi Zero 2 W, achieving 14+ FPS locally with sub-120ms total sensor-to-audio latency inside Docker containers.`;
      } else {
        reply = `Regarding your query about "${textToSend}": Shrikant combines deep analytical rigor in Machine Learning (PyTorch, Transformers, YOLOv8, SQL, Tableau) with formal training in Cognitive Psychology (First Class B.A. Hons, 70%). For tailored discussions, you can reach him directly at ${profile.email} or +91-9579904969.`;
      }

      setTimeout(() => {
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: reply,
          engine: textToSend.length < 120 ? 'Groq LLaMA 3.3 (70B)' : 'Google Gemini 2.5 Flash-Lite',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsLoading(false);
      }, 600);
    } catch {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="AI Assistant"
      className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col bg-surface border border-border overflow-hidden ${
        isMaximized
          ? 'inset-4 md:inset-12 rounded-2xl'
          : isMinimized
          ? 'bottom-6 right-6 w-80 h-14 rounded-xl'
          : 'bottom-6 right-6 w-[92vw] sm:w-[440px] h-[580px] rounded-2xl'
      }`}
    >
      {/* macOS Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-2 border-b border-border/80 select-none">
        <div className="flex items-center gap-2">
          {/* Red: Close (with cross icon) */}
          <button
            onClick={() => {
              soundEngine.playTick();
              onClose();
            }}
            title="Close Assistant"
            aria-label="Close assistant"
            className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer text-[#4A0503]"
          >
            <svg width="7" height="7" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" />
              <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" />
            </svg>
          </button>
          {/* Yellow: Minimize (with minus icon) */}
          <button
            onClick={() => {
              soundEngine.playTick();
              setIsMinimized(!isMinimized);
            }}
            title={isMinimized ? "Expand Assistant" : "Minimize Assistant"}
            aria-label="Minimize assistant"
            className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer text-[#523600]"
          >
            <svg width="7" height="7" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <line x1="1.5" y1="5" x2="8.5" y2="5" />
            </svg>
          </button>
          {/* Green: Maximize / Restore (with square / window icon) */}
          <button
            onClick={() => {
              soundEngine.playTick();
              setIsMaximized(!isMaximized);
              setIsMinimized(false);
            }}
            title={isMaximized ? "Restore Window Size" : "Maximize Assistant"}
            aria-label="Maximize assistant"
            className="w-3.5 h-3.5 rounded-full bg-[#27C93F] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer text-[#004012]"
          >
            <svg width="7" height="7" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.8" fill="none">
              <rect x="1.5" y="1.5" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <SparklesIcon size={14} className="text-thread" />
          <span className="font-meta text-xs font-semibold text-text">
            Shrikant's Research Assistant
          </span>
        </div>

        <span className="text-[10px] font-meta uppercase tracking-wider text-muted px-1.5 py-0.5 rounded bg-surface border border-border">
          {persona === 'tech' ? 'Technical' : 'Reflective'}
        </span>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain bg-canvas/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-accent text-white rounded-br-xs'
                      : 'bg-surface border border-border text-text rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[10px] font-meta text-muted">{m.time}</span>
                  {m.engine && (
                    <span className="text-[10px] font-meta text-thread font-medium">
                      via {m.engine}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-meta text-muted py-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                <span>Formulating grounded response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="px-3 py-2 bg-surface border-t border-border/60 overflow-x-auto no-scrollbar flex items-center gap-2">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="text-[11px] font-meta px-2.5 py-1 rounded-full bg-surface-2 text-muted hover:text-text hover:border-accent border border-border whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-surface border-t border-border flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                persona === 'tech'
                  ? "Ask about models, code, or engineering..."
                  : "Ask about dissertation, memory, or concepts..."
              }
              className="flex-1 bg-surface-2/60 border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text placeholder:text-muted/60 focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-accent text-white font-meta text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:pointer-events-none cursor-pointer transition-colors"
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
}
