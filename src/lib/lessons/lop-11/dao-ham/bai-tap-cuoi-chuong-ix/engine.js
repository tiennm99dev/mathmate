/**
 * The tangent check of the chapter review: the learner works out the
 * tangent to a graph at a given point, types it as y = kx + b, and sees the
 * line drawn against the curve. `judge` says whether the line is the
 * tangent, passes through the point of contact with the wrong slope, has
 * the right slope but misses the point, or neither.
 */

/**
 * @typedef {object} TangentProblem
 * @property {string} id
 * @property {string} label plain text for the switch
 * @property {string} tex the function, as TeX
 * @property {(x: number) => number} f
 * @property {number} x0 abscissa of the point of contact
 * @property {number} y0 f(x0)
 * @property {number} k f'(x0), the slope of the tangent
 * @property {{ xMin: number, xMax: number, yMin: number, yMax: number }} view
 */

/** @type {TangentProblem[]} */
export const PROBLEMS = [
  {
    id: 'cubic',
    label: 'Câu a',
    tex: 'y = x^3 - 3x^2 + 2',
    f: (x) => x ** 3 - 3 * x * x + 2,
    x0: 1,
    y0: 0,
    k: -3,
    view: { xMin: -1.5, xMax: 3.5, yMin: -4, yMax: 4 },
  },
  {
    id: 'parabola',
    label: 'Câu b',
    tex: 'y = x^2 - 4x + 3',
    f: (x) => x * x - 4 * x + 3,
    x0: 3,
    y0: 0,
    k: 2,
    view: { xMin: -0.5, xMax: 5, yMin: -2, yMax: 6 },
  },
  {
    id: 'fraction',
    label: 'Câu c',
    tex: 'y = \\dfrac{2x + 1}{x - 1}',
    f: (x) => (x === 1 ? NaN : (2 * x + 1) / (x - 1)),
    x0: 2,
    y0: 5,
    k: -3,
    view: { xMin: 1.2, xMax: 5, yMin: 0, yMax: 12 },
  },
  {
    id: 'root',
    label: 'Câu d',
    tex: 'y = \\sqrt{x}',
    f: (x) => (x < 0 ? NaN : Math.sqrt(x)),
    x0: 4,
    y0: 2,
    k: 0.25,
    view: { xMin: -0.5, xMax: 9, yMin: -0.5, yMax: 4 },
  },
  {
    id: 'exp',
    label: 'Câu e',
    tex: 'y = e^x',
    f: Math.exp,
    x0: 0,
    y0: 1,
    k: 1,
    view: { xMin: -2.5, xMax: 2.5, yMin: -1, yMax: 6 },
  },
];

/**
 * The intercept b of the tangent y = kx + b.
 * @param {TangentProblem} p
 */
export const interceptOf = (p) => p.y0 - p.k * p.x0;

const TOL = 1e-9;

/**
 * How a typed line y = kx + b relates to the tangent.
 * @param {TangentProblem} p @param {number} k @param {number} b
 * @returns {'tangent' | 'through' | 'parallel' | 'other'}
 */
export function judge(p, k, b) {
  const slopeOk = Math.abs(k - p.k) < TOL;
  const passes = Math.abs(k * p.x0 + b - p.y0) < TOL;
  if (slopeOk && passes) return 'tangent';
  if (passes) return 'through';
  if (slopeOk) return 'parallel';
  return 'other';
}
