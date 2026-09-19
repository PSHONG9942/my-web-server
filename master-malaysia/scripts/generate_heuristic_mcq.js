import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsFile = path.join(__dirname, '../src/data/questions.json');
const questionsData = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

// Utility to shuffle an array
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function processQuestions() {
  let count = 0;
  
  for (const category in questionsData) {
    const categoryQuestions = questionsData[category];
    
    // Collect all unique answers for this category
    const allCategoryAnswers = [...new Set(categoryQuestions.map(q => q.answer))];
    
    for (const q of categoryQuestions) {
      if (!q.options || q.options.length < 4) {
        // Find other answers to use as distractors
        const potentialDistractors = allCategoryAnswers.filter(a => a !== q.answer);
        
        // Shuffle potential distractors
        const shuffledDistractors = shuffle(potentialDistractors);
        
        // Pick top 3 (or less if not enough exist, though a category usually has many)
        let distractors = shuffledDistractors.slice(0, 3);
        
        // If somehow we don't have enough distractors from the same category, grab from other categories
        if (distractors.length < 3) {
           const allGlobalAnswers = [];
           for (const c in questionsData) {
               allGlobalAnswers.push(...questionsData[c].map(x => x.answer));
           }
           const globalSet = [...new Set(allGlobalAnswers)].filter(a => a !== q.answer && !distractors.includes(a));
           const extraDistractors = shuffle(globalSet).slice(0, 3 - distractors.length);
           distractors = distractors.concat(extraDistractors);
        }
        
        // Combine with correct answer and shuffle
        q.options = shuffle([q.answer, ...distractors]);
        count++;
      }
    }
  }
  
  fs.writeFileSync(questionsFile, JSON.stringify(questionsData, null, 2));
  console.log(`Successfully generated MCQs for ${count} questions!`);
}

processQuestions();
