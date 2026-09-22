import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function QuestionModal({ currentQuestion, gameState, onAnswer, onRiskChoice, lastAnswerResult, scoreBreakdown, currentPlayer, isOnline = false, localPlayerId = 1 }) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const isMyTurn = !isOnline || (currentPlayer && currentPlayer.id === localPlayerId);

  const isTrueFalse = Boolean(
    (currentQuestion?.options && currentQuestion.options.length === 2) ||
    (currentQuestion?.answer && (
      currentQuestion.answer.toString().trim().toUpperCase().startsWith('TRUE') ||
      currentQuestion.answer.toString().trim().toUpperCase().startsWith('FALSE') ||
      currentQuestion.answer.toString().trim().toUpperCase().startsWith('BENAR') ||
      currentQuestion.answer.toString().trim().toUpperCase().startsWith('PALSU') ||
      currentQuestion.answer.toString().trim().startsWith('正确') ||
      currentQuestion.answer.toString().trim().startsWith('错误')
    ))
  );

  useEffect(() => {
    let timer;
    if (gameState === 'ANSWERING' && !isAnswerRevealed && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (gameState === 'ANSWERING' && timeLeft === 0 && !isAnswerRevealed) {
      // In online mode, only the active player submits timeout
      if (isMyTurn) {
        if (currentQuestion?.options?.length === 4 || isTrueFalse) {
          onAnswer(false); // Time out counts as wrong answer for MCQ and True/False
        } else {
          setIsAnswerRevealed(true);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState, isAnswerRevealed, currentQuestion, onAnswer, isMyTurn, isTrueFalse]);

  const handleSelectOption = (option) => {
    if (isTrueFalse) {
      const optNorm = option.toString().trim().toUpperCase();
      const isSelectedTrue = 
        optNorm === 'TRUE' || 
        optNorm === 'BENAR' || 
        optNorm === 'BETUL' || 
        option.toString().trim() === '正确';

      const ansNorm = currentQuestion.answer ? currentQuestion.answer.toString().trim().toUpperCase() : '';
      const isAnswerTrue = 
        ansNorm.startsWith('TRUE') || 
        ansNorm.startsWith('BENAR') || 
        ansNorm.startsWith('BETUL') || 
        (currentQuestion.answer && currentQuestion.answer.toString().trim().startsWith('正确'));

      const isCorrect = (isSelectedTrue === isAnswerTrue);
      onAnswer(isCorrect);
    } else {
      onAnswer(option === currentQuestion.answer);
    }
  };

  useEffect(() => {
    if (gameState === 'DRAW_CARD') {
      setTimeLeft(15);
      setIsAnswerRevealed(false);
    }
  }, [gameState]);

  if (gameState !== 'ANSWERING' && gameState !== 'TURN_END' && gameState !== 'DRAW_CARD' && gameState !== 'RISK_PROMPT' && gameState !== 'DICE_ROLLING' && gameState !== 'DICE_RESULT' && gameState !== 'SCORE_CALCULATION') {
    return null; // Don't render modal when rolling dice
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        
        {gameState === 'DICE_ROLLING' && (
          <div className="card modal-card" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', animation: 'shake 0.5s infinite' }}>{t('modal.rolling')}</h2>
            <style>{`
              @keyframes shake {
                0% { transform: translate(1px, 1px) rotate(0deg); }
                10% { transform: translate(-1px, -2px) rotate(-1deg); }
                20% { transform: translate(-3px, 0px) rotate(1deg); }
                30% { transform: translate(3px, 2px) rotate(0deg); }
                40% { transform: translate(1px, -1px) rotate(1deg); }
                50% { transform: translate(-1px, 2px) rotate(-1deg); }
                60% { transform: translate(-3px, 1px) rotate(0deg); }
                70% { transform: translate(3px, 1px) rotate(-1deg); }
                80% { transform: translate(-1px, -1px) rotate(1deg); }
                90% { transform: translate(1px, 2px) rotate(0deg); }
                100% { transform: translate(1px, -2px) rotate(-1deg); }
              }
            `}</style>
          </div>
        )}

        {gameState === 'DICE_RESULT' && (
          <div className="card modal-card" style={{ textAlign: 'center', animation: 'popIn 0.3s ease-out' }}>
            <h2>{t('modal.diceResult')}</h2>
            <div style={{ fontSize: '5rem', margin: '20px 0' }}>
              🎲 {currentPlayer?.lastRoll} 
              {currentPlayer?.isDoubles && <span style={{fontSize:'2rem', display:'block', color:'#10b981', marginTop:'10px', animation: 'bounce 1s infinite'}}>{t('modal.doubles')}</span>}
            </div>
          </div>
        )}

        {gameState === 'SCORE_CALCULATION' && (
          <div className="card modal-card" style={{ textAlign: 'center', minWidth: '350px', animation: 'slideUp 0.4s ease-out' }}>
            <h2 style={{ marginBottom: '20px' }}>{t('modal.scoreCalc')}</h2>
            <div style={{ textAlign: 'left', fontSize: '1.2rem', background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
              {scoreBreakdown?.breakdown.map((item, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '12px',
                  opacity: 0,
                  animation: `fadeIn 0.4s ease-out forwards`,
                  animationDelay: `${idx * 0.5}s`
                }}>
                  <span style={{ color: '#475569' }}>{item.label}:</span>
                  <span style={{ color: item.value >= 0 ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                    {item.value >= 0 ? '+' : ''}{item.value}
                  </span>
                </div>
              ))}
              <hr style={{ 
                margin: '20px 0', 
                borderTop: '2px dashed #cbd5e1',
                opacity: 0,
                animation: `fadeIn 0.4s ease-out forwards`,
                animationDelay: `${(scoreBreakdown?.breakdown.length) * 0.5}s`
              }} />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '1.6rem', 
                fontWeight: 'bold',
                opacity: 0,
                animation: `fadeIn 0.4s ease-out forwards`,
                animationDelay: `${(scoreBreakdown?.breakdown.length + 0.5) * 0.5}s`
              }}>
                <span style={{ color: '#1e293b' }}>{t('modal.totalEarned')}</span>
                <span style={{ color: scoreBreakdown?.total >= 0 ? '#10b981' : '#ef4444' }}>
                  {scoreBreakdown?.total >= 0 ? '+' : ''}{scoreBreakdown?.total}
                </span>
              </div>
            </div>
            <style>{`
              @keyframes popIn {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes slideUp {
                0% { transform: translateY(20px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
              }
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              @keyframes fadeIn {
                0% { opacity: 0; transform: translateX(-10px); }
                100% { opacity: 1; transform: translateX(0); }
              }
            `}</style>
          </div>
        )}

        {gameState === 'DRAW_CARD' && (
          <div style={{ textAlign: 'center', color: '#64748b', fontStyle: 'italic', fontSize: '1.5rem', padding: '40px' }}>
            {t('modal.drawing')}
          </div>
        )}

        {gameState === 'RISK_PROMPT' && (
          <div className="card general modal-card" style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'var(--risk-purple)', fontSize: '2rem', marginBottom: '20px' }}>{t('modal.riskArea')}</h2>
            <p className="card-question" style={{ fontSize: '1.5rem', margin: '20px 0' }}>
              {t('modal.riskPrompt')}
              <br/><br/>
              <strong>{t('modal.warning')}</strong>
            </p>
            {isMyTurn ? (
              <div className="btn-group">
                <button className="btn-true" style={{ background: 'var(--risk-purple)' }} onClick={() => onRiskChoice(true)}>{t('modal.takeRisk')}</button>
                <button className="btn-false" style={{ background: '#94a3b8' }} onClick={() => onRiskChoice(false)}>{t('modal.playSafe')}</button>
              </div>
            ) : (
              <div style={{ fontStyle: 'italic', color: '#64748b', fontSize: '1.2rem', padding: '15px' }}>
                ⏳ {t('pvp.waitingForAnswer', { name: currentPlayer?.name })}
              </div>
            )}
          </div>
        )}

        {currentQuestion && gameState === 'ANSWERING' && (
          <div className={`card ${currentQuestion.category} modal-card`}>
            <div className="card-title">{t('modal.question', {category: t(`board.${currentQuestion.category.toLowerCase()}`).toUpperCase()})}</div>
            <div className="card-question">{currentQuestion.question}</div>
            
            <div className="timer">00:{timeLeft.toString().padStart(2, '0')}</div>

            {isOnline && !isMyTurn && (
              <div style={{
                textAlign: 'center',
                padding: '8px 16px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                color: '#1d4ed8',
                fontWeight: 'bold',
                margin: '15px 0'
              }}>
                👀 {t('pvp.opponentAnswering', { name: currentPlayer?.name })}
              </div>
            )}
            
            {isTrueFalse ? (
              <div className="tf-options-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginTop: '25px',
                pointerEvents: (!isMyTurn) ? 'none' : 'auto',
                opacity: (!isMyTurn) ? 0.75 : 1
              }}>
                {(() => {
                  const optionsToRender = (currentQuestion.options && currentQuestion.options.length === 2)
                    ? currentQuestion.options
                    : [t('modal.true'), t('modal.false')];
                  return optionsToRender.map((option, idx) => {
                    const optNorm = option.toString().trim().toUpperCase();
                    const isTrueBtn = optNorm === 'TRUE' || optNorm === 'BENAR' || optNorm === 'BETUL' || option.toString().trim() === '正确' || idx === 0;
                    return (
                      <button 
                        key={idx} 
                        className="btn-option tf-btn" 
                        style={{ 
                          padding: '18px 20px', 
                          background: isTrueBtn ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', 
                          backdropFilter: 'blur(4px)',
                          border: isTrueBtn ? '2px solid #10b981' : '2px solid #ef4444', 
                          borderRadius: '16px', 
                          fontSize: '1.4rem', 
                          cursor: isMyTurn ? 'pointer' : 'default',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                          transition: 'all 0.2s ease',
                          color: isTrueBtn ? '#065f46' : '#991b1b',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px'
                        }}
                        onMouseOver={(e) => { 
                          if (isMyTurn) { 
                            e.currentTarget.style.transform = 'translateY(-3px)'; 
                            e.currentTarget.style.boxShadow = isTrueBtn ? '0 8px 25px rgba(16, 185, 129, 0.3)' : '0 8px 25px rgba(239, 68, 68, 0.3)';
                            e.currentTarget.style.background = isTrueBtn ? 'rgba(16, 185, 129, 0.22)' : 'rgba(239, 68, 68, 0.22)'; 
                          } 
                        }}
                        onMouseOut={(e) => { 
                          if (isMyTurn) { 
                            e.currentTarget.style.transform = 'none'; 
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.06)';
                            e.currentTarget.style.background = isTrueBtn ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)'; 
                          } 
                        }}
                        onClick={() => handleSelectOption(option)}
                      >
                        <span style={{ fontSize: '1.6rem' }}>{isTrueBtn ? '✓' : '✗'}</span>
                        <span>{option}</span>
                      </button>
                    );
                  });
                })()}
              </div>
            ) : currentQuestion.options && currentQuestion.options.length === 4 ? (
              <div className="options-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginTop: '15px',
                pointerEvents: (!isMyTurn) ? 'none' : 'auto',
                opacity: (!isMyTurn) ? 0.75 : 1
              }}>
                {currentQuestion.options.map((option, idx) => (
                  <button 
                    key={idx} 
                    className="btn-option" 
                    style={{ 
                      padding: '15px', 
                      background: 'rgba(255, 255, 255, 0.5)', 
                      backdropFilter: 'blur(4px)',
                      border: '2px solid rgba(255, 255, 255, 0.8)', 
                      borderRadius: '12px', 
                      fontSize: '1.2rem', 
                      cursor: isMyTurn ? 'pointer' : 'default',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s',
                      color: '#1e293b',
                      fontWeight: 'bold'
                    }}
                    onMouseOver={(e) => { if (isMyTurn) { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'; } }}
                    onMouseOut={(e) => { if (isMyTurn) { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)'; } }}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              !isAnswerRevealed ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <button className="btn-true" style={{ marginTop: '30px', background: '#3b82f6', width: '100%', maxWidth: '300px' }} onClick={() => setIsAnswerRevealed(true)}>
                    {t('modal.reveal')}
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div className="card-answer" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#10b981', margin: '20px 0' }}>
                    {currentQuestion.answer}
                  </div>
                  <div style={{ marginBottom: '15px', fontStyle: 'italic', color: '#64748b', fontSize: '1.1rem' }}>{t('modal.didGetRight')}</div>
                  <div className="btn-group">
                    <button className="btn-true" onClick={() => onAnswer(true)}>{t('modal.correctBtn')}</button>
                    <button className="btn-false" onClick={() => onAnswer(false)}>{t('modal.incorrectBtn')}</button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
        
        {gameState === 'TURN_END' && (
          <div className="card modal-card" style={{ textAlign: 'center' }}>
            {lastAnswerResult !== null ? (
              <>
                <h2 style={{ color: lastAnswerResult ? '#10b981' : '#ef4444', fontSize: '2.5rem', marginBottom: '10px' }}>
                  {lastAnswerResult ? t('modal.correct') : t('modal.incorrect')}
                </h2>
                {currentQuestion && (
                  <p style={{ fontSize: '1.4rem', margin: '20px 0', color: '#334155' }}>
                    {t('modal.correctAnswerWas')} <br/>
                    <strong style={{ fontSize: '1.8rem', color: '#1e293b' }}>{currentQuestion.answer}</strong>
                  </p>
                )}
              </>
            ) : (
              <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#334155' }}>{t('modal.turnOver')}</h2>
            )}
            <p style={{ fontSize: '1.1rem', color: '#64748b', marginTop: '20px' }}>{t('modal.nextPlayer')}</p>
          </div>
        )}

      </div>
    </div>
  );
}
