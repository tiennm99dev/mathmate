/**
 * The mixed practice of the chapter "Phép nhân, phép chia phân số":
 * multiplying two fractions and a fraction by a whole number, the reversed
 * fraction, dividing two fractions and with a whole number, finding a
 * fraction of a number, finding a missing factor and a story problem. One
 * question of each part in a shuffled order. Every fraction result is given
 * in lowest terms, and no wrong option has the value of the right one. Pure
 * and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { slipOptions } from '#lib/core/kid/quiz.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { fracText, fracWords, reduce, sameValue } from '../_shared/fractions.js';

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'nhan-hai-phan-so': 'Nhân hai phân số',
  'nhan-so-tu-nhien': 'Nhân phân số với số tự nhiên',
  'dao-nguoc': 'Phân số đảo ngược',
  'chia-hai-phan-so': 'Chia hai phân số',
  'chia-so-tu-nhien': 'Chia phân số với số tự nhiên',
  'phan-so-cua-mot-so': 'Tìm phân số của một số',
  'thua-so': 'Tìm thừa số chưa biết',
  'bai-toan': 'Giải bài toán có phân số',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/** @typedef {import('../_shared/fractions.js').Frac} Frac */

/**
 * What a question shows above its options: a line of fractions, whole
 * numbers, words and signs (a '?' item is what is asked), or the facts of a
 * story, one per line (a whole number has d = 1).
 * @typedef {{ type: 'line', items: Array<Frac | string> }
 *   | { type: 'facts', rows: Array<{ text: string } & Frac & { unit: string }> }} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** @param {Frac} f */
const t = (f) => fracText(f.n, f.d);

/**
 * The right fraction among the slips a child makes, as options with their
 * spoken names: the slips must be whole, positive, and differ in value
 * from the answer and from each other.
 * @param {() => number} rand
 * @param {Frac} right
 * @param {Frac[]} slips
 */
function fracOptions(rand, right, slips) {
  /** @type {Frac[]} */
  const kept = [right];
  for (const s of [...slips, { n: right.n + 1, d: right.d }, { n: right.n + 2, d: right.d }]) {
    if (kept.length === 4) break;
    if (!Number.isInteger(s.n) || !Number.isInteger(s.d) || s.n < 1 || s.d < 1) continue;
    if (kept.some((k) => sameValue(k, s))) continue;
    kept.push(s);
  }
  const options = shuffle(rand, kept).map((f) => ({ label: t(f), fracs: [f] }));
  return {
    options,
    answer: options.findIndex((o) => o.fracs[0] === right),
    optionLabels: options.map((o) => fracWords(o.fracs[0].n, o.fracs[0].d)),
  };
}

/**
 * A fraction in lowest terms with a denominator from lo to hi, less than 1.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 * @returns {Frac}
 */
function simplest(rand, lo, hi) {
  for (;;) {
    const d = int(rand, lo, hi);
    const n = int(rand, 1, d - 1);
    if (gcd(n, d) === 1) return { n, d };
  }
}

/**
 * The working of f × g as plain text: '2/3 × 4/5 = (2 × 4)/(3 × 5) = 8/15',
 * reduced at the end when it can be.
 * @param {Frac} f
 * @param {Frac} g
 */
function productWorking(f, g) {
  const raw = { n: f.n * g.n, d: f.d * g.d };
  const r = reduce(raw.n, raw.d);
  const tail = r.d === raw.d ? '' : ` = ${t(r)}`;
  return `${t(f)} × ${t(g)} = ${t(raw)}${tail}`;
}

/**
 * The working of f : g as plain text: '3/7 : 5/8 = 3/7 × 8/5 = 24/35'.
 * @param {Frac} f
 * @param {Frac} g
 */
const quotientWorking = (f, g) => `${t(f)} : ${t(g)} = ${productWorking(f, { n: g.d, d: g.n })}`;

/**
 * f × g in lowest terms.
 * @param {Frac} f
 * @param {Frac} g
 */
const times = (f, g) => reduce(f.n * g.n, f.d * g.d);

/** The stories: their facts, question, answer, slips and working. */
export const STORIES = /** @type {const} */ ([
  {
    facts: [
      { text: 'Quãng đường dài', n: 45, d: 1, unit: 'km' },
      { text: 'Đã đi được', n: 2, d: 3, unit: 'quãng đường' },
    ],
    prompt: 'Còn phải đi bao nhiêu ki-lô-mét nữa?',
    unit: 'km',
    answer: 15,
    slips: [30, 43, 22],
    hint: 'Tìm 2/3 của 45 km, rồi lấy 45 trừ đi.',
    solution: 'Đã đi 45 × 2/3 = 30 (km). Còn phải đi 45 − 30 = 15 (km).',
  },
  {
    facts: [
      { text: 'Ông năm nay', n: 72, d: 1, unit: 'tuổi' },
      { text: 'Tuổi Việt bằng', n: 1, d: 8, unit: 'tuổi ông' },
    ],
    prompt: 'Việt năm nay bao nhiêu tuổi?',
    unit: 'tuổi',
    answer: 9,
    slips: [8, 64, 80],
    hint: 'Tìm 1/8 của 72.',
    solution: '72 × 1/8 = 9. Việt năm nay 9 tuổi.',
  },
  {
    facts: [
      { text: 'Đơn hàng có', n: 1000, d: 1, unit: 'hộp' },
      { text: 'Tổ của bác Diễm nhận', n: 1, d: 4, unit: 'đơn hàng' },
    ],
    prompt: 'Tổ của bác Diễm nhận bao nhiêu hộp?',
    unit: 'hộp',
    answer: 250,
    slips: [750, 4000, 200],
    hint: 'Tìm 1/4 của 1 000 hộp.',
    solution: '1 000 × 1/4 = 250 (hộp).',
  },
  {
    facts: [
      { text: 'Có tất cả', n: 800, d: 1, unit: 'ốc vít' },
      { text: 'Khay trắng chứa', n: 1, d: 4, unit: 'số ốc vít' },
    ],
    prompt: 'Khay trắng chứa bao nhiêu ốc vít?',
    unit: 'ốc vít',
    answer: 200,
    slips: [600, 400, 250],
    hint: 'Tìm 1/4 của 800.',
    solution: '800 × 1/4 = 200 (ốc vít).',
  },
  {
    facts: [
      { text: 'Rô-bốt có', n: 100, d: 1, unit: 'kg chuối tươi' },
      { text: '1 kg chuối tươi sấy được', n: 1, d: 5, unit: 'kg chuối khô' },
    ],
    prompt: 'Rô-bốt sấy được bao nhiêu ki-lô-gam chuối khô?',
    unit: 'kg',
    answer: 20,
    slips: [5, 80, 500],
    hint: 'Tìm 1/5 của 100 kg.',
    solution: '100 × 1/5 = 20 (kg).',
  },
  {
    facts: [
      { text: 'Vại có', n: 15, d: 1, unit: 'l nước mắm' },
      { text: 'Rót ra 8 lọ, mỗi lọ', n: 3, d: 4, unit: 'l' },
    ],
    prompt: 'Trong vại còn lại bao nhiêu lít nước mắm?',
    unit: 'l',
    answer: 9,
    slips: [6, 7, 12],
    hint: 'Tính số lít đã rót: 8 × 3/4. Rồi lấy 15 trừ đi.',
    solution: 'Đã rót 8 × 3/4 = 24/4 = 6 (l). Còn lại 15 − 6 = 9 (l).',
  },
]);

/** @type {Record<Kind, (rand: () => number) => Question>} */
const MAKERS = {
  'nhan-hai-phan-so': (rand) => {
    const f = simplest(rand, 2, 9);
    const g = simplest(rand, 2, 9);
    return {
      kind: 'nhan-hai-phan-so',
      prompt: 'Kết quả của phép nhân là phân số nào?',
      ...fracOptions(rand, times(f, g), [
        { n: f.n * g.n, d: f.d + g.d },
        { n: f.n + g.n, d: f.d * g.d },
        { n: f.n * g.d, d: f.d * g.n },
      ]),
      hint: 'Tử số nhân với tử số, mẫu số nhân với mẫu số. Rút gọn kết quả nếu được.',
      solution: `${productWorking(f, g)}.`,
      visual: { type: 'line', items: [f, '×', g, '=', '?'] },
    };
  },
  'nhan-so-tu-nhien': (rand) => {
    const f = simplest(rand, 3, 11);
    const w = int(rand, 2, 9);
    const W = { n: w, d: 1 };
    const [x, y] = rand() < 0.5 ? [f, W] : [W, f];
    return {
      kind: 'nhan-so-tu-nhien',
      prompt: 'Kết quả của phép nhân là phân số nào?',
      ...fracOptions(rand, times(f, W), [
        { n: f.n * w, d: f.d * w },
        { n: f.n, d: f.d * w },
        { n: f.n + w, d: f.d },
      ]),
      hint: `Viết ${w} thành ${w}/1. Giữ nguyên mẫu số, nhân tử số với ${w}.`,
      solution: `${productWorking(x, y)}.`,
      visual: { type: 'line', items: [x, '×', y, '=', '?'] },
    };
  },
  'dao-nguoc': (rand) => {
    const f = rand() < 0.25 ? { n: int(rand, 2, 9), d: 1 } : simplest(rand, 2, 12);
    const right = { n: f.d, d: f.n };
    return {
      kind: 'dao-nguoc',
      prompt: 'Phân số đảo ngược của số này là phân số nào?',
      ...fracOptions(rand, right, [f, { n: f.d - f.n, d: f.d }, { n: f.d + 1, d: f.n }]),
      hint: 'Đổi chỗ tử số và mẫu số.',
      solution:
        f.d === 1
          ? `${f.n} = ${f.n}/1. Đổi chỗ tử số và mẫu số, được 1/${f.n}.`
          : `Đổi chỗ tử số ${f.n} và mẫu số ${f.d}, được ${t(right)}.`,
      visual: { type: 'line', items: [f] },
    };
  },
  'chia-hai-phan-so': (rand) => {
    const f = simplest(rand, 2, 9);
    const g = simplest(rand, 2, 9);
    return {
      kind: 'chia-hai-phan-so',
      prompt: 'Kết quả của phép chia là phân số nào?',
      ...fracOptions(rand, times(f, { n: g.d, d: g.n }), [
        { n: f.n * g.n, d: f.d * g.d },
        { n: f.d * g.n, d: f.n * g.d },
        { n: f.d * g.d, d: f.n * g.n },
      ]),
      hint: `Nhân ${t(f)} với phân số đảo ngược của ${t(g)}, là ${t({ n: g.d, d: g.n })}.`,
      solution: `${quotientWorking(f, g)}.`,
      visual: { type: 'line', items: [f, ':', g, '=', '?'] },
    };
  },
  'chia-so-tu-nhien': (rand) => {
    const f = simplest(rand, 2, 9);
    const w = int(rand, 2, 6);
    const W = { n: w, d: 1 };
    const wholeFirst = rand() < 0.5;
    const [x, y] = wholeFirst ? [W, f] : [f, W];
    const right = times(x, { n: y.d, d: y.n });
    return {
      kind: 'chia-so-tu-nhien',
      prompt: 'Kết quả của phép chia là phân số nào?',
      ...fracOptions(rand, right, [
        times(x, y),
        times({ n: x.d, d: x.n }, y),
        wholeFirst ? { n: w * f.n, d: f.d } : { n: f.n * w, d: f.d },
      ]),
      hint: wholeFirst
        ? `Nhân ${w} với phân số đảo ngược của ${t(f)}, là ${t({ n: f.d, d: f.n })}.`
        : `Phân số đảo ngược của ${w} là 1/${w}. Nhân ${t(f)} với 1/${w}.`,
      solution: `${quotientWorking(x, y)}.`,
      visual: { type: 'line', items: [x, ':', y, '=', '?'] },
    };
  },
  'phan-so-cua-mot-so': (rand) => {
    const f = simplest(rand, 2, 9);
    const each = int(rand, 2, 9);
    const N = f.d * each;
    const right = each * f.n;
    return {
      kind: 'phan-so-cua-mot-so',
      prompt: `Tìm ${t(f)} của ${N}.`,
      ...slipOptions(right, [each, N - right, N * f.n, N + f.n], { min: 1 }),
      hint: `Chia ${N} cho mẫu số ${f.d}, rồi nhân với tử số ${f.n}.`,
      solution: `${N} : ${f.d} = ${each}; ${each} × ${f.n} = ${right}. Vậy ${t(f)} của ${N} là ${N} × ${t(f)} = ${right}.`,
      visual: { type: 'line', items: [f, 'của', String(N), '=', '?'] },
    };
  },
  'thua-so': (rand) => {
    const x = simplest(rand, 2, 9);
    const g = simplest(rand, 2, 9);
    const h = times(x, g);
    return {
      kind: 'thua-so',
      prompt: 'Phân số nào thích hợp với dấu ?',
      ...fracOptions(rand, x, [times(h, g), h, { n: g.d, d: g.n }]),
      hint: `Muốn tìm thừa số chưa biết, em lấy tích chia cho thừa số đã biết: ${t(h)} : ${t(g)}.`,
      solution: `? = ${quotientWorking(h, g)}.`,
      visual: { type: 'line', items: ['?', '×', g, '=', h] },
    };
  },
  'bai-toan': (rand) => {
    const story = pick(rand, STORIES);
    return {
      kind: 'bai-toan',
      prompt: story.prompt,
      ...slipOptions(story.answer, [...story.slips], { min: 1, unit: story.unit }),
      hint: story.hint,
      solution: story.solution,
      visual: { type: 'facts', rows: story.facts.map((r) => ({ ...r })) },
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
