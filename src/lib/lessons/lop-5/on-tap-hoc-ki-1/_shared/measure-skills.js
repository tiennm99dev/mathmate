/**
 * The adaptive review of measures: converting lengths, masses and areas
 * (km², ha, m², dm², cm², mm²) both ways, measures written as decimals,
 * comparing measures, calculating with measures, fractions of an hour, a
 * minute or a century, and word problems. A measure is kept as a whole count
 * of the smallest unit, so every conversion is exact. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { signOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { fmt, tidy } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { num, valueOptions } from '#lib/core/kid/decimals.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */

/**
 * The units of one kind of measure, with the power of ten of each unit in
 * the smallest unit of the table, and the conversions the review asks for
 * (larger unit first).
 * @typedef {{ name: string, exp: Record<string, number>, pairs: [string, string][] }} UnitTable
 */

/** @type {UnitTable} */
export const LENGTH = {
  name: 'độ dài',
  exp: { km: 6, m: 3, dm: 2, cm: 1, mm: 0 },
  pairs: [
    ['km', 'm'],
    ['m', 'dm'],
    ['m', 'cm'],
    ['m', 'mm'],
    ['dm', 'cm'],
    ['cm', 'mm'],
  ],
};

/** @type {UnitTable} */
export const MASS = {
  name: 'khối lượng',
  exp: { tấn: 6, tạ: 5, yến: 4, kg: 3, g: 0 },
  pairs: [
    ['tấn', 'kg'],
    ['tạ', 'kg'],
    ['yến', 'kg'],
    ['kg', 'g'],
    ['tấn', 'tạ'],
  ],
};

/** @type {UnitTable} */
export const AREA = {
  name: 'diện tích',
  exp: { 'km²': 12, ha: 10, 'm²': 6, 'dm²': 4, 'cm²': 2, 'mm²': 0 },
  pairs: [
    ['km²', 'ha'],
    ['ha', 'm²'],
    ['m²', 'dm²'],
    ['dm²', 'cm²'],
    ['cm²', 'mm²'],
  ],
};

/**
 * How many of the smaller unit make one of the larger: 1 000 for km to m,
 * 10 000 for ha to m².
 * @param {UnitTable} table
 * @param {string} big
 * @param {string} small
 */
export const ratio = (table, big, small) => 10 ** (table.exp[big] - table.exp[small]);

/**
 * A conversion question between two units of a table, drawn one of four
 * ways: a decimal in the larger unit to the smaller ("13,7 m = ? dm"), two
 * units to the smaller ("28 m 15 cm = ? cm"), the smaller to the larger as a
 * decimal ("565 g = ? kg") or two units to the larger ("5 m 36 cm = ? m").
 * @param {() => number} rand
 * @param {UnitTable} table
 */
export function convertQuestion(rand, table) {
  const [big, small] = pick(rand, table.pairs);
  const k = ratio(table, big, small);
  const places = Math.round(Math.log10(k));
  const way = int(rand, 0, 3);
  const whole = int(rand, 1, 60);
  // A part of the larger unit, written in the smaller one, not a multiple of 10.
  let part = int(rand, 1, k - 1);
  if (part % 10 === 0) part += 1;
  /** @type {string} */
  let given;
  /** @type {number} */
  let right;
  /** @type {string} */
  let unit;
  if (way === 0) {
    const shown = int(rand, 1, Math.min(places, 2));
    let scaled = int(rand, 10 ** shown + 1, 60 * 10 ** shown);
    if (scaled % 10 === 0) scaled += 1;
    given = `${num(scaled / 10 ** shown)} ${big}`;
    right = (scaled * k) / 10 ** shown;
    unit = small;
  } else if (way === 1) {
    given = `${whole} ${big} ${fmt(part)} ${small}`;
    right = whole * k + part;
    unit = small;
  } else if (way === 2) {
    const count = rand() < 0.5 ? part : whole * k + part;
    given = `${fmt(count)} ${small}`;
    right = count / k;
    unit = big;
  } else {
    given = `${whole} ${big} ${fmt(part)} ${small}`;
    right = whole + part / k;
    unit = big;
  }
  right = tidy(right, 6);
  const toSmall = unit === small;
  // The slips: one step of ten too few or too many, and for area the steps
  // counted by 10 instead of 100.
  const slips = [right * 10, right / 10, right * 100, right / 100];
  if (table === AREA)
    slips.unshift(toSmall ? right / 10 ** (places / 2) : right * 10 ** (places / 2));
  return {
    prompt: `${given} = ? ${unit}`,
    ...valueOptions(right, slips, { unit }),
    hint: `1 ${big} = ${fmt(k)} ${small}. ${toSmall ? 'Đổi sang đơn vị bé thì em nhân' : 'Đổi sang đơn vị lớn thì em chia'} cho ${fmt(k)}.`,
    solution: `1 ${big} = ${fmt(k)} ${small}, nên ${given} = ${num(right)} ${unit}.`,
  };
}

/** @type {Skill} */
export const lengthSkill = {
  id: 'do-dai',
  label: 'Đơn vị đo độ dài',
  make: (rand) => convertQuestion(rand, LENGTH),
};

/** @type {Skill} */
export const massSkill = {
  id: 'khoi-luong',
  label: 'Đơn vị đo khối lượng',
  make: (rand) => convertQuestion(rand, MASS),
};

/** @type {Skill} */
export const areaSkill = {
  id: 'dien-tich',
  label: 'Đơn vị đo diện tích',
  make: (rand) => convertQuestion(rand, AREA),
};

/** @type {Skill} */
export const compareSkill = {
  id: 'so-sanh-so-do',
  label: 'So sánh hai số đo',
  make(rand) {
    const table = pick(rand, [LENGTH, MASS, AREA]);
    const [big, small] = pick(rand, table.pairs);
    const k = ratio(table, big, small);
    // A decimal in the larger unit against a number of the smaller unit
    // that has the same digits, or is equal to it.
    const tenths = int(rand, 11, 99);
    const left = (tenths * k) / 10;
    const kind = pick(rand, ['bang', 'chu-so', 'gan']);
    let count = left;
    if (kind === 'chu-so') count = tenths * (k >= 1000 ? 10 : 1);
    if (kind === 'gan') count = left + pick(rand, [-1, 1]) * (k >= 100 ? k / 100 : 1);
    if (count === left && kind !== 'bang') count = left + 1;
    const sign = compareSign(left, count);
    const leftText = `${num(tenths / 10)} ${big}`;
    const rightText = `${fmt(count)} ${small}`;
    return {
      prompt: `Chọn dấu thích hợp: ${leftText} ? ${rightText}`,
      ...signOptions(sign),
      hint: `Em đổi hai số đo về cùng một đơn vị đo rồi so sánh. 1 ${big} = ${fmt(k)} ${small}.`,
      solution: `${leftText} = ${fmt(left)} ${small}, mà ${fmt(left)} ${sign} ${fmt(count)}. Vậy ${leftText} ${sign} ${rightText}.`,
    };
  },
};

/** @type {Skill} */
export const calcSkill = {
  id: 'tinh-so-do',
  label: 'Tính với số đo',
  make(rand) {
    const op = pick(rand, ['+', '−', '×', ':']);
    if (op === '+' || op === '−') {
      const unit = op === '+' ? pick(rand, ['km', 'm']) : pick(rand, ['kg', 'tấn']);
      const a = int(rand, 301, 999) / 100;
      const b = int(rand, 11, Math.min(99, Math.floor(a * 10) - 1)) / 10;
      const right = tidy(op === '+' ? a + b : a - b, 6);
      // The slip of lining up the last digits instead of the commas.
      const slip = tidy((op === '+' ? a * 100 + b * 10 : a * 100 - b * 10) / 100, 6);
      return {
        prompt: `${num(a)} ${unit} ${op} ${num(b)} ${unit} = ?`,
        ...valueOptions(right, [slip], { near: [0.1, -1, 1], unit }),
        hint: 'Em tính như với số thập phân, đặt các dấu phẩy thẳng cột, rồi viết đơn vị đo ở kết quả.',
        solution: `${num(a)} ${op} ${num(b)} = ${num(right)}, nên ${num(a)} ${unit} ${op} ${num(b)} ${unit} = ${num(right)} ${unit}.`,
      };
    }
    const unit = pick(rand, ['ha', 'km²']);
    const n = int(rand, 3, 9);
    if (op === '×') {
      const a = int(rand, 11, 99) / 10;
      const right = tidy(a * n, 6);
      return {
        prompt: `${num(a)} ${unit} × ${n} = ?`,
        ...valueOptions(right, [right * 10, right / 10], { near: [n, -n], unit }),
        hint: 'Em nhân số thập phân với số tự nhiên, rồi viết đơn vị đo ở kết quả.',
        solution: `${num(a)} × ${n} = ${num(right)}, nên ${num(a)} ${unit} × ${n} = ${num(right)} ${unit}.`,
      };
    }
    const q = int(rand, 101, 1999) / 100;
    const a = tidy(q * n, 6);
    return {
      prompt: `${num(a)} ${unit} : ${n} = ?`,
      ...valueOptions(q, [q * 10, q / 10], { near: [1, -1], unit }),
      hint: 'Em chia số thập phân cho số tự nhiên, rồi viết đơn vị đo ở kết quả.',
      solution: `${num(a)} : ${n} = ${num(q)}, nên ${num(a)} ${unit} : ${n} = ${num(q)} ${unit}.`,
    };
  },
};

/** Units of time and how many of the smaller unit one of them holds. */
const TIME_UNITS = /** @type {const} */ ([
  { big: 'giờ', small: 'phút', k: 60, dens: [2, 3, 4, 5, 6, 10, 12] },
  { big: 'phút', small: 'giây', k: 60, dens: [2, 3, 4, 5, 6, 10, 12] },
  { big: 'thế kỉ', small: 'năm', k: 100, dens: [2, 4, 5, 10, 20, 25] },
  { big: 'ngày', small: 'giờ', k: 24, dens: [2, 3, 4, 6, 8, 12] },
  { big: 'năm', small: 'tháng', k: 12, dens: [2, 3, 4, 6] },
]);

/** @type {Skill} */
export const timeSkill = {
  id: 'thoi-gian',
  label: 'Đơn vị đo thời gian',
  make(rand) {
    const t = pick(rand, TIME_UNITS);
    const q = pick(rand, t.dens);
    let p = int(rand, 1, q - 1);
    while (gcd(p, q) !== 1) p = int(rand, 1, q - 1);
    const one = t.k / q;
    const right = one * p;
    return {
      prompt: `${p}/${q} ${t.big} = ? ${t.small}`,
      ...slipOptions(right, [one, t.k - right, p * q], {
        min: 1,
        near: [one, -one, 1],
        unit: t.small,
      }),
      hint: `1 ${t.big} = ${t.k} ${t.small}. Em tìm 1/${q} của ${t.k} ${t.small} trước.`,
      solution:
        p === 1
          ? `1/${q} ${t.big} = ${t.k} : ${q} = ${one} ${t.small}.`
          : `1/${q} ${t.big} = ${t.k} : ${q} = ${one} ${t.small}. Vậy ${p}/${q} ${t.big} = ${one} × ${p} = ${right} ${t.small}.`,
    };
  },
};

/** @type {Skill} */
export const storySkill = {
  id: 'giai-toan-do-luong',
  label: 'Giải toán về đo lường',
  make(rand) {
    if (rand() < 0.5) {
      const length = pick(rand, [300, 400, 500, 600]);
      const k = pick(
        rand,
        [2, 4, 5].filter((d) => length % d === 0),
      );
      const width = length / k;
      const area = length * width;
      const right = area / 10000;
      return {
        prompt: `Một khu đất hình chữ nhật có chiều dài ${length} m, chiều rộng bằng 1/${k} chiều dài. Diện tích khu đất là bao nhiêu héc-ta?`,
        ...valueOptions(right, [area / 1000, area / 100, right * 2], { unit: 'ha' }),
        hint: `Em tìm chiều rộng, tính diện tích theo mét vuông, rồi đổi: 1 ha = ${fmt(10000)} m².`,
        solution: `Chiều rộng: ${length} : ${k} = ${width} (m). Diện tích: ${length} × ${width} = ${fmt(area)} (m²) = ${num(right)} ha.`,
      };
    }
    const down = int(rand, 31, 95) * 10;
    const up = down * 2;
    const total = down + up;
    const right = total / 1000;
    return {
      prompt: `Đường từ nhà Hùng đến trường gồm một đoạn xuống dốc dài ${down} m và một đoạn lên dốc dài gấp đôi đoạn xuống dốc. Quãng đường đó dài bao nhiêu ki-lô-mét?`,
      ...valueOptions(right, [total / 100, up / 1000, total / 10000], { unit: 'km' }),
      hint: `Em tìm độ dài đoạn lên dốc, cộng với đoạn xuống dốc, rồi đổi: 1 km = ${fmt(1000)} m.`,
      solution: `Đoạn lên dốc: ${down} × 2 = ${fmt(up)} (m). Cả quãng đường: ${down} + ${fmt(up)} = ${fmt(total)} (m) = ${num(right)} km.`,
    };
  },
};

/** The parts of the measures review, in book order. */
export const MEASURE_SKILLS = [
  lengthSkill,
  massSkill,
  areaSkill,
  compareSkill,
  calcSkill,
  timeSkill,
  storySkill,
];
