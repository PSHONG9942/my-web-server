/**
 * PixCross - Procedural Web Audio Sound Synthesizer
 * Zero external audio files, ultra-responsive, works offline.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem("pixcross_muted") === "true";
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("pixcross_muted", this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playTone(freq, type = "sine", duration = 0.1, gainVal = 0.15, pitchBend = null) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      if (pitchBend) {
        osc.frequency.exponentialRampToValueAtTime(pitchBend, this.ctx.currentTime + duration);
      }

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }

  // Soft mechanical keyboard tap
  playKey() {
    this.playTone(320, "triangle", 0.04, 0.08, 180);
  }

  // Word selection change
  playSelect() {
    this.playTone(520, "sine", 0.06, 0.07, 600);
  }

  // Backspace tap
  playDelete() {
    this.playTone(220, "sine", 0.05, 0.06, 140);
  }

  // Error buzz
  playError() {
    if (this.muted) return;
    this.playTone(180, "sawtooth", 0.15, 0.08, 120);
  }

  // Hint twinkle
  playHint() {
    if (this.muted) return;
    const notes = [587.33, 880, 1174.66]; // D5, A5, D6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, "triangle", 0.18, 0.08);
      }, idx * 60);
    });
  }

  // Word correctly completed chime
  playWordComplete() {
    if (this.muted) return;
    const chords = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, "sine", 0.22, 0.12);
      }, idx * 75);
    });
  }

  // Grand puzzle victory fanfare
  playVictory() {
    if (this.muted) return;
    const sequence = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 659.25, d: 0.15, t: 120 },
      { f: 783.99, d: 0.18, t: 240 },
      { f: 1046.50, d: 0.45, t: 360 },
      { f: 880.00, d: 0.18, t: 620 },
      { f: 1046.50, d: 0.65, t: 800 },
      { f: 1318.51, d: 0.85, t: 800 }
    ];

    sequence.forEach(note => {
      setTimeout(() => {
        this.playTone(note.f, "triangle", note.d, 0.15);
      }, note.t);
    });
  }
}

window.soundController = new SoundController();
