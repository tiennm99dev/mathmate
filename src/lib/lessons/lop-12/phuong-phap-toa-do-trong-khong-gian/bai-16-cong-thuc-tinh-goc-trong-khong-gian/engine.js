import { cross3, dot3, mul3, sub3 } from '#lib/geom-engine/solid.js';
import { angleDeg, coords, isZero3 } from '#lib/geom-engine/space.js';
import { degreeTex, opTex, overSqrtTex } from '#lib/geom-engine/space-tex.js';

/** @typedef {import('#lib/geom-engine/space.js').P3} P3 */
/** @typedef {'ll' | 'lp' | 'pp'} Mode */

/** Largest coordinate a stepper of the widget reaches. */
export const LIMIT = 3;

/** The two objects of each kind of angle, the book's way. @type {Record<Mode, { names: [string, string], vectors: [string, string] }>} */
export const MODES = {
  ll: { names: ['\\Delta', "\\Delta'"], vectors: ['\\vec{u}', "\\vec{u}'"] },
  lp: { names: ['\\Delta', '(P)'], vectors: ['\\vec{u}', '\\vec{n}'] },
  pp: { names: ['(P)', "(P')"], vectors: ['\\vec{n}', "\\vec{n}'"] },
};

/**
 * The acute (or right) angle between the lines carrying u and v, in degrees.
 * @param {P3} u @param {P3} v
 */
export function lineAngle(u, v) {
  const a = /** @type {number} */ (angleDeg(u, v));
  return Math.min(a, 180 - a);
}

/**
 * The angle measured on the figure, without the formula: between the two
 * lines; between the line and its projection on the plane; between two
 * lines, one in each plane, perpendicular to the planes' common line. Also
 * the two directions the widget marks the angle between (null when the
 * angle is 0° and nothing is to be marked, or when the line is
 * perpendicular to the plane).
 * @param {Mode} mode @param {P3} a @param {P3} b
 * @returns {{ deg: number, from: P3 | null, to: P3 | null }}
 */
export function measure(mode, a, b) {
  if (mode === 'll') {
    const flip = dot3(a, b) < 0 ? mul3(b, -1) : b;
    return { deg: lineAngle(a, b), from: a, to: flip };
  }
  if (mode === 'lp') {
    const proj = sub3(a, mul3(b, dot3(a, b) / dot3(b, b)));
    if (len2(proj) < 1e-12) return { deg: 90, from: null, to: null };
    return { deg: lineAngle(a, proj), from: proj, to: a };
  }
  const d = cross3(a, b);
  if (isZero3(d)) return { deg: 0, from: null, to: null };
  const p = cross3(d, a);
  const q = cross3(d, b);
  const flip = dot3(p, q) < 0 ? mul3(q, -1) : q;
  return { deg: lineAngle(p, q), from: p, to: flip };
}

/** @param {P3} a */
const len2 = (a) => dot3(a, a);

/**
 * The book's formula for the angle and its working in TeX:
 * cos(Δ, Δ') = |u·u'| / (|u|·|u'|), sin(Δ, (P)) = |u·n| / (|u|·|n|),
 * cos((P), (P')) = |n·n'| / (|n|·|n'|). Null when a vector is zero.
 * @param {Mode} mode @param {P3} a @param {P3} b
 */
export function formula(mode, a, b) {
  if (isZero3(a) || isZero3(b)) return null;
  const dot = dot3(a, b);
  const aa = dot3(a, a);
  const bb = dot3(b, b);
  const ratio = Math.min(1, Math.abs(dot) / Math.sqrt(aa * bb));
  const deg = ((mode === 'lp' ? Math.asin(ratio) : Math.acos(ratio)) * 180) / Math.PI;
  const fn = mode === 'lp' ? '\\sin' : '\\cos';
  const { names, vectors } = MODES[mode];
  const [x, y, z] = coords(a);
  const [x2, y2, z2] = coords(b);
  const sum = `${opTex(x)} \\cdot ${opTex(x2)} + ${opTex(y)} \\cdot ${opTex(y2)} + ${opTex(z)} \\cdot ${opTex(z2)}`;
  const value = overSqrtTex(Math.abs(dot), aa * bb);
  return {
    deg,
    dot,
    tex: `${fn}(${names[0]}, ${names[1]}) = \\dfrac{|${vectors[0]} \\cdot ${vectors[1]}|}{|${vectors[0]}| \\cdot |${vectors[1]}|} = \\dfrac{|${sum}|}{\\sqrt{${aa}} \\cdot \\sqrt{${bb}}} = ${value}`,
    angleTex: `(${names[0]}, ${names[1]}) ${degreeTex(deg)}`,
  };
}
