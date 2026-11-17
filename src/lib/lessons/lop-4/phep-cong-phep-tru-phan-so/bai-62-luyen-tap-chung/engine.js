/**
 * The mixed practice of the chapter "Phép cộng, phép trừ phân số": adding
 * and subtracting with the same and with different denominators, reducing
 * first, a whole number with a fraction, a convenient sum of three
 * fractions, spotting a wrong calculation and a story problem. One question
 * of each part in a shuffled order. Every result is given in lowest terms,
 * and no wrong option has the value of the right one. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { fracText, fracWords, reduce } from '../_shared/fractions.js';

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'cong-cung-mau': 'Cộng hai phân số cùng mẫu số',
  'cong-khac-mau': 'Cộng hai phân số khác mẫu số',
  'tru-cung-mau': 'Trừ hai phân số cùng mẫu số',
  'tru-khac-mau': 'Trừ hai phân số khác mẫu số',
  'rut-gon': 'Rút gọn rồi tính',
  'so-tu-nhien': 'Cộng, trừ số tự nhiên với phân số',
  'thuan-tien': 'Tính bằng cách thuận tiện',
  'dung-sai': 'Tìm phép tính đúng, sai',
  'bai-toan': 'Giải bài toán có phân số',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/** @typedef {import('../_shared/fractions.js').Frac} Frac */

/**
 * What a question shows above its options: a line of fractions, whole
 * numbers and signs (a '?' item asks for the result), or the facts of a
 * story, one fraction per line.
 * @typedef {{ type: 'line', items: Array<Frac | string> }
 *   | { type: 'facts', op: '+' | '−', rows: Array<{ text: string } & Frac & { unit: string }> }} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** @param {Frac} f */
const t = (f) => fracText(f.n, f.d);

/**
 * The value of a fraction compared exactly: f equals g.
 * @param {Frac} f
 * @param {Frac} g
 */
const same = (f, g) => f.n * g.d === g.n * f.d;

/**
 * a/b ± c/d in lowest terms, worked with the denominator D.
 * @param {Frac} f
 * @param {Frac} g
 * @param {'+' | '−'} op
 * @param {number} D a common multiple of both denominators
 */
function combine(f, g, op, D) {
  const A = (f.n * D) / f.d;
  const C = (g.n * D) / g.d;
  const raw = { n: op === '+' ? A + C : A - C, d: D };
  return { A, C, raw, result: reduce(raw.n, raw.d) };
}

/**
 * The working as plain text: '3/5 + 1/10 = 6/10 + 1/10 = 7/10', reduced at
 * the end when it can be.
 * @param {Frac} f
 * @param {Frac} g
 * @param {'+' | '−'} op
 * @param {number} D
 */
function working(f, g, op, D) {
  const { A, C, raw, result } = combine(f, g, op, D);
  const middle = f.d === D && g.d === D ? '' : ` = ${A}/${D} ${op} ${C}/${D}`;
  const tail = result.d === raw.d ? '' : ` = ${t(result)}`;
  return `${t(f)} ${op} ${t(g)}${middle} = ${t(raw)}${tail}`;
}

/**
 * The right fraction among the slips a child makes, as options with their
 * spoken names: the slips must be whole, positive, with a denominator of at
 * least 1, and differ in value from the answer and from each other.
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
    if (kept.some((k) => same(k, s))) continue;
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
 * The slips of a ± b: the denominators combined too, the numerator of the
 * fraction brought up left as it was, and the result before reducing read
 * as a new numerator over the small denominator.
 * @param {Frac} f
 * @param {Frac} g
 * @param {'+' | '−'} op
 * @param {number} D
 */
function slipsOf(f, g, op, D) {
  const plus = op === '+';
  const { A, C } = combine(f, g, op, D);
  return [
    { n: plus ? f.n + g.n : f.n - g.n, d: plus ? f.d + g.d : f.d - g.d },
    { n: plus ? f.n + g.n : f.n - g.n, d: D },
    { n: plus ? A + C : A - C, d: Math.min(f.d, g.d) },
  ];
}

/**
 * A fraction in lowest terms with a denominator from lo to hi.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 * @param {number} [maxN] largest numerator, default d − 1
 * @returns {Frac}
 */
function simplest(rand, lo, hi, maxN) {
  for (;;) {
    const d = int(rand, lo, hi);
    const n = int(rand, 1, maxN ?? d - 1);
    if (gcd(n, d) === 1) return { n, d };
  }
}

/**
 * Two fractions with different denominators, one a multiple of the other,
 * the first greater than the second when `op` is a subtraction.
 * @param {() => number} rand
 * @param {'+' | '−'} op
 */
function unlikePair(rand, op) {
  for (;;) {
    const small = simplest(rand, 2, 6);
    const k = int(rand, 2, 4);
    const D = small.d * k;
    const big = simplest(rand, D, D);
    if (big.d !== D) continue;
    const [f, g] = rand() < 0.5 ? [small, big] : [big, small];
    if (op === '−' && f.n * g.d <= g.n * f.d) continue;
    return { f, g, D };
  }
}

/** Stories: the facts given, the question and the operations. */
const STORIES = /** @type {const} */ ([
  {
    facts: [
      { text: 'Nhóm thứ nhất sửa', n: 3, d: 10, unit: 'đoạn đường' },
      { text: 'Nhóm thứ hai sửa', n: 1, d: 5, unit: 'đoạn đường' },
    ],
    prompt: 'Cả hai nhóm sửa được mấy phần đoạn đường?',
    op: '+',
  },
  {
    facts: [
      { text: 'Giờ đầu ô tô chạy', n: 2, d: 7, unit: 'quãng đường' },
      { text: 'Giờ sau ô tô chạy', n: 3, d: 7, unit: 'quãng đường' },
    ],
    prompt: 'Sau hai giờ ô tô chạy được mấy phần quãng đường?',
    op: '+',
  },
  {
    facts: [
      { text: 'Anh A Phan thu hoạch', n: 1, d: 5, unit: 'rẫy cà phê' },
      { text: 'Chị Rang Hu thu hoạch', n: 3, d: 10, unit: 'rẫy cà phê' },
    ],
    prompt: 'Hai người thu hoạch được mấy phần rẫy cà phê?',
    op: '+',
  },
  {
    facts: [
      { text: 'Rô-bốt có', n: 7, d: 12, unit: 'chai nước giặt' },
      { text: 'Rô-bốt dùng để giặt chăn', n: 1, d: 3, unit: 'chai' },
    ],
    prompt: 'Rô-bốt còn lại mấy phần chai nước giặt?',
    op: '−',
  },
  {
    facts: [
      { text: 'Bác Tân trồng rau và hoa trên', n: 7, d: 12, unit: 'mảnh đất' },
      { text: 'Phần trồng rau là', n: 1, d: 3, unit: 'mảnh đất' },
    ],
    prompt: 'Phần trồng hoa là mấy phần mảnh đất?',
    op: '−',
  },
  {
    facts: [
      { text: 'Dế Trũi có', n: 3, d: 8, unit: 'chiếc lá' },
      { text: 'Dế Trũi cho Dế Mèn', n: 1, d: 4, unit: 'chiếc lá' },
    ],
    prompt: 'Dế Trũi còn lại mấy phần chiếc lá?',
    op: '−',
  },
]);

/**
 * A sum or difference question shown as a line 'f op g = ?'.
 * @param {() => number} rand
 * @param {Kind} kind
 * @param {Frac} f
 * @param {Frac} g
 * @param {'+' | '−'} op
 * @param {number} D
 * @param {string} hint
 * @returns {Question}
 */
function lineQuestion(rand, kind, f, g, op, D, hint) {
  const { result } = combine(f, g, op, D);
  return {
    kind,
    prompt: 'Kết quả của phép tính là phân số nào?',
    ...fracOptions(rand, result, slipsOf(f, g, op, D)),
    hint,
    solution: `${working(f, g, op, D)}.`,
    visual: { type: 'line', items: [f, op, g, '=', '?'] },
  };
}

/** @type {Record<Kind, (rand: () => number) => Question>} */
const MAKERS = {
  'cong-cung-mau': (rand) => {
    const d = int(rand, 3, 15);
    const f = { n: int(rand, 1, d), d };
    const g = { n: int(rand, 1, d), d };
    return lineQuestion(
      rand,
      'cong-cung-mau',
      f,
      g,
      '+',
      d,
      'Cộng hai tử số với nhau và giữ nguyên mẫu số. Rút gọn kết quả nếu được.',
    );
  },
  'cong-khac-mau': (rand) => {
    const { f, g, D } = unlikePair(rand, '+');
    return lineQuestion(
      rand,
      'cong-khac-mau',
      f,
      g,
      '+',
      D,
      `Quy đồng mẫu số với mẫu số chung ${D}, rồi cộng hai tử số. Rút gọn kết quả nếu được.`,
    );
  },
  'tru-cung-mau': (rand) => {
    const d = int(rand, 3, 15);
    const c = int(rand, 1, d - 1);
    const a = int(rand, c + 1, d + 2);
    return lineQuestion(
      rand,
      'tru-cung-mau',
      { n: a, d },
      { n: c, d },
      '−',
      d,
      'Trừ hai tử số và giữ nguyên mẫu số. Rút gọn kết quả nếu được.',
    );
  },
  'tru-khac-mau': (rand) => {
    const { f, g, D } = unlikePair(rand, '−');
    return lineQuestion(
      rand,
      'tru-khac-mau',
      f,
      g,
      '−',
      D,
      `Quy đồng mẫu số với mẫu số chung ${D}, rồi trừ hai tử số. Rút gọn kết quả nếu được.`,
    );
  },
  'rut-gon': (rand) => {
    const op = rand() < 0.5 ? '+' : '−';
    const q = int(rand, 3, 9);
    /** @type {Frac} */
    let p;
    /** @type {Frac} */
    let r;
    do {
      p = simplest(rand, q, q);
      r = { n: int(rand, 1, q - 1), d: q };
    } while (p.d !== q || (op === '−' && p.n <= r.n));
    const k = int(rand, 2, 4);
    const big = { n: p.n * k, d: q * k };
    const [f, g] = op === '−' || rand() < 0.5 ? [big, r] : [r, big];
    const { result } = combine(p, r, op, q);
    const reducedFirst = op === '−' || f === big ? [p, r] : [r, p];
    return {
      kind: 'rut-gon',
      prompt: 'Rút gọn rồi tính. Kết quả là phân số nào?',
      ...fracOptions(rand, result, slipsOf(f, g, op, q * k)),
      hint: `Rút gọn ${t(big)}: chia cả tử số và mẫu số cho ${k}.`,
      solution: `${t(big)} = ${t(p)}. ${working(reducedFirst[0], reducedFirst[1], op, q)}.`,
      visual: { type: 'line', items: [f, op, g, '=', '?'] },
    };
  },
  'so-tu-nhien': (rand) => {
    const op = rand() < 0.5 ? '+' : '−';
    const w = int(rand, 1, 3);
    const g = simplest(rand, 2, 9);
    const whole = { n: w * g.d, d: g.d };
    const { result } = combine(whole, g, op, g.d);
    return {
      kind: 'so-tu-nhien',
      prompt: 'Kết quả của phép tính là phân số nào?',
      // Slips: the whole number added to the numerator (or the subtraction
      // turned into an addition), w read as w/1 with the terms combined, and
      // the denominator added (or the numerators subtracted as they stand).
      ...fracOptions(rand, result, [
        { n: op === '+' ? w + g.n : w * g.d + g.n, d: g.d },
        { n: op === '+' ? w + g.n : w - g.n, d: op === '+' ? g.d + 1 : g.d - 1 },
        { n: op === '+' ? w * g.d + g.n : Math.abs(w - g.n), d: op === '+' ? 2 * g.d : g.d },
      ]),
      hint: `Viết ${w} thành phân số có mẫu số ${g.d}: ${w} = ${t(whole)}.`,
      solution: `${w} ${op} ${t(g)} = ${t(whole)} ${op} ${t(g)} = ${t(result)}.`,
      visual: { type: 'line', items: [String(w), op, g, '=', '?'] },
    };
  },
  'thuan-tien': (rand) => {
    const d = pick(rand, [5, 6, 7, 8, 9, 10, 12, 15]);
    const round = pick(rand, [1, 2]) * d;
    const x = int(rand, 1, Math.min(round - 1, d + 5));
    const y = round - x;
    const z = int(rand, 1, d - 1);
    const total = { n: round + z, d };
    const result = reduce(total.n, total.d);
    const tail = result.d === d ? '' : ` = ${t(result)}`;
    return {
      kind: 'thuan-tien',
      prompt: 'Tính bằng cách thuận tiện. Kết quả là phân số nào?',
      ...fracOptions(rand, result, [
        { n: round + z, d: 3 * d },
        { n: round, d },
        { n: z, d },
      ]),
      hint: `Nhóm trước hai phân số có tổng bằng ${round === d ? 1 : 2}: ${x} + ${y} = ${round}.`,
      solution: `(${x}/${d} + ${y}/${d}) + ${z}/${d} = ${round}/${d} + ${z}/${d} = ${t(total)}${tail}.`,
      visual: {
        type: 'line',
        items: [{ n: x, d }, '+', { n: z, d }, '+', { n: y, d }, '=', '?'],
      },
    };
  },
  'dung-sai': (rand) => {
    const op = rand() < 0.5 ? '+' : '−';
    const { f, g, D } = unlikePair(rand, op);
    const { result } = combine(f, g, op, D);
    const truth = rand() < 0.5;
    const slip = slipsOf(f, g, op, D).find((s) => s.n >= 1 && s.d >= 1 && !same(s, result));
    const shown = truth || !slip ? result : slip;
    const right = same(shown, result);
    const options = ['Đúng', 'Sai'];
    return {
      kind: 'dung-sai',
      prompt: 'Phép tính dưới đây đúng hay sai?',
      options,
      answer: right ? 0 : 1,
      hint: `Em tự tính: quy đồng mẫu số với mẫu số chung ${D}, rồi so sánh với kết quả đã cho.`,
      solution: `${working(f, g, op, D)}. Phép tính ${right ? 'đúng' : 'sai'}.`,
      visual: { type: 'line', items: [f, op, g, '=', shown] },
    };
  },
  'bai-toan': (rand) => {
    const story = pick(rand, STORIES);
    const [p, q] = story.facts;
    const f = { n: p.n, d: p.d };
    const g = { n: q.n, d: q.d };
    const D = Math.max(f.d, g.d);
    const { result } = combine(f, g, story.op, D);
    return {
      kind: 'bai-toan',
      prompt: story.prompt,
      ...fracOptions(rand, result, slipsOf(f, g, story.op, D)),
      hint: `Em làm phép ${story.op === '+' ? 'cộng' : 'trừ'} ${t(f)} ${story.op} ${t(g)}, với mẫu số chung ${D}.`,
      solution: `${working(f, g, story.op, D)}.`,
      visual: { type: 'facts', op: story.op, rows: story.facts.map((r) => ({ ...r })) },
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
