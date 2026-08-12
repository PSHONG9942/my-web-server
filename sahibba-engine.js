/**
 * Scrabble Game Logic (Adapted from G-MATH interface)
 */

const BOARD_SIZE = 15;
const RACK_SIZE = 7; 

// Standard Scrabble Distribution
const TILE_DISTRIBUTION = {
    'A': { count: 19, score: 1 }, 'B': { count: 3, score: 3 }, 'C': { count: 1, score: 8 }, 'D': { count: 3, score: 3 },
    'E': { count: 7, score: 1 }, 'F': { count: 1, score: 10 }, 'G': { count: 4, score: 3 }, 'H': { count: 2, score: 4 },
    'I': { count: 7, score: 1 }, 'J': { count: 1, score: 5 }, 'K': { count: 6, score: 1 }, 'L': { count: 4, score: 2 },
    'M': { count: 5, score: 1 }, 'N': { count: 8, score: 1 }, 'O': { count: 2, score: 4 }, 'P': { count: 2, score: 4 },
    'Q': { count: 0, score: 10 }, 'R': { count: 5, score: 1 }, 'S': { count: 4, score: 2 }, 'T': { count: 5, score: 1 },
    'U': { count: 6, score: 1 }, 'V': { count: 1, score: 10 }, 'W': { count: 1, score: 8 }, 'X': { count: 0, score: 10 },
    'Y': { count: 1, score: 5 }, 'Z': { count: 1, score: 10 }, '?': { count: 2, score: 0 } // Blank tiles
};

const SPECIAL_CELLS = {
    'TW': ['0,0', '0,7', '0,14', '7,0', '7,14', '14,0', '14,7', '14,14'],
    'DW': ['1,1', '2,2', '3,3', '4,4', '10,10', '11,11', '12,12', '13,13', '1,13', '2,12', '3,11', '4,10', '10,4', '11,3', '12,2', '13,1'],
    'TL': ['1,5', '1,9', '5,1', '5,5', '5,9', '5,13', '9,1', '9,5', '9,9', '9,13', '13,5', '13,9'],
    'DL': ['0,3', '0,11', '2,6', '2,8', '3,0', '3,7', '3,14', '6,2', '6,6', '6,8', '6,12', '7,3', '7,11', '8,2', '8,6', '8,8', '8,12', '11,0', '11,7', '11,14', '12,6', '12,8', '14,3', '14,11']
};

class Tile {
    constructor(char, id) {
        this.originalChar = char; // Store original for recall
        this.char = char;
        this.score = TILE_DISTRIBUTION[char].score;
        this.id = id; 
        this.element = this.createElement();
    }

    createElement() {
        const el = document.createElement('div');
        el.className = 'tile';
        el.draggable = true;
        el.id = `tile-${this.id}`;
        el.dataset.tileId = this.id;
        this.updateElementVisuals(el);
        
        el.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', this.id);
            e.dataTransfer.effectAllowed = "move";
            game.draggedTileId = this.id;
            game.selectTile(this.id, true); 
        });
        return el;
    }

    updateElementVisuals(el) {
        el.innerHTML = `${this.char}<span class="points">${this.score}</span>`;
    }
}

class Game {
    constructor(players = [{name: "Player 1"}, {name: "Player 2"}, {name: "Player 3"}, {name: "Player 4"}], initialState = null, dictType = 'world') {
        this.dictionary = new Set();
        this.dictType = dictType;
        this.players = players.map(p => ({
            name: p.name,
            score: 0, rack: [], misses: 0, active: true, online: true
        }));
        this.currentPlayerIndex = 0;
        this.bag = [];
        this.boardState = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)); 
        this.isFirstTurn = true;
        this.tempPlacedTiles = []; 
        this.selectedTileIds = new Set(); 
        this.isSwapping = false; 
        this.draggedTileId = null;
        this.consecutivePasses = 0;
        
        this.dictionaryArray = [];
        
        this.initialState = initialState;
        this.loadDictionary();
    }

    async loadDictionary() {
        try {
            const dictPath = this.dictType === 'rasmi' ? 'assets/kamus-rasmi.json' : 'assets/kamus.json';
            const response = await fetch(dictPath);
            if (!response.ok) throw new Error("Failed to fetch");
            const words = await response.json();
            
            words.forEach(w => this.dictionary.add(w.toUpperCase()));
            this.dictionaryArray = Array.from(this.dictionary);
            
            document.getElementById('loading-overlay').style.display = 'none';
            if (this.initialState) {
                this.restoreState(this.initialState);
            } else {
                this.init();
            }
        } catch (error) {
            console.error(error);
            document.getElementById('loading-overlay').innerHTML = `<h2>Ralat memuatkan kamus!</h2><p>Sila periksa sambungan internet anda dan muat semula.</p>`;
        }
    }

    init() {
        this.generateTileBag();
        this.renderBoard();
        this.shuffleBag();
        this.players.forEach(p => this.drawTiles(p));
        this.updateUI();
        this.showMessage(`👉 Giliran ${this.players[0].name}`);
        this.showTutorial();
    }

    restoreState(state) {
        this.currentPlayerIndex = state.currentPlayerIndex;
        this.isFirstTurn = state.isFirstTurn;
        this.bag = new Array(state.bagLength).fill({});
        
        this.players.forEach((p, i) => {
            p.score = state.players[i].score;
            p.misses = state.players[i].misses;
            p.active = state.players[i].active;
            p.online = state.players[i].online;
            
            p.rack = state.players[i].rack.map(tData => {
                if (tData && tData.id !== undefined) {
                    const t = new Tile(tData.originalChar || tData.char, tData.id);
                    t.char = tData.char;
                    t.updateElementVisuals(t.element);
                    return t;
                }
                return null;
            }).filter(t => t !== null);
        });
        
        this.renderBoard(); 
        
        this.boardState = state.boardState.map((row, r) => row.map((tData, c) => {
            if (!tData) return null;
            const tile = new Tile(tData.originalChar || tData.char, tData.id);
            tile.char = tData.char;
            tile.updateElementVisuals(tile.element);
            
            this.boardState[r][c] = tile;
            this.updateCellUI(r, c, false);
            return tile;
        }));
        
        this.tempPlacedTiles = [];
        this.selectedTileIds.clear();
        this.isSwapping = false;
        
        this.updateUI();
        this.showMessage(`🔄 Disambung semula! 👉 Giliran ${this.players[this.currentPlayerIndex].name}`);
    }

    showTutorial() { document.getElementById('tutorial-modal').style.display = 'flex'; }

    generateTileBag() {
        this.bag = [];
        let idCounter = 0;
        for (let char in TILE_DISTRIBUTION) {
            const count = TILE_DISTRIBUTION[char].count;
            for (let i = 0; i < count; i++) {
                this.bag.push(new Tile(char, idCounter++));
            }
        }
    }

    shuffleBag() {
        for (let i = this.bag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
        }
    }

    drawTiles(player) {
        let shortageMsg = "";
        while (player.rack.length < RACK_SIZE && this.bag.length > 0) {
            player.rack.push(this.bag.pop());
        }
        if (player.rack.length < RACK_SIZE && this.bag.length === 0) {
            shortageMsg = "Uncang kosong";
        }
        return shortageMsg;
    }

    renderBoard() {
        const boardEl = document.getElementById('game-board');
        boardEl.innerHTML = '';
        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.r = r;
                cell.dataset.c = c;
                const key = `${r},${c}`;
                if (r===7 && c===7) { cell.classList.add('center'); cell.innerHTML='★'; }
                else if (SPECIAL_CELLS.TW.includes(key)) { cell.classList.add('tw'); cell.innerText='TW'; }
                else if (SPECIAL_CELLS.DW.includes(key)) { cell.classList.add('dw'); cell.innerText='DW'; }
                else if (SPECIAL_CELLS.TL.includes(key)) { cell.classList.add('tl'); cell.innerText='TL'; }
                else if (SPECIAL_CELLS.DL.includes(key)) { cell.classList.add('dl'); cell.innerText='DL'; }

                cell.onclick = () => this.handleBoardClick(r, c);
                cell.addEventListener('dragover', (e) => e.preventDefault());
                cell.addEventListener('drop', (e) => this.handleDropOnBoard(e, r, c));
                boardEl.appendChild(cell);
            }
        }
    }

    renderRack() {
        const rackContainer = document.getElementById('rack-container');
        rackContainer.innerHTML = '';
        
        let pIndex = this.currentPlayerIndex;
        if (typeof myPlayerName !== 'undefined') {
            const localIndex = this.players.findIndex(p => p.name === myPlayerName);
            if (localIndex !== -1) {
                pIndex = localIndex;
            }
        }
        
        const player = this.players[pIndex];
        if (!player) return;
        
        if (this.isSwapping) rackContainer.classList.add('rack-swapping');
        else rackContainer.classList.remove('rack-swapping');

        player.rack.forEach(tile => {
            const tileEl = tile.element;
            tileEl.classList.remove('temp', 'locked');
            if (this.selectedTileIds.has(tile.id)) tileEl.classList.add('selected');
            else tileEl.classList.remove('selected');

            tileEl.onclick = (e) => {
                e.stopPropagation();
                if (pIndex === this.currentPlayerIndex) {
                    this.handleRackTileClick(tile.id);
                }
            };
            rackContainer.appendChild(tileEl);
        });
    }

    handleRackTileClick(tileId) {
        if (this.isSwapping) {
            if (this.selectedTileIds.has(tileId)) this.selectedTileIds.delete(tileId);
            else this.selectedTileIds.add(tileId);
        } else {
            if (this.selectedTileIds.has(tileId)) {
                this.selectedTileIds.clear();
            } else {
                this.selectedTileIds.clear();
                this.selectedTileIds.add(tileId);
            }
        }
        this.renderRack();
    }

    handleBoardClick(r, c) {
        if (this.boardState[r][c] && !this.isTemp(r, c)) return;
        if (this.isTemp(r, c)) {
            const tile = this.boardState[r][c];
            this.boardState[r][c] = null;
            const tempIdx = this.tempPlacedTiles.findIndex(t => t.r === r && t.c === c);
            if (tempIdx > -1) this.tempPlacedTiles.splice(tempIdx, 1);
            
            // Reset blank tile
            if (tile.originalChar === '?') {
                tile.char = '?';
                tile.updateElementVisuals(tile.element);
            }
            
            this.updateCellUI(r, c);
            this.players[this.currentPlayerIndex].rack.push(tile);
            this.selectedTileIds.clear();
            this.selectedTileIds.add(tile.id);
            this.renderRack();
            this.showMessage("Jubin ditarik balik.");
            return;
        }
        if (this.selectedTileIds.size === 1 && !this.isSwapping) {
            const tileId = Array.from(this.selectedTileIds)[0];
            const player = this.players[this.currentPlayerIndex];
            const tileIndex = player.rack.findIndex(t => t.id == tileId);
            if (tileIndex > -1) {
                const tile = player.rack[tileIndex];
                if (this.placeTileTemp(tile, r, c)) {
                    player.rack.splice(tileIndex, 1);
                    this.selectedTileIds.clear();
                    this.renderRack();
                }
            }
        }
    }

    selectTile(tileId, forceExclusive = true) {
        if (forceExclusive) this.selectedTileIds.clear();
        this.selectedTileIds.add(tileId);
        this.renderRack();
    }

    handleDropOnBoard(e, r, c) {
        e.preventDefault();
        if (this.isCalculatingHints) return;
        this.clearHints();
        if (this.boardState[r][c] !== null) return; 
        const player = this.players[this.currentPlayerIndex];
        const tileIndex = player.rack.findIndex(t => t.id == this.draggedTileId);
        if (tileIndex > -1) {
            const tile = player.rack[tileIndex];
            if (this.placeTileTemp(tile, r, c)) {
                player.rack.splice(tileIndex, 1);
            }
        } else {
            const existingTempIndex = this.tempPlacedTiles.findIndex(t => t.tile.id == this.draggedTileId);
            if (existingTempIndex > -1) {
                const oldPos = this.tempPlacedTiles[existingTempIndex];
                
                // Allow moving around the board without re-prompting blank if already set
                const tempTile = oldPos.tile;
                
                this.boardState[oldPos.r][oldPos.c] = null;
                this.updateCellUI(oldPos.r, oldPos.c);
                this.tempPlacedTiles.splice(existingTempIndex, 1);
                
                this.boardState[r][c] = tempTile;
                this.tempPlacedTiles.push({r, c, tile: tempTile});
                this.updateCellUI(r, c, true);
            }
        }
        this.selectedTileIds.clear();
        this.renderRack();
    }

    placeTileTemp(tile, r, c) {
        if (tile.originalChar === '?') {
            let letter = prompt("Masukkan huruf untuk jubin kosong (A-Z):");
            if (!letter) return false;
            letter = letter.toUpperCase();
            if (!/^[A-Z]$/.test(letter)) {
                alert("Huruf tidak sah. Sila masukkan A-Z.");
                return false;
            }
            tile.char = letter;
            tile.updateElementVisuals(tile.element);
        }

        this.boardState[r][c] = tile;
        this.tempPlacedTiles.push({r, c, tile});
        this.updateCellUI(r, c, true);
        return true;
    }

    updateCellUI(r, c, isTemp = false) {
        const index = r * BOARD_SIZE + c;
        const cell = document.getElementById('game-board').children[index];
        const tile = this.boardState[r][c];
        if (!tile) {
            cell.innerHTML = '';
            const key = `${r},${c}`;
            if (r===7&&c===7) { cell.innerHTML='★'; cell.classList.add('center'); }
            else if (SPECIAL_CELLS.TW.includes(key)) cell.innerText='TW';
            else if (SPECIAL_CELLS.DW.includes(key)) cell.innerText='DW';
            else if (SPECIAL_CELLS.TL.includes(key)) cell.innerText='TL';
            else if (SPECIAL_CELLS.DL.includes(key)) cell.innerText='DL';
            return;
        }
        cell.innerHTML = ''; 
        const tileEl = tile.element;
        tileEl.classList.remove('selected');
        tileEl.onclick = null;
        if (isTemp) tileEl.classList.add('temp');
        else tileEl.classList.add('locked');
        tileEl.draggable = isTemp; 
        cell.appendChild(tileEl);
    }

    recallTiles() {
        const player = this.players[this.currentPlayerIndex];
        this.tempPlacedTiles.forEach(item => {
            this.boardState[item.r][item.c] = null;
            this.updateCellUI(item.r, item.c);
            if (item.tile.originalChar === '?') {
                item.tile.char = '?';
                item.tile.updateElementVisuals(item.tile.element);
            }
            player.rack.push(item.tile);
        });
        this.tempPlacedTiles = [];
        this.selectedTileIds.clear();
        this.renderRack();
    }

    passTurn() {
        if (this.isSwapping) this.toggleSwapMode(); 
        this.recallTiles();
        const player = this.players[this.currentPlayerIndex];
        player.misses++;
        this.consecutivePasses++;
        // 2 consecutive passes per active player ends the game
        const activeCount = this.players.filter(p => p.active).length;
        if (this.consecutivePasses >= activeCount * 2) { 
            this.endGame(true);
            return;
        }
        if (this.checkElimination(player)) return;
        this.nextTurn(false); 
    }

    toggleSwapMode() {
        if (this.tempPlacedTiles.length > 0) {
            this.showMessage("❌ Tarik balik jubin dari papan dahulu!", true);
            return;
        }
        if (!this.isSwapping) {
            this.isSwapping = true;
            this.selectedTileIds.clear();
            document.getElementById('btn-swap').innerText = "✅ Sahkan Tukar";
            document.getElementById('btn-swap').classList.add('active');
            document.getElementById('rack-hint').innerText = "(Pilih jubin untuk dibuang)";
            this.showMessage("Pilih jubin untuk ditukar, kemudian klik butang sekali lagi.");
            this.toggleButtons(false);
        } else {
            this.executeSwap();
        }
        this.renderRack();
    }

    executeSwap() {
        if (this.selectedTileIds.size === 0) {
            this.exitSwapMode();
            this.showMessage("Tiada jubin dipilih, pertukaran dibatalkan.");
            return;
        }
        if (this.bag.length === 0) {
            this.exitSwapMode();
            this.showMessage("❌ Uncang kosong, tidak boleh tukar", true);
            return;
        }
        const player = this.players[this.currentPlayerIndex];
        const newRack = [];
        const tilesToSwap = [];
        player.rack.forEach(tile => {
            if (this.selectedTileIds.has(tile.id)) {
                tilesToSwap.push(tile);
            } else {
                newRack.push(tile);
            }
        });
        
        if (tilesToSwap.length > this.bag.length) {
             this.showMessage(`❌ Jubin tidak mencukupi dalam uncang (${this.bag.length} tinggal)`, true);
             return;
        }

        tilesToSwap.forEach(tile => {
            tile.element.classList.remove('selected');
            if (tile.originalChar === '?') {
                tile.char = '?';
                tile.updateElementVisuals(tile.element);
            }
            this.bag.push(tile);
        });
        player.rack = newRack;
        this.shuffleBag();
        this.drawTiles(player);
        const count = tilesToSwap.length;
        this.exitSwapMode();
        this.showMessage(`♻️ Menukar ${count} jubin`);
        player.misses++;
        this.consecutivePasses = 0; 
        if (this.checkElimination(player)) return;
        this.nextTurn(true);
    }

    checkElimination(player) {
        if (player.misses >= 3) {
            player.active = false; 
            this.showMessage(`🚫 ${player.name} tersingkir (3 kali laluan/tukar berturut-turut)!`, true);
            const activePlayers = this.players.filter(p => p.active);
            if (activePlayers.length <= 1) {
                setTimeout(() => this.endGame(true), 1500); 
            } else {
                setTimeout(() => this.nextTurn(false), 1500);
            }
            return true; 
        }
        return false; 
    }

    exitSwapMode() {
        this.isSwapping = false;
        this.selectedTileIds.clear();
        document.getElementById('btn-swap').innerText = "♻️ Tukar";
        document.getElementById('btn-swap').classList.remove('active');
        document.getElementById('rack-hint').innerText = "(Klik untuk pilih, klik papan untuk letak)";
        this.toggleButtons(true);
        this.renderRack();
    }

    toggleButtons(enable) {
        const ids = ['btn-play', 'btn-reset', 'btn-pass'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.disabled = !enable;
        });
    }

    shuffleRack() {
        const p = this.players[this.currentPlayerIndex];
        for (let i = p.rack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [p.rack[i], p.rack[j]] = [p.rack[j], p.rack[i]];
        }
        this.renderRack();
    }

    playTurn() {
        if (this.isSwapping) return false; 
        if (this.tempPlacedTiles.length === 0) {
            this.showMessage("⚠️ Letakkan sekurang-kurangnya satu jubin", true);
            return false;
        }
        const rows = this.tempPlacedTiles.map(t => t.r);
        const cols = this.tempPlacedTiles.map(t => t.c);
        const isRow = rows.every(r => r === rows[0]);
        const isCol = cols.every(c => c === cols[0]);
        
        if (!isRow && !isCol) {
            this.showMessage("⚠️ Jubin mestilah dalam satu baris atau lajur", true);
            return false;
        }
        
        this.tempPlacedTiles.sort((a, b) => isRow ? a.c - b.c : a.r - b.r);
        let lineTiles = []; 
        if (isRow) lineTiles = this.getContiguousLine(rows[0], this.tempPlacedTiles[0].c, 'row');
        else lineTiles = this.getContiguousLine(this.tempPlacedTiles[0].r, cols[0], 'col');
        
        if (this.isFirstTurn) {
            const coversCenter = this.tempPlacedTiles.some(t => t.r === 7 && t.c === 7);
            if (!coversCenter) { this.showMessage("⚠️ Perkataan pertama mesti menutup bintang tengah", true); return false; }
            if (lineTiles.length < 2) { this.showMessage("⚠️ Perlukan sekurang-kurangnya 2 jubin untuk perkataan pertama", true); return false; }
        } else {
            const isConnected = lineTiles.some(t => !this.isTemp(t.r, t.c)); 
            let adjacentContact = false;
            if (!isConnected) {
                for (let t of this.tempPlacedTiles) {
                    if (this.hasNeighbor(t.r, t.c)) { adjacentContact = true; break; }
                }
            }
            if (!isConnected && !adjacentContact) { this.showMessage("⚠️ Perkataan mesti bersambung dengan jubin sedia ada", true); return false; }
        }
        
        // Validate all formed words
        let totalScore = 0;
        let wordsFormed = [];

        // Check main word
        if (lineTiles.length > 1) {
            const word = this.tilesToString(lineTiles);
            if (!this.dictionary.has(word)) {
                this.showMessage(`❌ Perkataan tidak sah: ${word}`, true);
                return false;
            }
            wordsFormed.push(word);
            totalScore += this.calculateScore(lineTiles, isRow ? 'row' : 'col');
        } else if (this.tempPlacedTiles.length === 1 && !this.isFirstTurn) {
            // A single tile was placed, it must form at least one valid cross word
            let formedAny = false;
            let crossLine = [];
            if (isRow) crossLine = this.getContiguousLine(this.tempPlacedTiles[0].r, this.tempPlacedTiles[0].c, 'col');
            else crossLine = this.getContiguousLine(this.tempPlacedTiles[0].r, this.tempPlacedTiles[0].c, 'row');
            
            if (crossLine.length > 1) {
                const word = this.tilesToString(crossLine);
                if (!this.dictionary.has(word)) {
                    this.showMessage(`❌ Perkataan tidak sah: ${word}`, true);
                    return false;
                }
                wordsFormed.push(word);
                totalScore += this.calculateScore(crossLine, isRow ? 'col' : 'row');
                formedAny = true;
            }
            
            if(!formedAny) {
                 this.showMessage("⚠️ Perkataan mesti bersambung dengan jubin sedia ada", true); return false;
            }
        }

        // Check cross words for each placed tile
        for (let temp of this.tempPlacedTiles) {
            let crossLine = [];
            if (isRow) crossLine = this.getContiguousLine(temp.r, temp.c, 'col');
            else crossLine = this.getContiguousLine(temp.r, temp.c, 'row');
            
            if (crossLine.length > 1) {
                const word = this.tilesToString(crossLine);
                if (!this.dictionary.has(word)) {
                    this.showMessage(`❌ Perkataan tidak sah: ${word}`, true);
                    return;
                }
                // Only add score if we didn't already process this exact word as the main word
                // which only happens if placing exactly one tile
                if(this.tempPlacedTiles.length > 1) {
                    wordsFormed.push(word);
                    totalScore += this.calculateScore(crossLine, isRow ? 'col' : 'row');
                }
            }
        }
        
        // Bingo bonus
        let isBingo = false;
        if (this.tempPlacedTiles.length === 7) {
            totalScore += 50;
            isBingo = true;
        }

        this.confirmMove(totalScore, wordsFormed, isBingo);
        return true;
    }

    hasNeighbor(r, c) {
        const dirs = [[0,1], [0,-1], [1,0], [-1,0]];
        for (let d of dirs) {
            const nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
                if (this.boardState[nr][nc] && !this.isTemp(nr, nc)) return true;
            }
        }
        return false;
    }

    isTemp(r, c) { return this.tempPlacedTiles.some(t => t.r === r && t.c === c); }

    getContiguousLine(startR, startC, dir) {
        let line = [];
        let currR = startR, currC = startC;
        if (dir === 'row') {
            while (currC > 0 && this.boardState[currR][currC-1]) currC--;
            while (currC < BOARD_SIZE && this.boardState[currR][currC]) {
                line.push({r: currR, c: currC, tile: this.boardState[currR][currC]});
                currC++;
            }
        } else {
            while (currR > 0 && this.boardState[currR-1][currC]) currR--;
            while (currR < BOARD_SIZE && this.boardState[currR][currC]) {
                line.push({r: currR, c: currC, tile: this.boardState[currR][currC]});
                currR++;
            }
        }
        return line;
    }

    tilesToString(lineObjects) { return lineObjects.map(obj => obj.tile.char).join(''); }

    calculateScore(lineObjects, dir) {
        let score = 0;
        let wordMultiplier = 1;
        lineObjects.forEach(obj => {
            let tileScore = obj.tile.score;
            if (this.isTemp(obj.r, obj.c)) {
                const key = `${obj.r},${obj.c}`;
                if (SPECIAL_CELLS.DL.includes(key)) tileScore *= 2;
                if (SPECIAL_CELLS.TL.includes(key)) tileScore *= 3;
                if (SPECIAL_CELLS.DW.includes(key) || (obj.r===7 && obj.c===7 && this.isFirstTurn)) wordMultiplier *= 2;
                if (SPECIAL_CELLS.TW.includes(key)) wordMultiplier *= 3;
            }
            score += tileScore;
        });
        return score * wordMultiplier;
    }

    confirmMove(points, wordsFormed, isBingo) {
        const player = this.players[this.currentPlayerIndex];
        player.score += points;
        player.misses = 0;
        this.consecutivePasses = 0; 
        
        let msg = `🎉 Markah: ${points} (${wordsFormed.join(', ')})`;
        if(isBingo) msg = `🔥 BINGO! +50 mata! ` + msg;
        this.showMessage(msg);
        
        this.tempPlacedTiles.forEach(t => {
            const el = t.tile.element;
            el.classList.remove('temp');
            el.classList.add('locked');
            el.draggable = false;
            this.updateCellUI(t.r, t.c);
        });
        this.tempPlacedTiles = [];
        this.isFirstTurn = false;
        this.selectedTileIds.clear();
        this.nextTurn(true);
    }

    nextTurn(isValidMove = false) {
        const player = this.players[this.currentPlayerIndex];
        let warning = "";
        if (player.active) {
            warning = this.drawTiles(player);
        }
        
        if (player.rack.length === 0 && this.bag.length === 0) {
            this.endGame(false, player);
            return;
        }
        
        let loops = 0;
        do {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
            loops++;
        } while (!this.players[this.currentPlayerIndex].active && loops < this.players.length);
        
        if (loops >= this.players.length) {
            this.endGame(true);
            return;
        }
        this.updateUI();
        let msg = `👉 Giliran ${this.players[this.currentPlayerIndex].name}`;
        if (warning && player.rack.length < RACK_SIZE) {
             msg += ` (${warning})`;
        }
        this.showMessage(msg);
        
        if (typeof broadcastGameState === 'function') broadcastGameState();
    }

    endGame(isForced = false, finishingPlayer = null) {
        let msgHTML = "";
        
        // Deduct points for remaining tiles
        this.players.forEach(p => {
            if (p.rack.length > 0) {
                let deduction = p.rack.reduce((sum, t) => sum + t.score, 0);
                p.score -= deduction;
                // Add to finisher
                if(finishingPlayer && p !== finishingPlayer) {
                    finishingPlayer.score += deduction;
                }
            }
        });

        if (isForced) {
            msgHTML += `<div style="color:#e76f51; margin-bottom:10px;">🚫 Perlawanan ditamatkan akibat laluan berturut-turut.</div>`;
        } else if (finishingPlayer) {
            msgHTML += `<div style="color:#2a9d8f; margin-bottom:10px;">🎉 ${finishingPlayer.name} menghabiskan semua jubin!</div>`;
        }
        
        this.players.sort((a, b) => b.score - a.score);
        const winner = this.players[0];
        
        if (winner.score < 0) {
            msgHTML += `<div style="color:#ffca3a; margin-bottom:10px; font-style: italic;">
                "Sahibba ialah permainan kemahiran dan kosa kata! Semoga berjaya pada masa akan datang!"
            </div>`;
        }
        
        let tableHTML = `<table class="endgame-table">
            <tr><th>Kedudukan</th><th>Pemain</th><th>Status</th><th>Markah Akhir</th></tr>`;
        this.players.forEach((p, index) => {
            const status = p.active ? 'Tamat' : 'Tersingkir';
            const medal = index === 0 ? '🥇' : (index === 1 ? '🥈' : (index === 2 ? '🥉' : ''));
            tableHTML += `<tr>
                <td>${medal} ${index + 1}</td>
                <td>${p.name}</td>
                <td style="color:${p.active ? '#2a9d8f' : '#e76f51'}">${status}</td>
                <td><strong>${p.score}</strong></td>
            </tr>`;
        });
        tableHTML += `</table>`;
        document.getElementById('modal-title').innerText = "🏆 Keputusan Akhir";
        document.getElementById('modal-msg').innerHTML = msgHTML + tableHTML;
        document.getElementById('modal').style.display = 'flex';
        
        if (typeof broadcastGameState === 'function') broadcastGameState();
    }

    updateUI() {
        const list = document.getElementById('players-list');
        list.innerHTML = '';
        this.players.forEach((p, i) => {
            const div = document.createElement('div');
            div.className = `player-score ${i === this.currentPlayerIndex ? 'active' : ''} ${!p.active ? 'eliminated' : ''}`;
            const dotClass = p.online ? '' : 'offline';
            div.innerHTML = `<span><span class="status-dot ${dotClass}" title="${p.online ? 'Online' : 'Offline'}"></span>${p.name}</span> <span>${p.score}</span>`;
            list.appendChild(div);
        });
        const cp = this.players[this.currentPlayerIndex];
        document.getElementById('mobile-score-display').innerText = `${cp.name}: ${cp.score}`;
        document.getElementById('tiles-left-header').innerText = this.bag.length;
        this.renderRack();
    }


    showMessage(msg, isError = false) {
        const el = document.getElementById('message-area');
        el.style.color = isError ? '#ff6b6b' : '#ffd700';
        el.innerText = msg;
        el.style.transform = "scale(1.02)";
        setTimeout(() => el.style.transform = "scale(1)", 200);
    }
}

