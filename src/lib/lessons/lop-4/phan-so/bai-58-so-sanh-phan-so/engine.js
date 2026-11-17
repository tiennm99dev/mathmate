/**
 * Comparing two fractions the grade 4 way, on two stacked strips: with the
 * same denominator by the numerators, against 1 by the numerator and the
 * denominator, and with different denominators (one dividing the other) by
 * bringing them to a common denominator first. Pure and DOM-free.
 */
import { SIGN_WORDS, compareSign } from '#lib/core/kid/numbers.js';
import { fracRich, fracTex, stepTex } from '../_shared/fractions.js';

/** The three cases of the lesson. */
export const KIND_TITLES = /** @type {const} */ ({
  'cung-mau': 'Hai phân số cùng mẫu số',
  'voi-1': 'So sánh phân số với 1',
  'khac-mau': 'Hai phân số khác mẫu số',
});

/**
 * A task: compare a/b with c/d. Against 1, c and d are both 1.
 * @typedef {{ kind: keyof typeof KIND_TITLES, a: number, b: number, c: number, d: number }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { kind: 'cung-mau', a: 5, b: 7, c: 4, d: 7 },
  { kind: 'cung-mau', a: 5, b: 8, c: 7, d: 8 },
  { kind: 'voi-1', a: 12, b: 15, c: 1, d: 1 },
  { kind: 'voi-1', a: 9, b: 7, c: 1, d: 1 },
  { kind: 'voi-1', a: 3, b: 3, c: 1, d: 1 },
  { kind: 'khac-mau', a: 3, b: 4, c: 5, d: 8 },
  { kind: 'khac-mau', a: 4, b: 7, c: 9, d: 14 },
  { kind: 'cung-mau', a: 4, b: 5, c: 4, d: 5 },
  { kind: 'khac-mau', a: 13, b: 18, c: 2, d: 3 },
  { kind: 'voi-1', a: 8, b: 5, c: 1, d: 1 },
  { kind: 'khac-mau', a: 3, b: 4, c: 6, d: 8 },
  { kind: 'khac-mau', a: 3, b: 5, c: 7, d: 10 },
];

/**
 * The sign between the two fractions.
 * @param {Task} t
 */
export const signOf = (t) => compareSign(t.a * t.d, t.c * t.b);

/**
 * The common denominator: the larger denominator, which the other divides.
 * @param {Task} t
 */
export const commonOf = (t) => Math.max(t.b, t.d);

/**
 * The two fractions after bringing them to the common denominator.
 * @param {Task} t
 */
export function regroup(t) {
  const m = commonOf(t);
  return { a: (t.a * m) / t.b, b: m, c: (t.c * m) / t.d, d: m };
}

/**
 * Rich text of the right side: '1' against 1, else the fraction.
 * @param {Task} t
 */
const rightRich = (t) => (t.kind === 'voi-1' ? '1' : fracRich(t.c, t.d));

/**
 * The strips to draw: against 1, the second strip is the whole b/b; with
 * different denominators and `together`, both strips are cut alike.
 * @param {Task} t
 * @param {boolean} together
 */
export function stripsOf(t, together) {
  if (t.kind === 'voi-1') {
    return [
      { n: t.a, d: t.b, text: `${t.a}/${t.b}` },
      { n: t.b, d: t.b, text: '1' },
    ];
  }
  const f = together && t.kind === 'khac-mau' ? regroup(t) : t;
  return [
    { n: f.a, d: f.b, text: `${f.a}/${f.b}` },
    { n: f.c, d: f.d, text: `${f.c}/${f.d}` },
  ];
}

/**
 * TeX of the step that brings the smaller denominator up, or '' when the
 * task needs none.
 * @param {Task} t
 */
export function regroupTex(t) {
  if (t.kind !== 'khac-mau') return '';
  const m = commonOf(t);
  return t.b < m ? stepTex(t.a, t.b, m / t.b, '×') : stepTex(t.c, t.d, m / t.d, '×');
}

/**
 * Why the sign is right, as rich text.
 * @param {Task} t
 */
export function whyText(t) {
  const s = signOf(t);
  const end = `Vậy ${fracRich(t.a, t.b)} ${s} ${rightRich(t)}.`;
  if (t.kind === 'cung-mau') {
    return `Hai phân số cùng mẫu số ${t.b}. Tử số: ${t.a} ${SIGN_WORDS[s]} ${t.c}. ${end}`;
  }
  if (t.kind === 'voi-1') {
    return `Tử số ${t.a} ${SIGN_WORDS[s]} mẫu số ${t.b}. ${end}`;
  }
  const f = regroup(t);
  const sign = compareSign(f.a, f.c);
  return `Quy đồng mẫu số: $${regroupTex(t)}$. So sánh $${fracTex(f.a, f.b)}$ và $${fracTex(f.c, f.d)}$: tử số ${f.a} ${SIGN_WORDS[sign]} ${f.c}. ${end}`;
}

/** What to look at after a wrong sign, by case. */
const HINTS = /** @type {const} */ ({
  'cung-mau': 'Cùng mẫu số: phân số nào có tử số lớn hơn thì lớn hơn.',
  'voi-1': 'Em so sánh tử số với mẫu số.',
  'khac-mau': 'Em quy đồng mẫu số trước, rồi so sánh hai tử số.',
});

/**
 * The live sentence under the strips.
 * @param {Task} t
 * @param {'>' | '<' | '=' | null} picked the last sign tapped
 * @param {boolean} together whether the strips are cut alike
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function compareNote(t, picked, together) {
  if (picked === signOf(t)) return { tone: 'ok', text: `Đúng rồi! ${whyText(t)}` };
  if (picked) {
    return {
      tone: 'warn',
      text: `Chưa đúng: ${fracRich(t.a, t.b)} không ${SIGN_WORDS[picked]} ${rightRich(t)}. ${HINTS[t.kind]}`,
    };
  }
  if (t.kind === 'khac-mau' && !together) {
    return {
      tone: 'info',
      text: 'Hai phân số khác mẫu số. Em bấm "Quy đồng mẫu số" để hai băng có cùng số phần, rồi chọn dấu.',
    };
  }
  return { tone: 'info', text: 'Em nhìn phần tô màu của hai băng, rồi chọn dấu >, < hoặc =.' };
}
