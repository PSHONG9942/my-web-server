// Global Game State
        const gameState = {
            language: 'en',
            players: 2,
            gameMode: 'pvp', // 'pvp', 'solo', or 'pve'
            pAName: '',
            pBName: '',
            unlockedRounds: 1, // Initially only round 1 is unlocked
            viewingRound: 1, // Currently viewing round 1
            activePlayer: 'A', // 'A' or 'B'
            numberBag: [], // 0-9 tiles
            symbolBag: [], // +, -, x, ÷ tiles
            hasSwapped: false, // Track if a swap happened this turn
            tutorialCompleted: false, // Tutorial State
            tutorialStep: 0,
            hintsUsedA: 0,
            hintsUsedB: 0,
        };

        // Standard Kirable distribution
        function initBags() {
            // 70 Numbers (0-9, 7 each)
            let nums = [];
            for (let i = 0; i <= 9; i++) {
                for (let j = 0; j < 7; j++) nums.push(i);
            }
            gameState.numberBag = nums.sort(() => Math.random() - 0.5);

            // 20 Symbols (+, -, x, ÷, 5 each)
            let syms = [];
            ['+', '-', 'x', '÷'].forEach(sym => {
                for (let i = 0; i < 5; i++) syms.push(sym);
            });
            gameState.symbolBag = syms.sort(() => Math.random() - 0.5);
        }

        // Simplified i18n Dictionary for Menu & Score Sheet
        const i18n = {
            en: {
                subtitle: "Maths for Life",
                selectPlayers: "Select Players",
                btn1P: "1 Player (A)", btn2P: "2 Players (A & B)",
                selectMode: "Select Mode", btnSolo: "Solo (Freeplay)", btnPvE: "Vs CPU",
                enterNames: "Enter Names",
                p1Name: "Player A Name", p2Name: "Player B Name",
                start: "Start Game",
                navScore: "Score Sheet", navBoard: "Game Board",

                controls: {
                    drawNum: "Draw Number", drawSym: "Draw Symbol", endTurn: "End Turn",
                    numTiles: "Number Tiles:", symTiles: "Symbol Tiles:",
                    swapNum: "Swap Numbers", swapSym: "Swap Symbol"
                },

                score: {
                    round: "ROUND", table: "TABLE", schoolA: "SCHOOL NAME (A)", schoolB: "SCHOOL NAME (B)",
                    equation: "MATHEMATICAL EQUATION", answer: "ANSWER",
                    strike: "STRIKE (30)", bingo: "BINGO (50)", total: "TOTAL POINTS",
                    grandTotal: "GRAND TOTAL :"
                },

                tutorial: {
                    title: "How to Play",
                    step1: "Welcome to Kirable! This is the Score Sheet where you can track points for up to 3 rounds.\n\nTo start playing, click the blinking \"Game Board\" tab above.",
                    step2: "Here is your game board!\n\nDrag your number and symbol tiles into the yellow and pink slots to form valid math equations. Try to use all your tiles for bonus points!\n\nGood luck!",
                    btnOk: "Let's Play!",
                    btnNext: "Next",
                    navRules: "? How to Play"
                },

                msg: {
                    alreadySwapped: "You have already exchanged tiles this turn. Please end your turn.",
                    noTilesNum: "No more number tiles left in the bag!",
                    noTilesSym: "No more symbol tiles left in the bag!",
                    noTilesSwap: "You have no {0} tiles in your rack to swap!",
                    swapped: "{0} {1} tiles swapped! Your turn ends now.",
                    playTileFirst: "You must play at least one tile or exchange tiles before ending your turn.",
                    syntaxErr: "Row {0}: Invalid mathematical syntax (Consecutive or dangling operators).",
                    mathErr: "Row {0} is Incorrect:\n{1} ({2}) is not equal to\n{3} ({4})",
                    noBothSides: "Row {0}: Equation must have tiles on both sides of the equals sign.",
                    evalErr: "Row {0}: Expression failed to evaluate. Check your math symbols.",
                    strike: "STRIKE! 7 tiles played. +30 Points!",
                    bingo: "BINGO! 8 tiles played. +50 Points!",
                    cpuThinking: "Thinking...",
                    cpuSkipped: "CPU skipped its turn.",
                    cpuExchanged: "CPU couldn't find an equation and exchanged its tiles!"
                }
            },
            my: {
                subtitle: "Matematik untuk Kehidupan",
                selectPlayers: "Pilih Pemain",
                btn1P: "1 Pemain (A)", btn2P: "2 Pemain (A & B)",
                selectMode: "Pilih Mod", btnSolo: "Solo (Bebas)", btnPvE: "Lawan CPU",
                enterNames: "Masukkan Nama",
                p1Name: "Nama Pemain A", p2Name: "Nama Pemain B",
                start: "Mula Permainan",
                navScore: "Lembaran Markah", navBoard: "Papan Permainan",

                controls: {
                    drawNum: "Cabut Nombor", drawSym: "Cabut Simbol", endTurn: "Tamat Giliran",
                    numTiles: "Jubin Nombor:", symTiles: "Jubin Simbol:",
                    swapNum: "Tukar Nombor", swapSym: "Tukar Simbol"
                },

                score: {
                    round: "PUSINGAN", table: "MEJA", schoolA: "NAMA SEKOLAH (A)", schoolB: "NAMA SEKOLAH (B)",
                    equation: "PERSAMAAN MATEMATIK", answer: "JAWAPAN",
                    strike: "STRIKE (30)", bingo: "BINGO (50)", total: "JUMLAH MATA",
                    grandTotal: "JUMLAH AKHIR :"
                },

                tutorial: {
                    title: "Cara Bermain",
                    step1: "Selamat datang ke Kirable! Ini ialah Lembaran Markah di mana anda boleh merekod mata sehingga 3 pusingan.\n\nUntuk mula bermain, klik pada tab \"Papan Permainan\" yang berkelip di atas.",
                    step2: "Inilah papan permainan anda!\n\nTarik jubin nombor dan simbol anda ke dalam slot kuning dan merah jambu untuk membentuk persamaan matematik yang sah. Cuba gunakan semua jubin anda untuk mata bonus!\n\nSemoga berjaya!",
                    btnOk: "Jom Main!",
                    btnNext: "Seterusnya",
                    navRules: "? Cara Bermain"
                },

                msg: {
                    alreadySwapped: "Anda telah menukar jubin pada giliran ini. Sila tamatkan giliran anda.",
                    noTilesNum: "Tiada lagi jubin nombor di dalam beg!",
                    noTilesSym: "Tiada lagi jubin simbol di dalam beg!",
                    noTilesSwap: "Anda tiada jubin {0} di rak untuk ditukar!",
                    swapped: "{0} jubin {1} ditukar! Giliran anda tamat.",
                    playTileFirst: "Anda mesti meletakkan sekurang-kurangnya satu jubin atau menukar jubin sebelum menamatkan giliran.",
                    syntaxErr: "Baris {0}: Sintaks matematik tidak sah (Simbol berturutan atau tergantung).",
                    mathErr: "Baris {0} Salah:\n{1} ({2}) tidak sama dengan\n{3} ({4})",
                    noBothSides: "Baris {0}: Persamaan mesti ada jubin di kedua-dua belah tanda sama dengan.",
                    evalErr: "Baris {0}: Ungkapan gagal dinilai. Sila semak simbol matematik anda.",
                    strike: "STRIKE! 7 jubin dimainkan. +30 Mata!",
                    bingo: "BINGO! 8 jubin dimainkan. +50 Mata!",
                    cpuThinking: "Sedang Berfikir...",
                    cpuSkipped: "CPU melangkau gilirannya.",
                    cpuExchanged: "CPU tidak dapat mencari persamaan dan telah menukar jubinnya!"
                }
            },
            cn: {
                subtitle: "生活数学",
                selectPlayers: "选择玩家人数",
                btn1P: "单人游戏 (玩家 A)", btn2P: "双人游戏 (玩家 A & B)",
                selectMode: "选择模式", btnSolo: "单人游玩 (跳过B)", btnPvE: "对战电脑 (CPU)",
                enterNames: "输入玩家姓名",
                p1Name: "玩家 A 姓名", p2Name: "玩家 B 姓名",
                start: "开始游戏",
                navScore: "计分表", navBoard: "游戏板",

                controls: {
                    drawNum: "抽数字", drawSym: "抽符号", endTurn: "结束回合",
                    numTiles: "数字牌剩余:", symTiles: "符号牌剩余:",
                    swapNum: "换数字牌", swapSym: "换符号牌"
                },

                score: {
                    round: "回合", table: "桌号", schoolA: "学校名称 (A)", schoolB: "学校名称 (B)",
                    equation: "数学算式", answer: "答案",
                    strike: "STRIKE (30分)", bingo: "BINGO (50分)", total: "总分",
                    grandTotal: "最终总计 :"
                },

                tutorial: {
                    title: "教学模式",
                    step1: "欢迎来到 Kirable！这是计分表，您可以在这里记录最多 3 个回合的分数。\n\n要开始进行游戏，请点击上方闪烁的“游戏板”(Game Board) 标签页。",
                    step2: "这是您的游戏板！\n\n将您的数字和符号牌拖入黄色和粉色的格子中，组成正确的数学算式。尽量用完所有的牌以获得额外奖励分！\n\n祝您好运！",
                    btnOk: "开始游戏！",
                    btnNext: "下一步",
                    navRules: "? 游戏规则"
                },

                msg: {
                    alreadySwapped: "你这回合已经换过了。请结束回合。",
                    noTilesNum: "袋子里没有数字牌了！",
                    noTilesSym: "袋子里没有符号牌了！",
                    noTilesSwap: "你的牌架上没有可以换的{0}牌！",
                    swapped: "成功更换了 {0} 张{1}牌！你的回合结束。",
                    playTileFirst: "结束回合前，你必须至少放置一张牌，或者选择换牌。",
                    syntaxErr: "第 {0} 行：数学语法无效（出现了连续或悬空的符号）。",
                    mathErr: "第 {0} 行不正确：\n{1} ({2}) 不等于\n{3} ({4})",
                    noBothSides: "第 {0} 行：等号两边都必须有牌。",
                    evalErr: "第 {0} 行：无法计算该算式，请检查符号。",
                    strike: "STRIKE! 打出 7 张牌。附加 30 分！",
                    bingo: "BINGO! 打出 8 张牌。附加 50 分！",
                    cpuThinking: "思考中...",
                    cpuSkipped: "电脑 (CPU) 跳过了它的回合。",
                    cpuExchanged: "电脑 (CPU) 找不到成立的算式，只能把牌洗掉重抽！"
                }
            }
        };

        function applyTranslations(lang) {
            const text = i18n[lang];
            // Update UI texts for the next screen
            document.getElementById('btn-return-index').textContent = text.returnIndex;
            document.getElementById('ui-subtitle').textContent = text.subtitle;
            document.getElementById('text-select-players').textContent = text.selectPlayers;
            document.getElementById('btn-1p').textContent = text.btn1P;
            document.getElementById('btn-2p').textContent = text.btn2P;

            document.getElementById('text-select-mode').textContent = text.selectMode;
            document.getElementById('btn-solo').textContent = text.btnSolo;
            document.getElementById('btn-pve').textContent = text.btnPvE;

            document.getElementById('text-enter-names').textContent = text.enterNames;
            document.getElementById('input-p1').placeholder = text.p1Name;
            document.getElementById('input-p2').placeholder = text.p2Name;
            document.getElementById('btn-start').textContent = text.start;

            document.getElementById('nav-score').textContent = text.navScore;
            document.getElementById('nav-board').textContent = text.navBoard;
            document.getElementById('nav-rules').textContent = text.tutorial.navRules;
        }

        function setLanguage(lang) {
            gameState.language = lang;
            applyTranslations(lang);

            // Transition to Player Selection
            document.getElementById('menu-language').classList.remove('active');
            document.getElementById('menu-players').classList.add('active');
        }

        function goBack(step) {
            if (gameState.tutorialStep > 0) return; // Disable back navigation during tutorial

            document.querySelectorAll('.menu-section').forEach(el => el.classList.remove('active'));

            if (step === 'language') {
                document.getElementById('menu-language').classList.add('active');
            } else if (step === 'players') {
                document.getElementById('menu-players').classList.add('active');
            } else if (step === 'mode') {
                document.getElementById('menu-mode').classList.add('active');
            } else if (step === 'names') {
                // Leaving game to return to names setup
                document.getElementById('game-app').style.display = 'none';
                document.body.style.background = 'radial-gradient(circle at top left, #1e1b4b, var(--bg-base) 60%)';
                document.body.style.overflow = 'hidden';
                document.getElementById('home-menu').style.display = 'block';
                document.getElementById('menu-names').classList.add('active');
            }
        }

        function setPlayers(num) {
            gameState.players = num;

            // Show/Hide P2 Input
            document.getElementById('input-p2').style.display = num === 2 ? 'block' : 'none';

            document.getElementById('menu-players').classList.remove('active');

            if (num === 1) {
                // If 1 player, choose Solo or PvE
                document.getElementById('menu-mode').classList.add('active');
            } else {
                // If 2 players, logic is standard PvP
                gameState.gameMode = 'pvp';
                // Adjust Back button on Enter Names screen to go back to Players
                document.querySelector('#menu-names .btn-back').setAttribute('onclick', "goBack('players')");
                document.getElementById('menu-names').classList.add('active');
            }
        }

        function setMode(mode) {
            gameState.gameMode = mode;
            // Adjust Back button on Enter Names screen to go back to Mode
            document.querySelector('#menu-names .btn-back').setAttribute('onclick', "goBack('mode')");
            document.getElementById('menu-mode').classList.remove('active');
            document.getElementById('menu-names').classList.add('active');
        }

        function startGame() {
            gameState.pAName = document.getElementById('input-p1').value || i18n[gameState.language].p1Name;
            if (gameState.players === 2) {
                gameState.pBName = document.getElementById('input-p2').value || i18n[gameState.language].p2Name;
            } else {
                gameState.pBName = gameState.gameMode === 'solo' ? "None (Solo Mode)" : "CPU";
            }

            // Switch body to light for print-like look initially (score sheet)
            document.body.style.background = '#f8fafc';
            document.body.style.overflow = 'auto'; // Fix scrolling issue
            document.getElementById('home-menu').style.display = 'none';
            document.getElementById('game-app').style.display = 'block';
            document.getElementById('app-footer').style.color = '#334155';

            initBags();
            renderScoreSheet();
            renderGameBoard();
            selectRound(1); // default to round 1
            setupDragAndDrop();

            if (!gameState.tutorialCompleted) {
                setTimeout(startTutorial, 600);
            }
        }

        function switchTab(tabId) {
            if (gameState.tutorialStep === 1 && tabId !== 'board') {
                return; // Prevent navigating away during step 1
            }

            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

            document.getElementById(`tab-${tabId}`).classList.add('active');
            document.getElementById(`nav-${tabId}`).classList.add('active');

            // Dynamic Body Background
            if (tabId === 'board') {
                document.body.style.background = '#55b7a1';
                document.getElementById('app-footer').style.color = '#ffffff';
            } else {
                document.body.style.background = '#f8fafc';
                document.getElementById('app-footer').style.color = '#334155';
            }

            // Tutorial progression
            if (gameState.tutorialStep === 1 && tabId === 'board') {
                gameState.tutorialStep = 2;
                document.getElementById('nav-board').classList.remove('highlight-tab');
                document.querySelector('.nav-tabs').style.zIndex = '100'; // Reset z-index

                const tText = i18n[gameState.language].tutorial;
                document.getElementById('tutorial-text').innerText = tText.step2;
                document.getElementById('btn-tutorial-ok').style.display = 'inline-block';
            }
        }

        // Feature: Preserve input values between rounds
        let roundData = {
            1: { inputs: {} },
            2: { inputs: {} },
            3: { inputs: {} }
        };

        function saveRoundData() {
            if (!gameState.viewingRound) return;
            const container = document.getElementById('scoresheet-render');
            if (!container) return;
            const inputs = container.querySelectorAll('input');
            let data = {};
            inputs.forEach(inp => {
                if (inp.id) {
                    data[inp.id] = inp.value;
                }
            });
            roundData[gameState.viewingRound].inputs = data;
        }

        function loadRoundData(r) {
            const data = roundData[r].inputs;
            const container = document.getElementById('scoresheet-render');
            if (!container) return;

            const inputs = container.querySelectorAll('input');
            inputs.forEach(inp => {
                if (inp.id) {
                    inp.value = data[inp.id] !== undefined ? data[inp.id] : '';
                }
            });

            // carry over from previous round if empty
            if (!data['input-school-a'] && r > 1) {
                document.getElementById('input-school-a').value = roundData[1].inputs['input-school-a'] || '';
                document.getElementById('input-school-b').value = roundData[1].inputs['input-school-b'] || '';
                document.getElementById('input-table').value = roundData[1].inputs['input-table'] || '';
            }
        }

        function selectRound(r) {
            if (r > gameState.unlockedRounds) return; // Disallow selecting locked rounds

            saveRoundData();
            gameState.viewingRound = r;

            // UI visual update for standard circles
            for (let i = 1; i <= 3; i++) {
                const el = document.getElementById(`round-sel-${i}`);
                if (!el) continue;
                el.classList.remove('active');
                if (i <= gameState.unlockedRounds) {
                    el.classList.remove('locked');
                } else {
                    el.classList.add('locked');
                }
            }
            document.getElementById(`round-sel-${r}`).classList.add('active');

            loadRoundData(r);
        }

        function renderScoreSheet() {
            const data = i18n[gameState.language].score;
            // The score table remains symmetrically 2-sided (A and B) regardless of 1P/2P, based on user instruction.

            let html = `
                <div class="score-header">
                    <div style="flex: 1; min-width: 100%; max-width: 300px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div class="score-brand"><h2>KIRABLE</h2></div>
                            <div class="score-info-group">
                                <b>${data.round} :</b>
                                <span class="round-selector" id="round-sel-1" onclick="selectRound(1)">1</span>
                                <span class="round-selector locked" id="round-sel-2" onclick="selectRound(2)">2</span>
                                <span class="round-selector locked" id="round-sel-3" onclick="selectRound(3)">3</span>
                            </div>
                            <div class="score-info-group">
                                <b>${data.table} :</b> <input type="text" id="input-table" class="score-input-line" style="width: 100%; max-width: 150px;">
                            </div>
                        </div>
                        <div class="score-info-group" style="margin-top: 1rem;">
                            <b>${data.schoolA} :</b> <input type="text" id="input-school-a" class="score-input-line" style="width: 100%; max-width: 250px;">
                        </div>
                    </div>

                    <div style="flex: 1; min-width: 100%; max-width: 300px; display: flex; flex-direction: column; justify-content: space-between; padding-top: 2rem;">
                        <div class="score-brand"><h2>LEMBARAN MARKAH</h2></div>
                        <div class="score-info-group" style="margin-top: 1rem;">
                            <b>${data.schoolB} :</b> <input type="text" id="input-school-b" class="score-input-line" style="width: 100%; max-width: 250px;">
                        </div>
                    </div>
                </div>

                <div class="score-tables-container">
                    <!-- Table A Left -->
                    <div class="score-table-wrapper">
                        <h3 style="margin-bottom: 15px; color: #475569; text-align: center; border-bottom: 2px solid var(--primary); padding-bottom: 5px; display: inline-block; width: 100%;">${i18n[gameState.language].p1Name}: ${gameState.pAName}</h3>
                        <table class="paper-table">
                            <thead>
                                <tr>
                                    <th width="40"></th>
                                    <th>${data.equation}</th>
                                    <th width="80">${data.answer}</th>
                                    <th width="70">${data.strike}</th>
                                    <th width="70">${data.bingo}</th>
                                    <th width="90">${data.total}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${Array.from({ length: 10 }, (_, i) => `
                                <tr>
                                    <td class="row-label">A${i + 1}</td>
                                    <td><input type="text" id="a-eq-${i}" readonly></td>
                                    <td><input type="text" id="a-ans-${i}" readonly></td>
                                    <td><input type="text" id="a-str-${i}" readonly style="text-align: center;"></td>
                                    <td><input type="text" id="a-bin-${i}" readonly style="text-align: center;"></td>
                                    <td><input type="number" id="a-tot-${i}" readonly></td>
                                </tr>`).join('')}
                                <tr>
                                    <td colspan="5" style="text-align: right; padding-right: 1rem; color: #ef4444;">Hint Penalty (-10/ea):</td>
                                    <td style="padding: 0; height: 30px;"><input type="text" id="a-hint-pen" style="color: #ef4444; font-weight: bold; font-size: 1rem;" readonly></td>
                                </tr>
                                <tr>
                                    <td colspan="5" style="text-align: right; padding-right: 1rem; font-weight: bold;">
                                        ${data.grandTotal}
                                    </td>
                                    <td style="padding: 0; height: 40px;"><input type="number" id="a-grand-tot" style="font-weight: bold; font-size: 1.1rem;" readonly></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Table B Right -->
                    <div class="score-table-wrapper">
                        <h3 style="margin-bottom: 15px; color: #475569; text-align: center; border-bottom: 2px solid var(--secondary); padding-bottom: 5px; display: inline-block; width: 100%;">${i18n[gameState.language].p2Name}: ${gameState.pBName}</h3>
                        <table class="paper-table">
                            <thead>
                                <tr>
                                    <th width="40"></th>
                                    <th>${data.equation}</th>
                                    <th width="80">${data.answer}</th>
                                    <th width="70">${data.strike}</th>
                                    <th width="70">${data.bingo}</th>
                                    <th width="90">${data.total}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${Array.from({ length: 10 }, (_, i) => `
                                <tr>
                                    <td class="row-label">B${i + 1}</td>
                                    <td><input type="text" id="b-eq-${i}" readonly></td>
                                    <td><input type="text" id="b-ans-${i}" readonly></td>
                                    <td><input type="text" id="b-str-${i}" readonly style="text-align: center;"></td>
                                    <td><input type="text" id="b-bin-${i}" readonly style="text-align: center;"></td>
                                    <td><input type="number" id="b-tot-${i}" readonly></td>
                                </tr>`).join('')}
                                <tr>
                                    <td colspan="5" style="text-align: right; padding-right: 1rem; color: #ef4444;">Hint Penalty (-10/ea):</td>
                                    <td style="padding: 0; height: 30px;"><input type="text" id="b-hint-pen" style="color: #ef4444; font-weight: bold; font-size: 1rem;" readonly></td>
                                </tr>
                                <tr>
                                    <td colspan="5" style="text-align: right; padding-right: 1rem; font-weight: bold;">
                                        ${data.grandTotal}
                                    </td>
                                    <td style="padding: 0; height: 40px;"><input type="number" id="b-grand-tot" style="font-weight: bold; font-size: 1.1rem;" readonly></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            document.getElementById('scoresheet-render').innerHTML = html;
        }

        function renderGameBoard() {
            const dataUI = i18n[gameState.language].controls;

            const generateRowStr = (prefix, i) => `
                <div class="board-row">
                    <div class="row-label-side">${prefix}${i + 1}</div>
                    <div class="cell-group">
                        ${'<div class="board-cell cell-yellow"></div>'.repeat(5)}
                    </div>
                    <div class="cell-equals">=</div>
                    <div class="cell-group">
                        ${'<div class="board-cell cell-pink"></div>'.repeat(3)}
                    </div>
                </div>
            `;

            const sideARows = Array.from({ length: 10 }, (_, i) => generateRowStr('A', i)).join('');
            const sideBRows = Array.from({ length: 10 }, (_, i) => generateRowStr('B', i)).join('');

            // Rack generation (7 num slots, 1 sym slot)
            const rackSlots = Array.from({ length: 7 }, () => `<div class="rack-slot number-slot"></div>`).join('');
            const symSlot = `<div class="rack-slot symbol-slot"></div>`;

            // Adjust layout based on Side (A logo on right, B logo on right)
            const generateSide = (sideLetter, bgLetter, numRowsStr, pName) => `
                <div class="board-side" id="side-${sideLetter.toLowerCase()}" ${sideLetter === 'A' ? `style="box-shadow: 0 0 20px rgba(255,255,255,0.7);"` : ''}>
                    <div class="board-header">
                        <div style="flex-shrink: 0; min-width: 110px;">
                            KIRABLE <span style="font-size:0.6rem; vertical-align: top;">®</span><br><span style="font-size: 0.6rem; font-weight: 400; color: #64748b;">MATHS FOR LIFE</span>
                        </div>
                        <div class="player-rack" id="rack-p${sideLetter.toLowerCase()}">
                            <div class="rack-grid">
                                ${rackSlots}
                                ${symSlot}
                            </div>
                        </div>
                        <div class="logo-shape-${bgLetter.toLowerCase()}" style="flex-shrink: 0;">${bgLetter}</div>
                    </div>
                    <div class="board-grid">
                        ${numRowsStr}
                    </div>
                </div>
            `;

            let html = `
                <div class="board-layout">
                    <!-- SIDE A -->
                    ${generateSide('A', 'A', sideARows, gameState.pAName || 'A')}

                    <!-- Central Controls Array -->
                    <div class="controls-panel">
                        <div class="controls-row">
                            <button class="btn-action" id="btn-draw-number" onclick="drawTiles('number')" style="border-color: #eab308; color: #fbd36b;">${dataUI.drawNum}</button>
                            <button class="btn-action" id="btn-swap-number" onclick="swapTiles('number')" style="border-color: #ca8a04; color: #cbd5e1; font-size: 0.85rem; padding: 0.5rem;">${dataUI.swapNum}</button>
                        </div>
                        <div class="controls-row">
                            <button class="btn-action" id="btn-draw-symbol" onclick="drawTiles('symbol')" style="border-color: #db2777; color: #fdf2f8;">${dataUI.drawSym}</button>
                            <button class="btn-action" id="btn-swap-symbol" onclick="swapTiles('symbol')" style="border-color: #be185d; color: #cbd5e1; font-size: 0.85rem; padding: 0.5rem;">${dataUI.swapSym}</button>
                        </div>
                        <div class="controls-row" style="margin-top: 0.5rem; flex-direction: row; gap: 0.5rem;">
                            <div class="tile-count" id="numbers-left" style="padding: 0.4rem; font-size: 0.85rem; border-bottom: 2px solid #eab308;">${dataUI.numTiles}<br><b id="numbers-left-val" style="font-size: 1.1rem;">70</b></div>
                            <div class="tile-count" id="symbols-left" style="padding: 0.4rem; font-size: 0.85rem; border-bottom: 2px solid #db2777;">${dataUI.symTiles}<br><b id="symbols-left-val" style="font-size: 1.1rem;">20</b></div>
                        </div>

                        <div class="controls-row" style="margin-top: 1rem; background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 8px;">
                            <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Current Turn</div>
                            <div id="active-player-display" style="font-size: 1.2rem; font-weight: bold; color: var(--primary); display: flex; align-items: center; gap: 0.5rem; text-align: center;">
                                <span>←</span>
                                <span>${gameState.pAName || 'Player A'}</span>
                            </div>
                        </div>

                        <div class="controls-row" style="margin-top:auto;">
                            <button class="btn-action" id="btn-hint" onclick="showHint()" style="background: #8b5cf6; border-color: #7c3aed; color: white; margin-bottom: 0.5rem;">
                                💡 Get Hint
                            </button>
                            <button class="btn-action" id="btn-end-turn" onclick="endTurn()" style="background: #10b981; border-color: #059669; color: white;">
                                ${dataUI.endTurn}
                            </button>
                        </div>
                    </div>

                    <!-- SIDE B -->
                    ${generateSide('B', 'B', sideBRows, gameState.players === 2 ? gameState.pBName || 'B' : 'CPU')}
                </div>
            `;

            document.getElementById('board-render').innerHTML = html;
        }

        /* --- Tile Controls and Game Logic --- */
        let draggedTile = null;

        function updateTileCounts() {
            const numEl = document.getElementById('numbers-left-val');
            const symEl = document.getElementById('symbols-left-val');
            if (numEl) numEl.innerText = gameState.numberBag.length;
            if (symEl) symEl.innerText = gameState.symbolBag.length;
        }

        function createTileUI(type, value) {
            const tile = document.createElement('div');
            tile.className = `tile ${type === 'number' ? 'tile-number' : 'tile-symbol'}`;
            tile.draggable = true;
            tile.innerText = value;
            tile.dataset.type = type;
            tile.dataset.value = value;

            // Lock CPU tiles from human interaction in PvE
            if (gameState.gameMode === 'pve' && gameState.activePlayer === 'B') {
                tile.draggable = false;
                tile.style.pointerEvents = 'none'; // Prevents clicking and dragging
            }

            // 6 and 9 flip mechanics
            if (value === 6 || value === 9) {
                tile.title = "Double-click to flip between 6 and 9";
                if (gameState.gameMode !== 'pve' || gameState.activePlayer !== 'B') {
                    tile.style.textDecoration = "underline";
                    tile.ondblclick = () => {
                        const newVal = tile.dataset.value == 6 ? 9 : 6;
                        tile.dataset.value = newVal;
                        tile.innerText = newVal;
                    };
                }
            }

            // Drag Events natively attached to tile
            tile.addEventListener('dragstart', (e) => {
                draggedTile = tile;
                e.dataTransfer.setData('text/plain', '');
                setTimeout(() => tile.style.opacity = '0.5', 0);
            });

            tile.addEventListener('dragend', () => {
                tile.style.opacity = '1';
                draggedTile = null;
                document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
            });

            return tile;
        }

        function drawTiles(type) {
            // Drawing is always allowed if slots are empty.
            // Swapping is the only action that locks the turn.
            if (gameState.hasSwapped) {
                alert(i18n[gameState.language].msg.alreadySwapped);
                return;
            }

            const sideId = gameState.activePlayer === 'A' ? 'side-a' : 'side-b';
            const sideEl = document.getElementById(sideId);
            if (sideEl) {
                const activeTilesOnBoard = sideEl.querySelectorAll('.board-grid .tile:not(.locked)');
                if (activeTilesOnBoard.length > 0) {
                    alert(gameState.language === 'cn' ? "您在棋盘上还有未锁定的牌，无法抽牌！请先将牌放回牌架，或结束回合。" : 
                          gameState.language === 'my' ? "Anda mempunyai jubin yang belum dikunci di atas papan. Sila pulangkan ke rak atau tamatkan giliran." :
                          "You cannot draw or swap tiles while you have pending tiles on the board. Return them to your rack or end your turn.");
                    return;
                }
            }

            const rackId = gameState.activePlayer === 'A' ? 'rack-pa' : 'rack-pb';
            const rackEl = document.getElementById(rackId);
            if (!rackEl) return;

            // Define which slots to fill based on type
            const selector = type === 'number' ? '.number-slot' : '.symbol-slot';
            const emptySlots = Array.from(rackEl.querySelectorAll(selector)).filter(slot => slot.children.length === 0);

            const bag = type === 'number' ? gameState.numberBag : gameState.symbolBag;

            // Fill empty slots up to what's available
            let drawnCount = 0;
            for (let i = 0; i < emptySlots.length; i++) {
                if (bag.length === 0) break;

                const val = bag.pop();
                const tile = createTileUI(type, val);
                emptySlots[i].appendChild(tile);
                drawnCount++;
            }

            if (drawnCount > 0) {
                updateTileCounts();
            } else if (emptySlots.length > 0) {
                const typeStr = type === 'number' ? i18n[gameState.language].controls.numTiles.replace(':', '') : i18n[gameState.language].controls.symTiles.replace(':', '');
                alert(type === 'number' ? i18n[gameState.language].msg.noTilesNum : i18n[gameState.language].msg.noTilesSym);
            }
        }

        // New Swap Tiles logic
        function swapTiles(type) {
            if (gameState.hasSwapped) {
                alert(i18n[gameState.language].msg.alreadySwapped);
                return;
            }

            const sideId = gameState.activePlayer === 'A' ? 'side-a' : 'side-b';
            const sideEl = document.getElementById(sideId);
            if (sideEl) {
                const activeTilesOnBoard = sideEl.querySelectorAll('.board-grid .tile:not(.locked)');
                if (activeTilesOnBoard.length > 0) {
                    alert(gameState.language === 'cn' ? "您在棋盘上还有未锁定的牌，无法换牌！请先将牌放回牌架，或结束回合。" : 
                          gameState.language === 'my' ? "Anda mempunyai jubin yang belum dikunci di atas papan. Sila pulangkan ke rak atau tamatkan giliran." :
                          "You cannot draw or swap tiles while you have pending tiles on the board. Return them to your rack or end your turn.");
                    return;
                }
            }

            const rackId = gameState.activePlayer === 'A' ? 'rack-pa' : 'rack-pb';
            const rackEl = document.getElementById(rackId);
            const bag = type === 'number' ? gameState.numberBag : gameState.symbolBag;

            // Find ALL tiles of the requested type CURRENTLY IN THE RACK
            // Match the actual tile type rather than the slot it sits in (to handle misplaced tiles)
            const selector = type === 'number' ? '.tile-number' : '.tile-symbol';
            const tilesToSwap = Array.from(rackEl.querySelectorAll(selector));

            if (tilesToSwap.length === 0) {
                const typeName = type === 'number' ? "0-9" : "+ - x ÷";
                alert(i18n[gameState.language].msg.noTilesSwap.replace('{0}', typeName));
                return;
            }

            // Return values to bag and clear UI, while remembering where they were
            let slotsToRefill = [];
            tilesToSwap.forEach(tile => {
                const val = tile.dataset.value;
                slotsToRefill.push(tile.parentElement); // Remember the slot it was in
                // convert string numbers back to int for bag storage
                bag.push(type === 'number' ? parseInt(val) : val);
                tile.remove();
            });

            // Reshuffle the bag since we put tiles back
            bag.sort(() => Math.random() - 0.5);

            // Redraw exactly the same amount of tiles into the EXACT slots they came from
            slotsToRefill.forEach(slot => {
                if (bag.length > 0) {
                    const newVal = bag.pop();
                    const newTile = createTileUI(type, newVal);
                    slot.appendChild(newTile);
                }
            });
            updateTileCounts();

            // Ensure flag is set so they can't swap both
            gameState.hasSwapped = true;

            // Auto End Turn after swap as per standard rules (or force them to click end turn)
            const typeName = type === 'number' ? "0-9" : "+ - x ÷";
            alert(i18n[gameState.language].msg.swapped.replace('{0}', tilesToSwap.length).replace('{1}', typeName));
            endTurn();
        }

        function setupDragAndDrop() {
            const board = document.getElementById('board-render');

            // General delegator for drag over
            board.addEventListener('dragover', (e) => {
                e.preventDefault();
                const target = e.target.closest('.board-cell.cell-yellow, .board-cell.cell-pink, .rack-slot');
                if (target && target.children.length === 0 && !target.classList.contains('locked')) {
                    if (draggedTile) {
                        target.classList.add('drag-over');
                    }
                }
            });

            board.addEventListener('dragleave', (e) => {
                const target = e.target.closest('.board-cell, .rack-slot');
                if (target) {
                    target.classList.remove('drag-over');
                }
            });

            // Delegate drop
            board.addEventListener('drop', (e) => {
                e.preventDefault();
                const target = e.target.closest('.board-cell.cell-yellow, .board-cell.cell-pink, .rack-slot');
                if (target) {
                    target.classList.remove('drag-over');
                    if (draggedTile && target.children.length === 0 && !target.classList.contains('locked')) {
                        // Allow ANY tile to be dropped ANYWHERE
                        target.appendChild(draggedTile);
                    }
                }
            });
        }

        function endTurn() {
            const sideId = gameState.activePlayer === 'A' ? 'side-a' : 'side-b';
            const sideEl = document.getElementById(sideId);
            if (!sideEl) return;
            const pId = gameState.activePlayer.toLowerCase();

            let rows = Array.from(sideEl.querySelectorAll('.board-row'));
            let boardGrid = sideEl.querySelector('.board-grid');

            // Gather all newly placed tiles on active board ONLY (ignore tiles left in rack)
            let newTilesOnBoard = boardGrid.querySelectorAll('.tile:not(.locked)');

            if (newTilesOnBoard.length === 0 && !gameState.hasSwapped) {
                alert(i18n[gameState.language].msg.playTileFirst);
                return;
            }

            let tilesPlayedCount = newTilesOnBoard.length;
            let rowsToValidate = rows.filter(row => row.querySelectorAll('.tile:not(.locked)').length > 0);

            let allValid = true;
            let errorMsg = "";
            let processedRows = []; // Store successfully validated rows to score them

            for (let row of rowsToValidate) {
                const rowIndex = rows.indexOf(row);
                const leftCells = row.querySelectorAll('.cell-group')[0].querySelectorAll('.board-cell');
                const rightCells = row.querySelectorAll('.cell-group')[1].querySelectorAll('.board-cell');

                const getTiles = (cells) => {
                    let items = [];
                    cells.forEach(c => { if (c.firstElementChild) items.push(c.firstElementChild); });
                    return items;
                };

                let leftTiles = getTiles(leftCells);
                let rightTiles = getTiles(rightCells);

                // Both sides must have at least one tile
                if (leftTiles.length === 0 || rightTiles.length === 0) {
                    allValid = false;
                    errorMsg = i18n[gameState.language].msg.noBothSides.replace('{0}', rowIndex + 1);
                    break;
                }

                const buildExpr = (tilesArr) => {
                    return tilesArr.map(t => {
                        let v = t.dataset.value;
                        if (v === 'x') return '*';
                        if (v === '÷') return '/';
                        return v;
                    }).join('');
                };

                let leftExpr = buildExpr(leftTiles);
                let rightExpr = buildExpr(rightTiles);

                // Basic syntax validation (prevent adjacent math operators like 1++2)
                if (/[\+\-\*\/]{2,}/.test(leftExpr) || /[\+\-\*\/]{2,}/.test(rightExpr) ||
                    /^[\+\-\*\/]/.test(leftExpr) || /^[\+\-\*\/]/.test(rightExpr) ||
                    /[\+\-\*\/]$/.test(leftExpr) || /[\+\-\*\/]$/.test(rightExpr)) {
                    allValid = false;
                    errorMsg = i18n[gameState.language].msg.syntaxErr.replace('{0}', rowIndex + 1);
                    break;
                }

                // Strip leading zeros for eval to avoid octal issues (e.g. "05" -> "5")
                let safeLeft = leftExpr.replace(/\b0+(?=\d)/g, '');
                let safeRight = rightExpr.replace(/\b0+(?=\d)/g, '');

                try {
                    let leftVal = new Function('return ' + safeLeft)();
                    let rightVal = new Function('return ' + safeRight)();

                    // Float precision issue mitigation
                    if (Math.abs(leftVal - rightVal) > 0.0001) {
                        allValid = false;
                        const lFmt = leftExpr.replace(/\*/g, 'x').replace(/\//g, '÷');
                        const rFmt = rightExpr.replace(/\*/g, 'x').replace(/\//g, '÷');
                        errorMsg = `Row ${rowIndex + 1} is Incorrect:\n${lFmt} (${leftVal}) is not equal to\n${rFmt} (${rightVal})`;
                        break;
                    }

                    // Calculate Scores Based on New Logic
                    let baseScore = leftVal; // Base score is the answer

                    processedRows.push({
                        index: rowIndex,
                        eqStr: leftExpr.replace(/\*/g, 'x').replace(/\//g, '÷') + ' = ' + rightExpr.replace(/\*/g, 'x').replace(/\//g, '÷'),
                        ans: leftVal,
                        baseScore: baseScore
                    });

                } catch (e) {
                    allValid = false;
                    errorMsg = i18n[gameState.language].msg.evalErr.replace('{0}', rowIndex + 1);
                    break;
                }
            }

            if (!allValid) {
                alert(errorMsg);
                return; // Abort end turn! Player must fix the board.
            }

            // === All rows valid! Apply scores ===

            let hasAppliedBonus = false;
            processedRows.forEach(data => {
                const i = data.index;

                let strikePoints = 0;
                let strikeDisplay = "";
                let bingoPoints = 0;
                let bingoDisplay = "";

                // Apply Bonus if applicable (only to the first matched row if they submitted multiple rows in one turn)
                if (!hasAppliedBonus) {
                    if (tilesPlayedCount === 7) {
                        strikePoints = 30;
                        strikeDisplay = "✓";
                        hasAppliedBonus = true;
                        alert(i18n[gameState.language].msg.strike);
                    } else if (tilesPlayedCount === 8) {
                        bingoPoints = 50;
                        bingoDisplay = "✓";
                        hasAppliedBonus = true;
                        alert(i18n[gameState.language].msg.bingo);
                    }
                }

                document.getElementById(`${pId}-eq-${i}`).value = data.eqStr;
                document.getElementById(`${pId}-ans-${i}`).value = data.ans;

                document.getElementById(`${pId}-str-${i}`).value = strikeDisplay;
                if (strikeDisplay) document.getElementById(`${pId}-str-${i}`).style.color = 'var(--primary)';
                document.getElementById(`${pId}-str-${i}`).dataset.val = strikePoints; // store real numerical value here

                document.getElementById(`${pId}-bin-${i}`).value = bingoDisplay;
                if (bingoDisplay) document.getElementById(`${pId}-bin-${i}`).style.color = 'var(--primary)';
                document.getElementById(`${pId}-bin-${i}`).dataset.val = bingoPoints;

                let totalRowScore = data.baseScore + strikePoints + bingoPoints;
                document.getElementById(`${pId}-tot-${i}`).value = totalRowScore;
            });

            // Update Grand Total for the player
            if (processedRows.length > 0) {
                updateGrandTotalUI(gameState.activePlayer);
            }

            // Calculate the actual score achieved this turn
            let actualTurnScore = 0;
            processedRows.forEach(data => {
                const i = data.index;
                let strikePoints = document.getElementById(`${pId}-str-${i}`).dataset.val ? parseInt(document.getElementById(`${pId}-str-${i}`).dataset.val) : 0;
                let bingoPoints = document.getElementById(`${pId}-bin-${i}`).dataset.val ? parseInt(document.getElementById(`${pId}-bin-${i}`).dataset.val) : 0;
                actualTurnScore += (data.baseScore + strikePoints + bingoPoints);
            });

            // Post-Turn Analysis
            if (!gameState.hasSwapped) {
                const rackId = gameState.activePlayer === 'A' ? 'rack-pa' : 'rack-pb';
                const rackEl = document.getElementById(rackId);
                let numTiles = Array.from(rackEl.querySelectorAll('.number-slot .tile')).map(t => t.dataset.value);
                let symTiles = Array.from(rackEl.querySelectorAll('.symbol-slot .tile')).map(t => t.dataset.value);
                
                // Add the newly played tiles to the rack pool for analysis
                newTilesOnBoard.forEach(t => {
                    if (t.dataset.type === 'number') numTiles.push(t.dataset.value);
                    else symTiles.push(t.dataset.value);
                });

                let bestPossible = getHighestScorePlay(numTiles, symTiles);
                if (bestPossible) {
                    // Slight delay to allow UI to render previous alerts or state changes
                    setTimeout(() => {
                        if (actualTurnScore >= bestPossible.score) {
                            let wowMsg = gameState.language === 'cn' ? `太棒了！您找到了当前牌面能组成的最高分算式！(${actualTurnScore} 分)` :
                                         gameState.language === 'my' ? `HEBAT! Anda menjumpai persamaan dengan markah tertinggi yang mungkin! (${actualTurnScore} mata)` :
                                         `WOW! You found the absolute highest scoring play possible for your tiles! (${actualTurnScore} points)`;
                            alert("🏆 Brilliant Play!\n\n" + wowMsg);
                        } else {
                            let analysisMsg = gameState.language === 'cn' ? `回合结束！为了复盘分析，您如果打出以下算式，最高可得 ${bestPossible.score} 分：\n${bestPossible.equation}` : 
                                              gameState.language === 'my' ? `Giliran tamat! Untuk analisis: anda boleh mencapai ${bestPossible.score} mata jika bermain:\n${bestPossible.equation}` : 
                                              `Turn completed! For your analysis, you could have scored ${bestPossible.score} points by playing:\n${bestPossible.equation}`;
                            alert("📊 Analysis:\n\n" + analysisMsg);
                        }
                    }, 100);
                }
            }

            // Lock the new tiles
            newTilesOnBoard.forEach(tile => {
                tile.classList.add('locked');
                tile.style.boxShadow = 'none';
                tile.style.border = '1px solid rgba(0,0,0,0.5)';
                tile.style.cursor = 'default';
                tile.setAttribute('draggable', 'false'); // Remove dragging capability
            });

            // Toggle active player visually based on Game Mode
            if (gameState.gameMode === 'solo') {
                // Solo Mode: Player A just keeps going, B is skipped entirely
                gameState.activePlayer = 'A';
                document.getElementById('side-a').style.boxShadow = `0 0 20px rgba(255,255,255,0.7)`;
                document.getElementById('side-b').style.opacity = '0.5'; // Visually dim Side B
            } else {
                // PvP or PvE: Switch to the other player
                document.getElementById(`side-${gameState.activePlayer.toLowerCase()}`).style.boxShadow = 'none';
                gameState.activePlayer = gameState.activePlayer === 'A' ? 'B' : 'A';
                document.getElementById(`side-${gameState.activePlayer.toLowerCase()}`).style.boxShadow = `0 0 20px rgba(255,255,255,0.7)`;
            }

            // Update center console display
            const displayEl = document.getElementById('active-player-display');
            if (gameState.activePlayer === 'A') {
                displayEl.innerHTML = `<span>←</span> <span>${gameState.pAName || 'Player A'}</span>`;
                displayEl.style.color = 'var(--primary)';
            } else {
                const pB = gameState.players === 2 ? (gameState.pBName || 'Player B') : 'CPU';
                displayEl.innerHTML = `<span>${pB}</span> <span>→</span>`;
                displayEl.style.color = 'var(--secondary)';
            }

            // Reset turn action tracker
            gameState.hasSwapped = false;

            // Handle CPU Turn in PvE
            if (gameState.gameMode === 'pve' && gameState.activePlayer === 'B') {
                setTimeout(cpuTakeTurn, 1000); // 1-second delay for realism
            }
        }

        // CPU Algorithm for Equation Building
        function findCPUPlay(rackNumbers, rackSymbols) {
            let op = rackSymbols.length > 0 ? rackSymbols[0] : null;

            function getRemaining(source, toRemoveStr) {
                let res = [...source];
                for (let char of toRemoveStr) {
                    let idx = res.indexOf(char);
                    if (idx !== -1) res.splice(idx, 1);
                    else return null;
                }
                return res;
            }

            function getPermutations(arr, maxLen) {
                let results = new Set();
                function permute(curr, remaining) {
                    if (curr.length > 0 && curr.length <= maxLen) {
                        if (curr.length === 1 || curr[0] !== '0') {
                            results.add(curr);
                        }
                    }
                    if (curr.length === maxLen) return;
                    for (let i = 0; i < remaining.length; i++) {
                        let nextRem = [...remaining];
                        nextRem.splice(i, 1);
                        permute(curr + remaining[i], nextRem);
                    }
                }
                permute('', arr);
                return Array.from(results);
            }

            let possibleA = getPermutations(rackNumbers, 3);
            possibleA.sort(() => Math.random() - 0.5);

            for (let AStr of possibleA) {
                let remAfterA = getRemaining(rackNumbers, AStr);
                if (!remAfterA) continue;

                if (op) {
                    let possibleB = getPermutations(remAfterA, 3);
                    possibleB.sort(() => Math.random() - 0.5);

                    for (let BStr of possibleB) {
                        let remAfterB = getRemaining(remAfterA, BStr);
                        if (!remAfterB) continue;

                        let A = parseInt(AStr);
                        let B = parseInt(BStr);
                        let C = null;

                        if (op === '+') C = A + B;
                        else if (op === '-') C = A - B;
                        else if (op === 'x') C = A * B;
                        else if (op === '÷') {
                            if (B !== 0 && A % B === 0) C = A / B;
                        }

                        if (C !== null && C >= 0 && Number.isInteger(C)) {
                            let CStr = C.toString();
                            let finalRem = getRemaining(remAfterB, CStr);
                            if (finalRem !== null) {
                                let leftArr = AStr.split('').concat(op, BStr.split(''));
                                let rightArr = CStr.split('');
                                let lLen = leftArr.length;
                                let rLen = rightArr.length;

                                if (lLen <= 5 && rLen <= 3) {
                                    return { left: leftArr, right: rightArr };
                                } else if (rLen <= 5 && lLen <= 3) {
                                    return { left: rightArr, right: leftArr };
                                }
                            }
                        }
                    }
                } else {
                    let C = parseInt(AStr);
                    let CStr = C.toString();
                    let finalRem = getRemaining(remAfterA, CStr);
                    if (finalRem !== null) {
                        if (AStr.length <= 5 && CStr.length <= 3) {
                            return { left: AStr.split(''), right: CStr.split('') };
                        } else if (CStr.length <= 5 && AStr.length <= 3) {
                            return { left: CStr.split(''), right: AStr.split('') };
                        }
                    }
                }
            }
            return null;
        }

        function cpuTakeTurn() {
            if (gameState.activePlayer !== 'B' || gameState.gameMode !== 'pve') return;

            const displayEl = document.getElementById('active-player-display');
            displayEl.innerHTML = `<span>${i18n[gameState.language].msg.cpuThinking}</span> <span>→</span>`;

            setTimeout(() => {
                const rackEl = document.getElementById('rack-pb');
                const emptyNumSlots = Array.from(rackEl.querySelectorAll('.number-slot')).filter(s => s.children.length === 0);
                const emptySymSlots = Array.from(rackEl.querySelectorAll('.symbol-slot')).filter(s => s.children.length === 0);

                emptyNumSlots.forEach(slot => {
                    if (gameState.numberBag.length > 0) {
                        slot.appendChild(createTileUI('number', gameState.numberBag.pop()));
                    }
                });
                emptySymSlots.forEach(slot => {
                    if (gameState.symbolBag.length > 0) {
                        slot.appendChild(createTileUI('symbol', gameState.symbolBag.pop()));
                    }
                });
                updateTileCounts();

                let numTiles = Array.from(rackEl.querySelectorAll('.number-slot .tile'));
                let symTiles = Array.from(rackEl.querySelectorAll('.symbol-slot .tile'));

                let rackNumbers = numTiles.map(t => t.dataset.value);
                let rackSymbols = symTiles.map(t => t.dataset.value);

                let bestMove = findCPUPlay(rackNumbers, rackSymbols);

                if (bestMove) {
                    const sideEl = document.getElementById('side-b');
                    const rows = Array.from(sideEl.querySelectorAll('.board-row'));
                    let emptyRow = rows.find(row => row.querySelectorAll('.tile').length === 0);

                    if (emptyRow) {
                        const leftCells = emptyRow.querySelectorAll('.cell-group')[0].querySelectorAll('.board-cell');
                        const rightCells = emptyRow.querySelectorAll('.cell-group')[1].querySelectorAll('.board-cell');

                        function placeTile(charArr, cells) {
                            charArr.forEach((char, i) => {
                                let tile = Array.from(rackEl.querySelectorAll('.tile')).find(t => t.dataset.value === char);
                                if (tile) {
                                    // Make tile non-interactive once placed
                                    tile.draggable = false;
                                    tile.style.pointerEvents = 'none';
                                    cells[i].appendChild(tile);
                                }
                            });
                        }

                        placeTile(bestMove.left, leftCells);
                        placeTile(bestMove.right, rightCells);

                        gameState.hasSwapped = false;
                        setTimeout(() => endTurn(), 500); // Trigger standard endTurn after visual placement
                        return;
                    }
                }

                // If no move found, CPU swaps all its numbers to try next turn
                numTiles.forEach(tile => {
                    gameState.numberBag.push(parseInt(tile.dataset.value));
                    tile.remove();
                });
                gameState.numberBag.sort(() => Math.random() - 0.5);
                gameState.hasSwapped = true;

                alert(i18n[gameState.language].msg.cpuExchanged);
                endTurn();

            }, 1000);
        }

        // --- Tutorial & Rules Logic ---
        function startTutorial() {
            gameState.tutorialStep = 1;
            const tText = i18n[gameState.language].tutorial;

            document.getElementById('tutorial-title').innerText = tText.title;
            document.getElementById('tutorial-text').innerText = tText.step1;
            document.getElementById('btn-tutorial-ok').style.display = 'none';
            document.getElementById('btn-tutorial-next').style.display = 'none';
            document.getElementById('btn-tutorial-ok').innerText = tText.btnOk;

            document.getElementById('tutorial-overlay').style.display = 'flex';

            // Elevate the nav-tabs slightly so it can be clicked over the overlay
            document.querySelector('.nav-tabs').style.position = 'relative';
            document.querySelector('.nav-tabs').style.zIndex = '1000';
            document.getElementById('nav-board').classList.add('highlight-tab');
        }

        function showRules() {
            // Manual activation of rules view
            gameState.tutorialStep = 2; // Fake step 2 to prevent tab restriction logic
            const tText = i18n[gameState.language].tutorial;

            document.getElementById('tutorial-title').innerText = tText.title;

            // Check which tab is currently active
            const isBoardActive = document.getElementById('tab-board').classList.contains('active');

            if (isBoardActive) {
                // Show Game Board rules
                document.getElementById('tutorial-text').innerText = tText.step2;
            } else {
                // Show Score Sheet rules
                const manualText1 = tText.step1.split('\n\n')[0]; // Just the score sheet part
                document.getElementById('tutorial-text').innerText = manualText1;
            }

            // Hide "Next" button since rules are now context-aware
            document.getElementById('btn-tutorial-next').style.display = 'none';

            document.getElementById('btn-tutorial-ok').style.display = 'inline-block';
            document.getElementById('btn-tutorial-ok').innerText = tText.btnOk;

            // Remove any highlight effects from previous sessions
            document.getElementById('nav-board').classList.remove('highlight-tab');
            document.querySelector('.nav-tabs').style.zIndex = '100';

            document.getElementById('tutorial-overlay').style.display = 'flex';
        }

        function nextRuleStep() {
            const tText = i18n[gameState.language].tutorial;
            document.getElementById('tutorial-text').innerText = tText.step2;
            document.getElementById('btn-tutorial-next').style.display = 'none';
            document.getElementById('btn-tutorial-ok').style.display = 'inline-block';
        }

        function completeTutorial() {
            gameState.tutorialCompleted = true;
            gameState.tutorialStep = 0;
            document.getElementById('tutorial-overlay').style.display = 'none';
        }

        // Initialize default language texts on load
        window.addEventListener('DOMContentLoaded', () => {
            applyTranslations(gameState.language);
        });

        // --- Hint System (Easiest Play) ---
        function getKirableHint(rackNumbers, rackSymbols) {
            let op = rackSymbols.length > 0 ? rackSymbols[0] : null;

            let rackCounts = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 7:0, 8:0, 69:0};
            for(let n of rackNumbers) {
                if(n == 6 || n == 9) rackCounts[69]++;
                else rackCounts[n] = (rackCounts[n] || 0) + 1;
            }

            let possibleStrs = [];
            for(let i=0; i<10; i++) possibleStrs.push(i.toString());
            for(let i=0; i<100; i++) possibleStrs.push(i.toString().padStart(2, '0'));
            for(let i=0; i<1000; i++) possibleStrs.push(i.toString().padStart(3, '0'));

            let bestPlay = null;
            let bestCost = Infinity;

            function evaluateCandidate(AStr, BStr, CStr, scoreBase) {
                let lLen = op ? (AStr.length + 1 + BStr.length) : AStr.length;
                let rLen = CStr.length;
                if (!((lLen <= 5 && rLen <= 3) || (rLen <= 5 && lLen <= 3))) return;

                let reqStr = AStr + (BStr || "") + CStr;
                if (reqStr.length > rackNumbers.length) return;

                let reqCounts = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 7:0, 8:0, 69:0};
                for(let char of reqStr) {
                    if (char === '6' || char === '9') reqCounts[69]++;
                    else reqCounts[char]++;
                }
                
                for(let k in reqCounts) {
                    if (reqCounts[k] > rackCounts[k]) return;
                }

                let tilesUsed = reqStr.length + (op ? 1 : 0);
                
                let cost = scoreBase + (tilesUsed * 0.01); 

                if (cost < bestCost) {
                    bestCost = cost;
                    bestPlay = {
                        equation: op ? `${parseInt(AStr,10)} ${op} ${parseInt(BStr,10)} = ${parseInt(CStr,10)}` : `${parseInt(AStr,10)} = ${parseInt(CStr,10)}`,
                        score: scoreBase,
                        tilesUsed: tilesUsed
                    };
                }
            }

            if (op) {
                for (let AStr of possibleStrs) {
                    for (let BStr of possibleStrs) {
                        let A = parseInt(AStr, 10);
                        let B = parseInt(BStr, 10);
                        let C = null;

                        if (op === '+') C = A + B;
                        else if (op === '-') C = A - B;
                        else if (op === 'x') C = A * B;
                        else if (op === '÷') {
                            if (B !== 0 && A % B === 0) C = A / B;
                        }

                        if (C !== null && C >= 0 && Number.isInteger(C) && C <= 999) {
                            let baseCStr = C.toString();
                            evaluateCandidate(AStr, BStr, baseCStr, C);
                        }
                    }
                }
            } else {
                for (let AStr of possibleStrs) {
                    let A = parseInt(AStr, 10);
                    let C = A;
                    let baseCStr = C.toString();
                    evaluateCandidate(AStr, null, baseCStr, C);
                }
            }

            return bestPlay;
        }

        // --- Post-Turn Analysis (Highest Score) ---
        function getHighestScorePlay(rackNumbers, rackSymbols) {
            let op = rackSymbols.length > 0 ? rackSymbols[0] : null;

            let rackCounts = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 7:0, 8:0, 69:0};
            for(let n of rackNumbers) {
                if(n == 6 || n == 9) rackCounts[69]++;
                else rackCounts[n] = (rackCounts[n] || 0) + 1;
            }

            let possibleStrs = [];
            for(let i=0; i<10; i++) possibleStrs.push(i.toString());
            for(let i=0; i<100; i++) possibleStrs.push(i.toString().padStart(2, '0'));
            for(let i=0; i<1000; i++) possibleStrs.push(i.toString().padStart(3, '0'));

            let bestPlay = null;
            let maxScore = -1;

            function evaluateCandidate(AStr, BStr, CStr, scoreBase) {
                let lLen = op ? (AStr.length + 1 + BStr.length) : AStr.length;
                let rLen = CStr.length;
                if (!((lLen <= 5 && rLen <= 3) || (rLen <= 5 && lLen <= 3))) return;

                let reqStr = AStr + (BStr || "") + CStr;
                if (reqStr.length > rackNumbers.length) return;

                let reqCounts = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 7:0, 8:0, 69:0};
                for(let char of reqStr) {
                    if (char === '6' || char === '9') reqCounts[69]++;
                    else reqCounts[char]++;
                }
                
                for(let k in reqCounts) {
                    if (reqCounts[k] > rackCounts[k]) return;
                }

                let tilesUsed = reqStr.length + (op ? 1 : 0);
                let score = scoreBase;
                if (tilesUsed === 7) score += 30;
                else if (tilesUsed === 8) score += 50;

                if (score > maxScore) {
                    maxScore = score;
                    bestPlay = {
                        equation: op ? `${AStr} ${op} ${BStr} = ${CStr}` : `${AStr} = ${CStr}`,
                        score: score,
                        tilesUsed: tilesUsed
                    };
                }
            }

            if (op) {
                for (let AStr of possibleStrs) {
                    for (let BStr of possibleStrs) {
                        let A = parseInt(AStr, 10);
                        let B = parseInt(BStr, 10);
                        let C = null;

                        if (op === '+') C = A + B;
                        else if (op === '-') C = A - B;
                        else if (op === 'x') C = A * B;
                        else if (op === '÷') {
                            if (B !== 0 && A % B === 0) C = A / B;
                        }

                        if (C !== null && C >= 0 && Number.isInteger(C) && C <= 999) {
                            let baseCStr = C.toString();
                            evaluateCandidate(AStr, BStr, baseCStr, C);
                            if (baseCStr.length <= 2) evaluateCandidate(AStr, BStr, '0' + baseCStr, C);
                            if (baseCStr.length <= 1) evaluateCandidate(AStr, BStr, '00' + baseCStr, C);
                        }
                    }
                }
            } else {
                for (let AStr of possibleStrs) {
                    let A = parseInt(AStr, 10);
                    let C = A;
                    let baseCStr = C.toString();
                    evaluateCandidate(AStr, null, baseCStr, C);
                    if (baseCStr.length <= 2) evaluateCandidate(AStr, null, '0' + baseCStr, C);
                    if (baseCStr.length <= 1) evaluateCandidate(AStr, null, '00' + baseCStr, C);
                }
            }

            return bestPlay;
        }

        function showHint() {
            const rackId = gameState.activePlayer === 'A' ? 'rack-pa' : 'rack-pb';
            const rackEl = document.getElementById(rackId);
            
            let numTiles = Array.from(rackEl.querySelectorAll('.number-slot .tile'));
            let symTiles = Array.from(rackEl.querySelectorAll('.symbol-slot .tile'));

            let rackNumbers = numTiles.map(t => t.dataset.value);
            let rackSymbols = symTiles.map(t => t.dataset.value);

            let hint = getKirableHint(rackNumbers, rackSymbols);

            if (hint) {
                let deductMsg = gameState.language === 'cn' ? "使用提示将被扣除 10 分！\n\n" : 
                                gameState.language === 'my' ? "Penggunaan petunjuk akan dipotong 10 mata!\n\n" : 
                                "WARNING: Using this hint costs 10 points for this round!\n\n";

                let bodyMsg = gameState.language === 'cn' ? `推荐算式：${hint.equation}\n分数：${hint.score} 分\n使用牌数：${hint.tilesUsed}` : 
                              gameState.language === 'my' ? `Persamaan Disyorkan: ${hint.equation}\nMata: ${hint.score}\nJubin Digunakan: ${hint.tilesUsed}` : 
                              `Easiest Play: ${hint.equation}\nScore: ${hint.score} Points\nTiles Used: ${hint.tilesUsed}`;

                alert(deductMsg + bodyMsg);

                // Apply penalty
                if (gameState.activePlayer === 'A') gameState.hintsUsedA++; else gameState.hintsUsedB++;
                updateGrandTotalUI(gameState.activePlayer);
            } else {
                let msg = gameState.language === 'cn' ? "无法用当前的牌组成有效的算式。请尝试换牌！" : 
                          gameState.language === 'my' ? "Tiada persamaan sah yang boleh dibentuk. Sila tukar jubin!" : 
                          "No valid equations can be formed with your current tiles. Try swapping!";
                alert(`💡 Hint:\n\n${msg}`);
            }
        }

        function updateGrandTotalUI(playerIdentifier) {
            const pId = playerIdentifier.toLowerCase();
            let grandTotal = 0;
            for (let i = 0; i < 10; i++) {
                const rowVal = document.getElementById(`${pId}-tot-${i}`);
                if (rowVal && rowVal.value) {
                    grandTotal += parseInt(rowVal.value);
                }
            }
            
            let penalty = (pId === 'a' ? gameState.hintsUsedA : gameState.hintsUsedB) * 10;
            let finalTotal = grandTotal - penalty;
            
            let penaltyEl = document.getElementById(`${pId}-hint-pen`);
            if (penaltyEl) {
                penaltyEl.value = penalty > 0 ? `-${penalty}` : "";
            }
            
            let grandTotEl = document.getElementById(`${pId}-grand-tot`);
            if (grandTotEl) {
                grandTotEl.value = finalTotal;
            }
        }
