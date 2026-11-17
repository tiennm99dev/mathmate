/**
 * The "which transformation?" puzzles of the chapter review: a figure H and
 * its image H' on the plane, and four candidate transformations of which
 * exactly one maps H onto H'. Picking a candidate draws the image it gives.
 */
import { applyChain, chainRatio, moveTex } from '../_shared/moves.js';
import { ptTex, ratioTex, sameFigure } from '../_shared/transform.js';

/** @typedef {import('../_shared/transform.js').Pt} Pt */
/** @typedef {import('../_shared/moves.js').Move} Move */

/** The figure H: a right triangle with legs 2 and 3, with no symmetry of its own. @type {Pt[]} */
export const FIGURE = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 1, y: 4 },
];

export const NAMES = ['A', 'B', 'C'];

/** @typedef {{ target: Pt[], options: Move[] }} Puzzle */

/** @param {number} x @param {number} y @returns {Pt} */
const p = (x, y) => ({ x, y });

/** @type {Puzzle[]} */
export const PUZZLES = [
  {
    target: [p(-4, -5), p(-2, -5), p(-4, -2)],
    options: [
      { kind: 't', u: p(-5, -6) },
      { kind: 't', u: p(-6, -5) },
      { kind: 'half' },
      { kind: 'axis', axis: 'Ox' },
    ],
  },
  {
    target: [p(-1, 1), p(-3, 1), p(-1, 4)],
    options: [
      { kind: 'axis', axis: 'Ox' },
      { kind: 'axis', axis: 'Oy' },
      { kind: 'rot', deg: 90 },
      { kind: 't', u: p(-4, 0) },
    ],
  },
  {
    target: [p(-1, 1), p(-1, 3), p(-4, 1)],
    options: [
      { kind: 'rot', deg: -90 },
      { kind: 'axis', axis: 'y=x' },
      { kind: 'rot', deg: 90 },
      { kind: 'axis', axis: 'Oy' },
    ],
  },
  {
    target: [p(-1, -1), p(-3, -1), p(-1, -4)],
    options: [
      { kind: 'axis', axis: 'Ox' },
      { kind: 'half' },
      { kind: 'rot', deg: -90 },
      { kind: 'hom', k: -2 },
    ],
  },
  {
    target: [p(2, 2), p(6, 2), p(2, 8)],
    options: [
      { kind: 'hom', k: -2 },
      { kind: 't', u: p(1, 1) },
      { kind: 'hom', k: 3 },
      { kind: 'hom', k: 2 },
    ],
  },
  {
    target: [p(-0.5, -0.5), p(-1.5, -0.5), p(-0.5, -2)],
    options: [
      { kind: 'hom', k: 0.5 },
      { kind: 'hom', k: -0.5 },
      { kind: 'hom', k: -2 },
      { kind: 'half' },
    ],
  },
  {
    target: [p(1, 1), p(1, 3), p(4, 1)],
    options: [
      { kind: 'rot', deg: -90 },
      { kind: 'rot', deg: 90 },
      { kind: 'axis', axis: 'y=-x' },
      { kind: 'axis', axis: 'y=x' },
    ],
  },
  {
    target: [p(1, -1), p(3, -1), p(1, -4)],
    options: [
      { kind: 'axis', axis: 'Oy' },
      { kind: 't', u: p(0, -5) },
      { kind: 'axis', axis: 'Ox' },
      { kind: 'rot', deg: -90 },
    ],
  },
];

/**
 * The image of H under one candidate.
 * @param {Move} m
 */
export function imageOf(m) {
  return applyChain(FIGURE, [m]);
}

/**
 * Whether a candidate maps H onto H'.
 * @param {Puzzle} puzzle @param {Move} m
 */
export function fits(puzzle, m) {
  return sameFigure(imageOf(m), puzzle.target);
}

/**
 * The feedback after picking a candidate.
 * @param {Puzzle} puzzle @param {Move} m
 */
export function verdict(puzzle, m) {
  const tex = `$${moveTex(m)}$`;
  if (fits(puzzle, m)) {
    const ratio = chainRatio([m]);
    const kind =
      m.kind === 'hom'
        ? `phép vị tự, cũng là phép đồng dạng tỉ số $${ratioTex(ratio)}$, nên $H'$ đồng dạng với $H$`
        : "phép dời hình, nên $H'$ bằng $H$";
    return `Đúng! ${tex} biến $H$ thành $H'$. Đây là ${kind}.`;
  }
  const img = imageOf(m);
  return `Chưa đúng: ${tex} biến $A$ thành $${ptTex(img[0])}$, $B$ thành $${ptTex(img[1])}$, $C$ thành $${ptTex(img[2])}$ (hình nét đứt đỏ), không trùng với $H'$. Thử lại.`;
}
