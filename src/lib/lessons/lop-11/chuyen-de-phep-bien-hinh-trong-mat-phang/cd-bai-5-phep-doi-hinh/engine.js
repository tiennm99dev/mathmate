/**
 * The overlay puzzle: chain translations, reflections in Ox and Oy,
 * quarter turns and the half turn about O until a triangle lands exactly
 * on an equal triangle. Every chain of these is an isometry, so the two
 * triangles are equal figures.
 */
import { numTex } from '#lib/core/number-format.js';
import { halfTurn, ptTex, reflect, rotate, sameFigure, translate } from '../_shared/transform.js';

/** @typedef {import('../_shared/transform.js').Pt} Pt */
/**
 * @typedef {{ kind: 'ox' | 'oy' | 'q90' | 'q-90' | 'do' } | { kind: 't', u: Pt }} Step
 */

const O = { x: 0, y: 0 };

/** The moves with no parameter, with the button text and their TeX. */
export const MOVES = /** @type {const} */ ([
  { kind: 'ox', label: 'Đối xứng trục Ox', tex: '\\text{Đ}_{Ox}' },
  { kind: 'oy', label: 'Đối xứng trục Oy', tex: '\\text{Đ}_{Oy}' },
  { kind: 'q90', label: 'Quay 90° quanh O', tex: 'Q_{(O,\\ 90^\\circ)}' },
  { kind: 'q-90', label: 'Quay −90° quanh O', tex: 'Q_{(O,\\ -90^\\circ)}' },
  { kind: 'do', label: 'Đối xứng tâm O', tex: '\\text{Đ}_O' },
]);

/**
 * The image of one point under one step.
 * @param {Pt} p @param {Step} step @returns {Pt}
 */
export function applyStep(p, step) {
  switch (step.kind) {
    case 'ox':
      return reflect(p, 'Ox');
    case 'oy':
      return reflect(p, 'Oy');
    case 'q90':
      return rotate(p, O, 90);
    case 'q-90':
      return rotate(p, O, -90);
    case 'do':
      return halfTurn(p, O);
    default:
      return translate(p, step.u);
  }
}

/**
 * A figure after a chain of steps, applied in order.
 * @param {Pt[]} points @param {Step[]} steps
 */
export function applyChain(points, steps) {
  return points.map((p) => steps.reduce(applyStep, p));
}

/**
 * One step as TeX.
 * @param {Step} step
 */
export function stepTex(step) {
  if (step.kind === 't') return `T_{\\vec u},\\ \\vec u = ${ptTex(step.u)}`;
  const move = MOVES.find((m) => m.kind === step.kind);
  return move ? move.tex : '';
}

/**
 * The chain as TeX, in the order it was done: 'Đ_Ox → T_u, u = (2; 0)'.
 * @param {Step[]} steps
 */
export function chainTex(steps) {
  return steps.length ? steps.map(stepTex).join(' \\;\\to\\; ') : '\\text{(chưa có bước nào)}';
}

/** The triangle every puzzle starts from. @type {Pt[]} */
export const START = [
  { x: 1, y: 1 },
  { x: 4, y: 1 },
  { x: 1, y: 3 },
];

/**
 * @typedef {{ target: Pt[], hint: string }} Puzzle
 */

/**
 * Puzzles: each target is the start triangle moved by a short chain, which
 * the hint suggests.
 * @type {Puzzle[]}
 */
export const PUZZLES = [
  {
    target: [
      { x: -4, y: -4 },
      { x: -1, y: -4 },
      { x: -4, y: -2 },
    ],
    hint: "Hai tam giác cùng hướng: một phép tịnh tiến là đủ. Vectơ tịnh tiến bằng $\\overrightarrow{AA'}$.",
  },
  {
    target: [
      { x: -1, y: -3 },
      { x: -4, y: -3 },
      { x: -1, y: -1 },
    ],
    hint: 'Tam giác đích bị "lật" trái sang phải: thử đối xứng trục $Oy$ trước, rồi tịnh tiến.',
  },
  {
    target: [
      { x: 0, y: -4 },
      { x: 0, y: -1 },
      { x: -2, y: -4 },
    ],
    hint: 'Cạnh $AB$ nằm ngang, cạnh tương ứng của tam giác đích thẳng đứng: thử quay $90^\\circ$ quanh $O$, rồi tịnh tiến.',
  },
  {
    target: [
      { x: 1, y: -1 },
      { x: -2, y: -1 },
      { x: 1, y: -3 },
    ],
    hint: 'Tam giác đích "lộn ngược" và quay nửa vòng: thử đối xứng tâm $O$, rồi tịnh tiến.',
  },
  {
    target: [
      { x: 1, y: 1 },
      { x: 1, y: 4 },
      { x: 3, y: 1 },
    ],
    hint: 'Tam giác đích chung đỉnh $A(1;\\ 1)$ với tam giác ban đầu, có đường thẳng $y = x$ làm "gương". Thử đối xứng trục $Ox$ rồi quay $90^\\circ$ quanh $O$.',
  },
];

/**
 * Whether the moved triangle lies exactly on the target.
 * @param {Pt[]} current @param {Puzzle} puzzle
 */
export function solved(current, puzzle) {
  return sameFigure(current, puzzle.target);
}

/**
 * The squared side lengths of a triangle, to show they never change.
 * @param {Pt[]} t
 */
export function sideTexts(t) {
  /** @param {Pt} p @param {Pt} q */
  const d2 = (p, q) => (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
  /** @param {number} v */
  const root = (v) => (Number.isInteger(Math.sqrt(v)) ? numTex(Math.sqrt(v)) : `\\sqrt{${v}}`);
  return [root(d2(t[0], t[1])), root(d2(t[1], t[2])), root(d2(t[2], t[0]))];
}
