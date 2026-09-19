import React, { useState, useEffect } from 'react';

const EMOTES = ['🇲🇾', '🔥', '😱', '😂', '👍', '💪'];

export default function EmoteBar({ multiplayerService, localPlayer }) {
  const [activeEmotes, setActiveEmotes] = useState([]);

  useEffect(() => {
    if (!multiplayerService) return;

    const handleIncomingEmote = (msg) => {
      const id = Date.now() + Math.random();
      const newEmote = {
        id,
        emoji: msg.emoji,
        playerName: msg.playerName || `Player ${msg.playerId}`
      };

      setActiveEmotes(prev => [...prev, newEmote]);

      // Remove after 3 seconds
      setTimeout(() => {
        setActiveEmotes(prev => prev.filter(e => e.id !== id));
      }, 3000);
    };

    multiplayerService.on('emote', handleIncomingEmote);
  }, [multiplayerService]);

  const handleSendEmote = (emoji) => {
    if (!multiplayerService) return;
    multiplayerService.sendEmote(emoji);
  };

  return (
    <>
      {/* Floating Animated Emote Toasts */}
      <div className="floating-emotes-container" style={{
        position: 'fixed',
        bottom: '80px',
        right: '25px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none',
        zIndex: 9999
      }}>
        {activeEmotes.map(item => (
          <div
            key={item.id}
            className="emote-bubble"
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '8px 16px',
              color: '#fff',
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              animation: 'floatUpAndFade 3s ease-out forwards'
            }}
          >
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 'bold' }}>{item.playerName}:</span>
            <span>{item.emoji}</span>
          </div>
        ))}
      </div>

      {/* Emote Reaction Bar */}
      <div className="emote-bar glass-panel" style={{
        position: 'fixed',
        bottom: '15px',
        right: '25px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '30px',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        zIndex: 9000
      }}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', marginRight: '4px' }}>
          💬
        </span>
        {EMOTES.map(emoji => (
          <button
            key={emoji}
            onClick={() => handleSendEmote(emoji)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.3rem',
              cursor: 'pointer',
              padding: '4px 6px',
              borderRadius: '8px',
              transition: 'transform 0.15s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.3)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {emoji}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes floatUpAndFade {
          0% { opacity: 0; transform: translateY(20px) scale(0.8); }
          15% { opacity: 1; transform: translateY(0) scale(1); }
          80% { opacity: 1; transform: translateY(-20px) scale(1); }
          100% { opacity: 0; transform: translateY(-50px) scale(0.8); }
        }
      `}</style>
    </>
  );
}
