/**
 * Logic of the two-point board: for the line through A and B, the direction
 * vector AB, the normal vector got by swapping its coordinates and changing
 * one sign, the parametric system, the general equation (first written with
 * the normal vector, then simplified), the form y = kx + m when the line is
 * not upright, and a sentence on special positions.
 */
import { signedFracTex } from '#lib/core/algebra-text.js';
import { numTex } from '#lib/core/number-format.js';
import { coordTex, lineTex, lineThrough, paramTex, termsTex } from '../_shared/coords.js';

/** @typedef {{ x: number, y: number }} V */
/** @typedef {import('../_shared/coords.js').Line} Line */

/** The board, in grid units. */
export const BOX = { xMin: -6, xMax: 6, yMin: -5, yMax: 5 };

/**
 * The vectors and equations of line AB.
 * @param {V} A @param {V} B
 */
export function lineInfo(A, B) {
  const u = { x: B.x - A.x, y: B.y - A.y };
  const n = { x: u.y, y: -u.x };
  const line = lineThrough(A, B);
  return { u, n, line };
}

/** The equation a(x − x₀) + b(y − y₀) = 0 before it is expanded. @param {V} A @param {V} n */
export function pointNormalTex(A, n) {
  const factor = (/** @type {string} */ v, /** @type {number} */ c) =>
    c === 0 ? v : `(${v} ${c > 0 ? '-' : '+'} ${numTex(Math.abs(c))})`;
  return `${termsTex([
    [n.x, factor('x', A.x)],
    [n.y, factor('y', A.y)],
  ])} = 0`;
}

/**
 * The line as y = kx + m, or null for an upright line (b = 0).
 * @param {Line} l
 */
export function slopeTex(l) {
  if (l.b === 0) return null;
  const k = signedFracTex(-l.a, l.b);
  const m = signedFracTex(-l.c, l.b);
  let out = '';
  if (k !== '0') out = k === '1' ? 'x' : k === '-1' ? '-x' : `${k}x`;
  if (m !== '0')
    out = out === '' ? m : `${out} ${m.startsWith('-') ? '-' : '+'} ${m.replace(/^-/, '')}`;
  return `y = ${out === '' ? '0' : out}`;
}

/**
 * All the lines of the board's TeX panel.
 * @param {V} A @param {V} B
 */
export function panelTex(A, B) {
  const { u, n, line } = lineInfo(A, B);
  return {
    vectors: `\\vec u = \\overrightarrow{AB} = ${coordTex(u.x, u.y)},\\quad \\vec n = ${coordTex(n.x, n.y)}`,
    param: paramTex(A, u),
    general: [pointNormalTex(A, n), `\\Leftrightarrow ${lineTex(line)}`],
    slope: slopeTex(line),
  };
}

/**
 * A sentence on where the line lies: upright, level, through O, or none.
 * @param {Line} l
 */
export function specialText(l) {
  if (l.a === 0)
    return `$b \\ne 0$, $a = 0$: đường thẳng $y = ${signedFracTex(-l.c, l.b)}$ ${l.c === 0 ? 'là trục $Ox$' : 'song song với trục $Ox$'}.`;
  if (l.b === 0)
    return `$b = 0$: đường thẳng $x = ${signedFracTex(-l.c, l.a)}$ ${l.c === 0 ? 'là trục $Oy$' : 'song song với trục $Oy$'}; nó không viết được dưới dạng $y = kx + m$.`;
  if (l.c === 0) return '$c = 0$: đường thẳng đi qua gốc toạ độ $O$.';
  return 'Kéo $A$, $B$ sao cho đường thẳng song song với một trục hoặc đi qua $O$ để xem các trường hợp đặc biệt.';
}
