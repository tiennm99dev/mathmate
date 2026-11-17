/**
 * The secant-to-tangent explorer: a point M₀(x₀; f(x₀)) on a graph and a
 * second point M at x₀ + h. As h shrinks, the slope Δy/Δx of the secant
 * M₀M closes in on f'(x₀), the slope of the tangent. The free-fall case
 * reads the same quotient as an average velocity closing in on the
 * instantaneous velocity s'(t₀).
 */

/**
 * @typedef {object} SecantCase
 * @property {string} id
 * @property {string} label plain text for the switch
 * @property {string} tex the function, as TeX
 * @property {string} dtex its derivative, as TeX
 * @property {(x: number) => number} f
 * @property {(x: number) => number} df the exact derivative
 * @property {number[]} starts the values x₀ may take
 * @property {{ xMin: number, xMax: number, yMin: number, yMax: number }} view
 * @property {boolean} [motion] read x as time t (s) and y as distance s (m)
 */

/** @type {SecantCase[]} */
export const CASES = [
  {
    id: 'square',
    label: 'y = x²',
    tex: 'f(x) = x^2',
    dtex: "f'(x) = 2x",
    f: (x) => x * x,
    df: (x) => 2 * x,
    starts: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
    view: { xMin: -3.2, xMax: 3.2, yMin: -1.5, yMax: 9.5 },
  },
  {
    id: 'cubic',
    label: 'y = x³ − 3x',
    tex: 'f(x) = x^3 - 3x',
    dtex: "f'(x) = 3x^2 - 3",
    f: (x) => x ** 3 - 3 * x,
    df: (x) => 3 * x * x - 3,
    starts: [-1, -0.5, 0, 0.5, 1],
    view: { xMin: -2.5, xMax: 2.5, yMin: -4, yMax: 4 },
  },
  {
    id: 'inverse',
    label: 'y = 1/x',
    tex: 'f(x) = \\dfrac{1}{x}',
    dtex: "f'(x) = -\\dfrac{1}{x^2}",
    f: (x) => (x === 0 ? NaN : 1 / x),
    df: (x) => -1 / (x * x),
    starts: [1.5, 2, 2.5, 3],
    view: { xMin: 0, xMax: 4.2, yMin: -0.6, yMax: 3 },
  },
  {
    id: 'fall',
    label: 'Rơi tự do',
    tex: 's(t) = 4{,}9t^2',
    dtex: "v(t) = s'(t) = 9{,}8t",
    f: (t) => 4.9 * t * t,
    df: (t) => 9.8 * t,
    starts: [1, 1.5, 2, 2.5, 3],
    view: { xMin: -0.2, xMax: 4.3, yMin: -6, yMax: 90 },
    motion: true,
  },
];

/** The sizes of |h| on the slider, from far to very close. */
export const H_SIZES = [1, 0.5, 0.25, 0.1, 0.05, 0.01, 0.001];

/** The values of h in the table of quotients. */
export const TABLE_H = [-0.1, -0.01, -0.001, 0.001, 0.01, 0.1];

/**
 * The slope of the secant through (x₀; f(x₀)) and (x₀ + h; f(x₀ + h)),
 * the difference quotient Δy/Δx.
 * @param {(x: number) => number} f @param {number} x0 @param {number} h
 */
export function secantSlope(f, x0, h) {
  return (f(x0 + h) - f(x0)) / h;
}

/**
 * The index of the first x₀ to show: the first positive one where the
 * tangent is not horizontal, so the secant visibly turns.
 * @param {SecantCase} c
 */
export function firstStart(c) {
  const i = c.starts.findIndex((x) => x > 0 && c.df(x) !== 0);
  return i >= 0 ? i : 0;
}

/**
 * How far the secant slope is from the derivative.
 * @param {SecantCase} c @param {number} x0 @param {number} h
 */
export function gap(c, x0, h) {
  return Math.abs(secantSlope(c.f, x0, h) - c.df(x0));
}
