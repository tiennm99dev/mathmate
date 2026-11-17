/**
 * Plane transformations on points in math coordinates (y up), written the
 * book's way: translation, reflection in the axes Ox, Oy and the lines
 * y = x, y = −x, rotation about a centre and the half turn (central
 * symmetry), plus how to write points and figures in text and TeX.
 */
import { MINUS, formatNumber, numTex, tidy } from '#lib/core/number-format.js';

/** @typedef {{ x: number, y: number }} Pt */
/** @typedef {'Ox' | 'Oy' | 'y=x' | 'y=-x'} Axis */

/**
 * The image of `p` under the translation by `u`.
 * @param {Pt} p @param {Pt} u @returns {Pt}
 */
export function translate(p, u) {
  return { x: tidy(p.x + u.x), y: tidy(p.y + u.y) };
}

/**
 * The image of `p` under the reflection in one of the four lines through O.
 * @param {Pt} p @param {Axis} axis @returns {Pt}
 */
export function reflect(p, axis) {
  /** @type {Pt} */
  let q;
  if (axis === 'Ox') q = { x: p.x, y: -p.y };
  else if (axis === 'Oy') q = { x: -p.x, y: p.y };
  else if (axis === 'y=x') q = { x: p.y, y: p.x };
  else q = { x: -p.y, y: -p.x };
  return { x: tidy(q.x), y: tidy(q.y) };
}

/**
 * The image of `p` under the rotation about `c` by `deg` degrees, positive
 * counterclockwise (the book's positive direction). Quarter turns are exact.
 * @param {Pt} p @param {Pt} c @param {number} deg @returns {Pt}
 */
export function rotate(p, c, deg) {
  const t = (deg * Math.PI) / 180;
  const quarter = ((Math.round(deg / 90) % 4) + 4) % 4;
  const exact = Math.abs(deg / 90 - Math.round(deg / 90)) < 1e-12;
  const cos = exact ? [1, 0, -1, 0][quarter] : Math.cos(t);
  const sin = exact ? [0, 1, 0, -1][quarter] : Math.sin(t);
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return { x: tidy(c.x + dx * cos - dy * sin), y: tidy(c.y + dx * sin + dy * cos) };
}

/**
 * The image of `p` under the central symmetry about `c`: c is the midpoint
 * of p and its image.
 * @param {Pt} p @param {Pt} c @returns {Pt}
 */
export function halfTurn(p, c) {
  return { x: tidy(2 * c.x - p.x), y: tidy(2 * c.y - p.y) };
}

/** @param {Pt} a @param {Pt} b */
export function samePoint(a, b) {
  return Math.abs(a.x - b.x) < 1e-9 && Math.abs(a.y - b.y) < 1e-9;
}

/**
 * Whether two figures, given by their vertices, coincide as point sets.
 * @param {Pt[]} a @param {Pt[]} b
 */
export function sameFigure(a, b) {
  return (
    a.length === b.length &&
    a.every((p) => b.some((q) => samePoint(p, q))) &&
    b.every((q) => a.some((p) => samePoint(p, q)))
  );
}

/**
 * A number as plain text with the book's minus and decimal comma.
 * @param {number} v
 */
export function numText(v) {
  return formatNumber(tidy(v, 6), 2);
}

/**
 * A point's coordinates as plain text: '(2; −1)', '(1,41; 0,5)'.
 * @param {Pt} p
 */
export function ptText(p) {
  return `(${numText(p.x)}; ${numText(p.y)})`;
}

/**
 * A point's coordinates as TeX: '(2;\ -1)'.
 * @param {Pt} p
 */
export function ptTex(p) {
  return `(${numTex(tidy(p.x, 6), 2)};\\ ${numTex(tidy(p.y, 6), 2)})`;
}

/**
 * Whether both coordinates are whole numbers, so a value needs no "≈".
 * @param {Pt} p
 */
export function isLattice(p) {
  return Number.isInteger(tidy(p.x, 6)) && Number.isInteger(tidy(p.y, 6));
}

/**
 * A signed term for TeX, the way a coordinate expression is written:
 * signedTex(3) is ' + 3', signedTex(-2) is ' - 2', signedTex(0) is ''.
 * @param {number} v
 */
export function signedTex(v) {
  if (v === 0) return '';
  return v > 0 ? ` + ${numTex(v)}` : ` - ${numTex(-v)}`;
}

/**
 * Like `signedTex` in plain text with the book's minus sign.
 * @param {number} v
 */
export function signedText(v) {
  if (v === 0) return '';
  return v > 0 ? ` + ${numText(v)}` : ` ${MINUS} ${numText(-v)}`;
}

/** The names the book gives the four lines through O. */
export const AXIS_TEX = /** @type {Record<Axis, string>} */ ({
  Ox: 'Ox',
  Oy: 'Oy',
  'y=x': 'y = x',
  'y=-x': 'y = -x',
});

/** The same names as plain text, for labels and screen readers. */
export const AXIS_TEXT = /** @type {Record<Axis, string>} */ ({
  Ox: 'Ox',
  Oy: 'Oy',
  'y=x': 'y = x',
  'y=-x': `y = ${MINUS}x`,
});

/**
 * The coordinate expression of the reflection in an axis, as TeX.
 * @param {Axis} axis
 */
export function reflectRuleTex(axis) {
  if (axis === 'Ox') return "x' = x,\\quad y' = -y";
  if (axis === 'Oy') return "x' = -x,\\quad y' = y";
  if (axis === 'y=x') return "x' = y,\\quad y' = x";
  return "x' = -y,\\quad y' = -x";
}

/**
 * The two ends, inside the box, of the line a x + b y + c = 0, or null when
 * the line misses the box.
 * @param {{ a: number, b: number, c: number }} line
 * @param {{ xMin: number, xMax: number, yMin: number, yMax: number }} box
 * @returns {[Pt, Pt] | null}
 */
export function clipLine({ a, b, c }, { xMin, xMax, yMin, yMax }) {
  /** @type {Pt[]} */
  const hits = [];
  const inside = (/** @type {Pt} */ p) =>
    p.x >= xMin - 1e-9 && p.x <= xMax + 1e-9 && p.y >= yMin - 1e-9 && p.y <= yMax + 1e-9;
  const push = (/** @type {Pt} */ p) => {
    if (inside(p) && !hits.some((q) => samePoint(p, q))) hits.push(p);
  };
  if (b !== 0) {
    push({ x: xMin, y: -(a * xMin + c) / b });
    push({ x: xMax, y: -(a * xMax + c) / b });
  }
  if (a !== 0) {
    push({ x: -(b * yMin + c) / a, y: yMin });
    push({ x: -(b * yMax + c) / a, y: yMax });
  }
  return hits.length >= 2 ? [hits[0], hits[1]] : null;
}

/**
 * The equation a x + b y + c = 0 as TeX, with unit coefficients written the
 * book's way: lineTex({ a: 1, b: -2, c: 3 }) is 'x - 2y + 3 = 0'.
 * @param {{ a: number, b: number, c: number }} line
 */
export function lineTex({ a, b, c }) {
  /** @param {number} k @param {string} v @param {boolean} first */
  const term = (k, v, first) => {
    if (k === 0) return '';
    const mag = Math.abs(k) === 1 && v ? '' : numTex(Math.abs(k));
    const sign = k < 0 ? (first ? '-' : ' - ') : first ? '' : ' + ';
    return `${sign}${mag}${v}`;
  };
  const head = term(a, 'x', true) + term(b, 'y', a === 0);
  return `${head}${term(c, '', a === 0 && b === 0)} = 0`;
}

/**
 * The image of `p` under the homothety (phép vị tự) with centre `c` and ratio
 * `k` ≠ 0: the vector from c to the image is k times the vector from c to p.
 * @param {Pt} p @param {Pt} c @param {number} k @returns {Pt}
 */
export function homothety(p, c, k) {
  return { x: tidy(c.x + k * (p.x - c.x)), y: tidy(c.y + k * (p.y - c.y)) };
}

/**
 * A ratio as a whole number or a fraction with denominator up to 12, sign on
 * the numerator: [1, 2] for 0.5, [-3, 1] for −3.
 * @param {number} k @returns {[number, number]}
 */
function ratioParts(k) {
  for (let d = 1; d <= 12; d++) {
    const n = Math.round(k * d);
    if (Math.abs(k * d - n) < 1e-9) return [n, d];
  }
  return [k, 1];
}

/**
 * A ratio as TeX, a fraction when it is not whole: '2', '-\frac{1}{2}'.
 * @param {number} k
 */
export function ratioTex(k) {
  const [n, d] = ratioParts(k);
  if (d === 1) return numTex(tidy(n, 6));
  return `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`;
}

/**
 * A ratio as plain text with the book's minus: '2', '−1/2'.
 * @param {number} k
 */
export function ratioText(k) {
  const [n, d] = ratioParts(k);
  if (d === 1) return numText(n);
  return `${n < 0 ? MINUS : ''}${Math.abs(n)}/${d}`;
}
