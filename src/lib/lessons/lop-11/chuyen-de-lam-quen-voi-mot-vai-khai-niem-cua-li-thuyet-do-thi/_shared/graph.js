/**
 * Graph helpers shared by the lessons of the topic "Làm quen với một vài khái
 * niệm của lí thuyết đồ thị". A graph is a vertex count `n` and a list of
 * edges `{ a, b, w? }` between vertex indices; parallel edges are allowed (a
 * multigraph, as in the Königsberg bridges) and a loop `a === b` counts twice
 * in the degree. Vertex `i` is named `names[i]` in every text.
 */

/** @typedef {{ a: number, b: number, w?: number }} Edge */

/** The vertex names the lessons use. */
export const NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

/**
 * The degree of every vertex: the number of edge ends at it, a loop counting 2.
 * @param {number} n @param {Edge[]} edges
 */
export function degrees(n, edges) {
  const deg = Array(n).fill(0);
  for (const { a, b } of edges) {
    deg[a] += 1;
    deg[b] += 1;
  }
  return deg;
}

/**
 * The vertices of odd degree.
 * @param {number} n @param {Edge[]} edges
 */
export function oddVertices(n, edges) {
  return degrees(n, edges).flatMap((d, i) => (d % 2 === 1 ? [i] : []));
}

/**
 * The connected component of every vertex, numbered 0, 1, ... in order of
 * their first vertex.
 * @param {number} n @param {Edge[]} edges
 * @returns {number[]}
 */
export function components(n, edges) {
  const comp = Array(n).fill(-1);
  let next = 0;
  for (let s = 0; s < n; s++) {
    if (comp[s] !== -1) continue;
    comp[s] = next;
    const stack = [s];
    while (stack.length) {
      const v = /** @type {number} */ (stack.pop());
      for (const { a, b } of edges) {
        const u = a === v ? b : b === v ? a : -1;
        if (u !== -1 && comp[u] === -1) {
          comp[u] = next;
          stack.push(u);
        }
      }
    }
    next += 1;
  }
  return comp;
}

/**
 * The components as lists of vertices.
 * @param {number} n @param {Edge[]} edges
 * @returns {number[][]}
 */
export function componentLists(n, edges) {
  const comp = components(n, edges);
  /** @type {number[][]} */
  const lists = [];
  comp.forEach((c, v) => (lists[c] ??= []).push(v));
  return lists;
}

/**
 * Whether any two vertices are joined by a path.
 * @param {number} n @param {Edge[]} edges
 */
export function isConnected(n, edges) {
  return n > 0 && components(n, edges).every((c) => c === 0);
}

/**
 * Whether the graph is simple: no loop and no two edges on the same pair.
 * @param {Edge[]} edges
 */
export function isSimple(edges) {
  const seen = new Set();
  for (const { a, b } of edges) {
    if (a === b) return false;
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (seen.has(key)) return false;
    seen.add(key);
  }
  return true;
}

/**
 * An elementary cycle of a simple graph as a vertex list that ends where it
 * starts (A, B, C, A), or null when the graph has none. Edges are added to a
 * spanning forest one by one; the first edge whose ends are already joined
 * closes a cycle with the forest path between them.
 * @param {number} n @param {Edge[]} edges
 * @returns {number[] | null}
 */
export function findCycle(n, edges) {
  /** @type {Edge[]} */
  const forest = [];
  for (const e of edges) {
    if (e.a === e.b) return [e.a, e.a];
    const path = forestPath(n, forest, e.a, e.b);
    if (path) return [...path, e.a];
    forest.push(e);
  }
  return null;
}

/**
 * The path from u to v in a forest, or null when they are apart.
 * @param {number} n @param {Edge[]} forest @param {number} u @param {number} v
 * @returns {number[] | null}
 */
function forestPath(n, forest, u, v) {
  const prev = Array(n).fill(-2);
  prev[u] = -1;
  const queue = [u];
  while (queue.length) {
    const x = /** @type {number} */ (queue.shift());
    for (const { a, b } of forest) {
      const y = a === x ? b : b === x ? a : -1;
      if (y !== -1 && prev[y] === -2) {
        prev[y] = x;
        queue.push(y);
      }
    }
  }
  if (prev[v] === -2) return null;
  const path = [v];
  for (let x = v; prev[x] !== -1;) path.push((x = prev[x]));
  return path.reverse();
}

/**
 * What Euler's theorem says about a graph: 'cycle' when it is connected and
 * every degree is even, 'path' when it is connected with exactly two odd
 * vertices, 'none' otherwise.
 * @param {number} n @param {Edge[]} edges
 * @returns {'cycle' | 'path' | 'none'}
 */
export function eulerKind(n, edges) {
  if (!isConnected(n, edges)) return 'none';
  const odd = oddVertices(n, edges).length;
  return odd === 0 ? 'cycle' : odd === 2 ? 'path' : 'none';
}

/**
 * An Euler trail (Hierholzer's method) from `start` as a vertex list, or null
 * when the graph has none from there.
 * @param {number} n @param {Edge[]} edges @param {number} [start]
 * @returns {number[] | null}
 */
export function eulerTrail(n, edges, start) {
  const kind = eulerKind(n, edges);
  if (kind === 'none') return null;
  const odd = oddVertices(n, edges);
  const s = start ?? (kind === 'path' ? odd[0] : 0);
  if (kind === 'path' && !odd.includes(s)) return null;
  const used = Array(edges.length).fill(false);
  const stack = [s];
  /** @type {number[]} */
  const out = [];
  while (stack.length) {
    const v = stack[stack.length - 1];
    const i = edges.findIndex((e, k) => !used[k] && (e.a === v || e.b === v));
    if (i === -1) {
      out.push(/** @type {number} */ (stack.pop()));
    } else {
      used[i] = true;
      stack.push(edges[i].a === v ? edges[i].b : edges[i].a);
    }
  }
  return out.reverse();
}

/**
 * Whether two vertices are adjacent.
 * @param {Edge[]} edges @param {number} u @param {number} v
 */
export function adjacent(edges, u, v) {
  return edges.some((e) => (e.a === u && e.b === v) || (e.a === v && e.b === u));
}

/**
 * A Hamilton cycle (closed: last vertex repeats the first) or, when `closed`
 * is false, a Hamilton path, found by trying every order; null when none.
 * Meant for the small graphs of the lessons (at most 8 vertices).
 * @param {number} n @param {Edge[]} edges @param {boolean} closed
 * @returns {number[] | null}
 */
export function hamilton(n, edges, closed) {
  const seen = Array(n).fill(false);
  /** @type {number[]} */
  const path = [];
  /** @returns {boolean} */
  const grow = () => {
    if (path.length === n) return !closed || adjacent(edges, path[n - 1], path[0]);
    for (let v = 0; v < n; v++) {
      if (seen[v] || (path.length && !adjacent(edges, path[path.length - 1], v))) continue;
      seen[v] = true;
      path.push(v);
      if (grow()) return true;
      path.pop();
      seen[v] = false;
    }
    return false;
  };
  for (let s = 0; s < (closed ? 1 : n); s++) {
    seen[s] = true;
    path.push(s);
    if (grow()) return closed ? [...path, path[0]] : path;
    path.pop();
    seen[s] = false;
  }
  return null;
}

/**
 * A vertex list written the book's way, with no separator: ABCDA.
 * @param {number[]} walk @param {readonly string[]} [names]
 */
export function walkText(walk, names = NAMES) {
  return walk.map((v) => names[v]).join('');
}

/**
 * The weight of the lightest edge between u and v (Infinity when none).
 * @param {Edge[]} edges @param {number} u @param {number} v
 */
export function weightOf(edges, u, v) {
  let best = Infinity;
  for (const e of edges) {
    if ((e.a === u && e.b === v) || (e.a === v && e.b === u)) best = Math.min(best, e.w ?? 1);
  }
  return best;
}

/**
 * The total weight of a walk.
 * @param {Edge[]} edges @param {number[]} walk
 */
export function walkLength(edges, walk) {
  let sum = 0;
  for (let i = 1; i < walk.length; i++) sum += weightOf(edges, walk[i - 1], walk[i]);
  return sum;
}

/**
 * @typedef {object} DijkstraStep
 * @property {number} fixed the vertex whose label became permanent at this step
 * @property {number[]} label the labels after the step (Infinity: none yet)
 * @property {number[]} prev the vertex each label came from (-1: none)
 * @property {boolean[]} done which labels are permanent
 * @property {number[]} changed the vertices whose temporary label went down
 */

/**
 * The labelling (Dijkstra) algorithm step by step: each step makes the
 * smallest temporary label permanent and updates the labels of the vertex's
 * neighbours. Ties go to the vertex that comes first by name.
 * @param {number} n @param {Edge[]} edges @param {number} source
 * @returns {DijkstraStep[]}
 */
export function dijkstraSteps(n, edges, source) {
  const label = Array(n).fill(Infinity);
  const prev = Array(n).fill(-1);
  const done = Array(n).fill(false);
  label[source] = 0;
  /** @type {DijkstraStep[]} */
  const steps = [];
  for (;;) {
    let v = -1;
    for (let u = 0; u < n; u++) {
      if (!done[u] && label[u] < Infinity && (v === -1 || label[u] < label[v])) v = u;
    }
    if (v === -1) break;
    done[v] = true;
    /** @type {number[]} */
    const changed = [];
    for (const e of edges) {
      const u = e.a === v ? e.b : e.b === v ? e.a : -1;
      if (u === -1 || done[u]) continue;
      const via = label[v] + (e.w ?? 1);
      if (via < label[u]) {
        label[u] = via;
        prev[u] = v;
        if (!changed.includes(u)) changed.push(u);
      }
    }
    steps.push({ fixed: v, label: [...label], prev: [...prev], done: [...done], changed });
  }
  return steps;
}

/**
 * The shortest path to `target` read back from the `prev` links, from the
 * source to the target; null when the target was never reached.
 * @param {number[]} prev @param {number} target @param {number} source
 * @returns {number[] | null}
 */
export function pathTo(prev, target, source) {
  /** @type {number[]} */
  const path = [target];
  let v = target;
  while (v !== source) {
    v = prev[v];
    if (v === -1) return null;
    path.push(v);
  }
  return path.reverse();
}

/**
 * The shortest distance and one shortest path between two vertices.
 * @param {number} n @param {Edge[]} edges @param {number} from @param {number} to
 */
export function shortest(n, edges, from, to) {
  const steps = dijkstraSteps(n, edges, from);
  const last = steps[steps.length - 1];
  return { length: last.label[to], path: pathTo(last.prev, to, from) };
}

/**
 * The postman tour when the graph is connected with no or two odd vertices:
 * every edge once, plus the shortest way back between the two odd vertices.
 * @param {number} n @param {Edge[]} edges
 * @returns {{ total: number, euler: number[], back: number[], extra: number } | null}
 */
export function postman(n, edges) {
  const kind = eulerKind(n, edges);
  if (kind === 'none') return null;
  const euler = /** @type {number[]} */ (eulerTrail(n, edges));
  const total = edges.reduce((s, e) => s + (e.w ?? 1), 0);
  if (kind === 'cycle') return { total, euler, back: [], extra: 0 };
  const end = euler[euler.length - 1];
  const { length, path } = shortest(n, edges, end, euler[0]);
  return { total: total + length, euler, back: path ?? [], extra: length };
}
