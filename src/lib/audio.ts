/**
 * Pure Web Audio Sound Engine (No external sound files)
 * Tech: Subtle ambient drone (55Hz / 82.4Hz + LFO filter)
 * Psychology: Warm sparse pentatonic bell tones (C, D, E, G, A in oct 4 & 5)
 * UI: Gentle click tick
 */

type SoundPersona = 'tech' | 'psychology';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private currentPersona: SoundPersona = 'tech';

  // Tech drone nodes
  private techGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;

  // Psychology bell timer
  private bellIntervalId: number | null = null;
  private psychGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start(persona: SoundPersona) {
    this.initContext();
    if (!this.ctx) return;
    this.currentPersona = persona;
    this.isRunning = true;

    if (persona === 'tech') {
      this.startTechDrone();
    } else {
      this.startPsychologyBells();
    }
  }

  public stop() {
    this.isRunning = false;
    this.stopTechDrone();
    this.stopPsychologyBells();
  }

  public setPersona(persona: SoundPersona) {
    if (!this.isRunning) {
      this.currentPersona = persona;
      return;
    }
    if (this.currentPersona === persona) return;
    this.currentPersona = persona;

    // Smooth crossfade
    if (persona === 'tech') {
      this.stopPsychologyBells();
      this.startTechDrone();
    } else {
      this.stopTechDrone();
      this.startPsychologyBells();
    }
  }

  private startTechDrone() {
    if (!this.ctx) return;
    this.stopTechDrone();

    try {
      const now = this.ctx.currentTime;
      this.techGain = this.ctx.createGain();
      this.techGain.gain.setValueAtTime(0.0001, now);
      this.techGain.gain.exponentialRampToValueAtTime(0.04, now + 1.2);
      this.techGain.connect(this.ctx.destination);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(240, now);
      this.filter.Q.setValueAtTime(3, now);
      this.filter.connect(this.techGain);

      // LFO slowly modulating cutoff frequency
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.12, now); // ~8 sec cycle
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(80, now);
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);
      this.lfo.start();

      // Osc 1: 55 Hz (A1) sine
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(55, now);
      this.osc1.connect(this.filter);
      this.osc1.start();

      // Osc 2: 82.4 Hz (E2) detuned triangle
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(82.4, now);
      this.osc2.detune.setValueAtTime(4, now);
      this.osc2.connect(this.filter);
      this.osc2.start();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  private stopTechDrone() {
    if (this.techGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.techGain.gain.setValueAtTime(this.techGain.gain.value, now);
        this.techGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        setTimeout(() => {
          this.osc1?.stop();
          this.osc2?.stop();
          this.lfo?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.lfo?.disconnect();
          this.techGain?.disconnect();
          this.filter?.disconnect();
          this.osc1 = null;
          this.osc2 = null;
          this.lfo = null;
          this.techGain = null;
          this.filter = null;
        }, 700);
      } catch {
        this.osc1 = null;
        this.osc2 = null;
        this.techGain = null;
      }
    }
  }

  private startPsychologyBells() {
    if (!this.ctx) return;
    this.stopPsychologyBells();

    this.psychGain = this.ctx.createGain();
    this.psychGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    this.psychGain.connect(this.ctx.destination);

    // Initial chime
    this.playRandomBell();

    // Schedule random chimes between 3 and 6 seconds
    const scheduleNext = () => {
      if (!this.isRunning || this.currentPersona !== 'psychology') return;
      const delay = Math.random() * 3000 + 3000;
      this.bellIntervalId = window.setTimeout(() => {
        this.playRandomBell();
        scheduleNext();
      }, delay);
    };

    scheduleNext();
  }

  private stopPsychologyBells() {
    if (this.bellIntervalId) {
      clearTimeout(this.bellIntervalId);
      this.bellIntervalId = null;
    }
    if (this.psychGain) {
      try {
        this.psychGain.disconnect();
      } catch {
        // Ignored
      }
      this.psychGain = null;
    }
  }

  private playRandomBell() {
    if (!this.ctx || !this.psychGain) return;

    // Pentatonic scale frequencies: C4, D4, E4, G4, A4, C5, D5, E5, G5, A5
    const freqs = [
      261.63, 293.66, 329.63, 392.00, 440.00,
      523.25, 587.33, 659.25, 783.99, 880.00
    ];
    const freq = freqs[Math.floor(Math.random() * freqs.length)];
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Soft attack (40ms), long exponential decay (~3.5s)
    bellGain.gain.setValueAtTime(0.0001, now);
    bellGain.gain.exponentialRampToValueAtTime(0.05, now + 0.04);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

    osc.connect(bellGain);
    bellGain.connect(this.psychGain);

    osc.start(now);
    osc.stop(now + 3.6);
  }

  public playTick() {
    if (!this.isRunning || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.02);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Ignored
    }
  }
}

export const soundEngine = new SoundEngine();
