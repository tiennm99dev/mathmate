/**
 * The mixed practice of the chapter on ratios: the percentage of two numbers,
 * a percentage of a number, map scales, two numbers from their sum or
 * difference and their ratio, discounts, a percentage story and the
 * calculator keys. One question of each part in a shuffled order. Every
 * answer is worked out from whole numbers; pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { formatNumber, tidy } from '#lib/core/number-format.js';
import { screenText } from '../_shared/calc.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<never>} Question */

/** What each part of the round practises, in the book's order. */
export const KIND_LABELS = /** @type {const} */ ({
  'ti-so-phan-tram': 'Tìm tỉ số phần trăm của hai số',
  'ti-le-ban-do': 'Tỉ lệ bản đồ',
  'tong-ti': 'Tìm hai số khi biết tổng và tỉ số',
  'hieu-ti': 'Tìm hai số khi biết hiệu và tỉ số',
  'gia-tri-phan-tram': 'Tìm giá trị phần trăm của một số',
  'giam-gia': 'Bài toán giảm giá',
  'bai-toan': 'Bài toán thực tế về phần trăm',
  'may-tinh': 'Dùng máy tính cầm tay',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/** @param {number} v */
const num = (v) => formatNumber(tidy(v));

/**
 * The right value among distinct positive wrong ones, written with a tail.
 * @param {() => number} rand
 * @param {number} right
 * @param {number[]} wrong
 * @param {string} tail
 */
function valueOptions(rand, right, wrong, tail) {
  const r = tidy(right);
  const kept = [...new Set(wrong.map((w) => tidy(w)))].filter((w) => w > 0 && w !== r).slice(0, 3);
  return mixOptions(
    rand,
    `${num(r)}${tail}`,
    kept.map((w) => `${num(w)}${tail}`),
  );
}

/** Ratios m : n of the smaller to the larger number. */
const RATIOS = /** @type {const} */ ([
  [1, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [2, 5],
  [3, 5],
  [4, 5],
  [3, 7],
]);

/** @type {Record<Kind, (rand: () => number) => Omit<Question, 'kind'>>} */
const MAKERS = {
  'ti-so-phan-tram'(rand) {
    const b = pick(rand, [20, 25, 40, 50, 200]);
    const a = int(rand, 1, b - 1);
    const q = tidy(a / b);
    const p = tidy(q * 100);
    return {
      prompt: `Tìm tỉ số phần trăm của ${num(a)} và ${num(b)}.`,
      ...valueOptions(rand, p, [q, p * 10, p / 10], '%'),
      hint: 'Em chia số thứ nhất cho số thứ hai, nhân thương với 100 rồi viết thêm kí hiệu %.',
      solution: `${num(a)} : ${num(b)} = ${num(q)} = ${num(p)}%.`,
    };
  },
  'ti-le-ban-do'(rand) {
    const scale = pick(rand, [1000, 2000, 5000, 10000, 500000, 1000000]);
    const cm = int(rand, 2, 15);
    const real = cm * scale;
    const km = scale >= 100000;
    const value = km ? real / 100000 : real / 100;
    const unit = km ? ' km' : ' m';
    return {
      prompt: `Trên bản đồ tỉ lệ 1 : ${num(scale)}, quãng đường đo được ${cm} cm. Quãng đường thật dài bao nhiêu?`,
      ...valueOptions(rand, value, [value * 10, value / 10, value * 100], unit),
      hint: `1 cm trên bản đồ ứng với ${num(scale)} cm thật. Em nhân rồi đổi đơn vị.`,
      solution: `${cm} × ${num(scale)} = ${num(real)} (cm) = ${num(value)}${unit}.`,
    };
  },
  'tong-ti'(rand) {
    const [m, n] = pick(rand, RATIOS);
    const u = int(rand, 3, 20);
    const sum = (m + n) * u;
    return {
      prompt: `Thỏ và rùa hái được ${sum} cây nấm. Số nấm của thỏ bằng ${m}/${n} số nấm của rùa. Thỏ hái được bao nhiêu cây nấm?`,
      ...valueOptions(rand, m * u, [n * u, m * u + u, (m + 1) * u + 1, sum - m], ' cây'),
      hint: `Vẽ sơ đồ: thỏ ${m} phần, rùa ${n} phần. Tìm tổng số phần bằng nhau.`,
      solution: `Tổng số phần bằng nhau: ${m} + ${n} = ${m + n}. Thỏ hái: ${sum} : ${m + n} × ${m} = ${m * u} (cây).`,
    };
  },
  'hieu-ti'(rand) {
    const [m, n] = pick(rand, RATIOS);
    const u = int(rand, 2, 15);
    const diff = (n - m) * u;
    return {
      prompt: `Mi có nhiều hơn Mai ${diff} cái kẹo. Số kẹo của Mai bằng ${m}/${n} số kẹo của Mi. Mi có bao nhiêu cái kẹo?`,
      ...valueOptions(rand, n * u, [m * u, n * u + u, diff * n, n * u - 1], ' cái'),
      hint: `Vẽ sơ đồ: Mai ${m} phần, Mi ${n} phần. Tìm hiệu số phần bằng nhau.`,
      solution: `Hiệu số phần bằng nhau: ${n} − ${m} = ${n - m}. Mi có: ${diff} : ${n - m} × ${n} = ${n * u} (cái).`,
    };
  },
  'gia-tri-phan-tram'(rand) {
    const a = pick(rand, [2, 5, 10, 11, 15, 20, 25, 30, 40, 60, 75]);
    const b = int(rand, 2, 30) * 20;
    const v = tidy((b * a) / 100);
    return {
      prompt: `Tìm ${a}% của ${num(b)}.`,
      ...valueOptions(rand, v, [v * 10, v / 10, b - v], ''),
      hint: `Em lấy ${num(b)} nhân với ${a} rồi chia cho 100.`,
      solution: `${num(b)} × ${a} : 100 = ${num(v)}.`,
    };
  },
  'giam-gia'(rand) {
    const price = int(rand, 5, 200) * 10000;
    const a = pick(rand, [5, 8, 10, 15, 20, 25, 30, 40]);
    const off = (price * a) / 100;
    const pay = price - off;
    return {
      prompt: `Một món hàng giá ${num(price)} đồng, được giảm giá ${a}%. Người mua phải trả bao nhiêu tiền?`,
      ...valueOptions(rand, pay, [off, price + off, pay - off], ' đồng'),
      hint: `Tìm số tiền được giảm: ${a}% của ${num(price)} đồng. Rồi lấy giá bán trừ đi.`,
      solution: `Được giảm: ${num(price)} × ${a} : 100 = ${num(off)} (đồng). Phải trả: ${num(price)} − ${num(off)} = ${num(pay)} (đồng).`,
    };
  },
  'bai-toan'(rand) {
    const box = pick(rand, [20, 30, 40, 50, 80, 100]);
    const p = pick(rand, [2, 4, 5, 10, 20]);
    const bad = tidy((box * p) / 100);
    const good = tidy(box - bad);
    return {
      prompt: `Một thùng táo nặng ${box} kg, trong đó có ${p}% là táo bị hỏng. Có bao nhiêu ki-lô-gam táo không bị hỏng?`,
      ...valueOptions(rand, good, [bad, box + bad, good - bad], ' kg'),
      hint: `Tìm số táo hỏng: ${p}% của ${box} kg. Rồi lấy cả thùng trừ đi.`,
      solution: `Táo hỏng: ${box} × ${p} : 100 = ${num(bad)} (kg). Táo không hỏng: ${box} − ${num(bad)} = ${num(good)} (kg).`,
    };
  },
  'may-tinh'(rand) {
    if (rand() < 0.5) {
      const a = int(rand, 11, 99);
      const b = pick(rand, [125, 200, 250, 400]);
      const keys = shuffle(rand, [
        `${a} ÷ ${b} %`,
        `${b} ÷ ${a} %`,
        `${a} × ${b} %`,
        `${a} − ${b} %`,
      ]);
      return {
        prompt: `Để tìm tỉ số phần trăm của ${a} và ${b} bằng máy tính cầm tay, em bấm:`,
        options: keys,
        answer: keys.indexOf(`${a} ÷ ${b} %`),
        hint: 'Tỉ số phần trăm: chia số thứ nhất cho số thứ hai rồi bấm phím %.',
        solution: `Em bấm ${a} ÷ ${b} %. Màn hình hiện ${screenText((a / b) * 100)}, tức là ${num((a / b) * 100)}%.`,
      };
    }
    const a = pick(rand, [8, 12, 15, 24, 35]);
    const b = int(rand, 2, 50) * 10;
    const keys = shuffle(rand, [
      `${b} × ${a} %`,
      `${b} ÷ ${a} %`,
      `${a} ÷ ${b} %`,
      `${b} + ${a} %`,
    ]);
    return {
      prompt: `Để tìm ${a}% của ${b} bằng máy tính cầm tay, em bấm:`,
      options: keys,
      answer: keys.indexOf(`${b} × ${a} %`),
      hint: 'Tìm a% của một số: bấm số đó, phím ×, số phần trăm rồi phím %.',
      solution: `Em bấm ${b} × ${a} %. Màn hình hiện ${screenText((b * a) / 100)}, tức là ${num((b * a) / 100)}.`,
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
