import { Peer } from 'peerjs';

const PEER_PREFIX = 'mm26-'; // unique prefix for Master Malaysia 2026

export function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // exclude ambiguous chars like I, 1, O, 0
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export class MultiplayerService {
  constructor() {
    this.peer = null;
    this.connections = []; // For host: array of guest conns. For guest: [hostConn]
    this.isHost = false;
    this.roomCode = null;
    this.localPlayer = null;
    this.callbacks = {};
  }

  on(event, callback) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }

  emit(event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(cb => cb(data));
    }
  }

  createRoom(roomCode, hostPlayer) {
    return new Promise((resolve, reject) => {
      this.isHost = true;
      this.roomCode = roomCode.toUpperCase();
      this.localPlayer = { ...hostPlayer, id: 1, isHost: true };
      
      const peerId = `${PEER_PREFIX}${this.roomCode.toLowerCase()}`;
      
      try {
        this.peer = new Peer(peerId, {
          debug: 1,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' }
            ]
          }
        });

        this.peer.on('open', (id) => {
          this.emit('ready', { roomCode: this.roomCode, peerId: id });
          resolve({ roomCode: this.roomCode, player: this.localPlayer });
        });

        this.peer.on('connection', (conn) => {
          this._handleIncomingConnection(conn);
        });

        this.peer.on('error', (err) => {
          console.error('[Multiplayer Host Error]', err);
          if (err.type === 'unavailable-id') {
            this.emit('error', { message: 'Room code already in use. Please try generating another code.' });
          } else {
            this.emit('error', { message: err.message || 'Connection error' });
          }
          reject(err);
        });

      } catch (err) {
        reject(err);
      }
    });
  }

  _handleIncomingConnection(conn) {
    conn.on('open', () => {
      // Wait for guest's JOIN_REQUEST
      conn.on('data', (msg) => {
        this._handleHostMessage(conn, msg);
      });
    });

    conn.on('close', () => {
      const remainingConns = this.connections.filter(c => c !== conn);
      this.connections = remainingConns;
      this.emit('player_left', { connId: conn.peer });
    });

    conn.on('error', (err) => {
      console.warn('[Host Conn Error]', err);
    });
  }

  _handleHostMessage(conn, msg) {
    if (!msg || !msg.type) return;

    switch (msg.type) {
      case 'JOIN_REQUEST': {
        this.connections.push(conn);
        conn.metadata = { player: msg.player };
        this.emit('guest_join_request', { conn, player: msg.player });
        break;
      }
      case 'CLIENT_ACTION': {
        // Forward client game action
        this.emit('client_action', msg);
        break;
      }
      case 'EMOTE': {
        // Broadcast emote to all clients and self
        this.broadcast(msg);
        this.emit('emote', msg);
        break;
      }
      default:
        this.emit('message', msg);
    }
  }

  joinRoom(roomCode, guestPlayer) {
    return new Promise((resolve, reject) => {
      this.isHost = false;
      this.roomCode = roomCode.toUpperCase();
      this.localPlayer = { ...guestPlayer, isHost: false };
      
      const hostPeerId = `${PEER_PREFIX}${this.roomCode.toLowerCase()}`;

      try {
        this.peer = new Peer({
          debug: 1,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' }
            ]
          }
        });

        this.peer.on('open', () => {
          const conn = this.peer.connect(hostPeerId, {
            reliable: true
          });

          let connectionTimeout = setTimeout(() => {
            conn.close();
            const err = new Error('Connection timed out. Check room code.');
            this.emit('error', { message: 'Room not found or host unreachable. Check room code.' });
            reject(err);
          }, 10000);

          conn.on('open', () => {
            clearTimeout(connectionTimeout);
            this.connections = [conn];

            // Send JOIN_REQUEST
            conn.send({
              type: 'JOIN_REQUEST',
              player: this.localPlayer
            });

            conn.on('data', (msg) => {
              this._handleGuestMessage(msg, resolve, reject);
            });
          });

          conn.on('close', () => {
            this.emit('disconnected', { message: 'Disconnected from host.' });
          });

          conn.on('error', (err) => {
            clearTimeout(connectionTimeout);
            this.emit('error', { message: 'Connection error with host.' });
            reject(err);
          });
        });

        this.peer.on('error', (err) => {
          console.error('[Multiplayer Guest Error]', err);
          this.emit('error', { message: 'Unable to connect to matchmaking service.' });
          reject(err);
        });

      } catch (err) {
        reject(err);
      }
    });
  }

  _handleGuestMessage(msg, resolveJoin, rejectJoin) {
    if (!msg || !msg.type) return;

    switch (msg.type) {
      case 'JOIN_ACCEPTED': {
        this.localPlayer.id = msg.assignedId;
        this.emit('join_accepted', msg);
        if (resolveJoin) resolveJoin(msg);
        break;
      }
      case 'JOIN_REJECTED': {
        this.emit('join_rejected', msg);
        if (rejectJoin) rejectJoin(new Error(msg.reason || 'Join rejected'));
        break;
      }
      case 'LOBBY_UPDATE': {
        this.emit('lobby_update', msg);
        break;
      }
      case 'START_GAME': {
        this.emit('start_game', msg);
        break;
      }
      case 'GAME_ACTION': {
        this.emit('game_action', msg);
        break;
      }
      case 'EMOTE': {
        this.emit('emote', msg);
        break;
      }
      default:
        this.emit('message', msg);
    }
  }

  // Broadcast message to all connected peers (Host to guests)
  broadcast(msg) {
    if (this.isHost) {
      this.connections.forEach(conn => {
        if (conn && conn.open) {
          try {
            conn.send(msg);
          } catch (e) {
            console.warn('[Broadcast send failed]', e);
          }
        }
      });
    } else {
      // Guest sends to host
      if (this.connections[0] && this.connections[0].open) {
        this.connections[0].send(msg);
      }
    }
  }

  sendToHost(msg) {
    if (this.connections[0] && this.connections[0].open) {
      this.connections[0].send(msg);
    }
  }

  sendToClient(conn, msg) {
    if (conn && conn.open) {
      conn.send(msg);
    }
  }

  sendEmote(emoji) {
    const msg = {
      type: 'EMOTE',
      playerId: this.localPlayer?.id,
      playerName: this.localPlayer?.name,
      emoji: emoji
    };
    this.broadcast(msg);
    this.emit('emote', msg); // Local echo
  }

  destroy() {
    this.connections.forEach(conn => {
      try { conn.close(); } catch(e) {}
    });
    this.connections = [];
    if (this.peer) {
      try { this.peer.destroy(); } catch(e) {}
      this.peer = null;
    }
    this.callbacks = {};
  }
}
