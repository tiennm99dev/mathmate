/**
 * The two GeoGebra constructions of the geometry activity, worked in
 * centimetres on a math plane (y up):
 *
 * - circle (A; R), B a fixed point, C running on the circle, M the meeting
 *   point of line AC and the perpendicular bisector of BC. MB = MC, so
 *   MA + MB = R when B is inside the circle (an ellipse with foci A, B) and
 *   |MA − MB| = R when B is outside (a hyperbola with foci A, B);
 * - two families of circles centred at O₁ and O₂ with radii R₁ + ka and
 *   R₂ + ka: each pair of the same rank meets on one branch of a hyperbola,
 *   since PO₂ − PO₁ = R₂ − R₁ there.
 */
import { formatFixed, tidy } from '#lib/core/number-format.js';
import { dist } from '#lib/geom-engine/plane.js';

/** @typedef {{ x: number, y: number }} Pt */

/** Radius of the circle (A; R) in the book's construction, in cm. */
export const R = 3;

/** How close to the circle, in cm, B counts as lying on it. */
export const ON_CIRCLE = 0.05;

/**
 * Point C on the circle (A; r) at `deg` degrees.
 * @param {Pt} A @param {number} r @param {number} deg
 * @returns {Pt}
 */
export function onCircle(A, r, deg) {
  const t = (deg * Math.PI) / 180;
  return { x: A.x + r * Math.cos(t), y: A.y + r * Math.sin(t) };
}

/**
 * The angle, in degrees from 0 to 360, of point P seen from A.
 * @param {Pt} A @param {Pt} P
 */
export function angleOf(A, P) {
  const deg = (Math.atan2(P.y - A.y, P.x - A.x) * 180) / Math.PI;
  return deg < 0 ? deg + 360 : deg;
}

/**
 * Where B lies: inside the circle (A; r) gives an ellipse, outside a
 * hyperbola, and on the circle every M falls on A, so there is no curve.
 * @param {Pt} A @param {Pt} B @param {number} r
 * @returns {'ellipse' | 'hyperbola' | 'on'}
 */
export function kindOf(A, B, r) {
  const d = dist(A, B);
  if (Math.abs(d - r) < ON_CIRCLE) return 'on';
  return d < r ? 'ellipse' : 'hyperbola';
}

/**
 * Point M of the construction for C at `deg` degrees: M = A + s·u on line AC,
 * u the unit vector towards C, with MB = MC. Writing w = (A − B)·u and
 * d = AB, MB² = MC² gives s = (r² − d²) / (2(r + w)). Null when line AC is
 * parallel to the bisector (r + w = 0: the hyperbola's asymptote direction).
 * @param {Pt} A @param {Pt} B @param {number} r @param {number} deg
 * @returns {{ C: Pt, M: Pt | null }}
 */
export function locusPoint(A, B, r, deg) {
  const C = onCircle(A, r, deg);
  const u = { x: (C.x - A.x) / r, y: (C.y - A.y) / r };
  const w = (A.x - B.x) * u.x + (A.y - B.y) * u.y;
  const d2 = (A.x - B.x) ** 2 + (A.y - B.y) ** 2;
  const den = 2 * (r + w);
  if (Math.abs(den) < 1e-9) return { C, M: null };
  const s = (r * r - d2) / den;
  return { C, M: { x: A.x + s * u.x, y: A.y + s * u.y } };
}

/**
 * The conic M traces: 2a = r and 2c = AB, with b² = a² − c² for the ellipse
 * and b² = c² − a² for the hyperbola.
 * @param {number} d distance AB @param {number} r
 * @returns {{ a: number, b: number, c: number }}
 */
export function conicOf(d, r) {
  const a = r / 2;
  const c = d / 2;
  return { a, b: Math.sqrt(Math.abs(a * a - c * c)), c };
}

/** A length to two decimals, Vietnamese style. @param {number} v */
export const cm = (v) => formatFixed(tidy(v, 6), 2);

/** A length to two decimals as TeX. @param {number} v */
const tex = (v) => cm(v).replace(',', '{,}');

/**
 * What the board says about the current M, as rich text.
 * @param {Pt} A @param {Pt} B @param {number} r @param {Pt | null} M
 */
export function locusNote(A, B, r, M) {
  const kind = kindOf(A, B, r);
  if (kind === 'on') {
    return 'B nằm trên đường tròn: đường trung trực của $BC$ luôn đi qua $A$, nên $M$ luôn trùng $A$. Kéo $B$ ra khỏi đường tròn.';
  }
  if (!M) {
    return 'Lúc này đường thẳng $AC$ song song với đường trung trực của $BC$, nên không có điểm $M$: đây là phương của một đường tiệm cận.';
  }
  const ma = dist(M, A);
  const mb = dist(M, B);
  if (kind === 'ellipse') {
    return `B nằm trong đường tròn: $MA + MB = ${tex(ma)} + ${tex(mb)} = ${tex(ma + mb)} = R$. Tổng không đổi nên $M$ chạy trên elip tiêu điểm $A$, $B$.`;
  }
  return `B nằm ngoài đường tròn: $|MA - MB| = |${tex(ma)} - ${tex(mb)}| = ${tex(Math.abs(ma - mb))} = R$. Hiệu không đổi nên $M$ chạy trên hypebol tiêu điểm $A$, $B$.`;
}

/**
 * The points where circles (O₁; r₁) and (O₂; r₂) meet: none, one or two.
 * @param {Pt} O1 @param {number} r1 @param {Pt} O2 @param {number} r2
 * @returns {Pt[]}
 */
export function circlesMeet(O1, r1, O2, r2) {
  const d = dist(O1, O2);
  if (d < 1e-9 || d > r1 + r2 + 1e-9 || d < Math.abs(r1 - r2) - 1e-9) return [];
  const along = (d * d + r1 * r1 - r2 * r2) / (2 * d);
  const h = Math.sqrt(Math.max(0, r1 * r1 - along * along));
  const ex = { x: (O2.x - O1.x) / d, y: (O2.y - O1.y) / d };
  const P = { x: O1.x + along * ex.x, y: O1.y + along * ex.y };
  if (h < 1e-9) return [P];
  return [
    { x: P.x - h * ex.y, y: P.y + h * ex.x },
    { x: P.x + h * ex.y, y: P.y - h * ex.x },
  ];
}

/**
 * The ripple pairs: ring k of each family has radius R₁ + ka and R₂ + ka,
 * for k = 0 … count − 1, with where the two rings of the same rank meet.
 * @param {Pt} O1 @param {Pt} O2 @param {number} r1 @param {number} r2
 * @param {number} step a @param {number} count
 * @returns {Array<{ k: number, r1: number, r2: number, points: Pt[] }>}
 */
export function ripples(O1, O2, r1, r2, step, count) {
  return Array.from({ length: count }, (_, k) => {
    const a = r1 + k * step;
    const b = r2 + k * step;
    return { k, r1: a, r2: b, points: circlesMeet(O1, a, O2, b) };
  });
}

/**
 * Points of the hyperbola branch with foci O₁, O₂ (on a horizontal line) whose
 * points satisfy PO₂ − PO₁ = diff, for drawing: 2a = |diff|, 2c = O₁O₂.
 * @param {Pt} O1 @param {Pt} O2 @param {number} diff @param {number} [reach] largest |y|
 * @returns {Pt[]}
 */
export function branch(O1, O2, diff, reach = 6) {
  const c = dist(O1, O2) / 2;
  const a = Math.abs(diff) / 2;
  if (a <= 0 || a >= c) return [];
  const b = Math.sqrt(c * c - a * a);
  const mid = { x: (O1.x + O2.x) / 2, y: (O1.y + O2.y) / 2 };
  // The branch nearer the focus with the smaller distance.
  const side = (diff > 0 ? Math.sign(O1.x - O2.x) : Math.sign(O2.x - O1.x)) || -1;
  const top = Math.asinh(reach / b);
  const pts = [];
  for (let i = -40; i <= 40; i++) {
    const t = (top * i) / 40;
    pts.push({ x: mid.x + side * a * Math.cosh(t), y: mid.y + b * Math.sinh(t) });
  }
  return pts;
}
