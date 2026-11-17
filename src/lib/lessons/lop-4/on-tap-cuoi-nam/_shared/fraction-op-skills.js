/**
 * The adaptive review of calculations with fractions: adding and
 * subtracting fractions with different denominators and with a whole
 * number, multiplying and dividing, an expression of three fractions, a
 * convenient way, the part left of a whole, a sum of money and the length of
 * a rectangle. Every fraction result is given in lowest terms, and no wrong
 * option has the value of the right one. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { slipOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import {
  add,
  div,
  fracOptions,
  fracText,
  mul,
  raiseText,
  reduce,
  simplest,
  sub,
} from './fractions.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */
/** @typedef {import('./visual.js').Frac} Frac */

/**
 * A whole number as a fraction.
 * @param {number} w
 * @returns {Frac}
 */
const whole = (w) => ({ n: w, d: 1 });

/**
 * The reduced form of `n/d` added to a working when it differs: '= 17/8'.
 * @param {number} n
 * @param {number} d
 */
function reducedTail(n, d) {
  const r = reduce(n, d);
  return r.d === d ? '' : ` = ${fracText(r)}`;
}

/**
 * Two fractions with different denominators, one a multiple of the other,
 * the first at least the second when `ordered`.
 * @param {() => number} rand
 * @param {boolean} ordered
 */
function pairOverMultiple(rand, ordered) {
  for (;;) {
    const f = simplest(rand, 2, 8);
    const k = int(rand, 2, 4);
    const D = f.d * k;
    const g = { n: int(rand, 1, D + 6), d: D };
    if (g.n % k === 0) continue;
    const [x, y] = rand() < 0.5 ? [f, g] : [g, f];
    if (ordered && x.n * y.d <= y.n * x.d) continue;
    return { x, y, D };
  }
}

/**
 * The working of x ± y over a common denominator D.
 * @param {Frac} x
 * @param {Frac} y
 * @param {number} D
 * @param {'+' | '−'} op
 */
function addWorking(x, y, D, op) {
  const a = (x.n * D) / x.d;
  const b = (y.n * D) / y.d;
  const n = op === '+' ? a + b : a - b;
  return `${fracText(x)} ${op} ${fracText(y)} = ${a}/${D} ${op} ${b}/${D} = ${n}/${D}${reducedTail(n, D)}`;
}

/** @type {Skill} */
export const addFracs = {
  id: 'cong',
  label: 'Cộng hai phân số',
  make(rand) {
    const { x, y, D } = pairOverMultiple(rand, false);
    return {
      prompt: 'Kết quả của phép cộng là phân số nào?',
      ...fracOptions(rand, add(x, y), [
        { n: x.n + y.n, d: x.d + y.d },
        { n: x.n + y.n, d: D },
        { n: x.n * y.n, d: D },
      ]),
      hint: `Em quy đồng mẫu số, lấy mẫu số chung là ${D}, rồi cộng hai tử số.`,
      solution: `${addWorking(x, y, D, '+')}.`,
      visual: { type: 'fracs', items: [x, '+', y, '=', '?'] },
    };
  },
};

/** @type {Skill} */
export const subFracs = {
  id: 'tru',
  label: 'Trừ hai phân số',
  make(rand) {
    const { x, y, D } = pairOverMultiple(rand, true);
    return {
      prompt: 'Kết quả của phép trừ là phân số nào?',
      ...fracOptions(rand, sub(x, y), [
        { n: Math.abs(x.n - y.n), d: Math.abs(x.d - y.d) },
        { n: Math.abs(x.n - y.n), d: D },
        add(x, y),
      ]),
      hint: `Em quy đồng mẫu số, lấy mẫu số chung là ${D}, rồi trừ hai tử số.`,
      solution: `${addWorking(x, y, D, '−')}.`,
      visual: { type: 'fracs', items: [x, '−', y, '=', '?'] },
    };
  },
};

/** @type {Skill} */
export const withWhole = {
  id: 'so-tu-nhien',
  label: 'Cộng, trừ phân số với số tự nhiên',
  make(rand) {
    const f = simplest(rand, 3, 9);
    const w = int(rand, 1, 4);
    const way = int(rand, 0, 2);
    /** @type {[Frac, '+' | '−', Frac]} */
    const [x, op, y] =
      way === 0
        ? [whole(w), '+', f]
        : way === 1
          ? [{ n: f.n + f.d * (w + int(rand, 1, 2)), d: f.d }, '−', whole(w)]
          : [whole(w), '−', f];
    const right = op === '+' ? add(x, y) : sub(x, y);
    const wn = x.d === 1 ? x : y;
    const fr = x.d === 1 ? y : x;
    return {
      prompt: `Kết quả của phép ${op === '+' ? 'cộng' : 'trừ'} là phân số nào?`,
      ...fracOptions(rand, right, [
        { n: op === '+' ? wn.n + fr.n : Math.abs(x.n - y.n), d: fr.d },
        { n: op === '+' ? wn.n + fr.n : Math.abs(x.n - y.n), d: fr.d + 1 },
        op === '+' ? sub(add(x, y), whole(1)) : add(right, whole(1)),
      ]),
      hint: `Em viết ${wn.n} thành phân số có mẫu số ${fr.d}: ${wn.n} = ${wn.n * fr.d}/${fr.d}.`,
      solution: `${fracText(x)} ${op} ${fracText(y)} = ${x.d === 1 ? `${x.n * fr.d}/${fr.d}` : fracText(x)} ${op} ${y.d === 1 ? `${y.n * fr.d}/${fr.d}` : fracText(y)} = ${fracText(right)}.`,
      visual: { type: 'fracs', items: [x, op, y, '=', '?'] },
    };
  },
};

/** @type {Skill} */
export const multiply = {
  id: 'nhan',
  label: 'Nhân phân số',
  make(rand) {
    const f = simplest(rand, 2, 9);
    const g = rand() < 0.3 ? whole(int(rand, 2, 9)) : simplest(rand, 2, 9);
    const right = mul(f, g);
    const raw = { n: f.n * g.n, d: f.d * g.d };
    return {
      prompt: 'Kết quả của phép nhân là phân số nào?',
      ...fracOptions(rand, right, [
        { n: f.n * g.n, d: f.d + g.d },
        { n: f.n * g.d, d: f.d * g.n },
        g.d === 1 ? { n: f.n * g.n, d: f.d * g.n } : { n: f.n + g.n, d: f.d * g.d },
      ]),
      hint:
        g.d === 1
          ? `Em nhân tử số với ${g.n}, giữ nguyên mẫu số.`
          : 'Em lấy tử số nhân với tử số, mẫu số nhân với mẫu số.',
      solution: `${fracText(f)} × ${fracText(g)} = ${raw.n}/${raw.d}${reducedTail(raw.n, raw.d)}.`,
      visual: { type: 'fracs', items: [f, '×', g, '=', '?'] },
    };
  },
};

/** @type {Skill} */
export const divide = {
  id: 'chia',
  label: 'Chia phân số',
  make(rand) {
    const f = simplest(rand, 2, 9);
    const g = rand() < 0.3 ? whole(int(rand, 2, 9)) : simplest(rand, 2, 9);
    const flip = { n: g.d, d: g.n };
    const right = div(f, g);
    const raw = { n: f.n * flip.n, d: f.d * flip.d };
    return {
      prompt: 'Kết quả của phép chia là phân số nào?',
      ...fracOptions(rand, right, [
        mul(f, g),
        { n: f.d * g.n, d: f.n * g.d },
        { n: f.n * g.n, d: f.d * flip.d },
      ]),
      hint: `Em nhân ${fracText(f)} với phân số đảo ngược của ${fracText(g)}.`,
      solution: `${fracText(f)} : ${fracText(g)} = ${fracText(f)} × ${flip.n}/${flip.d} = ${raw.n}/${raw.d}${reducedTail(raw.n, raw.d)}.`,
      visual: { type: 'fracs', items: [f, ':', g, '=', '?'] },
    };
  },
};

/** @type {Skill} */
export const expression = {
  id: 'bieu-thuc',
  label: 'Tính giá trị biểu thức',
  make(rand) {
    for (;;) {
      const d = int(rand, 3, 9);
      const a = int(rand, 1, d + 3);
      const b = int(rand, 1, d);
      const D = d * 2;
      const c = int(rand, 1, D - 1);
      if (c % 2 === 0) continue;
      const x = { n: a, d };
      const y = { n: b, d };
      const z = { n: c, d: D };
      const s = add(x, y);
      const right = sub(s, z);
      if (right.n <= 0) continue;
      const sum = a + b;
      return {
        prompt: 'Giá trị của biểu thức là phân số nào?',
        ...fracOptions(rand, right, [
          { n: a + b - c, d: D },
          2 * a - 2 * b - c > 0 ? reduce(2 * a - 2 * b - c, D) : { n: a + b + c, d: D },
          { n: a + b + c, d: d + D },
        ]),
        hint: 'Biểu thức chỉ có phép cộng, phép trừ: em tính từ trái sang phải. Rồi quy đồng mẫu số để trừ.',
        solution: `${a}/${d} + ${b}/${d} − ${c}/${D} = ${sum}/${d} − ${c}/${D} = ${sum * 2}/${D} − ${c}/${D} = ${sum * 2 - c}/${D}${reducedTail(sum * 2 - c, D)}.`,
        visual: { type: 'fracs', items: [x, '+', y, '−', z, '=', '?'] },
      };
    }
  },
};

/** @type {Skill} */
export const convenient = {
  id: 'thuan-tien',
  label: 'Tính thuận tiện',
  make(rand) {
    const d = int(rand, 3, 9);
    const w = int(rand, 1, 3);
    const a = int(rand, 1, w * d - 1);
    const b = w * d - a;
    const e = simplest(rand, 2, 9);
    const E = { n: e.n, d: e.d * d };
    const odd = reduce(E.n, E.d);
    return {
      prompt: 'Tính bằng cách thuận tiện. Kết quả là phân số nào?',
      ...fracOptions(rand, odd, [
        add(odd, whole(w)),
        { n: odd.n + a + b, d: odd.d },
        { n: a + b, d },
      ]),
      hint: `Em cộng hai phân số cùng mẫu số ${a}/${d} và ${b}/${d} trước.`,
      solution: `${fracText(odd)} + ${a}/${d} + ${b}/${d} − ${w} = ${fracText(odd)} + (${a}/${d} + ${b}/${d}) − ${w} = ${fracText(odd)} + ${w} − ${w} = ${fracText(odd)}.`,
      visual: {
        type: 'fracs',
        items: [odd, '+', { n: a, d }, '+', { n: b, d }, '−', String(w), '=', '?'],
      },
    };
  },
};

/** Stories where a whole is used for two things and the rest is asked. */
export const PART_STORIES = /** @type {const} */ ([
  {
    whole: 'Bác Tư có một khu đất',
    first: 'xây nhà',
    second: 'trồng cây',
    rest: 'làm sân và lối đi',
    of: 'diện tích khu đất',
  },
  {
    whole: 'Mai có một quyển truyện',
    first: 'đọc trong ngày thứ nhất',
    second: 'đọc trong ngày thứ hai',
    rest: 'đọc trong ngày thứ ba',
    of: 'quyển truyện',
  },
]);

/** @type {Skill} */
export const partLeft = {
  id: 'phan-con-lai',
  label: 'Tìm phần còn lại',
  make(rand) {
    for (;;) {
      const story = pick(rand, PART_STORIES);
      const D = pick(rand, [6, 8, 10, 12]);
      const f = reduce(int(rand, 1, D - 1), D);
      if (f.d === D) continue;
      const g = { n: int(rand, 1, D - 1), d: D };
      const used = add(f, g);
      const right = sub(whole(1), used);
      if (right.n <= 0) continue;
      const usedN = (f.n * D) / f.d + g.n;
      return {
        prompt: `${story.whole}. Phần thứ nhất bằng ${fracText(f)} ${story.of} để ${story.first}, phần thứ hai bằng ${fracText(g)} ${story.of} để ${story.second}, phần còn lại để ${story.rest}. Phần để ${story.rest} bằng bao nhiêu phần ${story.of}?`,
        ...fracOptions(rand, right, [
          used,
          { n: Math.abs(D - f.n - g.n), d: D },
          { n: D - g.n, d: D },
        ]),
        hint: `Em cộng hai phần đã dùng, rồi lấy 1 (cả ${story.of}) trừ đi.`,
        solution: `Hai phần đã dùng: ${raiseText(f, D)}; ${fracText(f)} + ${fracText(g)} = ${usedN}/${D}${reducedTail(usedN, D)}. Phần còn lại: 1 − ${fracText(used)} = ${fracText(right)} ${story.of}.`,
      };
    }
  },
};

/** @type {Skill} */
export const money = {
  id: 'so-tien',
  label: 'Bài toán về số tiền',
  make(rand) {
    const f = simplest(rand, 3, 8);
    const total = f.d * int(rand, 2, 12) * 10000;
    const spent = (total / f.d) * f.n;
    const right = total - spent;
    return {
      prompt: `Nam có ${fmt(total)} đồng tiền tiết kiệm. Nam dùng ${fracText(f)} số tiền đó để mua sách vở, số tiền còn lại Nam góp vào quỹ giúp đỡ các bạn. Nam đã góp vào quỹ bao nhiêu tiền?`,
      ...slipOptions(right, [spent, total / f.d, total - total / f.d], {
        near: [10000, -10000],
        min: 1000,
        unit: 'đồng',
      }),
      hint: `Em tìm ${fracText(f)} số tiền của Nam, đó là số tiền mua sách vở. Rồi tìm số tiền còn lại.`,
      solution: `Tiền mua sách vở: ${fmt(total)} × ${fracText(f)} = ${fmt(spent)} (đồng). Tiền góp vào quỹ: ${fmt(total)} − ${fmt(spent)} = ${fmt(right)} (đồng).`,
    };
  },
};

/** @type {Skill} */
export const rectangle = {
  id: 'hinh-chu-nhat',
  label: 'Chiều dài hình chữ nhật',
  make(rand) {
    for (;;) {
      const w = simplest(rand, 2, 9);
      const l = simplest(rand, 2, 9);
      if (l.n * w.d <= w.n * l.d) continue;
      const area = mul(w, l);
      return {
        prompt: `Một tấm bìa hình chữ nhật có diện tích ${fracText(area)} m², chiều rộng ${fracText(w)} m. Chiều dài tấm bìa là bao nhiêu mét?`,
        ...fracOptions(rand, l, [mul(area, w), { n: area.n * w.n, d: area.d }, add(area, w)]),
        hint: 'Chiều dài = diện tích : chiều rộng.',
        solution: `Chiều dài: ${fracText(area)} : ${fracText(w)} = ${fracText(area)} × ${w.d}/${w.n} = ${area.n * w.d}/${area.d * w.n}${reducedTail(area.n * w.d, area.d * w.n)} (m).`,
        visual: { type: 'fracs', items: [area, ':', w, '=', '?'] },
      };
    }
  },
};

/** The parts of the review of calculations with fractions, in book order. */
export const FRACTION_OP_SKILLS = [
  addFracs,
  subFracs,
  withWhole,
  expression,
  partLeft,
  convenient,
  multiply,
  divide,
  money,
  rectangle,
];
