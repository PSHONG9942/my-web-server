import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const EMOTES = ['🇲🇾', '🔥', '😱', '😂', '👍', '💪'];

export default function EmoteBar({ multiplayerService, localPlayer }) {
  const { t } = useLanguage();
  const [activeEmotes, setActiveEmotes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

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
        bottom: '70px',
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
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
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

      {/* Collapsible Emote Reaction Bar */}
      <div className="emote-wrapper" style={{
        position: 'fixed',
        bottom: '15px',
        right: '25px',
        zIndex: 9000
      }}>
        {!isExpanded ? (
          <button
            className="emote-toggle-btn glass-panel"
            onClick={() => setIsExpanded(true)}
            title={t('emotes.toggle')}
            aria-label={t('emotes.toggle')}
          >
            <span style={{ fontSize: '1.2rem' }}>💬</span>
            <span className="emote-toggle-label">{t('emotes.toggle')}</span>
          </button>
        ) : (
          <div className="emote-bar glass-panel emote-expanded">
            <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'bold', marginRight: '4px' }}>
              💬
            </span>
            <div className="emote-buttons-grid">
              {EMOTES.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleSendEmote(emoji)}
                  className="emote-btn"
                  title={emoji}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <button
              className="emote-collapse-btn"
              onClick={() => setIsExpanded(false)}
              title={t('emotes.collapse')}
              aria-label={t('emotes.collapse')}
            >
              ✕
            </button>
          </div>
        )}
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
