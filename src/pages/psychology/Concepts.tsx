import React, { useState, useEffect, useRef } from 'react';
import * as d3Force from 'd3-force';
import { getPsychologyConcepts, Concept } from '../../lib/content';
import { Seo } from '../../components/ui/Seo';
import { TurnThePage } from '../../components/shell/TurnThePage';
import { SearchIcon, CloseIcon, SparklesIcon } from '../../components/icons';
import { soundEngine } from '../../lib/audio';

interface PsychConceptsProps {
  onNavigateCounterpart: (path: string) => void;
}

interface SimNode extends d3Force.SimulationNodeDatum, Concept {
  radius: number;
}

export default function PsychConcepts({ onNavigateCounterpart }: PsychConceptsProps) {
  const allConcepts = getPsychologyConcepts();
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListView, setIsListView] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simulationRef = useRef<d3Force.Simulation<SimNode, undefined> | null>(null);
  const nodesRef = useRef<SimNode[]>([]);
  const hoveredNodeRef = useRef<SimNode | null>(null);

  const categories = [
    { id: 'all', name: 'All Concepts', count: allConcepts.length },
    { id: 'Counselling Psychology', name: 'Counselling (17)', count: 17 },
    { id: 'Life and Lifespan Psychology', name: 'Lifespan & Memory (17)', count: 17 },
    { id: 'Social Psychology', name: 'Social (17)', count: 17 },
    { id: 'Workplace Psychology', name: 'Workplace (17)', count: 17 },
    { id: 'Corporate Psychology and Organizational Behaviour', name: 'Corporate & Org (17)', count: 17 },
    { id: 'Positive Psychology', name: 'Positive (17)', count: 17 },
    { id: 'Behavioural Psychology', name: 'Behavioural (18)', count: 18 }
  ];

  // Category Colors
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Counselling Psychology': return { stroke: '#C86D51', fill: 'rgba(200, 109, 81, 0.35)', rim: '#E08A6D' };
      case 'Life and Lifespan Psychology': return { stroke: '#E0A84B', fill: 'rgba(224, 168, 75, 0.35)', rim: '#EDBE6A' };
      case 'Social Psychology': return { stroke: '#7A9A7E', fill: 'rgba(122, 154, 126, 0.35)', rim: '#9DBBA0' };
      case 'Workplace Psychology': return { stroke: '#D98C9A', fill: 'rgba(217, 140, 154, 0.35)', rim: '#E5A3AF' };
      case 'Corporate Psychology and Organizational Behaviour': return { stroke: '#5E9AA8', fill: 'rgba(94, 154, 168, 0.35)', rim: '#86B9C6' };
      case 'Positive Psychology': return { stroke: '#EDBE6A', fill: 'rgba(237, 190, 106, 0.35)', rim: '#F5D79B' };
      case 'Behavioural Psychology': return { stroke: '#9DBBA0', fill: 'rgba(157, 187, 160, 0.35)', rim: '#B8D4BA' };
      default: return { stroke: '#C86D51', fill: 'rgba(200, 109, 81, 0.35)', rim: '#E08A6D' };
    }
  };

  // Initialize nodes and d3-force simulation
  useEffect(() => {
    if (isListView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 900;
    const height = canvas.clientHeight || 650;
    canvas.width = width * 2;
    canvas.height = height * 2;

    const initialNodes: SimNode[] = allConcepts.map((c) => {
      // Map weight 1-5 to radius 26px - 74px
      const radius = 26 + (c.weight - 1) * 12;
      return {
        ...c,
        radius,
        x: width / 2 + (Math.random() - 0.5) * (width * 0.7),
        y: height / 2 + (Math.random() - 0.5) * (height * 0.7)
      };
    });

    nodesRef.current = initialNodes;

    const simulation = d3Force.forceSimulation<SimNode>(initialNodes)
      .force('center', d3Force.forceCenter(width / 2, height / 2).strength(0.08))
      .force('charge', d3Force.forceManyBody().strength(-45))
      .force('collision', d3Force.forceCollide<SimNode>().radius((d) => d.radius + 4).iterations(2))
      .alphaDecay(0.025);

    simulationRef.current = simulation;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(2, 2);

      // Pan & Zoom
      ctx.translate(panOffset.x, panOffset.y);
      ctx.scale(zoomLevel, zoomLevel);

      const isFiltered = activeCategory !== 'all' || searchQuery.trim().length > 0;
      const query = searchQuery.toLowerCase().trim();

      nodesRef.current.forEach((node) => {
        const matchesCategory = activeCategory === 'all' || node.category === activeCategory;
        const matchesQuery = query === '' || node.name.toLowerCase().includes(query);
        const matches = matchesCategory && matchesQuery;

        const isHovered = hoveredNodeRef.current?.id === node.id;
        const isSelected = selectedConcept?.id === node.id;

        // Subtle idle sinusoidal float drift (Section 9.7)
        const driftX = Math.sin(t + node.weight) * 1.2;
        const driftY = Math.cos(t * 0.8 + node.weight) * 1.2;

        const currentX = (node.x || 0) + driftX;
        const currentY = (node.y || 0) + driftY;

        const scale = isHovered ? 1.35 : isSelected ? 1.2 : 1.0;
        const r = node.radius * scale;
        const opacity = matches ? (isFiltered ? 1.0 : 0.95) : 0.15;

        const col = getCategoryColor(node.category);

        ctx.save();
        ctx.globalAlpha = opacity;

        // 1. Translucent glass fill with radial highlight
        const grad = ctx.createRadialGradient(
          currentX - r * 0.35,
          currentY - r * 0.35,
          r * 0.1,
          currentX,
          currentY,
          r
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
        grad.addColorStop(0.3, col.fill);
        grad.addColorStop(1, col.fill.replace('0.35', '0.15'));

        ctx.beginPath();
        ctx.arc(currentX, currentY, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // 2. Light rim
        ctx.lineWidth = isHovered || isSelected ? 2.5 : 1.2;
        ctx.strokeStyle = isHovered ? '#FFFFFF' : col.stroke;
        ctx.stroke();

        // 3. Dotted ring for dissertation concepts (Section 9.7)
        if (node.dissertation) {
          ctx.beginPath();
          ctx.arc(currentX, currentY, r + 5, 0, Math.PI * 2);
          ctx.setLineDash([3, 4]);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = 'var(--thread)';
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // 4. Bubble label text
        ctx.fillStyle = '#2B3440';
        ctx.font = `${Math.max(9, Math.min(13, r / 3.2))}px Plus Jakarta Sans, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Truncate name if bubble is tiny
        let label = node.name;
        if (r < 34 && label.length > 10 && !isHovered) {
          label = label.slice(0, 8) + '..';
        }

        ctx.fillText(label, currentX, currentY);

        ctx.restore();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      simulation.stop();
      cancelAnimationFrame(animId);
    };
  }, [allConcepts, activeCategory, searchQuery, isListView, zoomLevel, panOffset, selectedConcept]);

  // Canvas Mouse Interaction: Hover & Click
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const mouseY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    let found: SimNode | null = null;
    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const node = nodesRef.current[i];
      const dx = mouseX - (node.x || 0);
      const dy = mouseY - (node.y || 0);
      if (dx * dx + dy * dy <= node.radius * node.radius) {
        found = node;
        break;
      }
    }

    if (found !== hoveredNodeRef.current) {
      hoveredNodeRef.current = found;
      if (found) {
        soundEngine.playTick();
      }
    }
  };

  const handleCanvasClick = () => {
    if (hoveredNodeRef.current) {
      soundEngine.playTick();
      setSelectedConcept(hoveredNodeRef.current);
    }
  };

  const handleSurpriseMe = () => {
    soundEngine.playTick();
    const randomConcept = allConcepts[Math.floor(Math.random() * allConcepts.length)];
    setSelectedConcept(randomConcept);
  };

  const handleResetView = () => {
    soundEngine.playTick();
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setActiveCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="w-full pt-28 sm:pt-36">
      <Seo
        title="Concept Universe · 120 Concepts"
        description="Interactive force-directed glass bubble universe of 120 foundational psychology concepts."
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        {/* Folio Label */}
        <div className="mb-4">
          <span className="text-xs font-meta tracking-widest uppercase text-muted">
            MEMORY / 08 / CONCEPT UNIVERSE
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-text tracking-tight mb-3">
              The 120 Concepts Universe
            </h1>
            <p className="text-base sm:text-lg text-muted max-w-2xl font-body">
              An interactive glass bubble knowledge sphere spanning Counselling, Lifespan, Social, Workplace, Corporate, Positive, and Behavioural psychology.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSurpriseMe}
              className="px-4 py-2 bg-surface hover:bg-surface-2 border border-border text-xs font-meta uppercase tracking-wider font-semibold rounded-xl text-accent transition-colors cursor-pointer"
            >
              Surprise Me
            </button>
            <button
              onClick={() => {
                soundEngine.playTick();
                setIsListView(!isListView);
              }}
              className="px-4 py-2 bg-accent text-white border border-accent text-xs font-meta uppercase tracking-wider font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {isListView ? 'Simulation View' : 'List View'}
            </button>
          </div>
        </div>

        {/* Controls Bar: Search & Category Chips */}
        <div className="p-4 bg-surface border border-border rounded-2xl mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by concept name..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-2/60 border border-border text-xs sm:text-sm text-text placeholder:text-muted/60 focus:outline-none focus:border-accent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                >
                  <CloseIcon size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.2))}
                className="px-2.5 py-1 text-xs font-meta bg-surface-2 border border-border rounded hover:bg-surface"
              >
                +
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
                className="px-2.5 py-1 text-xs font-meta bg-surface-2 border border-border rounded hover:bg-surface"
              >
                -
              </button>
              <button
                onClick={handleResetView}
                className="px-3 py-1 text-xs font-meta bg-surface-2 border border-border rounded hover:bg-surface text-muted"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-border/60">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  soundEngine.playTick();
                  setActiveCategory(c.id);
                }}
                className={`px-3 py-1 rounded-full text-xs font-meta whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  activeCategory === c.id
                    ? 'bg-accent text-white font-semibold shadow-xs'
                    : 'bg-surface-2 text-muted hover:text-text'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* SIMULATION OR LIST VIEW */}
        <div className="relative mb-20">
          {!isListView ? (
            <div className="relative w-full h-[650px] bg-surface/50 border border-border rounded-3xl overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                onMouseMove={handleCanvasMouseMove}
                onClick={handleCanvasClick}
                className="w-full h-full cursor-grab active:cursor-grabbing"
              />
              <div className="absolute bottom-4 left-6 text-xs font-meta text-muted pointer-events-none">
                Showing {allConcepts.length} concepts · Dotted rim = Dissertation connection
              </div>
            </div>
          ) : (
            /* Accessible Alphabetical List View (Section 9.7) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allConcepts
                .filter((c) => activeCategory === 'all' || c.category === activeCategory)
                .filter((c) => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      soundEngine.playTick();
                      setSelectedConcept(c);
                    }}
                    className="p-5 bg-surface border border-border hover:border-accent rounded-xl cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-center justify-between text-[11px] font-meta text-muted mb-2">
                      <span className="text-accent font-semibold">{c.category}</span>
                      <span>{c.theorist} ({c.year})</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-text mb-2">
                      {c.name}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">
                      {c.definition}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {/* SLIDE-IN DETAIL PANEL (Section 9.7) */}
          {selectedConcept && (
            <div className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-canvas/98 backdrop-blur-xl border-l border-border z-50 p-6 sm:p-8 overflow-y-auto shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-meta uppercase tracking-widest text-accent font-bold">
                    {selectedConcept.category}
                  </span>
                  <button
                    onClick={() => {
                      soundEngine.playTick();
                      setSelectedConcept(null);
                    }}
                    className="p-2 text-muted hover:text-text rounded-lg bg-surface border border-border"
                  >
                    <CloseIcon size={18} />
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-2">
                  {selectedConcept.name}
                </h2>

                <p className="text-xs font-meta text-muted mb-6">
                  Theorist: <strong className="text-text">{selectedConcept.theorist}</strong> ({selectedConcept.year})
                  {selectedConcept.dissertation && (
                    <span className="ml-2 px-2 py-0.5 rounded bg-thread/15 text-thread border border-thread/40 font-semibold">
                      Dissertation Link
                    </span>
                  )}
                </p>

                <div className="space-y-6 text-sm text-text/85 font-body leading-relaxed">
                  <div className="p-4 bg-surface rounded-xl border border-border">
                    <h4 className="text-xs font-meta uppercase tracking-wider text-accent font-bold mb-1">
                      Textbook Definition
                    </h4>
                    <p>{selectedConcept.definition}</p>
                  </div>

                  <div className="p-4 bg-surface rounded-xl border border-border">
                    <h4 className="text-xs font-meta uppercase tracking-wider text-accent font-bold mb-1">
                      Core Psychological Mechanism
                    </h4>
                    <p>{selectedConcept.mechanism}</p>
                  </div>

                  <div className="p-4 bg-surface rounded-xl border border-border">
                    <h4 className="text-xs font-meta uppercase tracking-wider text-accent font-bold mb-1">
                      Everyday Real-Life Example
                    </h4>
                    <p className="italic">"{selectedConcept.example}"</p>
                  </div>
                </div>
              </div>

              {/* Related Concepts */}
              {selectedConcept.related && selectedConcept.related.length > 0 && (
                <div className="pt-6 mt-6 border-t border-border">
                  <h4 className="text-xs font-meta uppercase tracking-wider text-muted font-bold mb-2">
                    Associative Concept Nodes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedConcept.related.map((relId) => {
                      const relConcept = allConcepts.find((c) => c.id === relId);
                      if (!relConcept) return null;
                      return (
                        <button
                          key={relId}
                          onClick={() => {
                            soundEngine.playTick();
                            setSelectedConcept(relConcept);
                          }}
                          className="px-2.5 py-1 text-xs font-meta rounded-md bg-surface border border-border hover:border-accent text-accent cursor-pointer transition-colors"
                        >
                          {relConcept.name} ↗
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Turn the Page bridge block */}
      <TurnThePage onNavigateCounterpart={onNavigateCounterpart} />
    </div>
  );
}
