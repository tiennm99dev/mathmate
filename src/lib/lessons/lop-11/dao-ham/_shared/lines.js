/**
 * Secants and tangents for the derivative lessons: the line through a point
 * with a given slope, and a line written in the book's form.
 */

import { numTex, tidy } from '#lib/core/number-format.js';

/**
 * The line through (x0; y0) with slope k, as a function of x.
 * @param {number} x0 @param {number} y0 @param {number} k
 * @returns {(x: number) => number}
 */
export const lineThrough = (x0, y0, k) => (x) => y0 + k * (x - x0);

/**
 * The line y = kx + b as TeX in the book's form: 'y = 2x - 1', 'y = -x',
 * 'y = 3', with comma decimals rounded to `places`.
 * @param {number} k @param {number} b @param {number} [places]
 */
export function lineTex(k, b, places = 4) {
  const kk = tidy(k, places);
  const bb = tidy(b, places);
  let out = '';
  if (kk !== 0) {
    const size = Math.abs(kk);
    out = `${kk < 0 ? '-' : ''}${size === 1 ? '' : numTex(size, places)}x`;
  }
  if (bb !== 0 || out === '') {
    const size = numTex(Math.abs(bb), places);
    if (out === '') out = bb < 0 ? `-${size}` : size;
    else out += ` ${bb < 0 ? '-' : '+'} ${size}`;
  }
  return `y = ${out}`;
}
