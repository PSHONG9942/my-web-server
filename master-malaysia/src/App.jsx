import React, { useState, useEffect } from 'react';
import './App.css';
import { useLanguage } from './contexts/LanguageContext';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import ActionPanel from './components/ActionPanel';
import QuestionModal from './components/QuestionModal';
import MainMenu from './components/MainMenu';
import GameInstructions from './components/GameInstructions';
import PlayerSetup from './components/PlayerSetup';
import RollOff from './components/RollOff';
import { STEP_RULES, RISK_AREAS, BOARD_SPACES } from './data/boardRules';
import questionsData from './data/questions.json';

const INITIAL_PLAYERS = [
  { id: 1, name: 'Player 1', color: 'green', positionIndex: 0, score: 0, lastRoll: 0, isDoubles: false, stageIncorrects: [false, false, false, false] },
  { id: 2, name: 'Player 2', color: 'red', positionIndex: 0, score: 0, lastRoll: 0, isDoubles: false, stageIncorrects: [false, false, false, false] },
  { id: 3, name: 'Player 3', color: 'yellow', positionIndex: 0, score: 0, lastRoll: 0, isDoubles: false, stageIncorrects: [false, false, false, false] },
  { id: 4, name: 'Player 4', color: 'blue', positionIndex: 0, score: 0, lastRoll: 0, isDoubles: false, stageIncorrects: [false, false, false, false] }
];

function getCategoryForSpace(space) {
  if (space.type === 'CORNER_RISK' || RISK_AREAS.includes(space.stepNum)) return 'general';
  const step = space.stepNum;
  if (step >= 1 && step <= 13) return 'land';
  if (step >= 14 && step <= 25) return 'people';
  if (step >= 26 && step <= 37) return 'heritage';
  if (step >= 38 && step <= 48) return 'culture';
  return 'general'; // fallback
}

function calculateScore(player, isCorrect) {
  const space = BOARD_SPACES[player.positionIndex];
  const step = space.stepNum || 0;
  const rule = space.type === 'STEP' ? STEP_RULES[step] : { type: 'RISK', y: space.risk };
  
  let breakdown = [];
  let total = 0;

  let basePoints = player.lastRoll;
  let evenOddBonus = (space.type === 'STEP' && step % 2 === 0) ? 10 : (space.type === 'STEP' ? 20 : 0);

  const isRiskArea = space.type === 'CORNER_RISK' || RISK_AREAS.includes(step);

  if (isRiskArea) {
    const riskVal = rule?.risk || rule?.y || 0;
    if (isCorrect) {
       breakdown.push({ label: 'Dice Roll', value: basePoints });
       breakdown.push({ label: 'Even/Odd Bonus', value: evenOddBonus });
       breakdown.push({ label: 'Risk Bonus', value: riskVal });
       total = basePoints + evenOddBonus + riskVal;
    } else {
       breakdown.push({ label: 'Dice Roll', value: -basePoints });
       breakdown.push({ label: 'Even/Odd Bonus', value: -evenOddBonus });
       breakdown.push({ label: 'Risk Penalty', value: -riskVal });
       return { total: -(basePoints + evenOddBonus + riskVal), breakdown }; // Early return
    }
  } else if (isCorrect) {
    breakdown.push({ label: 'Dice Roll', value: basePoints });
    breakdown.push({ label: 'Even/Odd Bonus', value: evenOddBonus });
    total = basePoints + evenOddBonus;
  } else {
    // Incorrect answer base logic
    total = 0;
    breakdown.push({ label: 'Incorrect Answer', value: 0 });
    if (rule && rule.type === 'INCORRECT') {
       breakdown.push({ label: 'Step Penalty', value: -rule.y });
       total -= rule.y;
    }
  }

  // Apply conditional bonuses for correct answers
  if (isCorrect && rule) {
    if (rule.type === 'CORRECT') {
      breakdown.push({ label: 'Step Bonus', value: rule.y });
      total += rule.y;
    }
    if (rule.type === 'DICE_SCORE_EQ_CORRECT' && player.lastRoll === rule.x) {
      breakdown.push({ label: 'Exact Dice Bonus', value: rule.y });
      total += rule.y;
    }
    if (rule.type === 'SCORE_GT' && player.score > rule.z) {
      breakdown.push({ label: 'Score > ' + rule.z + ' Bonus', value: rule.y });
      total += rule.y;
    }
  }
  
  // Apply ALL_CORRECT bonus even on Risk Area if correct
  if (isCorrect && rule && rule.type === 'ALL_CORRECT' && !player.stageIncorrects[rule.stage - 1]) {
    breakdown.push({ label: 'Flawless Stage Bonus', value: rule.y });
    total += rule.y;
  }

  // Handle dice conditions (Penalties apply always, Positive bonuses ONLY apply if correct)
  if (rule) {
    if (rule.type === 'DICE_SCORE_GT' && player.lastRoll > rule.x) {
      if (rule.y > 0 && isCorrect) {
        breakdown.push({ label: 'High Dice Bonus', value: rule.y });
        total += rule.y;
      }
      if (rule.y < 0) {
        breakdown.push({ label: 'High Dice Penalty', value: rule.y });
        total += rule.y;
      }
    }
    if (rule.type === 'DICE_SCORE_LT' && player.lastRoll < rule.x) {
      if (rule.y > 0 && isCorrect) {
        breakdown.push({ label: 'Low Dice Bonus', value: rule.y });
        total += rule.y;
      }
      if (rule.y < 0) {
        breakdown.push({ label: 'Low Dice Penalty', value: rule.y });
        total += rule.y;
      }
    }
    if (rule.type === 'DOUBLES' && player.isDoubles) {
      if (rule.y > 0 && isCorrect) {
        breakdown.push({ label: 'Doubles Bonus', value: rule.y });
        total += rule.y;
      }
      if (rule.y < 0) {
        breakdown.push({ label: 'Doubles Penalty', value: rule.y });
        total += rule.y;
      }
    }
  }

  return { total, breakdown };
}

function App() {
  const { language, t } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState('MENU'); // MENU, INSTRUCTIONS, SETUP, ROLL_OFF, GAME
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [turnIndex, setTurnIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [gameState, setGameState] = useState('ROLL_DICE'); // ROLL_DICE, DRAW_CARD, ANSWERING, TURN_END, RISK_PROMPT, GAME_OVER
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [lastAnswerResult, setLastAnswerResult] = useState(null);
  const [scoreBreakdown, setScoreBreakdown] = useState(null);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // Initialize randomized question decks
  const [questionDecks, setQuestionDecks] = useState({
    land: [], people: [], heritage: [], culture: [], general: []
  });

  useEffect(() => {
    async function loadQuestions() {
      let data = questionsData;
      if (language === 'ms') {
         try {
           const mod = await import('./data/questions_ms.json');
           data = mod.default;
         } catch(e) { console.error('ms questions not ready yet', e); }
      } else if (language === 'zh') {
         try {
           const mod = await import('./data/questions_zh.json');
           data = mod.default;
         } catch(e) { console.error('zh questions not ready yet', e); }
      }
      
      const shuffle = (array) => [...(array || [])].sort(() => Math.random() - 0.5);
      
      const getCategory = (cat) => {
         const arr = data[cat] || [];
         if (arr.length < 10) return shuffle(questionsData[cat]); // Fallback to EN if translating
         return shuffle(arr);
      }
      
      setQuestionDecks({
        land: getCategory('land'),
        people: getCategory('people'),
        heritage: getCategory('heritage'),
        culture: getCategory('culture'),
        general: getCategory('general')
      });
    }
    loadQuestions();
  }, [language]);

  const currentPlayer = players[turnIndex];

  const handleRollDice = () => {
    setGameState('DICE_ROLLING');
    
    setTimeout(() => {
      const roll1 = Math.floor(Math.random() * 6) + 1;
      const roll2 = Math.floor(Math.random() * 6) + 1;
      const totalRoll = roll1 + roll2;
      const isDoubles = roll1 === roll2;
      
      const currentPlayer = players[turnIndex];
      
      const updatedPlayers = [...players];
      updatedPlayers[turnIndex] = {
        ...currentPlayer,
        lastRoll: totalRoll,
        isDoubles: isDoubles
      };
      
      setPlayers(updatedPlayers);
      setGameState('DICE_RESULT');
      
      setTimeout(() => {
        const currentSpace = BOARD_SPACES[currentPlayer.positionIndex];
        if (currentSpace.type === 'CORNER_RISK' || (currentSpace.type === 'STEP' && RISK_AREAS.includes(currentSpace.stepNum))) {
          setGameState('RISK_PROMPT');
        } else {
          setGameState('DRAW_CARD');
        }
      }, 1500); // Wait 1.5s to show dice result
    }, 1500); // Dice rolling animation duration
  };

  useEffect(() => {
    if (gameState === 'DRAW_CARD') {
      const currentSpace = BOARD_SPACES[currentPlayer.positionIndex];
      const category = getCategoryForSpace(currentSpace);
      
      const deck = [...questionDecks[category]];
      const drawnQuestion = deck.shift();
      deck.push(drawnQuestion); // Put it at the back of the deck
      
      setQuestionDecks(prev => ({
        ...prev,
        [category]: deck
      }));
      
      setCurrentQuestion({
        ...drawnQuestion,
        category
      });
      
      // Delay answering state slightly for UX
      setTimeout(() => setGameState('ANSWERING'), 500);
    }
  }, [gameState, currentPlayer.positionIndex]);

  const endTurnTransition = (updatedPlayersArr) => {
    setTimeout(() => {
      const nextTurn = (turnIndex + 1) % players.length;
      const nextRound = nextTurn === 0 ? round + 1 : round;
      
      if (nextRound > 52) {
        setGameState('GAME_OVER');
        setPlayers(updatedPlayersArr);
      } else {
        setRound(nextRound);
        setTurnIndex(nextTurn);
        
        // Move the next player to the current round step
        const finalPlayers = [...updatedPlayersArr];
        finalPlayers[nextTurn] = {
            ...finalPlayers[nextTurn],
            positionIndex: nextRound - 1
        };
        setPlayers(finalPlayers);
        setGameState('ROLL_DICE');
      }
      setCurrentQuestion(null);
      setLastAnswerResult(null);
      setScoreBreakdown(null);
    }, 500); // Quick transition after score calculation is dismissed
  };

  const handleAnswer = (isCorrect, isRiskTake) => {
    setLastAnswerResult(isCorrect);
    setGameState('TURN_END');
    
    const { total, breakdown } = calculateScore(currentPlayer, isCorrect);
    setScoreBreakdown({ total, breakdown });
    
    setTimeout(() => {
       setGameState('SCORE_CALCULATION');
       
       setTimeout(() => {
          const updatedPlayers = [...players];
          const newScore = Math.max(0, currentPlayer.score + total);
          const updatedStageIncorrects = [...currentPlayer.stageIncorrects];
          
          if (!isCorrect) {
             const space = BOARD_SPACES[currentPlayer.positionIndex];
             if (space.type === 'STEP') {
                const stageIndex = Math.min(3, Math.floor((space.stepNum - 1) / 12));
                updatedStageIncorrects[stageIndex] = true;
             }
          }

          updatedPlayers[turnIndex] = {
            ...currentPlayer,
            score: newScore,
            stageIncorrects: updatedStageIncorrects
          };
          
          setPlayers(updatedPlayers);
          endTurnTransition(updatedPlayers);
       }, 4000); // Display calculation for 4 seconds to allow animation
    }, 2500); // Display correct answer for 2.5 seconds
  };

  const handleRiskChoice = (takeRisk) => {
    if (takeRisk) {
      setGameState('DRAW_CARD');
    } else {
      setLastAnswerResult(null);
      setGameState('TURN_END');
      setScoreBreakdown({ total: 0, breakdown: [{ label: 'Played it safe', value: 0 }] });
      
      setTimeout(() => {
         setGameState('SCORE_CALCULATION');
         setTimeout(() => {
           endTurnTransition(players);
         }, 1500);
      }, 1500);
    }
  };

  const startGame = (configuredPlayers) => {
    setPlayers(configuredPlayers);
    setTurnIndex(0);
    setRound(1);
    setGameState('ROLL_DICE');
    setCurrentScreen('GAME');
  };

  if (currentScreen === 'MENU') {
    return <MainMenu onPlay={() => setCurrentScreen('SETUP')} onInstructions={() => setCurrentScreen('INSTRUCTIONS')} />;
  }

  if (currentScreen === 'INSTRUCTIONS') {
    return <GameInstructions onBack={() => setCurrentScreen('MENU')} />;
  }

  if (currentScreen === 'SETUP') {
    return <PlayerSetup onBack={() => setCurrentScreen('MENU')} onComplete={(players) => {
      setPlayers(players);
      setCurrentScreen('ROLL_OFF');
    }} />;
  }

  if (currentScreen === 'ROLL_OFF') {
    return <RollOff players={players} onBack={() => setCurrentScreen('SETUP')} onStartGame={startGame} />;
  }

  return (
    <div className="app-container">
      <div className="main-area">
        <Board players={players} />
      </div>
      <div className="side-panel">
        <Scoreboard players={players} turnIndex={turnIndex} />
        <ActionPanel 
          currentPlayer={currentPlayer}
          onRollDice={handleRollDice}
          gameState={gameState}
          onQuit={() => setShowQuitConfirm(true)}
        />
      </div>
      {gameState === 'GAME_OVER' && (
        <div className="modal-overlay game-over-overlay">
          <div className="game-over-modal card general">
            <h1 className="game-over-title">{t('quit.gameover') || 'GAME OVER!'}</h1>
            <h2 className="game-over-subtitle">{t('quit.standings') || 'Final Standings'}</h2>
            
            <div className="game-over-cards">
              {[...players].sort((a, b) => b.score - a.score).map((p, i) => (
                <div key={p.id} className={`player-result-card ${i === 0 ? 'winner' : ''} ${p.color}`}>
                  {i === 0 && <div className="winner-crown">👑 {t('quit.winner') || 'WINNER'}</div>}
                  <div className="player-result-rank">#{i + 1}</div>
                  <div className="player-result-name">{p.name || `Player ${p.id}`}</div>
                  <div className="player-result-score">{p.score} pts</div>
                </div>
              ))}
            </div>
            
            <button className="btn-true play-again-btn" onClick={() => setCurrentScreen('MENU')}>
              {t('quit.mainMenu') || 'Main Menu'}
            </button>
          </div>
        </div>
      )}

      {showQuitConfirm && (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
          <div className="card general modal-card" style={{ maxWidth: '400px', textAlign: 'center', padding: '30px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#ef4444' }}>{t('quit.title')}</h2>
            <p style={{ fontSize: '1.2rem', color: '#334155', marginBottom: '30px' }}>
              {t('quit.confirm')}
            </p>
            <div className="btn-group">
              <button 
                className="btn-true" 
                style={{ background: '#ef4444' }} 
                onClick={() => {
                  setShowQuitConfirm(false);
                  setCurrentScreen('MENU');
                }}
              >
                {t('quit.yes')}
              </button>
              <button 
                className="btn-false" 
                style={{ background: '#94a3b8' }} 
                onClick={() => setShowQuitConfirm(false)}
              >
                {t('quit.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      <QuestionModal 
        currentQuestion={currentQuestion}
        gameState={gameState}
        onAnswer={handleAnswer}
        onRiskChoice={handleRiskChoice}
        lastAnswerResult={lastAnswerResult}
        scoreBreakdown={scoreBreakdown}
        currentPlayer={currentPlayer}
      />
    </div>
  );
}

export default App;
