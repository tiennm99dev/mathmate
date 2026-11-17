/**
 * Largest and smallest values of a function on a segment [a; b] or an open
 * interval (a; b), found the book's way: compare f at the critical points
 * inside with f at the two ends. On a segment both always exist (f is
 * continuous); on an open interval a value at an end only counts as a bound
 * that is never reached, so the largest or smallest value may not exist.
 */

/**
 * @typedef {object} RangeCase
 * @property {string} id
 * @property {string} label plain text for the switch
 * @property {string} tex the formula, as TeX
 * @property {(x: number) => number} f
 * @property {number[]} crit the zeros of f′ (and points where f′ does not exist)
 * @property {{ lo: number, hi: number }} range where the ends a and b may go
 * @property {{ a: number, b: number }} start the first [a; b]
 * @property {import('../_shared/plot.js').Window} win
 */

/** @type {RangeCase[]} */
export const CASES = [
  {
    id: 'cubic',
    label: 'x³ − 3x + 1',
    tex: 'f(x) = x^3 - 3x + 1',
    f: (x) => x ** 3 - 3 * x + 1,
    crit: [-1, 1],
    range: { lo: -2.2, hi: 2.2 },
    start: { a: -2, b: 1.5 },
    win: { xMin: -2.5, xMax: 2.5, yMin: -3.6, yMax: 5.6 },
  },
  {
    id: 'quartic',
    label: 'x⁴ − 2x² + 2',
    tex: 'f(x) = x^4 - 2x^2 + 2',
    f: (x) => x ** 4 - 2 * x * x + 2,
    crit: [-1, 0, 1],
    range: { lo: -1.8, hi: 1.8 },
    start: { a: -0.5, b: 1.5 },
    win: { xMin: -2, xMax: 2, yMin: -0.5, yMax: 6.5 },
  },
  {
    id: 'hyper',
    label: 'x + 4/x, x > 0',
    tex: 'f(x) = x + \\dfrac{4}{x}, \\; x > 0',
    f: (x) => x + 4 / x,
    crit: [2],
    range: { lo: 0.5, hi: 6 },
    start: { a: 1, b: 5 },
    win: { xMin: 0, xMax: 6.5, yMin: 0, yMax: 9.5 },
  },
];

/**
 * @typedef {{ x: number, y: number, at: 'end' | 'crit' }} Candidate
 * @typedef {{ value: number, xs: number[] } | { value: null, bound: number, xs: number[] }} Extreme
 *   `value: null` means it is not reached: f comes close to `bound` near the ends in `xs`.
 */

/**
 * The values to compare: f at a, at the critical points strictly inside and
 * at b, from left to right.
 * @param {RangeCase} c
 * @param {number} a @param {number} b
 * @returns {Candidate[]}
 */
export function candidates(c, a, b) {
  /** @type {Candidate[]} */
  const out = [{ x: a, y: c.f(a), at: 'end' }];
  for (const z of c.crit) if (z > a && z < b) out.push({ x: z, y: c.f(z), at: 'crit' });
  out.push({ x: b, y: c.f(b), at: 'end' });
  return out;
}

const EPS = 1e-9;

/**
 * The largest (`sign` 1) or smallest (`sign` −1) value of f on [a; b], or
 * on (a; b) when `open`.
 * @param {Candidate[]} list from `candidates`
 * @param {1 | -1} sign
 * @param {boolean} open
 * @returns {Extreme}
 */
export function extreme(list, sign, open) {
  const best = (/** @type {Candidate[]} */ l) => Math.max(...l.map((p) => sign * p.y));
  const all = best(list);
  const inner = list.filter((p) => p.at === 'crit');
  /** @param {Candidate[]} l @param {number} v */
  const where = (l, v) => l.filter((p) => Math.abs(sign * p.y - v) < EPS).map((p) => p.x);
  if (!open) return { value: sign * all, xs: where(list, all) };
  if (inner.length && best(inner) >= all - EPS) {
    return { value: sign * all, xs: where(inner, all) };
  }
  return { value: null, bound: sign * all, xs: where(list, all) };
}
