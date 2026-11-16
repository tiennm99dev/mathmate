/**
 * Logic of the dot-product board: two vectors from O on the coordinate grid,
 * the angle between them, the projection of b on the line of a, and the dot
 * product worked out both ways (x x' + y y' and |a| |b| cos), with its sign
 * read from the angle; and the work of a force F along a displacement d.
 */
import { formatFixed, formatNumber, numTex, texNumber, tidy } from '#lib/core/number-format.js';
import { foot } from '#lib/geom-engine/plane.js';
import { angleDeg, dot, isZero, len, rootTex } from '../_shared/vectors.js';

/** @typedef {{ x: number, y: number }} V */
/** @typedef {'zero' | 'acute' | 'right' | 'obtuse'} Kind */

/** Newtons per grid unit for the force in the work mode. */
export const NEWTONS = 10;

const ORIGIN = { x: 0, y: 0 };

/** A number as a TeX operand: negatives in brackets. @param {number} n */
const op = (n) => (n < 0 ? `(${numTex(n)})` : numTex(n));

/** An angle as TeX: exact when whole, else ≈ to one decimal. @param {number} deg */
export function angleTex(deg) {
  const r = tidy(deg, 6);
  if (Number.isInteger(r)) return `= ${r}^\\circ`;
  return `\\approx ${texNumber(formatFixed(r, 1))}^\\circ`;
}

/**
 * The sign of a · b from the angle between a and b.
 * @param {V} a @param {V} b
 * @returns {Kind}
 */
export function kindOf(a, b) {
  if (isZero(a) || isZero(b)) return 'zero';
  const d = dot(a, b);
  return d > 0 ? 'acute' : d < 0 ? 'obtuse' : 'right';
}

/**
 * The foot of the perpendicular from the tip of b to the line of a, or null
 * when a is the zero vector.
 * @param {V} a @param {V} b
 */
export const projection = (a, b) => (isZero(a) ? null : foot(b, ORIGIN, a));

/**
 * The dot product of a and b worked out, with the vector names given.
 * @param {V} a @param {V} b @param {[string, string]} names TeX names, '\\vec a'
 */
export function dotLines(a, b, [p, q]) {
  const d = dot(a, b);
  const lines = [
    `${p} \\cdot ${q} = ${numTex(a.x)} \\cdot ${op(b.x)} + ${op(a.y)} \\cdot ${op(b.y)} = ${numTex(d)}`,
  ];
  const angle = angleDeg(a, b);
  if (angle !== null) {
    lines.push(
      `(${p}, ${q}) ${angleTex(angle)}`,
      `${rootTex(a)} \\cdot ${rootTex(b)} \\cdot \\cos(${p}, ${q}) = ${numTex(tidy(len(a) * len(b) * Math.cos((angle * Math.PI) / 180), 6))}`,
    );
  }
  return lines;
}

/**
 * The sentence under the board in the dot-product mode.
 * @param {V} a @param {V} b
 */
export function dotNote(a, b) {
  switch (kindOf(a, b)) {
    case 'zero':
      return 'Có một vectơ bằng $\\vec 0$: theo quy ước, tích vô hướng bằng $0$.';
    case 'acute':
      return 'Góc giữa hai vectơ nhọn: $\\cos > 0$, hình chiếu của $\\vec b$ nằm cùng phía với $\\vec a$, tích vô hướng dương.';
    case 'obtuse':
      return 'Góc giữa hai vectơ tù: $\\cos < 0$, hình chiếu của $\\vec b$ nằm ngược phía với $\\vec a$, tích vô hướng âm.';
    default:
      return 'Góc giữa hai vectơ bằng $90^\\circ$: $\\vec a \\perp \\vec b$ và $\\vec a \\cdot \\vec b = 0$.';
  }
}

/**
 * The work A = F · d of a force F (in grid units of NEWTONS) along a
 * displacement d (in metres), in joules, and the sentence about it.
 * @param {V} d @param {V} F
 */
export function work(d, F) {
  const A = tidy(dot(d, F) * NEWTONS, 6);
  const kind = kindOf(d, F);
  const force = `${formatNumber(tidy(len(F) * NEWTONS, 1), 1)}`;
  const note =
    kind === 'acute'
      ? `Lực hợp với hướng dịch chuyển một góc nhọn: công dương, lực "giúp" vật đi (công phát động).`
      : kind === 'obtuse'
        ? `Lực hợp với hướng dịch chuyển một góc tù: công âm, lực cản trở chuyển động (công cản).`
        : kind === 'right'
          ? 'Lực vuông góc với hướng dịch chuyển: lực không sinh công.'
          : 'Không có lực hoặc vật không dịch chuyển: công bằng $0$.';
  return {
    A,
    tex: `A = \\vec d \\cdot \\vec F = ${numTex(A)}\\ \\text{J}`,
    note: `$|\\vec F| ${Number.isInteger(tidy(len(F) * NEWTONS, 6)) ? '=' : '\\approx'} ${texNumber(force)}$ N. ${note}`,
  };
}
