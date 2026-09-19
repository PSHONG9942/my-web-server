import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const COLORS = ['green', 'red', 'yellow', 'blue'];

export default function PlayerSetup({ onBack, onComplete }) {
  const { t } = useLanguage();
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState([t('setup.playerNum', {num: 1}), t('setup.playerNum', {num: 2}), t('setup.playerNum', {num: 3}), t('setup.playerNum', {num: 4})]);

  const handleNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleProceed = () => {
    const players = [];
    for (let i = 0; i < numPlayers; i++) {
      players.push({
        id: i + 1,
        name: playerNames[i] || t('setup.playerNum', {num: i+1}),
        color: COLORS[i],
        positionIndex: 0,
        score: 0,
        lastRoll: 0,
        isDoubles: false,
        stageIncorrects: [false, false, false, false],
        rollOffScore: null // Used for tie-breaking
      });
    }
    onComplete(players);
  };

  return (
    <div className="setup-container">
      <div className="menu-glass-panel">
        <button className="back-btn" onClick={onBack}>&larr; {t('setup.back')}</button>
        <h2>{t('setup.title')}</h2>

        <div className="setup-form">
          <div className="form-group">
            <label>{t('setup.numPlayers')}</label>
            <select value={numPlayers} onChange={(e) => setNumPlayers(parseInt(e.target.value))}>
              <option value={2}>{t('setup.players', {num: 2})}</option>
              <option value={3}>{t('setup.players', {num: 3})}</option>
              <option value={4}>{t('setup.players', {num: 4})}</option>
            </select>
          </div>

          <div className="player-inputs">
            {Array.from({ length: numPlayers }).map((_, i) => (
              <div key={i} className="player-input-row">
                <div className={`token-preview ${COLORS[i]}`}></div>
                <input 
                  type="text" 
                  value={playerNames[i]} 
                  onChange={(e) => handleNameChange(i, e.target.value)} 
                  maxLength={15}
                  placeholder={t('setup.playerNum', {num: i+1})}
                />
              </div>
            ))}
          </div>

          <button className="menu-btn primary" onClick={handleProceed} style={{ marginTop: '20px' }}>
            {t('setup.start')}
          </button>
        </div>
      </div>
    </div>
  );
}
