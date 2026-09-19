import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
ai.models.list().then(res => {
  let output = '';
  // res is an iterable or array-like
  if (res.items) {
    res.items.forEach(m => output += m.name + '\n');
  } else if (Array.isArray(res)) {
    res.forEach(m => output += m.name + '\n');
  } else {
    // it seems like res[0], res[1] ... exist
    let i = 0;
    while(res[i]) {
      output += res[i].name + '\n';
      i++;
    }
  }
  fs.writeFileSync('models.txt', output);
  console.log('done');
}).catch(console.error);
