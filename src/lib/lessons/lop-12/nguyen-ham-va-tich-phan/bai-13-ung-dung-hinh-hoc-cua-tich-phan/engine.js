/**
 * The solids of revolution of the explorer: the region under y = f(x) ≥ 0 on
 * [a; b] turned about the x-axis. Model space follows `geom-engine/solid.js`
 * (z up): the region starts in the plane y = 0 above the axis, and a point at
 * height r turned by θ lands at (x, r·sin θ, r·cos θ).
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */

/**
 * @typedef {{
 *   id: string, label: string, fTex: string, squareTex: string, valueTex: string,
 *   f: (x: number) => number, a: number, b: number,
 *   volume: number, name: string,
 * }} Solid
 */

/** @type {Solid[]} */
export const SOLIDS = [
  {
    id: 'sqrt',
    label: 'y = √x',
    fTex: '\\sqrt{x}',
    squareTex: 'x',
    valueTex: '8\\pi',
    f: (x) => Math.sqrt(Math.max(0, x)),
    a: 0,
    b: 4,
    volume: 8 * Math.PI,
    name: 'một khối paraboloid tròn xoay',
  },
  {
    id: 'cone',
    label: 'y = x/2',
    fTex: '\\dfrac{x}{2}',
    squareTex: '\\dfrac{x^2}{4}',
    valueTex: '\\dfrac{16\\pi}{3}',
    f: (x) => x / 2,
    a: 0,
    b: 4,
    volume: (16 * Math.PI) / 3,
    name: 'khối nón có bán kính đáy $2$ và chiều cao $4$',
  },
  {
    id: 'sphere',
    label: 'y = √(4 − x²)',
    fTex: '\\sqrt{4 - x^2}',
    squareTex: '4 - x^2',
    valueTex: '\\dfrac{32\\pi}{3}',
    f: (x) => Math.sqrt(Math.max(0, 4 - x * x)),
    a: -2,
    b: 2,
    volume: (32 * Math.PI) / 3,
    name: 'khối cầu bán kính $2$',
  },
];

/**
 * A point at height r above x turned by θ degrees about the x-axis.
 * @param {number} x @param {number} r @param {number} deg
 * @returns {P3}
 */
export function turned(x, r, deg) {
  const t = (deg * Math.PI) / 180;
  return { x, y: r * Math.sin(t), z: r * Math.cos(t) };
}

/**
 * The xs of `n` + 1 evenly spaced samples of [a; b].
 * @param {number} a @param {number} b @param {number} n
 */
export const samples = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);

/**
 * The profile curve turned by θ degrees.
 * @param {Solid} s @param {number} deg @param {number} [n]
 */
export const meridian = (s, deg, n = 48) => samples(s.a, s.b, n).map((x) => turned(x, s.f(x), deg));

/**
 * The plane region (under the curve, down to the axis) turned by θ degrees,
 * as a closed polygon.
 * @param {Solid} s @param {number} deg
 */
export function regionAt(s, deg) {
  return [turned(s.a, 0, deg), ...meridian(s, deg), turned(s.b, 0, deg)];
}

/**
 * The arc swept by the point of the curve above x as θ goes from 0 to
 * `upTo` degrees.
 * @param {Solid} s @param {number} x @param {number} upTo
 */
export function arcAt(s, x, upTo) {
  const steps = Math.max(1, Math.ceil(upTo / 10));
  return Array.from({ length: steps + 1 }, (_, i) => turned(x, s.f(x), (upTo * i) / steps));
}

/**
 * The cross-section at x swept so far: the sector of the disk of radius
 * f(x) from 0 to `upTo` degrees (the whole disk at 360°), as a polygon.
 * @param {Solid} s @param {number} x @param {number} upTo
 */
export function sliceAt(s, x, upTo) {
  const arc = arcAt(s, x, upTo);
  return upTo >= 360 ? arc : [{ x, y: 0, z: 0 }, ...arc];
}

/**
 * Area of the cross-section at x of the full solid: S(x) = π·f(x)².
 * @param {Solid} s @param {number} x
 */
export const sectionArea = (s, x) => Math.PI * s.f(x) ** 2;
