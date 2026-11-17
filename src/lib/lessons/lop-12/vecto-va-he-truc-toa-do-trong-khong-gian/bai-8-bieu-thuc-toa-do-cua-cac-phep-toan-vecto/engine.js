import {
  add3,
  coordTex,
  cross3,
  dot3,
  len3,
  mul3,
  opTex,
  overSqrtTex,
  sqrtTex,
  sub3,
  angleDeg,
} from '../_shared/space.js';

/**
 * The coordinate formulas of the vector operations, worked out step by step
 * for two vectors with whole coordinates: sum, difference, dot product,
 * lengths, the angle, and the cross product (tích có hướng) with the area of
 * the parallelogram built on the two vectors.
 */

/** @typedef {import('../_shared/space.js').P3} P3 */

/**
 * √n written out, then simplified when it changes: '\\sqrt{21}',
 * '\\sqrt{9} = 3', '\\sqrt{8} = 2\\sqrt{2}'.
 * @param {number} n
 */
const rootTex = (n) => {
  const simple = sqrtTex(n);
  return simple === `\\sqrt{${n}}` ? simple : `\\sqrt{${n}} = ${simple}`;
};

/** Coordinates in the widget go from −LIMIT to LIMIT. */
export const LIMIT = 3;

/** The longest the cross product is drawn; a longer one is drawn shrunk. */
export const MAX_DRAWN = 3.5;

/**
 * Every result for u and v, with the TeX of each step.
 * @param {P3} u @param {P3} v
 */
export function work(u, v) {
  const sum = add3(u, v);
  const diff = sub3(u, v);
  const dot = dot3(u, v);
  const nu = dot3(u, u);
  const nv = dot3(v, v);
  const cross = cross3(u, v);
  const nc = dot3(cross, cross);
  const angle = angleDeg(u, v);
  /** @param {P3} a */
  const c = (a) => [a.x, a.y, a.z].map(opTex);
  const [u1, u2, u3] = c(u);
  const [v1, v2, v3] = c(v);
  const plus = (/** @type {string[]} */ a, /** @type {string[]} */ b, op = '+') =>
    `(${a.map((x, i) => `${x} ${op} ${b[i]}`).join('; ')})`;
  return {
    sum,
    diff,
    dot,
    cross,
    angle,
    sumTex: `\\vec{u} + \\vec{v} = ${plus(c(u), c(v))} = ${coordTex(sum)}`,
    diffTex: `\\vec{u} - \\vec{v} = ${plus(c(u), c(v), '-')} = ${coordTex(diff)}`,
    dotTex: `\\vec{u} \\cdot \\vec{v} = ${u1} \\cdot ${v1} + ${u2} \\cdot ${v2} + ${u3} \\cdot ${v3} = ${dot}`,
    lenTex: `|\\vec{u}| = ${rootTex(nu)}, \\quad |\\vec{v}| = ${rootTex(nv)}`,
    cosTex:
      nu && nv
        ? `\\cos(\\vec{u}, \\vec{v}) = \\dfrac{${dot}}{${sqrtTex(nu)} \\cdot ${sqrtTex(nv)}} = ${overSqrtTex(dot, nu * nv)}`
        : null,
    crossTex: `[\\vec{u}, \\vec{v}] = (${u2} \\cdot ${v3} - ${u3} \\cdot ${v2}; ${u3} \\cdot ${v1} - ${u1} \\cdot ${v3}; ${u1} \\cdot ${v2} - ${u2} \\cdot ${v1}) = ${coordTex(cross)}`,
    checkTex: `[\\vec{u}, \\vec{v}] \\cdot \\vec{u} = ${dot3(cross, u)}, \\quad [\\vec{u}, \\vec{v}] \\cdot \\vec{v} = ${dot3(cross, v)}`,
    areaTex: `S = \\left|[\\vec{u}, \\vec{v}]\\right| = ${rootTex(nc)}`,
    area: Math.sqrt(nc),
  };
}

/**
 * The cross product as drawn: shrunk to `MAX_DRAWN` when longer, with the
 * factor it was shrunk by (1 when not).
 * @param {P3} cross
 */
export function drawnCross(cross) {
  const l = len3(cross);
  if (l <= MAX_DRAWN) return { vec: cross, shrink: 1 };
  return { vec: mul3(cross, MAX_DRAWN / l), shrink: l / MAX_DRAWN };
}
