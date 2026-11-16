/**
 * The mixed practice of the grade 5 review chapter: the value of a digit,
 * convenient calculation, reducing fractions, decimal fractions,
 * multiplying and dividing fractions, adding and subtracting fractions with
 * different denominators, mixed numbers, units of mass and time, and a word
 * problem with a fraction of a quantity. One question of each part in a
 * shuffled order. Fractions are options of the shape `FracOption` so the
 * widget draws them stacked; an expression to work out is the question's
 * `visual`. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { slipOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import { equals, fraction, simplify } from '#lib/fraction-engine/index.js';
import { gcd } from '#lib/numtheory-engine/index.js';

/**
 * A fraction option, or a whole number when `d` is 1.
 * @typedef {{ label: string, n: number, d: number }} FracOption
 */

/**
 * One term of an expression drawn above the options: text such as '+' or
 * '=', a fraction, or a mixed number.
 * @typedef {string | { n: number, d: number, whole?: number }} Term
 */

/** @typedef {{ terms: Term[] }} Visual */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** What each part of the round practises, in the book's order. */
export const KIND_LABELS = /** @type {const} */ ({
  'gia-tri': 'Giá trị của chữ số',
  'tinh-nhanh': 'Tính thuận tiện',
  'rut-gon': 'Rút gọn phân số',
  'thap-phan': 'Phân số thập phân',
  'nhan-chia': 'Nhân, chia phân số',
  'cong-tru': 'Cộng, trừ phân số khác mẫu số',
  'hon-so': 'Hỗn số',
  'do-luong': 'Đơn vị đo',
  'bai-toan': 'Bài toán có phân số',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/** @param {number} n @param {number} d @returns {FracOption} */
export const fracOption = (n, d) => ({ label: d === 1 ? String(n) : `${n}/${d}`, n, d });

/** @param {number} n @param {number} d */
const ft = (n, d) => (d === 1 ? String(n) : `${n}/${d}`);

/**
 * The right fraction among slips of different values, in a seeded order.
 * Slips that are not positive or equal another option are dropped.
 * @param {() => number} rand
 * @param {{ n: number, d: number }} right
 * @param {{ n: number, d: number }[]} slips
 * @param {{ keep?: boolean }} [opts] keep the slips unreduced (to show a fraction not in lowest terms)
 */
export function fracOptions(rand, right, slips, { keep = false } = {}) {
  /** @type {{ n: number, d: number }[]} */
  const all = [right];
  for (const s of slips) {
    if (s.n <= 0 || s.d <= 0 || !Number.isInteger(s.n) || !Number.isInteger(s.d)) continue;
    const v = keep ? s : simplify(fraction(s.n, s.d));
    const clash = all.some((o) =>
      keep ? o.n === v.n && o.d === v.d : equals(fraction(o.n, o.d), fraction(v.n, v.d)),
    );
    if (!clash) all.push(v);
  }
  const options = shuffle(rand, all).map((o) => fracOption(o.n, o.d));
  return { options, answer: options.findIndex((o) => o.n === right.n && o.d === right.d) };
}

/**
 * ' = 3/4' when a result over `d` reduces to `right`, else nothing.
 * @param {{ n: number, d: number }} right
 * @param {number} d
 */
const reduced = (right, d) => (right.d !== d ? ` = ${ft(right.n, right.d)}` : '');

const PLACE_NAMES = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn', 'triệu'];

/** @type {Record<Kind, (rand: () => number) => Question>} */
const MAKERS = {
  'gia-tri'(rand) {
    const place = int(rand, 2, 6);
    const digit = int(rand, 1, 9);
    // The other digits differ from the asked one, so the question is clear.
    const others = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x !== digit);
    const digits = Array.from({ length: 7 }, (_, i) =>
      i === 6 - place ? digit : pick(rand, i === 0 ? others.filter((x) => x > 0) : others),
    );
    const n = Number(digits.join(''));
    const right = digit * 10 ** place;
    return {
      prompt: `Trong số ${fmt(n)}, chữ số ${digit} có giá trị là bao nhiêu?`,
      ...slipOptions(right, [right / 10, right * 10, digit], { near: [], min: 1 }),
      hint: `Chữ số ${digit} ở hàng nào? Em đếm hàng từ phải sang trái: đơn vị, chục, trăm, ...`,
      solution: `Chữ số ${digit} ở hàng ${PLACE_NAMES[place]}, nên có giá trị là ${fmt(right)}.`,
    };
  },
  'tinh-nhanh'(rand) {
    if (rand() < 0.5) {
      const k = int(rand, 11, 99);
      const [a, b, prod] = pick(
        rand,
        /** @type {const} */ ([
          [25, 4, 100],
          [125, 8, 1000],
          [5, 2, 10],
        ]),
      );
      const right = k * prod;
      return {
        prompt: `Tính bằng cách thuận tiện: ${a} × ${k} × ${b} = ?`,
        ...slipOptions(right, [k * prod * 10, k + prod, right + prod], {
          near: [prod, -prod],
          min: 1,
        }),
        hint: `Đổi chỗ để nhân ${a} × ${b} trước.`,
        solution: `${a} × ${k} × ${b} = ${k} × (${a} × ${b}) = ${k} × ${fmt(prod)} = ${fmt(right)}.`,
      };
    }
    const m = int(rand, 12, 99);
    const b = int(rand, 21, 79);
    const c = 100 - b;
    const right = m * 100;
    return {
      prompt: `Tính bằng cách thuận tiện: ${m} × ${b} + ${m} × ${c} = ?`,
      ...slipOptions(right, [m * 10, m + 100, right + m], { near: [100, -100], min: 1 }),
      hint: `Cả hai tích đều có thừa số ${m}. Em nhân ${m} với tổng ${b} + ${c}.`,
      solution: `${m} × ${b} + ${m} × ${c} = ${m} × (${b} + ${c}) = ${m} × 100 = ${fmt(right)}.`,
    };
  },
  'rut-gon'(rand) {
    const [n, d] = pick(
      rand,
      /** @type {const} */ ([
        [3, 4],
        [2, 3],
        [3, 5],
        [5, 6],
        [4, 7],
        [2, 5],
      ]),
    );
    const k = pick(rand, [4, 6, 8, 9]);
    const half = k % 2 === 0 ? 2 : 3;
    const big = { n: n * k, d: d * k };
    return {
      prompt: `Rút gọn phân số ${big.n}/${big.d} thành phân số tối giản.`,
      visual: { terms: [{ n: big.n, d: big.d }, '= ?'] },
      ...fracOptions(
        rand,
        { n, d },
        [
          { n: (n * k) / half, d: (d * k) / half },
          { n: d, d: n },
          { n: n + 1, d },
        ],
        {
          keep: true,
        },
      ),
      hint: `Chia cả tử số và mẫu số cho cùng một số, cho đến khi không chia được nữa.`,
      solution: `Chia cả tử số và mẫu số cho ${k}: ${big.n} : ${k} = ${n}, ${big.d} : ${k} = ${d}. Vậy ${big.n}/${big.d} = ${n}/${d}, là phân số tối giản.`,
    };
  },
  'thap-phan'(rand) {
    const [n, d, m] = pick(
      rand,
      /** @type {const} */ ([
        [3, 4, 25],
        [1, 2, 5],
        [2, 5, 2],
        [7, 20, 5],
        [3, 25, 4],
        [9, 50, 2],
        [4, 5, 2],
        [11, 25, 4],
      ]),
    );
    const right = { n: n * m, d: d * m };
    return {
      prompt: `Viết phân số ${n}/${d} thành phân số thập phân.`,
      visual: { terms: [{ n, d }, '= ?'] },
      ...fracOptions(
        rand,
        right,
        [
          { n, d: right.d },
          { n: n * 10, d: d * 10 },
          { n: n + m, d: right.d },
        ],
        {
          keep: true,
        },
      ),
      hint: `Em nhân cả tử số và mẫu số với cùng một số để được mẫu số ${right.d}.`,
      solution: `Nhân cả tử số và mẫu số với ${m}: ${n} × ${m} = ${right.n}, ${d} × ${m} = ${right.d}. Vậy ${n}/${d} = ${right.n}/${right.d}.`,
    };
  },
  'nhan-chia'(rand) {
    const [a, b, c, d] = pick(
      rand,
      /** @type {const} */ ([
        [2, 3, 3, 4],
        [4, 9, 3, 8],
        [5, 6, 2, 5],
        [3, 4, 2, 9],
        [5, 8, 4, 15],
      ]),
    );
    if (rand() < 0.5) {
      const right = simplify(fraction(a * c, b * d));
      return {
        prompt: 'Tính rồi chọn kết quả tối giản.',
        visual: { terms: [{ n: a, d: b }, '×', { n: c, d }, '= ?'] },
        ...fracOptions(rand, right, [
          { n: a * d, d: b * c },
          { n: a + c, d: b + d },
          { n: a * c, d: b + d },
        ]),
        hint: 'Lấy tử số nhân tử số, mẫu số nhân mẫu số, rồi rút gọn.',
        solution: `${ft(a, b)} × ${ft(c, d)} = ${a * c}/${b * d}${reduced(right, b * d)}.`,
      };
    }
    const right = simplify(fraction(a * d, b * c));
    return {
      prompt: 'Tính rồi chọn kết quả tối giản.',
      visual: { terms: [{ n: a, d: b }, ':', { n: c, d }, '= ?'] },
      ...fracOptions(rand, right, [
        { n: a * c, d: b * d },
        { n: b * c, d: a * d },
        { n: a + d, d: b + c },
      ]),
      hint: `Em nhân ${ft(a, b)} với phân số đảo ngược của ${ft(c, d)}, tức là ${ft(d, c)}.`,
      solution: `${ft(a, b)} : ${ft(c, d)} = ${ft(a, b)} × ${ft(d, c)} = ${a * d}/${b * c}${reduced(right, b * c)}.`,
    };
  },
  'cong-tru'(rand) {
    const [op, a, b, c, d] = pick(
      rand,
      /** @type {const} */ ([
        ['+', 1, 2, 1, 3],
        ['+', 2, 3, 1, 4],
        ['+', 2, 5, 1, 3],
        ['−', 3, 4, 2, 3],
        ['−', 4, 5, 1, 2],
        ['−', 5, 6, 1, 4],
      ]),
    );
    const plus = op === '+';
    const x = a * d;
    const y = c * b;
    const raw = { n: plus ? x + y : x - y, d: b * d };
    const right = simplify(fraction(raw.n, raw.d));
    return {
      prompt: 'Tính rồi chọn kết quả tối giản.',
      visual: { terms: [{ n: a, d: b }, op, { n: c, d }, '= ?'] },
      ...fracOptions(rand, right, [
        { n: plus ? a + c : a - c, d: plus ? b + d : Math.abs(b - d) },
        { n: plus ? x + c : x - c, d: b * d },
        { n: raw.n + 1, d: raw.d },
      ]),
      hint: `Quy đồng mẫu số trước: mẫu số chung là ${b} × ${d} = ${b * d}.`,
      solution: `${ft(a, b)} ${op} ${ft(c, d)} = ${x}/${b * d} ${op} ${y}/${b * d} = ${raw.n}/${raw.d}${reduced(right, raw.d)}.`,
    };
  },
  'hon-so'(rand) {
    const whole = int(rand, 1, 5);
    const d = pick(rand, [3, 4, 5, 7, 8, 10]);
    // The fraction part is in lowest terms, as the book writes mixed numbers.
    const n = pick(
      rand,
      Array.from({ length: d - 1 }, (_, i) => i + 1).filter((x) => gcd(x, d) === 1),
    );
    const right = { n: whole * d + n, d };
    return {
      prompt: 'Chuyển hỗn số thành phân số.',
      visual: { terms: [{ whole, n, d }, '= ?'] },
      ...fracOptions(
        rand,
        right,
        [
          { n: whole + n, d },
          { n: whole * n + d, d },
          { n: whole * d, d: n },
        ],
        {
          keep: true,
        },
      ),
      hint: 'Tử số bằng phần nguyên nhân với mẫu số rồi cộng với tử số; mẫu số giữ nguyên.',
      solution: `${whole} ${n}/${d} = (${whole} × ${d} + ${n})/${d} = ${right.n}/${d}.`,
    };
  },
  'do-luong'(rand) {
    const form = pick(rand, /** @type {const} */ (['tan', 'ta', 'gio', 'the-ki']));
    const k = int(rand, 2, 9);
    if (form === 'gio') {
      const b = int(rand, 1, 11) * 5;
      const right = k * 60 + b;
      return {
        prompt: `${k} giờ ${b} phút = ? phút`,
        ...slipOptions(right, [k * 100 + b, k + b], { near: [60, -10, 10], min: 1, unit: 'phút' }),
        hint: '1 giờ = 60 phút.',
        solution: `${k} giờ = ${k * 60} phút, nên ${k} giờ ${b} phút = ${k * 60} + ${b} = ${right} phút.`,
      };
    }
    const [big, small, rate] =
      form === 'tan'
        ? ['tấn', 'kg', 1000]
        : form === 'ta'
          ? ['tạ', 'kg', 100]
          : ['thế kỉ', 'năm', 100];
    const right = k * rate;
    return {
      prompt: `${k} ${big} = ? ${small}`,
      ...slipOptions(right, [right * 10, right / 10], { near: [rate, -rate], min: 1, unit: small }),
      hint: `1 ${big} = ${fmt(rate)} ${small}.`,
      solution: `${k} ${big} = ${k} × ${fmt(rate)} = ${fmt(right)} ${small}.`,
    };
  },
  'bai-toan'(rand) {
    const [p, q] = pick(
      rand,
      /** @type {const} */ ([
        [3, 5],
        [2, 3],
        [3, 4],
        [5, 8],
        [7, 10],
      ]),
    );
    const total = q * int(rand, 3, 12) * 10;
    const sold = (total * p) / q;
    const left = total - sold;
    const [word, unit, unitName] = pick(
      rand,
      /** @type {const} */ ([
        ['gạo', 'kg', 'ki-lô-gam'],
        ['dầu', 'l', 'lít'],
        ['vải', 'm', 'mét'],
      ]),
    );
    return {
      prompt: `Cửa hàng có ${total} ${unit} ${word}, đã bán ${p}/${q} số ${word} đó. Cửa hàng còn lại bao nhiêu ${unitName} ${word}?`,
      ...slipOptions(left, [sold, total / q, total], { near: [10, -10, 20], min: 1, unit }),
      hint: `Tìm số ${word} đã bán: ${total} × ${p}/${q}. Rồi lấy ${total} trừ đi.`,
      solution: `Đã bán: ${total} × ${p}/${q} = ${sold} (${unit}). Còn lại: ${total} − ${sold} = ${left} (${unit}).`,
    };
  },
};

/**
 * One question of each part, in a shuffled order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => ({ ...MAKERS[kind](rand), kind }));
}
