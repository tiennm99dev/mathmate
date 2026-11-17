/**
 * The mixed practice of the chapter "Phân số": the fraction of a shaded
 * shape, a quotient written as a fraction, equal fractions, reducing,
 * bringing two fractions to a common denominator, comparing with the same
 * denominator, with 1 and with different denominators, and a story of who
 * has the most or the least. One question of each part in a shuffled order.
 * Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { SIGN_WORDS, compareSign } from '#lib/core/kid/numbers.js';
import { signOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { fracWords } from '../_shared/fractions.js';

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  hinh: 'Phân số chỉ phần tô màu',
  thuong: 'Phân số và phép chia',
  'bang-nhau': 'Phân số bằng nhau',
  'rut-gon': 'Rút gọn phân số',
  'quy-dong': 'Quy đồng mẫu số',
  'cung-mau': 'So sánh hai phân số cùng mẫu số',
  'voi-1': 'So sánh phân số với 1',
  'khac-mau': 'So sánh hai phân số khác mẫu số',
  'nhieu-nhat': 'Giải bài toán so sánh phân số',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/** @typedef {{ n: number, d: number }} Frac */

/**
 * A fraction as the plain text of a feedback line: '3/4'.
 * @param {number} n
 * @param {number} d
 */
const fracText = (n, d) => `${n}/${d}`;

/** @param {Frac} f */
const t = (f) => fracText(f.n, f.d);

/**
 * An option made of fractions: one fraction, or a pair joined by "và".
 * @typedef {{ label: string, fracs: Frac[] }} FracOption
 */

/**
 * What a question shows above its options: a shape cut into equal parts,
 * a line of fractions and signs, or a list of people with their fractions.
 * In a line, a fraction whose numerator is '?' asks for it.
 * @typedef {{ type: 'shape', shape: 'circle' | 'bar' | 'grid', parts: number, cols: number, filled: number }
 *   | { type: 'line', items: Array<Frac | { n: '?', d: number } | string> }
 *   | { type: 'people', unit: string, rows: Array<{ name: string } & Frac> }} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/**
 * A fraction option.
 * @param {Frac[]} fracs
 * @returns {FracOption}
 */
const fracOption = (fracs) => ({
  label: fracs.map((f) => fracText(f.n, f.d)).join(' và '),
  fracs,
});

/**
 * The right fraction option among wrong ones with other labels, shuffled,
 * with the spoken name of each.
 * @param {() => number} rand
 * @param {Frac[]} right
 * @param {Frac[][]} wrong
 */
function fracOptions(rand, right, wrong) {
  const seen = new Set();
  const all = [right, ...wrong].map(fracOption).filter((o) => {
    if (seen.has(o.label)) return false;
    seen.add(o.label);
    return true;
  });
  const options = shuffle(rand, all);
  return {
    options,
    answer: options.indexOf(all[0]),
    optionLabels: options.map((o) => o.fracs.map((f) => fracWords(f.n, f.d)).join(' và ')),
  };
}

/**
 * A fraction in lowest terms with a denominator from 2 to `maxD`, below 1.
 * @param {() => number} rand
 * @param {number} maxD
 * @returns {Frac}
 */
function simplest(rand, maxD) {
  for (;;) {
    const d = int(rand, 2, maxD);
    const n = int(rand, 1, d - 1);
    if (gcd(n, d) === 1) return { n, d };
  }
}

/** Ways to cut a shape: the shape, its parts and, for a grid, its columns. */
const SHAPES = /** @type {const} */ ([
  { shape: 'circle', parts: 3, cols: 3 },
  { shape: 'circle', parts: 4, cols: 4 },
  { shape: 'circle', parts: 6, cols: 6 },
  { shape: 'circle', parts: 8, cols: 8 },
  { shape: 'bar', parts: 5, cols: 5 },
  { shape: 'bar', parts: 7, cols: 7 },
  { shape: 'grid', parts: 6, cols: 3 },
  { shape: 'grid', parts: 8, cols: 4 },
  { shape: 'grid', parts: 9, cols: 3 },
]);

/** Stories of who has more: the people, the fractions and the thing shared. */
const STORIES = /** @type {const} */ ([
  {
    names: ['Việt', 'Mi', 'Mai'],
    fracs: [
      { n: 1, d: 2 },
      { n: 1, d: 6 },
      { n: 1, d: 3 },
    ],
    common: 6,
    unit: 'cái bánh',
    verb: 'ăn',
  },
  {
    names: ['Nam', 'Rô-bốt', 'Hà'],
    fracs: [
      { n: 1, d: 4 },
      { n: 3, d: 8 },
      { n: 1, d: 8 },
    ],
    common: 8,
    unit: 'cái bánh',
    verb: 'ăn',
  },
  {
    names: ['Mai', 'Việt', 'Nam'],
    fracs: [
      { n: 2, d: 5 },
      { n: 3, d: 10 },
      { n: 1, d: 5 },
    ],
    common: 10,
    unit: 'bức tường',
    verb: 'sơn',
  },
  {
    names: ['Hà', 'Mi', 'Rô-bốt'],
    fracs: [
      { n: 1, d: 3 },
      { n: 1, d: 4 },
      { n: 5, d: 12 },
    ],
    common: 12,
    unit: 'mảnh vườn',
    verb: 'tưới',
  },
]);

/** @type {Record<Kind, (rand: () => number) => Question>} */
const MAKERS = {
  hinh: (rand) => {
    const s = pick(rand, SHAPES);
    const n = int(rand, 1, s.parts - 1);
    const d = s.parts;
    /** @type {Frac[][]} */
    const wrong = [[{ n: d - n, d }], [{ n: n + 1, d }]];
    if (d - n > 1) wrong.push([{ n, d: d - n }]);
    return {
      kind: 'hinh',
      prompt: 'Phân số nào chỉ phần đã tô màu của hình?',
      ...fracOptions(rand, [{ n, d }], wrong),
      hint: 'Mẫu số là số phần bằng nhau của cả hình. Tử số là số phần đã tô màu.',
      solution: `Hình chia thành ${d} phần bằng nhau, đã tô màu ${n} phần. Phân số là ${fracText(n, d)}.`,
      visual: { type: 'shape', shape: s.shape, parts: d, cols: s.cols, filled: n },
    };
  },
  thuong: (rand) => {
    const a = int(rand, 2, 9);
    // b never divides a, so the share is not a whole number of cakes.
    const bs = [2, 3, 4, 5, 6, 7, 8, 9].filter((x) => a % x !== 0);
    const b = pick(rand, bs);
    return {
      kind: 'thuong',
      prompt: `Chia đều ${a} cái bánh cho ${b} bạn. Mỗi bạn được mấy phần cái bánh?`,
      ...fracOptions(rand, [{ n: a, d: b }], [[{ n: b, d: a }], [{ n: 1, d: b }]]),
      hint: `Mỗi bạn được ${a} : ${b} cái bánh. Số bị chia là tử số, số chia là mẫu số.`,
      solution: `${a} : ${b} = ${fracText(a, b)}. Mỗi bạn được ${fracText(a, b)} cái bánh.`,
      visual: { type: 'line', items: [`${a} : ${b}`, '=', '?'] },
    };
  },
  'bang-nhau': (rand) => {
    const f = simplest(rand, 9);
    const k = int(rand, 2, 6);
    const right = f.n * k;
    return {
      kind: 'bang-nhau',
      prompt: 'Số nào thích hợp với dấu ?',
      ...slipOptions(right, [f.n + f.d * k - f.d, k, right + 1], { min: 1 }),
      hint: `${f.d * k} : ${f.d} = ${k}. Nhân cả tử số và mẫu số với cùng một số.`,
      solution: `${f.d * k} : ${f.d} = ${k}. Nhân cả tử số và mẫu số của ${t(f)} với ${k}: ${t(f)} = ${fracText(right, f.d * k)}. Số cần điền là ${right}.`,
      visual: { type: 'line', items: [f, '=', { n: '?', d: f.d * k }] },
    };
  },
  'rut-gon': (rand) => {
    const f = simplest(rand, 9);
    const k = pick(rand, [2, 3, 4, 5, 6, 8, 9]);
    const p = k % 2 === 0 ? 2 : k % 3 === 0 ? 3 : k;
    /** @type {Frac[][]} */
    const wrong = [];
    if (p !== k) wrong.push([{ n: (f.n * k) / p, d: (f.d * k) / p }]);
    if (f.n > 1) wrong.push([{ n: f.d, d: f.n }]);
    if (f.n + 1 < f.d) wrong.push([{ n: f.n + 1, d: f.d }]);
    wrong.push([{ n: f.n * k, d: f.d }]);
    return {
      kind: 'rut-gon',
      prompt: 'Rút gọn phân số dưới đây. Em được phân số tối giản nào?',
      ...fracOptions(rand, [f], wrong.slice(0, 3)),
      hint: `Chia cả ${f.n * k} và ${f.d * k} cho cùng một số lớn hơn 1. Chia tiếp đến khi được phân số tối giản.`,
      solution: `Chia cả tử số và mẫu số cho ${k}: ${fracText(f.n * k, f.d * k)} = ${t(f)}. ${t(f)} là phân số tối giản.`,
      visual: { type: 'line', items: [{ n: f.n * k, d: f.d * k }, '=', '?'] },
    };
  },
  'quy-dong': (rand) => {
    const first = simplest(rand, 6);
    const k = int(rand, 2, 4);
    const d = first.d * k;
    let c = int(rand, 1, d - 1);
    while (gcd(c, d) !== 1) c += 1;
    const second = { n: c, d };
    const up = { n: first.n * k, d };
    return {
      kind: 'quy-dong',
      prompt: `Quy đồng mẫu số hai phân số ${t(first)} và ${t(second)}, ta được:`,
      ...fracOptions(
        rand,
        [up, second],
        [
          [{ n: first.n, d }, second],
          [{ n: first.n + d - first.d, d }, second],
          [up, { n: c * k, d }],
        ],
      ),
      hint: `${d} chia hết cho ${first.d}. Chọn mẫu số chung là ${d}, rồi nhân cả tử số và mẫu số của ${t(first)} với ${k}.`,
      solution: `${d} : ${first.d} = ${k}. Nhân cả tử số và mẫu số của ${t(first)} với ${k}: ${t(first)} = ${t(up)}. Giữ nguyên ${t(second)}. Ta được ${t(up)} và ${t(second)}.`,
      visual: { type: 'line', items: [first, 'và', second] },
    };
  },
  'cung-mau': (rand) => {
    const d = int(rand, 3, 20);
    const a = int(rand, 1, d + 3);
    const c = rand() < 0.15 ? a : int(rand, 1, d + 3);
    const s = compareSign(a, c);
    return {
      kind: 'cung-mau',
      prompt: 'Chọn dấu thích hợp với dấu ?',
      ...signOptions(s),
      hint: 'Hai phân số cùng mẫu số: phân số nào có tử số lớn hơn thì lớn hơn.',
      solution: `Cùng mẫu số ${d}, tử số ${a} ${SIGN_WORDS[s]} ${c}, nên ${fracText(a, d)} ${s} ${fracText(c, d)}.`,
      visual: { type: 'line', items: [{ n: a, d }, '?', { n: c, d }] },
    };
  },
  'voi-1': (rand) => {
    const d = int(rand, 2, 30);
    const n = Math.max(1, d + int(rand, -3, 3));
    const s = compareSign(n, d);
    return {
      kind: 'voi-1',
      prompt: 'Chọn dấu thích hợp với dấu ?',
      ...signOptions(s),
      hint: 'Em so sánh tử số với mẫu số.',
      solution: `Tử số ${n} ${SIGN_WORDS[s]} mẫu số ${d}, nên ${fracText(n, d)} ${s} 1.`,
      visual: { type: 'line', items: [{ n, d }, '?', '1'] },
    };
  },
  'khac-mau': (rand) => {
    const b = int(rand, 2, 6);
    const k = int(rand, 2, 4);
    const m = b * k;
    const a = int(rand, 1, b + 1);
    const c = rand() < 0.2 ? a * k : int(rand, 1, m + 2);
    const small = { n: a, d: b };
    const big = { n: c, d: m };
    const [left, right] = rand() < 0.5 ? [small, big] : [big, small];
    const s = compareSign(left.n * right.d, right.n * left.d);
    const up = { n: a * k, d: m };
    const ups = left === small ? [up, big] : [big, up];
    return {
      kind: 'khac-mau',
      prompt: 'Chọn dấu thích hợp với dấu ?',
      ...signOptions(s),
      hint: `Quy đồng mẫu số với mẫu số chung ${m}, rồi so sánh hai tử số.`,
      solution: `Nhân cả tử số và mẫu số của ${t(small)} với ${k}: ${t(small)} = ${t(up)}. Vì ${t(ups[0])} ${s} ${t(ups[1])} nên ${t(left)} ${s} ${t(right)}.`,
      visual: { type: 'line', items: [left, '?', right] },
    };
  },
  'nhieu-nhat': (rand) => {
    const story = pick(rand, STORIES);
    const order = shuffle(rand, [0, 1, 2]);
    const rows = order.map((i) => ({ name: story.names[i], ...story.fracs[i] }));
    const most = rand() < 0.5;
    const sized = rows.map((r) => (r.n * story.common) / r.d);
    const target = most ? Math.max(...sized) : Math.min(...sized);
    const winner = rows[sized.indexOf(target)].name;
    const options = shuffle(rand, [...story.names]);
    const listed = rows
      .map((r, i) =>
        r.d === story.common ? t(r) : `${t(r)} = ${fracText(sized[i], story.common)}`,
      )
      .join('; ');
    return {
      kind: 'nhieu-nhat',
      prompt: most ? `Ai ${story.verb} được nhiều nhất?` : `Ai ${story.verb} được ít nhất?`,
      options,
      answer: options.indexOf(winner),
      hint: `Quy đồng mẫu số ba phân số với mẫu số chung ${story.common}, rồi so sánh các tử số.`,
      solution: `${listed}. Bạn ${winner} ${story.verb} được ${most ? 'nhiều' : 'ít'} nhất.`,
      visual: { type: 'people', unit: story.unit, rows },
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
  return shuffle(rand, kinds).map((k) => MAKERS[k](rand));
}
