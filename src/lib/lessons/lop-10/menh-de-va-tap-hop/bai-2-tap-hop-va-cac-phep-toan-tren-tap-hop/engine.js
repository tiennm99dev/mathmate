/**
 * The interval editor of the "Tập hợp" lesson: two subsets of ℝ, each one
 * interval whose ends are dragged along the line and switched between
 * closed, open and infinite, combined by the five operations of the book.
 */

import { combine, interval, kindOf, setTex } from '../_shared/intervals.js';

/** Ends stay on the integer ticks from MIN to MAX. */
export const MIN = -6;
export const MAX = 6;

/**
 * @typedef {'closed' | 'open' | 'infinite'} EndMode
 * @typedef {{ lo: number, hi: number, loMode: EndMode, hiMode: EndMode }} EditableInterval
 */

/** @type {Array<{ value: import('../_shared/intervals.js').SetOp, label: string, short: string, tex: string, rule: string }>} */
export const OPS = [
  { value: 'cap', label: 'A ∩ B', short: 'A∩B', tex: 'A \\cap B', rule: 'thuộc cả $A$ và $B$' },
  {
    value: 'cup',
    label: 'A ∪ B',
    short: 'A∪B',
    tex: 'A \\cup B',
    rule: 'thuộc $A$ hoặc thuộc $B$',
  },
  {
    value: 'diff',
    label: 'A \\ B',
    short: 'A\\B',
    tex: 'A \\setminus B',
    rule: 'thuộc $A$ nhưng không thuộc $B$',
  },
  {
    value: 'rdiff',
    label: 'B \\ A',
    short: 'B\\A',
    tex: 'B \\setminus A',
    rule: 'thuộc $B$ nhưng không thuộc $A$',
  },
  {
    value: 'comp',
    label: 'Phần bù của A',
    short: 'CℝA',
    tex: 'C_{\\mathbb{R}} A',
    rule: 'thuộc $\\mathbb{R}$ nhưng không thuộc $A$',
  },
];

/**
 * Which regions of the Venn diagram (A only, both, B only, neither) the
 * operation keeps.
 * @type {Record<import('../_shared/intervals.js').SetOp, { a: boolean, both: boolean, b: boolean, out: boolean }>}
 */
export const SHADE = {
  cap: { a: false, both: true, b: false, out: false },
  cup: { a: true, both: true, b: true, out: false },
  diff: { a: true, both: false, b: false, out: false },
  rdiff: { a: false, both: false, b: true, out: false },
  comp: { a: false, both: false, b: true, out: true },
};

/**
 * The subset of ℝ an editable interval stands for.
 * @param {EditableInterval} E
 * @returns {import('../_shared/intervals.js').RealSet}
 */
export function toSet(E) {
  const lo = E.loMode === 'infinite' ? -Infinity : E.lo;
  const hi = E.hiMode === 'infinite' ? Infinity : E.hi;
  return [interval(lo, hi, E.loMode === 'closed', E.hiMode === 'closed')];
}

/** @type {Record<EndMode, EndMode>} */
const NEXT = { closed: 'open', open: 'infinite', infinite: 'closed' };

/**
 * The interval with one end switched to its next form: closed, then open,
 * then infinite. When a finite end comes back it is moved, if needed, so
 * that it stays at least one unit away from the other end.
 * @param {EditableInterval} E @param {'lo' | 'hi'} side
 * @returns {EditableInterval}
 */
export function switchEnd(E, side) {
  if (side === 'lo') {
    const next = { ...E, loMode: NEXT[E.loMode] };
    if (next.loMode === 'infinite' || next.hiMode === 'infinite' || next.lo < next.hi) return next;
    const lo = Math.max(MIN, next.hi - 1);
    return { ...next, lo, hi: Math.max(next.hi, lo + 1) };
  }
  const next = { ...E, hiMode: NEXT[E.hiMode] };
  if (next.hiMode === 'infinite' || next.loMode === 'infinite' || next.lo < next.hi) return next;
  const hi = Math.min(MAX, next.lo + 1);
  return { ...next, hi, lo: Math.min(next.lo, hi - 1) };
}

/**
 * The interval with one end moved to `value`, rounded to a tick and kept
 * at least one unit away from the other end while that end is finite.
 * @param {EditableInterval} E @param {'lo' | 'hi'} side @param {number} value
 * @returns {EditableInterval}
 */
export function moveEnd(E, side, value) {
  const v = Math.round(value);
  if (side === 'lo') {
    const top = E.hiMode === 'infinite' ? MAX : E.hi - 1;
    return { ...E, lo: Math.max(MIN, Math.min(top, v)) };
  }
  const bottom = E.loMode === 'infinite' ? MIN : E.lo + 1;
  return { ...E, hi: Math.min(MAX, Math.max(bottom, v)) };
}

/**
 * The bracket an end shows on its switch button.
 * @param {EndMode} mode @param {'lo' | 'hi'} side
 */
export function endSymbol(mode, side) {
  if (mode === 'infinite') return side === 'lo' ? '−∞' : '+∞';
  if (mode === 'closed') return side === 'lo' ? '[' : ']';
  return side === 'lo' ? '(' : ')';
}

/**
 * The result of an operation and the sentence that explains it.
 * @param {EditableInterval} A @param {EditableInterval} B
 * @param {import('../_shared/intervals.js').SetOp} op
 */
export function resultOf(A, B, op) {
  const set = combine(toSet(A), toSet(B), op);
  const info = OPS.find((o) => o.value === op) ?? OPS[0];
  const tex = setTex(set);
  let shape;
  if (set.length === 0) shape = 'Không có số nào như vậy, kết quả là tập rỗng.';
  else if (set.length === 1 && set[0].lo === -Infinity && set[0].hi === Infinity)
    shape = 'Kết quả là cả trục số $\\mathbb{R}$.';
  else if (set.length === 1) shape = `Kết quả là một ${kindOf(set[0])}.`;
  else shape = 'Kết quả là hợp của các phần rời nhau.';
  return {
    set,
    text: `$${info.tex} = ${tex}$: gồm các số ${info.rule}. ${shape}`,
  };
}
