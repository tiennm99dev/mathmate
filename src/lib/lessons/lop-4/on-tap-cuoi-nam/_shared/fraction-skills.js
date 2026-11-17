/**
 * The adaptive review of fractions: the fraction of a shape that is
 * coloured, a fraction of a number of things, equal fractions, reducing,
 * finding a common denominator, comparing two fractions, fractions below or
 * above 1, the largest and the smallest in a story, and ordering. Every
 * fraction a question shows is held as `{ n, d }`. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { SIGN_WORDS } from '#lib/core/kid/numbers.js';
import { mixOptions, signOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import {
  fracOptions,
  fracSign,
  fracText,
  fracWords,
  raiseText,
  reduce,
  simplest,
} from './fractions.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */
/** @typedef {import('./visual.js').Frac} Frac */

/** Shapes cut into equal parts: how many parts, and how many to a row. */
const GRIDS = /** @type {const} */ ([
  { parts: 6, cols: 3 },
  { parts: 8, cols: 4 },
  { parts: 9, cols: 3 },
  { parts: 10, cols: 5 },
  { parts: 12, cols: 4 },
  { parts: 14, cols: 7 },
  { parts: 15, cols: 5 },
  { parts: 16, cols: 4 },
]);

/** @type {Skill} */
export const shaded = {
  id: 'to-mau',
  label: 'Phân số chỉ phần tô màu',
  make(rand) {
    const { parts, cols } = pick(rand, GRIDS);
    const s = int(rand, 1, parts - 1);
    const right = { n: s, d: parts };
    return {
      prompt: 'Phân số nào chỉ phần đã tô màu của hình?',
      ...fracOptions(rand, right, [
        { n: parts - s, d: parts },
        { n: s, d: parts - s },
        { n: parts, d: s },
      ]),
      hint: 'Mẫu số là số phần bằng nhau của hình. Tử số là số phần đã tô màu.',
      solution: `Hình được chia thành ${parts} phần bằng nhau, đã tô màu ${s} phần. Phân số chỉ phần đã tô màu là ${s}/${parts}.`,
      visual: { type: 'shaded', parts, shaded: s, cols },
    };
  },
};

/** Things counted in a "fraction of" question. */
const THINGS = /** @type {const} */ (['con ếch', 'quả cam', 'bông hoa', 'cái bánh', 'viên bi']);

/** @type {Skill} */
export const fractionOf = {
  id: 'phan-so-cua-so',
  label: 'Tìm phân số của một số',
  make(rand) {
    const f = simplest(rand, 2, 9);
    const each = int(rand, 2, 9);
    const total = f.d * each;
    const right = each * f.n;
    const thing = pick(rand, THINGS);
    return {
      prompt: `Có ${total} ${thing}. ${fracText(f)} số ${thing} là bao nhiêu ${thing}?`,
      ...slipOptions(right, [each, total - right, total * f.n, total + f.n], { min: 1 }),
      hint: `Em lấy ${total} nhân với ${fracText(f)}: chia ${total} cho ${f.d}, rồi nhân với ${f.n}.`,
      solution: `${total} × ${fracText(f)} = ${right}. Vậy ${fracText(f)} số ${thing} là ${right} ${thing}.`,
      visual: { type: 'fracs', items: [f, 'của', String(total), '=', '?'] },
    };
  },
};

/** @type {Skill} */
export const equal = {
  id: 'phan-so-bang-nhau',
  label: 'Phân số bằng nhau',
  make(rand) {
    const f = simplest(rand, 3, 9);
    const k = int(rand, 2, 5);
    const right = { n: f.n * k, d: f.d * k };
    return {
      prompt: `Phân số nào bằng phân số ${fracText(f)}?`,
      ...fracOptions(rand, right, [
        { n: f.n + k, d: f.d + k },
        { n: f.n * k, d: f.d + k },
        { n: f.n + k, d: f.d * k },
      ]),
      hint: 'Nhân cả tử số và mẫu số với cùng một số tự nhiên khác 0 thì được một phân số bằng phân số đã cho.',
      solution: `${fracText(f)} = (${f.n} × ${k})/(${f.d} × ${k}) = ${fracText(right)}.`,
      visual: { type: 'fracs', items: [f, '=', '?'] },
    };
  },
};

/** @type {Skill} */
export const simplify = {
  id: 'rut-gon',
  label: 'Rút gọn phân số',
  make(rand) {
    let f = simplest(rand, 3, 9);
    if (rand() < 0.3) {
      do {
        f = { n: int(rand, 6, 11), d: int(rand, 2, 5) };
      } while (gcd(f.n, f.d) !== 1);
    }
    const k = int(rand, 2, 9);
    const given = { n: f.n * k, d: f.d * k };
    return {
      prompt: `Rút gọn phân số ${fracText(given)} được phân số tối giản nào?`,
      ...fracOptions(rand, f, [
        { n: f.n, d: given.d },
        { n: given.n, d: f.d },
        { n: f.d, d: f.n },
      ]),
      hint: `Em chia cả tử số và mẫu số cho cùng một số. Số nào chia hết cả ${given.n} và ${given.d}?`,
      solution: `${fracText(given)} = (${given.n} : ${k})/(${given.d} : ${k}) = ${fracText(f)}. Phân số ${fracText(f)} không rút gọn được nữa.`,
      visual: { type: 'fracs', items: [given, '=', '?'] },
    };
  },
};

/** @type {Skill} */
export const commonDenominator = {
  id: 'quy-dong',
  label: 'Quy đồng mẫu số',
  make(rand) {
    const f = simplest(rand, 2, 9);
    const k = int(rand, 2, 6);
    const D = f.d * k;
    const g = { n: int(rand, 1, D + 5), d: D };
    if (g.n === f.n * k) g.n += 1;
    const right = f.n * k;
    return {
      prompt: `Quy đồng mẫu số hai phân số ${fracText(f)} và ${fracText(g)}, lấy mẫu số chung là ${D}. Phân số ${fracText(f)} viết thành ?/${D}. Số nào thay cho dấu "?"`,
      ...slipOptions(right, [f.n + D - f.d, f.n, right + k], { near: [1, -1], min: 1 }),
      hint: `${D} : ${f.d} = ${k}. Em nhân cả tử số và mẫu số của ${fracText(f)} với ${k}.`,
      solution: `${D} : ${f.d} = ${k}, nên ${fracText(f)} = (${f.n} × ${k})/(${f.d} × ${k}) = ${right}/${D}. Giữ nguyên ${fracText(g)}.`,
      visual: { type: 'fracs', items: [f, 'và', g] },
    };
  },
};

/**
 * Two fractions to compare, in one of the book's four cases: the same
 * denominator, the same numerator, against 1, or one denominator a multiple
 * of the other.
 * @param {() => number} rand
 * @returns {{ f: Frac, g: Frac, why: string }}
 */
export function comparePair(rand) {
  const way = int(rand, 0, 3);
  if (way === 0) {
    const d = int(rand, 5, 15);
    const a = int(rand, 1, d + 4);
    let b = int(rand, 1, d + 4);
    if (b === a) b = a + 1;
    return {
      f: { n: a, d },
      g: { n: b, d },
      why: 'Hai phân số cùng mẫu số: phân số nào có tử số bé hơn thì bé hơn.',
    };
  }
  if (way === 1) {
    const n = int(rand, 2, 9);
    const a = int(rand, 2, 15);
    let b = int(rand, 2, 15);
    if (b === a) b = a + 1;
    return {
      f: { n, d: a },
      g: { n, d: b },
      why: 'Hai phân số cùng tử số: phân số nào có mẫu số bé hơn thì lớn hơn.',
    };
  }
  if (way === 2) {
    const below = simplest(rand, 3, 12);
    const d = int(rand, 2, 9);
    const above = { n: d + int(rand, 1, 6), d };
    const [f, g] = rand() < 0.5 ? [below, above] : [above, below];
    return {
      f,
      g,
      why: `Phân số có tử số bé hơn mẫu số thì bé hơn 1. Phân số có tử số lớn hơn mẫu số thì lớn hơn 1. Ta có ${fracText(below)} < 1 < ${fracText(above)}.`,
    };
  }
  const f = simplest(rand, 2, 6);
  const k = int(rand, 2, 4);
  const D = f.d * k;
  let n = int(rand, 1, D - 1);
  if (n === f.n * k) n += 1;
  const g = { n, d: D };
  return {
    f,
    g,
    why: `Quy đồng mẫu số: ${raiseText(f, D)}. Em so sánh ${f.n * k}/${D} với ${n}/${D}.`,
  };
}

/** @type {Skill} */
export const compare = {
  id: 'so-sanh',
  label: 'So sánh hai phân số',
  make(rand) {
    const { f, g, why } = comparePair(rand);
    const sign = fracSign(f, g);
    return {
      prompt: `Chọn dấu thích hợp: ${fracText(f)} ? ${fracText(g)}`,
      ...signOptions(sign),
      hint: 'Em xem hai phân số có cùng mẫu số hay cùng tử số không, hoặc so sánh mỗi phân số với 1. Nếu không, em quy đồng mẫu số.',
      solution: `${why} Vậy ${fracText(f)} ${sign} ${fracText(g)} (${fracText(f)} ${SIGN_WORDS[sign]} ${fracText(g)}).`,
      visual: { type: 'fracs', items: [f, '?', g] },
    };
  },
};

/** @type {Skill} */
export const versusOne = {
  id: 'so-voi-1',
  label: 'Phân số bé hơn 1, lớn hơn 1',
  make(rand) {
    const below = rand() < 0.5;
    const d = int(rand, 3, 30);
    const right = below ? { n: int(rand, 1, d - 1), d } : { n: d + int(rand, 1, 9), d };
    const e = int(rand, 3, 30);
    const twin = { n: e, d: e };
    /** @type {Frac[]} */
    const all = [right, twin];
    while (all.length < 4) {
      const m = int(rand, 3, 30);
      const f = below ? { n: m + int(rand, 1, 9), d: m } : { n: int(rand, 1, m - 1), d: m };
      if (!all.some((g) => g.n === f.n && g.d === f.d)) all.push(f);
    }
    const options = shuffle(rand, all).map((f) => ({ label: fracText(f), fracs: [f] }));
    const word = below ? 'bé hơn 1' : 'lớn hơn 1';
    return {
      prompt: `Phân số nào ${word}?`,
      options,
      answer: options.findIndex((o) => o.fracs[0] === right),
      optionLabels: options.map((o) => fracWords(o.fracs[0])),
      hint: 'Em so sánh tử số với mẫu số của từng phân số.',
      solution: `${fracText(right)} có tử số ${below ? 'bé' : 'lớn'} hơn mẫu số nên ${word}. Phân số ${fracText(twin)} có tử số bằng mẫu số nên bằng 1.`,
    };
  },
};

/** Stories where three or four people or things are compared by a fraction. */
export const RANKINGS = /** @type {const} */ ([
  {
    who: ['Vòi số 1', 'Vòi số 2', 'Vòi số 3'],
    what: (/** @type {string} */ who, /** @type {string} */ f) => `${who} chảy được ${f} bể nước`,
    ask: ['Vòi nào chảy được nhiều nước nhất?', 'Vòi nào chảy được ít nước nhất?'],
    lead: 'Trong 1 giờ',
    rule: 'Vòi nào chảy được phân số bể lớn hơn thì chảy được nhiều nước hơn.',
    say: ['chảy được nhiều nước nhất', 'chảy được ít nước nhất'],
    small: false,
  },
  {
    who: ['Mai', 'Nam', 'Việt', 'Rô-bốt'],
    what: (/** @type {string} */ who, /** @type {string} */ f) => `${who} chạy hết ${f} phút`,
    ask: ['Ai về đích đầu tiên?', 'Ai về đích cuối cùng?'],
    lead: 'Các bạn chạy thi theo chiều dài sân trường',
    rule: 'Bạn chạy hết ít thời gian nhất về đích đầu tiên, bạn chạy hết nhiều thời gian nhất về đích cuối cùng.',
    say: ['về đích đầu tiên', 'về đích cuối cùng'],
    small: true,
  },
]);

/**
 * Different fractions, all with denominators dividing `D`, none equal.
 * @param {() => number} rand
 * @param {number} count
 * @param {number} D
 * @returns {Frac[]}
 */
export function fractionsUnder(rand, count, D) {
  const dens = [2, 3, 4, 5, 6, 8, 10, 12].filter((d) => D % d === 0);
  /** @type {Frac[]} */
  const out = [];
  /** @type {Set<number>} */
  const values = new Set();
  while (out.length < count) {
    const d = pick(rand, [...dens, D]);
    const f = reduce(int(rand, 1, d - 1), d);
    const v = (f.n * D) / f.d;
    if (values.has(v)) continue;
    values.add(v);
    out.push(f);
  }
  return out;
}

/** @type {Skill} */
export const ranking = {
  id: 'lon-nhat',
  label: 'Phân số lớn nhất, bé nhất',
  make(rand) {
    const story = pick(rand, RANKINGS);
    const D = pick(rand, [12, 20, 24]);
    const fracs = fractionsUnder(rand, story.who.length, D);
    const first = rand() < 0.5;
    const raised = fracs.map((f) => (f.n * D) / f.d);
    // The first question asks for the most water, or the first runner (the
    // least time); the second for the opposite.
    const wantSmall = first === story.small;
    const target = wantSmall ? Math.min(...raised) : Math.max(...raised);
    const right = story.who[raised.indexOf(target)];
    return {
      prompt: `${story.lead}: ${story.who.map((w, i) => story.what(w, fracText(fracs[i]))).join('; ')}. ${story.ask[first ? 0 : 1]}`,
      ...mixOptions(
        rand,
        right,
        story.who.filter((w) => w !== right),
      ),
      hint: `Em quy đồng mẫu số các phân số với mẫu số chung ${D}, rồi so sánh các tử số.`,
      solution: `${fracs.map((f) => raiseText(f, D)).join('; ')}. ${story.rule} Vậy ${right.replace('Vòi', 'vòi')} ${story.say[first ? 0 : 1]}.`,
    };
  },
};

/** Animals weighed in the book, lightest first. */
const ANIMALS = /** @type {const} */ (['Con vịt', 'Con gà', 'Con mèo', 'Con thỏ', 'Con chó']);

/** @type {Skill} */
export const ordering = {
  id: 'sap-xep',
  label: 'Sắp xếp phân số',
  make(rand) {
    const names = shuffle(rand, [...ANIMALS]).slice(0, 4);
    /** @type {Frac[]} */
    const kg = [];
    /** @type {Set<number>} */
    const seen = new Set();
    while (kg.length < 4) {
      const d = pick(rand, [2, 4, 8]);
      const n = int(rand, d + 1, d * 6);
      const eighths = (n * 8) / d;
      if (seen.has(eighths)) continue;
      seen.add(eighths);
      kg.push({ n, d });
    }
    const order = [0, 1, 2, 3].sort((i, j) => (kg[i].n * 8) / kg[i].d - (kg[j].n * 8) / kg[j].d);
    const line = (/** @type {number[]} */ ids) =>
      ids.map((i, k) => (k === 0 ? names[i] : names[i].toLowerCase())).join(', ');
    const right = line(order);
    return {
      prompt: `${names.map((n, i) => `${i === 0 ? n : n.toLowerCase()} cân nặng ${fracText(kg[i])} kg`).join('; ')}. Dãy nào xếp các con vật theo thứ tự cân nặng từ bé đến lớn?`,
      ...mixOptions(rand, right, [
        line(order.toReversed()),
        line([order[1], order[0], order[2], order[3]]),
        line([order[0], order[1], order[3], order[2]]),
      ]),
      hint: 'Em quy đồng mẫu số các phân số với mẫu số chung 8, rồi so sánh các tử số.',
      solution: `${kg.map((f) => raiseText(f, 8)).join('; ')}. Xếp từ bé đến lớn: ${order.map((i) => fracText(kg[i])).join(' < ')}. Vậy thứ tự là: ${right}.`,
    };
  },
};

/** The parts of the review of fractions, in book order. */
export const FRACTION_SKILLS = [
  shaded,
  fractionOf,
  equal,
  simplify,
  commonDenominator,
  compare,
  ranking,
  versusOne,
  ordering,
];
