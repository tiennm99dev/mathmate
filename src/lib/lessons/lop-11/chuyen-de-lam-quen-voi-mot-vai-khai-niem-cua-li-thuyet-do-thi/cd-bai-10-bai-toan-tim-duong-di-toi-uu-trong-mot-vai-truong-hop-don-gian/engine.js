/**
 * The labelling algorithm on a small weighted city map, shown one step at a
 * time: which label becomes permanent, which temporary labels go down, the
 * table of labels and, at the end, the shortest path to a chosen vertex.
 */
import { NAMES, dijkstraSteps, pathTo, walkText, weightOf } from '../_shared/graph.js';

/** @typedef {import('../_shared/graph.js').Edge} Edge */
/** @typedef {import('../_shared/graph.js').DijkstraStep} DijkstraStep */

/** @param {string} list e.g. 'AB AC' @param {number[]} w @returns {Edge[]} */
const E = (list, w) =>
  list.split(' ').map((p, i) => ({ a: p.charCodeAt(0) - 65, b: p.charCodeAt(1) - 65, w: w[i] }));

/** The city map: six places and the roads between them, lengths in km. */
export const CITY = {
  pos: [
    { x: 38, y: 135 },
    { x: 130, y: 42 },
    { x: 130, y: 228 },
    { x: 238, y: 42 },
    { x: 238, y: 228 },
    { x: 325, y: 135 },
  ],
  edges: E('AB AC BC BD CD CE DE DF EF', [4, 2, 1, 5, 8, 10, 2, 6, 3]),
};

/**
 * The state after k steps from `source`: step 0 is the start, where only the
 * source has a (temporary) label 0.
 * @param {DijkstraStep[]} steps @param {number} k @param {number} n @param {number} source
 * @returns {DijkstraStep}
 */
export function stateAt(steps, k, n, source) {
  if (k > 0) return steps[k - 1];
  const label = Array(n).fill(Infinity);
  label[source] = 0;
  return { fixed: -1, label, prev: Array(n).fill(-1), done: Array(n).fill(false), changed: [] };
}

/** @param {number} v */
const num = (v) => (v === Infinity ? '∞' : String(v));

/**
 * The badge by a vertex: its permanent label, its temporary label, or ∞.
 * @param {DijkstraStep} s @param {number} v
 */
export function badgeText(s, v) {
  return s.done[v] ? `l = ${s.label[v]}` : num(s.label[v]);
}

/**
 * What happened at step k, as a sentence (rich text).
 * @param {DijkstraStep[]} steps @param {number} k @param {number} n @param {number} source
 */
export function stepNote(steps, k, n, source) {
  if (k === 0)
    return `Bắt đầu: gán cho ${NAMES[source]} nhãn tạm thời $0$, các đỉnh khác nhãn $\\infty$. Nhấn "Bước tiếp".`;
  const before = stateAt(steps, k - 1, n, source);
  const s = steps[k - 1];
  const v = s.fixed;
  const head = `Bước ${k}: nhãn tạm thời nhỏ nhất là của ${NAMES[v]}, nên ${NAMES[v]} nhận nhãn vĩnh viễn $l(${NAMES[v]}) = ${s.label[v]}$.`;
  const updates = s.changed.map(
    (u) =>
      `${NAMES[u]}: $${before.label[u] === Infinity ? '\\infty' : before.label[u]} \\to ${s.label[v]} + ${weightOf(CITY.edges, v, u)} = ${s.label[u]}$`,
  );
  const tail = updates.length
    ? ` Cập nhật nhãn các đỉnh kề chưa chốt: ${updates.join('; ')}.`
    : ' Không nhãn tạm thời nào giảm được.';
  const end = k === steps.length ? ' Mọi đỉnh đã có nhãn vĩnh viễn: thuật toán dừng.' : '';
  return head + tail + end;
}

/**
 * The rows of the labels table, one per step: each cell is the label of a
 * vertex after that step, with the vertex it came from; a permanent label is
 * marked when it is fixed and left empty afterwards.
 * @param {DijkstraStep[]} steps @param {number} k @param {number} n @param {number} source
 * @returns {Array<{ step: string, cells: Array<{ text: string, fixed: boolean }> }>}
 */
export function tableRows(steps, k, n, source) {
  const rows = [];
  for (let j = 0; j <= k; j++) {
    const s = stateAt(steps, j, n, source);
    const was = j > 0 ? stateAt(steps, j - 1, n, source).done : Array(n).fill(false);
    rows.push({
      step: j === 0 ? 'Đầu' : String(j),
      cells: s.label.map((l, v) => {
        if (was[v]) return { text: '', fixed: false };
        const from = s.prev[v] === -1 ? '' : ` (${NAMES[s.prev[v]]})`;
        return { text: num(l) + (l === Infinity ? '' : from), fixed: s.fixed === v };
      }),
    });
  }
  return rows;
}

/**
 * The shortest path to `target` once its label is permanent, with its length
 * written as a sum.
 * @param {DijkstraStep} s @param {number} source @param {number} target
 */
export function routeText(s, source, target) {
  if (!s.done[target]) return null;
  const path = /** @type {number[]} */ (pathTo(s.prev, target, source));
  if (path.length === 1) return { path, text: `${NAMES[target]} là điểm xuất phát.` };
  const parts = path.slice(1).map((v, i) => weightOf(CITY.edges, path[i], v));
  return {
    path,
    text: `Đường đi ngắn nhất từ ${NAMES[source]} đến ${NAMES[target]} là $${walkText(path)}$, dài $${parts.join(' + ')} = ${s.label[target]}$ km. Đọc ngược nhãn: mỗi đỉnh ghi lại đỉnh đã cho nó nhãn.`,
  };
}

/** The labelling run from a source on the city map. @param {number} source */
export function runFrom(source) {
  return dijkstraSteps(CITY.pos.length, CITY.edges, source);
}
