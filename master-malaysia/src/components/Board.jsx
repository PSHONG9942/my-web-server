import React, { useState } from 'react';
import { BOARD_SPACES, RISK_AREAS, STEP_RULES } from '../data/boardRules';
import { useLanguage } from '../contexts/LanguageContext';

function getCellColorClass(space) {
  if (space.type === 'CORNER_RISK') return 'category-risk corner';
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

function getTooltipPositionStyle(index) {
  if (index >= 0 && index <= 11) {
    // Top row -> drops down into board
    return {
      top: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
    };
  }
  if (index === 12) {
    // Top-right corner -> down & left
    return {
      top: 'calc(100% + 8px)',
      right: '0px',
    };
  }
  if (index >= 13 && index <= 24) {
    // Right column -> points left into board
    return {
      right: 'calc(100% + 8px)',
      top: '50%',
      transform: 'translateY(-50%)',
    };
  }
  if (index === 25) {
    // Bottom-right corner -> up & left
    return {
      bottom: 'calc(100% + 8px)',
      right: '0px',
    };
  }
  if (index >= 26 && index <= 37) {
    // Bottom row -> points up into board
    return {
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
    };
  }
  if (index === 38) {
    // Bottom-left corner -> up & right
    return {
      bottom: 'calc(100% + 8px)',
      left: '0px',
    };
  }
  if (index >= 39 && index <= 50) {
    // Left column -> points right into board
    return {
      left: 'calc(100% + 8px)',
      top: '50%',
      transform: 'translateY(-50%)',
    };
  }
  if (index === 51) {
    // Top-left corner -> down & right
    return {
      top: 'calc(100% + 8px)',
      left: '0px',
    };
  }
  return {};
}

function getStepInfo(space, t) {
  if (space.type === 'CORNER_RISK') {
    const cornerNum = space.cornerIndex + 1;
    const risk = space.risk;
    return {
      title: t('tooltip.corner', { corner: cornerNum }),
      categoryName: t('board.risk'),
      categoryColor: 'var(--risk-purple)',
      isRisk: true,
      evenOddText: null,
      evenOddPts: 0,
      ruleText: t('tooltip.rule.cornerRisk', { pts: risk }),
      isBonusPositive: true,
      bonusPts: risk,
      maxPotential: 12 + risk
    };
  }

  const step = space.stepNum;
  const isRisk = RISK_AREAS.includes(step);
  let categoryName = t('board.general');
  let categoryColor = 'var(--risk-purple)';
  if (step >= 1 && step <= 12) {
    categoryName = t('board.land');
    categoryColor = 'var(--land-green)';
  } else if (step >= 13 && step <= 24) {
    categoryName = t('board.people');
    categoryColor = 'var(--people-red)';
  } else if (step >= 25 && step <= 36) {
    categoryName = t('board.heritage');
    categoryColor = 'var(--heritage-yellow)';
  } else if (step >= 37 && step <= 48) {
    categoryName = t('board.culture');
    categoryColor = 'var(--culture-blue)';
  }

  const isEven = step % 2 === 0;
  const evenOddPts = isEven ? 10 : 20;
  const parityText = isEven ? t('tooltip.even') : t('tooltip.odd');
  const evenOddText = t('tooltip.evenOddBonus', { parity: parityText, pts: evenOddPts });

  const rule = STEP_RULES[step];
  let ruleText = t('tooltip.rule.noRule');
  let bonusPts = 0;
  let isBonusPositive = true;

  if (rule) {
    switch (rule.type) {
      case 'CORRECT':
        ruleText = t('tooltip.rule.stepBonus', { pts: rule.y });
        bonusPts = rule.y;
        break;
      case 'DICE_SCORE_EQ_CORRECT':
        ruleText = t('tooltip.rule.exactDice', { pts: rule.y, x: rule.x });
        bonusPts = rule.y;
        break;
      case 'DICE_SCORE_GT':
        if (rule.y > 0) {
          ruleText = t('tooltip.rule.highDiceBonus', { pts: rule.y, x: rule.x });
          bonusPts = rule.y;
        } else {
          ruleText = t('tooltip.rule.highDicePenalty', { pts: rule.y, x: rule.x });
          isBonusPositive = false;
        }
        break;
      case 'DICE_SCORE_LT':
        if (rule.y > 0) {
          ruleText = t('tooltip.rule.lowDiceBonus', { pts: rule.y, x: rule.x });
          bonusPts = rule.y;
        } else {
          ruleText = t('tooltip.rule.lowDicePenalty', { pts: rule.y, x: rule.x });
          isBonusPositive = false;
        }
        break;
      case 'DOUBLES':
        if (rule.y > 0) {
          ruleText = t('tooltip.rule.doublesBonus', { pts: rule.y });
          bonusPts = rule.y;
        } else {
          ruleText = t('tooltip.rule.doublesPenalty', { pts: rule.y });
          isBonusPositive = false;
        }
        break;
      case 'SCORE_GT':
        ruleText = t('tooltip.rule.scoreGt', { pts: rule.y, z: rule.z });
        bonusPts = rule.y;
        break;
      case 'ALL_CORRECT':
        ruleText = t('tooltip.rule.allCorrect', { pts: rule.y, stage: rule.stage });
        bonusPts = rule.y;
        break;
      case 'RISK':
        ruleText = t('tooltip.rule.riskBonus', { pts: rule.y });
        bonusPts = rule.y;
        break;
      case 'INCORRECT':
        ruleText = t('tooltip.rule.incorrectPenalty', { pts: rule.y });
        isBonusPositive = false;
        break;
      default:
        break;
    }
  }

  const maxPotential = 12 + evenOddPts + bonusPts;

  return {
    title: t('tooltip.step', { step }),
    categoryName: isRisk ? `${categoryName} (${t('board.risk')})` : categoryName,
    categoryColor: isRisk ? 'var(--risk-purple)' : categoryColor,
    isRisk,
    evenOddText,
    evenOddPts,
    ruleText,
    isBonusPositive,
    bonusPts,
    maxPotential
  };
}

export default function Board({ players }) {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="board">
      {BOARD_SPACES.map((space, index) => {
        const isRisk = space.type === 'STEP' && RISK_AREAS.includes(space.stepNum);
        const isCorner = space.type === 'CORNER_RISK';
        let classNames = `board-cell ${getCellColorClass(space)}`;
        if (isRisk) classNames += ' risk';

        // Find players on this space
        const playersOnStep = players.filter(p => p.positionIndex === index);
        const isHovered = hoveredIndex === index;
        const tooltipInfo = isHovered ? getStepInfo(space, t) : null;

        return (
          <div
            key={index}
            className={classNames}
            style={getGridPosition(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span>{isCorner ? t('board.risk').toUpperCase() : space.stepNum}</span>
            <div className="tokens-container">
              {playersOnStep.map(p => (
                <div key={p.id} className={`token ${p.color}`} title={p.name}></div>
              ))}
            </div>

            {/* Hover Tooltip showing conditional & bonus points */}
            {isHovered && tooltipInfo && (
              <div
                className="step-tooltip"
                style={getTooltipPositionStyle(index)}
              >
                <div className="step-tooltip-inner">
                  <div className="step-tooltip-header">
                    <span className="step-tooltip-title">{tooltipInfo.title}</span>
                    <span
                      className="step-tooltip-badge"
                      style={{ background: tooltipInfo.categoryColor }}
                    >
                      {tooltipInfo.categoryName}
                    </span>
                  </div>

                  <div className="step-tooltip-body">
                    <div className="step-tooltip-row">
                      <span className="tooltip-label">🎲 {t('tooltip.diceRoll')}:</span>
                      <span className="tooltip-val">+1 ~ 12 {t('tooltip.pts')}</span>
                    </div>

                    {tooltipInfo.evenOddText && (
                      <div className="step-tooltip-row">
                        <span className="tooltip-label">⚡ {tooltipInfo.evenOddText}:</span>
                        <span className="tooltip-val bonus">+{tooltipInfo.evenOddPts} {t('tooltip.pts')}</span>
                      </div>
                    )}

                    <div className="step-tooltip-rule">
                      {tooltipInfo.ruleText}
                    </div>

                    <div className="step-tooltip-potential">
                      <span>{t('tooltip.potential')}:</span>
                      <span className="tooltip-potential-pts">+{tooltipInfo.maxPotential} {t('tooltip.pts')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
