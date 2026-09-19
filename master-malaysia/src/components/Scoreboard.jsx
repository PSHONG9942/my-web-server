import React from 'react';
import { BOARD_SPACES } from '../data/boardRules';
import { useLanguage } from '../contexts/LanguageContext';

export default function Scoreboard({ players, turnIndex }) {
  const { t } = useLanguage();
  return (
    <div className="glass-panel scoreboard">
      <h2>{t('score.title')}</h2>
      <table>
        <thead>
          <tr>
            <th>{t('score.player')}</th>
            <th>{t('score.location')}</th>
            <th>{t('score.score')}</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, idx) => {
            const space = BOARD_SPACES[p.positionIndex];
            const locationDisplay = space.type === 'CORNER_RISK' ? t('board.risk').toUpperCase() : `${t('board.step')} ${space.stepNum}`;
            return (
            <tr key={p.id} className={idx === turnIndex ? 'active-player-row' : ''}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <div className={`token ${p.color}`}></div>
                  {p.name}
                </div>
              </td>
              <td>{locationDisplay}</td>
              <td style={{ fontWeight: 'bold' }}>{p.score}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
