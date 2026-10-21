/**
 * SYNTAX FIGHTER: EXPEDITION EDITION
 * Reactive Turn-Based Combat Engine inspired by Clair Obscur: Expedition 33.
 * 
 * Features:
 * - AP (Action Points) Economy (Max 4 AP, 1-3 AP costs, AP refunds)
 * - Strict Turn Phases (Player Turn <-> Mandatory Enemy Turn)
 * - Offensive QTE Ring (Syntax Impact Sweet Spot for +50% Crit & +1 AP)
 * - Active Real-Time Defense:
 *     * DODGE: Safe evasion (0 damage)
 *     * PARRY: Tight sweet spot (0 damage + 1 AP refund + instant Counter-Strike)
 * - Linguistic Synergies & Status Effects (BLEEDING, POISONED, FROZEN, EXPOSED, STEALTH, etc.)
 */

class SyntaxFighterGame {
  constructor() {
    this.fighters = window.FIGHTERS_DATA || [];
    this.adverbs = window.ADVERB_MODIFIERS || [];
    
    this.selectedP1 = this.fighters[0];
    this.selectedP2 = this.fighters[1];
    
    this.battleActive = false;
    this.currentPhase = "PLAYER"; // "PLAYER" or "ENEMY"
    this.roundTimer = 99;
    this.timerInterval = null;
    
    // Combat Stats
    this.p1MaxHp = 480;
    this.p1Hp = 480;
    this.p1Ap = 3;
    this.p1MaxAp = 4;
    this.p1Statuses = new Map(); // name -> turnsRemaining
    
    this.p2MaxHp = 620;
    this.p2Hp = 620;
    this.p2Ap = 2;
    this.p2MaxAp = 4;
    this.p2Statuses = new Map();
    
    this.selectedAdverb = null;
    this.matchVerbLog = [];
    
    // QTE Offensive State
    this.qteActive = false;
    this.qteProgress = 0;
    this.qteRaf = null;
    this.pendingAction = null;
    
    // Defense State
    this.defenseActive = false;
    this.defenseProgress = 0;
    this.defenseRaf = null;
    this.currentEnemyAttack = null;
    this.defenseResolved = false;
    
    this.initDom();
    this.setupCharacterSelect();
    this.setupEventListeners();
  }

  initDom() {
    this.dom = {
      selectScreen: document.getElementById("sfSelectScreen"),
      battleScreen: document.getElementById("sfBattleScreen"),
      rosterGrid: document.getElementById("sfRosterGrid"),
      previewHeroName: document.getElementById("sfPreviewHeroName"),
      previewHeroTitle: document.getElementById("sfPreviewHeroTitle"),
      previewHeroBio: document.getElementById("sfPreviewHeroBio"),
      previewHeroMoves: document.getElementById("sfPreviewHeroMoves"),
      btnStartFight: document.getElementById("sfBtnStartFight"),
      
      // Battle HUD
      p1NameTag: document.getElementById("sfP1NameTag"),
      p2NameTag: document.getElementById("sfP2NameTag"),
      p1HealthFill: document.getElementById("sfP1HealthFill"),
      p1HealthGhost: document.getElementById("sfP1HealthGhost"),
      p1HealthText: document.getElementById("sfP1HealthText"),
      p2HealthFill: document.getElementById("sfP2HealthFill"),
      p2HealthGhost: document.getElementById("sfP2HealthGhost"),
      p2HealthText: document.getElementById("sfP2HealthText"),
      p1ApPips: document.getElementById("sfP1ApPips"),
      p2ApPips: document.getElementById("sfP2ApPips"),
      p1StatusStrip: document.getElementById("sfP1StatusStrip"),
      p2StatusStrip: document.getElementById("sfP2StatusStrip"),
      turnPhasePill: document.getElementById("sfTurnPhasePill"),
      roundTimerText: document.getElementById("sfRoundTimerText"),
      
      // Stage Sprites
      p1SpriteBox: document.getElementById("sfP1SpriteBox"),
      p2SpriteBox: document.getElementById("sfP2SpriteBox"),
      p1SpriteIcon: document.getElementById("sfP1SpriteIcon"),
      p2SpriteIcon: document.getElementById("sfP2SpriteIcon"),
      stageArena: document.getElementById("sfStageArena"),
      
      // Expedition 33: Offensive QTE
      qteOverlay: document.getElementById("sfQteOverlay"),
      qteRing: document.getElementById("sfQteRing"),
      
      // Expedition 33: Active Defense Panel
      defensePanel: document.getElementById("sfDefensePanel"),
      defenseCueText: document.getElementById("sfDefenseCueText"),
      defenseCursor: document.getElementById("sfDefenseCursor"),
      defenseSweetZone: document.getElementById("sfDefenseSweetZone"),
      btnDodge: document.getElementById("sfBtnDodge"),
      btnParry: document.getElementById("sfBtnParry"),
      
      // Controller Dock
      sentenceDisplay: document.getElementById("sfActiveSentence"),
      adverbStrip: document.getElementById("sfAdverbStrip"),
      actionCardsGrid: document.getElementById("sfActionCardsGrid"),
      btnEndTurn: document.getElementById("sfBtnEndTurn"),
      
      // KO Screen
      koOverlay: document.getElementById("sfKoOverlay"),
      koBannerText: document.getElementById("sfKoBannerText"),
      koSubBanner: document.getElementById("sfKoSubBanner"),
      koVerbsList: document.getElementById("sfKoVerbsList"),
      btnKoRematch: document.getElementById("sfBtnKoRematch"),
      btnKoReturn: document.getElementById("sfBtnKoReturn")
    };
  }

  setupCharacterSelect() {
    if (!this.dom.rosterGrid) return;
    this.dom.rosterGrid.innerHTML = "";

    this.fighters.forEach((f) => {
      const card = document.createElement("div");
      card.className = `fighter-card-slot ${f.id === this.selectedP1.id ? "selected" : ""}`;
      card.dataset.id = f.id;

      card.innerHTML = `
        <div class="fighter-avatar-icon">${f.icon}</div>
        <div class="fighter-slot-name">${f.name}</div>
        <div class="fighter-slot-title">${f.title}</div>
        <div style="font-size: 10px; color: var(--neon-yellow); margin-top: 4px;">HP: ${f.baseHp}</div>
      `;

      card.addEventListener("click", () => {
        window.ARCADE_AUDIO.playSelect();
        this.selectFighter(f);
      });

      this.dom.rosterGrid.appendChild(card);
    });

    this.updatePreviewDock();
  }

  selectFighter(fighter) {
    this.selectedP1 = fighter;
    const opponents = this.fighters.filter(f => f.id !== fighter.id);
    this.selectedP2 = opponents[Math.floor(Math.random() * opponents.length)];

    document.querySelectorAll(".fighter-card-slot").forEach(c => {
      c.classList.remove("selected", "cpu-selected");
      if (c.dataset.id === this.selectedP1.id) c.classList.add("selected");
      if (c.dataset.id === this.selectedP2.id) c.classList.add("cpu-selected");
    });

    this.updatePreviewDock();
  }

  updatePreviewDock() {
    const f = this.selectedP1;
    this.dom.previewHeroName.textContent = f.name;
    this.dom.previewHeroTitle.textContent = `${f.title} (vs. CPU ${this.selectedP2.name})`;
    this.dom.previewHeroBio.textContent = f.bio;

    this.dom.previewHeroMoves.innerHTML = f.moves.map(m => `
      <div class="dock-verb-chip" title="${m.synergyHint}">
        <span class="dock-verb-name">${m.verb}</span>
        <span style="font-size: 10px; color: var(--neon-yellow);">${m.apCost} AP</span>
        <span class="dock-verb-ipa">${m.ipa}</span>
      </div>
    `).join("");
  }

  setupEventListeners() {
    if (this.dom.btnStartFight) {
      this.dom.btnStartFight.addEventListener("click", () => {
        window.ARCADE_AUDIO.playFightStart();
        this.startMatch();
      });
    }

    if (this.dom.btnEndTurn) {
      this.dom.btnEndTurn.addEventListener("click", () => {
        if (this.currentPhase === "PLAYER" && this.battleActive) {
          window.ARCADE_AUDIO.playSelect();
          this.endPlayerTurn();
        }
      });
    }

    // Active Defense Buttons
    if (this.dom.btnDodge) {
      this.dom.btnDodge.addEventListener("click", () => this.handleDodgeAttempt());
    }
    if (this.dom.btnParry) {
      this.dom.btnParry.addEventListener("click", () => this.handleParryAttempt());
    }

    // Offensive QTE Click / Space
    if (this.dom.qteOverlay) {
      this.dom.qteOverlay.addEventListener("click", () => this.handleQteHit());
    }

    // Keyboard controls (Space for QTE/Dodge, P for Parry, 1-5 for Cards)
    window.addEventListener("keydown", (e) => {
      if (!this.battleActive) return;

      // QTE hit trigger
      if (e.code === "Space") {
        if (this.qteActive) {
          e.preventDefault();
          this.handleQteHit();
          return;
        }
        if (this.defenseActive) {
          e.preventDefault();
          this.handleDodgeAttempt();
          return;
        }
      }

      // Defense Parry trigger
      if (e.code === "KeyP") {
        if (this.defenseActive) {
          e.preventDefault();
          this.handleParryAttempt();
          return;
        }
      }

      // Cards 1-5 in Player Phase
      if (this.currentPhase === "PLAYER" && !this.qteActive) {
        const key = parseInt(e.key);
        if (key >= 1 && key <= 5) {
          const move = this.selectedP1.moves[key - 1];
          if (move && this.p1Ap >= move.apCost) {
            this.preparePlayerAction(move);
          }
        }
      }
    });

    if (this.dom.btnKoRematch) {
      this.dom.btnKoRematch.addEventListener("click", () => {
        window.ARCADE_AUDIO.playSelect();
        this.dom.koOverlay.classList.remove("open");
        this.startMatch();
      });
    }

    if (this.dom.btnKoReturn) {
      this.dom.btnKoReturn.addEventListener("click", () => {
        window.ARCADE_AUDIO.playBack();
        this.dom.koOverlay.classList.remove("open");
        this.dom.battleScreen.classList.remove("active");
        this.dom.battleScreen.style.display = "none";
        this.dom.selectScreen.classList.add("active");
        this.dom.selectScreen.style.display = "flex";
      });
    }
  }

  startMatch() {
    this.battleActive = true;
    this.currentPhase = "PLAYER";
    this.roundTimer = 99;
    this.matchVerbLog = [];
    this.selectedAdverb = null;

    // HP & AP setup
    this.p1MaxHp = this.selectedP1.baseHp;
    this.p1Hp = this.p1MaxHp;
    this.p1Ap = 3;
    this.p1Statuses.clear();

    this.p2MaxHp = this.selectedP2.baseHp;
    this.p2Hp = this.p2MaxHp;
    this.p2Ap = 2;
    this.p2Statuses.clear();

    // Close overlays & switch screen
    if (this.dom.koOverlay) this.dom.koOverlay.classList.remove("open");
    this.dom.selectScreen.classList.remove("active");
    this.dom.selectScreen.style.display = "none";
    this.dom.battleScreen.classList.add("active");
    this.dom.battleScreen.style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });

    // HUD visuals
    this.dom.p1NameTag.innerHTML = `<span>${this.selectedP1.icon}</span> <span>${this.selectedP1.name}</span>`;
    this.dom.p2NameTag.innerHTML = `<span>${this.selectedP2.name}</span> <span>${this.selectedP2.icon}</span>`;
    this.dom.p1SpriteIcon.textContent = this.selectedP1.icon;
    this.dom.p2SpriteIcon.textContent = this.selectedP2.icon;

    this.updateHUD();
    this.renderAdverbBar();
    this.renderActionDeck();
    this.updateSentenceDisplay();

    // Clock
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.battleActive) return;
      this.roundTimer--;
      this.dom.roundTimerText.textContent = this.roundTimer;
      if (this.roundTimer <= 0) {
        this.triggerKO(this.p1Hp >= this.p2Hp);
      }
    }, 1000);
  }

  // =========================================================================
  // PLAYER TURN & OFFENSIVE QTE
  // =========================================================================
  startPlayerTurn() {
    if (!this.battleActive) return;
    this.currentPhase = "PLAYER";
    this.dom.turnPhasePill.textContent = "PLAYER TURN";
    this.dom.turnPhasePill.classList.remove("enemy-turn");

    // Replenish 2 AP (capped at 4)
    this.p1Ap = Math.min(this.p1MaxAp, this.p1Ap + 2);

    // Apply Status Ticks (Poison, Bleed, etc.)
    this.processStatusTicks(this.p1Statuses, "p1");
    this.updateHUD();
    this.renderActionDeck();
    this.updateSentenceDisplay();
  }

  preparePlayerAction(move) {
    if (!this.battleActive || this.currentPhase !== "PLAYER" || this.qteActive) return;
    if (this.p1Ap < move.apCost) return;

    // Deduct AP
    this.p1Ap -= move.apCost;
    this.pendingAction = move;
    this.updateHUD();

    // Launch Expedition 33 Offensive QTE Timing Ring
    this.startOffensiveQte();
  }

  startOffensiveQte() {
    this.qteActive = true;
    this.qteProgress = 0;
    this.dom.qteOverlay.classList.add("active");

    const startTime = performance.now();
    const duration = 850; // 0.85s shrink time

    const animateQte = (time) => {
      if (!this.qteActive) return;
      const elapsed = time - startTime;
      this.qteProgress = Math.min(1.0, elapsed / duration);

      // Ring shrinks from scale 2.2 down to 0.8
      const currentScale = 2.2 - (this.qteProgress * 1.4);
      this.dom.qteRing.style.transform = `scale(${currentScale})`;

      if (this.qteProgress >= 1.0) {
        // Timed out: Fumble!
        this.resolveOffensiveQte("FUMBLE");
      } else {
        this.qteRaf = requestAnimationFrame(animateQte);
      }
    };

    this.qteRaf = requestAnimationFrame(animateQte);
  }

  handleQteHit() {
    if (!this.qteActive) return;
    cancelAnimationFrame(this.qteRaf);

    // Sweet spot is when ring is close to 1.0 scale (progress ~ 0.8 to 0.95)
    if (this.qteProgress >= 0.75 && this.qteProgress <= 0.96) {
      this.resolveOffensiveQte("PERFECT");
    } else {
      this.resolveOffensiveQte("GOOD");
    }
  }

  resolveOffensiveQte(timingGrade) {
    this.qteActive = false;
    this.dom.qteOverlay.classList.remove("active");

    const move = this.pendingAction;
    if (!move) return;

    // Visual Lunge
    this.dom.p1SpriteBox.classList.add("attacking");
    setTimeout(() => this.dom.p1SpriteBox.classList.remove("attacking"), 400);

    // Calculate Damage & Synergies
    let damage = move.damage;
    let isSynergyTriggered = false;
    let isCrit = false;

    // 1. Check Condition Synergy (The key to forcing reading!)
    if (move.comboCondition && move.comboCondition.length > 0) {
      for (const cond of move.comboCondition) {
        if (this.p2Statuses.has(cond) || this.p1Statuses.has(cond)) {
          isSynergyTriggered = true;
          damage = Math.round(damage * (move.comboMultiplier || 2.5));
          break;
        }
      }
    }

    // 2. QTE Grade Modifier
    if (timingGrade === "PERFECT") {
      window.ARCADE_AUDIO.playCrit();
      damage = Math.round(damage * 1.5);
      isCrit = true;
      this.p1Ap = Math.min(this.p1MaxAp, this.p1Ap + 1); // +1 AP refund on Perfect Syntax!
      this.spawnFloatingCombatText(this.dom.stageArena, "⚡ PERFECT SYNTAX! +1 AP", "crit", "p1");
    } else if (timingGrade === "GOOD") {
      window.ARCADE_AUDIO.playHit(false);
    } else {
      window.ARCADE_AUDIO.playStun();
      damage = Math.round(damage * 0.5);
      this.spawnFloatingCombatText(this.dom.stageArena, "FUMBLE! (50% DMG)", "damage", "p1");
    }

    // 3. Adverb Modifier
    if (this.selectedAdverb) {
      const adv = this.adverbs.find(a => a.adverb === this.selectedAdverb);
      if (adv) {
        if (adv.boost === "damage") damage = Math.round(damage * 1.35);
        if (adv.boost === "ap") this.p1Ap = Math.min(this.p1MaxAp, this.p1Ap + 1);
        if (adv.boost === "shield") {
          this.p1Statuses.set("SHIELD", 2);
          this.spawnFloatingCombatText(this.dom.stageArena, "+35 SHIELD", "heal", "p1");
        }
      }
      this.selectedAdverb = null;
      this.renderAdverbBar();
    }

    // 4. Apply Status Effects
    if (move.status) {
      this.p2Statuses.set(move.status, 2);
      this.spawnFloatingCombatText(this.dom.stageArena, `[${move.status}]`, "parry", "p2");
    }
    if (move.selfStatus) {
      this.p1Statuses.set(move.selfStatus, 2);
      this.spawnFloatingCombatText(this.dom.stageArena, `[${move.selfStatus}]`, "heal", "p1");
    }

    // 5. Apply Damage to CPU
    if (damage > 0) {
      if (this.p2Statuses.has("CORRODED")) damage = Math.round(damage * 1.4);
      this.p2Hp = Math.max(0, this.p2Hp - damage);

      this.spawnFloatingCombatText(
        this.dom.stageArena,
        `-${damage}${isSynergyTriggered ? " 🔥 COMBO!" : ""}`,
        isSynergyTriggered || isCrit ? "crit" : "damage",
        "p2"
      );

      this.dom.p2SpriteBox.classList.add("hit-shake");
      setTimeout(() => this.dom.p2SpriteBox.classList.remove("hit-shake"), 350);
    }

    // 6. Healing moves
    if (move.heal) {
      this.p1Hp = Math.min(this.p1MaxHp, this.p1Hp + move.heal);
      this.spawnFloatingCombatText(this.dom.stageArena, `+${move.heal} HP`, "heal", "p1");
    }

    // Record word mastery
    window.ARCADE_DATA.recordWordUsage(move.verb, true, isCrit || isSynergyTriggered);
    this.matchVerbLog.push({
      verb: move.verb,
      ipa: move.ipa,
      definition: move.definition,
      damage: damage,
      isCrit: isCrit,
      isSynergy: isSynergyTriggered
    });

    this.updateHUD();
    this.updateSentenceDisplay(move);

    // Check KO
    if (this.p2Hp <= 0) {
      this.triggerKO(true);
      return;
    }

    // If out of AP, automatically end player turn after a brief delay
    if (this.p1Ap <= 0) {
      setTimeout(() => {
        if (this.battleActive && this.currentPhase === "PLAYER") {
          this.endPlayerTurn();
        }
      }, 1000);
    } else {
      this.renderActionDeck();
    }
  }

  endPlayerTurn() {
    this.currentPhase = "ENEMY";
    this.dom.turnPhasePill.textContent = "ENEMY TURN";
    this.dom.turnPhasePill.classList.add("enemy-turn");
    this.renderActionDeck(); // Disables cards

    // Enemy gains 2 AP
    this.p2Ap = Math.min(this.p2MaxAp, this.p2Ap + 2);
    this.processStatusTicks(this.p2Statuses, "p2");

    if (this.p2Hp <= 0) {
      this.triggerKO(true);
      return;
    }

    // Schedule Enemy Attack after 1.2s
    setTimeout(() => {
      if (!this.battleActive) return;
      this.executeEnemyTurn();
    }, 1200);
  }

  // =========================================================================
  // ENEMY TURN & EXPEDITION 33 ACTIVE DEFENSE (DODGE / PARRY)
  // =========================================================================
  executeEnemyTurn() {
    if (!this.battleActive) return;

    // Pick best affordable enemy attack
    const affordableMoves = this.selectedP2.moves.filter(m => m.apCost <= this.p2Ap);
    const chosenMove = affordableMoves.length > 0
      ? affordableMoves[Math.floor(Math.random() * affordableMoves.length)]
      : this.selectedP2.moves[0];

    this.currentEnemyAttack = chosenMove;
    this.p2Ap = Math.max(0, this.p2Ap - chosenMove.apCost);
    this.updateHUD();

    // Telegraph Attack!
    this.dom.defenseCueText.innerHTML = `⚠️ ${this.selectedP2.name} is charging <u>${chosenMove.verb.toUpperCase()}</u>!`;
    this.dom.defensePanel.classList.add("active");
    this.defenseActive = true;
    this.defenseResolved = false;

    // Launch Sweeping Timing Cursor (1.4s sweep)
    const sweepDuration = 1400;
    const startTime = performance.now();

    const animateDefense = (time) => {
      if (!this.defenseActive) return;
      const elapsed = time - startTime;
      this.defenseProgress = Math.min(1.0, elapsed / sweepDuration);

      // Cursor moves from 0% to 100%
      const pct = this.defenseProgress * 100;
      this.dom.defenseCursor.style.left = `${pct}%`;

      if (this.defenseProgress >= 1.0) {
        // Player failed to react in time -> TAKES FULL DAMAGE!
        this.resolveDefenseResult("FAIL");
      } else {
        this.defenseRaf = requestAnimationFrame(animateDefense);
      }
    };

    this.defenseRaf = requestAnimationFrame(animateDefense);
  }

  handleDodgeAttempt() {
    if (!this.defenseActive || this.defenseResolved) return;
    this.defenseResolved = true;

    // Dodge has a wide, forgiving window (40% to 92%)
    if (this.defenseProgress >= 0.40 && this.defenseProgress <= 0.95) {
      this.resolveDefenseResult("DODGE_SUCCESS");
    } else {
      this.resolveDefenseResult("FAIL");
    }
  }

  handleParryAttempt() {
    if (!this.defenseActive || this.defenseResolved) return;
    this.defenseResolved = true;

    // Parry requires tight sweet spot (68% to 88%)
    if (this.defenseProgress >= 0.68 && this.defenseProgress <= 0.88) {
      this.resolveDefenseResult("PARRY_PERFECT");
    } else {
      this.resolveDefenseResult("FAIL");
    }
  }

  resolveDefenseResult(result) {
    this.defenseActive = false;
    cancelAnimationFrame(this.defenseRaf);
    this.dom.defensePanel.classList.remove("active");

    const move = this.currentEnemyAttack;

    if (result === "PARRY_PERFECT") {
      // 0 Damage Taken + 1 AP + Instant Counter-Strike!
      window.ARCADE_AUDIO.playParry();
      this.spawnFloatingCombatText(this.dom.stageArena, "⚔️ PERFECT PARRY! (0 DMG)", "parry", "p1");

      this.p1Ap = Math.min(this.p1MaxAp, this.p1Ap + 1); // +1 AP Reward
      const counterDmg = Math.round(move.damage * 0.8);
      this.p2Hp = Math.max(0, this.p2Hp - counterDmg);

      this.spawnFloatingCombatText(this.dom.stageArena, `COUNTER-STRIKE! -${counterDmg}`, "crit", "p2");
      this.dom.p2SpriteBox.classList.add("hit-shake");
      setTimeout(() => this.dom.p2SpriteBox.classList.remove("hit-shake"), 350);

    } else if (result === "DODGE_SUCCESS") {
      // Safe Evasion, 0 damage taken
      window.ARCADE_AUDIO.playSlash();
      this.spawnFloatingCombatText(this.dom.stageArena, "🛡️ DODGED! (0 DMG)", "dodge", "p1");

    } else {
      // Failed! Enemy attack connects with full brutality!
      window.ARCADE_AUDIO.playHit(true);
      let incomingDmg = move.damage;

      // Status modifiers
      if (this.p1Statuses.has("FORTIFIED")) incomingDmg = Math.round(incomingDmg * 0.5);
      if (this.p1Statuses.has("EXPOSED")) incomingDmg = Math.round(incomingDmg * 1.5);

      this.p1Hp = Math.max(0, this.p1Hp - incomingDmg);

      this.dom.p2SpriteBox.classList.add("attacking");
      setTimeout(() => this.dom.p2SpriteBox.classList.remove("attacking"), 400);

      this.dom.p1SpriteBox.classList.add("hit-shake");
      setTimeout(() => this.dom.p1SpriteBox.classList.remove("hit-shake"), 350);

      this.spawnFloatingCombatText(this.dom.stageArena, `-${incomingDmg}`, "damage", "p1");

      if (move.status) {
        this.p1Statuses.set(move.status, 2);
      }
    }

    this.updateHUD();

    // Check KO
    if (this.p1Hp <= 0) {
      this.triggerKO(false);
      return;
    }
    if (this.p2Hp <= 0) {
      this.triggerKO(true);
      return;
    }

    // End enemy turn, return to Player turn
    setTimeout(() => {
      if (this.battleActive) this.startPlayerTurn();
    }, 1000);
  }

  processStatusTicks(statusMap, target) {
    statusMap.forEach((turns, name) => {
      if (name === "BLEEDING" || name === "POISONED" || name === "SCORCHED") {
        const tickDmg = 20;
        if (target === "p1") {
          this.p1Hp = Math.max(0, this.p1Hp - tickDmg);
          this.spawnFloatingCombatText(this.dom.stageArena, `-${tickDmg} [${name}]`, "damage", "p1");
        } else {
          this.p2Hp = Math.max(0, this.p2Hp - tickDmg);
          this.spawnFloatingCombatText(this.dom.stageArena, `-${tickDmg} [${name}]`, "damage", "p2");
        }
      }

      if (turns <= 1) {
        statusMap.delete(name);
      } else {
        statusMap.set(name, turns - 1);
      }
    });
  }

  // =========================================================================
  // UI & RENDERING
  // =========================================================================
  updateHUD() {
    // HP Bars
    const p1Pct = (this.p1Hp / this.p1MaxHp) * 100;
    const p2Pct = (this.p2Hp / this.p2MaxHp) * 100;

    this.dom.p1HealthFill.style.width = `${p1Pct}%`;
    this.dom.p1HealthText.textContent = `${this.p1Hp} / ${this.p1MaxHp} HP`;
    setTimeout(() => { this.dom.p1HealthGhost.style.width = `${p1Pct}%`; }, 200);

    this.dom.p2HealthFill.style.width = `${p2Pct}%`;
    this.dom.p2HealthText.textContent = `${this.p2Hp} / ${this.p2MaxHp} HP`;
    setTimeout(() => { this.dom.p2HealthGhost.style.width = `${p2Pct}%`; }, 200);

    // AP Pips (Expedition 33)
    this.renderApPips(this.dom.p1ApPips, this.p1Ap, this.p1MaxAp);
    this.renderApPips(this.dom.p2ApPips, this.p2Ap, this.p2MaxAp);

    // Status Badges
    this.renderStatusBadges(this.dom.p1StatusStrip, this.p1Statuses);
    this.renderStatusBadges(this.dom.p2StatusStrip, this.p2Statuses);
  }

  renderApPips(container, current, max) {
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < max; i++) {
      const pip = document.createElement("div");
      pip.className = `ap-pip ${i < current ? "filled" : ""}`;
      pip.textContent = "⚡";
      container.appendChild(pip);
    }
  }

  renderStatusBadges(container, statusMap) {
    if (!container) return;
    container.innerHTML = "";
    statusMap.forEach((turns, name) => {
      const badge = document.createElement("span");
      badge.className = `status-badge badge-${name.toLowerCase()}`;
      badge.textContent = `${name} (${turns}t)`;
      container.appendChild(badge);
    });
  }

  renderAdverbBar() {
    this.dom.adverbStrip.innerHTML = `<span class="adverb-strip-label">ADVERB COMBO:</span>`;
    this.adverbs.forEach(adv => {
      const chip = document.createElement("button");
      chip.className = `adverb-chip ${this.selectedAdverb === adv.adverb ? "selected" : ""}`;
      chip.textContent = adv.adverb;
      chip.title = `${adv.desc}`;

      chip.addEventListener("click", () => {
        window.ARCADE_AUDIO.playSelect();
        this.selectedAdverb = this.selectedAdverb === adv.adverb ? null : adv.adverb;
        this.renderAdverbBar();
        this.updateSentenceDisplay();
      });

      this.dom.adverbStrip.appendChild(chip);
    });
  }

  renderActionDeck() {
    this.dom.actionCardsGrid.innerHTML = "";
    const isPlayerTurn = this.currentPhase === "PLAYER";

    this.selectedP1.moves.forEach((move, idx) => {
      const card = document.createElement("div");
      const canAfford = isPlayerTurn && (this.p1Ap >= move.apCost);
      card.className = `action-verb-card ${move.type === "finisher" ? "finisher" : ""} ${!canAfford ? "disabled" : ""}`;

      card.innerHTML = `
        <div class="card-top-line">
          <span class="card-verb-title">${move.verb}</span>
          <span class="card-ap-badge">${move.apCost} AP</span>
        </div>
        <div class="card-ipa-label">${move.ipa} • ${move.damage} DMG</div>
        <div class="card-definition-text">${move.definition}</div>
        <div class="card-synergy-hint">${move.synergyHint}</div>
      `;

      card.addEventListener("click", () => {
        if (canAfford) this.preparePlayerAction(move);
      });

      this.dom.actionCardsGrid.appendChild(card);
    });
  }

  updateSentenceDisplay(activeMove = null) {
    const p1 = this.selectedP1.name;
    const p2 = this.selectedP2.name;
    const adv = this.selectedAdverb ? `<span style="color: var(--neon-purple);">${this.selectedAdverb.toUpperCase()}</span> ` : "";
    const verb = activeMove ? `<span style="color: var(--neon-cyan);">${activeMove.verb.toUpperCase()}S</span> ` : `[CHOOSE MOVE] `;
    this.dom.sentenceDisplay.innerHTML = `${p1} ${adv}${verb}${p2}!`;
  }

  spawnFloatingCombatText(container, text, type, side) {
    const elem = document.createElement("div");
    elem.className = `combat-floating-text ${type}`;
    elem.textContent = text;
    elem.style.left = side === "p1" ? "25%" : "70%";
    elem.style.top = "38%";
    container.appendChild(elem);
    setTimeout(() => elem.remove(), 1000);
  }

  triggerKO(playerWon) {
    this.battleActive = false;
    clearInterval(this.timerInterval);
    cancelAnimationFrame(this.qteRaf);
    cancelAnimationFrame(this.defenseRaf);

    if (playerWon) {
      window.ARCADE_AUDIO.playVictory();
      this.dom.koBannerText.textContent = "K.O.! VICTORY!";
      this.dom.koBannerText.style.color = "var(--neon-yellow)";
      this.dom.koSubBanner.textContent = `Masterful Tactical Syntax & Reaction Timing! +150 XP`;
    } else {
      window.ARCADE_AUDIO.playDefeat();
      this.dom.koBannerText.textContent = "DEFEAT...";
      this.dom.koBannerText.style.color = "var(--neon-pink)";
      this.dom.koSubBanner.textContent = `Remember to time your Dodges and Parries!`;
    }

    window.ARCADE_DATA.recordMatchResult(playerWon, 1);

    // Populate post-match lexical debriefing
    this.dom.koVerbsList.innerHTML = "";
    const uniqueVerbs = {};
    this.matchVerbLog.forEach(log => {
      uniqueVerbs[log.verb] = log;
    });

    Object.values(uniqueVerbs).forEach(item => {
      const chip = document.createElement("div");
      chip.className = "ko-verb-chip";
      chip.innerHTML = `
        <strong>${item.verb} ${item.ipa}</strong>
        <span>${item.definition}</span>
      `;
      this.dom.koVerbsList.appendChild(chip);
    });

    this.dom.koOverlay.classList.add("open");
  }
}

/**
 * Combat Field Guide & Practice Gym Manager
 */
class CombatGuideManager {
  constructor() {
    this.modal = document.getElementById("combatGuideModal");
    this.currentStep = 1;
    this.totalSteps = 5;

    this.drillRaf = null;
    this.drillActive = false;
    this.drillProgress = 0;
    this.drillMode = null; // "qte" or "defense"

    this.init();
  }

  init() {
    // Open Buttons
    const btnSelect = document.getElementById("btnOpenCombatGuide");
    const btnInGame = document.getElementById("btnInGameGuide");
    const btnClose = document.getElementById("btnCloseGuide");

    if (btnSelect) btnSelect.addEventListener("click", () => this.open());
    if (btnInGame) btnInGame.addEventListener("click", () => this.open());
    if (btnClose) btnClose.addEventListener("click", () => this.close());

    // Navigation Buttons
    const btnNext = document.getElementById("btnGuideNext");
    const btnPrev = document.getElementById("btnGuidePrev");

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        window.ARCADE_AUDIO.playSelect();
        this.goToStep(Math.min(this.totalSteps, this.currentStep + 1));
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        window.ARCADE_AUDIO.playSelect();
        this.goToStep(Math.max(1, this.currentStep - 1));
      });
    }

    // Tabs
    document.querySelectorAll(".guide-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        window.ARCADE_AUDIO.playSelect();
        this.goToStep(parseInt(btn.dataset.step));
      });
    });

    // Practice Drills
    const btnDrillQte = document.getElementById("btnDrillQte");
    const btnDrillDefense = document.getElementById("btnDrillDefense");

    if (btnDrillQte) {
      btnDrillQte.addEventListener("click", () => this.startPracticeQte());
    }
    if (btnDrillDefense) {
      btnDrillDefense.addEventListener("click", () => this.startPracticeDefense());
    }
  }

  open() {
    window.ARCADE_AUDIO.playSelect();
    this.goToStep(1);
    if (this.modal) this.modal.classList.add("open");
  }

  close() {
    window.ARCADE_AUDIO.playBack();
    this.stopDrill();
    if (this.modal) this.modal.classList.remove("open");
  }

  goToStep(step) {
    this.currentStep = step;

    // Update Tab Highlights
    document.querySelectorAll(".guide-tab-btn").forEach(btn => {
      btn.classList.toggle("active", parseInt(btn.dataset.step) === step);
    });

    // Update Panes
    for (let i = 1; i <= this.totalSteps; i++) {
      const pane = document.getElementById(`guidePane${i}`);
      if (pane) pane.classList.toggle("active", i === step);
    }

    // Update Counter & Buttons
    const counter = document.getElementById("guideStepCounter");
    if (counter) counter.textContent = `Step ${step} of ${this.totalSteps}`;

    const btnNext = document.getElementById("btnGuideNext");
    if (btnNext) btnNext.textContent = step === this.totalSteps ? "Close Manual ✓" : "Next ▶";

    if (step === this.totalSteps && btnNext) {
      btnNext.onclick = () => this.close();
    } else if (btnNext) {
      btnNext.onclick = () => this.goToStep(Math.min(this.totalSteps, this.currentStep + 1));
    }
  }

  // ==========================================
  // PRACTICE DRILL 1: OFFENSIVE QTE
  // ==========================================
  startPracticeQte() {
    this.stopDrill();
    this.drillMode = "qte";
    this.drillActive = true;
    this.drillProgress = 0;

    const playArea = document.getElementById("drillPlayArea");
    const feedback = document.getElementById("drillFeedbackText");
    if (!playArea || !feedback) return;

    feedback.textContent = "🎯 Press SPACEBAR or CLICK when the ring hits the gold target!";
    feedback.style.color = "var(--neon-yellow)";

    playArea.innerHTML = `
      <div style="position: relative; width: 110px; height: 110px; display: flex; align-items: center; justify-content: center; cursor: pointer;" id="practiceQteTarget">
        <div style="width: 50px; height: 50px; border-radius: 50%; border: 3px solid var(--neon-yellow); box-shadow: 0 0 15px rgba(255,230,0,0.8); position: absolute;"></div>
        <div id="practiceQteRing" style="width: 110px; height: 110px; border-radius: 50%; border: 3px solid var(--neon-cyan); position: absolute;"></div>
        <span style="font-family: var(--font-retro); font-size: 8px; color: #fff; z-index: 2;">HIT!</span>
      </div>
    `;

    const target = document.getElementById("practiceQteTarget");
    const ring = document.getElementById("practiceQteRing");

    const onHit = () => {
      if (!this.drillActive) return;
      this.drillActive = false;
      cancelAnimationFrame(this.drillRaf);

      // Sweet spot evaluation
      if (this.drillProgress >= 0.72 && this.drillProgress <= 0.95) {
        window.ARCADE_AUDIO.playCrit();
        feedback.innerHTML = "⚡ <b>PERFECT SYNTAX!</b> (+50% Crit Damage & +1 AP Refund!)";
        feedback.style.color = "var(--neon-yellow)";
      } else {
        window.ARCADE_AUDIO.playHit(false);
        feedback.innerHTML = "GOOD! (Normal Damage. Try to hit closer to the center!)";
        feedback.style.color = "var(--neon-cyan)";
      }
    };

    target.addEventListener("click", onHit);

    const onKey = (e) => {
      if (e.code === "Space" && this.drillMode === "qte") {
        e.preventDefault();
        window.removeEventListener("keydown", onKey);
        onHit();
      }
    };
    window.addEventListener("keydown", onKey, { once: true });

    const startTime = performance.now();
    const duration = 900;

    const animate = (time) => {
      if (!this.drillActive) return;
      const elapsed = time - startTime;
      this.drillProgress = Math.min(1.0, elapsed / duration);

      const currentScale = 2.2 - (this.drillProgress * 1.4);
      ring.style.transform = `scale(${currentScale})`;

      if (this.drillProgress >= 1.0) {
        this.drillActive = false;
        window.ARCADE_AUDIO.playStun();
        feedback.innerHTML = "⚠️ FUMBLE! (Missed timing: Deals 50% damage. Try again!)";
        feedback.style.color = "#ef4444";
      } else {
        this.drillRaf = requestAnimationFrame(animate);
      }
    };

    this.drillRaf = requestAnimationFrame(animate);
  }

  // ==========================================
  // PRACTICE DRILL 2: DEFENSE (DODGE / PARRY)
  // ==========================================
  startPracticeDefense() {
    this.stopDrill();
    this.drillMode = "defense";
    this.drillActive = true;
    this.drillProgress = 0;

    const playArea = document.getElementById("drillPlayArea");
    const feedback = document.getElementById("drillFeedbackText");
    if (!playArea || !feedback) return;

    feedback.textContent = "🛡️ Cursor sweeping! Press [SPACE] for Safe Dodge, or [P] in the Gold Zone for PARRY!";
    feedback.style.color = "var(--neon-cyan)";

    playArea.innerHTML = `
      <div style="width: 85%; display: flex; flex-direction: column; gap: 8px;">
        <div style="font-size: 11px; color: #94a3b8; font-weight: 700; text-align: left;">
          SIMULATED ENEMY ATTACK SWEEP:
        </div>
        <div style="width: 100%; height: 16px; background: #1e202e; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; position: relative; overflow: hidden;">
          <div style="position: absolute; left: 68%; width: 20%; height: 100%; background: rgba(255,230,0,0.4); border-left: 2px solid var(--neon-yellow); border-right: 2px solid var(--neon-yellow);"></div>
          <div id="practiceCursor" style="position: absolute; top: 0; left: 0%; width: 8px; height: 100%; background: #fff; box-shadow: 0 0 10px #fff;"></div>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 4px;">
          <button class="arcade-btn btn-cyan" id="btnTestDodge" style="font-size: 11px; padding: 4px 12px;">🛡️ DODGE [SPACE]</button>
          <button class="arcade-btn btn-yellow" id="btnTestParry" style="font-size: 11px; padding: 4px 12px;">⚔️ PARRY [KEY P]</button>
        </div>
      </div>
    `;

    const cursor = document.getElementById("practiceCursor");

    const resolveAction = (isParry) => {
      if (!this.drillActive) return;
      this.drillActive = false;
      cancelAnimationFrame(this.drillRaf);

      if (isParry) {
        if (this.drillProgress >= 0.68 && this.drillProgress <= 0.88) {
          window.ARCADE_AUDIO.playParry();
          feedback.innerHTML = "⚔️ <b>PERFECT PARRY!</b> (0 Damage Taken, +1 AP Refund & Counter-Strike Triggered!)";
          feedback.style.color = "var(--neon-yellow)";
        } else {
          window.ARCADE_AUDIO.playHit(true);
          feedback.innerHTML = "❌ PARRY MISSED! (Mistimed sweet spot. Full damage taken!)";
          feedback.style.color = "#ef4444";
        }
      } else {
        // Dodge has wide window (0.40 to 0.95)
        if (this.drillProgress >= 0.40 && this.drillProgress <= 0.95) {
          window.ARCADE_AUDIO.playSlash();
          feedback.innerHTML = "🛡️ <b>DODGE SUCCESS!</b> (Safe Evasion: 0 Damage Taken!)";
          feedback.style.color = "var(--neon-cyan)";
        } else {
          window.ARCADE_AUDIO.playHit(true);
          feedback.innerHTML = "❌ DODGE FAILED! (Pressed too early or too late!)";
          feedback.style.color = "#ef4444";
        }
      }
    };

    document.getElementById("btnTestDodge").addEventListener("click", () => resolveAction(false));
    document.getElementById("btnTestParry").addEventListener("click", () => resolveAction(true));

    const onKey = (e) => {
      if (!this.drillActive || this.drillMode !== "defense") return;
      if (e.code === "Space") {
        e.preventDefault();
        resolveAction(false);
      } else if (e.code === "KeyP") {
        e.preventDefault();
        resolveAction(true);
      }
    };
    window.addEventListener("keydown", onKey);

    const startTime = performance.now();
    const duration = 1400;

    const animate = (time) => {
      if (!this.drillActive) return;
      const elapsed = time - startTime;
      this.drillProgress = Math.min(1.0, elapsed / duration);

      cursor.style.left = `${this.drillProgress * 100}%`;

      if (this.drillProgress >= 1.0) {
        this.drillActive = false;
        window.ARCADE_AUDIO.playHit(true);
        feedback.innerHTML = "❌ TIME OUT! (Attack connected! Always Dodge or Parry!)";
        feedback.style.color = "#ef4444";
      } else {
        this.drillRaf = requestAnimationFrame(animate);
      }
    };

    this.drillRaf = requestAnimationFrame(animate);
  }

  stopDrill() {
    this.drillActive = false;
    cancelAnimationFrame(this.drillRaf);
  }
}

// Global initialization
if (typeof window !== "undefined") {
  window.SyntaxFighterGame = SyntaxFighterGame;
  window.addEventListener("DOMContentLoaded", () => {
    window.COMBAT_GUIDE = new CombatGuideManager();
  });
}

