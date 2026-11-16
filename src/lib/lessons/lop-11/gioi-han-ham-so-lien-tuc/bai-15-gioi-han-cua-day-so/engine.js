/**
 * The sequences of the ε-band explorer. A sequence with a finite limit L
 * gives the distance |u_n − L| exactly (`gap`), so the first index N from
 * which every term lies inside the band (L − ε; L + ε) is found without
 * rounding noise; the distances shrink as n grows, so the first n with
 * gap(n) < ε is that N. A sequence tending to +∞ instead gets a level M,
 * and N is the first index from which u_n > M.
 */

import { tidy } from '#lib/core/number-format.js';

/**
 * @typedef {object} Sequence
 * @property {string} id
 * @property {string} label plain text for the switch
 * @property {string} tex the general term, as TeX
 * @property {number} limit L, or Infinity
 * @property {string} limitTex
 * @property {(n: number) => number} term
 * @property {(n: number) => number} [gap] |u_n − L| for a finite limit
 * @property {{ yMin: number, yMax: number }} view
 */

/** @type {Sequence[]} */
export const SEQUENCES = [
  {
    id: 'inv',
    label: 'uₙ = 1/n',
    tex: 'u_n = \\dfrac{1}{n}',
    limit: 0,
    limitTex: '0',
    term: (n) => 1 / n,
    gap: (n) => 1 / n,
    view: { yMin: -0.2, yMax: 1.1 },
  },
  {
    id: 'alt',
    label: 'uₙ = (−1)ⁿ/n',
    tex: 'u_n = \\dfrac{(-1)^n}{n}',
    limit: 0,
    limitTex: '0',
    term: (n) => (n % 2 === 0 ? 1 : -1) / n,
    gap: (n) => 1 / n,
    view: { yMin: -1.1, yMax: 0.7 },
  },
  {
    id: 'frac',
    label: 'uₙ = (2n + 1)/(n + 1)',
    tex: 'u_n = \\dfrac{2n + 1}{n + 1} = 2 - \\dfrac{1}{n + 1}',
    limit: 2,
    limitTex: '2',
    term: (n) => (2 * n + 1) / (n + 1),
    gap: (n) => 1 / (n + 1),
    view: { yMin: 1.3, yMax: 2.3 },
  },
  {
    id: 'sum',
    label: 'Sₙ = 1 + 1/2 + … + 1/2ⁿ⁻¹',
    tex: 'S_n = 1 + \\dfrac{1}{2} + \\dfrac{1}{4} + \\cdots + \\dfrac{1}{2^{n-1}} = 2 - \\dfrac{1}{2^{n-1}}',
    limit: 2,
    limitTex: '2',
    term: (n) => 2 - 0.5 ** (n - 1),
    gap: (n) => 0.5 ** (n - 1),
    view: { yMin: 0.8, yMax: 2.3 },
  },
  {
    id: 'sqrt',
    label: 'uₙ = √n',
    tex: 'u_n = \\sqrt{n}',
    limit: Infinity,
    limitTex: '+\\infty',
    term: (n) => Math.sqrt(n),
    view: { yMin: 0, yMax: 6 },
  },
];

/** The band widths ε offered by the slider, widest first. */
export const EPSILONS = [0.5, 0.3, 0.2, 0.1, 0.05];

/** The levels M offered for a sequence tending to +∞. */
export const LEVELS = [1, 2, 3, 4, 5];

/** How many terms the explorer draws. */
export const SHOWN = 30;

/**
 * Whether u_n is "inside": within ε of L for a finite limit, above M for +∞.
 * @param {Sequence} seq @param {number} n @param {number} tol ε or M
 */
export function isInside(seq, n, tol) {
  if (seq.gap) return tidy(seq.gap(n), 12) < tol;
  return tidy(seq.term(n), 12) > tol;
}

/**
 * The first index N from which every term is inside (the distance to L
 * only shrinks, and √n only grows, so the first inside term starts the run).
 * @param {Sequence} seq @param {number} tol
 */
export function firstInside(seq, tol) {
  let n = 1;
  while (!isInside(seq, n, tol)) n++;
  return n;
}
