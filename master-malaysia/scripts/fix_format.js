import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: 'AQ.Ab8RN6IDKbPZvNXvB4lEXlC-2Sk0mdGxl_2hl5XeBrmUQgpTOA'
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

async function fixDistractorsFormatBatch(batch) {
  const prompt = `You are a strict data formatter. I will provide a list of multiple-choice questions. Each question has a correct 'answer' and an array of 3 'distractors'.
Your task is to rewrite the 3 distractors so they EXACTLY MATCH the formatting, capitalization, and structure of the correct answer. 
- If the answer is ALL CAPS, make the distractors ALL CAPS. 
- If the answer is a date (e.g., "MAY 2025"), make the distractors the exact same date format (e.g., "JUNE 1975"). 
- If the answer has parentheses like "NAME (in STATE)", the distractors must also have parentheses "OTHER NAME (in OTHER STATE)".
Do not change the factual meaning of the distractors, just change their formatting to match the answer's format perfectly.

Input questions:
${JSON.stringify(batch.map(q => {
  const distractors = q.options.filter(o => o !== q.answer);
  return { id: q.id, question: q.question, answer: q.answer, distractors: distractors };
}), null, 2)}

Output format:
Return ONLY a raw JSON array of objects with no markdown formatting or backticks. Each object must have:
- "id": The exact same ID as the input question.
- "distractors": An array of exactly 3 string values (the formatted distractors).

Example output:
[
  { "id": "land-1", "distractors": ["DISTRACTOR A", "DISTRACTOR B", "DISTRACTOR C"] }
]`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
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
      
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(categoryQuestions.length / batchSize)} for category ${category}...`);
      const results = await fixDistractorsFormatBatch(batch);
      
      if (results && Array.isArray(results)) {
        for (const res of results) {
          const q = categoryQuestions.find(q => q.id === res.id);
          if (q && res.distractors && res.distractors.length === 3) {
            // Combine answer with new distractors and shuffle
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
  
  console.log('All questions formatted successfully!');
}

processQuestions();
