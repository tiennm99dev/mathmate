/**
 * The bases the exponential and logarithm widgets offer, each with its TeX
 * and plain-text name, and the base written inside a power or under a log.
 */

/**
 * @typedef {{ id: string, value: number, tex: string, text: string }} Base
 */

/**
 * The bases the widgets offer: `tex` for formulas, `text` for switches and
 * screen readers.
 * @type {Record<string, Base>}
 */
export const BASES = {
  2: { id: '2', value: 2, tex: '2', text: '2' },
  3: { id: '3', value: 3, tex: '3', text: '3' },
  10: { id: '10', value: 10, tex: '10', text: '10' },
  half: { id: 'half', value: 1 / 2, tex: '\\dfrac{1}{2}', text: '1/2' },
  third: { id: 'third', value: 1 / 3, tex: '\\dfrac{1}{3}', text: '1/3' },
};

/**
 * A base inside a power, bracketed when it is a fraction: '2', '\\left(\\dfrac{1}{2}\\right)'.
 * @param {Base} b
 */
export const powerBase = (b) => (b.tex.startsWith('\\dfrac') ? `\\left(${b.tex}\\right)` : b.tex);

/**
 * A base as a subscript of log: '2', '\\frac{1}{2}' (the small fraction).
 * @param {Base} b
 */
export const logBase = (b) => b.tex.replace('\\dfrac', '\\frac');
