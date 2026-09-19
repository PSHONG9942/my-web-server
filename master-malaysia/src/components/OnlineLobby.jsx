import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { generateRoomCode } from '../services/multiplayer';

const COLORS = ['green', 'red', 'yellow', 'blue'];

export default function OnlineLobby({
  onBack,
  multiplayerService,
  onStartOnlineGame,
  initialRoomCode = ''
}) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(initialRoomCode ? 'JOIN' : 'CREATE');
  
  // Create Room State
  const [hostName, setHostName] = useState('Host Player');
  const [hostColor, setHostColor] = useState('green');
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const [createdRoomCode, setCreatedRoomCode] = useState('');
  const [lobbyPlayers, setLobbyPlayers] = useState([]);
  const [copied, setCopied] = useState(false);
  
  // Join Room State
  const [joinCode, setJoinCode] = useState(initialRoomCode);
  const [guestName, setGuestName] = useState('Challenger');
  const [guestColor, setGuestColor] = useState('red');
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle URL pre-fill
  useEffect(() => {
    if (initialRoomCode) {
      setJoinCode(initialRoomCode.toUpperCase());
      setActiveTab('JOIN');
    }
  }, [initialRoomCode]);

  // Set up host event listeners
  useEffect(() => {
    if (!multiplayerService) return;

    multiplayerService.on('guest_join_request', ({ conn, player }) => {
      setLobbyPlayers(prev => {
        // Prevent duplicate joins or room full
        if (prev.length >= 4) {
          conn.send({ type: 'JOIN_REJECTED', reason: 'Room is full (max 4 players).' });
          return prev;
        }

        // Available colors
        const takenColors = prev.map(p => p.color);
        let assignedColor = player.color;
        if (takenColors.includes(assignedColor)) {
          assignedColor = COLORS.find(c => !takenColors.includes(c)) || 'blue';
        }

        const newPlayer = {
          id: prev.length + 1,
          name: player.name || `Player ${prev.length + 1}`,
          color: assignedColor,
          isHost: false,
          positionIndex: 0,
          score: 0,
          lastRoll: 0,
          isDoubles: false,
          stageIncorrects: [false, false, false, false]
        };

        const updated = [...prev, newPlayer];

        // Notify joined guest
        conn.send({
          type: 'JOIN_ACCEPTED',
          assignedId: newPlayer.id,
          assignedPlayer: newPlayer,
          players: updated
        });

        // Broadcast updated lobby to all guests
        setTimeout(() => {
          multiplayerService.broadcast({
            type: 'LOBBY_UPDATE',
            players: updated
          });
        }, 100);

        return updated;
      });
    });

    multiplayerService.on('player_left', () => {
      // Refresh lobby list if a guest disconnects before start
      setLobbyPlayers(prev => {
        const remaining = prev.filter((_, idx) => idx === 0); // Keep host for now
        multiplayerService.broadcast({
          type: 'LOBBY_UPDATE',
          players: remaining
        });
        return remaining;
      });
    });

    multiplayerService.on('lobby_update', ({ players }) => {
      setLobbyPlayers(players);
    });

    multiplayerService.on('start_game', (payload) => {
      onStartOnlineGame(payload.players, false);
    });

    multiplayerService.on('error', (err) => {
      setErrorMessage(err.message || 'Connection error');
      setIsJoining(false);
    });

  }, [multiplayerService, onStartOnlineGame]);

  // Host creates room
  const handleCreateRoom = async () => {
    setErrorMessage('');
    const code = generateRoomCode();
    setCreatedRoomCode(code);

    const initialHostPlayer = {
      id: 1,
      name: hostName || 'Host Player',
      color: hostColor,
      isHost: true,
      positionIndex: 0,
      score: 0,
      lastRoll: 0,
      isDoubles: false,
      stageIncorrects: [false, false, false, false]
    };

    try {
      await multiplayerService.createRoom(code, initialHostPlayer);
      setLobbyPlayers([initialHostPlayer]);
      setIsRoomCreated(true);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create room.');
    }
  };

  // Host starts game
  const handleHostStartGame = () => {
    if (lobbyPlayers.length < 2) return;

    multiplayerService.broadcast({
      type: 'START_GAME',
      players: lobbyPlayers
    });

    onStartOnlineGame(lobbyPlayers, true);
  };

  // Guest joins room
  const handleJoinRoom = async () => {
    if (!joinCode || joinCode.trim().length < 4) {
      setErrorMessage(t('lobby.invalidCode') || 'Please enter a valid 4-character room code.');
      return;
    }
    setErrorMessage('');
    setIsJoining(true);

    const guestPlayer = {
      name: guestName || 'Challenger',
      color: guestColor
    };

    try {
      await multiplayerService.joinRoom(joinCode.trim().toUpperCase(), guestPlayer);
      setIsJoined(true);
      setIsJoining(false);
    } catch (err) {
      setIsJoining(false);
      setErrorMessage(err.message || 'Failed to join room.');
    }
  };

  // Copy shareable link
  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?room=${createdRoomCode}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="setup-container online-lobby-container">
      <div className="menu-glass-panel lobby-panel" style={{ maxWidth: '580px', width: '92%' }}>
        <button className="back-btn" onClick={onBack}>&larr; {t('lobby.back')}</button>
        <h2 style={{ marginBottom: '10px' }}>{t('lobby.title')}</h2>
        <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '0.95rem' }}>
          ⚡ Real-time multiplayer over WebRTC. Share your room code to battle friends!
        </p>

        {errorMessage && (
          <div className="lobby-error-banner" style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#b91c1c',
            padding: '10px 14px',
            borderRadius: '8px',
            marginBottom: '15px',
            fontSize: '0.95rem'
          }}>
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Top Tabs (if not yet in a room) */}
        {!isRoomCreated && !isJoined && (
          <div className="lobby-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              className={`menu-btn ${activeTab === 'CREATE' ? 'primary' : 'secondary'}`}
              style={{ flex: 1, padding: '10px 15px', fontSize: '1rem' }}
              onClick={() => { setActiveTab('CREATE'); setErrorMessage(''); }}
            >
              👑 {t('lobby.createTab')}
            </button>
            <button
              className={`menu-btn ${activeTab === 'JOIN' ? 'primary' : 'secondary'}`}
              style={{ flex: 1, padding: '10px 15px', fontSize: '1rem' }}
              onClick={() => { setActiveTab('JOIN'); setErrorMessage(''); }}
            >
              🚀 {t('lobby.joinTab')}
            </button>
          </div>
        )}

        {/* TAB 1: CREATE ROOM */}
        {activeTab === 'CREATE' && (
          <div>
            {!isRoomCreated ? (
              <div className="setup-form">
                <div className="form-group">
                  <label>{t('lobby.yourName')}</label>
                  <input
                    type="text"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    maxLength={15}
                    placeholder="Host Player"
                  />
                </div>

                <div className="form-group">
                  <label>{t('lobby.chooseColor')}</label>
                  <div className="color-selector" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
                    {COLORS.map(c => (
                      <div
                        key={c}
                        onClick={() => setHostColor(c)}
                        className={`token-preview ${c}`}
                        style={{
                          cursor: 'pointer',
                          transform: hostColor === c ? 'scale(1.25)' : 'scale(1)',
                          boxShadow: hostColor === c ? '0 0 12px rgba(0,0,0,0.4)' : 'none',
                          border: hostColor === c ? '3px solid #0f172a' : '2px solid transparent',
                          transition: 'all 0.2s'
                        }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  className="menu-btn primary"
                  onClick={handleCreateRoom}
                  style={{ marginTop: '20px', width: '100%' }}
                >
                  {t('lobby.createRoomBtn')}
                </button>
              </div>
            ) : (
              /* Room Created - Lobby Waiting Area */
              <div className="room-created-view" style={{ textAlign: 'center' }}>
                <div className="room-code-badge" style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  color: '#f8fafc',
                  padding: '20px',
                  borderRadius: '16px',
                  marginBottom: '20px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    {t('lobby.roomCode')}
                  </div>
                  <div style={{ fontSize: '3.2rem', fontWeight: '900', letterSpacing: '6px', color: '#38bdf8', margin: '8px 0' }}>
                    {createdRoomCode}
                  </div>
                  <button
                    className="menu-btn secondary small"
                    onClick={handleCopyLink}
                    style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff', fontSize: '0.9rem' }}
                  >
                    {copied ? `✅ ${t('lobby.linkCopied')}` : `📋 ${t('lobby.copyLink')}`}
                  </button>
                </div>

                {/* Player Slots */}
                <h4 style={{ margin: '15px 0 10px', color: '#334155' }}>
                  {t('lobby.playersInRoom', { count: lobbyPlayers.length })}
                </h4>
                <div className="lobby-players-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {lobbyPlayers.map((p, idx) => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 16px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.08)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className={`token-preview ${p.color}`} />
                        <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{p.name}</span>
                      </div>
                      <span style={{
                        fontSize: '0.8rem',
                        background: idx === 0 ? '#3b82f6' : '#10b981',
                        color: '#fff',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontWeight: 'bold'
                      }}>
                        {idx === 0 ? t('lobby.hostBadge') : `P${p.id}`}
                      </span>
                    </div>
                  ))}
                  {Array.from({ length: 4 - lobbyPlayers.length }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      style={{
                        padding: '10px 16px',
                        background: 'rgba(0, 0, 0, 0.03)',
                        borderRadius: '10px',
                        border: '1px dashed #cbd5e1',
                        color: '#94a3b8',
                        fontStyle: 'italic',
                        fontSize: '0.9rem'
                      }}
                    >
                      Slot {lobbyPlayers.length + i + 1}: {t('lobby.waitingMin')}
                    </div>
                  ))}
                </div>

                <button
                  className="menu-btn primary"
                  disabled={lobbyPlayers.length < 2}
                  onClick={handleHostStartGame}
                  style={{
                    width: '100%',
                    opacity: lobbyPlayers.length < 2 ? 0.6 : 1,
                    cursor: lobbyPlayers.length < 2 ? 'not-allowed' : 'pointer'
                  }}
                >
                  🚀 {t('lobby.startGame')} ({lobbyPlayers.length}/4)
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: JOIN ROOM */}
        {activeTab === 'JOIN' && (
          <div>
            {!isJoined ? (
              <div className="setup-form">
                <div className="form-group">
                  <label>{t('lobby.enterCode')}</label>
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    maxLength={4}
                    placeholder="e.g. A8K2"
                    style={{ fontSize: '1.5rem', letterSpacing: '4px', textAlign: 'center', textTransform: 'uppercase' }}
                  />
                </div>

                <div className="form-group">
                  <label>{t('lobby.yourName')}</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    maxLength={15}
                    placeholder="Challenger"
                  />
                </div>

                <div className="form-group">
                  <label>{t('lobby.chooseColor')}</label>
                  <div className="color-selector" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
                    {COLORS.map(c => (
                      <div
                        key={c}
                        onClick={() => setGuestColor(c)}
                        className={`token-preview ${c}`}
                        style={{
                          cursor: 'pointer',
                          transform: guestColor === c ? 'scale(1.25)' : 'scale(1)',
                          boxShadow: guestColor === c ? '0 0 12px rgba(0,0,0,0.4)' : 'none',
                          border: guestColor === c ? '3px solid #0f172a' : '2px solid transparent',
                          transition: 'all 0.2s'
                        }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  className="menu-btn primary"
                  disabled={isJoining || joinCode.length < 4}
                  onClick={handleJoinRoom}
                  style={{ marginTop: '20px', width: '100%' }}
                >
                  {isJoining ? `⏳ ${t('lobby.connecting')}` : `🔗 ${t('lobby.joinRoomBtn')}`}
                </button>
              </div>
            ) : (
              /* Joined - Guest Waiting View */
              <div className="joined-waiting-view" style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '15px', animation: 'bounce 1.5s infinite' }}>
                  ⏳
                </div>
                <h3 style={{ color: '#0f172a', marginBottom: '8px' }}>
                  {t('lobby.connectedWaiting')}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '20px' }}>
                  Room Code: <strong style={{ color: '#0284c7' }}>{joinCode}</strong>
                </p>

                <h4 style={{ margin: '15px 0 10px', color: '#334155' }}>
                  {t('lobby.playersInRoom', { count: lobbyPlayers.length })}
                </h4>
                <div className="lobby-players-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {lobbyPlayers.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 16px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.08)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className={`token-preview ${p.color}`} />
                        <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{p.name}</span>
                      </div>
                      <span style={{
                        fontSize: '0.8rem',
                        background: p.isHost ? '#3b82f6' : '#10b981',
                        color: '#fff',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontWeight: 'bold'
                      }}>
                        {p.isHost ? t('lobby.hostBadge') : `P${p.id}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
