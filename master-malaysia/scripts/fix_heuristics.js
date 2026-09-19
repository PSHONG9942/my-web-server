import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsFile = path.join(__dirname, '../src/data/questions.json');
const questionsData = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function isAllCaps(str) {
  return str === str.toUpperCase() && /[A-Z]/.test(str);
}

function isTitleCase(str) {
  if (!/[a-z]/.test(str)) return false;
  const words = str.split(' ');
  return words.every(w => {
    if (w.length === 0) return true;
    if (w.length <= 3 && ['in', 'the', 'of', 'and', 'to', 'a'].includes(w.toLowerCase())) return true;
    return w[0] === w[0].toUpperCase();
  });
}

function toTitleCase(str) {
  return str.split(' ').map((w, i) => {
    if (i > 0 && w.length <= 3 && ['in', 'the', 'of', 'and', 'to', 'a'].includes(w.toLowerCase())) return w.toLowerCase();
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(' ');
}

// Simple date parser for the examples user gave
function extractDate(str) {
  // Matches "13th Jun 1975", "APR 1990", "October 13th 2019", "May 2025"
  const yearMatch = str.match(/\b(19\d{2}|20\d{2})\b/);
  if (!yearMatch) return null;
  const year = yearMatch[1];
  
  let monthIndex = -1;
  const lowerStr = str.toLowerCase();
  for (let i = 0; i < MONTHS.length; i++) {
    if (lowerStr.includes(MONTHS[i].toLowerCase())) {
      monthIndex = i;
      break;
    }
  }
  if (monthIndex === -1) {
    for (let i = 0; i < MONTHS_SHORT.length; i++) {
      if (lowerStr.includes(MONTHS_SHORT[i].toLowerCase())) {
        monthIndex = i;
        break;
      }
    }
  }
  if (monthIndex === -1) return null;
  
  const dayMatch = str.match(/\b(\d{1,2})(st|nd|rd|th)?\b/);
  const day = dayMatch && dayMatch[1] !== year ? parseInt(dayMatch[1]) : null;
  
  return { year, monthIndex, day };
}

function formatDate(dateObj, templateStr) {
  let res = templateStr;
  
  // Replace month
  const templateHasFullMonth = MONTHS.some(m => templateStr.toLowerCase().includes(m.toLowerCase()));
  const templateHasShortMonth = MONTHS_SHORT.some(m => templateStr.toLowerCase().includes(m.toLowerCase()));
  
  let monthStr = MONTHS[dateObj.monthIndex];
  if (templateHasFullMonth) {
    // try to preserve case
    if (isAllCaps(templateStr)) monthStr = monthStr.toUpperCase();
  } else if (templateHasShortMonth) {
    monthStr = MONTHS_SHORT[dateObj.monthIndex];
    if (isAllCaps(templateStr)) monthStr = monthStr.toUpperCase();
  }
  
  // If template only has Month Year
  if (!templateStr.match(/\b\d{1,2}(st|nd|rd|th)?\b/)) {
     return `${monthStr} ${dateObj.year}`;
  } else {
     // Template has day
     const day = dateObj.day || 1;
     // simple replacement
     let suffix = "th";
     if (day % 10 === 1 && day !== 11) suffix = "st";
     else if (day % 10 === 2 && day !== 12) suffix = "nd";
     else if (day % 10 === 3 && day !== 13) suffix = "rd";
     
     // check if template uses suffix
     if (templateStr.match(/\b\d{1,2}(st|nd|rd|th)\b/i)) {
       return `${day}${suffix} ${monthStr} ${dateObj.year}`;
     } else {
       return `${day} ${monthStr} ${dateObj.year}`;
     }
  }
}


function processQuestions() {
  let changesCount = 0;
  
  for (const category in questionsData) {
    for (const q of questionsData[category]) {
      const answer = q.answer;
      if (!q.options) continue;
      
      let changed = false;
      const newOptions = q.options.map(opt => {
        if (opt === answer) return opt;
        let newOpt = opt;
        
        // Fix capitalization
        if (isAllCaps(answer) && !isAllCaps(opt)) {
          newOpt = newOpt.toUpperCase();
        } else if (isTitleCase(answer) && isAllCaps(opt)) {
          newOpt = toTitleCase(newOpt);
        }
        
        // Fix dates
        const ansDate = extractDate(answer);
        if (ansDate) {
          const optDate = extractDate(newOpt);
          if (optDate) {
            newOpt = formatDate(optDate, answer);
          }
        }
        
        if (newOpt !== opt) changed = true;
        return newOpt;
      });
      
      if (changed) {
        q.options = newOptions;
        changesCount++;
      }
    }
  }
  
  fs.writeFileSync(questionsFile, JSON.stringify(questionsData, null, 2));
  console.log(`Successfully processed and updated ${changesCount} questions with heuristic formatting fixes.`);
}

processQuestions();
