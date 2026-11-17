/**
 * The one-stroke board: trace a walk on a graph by choosing vertices, either
 * through every edge once (Euler) or through every vertex once (Hamilton),
 * with live feedback and what the theorems say about the graph.
 */
import {
  NAMES,
  adjacent,
  degrees,
  eulerKind,
  eulerTrail,
  hamilton,
  isSimple,
  oddVertices,
  walkText,
} from '../_shared/graph.js';

/** @typedef {import('../_shared/graph.js').Edge} Edge */
/** @typedef {{ name: string, pos: Array<{ x: number, y: number }>, edges: Edge[] }} Board */
/** @typedef {'euler' | 'hamilton'} Mode */
/** @typedef {{ walk: number[], used: number[] }} Trace */

/** @param {string} list e.g. 'AB AC' @returns {Edge[]} */
const E = (list) =>
  list.split(' ').map((p) => ({ a: p.charCodeAt(0) - 65, b: p.charCodeAt(1) - 65 }));

/** The graphs on the board, keyed by id. @type {Record<string, Board>} */
export const BOARDS = {
  konigsberg: {
    name: 'Bảy cây cầu',
    pos: [
      { x: 150, y: 135 },
      { x: 175, y: 32 },
      { x: 175, y: 238 },
      { x: 300, y: 135 },
    ],
    edges: E('AB AB AC AC AD BD CD'),
  },
  envelope: {
    name: 'Phong bì',
    pos: [
      { x: 180, y: 30 },
      { x: 95, y: 105 },
      { x: 265, y: 105 },
      { x: 95, y: 240 },
      { x: 265, y: 240 },
    ],
    edges: E('AB AC BC BD CE DE BE CD'),
  },
  bowtie: {
    name: 'Hình nơ',
    pos: [
      { x: 180, y: 135 },
      { x: 55, y: 45 },
      { x: 55, y: 225 },
      { x: 305, y: 45 },
      { x: 305, y: 225 },
    ],
    edges: E('AB AC BC AD AE DE'),
  },
  cube: {
    name: 'Hình lập phương',
    pos: [
      { x: 55, y: 35 },
      { x: 305, y: 35 },
      { x: 305, y: 235 },
      { x: 55, y: 235 },
      { x: 130, y: 95 },
      { x: 230, y: 95 },
      { x: 230, y: 175 },
      { x: 130, y: 175 },
    ],
    edges: E('AB BC CD DA EF FG GH HE AE BF CG DH'),
  },
};

/** An empty trace. @returns {Trace} */
export const fresh = () => ({ walk: [], used: [] });

/**
 * The trace after choosing vertex v, or a message saying why that move is not
 * allowed.
 * @param {Board} board @param {Mode} mode @param {Trace} trace @param {number} v
 * @returns {Trace | string}
 */
export function move(board, mode, trace, v) {
  const { walk, used } = trace;
  if (walk.length === 0) return { walk: [v], used: [] };
  const cur = walk[walk.length - 1];
  const n = board.pos.length;
  if (mode === 'euler') {
    const k = board.edges.findIndex(
      (e, i) => !used.includes(i) && ((e.a === cur && e.b === v) || (e.a === v && e.b === cur)),
    );
    if (k === -1)
      return adjacent(board.edges, cur, v)
        ? `Mọi cạnh nối ${NAMES[cur]} với ${NAMES[v]} đều đã đi qua.`
        : `${NAMES[cur]} và ${NAMES[v]} không kề nhau.`;
    return { walk: [...walk, v], used: [...used, k] };
  }
  if (walk.length === n + 1 || (walk.length > 1 && walk[0] === cur))
    return 'Chu trình đã khép kín.';
  if (!adjacent(board.edges, cur, v)) return `${NAMES[cur]} và ${NAMES[v]} không kề nhau.`;
  if (v === walk[0] && walk.length === n) return { walk: [...walk, v], used };
  if (walk.includes(v)) return `Đỉnh ${NAMES[v]} đã đi qua rồi.`;
  return { walk: [...walk, v], used };
}

/**
 * The edges along a walk of distinct vertices (the Hamilton trace).
 * @param {Edge[]} edges @param {number[]} walk
 */
export function walkEdges(edges, walk) {
  /** @type {number[]} */
  const out = [];
  for (let i = 1; i < walk.length; i++) {
    const u = walk[i - 1];
    const v = walk[i];
    out.push(edges.findIndex((e) => (e.a === u && e.b === v) || (e.a === v && e.b === u)));
  }
  return out;
}

/**
 * The trace with its last move taken back.
 * @param {Trace} trace @returns {Trace}
 */
export function undo({ walk, used }) {
  const back = walk.slice(0, -1);
  return { walk: back, used: used.length === walk.length - 1 ? used.slice(0, -1) : used };
}

/**
 * The live sentence under the board.
 * @param {Board} board @param {Mode} mode @param {Trace} trace
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function status(board, mode, trace) {
  const { walk, used } = trace;
  const m = board.edges.length;
  const n = board.pos.length;
  if (walk.length === 0) return { tone: 'info', text: 'Chọn một đỉnh để bắt đầu.' };
  const cur = walk[walk.length - 1];
  const w = `$${walkText(walk)}$`;
  if (mode === 'euler') {
    if (used.length === m)
      return walk[0] === cur
        ? {
            tone: 'ok',
            text: `Chu trình Euler ${w}: đi qua mỗi cạnh đúng một lần và trở về ${NAMES[cur]}.`,
          }
        : {
            tone: 'ok',
            text: `Đường đi Euler ${w} từ ${NAMES[walk[0]]} đến ${NAMES[cur]}: đi qua mỗi cạnh đúng một lần.`,
          };
    const free = board.edges.some((e, i) => !used.includes(i) && (e.a === cur || e.b === cur));
    if (!free)
      return {
        tone: 'warn',
        text: `Bị kẹt tại ${NAMES[cur]}: mọi cạnh ở ${NAMES[cur]} đều đã đi, còn ${m - used.length} cạnh chưa đi. Lùi lại hoặc thử xuất phát từ đỉnh khác.`,
      };
    return { tone: 'info', text: `Đã đi ${used.length}/${m} cạnh: ${w}.` };
  }
  if (walk.length === n + 1)
    return {
      tone: 'ok',
      text: `Chu trình Hamilton ${w}: đi qua mỗi đỉnh đúng một lần rồi trở về ${NAMES[cur]}.`,
    };
  if (walk.length === n)
    return {
      tone: 'ok',
      text:
        `Đường đi Hamilton ${w}: đi qua mỗi đỉnh đúng một lần.` +
        (adjacent(board.edges, cur, walk[0])
          ? ` Chọn ${NAMES[walk[0]]} để khép thành chu trình Hamilton.`
          : ` ${NAMES[cur]} không kề ${NAMES[walk[0]]}, nên đường đi này không khép thành chu trình được.`),
    };
  const next = board.pos.some((_, v) => !walk.includes(v) && adjacent(board.edges, cur, v));
  if (!next)
    return {
      tone: 'warn',
      text: `Bị kẹt tại ${NAMES[cur]}: mọi đỉnh kề với ${NAMES[cur]} đều đã đi qua, còn ${n - walk.length} đỉnh chưa tới.`,
    };
  return { tone: 'info', text: `Đã qua ${walk.length}/${n} đỉnh: ${w}.` };
}

/**
 * What the theorems say about the board, shown as a hint.
 * @param {Board} board @param {Mode} mode
 */
export function theoryNote(board, mode) {
  const n = board.pos.length;
  const { edges } = board;
  if (mode === 'euler') {
    const odd = oddVertices(n, edges);
    const kind = eulerKind(n, edges);
    const oddText = odd.length
      ? `Có ${odd.length} đỉnh bậc lẻ: ${odd.map((v) => NAMES[v]).join(', ')}.`
      : 'Mọi đỉnh đều có bậc chẵn.';
    if (kind === 'cycle')
      return `${oddText} Đồ thị liên thông nên có chu trình Euler, xuất phát từ đỉnh nào cũng được, ví dụ $${walkText(/** @type {number[]} */ (eulerTrail(n, edges, 0)))}$.`;
    if (kind === 'path')
      return `${oddText} Đồ thị liên thông nên có đường đi Euler, nhưng không có chu trình Euler: phải bắt đầu ở ${NAMES[odd[0]]} hoặc ${NAMES[odd[1]]} và kết thúc ở đỉnh bậc lẻ còn lại.`;
    return `${oddText} Có nhiều hơn hai đỉnh bậc lẻ nên đồ thị không có đường đi Euler: không thể vẽ bằng một nét.`;
  }
  const deg = degrees(n, edges);
  const dirac = isSimple(edges) && n >= 3 && deg.every((d) => 2 * d >= n);
  const cycle = hamilton(n, edges, true);
  const path = cycle ? null : hamilton(n, edges, false);
  const head = dirac
    ? `Mọi đỉnh có bậc ít nhất $\\dfrac{${n}}{2}$, nên theo định lí Dirac đồ thị có chu trình Hamilton.`
    : `Điều kiện của định lí Dirac (mọi bậc ít nhất $\\dfrac{${n}}{2}$) không thoả mãn, nên phải tự tìm.`;
  if (cycle) return `${head} Một chu trình Hamilton: $${walkText(cycle)}$.`;
  if (path)
    return `${head} Đồ thị không có chu trình Hamilton nhưng có đường đi Hamilton, ví dụ $${walkText(path)}$.`;
  return `${head} Đồ thị không có đường đi Hamilton.`;
}
