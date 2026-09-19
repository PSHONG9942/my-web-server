import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

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

async function generateDistractorsForBatch(batch) {
  const prompt = `You are a Malaysian trivia expert.
Generate exactly 3 plausible but incorrect distractors for each of the following questions.
The distractors must be as close to the type of correct answer as possible to avoid common sense guesses (e.g., if the answer is a date, provide other similar dates. If it's a state, provide other Malaysian states).

Input questions:
${JSON.stringify(batch.map(q => ({ id: q.id, question: q.question, answer: q.answer })), null, 2)}

Output format:
Return ONLY a raw JSON array of objects with no markdown formatting. Each object must have:
- "id": The same ID as the input question.
- "distractors": An array of exactly 3 string values.

Example output:
[
  { "id": "land-1", "distractors": ["Distractor A", "Distractor B", "Distractor C"] }
]`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemma-4-31b-it',
      contents: prompt
    });

    let text = response.text;
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error generating distractors:', error);
    return null;
  }
}

async function processQuestions() {
  let totalProcessed = 0;
  
  for (const category in questionsData) {
    const categoryQuestions = questionsData[category];
    const batchSize = 20;
    
    for (let i = 0; i < categoryQuestions.length; i += batchSize) {
      const batch = categoryQuestions.slice(i, i + batchSize);
      
      // Skip if already processed
      const needsProcessing = batch.some(q => !q.options || q.options.length < 4);
      if (!needsProcessing) {
        totalProcessed += batch.length;
        continue;
      }
      
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1} for category ${category}...`);
      const results = await generateDistractorsForBatch(batch);
      
      if (results && Array.isArray(results)) {
        for (const res of results) {
          const q = categoryQuestions.find(q => q.id === res.id);
          if (q && res.distractors && res.distractors.length === 3) {
            // Combine answer with distractors and shuffle
            q.options = shuffle([q.answer, ...res.distractors]);
          }
        }
        
        // Save incrementally
        fs.writeFileSync(questionsFile, JSON.stringify(questionsData, null, 2));
        totalProcessed += batch.length;
        console.log(`Saved progress. Processed ${totalProcessed} total questions.`);
      } else {
        console.log('Failed to parse response for batch, retrying in 5s...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        i -= batchSize; // Retry
      }
      
      // Brief pause to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('All questions processed successfully!');
}

processQuestions();
