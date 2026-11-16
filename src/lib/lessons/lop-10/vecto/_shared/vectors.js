/**
 * Vectors of the chapter in math coordinates (y up), written the book's way:
 * how two vectors relate (cùng phương, cùng hướng, bằng nhau), their names in
 * TeX ($\vec a$, $\overrightarrow{AB}$), coordinates `(2; −1)` and lengths
 * that are exact when they are whole ("5") and rounded otherwise ("≈ 3,61").
 */
import {
  MINUS,
  formatFixed,
  formatNumber,
  numTex,
  texNumber,
  tidy,
} from '#lib/core/number-format.js';
import { cross } from '#lib/geom-engine/plane.js';
import { add, dot, len, scale, sub } from '#lib/geom-engine/vec.js';

export { add, dot, len, scale, sub };

/** @typedef {{ x: number, y: number }} V */

const ORIGIN = { x: 0, y: 0 };
const EPS = 1e-9;

/** @param {V} u */
export const isZero = (u) => Math.abs(u.x) < EPS && Math.abs(u.y) < EPS;

/** Cross product u × v (zero exactly when u and v are parallel). @param {V} u @param {V} v */
export const crossV = (u, v) => cross(ORIGIN, u, v);

/**
 * @typedef {{
 *   parallel: boolean,
 *   same: boolean,
 *   opposite: boolean,
 *   equalLength: boolean,
 *   equal: boolean,
 * }} Relation
 */

/**
 * How two vectors relate. The zero vector is cùng phương and cùng hướng with
 * every vector, as the book agrees; two vectors are equal when they point the
 * same way and have the same length.
 * @param {V} u @param {V} v
 * @returns {Relation}
 */
export function relation(u, v) {
  const zero = isZero(u) || isZero(v);
  const parallel = zero || Math.abs(crossV(u, v)) < EPS;
  const same = parallel && (zero || dot(u, v) > 0);
  const opposite = parallel && !zero && dot(u, v) < 0;
  const equalLength = Math.abs(len(u) - len(v)) < EPS;
  return { parallel, same, opposite, equalLength, equal: same && equalLength };
}

/**
 * Whether the supports (giá) of the parallel vectors PQ and RS are one line:
 * R lies on line PQ. Meaningful only when both vectors are non-zero.
 * @param {V} P @param {V} Q @param {V} R
 */
export const oneLine = (P, Q, R) => Math.abs(cross(P, Q, R)) < EPS;

/**
 * A vector's name in TeX: one letter gets a small arrow ($\vec a$), two
 * points a long one ($\overrightarrow{AB}$); '0' is the zero vector.
 * @param {string} name
 */
export function vecTex(name) {
  if (name.length === 1) return `\\vec{${name}}`;
  return `\\overrightarrow{${name}}`;
}

/**
 * Coordinates as plain text, the book's way: (2; −1,5).
 * @param {number} x @param {number} y
 */
export const coordText = (x, y) =>
  `(${formatNumber(tidy(x, 6), 2)}; ${formatNumber(tidy(y, 6), 2)})`;

/**
 * Coordinates as TeX: (2; -1{,}5).
 * @param {number} x @param {number} y
 */
export const coordTex = (x, y) => `(${numTex(tidy(x, 6), 2)};\\ ${numTex(tidy(y, 6), 2)})`;

/**
 * A length as text: exact when it is a whole number or a short decimal, else
 * "≈" and two decimals: 5 → '5', √13 → '≈ 3,61'.
 * @param {number} value
 */
export function lengthText(value) {
  const v = tidy(value, 9);
  if (Math.abs(v * 100 - Math.round(v * 100)) < 1e-9) return formatNumber(v, 2);
  return `≈ ${formatFixed(v, 2)}`;
}

/**
 * The same length as TeX after "=" or "\approx": `= 5` or `\approx 3{,}61`.
 * @param {number} value
 */
export function lengthTex(value) {
  const text = lengthText(value);
  if (text.startsWith('≈')) return `\\approx ${texNumber(text.slice(2))}`;
  return `= ${texNumber(text).replace(MINUS, '-')}`;
}

/**
 * The squared length of an integer vector as a square root in TeX, simplified
 * only when it is a perfect square: (3; 4) → '5', (2; 3) → '\sqrt{13}'.
 * @param {V} u
 */
export function rootTex(u) {
  const sq = tidy(u.x * u.x + u.y * u.y, 6);
  const r = Math.round(Math.sqrt(sq));
  if (r * r === sq) return String(r);
  return `\\sqrt{${numTex(sq, 4)}}`;
}

/**
 * The angle between two non-zero vectors, in degrees from 0 to 180, or null
 * when one of them is the zero vector.
 * @param {V} u @param {V} v
 */
export function angleDeg(u, v) {
  if (isZero(u) || isZero(v)) return null;
  // atan2 keeps full precision near 0° and 180°, where acos loses digits.
  return tidy((Math.atan2(Math.abs(crossV(u, v)), dot(u, v)) * 180) / Math.PI, 9);
}

/**
 * A short Vietnamese sentence on how two vectors relate, with TeX names.
 * @param {string} p first vector's name @param {string} q second vector's name
 * @param {V} u @param {V} v
 */
export function relationText(p, q, u, v) {
  const a = `$${vecTex(p)}$`;
  const b = `$${vecTex(q)}$`;
  const r = relation(u, v);
  if (isZero(u) && isZero(v)) return `${a} và ${b} đều là vectơ-không, nên bằng nhau.`;
  if (isZero(u) || isZero(v)) {
    const z = isZero(u) ? a : b;
    return `${z} là vectơ-không: cùng phương, cùng hướng với mọi vectơ.`;
  }
  if (!r.parallel) return `${a} và ${b} không cùng phương: giá của chúng cắt nhau.`;
  if (r.equal) return `${a} và ${b} cùng hướng, cùng độ dài: ${a} $=$ ${b}.`;
  if (r.same) return `${a} và ${b} cùng hướng nhưng khác độ dài, nên không bằng nhau.`;
  return `${a} và ${b} cùng phương nhưng ngược hướng${r.equalLength ? ', dù cùng độ dài' : ''}.`;
}
