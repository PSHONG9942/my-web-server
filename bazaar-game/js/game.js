/**
 * 小小义卖会 · 一年级钱币交易游戏核心逻辑
 */
(function (global) {
  "use strict";

  const M = global.BazaarMoney;
  const A = global.BazaarAudio;

  const STORAGE_KEY_CFG = "bazaar_game_config_v3";
  const STORAGE_KEY_STARS = "bazaar_game_stars_v1";

  const CUSTOMER_PERSONAS = [
    { name: "小兔琪琪", avatar: "🐰" },
    { name: "熊猫小乐", avatar: "🐼" },
    { name: "小熊豆豆", avatar: "🐻" },
    { name: "小狐狸米米", avatar: "🦊" },
    { name: "小青蛙呱呱", avatar: "🐸" },
    { name: "小狮子阿勇", avatar: "🦁" },
    { name: "班长小明", avatar: "👦" },
    { name: "同学小美", avatar: "👧" },
  ];

  const STICKER_POOL = ["🌟", "🏅", "🎈", "🍰", "🐼", "🚀", "🌈", "👑", "🎁", "🦋"];
  const TEACHER_EMOJIS = [
    "🍢", "🥟", "🍨", "🍩", "🍬", "🍭", "🍪", "🍰",
    "🎂", "🍜", "🌭", "🍔", "🍟", "🍕", "🍱", "🍗",
    "🥪", "🍿", "🍮", "🍞", "🍡", "🥨", "🥐", "🥞",
    "🍙", "🌮", "🍖", "🍣", "🍫", "🥛", "🥤", "🍉",
    "🍎", "🍦", "🍧", "🥥", "🍵", "🍋", "🍓", "☕",
    "🌸", "✏️", "📐", "📏", "🎨", "📓", "🖍️", "✂️",
    "🖊️", "📚", "🐻", "🎈", "🌈", "🎮", "🎲", "🎯",
    "🎏", "🚀", "🏀", "🦖", "⚽", "🏸", "🚲", "🛴",
    "🎸", "🤖", "🚂", "🏰", "🌵", "🎒", "☂️", "🎀",
    "🍇", "🎁", "🍯", "🎧", "⌚", "📷", "💼", "💐",
  ];

  const PRAISE_LIST = [
    "太棒了！你算得真准！",
    "哇，好厉害的小数学家！",
    "答对啦，给你一颗大星星！",
    "真聪明！完全正确！",
    "太赞了，义卖会小能手就是你！",
  ];

  const DEFAULT_CONFIG = {
    version: 3,
    stallName: "一年级小小义卖会",
    schoolName: "培青华小",
    items: [
      // ⭐ 1星（20组：整数 RM 1 ~ RM 10）
      { id: "item-101", name: "鱼丸串", emoji: "🍢", category: "美食", priceSen: 100 },
      { id: "item-102", name: "卡通铅笔", emoji: "✏️", category: "文具玩具", priceSen: 100 },
      { id: "item-103", name: "咖喱卜", emoji: "🥟", category: "美食", priceSen: 200 },
      { id: "item-104", name: "造型三角尺", emoji: "📐", category: "文具玩具", priceSen: 200 },
      { id: "item-105", name: "冰淇淋圣代", emoji: "🍨", category: "美食", priceSen: 300 },
      { id: "item-106", name: "冰美禄牛奶", emoji: "🥛", category: "饮料", priceSen: 300 },
      { id: "item-107", name: "炒米粉", emoji: "🍜", category: "美食", priceSen: 400 },
      { id: "item-108", name: "热狗面包", emoji: "🌭", category: "美食", priceSen: 400 },
      { id: "item-109", name: "迷你小熊偶", emoji: "🐻", category: "文具玩具", priceSen: 500 },
      { id: "item-110", name: "冰镇西瓜杯", emoji: "🍉", category: "饮料", priceSen: 300 },
      { id: "item-111", name: "香脆炸鸡块", emoji: "🍗", category: "美食", priceSen: 600 },
      { id: "item-112", name: "小汉堡包", emoji: "🍔", category: "美食", priceSen: 500 },
      { id: "item-113", name: "黄金薯条", emoji: "🍟", category: "美食", priceSen: 400 },
      { id: "item-114", name: "鲜榨苹果杯", emoji: "🍎", category: "饮料", priceSen: 200 },
      { id: "item-115", name: "氦气卡通球", emoji: "🎈", category: "文具玩具", priceSen: 300 },
      { id: "item-116", name: "卡通直尺", emoji: "📏", category: "文具玩具", priceSen: 200 },
      { id: "item-117", name: "彩色笔盒", emoji: "🎨", category: "文具玩具", priceSen: 800 },
      { id: "item-118", name: "多肉小盆栽", emoji: "🌵", category: "其它", priceSen: 700 },
      { id: "item-119", name: "迷你披萨", emoji: "🍕", category: "美食", priceSen: 900 },
      { id: "item-120", name: "爱心便当", emoji: "🍱", category: "美食", priceSen: 1000 },
      // ⭐⭐ 2星新增（20组，含 10/20/50 仙，累计 40 组）
      { id: "item-201", name: "水果软糖", emoji: "🍬", category: "美食", priceSen: 50 },
      { id: "item-202", name: "彩虹棒棒糖", emoji: "🍭", category: "美食", priceSen: 80 },
      { id: "item-203", name: "冰凉菊花茶", emoji: "🥤", category: "饮料", priceSen: 150 },
      { id: "item-204", name: "巧克力曲奇", emoji: "🍪", category: "美食", priceSen: 120 },
      { id: "item-205", name: "糖霜甜甜圈", emoji: "🍩", category: "美食", priceSen: 250 },
      { id: "item-206", name: "香草甜筒", emoji: "🍦", category: "饮料", priceSen: 220 },
      { id: "item-207", name: "彩色红豆冰", emoji: "🍧", category: "饮料", priceSen: 350 },
      { id: "item-208", name: "卡通笔记本", emoji: "📓", category: "文具玩具", priceSen: 350 },
      { id: "item-209", name: "彩虹泡泡水", emoji: "🌈", category: "文具玩具", priceSen: 450 },
      { id: "item-210", name: "鸡蛋三明治", emoji: "🥪", category: "美食", priceSen: 320 },
      { id: "item-211", name: "焦糖爆米花", emoji: "🍿", category: "美食", priceSen: 280 },
      { id: "item-212", name: "鲜甜椰子水", emoji: "🥥", category: "饮料", priceSen: 450 },
      { id: "item-213", name: "十二色蜡笔", emoji: "🖍️", category: "文具玩具", priceSen: 550 },
      { id: "item-214", name: "安全手工剪", emoji: "✂️", category: "文具玩具", priceSen: 420 },
      { id: "item-215", name: "芒果布丁", emoji: "🍮", category: "美食", priceSen: 380 },
      { id: "item-216", name: "奶油吐司片", emoji: "🍞", category: "美食", priceSen: 480 },
      { id: "item-217", name: "帆布环保袋", emoji: "🎒", category: "其它", priceSen: 1250 },
      { id: "item-218", name: "绘本故事书", emoji: "📚", category: "文具玩具", priceSen: 1400 },
      { id: "item-219", name: "折叠晴雨伞", emoji: "☂️", category: "其它", priceSen: 1650 },
      { id: "item-220", name: "掌上益智机", emoji: "🎮", category: "文具玩具", priceSen: 1850 },
      // ⭐⭐⭐ 3星新增（20组，含 5 仙与 RM 12~45，累计 60 组）
      { id: "item-301", name: "娘惹椰丝球", emoji: "🍡", category: "美食", priceSen: 125 },
      { id: "item-302", name: "咸香蝴蝶饼", emoji: "🥨", category: "美食", priceSen: 175 },
      { id: "item-303", name: "牛油可颂包", emoji: "🥐", category: "美食", priceSen: 235 },
      { id: "item-304", name: "冰镇绿茶", emoji: "🍵", category: "饮料", priceSen: 215 },
      { id: "item-305", name: "蜂蜜柠檬饮", emoji: "🍋", category: "饮料", priceSen: 265 },
      { id: "item-306", name: "草莓牛奶杯", emoji: "🍓", category: "饮料", priceSen: 345 },
      { id: "item-307", name: "蜂蜜松饼", emoji: "🥞", category: "美食", priceSen: 475 },
      { id: "item-308", name: "吞拿鱼饭团", emoji: "🍙", category: "美食", priceSen: 315 },
      { id: "item-309", name: "鸡肉脆卷饼", emoji: "🌮", category: "美食", priceSen: 585 },
      { id: "item-310", name: "卡通水彩笔", emoji: "🖊️", category: "文具玩具", priceSen: 625 },
      { id: "item-311", name: "趣味飞行棋", emoji: "🎲", category: "文具玩具", priceSen: 1275 },
      { id: "item-312", name: "草莓蛋糕盒", emoji: "🍰", category: "美食", priceSen: 1555 },
      { id: "item-313", name: "磁铁飞镖盘", emoji: "🎯", category: "文具玩具", priceSen: 895 },
      { id: "item-314", name: "彩色鲤鱼旗", emoji: "🎏", category: "文具玩具", priceSen: 2250 },
      { id: "item-315", name: "手工蝴蝶结", emoji: "🎀", category: "其它", priceSen: 2400 },
      { id: "item-316", name: "太空积木盒", emoji: "🚀", category: "文具玩具", priceSen: 2850 },
      { id: "item-317", name: "儿童小篮球", emoji: "🏀", category: "文具玩具", priceSen: 3200 },
      { id: "item-318", name: "恐龙模型组", emoji: "🦖", category: "文具玩具", priceSen: 3495 },
      { id: "item-319", name: "义卖水果篮", emoji: "🍇", category: "其它", priceSen: 3850 },
      { id: "item-320", name: "义卖爱心礼包", emoji: "🎁", category: "其它", priceSen: 4500 },
      // ⭐⭐⭐⭐ 4星新增（20组，RM 46.50 ~ RM 95，累计 80 组）
      { id: "item-401", name: "义卖生日蛋糕", emoji: "🎂", category: "美食", priceSen: 4800 },
      { id: "item-402", name: "家庭烤鸡桶", emoji: "🍖", category: "美食", priceSen: 5250 },
      { id: "item-403", name: "豪华寿司拼盘", emoji: "🍣", category: "美食", priceSen: 5600 },
      { id: "item-404", name: "进口礼盒巧克", emoji: "🍫", category: "美食", priceSen: 4650 },
      { id: "item-405", name: "天然蜂蜜礼瓶", emoji: "🍯", category: "其它", priceSen: 5495 },
      { id: "item-406", name: "手冲咖啡礼盒", emoji: "☕", category: "饮料", priceSen: 5850 },
      { id: "item-407", name: "精致花茶礼组", emoji: "🌸", category: "饮料", priceSen: 6200 },
      { id: "item-408", name: "比赛级足球", emoji: "⚽", category: "文具玩具", priceSen: 4995 },
      { id: "item-409", name: "羽毛球拍双支", emoji: "🏸", category: "文具玩具", priceSen: 6450 },
      { id: "item-410", name: "儿童小单车", emoji: "🚲", category: "文具玩具", priceSen: 7800 },
      { id: "item-411", name: "折叠滑板车", emoji: "🛴", category: "文具玩具", priceSen: 8850 },
      { id: "item-412", name: "迷你尤克里里", emoji: "🎸", category: "文具玩具", priceSen: 7200 },
      { id: "item-413", name: "儿童学习耳机", emoji: "🎧", category: "其它", priceSen: 6895 },
      { id: "item-414", name: "卡通电子手表", emoji: "⌚", category: "其它", priceSen: 5500 },
      { id: "item-415", name: "儿童拍立得机", emoji: "📷", category: "其它", priceSen: 8500 },
      { id: "item-416", name: "遥控机器人", emoji: "🤖", category: "文具玩具", priceSen: 7550 },
      { id: "item-417", name: "电动小火车组", emoji: "🚂", category: "文具玩具", priceSen: 8200 },
      { id: "item-418", name: "城堡大积木盒", emoji: "🏰", category: "文具玩具", priceSen: 9200 },
      { id: "item-419", name: "卡通手提箱", emoji: "💼", category: "其它", priceSen: 9500 },
      { id: "item-420", name: "感恩义卖花束", emoji: "💐", category: "其它", priceSen: 6500 },
    ],
  };

  const state = {
    config: JSON.parse(JSON.stringify(DEFAULT_CONFIG)),
    difficulty: 1,
    assistMode: true,
    voiceEnabled: true,
    stars: 0,
    activeView: "home",

    // Level 1
    countTab: "learn",
    selectedLearnId: "rm1",
    activeMagicIdx: 0,
    countCorrect: 0,
    countQuiz: {
      tokens: [],
      countedMap: {},
      targetSen: 0,
      choices: [],
      solved: false,
    },

    // Level 2
    payState: {
      items: [],
      targetSen: 0,
      placed: [],
      hintDenId: null,
      solved: false,
    },

    // Level 3
    changeState: {
      customer: CUSTOMER_PERSONAS[0],
      items: [],
      priceSen: 0,
      paidTokens: [],
      paidSen: 0,
      changeTargetSen: 0,
      placed: [],
      hintDenId: null,
      solved: false,
    },

    // Level 4
    rpMode: "shopkeeper",
    rpShop: {
      revenueSen: 0,
      servedCount: 0,
      stickers: [],
      catFilter: "all",
      customer: CUSTOMER_PERSONAS[1],
      orderItems: [],
      orderTotalSen: 0,
      bagItems: [],
      stage: "pack", // "pack" | "pay" | "done"
      paidTokens: [],
      paidSen: 0,
      needChangeSen: 0,
      changePlaced: [],
      hintDenId: null,
      changeRevealed: false,
    },
    rpCust: {
      catFilter: "all",
      wallet: [], // array of den objects
      basket: [], // array of {item, qty}
      bought: [], // array of {name, emoji}
      inCheckout: false,
      payMat: [], // array of {walletIdx, den}
    },

    // Teacher modal draft
    teacherDraft: null,
  };

  // ==================== Helpers ====================
  function $(id) {
    return document.getElementById(id);
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function sumTokens(tokens) {
    return tokens.reduce((acc, t) => acc + t.valueSen, 0);
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /**
   * Filter menu items suitable for the current difficulty.
   * Ensures Level 1 always gets integer RM items <= RM10 (adapting gracefully if custom menu has none).
   */
  function getItemsForDifficulty(level) {
    const lv = level || state.difficulty;
    const rule = M.DIFFICULTY_LEVELS[lv];
    const items = state.config.items || [];
    const matched = items.filter(
      (it) => it.priceSen > 0 && it.priceSen <= rule.maxPriceSen && it.priceSen % rule.stepSen === 0
    );
    if (matched.length >= 3) {
      return matched;
    }
    // Fallback: adapt prices smoothly to the level step so custom menus never break Level 1
    return items.slice(0, 8).map((it) => {
      let p = Math.min(rule.maxPriceSen, Math.max(rule.stepSen, Math.round(it.priceSen / rule.stepSen) * rule.stepSen));
      if (p < rule.stepSen) p = rule.stepSen;
      return { ...it, priceSen: p };
    });
  }

  function awardStars(count, customMsg) {
    state.stars += count;
    try {
      localStorage.setItem(STORAGE_KEY_STARS, String(state.stars));
    } catch (_) {}
    $("star-count").textContent = String(state.stars);
    triggerConfetti();
    showToast(customMsg || pickRandom(PRAISE_LIST));
  }

  function showToast(msg) {
    const el = $("toast-banner");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => el.classList.remove("show"), 2500);
  }

  function triggerConfetti() {
    const layer = $("confetti-layer");
    const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];
    for (let i = 0; i < 24; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * 0.35}s`;
      layer.appendChild(piece);
      setTimeout(() => piece.remove(), 1900);
    }
  }

  function setFeedback(elId, type, text) {
    const el = $(elId);
    if (!el) return;
    if (!text) {
      el.className = "feedback-banner";
      el.textContent = "";
      return;
    }
    el.className = `feedback-banner show ${type}`;
    el.textContent = text;
  }

  // ==================== Config Loading & Saving ====================
  async function loadConfig() {
    try {
      const savedStars = parseInt(localStorage.getItem(STORAGE_KEY_STARS) || "0", 10);
      if (!Number.isNaN(savedStars) && savedStars >= 0) state.stars = savedStars;
    } catch (_) {}
    $("star-count").textContent = String(state.stars);

    try {
      const cached = localStorage.getItem(STORAGE_KEY_CFG);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
          state.config = parsed;
        }
      }
    } catch (_) {}
    applyHeaderBranding();
  }

  function applyHeaderBranding() {
    $("header-stall-name").textContent = `🎪 ${state.config.stallName || "一年级小小义卖会"}`;
    $("header-school-name").textContent = state.config.schoolName || "培青华小";
  }

  // ==================== Navigation & Global Toggles ====================
  function switchView(viewName) {
    state.activeView = viewName;
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    const target = $(`view-${viewName}`);
    if (target) target.classList.add("active");

    if (viewName === "home") renderHome();
    if (viewName === "count") renderCountView();
    if (viewName === "pay") initPayRound();
    if (viewName === "change") initChangeRound();
    if (viewName === "roleplay") renderRoleplayView();
  }

  function setDifficulty(level) {
    state.difficulty = Math.max(1, Math.min(4, Number(level) || 1));
    document.querySelectorAll(".diff-btn").forEach((btn) => {
      btn.classList.toggle("active", Number(btn.dataset.level) === state.difficulty);
    });
    const allowed = M.getAllowedDenominations(state.difficulty);
    if (!allowed.some((d) => d.id === state.selectedLearnId)) {
      state.selectedLearnId = allowed[allowed.length - 1].id;
    }

    if (state.activeView === "home") renderHome();
    if (state.activeView === "count") renderCountView();
    if (state.activeView === "pay") initPayRound();
    if (state.activeView === "change") initChangeRound();
    if (state.activeView === "roleplay") {
      if (state.rpMode === "shopkeeper") {
        initShopkeeperCustomer();
      } else {
        initCustomerWallet();
      }
    }
    const lv = M.DIFFICULTY_LEVELS[state.difficulty];
    A.speak(`已切换到${lv.name}难度`);
  }

  function toggleAssist() {
    state.assistMode = !state.assistMode;
    const btn = $("btn-assist");
    btn.classList.toggle("is-on", state.assistMode);
    btn.textContent = state.assistMode ? "💡 提示:开" : "💡 提示:关";
    if (state.activeView === "count" && state.countTab === "quiz") updateCountAssistSum();
    if (state.activeView === "pay") updatePayMatUI();
    if (state.activeView === "change") updateChangeUI();
    if (state.activeView === "roleplay") renderRoleplayCashierMath();
  }

  function toggleVoice() {
    state.voiceEnabled = !state.voiceEnabled;
    A.setVoiceEnabled(state.voiceEnabled);
    A.setSoundEnabled(state.voiceEnabled);
    const btn = $("btn-voice");
    btn.classList.toggle("is-on", state.voiceEnabled);
    btn.textContent = state.voiceEnabled ? "🔊 语音:开" : "🔇 语音:关";
    if (state.voiceEnabled) {
      A.playCoin();
      A.speak("语音小助手已经打开啦");
    }
  }

  // ==================== Home Plaza ====================
  function renderHome() {
    const lv = M.DIFFICULTY_LEVELS[state.difficulty];
    const unlockedCount = getItemsForDifficulty(state.difficulty).length;
    $("home-level-desc").textContent = `当前难度：${lv.starsText}（${lv.name}）· ${lv.shortDesc} · 已解锁 ${unlockedCount} 样商品`;
    const allowed = M.getAllowedDenominations(state.difficulty);
    $("home-money-preview").innerHTML = allowed
      .map((den) => M.renderMoneyTokenHTML(den, { size: "sm", tag: "button" }))
      .join("");
    $("home-money-preview").querySelectorAll(".money-token").forEach((el) => {
      el.addEventListener("click", () => {
        const den = M.getDenominationById(el.dataset.denId);
        if (!den) return;
        den.kind === "coin" ? A.playCoin() : A.playNote();
        A.speak(den.speech);
      });
    });
  }

  // ==================== Level 1: Learn & Count ====================
  const MAGIC_COMBOS = [
    { id: "m1", title: "2个 50仙 = RM 1", minLevel: 2, leftId: "sen50", count: 2, rightId: "rm1", speech: "两个五十仙，合起来等于一令吉！" },
    { id: "m2", title: "5个 20仙 = RM 1", minLevel: 2, leftId: "sen20", count: 5, rightId: "rm1", speech: "五个二十仙，合起来等于一令吉！" },
    { id: "m3", title: "5张 RM 1 = RM 5", minLevel: 1, leftId: "rm1", count: 5, rightId: "rm5", speech: "五张一令吉，可以换一张五令吉！" },
    { id: "m4", title: "2张 RM 5 = RM 10", minLevel: 1, leftId: "rm5", count: 2, rightId: "rm10", speech: "两张五令吉，合起来就是十令吉！" },
    { id: "m5", title: "2张 RM 10 = RM 20", minLevel: 2, leftId: "rm10", count: 2, rightId: "rm20", speech: "两张十令吉，合起来就是二十令吉！" },
    { id: "m6", title: "5张 RM 10 = RM 50", minLevel: 3, leftId: "rm10", count: 5, rightId: "rm50", speech: "五张十令吉，合起来就是五十令吉！" },
    { id: "m7", title: "2张 RM 50 = RM 100", minLevel: 4, leftId: "rm50", count: 2, rightId: "rm100", speech: "两张五十令吉，合起来就是一百令吉！" },
  ];

  function renderCountView() {
    document.querySelectorAll("[data-count-tab]").forEach((b) => {
      b.classList.toggle("active", b.dataset.countTab === state.countTab);
    });
    $("count-tab-learn").classList.toggle("active", state.countTab === "learn");
    $("count-tab-quiz").classList.toggle("active", state.countTab === "quiz");

    if (state.countTab === "learn") {
      renderLearnGallery();
      renderMagicExchange();
    } else if (!state.countQuiz.tokens.length) {
      initCountQuizRound();
    }
  }

  function renderLearnGallery() {
    const allowed = M.getAllowedDenominations(state.difficulty);
    const grid = $("learn-money-grid");
    grid.innerHTML = allowed
      .map((den) => {
        const active = den.id === state.selectedLearnId ? "active" : "";
        return `<button type="button" class="learn-tile ${active}" data-learn-id="${den.id}">
          ${M.renderMoneyTokenHTML(den, { size: "sm", tag: "div" })}
          <span>${den.label} · ${den.colorName}</span>
        </button>`;
      })
      .join("");

    grid.querySelectorAll(".learn-tile").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedLearnId = btn.dataset.learnId;
        const den = M.getDenominationById(state.selectedLearnId);
        if (den) {
          den.kind === "coin" ? A.playCoin() : A.playNote();
          A.speak(`${den.speech}，${den.desc}`);
        }
        renderLearnGallery();
        updateLearnSpotlight();
      });
    });

    updateLearnSpotlight();
  }

  function updateLearnSpotlight() {
    const den = M.getDenominationById(state.selectedLearnId) || M.getDenominationById("rm1");
    $("learn-spotlight-token").innerHTML = M.renderMoneyTokenHTML(den, { size: "lg", tag: "div" });
    $("learn-title").textContent = `${den.label}（${den.colorName}）`;
    $("learn-desc").textContent = den.desc;
  }

  function renderMagicExchange() {
    const combos = MAGIC_COMBOS.filter((c) => c.minLevel <= state.difficulty);
    if (state.activeMagicIdx >= combos.length) state.activeMagicIdx = 0;
    const btnsEl = $("magic-buttons");
    btnsEl.innerHTML = combos
      .map(
        (c, idx) =>
          `<button type="button" class="magic-btn ${idx === state.activeMagicIdx ? "active" : ""}" data-magic-idx="${idx}">${c.title}</button>`
      )
      .join("");

    btnsEl.querySelectorAll(".magic-btn").forEach((b) => {
      b.addEventListener("click", () => {
        state.activeMagicIdx = Number(b.dataset.magicIdx);
        const combo = combos[state.activeMagicIdx];
        A.playRegister();
        if (combo) A.speak(combo.speech);
        renderMagicExchange();
      });
    });

    const active = combos[state.activeMagicIdx];
    if (!active) return;
    const leftDen = M.getDenominationById(active.leftId);
    const rightDen = M.getDenominationById(active.rightId);
    const leftHtml = Array.from({ length: active.count })
      .map(() => M.renderMoneyTokenHTML(leftDen, { size: "xs", tag: "div" }))
      .join("");
    $("magic-visual").innerHTML = `${leftHtml}<span class="magic-eq">=</span>${M.renderMoneyTokenHTML(rightDen, { size: "sm", tag: "div" })}`;
  }

  function initCountQuizRound() {
    const allowed = M.getAllowedDenominations(state.difficulty);
    const tokenPool = [];
    const maxTokens = state.difficulty === 1 ? 5 : 6;
    const count = 2 + Math.floor(Math.random() * (maxTokens - 1));
    for (let i = 0; i < count; i++) {
      // Avoid generating absurdly huge totals on level 4; keep sums friendly for Year 1
      const candidates = allowed.filter((d) => (state.difficulty <= 2 ? true : d.valueSen <= 5000));
      tokenPool.push(pickRandom(candidates.length ? candidates : allowed));
    }
    tokenPool.sort((a, b) => b.valueSen - a.valueSen);
    const targetSen = sumTokens(tokenPool);

    // Build 3 plausible distractors using current level step
    const step = M.DIFFICULTY_LEVELS[state.difficulty].stepSen;
    const distractorSet = new Set([targetSen]);
    const offsets = state.difficulty === 1
      ? [-300, -200, -100, 100, 200, 300, 500]
      : [-500, -200, -100, -50, -20, 20, 50, 100, 200, 500];
    let guard = 0;
    while (distractorSet.size < 4 && guard < 50) {
      guard++;
      const off = pickRandom(offsets);
      const candidate = targetSen + off;
      if (candidate > 0 && candidate % step === 0) {
        distractorSet.add(candidate);
      }
    }
    while (distractorSet.size < 4) {
      distractorSet.add(targetSen + distractorSet.size * step);
    }

    state.countQuiz = {
      tokens: tokenPool,
      countedMap: {},
      targetSen,
      choices: shuffle(Array.from(distractorSet)),
      solved: false,
    };

    setFeedback("count-feedback", "", "");
    renderCountQuizMat();
    renderCountQuizChoices();
    updateCountAssistSum();
    A.speak(`请数一数，桌上一共有多少钱？`);
  }

  function renderCountQuizMat() {
    const mat = $("count-mat");
    mat.innerHTML = state.countQuiz.tokens
      .map((den, idx) =>
        M.renderMoneyTokenHTML(den, {
          size: "md",
          tag: "button",
          counted: Boolean(state.countQuiz.countedMap[idx]),
          attrs: `data-quiz-idx="${idx}"`,
        })
      )
      .join("");

    mat.querySelectorAll("[data-quiz-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.quizIdx);
        state.countQuiz.countedMap[idx] = !state.countQuiz.countedMap[idx];
        const den = state.countQuiz.tokens[idx];
        if (state.countQuiz.countedMap[idx]) {
          den.kind === "coin" ? A.playCoin() : A.playNote();
        } else {
          A.playRemove();
        }
        renderCountQuizMat();
        updateCountAssistSum();
      });
    });
  }

  function updateCountAssistSum() {
    const chip = $("count-assist-sum");
    if (!state.assistMode) {
      chip.classList.add("hidden");
      return;
    }
    chip.classList.remove("hidden");
    let sum = 0;
    state.countQuiz.tokens.forEach((t, idx) => {
      if (state.countQuiz.countedMap[idx]) sum += t.valueSen;
    });
    chip.textContent = `已点算：${M.formatRM(sum)}`;
  }

  function renderCountQuizChoices() {
    const grid = $("count-choices");
    grid.innerHTML = state.countQuiz.choices
      .map(
        (val) =>
          `<button type="button" class="choice-btn" data-choice-sen="${val}">${M.formatRM(val)}</button>`
      )
      .join("");

    grid.querySelectorAll(".choice-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.countQuiz.solved) return;
        const picked = Number(btn.dataset.choiceSen);
        if (picked === state.countQuiz.targetSen) {
          state.countQuiz.solved = true;
          state.countCorrect += 1;
          $("count-correct-num").textContent = String(state.countCorrect);
          btn.classList.add("is-correct");
          A.playSuccess();
          awardStars(1);
          const speech = `答对了！一共有${M.senToChineseSpeech(picked)}！`;
          setFeedback("count-feedback", "ok", `🎉 ${speech}`);
          A.speak(speech);
          setTimeout(() => {
            if (state.activeView === "count" && state.countTab === "quiz") {
              initCountQuizRound();
            }
          }, 1800);
        } else {
          btn.classList.add("is-wrong");
          A.playGentleError();
          setFeedback("count-feedback", "warn", "💪 再点一点桌上的钱币，慢慢合起来数一数哦！");
          A.speak("差一点点，我们再慢慢数一次吧！");
        }
      });
    });
  }

  // ==================== Level 2: Customer Pay ====================
  function initPayRound() {
    const pool = getItemsForDifficulty(state.difficulty);
    const chosen = [pickRandom(pool)];
    if (state.difficulty >= 3 && Math.random() < 0.55) {
      const second = pickRandom(pool);
      if (sumTokens([{ valueSen: chosen[0].priceSen }, { valueSen: second.priceSen }]) <= M.DIFFICULTY_LEVELS[state.difficulty].maxPriceSen) {
        chosen.push(second);
      }
    }
    const targetSen = chosen.reduce((s, it) => s + it.priceSen, 0);

    state.payState = {
      items: chosen,
      targetSen,
      placed: [],
      hintDenId: null,
      solved: false,
    };

    const names = chosen.map((it) => `${it.emoji}${it.name}`).join(" 和 ");
    const prompt = `买 ${names}，一共要付 ${M.formatRM(targetSen)}，请你拿钱放到桌面上吧！`;
    $("pay-prompt-text").textContent = prompt;
    $("pay-target-amount").textContent = M.formatRM(targetSen);
    $("pay-items-display").innerHTML = chosen
      .map(
        (it) => `<div class="feat-item">
          <span class="feat-emoji">${it.emoji}</span>
          <div>
            <div class="feat-name">${escapeHtml(it.name)}</div>
            <div class="feat-price">${M.formatRM(it.priceSen)}</div>
          </div>
        </div>`
      )
      .join("");

    setFeedback("pay-feedback", "", "");
    renderPayWallet();
    updatePayMatUI();
    A.speak(`买${chosen.map((i) => i.name).join("和")}，一共要付${M.senToChineseSpeech(targetSen)}。`);
  }

  function renderPayWallet() {
    const allowed = M.getAllowedDenominations(state.difficulty);
    const drawer = $("pay-wallet");
    drawer.innerHTML = allowed
      .map((den) =>
        M.renderMoneyTokenHTML(den, {
          size: "md",
          tag: "button",
          pulsing: state.payState.hintDenId === den.id,
        })
      )
      .join("");

    drawer.querySelectorAll(".money-token").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.payState.solved) return;
        const den = M.getDenominationById(btn.dataset.denId);
        if (!den) return;
        if (state.payState.placed.length >= 16) {
          showToast("桌面放太多钱啦，试着拿大一点面额的纸币吧！");
          return;
        }
        state.payState.placed.push(den);
        state.payState.hintDenId = null;
        den.kind === "coin" ? A.playCoin() : A.playNote();
        setFeedback("pay-feedback", "", "");
        renderPayWallet();
        updatePayMatUI();
      });
    });
  }

  function updatePayMatUI() {
    const mat = $("pay-mat");
    const placed = state.payState.placed;
    const sum = sumTokens(placed);

    const sumChip = $("pay-current-sum");
    if (state.assistMode) {
      sumChip.classList.remove("hidden");
      sumChip.textContent = `已放：${M.formatRM(sum)}`;
    } else {
      sumChip.classList.add("hidden");
    }

    if (!placed.length) {
      mat.innerHTML = `<div class="mat-placeholder">点击下方钱包里的纸币或硬币放到这里</div>`;
      return;
    }

    mat.innerHTML = placed
      .map((den, idx) =>
        M.renderMoneyTokenHTML(den, {
          size: "md",
          tag: "button",
          removable: true,
          attrs: `data-mat-idx="${idx}"`,
        })
      )
      .join("");

    mat.querySelectorAll("[data-mat-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.payState.solved) return;
        const idx = Number(btn.dataset.matIdx);
        state.payState.placed.splice(idx, 1);
        A.playRemove();
        setFeedback("pay-feedback", "", "");
        updatePayMatUI();
      });
    });
  }

  function handlePayHint() {
    if (state.payState.solved) return;
    const current = sumTokens(state.payState.placed);
    const diff = state.payState.targetSen - current;
    if (diff === 0) {
      showToast("刚刚好啦！快点绿色「确认付款」按钮吧！");
      A.speak("刚刚好啦，可以按确认付款！");
      return;
    }
    if (diff < 0) {
      showToast(`放多了一点点哦（多了 ${M.formatRM(-diff)}），点桌上的钱拿走吧！`);
      A.speak("放多了一点点，点桌上的钱可以拿走哦。");
      return;
    }
    const allowed = M.getAllowedDenominations(state.difficulty);
    const needed = M.greedyBreakdown(diff, allowed);
    if (needed.length) {
      state.payState.hintDenId = needed[0].id;
      renderPayWallet();
      A.speak(`小帮手建议：可以再放一张或一枚${needed[0].speech}！`);
    }
  }

  function submitPayRound() {
    if (state.payState.solved) return;
    const current = sumTokens(state.payState.placed);
    const target = state.payState.targetSen;
    if (current === target) {
      state.payState.solved = true;
      A.playSuccess();
      awardStars(1);
      const msg = `付款成功！刚刚好 ${M.formatRM(target)}！`;
      setFeedback("pay-feedback", "ok", `🎉 ${msg}`);
      A.speak(`付款成功！谢谢你，你付了刚刚好${M.senToChineseSpeech(target)}！`);
      setTimeout(() => {
        if (state.activeView === "pay") initPayRound();
      }, 1900);
    } else if (current < target) {
      A.playGentleError();
      const short = target - current;
      const msg = state.assistMode
        ? `还差 ${M.formatRM(short)} 哦，再放一点钱吧！`
        : "钱还不够哦，再放一点钱看看！";
      setFeedback("pay-feedback", "warn", `💪 ${msg}`);
      A.speak(msg);
    } else {
      A.playGentleError();
      const extra = current - target;
      const msg = state.assistMode
        ? `放多了 ${M.formatRM(extra)}，点桌上的钱拿走一些吧！`
        : "放太多钱啦，点桌上的钱可以拿回去哦！";
      setFeedback("pay-feedback", "warn", `💡 ${msg}`);
      A.speak(msg);
    }
  }

  // ==================== Level 3: Shopkeeper Change ====================
  function pickCustomerPayment(priceSen, level) {
    // Pick a realistic higher banknote/combination that requires giving change
    const candidates = level === 1 ? [500, 1000] : level === 2 ? [500, 1000, 2000] : level === 3 ? [1000, 2000, 5000] : [1000, 2000, 5000, 10000];
    const valid = candidates.filter((v) => v > priceSen);
    let paidSen = valid.length ? pickRandom(valid) : priceSen + 500;
    // Occasionally pay with e.g. RM5 + RM1 = RM6 when price is RM4.50 on level 2+
    if (level >= 2 && priceSen < 1500 && Math.random() < 0.28) {
      const nextRm = Math.ceil((priceSen + 1) / 100) * 100;
      if (nextRm > priceSen && nextRm <= 2000) paidSen = nextRm;
    }
    const allowed = M.getAllowedDenominations(level);
    const tokens = M.greedyBreakdown(paidSen, allowed);
    return { paidSen, tokens };
  }

  function initChangeRound() {
    const pool = getItemsForDifficulty(state.difficulty).filter(
      (it) => it.priceSen < M.DIFFICULTY_LEVELS[state.difficulty].maxPaySen
    );
    const item = pickRandom(pool.length ? pool : getItemsForDifficulty(state.difficulty));
    const { paidSen, tokens } = pickCustomerPayment(item.priceSen, state.difficulty);
    const customer = pickRandom(CUSTOMER_PERSONAS);

    state.changeState = {
      customer,
      items: [item],
      priceSen: item.priceSen,
      paidTokens: tokens,
      paidSen,
      changeTargetSen: paidSen - item.priceSen,
      placed: [],
      hintDenId: null,
      solved: false,
    };

    $("change-customer-avatar").textContent = customer.avatar;
    $("change-customer-name").textContent = customer.name;
    $("change-item-label").textContent = `${item.emoji} ${item.name}`;
    $("change-item-price").textContent = M.formatRM(item.priceSen);
    $("change-paid-amount").textContent = M.formatRM(paidSen);
    $("change-paid-visual").innerHTML = tokens
      .map((d) => M.renderMoneyTokenHTML(d, { size: "xs", tag: "div" }))
      .join("");

    const prompt = `我要买 ${item.emoji}${item.name}（${M.formatRM(item.priceSen)}），给你 ${M.formatRM(paidSen)}，请找我零钱！`;
    $("change-prompt-text").textContent = prompt;

    setFeedback("change-feedback", "", "");
    renderChangeDrawer();
    updateChangeUI();
    A.speak(`${customer.name}说：我要买${item.name}，价钱是${M.senToChineseSpeech(item.priceSen)}，给你${M.senToChineseSpeech(paidSen)}，请找我零钱。`);
  }

  function renderChangeDrawer() {
    const allowed = M.getAllowedDenominations(state.difficulty);
    const drawer = $("change-drawer");
    drawer.innerHTML = allowed
      .map((den) =>
        M.renderMoneyTokenHTML(den, {
          size: "md",
          tag: "button",
          pulsing: state.changeState.hintDenId === den.id,
        })
      )
      .join("");

    drawer.querySelectorAll(".money-token").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.changeState.solved) return;
        const den = M.getDenominationById(btn.dataset.denId);
        if (!den) return;
        if (state.changeState.placed.length >= 16) {
          showToast("找零盘放太多钱啦，用大面额试试看！");
          return;
        }
        state.changeState.placed.push(den);
        state.changeState.hintDenId = null;
        den.kind === "coin" ? A.playCoin() : A.playNote();
        setFeedback("change-feedback", "", "");
        renderChangeDrawer();
        updateChangeUI();
      });
    });
  }

  function updateChangeUI() {
    const cs = state.changeState;
    const placedSum = sumTokens(cs.placed);

    $("change-target-display").textContent = state.assistMode
      ? M.formatRM(cs.changeTargetSen)
      : "？";

    const scaffold = $("change-scaffold-box");
    if (state.assistMode) {
      scaffold.classList.remove("hidden");
      $("scaffold-formula").textContent = `💡 往上数：从 ${M.formatRM(cs.priceSen)} 数到 ${M.formatRM(cs.paidSen)}（${M.formatRM(cs.paidSen)} − ${M.formatRM(cs.priceSen)} = ${M.formatRM(cs.changeTargetSen)}）`;
      $("change-current-sum").textContent = `找零盘已放：${M.formatRM(placedSum)}`;

      const basePct = Math.round((cs.priceSen / cs.paidSen) * 100);
      const addPct = Math.min(100 - basePct, Math.round((placedSum / cs.paidSen) * 100));
      const baseBar = $("countup-base-bar");
      const addBar = $("countup-added-bar");
      baseBar.style.width = `${Math.max(18, basePct)}%`;
      baseBar.textContent = `商品 ${M.formatRM(cs.priceSen)}`;
      addBar.style.width = `${placedSum > 0 ? Math.max(14, addPct) : 0}%`;
      addBar.textContent = placedSum > 0 ? `+ ${M.formatRM(placedSum)}` : "";
      addBar.classList.toggle("is-over", placedSum > cs.changeTargetSen);
      $("countup-goal-label").textContent = `目标 ${M.formatRM(cs.paidSen)}`;
    } else {
      scaffold.classList.add("hidden");
    }

    const mat = $("change-mat");
    if (!cs.placed.length) {
      mat.innerHTML = `<div class="mat-placeholder">从下面收银抽屉点选要找给顾客的钱</div>`;
      return;
    }

    mat.innerHTML = cs.placed
      .map((den, idx) =>
        M.renderMoneyTokenHTML(den, {
          size: "md",
          tag: "button",
          removable: true,
          attrs: `data-cmat-idx="${idx}"`,
        })
      )
      .join("");

    mat.querySelectorAll("[data-cmat-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (cs.solved) return;
        const idx = Number(btn.dataset.cmatIdx);
        cs.placed.splice(idx, 1);
        A.playRemove();
        setFeedback("change-feedback", "", "");
        updateChangeUI();
      });
    });
  }

  function handleChangeHint() {
    const cs = state.changeState;
    if (cs.solved) return;
    const placedSum = sumTokens(cs.placed);
    const rem = cs.changeTargetSen - placedSum;
    if (rem === 0) {
      showToast("找零刚刚好啦！快点击「找零给顾客」吧！");
      A.speak("找零刚刚好啦！");
      return;
    }
    if (rem < 0) {
      showToast("找太多钱给顾客啦，会亏本哦！点盘里的钱拿走一些。");
      A.speak("找太多了，拿走一些吧！");
      return;
    }
    const allowed = M.getAllowedDenominations(state.difficulty);
    const needed = M.greedyBreakdown(rem, allowed);
    if (needed.length) {
      cs.hintDenId = needed[0].id;
      renderChangeDrawer();
      A.speak(`再找一张或一枚${needed[0].speech}，就能数到${M.senToChineseSpeech(cs.paidSen)}啦！`);
    }
  }

  function submitChangeRound() {
    const cs = state.changeState;
    if (cs.solved) return;
    const placedSum = sumTokens(cs.placed);
    if (placedSum === cs.changeTargetSen) {
      cs.solved = true;
      A.playRegister();
      setTimeout(() => A.playSuccess(), 180);
      awardStars(1, `🤝 找零真准！${cs.customer.name}开心地走了！`);
      setFeedback("change-feedback", "ok", `🎉 太厉害了！找回 ${M.formatRM(cs.changeTargetSen)}，顾客非常满意！`);
      A.speak(`找零刚刚好${M.senToChineseSpeech(cs.changeTargetSen)}，谢谢小老板！`);
      setTimeout(() => {
        if (state.activeView === "change") initChangeRound();
      }, 2000);
    } else if (placedSum < cs.changeTargetSen) {
      A.playGentleError();
      const msg = state.assistMode
        ? `找零还差 ${M.formatRM(cs.changeTargetSen - placedSum)}，再从抽屉拿一点吧！`
        : "找的钱还不够哦，再从收银抽屉加一点！";
      setFeedback("change-feedback", "warn", `💪 ${msg}`);
      A.speak(msg);
    } else {
      A.playGentleError();
      const msg = state.assistMode
        ? `多找了 ${M.formatRM(placedSum - cs.changeTargetSen)} 哦，点盘里的钱放回抽屉吧！`
        : "找太多钱会亏本哦，点盘里的钱拿回抽屉吧！";
      setFeedback("change-feedback", "warn", `💡 ${msg}`);
      A.speak(msg);
    }
  }

  // ==================== Level 4: Full Bazaar Role-Play ====================
  function renderRoleplayView() {
    document.querySelectorAll("[data-rp-mode]").forEach((b) => {
      b.classList.toggle("active", b.dataset.rpMode === state.rpMode);
    });
    $("rp-shopkeeper").classList.toggle("active", state.rpMode === "shopkeeper");
    $("rp-customer").classList.toggle("active", state.rpMode === "customer");
    $("rp-hud").classList.toggle("hidden", state.rpMode !== "shopkeeper");

    if (state.rpMode === "shopkeeper") {
      if (!state.rpShop.orderItems.length) {
        initShopkeeperCustomer();
      } else {
        renderShopkeeperAll();
      }
    } else {
      if (!state.rpCust.wallet.length) {
        initCustomerWallet();
      } else {
        renderCustomerAll();
      }
    }
  }

  // --- 4A: Shopkeeper Mode ---
  function initShopkeeperCustomer() {
    const pool = getItemsForDifficulty(state.difficulty);
    const itemCount = state.difficulty === 1 ? 1 + (Math.random() < 0.4 ? 1 : 0) : 1 + (Math.random() < 0.65 ? 1 : 0);
    const order = [];
    for (let i = 0; i < itemCount; i++) {
      const candidate = pickRandom(pool);
      const nextTotal = order.reduce((s, it) => s + it.priceSen, 0) + candidate.priceSen;
      if (nextTotal <= M.DIFFICULTY_LEVELS[state.difficulty].maxPaySen - 100 || order.length === 0) {
        order.push(candidate);
      }
    }
    const orderTotalSen = order.reduce((s, it) => s + it.priceSen, 0);
    const customer = pickRandom(CUSTOMER_PERSONAS);

    // Sometimes pay exact, sometimes pay higher bill requiring change
    let paidSen = orderTotalSen;
    let paidTokens = [];
    if (Math.random() < 0.72) {
      const res = pickCustomerPayment(orderTotalSen, state.difficulty);
      paidSen = res.paidSen;
      paidTokens = res.tokens;
    } else {
      paidTokens = M.greedyBreakdown(orderTotalSen, M.getAllowedDenominations(state.difficulty));
    }

    state.rpShop.customer = customer;
    state.rpShop.orderItems = order;
    state.rpShop.orderTotalSen = orderTotalSen;
    state.rpShop.bagItems = [];
    state.rpShop.stage = "pack";
    state.rpShop.paidTokens = paidTokens;
    state.rpShop.paidSen = paidSen;
    state.rpShop.needChangeSen = paidSen - orderTotalSen;
    state.rpShop.changePlaced = [];
    state.rpShop.hintDenId = null;
    state.rpShop.changeRevealed = false;

    setFeedback("rp-feedback", "", "");
    renderShopkeeperAll();
    const orderDesc = order.map((o) => o.name).join("和");
    A.speak(`${customer.name}来了！他说：小老板你好，我要买${orderDesc}！`);
  }

  function renderShopkeeperAll() {
    const rp = state.rpShop;
    $("rp-revenue").textContent = M.formatRM(rp.revenueSen);
    $("rp-served").textContent = String(rp.servedCount);
    $("rp-sticker-count").textContent = String(rp.stickers.length);

    $("rp-dot-1").className = `step-dot ${rp.stage === "pack" ? "active" : "done"}`;
    $("rp-dot-2").className = `step-dot ${rp.stage === "pay" ? "active" : rp.stage === "done" ? "done" : ""}`;
    $("rp-dot-3").className = `step-dot ${rp.stage === "pay" ? "active" : rp.stage === "done" ? "done" : ""}`;

    $("rp-cust-avatar").textContent = rp.customer.avatar;
    $("rp-cust-name").textContent = rp.customer.name;

    // Count requested vs bagged
    const reqCounts = {};
    rp.orderItems.forEach((it) => {
      reqCounts[it.id] = (reqCounts[it.id] || 0) + 1;
    });
    const bagCounts = {};
    rp.bagItems.forEach((it) => {
      bagCounts[it.id] = (bagCounts[it.id] || 0) + 1;
    });

    if (rp.stage === "pack") {
      $("rp-cust-speech").textContent = `你好！我要买下面这些东西，帮我装进袋子吧：`;
    } else {
      $("rp-cust-speech").textContent =
        rp.needChangeSen > 0
          ? `谢谢！我给你 ${M.formatRM(rp.paidSen)}，请找我零钱哦！`
          : `谢谢！我给你刚好的 ${M.formatRM(rp.paidSen)}，不用找零啦！`;
    }

    $("rp-order-pills").innerHTML = Object.entries(reqCounts)
      .map(([id, reqQty]) => {
        const it = rp.orderItems.find((x) => x.id === id);
        const got = bagCounts[id] || 0;
        const done = got >= reqQty;
        return `<span class="order-pill ${done ? "is-done" : ""}">${it.emoji} ${escapeHtml(it.name)} ×${reqQty} (${got}/${reqQty})</span>`;
      })
      .join("");

    // Render shelf
    const pool = getItemsForDifficulty(state.difficulty);
    const filtered = rp.catFilter === "all" ? pool : pool.filter((i) => i.category === rp.catFilter);
    $("rp-shelf-count").textContent = `当前难度共 ${pool.length} 样`;
    const shelf = $("rp-stall-items");
    shelf.innerHTML = filtered
      .map((it) => {
        const isReq = (reqCounts[it.id] || 0) > (bagCounts[it.id] || 0) && rp.stage === "pack";
        return `<button type="button" class="stall-item-btn ${isReq ? "is-requested" : ""}" data-shelf-id="${it.id}">
          <span class="stall-emoji">${it.emoji}</span>
          <span class="stall-name">${escapeHtml(it.name)}</span>
          <span class="stall-price">${M.formatRM(it.priceSen)}</span>
        </button>`;
      })
      .join("");

    shelf.querySelectorAll("[data-shelf-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (rp.stage !== "pack") {
          showToast("已经装袋好啦，现在在右边收银台收钱找零哦！");
          return;
        }
        const item = pool.find((x) => x.id === btn.dataset.shelfId);
        if (!item) return;
        rp.bagItems.push(item);
        A.playNote();
        renderShopkeeperAll();
      });
    });

    // Render bag
    const bagList = $("rp-bag-list");
    if (!rp.bagItems.length) {
      bagList.innerHTML = `<div class="empty-tip">请从左边货架点选顾客要的商品</div>`;
    } else {
      bagList.innerHTML = rp.bagItems
        .map(
          (it, idx) => `<div class="bag-row">
            <span>${it.emoji} ${escapeHtml(it.name)} (${M.formatRM(it.priceSen)})</span>
            ${rp.stage === "pack" ? `<button type="button" class="bag-row-remove" data-rm-bag="${idx}">拿走</button>` : ""}
          </div>`
        )
        .join("");
      bagList.querySelectorAll("[data-rm-bag]").forEach((b) => {
        b.addEventListener("click", () => {
          rp.bagItems.splice(Number(b.dataset.rmBag), 1);
          A.playRemove();
          renderShopkeeperAll();
        });
      });
    }

    const bagTotal = rp.bagItems.reduce((s, it) => s + it.priceSen, 0);
    $("rp-order-total").textContent = M.formatRM(bagTotal);
    $("btn-rp-pack-done").disabled = rp.stage !== "pack";
    $("btn-rp-pack-done").textContent = rp.stage === "pack" ? "🛍️ 装好了，请顾客付款！" : "✅ 商品已打包";

    // Cashier box
    const cashierBox = $("rp-cashier-box");
    cashierBox.classList.toggle("is-disabled", rp.stage !== "pay");
    if (rp.stage === "pack") {
      $("rp-cust-paid-tokens").innerHTML = "装好商品后，顾客就会付钱给你...";
    } else {
      $("rp-cust-paid-tokens").innerHTML = rp.paidTokens
        .map((d) => M.renderMoneyTokenHTML(d, { size: "xs", tag: "div" }))
        .join("");
    }
    renderRoleplayCashierMath();
    renderShopkeeperDrawer();
    renderShopkeeperChangeMat();
  }

  function renderRoleplayCashierMath() {
    const rp = state.rpShop;
    if (rp.stage === "pack") {
      $("rp-math-price").textContent = "-";
      $("rp-math-paid").textContent = "-";
      $("rp-math-need-wrap").classList.add("hidden");
      $("rp-math-need").textContent = "-";
      return;
    }
    $("rp-math-price").textContent = M.formatRM(rp.orderTotalSen);
    $("rp-math-paid").textContent = M.formatRM(rp.paidSen);
    $("rp-math-need-wrap").classList.toggle("hidden", !rp.changeRevealed);
    $("rp-math-need").textContent = rp.needChangeSen === 0 ? "不用找零" : M.formatRM(rp.needChangeSen);
  }

  function confirmShopkeeperPack() {
    const rp = state.rpShop;
    if (rp.stage !== "pack") return;
    // Check if bag matches order exact item counts
    const reqMap = {};
    const bagMap = {};
    rp.orderItems.forEach((i) => (reqMap[i.id] = (reqMap[i.id] || 0) + 1));
    rp.bagItems.forEach((i) => (bagMap[i.id] = (bagMap[i.id] || 0) + 1));

    const reqKeys = Object.keys(reqMap);
    const bagKeys = Object.keys(bagMap);
    const matches =
      reqKeys.length === bagKeys.length && reqKeys.every((k) => reqMap[k] === bagMap[k]);

    if (!matches) {
      A.playGentleError();
      showToast("袋子里的商品和顾客要的不太一样哦，再核对一下！");
      A.speak("袋子里的东西和顾客要的不一样哦，再看一看订单吧！");
      return;
    }

    rp.stage = "pay";
    A.playRegister();
    renderShopkeeperAll();
    if (rp.needChangeSen > 0) {
      A.speak(`装好啦！${rp.customer.name}给你${M.senToChineseSpeech(rp.paidSen)}，商品一共${M.senToChineseSpeech(rp.orderTotalSen)}，请找零吧！`);
    } else {
      A.speak(`装好啦！${rp.customer.name}给你刚好的${M.senToChineseSpeech(rp.paidSen)}，可以直接点击完成交易！`);
    }
  }

  function renderShopkeeperDrawer() {
    const allowed = M.getAllowedDenominations(state.difficulty);
    const drawer = $("rp-drawer");
    drawer.innerHTML = allowed
      .map((den) =>
        M.renderMoneyTokenHTML(den, {
          size: "sm",
          tag: "button",
          pulsing: state.rpShop.hintDenId === den.id,
        })
      )
      .join("");

    drawer.querySelectorAll(".money-token").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.rpShop.stage !== "pay") return;
        const den = M.getDenominationById(btn.dataset.denId);
        if (!den) return;
        state.rpShop.changePlaced.push(den);
        state.rpShop.hintDenId = null;
        den.kind === "coin" ? A.playCoin() : A.playNote();
        setFeedback("rp-feedback", "", "");
        renderShopkeeperDrawer();
        renderShopkeeperChangeMat();
      });
    });
  }

  function renderShopkeeperChangeMat() {
    const rp = state.rpShop;
    const mat = $("rp-change-mat");
    if (!rp.changePlaced.length) {
      mat.innerHTML = `<div class="mat-placeholder">${
        rp.needChangeSen === 0 && rp.stage === "pay"
          ? "顾客给的钱刚刚好，不用找零，可以直接按「完成交易」！✨"
          : "点下方收银抽屉放要找的零钱"
      }</div>`;
      return;
    }
    mat.innerHTML = rp.changePlaced
      .map((d, idx) =>
        M.renderMoneyTokenHTML(d, {
          size: "sm",
          tag: "button",
          removable: true,
          attrs: `data-rp-cidx="${idx}"`,
        })
      )
      .join("");
    mat.querySelectorAll("[data-rp-cidx]").forEach((b) => {
      b.addEventListener("click", () => {
        rp.changePlaced.splice(Number(b.dataset.rpCidx), 1);
        A.playRemove();
        setFeedback("rp-feedback", "", "");
        renderShopkeeperChangeMat();
      });
    });
  }

  function completeShopkeeperTransaction() {
    const rp = state.rpShop;
    if (rp.stage !== "pay") return;
    const placedSum = sumTokens(rp.changePlaced);
    if (placedSum !== rp.needChangeSen) {
      A.playGentleError();
      const msg =
        placedSum < rp.needChangeSen
          ? "找零还不够哦，再给顾客一点钱！"
          : "找太多钱啦，点找零盘里的钱拿回去！";
      setFeedback("rp-feedback", "warn", `💡 ${msg}`);
      A.speak(msg);
      return;
    }

    rp.stage = "done";
    rp.revenueSen += rp.orderTotalSen;
    rp.servedCount += 1;

    let earnedSticker = null;
    if (rp.servedCount % 3 === 0) {
      earnedSticker = STICKER_POOL[(rp.stickers.length) % STICKER_POOL.length];
      rp.stickers.push(earnedSticker);
      A.playFanfare();
    } else {
      A.playSuccess();
    }

    awardStars(
      1,
      earnedSticker
        ? `🎉 成交！服务满 ${rp.servedCount} 位客人，解锁贴纸 ${earnedSticker}！`
        : `🤝 成交！收入 ${M.formatRM(rp.orderTotalSen)}！`
    );
    setFeedback("rp-feedback", "ok", `🎉 交易完成！${rp.customer.name}说：谢谢小老板！`);
    A.speak(`交易完成！谢谢小老板，祝你生意兴隆！`);

    renderShopkeeperAll();
    setTimeout(() => {
      if (state.activeView === "roleplay" && state.rpMode === "shopkeeper") {
        initShopkeeperCustomer();
      }
    }, 1800);
  }

  // --- 4B: Customer Mode ---
  function initCustomerWallet() {
    const lv = state.difficulty;
    let walletIds = [];
    if (lv === 1) {
      walletIds = ["rm5", "rm1", "rm1", "rm1", "rm1", "rm1"]; // RM10
    } else if (lv === 2) {
      walletIds = ["rm10", "rm5", "rm1", "rm1", "sen50", "sen50", "sen20", "sen20", "sen10"]; // RM18.50
    } else if (lv === 3) {
      walletIds = ["rm50", "rm10", "rm5", "rm1", "rm1", "sen50", "sen20", "sen10", "sen5", "sen5"]; // RM67.90
    } else {
      walletIds = ["rm100", "rm20", "rm10", "rm5", "rm1", "rm1", "sen50", "sen20", "sen10", "sen5"]; // RM137.85
    }
    const prevCat = (state.rpCust && state.rpCust.catFilter) || "all";
    state.rpCust = {
      catFilter: prevCat,
      wallet: walletIds.map((id) => M.getDenominationById(id)).filter(Boolean),
      basket: [],
      bought: [],
      inCheckout: false,
      payMat: [],
    };
    setFeedback("cust-feedback", "", "");
    $("cust-owner-speech").textContent = "欢迎来到义卖会！看看你的零用钱，挑选想买的物品吧！";
    renderCustomerAll();
  }

  function renderCustomerAll() {
    const rc = state.rpCust;
    const walletSum = sumTokens(rc.wallet);
    const basketTotal = rc.basket.reduce((s, row) => s + row.item.priceSen * row.qty, 0);

    $("cust-wallet-total").textContent = M.formatRM(walletSum);
    $("cust-basket-total").textContent = M.formatRM(basketTotal);
    $("cust-bought-count").textContent = String(rc.bought.length);

    // Shelf
    const pool = getItemsForDifficulty(state.difficulty);
    const filtered = rc.catFilter === "all" ? pool : pool.filter((i) => i.category === rc.catFilter);
    $("cust-shelf-count").textContent = `当前难度共 ${pool.length} 样`;
    const shelf = $("cust-stall-items");
    shelf.innerHTML = filtered
      .map((it) => {
        const cantAfford = basketTotal + it.priceSen > walletSum;
        return `<button type="button" class="stall-item-btn ${cantAfford ? "is-too-expensive" : ""}" data-cust-item="${it.id}">
          <span class="stall-emoji">${it.emoji}</span>
          <span class="stall-name">${escapeHtml(it.name)}</span>
          <span class="stall-price">${M.formatRM(it.priceSen)}</span>
        </button>`;
      })
      .join("");

    shelf.querySelectorAll("[data-cust-item]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (rc.inCheckout) {
          showToast("正在结账中，想再挑东西可以先点「继续逛街」哦！");
          return;
        }
        const item = pool.find((x) => x.id === btn.dataset.custItem);
        if (!item) return;
        if (basketTotal + item.priceSen > walletSum) {
          A.playGentleError();
          showToast("钱袋里的零用钱不够买这件啦，看看别的或先结账吧！");
          A.speak("零用钱不够买这个啦！");
          return;
        }
        const existing = rc.basket.find((r) => r.item.id === item.id);
        if (existing) existing.qty += 1;
        else rc.basket.push({ item, qty: 1 });
        A.playNote();
        renderCustomerAll();
      });
    });

    // Wallet tokens (show available, exclude those currently placed on payMat)
    const placedSet = new Set(rc.payMat.map((p) => p.walletIdx));
    const walletEl = $("cust-wallet-tokens");
    const visibleWallet = rc.wallet
      .map((den, idx) => ({ den, idx }))
      .filter((x) => !placedSet.has(x.idx));

    if (!visibleWallet.length) {
      walletEl.innerHTML = `<div class="empty-tip">钱袋里的钱都拿出来啦</div>`;
    } else {
      walletEl.innerHTML = visibleWallet
        .map(({ den, idx }) =>
          M.renderMoneyTokenHTML(den, {
            size: "sm",
            tag: "button",
            attrs: `data-cwallet-idx="${idx}"`,
          })
        )
        .join("");
      walletEl.querySelectorAll("[data-cwallet-idx]").forEach((b) => {
        b.addEventListener("click", () => {
          if (!rc.inCheckout) {
            showToast("选好商品后先点「去结账」，再点钱币付款哦！");
            return;
          }
          const idx = Number(b.dataset.cwalletIdx);
          const den = rc.wallet[idx];
          if (!den) return;
          rc.payMat.push({ walletIdx: idx, den });
          den.kind === "coin" ? A.playCoin() : A.playNote();
          setFeedback("cust-feedback", "", "");
          renderCustomerAll();
        });
      });
    }

    // Basket
    const basketEl = $("cust-basket-list");
    if (!rc.basket.length) {
      basketEl.innerHTML = `<div class="empty-tip">购物篮还是空的，快去选喜欢的物品吧！</div>`;
    } else {
      basketEl.innerHTML = rc.basket
        .map(
          (row, idx) => `<div class="bag-row">
            <span>${row.item.emoji} ${escapeHtml(row.item.name)} ×${row.qty} (${M.formatRM(row.item.priceSen * row.qty)})</span>
            ${!rc.inCheckout ? `<button type="button" class="bag-row-remove" data-rm-cbasket="${idx}">不要</button>` : ""}
          </div>`
        )
        .join("");
      basketEl.querySelectorAll("[data-rm-cbasket]").forEach((b) => {
        b.addEventListener("click", () => {
          rc.basket.splice(Number(b.dataset.rmBasket || b.dataset.rmCbasket), 1);
          A.playRemove();
          renderCustomerAll();
        });
      });
    }

    $("btn-cust-checkout").disabled = !rc.basket.length || rc.inCheckout;
    $("cust-checkout-box").classList.toggle("hidden", !rc.inCheckout);

    if (rc.inCheckout) {
      const matSum = rc.payMat.reduce((s, p) => s + p.den.valueSen, 0);
      $("cust-pay-sum").textContent = M.formatRM(matSum);
      const matEl = $("cust-pay-mat");
      if (!rc.payMat.length) {
        matEl.innerHTML = `<div class="mat-placeholder">点击上方「我的零用钱袋」里的钱币付款</div>`;
      } else {
        matEl.innerHTML = rc.payMat
          .map((p, idx) =>
            M.renderMoneyTokenHTML(p.den, {
              size: "sm",
              tag: "button",
              removable: true,
              attrs: `data-cmat-pidx="${idx}"`,
            })
          )
          .join("");
        matEl.querySelectorAll("[data-cmat-pidx]").forEach((b) => {
          b.addEventListener("click", () => {
            rc.payMat.splice(Number(b.dataset.cmatPidx), 1);
            A.playRemove();
            setFeedback("cust-feedback", "", "");
            renderCustomerAll();
          });
        });
      }
    }

    // Bought items
    $("cust-bought-list").innerHTML = rc.bought.length
      ? rc.bought.map((b) => `<span class="bought-pill">${b.emoji} ${escapeHtml(b.name)}</span>`).join("")
      : `<span class="small-note">还没有买到宝贝哦</span>`;
  }

  function startCustomerCheckout() {
    const rc = state.rpCust;
    if (!rc.basket.length) return;
    const total = rc.basket.reduce((s, r) => s + r.item.priceSen * r.qty, 0);
    rc.inCheckout = true;
    rc.payMat = [];
    setFeedback("cust-feedback", "", "");
    $("cust-owner-speech").textContent = `一共是 ${M.formatRM(total)}！请点你钱包里的钱付给我，不够刚好也没关系，我会找零给你！`;
    A.speak(`一共是${M.senToChineseSpeech(total)}，请点你钱包里的钱付给我吧！`);
    renderCustomerAll();
  }

  function confirmCustomerPay() {
    const rc = state.rpCust;
    const total = rc.basket.reduce((s, r) => s + r.item.priceSen * r.qty, 0);
    const paid = rc.payMat.reduce((s, p) => s + p.den.valueSen, 0);
    if (paid < total) {
      A.playGentleError();
      const msg = `还差 ${M.formatRM(total - paid)} 哦，再从钱包拿一点钱吧！`;
      setFeedback("cust-feedback", "warn", `💪 ${msg}`);
      A.speak(msg);
      return;
    }

    const changeSen = paid - total;
    // Remove paid tokens from wallet
    const paidIndices = new Set(rc.payMat.map((p) => p.walletIdx));
    rc.wallet = rc.wallet.filter((_, idx) => !paidIndices.has(idx));

    // Add real change tokens back to wallet
    const changeTokens = M.greedyBreakdown(changeSen, M.getAllowedDenominations(state.difficulty));
    rc.wallet.push(...changeTokens);
    rc.wallet.sort((a, b) => b.valueSen - a.valueSen);

    // Move basket to bought
    rc.basket.forEach((row) => {
      for (let q = 0; q < row.qty; q++) {
        rc.bought.push({ name: row.item.name, emoji: row.item.emoji });
      }
    });
    rc.basket = [];
    rc.payMat = [];
    rc.inCheckout = false;

    A.playRegister();
    setTimeout(() => A.playSuccess(), 160);
    const msg =
      changeSen > 0
        ? `买成功啦！小熊老板找回 ${M.formatRM(changeSen)} 到你的零用钱袋！`
        : `买成功啦！你付了刚刚好 ${M.formatRM(paid)}！`;
    $("cust-owner-speech").textContent = msg;
    awardStars(1, `🛍️ ${msg}`);
    A.speak(msg);
    renderCustomerAll();
  }

  // ==================== Teacher Settings Modal ====================
  function openTeacherModal() {
    state.teacherDraft = JSON.parse(JSON.stringify(state.config));
    $("cfg-stall-name").value = state.teacherDraft.stallName || "";
    $("cfg-school-name").value = state.teacherDraft.schoolName || "";
    $("teacher-save-status").textContent = "";
    renderTeacherEmojiPicker();
    renderTeacherItemsList();
    $("modal-teacher").classList.remove("hidden");
  }

  function closeTeacherModal() {
    $("modal-teacher").classList.add("hidden");
  }

  function renderTeacherEmojiPicker() {
    const box = $("new-item-emojis");
    const cur = $("new-item-emoji").value;
    box.innerHTML = TEACHER_EMOJIS.map(
      (em) => `<button type="button" class="emoji-pick-btn ${em === cur ? "active" : ""}" data-em="${em}">${em}</button>`
    ).join("");
    box.querySelectorAll("[data-em]").forEach((b) => {
      b.addEventListener("click", () => {
        $("new-item-emoji").value = b.dataset.em;
        renderTeacherEmojiPicker();
      });
    });
  }

  function renderTeacherItemsList() {
    const list = $("teacher-items-list");
    list.innerHTML = state.teacherDraft.items
      .map(
        (it, idx) => `<div class="teacher-item-row" data-row-idx="${idx}">
          <input type="text" class="t-emoji" value="${escapeHtml(it.emoji)}" maxlength="4" />
          <input type="text" class="t-name" value="${escapeHtml(it.name)}" maxlength="30" />
          <select class="t-cat">
            <option value="美食" ${it.category === "美食" ? "selected" : ""}>美食</option>
            <option value="饮料" ${it.category === "饮料" ? "selected" : ""}>饮料</option>
            <option value="文具玩具" ${it.category === "文具玩具" ? "selected" : ""}>文具玩具</option>
            <option value="其它" ${it.category === "其它" ? "selected" : ""}>其它</option>
          </select>
          <input type="number" class="t-price" step="0.05" min="0.05" max="100" value="${(it.priceSen / 100).toFixed(2)}" />
          <button type="button" class="btn-del-item" data-del-idx="${idx}" title="删除">✕</button>
        </div>`
      )
      .join("");

    list.querySelectorAll(".teacher-item-row").forEach((row) => {
      const idx = Number(row.dataset.rowIdx);
      row.querySelector(".t-emoji").addEventListener("input", (e) => {
        state.teacherDraft.items[idx].emoji = e.target.value.trim() || "🛍️";
      });
      row.querySelector(".t-name").addEventListener("input", (e) => {
        state.teacherDraft.items[idx].name = e.target.value;
      });
      row.querySelector(".t-cat").addEventListener("change", (e) => {
        state.teacherDraft.items[idx].category = e.target.value;
      });
      row.querySelector(".t-price").addEventListener("change", (e) => {
        const val = parseFloat(e.target.value);
        if (!Number.isNaN(val) && val >= 0.05 && val <= 100) {
          const sen = Math.round(val * 20) * 5;
          state.teacherDraft.items[idx].priceSen = sen;
          e.target.value = (sen / 100).toFixed(2);
        }
      });
    });

    list.querySelectorAll("[data-del-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.teacherDraft.items.length <= 1) {
          showToast("至少要保留 1 个商品哦！");
          return;
        }
        state.teacherDraft.items.splice(Number(btn.dataset.delIdx), 1);
        renderTeacherItemsList();
      });
    });
  }

  function addTeacherNewItem() {
    const emoji = $("new-item-emoji").value.trim() || "🛍️";
    const name = $("new-item-name").value.trim();
    const cat = $("new-item-cat").value;
    const priceFloat = parseFloat($("new-item-price").value);
    if (!name) {
      showToast("请先输入商品名称！");
      return;
    }
    if (Number.isNaN(priceFloat) || priceFloat < 0.05 || priceFloat > 100) {
      showToast("价格请在 RM 0.05 到 RM 100.00 之间");
      return;
    }
    const priceSen = Math.round(priceFloat * 20) * 5;
    state.teacherDraft.items.unshift({
      id: `item-${Date.now()}`,
      name,
      emoji,
      category: cat,
      priceSen,
    });
    $("new-item-name").value = "";
    renderTeacherItemsList();
  }

  async function saveTeacherConfig() {
    const draft = state.teacherDraft;
    draft.stallName = $("cfg-stall-name").value.trim() || "一年级小小义卖会";
    draft.schoolName = $("cfg-school-name").value.trim() || "培青华小";
    draft.items = draft.items.filter((i) => i.name && i.name.trim());
    if (!draft.items.length) {
      showToast("商品列表不能为空！");
      return;
    }

    const statusEl = $("teacher-save-status");
    state.config = JSON.parse(JSON.stringify(draft));
    try {
      localStorage.setItem(STORAGE_KEY_CFG, JSON.stringify(state.config));
    } catch (_) {}
    applyHeaderBranding();
    statusEl.textContent = "✅ 已保存到本机浏览器！";
    showToast("义卖菜单已更新！");
    setTimeout(closeTeacherModal, 700);
    if (state.activeView !== "home") switchView(state.activeView);
  }

  async function resetTeacherConfig() {
    state.config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    try {
      localStorage.removeItem(STORAGE_KEY_CFG);
    } catch (_) {}
    state.teacherDraft = JSON.parse(JSON.stringify(state.config));
    $("cfg-stall-name").value = state.teacherDraft.stallName;
    $("cfg-school-name").value = state.teacherDraft.schoolName;
    renderTeacherItemsList();
    applyHeaderBranding();
    $("teacher-save-status").textContent = "🔄 已恢复默认 80 样义卖菜单";
  }

  // ==================== Summary Modal ====================
  function openSummaryModal() {
    const rp = state.rpShop;
    $("sum-served").textContent = `${rp.servedCount} 位`;
    $("sum-revenue").textContent = M.formatRM(rp.revenueSen);
    $("sum-stickers").textContent = `${rp.stickers.length} 张`;
    $("sum-sticker-shelf").innerHTML = rp.stickers.length
      ? rp.stickers.map((s) => `<span>${s}</span>`).join("")
      : `<span class="small-note">服务每满 3 位顾客就会获得 1 张可爱贴纸哦！</span>`;
    $("modal-summary").classList.remove("hidden");
    A.playFanfare();
    A.speak(`太棒了！小老板今天一共服务了${rp.servedCount}位客人，收到${M.senToChineseSpeech(rp.revenueSen)}！`);
  }

  // ==================== Bind Events & Boot ====================
  function bindEvents() {
    $("btn-home").addEventListener("click", () => switchView("home"));
    $("btn-assist").addEventListener("click", toggleAssist);
    $("btn-voice").addEventListener("click", toggleVoice);
    $("btn-hero-speak").addEventListener("click", () => {
      A.speak(`欢迎来到${state.config.schoolName}${state.config.stallName}！快选一个关卡开始练习数钱、买东西和找零钱吧！`, { force: true });
    });

    document.querySelectorAll(".diff-btn").forEach((b) => {
      b.addEventListener("click", () => setDifficulty(Number(b.dataset.level)));
    });

    document.querySelectorAll("[data-goto]").forEach((card) => {
      card.addEventListener("click", () => switchView(card.dataset.goto));
    });

    // Level 1
    document.querySelectorAll("[data-count-tab]").forEach((b) => {
      b.addEventListener("click", () => {
        state.countTab = b.dataset.countTab;
        renderCountView();
      });
    });
    $("btn-learn-speak").addEventListener("click", () => {
      const den = M.getDenominationById(state.selectedLearnId);
      if (den) A.speak(`${den.speech}，${den.desc}`, { force: true });
    });
    $("btn-count-speak").addEventListener("click", () => {
      A.speak("请数一数，桌上一共有多少钱？可以点击桌上的钱币做标记哦！", { force: true });
    });
    $("btn-count-next").addEventListener("click", initCountQuizRound);

    // Level 2
    $("btn-pay-speak").addEventListener("click", () => {
      A.speak($("pay-prompt-text").textContent, { force: true });
    });
    $("btn-pay-new").addEventListener("click", initPayRound);
    $("btn-pay-hint").addEventListener("click", handlePayHint);
    $("btn-pay-clear").addEventListener("click", () => {
      state.payState.placed = [];
      state.payState.hintDenId = null;
      A.playRemove();
      setFeedback("pay-feedback", "", "");
      renderPayWallet();
      updatePayMatUI();
    });
    $("btn-pay-submit").addEventListener("click", submitPayRound);

    // Level 3
    $("btn-change-speak").addEventListener("click", () => {
      A.speak($("change-prompt-text").textContent, { force: true });
    });
    $("btn-change-new").addEventListener("click", initChangeRound);
    $("btn-change-hint").addEventListener("click", handleChangeHint);
    $("btn-change-clear").addEventListener("click", () => {
      state.changeState.placed = [];
      state.changeState.hintDenId = null;
      A.playRemove();
      setFeedback("change-feedback", "", "");
      renderChangeDrawer();
      updateChangeUI();
    });
    $("btn-change-submit").addEventListener("click", submitChangeRound);

    // Level 4
    document.querySelectorAll("[data-rp-mode]").forEach((b) => {
      b.addEventListener("click", () => {
        state.rpMode = b.dataset.rpMode;
        renderRoleplayView();
      });
    });
    $("btn-rp-speak").addEventListener("click", () => {
      const orderDesc = state.rpShop.orderItems.map((o) => o.name).join("和");
      A.speak(`${state.rpShop.customer.name}要买${orderDesc}。`, { force: true });
    });
    $("rp-cat-filters").querySelectorAll("[data-cat]").forEach((b) => {
      b.addEventListener("click", () => {
        state.rpShop.catFilter = b.dataset.cat;
        $("rp-cat-filters").querySelectorAll("[data-cat]").forEach((x) => x.classList.toggle("active", x === b));
        renderShopkeeperAll();
      });
    });
    $("btn-rp-pack-done").addEventListener("click", confirmShopkeeperPack);
    $("btn-rp-hint").addEventListener("click", () => {
      const rp = state.rpShop;
      if (rp.stage !== "pay") return;
      if (!rp.changeRevealed) {
        rp.changeRevealed = true;
        renderRoleplayCashierMath();
        if (rp.needChangeSen === 0) {
          showToast("刚刚好，不用找零哦！可以直接点击「完成交易」！");
          A.speak("刚刚好，不用找零哦！");
          return;
        }
        showToast(`💡 需要找零 ${M.formatRM(rp.needChangeSen)}，试着从收银抽屉拿钱吧！（再点一次提示可教你拿哪张钱）`);
        A.speak(`需要找零${M.senToChineseSpeech(rp.needChangeSen)}，试着从抽屉拿出来吧！`);
        return;
      }
      const rem = rp.needChangeSen - sumTokens(rp.changePlaced);
      if (rem === 0) {
        showToast("找零刚刚好啦！快点击「完成交易」吧！");
        return;
      }
      if (rem < 0) {
        showToast("找太多钱啦，点找零盘里的钱拿走吧！");
        return;
      }
      const next = M.greedyBreakdown(rem, M.getAllowedDenominations(state.difficulty))[0];
      if (next) {
        rp.hintDenId = next.id;
        renderShopkeeperDrawer();
        A.speak(`小帮手建议：可以再找一张或一枚${next.speech}！`);
      }
    });
    $("btn-rp-clear-change").addEventListener("click", () => {
      state.rpShop.changePlaced = [];
      state.rpShop.hintDenId = null;
      A.playRemove();
      setFeedback("rp-feedback", "", "");
      renderShopkeeperDrawer();
      renderShopkeeperChangeMat();
    });
    $("btn-rp-complete").addEventListener("click", completeShopkeeperTransaction);
    $("btn-rp-summary").addEventListener("click", openSummaryModal);

    // Level 4 Customer Mode
    $("cust-cat-filters").querySelectorAll("[data-cat]").forEach((b) => {
      b.addEventListener("click", () => {
        state.rpCust.catFilter = b.dataset.cat;
        $("cust-cat-filters").querySelectorAll("[data-cat]").forEach((x) => x.classList.toggle("active", x === b));
        renderCustomerAll();
      });
    });
    $("btn-cust-speak").addEventListener("click", () => {
      A.speak($("cust-owner-speech").textContent, { force: true });
    });
    $("btn-cust-reset-wallet").addEventListener("click", () => {
      initCustomerWallet();
      A.playCoin();
      A.speak("零用钱已经装满啦，继续逛义卖会吧！");
    });
    $("btn-cust-clear-basket").addEventListener("click", () => {
      if (state.rpCust.inCheckout) return;
      state.rpCust.basket = [];
      A.playRemove();
      renderCustomerAll();
    });
    $("btn-cust-checkout").addEventListener("click", startCustomerCheckout);
    $("btn-cust-cancel-pay").addEventListener("click", () => {
      state.rpCust.inCheckout = false;
      state.rpCust.payMat = [];
      setFeedback("cust-feedback", "", "");
      renderCustomerAll();
    });
    $("btn-cust-pay-confirm").addEventListener("click", confirmCustomerPay);

    // Modals
    $("btn-teacher").addEventListener("click", openTeacherModal);
    $("btn-teacher-close").addEventListener("click", closeTeacherModal);
    $("btn-add-item").addEventListener("click", addTeacherNewItem);
    $("btn-save-config").addEventListener("click", saveTeacherConfig);
    $("btn-reset-config").addEventListener("click", resetTeacherConfig);

    $("btn-summary-close").addEventListener("click", () => $("modal-summary").classList.add("hidden"));
    $("btn-summary-ok").addEventListener("click", () => $("modal-summary").classList.add("hidden"));
  }

  async function boot() {
    bindEvents();
    await loadConfig();
    renderHome();
  }

  document.addEventListener("DOMContentLoaded", boot);
})(window);
