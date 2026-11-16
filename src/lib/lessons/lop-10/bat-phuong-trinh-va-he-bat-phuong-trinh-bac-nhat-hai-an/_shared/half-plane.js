/**
 * Linear inequalities in two unknowns, `a·x + b·y op c`, and the polygons
 * their solution regions cut out of a drawing box. Pure logic, no DOM.
 */
import { eqTex, eqText, substituteText } from '#lib/core/algebra-text.js';
import { fracText } from '#lib/core/fractions.js';
import { formatNumber, tidy } from '#lib/core/number-format.js';

/**
 * @typedef {'<' | '<=' | '>' | '>='} Op
 * @typedef {{ a: number, b: number, c: number, op: Op }} Ineq
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {{ xMin: number, xMax: number, yMin: number, yMax: number }} Box
 */

const EPS = 1e-9;

/** @type {Op[]} */
export const OPS = ['<', '<=', '>', '>='];

/** @type {Record<Op, string>} */
export const OP_TEXT = { '<': '<', '<=': '≤', '>': '>', '>=': '≥' };

/** @type {Record<Op, string>} */
const OP_TEX = { '<': '<', '<=': '\\le', '>': '>', '>=': '\\ge' };

/**
 * The opposite sign: the half-plane that is cut away.
 * @type {Record<Op, Op>}
 */
const OPPOSITE = { '<': '>=', '<=': '>', '>': '<=', '>=': '<' };

/** @param {Op} op */
export const isStrict = (op) => op === '<' || op === '>';

/** @param {Ineq} q */
export const isLinear = (q) => q.a !== 0 || q.b !== 0;

/**
 * Plain text: '2x − y ≤ 4'.
 * @param {Ineq} q
 */
export function ineqText(q) {
  return eqText(q.a, q.b, q.c).replace(' = ', ` ${OP_TEXT[q.op]} `);
}

/**
 * TeX source: '2x - y \le 4'.
 * @param {Ineq} q
 */
export function ineqTex(q) {
  return eqTex(q.a, q.b, q.c).replace(' = ', ` ${OP_TEX[q.op]} `);
}

/**
 * Whether `v op c` is true, with a small tolerance on the border.
 * @param {number} v @param {Op} op @param {number} c
 */
export function compare(v, op, c) {
  if (op === '<') return v < c - EPS;
  if (op === '<=') return v <= c + EPS;
  if (op === '>') return v > c + EPS;
  return v >= c - EPS;
}

/** @param {Ineq} q @param {Pt} p */
export const valueAt = (q, p) => tidy(q.a * p.x + q.b * p.y);

/** @param {Ineq} q @param {Pt} p */
export const holds = (q, p) => compare(valueAt(q, p), q.op, q.c);

/** @param {Ineq} q @param {Pt} p */
export const onBorder = (q, p) => Math.abs(valueAt(q, p) - q.c) < 1e-7;

/**
 * A computed value written exactly: a short decimal ('3,5', '−2'), else a
 * fraction with a small denominator ('15/7'), the way a vertex found by
 * solving two equations is written; only past that is it rounded ('≈ 2,14').
 * @param {number} v
 */
export function exactText(v) {
  const t = tidy(v);
  if (Math.abs(t * 100 - Math.round(t * 100)) < 1e-6) return formatNumber(t, 2);
  for (let d = 3; d <= 1000; d++) {
    const n = Math.round(t * d);
    if (Math.abs(n / d - t) < 1e-7) return fracText(n, d);
  }
  return `≈ ${formatNumber(t, 2)}`;
}

/**
 * A point written the book's way: '(2; −1,5)', or '(15/7; 12/7)'.
 * @param {Pt} p
 */
export function pointText(p) {
  return `(${exactText(p.x)}; ${exactText(p.y)})`;
}

/**
 * The test point the book suggests: the origin when `c ≠ 0`, otherwise
 * (1; 0), or (0; 1) when the line is the x-axis.
 * @param {Ineq} q
 * @returns {Pt}
 */
export function testPoint(q) {
  if (q.c !== 0) return { x: 0, y: 0 };
  return q.a !== 0 ? { x: 1, y: 0 } : { x: 0, y: 1 };
}

/**
 * The substitution of an integer point, as text: '2 · 3 − 1 = 5 > 4 (đúng)'.
 * @param {Ineq} q @param {Pt} p
 */
export function checkText(q, p) {
  const ok = holds(q, p);
  return `${substituteText(q.a, q.b, p.x, p.y)} ${OP_TEXT[q.op]} ${formatNumber(q.c)} ${ok ? '(đúng)' : '(sai)'}`;
}

/**
 * The book's conclusion after testing a point M off the border line d.
 * @param {Ineq} q @param {Pt} m @param {string} [name]
 */
export function conclusion(q, m, name = 'M') {
  const side = holds(q, m) ? `chứa điểm ${name}` : `không chứa điểm ${name}`;
  const border = isStrict(q.op) ? 'không kể đường thẳng d' : 'kể cả đường thẳng d';
  return `Miền nghiệm là nửa mặt phẳng bờ d ${side}, ${border}.`;
}

/** @param {Box} box @returns {Pt[]} */
export function boxPolygon({ xMin, xMax, yMin, yMax }) {
  return [
    { x: xMin, y: yMin },
    { x: xMax, y: yMin },
    { x: xMax, y: yMax },
    { x: xMin, y: yMax },
  ];
}

/**
 * Clips a convex polygon by the closed half-plane of `q`
 * (Sutherland–Hodgman), dropping repeated corners.
 * @param {Pt[]} poly @param {Ineq} q @returns {Pt[]}
 */
export function clipPolygon(poly, q) {
  const s = q.op === '<' || q.op === '<=' ? 1 : -1;
  const f = (/** @type {Pt} */ p) => s * (q.a * p.x + q.b * p.y - q.c);
  /** @type {Pt[]} */
  const out = [];
  const push = (/** @type {Pt} */ p) => {
    const pt = { x: tidy(p.x), y: tidy(p.y) };
    const last = out[out.length - 1];
    if (!last || Math.abs(last.x - pt.x) > 1e-7 || Math.abs(last.y - pt.y) > 1e-7) out.push(pt);
  };
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const n = poly[(i + 1) % poly.length];
    const fp = f(p);
    const fn = f(n);
    if (fp <= EPS) push(p);
    if ((fp < -EPS && fn > EPS) || (fp > EPS && fn < -EPS)) {
      const t = fp / (fp - fn);
      push({ x: p.x + t * (n.x - p.x), y: p.y + t * (n.y - p.y) });
    }
  }
  if (out.length > 1) {
    const a = out[0];
    const z = out[out.length - 1];
    if (Math.abs(a.x - z.x) < 1e-7 && Math.abs(a.y - z.y) < 1e-7) out.pop();
  }
  return out.length >= 3 ? out : [];
}

/**
 * The part of the box cut away by `q`: its closed opposite half-plane.
 * @param {Ineq} q @param {Box} box
 */
export function excludedPolygon(q, box) {
  if (!isLinear(q)) return [];
  return clipPolygon(boxPolygon(box), { ...q, op: OPPOSITE[q.op] });
}

/**
 * The solution region of a system inside the box, as a convex polygon
 * (empty when the system has no solution there).
 * @param {Ineq[]} system @param {Box} box
 */
export function regionPolygon(system, box) {
  return system.reduce((poly, q) => (poly.length ? clipPolygon(poly, q) : poly), boxPolygon(box));
}

/**
 * The vertices of the solution polygon with the book's names: O for the
 * origin, then A, B, C, … in order around the polygon.
 * @param {Ineq[]} system @param {Box} box
 * @returns {{ name: string, pt: Pt }[]}
 */
export function namedRegion(system, box) {
  const raw = regionPolygon(system, box);
  // Start at the lowest, then leftmost, vertex and go anticlockwise.
  let start = 0;
  raw.forEach((pt, i) => {
    const s = raw[start];
    if (pt.y < s.y || (pt.y === s.y && pt.x < s.x)) start = i;
  });
  const poly = [...raw.slice(start), ...raw.slice(0, start)];
  let letter = 0;
  return poly.map((pt) => {
    if (pt.x === 0 && pt.y === 0) return { name: 'O', pt };
    const name = String.fromCharCode(65 + letter);
    letter += 1;
    return { name, pt };
  });
}

/**
 * Values of F = p·x + q·y at the vertices, and which vertices give the
 * largest and smallest value (several when an edge is a level line).
 * @param {Pt[]} vertices @param {number} p @param {number} q
 */
export function optimize(vertices, p, q) {
  const values = vertices.map((v) => tidy(p * v.x + q * v.y));
  const max = Math.max(...values);
  const min = Math.min(...values);
  const near = (/** @type {number} */ a, /** @type {number} */ b) => Math.abs(a - b) < 1e-7;
  return {
    values,
    max,
    min,
    argMax: values.flatMap((v, i) => (near(v, max) ? [i] : [])),
    argMin: values.flatMap((v, i) => (near(v, min) ? [i] : [])),
  };
}

/**
 * SVG `points` for a polygon in math coordinates.
 * @param {Pt[]} poly
 * @param {(x: number) => number} mx
 * @param {(y: number) => number} my
 */
export function polyPoints(poly, mx, my) {
  return poly.map((p) => `${mx(p.x)},${my(p.y)}`).join(' ');
}
