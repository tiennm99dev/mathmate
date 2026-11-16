/**
 * The lesson on parallelograms and rhombuses: a quadrilateral ABCD whose
 * corners the child drags on a grid. Its opposite sides are checked for
 * being parallel and equal, exactly, since the corners are grid points:
 * two pairs of parallel and equal opposite sides make a parallelogram, and
 * four equal sides on top of that make a rhombus. Pure and DOM-free.
 *
 * @typedef {import('../_shared/lines.js').Pt} Pt
 * @typedef {'loi' | 'thoi' | 'binh-hanh' | 'mot-cap' | 'tu-giac'} Kind
 * @typedef {{ A: Pt, B: Pt, C: Pt, D: Pt }} Quad
 */
import { cross } from '#lib/geom-engine/plane.js';
import { snapToGrid } from '../_shared/lines.js';

export const GRID = 20;
export const W = 400;
export const H = 300;

/** @param {Pt} p */
export const snapPoint = (p) => snapToGrid(p, GRID, W, H);

/** @param {Pt} P @param {Pt} Q */
const vec = (P, Q) => ({ x: Q.x - P.x, y: Q.y - P.y });
/** @param {Pt} u @param {Pt} v */
const det = (u, v) => u.x * v.y - u.y * v.x;
/** @param {Pt} u @param {Pt} v */
const dot = (u, v) => u.x * v.x + u.y * v.y;

/**
 * The facts of quadrilateral ABCD: which pairs of opposite sides are
 * parallel or equal, whether it is a proper (convex) quadrilateral, whether
 * angle A is right and whether the diagonals are perpendicular.
 * @param {Quad} q
 */
export function factsOf(q) {
  const { A, B, C, D } = q;
  const ab = vec(A, B);
  const dc = vec(D, C);
  const ad = vec(A, D);
  const bc = vec(B, C);
  const turns = [cross(A, B, C), cross(B, C, D), cross(C, D, A), cross(D, A, B)];
  const convex = turns.every((t) => t > 0) || turns.every((t) => t < 0);
  const sq = [ab, bc, dc, ad].map((v) => dot(v, v));
  return {
    convex,
    abDc: det(ab, dc) === 0,
    adBc: det(ad, bc) === 0,
    abEqDc: sq[0] === sq[2],
    adEqBc: sq[3] === sq[1],
    allEqual: sq.every((v) => v === sq[0]),
    rightA: dot(ab, ad) === 0,
    diagonalsRight: dot(vec(A, C), vec(B, D)) === 0,
  };
}

/**
 * What kind of quadrilateral ABCD is.
 * @param {ReturnType<typeof factsOf>} f
 * @returns {Kind}
 */
export function kindOf(f) {
  if (!f.convex) return 'loi';
  if (f.abDc && f.adBc) return f.allEqual ? 'thoi' : 'binh-hanh';
  return f.abDc || f.adBc ? 'mot-cap' : 'tu-giac';
}

/**
 * What the child hears about the shape.
 * @param {ReturnType<typeof factsOf>} f
 */
export function shapeText(f) {
  switch (kindOf(f)) {
    case 'loi':
      return 'Hình ABCD đang bị lõm, bị bẹt hoặc có hai cạnh cắt nhau. Em kéo lại các đỉnh nhé.';
    case 'thoi':
      return `Hình thoi ABCD: AB song song với DC, AD song song với BC, bốn cạnh bằng nhau.${f.rightA ? ' Hình này còn là hình vuông.' : ''}`;
    case 'binh-hanh':
      return `Hình bình hành ABCD: AB song song và bằng DC, AD song song và bằng BC.${f.rightA ? ' Hình này còn là hình chữ nhật.' : ''}`;
    case 'mot-cap':
      return `Tứ giác ABCD chỉ có một cặp cạnh đối diện song song (${f.abDc ? 'AB và DC' : 'AD và BC'}). Chưa phải hình bình hành.`;
    default:
      return 'Tứ giác ABCD chưa có cặp cạnh đối diện nào song song.';
  }
}

/** The shapes the child is asked to make, in turn. */
export const GOALS = /** @type {const} */ (['binh-hanh', 'thoi', 'binh-hanh', 'thoi']);

/** @type {Record<(typeof GOALS)[number], string>} */
export const GOAL_NAME = { 'binh-hanh': 'hình bình hành', thoi: 'hình thoi' };

/**
 * Whether the shape is what was asked, with a word on what is still
 * missing. A rhombus has every feature of a parallelogram, so it counts.
 * @param {ReturnType<typeof factsOf>} f @param {(typeof GOALS)[number]} goal
 * @returns {{ done: boolean, text: string }}
 */
export function goalMessage(f, goal) {
  const kind = kindOf(f);
  if (kind === 'loi') return { done: false, text: shapeText(f) };
  if (goal === 'binh-hanh') {
    if (kind === 'binh-hanh') return { done: true, text: `Đúng rồi! ${shapeText(f)}` };
    if (kind === 'thoi')
      return {
        done: true,
        text: `Đúng rồi! ${shapeText(f)} Hình thoi cũng có hai cặp cạnh đối diện song song và bằng nhau.`,
      };
    return {
      done: false,
      text: `${shapeText(f)} Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.`,
    };
  }
  if (kind === 'thoi') return { done: true, text: `Đúng rồi! ${shapeText(f)}` };
  if (kind === 'binh-hanh')
    return {
      done: false,
      text: `${shapeText(f)} Hình thoi còn cần bốn cạnh bằng nhau: em kéo dài hoặc thu ngắn một cạnh.`,
    };
  return {
    done: false,
    text: `${shapeText(f)} Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.`,
  };
}

/**
 * What the two diagonals show.
 * @param {ReturnType<typeof factsOf>} f
 */
export function diagonalText(f) {
  if (!f.convex) return '';
  return f.diagonalsRight
    ? 'Hai đường chéo AC và BD vuông góc với nhau.'
    : 'Hai đường chéo AC và BD không vuông góc với nhau.';
}

/** The starting shape: no pair of opposite sides is parallel. */
export const START = /** @type {Quad} */ ({
  A: { x: 80, y: 220 },
  B: { x: 280, y: 240 },
  C: { x: 340, y: 80 },
  D: { x: 120, y: 60 },
});
