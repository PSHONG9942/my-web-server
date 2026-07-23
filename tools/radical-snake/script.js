const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// UI Elements
const targetComponentEl = document.getElementById('target-component');
const livesDisplayEl = document.getElementById('lives-display');
const progressDisplayEl = document.getElementById('progress-display');
const lengthDisplayEl = document.getElementById('length-display');
const scoreDisplayEl = document.getElementById('score-display');
const startOverlay = document.getElementById('start-overlay');
const gameOverOverlay = document.getElementById('game-over-overlay');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const finalScoreEl = document.getElementById('final-score');
const gameOverReasonEl = document.getElementById('game-over-reason');
const successOverlay = document.getElementById('success-overlay');

// Game Settings
const gridSize = 40;
const tileCountX = canvas.width / gridSize; // 20
const tileCountY = canvas.height / gridSize; // 15
let animationId;
let lastMoveTime = 0;
let initialSpeed = 300;
let baseSpeed = initialSpeed; // ms per move
const TARGET_COUNT = 3; // How many characters to eat before level up

// Dictionary (Radicals -> Characters)
const radicalsData = [
    { name: '口字旁', radical: '口', characters: ['吧', '啦', '嘴', '吃', '喝', '唱', '吐', '吹', '呼', '吸', '咬', '叫', '呀', '吗', '呢', '叹', '响', '听'] },
    { name: '三点水', radical: '氵', characters: ['清', '河', '湖', '海', '洗', '泪', '汗', '汁', '泥', '流', '漫', '游', '没', '汽', '江', '波', '浪', '潮'] },
    { name: '木字旁', radical: '木', characters: ['树', '林', '森', '枝', '桃', '李', '椅', '桌', '桥', '根', '梅', '检', '查', '杨', '板', '杯', '村', '松'] },
    { name: '草字头', radical: '艹', characters: ['草', '花', '茶', '菜', '苗', '苹', '蓝', '苦', '药', '落', '节', '苏', '莫', '英', '芒', '芝', '芽', '茂'] },
    { name: '言字旁', radical: '讠', characters: ['说', '话', '语', '读', '课', '请', '谁', '谢', '记', '认', '让', '讲', '诉', '论', '许', '识', '词', '试'] },
    { name: '女字旁', radical: '女', characters: ['妈', '奶', '姐', '妹', '她', '好', '如', '妙', '姑', '娘', '娇', '娃', '姨', '姓', '婆', '妇', '姿'] },
    { name: '单人旁', radical: '亻', characters: ['你', '他', '做', '休', '体', '位', '住', '什', '件', '代', '传', '们', '仙', '作', '使', '伯', '低', '但'] },
    { name: '提手旁', radical: '扌', characters: ['打', '拍', '找', '抓', '提', '拉', '推', '抱', '换', '掉', '排', '接', '操', '拔', '按', '挂', '扫', '把'] },
    { name: '日字旁', radical: '日', characters: ['明', '晚', '早', '星', '时', '昨', '晴', '春', '暖', '暗', '晕', '普', '景', '晒', '期'] },
    { name: '心字底/竖心旁', radical: '心/忄', characters: ['想', '忘', '忍', '怒', '忽', '急', '总', '息', '快', '慢', '怕', '情', '惊', '忙', '怪', '懂', '慌', '忆'] }
];

// Build a flat list of all characters for picking random wrong ones
const allCharacters = [];
radicalsData.forEach(r => {
    allCharacters.push(...r.characters);
});

// Game State
let snake = [];
let dx = 0;
let dy = 0;
let nextDx = 0;
let nextDy = 0;
let lives = 3;
let score = 0;
let level = 1;
let currentTarget = null;
let eatenCount = 0;
let entities = []; 
let particles = [];
let gameRunning = false;

// Input handling
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && dy === 0) {
        nextDx = 0; nextDy = -1;
    } else if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && dy === 0) {
        nextDx = 0; nextDy = 1;
    } else if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && dx === 0) {
        nextDx = -1; nextDy = 0;
    } else if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && dx === 0) {
        nextDx = 1; nextDy = 0;
    }
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

function initGame() {
    snake = [
        { x: 10, y: 7 },
        { x: 9, y: 7 },
        { x: 8, y: 7 }
    ];
    dx = 1; dy = 0;
    nextDx = 1; nextDy = 0;
    lives = 3;
    score = 0;
    level = 1;
    eatenCount = 0;
    baseSpeed = initialSpeed;
    entities = [];
    particles = [];
    
    pickNewTarget();
    updateUI();
}

function startGame() {
    startOverlay.classList.add('hidden');
    gameOverOverlay.classList.add('hidden');
    initGame();
    gameRunning = true;
    lastMoveTime = performance.now();
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(gameLoop);
}

function stopGame(reason) {
    gameRunning = false;
    if (animationId) cancelAnimationFrame(animationId);
    finalScoreEl.textContent = score;
    gameOverReasonEl.textContent = reason;
    gameOverOverlay.classList.remove('hidden');
}

function updateUI() {
    targetComponentEl.textContent = currentTarget ? currentTarget.name : '-';
    progressDisplayEl.textContent = `${eatenCount}/${TARGET_COUNT}`;
    lengthDisplayEl.textContent = snake.length;
    scoreDisplayEl.textContent = score;
    
    let heartsHTML = '';
    for (let i = 0; i < 3; i++) {
        if (i < lives) {
            heartsHTML += '<span class="heart">❤</span>';
        } else {
            heartsHTML += '<span class="heart lost">❤</span>';
        }
    }
    livesDisplayEl.innerHTML = heartsHTML;
}

function pickNewTarget() {
    const randomIndex = Math.floor(Math.random() * radicalsData.length);
    currentTarget = radicalsData[randomIndex];
    eatenCount = 0;
    spawnEntities();
    updateUI();
}

function spawnEntities() {
    entities = [];
    
    // Spawn 1 correct character
    spawnCorrectEntity();
    
    // Spawn 3 wrong characters
    for (let i = 0; i < 3; i++) {
        spawnWrongEntity();
    }
}

function spawnCorrectEntity() {
    // Pick a character from current target
    let availableCorrect = currentTarget.characters.filter(c => !entities.some(e => e.text === c));
    if (availableCorrect.length === 0) availableCorrect = currentTarget.characters; // Fallback
    
    let correctChar = availableCorrect[Math.floor(Math.random() * availableCorrect.length)];
    let pos = getRandomEmptyPosition();
    
    entities.push({
        x: pos.x,
        y: pos.y,
        text: correctChar,
        type: 'correct'
    });
}

function spawnWrongEntity() {
    // Pick a character NOT in current target
    let wrongOptions = allCharacters.filter(c => !currentTarget.characters.includes(c) && !entities.some(e => e.text === c));
    let wrongChar = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    let pos = getRandomEmptyPosition();
    
    entities.push({
        x: pos.x,
        y: pos.y,
        text: wrongChar,
        type: 'wrong'
    });
}

function getRandomEmptyPosition() {
    let pos;
    let isOccupied = true;
    let safeguard = 0;
    while (isOccupied && safeguard < 1000) {
        pos = {
            x: Math.floor(Math.random() * tileCountX),
            y: Math.floor(Math.random() * tileCountY)
        };
        isOccupied = snake.some(segment => segment.x === pos.x && segment.y === pos.y) || 
                     entities.some(e => e.x === pos.x && e.y === pos.y);
        safeguard++;
    }
    return pos || {x: 0, y: 0};
}

function showToast(message, isLevelUp = false) {
    successOverlay.textContent = message;
    if (isLevelUp) {
        successOverlay.classList.add('level-up');
    } else {
        successOverlay.classList.remove('level-up');
    }
    successOverlay.classList.remove('hidden');
    setTimeout(() => {
        successOverlay.classList.add('hidden');
    }, isLevelUp ? 2000 : 1200);
}

function createParticles(x, y, color) {
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: x * gridSize + gridSize/2,
            y: y * gridSize + gridSize/2,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 1,
            color: color
        });
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        // Draw little squares for particles to match new aesthetic
        ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
        ctx.globalAlpha = 1;
    });
}

function gameLoop(timestamp) {
    if (!gameRunning) return;
    
    if (timestamp - lastMoveTime >= baseSpeed) {
        update();
        lastMoveTime = timestamp;
    }
    
    updateParticles();
    draw();
    
    if (gameRunning) {
        animationId = requestAnimationFrame(gameLoop);
    }
}

function update() {
    dx = nextDx;
    dy = nextDy;
    
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // Check wall collision
    if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
        stopGame("撞墙了！");
        return;
    }
    
    // Check self collision
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            stopGame("咬到自己了！");
            return;
        }
    }
    
    snake.unshift(head);
    
    // Check entity collision
    let ate = false;
    for (let i = 0; i < entities.length; i++) {
        if (head.x === entities[i].x && head.y === entities[i].y) {
            ate = true;
            let entity = entities[i];
            
            if (entity.type === 'correct') {
                score += 100;
                eatenCount++;
                createParticles(entity.x, entity.y, '#8bc34a'); // Green happy particles
                
                // Remove the eaten entity
                entities.splice(i, 1);
                
                if (eatenCount >= TARGET_COUNT) {
                    level++;
                    score += 500; // Bonus for level up
                    baseSpeed = Math.max(100, baseSpeed - 20); // Faster!
                    showToast(`完美！难度升级！速度变快了！`, true);
                    pickNewTarget();
                } else {
                    showToast(`吃对啦！【${entity.text}】`);
                    // Respawn everything so wrong ones change position
                    spawnEntities();
                }
                
            } else {
                lives--;
                createParticles(entity.x, entity.y, '#f44336'); // Red angry particles
                snake.pop(); // snake doesn't grow if wrong
                
                // Remove the eaten wrong entity and spawn a new one
                entities.splice(i, 1);
                spawnWrongEntity();
                
                if (lives <= 0) {
                    stopGame("寿命耗尽！");
                    return;
                } else {
                    showToast(`吃错了！【${entity.text}】没有${currentTarget.radical}`);
                }
            }
            break; // Can only eat one thing at a time
        }
    }
    
    if (!ate) {
        snake.pop();
    }
    
    updateUI();
}

function draw() {
    // Clear canvas - warm white background
    ctx.fillStyle = '#fffde7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw subtle grid (friendly look)
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < tileCountX; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < tileCountY; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
    
    // Draw Entities (Square Blocks, Uniform Color)
    ctx.font = 'bold 24px "Noto Sans SC"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    entities.forEach(entity => {
        // Draw wood/biscuit block
        ctx.fillStyle = '#ffcc80'; // soft orange
        ctx.strokeStyle = '#f57c00';
        ctx.lineWidth = 3;
        
        let blockMargin = 4;
        let blockSize = gridSize - blockMargin * 2;
        let bx = entity.x * gridSize + blockMargin;
        let by = entity.y * gridSize + blockMargin;
        
        ctx.beginPath();
        ctx.roundRect(bx, by, blockSize, blockSize, 8);
        ctx.fill();
        ctx.stroke();
        
        // Shadow for depth
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.beginPath();
        ctx.roundRect(bx, by + blockSize - 6, blockSize, 6, {bl: 8, br: 8, tl: 0, tr: 0});
        ctx.fill();
        
        // Text
        ctx.fillStyle = '#3e2723';
        ctx.fillText(entity.text, entity.x * gridSize + gridSize/2, entity.y * gridSize + gridSize/2 + 2);
    });
    
    // Draw Snake
    snake.forEach((segment, index) => {
        let isHead = index === 0;
        
        // Cute green snake
        ctx.fillStyle = isHead ? '#4caf50' : '#8bc34a';
        ctx.strokeStyle = '#388e3c';
        ctx.lineWidth = 2;
        
        let margin = isHead ? 2 : 4;
        let size = gridSize - margin * 2;
        
        ctx.beginPath();
        ctx.roundRect(segment.x * gridSize + margin, segment.y * gridSize + margin, size, size, 8);
        ctx.fill();
        ctx.stroke();
        
        // Eyes for the head
        if (isHead) {
            ctx.fillStyle = '#fff';
            let eyeOffsetX = dx === 0 ? 8 : (dx > 0 ? 12 : 4);
            let eyeOffsetY = dy === 0 ? 8 : (dy > 0 ? 12 : 4);
            
            // Eye 1
            ctx.beginPath();
            ctx.arc(segment.x * gridSize + eyeOffsetX, segment.y * gridSize + eyeOffsetY, 4, 0, Math.PI*2);
            ctx.fill();
            
            // Eye 2
            let eye2OffsetX = dx === 0 ? 24 : (dx > 0 ? 12 : 4);
            let eye2OffsetY = dy === 0 ? 24 : (dy > 0 ? 12 : 4);
            
            // Adjust for directional looking
            if (dx !== 0) {
                eye2OffsetY = 24;
            } else {
                eye2OffsetX = 24;
            }
            
            ctx.beginPath();
            ctx.arc(segment.x * gridSize + eye2OffsetX, segment.y * gridSize + eye2OffsetY, 4, 0, Math.PI*2);
            ctx.fill();
            
            // Pupils
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(segment.x * gridSize + eyeOffsetX + dx*2, segment.y * gridSize + eyeOffsetY + dy*2, 2, 0, Math.PI*2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(segment.x * gridSize + eye2OffsetX + dx*2, segment.y * gridSize + eye2OffsetY + dy*2, 2, 0, Math.PI*2);
            ctx.fill();
        }
    });
    
    drawParticles();
}
