/**
 * Adding and subtracting two fractions with different denominators on
 * fraction strips. The child picks a common denominator: a number both
 * denominators divide cuts both strips into equal small parts, any other
 * number does not. Over the common denominator the strips are joined (+)
 * or one is taken from the other (−), and the child picks the result.
 * Pure and DOM-free.
 */
import { lcm } from '#lib/numtheory-engine/index.js';
import { equals, fraction, simplify } from '#lib/fraction-engine/index.js';

/** @typedef {'+' | '−'} Op */

/**
 * A task a/b op c/d with b and d different and neither a multiple of the
 * other, so the larger denominator is not a common one.
 * @typedef {{ op: Op, a: number, b: number, c: number, d: number }} Task
 */

/**
 * One strip drawn by `fraction-bars`.
 * @typedef {{ numerator: number, denominator: number, label: string, color?: string }} Bar
 */

/** The largest denominator a strip is cut into, so its parts stay visible. */
export const MAX_PARTS = 24;

/** @type {readonly Task[]} */
export const TASKS = [
  { op: '+', a: 1, b: 2, c: 1, d: 3 },
  { op: '−', a: 3, b: 4, c: 2, d: 3 },
  { op: '+', a: 2, b: 3, c: 1, d: 4 },
  { op: '−', a: 4, b: 5, c: 1, d: 2 },
  { op: '+', a: 1, b: 3, c: 2, d: 5 },
  { op: '−', a: 5, b: 6, c: 1, d: 4 },
  { op: '+', a: 1, b: 4, c: 1, d: 6 },
  { op: '−', a: 2, b: 3, c: 1, d: 2 },
];

/** @param {number} n @param {number} d */
export const tex = (n, d) => (d === 1 ? String(n) : `$\\dfrac{${n}}{${d}}$`);

/** @param {number} n @param {number} d @param {string} [color] @returns {Bar} */
const bar = (n, d, color) => ({
  numerator: n,
  denominator: d,
  label: `${n}/${d}`,
  ...(color ? { color } : {}),
});

const RESULT = '#16a34a';

/** The task as rich text. @param {Task} t */
export const exprText = (t) => `${tex(t.a, t.b)} ${t.op} ${tex(t.c, t.d)}`;

/** Whether both denominators divide `m`. @param {Task} t @param {number} m */
export const isCommon = (t, m) => m % t.b === 0 && m % t.d === 0;

/**
 * The denominators offered: each one alone (the usual slip), their sum (a
 * slip of adding), their product (the book's way) and the least common one
 * when smaller, in increasing order and none above `MAX_PARTS`.
 * @param {Task} t
 */
export function candidates(t) {
  const all = [t.b, t.d, t.b + t.d, t.b * t.d, lcm(t.b, t.d)];
  return [...new Set(all)].filter((m) => m <= MAX_PARTS).sort((x, y) => x - y);
}

/** The two fractions over `m`, a common denominator. @param {Task} t @param {number} m */
export function over(t, m) {
  return [
    { n: (t.a * m) / t.b, d: m },
    { n: (t.c * m) / t.d, d: m },
  ];
}

/**
 * What a chosen denominator does to the strips: the two strips over `m`
 * when both cut evenly, else the two strips as they were and why `m` does
 * not work.
 * @param {Task} t
 * @param {number} m
 * @returns {{ ok: boolean, bars: Bar[], text: string }}
 */
export function tryDenominator(t, m) {
  if (isCommon(t, m)) {
    const [x, y] = over(t, m);
    return {
      ok: true,
      bars: [bar(x.n, x.d), bar(y.n, y.d)],
      text: `Mẫu số chung ${m}: chia mỗi phần của băng trên thành ${m / t.b} phần, mỗi phần của băng dưới thành ${m / t.d} phần. ${tex(t.a, t.b)} = ${tex(x.n, x.d)} và ${tex(t.c, t.d)} = ${tex(y.n, y.d)}.`,
    };
  }
  const bad = [t.b, t.d].filter((d) => m % d !== 0);
  const why = bad.map((d) => `${m} không chia hết cho ${d}`).join(', ');
  return {
    ok: false,
    bars: [bar(t.a, t.b), bar(t.c, t.d)],
    text: `Chưa được: ${why}, nên không chia đều ${bad.length === 2 ? 'cả hai băng' : 'được một băng'} thành ${m} phần. Mẫu số chung phải chia hết cho cả ${t.b} và ${t.d}.`,
  };
}

/** The result over `m`, before reducing. @param {Task} t @param {number} m */
export function rawResult(t, m) {
  const [x, y] = over(t, m);
  return fraction(t.op === '+' ? x.n + y.n : x.n - y.n, m);
}

/** The value of the task. @param {Task} t */
export const resultOf = (t) => simplify(rawResult(t, t.b * t.d));

/**
 * The results offered over `m`: the right one and the slips of adding (or
 * subtracting) numerators and denominators, and of forgetting to change a
 * numerator. The order turns with `seed` so the right one moves.
 * @param {Task} t
 * @param {number} m
 * @param {number} seed
 * @returns {{ n: number, d: number }[]}
 */
export function optionsOf(t, m, seed) {
  const right = rawResult(t, m);
  const [x] = over(t, m);
  const plus = t.op === '+';
  const slips = [
    plus ? { n: t.a + t.c, d: t.b + t.d } : { n: t.a - t.c, d: Math.abs(t.b - t.d) },
    plus ? { n: x.n + t.c, d: m } : { n: x.n - t.c, d: m },
  ];
  /** @type {{ n: number, d: number }[]} */
  const all = [right];
  for (const s of slips) {
    if (s.n > 0 && s.d > 0 && !all.some((o) => equals(fraction(o.n, o.d), fraction(s.n, s.d)))) {
      all.push(s);
    }
  }
  for (let k = 1; all.length < 3; k++) {
    const near = { n: right.n + k, d: m };
    if (!all.some((o) => equals(fraction(o.n, o.d), fraction(near.n, near.d)))) all.push(near);
  }
  const shift = seed % all.length;
  return [...all.slice(shift), ...all.slice(0, shift)];
}

/** Whether a picked result is right. @param {Task} t @param {{ n: number, d: number }} pick */
export const isRight = (t, pick) => equals(fraction(pick.n, pick.d), resultOf(t));

/**
 * The strip of the result and the sentence that shows it.
 * @param {Task} t
 * @param {number} m
 * @returns {{ bars: Bar[], text: string }}
 */
export function resultStep(t, m) {
  const [x, y] = over(t, m);
  const raw = rawResult(t, m);
  const low = simplify(raw);
  const reduce = low.d !== raw.d ? ` = ${tex(low.n, low.d)}` : '';
  return {
    bars: [bar(raw.n, raw.d, RESULT)],
    text: `${t.op === '+' ? 'Gộp' : 'Bớt'} các phần: ${exprText(t)} = ${tex(x.n, m)} ${t.op} ${tex(y.n, m)} = ${tex(raw.n, raw.d)}${reduce}.`,
  };
}
