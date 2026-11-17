/**
 * Logic of the Venn widget on the sample space of rolling a die twice: the 36
 * outcomes (a, b), the preset events, the four Venn regions, the shaded
 * event (A ∪ B, A ∩ B or a complement) and the independence check.
 */

import { ratioTex } from '#lib/core/fractions.js';

/** @typedef {readonly [number, number]} Outcome (first roll, second roll) */

/** @type {Outcome[]} */
export const OMEGA = [];
for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) OMEGA.push([a, b]);

/**
 * @typedef {object} PresetEvent
 * @property {string} id
 * @property {string} name what the event says, completing "Biến cố …"
 * @property {(o: Outcome) => boolean} holds
 */

/** @type {PresetEvent[]} */
export const PRESETS = [
  { id: 'chan-1', name: 'lần đầu ra mặt chẵn chấm', holds: ([a]) => a % 2 === 0 },
  {
    id: 'chia3-2',
    name: 'lần sau ra mặt có số chấm chia hết cho 3',
    holds: ([, b]) => b % 3 === 0,
  },
  { id: 'tong-7', name: 'tổng số chấm bằng 7', holds: ([a, b]) => a + b === 7 },
  { id: 'sau-1', name: 'lần đầu ra mặt 6 chấm', holds: ([a]) => a === 6 },
  { id: 'bang-nhau', name: 'hai lần ra cùng số chấm', holds: ([a, b]) => a === b },
  { id: 'tong-chan', name: 'tổng số chấm là số chẵn', holds: ([a, b]) => (a + b) % 2 === 0 },
  { id: 'tong-10', name: 'tổng số chấm không nhỏ hơn 10', holds: ([a, b]) => a + b >= 10 },
  { id: 'tong-4', name: 'tổng số chấm không lớn hơn 4', holds: ([a, b]) => a + b <= 4 },
  { id: 'co-6', name: 'có ít nhất một lần ra mặt 6 chấm', holds: ([a, b]) => a === 6 || b === 6 },
];

/**
 * The indices into `OMEGA` of the outcomes where a preset holds.
 * @param {string} id
 * @returns {Set<number>}
 */
export function presetSet(id) {
  const ev = PRESETS.find((p) => p.id === id);
  const out = new Set();
  if (!ev) return out;
  OMEGA.forEach((o, i) => {
    if (ev.holds(o)) out.add(i);
  });
  return out;
}

/**
 * A copy of an event with one outcome added or taken away.
 * @param {ReadonlySet<number>} set
 * @param {number} i
 */
export function toggled(set, i) {
  const next = new Set(set);
  if (next.has(i)) next.delete(i);
  else next.add(i);
  return next;
}

/** @typedef {'onlyA' | 'both' | 'onlyB' | 'neither'} Region */

/**
 * Which Venn region an outcome lies in.
 * @param {number} i
 * @param {ReadonlySet<number>} A
 * @param {ReadonlySet<number>} B
 * @returns {Region}
 */
export function regionOf(i, A, B) {
  const a = A.has(i);
  const b = B.has(i);
  return a && b ? 'both' : a ? 'onlyA' : b ? 'onlyB' : 'neither';
}

/**
 * How many outcomes lie in each Venn region.
 * @param {ReadonlySet<number>} A
 * @param {ReadonlySet<number>} B
 * @returns {Record<Region, number>}
 */
export function regionCounts(A, B) {
  /** @type {Record<Region, number>} */
  const c = { onlyA: 0, both: 0, onlyB: 0, neither: 0 };
  OMEGA.forEach((_, i) => c[regionOf(i, A, B)]++);
  return c;
}

/** @typedef {'union' | 'inter' | 'notA' | 'notB'} View */

/** @type {Array<{ value: View, label: string, tex: string, word: string }>} */
export const VIEWS = [
  { value: 'union', label: 'A ∪ B', tex: 'A \\cup B', word: 'A hoặc B xảy ra' },
  { value: 'inter', label: 'A ∩ B', tex: 'AB', word: 'cả A và B cùng xảy ra' },
  { value: 'notA', label: 'Biến cố đối của A', tex: '\\overline{A}', word: 'A không xảy ra' },
  { value: 'notB', label: 'Biến cố đối của B', tex: '\\overline{B}', word: 'B không xảy ra' },
];

/** The regions each shaded event is made of. */
export const VIEW_REGIONS = /** @type {Record<View, Region[]>} */ ({
  union: ['onlyA', 'both', 'onlyB'],
  inter: ['both'],
  notA: ['onlyB', 'neither'],
  notB: ['onlyA', 'neither'],
});

/**
 * Whether outcome `i` belongs to the shaded event.
 * @param {number} i
 * @param {ReadonlySet<number>} A
 * @param {ReadonlySet<number>} B
 * @param {View} view
 */
export const inView = (i, A, B, view) => VIEW_REGIONS[view].includes(regionOf(i, A, B));

/**
 * The line that reads the shaded event: its outcomes count and probability.
 * @param {ReadonlySet<number>} A
 * @param {ReadonlySet<number>} B
 * @param {View} view
 */
export function viewText(A, B, view) {
  const c = regionCounts(A, B);
  const k = VIEW_REGIONS[view].reduce((s, r) => s + c[r], 0);
  const v = VIEWS.find((x) => x.value === view) ?? VIEWS[0];
  const p = k === 0 ? '0' : ratioTex(k, OMEGA.length);
  return `Biến cố $${v.tex}$ (${v.word}) có $${k}$ kết quả thuận lợi, $P(${v.tex}) = ${p}$.`;
}

/**
 * @typedef {object} Verdict
 * @property {'ok' | 'warn' | 'info'} tone
 * @property {string} text rich text
 * @property {boolean} disjoint A and B are mutually exclusive
 * @property {boolean | null} independent null when A or B is impossible or certain
 */

/**
 * Whether A and B are mutually exclusive and whether they are independent.
 * Independence is checked the book's way: knowing that A has happened does
 * not change the chance of B, so the share of B among the outcomes of A,
 * n(AB)/n(A), equals the share of B in the whole sample space, n(B)/n(Ω).
 * @param {ReadonlySet<number>} A
 * @param {ReadonlySet<number>} B
 * @returns {Verdict}
 */
export function verdict(A, B) {
  const c = regionCounts(A, B);
  const n = OMEGA.length;
  const nA = c.onlyA + c.both;
  const nB = c.onlyB + c.both;
  const disjoint = c.both === 0;
  const clash = disjoint
    ? '$A$ và $B$ xung khắc: $A \\cap B = \\varnothing$, chúng không đồng thời xảy ra.'
    : `$A$ và $B$ không xung khắc: $A \\cap B$ có $${c.both}$ kết quả.`;
  if (nA === 0 || nB === 0 || nA === n || nB === n) {
    return {
      tone: 'info',
      disjoint,
      independent: null,
      text: `${clash} Hãy chọn $A$ và $B$ đều có kết quả thuận lợi nhưng không phải mọi kết quả, để xét tính độc lập.`,
    };
  }
  const independent = c.both * n === nA * nB;
  const among = `Trong $${nA}$ kết quả của $A$ có $${c.both}$ kết quả thuận lợi cho $B$, tỉ lệ $${c.both === 0 ? '0' : ratioTex(c.both, nA)}$; trên cả $\\Omega$ tỉ lệ đó là $${ratioTex(nB, n)}$.`;
  return {
    tone: independent ? 'ok' : 'warn',
    disjoint,
    independent,
    text: independent
      ? `${clash} ${among} Hai tỉ lệ bằng nhau: biết $A$ xảy ra không làm thay đổi khả năng xảy ra của $B$, nên $A$ và $B$ độc lập.`
      : `${clash} ${among} Hai tỉ lệ khác nhau: việc $A$ xảy ra làm thay đổi khả năng xảy ra của $B$, nên $A$ và $B$ không độc lập.`,
  };
}

/**
 * An outcome as the book writes it: '(2, 5)'.
 * @param {Outcome} o
 */
export const outcomeText = ([a, b]) => `(${a}, ${b})`;
