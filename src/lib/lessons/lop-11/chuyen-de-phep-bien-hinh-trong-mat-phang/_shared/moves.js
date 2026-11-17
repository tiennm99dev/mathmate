/**
 * Named transformations of the chapter, all about the origin O except the
 * translation, so a chain of them can be applied, written in TeX and in plain
 * text, and scored by its similarity ratio. Used by the puzzles that move one
 * figure onto another.
 */
import {
  AXIS_TEX,
  AXIS_TEXT,
  halfTurn,
  homothety,
  ptTex,
  ptText,
  ratioTex,
  ratioText,
  reflect,
  rotate,
  sameFigure,
  translate,
} from './transform.js';
import { MINUS } from '#lib/core/number-format.js';

/** @typedef {import('./transform.js').Pt} Pt */
/**
 * @typedef {{ kind: 't', u: Pt }
 *   | { kind: 'axis', axis: import('./transform.js').Axis }
 *   | { kind: 'rot', deg: number }
 *   | { kind: 'half' }
 *   | { kind: 'hom', k: number }} Move
 */

const O = { x: 0, y: 0 };

/**
 * The image of one point under one move.
 * @param {Pt} p @param {Move} m @returns {Pt}
 */
export function applyMove(p, m) {
  switch (m.kind) {
    case 't':
      return translate(p, m.u);
    case 'axis':
      return reflect(p, m.axis);
    case 'rot':
      return rotate(p, O, m.deg);
    case 'half':
      return halfTurn(p, O);
    default:
      return homothety(p, O, m.k);
  }
}

/**
 * A figure after a chain of moves, done in order.
 * @param {Pt[]} points @param {Move[]} moves
 */
export function applyChain(points, moves) {
  return points.map((p) => moves.reduce(applyMove, p));
}

/**
 * Whether a figure, moved by the chain, lands exactly on the target.
 * @param {Pt[]} points @param {Move[]} moves @param {Pt[]} target
 */
export function lands(points, moves, target) {
  return sameFigure(applyChain(points, moves), target);
}

/**
 * The similarity ratio of a chain: the product of |k| over its homotheties
 * (every other move keeps distances).
 * @param {Move[]} moves
 */
export function chainRatio(moves) {
  return moves.reduce((r, m) => (m.kind === 'hom' ? r * Math.abs(m.k) : r), 1);
}

/**
 * One move as TeX, the book's notation.
 * @param {Move} m
 */
export function moveTex(m) {
  switch (m.kind) {
    case 't':
      return `T_{\\vec u},\\ \\vec u = ${ptTex(m.u)}`;
    case 'axis':
      return m.axis === 'Ox' || m.axis === 'Oy'
        ? `\\text{Đ}_{${m.axis}}`
        : `\\text{Đ}_d\\ (d: ${AXIS_TEX[m.axis]})`;
    case 'rot':
      return `Q_{(O,\\ ${m.deg}^\\circ)}`;
    case 'half':
      return '\\text{Đ}_O';
    default:
      return `V_{(O,\\ ${ratioTex(m.k)})}`;
  }
}

/**
 * One move in words, for buttons and screen readers.
 * @param {Move} m
 */
export function moveText(m) {
  switch (m.kind) {
    case 't':
      return `Tịnh tiến theo u = ${ptText(m.u)}`;
    case 'axis':
      return m.axis === 'Ox' || m.axis === 'Oy'
        ? `Đối xứng trục ${m.axis}`
        : `Đối xứng qua đường thẳng ${AXIS_TEXT[m.axis]}`;
    case 'rot':
      return `Quay ${m.deg < 0 ? MINUS : ''}${Math.abs(m.deg)}° quanh O`;
    case 'half':
      return 'Đối xứng tâm O';
    default:
      return `Vị tự tâm O, tỉ số ${ratioText(m.k)}`;
  }
}

/**
 * The chain as TeX, in the order it was done.
 * @param {Move[]} moves
 */
export function chainTex(moves) {
  return moves.length ? moves.map(moveTex).join(' \\;\\to\\; ') : '\\text{(chưa có bước nào)}';
}
