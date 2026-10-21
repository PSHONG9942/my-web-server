/**
 * PixCross - Main Application Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const gridContainer = document.getElementById("grid-container");
  const puzzleSelect = document.getElementById("puzzle-select");
  const timerDisplay = document.getElementById("timer-display");
  const btnPause = document.getElementById("btn-pause");
  const btnSound = document.getElementById("btn-sound");
  const btnTheme = document.getElementById("btn-theme");
  const btnHintLetter = document.getElementById("btn-hint-letter");
  const btnHintWord = document.getElementById("btn-hint-word");
  const btnCheckErrors = document.getElementById("btn-check-errors");
  const btnReset = document.getElementById("btn-reset");
  const btnPrint = document.getElementById("btn-print");
  const btnEditor = document.getElementById("btn-editor");
  const btnExport = document.getElementById("btn-export");
  const btnImport = document.getElementById("btn-import");
  const fileImportInput = document.getElementById("file-import-input");

  // Clue Spotlight Elements
  const clueImage = document.getElementById("clue-image");
  const clueNumberBadge = document.getElementById("clue-number-badge");
  const clueDirectionBadge = document.getElementById("clue-direction-badge");
  const clueLengthBadge = document.getElementById("clue-length-badge");
  const clueCaption = document.getElementById("clue-caption");
  const clueHintText = document.getElementById("clue-hint-text");
  const btnRevealHint = document.getElementById("btn-reveal-hint");
  const clueFactBox = document.getElementById("clue-fact-box");
  const clueFactText = document.getElementById("clue-fact-text");
  const btnInspectImage = document.getElementById("btn-inspect-image");

  // Clue List Container
  const clueListContainer = document.getElementById("clue-list-container");
  const clueTabs = document.querySelectorAll(".clue-tab");

  // Virtual Keyboard
  const virtualKeyboard = document.getElementById("virtual-keyboard");

  // Modals
  const victoryModal = document.getElementById("victory-modal");
  const victoryTime = document.getElementById("victory-time");
  const victoryHints = document.getElementById("victory-hints");
  const victoryStars = document.getElementById("victory-stars");
  const btnNextPuzzle = document.getElementById("btn-next-puzzle");
  const btnReplay = document.getElementById("btn-replay");

  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const btnCloseLightbox = document.getElementById("btn-close-lightbox");

  const editorModal = document.getElementById("editor-modal");

  // State
  let currentPuzzleIndex = 0;
  let activePuzzles = [...window.PUZZLE_PACKS];
  let timerSeconds = 0;
  let timerInterval = null;
  let isTimerRunning = false;
  let hintsUsed = 0;
  let currentFilter = "all"; // "all" | "across" | "down"

  // Load custom puzzles from localStorage
  try {
    const savedCustom = localStorage.getItem("pixcross_custom_puzzles");
    if (savedCustom) {
      const parsed = JSON.parse(savedCustom);
      if (Array.isArray(parsed)) {
        activePuzzles = [...window.PUZZLE_PACKS, ...parsed];
      }
    }
  } catch (e) {
    console.warn("Could not load custom puzzles from storage:", e);
  }

  // Initialize Crossword Engine
  const engine = new window.CrosswordEngine({
    container: gridContainer,
    onWordSelect: word => updateSpotlight(word),
    onWordSolved: word => handleWordSolved(word),
    onPuzzleSolved: stats => handlePuzzleSolved(stats),
    onCellChange: () => {}
  });

  // Initialize Puzzle Editor
  const editor = new window.PuzzleEditor({
    modalEl: editorModal
  });
  editor.init();

  // Populate Puzzle Selector
  function renderPuzzleSelector() {
    puzzleSelect.innerHTML = "";
    activePuzzles.forEach((p, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      const isCustom = p.difficulty === "Custom";
      opt.textContent = `${p.icon || "🧩"} ${p.title} (${p.difficulty})`;
      if (idx === currentPuzzleIndex) opt.selected = true;
      puzzleSelect.appendChild(opt);
    });
  }

  // Timer functions
  function startTimer() {
    stopTimer();
    isTimerRunning = true;
    timerInterval = setInterval(() => {
      timerSeconds++;
      updateTimerDisplay();
    }, 1000);
  }

  function stopTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
  }

  function resetTimer() {
    stopTimer();
    timerSeconds = 0;
    hintsUsed = 0;
    updateTimerDisplay();
  }

  function formatTime(totalSec) {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timerSeconds);
  }

  // Load Puzzle
  function loadCurrentPuzzle() {
    const p = activePuzzles[currentPuzzleIndex];
    if (!p) return;

    resetTimer();
    engine.loadPuzzle(p);
    startTimer();
    renderClueList();
  }

  // Clue Spotlight Update
  function updateSpotlight(word) {
    if (!word) return;

    clueImage.src = word.image || "assets/images/logo.jpg";
    clueImage.alt = word.caption || word.answer;
    clueNumberBadge.textContent = `#${word.number}`;
    clueDirectionBadge.textContent = word.direction.toUpperCase();
    clueDirectionBadge.className = `clue-badge badge-${word.direction}`;
    clueLengthBadge.textContent = `${word.answer.length} LETTERS`;
    clueCaption.textContent = word.caption || "Identify the image!";

    // Reset hints & facts
    clueHintText.classList.add("hidden");
    clueHintText.textContent = word.hint || "No additional hint available.";
    btnRevealHint.classList.remove("hidden");

    if (engine.solvedWords.has(word.id) && word.fact) {
      clueFactBox.classList.remove("hidden");
      clueFactText.textContent = word.fact;
    } else {
      clueFactBox.classList.add("hidden");
    }

    // Highlight active clue in clue list
    const items = clueListContainer.querySelectorAll(".clue-list-item");
    items.forEach(el => {
      if (el.dataset.id === word.id) {
        el.classList.add("item-active");
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        el.classList.remove("item-active");
      }
    });
  }

  function handleWordSolved(word) {
    if (word.fact) {
      clueFactBox.classList.remove("hidden");
      clueFactText.textContent = word.fact;
    }
    renderClueList();
  }

  function handlePuzzleSolved(stats) {
    stopTimer();
    const finalFormatted = formatTime(timerSeconds);

    // Calculate rating
    let stars = "★★★";
    if (hintsUsed > 3 || timerSeconds > 420) {
      stars = "★☆☆";
    } else if (hintsUsed > 0 || timerSeconds > 240) {
      stars = "★★☆";
    }

    victoryTime.textContent = finalFormatted;
    victoryHints.textContent = hintsUsed;
    victoryStars.textContent = stars;

    // Save best score to localStorage
    const pId = stats.puzzleId;
    const bestKey = `pixcross_best_${pId}`;
    const prevBest = localStorage.getItem(bestKey);
    if (!prevBest || timerSeconds < parseInt(prevBest)) {
      localStorage.setItem(bestKey, timerSeconds);
    }

    victoryModal.classList.remove("hidden");
    launchConfetti();
  }

  // Render Clue List
  function renderClueList() {
    clueListContainer.innerHTML = "";
    const p = activePuzzles[currentPuzzleIndex];
    if (!p) return;

    let filteredWords = p.words;
    if (currentFilter === "across") {
      filteredWords = p.words.filter(w => w.direction === "across");
    } else if (currentFilter === "down") {
      filteredWords = p.words.filter(w => w.direction === "down");
    }

    filteredWords.forEach(word => {
      const isSolved = engine.solvedWords.has(word.id);
      const isActive = engine.activeWord && engine.activeWord.id === word.id;

      const item = document.createElement("div");
      item.className = `clue-list-item ${isActive ? "item-active" : ""} ${isSolved ? "item-solved" : ""}`;
      item.dataset.id = word.id;

      item.innerHTML = `
        <div class="clue-item-thumb">
          <img src="${word.image || 'assets/images/logo.jpg'}" alt="Clue ${word.number}" />
          ${isSolved ? '<div class="solved-check">✓</div>' : ""}
        </div>
        <div class="clue-item-info">
          <div class="clue-item-header">
            <span class="clue-num">${word.number}.</span>
            <span class="clue-dir-tag tag-${word.direction}">${word.direction[0].toUpperCase()}</span>
            <span class="clue-len">(${word.answer.length})</span>
          </div>
          <div class="clue-item-caption">${word.caption}</div>
        </div>
      `;

      item.addEventListener("click", () => {
        engine.selectWordById(word.id);
      });

      clueListContainer.appendChild(item);
    });
  }

  // Virtual On-Screen Keyboard
  function initVirtualKeyboard() {
    const layout = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["CHECK", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
    ];

    virtualKeyboard.innerHTML = "";
    layout.forEach(row => {
      const rowEl = document.createElement("div");
      rowEl.className = "keyboard-row";
      row.forEach(key => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "keyboard-key";
        btn.textContent = key;

        if (key === "⌫") {
          btn.classList.add("key-action", "key-backspace");
          btn.addEventListener("click", () => engine.deleteChar());
        } else if (key === "CHECK") {
          btn.classList.add("key-action", "key-check");
          btn.addEventListener("click", () => engine.checkErrors());
        } else {
          btn.addEventListener("click", () => engine.inputChar(key));
        }

        rowEl.appendChild(btn);
      });
      virtualKeyboard.appendChild(rowEl);
    });
  }

  // Clue Tabs (All / Across / Down)
  clueTabs.forEach(tab => {
    tab.addEventListener("click", e => {
      clueTabs.forEach(t => t.classList.remove("tab-active"));
      e.target.classList.add("tab-active");
      currentFilter = e.target.dataset.filter;
      renderClueList();
    });
  });

  // Action Buttons
  puzzleSelect.addEventListener("change", e => {
    currentPuzzleIndex = parseInt(e.target.value);
    loadCurrentPuzzle();
  });

  btnPause.addEventListener("click", () => {
    if (isTimerRunning) {
      stopTimer();
      btnPause.textContent = "▶ Resume";
      btnPause.classList.add("btn-paused");
    } else {
      startTimer();
      btnPause.textContent = "⏸ Pause";
      btnPause.classList.remove("btn-paused");
    }
  });

  btnSound.addEventListener("click", () => {
    const isMuted = window.soundController.toggleMute();
    btnSound.textContent = isMuted ? "🔇 Muted" : "🔊 Sound";
    btnSound.classList.toggle("btn-sound-muted", isMuted);
  });
  if (window.soundController.isMuted()) {
    btnSound.textContent = "🔇 Muted";
    btnSound.classList.add("btn-sound-muted");
  }

  btnTheme.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("theme-dark");
    localStorage.setItem("pixcross_dark_mode", isDark);
    btnTheme.textContent = isDark ? "☀️ Light" : "🌙 Dark";
  });
  if (localStorage.getItem("pixcross_dark_mode") === "true") {
    document.body.classList.add("theme-dark");
    btnTheme.textContent = "☀️ Light";
  }

  btnHintLetter.addEventListener("click", () => {
    hintsUsed++;
    engine.revealCurrentLetter();
  });

  btnHintWord.addEventListener("click", () => {
    hintsUsed += 3;
    engine.revealCurrentWord();
  });

  btnCheckErrors.addEventListener("click", () => {
    const errors = engine.checkErrors();
    if (errors === 0) {
      alert("Great job! All filled letters are currently correct.");
    }
  });

  btnReset.addEventListener("click", () => {
    if (confirm("Reset current puzzle board?")) {
      engine.clearPuzzle();
      renderClueList();
    }
  });

  btnRevealHint.addEventListener("click", () => {
    hintsUsed++;
    clueHintText.classList.remove("hidden");
    btnRevealHint.classList.add("hidden");
  });

  btnInspectImage.addEventListener("click", () => {
    if (engine.activeWord) {
      lightboxImg.src = engine.activeWord.image || "assets/images/logo.jpg";
      lightboxCaption.textContent = `#${engine.activeWord.number} ${engine.activeWord.direction.toUpperCase()} - ${engine.activeWord.caption}`;
      lightboxModal.classList.remove("hidden");
    }
  });

  btnCloseLightbox.addEventListener("click", () => {
    lightboxModal.classList.add("hidden");
  });
  lightboxModal.addEventListener("click", e => {
    if (e.target === lightboxModal) lightboxModal.classList.add("hidden");
  });

  // Victory buttons
  btnNextPuzzle.addEventListener("click", () => {
    victoryModal.classList.add("hidden");
    currentPuzzleIndex = (currentPuzzleIndex + 1) % activePuzzles.length;
    puzzleSelect.value = currentPuzzleIndex;
    loadCurrentPuzzle();
  });

  btnReplay.addEventListener("click", () => {
    victoryModal.classList.add("hidden");
    loadCurrentPuzzle();
  });

  // Worksheet Print Mode
  btnPrint.addEventListener("click", () => {
    window.print();
  });

  // Editor Modal Handlers
  btnEditor.addEventListener("click", () => {
    stopTimer();
    editor.open();
  });

  document.getElementById("btn-close-editor").addEventListener("click", () => {
    editor.close();
    startTimer();
  });

  document.getElementById("btn-add-word").addEventListener("click", () => {
    editor.addWordRow();
  });

  document.getElementById("btn-generate-puzzle").addEventListener("click", () => {
    const customPuzzle = editor.buildPuzzle();
    if (customPuzzle) {
      activePuzzles.push(customPuzzle);
      // Persist custom puzzles
      const customOnly = activePuzzles.filter(p => p.difficulty === "Custom");
      try {
        localStorage.setItem("pixcross_custom_puzzles", JSON.stringify(customOnly));
      } catch (e) {
        console.warn("Storage quota exceeded for custom puzzles:", e);
      }

      renderPuzzleSelector();
      currentPuzzleIndex = activePuzzles.length - 1;
      puzzleSelect.value = currentPuzzleIndex;
      editor.close();
      loadCurrentPuzzle();
    }
  });

  // Export JSON
  btnExport.addEventListener("click", () => {
    const p = activePuzzles[currentPuzzleIndex];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(p, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `${p.id || "crossword"}.json`);
    dlAnchor.click();
  });

  // Import JSON
  btnImport.addEventListener("click", () => {
    fileImportInput.click();
  });

  fileImportInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const imported = JSON.parse(ev.target.result);
          if (imported.rows && imported.cols && imported.words) {
            imported.difficulty = "Imported";
            activePuzzles.push(imported);
            renderPuzzleSelector();
            currentPuzzleIndex = activePuzzles.length - 1;
            puzzleSelect.value = currentPuzzleIndex;
            loadCurrentPuzzle();
            alert(`Imported "${imported.title}" successfully!`);
          } else {
            alert("Invalid crossword JSON schema.");
          }
        } catch (err) {
          alert("Error parsing JSON file: " + err.message);
        }
      };
      reader.readAsText(file);
    }
  });

  // Canvas Confetti
  function launchConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#f43f5e", "#ec4899", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#fbbf24"];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.7) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let frames = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.vRot;
        p.alpha -= 0.007;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      frames++;
      if (frames < 140) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(animate);
  }

  // Initial Boot
  renderPuzzleSelector();
  initVirtualKeyboard();
  loadCurrentPuzzle();
});
