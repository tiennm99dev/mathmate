/**
 * Practice on random graphs: a seeded connected weighted graph, the question
 * whether it has an Euler cycle, an Euler path or neither, and the length of
 * the shortest path between its first and last vertices, each checked with a
 * worked solution.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { readNatural } from '#lib/core/number-format.js';
import {
  NAMES,
  degrees,
  eulerKind,
  eulerTrail,
  oddVertices,
  shortest,
  walkText,
  weightOf,
} from '../_shared/graph.js';

/** @typedef {import('../_shared/graph.js').Edge} Edge */
/** @typedef {{ n: number, edges: Edge[] }} Graph */
/** @typedef {'cycle' | 'path' | 'none'} Kind */

/** The three answers to the Euler question, in the order shown. @type {Array<{ value: Kind, label: string }>} */
export const KINDS = [
  { value: 'cycle', label: 'Có chu trình Euler' },
  { value: 'path', label: 'Có đường đi Euler, không có chu trình Euler' },
  { value: 'none', label: 'Không có đường đi Euler' },
];

/**
 * One random connected simple graph with 5 or 6 vertices and weights 1 to 9.
 * @param {() => number} rand @returns {Graph}
 */
function draw(rand) {
  const n = int(rand, 5, 6);
  const order = shuffle(rand, [...Array(n).keys()]);
  /** @type {Edge[]} */
  const edges = [];
  const has = (/** @type {number} */ a, /** @type {number} */ b) =>
    edges.some((e) => (e.a === a && e.b === b) || (e.a === b && e.b === a));
  // A random spanning tree keeps the graph connected.
  for (let i = 1; i < n; i++) {
    const a = order[i];
    const b = order[int(rand, 0, i - 1)];
    edges.push({ a: Math.min(a, b), b: Math.max(a, b), w: int(rand, 1, 9) });
  }
  const extra = int(rand, 2, 4);
  for (let tries = 0; edges.length < n - 1 + extra && tries < 50; tries++) {
    const a = int(rand, 0, n - 1);
    const b = int(rand, 0, n - 1);
    if (a !== b && !has(a, b))
      edges.push({ a: Math.min(a, b), b: Math.max(a, b), w: int(rand, 1, 9) });
  }
  return { n, edges };
}

/**
 * The graph for a seed: the Euler answer is chosen first so the three answers
 * come up about equally often.
 * @param {number} seed @returns {Graph}
 */
export function makeGraph(seed) {
  const rand = rng(seed);
  const want = pick(rand, /** @type {Kind[]} */ (['cycle', 'path', 'none']));
  let g = draw(rand);
  for (let i = 0; i < 300 && !(readable(g) && eulerKind(g.n, g.edges) === want); i++)
    g = draw(rand);
  return g;
}

/**
 * Whether the drawing stays readable: on six vertices round a ring, at most
 * one edge joins opposite vertices, so no two weights meet in the middle.
 * @param {Graph} g
 */
export function readable(g) {
  return g.n !== 6 || g.edges.filter((e) => e.b - e.a === 3).length <= 1;
}

/**
 * The worked answer to the Euler question.
 * @param {Graph} g
 */
export function eulerSolution(g) {
  const deg = degrees(g.n, g.edges);
  const odd = oddVertices(g.n, g.edges);
  const degText = deg.map((d, v) => `\\deg(${NAMES[v]}) = ${d}`).join(',\\ ');
  const kind = eulerKind(g.n, g.edges);
  const tail =
    kind === 'cycle'
      ? `Đồ thị liên thông, mọi đỉnh bậc chẵn nên có chu trình Euler, ví dụ $${walkText(/** @type {number[]} */ (eulerTrail(g.n, g.edges, 0)))}$.`
      : kind === 'path'
        ? `Đồ thị liên thông, có đúng hai đỉnh bậc lẻ ${NAMES[odd[0]]} và ${NAMES[odd[1]]}, nên có đường đi Euler từ ${NAMES[odd[0]]} đến ${NAMES[odd[1]]}, ví dụ $${walkText(/** @type {number[]} */ (eulerTrail(g.n, g.edges)))}$, nhưng không có chu trình Euler.`
        : `Có ${odd.length} đỉnh bậc lẻ (${odd.map((v) => NAMES[v]).join(', ')}), nhiều hơn hai, nên không có đường đi Euler.`;
  return `$${degText}$. ${tail}`;
}

/**
 * Checks a choice for the Euler question.
 * @param {Graph} g @param {Kind} choice
 */
export function checkEuler(g, choice) {
  const right = eulerKind(g.n, g.edges);
  return {
    ok: choice === right,
    text: (choice === right ? 'Đúng! ' : 'Chưa đúng. ') + eulerSolution(g),
  };
}

/** The last vertex, the target of the shortest-path question. @param {Graph} g */
export const targetOf = (g) => g.n - 1;

/**
 * The worked answer to the shortest path question, from A to the last vertex.
 * @param {Graph} g
 */
export function distanceSolution(g) {
  const t = targetOf(g);
  const { length, path } = shortest(g.n, g.edges, 0, t);
  const p = /** @type {number[]} */ (path);
  const parts = p.slice(1).map((v, i) => weightOf(g.edges, p[i], v));
  return {
    length,
    text: `Chạy thuật toán gắn nhãn từ A: $l(${NAMES[t]}) = ${length}$. Đường đi ngắn nhất là $${walkText(p)}$, dài $${parts.join(' + ')} = ${length}$.`,
  };
}

/**
 * Checks a typed length; null when the text is not a whole number.
 * @param {Graph} g @param {string} text
 */
export function checkDistance(g, text) {
  const value = readNatural(text);
  if (value === null) return null;
  const sol = distanceSolution(g);
  const ok = value === sol.length;
  return {
    ok,
    text: ok ? `Đúng! ${sol.text}` : `Chưa đúng (em nhập ${value}). ${sol.text}`,
  };
}
