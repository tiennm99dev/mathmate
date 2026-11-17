/**
 * The adaptive review of natural numbers: reading numbers, writing a number
 * from the sum of its places, the value of a digit, consecutive natural, even
 * and odd numbers, facts about the sequence of natural numbers, the largest
 * and the smallest, ordering, rounding, and the smallest or largest even or
 * odd number made from four digit cards. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { capitalize, mixOptions, slipOptions } from '#lib/core/kid/quiz.js';
import {
  PLACE_NAMES,
  capitalReading,
  digitAt,
  readWhole,
  roundTo,
  roundWhy,
  sumParts,
  valueAt,
} from '#lib/core/kid/whole-numbers.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */

/**
 * A number of `count` digits with zeros in two or three places after the
 * first, the kind a child misreads or miswrites.
 * @param {() => number} rand
 * @param {number} count
 */
export function withZeros(rand, count) {
  const d = Array.from({ length: count }, () => int(rand, 1, 9));
  const places = shuffle(
    rand,
    Array.from({ length: count - 1 }, (_, i) => i + 1),
  ).slice(0, int(rand, 2, 3));
  for (const i of places) d[i] = 0;
  return Number(d.join(''));
}

/**
 * The digits of `n` with places `i` and `j` (from the left) swapped.
 * @param {number} n
 * @param {number} i
 * @param {number} j
 */
export function swapped(n, i, j) {
  const d = String(n).split('');
  [d[i], d[j]] = [d[j], d[i]];
  return Number(d.join(''));
}

/**
 * Numbers a child reads instead of `n`: two digits swapped, a zero lost or
 * one too many. Each differs from `n`.
 * @param {number} n
 */
export function readingSlips(n) {
  const len = String(n).length;
  const slips = [
    swapped(n, len - 2, len - 1),
    swapped(n, 1, 2),
    swapped(n, len - 3, len - 2),
    Math.floor(n / 10),
    n * 10,
    swapped(n, 2, 4),
  ];
  return [...new Set(slips)].filter((v) => v !== n && String(v).length >= len - 1);
}

/** @type {Skill} */
export const readNumber = {
  id: 'doc-so',
  label: 'Đọc số',
  make(rand) {
    const n = withZeros(rand, int(rand, 6, 9));
    return {
      prompt: `Số ${fmt(n)} đọc là gì?`,
      ...mixOptions(rand, capitalReading(n), readingSlips(n).slice(0, 3).map(capitalReading)),
      hint: 'Em tách số thành từng lớp: lớp triệu, lớp nghìn, lớp đơn vị. Em đọc từng lớp từ trái sang phải, kèm tên lớp.',
      solution: `Số ${fmt(n)} đọc là: ${readWhole(n)}.`,
    };
  },
};

/** @type {Skill} */
export const placeSum = {
  id: 'tong-cac-hang',
  label: 'Viết số thành tổng',
  make(rand) {
    const n = withZeros(rand, int(rand, 5, 7));
    const parts = sumParts(n);
    const sum = parts.map(fmt).join(' + ');
    if (rand() < 0.5) {
      // The slips: the empty places left out, or one place moved.
      const squeezed = Number(parts.map((p) => String(p)[0]).join(''));
      return {
        prompt: `${sum} = ?`,
        ...slipOptions(n, [squeezed, n * 10, Math.floor(n / 10)], { near: [] }),
        hint: 'Em xem số lớn nhất trong tổng có mấy chữ số. Hàng nào không có trong tổng thì em viết chữ số 0.',
        solution: `${sum} = ${fmt(n)}.`,
      };
    }
    const gap = int(rand, 1, parts.length - 1);
    const right = parts[gap];
    const shown = parts.map((p, i) => (i === gap ? '?' : fmt(p)));
    return {
      prompt: `${fmt(n)} = ${shown.join(' + ')}. Số nào thay cho dấu "?"`,
      ...slipOptions(right, [right * 10, right / 10, Number(String(right)[0]), right * 100], {
        near: [1, 2, -1],
      }),
      hint: 'Em tìm chữ số còn thiếu trong tổng và xem nó đứng ở hàng nào của số.',
      solution: `${fmt(n)} = ${sum}. Số thay cho dấu "?" là ${fmt(right)}.`,
    };
  },
};

/** @type {Skill} */
export const digitValue = {
  id: 'gia-tri',
  label: 'Giá trị của chữ số',
  make(rand) {
    const len = int(rand, 5, 9);
    /** @type {number} */
    let n;
    /** @type {number} */
    let exp;
    do {
      n = int(rand, 10 ** (len - 1), 10 ** len - 1);
      exp = int(rand, 0, len - 1);
    } while (digitAt(n, exp) === 0 || String(n).split(String(digitAt(n, exp))).length !== 2);
    const digit = digitAt(n, exp);
    const right = valueAt(n, exp);
    const wrong = [exp + 1, exp - 1, exp + 2, exp - 2]
      .filter((e) => e >= 0 && e <= 8)
      .map((e) => digit * 10 ** e);
    return {
      prompt: `Trong số ${fmt(n)}, chữ số ${digit} có giá trị là bao nhiêu?`,
      ...slipOptions(right, wrong, { near: [] }),
      hint: 'Em tìm xem chữ số đó đứng ở hàng nào. Hàng đơn vị, hàng chục, hàng trăm, ... kể từ phải sang trái.',
      solution: `Chữ số ${digit} ở hàng ${PLACE_NAMES[exp]}, nên có giá trị là ${fmt(right)}.`,
    };
  },
};

/** The three kinds of consecutive numbers of the book. */
export const RUNS = /** @type {const} */ ([
  { name: 'số tự nhiên', step: 1, parity: -1 },
  { name: 'số chẵn', step: 2, parity: 0 },
  { name: 'số lẻ', step: 2, parity: 1 },
]);

/** @type {Skill} */
export const consecutive = {
  id: 'lien-tiep',
  label: 'Số liên tiếp, số chẵn, số lẻ',
  make(rand) {
    const run = pick(rand, RUNS);
    let first = int(rand, 100, 99990);
    if (run.parity >= 0 && first % 2 !== run.parity) first += 1;
    const four = [0, 1, 2, 3].map((i) => first + i * run.step);
    const gap = int(rand, 0, 3);
    const right = four[gap];
    const shown = four.map((v, i) => (i === gap ? '?' : fmt(v)));
    const other = run.step === 1 ? 2 : 1;
    const slips = [right + other, right - other, right + run.step * 2, right - run.step * 2];
    return {
      prompt: `Bốn ${run.name} liên tiếp: ${shown.join('; ')}. Số nào thay cho dấu "?"`,
      ...slipOptions(right, slips, { near: [], min: 0 }),
      hint:
        run.step === 1
          ? 'Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị.'
          : `Hai ${run.name} liên tiếp hơn kém nhau 2 đơn vị.`,
      solution: `Hai ${run.name} liên tiếp hơn kém nhau ${run.step} đơn vị. Bốn ${run.name} liên tiếp là ${four.map(fmt).join('; ')}.`,
    };
  },
};

/** True and false sentences about the sequence of natural numbers. */
export const FACTS = /** @type {const} */ ({
  right: [
    'Số tự nhiên bé nhất là 0.',
    'Không có số tự nhiên lớn nhất.',
    'Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị.',
    'Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị.',
    'Hai số lẻ liên tiếp hơn kém nhau 2 đơn vị.',
    'Số có chữ số tận cùng là 0, 2, 4, 6, 8 là số chẵn.',
  ],
  wrong: [
    'Số tự nhiên bé nhất là 1.',
    'Số tự nhiên lớn nhất là 999 999 999.',
    'Hai số lẻ liên tiếp hơn kém nhau 1 đơn vị.',
    'Hai số chẵn liên tiếp hơn kém nhau 1 đơn vị.',
    'Số 0 là số lẻ.',
    'Số 1 357 là số chẵn.',
  ],
});

/** Why each wrong sentence is wrong. */
const FIXES = /** @type {Record<string, string>} */ ({
  'Số tự nhiên bé nhất là 1.': 'Số tự nhiên bé nhất là 0.',
  'Số tự nhiên lớn nhất là 999 999 999.':
    'Thêm 1 vào số nào cũng được số lớn hơn, nên không có số tự nhiên lớn nhất.',
  'Hai số lẻ liên tiếp hơn kém nhau 1 đơn vị.': 'Hai số lẻ liên tiếp hơn kém nhau 2 đơn vị.',
  'Hai số chẵn liên tiếp hơn kém nhau 1 đơn vị.': 'Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị.',
  'Số 0 là số lẻ.': 'Số 0 có chữ số tận cùng là 0, nên là số chẵn.',
  'Số 1 357 là số chẵn.': 'Số 1 357 có chữ số tận cùng là 7, nên là số lẻ.',
});

/** @type {Skill} */
export const sequenceFacts = {
  id: 'day-so',
  label: 'Dãy số tự nhiên',
  make(rand) {
    const askRight = rand() < 0.5;
    const right = pick(rand, askRight ? FACTS.right : FACTS.wrong);
    const others = shuffle(rand, [...(askRight ? FACTS.wrong : FACTS.right)]).slice(0, 3);
    const wrongOne = askRight ? null : right;
    return {
      prompt: askRight ? 'Câu nào đúng?' : 'Câu nào sai?',
      ...mixOptions(rand, right, others),
      hint: 'Số tự nhiên bắt đầu từ 0: 0, 1, 2, 3, ... Thêm 1 vào một số tự nhiên thì được số liền sau.',
      solution: wrongOne ? `Câu "${wrongOne}" sai. ${FIXES[wrongOne]}` : `Câu "${right}" đúng.`,
    };
  },
};

/** Things compared in the book, with their unit and number range. */
export const THINGS = /** @type {const} */ ([
  {
    what: 'Con voi',
    most: 'nặng nhất',
    least: 'nhẹ nhất',
    unit: 'kg',
    lo: 2500,
    hi: 5000,
    step: 1,
  },
  {
    what: 'Xe đạp',
    most: 'có giá tiền cao nhất',
    least: 'có giá tiền thấp nhất',
    unit: 'đồng',
    lo: 3000,
    hi: 6000,
    step: 1000,
  },
  {
    what: 'Trường',
    most: 'có nhiều học sinh nhất',
    least: 'có ít học sinh nhất',
    unit: 'học sinh',
    lo: 1500,
    hi: 2500,
    step: 1,
  },
]);

/** @type {Skill} */
export const extremes = {
  id: 'lon-nhat',
  label: 'Số lớn nhất, số bé nhất',
  make(rand) {
    const thing = pick(rand, THINGS);
    /** @type {Set<number>} */
    const set = new Set();
    const base = int(rand, thing.lo, thing.hi - 400);
    while (set.size < 4) set.add((base + int(rand, 0, 40) * 10 + int(rand, 0, 9)) * thing.step);
    const values = [...set];
    const most = rand() < 0.5;
    const target = most ? Math.max(...values) : Math.min(...values);
    const names = ['A', 'B', 'C', 'D'];
    const list = values.map((v, i) => `${thing.what} ${names[i]}: ${fmt(v)} ${thing.unit}`);
    const sorted = values.toSorted((x, y) => x - y);
    const letter = names[values.indexOf(target)];
    const right = `${thing.what} ${letter}`;
    return {
      prompt: `${list.join('; ')}. ${thing.what} nào ${most ? thing.most : thing.least}?`,
      ...mixOptions(
        rand,
        right,
        names.filter((_, i) => values[i] !== target).map((n) => `${thing.what} ${n}`),
      ),
      hint: 'Các số có cùng số chữ số. Em so sánh từng hàng, kể từ hàng cao nhất bên trái.',
      solution: `${sorted.map((v) => `${fmt(v)} ${thing.unit}`).join(' < ')}. Vậy ${thing.what.toLowerCase()} ${letter} ${most ? thing.most : thing.least}.`,
    };
  },
};

/** @type {Skill} */
export const ordering = {
  id: 'sap-xep',
  label: 'Sắp xếp thứ tự',
  make(rand) {
    /** @type {Set<number>} */
    const set = new Set();
    const thousands = int(rand, 1, 8);
    while (set.size < 4) set.add((thousands + int(rand, 0, 1)) * 1000 + int(rand, 0, 999));
    const numbers = [...set];
    const up = rand() < 0.5;
    const sorted = numbers.toSorted((x, y) => (up ? x - y : y - x));
    const line = (/** @type {number[]} */ list) => list.map(fmt).join('; ');
    const right = line(sorted);
    const wrong = [
      line(sorted.toReversed()),
      line([sorted[1], sorted[0], sorted[2], sorted[3]]),
      line([sorted[0], sorted[1], sorted[3], sorted[2]]),
      line([sorted[0], sorted[2], sorted[1], sorted[3]]),
    ].filter((w) => w !== right);
    const word = up ? 'từ bé đến lớn' : 'từ lớn đến bé';
    return {
      prompt: `Dãy nào xếp các số ${line(numbers)} theo thứ tự ${word}?`,
      ...mixOptions(rand, right, wrong.slice(0, 3)),
      hint: `Em so sánh chữ số hàng nghìn trước, rồi đến hàng trăm. Em tìm số ${up ? 'bé' : 'lớn'} nhất trước.`,
      solution: `Xếp theo thứ tự ${word}: ${right}.`,
    };
  },
};

/** The places a large number is rounded to in the book. */
const ROUND_UNITS = [1000, 10000, 100000];

/** @type {Skill} */
export const rounding = {
  id: 'lam-tron',
  label: 'Làm tròn số',
  make(rand) {
    const unit = pick(rand, ROUND_UNITS);
    /** @type {number} */
    let n;
    do {
      n = int(rand, 10000000, 99999999);
    } while (n % unit === 0 || roundTo(n, unit) === roundTo(n, unit * 10));
    const right = roundTo(n, unit);
    const low = Math.floor(n / unit) * unit;
    const other = right === low ? low + unit : low;
    const place = PLACE_NAMES[Math.round(Math.log10(unit))];
    return {
      prompt: `Số dân của một nước là ${fmt(n)} người. Làm tròn số đó đến hàng ${place} được số nào?`,
      ...slipOptions(right, [other, roundTo(n, unit * 10), roundTo(n, unit / 10)], {
        near: [unit * 2, -unit * 2],
      }),
      hint: `Em nhìn chữ số ở hàng ngay bên phải hàng ${place}: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.`,
      solution: roundWhy(n, unit),
    };
  },
};

/**
 * Every four-digit number made of the four cards, each used once.
 * @param {readonly number[]} cards four different digits
 */
export function cardNumbers(cards) {
  /** @type {number[]} */
  const out = [];
  for (const a of cards)
    for (const b of cards)
      for (const c of cards)
        for (const d of cards) {
          if (a === 0 || new Set([a, b, c, d]).size < 4) continue;
          out.push(a * 1000 + b * 100 + c * 10 + d);
        }
  return out.sort((x, y) => x - y);
}

/** @type {Skill} */
export const cards = {
  id: 'lap-so',
  label: 'Lập số từ các thẻ',
  make(rand) {
    /** @type {number[]} */
    let digits;
    /** @type {number[]} */
    let fit;
    const small = rand() < 0.5;
    const even = rand() < 0.5;
    do {
      digits = shuffle(rand, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
      fit = cardNumbers(digits).filter((v) => v % 2 === (even ? 0 : 1));
    } while (fit.length === 0);
    const all = cardNumbers(digits);
    const right = small ? fit[0] : fit[fit.length - 1];
    const plain = small ? all[0] : all[all.length - 1];
    const kind = even ? 'số chẵn' : 'số lẻ';
    const word = small ? 'bé nhất' : 'lớn nhất';
    const ends = even ? '0, 2, 4, 6, 8' : '1, 3, 5, 7, 9';
    return {
      prompt: `Từ bốn thẻ số ${digits.toSorted((x, y) => x - y).join(', ')}, lập được ${kind} ${word} có bốn chữ số (mỗi thẻ dùng một lần) là số nào?`,
      ...slipOptions(
        right,
        small
          ? [plain, all[1], fit[1], fit[2]]
          : [plain, all.at(-2) ?? 0, fit.at(-2) ?? 0, fit.at(-3) ?? 0],
        {
          near: [],
          min: 1000,
          max: 9999,
        },
      ),
      hint: `${even ? 'Số chẵn' : 'Số lẻ'} có chữ số hàng đơn vị là ${ends}. Chữ số hàng nghìn không thể là 0.`,
      solution: `Chữ số hàng đơn vị phải là một trong các chữ số ${ends}. Em chọn chữ số ${right % 10} ở hàng đơn vị, rồi đặt các chữ số còn lại từ ${small ? 'bé' : 'lớn'} đến ${small ? 'lớn' : 'bé'} vào các hàng cao${small ? ' (hàng nghìn khác 0)' : ''}. ${capitalize(kind)} ${word} là ${fmt(right)}.`,
    };
  },
};

/** The parts of the review of natural numbers, in book order. */
export const NUMBER_SKILLS = [
  readNumber,
  placeSum,
  consecutive,
  digitValue,
  sequenceFacts,
  extremes,
  rounding,
  ordering,
  cards,
];
