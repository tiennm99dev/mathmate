/**
 * The adaptive review of the numbers to the class of millions: reading and
 * writing numbers, the digits of each class, writing a number as a sum of
 * its places, the value of a digit, comparing, ordering, the largest and the
 * smallest of real numbers, and rounding. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { mixOptions, signOptions, slipOptions } from '#lib/core/kid/quiz.js';
import {
  CLASS_NAMES,
  PLACE_NAMES,
  capitalReading,
  compareWhy,
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

/** The largest number of the chapter. */
export const TOP = 999999999;

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
 * Numbers a child writes instead of `n`: two digits swapped, a zero lost or
 * one too many. Each is a different number of the chapter.
 * @param {number} n
 */
export function writingSlips(n) {
  const len = String(n).length;
  const slips = [
    swapped(n, len - 2, len - 1),
    swapped(n, 1, 2),
    swapped(n, len - 3, len - 2),
    Math.floor(n / 10),
    n * 10,
    swapped(n, 2, 4),
  ];
  return [...new Set(slips)].filter((v) => v !== n && v >= 10 ** (len - 2) && v <= TOP);
}

/**
 * The digits of the class `cls` (0 for đơn vị, 1 for nghìn, 2 for triệu) of a
 * nine-digit number, as the book lists them: "9, 0, 6".
 * @param {number} n
 * @param {number} cls
 */
export const classDigits = (n, cls) => [2, 1, 0].map((p) => digitAt(n, cls * 3 + p)).join(', ');

/** @type {Skill} */
export const readNumber = {
  id: 'doc-so',
  label: 'Đọc số',
  make(rand) {
    const n = withZeros(rand, int(rand, 7, 9));
    const wrong = writingSlips(n).slice(0, 3).map(capitalReading);
    return {
      prompt: `Số ${fmt(n)} đọc là gì?`,
      ...mixOptions(rand, capitalReading(n), wrong),
      hint: 'Em tách số thành từng lớp: lớp triệu, lớp nghìn, lớp đơn vị. Em đọc từng lớp từ trái sang phải, kèm tên lớp.',
      solution: `Số ${fmt(n)} đọc là: ${readWhole(n)}.`,
    };
  },
};

/** @type {Skill} */
export const writeNumber = {
  id: 'viet-so',
  label: 'Viết số',
  make(rand) {
    const n = withZeros(rand, int(rand, 7, 9));
    return {
      prompt: `Số "${readWhole(n)}" viết là số nào?`,
      ...mixOptions(rand, fmt(n), writingSlips(n).slice(0, 3).map(fmt)),
      hint: 'Em viết từng lớp: lớp triệu, lớp nghìn, lớp đơn vị. Sau lớp đầu, mỗi lớp có đủ ba chữ số; hàng nào không có thì viết chữ số 0.',
      solution: `Số "${readWhole(n)}" viết là ${fmt(n)}.`,
    };
  },
};

/** @type {Skill} */
export const classes = {
  id: 'lop',
  label: 'Lớp triệu, lớp nghìn, lớp đơn vị',
  make(rand) {
    /** @type {number} */
    let n;
    do {
      n = int(rand, 100000000, TOP);
    } while (new Set([0, 1, 2].map((c) => classDigits(n, c))).size < 3);
    const cls = int(rand, 0, 2);
    const right = classDigits(n, cls);
    const reversed = right.split(', ').reverse().join(', ');
    const wrong = [0, 1, 2].filter((c) => c !== cls).map((c) => classDigits(n, c));
    return {
      prompt: `Trong số ${fmt(n)}, các chữ số thuộc lớp ${CLASS_NAMES[cls]} là những chữ số nào?`,
      ...mixOptions(rand, right, [...wrong, reversed]),
      hint: 'Kể từ phải sang trái: ba chữ số đầu là lớp đơn vị, ba chữ số tiếp theo là lớp nghìn, ba chữ số còn lại là lớp triệu.',
      solution: `Số ${fmt(n)} có lớp triệu gồm ${classDigits(n, 2)}; lớp nghìn gồm ${classDigits(n, 1)}; lớp đơn vị gồm ${classDigits(n, 0)}. Các chữ số thuộc lớp ${CLASS_NAMES[cls]} là ${right}.`,
    };
  },
};

/** @type {Skill} */
export const placeSum = {
  id: 'tong',
  label: 'Viết số thành tổng',
  make(rand) {
    const n = withZeros(rand, int(rand, 6, 7));
    const parts = sumParts(n);
    const gap = int(rand, 1, parts.length - 1);
    const right = parts[gap];
    const shown = parts.map((p, i) => (i === gap ? '?' : fmt(p)));
    const digit = Number(String(right)[0]);
    return {
      prompt: `${fmt(n)} = ${shown.join(' + ')}. Số nào thay cho dấu "?"`,
      ...slipOptions(right, [right * 10, right / 10, digit], { near: [right] }),
      hint: 'Em tìm chữ số còn thiếu trong tổng và xem nó đứng ở hàng nào của số.',
      solution: `${fmt(n)} = ${parts.map(fmt).join(' + ')}. Số thay cho dấu "?" là ${fmt(right)}.`,
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

/**
 * A sum of round places that is close to `n` or equal to it, as text: the
 * book's "37 020 ? 30 000 + 7 000 + 20".
 * @param {() => number} rand
 * @param {number} n
 */
function nearSum(rand, n) {
  const parts = sumParts(n);
  const way = int(rand, 0, 2);
  if (way === 0) return { value: n, text: parts.map(fmt).join(' + ') };
  const i = int(rand, 0, parts.length - 1);
  const kept = [...parts];
  if (way === 1) {
    const step = 10 ** (String(kept[i]).length - 1);
    kept[i] += kept[i] / step < 9 ? step : -step;
  } else {
    kept.splice(i, 1);
  }
  return { value: kept.reduce((s, p) => s + p, 0), text: kept.map(fmt).join(' + ') };
}

/** @type {Skill} */
export const compare = {
  id: 'so-sanh',
  label: 'So sánh số',
  make(rand) {
    if (rand() < 0.5) {
      const n = withZeros(rand, int(rand, 5, 7));
      const sum = nearSum(rand, n);
      const sign = compareSign(n, sum.value);
      return {
        prompt: `Chọn dấu thích hợp: ${fmt(n)} ? ${sum.text}`,
        ...signOptions(sign),
        hint: 'Em tính tổng ở vế phải thành một số, rồi so sánh hai số.',
        solution: `${sum.text} = ${fmt(sum.value)}. ${compareWhy(n, sum.value)}`,
      };
    }
    const len = int(rand, 6, 8);
    const a = int(rand, 10 ** (len - 1), 10 ** len - 1);
    const b =
      rand() < 0.3
        ? int(rand, 10 ** (len - 2), 10 ** (len - 1) - 1)
        : swapped(a, int(rand, 1, 3), int(rand, 4, len - 1));
    const sign = compareSign(a, b);
    return {
      prompt: `Chọn dấu thích hợp: ${fmt(a)} ? ${fmt(b)}`,
      ...signOptions(sign),
      hint: 'Em đếm số chữ số trước. Nếu bằng nhau, em so sánh từng hàng, kể từ trái sang phải.',
      solution: compareWhy(a, b),
    };
  },
};

/**
 * Four numbers of four or five digits made of the same digits, the book's
 * "5 216; 5 612; 6 251; 6 521".
 * @param {() => number} rand
 */
function sameDigits(rand) {
  /** @type {number[]} */
  let digits;
  do {
    digits = Array.from({ length: int(rand, 4, 5) }, () => int(rand, 0, 9));
  } while (new Set(digits).size < digits.length);
  /** @type {Set<number>} */
  const set = new Set();
  while (set.size < 4) {
    const d = shuffle(rand, digits);
    if (d[0] !== 0) set.add(Number(d.join('')));
  }
  return [...set];
}

/** @type {Skill} */
export const ordering = {
  id: 'sap-xep',
  label: 'Sắp xếp thứ tự',
  make(rand) {
    const numbers = sameDigits(rand);
    const up = rand() < 0.5;
    const sorted = numbers.toSorted((x, y) => (up ? x - y : y - x));
    const line = (/** @type {number[]} */ list) => list.map(fmt).join('; ');
    const right = line(sorted);
    const wrong = [
      line(sorted.toReversed()),
      line([sorted[1], sorted[0], sorted[2], sorted[3]]),
      line([sorted[0], sorted[1], sorted[3], sorted[2]]),
    ];
    const word = up ? 'từ bé đến lớn' : 'từ lớn đến bé';
    return {
      prompt: `Dãy nào xếp các số ${line(numbers)} theo thứ tự ${word}?`,
      ...mixOptions(rand, right, wrong),
      hint: `Các số có cùng số chữ số. Em so sánh chữ số đầu tiên bên trái, rồi đến các chữ số tiếp theo. Em tìm số ${up ? 'bé' : 'lớn'} nhất trước.`,
      solution: `Xếp theo thứ tự ${word}: ${right}.`,
    };
  },
};

/** Population in 2019 of six places, from the book. */
export const POPULATION = /** @type {const} */ ([
  { name: 'Hà Giang', people: 854679 },
  { name: 'Hà Nội', people: 8053663 },
  { name: 'Quảng Trị', people: 632375 },
  { name: 'Lâm Đồng', people: 1296906 },
  { name: 'Thành phố Hồ Chí Minh', people: 8993082 },
  { name: 'Cà Mau', people: 1194476 },
]);

/** @type {Skill} */
export const largest = {
  id: 'lon-nhat',
  label: 'Số lớn nhất, số bé nhất',
  make(rand) {
    const places = shuffle(rand, [...POPULATION]).slice(0, 4);
    const most = rand() < 0.5;
    const right = places.reduce((best, p) =>
      most ? (p.people > best.people ? p : best) : p.people < best.people ? p : best,
    );
    const word = most ? 'nhiều nhất' : 'ít nhất';
    const sorted = places.toSorted((a, b) => a.people - b.people);
    return {
      prompt: `Số dân năm 2019: ${places.map((p) => `${p.name} có ${fmt(p.people)} người`).join('; ')}. Nơi nào có số dân ${word}?`,
      ...mixOptions(
        rand,
        right.name,
        places.filter((p) => p !== right).map((p) => p.name),
      ),
      hint: 'Số nào có nhiều chữ số hơn thì lớn hơn. Hai số có cùng số chữ số thì em so sánh từ hàng cao nhất.',
      solution: `Xếp từ bé đến lớn: ${sorted.map((p) => fmt(p.people)).join('; ')}. ${right.name} có số dân ${word}.`,
    };
  },
};

/** The places a number is rounded to, as in the book. */
const ROUND_UNITS = [100, 1000, 10000, 100000];

/** @type {Skill} */
export const rounding = {
  id: 'lam-tron',
  label: 'Làm tròn số',
  make(rand) {
    const unit = pick(rand, ROUND_UNITS);
    /** @type {number} */
    let n;
    do {
      n = int(rand, 1000000, 9999999);
    } while (n % unit === 0 || roundTo(n, unit) === roundTo(n, unit * 10));
    const right = roundTo(n, unit);
    const low = Math.floor(n / unit) * unit;
    const other = right === low ? low + unit : low;
    const place = PLACE_NAMES[Math.round(Math.log10(unit))];
    return {
      prompt: `Làm tròn số ${fmt(n)} đến hàng ${place} được số nào?`,
      ...slipOptions(right, [other, roundTo(n, unit * 10), roundTo(n, unit / 10)], {
        near: [unit * 2, -unit * 2],
      }),
      hint: `Em nhìn chữ số ở hàng ngay bên phải hàng ${place}: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.`,
      solution: roundWhy(n, unit),
    };
  },
};

/** The parts of the review of numbers to the class of millions, in book order. */
export const NUMBER_SKILLS = [
  readNumber,
  writeNumber,
  classes,
  placeSum,
  digitValue,
  compare,
  ordering,
  largest,
  rounding,
];
