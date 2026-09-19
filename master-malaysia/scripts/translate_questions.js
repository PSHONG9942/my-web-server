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

const outMsFile = path.join(__dirname, '../src/data/questions_ms.json');
const outZhFile = path.join(__dirname, '../src/data/questions_zh.json');

// Initialize output files if they don't exist
let msData = fs.existsSync(outMsFile) ? JSON.parse(fs.readFileSync(outMsFile, 'utf8')) : {};
let zhData = fs.existsSync(outZhFile) ? JSON.parse(fs.readFileSync(outZhFile, 'utf8')) : {};

async function translateBatch(batch) {
  const prompt = `You are a professional translator for a trivia game. Translate the following multiple-choice questions from English into Malay (Bahasa Melayu) and Simplified Chinese. 
Ensure the options are translated accurately and the correct answer perfectly matches one of the options.

Input questions:
${JSON.stringify(batch.map(q => ({ id: q.id, question: q.question, answer: q.answer, options: q.options })), null, 2)}

Output format:
Return ONLY a raw JSON array of objects with no markdown formatting or backticks. Each object must have:
- "id": The exact same ID as the input question.
- "ms": A JSON object containing "question", "answer", and "options" (array of 4 strings) translated into Malay.
- "zh": A JSON object containing "question", "answer", and "options" (array of 4 strings) translated into Simplified Chinese.

Example output:
[
  { 
    "id": "land-1", 
    "ms": { "question": "Soalan?", "answer": "Jawapan", "options": ["Jawapan", "B", "C", "D"] },
    "zh": { "question": "问题？", "answer": "答案", "options": ["答案", "乙", "丙", "丁"] }
  }
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
    console.error('Error translating batch:', error);
    return null;
  }
}

async function processTranslations() {
  let totalProcessed = 0;
  
  for (const category in questionsData) {
    if (!msData[category]) msData[category] = [];
    if (!zhData[category]) zhData[category] = [];
    
    const categoryQuestions = questionsData[category];
    const batchSize = 10; // Smaller batch size for translation to avoid token limits
    
    for (let i = 0; i < categoryQuestions.length; i += batchSize) {
      const batch = categoryQuestions.slice(i, i + batchSize);
      
      // Check if this batch is already fully translated
      const needsTranslation = batch.some(q => 
        !msData[category].find(t => t.id === q.id) || 
        !zhData[category].find(t => t.id === q.id)
      );
      
      if (!needsTranslation) {
        totalProcessed += batch.length;
        continue;
      }
      
      console.log(`Translating batch ${Math.floor(i / batchSize) + 1} for category ${category}...`);
      const results = await translateBatch(batch);
      
      if (results && Array.isArray(results)) {
        for (const res of results) {
          if (res.ms && res.ms.question) {
            const existingMs = msData[category].findIndex(t => t.id === res.id);
            if (existingMs >= 0) msData[category][existingMs] = { id: res.id, ...res.ms };
            else msData[category].push({ id: res.id, ...res.ms });
          }
          if (res.zh && res.zh.question) {
            const existingZh = zhData[category].findIndex(t => t.id === res.id);
            if (existingZh >= 0) zhData[category][existingZh] = { id: res.id, ...res.zh };
            else zhData[category].push({ id: res.id, ...res.zh });
          }
        }
        
        fs.writeFileSync(outMsFile, JSON.stringify(msData, null, 2));
        fs.writeFileSync(outZhFile, JSON.stringify(zhData, null, 2));
        
        totalProcessed += batch.length;
        console.log(`Saved translation progress. Processed ${totalProcessed} questions.`);
      } else {
        console.log('Failed to parse response, retrying in 5s...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        i -= batchSize; // Retry
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('All translations completed successfully!');
}

processTranslations();
