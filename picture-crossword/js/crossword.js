/**
 * PixCross - Crossword Engine & Grid Controller
 */

class CrosswordEngine {
  constructor(options = {}) {
    this.container = options.container;
    this.puzzle = null;
    this.grid = []; // 2D array of cell objects: { row, col, isBlocked, solution, userChar, number, acrossWord, downWord, element }
    this.words = []; // word objects with helper methods
    this.activeWord = null;
    this.activeDirection = "across"; // "across" | "down"
    this.activeCell = null; // { row, col }
    this.solvedWords = new Set();
    this.isPuzzleSolved = false;

    // Callbacks
    this.onWordSelect = options.onWordSelect || (() => {});
    this.onWordSolved = options.onWordSolved || (() => {});
    this.onPuzzleSolved = options.onPuzzleSolved || (() => {});
    this.onCellChange = options.onCellChange || (() => {});

    this.initKeyboard();
  }

  loadPuzzle(puzzleData) {
    this.puzzle = JSON.parse(JSON.stringify(puzzleData));
    this.words = this.puzzle.words;
    this.solvedWords.clear();
    this.isPuzzleSolved = false;
    this.activeWord = null;
    this.activeCell = null;

    this.buildGridMatrix();
    this.renderDOM();

    // Select first across word by default
    const firstWord = this.words.find(w => w.direction === "across") || this.words[0];
    if (firstWord) {
      this.selectWord(firstWord, firstWord.row, firstWord.col);
    }
  }

  buildGridMatrix() {
    const { rows, cols } = this.puzzle;
    this.grid = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => ({
        row: r,
        col: c,
        isBlocked: true,
        solution: "",
        userChar: "",
        number: null,
        acrossWord: null,
        downWord: null,
        element: null
      }))
    );

    // Populate words into matrix
    this.words.forEach(w => {
      w.answer = w.answer.toUpperCase();
      const len = w.answer.length;
      const isAcross = w.direction === "across";

      // Assign number to start cell
      const startCell = this.grid[w.row][w.col];
      startCell.number = w.number;

      for (let i = 0; i < len; i++) {
        const r = isAcross ? w.row : w.row + i;
        const c = isAcross ? w.col + i : w.col;
        const cell = this.grid[r][c];

        cell.isBlocked = false;
        cell.solution = w.answer[i];

        if (isAcross) {
          cell.acrossWord = w;
        } else {
          cell.downWord = w;
        }
      }
    });
  }

  renderDOM() {
    if (!this.container) return;
    this.container.innerHTML = "";

    const { rows, cols } = this.puzzle;
    const gridEl = document.createElement("div");
    gridEl.className = "crossword-grid";
    gridEl.style.setProperty("--grid-rows", rows);
    gridEl.style.setProperty("--grid-cols", cols);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cellData = this.grid[r][c];
        const cellEl = document.createElement("div");
        cellEl.className = `grid-cell ${cellData.isBlocked ? "cell-blocked" : "cell-active"}`;
        cellEl.dataset.row = r;
        cellEl.dataset.col = c;

        if (!cellData.isBlocked) {
          if (cellData.number) {
            const numEl = document.createElement("span");
            numEl.className = "cell-number";
            numEl.textContent = cellData.number;
            cellEl.appendChild(numEl);
          }

          const letterEl = document.createElement("span");
          letterEl.className = "cell-letter";
          letterEl.textContent = cellData.userChar || "";
          cellEl.appendChild(letterEl);

          cellEl.addEventListener("click", () => this.handleCellClick(r, c));
        }

        cellData.element = cellEl;
        gridEl.appendChild(cellEl);
      }
    }

    this.container.appendChild(gridEl);
  }

  handleCellClick(row, col) {
    const cell = this.grid[row][col];
    if (cell.isBlocked) return;

    if (window.soundController) window.soundController.playSelect();

    // If tapping the already active cell, toggle direction if both exist
    if (this.activeCell && this.activeCell.row === row && this.activeCell.col === col) {
      if (cell.acrossWord && cell.downWord) {
        this.activeDirection = this.activeDirection === "across" ? "down" : "across";
      }
    } else {
      // Pick direction based on availability
      if (this.activeDirection === "across" && !cell.acrossWord && cell.downWord) {
        this.activeDirection = "down";
      } else if (this.activeDirection === "down" && !cell.downWord && cell.acrossWord) {
        this.activeDirection = "across";
      }
    }

    const word = this.activeDirection === "across" ? cell.acrossWord : cell.downWord;
    this.selectWord(word || cell.acrossWord || cell.downWord, row, col);
  }

  selectWord(word, targetRow = null, targetCol = null) {
    if (!word) return;
    this.activeWord = word;
    this.activeDirection = word.direction;

    if (targetRow !== null && targetCol !== null) {
      this.activeCell = { row: targetRow, col: targetCol };
    } else {
      // Find first empty cell in this word, or default to start
      const firstEmpty = this.getFirstEmptyCellInWord(word);
      this.activeCell = firstEmpty || { row: word.row, col: word.col };
    }

    this.updateHighlighting();
    this.onWordSelect(this.activeWord);
  }

  selectWordById(wordId) {
    const word = this.words.find(w => w.id === wordId);
    if (word) {
      this.selectWord(word);
    }
  }

  getFirstEmptyCellInWord(word) {
    const isAcross = word.direction === "across";
    for (let i = 0; i < word.answer.length; i++) {
      const r = isAcross ? word.row : word.row + i;
      const c = isAcross ? word.col + i : word.col;
      if (!this.grid[r][c].userChar) {
        return { row: r, col: c };
      }
    }
    return null;
  }

  updateHighlighting() {
    // Clear previous highlighting
    const cells = this.container.querySelectorAll(".grid-cell");
    cells.forEach(el => {
      el.classList.remove("cell-selected", "cell-word-active", "cell-intersecting");
    });

    if (!this.activeWord || !this.activeCell) return;

    // Highlight all cells in active word
    const isAcross = this.activeWord.direction === "across";
    for (let i = 0; i < this.activeWord.answer.length; i++) {
      const r = isAcross ? this.activeWord.row : this.activeWord.row + i;
      const c = isAcross ? this.activeWord.col + i : this.activeWord.col;
      const cellData = this.grid[r][c];
      if (cellData && cellData.element) {
        cellData.element.classList.add("cell-word-active");
      }
    }

    // Highlight intersecting word subtly
    const currentCell = this.grid[this.activeCell.row][this.activeCell.col];
    const otherWord = this.activeDirection === "across" ? currentCell.downWord : currentCell.acrossWord;
    if (otherWord) {
      const otherAcross = otherWord.direction === "across";
      for (let i = 0; i < otherWord.answer.length; i++) {
        const r = otherAcross ? otherWord.row : otherWord.row + i;
        const c = otherAcross ? otherWord.col + i : otherWord.col;
        const cellData = this.grid[r][c];
        if (cellData && cellData.element) {
          cellData.element.classList.add("cell-intersecting");
        }
      }
    }

    // Highlight exact focused cell
    if (currentCell && currentCell.element) {
      currentCell.element.classList.add("cell-selected");
    }
  }

  inputChar(char) {
    if (!this.activeCell || this.isPuzzleSolved) return;
    const { row, col } = this.activeCell;
    const cell = this.grid[row][col];
    if (cell.isBlocked) return;

    char = char.toUpperCase();
    cell.userChar = char;
    cell.element.querySelector(".cell-letter").textContent = char;
    cell.element.classList.remove("cell-error");

    if (window.soundController) window.soundController.playKey();
    this.onCellChange({ row, col, char });

    // Check if this input completes any words
    this.checkWordState(this.activeWord);
    const crossingWord = this.activeDirection === "across" ? cell.downWord : cell.acrossWord;
    if (crossingWord) {
      this.checkWordState(crossingWord);
    }

    // If current word is now fully correct, automatically advance to next incomplete word!
    if (this.activeWord && this.isWordCorrect(this.activeWord)) {
      const nextWord = this.getNextIncompleteWord();
      if (nextWord && nextWord !== this.activeWord) {
        this.selectWord(nextWord);
        return;
      }
    }

    // Advance cursor to next cell in current word
    this.advanceCursor();
  }

  deleteChar() {
    if (!this.activeCell || this.isPuzzleSolved) return;
    const { row, col } = this.activeCell;
    const cell = this.grid[row][col];

    if (cell.userChar !== "") {
      cell.userChar = "";
      cell.element.querySelector(".cell-letter").textContent = "";
      cell.element.classList.remove("cell-error", "cell-correct");
      if (window.soundController) window.soundController.playDelete();
      this.onCellChange({ row, col, char: "" });
    } else {
      // Step back one cell and delete
      this.retreatCursor();
      const prevCell = this.grid[this.activeCell.row][this.activeCell.col];
      if (prevCell && !prevCell.isBlocked) {
        prevCell.userChar = "";
        prevCell.element.querySelector(".cell-letter").textContent = "";
        prevCell.element.classList.remove("cell-error", "cell-correct");
        if (window.soundController) window.soundController.playDelete();
        this.onCellChange({ row: this.activeCell.row, col: this.activeCell.col, char: "" });
      }
    }
    this.updateHighlighting();
  }

  advanceCursor() {
    if (!this.activeWord) return;
    const isAcross = this.activeWord.direction === "across";
    const curIdx = isAcross
      ? this.activeCell.col - this.activeWord.col
      : this.activeCell.row - this.activeWord.row;

    // Check if the current word was just completed correctly
    if (this.isWordCorrect(this.activeWord)) {
      const nextWord = this.getNextIncompleteWord();
      if (nextWord && nextWord !== this.activeWord) {
        this.selectWord(nextWord);
        return;
      }
    }

    // Look for the next empty cell in this word ahead of the current position
    let nextEmptyIdx = -1;
    for (let i = curIdx + 1; i < this.activeWord.answer.length; i++) {
      const r = isAcross ? this.activeWord.row : this.activeWord.row + i;
      const c = isAcross ? this.activeWord.col + i : this.activeWord.col;
      if (!this.grid[r][c].userChar) {
        nextEmptyIdx = i;
        break;
      }
    }

    if (nextEmptyIdx !== -1) {
      // Jump directly to the next empty cell
      const nextR = isAcross ? this.activeWord.row : this.activeWord.row + nextEmptyIdx;
      const nextC = isAcross ? this.activeWord.col + nextEmptyIdx : this.activeWord.col;
      this.activeCell = { row: nextR, col: nextC };
    } else if (curIdx < this.activeWord.answer.length - 1) {
      // If no empty cells ahead, just move forward one cell
      const nextR = isAcross ? this.activeWord.row : this.activeWord.row + curIdx + 1;
      const nextC = isAcross ? this.activeWord.col + curIdx + 1 : this.activeWord.col;
      this.activeCell = { row: nextR, col: nextC };
    } else {
      // Reached the end of the word, cycle to next incomplete word
      const nextWord = this.getNextIncompleteWord();
      if (nextWord && nextWord !== this.activeWord) {
        this.selectWord(nextWord);
        return;
      }
    }
    this.updateHighlighting();
  }

  retreatCursor() {
    if (!this.activeWord) return;
    const isAcross = this.activeWord.direction === "across";
    const curIdx = isAcross
      ? this.activeCell.col - this.activeWord.col
      : this.activeCell.row - this.activeWord.row;

    if (curIdx > 0) {
      const prevR = isAcross ? this.activeWord.row : this.activeWord.row + curIdx - 1;
      const prevC = isAcross ? this.activeWord.col + curIdx - 1 : this.activeWord.col;
      this.activeCell = { row: prevR, col: prevC };
      this.updateHighlighting();
    }
  }

  getNextIncompleteWord() {
    const uncompleted = this.words.filter(w => !this.isWordCorrect(w));
    if (uncompleted.length === 0) return null;
    const curIdx = uncompleted.indexOf(this.activeWord);
    return uncompleted[(curIdx + 1) % uncompleted.length];
  }

  isWordCorrect(word) {
    const isAcross = word.direction === "across";
    for (let i = 0; i < word.answer.length; i++) {
      const r = isAcross ? word.row : word.row + i;
      const c = isAcross ? word.col + i : word.col;
      if (this.grid[r][c].userChar !== word.answer[i]) {
        return false;
      }
    }
    return true;
  }

  isWordFilled(word) {
    const isAcross = word.direction === "across";
    for (let i = 0; i < word.answer.length; i++) {
      const r = isAcross ? word.row : word.row + i;
      const c = isAcross ? word.col + i : word.col;
      if (!this.grid[r][c].userChar) {
        return false;
      }
    }
    return true;
  }

  checkWordState(word) {
    if (!word) return;
    if (this.isWordCorrect(word)) {
      if (!this.solvedWords.has(word.id)) {
        this.solvedWords.add(word.id);
        this.markWordVisualCorrect(word);
        if (window.soundController) window.soundController.playWordComplete();
        this.onWordSolved(word);
        this.checkAllWordsSolved();
      }
    } else {
      if (this.solvedWords.has(word.id)) {
        this.solvedWords.delete(word.id);
        this.unmarkWordVisualCorrect(word);
      }
    }
  }

  markWordVisualCorrect(word) {
    const isAcross = word.direction === "across";
    for (let i = 0; i < word.answer.length; i++) {
      const r = isAcross ? word.row : word.row + i;
      const c = isAcross ? word.col + i : word.col;
      const el = this.grid[r][c].element;
      if (el) {
        el.classList.add("cell-correct");
        el.classList.add("pulse-success");
        setTimeout(() => el.classList.remove("pulse-success"), 600);
      }
    }
  }

  unmarkWordVisualCorrect(word) {
    const isAcross = word.direction === "across";
    for (let i = 0; i < word.answer.length; i++) {
      const r = isAcross ? word.row : word.row + i;
      const c = isAcross ? word.col + i : word.col;
      const el = this.grid[r][c].element;
      // Only remove if crossing word is also not solved
      const cell = this.grid[r][c];
      const otherWord = word.direction === "across" ? cell.downWord : cell.acrossWord;
      if (!otherWord || !this.solvedWords.has(otherWord.id)) {
        if (el) el.classList.remove("cell-correct");
      }
    }
  }

  checkAllWordsSolved() {
    if (this.solvedWords.size === this.words.length && !this.isPuzzleSolved) {
      this.isPuzzleSolved = true;
      if (window.soundController) window.soundController.playVictory();
      this.onPuzzleSolved({
        puzzleId: this.puzzle.id,
        wordsCount: this.words.length
      });
    }
  }

  // --- Hint & Validation Operations ---

  revealCurrentLetter() {
    if (!this.activeCell) return;
    const { row, col } = this.activeCell;
    const cell = this.grid[row][col];
    if (cell.isBlocked) return;

    this.inputChar(cell.solution);
    if (window.soundController) window.soundController.playHint();
  }

  revealCurrentWord() {
    if (!this.activeWord) return;
    const isAcross = this.activeWord.direction === "across";
    for (let i = 0; i < this.activeWord.answer.length; i++) {
      const r = isAcross ? this.activeWord.row : this.activeWord.row + i;
      const c = isAcross ? this.activeWord.col + i : this.activeWord.col;
      const cell = this.grid[r][c];
      cell.userChar = cell.solution;
      cell.element.querySelector(".cell-letter").textContent = cell.solution;
      cell.element.classList.remove("cell-error");
    }
    if (window.soundController) window.soundController.playHint();
    this.checkWordState(this.activeWord);
    this.updateHighlighting();
  }

  checkErrors() {
    let errorCount = 0;
    this.grid.forEach(row => {
      row.forEach(cell => {
        if (!cell.isBlocked && cell.userChar !== "") {
          if (cell.userChar !== cell.solution) {
            cell.element.classList.add("cell-error");
            errorCount++;
          } else {
            cell.element.classList.remove("cell-error");
          }
        }
      });
    });

    if (errorCount > 0 && window.soundController) {
      window.soundController.playError();
    }
    return errorCount;
  }

  clearPuzzle() {
    this.grid.forEach(row => {
      row.forEach(cell => {
        if (!cell.isBlocked) {
          cell.userChar = "";
          cell.element.querySelector(".cell-letter").textContent = "";
          cell.element.classList.remove("cell-error", "cell-correct");
        }
      });
    });
    this.solvedWords.clear();
    this.isPuzzleSolved = false;
    this.selectWord(this.words[0]);
  }

  initKeyboard() {
    window.addEventListener("keydown", e => {
      // Don't capture when typing in modal inputs or editor
      if (e.target.matches("input, textarea, select")) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        this.deleteChar();
      } else if (e.key === "Tab") {
        e.preventDefault();
        const nextWord = this.getNextIncompleteWord();
        if (nextWord) this.selectWord(nextWord);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (this.activeCell) {
          this.handleCellClick(this.activeCell.row, this.activeCell.col);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.navigateCell(0, -1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        this.navigateCell(0, 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.navigateCell(-1, 0);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        this.navigateCell(1, 0);
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        this.inputChar(e.key);
      }
    });
  }

  navigateCell(dr, dc) {
    if (!this.activeCell) return;
    const newR = this.activeCell.row + dr;
    const newC = this.activeCell.col + dc;

    if (newR >= 0 && newR < this.puzzle.rows && newC >= 0 && newC < this.puzzle.cols) {
      const targetCell = this.grid[newR][newC];
      if (!targetCell.isBlocked) {
        this.activeCell = { row: newR, col: newC };
        // Check if moving sideways aligns with across/down
        if (dc !== 0 && targetCell.acrossWord) {
          this.activeWord = targetCell.acrossWord;
          this.activeDirection = "across";
        } else if (dr !== 0 && targetCell.downWord) {
          this.activeWord = targetCell.downWord;
          this.activeDirection = "down";
        }
        this.updateHighlighting();
        this.onWordSelect(this.activeWord);
      }
    }
  }
}

window.CrosswordEngine = CrosswordEngine;
