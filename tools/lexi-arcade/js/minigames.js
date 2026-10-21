/**
 * MARIO PARTY / RABBIDS STYLE ARCADE MINI-GAMES
 * Micro-games using English grammar and vocabulary as physical mechanics:
 * 1. Tense Bomb (Hot Potato with Irregular Verbs)
 * 2. Preposition Dash (Speed Obstacle Course)
 * 3. Antonym Tug-of-War (Rope Pull Duel)
 */

class MiniGamesHub {
  constructor() {
    this.currentMode = null;
    this.timer = 0;
    this.interval = null;
    this.score = 0;
    this.initDom();
  }

  initDom() {
    this.dom = {
      view: document.getElementById("minigamesView"),
      gameArea: document.getElementById("miniGameActiveArea"),
      btnTenseBomb: document.getElementById("btnLaunchTenseBomb"),
      btnPrepDash: document.getElementById("btnLaunchPrepDash"),
      btnAntonymTug: document.getElementById("btnLaunchAntonymTug")
    };

    if (this.dom.btnTenseBomb) {
      this.dom.btnTenseBomb.addEventListener("click", () => this.launchTenseBomb());
    }
    if (this.dom.btnPrepDash) {
      this.dom.btnPrepDash.addEventListener("click", () => this.launchPrepositionDash());
    }
    if (this.dom.btnAntonymTug) {
      this.dom.btnAntonymTug.addEventListener("click", () => this.launchAntonymTug());
    }
  }

  // ==========================================
  // MINI-GAME 1: TENSE BOMB (Hot Potato)
  // ==========================================
  launchTenseBomb() {
    this.currentMode = "tense-bomb";
    window.ARCADE_AUDIO.playFightStart();
    this.score = 0;
    let fuseSeconds = 6;
    let bombHolder = "PLAYER"; // "PLAYER" or "CPU"

    const irregularVerbsPool = [
      { base: "DRINK", past: "DRANK" },
      { base: "SWIM", past: "SWAM" },
      { base: "FLY", past: "FLEW" },
      { base: "BUY", past: "BOUGHT" },
      { base: "CATCH", past: "CAUGHT" },
      { base: "BRING", past: "BROUGHT" },
      { base: "WRITE", past: "WROTE" },
      { base: "SPEAK", past: "SPOKE" },
      { base: "CHOOSE", past: "CHOSE" },
      { base: "FREEZE", past: "FROZE" }
    ];

    let currentQ = irregularVerbsPool[Math.floor(Math.random() * irregularVerbsPool.length)];

    this.dom.gameArea.innerHTML = `
      <div class="mini-game-card">
        <h3 style="font-family: var(--font-retro); color: var(--neon-pink); font-size: 16px;">💣 TENSE BOMB: HOT POTATO!</h3>
        <p style="color: #cbd5e1; font-size: 14px;">The fuse is burning! Submit the <b>IRREGULAR PAST TENSE</b> to fling the bomb to CPU!</p>
        
        <div style="font-size: 72px; margin: 15px 0;" id="bombIcon">💣</div>
        <div style="font-family: var(--font-retro); font-size: 24px; color: var(--neon-yellow);" id="fuseDisplay">${fuseSeconds}s</div>

        <div style="margin: 15px 0; background: rgba(0,0,0,0.5); padding: 12px; border-radius: 8px;">
          <span style="font-size: 14px; color: #94a3b8;">WHAT IS THE PAST TENSE OF:</span>
          <h2 style="font-family: var(--font-cyber); font-size: 26px; color: var(--neon-cyan);">${currentQ.base}</h2>
        </div>

        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;" id="bombOptions"></div>
      </div>
    `;

    const renderOptions = () => {
      const opts = [
        currentQ.past,
        currentQ.base + "ED",
        currentQ.base + "EN",
        currentQ.base + "ING"
      ].sort(() => Math.random() - 0.5);

      const optBox = document.getElementById("bombOptions");
      optBox.innerHTML = "";
      opts.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "arcade-btn btn-pink";
        btn.textContent = opt;
        btn.addEventListener("click", () => {
          if (opt === currentQ.past) {
            window.ARCADE_AUDIO.playCrit();
            this.score++;
            fuseSeconds = 5; // Reset fuse for next player
            bombHolder = "CPU";
            document.getElementById("bombIcon").textContent = "🚀💥";
            setTimeout(() => {
              // CPU immediately flings back after 1.5s
              currentQ = irregularVerbsPool[Math.floor(Math.random() * irregularVerbsPool.length)];
              this.launchTenseBomb();
            }, 1200);
          } else {
            window.ARCADE_AUDIO.playStun();
            fuseSeconds = Math.max(1, fuseSeconds - 2);
          }
        });
        optBox.appendChild(btn);
      });
    };

    renderOptions();

    clearInterval(this.interval);
    this.interval = setInterval(() => {
      fuseSeconds--;
      const disp = document.getElementById("fuseDisplay");
      if (disp) disp.textContent = `${fuseSeconds}s`;
      window.ARCADE_AUDIO.playTone(600 + (6 - fuseSeconds) * 100, "square", 0.05, 0.15);

      if (fuseSeconds <= 0) {
        clearInterval(this.interval);
        window.ARCADE_AUDIO.playHit(true);
        this.dom.gameArea.innerHTML = `
          <div class="mini-game-card">
            <h2 style="font-family: var(--font-retro); color: var(--neon-pink); font-size: 24px;">💥 BOOM! DETONATION!</h2>
            <p style="margin-top: 10px; font-size: 15px;">The bomb blew up! Correct past tense was: <b>${currentQ.past}</b></p>
            <p style="color: var(--neon-yellow); font-size: 18px; margin: 15px 0;">Score: ${this.score} Volleys</p>
            <button class="arcade-btn btn-yellow" onclick="window.MINIGAMES.launchTenseBomb()">PLAY AGAIN</button>
          </div>
        `;
      }
    }, 1000);
  }

  // ==========================================
  // MINI-GAME 2: PREPOSITION DASH
  // ==========================================
  launchPrepositionDash() {
    this.currentMode = "prep-dash";
    window.ARCADE_AUDIO.playFightStart();
    this.score = 0;

    const challenges = [
      { sentence: "The runner leaps ______ the hurdle!", ans: "OVER", opts: ["OVER", "UNDER", "INTO", "OFF"] },
      { sentence: "The ninja crawls ______ the laser grid!", ans: "UNDER", opts: ["UNDER", "ABOVE", "THROUGH", "ON"] },
      { sentence: "The spaceship flies ______ the asteroid field!", ans: "THROUGH", opts: ["THROUGH", "AT", "INTO", "BETWEEN"] },
      { sentence: "The diver plunges ______ the icy depths!", ans: "INTO", opts: ["INTO", "ONTO", "OUT OF", "ABOVE"] },
      { sentence: "The athlete sprints ______ the finish line!", ans: "ACROSS", opts: ["ACROSS", "UNDER", "THROUGH", "ALONG"] }
    ];

    let currentIdx = 0;

    const render = () => {
      if (currentIdx >= challenges.length) {
        window.ARCADE_AUDIO.playVictory();
        this.dom.gameArea.innerHTML = `
          <div class="mini-game-card">
            <h2 style="font-family: var(--font-retro); color: var(--neon-green); font-size: 22px;">🏁 COURSE CLEARED!</h2>
            <p style="margin: 10px 0;">Flawless navigation of spatial prepositions!</p>
            <p style="color: var(--neon-yellow); font-size: 20px;">Score: ${this.score * 100} PTS</p>
            <button class="arcade-btn btn-yellow" onclick="window.MINIGAMES.launchPrepositionDash()" style="margin-top: 15px;">PLAY AGAIN</button>
          </div>
        `;
        return;
      }

      const q = challenges[currentIdx];
      this.dom.gameArea.innerHTML = `
        <div class="mini-game-card">
          <h3 style="font-family: var(--font-retro); color: var(--neon-cyan); font-size: 15px;">🏃 PREPOSITION DASH!</h3>
          <div style="font-size: 64px; margin: 15px 0;">🏃💨 🚧</div>
          <div style="font-size: 18px; font-weight: 700; color: #fff; margin: 10px 0;">${q.sentence}</div>
          <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;" id="prepOpts"></div>
        </div>
      `;

      const box = document.getElementById("prepOpts");
      q.opts.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "arcade-btn btn-yellow";
        btn.textContent = opt;
        btn.addEventListener("click", () => {
          if (opt === q.ans) {
            window.ARCADE_AUDIO.playParry();
            this.score++;
            currentIdx++;
            render();
          } else {
            window.ARCADE_AUDIO.playStun();
            btn.style.background = "red";
          }
        });
        box.appendChild(btn);
      });
    };

    render();
  }

  // ==========================================
  // MINI-GAME 3: ANTONYM TUG-OF-WAR
  // ==========================================
  launchAntonymTug() {
    this.currentMode = "antonym-tug";
    window.ARCADE_AUDIO.playFightStart();
    let ropePosition = 50; // 0 = P1 wins, 100 = CPU wins

    const wordPairs = [
      { word: "AFFLUENT", antonym: "IMPOVERISHED", opts: ["IMPOVERISHED", "WEALTHY", "GENEROUS", "MIGHTY"] },
      { word: "METICULOUS", antonym: "CARELESS", opts: ["CARELESS", "DETAILED", "EXACT", "HONEST"] },
      { word: "TRANSIENT", antonym: "PERMANENT", opts: ["PERMANENT", "FLEETING", "QUICK", "VAPID"] },
      { word: "CANDID", antonym: "DECEITFUL", opts: ["DECEITFUL", "FRANK", "SINCERE", "BLUNT"] },
      { word: "BENEVOLENT", antonym: "MALEVOLENT", opts: ["MALEVOLENT", "KIND", "CHARITABLE", "PEACEFUL"] }
    ];

    let currentIdx = 0;

    const render = () => {
      const q = wordPairs[currentIdx % wordPairs.length];
      this.dom.gameArea.innerHTML = `
        <div class="mini-game-card">
          <h3 style="font-family: var(--font-retro); color: var(--neon-yellow); font-size: 15px;">🪢 ANTONYM TUG-OF-WAR</h3>
          <p style="color: #cbd5e1; font-size: 14px;">Select the true <b>ANTONYM (OPPOSITE)</b> to yank the rope!</p>

          <div style="width: 100%; height: 20px; background: #1e202e; border: 2px solid var(--neon-cyan); border-radius: 10px; margin: 15px 0; position: relative;">
            <div style="position: absolute; left: ${ropePosition}%; top: -6px; transform: translateX(-50%); font-size: 22px;">🚩</div>
          </div>

          <div style="font-size: 24px; font-weight: 900; color: var(--neon-pink); margin: 10px 0;">${q.word}</div>
          <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;" id="tugOpts"></div>
        </div>
      `;

      const box = document.getElementById("tugOpts");
      q.opts.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "arcade-btn btn-pink";
        btn.textContent = opt;
        btn.addEventListener("click", () => {
          if (opt === q.antonym) {
            window.ARCADE_AUDIO.playHit(true);
            ropePosition = Math.max(10, ropePosition - 20);
            currentIdx++;
            if (ropePosition <= 10) {
              window.ARCADE_AUDIO.playVictory();
              alert("🏆 YOU WON THE TUG-OF-WAR! Opponent pulled into the mud!");
              this.launchAntonymTug();
            } else {
              render();
            }
          } else {
            window.ARCADE_AUDIO.playStun();
            ropePosition = Math.min(90, ropePosition + 15);
            render();
          }
        });
        box.appendChild(btn);
      });
    };

    render();
  }
}

if (typeof window !== "undefined") {
  window.MINIGAMES = new MiniGamesHub();
}
