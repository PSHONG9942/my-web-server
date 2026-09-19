import React from 'react';
import { BOARD_SPACES, RISK_AREAS } from '../data/boardRules';
import { useLanguage } from '../contexts/LanguageContext';

function getCellColorClass(space) {
  if (space.type === 'CORNER_RISK') return 'category-risk corner'; // .corner class applies the purple risk color in App.css
  const step = space.stepNum;
  if (step >= 1 && step <= 12) return 'category-land';
  if (step >= 13 && step <= 24) return 'category-people';
  if (step >= 25 && step <= 36) return 'category-heritage';
  if (step >= 37 && step <= 48) return 'category-culture';
  return '';
}

function getGridPosition(index) {
  if (index >= 0 && index <= 11) return { gridRow: 1, gridColumn: index + 2 };
  if (index === 12) return { gridRow: 1, gridColumn: 14 };
  if (index >= 13 && index <= 24) return { gridRow: (index - 13) + 2, gridColumn: 14 };
  if (index === 25) return { gridRow: 14, gridColumn: 14 };
  if (index >= 26 && index <= 37) return { gridRow: 14, gridColumn: 14 - (index - 25) };
  if (index === 38) return { gridRow: 14, gridColumn: 1 };
  if (index >= 39 && index <= 50) return { gridRow: 14 - (index - 38), gridColumn: 1 };
  if (index === 51) return { gridRow: 1, gridColumn: 1 };
  return {};
}

export default function Board({ players }) {
  const { t } = useLanguage();
  return (
    <div className="board">
      {BOARD_SPACES.map((space, index) => {
        const isRisk = space.type === 'STEP' && RISK_AREAS.includes(space.stepNum);
        const isCorner = space.type === 'CORNER_RISK';
        let classNames = `board-cell ${getCellColorClass(space)}`;
        if (isRisk) classNames += ' risk';

        // Find players on this space
        const playersOnStep = players.filter(p => p.positionIndex === index);

        return (
          <div key={index} className={classNames} style={getGridPosition(index)}>
            <span>{isCorner ? t('board.risk').toUpperCase() : space.stepNum}</span>
            <div className="tokens-container">
              {playersOnStep.map(p => (
                <div key={p.id} className={`token ${p.color}`} title={p.name}></div>
              ))}
            </div>
          </div>
        );
      })}
      
      {/* Central Question Packs */}
      <div className="pack-card land" style={{ gridRow: '11 / 13', gridColumn: '6 / 10' }}>{t('board.land')}</div>
      <div className="pack-card people" style={{ gridRow: '6 / 10', gridColumn: '3 / 5' }}>{t('board.people')}</div>
      <div className="pack-card heritage" style={{ gridRow: '3 / 5', gridColumn: '6 / 10' }}>{t('board.heritage')}</div>
      <div className="pack-card culture" style={{ gridRow: '6 / 10', gridColumn: '11 / 13' }}>{t('board.culture')}</div>
      <div className="pack-card risk" style={{ gridRow: '6 / 10', gridColumn: '6 / 10' }}>{t('board.risk')}</div>
    </div>
  );
}
