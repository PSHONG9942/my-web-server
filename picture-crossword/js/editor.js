/**
 * PixCross - Custom Puzzle Creator & Editor
 */

class PuzzleEditor {
  constructor(options = {}) {
    this.modalEl = options.modalEl;
    this.onSavePuzzle = options.onSavePuzzle || (() => {});
    this.entries = [];
    this.availableImages = [
      { name: "Tiger", path: "assets/images/tiger.jpg" },
      { name: "Lion", path: "assets/images/lion.jpg" },
      { name: "Wolf", path: "assets/images/wolf.jpg" },
      { name: "Otter", path: "assets/images/otter.jpg" },
      { name: "Zebra", path: "assets/images/zebra.jpg" },
      { name: "Eagle", path: "assets/images/eagle.jpg" },
      { name: "Camel", path: "assets/images/camel.jpg" },
      { name: "Bread", path: "assets/images/bread.jpg" },
      { name: "Donut", path: "assets/images/donut.jpg" },
      { name: "Lemon", path: "assets/images/lemon.jpg" },
      { name: "Taco", path: "assets/images/taco.jpg" },
      { name: "Mango", path: "assets/images/mango.jpg" },
      { name: "Onion", path: "assets/images/onion.jpg" },
      { name: "Guitar", path: "assets/images/guitar.jpg" },
      { name: "Rocket", path: "assets/images/rocket.jpg" },
      { name: "Robot", path: "assets/images/robot.jpg" },
      { name: "Globe", path: "assets/images/globe.jpg" },
      { name: "Train", path: "assets/images/train.jpg" },
      { name: "Piano", path: "assets/images/piano.jpg" }
    ];
  }

  init() {
    this.renderForm();
  }

  open() {
    this.entries = [
      { answer: "TIGER", caption: "Orange and black striped predator", image: "assets/images/tiger.jpg", fact: "Tigers are powerful swimmers." },
      { answer: "EAGLE", caption: "Soaring raptor with white feathers", image: "assets/images/eagle.jpg", fact: "Eagles have remarkable vision." },
      { answer: "ROBOT", caption: "Humanoid mechanical assistant", image: "assets/images/robot.jpg", fact: "Robots explore distant planets." },
      { answer: "PIANO", caption: "Black and white grand instrument", image: "assets/images/piano.jpg", fact: "Pianos have 88 keys." }
    ];
    this.renderForm();
    this.modalEl.classList.remove("hidden");
  }

  close() {
    this.modalEl.classList.add("hidden");
  }

  renderForm() {
    const listEl = this.modalEl.querySelector("#editor-word-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    this.entries.forEach((item, index) => {
      const rowEl = document.createElement("div");
      rowEl.className = "editor-row";
      rowEl.innerHTML = `
        <div class="editor-thumb-box">
          <img src="${item.image || 'assets/images/logo.jpg'}" alt="Preview" class="editor-thumb" id="thumb-${index}" />
          <label class="btn-upload-file">
            📁
            <input type="file" accept="image/*" class="editor-file-input" data-index="${index}" style="display:none;" />
          </label>
        </div>
        <div class="editor-inputs">
          <div class="editor-input-group">
            <label>Answer Word:</label>
            <input type="text" class="input-answer" data-index="${index}" value="${item.answer}" placeholder="e.g. PANDA" maxlength="12" />
          </div>
          <div class="editor-input-group">
            <label>Clue Caption:</label>
            <input type="text" class="input-caption" data-index="${index}" value="${item.caption}" placeholder="Short flavor or hint" />
          </div>
          <div class="editor-input-group">
            <label>Fun Fact:</label>
            <input type="text" class="input-fact" data-index="${index}" value="${item.fact || ''}" placeholder="Did you know..." />
          </div>
        </div>
        <button type="button" class="btn-danger btn-delete-row" data-index="${index}" title="Remove word">✕</button>
      `;

      listEl.appendChild(rowEl);
    });

    // Attach row events
    listEl.querySelectorAll(".input-answer").forEach(input => {
      input.addEventListener("input", e => {
        const idx = parseInt(e.target.dataset.index);
        this.entries[idx].answer = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
        e.target.value = this.entries[idx].answer;
      });
    });

    listEl.querySelectorAll(".input-caption").forEach(input => {
      input.addEventListener("input", e => {
        const idx = parseInt(e.target.dataset.index);
        this.entries[idx].caption = e.target.value;
      });
    });

    listEl.querySelectorAll(".input-fact").forEach(input => {
      input.addEventListener("input", e => {
        const idx = parseInt(e.target.dataset.index);
        this.entries[idx].fact = e.target.value;
      });
    });

    listEl.querySelectorAll(".btn-delete-row").forEach(btn => {
      btn.addEventListener("click", e => {
        const idx = parseInt(e.currentTarget.dataset.index);
        if (this.entries.length > 3) {
          this.entries.splice(idx, 1);
          this.renderForm();
        } else {
          alert("A crossword needs at least 3 words!");
        }
      });
    });

    listEl.querySelectorAll(".editor-file-input").forEach(input => {
      input.addEventListener("change", e => {
        const idx = parseInt(e.target.dataset.index);
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = ev => {
            this.entries[idx].image = ev.target.result;
            const img = listEl.querySelector(`#thumb-${idx}`);
            if (img) img.src = ev.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }

  addWordRow() {
    if (this.entries.length >= 10) {
      alert("Maximum 10 words per quick puzzle.");
      return;
    }
    const sample = this.availableImages[this.entries.length % this.availableImages.length];
    this.entries.push({
      answer: sample.name.toUpperCase(),
      caption: `Picture of a ${sample.name.toLowerCase()}`,
      image: sample.path,
      fact: ""
    });
    this.renderForm();
  }

  // Crossword auto-placement layout solver
  solveLayout(wordsList) {
    const maxDim = 11;

    function canPlace(grid, word, r, c, dir) {
      const dr = dir === "down" ? 1 : 0;
      const dc = dir === "across" ? 1 : 0;
      const len = word.length;
      if (r + dr * (len - 1) >= maxDim || c + dc * (len - 1) >= maxDim) return false;
      if (r < 0 || c < 0) return false;

      const br = r - dr, bc = c - dc;
      if (br >= 0 && br < maxDim && bc >= 0 && bc < maxDim && grid[br][bc] !== null) return false;
      const ar = r + dr * len, ac = c + dc * len;
      if (ar >= 0 && ar < maxDim && ac >= 0 && ac < maxDim && grid[ar][ac] !== null) return false;

      let intersections = 0;
      for (let i = 0; i < len; i++) {
        const cr = r + dr * i, cc = c + dc * i;
        const cur = grid[cr][cc];
        if (cur !== null) {
          if (cur !== word[i]) return false;
          intersections++;
        } else {
          const pdr = dc, pdc = dr;
          for (const sign of [-1, 1]) {
            const adjR = cr + pdr * sign;
            const adjC = cc + pdc * sign;
            if (adjR >= 0 && adjR < maxDim && adjC >= 0 && adjC < maxDim) {
              if (grid[adjR][adjC] !== null) return false;
            }
          }
        }
      }
      return intersections > 0;
    }

    function place(grid, word, r, c, dir) {
      const next = grid.map(row => [...row]);
      const dr = dir === "down" ? 1 : 0;
      const dc = dir === "across" ? 1 : 0;
      for (let i = 0; i < word.length; i++) {
        next[r + dr * i][c + dc * i] = word[i];
      }
      return next;
    }

    let bestResult = null;
    const sorted = [...wordsList].sort((a, b) => b.answer.length - a.answer.length);

    function search(placed, grid, usedIndices) {
      if (placed.length === sorted.length) {
        bestResult = placed;
        return true;
      }

      for (let wIdx = 0; wIdx < sorted.length; wIdx++) {
        if (usedIndices.has(wIdx)) continue;
        const candidate = sorted[wIdx];

        for (const p of placed) {
          const otherDir = p.direction === "across" ? "down" : "across";
          for (let i = 0; i < p.answer.length; i++) {
            for (let j = 0; j < candidate.answer.length; j++) {
              if (p.answer[i] === candidate.answer[j]) {
                const r = otherDir === "across" ? p.row + (p.direction === "down" ? i : 0) : p.row + (p.direction === "down" ? i : 0) - j;
                const c = otherDir === "across" ? p.col + (p.direction === "across" ? i : 0) - j : p.col + (p.direction === "across" ? i : 0);

                if (canPlace(grid, candidate.answer, r, c, otherDir)) {
                  const nextGrid = place(grid, candidate.answer, r, c, otherDir);
                  usedIndices.add(wIdx);
                  placed.push({
                    ...candidate,
                    direction: otherDir,
                    row: r,
                    col: c
                  });

                  if (search(placed, nextGrid, usedIndices)) return true;

                  placed.pop();
                  usedIndices.delete(wIdx);
                }
              }
            }
          }
        }
      }
      return false;
    }

    // Try starting with each word at center
    for (let s = 0; s < sorted.length; s++) {
      const first = sorted[s];
      const grid = Array.from({ length: maxDim }, () => Array(maxDim).fill(null));
      const initR = 3;
      const initC = Math.max(0, Math.floor((maxDim - first.answer.length) / 2));
      const initGrid = place(grid, first.answer, initR, initC, "across");
      const used = new Set([s]);
      const placed = [{ ...first, direction: "across", row: initR, col: initC }];

      if (search(placed, initGrid, used)) {
        return this.normalizeCoordinates(bestResult);
      }
    }

    return null;
  }

  normalizeCoordinates(placedWords) {
    const minR = Math.min(...placedWords.map(w => w.row));
    const minC = Math.min(...placedWords.map(w => w.col));
    const maxR = Math.max(...placedWords.map(w => w.row + (w.direction === "down" ? w.answer.length : 1)));
    const maxC = Math.max(...placedWords.map(w => w.col + (w.direction === "across" ? w.answer.length : 1)));

    let num = 1;
    const sorted = [...placedWords].sort((a, b) => a.row === b.row ? a.col - b.col : a.row - b.row);
    sorted.forEach((w, i) => {
      w.row -= minR;
      w.col -= minC;
      w.number = i + 1;
      w.id = `custom-${i + 1}`;
    });

    return {
      rows: maxR - minR,
      cols: maxC - minC,
      words: sorted
    };
  }

  buildPuzzle() {
    const title = this.modalEl.querySelector("#custom-puzzle-title").value.trim() || "My Custom Crossword";
    const validEntries = this.entries.filter(e => e.answer && e.answer.length >= 3);

    if (validEntries.length < 3) {
      alert("Please provide at least 3 valid words with 3+ letters.");
      return null;
    }

    const solved = this.solveLayout(validEntries);
    if (!solved) {
      alert("Could not find an intersecting crossword layout for these words. Try adding words with common letters (like A, E, O, R, T).");
      return null;
    }

    const puzzle = {
      id: "custom-" + Date.now(),
      title: title,
      icon: "🎨",
      difficulty: "Custom",
      description: "A personalized user-created picture crossword puzzle.",
      rows: solved.rows,
      cols: solved.cols,
      words: solved.words
    };

    return puzzle;
  }
}

window.PuzzleEditor = PuzzleEditor;
