/**
 * Trigonometry in degrees for the chapter: the values of an angle from 0° to
 * 180°, with binary noise rounded away (cos 90° is exactly 0), and the number
 * writing the book uses for an approximate result ("≈ 0,7660").
 */
import {
  MINUS,
  formatFixed,
  formatNumber,
  numTex,
  texNumber,
  tidy,
} from '#lib/core/number-format.js';

/** @param {number} deg */
export const rad = (deg) => (deg * Math.PI) / 180;

/** @param {number} deg */
export const sinDeg = (deg) => tidy(Math.sin(rad(deg)), 12);

/** @param {number} deg */
export const cosDeg = (deg) => tidy(Math.cos(rad(deg)), 12);

/**
 * tan of an angle in degrees, or null at 90° where it is not defined.
 * @param {number} deg
 */
export function tanDeg(deg) {
  const c = cosDeg(deg);
  return c === 0 ? null : tidy(sinDeg(deg) / c, 12);
}

/**
 * cot of an angle in degrees, or null at 0° and 180° where it is not defined.
 * @param {number} deg
 */
export function cotDeg(deg) {
  const s = sinDeg(deg);
  return s === 0 ? null : tidy(cosDeg(deg) / s, 12);
}

/**
 * An angle in degrees from a value of its sine, cosine or tangent; `acos`
 * covers 0° to 180°, which is why the chapter finds an angle by its cosine.
 * @param {number} value
 */
export const acosDeg = (value) => (Math.acos(Math.max(-1, Math.min(1, value))) * 180) / Math.PI;

/** @param {number} value */
export const asinDeg = (value) => (Math.asin(Math.max(-1, Math.min(1, value))) * 180) / Math.PI;

/**
 * Whether `value` is exactly a decimal with at most `places` digits.
 * @param {number} value @param {number} places
 */
export const isExact = (value, places) => tidy(value, places) === tidy(value, 12);

/**
 * A computed value as plain text: '0,5' when it is exact to `places`
 * decimals, otherwise '≈ 0,7660' rounded to `places`.
 * @param {number} value @param {number} [places]
 */
export function approxText(value, places = 4) {
  return isExact(value, places) ? formatNumber(value, places) : `≈ ${formatFixed(value, places)}`;
}

/**
 * The same as TeX source: '0{,}5' or '\approx 0{,}7660'.
 * @param {number} value @param {number} [places]
 */
export function approxTex(value, places = 4) {
  return isExact(value, places)
    ? numTex(value, places)
    : `\\approx ${texNumber(formatFixed(value, places)).replace(MINUS, '-')}`;
}

/**
 * An angle in degrees and minutes, the way a calculator reads it back:
 * 14.508 → '14°30′'.
 * @param {number} deg
 */
export function degMinText(deg) {
  let d = Math.floor(deg);
  let m = Math.round((deg - d) * 60);
  if (m === 60) {
    d += 1;
    m = 0;
  }
  return m === 0 ? `${d}°` : `${d}°${m}′`;
}
