/**
 * The matching game of the chapter review: each set holds three functions of
 * one family the book surveys, drawn as three graphs. The learner gives each
 * graph its formula and its bảng biến thiên; the check says which choices
 * are right and, for a wrong one, what on the graph gives the answer away.
 */

import { intText } from '#lib/core/number-format.js';
import { variationOf } from '../_shared/variation.js';

/**
 * @typedef {['end', number, number] | ['zero', number, number] | ['pole', number, number, number]} RawNode
 *   an end of the domain (±Infinity) with the limit of y there, a zero of y′
 *   with the value of y, or a pole with the limits of y from the left and right
 * @typedef {object} Item
 * @property {string} tex the formula, as TeX
 * @property {string} text the formula, as plain text
 * @property {(x: number) => number} f
 * @property {RawNode[]} nodes
 * @property {Array<'+' | '-'>} signs the sign of y′ on each interval
 * @property {Array<{ a?: number, b?: number, c?: number, vertical?: boolean }>} asymptotes
 * @property {string} clue rich text: what on the graph tells this function apart
 * @typedef {object} Round
 * @property {string} label
 * @property {import('#lib/core/visuals/plot.js').Window} win
 * @property {Item[]} items in the order the graphs are shown
 * @property {number[]} formulas the item shown as formula A, B, C
 * @property {number[]} tables the item shown as table I, II, III
 */

const INF = Infinity;

/** @type {Round[]} */
export const ROUNDS = [
  {
    label: 'Bậc ba (1)',
    win: { xMin: -3, xMax: 4, yMin: -5, yMax: 5 },
    items: [
      {
        tex: 'y = -x^3 + 3x + 1',
        text: 'y = −x³ + 3x + 1',
        f: (x) => -(x ** 3) + 3 * x + 1,
        nodes: [
          ['end', -INF, INF],
          ['zero', -1, -1],
          ['zero', 1, 3],
          ['end', INF, -INF],
        ],
        signs: ['-', '+', '-'],
        asymptotes: [],
        clue: 'Nhánh bên phải đi xuống nên $a < 0$: chỉ có $y = -x^3 + 3x + 1$. Cực tiểu tại $x = -1$ trước, cực đại tại $x = 1$ sau.',
      },
      {
        tex: 'y = x^3 - 3x^2 + 1',
        text: 'y = x³ − 3x² + 1',
        f: (x) => x ** 3 - 3 * x ** 2 + 1,
        nodes: [
          ['end', -INF, -INF],
          ['zero', 0, 1],
          ['zero', 2, -3],
          ['end', INF, INF],
        ],
        signs: ['+', '-', '+'],
        asymptotes: [],
        clue: "Đồ thị cắt $Oy$ tại điểm cực đại $(0; 1)$ và có cực tiểu $(2; -3)$: $y' = 3x^2 - 6x$ bằng $0$ tại $x = 0$ và $x = 2$.",
      },
      {
        tex: 'y = x^3 - 3x + 1',
        text: 'y = x³ − 3x + 1',
        f: (x) => x ** 3 - 3 * x + 1,
        nodes: [
          ['end', -INF, -INF],
          ['zero', -1, 3],
          ['zero', 1, -1],
          ['end', INF, INF],
        ],
        signs: ['+', '-', '+'],
        asymptotes: [],
        clue: "Hai điểm cực trị có hoành độ $x = -1$ và $x = 1$: $y' = 3x^2 - 3$. Cực đại $(-1; 3)$, cực tiểu $(1; -1)$.",
      },
    ],
    formulas: [2, 0, 1],
    tables: [1, 2, 0],
  },
  {
    label: 'Bậc ba (2)',
    win: { xMin: -3, xMax: 4, yMin: -5, yMax: 5 },
    items: [
      {
        tex: 'y = x^3 - 3x^2 + 3x - 1',
        text: 'y = x³ − 3x² + 3x − 1',
        f: (x) => (x - 1) ** 3,
        nodes: [
          ['end', -INF, -INF],
          ['zero', 1, 0],
          ['end', INF, INF],
        ],
        signs: ['+', '+'],
        asymptotes: [],
        clue: "$y' = 3(x - 1)^2 \\ge 0$, chỉ bằng $0$ tại $x = 1$: hàm số đồng biến trên $\\mathbb{R}$, tiếp tuyến tại $(1; 0)$ nằm ngang nhưng hàm số không có cực trị.",
      },
      {
        tex: 'y = -x^3 + 3x^2 - 2',
        text: 'y = −x³ + 3x² − 2',
        f: (x) => -(x ** 3) + 3 * x ** 2 - 2,
        nodes: [
          ['end', -INF, INF],
          ['zero', 0, -2],
          ['zero', 2, 2],
          ['end', INF, -INF],
        ],
        signs: ['-', '+', '-'],
        asymptotes: [],
        clue: 'Đây là đồ thị duy nhất có hai cực trị: cực tiểu $(0; -2)$ và cực đại $(2; 2)$; nhánh bên phải đi xuống nên $a < 0$.',
      },
      {
        tex: 'y = -x^3 - 3x + 2',
        text: 'y = −x³ − 3x + 2',
        f: (x) => -(x ** 3) - 3 * x + 2,
        nodes: [
          ['end', -INF, INF],
          ['end', INF, -INF],
        ],
        signs: ['-'],
        asymptotes: [],
        clue: "$y' = -3x^2 - 3 < 0$ với mọi $x$: hàm số nghịch biến trên $\\mathbb{R}$, đồ thị luôn đi xuống và cắt $Oy$ tại $(0; 2)$.",
      },
    ],
    formulas: [1, 2, 0],
    tables: [2, 0, 1],
  },
  {
    label: 'Bậc nhất / bậc nhất',
    win: { xMin: -5, xMax: 5, yMin: -5, yMax: 6 },
    items: [
      {
        tex: 'y = \\dfrac{x - 1}{x + 1}',
        text: 'y = (x − 1)/(x + 1)',
        f: (x) => (x - 1) / (x + 1),
        nodes: [
          ['end', -INF, 1],
          ['pole', -1, INF, -INF],
          ['end', INF, 1],
        ],
        signs: ['+', '+'],
        asymptotes: [{ c: -1, vertical: true }, { b: 1 }],
        clue: "Tiệm cận đứng $x = -1$ (mẫu bằng $0$), và đây là đồ thị duy nhất đi lên trên mỗi khoảng: $y' = \\dfrac{2}{(x + 1)^2} > 0$.",
      },
      {
        tex: 'y = \\dfrac{2x - 1}{x - 1}',
        text: 'y = (2x − 1)/(x − 1)',
        f: (x) => (2 * x - 1) / (x - 1),
        nodes: [
          ['end', -INF, 2],
          ['pole', 1, -INF, INF],
          ['end', INF, 2],
        ],
        signs: ['-', '-'],
        asymptotes: [{ c: 1, vertical: true }, { b: 2 }],
        clue: 'Tiệm cận ngang là $y = \\dfrac{2}{1} = 2$ (tỉ số hai hệ số của $x$), tiệm cận đứng $x = 1$.',
      },
      {
        tex: 'y = \\dfrac{x + 1}{x - 1}',
        text: 'y = (x + 1)/(x − 1)',
        f: (x) => (x + 1) / (x - 1),
        nodes: [
          ['end', -INF, 1],
          ['pole', 1, -INF, INF],
          ['end', INF, 1],
        ],
        signs: ['-', '-'],
        asymptotes: [{ c: 1, vertical: true }, { b: 1 }],
        clue: "Tiệm cận đứng $x = 1$, tiệm cận ngang $y = 1$; $y' = \\dfrac{-2}{(x - 1)^2} < 0$ nên đồ thị đi xuống trên mỗi khoảng.",
      },
    ],
    formulas: [2, 0, 1],
    tables: [0, 2, 1],
  },
  {
    label: 'Bậc hai / bậc nhất',
    win: { xMin: -5, xMax: 5, yMin: -8, yMax: 8 },
    items: [
      {
        tex: 'y = \\dfrac{x^2 - x + 1}{x - 1}',
        text: 'y = (x² − x + 1)/(x − 1)',
        f: (x) => (x * x - x + 1) / (x - 1),
        nodes: [
          ['end', -INF, -INF],
          ['zero', 0, -1],
          ['pole', 1, -INF, INF],
          ['zero', 2, 3],
          ['end', INF, INF],
        ],
        signs: ['+', '-', '-', '+'],
        asymptotes: [
          { c: 1, vertical: true },
          { a: 1, b: 0 },
        ],
        clue: '$y = x + \\dfrac{1}{x - 1}$: tiệm cận đứng $x = 1$, tiệm cận xiên $y = x$, cực đại $(0; -1)$ và cực tiểu $(2; 3)$.',
      },
      {
        tex: 'y = \\dfrac{-x^2 + x + 1}{x - 1}',
        text: 'y = (−x² + x + 1)/(x − 1)',
        f: (x) => (-x * x + x + 1) / (x - 1),
        nodes: [
          ['end', -INF, INF],
          ['pole', 1, -INF, INF],
          ['end', INF, -INF],
        ],
        signs: ['-', '-'],
        asymptotes: [
          { c: 1, vertical: true },
          { a: -1, b: 0 },
        ],
        clue: "$y = -x + \\dfrac{1}{x - 1}$ nên $y' = -1 - \\dfrac{1}{(x - 1)^2} < 0$: không có cực trị, tiệm cận xiên $y = -x$ đi xuống.",
      },
      {
        tex: 'y = \\dfrac{x^2 + x + 1}{x + 1}',
        text: 'y = (x² + x + 1)/(x + 1)',
        f: (x) => (x * x + x + 1) / (x + 1),
        nodes: [
          ['end', -INF, -INF],
          ['zero', -2, -3],
          ['pole', -1, -INF, INF],
          ['zero', 0, 1],
          ['end', INF, INF],
        ],
        signs: ['+', '-', '-', '+'],
        asymptotes: [
          { c: -1, vertical: true },
          { a: 1, b: 0 },
        ],
        clue: '$y = x + \\dfrac{1}{x + 1}$: tiệm cận đứng $x = -1$, tiệm cận xiên $y = x$, cực đại $(-2; -3)$ và cực tiểu $(0; 1)$.',
      },
    ],
    formulas: [1, 2, 0],
    tables: [2, 1, 0],
  },
];

export const LETTERS = ['A', 'B', 'C'];
export const ROMANS = ['I', 'II', 'III'];

/** @param {number} v a whole number or ±Infinity, the way a table writes it */
export function valueText(v) {
  if (v === INF) return '+∞';
  if (v === -INF) return '−∞';
  return intText(v);
}

/**
 * The bảng biến thiên of an item.
 * @param {Item} item
 */
export function tableOf(item) {
  /** @type {import('../_shared/variation.js').Node[]} */
  const nodes = item.nodes.map((n) => {
    if (n[0] === 'pole') {
      return { x: valueText(n[1]), kind: 'pole', yl: valueText(n[2]), yr: valueText(n[3]) };
    }
    return { x: valueText(n[1]), kind: n[0], y: valueText(n[2]) };
  });
  return variationOf(nodes, item.signs);
}

/**
 * The points a graph marks: its extrema, where y′ changes sign.
 * @param {Item} item
 * @returns {Array<{ x: number, y: number, kind: 'max' | 'min' }>}
 */
export function extremaOf(item) {
  const out = [];
  for (let i = 1; i < item.nodes.length - 1; i++) {
    const n = item.nodes[i];
    if (n[0] !== 'zero') continue;
    const l = item.signs[i - 1];
    const r = item.signs[i];
    if (l !== r) out.push({ x: n[1], y: n[2], kind: l === '+' ? 'max' : 'min' });
  }
  return /** @type {Array<{ x: number, y: number, kind: 'max' | 'min' }>} */ (out);
}

/**
 * What a screen reader hears for a graph: its asymptotes, its extrema and
 * which way it runs on each piece, without naming the formula.
 * @param {Item} item
 * @param {number} k the graph's number, from 1
 */
export function graphText(item, k) {
  const parts = [`Đồ thị ${k}`];
  const asym = item.asymptotes.map((l) => {
    if (l.vertical) return `tiệm cận đứng x = ${intText(l.c ?? 0)}`;
    if (!l.a) return `tiệm cận ngang y = ${intText(l.b ?? 0)}`;
    return `tiệm cận xiên y = ${l.a === 1 ? '' : '−'}x`;
  });
  if (asym.length) parts.push(`có ${asym.join(', ')}`);
  const ext = extremaOf(item).map(
    (e) =>
      `${e.kind === 'max' ? 'điểm cực đại' : 'điểm cực tiểu'} (${intText(e.x)}; ${intText(e.y)})`,
  );
  parts.push(ext.length ? `có ${ext.join(' và ')}` : 'không có điểm cực trị');
  const ways = item.signs.map((s) => (s === '+' ? 'đi lên' : 'đi xuống'));
  parts.push(`từ trái sang phải lần lượt ${ways.join(', ')}`);
  parts.push(`cắt trục Oy tại điểm (0; ${intText(item.f(0))})`);
  return `${parts.join('; ')}.`;
}

/**
 * @typedef {{ formula: number, table: number }} Pick the letter and roman
 *   numeral picked for one graph, as indices into `formulas` and `tables`;
 *   −1 while not picked
 */

/**
 * Checks the picks of one set, graph by graph.
 * @param {Round} round
 * @param {Pick[]} picks one per graph
 */
export function check(round, picks) {
  return round.items.map((_, i) => ({
    formula: picks[i].formula >= 0 && round.formulas[picks[i].formula] === i,
    table: picks[i].table >= 0 && round.tables[picks[i].table] === i,
  }));
}

/**
 * The line under the game once checked: how many of the six choices are
 * right, and what to look at next.
 * @param {Array<{ formula: boolean, table: boolean }>} result
 */
export function summaryText(result) {
  const right = result.reduce((s, r) => s + Number(r.formula) + Number(r.table), 0);
  const total = result.length * 2;
  if (right === total) return `Đúng cả ${total}/${total} lựa chọn. Em đã đọc đồ thị rất chắc!`;
  return `Đúng ${right}/${total} lựa chọn. Đọc gợi ý dưới các đồ thị còn sai rồi chọn lại.`;
}
