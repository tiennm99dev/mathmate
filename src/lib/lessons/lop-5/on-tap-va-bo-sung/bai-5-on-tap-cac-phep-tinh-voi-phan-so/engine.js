/**
 * Fraction strips that show each operation one step at a time. Adding and
 * subtracting first bring both fractions to the same denominator (one
 * denominator is a multiple of the other, as in this review), then join or
 * take away parts; a natural number times a fraction lays copies end to
 * end; a fraction divided by a natural number cuts every part; a fraction
 * times a fraction takes a part of the shaded part. The child picks the
 * result before its strip is shown. Pure and DOM-free.
 */
import { equals, fraction, simplify } from '#lib/fraction-engine/index.js';

/** @typedef {'+' | '−' | '×n' | ':n' | '×'} Op */

/**
 * A task: a/b op c/d, or n × a/b (c = n, d = 1), or a/b : n (c = n, d = 1),
 * with two wrong results a child may reach.
 * @typedef {{ op: Op, a: number, b: number, c: number, d: number, slips: [number, number][] }} Task
 */

/**
 * One strip drawn by `fraction-bars`.
 * @typedef {{ numerator: number, denominator: number, label: string, color?: string }} Bar
 */

/**
 * One step: the strips and what they show, in rich text.
 * @typedef {{ bars: Bar[], text: string }} Step
 */

/** @type {readonly Task[]} */
export const TASKS = [
  {
    op: '+',
    a: 1,
    b: 4,
    c: 3,
    d: 8,
    slips: [
      [4, 12],
      [4, 8],
    ],
  },
  {
    op: '−',
    a: 7,
    b: 8,
    c: 1,
    d: 4,
    slips: [
      [6, 4],
      [6, 8],
    ],
  },
  {
    op: '×n',
    a: 2,
    b: 9,
    c: 3,
    d: 1,
    slips: [
      [6, 27],
      [5, 9],
    ],
  },
  {
    op: ':n',
    a: 4,
    b: 5,
    c: 2,
    d: 1,
    slips: [
      [8, 5],
      [2, 10],
    ],
  },
  {
    op: '×',
    a: 2,
    b: 3,
    c: 3,
    d: 4,
    slips: [
      [5, 7],
      [8, 9],
    ],
  },
  {
    op: '+',
    a: 1,
    b: 3,
    c: 1,
    d: 6,
    slips: [
      [2, 9],
      [2, 6],
    ],
  },
  {
    op: '−',
    a: 15,
    b: 16,
    c: 3,
    d: 4,
    slips: [
      [12, 12],
      [12, 16],
    ],
  },
  {
    op: ':n',
    a: 3,
    b: 4,
    c: 3,
    d: 1,
    slips: [
      [9, 4],
      [3, 7],
    ],
  },
];

/** @param {number} n @param {number} d */
const tex = (n, d) => (d === 1 ? String(n) : `$\\dfrac{${n}}{${d}}$`);

/** @param {number} n @param {number} d @param {string} [color] @returns {Bar} */
const bar = (n, d, color) => ({
  numerator: n,
  denominator: d,
  label: `${n}/${d}`,
  ...(color ? { color } : {}),
});

const RESULT = '#16a34a';

/**
 * The task written as an expression in rich text.
 * @param {Task} t
 */
export function exprText(t) {
  if (t.op === '×n') return `${t.c} × ${tex(t.a, t.b)}`;
  if (t.op === ':n') return `${tex(t.a, t.b)} : ${t.c}`;
  return `${tex(t.a, t.b)} ${t.op} ${tex(t.c, t.d)}`;
}

/**
 * Both fractions of + or − over the larger denominator, which the other
 * divides.
 * @param {Task} t
 */
export function sameDenominator(t) {
  const common = Math.max(t.b, t.d);
  return [
    { n: t.a * (common / t.b), d: common },
    { n: t.c * (common / t.d), d: common },
  ];
}

/**
 * The result the book's way, before reducing: over the common denominator
 * for + and −, a × n over b, a over b × n, a × c over b × d.
 * @param {Task} t
 */
export function rawResult(t) {
  if (t.op === '+' || t.op === '−') {
    const [x, y] = sameDenominator(t);
    return fraction(t.op === '+' ? x.n + y.n : x.n - y.n, x.d);
  }
  if (t.op === ':n') return fraction(t.a, t.b * t.c);
  return fraction(t.a * t.c, t.b * t.d);
}

/** The result in lowest terms. @param {Task} t */
export const resultOf = (t) => simplify(rawResult(t));

/**
 * The strips before the result: the operands, then the step that prepares
 * them.
 * @param {Task} t
 * @returns {Step[]}
 */
export function stepsOf(t) {
  if (t.op === '+' || t.op === '−') {
    const [x, y] = sameDenominator(t);
    const first = {
      bars: [bar(t.a, t.b), bar(t.c, t.d)],
      text: `Hai băng: ${tex(t.a, t.b)} và ${tex(t.c, t.d)}.`,
    };
    if (t.b === t.d) return [first];
    const [which, from, to] =
      t.b < t.d ? ['trên', { n: t.a, d: t.b }, x] : ['dưới', { n: t.c, d: t.d }, y];
    return [
      first,
      {
        bars: [bar(x.n, x.d), bar(y.n, y.d)],
        text: `Quy đồng mẫu số: chia mỗi phần của băng ${which} thành ${to.d / from.d} phần, ${tex(from.n, from.d)} = ${tex(to.n, to.d)}. Bây giờ hai băng cùng mẫu số ${x.d}.`,
      },
    ];
  }
  if (t.op === '×n') {
    return [
      {
        bars: Array.from({ length: t.c }, () => bar(t.a, t.b)),
        text: `${t.c} × ${tex(t.a, t.b)} là ${t.c} lần ${tex(t.a, t.b)}: ${Array.from({ length: t.c }, () => tex(t.a, t.b)).join(' + ')}.`,
      },
    ];
  }
  if (t.op === ':n') {
    return [
      { bars: [bar(t.a, t.b)], text: `Băng ${tex(t.a, t.b)} cần chia đều thành ${t.c} phần.` },
      {
        bars: [bar(t.a * t.c, t.b * t.c)],
        text: `Chia mỗi phần thành ${t.c} phần nhỏ: ${tex(t.a, t.b)} = ${tex(t.a * t.c, t.b * t.c)}. Em lấy một trong ${t.c} phần bằng nhau của chỗ đã tô.`,
      },
    ];
  }
  return [
    {
      bars: [bar(t.a, t.b)],
      text: `${tex(t.a, t.b)} × ${tex(t.c, t.d)} là ${tex(t.c, t.d)} của ${tex(t.a, t.b)}.`,
    },
    {
      bars: [bar(t.a * t.d, t.b * t.d)],
      text: `Chia mỗi phần thành ${t.d} phần nhỏ: ${tex(t.a, t.b)} = ${tex(t.a * t.d, t.b * t.d)}. Em lấy ${t.c} trong mỗi ${t.d} phần nhỏ đã tô.`,
    },
  ];
}

/**
 * The step that shows the result.
 * @param {Task} t
 * @returns {Step}
 */
export function resultStep(t) {
  const raw = rawResult(t);
  const low = simplify(raw);
  const reduce = low.d !== raw.d ? ` = ${tex(low.n, low.d)}` : '';
  /** @type {Bar[]} */
  let bars;
  let how;
  if (t.op === '+' || t.op === '−') {
    const [x, y] = sameDenominator(t);
    bars = [bar(raw.n, raw.d, RESULT)];
    how = `${t.op === '+' ? 'Gộp' : 'Bớt'} các phần: ${tex(x.n, x.d)} ${t.op} ${tex(y.n, y.d)} = ${tex(raw.n, raw.d)}`;
  } else if (t.op === '×n') {
    bars = [bar(raw.n, raw.d, RESULT)];
    how = `Nhân tử số với ${t.c}, giữ nguyên mẫu số: ${t.c} × ${tex(t.a, t.b)} = ${tex(raw.n, raw.d)}`;
  } else if (t.op === ':n') {
    bars = [bar(raw.n, raw.d, RESULT)];
    how = `Giữ nguyên tử số, nhân mẫu số với ${t.c}: ${exprText(t)} = ${tex(raw.n, raw.d)}`;
  } else {
    bars = [bar(raw.n, raw.d, RESULT)];
    how = `Nhân tử số với tử số, mẫu số với mẫu số: ${exprText(t)} = ${tex(raw.n, raw.d)}`;
  }
  return { bars, text: `${how}${reduce}.` };
}

/**
 * The results offered, the right one in lowest terms among the slips.
 * The order turns with `seed` so the right one moves.
 * @param {Task} t
 * @param {number} seed
 * @returns {{ n: number, d: number }[]}
 */
export function optionsOf(t, seed) {
  const right = resultOf(t);
  const all = [right, ...t.slips.map(([n, d]) => ({ n, d }))];
  const shift = seed % all.length;
  return [...all.slice(shift), ...all.slice(0, shift)];
}

/**
 * Whether a picked result is right: any fraction equal to the result.
 * @param {Task} t
 * @param {{ n: number, d: number }} pick
 */
export const isRight = (t, pick) => equals(fraction(pick.n, pick.d), rawResult(t));
