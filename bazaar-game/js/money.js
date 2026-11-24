/**
 * Malaysian Ringgit (MYR) & Sen Currency Engine
 * All monetary amounts are strictly stored and computed as integer `sen`
 * (e.g., 5 = 5仙, 100 = RM 1, 10000 = RM 100) to avoid floating-point errors.
 */
(function (global) {
  "use strict";

  const DENOMINATIONS = [
    {
      id: "sen5",
      valueSen: 5,
      kind: "coin",
      label: "5仙",
      speech: "五仙",
      colorName: "小银币",
      themeClass: "coin-silver coin-5",
      motif: "🌺",
      desc: "银色最小枚硬币，面值是 5 仙，需要2个5仙才是10仙哦！",
      minLevel: 3,
    },
    {
      id: "sen10",
      valueSen: 10,
      kind: "coin",
      label: "10仙",
      speech: "十仙",
      colorName: "中银币",
      themeClass: "coin-silver coin-10",
      motif: "🌺",
      desc: "银色硬币，面值是 10 仙，10个10仙合起来就是 1 令吉！",
      minLevel: 2,
    },
    {
      id: "sen20",
      valueSen: 20,
      kind: "coin",
      label: "20仙",
      speech: "二十仙",
      colorName: "金黄币",
      themeClass: "coin-gold coin-20",
      motif: "🌺",
      desc: "金黄色硬币，面值是 20 仙，5个20仙就是 1 令吉！",
      minLevel: 2,
    },
    {
      id: "sen50",
      valueSen: 50,
      kind: "coin",
      label: "50仙",
      speech: "五十仙",
      colorName: "大金币",
      themeClass: "coin-gold coin-50",
      motif: "🌺",
      desc: "最大的金色波浪边硬币，2个50仙合起来就是 1 令吉！",
      minLevel: 2,
    },
    {
      id: "rm1",
      valueSen: 100,
      kind: "note",
      label: "RM 1",
      corner: "1",
      speech: "一令吉",
      colorName: "蓝色纸币",
      themeClass: "note-rm1",
      motif: "🎐",
      motifName: "月亮风筝",
      desc: "蓝色的 RM 1 纸币，上面有可爱的月亮风筝，最常用来买小零食！",
      minLevel: 1,
    },
    {
      id: "rm5",
      valueSen: 500,
      kind: "note",
      label: "RM 5",
      corner: "5",
      speech: "五令吉",
      colorName: "绿色纸币",
      themeClass: "note-rm5",
      motif: "🦅",
      motifName: "犀鸟",
      desc: "绿色的 RM 5 纸币，等于 5 张 RM 1，上面有马来西亚犀鸟！",
      minLevel: 1,
    },
    {
      id: "rm10",
      valueSen: 1000,
      kind: "note",
      label: "RM 10",
      corner: "10",
      speech: "十令吉",
      colorName: "红色纸币",
      themeClass: "note-rm10",
      motif: "🌺",
      motifName: "大王花",
      desc: "红色的 RM 10 纸币，等于 2 张 RM 5，或者 10 张 RM 1！",
      minLevel: 1,
    },
    {
      id: "rm20",
      valueSen: 2000,
      kind: "note",
      label: "RM 20",
      corner: "20",
      speech: "二十令吉",
      colorName: "橙色纸币",
      themeClass: "note-rm20",
      motif: "🐢",
      motifName: "海龟",
      desc: "橙色的 RM 20 纸币，等于 2 张 RM 10，上面有海洋海龟！",
      minLevel: 2,
    },
    {
      id: "rm50",
      valueSen: 5000,
      kind: "note",
      label: "RM 50",
      corner: "50",
      speech: "五十令吉",
      colorName: "青绿色大钞",
      themeClass: "note-rm50",
      motif: "🌴",
      motifName: "油棕与国父",
      desc: "青绿色大纸币 RM 50，等于 5 张 RM 10，买大礼物才会用到！",
      minLevel: 3,
    },
    {
      id: "rm100",
      valueSen: 10000,
      kind: "note",
      label: "RM 100",
      corner: "100",
      speech: "一百令吉",
      colorName: "紫色最大钞",
      themeClass: "note-rm100",
      motif: "🏔️",
      motifName: "神山",
      desc: "紫色最大面额 RM 100 纸币，等于 2 张 RM 50，小老板要会找零哦！",
      minLevel: 4,
    },
  ];

  const DIFFICULTY_LEVELS = {
    1: {
      level: 1,
      starsText: "⭐ 1星",
      name: "萌芽新手",
      shortDesc: "只用 RM1、RM5、RM10（整数价格）",
      stepSen: 100,
      maxPriceSen: 1000,
      maxPaySen: 1000,
    },
    2: {
      level: 2,
      starsText: "⭐⭐ 2星",
      name: "开心小达人",
      shortDesc: "加入 10仙、20仙、50仙 和 RM20",
      stepSen: 10,
      maxPriceSen: 2000,
      maxPaySen: 2000,
    },
    3: {
      level: 3,
      starsText: "⭐⭐⭐ 3星",
      name: "义卖小能手",
      shortDesc: "加入 5仙 和 RM50 大钞挑战",
      stepSen: 5,
      maxPriceSen: 4500,
      maxPaySen: 5000,
    },
    4: {
      level: 4,
      starsText: "⭐⭐⭐⭐ 4星",
      name: "超级大老板",
      shortDesc: "全部钱币含 RM100 与多件商品组合",
      stepSen: 5,
      maxPriceSen: 9500,
      maxPaySen: 10000,
    },
  };

  function getDenominationById(id) {
    return DENOMINATIONS.find((d) => d.id === id) || null;
  }

  function getAllowedDenominations(level) {
    const lv = Math.max(1, Math.min(4, Number(level) || 1));
    return DENOMINATIONS.filter((d) => d.minLevel <= lv);
  }

  function formatRM(sen) {
    const s = Math.round(Number(sen) || 0);
    if (s === 0) return "RM 0";
    if (s < 100) return `${s}仙`;
    const rm = Math.floor(s / 100);
    const rem = s % 100;
    if (rem === 0) return `RM ${rm}`;
    return `RM ${rm}.${String(rem).padStart(2, "0")}`;
  }

  function formatRMFull(sen) {
    const s = Math.round(Number(sen) || 0);
    const rm = Math.floor(s / 100);
    const rem = s % 100;
    return `RM ${rm}.${String(rem).padStart(2, "0")}`;
  }

  function intToChinese(n) {
    const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    if (n === 0) return "零";
    if (n === 2) return "两";
    if (n < 10) return digits[n];
    if (n < 20) return "十" + (n % 10 === 0 ? "" : digits[n % 10]);
    if (n < 100) {
      const tens = Math.floor(n / 10);
      const ones = n % 10;
      return digits[tens] + "十" + (ones === 0 ? "" : digits[ones]);
    }
    if (n === 100) return "一百";
    return String(n);
  }

  function senToChineseSpeech(sen) {
    const s = Math.round(Number(sen) || 0);
    if (s === 0) return "零令吉";
    const rm = Math.floor(s / 100);
    const rem = s % 100;
    if (rm === 0) {
      return `${intToChinese(rem)}仙`;
    }
    const rmText = `${intToChinese(rm)}令吉`;
    if (rem === 0) return rmText;
    if (rem < 10) return `${rmText}零${intToChinese(rem)}仙`;
    return `${rmText}${intToChinese(rem)}仙`;
  }

  /**
   * Greedy breakdown of `sen` using `allowedDens` (largest first).
   * Returns an array of denomination objects summing to `sen`.
   */
  function greedyBreakdown(sen, allowedDens) {
    let remaining = Math.round(Number(sen) || 0);
    if (remaining <= 0) return [];
    const sorted = [...(allowedDens || DENOMINATIONS)].sort((a, b) => b.valueSen - a.valueSen);
    const result = [];
    for (const den of sorted) {
      while (remaining >= den.valueSen) {
        result.push(den);
        remaining -= den.valueSen;
      }
    }
    return result;
  }

  /**
   * Renders an authentic Malaysian banknote or coin HTML token.
   */
  function renderMoneyTokenHTML(den, opts) {
    const options = opts || {};
    const size = options.size || "md"; // "xs" | "sm" | "md" | "lg"
    const tag = options.tag || "button";
    const extraClass = options.extraClass || "";
    const attrs = options.attrs || "";
    const counted = options.counted ? "is-counted" : "";
    const pulsing = options.pulsing ? "is-hint-pulse" : "";
    const removable = options.removable ? "is-removable" : "";

    if (den.kind === "coin") {
      return `<${tag} ${tag === "button" ? 'type="button"' : ""} class="money-token money-coin ${den.themeClass} size-${size} ${counted} ${pulsing} ${removable} ${extraClass}" data-den-id="${den.id}" aria-label="${den.label}" ${attrs}>
        <span class="coin-rim">
          <span class="coin-motif">${den.motif}</span>
          <span class="coin-val">${den.valueSen}</span>
          <span class="coin-unit">SEN</span>
        </span>
        ${options.removable ? '<span class="token-remove-badge" title="拿走">×</span>' : ""}
        ${options.counted ? '<span class="token-check-badge">✓</span>' : ""}
      </${tag}>`;
    }

    return `<${tag} ${tag === "button" ? 'type="button"' : ""} class="money-token money-note ${den.themeClass} size-${size} ${counted} ${pulsing} ${removable} ${extraClass}" data-den-id="${den.id}" aria-label="${den.label}" ${attrs}>
      <span class="note-stripe"></span>
      <span class="note-corner note-tl">${den.corner}</span>
      <span class="note-corner note-br">${den.corner}</span>
      <span class="note-center">
        <span class="note-bank">RM</span>
        <span class="note-num">${den.corner}</span>
      </span>
      <span class="note-motif" aria-hidden="true">${den.motif}</span>
      ${options.removable ? '<span class="token-remove-badge" title="拿走">×</span>' : ""}
      ${options.counted ? '<span class="token-check-badge">✓</span>' : ""}
    </${tag}>`;
  }

  global.BazaarMoney = {
    DENOMINATIONS,
    DIFFICULTY_LEVELS,
    getDenominationById,
    getAllowedDenominations,
    formatRM,
    formatRMFull,
    senToChineseSpeech,
    greedyBreakdown,
    renderMoneyTokenHTML,
  };
})(window);
