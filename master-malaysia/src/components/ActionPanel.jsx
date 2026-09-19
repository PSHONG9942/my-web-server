import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ActionPanel({ currentPlayer, onRollDice, gameState, onQuit }) {
  const { t } = useLanguage();
  return (
    <div className="glass-panel action-panel">
      <h2>{t('action.title')}</h2>
      
      <div className={`turn-indicator ${currentPlayer.color}`}>
        {t('action.currentTurn')}: {currentPlayer.name}
      </div>

      <div className="dice-container">
        <button 
          className="dice-btn"
          onClick={onRollDice}
          disabled={gameState !== 'ROLL_DICE'}
        >
          {t('action.rollDice')}
        </button>
        {gameState !== 'ROLL_DICE' && <span>{t('action.rolled', {roll: currentPlayer.lastRoll})}</span>}
      </div>

      <button 
        className="menu-btn secondary small" 
        style={{ marginTop: 'auto', alignSelf: 'center', borderColor: '#ef4444', color: '#ef4444' }}
        onClick={onQuit}
      >
        {t('action.quitGame')}
      </button>
    </div>
  );
}
