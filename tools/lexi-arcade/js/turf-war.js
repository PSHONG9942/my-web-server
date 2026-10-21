/**
 * WORD BLITZ: TURF WAR (Game 3)
 * High-Speed Competitive Real-Time Territory Tug-of-War
 * Players push frontlines by rapidly solving dynamic linguistic constraints.
 */

class TurfWarGame {
  constructor() {
    this.active = false;
    this.timer = 60;
    this.timerInterval = null;
    this.cpuInterval = null;
    
    // Frontline: 0 (CPU Win) to 10 (Player Win). Starts at 5 (neutral center).
    this.frontline = 5;
    this.maxPosition = 10;
    
    this.curseActive = null; // e.g. "no-e" or "adverb-only"
    this.streak = 0;
    
    this.challenges = [
      {
        prompt: "Submit a SYNONYM for 'HAZARDOUS':",
        answers: ["DANGEROUS", "PERILOUS", "RISKY", "LETHAL", "TREACHEROUS"],
        options: ["PERILOUS", "BENEFICIAL", "DOCILE", "SECURE"]
      },
      {
        prompt: "Submit an IRREGULAR PAST TENSE of 'FREEZE':",
        answers: ["FROZE"],
        options: ["FROZE", "FREEZED", "FROZEN", "FREEZING"]
      },
      {
        prompt: "Complete the COLLOCATION: 'Make a ______'",
        answers: ["DECISION", "MISTAKE", "FORTUNE", "EFFORT", "PROMISE"],
        options: ["DECISION", "HOMEWORK", "EXERCISE", "ACTION"]
      },
      {
        prompt: "Submit an ANTONYM for 'ABUNDANT':",
        answers: ["SCARCE", "RARE", "MEAGER", "SPARSE", "DEFICIENT"],
        options: ["SCARCE", "PLENTIFUL", "LAVISH", "COPIOUS"]
      },
      {
        prompt: "Submit an ADVERB meaning 'with great anger':",
        answers: ["FURIOUSLY", "ANGERED", "FIERCELY", "WRATHFULLY"],
        options: ["FURIOUSLY", "CHEERFULLY", "GENTLY", "SOLEMNLY"]
      },
      {
        prompt: "Complete the COLLOCATION: 'Heavy ______'",
        answers: ["RAIN", "TRAFFIC", "SMOKER", "BURDEN", "PRICE"],
        options: ["TRAFFIC", "EFFORT", "PROBLEM", "DECISION"]
      },
      {
        prompt: "Submit the IRREGULAR PAST TENSE of 'TEAR':",
        answers: ["TORE"],
        options: ["TORE", "TEARED", "TORN", "TEARING"]
      },
      {
        prompt: "Submit a SYNONYM for 'EPHEMERAL':",
        answers: ["FLEETING", "TRANSIENT", "SHORT-LIVED", "TEMPORARY", "BRIEF"],
        options: ["FLEETING", "ETERNAL", "ENDLESS", "PERMANENT"]
      },
      {
        prompt: "Complete the PHRASAL VERB: 'Come up ______ a plan'",
        answers: ["WITH"],
        options: ["WITH", "ON", "AT", "BY"]
      },
      {
        prompt: "Submit an ANTONYM for 'OBSOLETE':",
        answers: ["MODERN", "CONTEMPORARY", "CURRENT", "NEW", "UP-TO-DATE"],
        options: ["MODERN", "OUTDATED", "ANCIENT", "EXTINCT"]
      }
    ];
    
    this.currentChallengeIndex = 0;
    this.initDom();
  }

  initDom() {
    this.dom = {
      container: document.getElementById("turfWarView"),
      frontlineBar: document.getElementById("twFrontlineFill"),
      territoryGrid: document.getElementById("twTerritoryGrid"),
      timerText: document.getElementById("twTimerText"),
      promptBox: document.getElementById("twPromptBox"),
      optionsContainer: document.getElementById("twOptionsRow"),
      inputBox: document.getElementById("twTextInput"),
      btnSubmit: document.getElementById("twBtnSubmit"),
      sabotageBanner: document.getElementById("twSabotageBanner"),
      playerScoreText: document.getElementById("twPlayerScore"),
      cpuScoreText: document.getElementById("twCpuScore"),
      btnStart: document.getElementById("twBtnStart")
    };

    if (this.dom.btnStart) {
      this.dom.btnStart.addEventListener("click", () => this.startGame());
    }

    if (this.dom.btnSubmit && this.dom.inputBox) {
      this.dom.btnSubmit.addEventListener("click", () => this.handleSubmitInput());
      this.dom.inputBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.handleSubmitInput();
      });
    }
  }

  startGame() {
    window.ARCADE_AUDIO.playFightStart();
    this.active = true;
    this.timer = 60;
    this.frontline = 5;
    this.streak = 0;
    this.curseActive = null;

    this.renderTerritoryGrid();
    this.nextChallenge();

    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.active) return;
      this.timer--;
      if (this.dom.timerText) this.dom.timerText.textContent = `${this.timer}s`;
      if (this.timer <= 0) {
        this.endGame(this.frontline > 5);
      }
    }, 1000);

    // CPU automatic push behavior
    clearInterval(this.cpuInterval);
    this.cpuInterval = setInterval(() => {
      if (!this.active) return;
      // CPU solves a word every 3.5s
      this.frontline = Math.max(0, this.frontline - 1);
      window.ARCADE_AUDIO.playHit();
      this.renderTerritoryGrid();
      if (this.frontline <= 0) {
        this.endGame(false);
      }
    }, 3800);
  }

  renderTerritoryGrid() {
    if (!this.dom.territoryGrid) return;
    this.dom.territoryGrid.innerHTML = "";

    for (let i = 0; i <= this.maxPosition; i++) {
      const cell = document.createElement("div");
      cell.className = "turf-cell";
      if (i < this.frontline) {
        cell.classList.add("blue-owned");
      } else if (i > this.frontline) {
        cell.classList.add("red-owned");
      } else {
        cell.classList.add("frontline-clash");
      }
      this.dom.territoryGrid.appendChild(cell);
    }

    if (this.dom.playerScoreText) {
      this.dom.playerScoreText.textContent = `${this.frontline * 10}% TURF`;
    }
    if (this.dom.cpuScoreText) {
      this.dom.cpuScoreText.textContent = `${(this.maxPosition - this.frontline) * 10}% TURF`;
    }
  }

  nextChallenge() {
    this.currentChallengeIndex = Math.floor(Math.random() * this.challenges.length);
    const item = this.challenges[this.currentChallengeIndex];

    if (this.dom.promptBox) {
      this.dom.promptBox.innerHTML = `<span>⚡</span> <span>${item.prompt}</span>`;
    }

    if (this.dom.optionsContainer) {
      this.dom.optionsContainer.innerHTML = "";
      item.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "arcade-btn btn-yellow turf-opt-btn";
        btn.textContent = opt;
        btn.addEventListener("click", () => {
          this.checkAnswer(opt);
        });
        this.dom.optionsContainer.appendChild(btn);
      });
    }

    if (this.dom.inputBox) {
      this.dom.inputBox.value = "";
      this.dom.inputBox.focus();
    }
  }

  handleSubmitInput() {
    if (!this.dom.inputBox) return;
    const val = this.dom.inputBox.value.trim().toUpperCase();
    if (!val) return;
    this.checkAnswer(val);
  }

  checkAnswer(answer) {
    if (!this.active) return;
    const current = this.challenges[this.currentChallengeIndex];
    const isCorrect = current.answers.includes(answer);

    if (isCorrect) {
      window.ARCADE_AUDIO.playCrit();
      this.frontline = Math.min(this.maxPosition, this.frontline + 1);
      this.streak++;

      // Trigger Sabotage Curse on CPU if on a streak
      if (this.streak >= 3) {
        this.triggerSabotage("SPEED SURGE: Pushed 2 Sectors!");
        this.frontline = Math.min(this.maxPosition, this.frontline + 1);
        this.streak = 0;
      }

      this.renderTerritoryGrid();

      if (this.frontline >= this.maxPosition) {
        this.endGame(true);
        return;
      }
      this.nextChallenge();
    } else {
      window.ARCADE_AUDIO.playStun();
      if (this.dom.promptBox) {
        this.dom.promptBox.classList.add("shake-error");
        setTimeout(() => this.dom.promptBox.classList.remove("shake-error"), 300);
      }
      this.streak = 0;
    }
  }

  triggerSabotage(msg) {
    if (!this.dom.sabotageBanner) return;
    this.dom.sabotageBanner.textContent = `💥 ${msg}`;
    this.dom.sabotageBanner.style.display = "block";
    setTimeout(() => {
      this.dom.sabotageBanner.style.display = "none";
    }, 2500);
  }

  endGame(playerWon) {
    this.active = false;
    clearInterval(this.timerInterval);
    clearInterval(this.cpuInterval);

    if (playerWon) {
      window.ARCADE_AUDIO.playVictory();
      alert("🏆 VICTORY! You dominated the Linguistic Turf War! +100 XP");
      window.ARCADE_DATA.addXp(100);
    } else {
      window.ARCADE_AUDIO.playDefeat();
      alert("⚠️ DEFEAT! Opponent conquered your territory. Try again to push the lines!");
    }
  }
}

if (typeof window !== "undefined") {
  window.TurfWarGame = TurfWarGame;
}
