// Picture Crossword Grid Generator and Verifier
function generatePuzzle(candidates, targetCount = 7, maxRows = 9, maxCols = 9) {
  let best = null;

  function canPlace(grid, word, r, c, dir) {
    const dr = dir === 'down' ? 1 : 0;
    const dc = dir === 'across' ? 1 : 0;
    const len = word.length;
    if (r + dr * (len - 1) >= maxRows || c + dc * (len - 1) >= maxCols) return false;
    if (r < 0 || c < 0) return false;

    // cell before
    const br = r - dr, bc = c - dc;
    if (br >= 0 && br < maxRows && bc >= 0 && bc < maxCols && grid[br][bc] !== null) return false;
    // cell after
    const ar = r + dr * len, ac = c + dc * len;
    if (ar >= 0 && ar < maxRows && ac >= 0 && ac < maxCols && grid[ar][ac] !== null) return false;

    let intersections = 0;
    for (let i = 0; i < len; i++) {
      const cr = r + dr * i, cc = c + dc * i;
      const cur = grid[cr][cc];
      if (cur !== null) {
        if (cur !== word[i]) return false;
        intersections++;
      } else {
        const pdr = dc, pdc = dr;
        for (const sign of [-1, 1]) {
          const adjR = cr + pdr * sign;
          const adjC = cc + pdc * sign;
          if (adjR >= 0 && adjR < maxRows && adjC >= 0 && adjC < maxCols) {
            if (grid[adjR][adjC] !== null) return false;
          }
        }
      }
    }
    return intersections > 0;
  }

  function place(grid, word, r, c, dir) {
    const next = grid.map(row => [...row]);
    const dr = dir === 'down' ? 1 : 0;
    const dc = dir === 'across' ? 1 : 0;
    for (let i = 0; i < word.length; i++) {
      next[r + dr * i][c + dc * i] = word[i];
    }
    return next;
  }

  function search(placed, grid, used) {
    if (placed.length >= targetCount) {
      best = placed;
      return true;
    }
    for (const w of candidates) {
      if (used.has(w)) continue;
      for (const p of placed) {
        const otherDir = p.dir === 'across' ? 'down' : 'across';
        for (let i = 0; i < p.word.length; i++) {
          for (let j = 0; j < w.length; j++) {
            if (p.word[i] === w[j]) {
              const r = otherDir === 'across' ? (p.row + (p.dir === 'down' ? i : 0)) : (p.row + (p.dir === 'down' ? i : 0) - j);
              const c = otherDir === 'across' ? (p.col + (p.dir === 'across' ? i : 0) - j) : (p.col + (p.dir === 'across' ? i : 0));
              if (canPlace(grid, w, r, c, otherDir)) {
                const nextGrid = place(grid, w, r, c, otherDir);
                used.add(w);
                placed.push({ word: w, dir: otherDir, row: r, col: c });
                if (search(placed, nextGrid, used)) return true;
                placed.pop();
                used.delete(w);
              }
            }
          }
        }
      }
    }
    return false;
  }

  for (let startIdx = 0; startIdx < candidates.length; startIdx++) {
    const first = candidates[startIdx];
    const grid = Array.from({length: maxRows}, () => Array(maxCols).fill(null));
    const initGrid = place(grid, first, 2, 1, 'across');
    const used = new Set([first]);
    const placed = [{ word: first, dir: 'across', row: 2, col: 1 }];
    if (search(placed, initGrid, used)) {
      return best;
    }
  }
  return null;
}

function printAndVerify(puzzle, name) {
  console.log(`\n=== Puzzle: ${name} ===`);
  const maxR = Math.max(...puzzle.map(w => w.row + (w.dir === 'down' ? w.word.length : 1)));
  const maxC = Math.max(...puzzle.map(w => w.col + (w.dir === 'across' ? w.word.length : 1)));
  const grid = Array.from({length: maxR}, () => Array(maxC).fill('.'));
  
  for (const w of puzzle) {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === 'across' ? w.row : w.row + i;
      const c = w.dir === 'across' ? w.col + i : w.col;
      grid[r][c] = w.word[i];
    }
  }

  console.log(grid.map((r, i) => `${i}: ` + r.join(' ')).join('\n'));
  console.log('Words count:', puzzle.length, 'Grid size:', `${maxR}x${maxC}`);
  console.log(JSON.stringify(puzzle));
}

// 1. Animals
const animals = ['WOLF', 'OTTER', 'TIGER', 'ZEBRA', 'KOALA', 'PANDA', 'BEAR', 'EAGLE', 'LION', 'CAMEL', 'FROG'];
const pAnimals = generatePuzzle(animals, 7, 9, 8);
printAndVerify(pAnimals, 'Wildlife Safari');

// 2. Food & Treats
const food = ['PIZZA', 'APPLE', 'LEMON', 'MANGO', 'BREAD', 'TACO', 'SUSHI', 'DONUT', 'ONION', 'GRAPE', 'BERRY'];
const pFood = generatePuzzle(food, 6, 8, 8);
printAndVerify(pFood, 'Delicious Bites');

// 3. World & Objects
const objects = ['ROCKET', 'GUITAR', 'CAMERA', 'ROBOT', 'CLOCK', 'TRAIN', 'PIANO', 'CROWN', 'GLOBE'];
const pObjects = generatePuzzle(objects, 6, 8, 8);
printAndVerify(pObjects, 'Wonders & Inventions');
