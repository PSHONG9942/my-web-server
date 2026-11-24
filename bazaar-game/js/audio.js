/**
 * Procedural Web Audio SFX + Child-friendly Chinese Speech Synthesis
 */
(function (global) {
  "use strict";

  let audioCtx = null;
  let soundEnabled = true;
  let voiceEnabled = true;
  let cachedVoices = [];

  function ensureAudioCtx() {
    if (!soundEnabled) return null;
    if (!audioCtx) {
      const Ctx = global.AudioContext || global.webkitAudioContext;
      if (!Ctx) return null;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function tone(freq, duration, type, volume, delay) {
    const ctx = ensureAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime + (delay || 0);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume || 0.14, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function playCoin() {
    tone(1318.5, 0.12, "sine", 0.14, 0);
    tone(1975.5, 0.18, "triangle", 0.1, 0.045);
  }

  function playNote() {
    tone(523.25, 0.07, "triangle", 0.1, 0);
    tone(659.25, 0.08, "sine", 0.08, 0.03);
  }

  function playRemove() {
    tone(440, 0.07, "sine", 0.09, 0);
    tone(330, 0.09, "sine", 0.08, 0.04);
  }

  function playRegister() {
    tone(987.77, 0.09, "triangle", 0.14, 0);
    tone(1318.51, 0.25, "sine", 0.16, 0.07);
  }

  function playSuccess() {
    tone(523.25, 0.12, "triangle", 0.15, 0);
    tone(659.25, 0.12, "triangle", 0.15, 0.09);
    tone(783.99, 0.14, "triangle", 0.16, 0.18);
    tone(1046.5, 0.28, "sine", 0.16, 0.27);
  }

  function playGentleError() {
    tone(329.63, 0.14, "sine", 0.1, 0);
    tone(277.18, 0.2, "sine", 0.1, 0.11);
  }

  function playFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
    const times = [0, 0.09, 0.18, 0.28, 0.42, 0.54];
    notes.forEach((n, idx) => {
      tone(n, idx === notes.length - 1 ? 0.4 : 0.13, "triangle", 0.16, times[idx]);
    });
  }

  function loadVoices() {
    if (!("speechSynthesis" in global)) return [];
    cachedVoices = global.speechSynthesis.getVoices() || [];
    return cachedVoices;
  }

  if ("speechSynthesis" in global) {
    loadVoices();
    if (typeof global.speechSynthesis.onvoiceschanged !== "undefined") {
      global.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function pickChineseVoice() {
    const voices = cachedVoices.length ? cachedVoices : loadVoices();
    if (!voices.length) return null;
    const prefs = ["zh-MY", "zh-CN", "zh-SG", "zh-TW", "zh"];
    for (const prefix of prefs) {
      const found = voices.find((v) => (v.lang || "").toLowerCase().startsWith(prefix.toLowerCase()));
      if (found) return found;
    }
    return null;
  }

  function speak(text, opts) {
    const force = opts && opts.force;
    if (!voiceEnabled && !force) return;
    if (!text || !("speechSynthesis" in global)) return;
    try {
      global.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(String(text));
      const voice = pickChineseVoice();
      if (voice) {
        utter.voice = voice;
        utter.lang = voice.lang;
      } else {
        utter.lang = "zh-CN";
      }
      utter.rate = 0.92;
      utter.pitch = 1.06;
      global.speechSynthesis.speak(utter);
    } catch (_) {
      // Ignore speech synthesis errors on restricted browsers
    }
  }

  function stopSpeech() {
    if ("speechSynthesis" in global) {
      try {
        global.speechSynthesis.cancel();
      } catch (_) {}
    }
  }

  function setSoundEnabled(val) {
    soundEnabled = Boolean(val);
  }

  function setVoiceEnabled(val) {
    voiceEnabled = Boolean(val);
    if (!voiceEnabled) stopSpeech();
  }

  global.BazaarAudio = {
    playCoin,
    playNote,
    playRemove,
    playRegister,
    playSuccess,
    playGentleError,
    playFanfare,
    speak,
    stopSpeech,
    setSoundEnabled,
    setVoiceEnabled,
    isSoundEnabled: () => soundEnabled,
    isVoiceEnabled: () => voiceEnabled,
  };
})(window);
