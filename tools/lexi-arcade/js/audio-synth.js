/**
 * Procedural Web Audio API Retro Arcade Synthesizer
 * Generates all 8-bit / 16-bit arcade sound effects mathematically without external mp3/wav files.
 */
class ArcadeAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.35;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  playTone(freq, type, duration, startVol = 0.3, endVol = 0.001) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(startVol * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(endVol, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Audio fallback silent guard
    }
  }

  // Arcade Token / Coin Insert sound (Classic dual high chime: B5 -> E6)
  playCoin() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Tone 1
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(987.77, now); // B5
    gain1.gain.setValueAtTime(0.3 * this.volume, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.12);

    // Tone 2 (Higher)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1318.51, now + 0.08); // E6
    gain2.gain.setValueAtTime(0.35 * this.volume, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.35);
  }

  // Menu Select blip
  playSelect() {
    this.playTone(660, "square", 0.08, 0.2);
  }

  // Menu Back / Cancel
  playBack() {
    this.playTone(330, "triangle", 0.1, 0.25);
  }

  // Fight Start Gong / Cyberpunk chord
  playFightStart() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [220, 277.18, 329.63, 440]; // A Major 7 chord
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, "sawtooth", 0.6, 0.25);
      }, idx * 60);
    });
  }

  // Attack Slash / Whoosh
  playSlash() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);

    gain.gain.setValueAtTime(0.35 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Physical Punch / Hit Impact
  playHit(isHeavy = false) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const duration = isHeavy ? 0.25 : 0.15;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(isHeavy ? 260 : 180, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + duration);

    gain.gain.setValueAtTime((isHeavy ? 0.45 : 0.35) * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Critical Strike Explosion
  playCrit() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    this.playHit(true);

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(550, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);

    gain.gain.setValueAtTime(0.4 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Metallic Parry Chime (Clean high sine wave resonance)
  playParry() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [1046.5, 2093.0]; // C6 & C7 chime
    freqs.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.3 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  // Stun / Error / Spell Backfire buzz
  playStun() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.3);

    gain.gain.setValueAtTime(0.35 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // 8-bit Victory Fanfare
  playVictory() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const fanfare = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 523.25, d: 0.12 }, // C5
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.35 }, // E5
      { f: 587.33, d: 0.15 }, // D5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.60 }  // G5
    ];

    let delay = 0;
    fanfare.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, "square", note.d, 0.28);
      }, delay * 1000);
      delay += note.d + 0.04;
    });
  }

  // Defeat descending tones
  playDefeat() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const sadNotes = [392, 369.99, 349.23, 311.13];
    sadNotes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, "sawtooth", 0.3, 0.25);
      }, idx * 220);
    });
  }
}

// Global instance
const ARCADE_AUDIO = new ArcadeAudioSynthesizer();
if (typeof window !== "undefined") {
  window.ARCADE_AUDIO = ARCADE_AUDIO;
}
