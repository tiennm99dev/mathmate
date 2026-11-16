/**
 * The adaptive review of measures: mass in yến, tạ, tấn and kg; area in mm²,
 * cm², dm² and m²; time in giây, phút and centuries; measuring angles; the
 * area of a rectangle and a mass word problem. Every amount is held as a
 * whole number of the smaller unit. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { signOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { toRoman } from '#lib/core/kid/whole-numbers.js';
import { fmt } from '#lib/core/number-format.js';
import { protractorReading } from './geometry-skills.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */

/**
 * A two-unit conversion: `a big + b small = ? small`, with `ratio` small
 * units in one big unit.
 * @typedef {{ big: string, small: string, ratio: number }} Pair
 */

/** The mass conversions of the book. */
export const MASS_PAIRS = /** @type {const} */ ([
  { big: 'yến', small: 'kg', ratio: 10 },
  { big: 'tạ', small: 'kg', ratio: 100 },
  { big: 'tấn', small: 'kg', ratio: 1000 },
  { big: 'tạ', small: 'yến', ratio: 10 },
  { big: 'tấn', small: 'tạ', ratio: 10 },
]);

/** The area conversions of the book. */
export const AREA_PAIRS = /** @type {const} */ ([
  { big: 'cm²', small: 'mm²', ratio: 100 },
  { big: 'dm²', small: 'cm²', ratio: 100 },
  { big: 'm²', small: 'dm²', ratio: 100 },
  { big: 'm²', small: 'cm²', ratio: 10000 },
]);

/**
 * The amount `a big b small` as text: '3 tạ 60 kg', or '4 tấn' when b is 0.
 * @param {Pair} pair
 * @param {number} a
 * @param {number} b
 */
export const amountText = (pair, a, b) =>
  b > 0 ? `${fmt(a)} ${pair.big} ${fmt(b)} ${pair.small}` : `${fmt(a)} ${pair.big}`;

/**
 * Converting `a big b small` to the small unit, the book's "3 tạ 60 kg = ? kg".
 * @param {Pair} pair
 * @param {number} a
 * @param {number} b below `pair.ratio`
 * @returns {Question}
 */
export function convertQuestion(pair, a, b) {
  const right = a * pair.ratio + b;
  const one = `1 ${pair.big} = ${fmt(pair.ratio)} ${pair.small}`;
  const slips = [a + b, a * pair.ratio * 10 + b, (a * pair.ratio) / 10 + b];
  const work =
    b > 0
      ? `${fmt(a)} ${pair.big} = ${fmt(a * pair.ratio)} ${pair.small}. ${fmt(a * pair.ratio)} + ${fmt(b)} = ${fmt(right)}.`
      : `${fmt(a)} × ${fmt(pair.ratio)} = ${fmt(right)}.`;
  return {
    prompt: `${amountText(pair, a, b)} = ? ${pair.small}`,
    ...slipOptions(right, slips, { near: [pair.ratio, -pair.ratio], min: 1, unit: pair.small }),
    hint: `Em nhớ: ${one}.`,
    solution: `${one}. ${work} Vậy ${amountText(pair, a, b)} = ${fmt(right)} ${pair.small}.`,
  };
}

/**
 * A part below the ratio, as the book writes amounts: 1 to 9 when the ratio
 * is 10 (1 tấn 7 tạ), 1 to 99 when it is 100 (3 tạ 60 kg, 1 dm² 6 cm²), and
 * hundreds and tens of kilograms in a tấn (4 tấn 520 kg).
 * @param {() => number} rand
 * @param {number} ratio
 */
function smallPart(rand, ratio) {
  if (ratio === 10) return int(rand, 1, 9);
  if (ratio === 100) return int(rand, 1, 99);
  return int(rand, 1, 9) * 100 + int(rand, 0, 9) * 10;
}

/** @type {Skill} */
export const massConvert = {
  id: 'doi-khoi-luong',
  label: 'Yến, tạ, tấn',
  make(rand) {
    const pair = pick(rand, MASS_PAIRS);
    const b = rand() < 0.4 ? 0 : smallPart(rand, pair.ratio);
    return convertQuestion(pair, int(rand, 2, 9), b);
  },
};

/** @type {Skill} */
export const areaConvert = {
  id: 'doi-dien-tich',
  label: 'Đơn vị đo diện tích',
  make(rand) {
    const pair = pick(rand, AREA_PAIRS);
    const b = rand() < 0.4 || pair.ratio > 100 ? 0 : smallPart(rand, pair.ratio);
    return convertQuestion(pair, int(rand, 2, 9), b);
  },
};

/**
 * Comparing `a big b small` with an amount in the small unit, the book's
 * "5 tạ 4 yến ? 538 kg".
 * @param {Pair} pair
 * @param {number} a
 * @param {number} b
 * @param {number} other in the small unit
 * @returns {Question}
 */
export function compareQuestion(pair, a, b, other) {
  const value = a * pair.ratio + b;
  const sign = compareSign(value, other);
  return {
    prompt: `Chọn dấu thích hợp: ${amountText(pair, a, b)} ? ${fmt(other)} ${pair.small}`,
    ...signOptions(sign),
    hint: `Em đổi về cùng một đơn vị là ${pair.small} rồi so sánh. 1 ${pair.big} = ${fmt(pair.ratio)} ${pair.small}.`,
    solution: `${amountText(pair, a, b)} = ${fmt(value)} ${pair.small}. Vì ${fmt(value)} ${sign} ${fmt(other)} nên ${amountText(pair, a, b)} ${sign} ${fmt(other)} ${pair.small}.`,
  };
}

/**
 * An amount near `value`: equal, or a little more or less in its last
 * places.
 * @param {() => number} rand
 * @param {number} value
 * @param {number} step
 */
const nearAmount = (rand, value, step) => value + pick(rand, [0, 1, -1, 2, -2]) * step;

/** Pairs whose amounts a comparison writes as `a big b small`. */
const COMPARE_PAIRS = /** @type {const} */ ([
  {
    pair: { big: 'tạ', small: 'kg', ratio: 100 },
    step: 2,
    b: (/** @type {() => number} */ r) => int(r, 1, 9) * 10,
  },
  {
    pair: { big: 'tấn', small: 'kg', ratio: 1000 },
    step: 20,
    b: (/** @type {() => number} */ r) => int(r, 1, 9) * 100,
  },
  {
    pair: { big: 'dm²', small: 'cm²', ratio: 100 },
    step: 5,
    b: (/** @type {() => number} */ r) => int(r, 10, 90),
  },
  {
    pair: { big: 'cm²', small: 'mm²', ratio: 100 },
    step: 5,
    b: (/** @type {() => number} */ r) => int(r, 10, 90),
  },
  {
    pair: { big: 'm²', small: 'dm²', ratio: 100 },
    step: 5,
    b: (/** @type {() => number} */ r) => int(r, 1, 9),
  },
]);

/** @type {Skill} */
export const measureCompare = {
  id: 'so-sanh-do-luong',
  label: 'So sánh số đo',
  make(rand) {
    const { pair, step, b: part } = pick(rand, COMPARE_PAIRS);
    const a = int(rand, 1, 9);
    const b = part(rand);
    return compareQuestion(pair, a, b, nearAmount(rand, a * pair.ratio + b, step));
  },
};

/** Units a calculation with measures is done in. */
const CALC_UNITS = ['yến', 'tạ', 'tấn', 'mm²', 'cm²', 'dm²', 'm²'];

/** @type {Skill} */
export const measureCalc = {
  id: 'tinh-so-do',
  label: 'Tính với số đo',
  make(rand) {
    const unit = pick(rand, CALC_UNITS);
    const way = int(rand, 0, 3);
    /** @type {[number, string, number, number]} */
    let task;
    if (way === 0) {
      const a = int(rand, 5, 60);
      const b = int(rand, 5, 40);
      task = [a, '+', b, a + b];
    } else if (way === 1) {
      const b = int(rand, 5, 40);
      const r = int(rand, 3, 40);
      task = [b + r, '−', b, r];
    } else if (way === 2) {
      const a = int(rand, 2, 12);
      const k = int(rand, 2, 9);
      task = [a, '×', k, a * k];
    } else {
      const q = int(rand, 2, 12);
      const k = int(rand, 2, 9);
      task = [q * k, ':', k, q];
    }
    const [a, op, b, right] = task;
    const text =
      op === '×' || op === ':'
        ? `${fmt(a)} ${unit} ${op} ${b}`
        : `${fmt(a)} ${unit} ${op} ${fmt(b)} ${unit}`;
    return {
      prompt: `${text} = ?`,
      ...slipOptions(right, [right + 10, right - 10], { near: [1, -1, 2], min: 1, unit }),
      hint: `Em tính với các số như bình thường, rồi viết thêm đơn vị ${unit} vào kết quả.`,
      solution: `${fmt(a)} ${op} ${fmt(b)} = ${fmt(right)}. Vậy ${text} = ${fmt(right)} ${unit}.`,
    };
  },
};

/** @type {Skill} */
export const timeConvert = {
  id: 'thoi-gian',
  label: 'Giây, phút, thế kỉ',
  make(rand) {
    const way = int(rand, 0, 2);
    if (way === 0) {
      const s = rand() < 0.3 ? 0 : int(rand, 1, 11) * 5;
      const m = int(rand, s > 0 ? 1 : 2, 5);
      const right = m * 60 + s;
      const text = s > 0 ? `${m} phút ${s} giây` : `${m} phút`;
      return {
        prompt: `${text} = ? giây`,
        ...slipOptions(right, [m * 100 + s, m + s, m * 60], {
          near: [60, -60, 10],
          min: 1,
          unit: 'giây',
        }),
        hint: 'Em nhớ: 1 phút = 60 giây.',
        solution: `1 phút = 60 giây. ${m} phút = ${m * 60} giây.${s > 0 ? ` ${m * 60} + ${s} = ${right}.` : ''} Vậy ${text} = ${right} giây.`,
      };
    }
    if (way === 1) {
      const c = int(rand, 2, 9);
      const right = c * 100;
      return {
        prompt: `${c} thế kỉ = ? năm`,
        ...slipOptions(right, [c * 10, c * 1000, c * 60], { near: [100], unit: 'năm' }),
        hint: 'Em nhớ: 1 thế kỉ = 100 năm.',
        solution: `1 thế kỉ = 100 năm. ${c} × 100 = ${right}. Vậy ${c} thế kỉ = ${right} năm.`,
      };
    }
    return centuryQuestion(rand);
  },
};

/** Years from the book's history, with what happened. */
const YEARS = /** @type {const} */ ([
  { year: 938, what: 'Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng' },
  { year: 1010, what: 'Lý Công Uẩn dời đô về Thăng Long' },
  { year: 1288, what: 'quân dân nhà Trần thắng trận Bạch Đằng' },
  { year: 1789, what: 'vua Quang Trung đại phá quân Thanh' },
  { year: 1945, what: 'nước Việt Nam Dân chủ Cộng hoà ra đời' },
  { year: 1975, what: 'đất nước ta thống nhất' },
  { year: 2026, what: 'em học lớp 4' },
]);

/**
 * The century of a year from the book's history, with the slip of reading the
 * first digits.
 * @param {() => number} rand
 * @returns {Question}
 */
export function centuryQuestion(rand) {
  const { year, what } = pick(rand, YEARS);
  const c = Math.ceil(year / 100);
  const values = [...new Set([c, c - 1, c + 1])].sort((x, y) => x - y);
  return {
    prompt: `Năm ${year}, ${what}. Năm ${year} thuộc thế kỉ nào?`,
    options: values.map((v) => `Thế kỉ ${toRoman(v)}`),
    answer: values.indexOf(c),
    optionLabels: values.map((v) => `Thế kỉ ${v}`),
    hint: 'Thế kỉ I từ năm 1 đến năm 100, thế kỉ II từ năm 101 đến năm 200, ... Em xem năm đó nằm trong khoảng nào.',
    solution: `Thế kỉ ${toRoman(c)} từ năm ${c * 100 - 99} đến năm ${c * 100}. Vậy năm ${year} thuộc thế kỉ ${toRoman(c)}.`,
  };
}

/**
 * A rectangle plot `length` m long and `more` m longer than it is wide.
 * @param {number} length
 * @param {number} more
 * @returns {Question}
 */
export function plotStory(length, more) {
  const width = length - more;
  const right = length * width;
  return {
    prompt: `Một mảnh đất trồng rau hình chữ nhật có chiều dài ${length} m, chiều dài hơn chiều rộng ${more} m. Diện tích mảnh đất là bao nhiêu mét vuông?`,
    ...slipOptions(right, [length * more, (length + width) * 2, length * (length + more)], {
      near: [length, -length],
      min: 1,
      unit: 'm²',
    }),
    hint: 'Em tìm chiều rộng trước. Diện tích hình chữ nhật bằng chiều dài nhân với chiều rộng.',
    solution: `Chiều rộng: ${length} − ${more} = ${width} (m). Diện tích: ${length} × ${width} = ${fmt(right)} (m²).`,
  };
}

/** @type {Skill} */
export const plotArea = {
  id: 'dien-tich-hcn',
  label: 'Bài toán diện tích',
  make(rand) {
    const width = int(rand, 4, 9);
    const more = int(rand, 2, 9);
    return plotStory(width + more, more);
  },
};

/**
 * A calf of `1 tạ calfKg kg` and a cow `more` kg heavier: how heavy both are.
 * @param {number} calfKg below 100
 * @param {number} more
 * @returns {Question}
 */
export function calfStory(calfKg, more) {
  const calf = 100 + calfKg;
  const cow = calf + more;
  const right = calf + cow;
  return {
    prompt: `Con bê cân nặng 1 tạ ${calfKg} kg. Con bò cân nặng hơn con bê ${more} kg. Cả con bê và con bò cân nặng bao nhiêu ki-lô-gam?`,
    ...slipOptions(right, [cow, calf + more, 1 + calfKg + cow], {
      near: [100, -100],
      min: 1,
      unit: 'kg',
    }),
    hint: 'Em đổi 1 tạ ra ki-lô-gam. Em tìm cân nặng của con bò trước.',
    solution: `1 tạ ${calfKg} kg = ${calf} kg. Con bò nặng: ${calf} + ${more} = ${cow} (kg). Cả hai con nặng: ${calf} + ${cow} = ${right} (kg).`,
  };
}

/** @type {Skill} */
export const calfCow = {
  id: 'bai-toan-khoi-luong',
  label: 'Bài toán khối lượng',
  make(rand) {
    return calfStory(int(rand, 1, 9) * 10, int(rand, 15, 30) * 10);
  },
};

/** The parts of the review of measures, in book order. */
export const MEASURE_SKILLS = [
  massConvert,
  measureCalc,
  measureCompare,
  calfCow,
  areaConvert,
  timeConvert,
  protractorReading,
  plotArea,
];
