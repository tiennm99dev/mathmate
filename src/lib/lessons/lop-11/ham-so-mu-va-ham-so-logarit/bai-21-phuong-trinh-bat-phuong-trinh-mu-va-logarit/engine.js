/**
 * Basic exponential and logarithmic equations and inequalities,
 * aˣ ⋈ b and log_a x ⋈ b, solved the book's way: the horizontal line y = b
 * meets the graph at most once, at x₀ = log_a b or x₀ = aᵇ, and the solution
 * set is the part of the x-axis where the graph lies above (or below) the
 * line, which depends on whether a > 1 or 0 < a < 1.
 */

import { numTex } from '#lib/core/number-format.js';
import { exactValueTex } from '../_shared/values.js';
import { logBase, powerBase } from '../_shared/plot.js';

/** @typedef {import('../_shared/plot.js').Base} Base */
/** @typedef {'=' | '>' | '>=' | '<' | '<='} Relation */
/** @typedef {'exp' | 'log'} Kind */

/** The relations offered, with their TeX. */
export const RELATIONS = /** @type {const} */ ([
  { id: '=', tex: '=' },
  { id: '>', tex: '>' },
  { id: '>=', tex: '\\ge' },
  { id: '<', tex: '<' },
  { id: '<=', tex: '\\le' },
]);

/** The window and the range of b for each kind. */
export const SETUP = {
  exp: { win: { xMin: -4, xMax: 4, yMin: -2.5, yMax: 8.5 }, bMin: -2, bMax: 8 },
  log: { win: { xMin: -1, xMax: 9, yMin: -4, yMax: 4 }, bMin: -3, bMax: 3 },
};

/**
 * @typedef {object} Interval
 * @property {number} lo @property {number} hi (±Infinity for an open end)
 * @property {boolean} loIn @property {boolean} hiIn whether each end belongs
 */

/**
 * @typedef {object} Solution
 * @property {number | null} x0 where y = b meets the graph, or null
 * @property {string} x0Tex x₀ exactly ('2', '\\log_{2} 3', '2^{1{,}5}'), or ''
 * @property {Interval[]} parts the solution set: none, one point or one interval
 * @property {string} setTex the solution set S as TeX
 */

/**
 * The function value.
 * @param {Kind} kind @param {number} a @param {number} x
 */
export const valueAt = (kind, a, x) =>
  kind === 'exp' ? a ** x : x > 0 ? Math.log(x) / Math.log(a) : NaN;

/**
 * The left-hand side as TeX: '2^x', '\\log_{\\frac{1}{2}} x'.
 * @param {Kind} kind @param {Base} base
 */
export const sideTex = (kind, base) =>
  kind === 'exp' ? `${powerBase(base)}^x` : `\\log_{${logBase(base)}} x`;

/**
 * x₀ exactly: a rational value when it is one, else the logarithm or power.
 * @param {Kind} kind @param {Base} base @param {number} b
 */
function rootTex(kind, base, b) {
  const v = kind === 'exp' ? Math.log(b) / Math.log(base.value) : base.value ** b;
  const exact = exactValueTex(v);
  if (exact !== null) return exact;
  return kind === 'exp'
    ? `\\log_{${logBase(base)}} ${numTex(b)}`
    : `${powerBase(base)}^{${numTex(b)}}`;
}

/**
 * Solves aˣ ⋈ b (kind 'exp') or log_a x ⋈ b (kind 'log').
 * @param {Kind} kind @param {Base} base @param {number} b @param {Relation} rel
 * @returns {Solution}
 */
export function solve(kind, base, b, rel) {
  const a = base.value;
  const lower = kind === 'exp' ? -Infinity : 0;
  if (kind === 'exp' && b <= 0) {
    // aˣ > 0 ≥ b for every x.
    const all = rel === '>' || rel === '>=';
    return {
      x0: null,
      x0Tex: '',
      parts: all ? [{ lo: -Infinity, hi: Infinity, loIn: false, hiIn: false }] : [],
      setTex: all ? 'S = \\mathbb{R}' : 'S = \\varnothing',
    };
  }
  const x0 = kind === 'exp' ? Math.log(b) / Math.log(a) : a ** b;
  const x0Tex = rootTex(kind, base, b);
  if (rel === '=') {
    return {
      x0,
      x0Tex,
      parts: [{ lo: x0, hi: x0, loIn: true, hiIn: true }],
      setTex: `S = \\{${x0Tex}\\}`,
    };
  }
  const greater = rel === '>' || rel === '>=';
  const closed = rel === '>=' || rel === '<=';
  // The function increases when a > 1: f(x) > b exactly when x > x₀.
  const right = greater === a > 1;
  /** @type {Interval} */
  const part = right
    ? { lo: x0, hi: Infinity, loIn: closed, hiIn: false }
    : { lo: lower, hi: x0, loIn: false, hiIn: closed };
  const setTex = right
    ? `S = ${closed ? '[' : '('}${x0Tex}; +\\infty)`
    : `S = (${kind === 'exp' ? '-\\infty' : '0'}; ${x0Tex}${closed ? ']' : ')'}`;
  return { x0, x0Tex, parts: [part], setTex };
}
