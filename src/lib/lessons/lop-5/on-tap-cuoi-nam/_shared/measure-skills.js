/**
 * The adaptive review of measures at the end of grade 5: converting lengths,
 * masses, areas, volumes and times, writing a measure as a decimal,
 * comparing two measures, and adding or subtracting times. Every value is
 * drawn as a whole number in the smaller unit, so stored answers are exact.
 * Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { mixOptions, signOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import { num, valueOptions } from './values.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */

/**
 * Pairs of a big and a small unit with how many small units make one big
 * one, by kind of measure.
 * @typedef {{ big: string, small: string, ratio: number }} Pair
 */

/** @type {Pair[]} */
export const LENGTH = [
  { big: 'km', small: 'm', ratio: 1000 },
  { big: 'm', small: 'cm', ratio: 100 },
  { big: 'm', small: 'dm', ratio: 10 },
  { big: 'dm', small: 'mm', ratio: 100 },
];

/** @type {Pair[]} */
export const MASS = [
  { big: 'tấn', small: 'kg', ratio: 1000 },
  { big: 'tạ', small: 'kg', ratio: 100 },
  { big: 'yến', small: 'kg', ratio: 10 },
  { big: 'kg', small: 'g', ratio: 1000 },
];

/** @type {Pair[]} */
export const AREA = [
  { big: 'km²', small: 'ha', ratio: 100 },
  { big: 'ha', small: 'm²', ratio: 10000 },
  { big: 'm²', small: 'dm²', ratio: 100 },
  { big: 'dm²', small: 'cm²', ratio: 100 },
  { big: 'cm²', small: 'mm²', ratio: 100 },
];

/** @type {Pair[]} */
export const VOLUME = [
  { big: 'm³', small: 'dm³', ratio: 1000 },
  { big: 'dm³', small: 'cm³', ratio: 1000 },
  { big: 'l', small: 'ml', ratio: 1000 },
];

/**
 * A compound measure "a big b small" written in the small unit, or in the
 * big unit as a decimal: 3 km 45 m = 3 045 m or 3,045 km.
 * @param {() => number} rand
 * @param {Pair} pair
 */
export function convertQuestion(rand, pair) {
  const { big, small, ratio } = pair;
  const a = int(rand, 1, 9);
  let b = int(rand, 1, ratio - 1);
  if (ratio >= 100 && rand() < 0.5) b = int(rand, 1, 9);
  const total = a * ratio + b;
  const toSmall = rand() < 0.5;
  const shown = `${a} ${big} ${fmt(b)} ${small}`;
  if (toSmall) {
    // The slip of writing the two numbers side by side.
    const glued = Number(`${a}${b}`);
    return {
      prompt: `${shown} = ? ${small}`,
      ...valueOptions(total, [glued, a * ratio * 10 + b, a + b], { unit: small }),
      hint: `1 ${big} = ${fmt(ratio)} ${small}. Em đổi ${a} ${big} ra ${small} rồi cộng thêm ${fmt(b)} ${small}.`,
      solution: `${a} ${big} = ${fmt(a * ratio)} ${small}, nên ${shown} = ${fmt(a * ratio)} ${small} + ${fmt(b)} ${small} = ${fmt(total)} ${small}.`,
    };
  }
  const right = total / ratio;
  return {
    prompt: `Viết số đo dưới dạng số thập phân: ${shown} = ? ${big}`,
    ...valueOptions(right, [a + b / (ratio * 10), a + b / (ratio / 10 || 1), Number(`${a}.${b}`)], {
      unit: big,
    }),
    hint: `1 ${small} = 1/${fmt(ratio)} ${big}. Em viết ${fmt(b)} ${small} thành phân số thập phân của ${big}.`,
    solution: `${fmt(b)} ${small} = ${fmt(b)}/${fmt(ratio)} ${big}, nên ${shown} = ${num(right)} ${big}.`,
  };
}

/** @type {Skill} */
export const lengthSkill = {
  id: 'do-dai',
  label: 'Đổi đơn vị đo độ dài',
  make: (rand) => convertQuestion(rand, pick(rand, LENGTH)),
};

/** @type {Skill} */
export const massSkill = {
  id: 'khoi-luong',
  label: 'Đổi đơn vị đo khối lượng',
  make: (rand) => convertQuestion(rand, pick(rand, MASS)),
};

/** @type {Skill} */
export const areaSkill = {
  id: 'dien-tich',
  label: 'Đổi đơn vị đo diện tích',
  make(rand) {
    const pair = pick(rand, AREA);
    const n = int(rand, 2, 30);
    const up = rand() < 0.5;
    const right = up ? n * pair.ratio : n;
    const given = up ? n : n * pair.ratio;
    const from = up ? pair.big : pair.small;
    const to = up ? pair.small : pair.big;
    return {
      prompt: `${fmt(given)} ${from} = ? ${to}`,
      ...valueOptions(
        right,
        up ? [n * 10, n * pair.ratio * 10, n * 1000] : [given / 10, n * 10, given],
        {
          unit: to,
        },
      ),
      hint: `1 ${pair.big} = ${fmt(pair.ratio)} ${pair.small}.`,
      solution: up
        ? `${fmt(given)} ${from} = ${fmt(n)} × ${fmt(pair.ratio)} ${to} = ${fmt(right)} ${to}.`
        : `${fmt(given)} ${from} = ${fmt(given)} : ${fmt(pair.ratio)} ${to} = ${fmt(right)} ${to}.`,
    };
  },
};

/** @type {Skill} */
export const volumeSkill = {
  id: 'the-tich',
  label: 'Đổi đơn vị đo thể tích',
  make(rand) {
    if (rand() < 0.3) {
      const n = int(rand, 2, 40);
      const toLitre = rand() < 0.5;
      return toLitre
        ? {
            prompt: `${n} dm³ = ? l`,
            ...valueOptions(n, [n * 10, n * 1000, n * 100], { unit: 'l' }),
            hint: 'Một hộp có thể tích 1 dm³ chứa vừa đầy 1 lít nước.',
            solution: `1 dm³ = 1 l, nên ${n} dm³ = ${n} l.`,
          }
        : {
            prompt: `${n} cm³ = ? ml`,
            ...valueOptions(n, [n * 10, n * 1000, n * 100], { unit: 'ml' }),
            hint: 'Một hộp có thể tích 1 cm³ chứa vừa đầy 1 ml nước.',
            solution: `1 cm³ = 1 ml, nên ${n} cm³ = ${n} ml.`,
          };
    }
    return convertQuestion(rand, pick(rand, VOLUME));
  },
};

/** @type {Skill} */
export const timeSkill = {
  id: 'thoi-gian',
  label: 'Đổi đơn vị đo thời gian',
  make(rand) {
    const way = int(rand, 0, 2);
    if (way === 0) {
      const h = int(rand, 1, 5);
      const m = int(rand, 5, 55);
      const right = h * 60 + m;
      return {
        prompt: `${h} giờ ${m} phút = ? phút`,
        ...valueOptions(right, [h * 100 + m, h + m, right + 60], { unit: 'phút' }),
        hint: '1 giờ = 60 phút. Em đổi số giờ ra phút rồi cộng thêm số phút.',
        solution: `${h} giờ = ${h * 60} phút, nên ${h} giờ ${m} phút = ${h * 60} phút + ${m} phút = ${right} phút.`,
      };
    }
    if (way === 1) {
      const tenths = pick(rand, [1, 2, 3, 5, 7, 8]);
      const h = int(rand, 1, 4);
      const value = h + tenths / 10;
      const right = h * 60 + tenths * 6;
      return {
        prompt: `${num(value)} giờ = ? phút`,
        ...valueOptions(right, [h * 60 + tenths, h * 100 + tenths * 10, right + 6], {
          unit: 'phút',
        }),
        hint: '1 giờ = 60 phút. Em nhân số giờ với 60.',
        solution: `${num(value)} giờ = ${num(value)} × 60 phút = ${right} phút.`,
      };
    }
    const years = int(rand, 2, 9);
    const months = int(rand, 1, 11);
    const right = years * 12 + months;
    return {
      prompt: `${years} năm ${months} tháng = ? tháng`,
      ...valueOptions(right, [years * 10 + months, years * 12, right + 12], { unit: 'tháng' }),
      hint: '1 năm = 12 tháng.',
      solution: `${years} năm = ${years * 12} tháng, nên ${years} năm ${months} tháng = ${right} tháng.`,
    };
  },
};

/** @type {Skill} */
export const compareSkill = {
  id: 'so-sanh-so-do',
  label: 'So sánh hai số đo',
  make(rand) {
    const pair = pick(rand, [LENGTH[0], MASS[0], MASS[3], VOLUME[2]]);
    const { big, small, ratio } = pair;
    const a = int(rand, 1, 9);
    const b = pick(
      rand,
      [5, 50, 500].filter((v) => v < ratio),
    );
    const left = `${a} ${big} ${b} ${small}`;
    // The decimal written by gluing b after the comma: a,b big.
    const glued = Number(`${a}.${b}`);
    const tenth = a + pick(rand, [1, 2, 4, 5, 6]) / 10;
    const right = rand() < 0.5 ? glued : tenth;
    const sign = compareSign(a * ratio + b, Math.round(right * ratio));
    return {
      prompt: `Chọn dấu thích hợp: ${left} ? ${num(right)} ${big}`,
      ...signOptions(sign),
      hint: `Em đổi hai số đo về cùng một đơn vị (${small}) rồi so sánh.`,
      solution: `${left} = ${fmt(a * ratio + b)} ${small}; ${num(right)} ${big} = ${fmt(Math.round(right * ratio))} ${small}. Vậy ${left} ${sign} ${num(right)} ${big}.`,
    };
  },
};

/**
 * Minutes as "a giờ b phút" (or "b phút" under an hour).
 * @param {number} minutes
 */
export function hoursMinutes(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} phút`;
  return m === 0 ? `${h} giờ` : `${h} giờ ${m} phút`;
}

/** @type {Skill} */
export const timeSumSkill = {
  id: 'cong-tru-thoi-gian',
  label: 'Cộng, trừ số đo thời gian',
  make(rand) {
    const x = int(rand, 1, 5) * 60 + int(rand, 20, 55);
    const y = int(rand, 1, 3) * 60 + int(rand, 10, 50);
    const add = rand() < 0.5;
    const [a, b] = add ? [x, y] : [x + y, y];
    const right = add ? a + b : a - b;
    const ah = Math.floor(a / 60);
    const bh = Math.floor(b / 60);
    const am = a % 60;
    const bm = b % 60;
    // Not changing 60 minutes into an hour, or not borrowing one.
    const slip = add
      ? `${ah + bh} giờ ${am + bm} phút`
      : `${ah - bh} giờ ${Math.abs(am - bm)} phút`;
    const sign = add ? '+' : '−';
    return {
      prompt: `${hoursMinutes(a)} ${sign} ${hoursMinutes(b)} = ?`,
      ...mixOptions(rand, hoursMinutes(right), [
        slip,
        hoursMinutes(right + 60),
        hoursMinutes(right - 10),
      ]),
      hint: add
        ? 'Em cộng giờ với giờ, phút với phút. Số phút từ 60 trở lên thì đổi 60 phút thành 1 giờ.'
        : 'Em trừ giờ cho giờ, phút cho phút. Số phút bị trừ bé hơn thì đổi 1 giờ thành 60 phút.',
      solution: `${hoursMinutes(a)} ${sign} ${hoursMinutes(b)} = ${hoursMinutes(right)}.`,
    };
  },
};

/** @type {Skill[]} */
export const MEASURE_SKILLS = [
  lengthSkill,
  massSkill,
  areaSkill,
  volumeSkill,
  timeSkill,
  compareSkill,
  timeSumSkill,
];
