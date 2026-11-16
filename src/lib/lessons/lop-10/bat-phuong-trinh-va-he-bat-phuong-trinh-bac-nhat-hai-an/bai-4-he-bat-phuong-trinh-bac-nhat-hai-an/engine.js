/**
 * Logic of the system widget: preset systems, naming the vertices of the
 * solution polygon and reading where the level line F = k meets it.
 */
import { formatNumber, tidy } from '#lib/core/number-format.js';
import { namedRegion, optimize, pointText } from '../_shared/half-plane.js';

/**
 * @typedef {import('../_shared/half-plane.js').Ineq} Ineq
 * @typedef {import('../_shared/half-plane.js').Pt} Pt
 * @typedef {{ name: string, items: { ineq: Ineq, color: string }[], p: number, q: number }} Preset
 */

/** The drawing box shared by every preset. */
export const BOX = { xMin: -3, xMax: 8, yMin: -2, yMax: 7 };

const COLORS = ['#0f766e', '#4f46e5', '#be123c', '#0369a1'];

/**
 * @param {[number, number, number, import('../_shared/half-plane.js').Op][]} rows
 * @returns {{ ineq: Ineq, color: string }[]}
 */
const items = (rows) =>
  rows.map(([a, b, c, op], i) => ({ ineq: { a, b, c, op }, color: COLORS[i] }));

/** @type {Preset[]} */
export const PRESETS = [
  {
    name: 'Tứ giác OABC',
    items: items([
      [1, 0, 0, '>='],
      [0, 1, 0, '>='],
      [1, 1, 5, '<='],
      [1, 2, 8, '<='],
    ]),
    p: 3,
    q: 4,
  },
  {
    name: 'Tứ giác ABCD',
    items: items([
      [1, 0, 1, '>='],
      [0, 1, 1, '>='],
      [1, 1, 6, '<='],
      [2, -1, 6, '<='],
    ]),
    p: 1,
    q: -1,
  },
  {
    name: 'Tam giác ABC',
    items: items([
      [0, 1, 0, '>='],
      [1, 0, 4, '<='],
      [1, -2, -2, '>='],
    ]),
    p: 1,
    q: 2,
  },
];

/**
 * The named vertices of a system's solution polygon in the shared box.
 * @param {Ineq[]} system
 */
export const namedVertices = (system) => namedRegion(system, BOX);

/**
 * The range of the level-line slider: F over the corners of the box,
 * rounded outwards to half units.
 * @param {number} p @param {number} q
 */
export function levelRange(p, q) {
  const corners = [
    p * BOX.xMin + q * BOX.yMin,
    p * BOX.xMax + q * BOX.yMin,
    p * BOX.xMin + q * BOX.yMax,
    p * BOX.xMax + q * BOX.yMax,
  ];
  return {
    min: Math.floor(Math.min(...corners) * 2) / 2,
    max: Math.ceil(Math.max(...corners) * 2) / 2,
  };
}

/**
 * Where the level line F = k stands against the polygon, as feedback.
 * @param {{ name: string, pt: Pt }[]} vertices @param {number} p @param {number} q @param {number} k
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function levelVerdict(vertices, p, q, k) {
  if (p === 0 && q === 0) return { tone: 'warn', text: 'Hãy chọn p ≠ 0 hoặc q ≠ 0.' };
  if (vertices.length === 0) return { tone: 'warn', text: 'Hệ không có nghiệm trong khung hình.' };
  const best = optimize(
    vertices.map((v) => v.pt),
    p,
    q,
  );
  const value = formatNumber(tidy(k));
  const at = (/** @type {number[]} */ idx) =>
    idx.map((i) => `${vertices[i].name}${pointText(vertices[i].pt)}`).join(' và ');
  // A level line parallel to an edge leaves the polygon along that whole edge.
  const touch = (/** @type {number[]} */ idx) =>
    idx.length > 1
      ? `chỉ còn chạm miền nghiệm dọc cạnh nối ${at(idx)} (mọi điểm của cạnh này)`
      : `chỉ còn chạm miền nghiệm tại ${at(idx)}`;
  const near = (/** @type {number} */ a, /** @type {number} */ b) => Math.abs(a - b) < 1e-7;
  if (near(k, best.max)) {
    return {
      tone: 'ok',
      text: `Đường mức F = ${value} ${touch(best.argMax)}: F lớn nhất bằng ${value}.`,
    };
  }
  if (near(k, best.min)) {
    return {
      tone: 'ok',
      text: `Đường mức F = ${value} ${touch(best.argMin)}: F nhỏ nhất bằng ${value}.`,
    };
  }
  if (k > best.max || k < best.min) {
    return {
      tone: 'info',
      text: `Đường mức F = ${value} không cắt miền nghiệm: không có điểm nào của miền làm F = ${value}.`,
    };
  }
  return {
    tone: 'info',
    text: `Đường mức F = ${value} cắt miền nghiệm. Kéo tiếp: điểm cuối cùng nó chạm khi rời miền là một đỉnh.`,
  };
}
