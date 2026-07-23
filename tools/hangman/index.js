/**
 * Hangman Game for Malaysian Primary Students
 */

const state = {
    step: null,
    units: {},
    currentUnit: null,
    currentWordIndex: 0,
    words: [],
    selectedWord: "",
    hint: "",
    guessedLetters: [],
    lives: 8,
    score: 0,
    maxLives: 8
};

// UI Elements
const views = {
    level: document.getElementById('level-selector'),
    unit: document.getElementById('unit-selector'),
    rounds: document.getElementById('rounds-selector'),
    game: document.getElementById('game-area')
};

const elements = {
    unitGrid: document.getElementById('unit-grid'),
    currentStepTitle: document.getElementById('current-step-title'),
    currentUnitTitle: document.getElementById('current-unit-title'),
    wordDisplay: document.getElementById('word-display'),
    hintDisplay: document.querySelector('#hint-display span'),
    keyboard: document.getElementById('keyboard'),
    livesDisplay: document.getElementById('lives-display'),
    scoreDisplay: document.getElementById('score-display'),
    stats: document.getElementById('stats'),
    overlay: document.getElementById('modal-overlay'),
    modalTitle: document.getElementById('modal-title'),
    modalMessage: document.getElementById('modal-message'),
    hangmanParts: document.querySelectorAll('.body-part')
};

// Initialization
document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => loadStep(btn.dataset.step));
});

document.getElementById('back-to-levels').addEventListener('click', () => showView('level'));
document.getElementById('back-to-units').addEventListener('click', () => showView('unit'));
document.getElementById('back-to-units-from-rounds').addEventListener('click', () => showView('unit'));
document.getElementById('start-rounds-btn').addEventListener('click', () => {
    let rounds = parseInt(document.getElementById('rounds-input').value, 10);
    if (!rounds || rounds < 1) rounds = 10;
    startGame(state.currentUnit, 'all', rounds);
});

document.getElementById('modal-next-btn').addEventListener('click', nextWord);
document.getElementById('modal-retry-btn').addEventListener('click', startRound);
document.getElementById('modal-home-btn').addEventListener('click', () => {
    elements.overlay.classList.add('hidden');
    showView('level');
});

// Navigation
function showView(viewId) {
    Object.values(views).forEach(v => v.classList.add('hidden'));
    views[viewId].classList.remove('hidden');
    
    if (viewId === 'game') {
        elements.stats.classList.remove('hidden');
    } else {
        elements.stats.classList.add('hidden');
    }
}

// Data Loading
async function loadStep(stepNum) {
    state.step = stepNum;
    state.units = VOCAB_DATA[stepNum];
    renderUnits();
    if (stepNum === 'Custom') {
        elements.currentStepTitle.textContent = 'Select a Genre';
    } else if (stepNum === 'Verbs') {
        elements.currentStepTitle.textContent = 'Verb Forms';
    } else {
        elements.currentStepTitle.textContent = `Year ${stepNum} Vocabulary`;
    }
    showView('unit');
}

function renderUnits() {
    elements.unitGrid.innerHTML = '';
    Object.keys(state.units).forEach(unitName => {
        const btn = document.createElement('button');
        btn.className = 'unit-btn';
        btn.textContent = unitName;
        btn.addEventListener('click', () => {
            if (state.step === 'Custom') {
                showDifficultySelector(unitName);
            } else if (state.step === 'Verbs') {
                state.currentUnit = unitName;
                document.getElementById('rounds-input').max = state.units[unitName].length;
                document.getElementById('rounds-input').value = Math.min(10, state.units[unitName].length);
                showView('rounds');
            } else {
                startGame(unitName);
            }
        });
        elements.unitGrid.appendChild(btn);
    });
}

function showDifficultySelector(genre) {
    state.currentUnit = genre;
    elements.currentStepTitle.textContent = `${genre} - Choose Difficulty`;
    elements.unitGrid.innerHTML = '';
    
    ['Easy', 'Medium', 'Hard', 'Expert', 'All'].forEach(diff => {
        const btn = document.createElement('button');
        btn.className = 'unit-btn difficulty-btn';
        btn.textContent = diff;
        btn.addEventListener('click', () => startGame(genre, diff.toLowerCase()));
        elements.unitGrid.appendChild(btn);
    });
    
    // Add a back button specifically for difficulty selection
    const backBtn = document.createElement('button');
    backBtn.className = 'secondary-btn full-width-btn';
    backBtn.textContent = '← Back to Genres';
    backBtn.addEventListener('click', () => loadStep('Custom'));
    elements.unitGrid.appendChild(backBtn);
}

// Game Logic
function startGame(unitName, difficulty = 'all', maxRounds = null) {
    state.currentUnit = unitName;
    let pool = [...state.units[unitName]];
    
    if (difficulty !== 'all') {
        pool = pool.filter(w => w.difficulty === difficulty);
    }
    
    if (pool.length === 0) {
        alert("No words found for this difficulty. Try another!");
        return;
    }

    state.words = pool;
    shuffleArray(state.words);
    if (maxRounds && maxRounds > 0 && maxRounds < state.words.length) {
        state.words = state.words.slice(0, maxRounds);
    }
    state.currentWordIndex = 0;
    state.score = 0;
    elements.currentUnitTitle.textContent = difficulty === 'all' ? unitName : `${unitName} (${difficulty.toUpperCase()})`;
    elements.scoreDisplay.textContent = `Score: ${state.score}`;
    startRound();
    showView('game');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startRound() {
    elements.overlay.classList.add('hidden');
    const wordData = state.words[state.currentWordIndex];
    state.selectedWord = wordData.word.toLowerCase();
    state.hint = wordData.hint;
    state.guessedLetters = [];
    state.lives = state.maxLives;
    
    updateLivesDisplay();
    renderWord();
    renderKeyboard();
    updateHangman();
    elements.hintDisplay.textContent = state.hint;
}

function renderWord() {
    elements.wordDisplay.innerHTML = '';
    [...state.selectedWord].forEach(char => {
        const slot = document.createElement('div');
        slot.className = 'letter-slot';
        if (state.guessedLetters.includes(char) || char === ' ' || char === '-') {
            slot.textContent = char;
            if (char === ' ' || char === '-') slot.style.border = 'none';
        }
        elements.wordDisplay.appendChild(slot);
    });
}

function renderKeyboard() {
    elements.keyboard.innerHTML = '';
    "abcdefghijklmnopqrstuvwxyz".split('').forEach(letter => {
        const key = document.createElement('button');
        key.className = 'key';
        key.textContent = letter;
        key.addEventListener('click', () => handleGuess(letter));
        elements.keyboard.appendChild(key);
    });
}

function handleGuess(letter) {
    if (state.guessedLetters.includes(letter) || state.lives <= 0) return;

    state.guessedLetters.push(letter);
    const keys = document.querySelectorAll('.key');
    const key = [...keys].find(k => k.textContent === letter);

    if (state.selectedWord.includes(letter)) {
        key.classList.add('correct', 'used');
        renderWord();
        checkWin();
    } else {
        key.classList.add('wrong', 'used');
        state.lives--;
        updateLivesDisplay();
        updateHangman();
        checkLoss();
    }
}

function updateLivesDisplay() {
    elements.livesDisplay.textContent = 'Lives: ' + '❤️'.repeat(state.lives) + '🖤'.repeat(state.maxLives - state.lives);
}

function updateHangman() {
    const parts = ['head', 'torso', 'arm-l', 'arm-r', 'leg-l', 'leg-r', 'eye-l', 'eye-r'];
    const mistakes = state.maxLives - state.lives;
    
    // Hide all first
    elements.hangmanParts.forEach(p => p.classList.add('hidden'));
    
    // Show parts based on mistakes
    for (let i = 0; i < mistakes; i++) {
        const partClass = parts[i];
        const partEl = document.querySelector(`.body-part.${partClass}`);
        if (partEl) partEl.classList.remove('hidden');
    }
}

function checkWin() {
    const isWin = [...state.selectedWord].every(char => 
        state.guessedLetters.includes(char) || char === ' ' || char === '-'
    );

    if (isWin) {
        state.score += 10;
        elements.scoreDisplay.textContent = `Score: ${state.score}`;
        showModal('Great!', `Correct! The word was: ${state.selectedWord.toUpperCase()}`, true);
    }
}

function checkLoss() {
    if (state.lives <= 0) {
        showModal('Try Again!', `The answer was: ${state.selectedWord.toUpperCase()}`, false);
    }
}

function showModal(title, msg, isWin) {
    elements.modalTitle.textContent = title;
    elements.modalMessage.textContent = msg;
    elements.overlay.classList.remove('hidden');
    
    const nextBtn = document.getElementById('modal-next-btn');
    const retryBtn = document.getElementById('modal-retry-btn');
    
    // Educational Content
    const wordData = state.words[state.currentWordIndex];
    document.getElementById('trans-cn').textContent = wordData.translations?.cn || '-';
    document.getElementById('trans-ms').textContent = wordData.translations?.ms || '-';
    document.getElementById('sent-en').textContent = wordData.sentences?.en || '';
    document.getElementById('sent-cn').textContent = wordData.sentences?.cn || '';
    document.getElementById('sent-ms').textContent = wordData.sentences?.ms || '';

    if (isWin) {
        nextBtn.classList.remove('hidden');
        retryBtn.classList.add('hidden');
        elements.modalTitle.textContent = "Great!";
        elements.modalMessage.innerHTML = `You guessed the word <strong>${state.selectedWord.toUpperCase()}</strong> correctly!`;
        nextBtn.textContent = state.currentWordIndex < state.words.length - 1 ? 'Next Word' : 'Finish Unit';
    } else {
        // If loss, allow moving to next word instead of retrying the same word
        nextBtn.classList.remove('hidden');
        retryBtn.classList.add('hidden');
        elements.modalTitle.textContent = "Oops!";
        elements.modalMessage.innerHTML = `The correct word was <strong>${state.selectedWord.toUpperCase()}</strong>. Better luck next time!`;
        nextBtn.textContent = state.currentWordIndex < state.words.length - 1 ? 'Next Word' : 'Finish Unit';
    }
}

function nextWord() {
    if (state.currentWordIndex < state.words.length - 1) {
        state.currentWordIndex++;
        startRound();
    } else {
        alert(`Excellent! You have finished this unit with a score of: ${state.score}`);
        showView('unit');
        elements.overlay.classList.add('hidden');
    }
}

// Physical Keyboard Support
window.addEventListener('keydown', (e) => {
    // Letter guessing logic
    const char = e.key.toLowerCase();
    if (/^[a-z]$/.test(char) && !views.game.classList.contains('hidden') && elements.overlay.classList.contains('hidden')) {
        handleGuess(char);
    }

    // Modal navigation logic
    if (e.key === 'Enter' && !elements.overlay.classList.contains('hidden')) {
        const nextBtn = document.getElementById('modal-next-btn');
        const retryBtn = document.getElementById('modal-retry-btn');
        
        if (!nextBtn.classList.contains('hidden')) {
            nextWord();
        } else if (!retryBtn.classList.contains('hidden')) {
            startRound();
        }
    }
});
