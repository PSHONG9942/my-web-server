/**
 * Arcade Storage and Player Lexicon Codex Manager
 * Tracks player XP, Tokens, Word Mastery (50 verbs), and High Scores via localStorage.
 */
class ArcadeStorage {
  constructor() {
    this.STORAGE_KEY = "lexi_arcade_save_v1";
    this.data = this.load();
  }

  getDefaultData() {
    return {
      player: {
        name: "ARCADE_CHAMP",
        credits: 99,
        xp: 0,
        level: 1,
        wins: 0,
        losses: 0,
        highestCombo: 0,
      },
      // Tracks mastery of each of the 50 action verbs
      wordCodex: {},
      favoriteFighter: "kage",
      unlockedBadges: ["rookie_duelist"]
    };
  }

  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        return Object.assign(this.getDefaultData(), JSON.parse(raw));
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
    return this.getDefaultData();
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }

  // Record action verb usage in battle
  recordWordUsage(verb, isSuccess = true, isCrit = false) {
    if (!this.data.wordCodex[verb]) {
      this.data.wordCodex[verb] = {
        timesUsed: 0,
        timesCritted: 0,
        masteryLevel: "Learner", // Learner -> Adept -> Master
        firstSeen: new Date().toISOString()
      };
    }

    const entry = this.data.wordCodex[verb];
    entry.timesUsed++;
    if (isCrit) entry.timesCritted++;

    // Calculate mastery rank
    if (entry.timesUsed >= 10 && entry.timesCritted >= 3) {
      entry.masteryLevel = "Master";
    } else if (entry.timesUsed >= 4) {
      entry.masteryLevel = "Adept";
    } else {
      entry.masteryLevel = "Learner";
    }

    // Add XP
    this.addXp(isCrit ? 35 : 20);
    this.save();
    return entry;
  }

  addXp(amount) {
    this.data.player.xp += amount;
    const needed = this.data.player.level * 100;
    if (this.data.player.xp >= needed) {
      this.data.player.xp -= needed;
      this.data.player.level++;
    }
  }

  recordMatchResult(won, combo = 0) {
    if (won) {
      this.data.player.wins++;
      this.addXp(150);
    } else {
      this.data.player.losses++;
      this.addXp(50);
    }
    if (combo > this.data.player.highestCombo) {
      this.data.player.highestCombo = combo;
    }
    this.save();
  }

  getWordStats(verb) {
    return this.data.wordCodex[verb] || { timesUsed: 0, timesCritted: 0, masteryLevel: "Unranked" };
  }

  getMasteredCount() {
    let count = 0;
    for (let verb in this.data.wordCodex) {
      if (this.data.wordCodex[verb].masteryLevel === "Master") count++;
    }
    return count;
  }
}

const ARCADE_DATA = new ArcadeStorage();
if (typeof window !== "undefined") {
  window.ARCADE_DATA = ARCADE_DATA;
}
