/**
 * The hyperbola board: a and b are chosen, M slides on either branch. The
 * readout gives the canonical equation, c, the eccentricity, the focal radii
 * MF₁ = |a + ex|, MF₂ = |a − ex| with |MF₁ − MF₂| = 2a, the directrix ratio,
 * and the distances from M to the two asymptotes, whose product stays
 * a²b²/c² while each one shrinks as M runs away.
 */
import { numTex } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { focalRadii, hyperbola, sampleBranch, valueTex } from '../_shared/conic.js';

/** @typedef {{ x: number, y: number }} V */

/** The board, in grid units. */
export const BOX = { xMin: -10, xMax: 10, yMin: -7, yMax: 7 };
export const A_RANGE = /** @type {const} */ ([1, 4]);
export const B_RANGE = /** @type {const} */ ([1, 5]);

/** Samples per branch. */
export const PER_BRANCH = 61;

/**
 * Both branches, right then left, each from bottom to top.
 * @param {number} a @param {number} b
 */
export function samplesOf(a, b) {
  return [
    ...sampleBranch(a, b, 1, BOX.xMax, BOX.yMax, PER_BRANCH),
    ...sampleBranch(a, b, -1, BOX.xMax, BOX.yMax, PER_BRANCH),
  ];
}

/**
 * The distances from M to the asymptotes bx − ay = 0 and bx + ay = 0.
 * @param {number} a @param {number} b @param {V} M
 * @returns {[number, number]}
 */
export function asymptoteDistances(a, b, M) {
  const n = Math.hypot(a, b);
  return [Math.abs(b * M.x - a * M.y) / n, Math.abs(b * M.x + a * M.y) / n];
}

/** @param {number} a @param {number} b */
export const equationTex = (a, b) => `\\dfrac{x^2}{${a * a}} - \\dfrac{y^2}{${b * b}} = 1`;

/**
 * The asymptotes y = ±(b/a)x in TeX.
 * @param {number} a @param {number} b
 */
export function asymptotesTex(a, b) {
  const g = gcd(a, b);
  const [p, q] = [b / g, a / g];
  const k = q === 1 ? (p === 1 ? '' : `${p}`) : `\\dfrac{${p}}{${q}}`;
  return `y = \\pm ${k}x`;
}

/**
 * The readout lines, as rich text, at M.
 * @param {number} a @param {number} b @param {V} M @param {boolean} withDirectrix
 */
export function readout(a, b, M, withDirectrix) {
  const H = hyperbola(a, b);
  const [r1, r2] = focalRadii(H, M.x, true);
  const [d1, d2] = asymptoteDistances(a, b, M);
  const lines = [
    `$c = \\sqrt{a^2 + b^2} ${valueTex(H.c)}$, $e = \\dfrac{c}{a} ${valueTex(H.e, 3)}$`,
    `$MF_1 = |a + ex| ${valueTex(r1)}$, $MF_2 = |a - ex| ${valueTex(r2)}$`,
    `$|MF_1 - MF_2| = ${2 * a} = 2a$`,
  ];
  if (withDirectrix) {
    const side = M.x > 0 ? 2 : 1;
    const d = Math.abs(Math.abs(M.x) - H.directrix);
    const r = side === 2 ? r2 : r1;
    lines.push(
      `$d(M, \\Delta_${side}) ${valueTex(d)}$, $\\dfrac{MF_${side}}{d(M, \\Delta_${side})} = e ${valueTex(r / d, 3)}$`,
    );
  }
  lines.push(
    `Khoảng cách từ $M$ đến hai tiệm cận: $${numTex(d1, 2)}$ và $${numTex(d2, 2)}$`,
    `Tích hai khoảng cách: $\\dfrac{a^2b^2}{c^2} ${valueTex(d1 * d2)}$`,
  );
  return lines;
}

/**
 * Where M is, said for the feedback line.
 * @param {number} a @param {number} b @param {V} M
 */
export function noteAt(a, b, M) {
  const near = Math.min(...asymptoteDistances(a, b, M));
  if (Math.abs(M.y) < 1e-9)
    return `$M$ ở đỉnh $(${M.x > 0 ? '' : '-'}${a}; 0)$ trên trục thực: $|MF_1 - MF_2| = 2a = ${2 * a}$.`;
  if (near < 0.3)
    return `$M$ ra xa thì nhánh hypebol sát dần đường tiệm cận: khoảng cách chỉ còn khoảng $${numTex(near, 2)}$.`;
  return `Hiệu $|MF_1 - MF_2|$ luôn bằng $2a = ${2 * a}$, dù $M$ ở nhánh nào. Kéo $M$ ra xa để thấy nhánh tiến sát đường tiệm cận.`;
}
