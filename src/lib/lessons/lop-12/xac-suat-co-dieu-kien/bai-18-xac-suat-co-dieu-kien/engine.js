/**
 * Logic of the two-way table for conditional probability. A sample of people
 * (or products) is counted in a 2 × 2 table by two traits; an event is one
 * row or one column. Choosing a condition B keeps only the cells of B, the
 * new sample space, and P(A|B) = n(AB)/n(B) is read off it, then compared
 * with P(A) and with P(AB)/P(B).
 */

import { ratioTex } from '#lib/core/fractions.js';

/** @typedef {'r0' | 'r1' | 'c0' | 'c1'} EventId a row (r) or a column (c) of the table */
/** @typedef {EventId | 'none'} ConditionId */

/**
 * @typedef {object} Preset
 * @property {string} id
 * @property {string} label the switch label
 * @property {string} story the setting, one sentence
 * @property {string} unit what one unit counted is, for the drill text ('học sinh')
 * @property {[string, string]} rows row headings ('Nam', 'Nữ')
 * @property {[string, string]} cols column headings
 * @property {Record<EventId, string>} events each event as a sentence ('Học sinh được chọn là nam')
 * @property {[[number, number], [number, number]]} counts the starting table
 */

/** @type {Preset[]} */
export const PRESETS = [
  {
    id: 'clb',
    label: 'Câu lạc bộ',
    story:
      'Học sinh lớp 12A được thống kê theo giới tính và việc tham gia câu lạc bộ bóng đá. Chọn ngẫu nhiên một học sinh của lớp.',
    unit: 'học sinh',
    rows: ['Nam', 'Nữ'],
    cols: ['Có tham gia', 'Không tham gia'],
    events: {
      r0: 'Học sinh được chọn là nam',
      r1: 'Học sinh được chọn là nữ',
      c0: 'Học sinh được chọn tham gia câu lạc bộ',
      c1: 'Học sinh được chọn không tham gia câu lạc bộ',
    },
    counts: [
      [15, 7],
      [5, 13],
    ],
  },
  {
    id: 'may',
    label: 'Sản phẩm',
    story:
      'Một lô sản phẩm do hai máy I và II sản xuất, được kiểm tra chất lượng. Lấy ngẫu nhiên một sản phẩm của lô.',
    unit: 'sản phẩm',
    rows: ['Máy I', 'Máy II'],
    cols: ['Đạt', 'Bị lỗi'],
    events: {
      r0: 'Sản phẩm do máy I sản xuất',
      r1: 'Sản phẩm do máy II sản xuất',
      c0: 'Sản phẩm đạt chất lượng',
      c1: 'Sản phẩm bị lỗi',
    },
    counts: [
      [57, 3],
      [36, 4],
    ],
  },
];

/** @type {EventId[]} */
export const EVENTS = ['r0', 'r1', 'c0', 'c1'];

/**
 * Whether cell (i, j) belongs to an event; the condition 'none' keeps every
 * cell (the whole sample space).
 * @param {ConditionId} e
 * @param {number} i row
 * @param {number} j column
 */
export function inEvent(e, i, j) {
  if (e === 'none') return true;
  return e[0] === 'r' ? Number(e[1]) === i : Number(e[1]) === j;
}

/**
 * The sum of the cells that belong to every given event.
 * @param {number[][]} counts
 * @param {ConditionId[]} events
 */
export function countWhere(counts, events) {
  let n = 0;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (events.every((e) => inEvent(e, i, j))) n += counts[i][j];
    }
  }
  return n;
}

/**
 * The counts behind P(A|B): n(Ω), n(A), n(B), n(AB).
 * @param {number[][]} counts
 * @param {EventId} a
 * @param {ConditionId} b
 */
export function tally(counts, a, b) {
  return {
    n: countWhere(counts, ['none']),
    nA: countWhere(counts, [a]),
    nB: countWhere(counts, [b]),
    nAB: countWhere(counts, [a, b]),
  };
}

/**
 * A ratio k/n in TeX with its lowest terms, or 0 and 1 written plainly.
 * @param {number} k
 * @param {number} n
 */
const fracTex = (k, n) => (k === 0 ? `\\dfrac{0}{${n}} = 0` : ratioTex(k, n));

/**
 * What the table says about P(A|B), as rich text: the shrunken sample space,
 * the ratio n(AB)/n(B), the same value as P(AB)/P(B), and how it compares
 * with P(A).
 * @param {number[][]} counts
 * @param {EventId} a
 * @param {ConditionId} b
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function explain(counts, a, b) {
  const { n, nA, nB, nAB } = tally(counts, a, b);
  if (n === 0) return { tone: 'warn', text: 'Bảng chưa có số liệu nào: hãy tăng các ô.' };
  const pA = `$P(A) = \\dfrac{n(A)}{n(\\Omega)} = ${fracTex(nA, n)}$`;
  if (b === 'none') {
    return {
      tone: 'info',
      text: `Chưa có điều kiện: không gian mẫu là cả bảng, $n(\\Omega) = ${n}$, và ${pA}. Hãy chọn một điều kiện $B$ để thu hẹp không gian mẫu.`,
    };
  }
  if (nB === 0) {
    return {
      tone: 'warn',
      text: `$n(B) = 0$ nên $P(B) = 0$: biến cố $B$ không thể xảy ra và $P(A|B)$ không được định nghĩa.`,
    };
  }
  const cond = `$P(A|B) = \\dfrac{n(AB)}{n(B)} = ${fracTex(nAB, nB)}$`;
  const mult = `Cũng vậy, $\\dfrac{P(AB)}{P(B)} = \\dfrac{${nAB}/${n}}{${nB}/${n}} = ${fracTex(nAB, nB)}$`;
  const left = nAB * n;
  const right = nA * nB;
  const cmp =
    left === right
      ? `Ở đây $P(A|B) = P(A)$: biết $B$ xảy ra không làm thay đổi xác suất của $A$, nên $A$ và $B$ độc lập.`
      : left > right
        ? `Ở đây $P(A|B) > P(A)$: biết $B$ đã xảy ra làm khả năng xảy ra $A$ tăng lên.`
        : `Ở đây $P(A|B) < P(A)$: biết $B$ đã xảy ra làm khả năng xảy ra $A$ giảm đi.`;
  return {
    tone: 'ok',
    text: `Biết $B$ đã xảy ra, không gian mẫu thu hẹp còn $n(B) = ${nB}$ kết quả, trong đó $n(AB) = ${nAB}$ kết quả thuận lợi cho $A$. Vậy ${cond}. ${mult}. So với ${pA}: ${cmp}`,
  };
}
