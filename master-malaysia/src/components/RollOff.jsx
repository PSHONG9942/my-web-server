import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function RollOff({ players, onStartGame, onBack }) {
  const { t } = useLanguage();
  const [currentPlayers, setCurrentPlayers] = useState(players);
  const [rollingPlayerId, setRollingPlayerId] = useState(null);
  const [isTieBreaker, setIsTieBreaker] = useState(false);

  const allRolled = currentPlayers.every(p => p.rollOffScore !== null);

  const handleRoll = (playerId) => {
    setRollingPlayerId(playerId);
    
    setTimeout(() => {
      const roll1 = Math.floor(Math.random() * 6) + 1;
      const roll2 = Math.floor(Math.random() * 6) + 1;
      const total = roll1 + roll2;

      setCurrentPlayers(prev => prev.map(p => 
        p.id === playerId ? { ...p, rollOffScore: total } : p
      ));
      setRollingPlayerId(null);
    }, 1000);
  };

  const handleDetermineOrder = () => {
    const highestScore = Math.max(...currentPlayers.map(p => p.rollOffScore));
    const tiedPlayers = currentPlayers.filter(p => p.rollOffScore === highestScore);

    if (tiedPlayers.length > 1) {
      setIsTieBreaker(true);
      setCurrentPlayers(prev => prev.map(p => {
        if (tiedPlayers.find(tp => tp.id === p.id)) {
          return { ...p, rollOffScore: null };
        } else {
          return p;
        }
      }));
    } else {
      const winner = tiedPlayers[0];
      const winnerIndex = currentPlayers.findIndex(p => p.id === winner.id);
      const reorderedPlayers = [
        ...currentPlayers.slice(winnerIndex),
        ...currentPlayers.slice(0, winnerIndex)
      ].map(p => {
        const { rollOffScore, ...rest } = p;
        return rest;
      });

      onStartGame(reorderedPlayers);
    }
  };

  return (
    <div className="setup-container">
      <div className="menu-glass-panel">
        <button className="back-btn" onClick={onBack}>&larr; {t('rolloff.back')}</button>
        <h2>{t('rolloff.title')}</h2>
        {isTieBreaker && <p style={{ color: '#ef4444', fontWeight: 'bold' }}>{t('rolloff.tie')}</p>}
        
        <div className="roll-off-list">
          {currentPlayers.map(p => {
            const needsToRoll = p.rollOffScore === null;
            const isRolling = rollingPlayerId === p.id;

            return (
              <div key={p.id} className={`roll-off-row ${!needsToRoll && p.rollOffScore > 0 ? 'rolled' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className={`token-preview ${p.color}`}></div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{p.name}</span>
                </div>
                
                <div className="roll-action">
                  {isRolling ? (
                    <span style={{ animation: 'bounce 0.5s infinite' }}>🎲 {t('rolloff.rolling')}</span>
                  ) : needsToRoll ? (
                    <button className="menu-btn small" onClick={() => handleRoll(p.id)} disabled={rollingPlayerId !== null}>
                      {t('rolloff.roll')}
                    </button>
                  ) : p.rollOffScore > 0 ? (
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>🎲 {p.rollOffScore}</span>
                  ) : (
                    <span style={{ color: '#94a3b8' }}>{t('rolloff.waiting')}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {allRolled && (
          <button className="menu-btn primary" onClick={handleDetermineOrder} style={{ marginTop: '30px' }}>
            {t('rolloff.determine')}
          </button>
        )}
      </div>
    </div>
  );
}
