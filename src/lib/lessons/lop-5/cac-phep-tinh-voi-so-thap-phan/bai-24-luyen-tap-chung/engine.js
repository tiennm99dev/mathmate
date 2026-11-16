/**
 * The mixed practice of the chapter on operations with decimals: adding,
 * subtracting, multiplying and dividing decimals, multiplying and dividing
 * by 10; 100; 1 000 or 0,1; 0,01; 0,001 in the head, working out an
 * expression the convenient way, the value of an expression, the missing
 * number, an average and a word problem. One question of each part in a
 * shuffled order; the calculation is the question's `visual`. Every number
 * is kept exact as a scaled integer. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import {
  FACTORS,
  addSub,
  commaOptions,
  decText,
  grouped,
  productPlan,
  productWhy,
  shiftComma,
  shiftDivision,
  shiftOf,
  shiftRule,
  toScaled,
  trimZeros,
} from '../_shared/decimal-ops.js';

/** @typedef {{ expr: string }} Visual */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** What each part of the round practises, in the book's order. */
export const KIND_LABELS = /** @type {const} */ ({
  cong: 'Phép cộng số thập phân',
  tru: 'Phép trừ số thập phân',
  nhan: 'Phép nhân số thập phân',
  chia: 'Phép chia số thập phân',
  nham: 'Nhân, chia nhẩm với 10; 100;... hoặc 0,1; 0,01;...',
  'thuan-tien': 'Tính bằng cách thuận tiện',
  'bieu-thuc': 'Tính giá trị của biểu thức',
  'tim-so': 'Tìm số chưa biết',
  'trung-binh': 'Số trung bình cộng',
  'bai-toan': 'Bài toán thực tế',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/**
 * A decimal written with exactly `places` digits after the comma (its last
 * digit not 0), between lo and hi scaled by 10^places.
 * @param {() => number} rand
 * @param {number} lo scaled
 * @param {number} hi scaled
 * @param {number} places
 */
function decimal(rand, lo, hi, places) {
  let s = int(rand, lo, hi);
  if (places > 0 && s % 10 === 0) s += 1;
  return decText(s, places);
}

/** A decimal shown the book's way: '314000' gives '314 000'. @param {string} raw */
const show = (raw) => grouped(trimZeros(raw));

/**
 * The decimal `raw` changed by `k` in its last place: ('4,745', 1) → '4,746'.
 * @param {string} raw
 * @param {number} k
 */
function nudge(raw, k) {
  const { scaled, places } = toScaled(trimZeros(raw));
  return trimZeros(decText(Math.max(1, scaled + k), places));
}

/**
 * Exact half of a decimal: '18,86' gives '9,43', '6,5' gives '3,25'.
 * @param {string} raw
 */
function half(raw) {
  const { scaled, places } = toScaled(raw);
  return scaled % 2 === 0
    ? trimZeros(decText(scaled / 2, places))
    : trimZeros(decText(scaled * 5, places + 1));
}

/**
 * The right option among up to three wrong ones of other values, shuffled,
 * shown the book's way with an optional unit. Too few slips are filled up
 * with the right answer changed in its last place.
 * @param {() => number} rand
 * @param {string} right
 * @param {string[]} wrong
 * @param {string} [unit]
 */
function choices(rand, right, wrong, unit = '') {
  const key = trimZeros(right);
  /** @type {string[]} */
  const kept = [];
  for (const w of [...wrong, nudge(right, 1), nudge(right, -1), nudge(right, 10)]) {
    const k = trimZeros(w);
    if (k !== key && !kept.includes(k) && kept.length < 3) kept.push(k);
  }
  const tail = unit ? ` ${unit}` : '';
  return mixOptions(
    rand,
    `${show(right)}${tail}`,
    kept.map((k) => `${show(k)}${tail}`),
  );
}

/** @type {Record<Kind, (rand: () => number) => Omit<Question, 'kind'>>} */
const MAKERS = {
  cong(rand) {
    const a = decimal(rand, 101, 6000, 2);
    const b = decimal(rand, 11, 600, 1);
    const sum = addSub(a, b, '+');
    // Lined up at the right edge: 4,98 + 15,7 read as 498 + 157 hundredths.
    const edge = decText(toScaled(a).scaled + toScaled(b).scaled, 2);
    return {
      prompt: 'Tính.',
      visual: { expr: `${a} + ${b}` },
      ...choices(rand, sum, [edge, ...commaOptions(sum)]),
      hint: 'Đặt tính sao cho các dấu phẩy thẳng cột, rồi cộng như cộng các số tự nhiên.',
      solution: `Đặt tính thẳng dấu phẩy rồi cộng: ${a} + ${b} = ${show(sum)}.`,
    };
  },
  tru(rand) {
    const whole = int(rand, 20, 99);
    const b = decimal(rand, 101, (whole - 2) * 100, 2);
    const diff = addSub(String(whole), b, '-');
    const [bw, bf] = b.split(',');
    // The decimal part copied down instead of taken from the zeros: 48,91.
    const copied = `${whole - Number(bw)},${bf}`;
    return {
      prompt: 'Tính.',
      visual: { expr: `${whole} − ${b}` },
      ...choices(rand, diff, [copied, ...commaOptions(diff)]),
      hint: `Viết ${whole} thành ${whole},00 rồi đặt tính thẳng dấu phẩy và trừ.`,
      solution: `${whole} = ${whole},00. Đặt tính thẳng dấu phẩy rồi trừ: ${whole},00 − ${b} = ${show(diff)}.`,
    };
  },
  nhan(rand) {
    const a = decimal(rand, 11, 999, 2);
    const b = decimal(rand, 11, 99, 1);
    const { product, full } = productPlan(a, b);
    const tidy = full === product ? '' : ` Viết gọn: ${show(product)}.`;
    return {
      prompt: 'Tính.',
      visual: { expr: `${a} × ${b}` },
      ...choices(rand, product, commaOptions(product)),
      hint: 'Nhân như nhân số tự nhiên, rồi đếm số chữ số ở phần thập phân của cả hai thừa số.',
      solution: `${productWhy(a, b)}${tidy}`,
    };
  },
  chia(rand) {
    const b = decimal(rand, 11, 99, 1);
    const q = decimal(rand, 101, 3000, 2);
    const a = productPlan(b, q).product;
    const quotient = trimZeros(q);
    const { dividend, divisor, say } = shiftDivision(a, b);
    return {
      prompt: 'Tính.',
      visual: { expr: `${a} : ${b}` },
      ...choices(rand, quotient, commaOptions(quotient)),
      hint: 'Chuyển dấu phẩy ở số bị chia sang bên phải một chữ số, bỏ dấu phẩy ở số chia, rồi chia cho số tự nhiên.',
      solution: `${say} Chia: ${grouped(dividend)} : ${divisor} = ${show(quotient)}.`,
    };
  },
  nham(rand) {
    const t = decimal(rand, 101, 9999, pick(rand, [1, 2]));
    const op = pick(rand, /** @type {const} */ (['×', ':']));
    const factor = pick(rand, FACTORS);
    const shift = shiftOf(op, factor);
    const right = shiftComma(t, shift);
    const step = shift > 0 ? 1 : -1;
    const wrong = [shiftComma(t, -shift), shiftComma(t, shift - step), shiftComma(t, shift + step)];
    return {
      prompt: 'Tính nhẩm.',
      visual: { expr: `${grouped(t)} ${op} ${factor}` },
      ...choices(rand, right, wrong),
      hint: 'Nhân với 10; 100; 1 000 hay chia cho 0,1; 0,01; 0,001 thì dấu phẩy sang phải. Chia cho 10; 100; 1 000 hay nhân với 0,1; 0,01; 0,001 thì sang trái.',
      solution: `${shiftRule(op, factor)} ${grouped(t)} ${op} ${factor} = ${show(right)}.`,
    };
  },
  'thuan-tien'(rand) {
    if (rand() < 0.5) {
      const [p, q, prod] = pick(
        rand,
        /** @type {const} */ ([
          ['2,5', '4', '10'],
          ['0,25', '4', '1'],
          ['1,25', '8', '10'],
          ['0,5', '2', '1'],
          ['0,2', '5', '1'],
        ]),
      );
      const x = decimal(rand, 11, 99, 1);
      const shift = prod === '10' ? 1 : 0;
      const right = shiftComma(x, shift);
      return {
        prompt: 'Tính bằng cách thuận tiện.',
        visual: { expr: `${p} × ${x} × ${q}` },
        ...choices(rand, right, [shiftComma(x, shift + 1), shiftComma(x, shift - 1)]),
        hint: `Đổi chỗ các thừa số để nhân ${p} với ${q} trước.`,
        solution: `${p} × ${x} × ${q} = (${p} × ${q}) × ${x} = ${prod} × ${x} = ${show(right)}.`,
      };
    }
    const c = decimal(rand, 11, 99, 2);
    const p = decimal(rand, 11, 89, 1);
    const q = decText(100 - toScaled(p).scaled, 1);
    const right = shiftComma(c, 1);
    return {
      prompt: 'Tính bằng cách thuận tiện.',
      visual: { expr: `${c} × ${p} + ${q} × ${c}` },
      ...choices(rand, right, [c, shiftComma(c, 2), shiftComma(c, -1)]),
      hint: `Hai tích có chung thừa số ${c}. Em nhân ${c} với tổng ${p} + ${q}.`,
      solution: `${c} × ${p} + ${q} × ${c} = ${c} × (${p} + ${q}) = ${c} × 10 = ${show(right)}.`,
    };
  },
  'bieu-thuc'(rand) {
    const c = decimal(rand, 11, 49, 1);
    const q = int(rand, 10, 30);
    const diff = trimZeros(decText(toScaled(c).scaled * q, 1));
    const b = decimal(rand, 101, 999, 1);
    const a = addSub(b, diff, '+');
    const d = decimal(rand, 101, 3000, 2);
    const twice = trimZeros(addSub(d, d, '+'));
    const right = addSub(String(q), twice, '+');
    // Worked from left to right with the bracket: ((a − b) : c + d) × 2.
    const leftToRight = trimZeros(
      addSub(addSub(String(q), d, '+'), addSub(String(q), d, '+'), '+'),
    );
    const noTimes = addSub(String(q), d, '+');
    return {
      prompt: 'Tính giá trị của biểu thức.',
      visual: { expr: `(${trimZeros(a)} − ${b}) : ${c} + ${d} × 2` },
      ...choices(rand, right, [leftToRight, noTimes, ...commaOptions(trimZeros(right))]),
      hint: 'Tính trong ngoặc trước. Sau đó làm phép chia và phép nhân, cuối cùng mới cộng.',
      solution: `Trong ngoặc: ${trimZeros(a)} − ${b} = ${show(diff)}. Chia và nhân: ${show(diff)} : ${c} = ${q}; ${d} × 2 = ${show(twice)}. Cộng: ${q} + ${show(twice)} = ${show(right)}.`,
    };
  },
  'tim-so'(rand) {
    if (rand() < 0.5) {
      const x = decimal(rand, 1001, 9999, 2);
      const y = decimal(rand, 11, 600, 1);
      const sum = trimZeros(addSub(x, y, '+'));
      return {
        prompt: 'Số nào thay vào dấu ? cho đúng?',
        visual: { expr: `${x} + ? = ${sum}` },
        ...choices(rand, y, [addSub(sum, x, '+'), ...commaOptions(y)]),
        hint: 'Muốn tìm số hạng chưa biết, em lấy tổng trừ đi số hạng đã biết.',
        solution: `Số cần tìm là ${sum} − ${x} = ${show(y)}. Thử lại: ${x} + ${show(y)} = ${sum}.`,
      };
    }
    const d = decimal(rand, 11, 99, 1);
    const q = decimal(rand, 1001, 5000, 2);
    const prod = productPlan(d, q).product;
    return {
      prompt: 'Số nào thay vào dấu ? cho đúng?',
      visual: { expr: `? : ${d} = ${q}` },
      ...choices(rand, prod, commaOptions(prod)),
      hint: 'Muốn tìm số bị chia, em lấy thương nhân với số chia.',
      solution: `Số cần tìm là ${q} × ${d} = ${show(prod)}. Thử lại: ${show(prod)} : ${d} = ${q}.`,
    };
  },
  'trung-binh'(rand) {
    for (;;) {
      const m = int(rand, 101, 300);
      const v1 = decimal(rand, m - 80, m + 80, 1);
      const v2 = decimal(rand, m - 80, m + 80, 1);
      const s3 = 3 * m - toScaled(v1).scaled - toScaled(v2).scaled;
      if (s3 < 50 || s3 % 10 === 0 || toScaled(v1).scaled === toScaled(v2).scaled) continue;
      const v3 = decText(s3, 1);
      const sum = trimZeros(decText(3 * m, 1));
      const avg = trimZeros(decText(m, 1));
      return {
        prompt: `Ba lần đo lượng mưa được ${v1} mm, ${v2} mm và ${v3} mm. Trung bình mỗi lần đo được bao nhiêu mi-li-mét?`,
        ...choices(rand, avg, [sum, half(sum)], 'mm'),
        hint: 'Muốn tìm số trung bình cộng của ba số, em tính tổng ba số rồi chia cho 3.',
        solution: `Tổng: ${v1} + ${v2} + ${v3} = ${show(sum)} (mm). Trung bình: ${show(sum)} : 3 = ${show(avg)} (mm).`,
      };
    }
  },
  'bai-toan'(rand) {
    if (rand() < 0.5) {
      const x = decimal(rand, 500, 1500, 2);
      const d = decimal(rand, 11, 49, 1);
      const big = addSub(x, d, '+');
      const total = trimZeros(addSub(big, x, '+'));
      return {
        prompt: `Hai năm, một trang trại bán được ${total} tấn cá. Năm thứ hai bán nhiều hơn năm thứ nhất ${d} tấn. Năm thứ nhất bán được bao nhiêu tấn cá?`,
        ...choices(rand, x, [big, half(total), addSub(total, d, '-')], 'tấn'),
        hint: 'Đây là bài toán tìm hai số khi biết tổng và hiệu. Số bé = (Tổng − Hiệu) : 2.',
        solution: `Năm thứ nhất: (${total} − ${d}) : 2 = ${show(addSub(total, d, '-'))} : 2 = ${show(x)} (tấn).`,
      };
    }
    const w = decimal(rand, 51, 99, 1);
    const l = decimal(rand, toScaled(w).scaled + 5, 150, 1);
    const area = productPlan(w, l).product;
    const sum = trimZeros(addSub(l, w, '+'));
    const perimeter = trimZeros(addSub(sum, sum, '+'));
    return {
      prompt: `Một mảnh vườn hình chữ nhật có diện tích ${area} m², chiều rộng ${w} m. Tính chu vi mảnh vườn.`,
      ...choices(rand, perimeter, [sum, l, trimZeros(addSub(addSub(l, l, '+'), w, '+'))], 'm'),
      hint: 'Tìm chiều dài trước: lấy diện tích chia cho chiều rộng. Rồi tính chu vi = (dài + rộng) × 2.',
      solution: `Chiều dài: ${area} : ${w} = ${show(l)} (m). Chu vi: (${show(l)} + ${w}) × 2 = ${show(perimeter)} (m).`,
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
