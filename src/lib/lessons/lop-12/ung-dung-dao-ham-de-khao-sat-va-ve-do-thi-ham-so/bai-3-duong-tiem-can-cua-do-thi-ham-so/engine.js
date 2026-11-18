/**
 * Rational functions and their asymptotes, for the zoom-out explorer. The
 * window is centred where the asymptotes meet and grows by a zoom factor;
 * a probe point on the curve sits near the edge of the window, so the
 * further out the window, the further the probe goes: towards ±∞ along x,
 * where the gap to the horizontal or slant asymptote shrinks to 0, or
 * towards a vertical asymptote, where |f(x)| grows without bound.
 */

/**
 * @typedef {object} AsymCase
 * @property {string} id
 * @property {string} label plain text for the switch
 * @property {string} tex the formula, as TeX
 * @property {(x: number) => number} f NaN where undefined
 * @property {number[]} poles the vertical asymptotes x = x₀
 * @property {{ x: number, y: number }[]} holes points left out of the graph that are not asymptotes
 * @property {{ a: number, b: number }} line the horizontal (a = 0) or slant asymptote y = ax + b
 * @property {string} lineTex its equation, as TeX
 * @property {string} gapTex f(x) − (ax + b) simplified, as TeX
 * @property {{ x: number, y: number }} center where the window is centred
 * @property {number} [tall] half-height of the window at zoom 1 (default 3; the half-width is 4)
 */

/** @type {AsymCase[]} */
export const CASES = [
  {
    id: 'hyper',
    label: '(2x − 1)/(x + 1)',
    tex: 'f(x) = \\dfrac{2x - 1}{x + 1}',
    f: (x) => (x === -1 ? NaN : (2 * x - 1) / (x + 1)),
    poles: [-1],
    holes: [],
    line: { a: 0, b: 2 },
    lineTex: 'y = 2',
    gapTex: 'f(x) - 2 = \\dfrac{-3}{x + 1}',
    center: { x: -1, y: 2 },
  },
  {
    id: 'slant',
    label: '(x² + x + 1)/(x − 1)',
    tex: 'f(x) = \\dfrac{x^2 + x + 1}{x - 1}',
    f: (x) => (x === 1 ? NaN : (x * x + x + 1) / (x - 1)),
    poles: [1],
    holes: [],
    line: { a: 1, b: 2 },
    lineTex: 'y = x + 2',
    gapTex: 'f(x) - (x + 2) = \\dfrac{3}{x - 1}',
    center: { x: 1, y: 3 },
    tall: 5,
  },
  {
    id: 'hole',
    label: '(x² − 3x + 2)/(x² − 1)',
    tex: 'f(x) = \\dfrac{x^2 - 3x + 2}{x^2 - 1}',
    f: (x) => (x === 1 || x === -1 ? NaN : (x * x - 3 * x + 2) / (x * x - 1)),
    poles: [-1],
    holes: [{ x: 1, y: -0.5 }],
    line: { a: 0, b: 1 },
    lineTex: 'y = 1',
    gapTex: 'f(x) - 1 = \\dfrac{-3}{x + 1}',
    center: { x: -1, y: 1 },
  },
  {
    id: 'two',
    label: '(x + 1)/(x² − 4)',
    tex: 'f(x) = \\dfrac{x + 1}{x^2 - 4}',
    f: (x) => (x === 2 || x === -2 ? NaN : (x + 1) / (x * x - 4)),
    poles: [-2, 2],
    holes: [],
    line: { a: 0, b: 0 },
    lineTex: 'y = 0',
    gapTex: 'f(x) - 0 = \\dfrac{x + 1}{x^2 - 4}',
    center: { x: 0, y: 0 },
  },
];

/** How far the window is zoomed out. */
export const ZOOMS = [1, 2, 5, 10, 20, 50, 100];

/**
 * Half-height of the window at zoom 1.
 * @param {AsymCase} c
 */
const tallOf = (c) => c.tall ?? 3;

/**
 * The window at zoom `k`: 8k wide and 6k (or 2·tall·k) tall around the
 * case's centre.
 * @param {AsymCase} c
 * @param {number} k
 * @returns {import('#lib/core/visuals/plot.js').Window}
 */
export function windowAt(c, k) {
  return {
    xMin: c.center.x - 4 * k,
    xMax: c.center.x + 4 * k,
    yMin: c.center.y - tallOf(c) * k,
    yMax: c.center.y + tallOf(c) * k,
  };
}

/**
 * Rounds a positive distance up to one significant digit: 0.0137 → 0.02.
 * @param {number} d
 */
export function ceilOneDigit(d) {
  const p = 10 ** Math.floor(Math.log10(d));
  return Math.ceil(d / p - 1e-9) * p;
}

/**
 * @typedef {'right' | 'left' | 'pole'} ProbeMode
 * @typedef {{ x: number, y: number, ya: number, gap: number }} Probe
 *   `ya` is the height of the horizontal or slant asymptote at x, `gap` is y − ya.
 */

/**
 * The probe point at zoom `k`: x = centre ± 3,2k towards ±∞, or, just to
 * the right of the last vertical asymptote x₀, at the round distance d where
 * the gap to the other asymptote is about 0,6 of the window's half-height.
 * @param {AsymCase} c
 * @param {ProbeMode} mode
 * @param {number} k
 * @returns {Probe}
 */
export function probe(c, mode, k) {
  const { a, b } = c.line;
  /** @param {number} x */
  const at = (x) => {
    const y = c.f(x);
    const ya = a * x + b;
    return { x, y, ya, gap: y - ya };
  };
  if (mode !== 'pole') return at(c.center.x + (mode === 'right' ? 3.2 : -3.2) * k);
  const x0 = c.poles[c.poles.length - 1];
  const target = 0.6 * tallOf(c) * k;
  /** @param {number} d */
  const off = (d) => Math.abs(at(x0 + d).gap);
  // The gap falls as d grows away from the pole: bisect for off(d) = target.
  let lo = 1e-9;
  let hi = 3 * k;
  for (let i = 0; i < 80; i++) {
    const mid = Math.sqrt(lo * hi);
    if (off(mid) > target) lo = mid;
    else hi = mid;
  }
  let d = ceilOneDigit(hi);
  // Step over a hole of the graph.
  while (!Number.isFinite(c.f(x0 + d))) d = ceilOneDigit(d * 1.2);
  return at(Number((x0 + d).toPrecision(12)));
}
