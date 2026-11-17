/**
 * The graph drawing board: tap two vertices to add or remove the edge between
 * them, and read the degrees, the handshake sum, the connected components and
 * a cycle when there is one.
 */
import {
  NAMES,
  componentLists,
  degrees,
  findCycle,
  oddVertices,
  walkText,
} from '../_shared/graph.js';

/** @typedef {import('../_shared/graph.js').Edge} Edge */

/** Fewest and most vertices on the board. */
export const MIN_N = 2;
export const MAX_N = 7;

/** The board at the start: a triangle, an edge and a lone vertex. @type {Edge[]} */
export const START = [
  { a: 0, b: 1 },
  { a: 1, b: 2 },
  { a: 2, b: 0 },
  { a: 3, b: 4 },
];

/**
 * The edges after adding uv, or removing it when it is already there. The
 * board draws simple graphs only, so u = v changes nothing.
 * @param {Edge[]} edges @param {number} u @param {number} v
 */
export function toggleEdge(edges, u, v) {
  if (u === v) return edges;
  const k = edges.findIndex((e) => (e.a === u && e.b === v) || (e.a === v && e.b === u));
  if (k !== -1) return edges.filter((_, i) => i !== k);
  return [...edges, { a: Math.min(u, v), b: Math.max(u, v) }];
}

/**
 * The edges that stay when the board keeps only the first n vertices.
 * @param {Edge[]} edges @param {number} n
 */
export function keepVertices(edges, n) {
  return edges.filter((e) => e.a < n && e.b < n);
}

/**
 * Every pair of the n vertices joined: the complete graph.
 * @param {number} n @returns {Edge[]}
 */
export function completeEdges(n) {
  /** @type {Edge[]} */
  const out = [];
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) out.push({ a, b });
  return out;
}

/**
 * The handshake line: deg(A) + deg(B) + ... = 2 + 3 + ... = 2 · m.
 * @param {number} n @param {Edge[]} edges
 */
export function handshakeTex(n, edges) {
  const deg = degrees(n, edges);
  const sum = deg.reduce((s, d) => s + d, 0);
  const names = deg.map((_, v) => `\\deg(${NAMES[v]})`).join(' + ');
  return `${names} = ${deg.join(' + ')} = ${sum} = 2 \\cdot ${edges.length}`;
}

/**
 * The sentences under the board: connected or not with its components, the
 * odd vertices, and a cycle.
 * @param {number} n @param {Edge[]} edges
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function boardNote(n, edges) {
  const comps = componentLists(n, edges);
  const odd = oddVertices(n, edges);
  const set = (/** @type {number[]} */ c) => `$\\{${c.map((v) => NAMES[v]).join(', ')}\\}$`;
  const parts = [];
  if (comps.length === 1)
    parts.push('Đồ thị liên thông: hai đỉnh bất kì đều có đường đi nối chúng.');
  else
    parts.push(
      `Đồ thị không liên thông, gồm ${comps.length} thành phần liên thông: ${comps.map(set).join(', ')}.`,
    );
  if (edges.length === (n * (n - 1)) / 2 && n > 1) parts.push(`Đây là đồ thị đầy đủ $K_${n}$.`);
  parts.push(
    odd.length === 0
      ? 'Không có đỉnh bậc lẻ.'
      : `Có ${odd.length} đỉnh bậc lẻ (${odd.map((v) => NAMES[v]).join(', ')}); số đỉnh bậc lẻ luôn là một số chẵn.`,
  );
  const cycle = findCycle(n, edges);
  parts.push(
    cycle ? `Một chu trình sơ cấp: $${walkText(cycle)}$.` : 'Đồ thị không có chu trình nào.',
  );
  return { tone: comps.length === 1 ? 'ok' : 'info', text: parts.join(' ') };
}
