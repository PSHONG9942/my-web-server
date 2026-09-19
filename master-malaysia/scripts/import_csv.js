import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../questions_template.csv');
const outputFile = path.join(__dirname, '../src/data/questions.json');

if (!fs.existsSync(inputFile)) {
  console.error(`\n❌ Error: Could not find ${inputFile}.`);
  console.error(`Please ensure your file is named 'questions.csv' and is placed in the root of the 'master-malaysia' folder.\n`);
  process.exit(1);
}

const results = {};
let count = 0;

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (data) => {
    // Expected headers: Category, Question, Answer
    let category = data.Category?.trim().toLowerCase();
    const questionText = data.Question?.trim();
    const answerText = data.Answer?.trim();

    if (category && questionText && answerText) {
      if (!results[category]) {
        results[category] = [];
      }
      
      results[category].push({
        id: `${category}-${results[category].length + 1}`,
        question: questionText,
        answer: answerText
      });
      count++;
    }
  })
  .on('end', () => {
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log(`\n✅ Successfully imported ${count} questions!`);
    console.log(`✅ Saved directly to ${outputFile}`);
    console.log(`📂 Categories generated: ${Object.keys(results).join(', ')}\n`);
  });
