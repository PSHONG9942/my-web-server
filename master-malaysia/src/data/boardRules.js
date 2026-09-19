export const STEP_RULES = {
  1: { type: 'CORRECT', y: 200 },
  2: { type: 'DICE_SCORE_EQ_CORRECT', x: 10, y: 100 },
  3: { type: 'DOUBLES', y: 80 },
  4: { type: 'DICE_SCORE_GT', x: 5, y: 20 },
  5: { type: 'INCORRECT', y: 40 },
  6: { type: 'RISK', y: 50 },
  7: { type: 'DICE_SCORE_EQ_CORRECT', x: 7, y: 100 },
  8: { type: 'RISK', y: 50 },
  9: { type: 'INCORRECT', y: 80 },
  10: { type: 'CORRECT', y: 200 },
  11: { type: 'DICE_SCORE_GT', x: 6, y: -40 },
  12: { type: 'ALL_CORRECT', stage: 1, y: 360 },

  13: { type: 'SCORE_GT', z: 500, y: 200 },
  14: { type: 'DICE_SCORE_EQ_CORRECT', x: 11, y: 50 },
  15: { type: 'DOUBLES', y: -150 },
  16: { type: 'CORRECT', y: 150 },
  17: { type: 'DICE_SCORE_LT', x: 8, y: -60 },
  18: { type: 'RISK', y: 150 },
  19: { type: 'CORRECT', y: 200 },
  20: { type: 'RISK', y: 150 },
  21: { type: 'DICE_SCORE_EQ_CORRECT', x: 8, y: 100 },
  22: { type: 'DICE_SCORE_LT', x: 5, y: 50 },
  23: { type: 'INCORRECT', y: 50 },
  24: { type: 'ALL_CORRECT', stage: 2, y: 360 },

  25: { type: 'SCORE_GT', z: 1000, y: 200 },
  26: { type: 'CORRECT', y: 200 },
  27: { type: 'DOUBLES', y: 100 },
  28: { type: 'DICE_SCORE_EQ_CORRECT', x: 3, y: 100 },
  29: { type: 'DICE_SCORE_GT', x: 10, y: 150 },
  30: { type: 'RISK', y: 250 },
  31: { type: 'INCORRECT', y: 200 },
  32: { type: 'RISK', y: 250 },
  33: { type: 'CORRECT', y: 50 },
  34: { type: 'DOUBLES', y: 50 },
  35: { type: 'DICE_SCORE_EQ_CORRECT', x: 5, y: 80 },
  36: { type: 'ALL_CORRECT', stage: 3, y: 360 },

  37: { type: 'SCORE_GT', z: 1500, y: 200 },
  38: { type: 'DICE_SCORE_EQ_CORRECT', x: 8, y: 50 },
  39: { type: 'DOUBLES', y: -300 },
  40: { type: 'DICE_SCORE_EQ_CORRECT', x: 11, y: 50 },
  41: { type: 'DICE_SCORE_GT', x: 5, y: -50 },
  42: { type: 'RISK', y: 350 },
  43: { type: 'CORRECT', y: 300 },
  44: { type: 'RISK', y: 350 },
  45: { type: 'INCORRECT', y: 100 },
  46: { type: 'INCORRECT', y: 100 },
  47: { type: 'INCORRECT', y: 300 },
  48: { type: 'ALL_CORRECT', stage: 4, y: 360 },
};

export const RISK_AREAS = [6, 8, 18, 20, 30, 32, 42, 44]; // Only On-Step Risk Areas

export const CORNER_RISK_VALUES = [100, 200, 300, 400]; // Values for Corners 1, 2, 3, 4

export const BOARD_SPACES = [];
let cornerIndex = 0;
for (let step = 1; step <= 48; step++) {
  BOARD_SPACES.push({ type: 'STEP', stepNum: step });
  if (step % 12 === 0) {
    BOARD_SPACES.push({ type: 'CORNER_RISK', cornerIndex: cornerIndex, risk: CORNER_RISK_VALUES[cornerIndex] });
    cornerIndex++;
  }
}
