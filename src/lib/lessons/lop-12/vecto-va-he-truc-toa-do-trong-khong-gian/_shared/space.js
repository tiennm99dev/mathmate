import { add3, cross3, dot3, mul3, sub3 } from '#lib/geom-engine/solid.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { formatNumber, numTex } from '#lib/core/number-format.js';

/**
 * Vectors and coordinates in space for the chapter "Vectơ và hệ trục toạ độ
 * trong không gian": lengths and angles of vectors, coordinates written the
 * book's way (`(1; −2; 3)`), exact cosines such as $\dfrac{\sqrt{3}}{3}$, and
 * the cube ABCD.A'B'C'D' of edge 1 the lessons compute in.
 *
 * Model space as in `#lib/geom-engine/solid.js`: z points up, so the model's
 * x, y, z are the axes Ox, Oy, Oz of the book.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */

/** @param {number} x @param {number} y @param {number} z @returns {P3} */
export const P = (x = 0, y = 0, z = 0) => ({ x, y, z });

/** @param {P3} a */
export const len3 = (a) => Math.hypot(a.x, a.y, a.z);

/** @param {P3} a */
export const isZero3 = (a) => a.x === 0 && a.y === 0 && a.z === 0;

/** @param {P3} a @param {P3} b */
export const same3 = (a, b) => a.x === b.x && a.y === b.y && a.z === b.z;

/**
 * The three coordinates, with −0 (from a product such as 0 · (−2)) written
 * as 0.
 * @param {P3} a @returns {[number, number, number]}
 */
export const coords = (a) => [a.x + 0, a.y + 0, a.z + 0];

/**
 * The angle between two non-zero vectors in degrees, from 0° to 180°, or
 * null when one of them is the zero vector.
 * @param {P3} u @param {P3} v
 */
export function angleDeg(u, v) {
  // One square root of the product keeps |u|·|v| exact when it is whole
  // (√5 · √5 would give 5.000000000000001 and a false 0.000001°).
  const l = Math.sqrt(dot3(u, u) * dot3(v, v));
  if (l === 0) return null;
  const cos = Math.max(-1, Math.min(1, dot3(u, v) / l));
  return (Math.acos(cos) * 180) / Math.PI;
}

/**
 * Coordinates as TeX, the book's way: `(1; -2; 0{,}5)`.
 * @param {P3} a
 */
export const coordTex = (a) =>
  `(${coords(a)
    .map((v) => numTex(v))
    .join('; ')})`;

/**
 * Coordinates as plain text for screen readers and labels: `(1; −2; 0,5)`.
 * @param {P3} a
 */
export const coordText = (a) =>
  `(${coords(a)
    .map((v) => formatNumber(v))
    .join('; ')})`;

/**
 * A whole number as a TeX operand, bracketed when negative: `3`, `(-2)`.
 * @param {number} n
 */
export const opTex = (n) => (n < 0 ? `(${n})` : `${n}`);

/**
 * √n = out·√rest with rest free of square factors, for a whole n > 0:
 * 12 → { out: 2, rest: 3 }.
 * @param {number} n
 */
export function splitSquare(n) {
  let out = 1;
  let rest = n;
  for (let k = 2; k * k <= rest; k++) {
    while (rest % (k * k) === 0) {
      out *= k;
      rest /= k * k;
    }
  }
  return { out, rest };
}

/**
 * Exact √n for a whole n ≥ 0, simplified: 12 → '2\\sqrt{3}', 9 → '3',
 * 1 → '1', 0 → '0'.
 * @param {number} n
 */
export function sqrtTex(n) {
  if (n === 0) return '0';
  const { out, rest } = splitSquare(n);
  if (rest === 1) return `${out}`;
  return out === 1 ? `\\sqrt{${rest}}` : `${out}\\sqrt{${rest}}`;
}

/**
 * The exact value of d / √m for whole d and m > 0, as TeX with a rational
 * denominator: (1, 3) → '\\dfrac{\\sqrt{3}}{3}', (−1, 4) → '-\\dfrac{1}{2}',
 * (2, 4) → '1', (0, 6) → '0'.
 * @param {number} d @param {number} m
 */
export function overSqrtTex(d, m) {
  if (d === 0) return '0';
  const { out, rest } = splitSquare(m);
  // d / (out·√rest) = d·√rest / (out·rest)
  let p = Math.abs(d);
  let q = out * rest;
  const g = gcd(p, q);
  p /= g;
  q /= g;
  const sign = d < 0 ? '-' : '';
  const root = `\\sqrt{${rest}}`;
  const top = rest === 1 ? `${p}` : p === 1 ? root : `${p}${root}`;
  return q === 1 ? `${sign}${top}` : `${sign}\\dfrac{${top}}{${q}}`;
}

/**
 * The degrees of an angle written the book's way with a decimal comma,
 * rounded to tenths: 54.7356 → '54,7°'; whole angles stay whole: '90°'.
 * @param {number} deg
 */
export const degreeText = (deg) => `${formatNumber(deg, 1)}°`;

/**
 * "= 45^\\circ" for a whole angle, "\\approx 54{,}7^\\circ" otherwise: the
 * relation and the angle in TeX, rounded to tenths.
 * @param {number} deg
 */
export function degreeTex(deg) {
  const exact = Math.abs(deg - Math.round(deg)) < 1e-6;
  return `${exact ? '=' : '\\approx'} ${numTex(exact ? Math.round(deg) : deg, 1)}^\\circ`;
}

/**
 * The cube ABCD.A'B'C'D' of edge 1: A at the origin, AB along Ox, AD along
 * Oy and AA' along Oz.
 * @type {Record<string, P3>}
 */
export const CUBE = {
  A: P(0, 0, 0),
  B: P(1, 0, 0),
  C: P(1, 1, 0),
  D: P(0, 1, 0),
  "A'": P(0, 0, 1),
  "B'": P(1, 0, 1),
  "C'": P(1, 1, 1),
  "D'": P(0, 1, 1),
};

/** The twelve edges of the cube by vertex names. */
export const CUBE_EDGES = /** @type {[string, string][]} */ ([
  ['A', 'B'],
  ['B', 'C'],
  ['C', 'D'],
  ['D', 'A'],
  ["A'", "B'"],
  ["B'", "C'"],
  ["C'", "D'"],
  ["D'", "A'"],
  ['A', "A'"],
  ['B', "B'"],
  ['C', "C'"],
  ['D', "D'"],
]);

/**
 * The vector between two named vertices of the cube.
 * @param {string} from @param {string} to
 */
export const cubeVector = (from, to) => sub3(CUBE[to], CUBE[from]);

/**
 * `\overrightarrow{AB}` for a vector named by its two ends.
 * @param {string} from @param {string} to
 */
export const arrowTex = (from, to) => `\\overrightarrow{${from}${to}}`;

/**
 * The dot product of two vectors of the cube of edge a, the book's way:
 * |u|·|v|·cos(u, v) with exact lengths a√n and the result as a multiple of
 * a². Returns the TeX of the lengths, the cosine and the product, the angle
 * in degrees and the whole number k with u·v = k·a².
 * @param {P3} u @param {P3} v
 */
export function cubeDot(u, v) {
  const nu = dot3(u, u);
  const nv = dot3(v, v);
  const k = dot3(u, v);
  /** @param {number} n */
  const lenTex = (n) => (n === 1 ? 'a' : `a${sqrtTex(n)}`);
  const kTex = k === 0 ? '0' : k === 1 ? 'a^2' : k === -1 ? '-a^2' : `${k}a^2`;
  return {
    k,
    lenU: lenTex(nu),
    lenV: lenTex(nv),
    cos: overSqrtTex(k, nu * nv),
    angle: /** @type {number} */ (angleDeg(u, v)),
    product: kTex,
  };
}

export { add3, cross3, dot3, mul3, sub3 };

/**
 * A fan marking the angle from direction u to direction v at the point o, as
 * a polygon of radius r: empty when the angle is next to 0°, and for 180°
 * (no plane to draw it in) a half disc on the side of `across`.
 * @param {P3} o @param {P3} u @param {P3} v @param {number} r
 * @param {P3} [across] a direction off the line, used only for 180°
 * @returns {P3[]}
 */
export function angleFan(o, u, v, r, across = P(0, 0, 1), steps = 18) {
  const a = mul3(u, 1 / len3(u));
  const b = mul3(v, 1 / len3(v));
  const cos = Math.max(-1, Math.min(1, dot3(a, b)));
  const theta = Math.acos(cos);
  if (theta < 1e-3) return [];
  let side = sub3(b, mul3(a, cos));
  if (len3(side) < 1e-9) side = sub3(across, mul3(a, dot3(across, a)));
  if (len3(side) < 1e-9) return [];
  const w = mul3(side, 1 / len3(side));
  const out = [o];
  for (let i = 0; i <= steps; i++) {
    const k = (theta * i) / steps;
    out.push(add3(o, mul3(add3(mul3(a, Math.cos(k)), mul3(w, Math.sin(k))), r)));
  }
  return out;
}

/**
 * A vector as a combination of the unit vectors, in TeX:
 * (2, −1, 3) → '2\vec{i} - \vec{j} + 3\vec{k}', (0, 0, 0) → '\vec{0}'.
 * @param {P3} a
 */
export function ijkTex(a) {
  const parts = /** @type {[number, string][]} */ ([
    [a.x, '\\vec{i}'],
    [a.y, '\\vec{j}'],
    [a.z, '\\vec{k}'],
  ]).filter(([c]) => c !== 0);
  if (!parts.length) return '\\vec{0}';
  return parts
    .map(([c, e], i) => {
      const mag = Math.abs(c) === 1 ? '' : numTex(Math.abs(c));
      const sign = c < 0 ? (i ? ' - ' : '-') : i ? ' + ' : '';
      return `${sign}${mag}${e}`;
    })
    .join('');
}
