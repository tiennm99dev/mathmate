/**
 * The mixed practice of the decimals chapter: reading a decimal, the place
 * of a digit, a decimal fraction written as a decimal, comparing two
 * decimals, the largest of four, a measure written as a decimal, rounding
 * and a word problem. One question of each part in a shuffled order. A
 * decimal fraction to rewrite is the question's `visual`. Pure and
 * DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { capitalize, mixOptions, signOptions } from '#lib/core/kid/quiz.js';
import {
  DECIMAL_PLACES,
  ROUND_TARGETS,
  ascending,
  decText,
  decimalSign,
  decimalWhy,
  readDecimal,
  roundDecimal,
  roundWhy,
  toScaled,
  trimZeros,
} from '../_shared/decimals.js';

/** @typedef {{ n: number, d: number }} Visual */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** What each part of the round practises, in the book's order. */
export const KIND_LABELS = /** @type {const} */ ({
  'doc-so': 'Đọc số thập phân',
  hang: 'Hàng của số thập phân',
  'phan-so': 'Phân số thập phân và số thập phân',
  'so-sanh': 'So sánh hai số thập phân',
  'lon-nhat': 'Tìm số lớn nhất',
  'doi-don-vi': 'Viết số đo dưới dạng số thập phân',
  'lam-tron': 'Làm tròn số thập phân',
  'bai-toan': 'Bài toán thực tế',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/**
 * A decimal part of `length` digits whose last digit is not 0.
 * @param {() => number} rand
 * @param {number} length
 */
function fracDigits(rand, length) {
  let s = '';
  for (let i = 0; i < length - 1; i++) s += String(int(rand, 0, 9));
  return s + String(int(rand, 1, 9));
}

/** The number an option starts with ('8,56' of '8,56 m'), or null. @param {string} text */
const leadingNumber = (text) => /^\d+(?:,\d+)?/.exec(text)?.[0] ?? null;

/**
 * The right option among up to three wrong ones, shuffled. A wrong option
 * equal to the right one or to an option already kept, or of the same value
 * (29,0 against 29), is left out.
 * @param {() => number} rand
 * @param {string} right
 * @param {string[]} wrong
 */
function choices(rand, right, wrong) {
  /** @type {string[]} */
  const kept = [];
  for (const w of wrong) {
    const n = leadingNumber(w);
    const clash = [right, ...kept].some((k) => {
      const m = leadingNumber(k);
      return k === w || (m !== null && n !== null && decimalSign(n, m) === '=');
    });
    if (!clash && kept.length < 3) kept.push(w);
  }
  return mixOptions(rand, right, kept);
}

/** @type {Record<Kind, (rand: () => number) => Omit<Question, 'kind'>>} */
const MAKERS = {
  'doc-so'(rand) {
    const whole = int(rand, 0, 99);
    const frac = (rand() < 0.4 ? '0' : '') + fracDigits(rand, int(rand, 1, 2));
    const t = `${whole},${frac}`;
    const bare = frac.replace(/^0+/, '');
    const wrong = [
      `${whole},${bare === frac ? `0${frac}` : bare}`,
      `${bare},${whole}`,
      `${whole + 1},${frac}`,
    ].map(readDecimal);
    return {
      prompt: `Số ${t} đọc là gì?`,
      ...choices(rand, readDecimal(t), wrong),
      hint: 'Đọc phần nguyên, đọc "phẩy", rồi đọc phần thập phân. Chữ số 0 ngay sau dấu phẩy đọc là "không".',
      solution: `${t} có phần nguyên ${whole}, phần thập phân ${frac}. Đọc là: ${readDecimal(t)}.`,
    };
  },
  hang(rand) {
    const digits = shuffle(rand, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
    const t = `${digits[0]},${digits.slice(1).join('')}`;
    const place = int(rand, 1, 3);
    const d = digits[place];
    const names = DECIMAL_PLACES.map((n) => `Hàng ${n}`);
    const right = names[place - 1];
    return {
      prompt: `Trong số ${t}, chữ số ${d} ở hàng nào?`,
      ...choices(rand, right, [...names, 'Hàng đơn vị']),
      hint: 'Sau dấu phẩy, các hàng lần lượt là: phần mười, phần trăm, phần nghìn.',
      solution: `${t}: ${digits[1]} ở hàng phần mười, ${digits[2]} ở hàng phần trăm, ${digits[3]} ở hàng phần nghìn. Vậy chữ số ${d} ở ${right.toLowerCase()}.`,
    };
  },
  'phan-so'(rand) {
    const places = int(rand, 1, 3);
    const drawn = int(rand, 1, places === 1 ? 99 : 999);
    // A last digit 0 would give a decimal ending in 0 (10/100 = 0,10).
    const n = drawn % 10 === 0 ? drawn + 1 : drawn;
    const d = 10 ** places;
    const right = decText(n, places);
    const wrong = [
      decText(n, places + 1),
      decText(n, places - 1),
      String(n),
      decText(n * 10, places),
    ];
    return {
      prompt: 'Viết phân số thập phân thành số thập phân.',
      visual: { n, d },
      ...choices(rand, right, wrong),
      hint: `Mẫu số ${d} có ${places} chữ số 0, nên số thập phân có ${places} chữ số sau dấu phẩy.`,
      solution: `${n}/${d} là ${n} ${DECIMAL_PLACES[places - 1]}, viết là ${right}.`,
    };
  },
  'so-sanh'(rand) {
    const whole = int(rand, 0, 30);
    const x = int(rand, 1, 9);
    // The longer decimal part is the trap: 8,7 against 8,65 or 8,72.
    const y = pick(
      rand,
      [x - 1, x, x + 1].filter((v) => v >= 0 && v <= 9),
    );
    const a = `${whole},${x}`;
    const b = `${whole},${y}${int(rand, 1, 9)}`;
    const [first, second] = rand() < 0.5 ? [a, b] : [b, a];
    const sign = decimalSign(first, second);
    return {
      prompt: `Chọn dấu đúng: ${first} ? ${second}`,
      ...signOptions(sign),
      hint: 'Phần nguyên bằng nhau. So sánh hàng phần mười trước, rồi đến hàng phần trăm.',
      solution: decimalWhy(first, second),
    };
  },
  'lon-nhat'(rand) {
    const whole = int(rand, 0, 20);
    const a = int(rand, 1, 9);
    // The largest is sometimes the shortest, so counting digits does not help.
    const list = [
      rand() < 0.5 ? `${whole},${a}` : `${whole},${a}${int(rand, 1, 9)}`,
      `${whole},${a - 1}${int(rand, 1, 9)}`,
      `${whole},0${int(rand, 1, 9)}`,
      `${whole},${a - 1}${int(rand, 0, 9)}${int(rand, 1, 9)}`,
    ];
    const uniq = [...new Set(list)];
    const right = ascending(uniq)[uniq.length - 1];
    return {
      prompt: 'Số nào lớn nhất?',
      ...choices(rand, right, uniq),
      hint: 'Phần nguyên bằng nhau. So sánh lần lượt hàng phần mười, phần trăm, phần nghìn.',
      solution: `Sắp xếp từ bé đến lớn: ${ascending(uniq).join('; ')}. Số lớn nhất là ${right}.`,
    };
  },
  'doi-don-vi'(rand) {
    const [big, small, per] = pick(
      rand,
      /** @type {const} */ ([
        ['m', 'cm', 100],
        ['m', 'dm', 10],
        ['kg', 'g', 1000],
        ['tấn', 'kg', 1000],
        ['km', 'm', 1000],
        ['m²', 'dm²', 100],
      ]),
    );
    const places = Math.round(Math.log10(per));
    const a = int(rand, 1, 20);
    const drawn = int(rand, 1, per - 1);
    const b = drawn % 10 === 0 ? drawn - 1 : drawn;
    const right = trimZeros(decText(a * per + b, places));
    const wrong = [
      `${a},${b}`,
      `${a},0${b}`,
      trimZeros(decText(a * per + b, places + 1)),
      fmt(a * per + b),
    ];
    const part = trimZeros(decText(b, places));
    return {
      prompt: `${a} ${big} ${b} ${small} = ? ${big}`,
      ...choices(
        rand,
        `${right} ${big}`,
        wrong.map((w) => `${w} ${big}`),
      ),
      hint: `1 ${big} = ${per} ${small}. Vậy ${b} ${small} là mấy phần của 1 ${big}?`,
      solution: `${b} ${small} = ${b}/${per} ${big} = ${part} ${big}, nên ${a} ${big} ${b} ${small} = ${right} ${big}.`,
    };
  },
  'lam-tron'(rand) {
    const places = int(rand, 0, 2);
    const t = `${int(rand, 0, 30)},${fracDigits(rand, places + 1 + int(rand, 0, 1))}`;
    const right = roundDecimal(t, places);
    const { scaled, places: have } = toScaled(t);
    const low = Math.floor(scaled / 10 ** (have - places));
    const other = decText(roundDecimal(t, places) === decText(low, places) ? low + 1 : low, places);
    const wrong = [
      other,
      roundDecimal(t, Math.min(2, places + 1)),
      roundDecimal(t, Math.max(0, places - 1)),
      t,
    ];
    return {
      prompt: `Làm tròn ${t} đến ${ROUND_TARGETS[places]}.`,
      ...choices(rand, right, wrong),
      hint: `Nhìn chữ số ở hàng ngay bên phải ${places === 0 ? 'phần nguyên' : `hàng ${DECIMAL_PLACES[places - 1]}`}, rồi so sánh với 5.`,
      solution: roundWhy(t, places),
    };
  },
  'bai-toan'(rand) {
    const names = ['An', 'Bình', 'Chi'];
    const times = new Set();
    while (times.size < 3) times.add(`${int(rand, 9, 10)},${fracDigits(rand, int(rand, 1, 2))}`);
    const list = /** @type {string[]} */ ([...times]);
    const fastest = ascending(list)[0];
    const who = names[list.indexOf(fastest)];
    const said = list.map((t, i) => `${names[i]} ${t} giây`).join(', ');
    return {
      prompt: `Ba bạn chạy 60 m. Thời gian: ${said}. Bạn nào chạy nhanh nhất?`,
      ...choices(rand, who, names),
      hint: 'Chạy nhanh nhất là chạy hết ít thời gian nhất: tìm số bé nhất.',
      solution: `Sắp xếp từ bé đến lớn: ${ascending(list).join('; ')}. ${capitalize(who)} chạy hết ít thời gian nhất (${fastest} giây), nên chạy nhanh nhất.`,
    };
  },
};

/**
 * One question of each part in a seeded order; seed 1 is the first round.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => ({ ...MAKERS[kind](rand), kind }));
}

/**
 * Whether a question's options are sentences, stacked one per row.
 * @param {Question} q
 */
export const isSentence = (q) => q.kind === 'doc-so';
