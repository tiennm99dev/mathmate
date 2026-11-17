/**
 * The adaptive review of decimals: reading and writing them, the places
 * after the comma, decimal fractions, comparing, the largest and smallest of
 * a set, rounding, and measures written as decimals. Numbers are kept exact as
 * integers scaled by a power of ten. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { capitalize, mixOptions, signOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import { DECIMAL_PLACES, num, placesText, readDecimal, valueOptions } from './decimals.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */

/** @type {Skill} */
export const readSkill = {
  id: 'doc-so',
  label: 'Đọc số thập phân',
  make(rand) {
    const places = int(rand, 2, 3);
    const whole = int(rand, 1, 99);
    const top = 10 ** places;
    // A decimal part with a zero right after the comma half of the time.
    let frac = rand() < 0.5 ? int(rand, 1, top / 10 - 1) : int(rand, top / 10, top - 1);
    // No zero at the end, so no option reads an equal decimal written shorter.
    if (frac % 10 === 0) frac += 1;
    const n = whole * top + frac;
    const rest = String(frac).replace(/0+$/, '');
    const wrong = [
      readDecimal(whole * 10 ** rest.length + Number(rest), rest.length),
      readDecimal(n, places + 1),
      readDecimal(n, places - 1),
      readDecimal(whole * top * 10 + frac, places + 1),
    ];
    return {
      prompt: `Số ${placesText(n, places)} đọc là gì?`,
      ...mixOptions(rand, capitalize(readDecimal(n, places)), wrong.map(capitalize)),
      hint: 'Em đọc phần nguyên, rồi đọc "phẩy", rồi đọc phần thập phân. Chữ số 0 ngay sau dấu phẩy đọc là "không".',
      solution: `Phần nguyên là ${whole}, phần thập phân là ${String(frac).padStart(places, '0')}. Số ${placesText(n, places)} đọc là: ${readDecimal(n, places)}.`,
    };
  },
};

/** @type {Skill} */
export const writeSkill = {
  id: 'viet-so',
  label: 'Viết số thập phân',
  make(rand) {
    const whole = int(rand, 1, 9);
    // Three places after the comma with a zero in the tenths or hundredths.
    const digits = [int(rand, 1, 9), int(rand, 1, 9), int(rand, 1, 9)];
    digits[int(rand, 0, 1)] = 0;
    const parts = [
      `${whole} đơn vị`,
      ...digits.flatMap((d, i) => (d ? [`${d} ${DECIMAL_PLACES[i]}`] : [])),
    ];
    const said = `${parts.slice(0, -1).join(', ')} và ${parts.at(-1)}`;
    const n = whole * 1000 + Number(digits.join(''));
    const squeezed = Number(`${whole}${digits.filter((d) => d).join('')}`);
    const wrong = [
      placesText(squeezed, digits.filter((d) => d).length),
      placesText(n, 2),
      placesText(n, 4),
      placesText(whole * 10000 + Number(digits.join('')), 4),
    ];
    return {
      prompt: `Số gồm ${said} viết là số nào?`,
      ...mixOptions(rand, placesText(n, 3), wrong),
      hint: 'Sau dấu phẩy lần lượt là hàng phần mười, phần trăm, phần nghìn. Hàng nào không có thì em viết chữ số 0.',
      solution: `Hàng phần mười là ${digits[0]}, hàng phần trăm là ${digits[1]}, hàng phần nghìn là ${digits[2]}. Số đó viết là ${placesText(n, 3)}.`,
    };
  },
};

const PLACE_ROWS = /** @type {const} */ ([
  'hàng chục',
  'hàng đơn vị',
  'hàng phần mười',
  'hàng phần trăm',
  'hàng phần nghìn',
]);

/** @type {Skill} */
export const placeSkill = {
  id: 'hang',
  label: 'Hàng của số thập phân',
  make(rand) {
    // Five different digits, the first not 0: tens, ones, then three places.
    const digits = shuffle(rand, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]).slice(0, 5);
    if (digits[0] === 0) [digits[0], digits[4]] = [digits[4], digits[0]];
    if (digits[4] === 0) [digits[3], digits[4]] = [digits[4], digits[3]];
    const n = Number(digits.join(''));
    const at = rand() < 0.25 ? 1 : int(rand, 2, 4);
    const right = PLACE_ROWS[at];
    const wrong = shuffle(
      rand,
      PLACE_ROWS.filter((p) => p !== right),
    ).slice(0, 3);
    return {
      prompt: `Trong số ${placesText(n, 3)}, chữ số ${digits[at]} ở hàng nào?`,
      ...mixOptions(rand, capitalize(right), wrong.map(capitalize)),
      hint: 'Em tìm dấu phẩy. Bên trái dấu phẩy là phần nguyên, bên phải dấu phẩy là phần thập phân.',
      solution: `Số ${placesText(n, 3)} có phần nguyên ${digits[0]}${digits[1]}: chữ số ${digits[0]} ở hàng chục, chữ số ${digits[1]} ở hàng đơn vị. Sau dấu phẩy: ${digits[2]} ở hàng phần mười, ${digits[3]} ở hàng phần trăm, ${digits[4]} ở hàng phần nghìn. Vậy chữ số ${digits[at]} ở ${right}.`,
    };
  },
};

/** @type {Skill} */
export const fractionSkill = {
  id: 'phan-so-thap-phan',
  label: 'Phân số thập phân',
  make(rand) {
    const k = int(rand, 1, 3);
    const den = 10 ** k;
    let p = int(rand, 1, k === 1 ? 99 : 999);
    if (p % 10 === 0) p += int(rand, 1, 9);
    const right = p / den;
    return {
      prompt: `Phân số thập phân ${p}/${fmt(den)} viết thành số thập phân là số nào?`,
      ...valueOptions(right, [p / 10 ** (k - 1), p / 10 ** (k + 1), p / 10 ** (k + 2)]),
      hint: `Mẫu số có ${k} chữ số 0, nên phần thập phân có ${k} chữ số.`,
      solution: `${p}/${fmt(den)} = ${num(right)}: mẫu số có ${k} chữ số 0 nên sau dấu phẩy có ${k} chữ số.`,
    };
  },
};

/**
 * Two decimals that are easy to compare wrongly: a longer decimal part that
 * is smaller, zeros at the end, or a different whole part. Each is a scaled
 * integer with its number of places.
 * @param {() => number} rand
 * @returns {[{ n: number, places: number }, { n: number, places: number }]}
 */
export function comparePair(rand) {
  const whole = int(rand, 0, 50);
  const kind = pick(rand, ['dai-hon', 'so-0', 'phan-nguyen', 'hang']);
  if (kind === 'dai-hon') {
    const t = int(rand, 2, 9);
    const a = { n: whole * 10 + t, places: 1 };
    const b = { n: whole * 100 + (t - 1) * 10 + int(rand, 1, 9), places: 2 };
    return rand() < 0.5 ? [a, b] : [b, a];
  }
  if (kind === 'so-0') {
    const t = int(rand, 1, 9);
    return [
      { n: whole * 100 + t * 10, places: 2 },
      { n: whole * 10 + t, places: 1 },
    ];
  }
  if (kind === 'phan-nguyen') {
    return [
      { n: (whole + 1) * 10 + int(rand, 0, 4), places: 1 },
      { n: whole * 100 + int(rand, 50, 99), places: 2 },
    ];
  }
  const a = whole * 1000 + int(rand, 100, 999);
  const b = a + pick(rand, [-10, -1, 1, 10, 100, -100]);
  return [
    { n: a, places: 3 },
    { n: b > whole * 1000 ? b : a + 1, places: 3 },
  ];
}

/** A scaled decimal as thousandths, to compare. @param {{ n: number, places: number }} d */
const thousandths = (d) => d.n * 10 ** (3 - d.places);

/** @type {Skill} */
export const compareSkill = {
  id: 'so-sanh',
  label: 'So sánh số thập phân',
  make(rand) {
    const [a, b] = comparePair(rand);
    const sign = compareSign(thousandths(a), thousandths(b));
    const at = placesText(a.n, a.places);
    const bt = placesText(b.n, b.places);
    return {
      prompt: `Chọn dấu thích hợp: ${at} ? ${bt}`,
      ...signOptions(sign),
      hint: 'Em so sánh phần nguyên trước. Phần nguyên bằng nhau thì so sánh lần lượt hàng phần mười, phần trăm, phần nghìn.',
      solution:
        sign === '='
          ? `Viết thêm chữ số 0 vào bên phải phần thập phân, giá trị không đổi. Vậy ${at} = ${bt}.`
          : `Viết cho đủ ba chữ số sau dấu phẩy: ${placesText(thousandths(a), 3)} và ${placesText(thousandths(b), 3)}. So sánh từ trái sang phải được ${at} ${sign} ${bt}.`,
    };
  },
};

/** @type {Skill} */
export const extremeSkill = {
  id: 'lon-nhat-be-nhat',
  label: 'Số lớn nhất, số bé nhất',
  make(rand) {
    const whole = int(rand, 1, 20);
    const t = int(rand, 2, 8);
    // Four decimals with the same whole part and close decimal parts.
    const values = [
      { n: whole * 10 + t, places: 1 },
      { n: whole * 100 + t * 10 + int(rand, 1, 9), places: 2 },
      { n: whole * 100 + (t - 1) * 10 + int(rand, 1, 9), places: 2 },
      { n: whole * 1000 + (t + 1) * 100 + int(rand, 1, 9), places: 3 },
    ];
    const largest = rand() < 0.5;
    const sorted = [...values].sort((x, y) => thousandths(x) - thousandths(y));
    const right = largest ? sorted[3] : sorted[0];
    const text = (/** @type {{ n: number, places: number }} */ d) => placesText(d.n, d.places);
    return {
      prompt: `Số nào ${largest ? 'lớn nhất' : 'bé nhất'}?`,
      ...mixOptions(rand, text(right), values.filter((v) => v !== right).map(text)),
      hint: 'Các số có cùng phần nguyên. Em so sánh chữ số hàng phần mười trước, đừng nhìn số chữ số sau dấu phẩy.',
      solution: `Xếp theo thứ tự từ bé đến lớn: ${sorted.map(text).join('; ')}. Số ${largest ? 'lớn nhất' : 'bé nhất'} là ${text(right)}.`,
    };
  },
};

const ROUND_TO = /** @type {const} */ ([
  'số tự nhiên gần nhất',
  'hàng phần mười',
  'hàng phần trăm',
]);

/**
 * Rounds a decimal of three places, scaled by 1 000, to `places` places by
 * the book's rule; the result is scaled by 10^places.
 * @param {number} n
 * @param {number} places 0, 1 or 2
 */
export function roundScaled(n, places) {
  const unit = 10 ** (3 - places);
  const next = Math.floor(n / (unit / 10)) % 10;
  return Math.floor(n / unit) + (next >= 5 ? 1 : 0);
}

/** @type {Skill} */
export const roundSkill = {
  id: 'lam-tron',
  label: 'Làm tròn số thập phân',
  make(rand) {
    let n = int(rand, 1, 99) * 1000 + int(rand, 101, 999);
    if (n % 10 === 0) n += int(rand, 1, 9);
    const places = int(rand, 0, 2);
    const right = roundScaled(n, places);
    const down = Math.floor(n / 10 ** (3 - places));
    const candidates = [...new Set([right, down, down + 1, right + 1, right - 1])].filter(
      (v) => v > 0,
    );
    const values = [right, ...candidates.filter((v) => v !== right).slice(0, 3)].sort(
      (x, y) => x - y,
    );
    const nextName = ['phần mười', 'phần trăm', 'phần nghìn'][places];
    const digit = Math.floor(n / 10 ** (2 - places)) % 10;
    return {
      prompt: `Làm tròn số ${placesText(n, 3)} đến ${ROUND_TO[places]} được số nào?`,
      options: values.map((v) => placesText(v, places)),
      answer: values.indexOf(right),
      hint: `Em nhìn chữ số ở hàng ${nextName}, ngay bên phải hàng cần làm tròn. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.`,
      solution: `Chữ số hàng ${nextName} của ${placesText(n, 3)} là ${digit}; ${digit < 5 ? `${digit} < 5 nên làm tròn xuống` : `${digit} ≥ 5 nên làm tròn lên`}. Làm tròn đến ${ROUND_TO[places]} được ${placesText(right, places)}.`,
    };
  },
};

/**
 * Measures written as decimals: a smaller unit in a larger one, with the
 * power of ten between them.
 */
const UNIT_PAIRS = /** @type {const} */ ([
  { small: 'mm', big: 'm', k: 3 },
  { small: 'cm', big: 'm', k: 2 },
  { small: 'dm', big: 'm', k: 1 },
  { small: 'm', big: 'km', k: 3 },
  { small: 'g', big: 'kg', k: 3 },
  { small: 'kg', big: 'tấn', k: 3 },
  { small: 'ml', big: 'l', k: 3 },
]);

/** @type {Skill} */
export const measureSkill = {
  id: 'so-do',
  label: 'Viết số đo dưới dạng số thập phân',
  make(rand) {
    const { small, big, k } = pick(rand, UNIT_PAIRS);
    const top = 10 ** k;
    const whole = rand() < 0.5 ? 0 : int(rand, 1, 9);
    let part = int(rand, 1, top - 1);
    if (k > 1 && rand() < 0.5) part = int(rand, 1, top / 10 - 1);
    const right = whole + part / top;
    const given = whole ? `${whole} ${big} ${part} ${small}` : `${part} ${small}`;
    return {
      prompt: `${given} = ? ${big}`,
      ...valueOptions(right, [whole + part / 10 ** (k - 1), whole + part / 10 ** (k + 1)], {
        near: [1 / top, 2 / top],
        unit: big,
      }),
      hint: `${fmt(top)} ${small} = 1 ${big}. Em viết ${part} ${small} thành phân số thập phân của ${big} trước.`,
      solution: `${part} ${small} = ${part}/${fmt(top)} ${big} = ${num(part / top)} ${big}. Vậy ${given} = ${num(right)} ${big}.`,
    };
  },
};

/** The parts of the decimals review, in book order. */
export const DECIMAL_SKILLS = [
  readSkill,
  writeSkill,
  placeSkill,
  fractionSkill,
  compareSkill,
  extremeSkill,
  roundSkill,
  measureSkill,
];
