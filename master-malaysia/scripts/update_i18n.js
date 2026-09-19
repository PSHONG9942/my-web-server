import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const langs = ['en', 'ms', 'zh'];

const data = {
  en: {
    "modal.rolling": "🎲 Rolling Dice... 🎲",
    "modal.diceResult": "Dice Result",
    "modal.doubles": "Doubles!",
    "modal.scoreCalc": "Score Calculation",
    "modal.totalEarned": "Total Earned:",
    "modal.drawing": "Drawing card...",
    "modal.riskArea": "RISK AREA!",
    "modal.riskPrompt": "You landed on a Risk Area! Do you want to risk answering a General Question for points?",
    "modal.warning": "WARNING: If you are wrong, you will LOSE points!",
    "modal.takeRisk": "Take the Risk",
    "modal.playSafe": "Play it Safe",
    "modal.question": "{category} Question",
    "modal.reveal": "Reveal Answer",
    "modal.didGetRight": "Did they get it right?",
    "modal.correctBtn": "Correct",
    "modal.incorrectBtn": "Incorrect",
    "modal.correct": "Correct!",
    "modal.incorrect": "Incorrect!",
    "modal.correctAnswerWas": "The correct answer was:",
    "modal.turnOver": "Turn Over!",
    "modal.nextPlayer": "Score updated. Next player's turn...",
    "inst.title": "How to Play Master Malaysia",
    "inst.back": "Back",
    "inst.obj.title": "Objective",
    "inst.obj.desc": "The goal is to travel through all 52 spaces of the board by answering questions correctly, accumulating the highest score possible. Players traverse Steps 1 to 12, land on Corner 1, then Steps 13 to 24, Corner 2, and so on.",
    "inst.mov.title": "Movement",
    "inst.mov.desc": "Players move exactly 1 step sequentially each round. The dice are not used for movement. Instead, they are used to determine your base points and trigger specific board tile rules.",
    "inst.score.title": "Scoring",
    "inst.score.desc1": "Every step you land on has a specific rule (e.g. \"DICE SCORE > 5\"). When you answer a question correctly, you collect your dice roll as base points, plus an Even/Odd bonus (10 points for even steps, 20 for odd steps), plus any bonuses described on the tile.",
    "inst.score.desc2": "If you answer incorrectly, you lose points according to the tile rules and earn no bonuses.",
    "inst.risk.title": "Risk Areas (Corners)",
    "inst.risk.desc": "After every 12 steps, players land on a purple Risk Area corner. Here, players can choose to take a Risk by answering a General Question for big points (+100 or -100). If you skip the risk, you earn 0 points for that round and safely move on."
  },
  ms: {
    "modal.rolling": "🎲 Membaling Dadu... 🎲",
    "modal.diceResult": "Keputusan Dadu",
    "modal.doubles": "Berganda!",
    "modal.scoreCalc": "Pengiraan Markah",
    "modal.totalEarned": "Jumlah Diperolehi:",
    "modal.drawing": "Menarik kad...",
    "modal.riskArea": "KAWASAN RISIKO!",
    "modal.riskPrompt": "Anda mendarat di Kawasan Risiko! Adakah anda ingin mengambil risiko menjawab Soalan Umum untuk mata?",
    "modal.warning": "AMARAN: Jika anda salah, anda akan HILANG mata!",
    "modal.takeRisk": "Ambil Risiko",
    "modal.playSafe": "Main Selamat",
    "modal.question": "Soalan {category}",
    "modal.reveal": "Dedahkan Jawapan",
    "modal.didGetRight": "Adakah mereka menjawab dengan betul?",
    "modal.correctBtn": "Betul",
    "modal.incorrectBtn": "Salah",
    "modal.correct": "Betul!",
    "modal.incorrect": "Salah!",
    "modal.correctAnswerWas": "Jawapan yang betul ialah:",
    "modal.turnOver": "Giliran Tamat!",
    "modal.nextPlayer": "Markah dikemas kini. Giliran pemain seterusnya...",
    "inst.title": "Cara Bermain Master Malaysia",
    "inst.back": "Kembali",
    "inst.obj.title": "Objektif",
    "inst.obj.desc": "Matlamat permainan ini adalah untuk melepasi kesemua 52 ruang papan dengan menjawab soalan dengan betul, dan mengumpul markah tertinggi. Pemain melalui Langkah 1 hingga 12, mendarat di Sudut 1, kemudian Langkah 13 hingga 24, Sudut 2, dan seterusnya.",
    "inst.mov.title": "Pergerakan",
    "inst.mov.desc": "Pemain bergerak tepat 1 langkah berturut-turut setiap pusingan. Dadu tidak digunakan untuk pergerakan. Sebaliknya, ia digunakan untuk menentukan markah asas anda dan mencetuskan peraturan jubin papan tertentu.",
    "inst.score.title": "Pemarkahan",
    "inst.score.desc1": "Setiap langkah yang anda pijak mempunyai peraturan tertentu (cth. \"MARKAH DADU > 5\"). Apabila anda menjawab soalan dengan betul, anda mengumpul balingan dadu anda sebagai markah asas, ditambah bonus Genap/Ganjil (10 mata untuk langkah genap, 20 untuk langkah ganjil), serta sebarang bonus yang diterangkan pada jubin.",
    "inst.score.desc2": "Jika anda menjawab dengan salah, anda kehilangan mata mengikut peraturan jubin dan tidak mendapat sebarang bonus.",
    "inst.risk.title": "Kawasan Risiko (Sudut)",
    "inst.risk.desc": "Selepas setiap 12 langkah, pemain mendarat di sudut ungu Kawasan Risiko. Di sini, pemain boleh memilih untuk mengambil Risiko dengan menjawab Soalan Umum untuk mata besar (+100 atau -100). Jika anda melangkau risiko, anda mendapat 0 mata untuk pusingan tersebut dan bergerak dengan selamat."
  },
  zh: {
    "modal.rolling": "🎲 掷骰子中... 🎲",
    "modal.diceResult": "骰子结果",
    "modal.doubles": "双倍！",
    "modal.scoreCalc": "分数计算",
    "modal.totalEarned": "获得总分:",
    "modal.drawing": "抽卡中...",
    "modal.riskArea": "风险区域！",
    "modal.riskPrompt": "您降落在了风险区域！您想冒险回答一个常识问题以获得分数吗？",
    "modal.warning": "警告：如果回答错误，您将扣分！",
    "modal.takeRisk": "冒险",
    "modal.playSafe": "稳扎稳打",
    "modal.question": "{category} 问题",
    "modal.reveal": "显示答案",
    "modal.didGetRight": "他们答对了吗？",
    "modal.correctBtn": "正确",
    "modal.incorrectBtn": "错误",
    "modal.correct": "正确！",
    "modal.incorrect": "错误！",
    "modal.correctAnswerWas": "正确答案是：",
    "modal.turnOver": "回合结束！",
    "modal.nextPlayer": "分数已更新。下一位玩家的回合...",
    "inst.title": "如何游玩 马来西亚大师",
    "inst.back": "返回",
    "inst.obj.title": "目标",
    "inst.obj.desc": "目标是通过正确回答问题走遍棋盘的所有52个格子，积累最高的分数。玩家走过第1到12步，落在1号角落，然后是第13到24步，2号角落，依此类推。",
    "inst.mov.title": "移动",
    "inst.mov.desc": "玩家在每一回合中必须按顺序移动恰好1步。骰子不用于移动，而是用于确定您的基础分数并触发特定的棋盘格子规则。",
    "inst.score.title": "计分",
    "inst.score.desc1": "您停留的每一步都有特定的规则（例如“骰子分数 > 5”）。当您正确回答一个问题时，您将收集骰子分数作为基础分数，加上奇偶奖励（偶数步10分，奇数步20分），以及格子上描述的任何额外奖励。",
    "inst.score.desc2": "如果您回答错误，您将根据格子规则失去分数，并且无法获得任何奖励。",
    "inst.risk.title": "风险区域（角落）",
    "inst.risk.desc": "每走过12步，玩家将落在一个紫色的风险区域角落。在这里，玩家可以选择冒险回答一个常识问题以获取高分（+100或-100）。如果您跳过风险，您在该回合将获得0分并安全前进。"
  }
};

for (const lang of langs) {
  const filePath = path.join(__dirname, '../src/i18n/' + lang + '.json');
  const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const newData = { ...fileData, ...data[lang] };
  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
}

console.log('i18n files updated successfully.');
