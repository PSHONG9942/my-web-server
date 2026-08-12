// tools/scrabble-network.js

let peer = null;
let hostConnection = null;
let clientConnections = [];
let isHost = false;
let myPlayerName = "Player";
let networkRoomId = "";

function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
}

function updateLobbyLog(msg) {
    const log = document.getElementById('lobby-status');
    log.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    log.scrollTop = log.scrollHeight;
}

function getGameStateForClient(playerName) {
    const safePlayers = game.players.map(p => ({
        name: p.name,
        score: p.score,
        misses: p.misses,
        active: p.active,
        online: p.online,
        rack: p.name === playerName ? p.rack.map(t => ({char: t.char, originalChar: t.originalChar, score: t.score, id: t.id})) : new Array(p.rack.length).fill({char: '?', score: 0}) 
    }));
    
    const safeBoardState = game.boardState.map(row => row.map(t => {
        if (!t || t.isHintMock) return null;
        return {char: t.char, originalChar: t.originalChar, score: t.score, id: t.id};
    }));
    
    return {
        players: safePlayers,
        currentPlayerIndex: game.currentPlayerIndex,
        boardState: safeBoardState,
        bagLength: game.bag.length,
        isFirstTurn: game.isFirstTurn,
        dictType: game.dictType
    };
}

function broadcastGameState() {
    if (!isHost) return;
    clientConnections.forEach(client => {
        if (client.conn.open) {
            client.conn.send({ type: 'SYNC_STATE', state: getGameStateForClient(client.name) });
        }
    });
}

function hostGame() {
    myPlayerName = document.getElementById('player-name-input').value || "Host";
    networkRoomId = "SCRABBLE-" + generateRoomCode();
    isHost = true;
    
    updateLobbyLog(`Initializing host...`);
    
    peer = new Peer(networkRoomId);
    
    peer.on('open', (id) => {
        updateLobbyLog(`✅ Room created! Share this code with friends: <strong>${networkRoomId.replace('SCRABBLE-', '')}</strong>`);
        document.getElementById('lobby-host-controls').style.display = 'block';
    });
    
    peer.on('connection', (conn) => {
        updateLobbyLog(`Player joining...`);
        conn.on('data', (data) => {
            if (data.type === 'JOIN') {
                if (typeof game !== 'undefined' && game) {
                    const existingPlayer = game.players.find(p => p.name === data.name);
                    if (existingPlayer) {
                        updateLobbyLog(`🔄 ${data.name} is reconnecting...`);
                        existingPlayer.online = true;
                        game.updateUI();
                        game.showMessage(`🔄 ${data.name} reconnected!`);
                        
                        let client = clientConnections.find(c => c.name === data.name);
                        if (client) { client.conn = conn; } 
                        else { clientConnections.push({ conn, name: data.name }); }
                        
                        const state = getGameStateForClient(data.name);
                        conn.send({ type: 'RECONNECT', state: state });
                        
                        clientConnections.forEach(c => {
                            if (c.conn !== conn && c.conn.open) c.conn.send({ type: 'PLAYER_ONLINE', name: data.name });
                        });
                    } else {
                        conn.send({ type: 'ERROR', message: "Game already in progress." });
                    }
                } else {
                    updateLobbyLog(`👋 ${data.name} joined the room!`);
                    clientConnections.push({ conn, name: data.name });
                }
            } else if (['ACTION_PLAY', 'ACTION_SWAP', 'ACTION_PASS'].includes(data.type)) {
                const client = clientConnections.find(c => c.conn === conn);
                if (!client) return;
                
                if (typeof game !== 'undefined' && game && game.players[game.currentPlayerIndex].name === client.name) {
                    if (data.type === 'ACTION_PASS') {
                        game.passTurn();
                    } else if (data.type === 'ACTION_SWAP') {
                        game.selectedTileIds.clear();
                        data.tileIds.forEach(id => game.selectedTileIds.add(id));
                        game.isSwapping = true;
                        game.executeSwap();
                    } else if (data.type === 'ACTION_PLAY') {
                        game.recallTiles();
                        let allSuccess = true;
                        
                        data.tiles.forEach(t => {
                            const tileIndex = game.players[game.currentPlayerIndex].rack.findIndex(r => r.id === t.id);
                            if (tileIndex === -1) allSuccess = false;
                        });
                        
                        if (allSuccess) {
                            data.tiles.forEach(t => {
                                const tileIndex = game.players[game.currentPlayerIndex].rack.findIndex(r => r.id === t.id);
                                const tile = game.players[game.currentPlayerIndex].rack[tileIndex];
                                game.players[game.currentPlayerIndex].rack.splice(tileIndex, 1);
                                
                                tile.char = t.char;
                                tile.updateElementVisuals(tile.element);
                                game.placeTileTemp(tile, t.r, t.c);
                            });
                            
                            const success = game.playTurn();
                            if (!success) {
                                game.recallTiles();
                                client.conn.send({ type: 'PLAY_REJECTED' });
                            }
                        } else {
                            client.conn.send({ type: 'PLAY_REJECTED' });
                        }
                    }
                }
            }
        });
        
        conn.on('close', () => {
            const client = clientConnections.find(c => c.conn === conn);
            if (client) {
                updateLobbyLog(`❌ ${client.name} disconnected!`);
                if (typeof game !== 'undefined' && game) {
                    const p = game.players.find(player => player.name === client.name);
                    if (p) {
                        p.online = false;
                        game.updateUI();
                        game.showMessage(`❌ ${client.name} went offline.`, true);
                        clientConnections.forEach(c => {
                            if (c.conn !== conn && c.conn.open) {
                                c.conn.send({ type: 'PLAYER_OFFLINE', name: client.name });
                            }
                        });
                    }
                }
            }
        });
    });
    
    peer.on('error', (err) => {
        updateLobbyLog(`❌ Error: ${err.type}`);
    });
}

function joinGame() {
    myPlayerName = document.getElementById('player-name-input').value || "Player";
    let code = document.getElementById('room-code-input').value.toUpperCase().trim();
    if (!code) {
        alert("Please enter a room code!");
        return;
    }
    
    networkRoomId = "SCRABBLE-" + code;
    isHost = false;
    
    updateLobbyLog(`Connecting to room ${code}...`);
    
    peer = new Peer();
    
    peer.on('open', (id) => {
        hostConnection = peer.connect(networkRoomId);
        
        hostConnection.on('open', () => {
            updateLobbyLog(`✅ Connected to Host! Waiting for game to start...`);
            hostConnection.send({ type: 'JOIN', name: myPlayerName });
        });
        
        hostConnection.on('data', (data) => {
            if (data.type === 'START') {
                updateLobbyLog(`Game starting...`);
                document.getElementById('lobby-modal').style.display = 'none';
                document.getElementById('loading-overlay').style.display = 'flex';
                game = new Game(data.players, null, data.dictType);
            } else if (data.type === 'RECONNECT' || data.type === 'SYNC_STATE') {
                if (data.type === 'RECONNECT') {
                    updateLobbyLog(`Reconnecting to game...`);
                    document.getElementById('lobby-modal').style.display = 'none';
                    document.getElementById('loading-overlay').style.display = 'flex';
                    game = new Game(data.state.players, data.state, data.state.dictType);
                } else if (typeof game !== 'undefined' && game) {
                    game.restoreState(data.state);
                }
            } else if (data.type === 'PLAY_REJECTED') {
                if (typeof game !== 'undefined' && game) {
                    game.showMessage("❌ Move rejected by host (Invalid word)", true);
                    game.recallTiles();
                }
            } else if (data.type === 'PLAYER_OFFLINE') {
                if (typeof game !== 'undefined' && game) {
                    const p = game.players.find(player => player.name === data.name);
                    if (p) {
                        p.online = false;
                        game.updateUI();
                        game.showMessage(`❌ ${data.name} went offline.`, true);
                    }
                }
            } else if (data.type === 'PLAYER_ONLINE') {
                if (typeof game !== 'undefined' && game) {
                    const p = game.players.find(player => player.name === data.name);
                    if (p) {
                        p.online = true;
                        game.updateUI();
                        game.showMessage(`🔄 ${data.name} reconnected!`);
                    }
                }
            } else if (data.type === 'ERROR') {
                alert(data.message);
            }
        });
        
        hostConnection.on('close', () => {
            updateLobbyLog(`❌ Host disconnected!`);
            if (typeof game !== 'undefined' && game) {
                game.players[0].online = false; 
                game.updateUI();
                game.showMessage("❌ Host disconnected. Game over.", true);
            }
        });
        
        hostConnection.on('error', (err) => {
            updateLobbyLog(`❌ Connection lost: ${err}`);
        });
    });
    
    peer.on('error', (err) => {
        updateLobbyLog(`❌ Error: ${err.type}`);
    });
}

function startGameNetwork() {
    if (!isHost) return;
    const dictType = document.getElementById('dict-select-multi').value;
    updateLobbyLog(`Starting match with ${clientConnections.length + 1} players using ${dictType} dictionary...`);
    
    const players = [{ name: myPlayerName }];
    clientConnections.forEach(client => {
        players.push({ name: client.name });
    });
    
    clientConnections.forEach(client => {
        client.conn.send({ type: 'START', players: players, dictType: dictType });
    });
    
    document.getElementById('lobby-modal').style.display = 'none';
    document.getElementById('loading-overlay').style.display = 'flex';
    game = new Game(players, null, dictType);
}
