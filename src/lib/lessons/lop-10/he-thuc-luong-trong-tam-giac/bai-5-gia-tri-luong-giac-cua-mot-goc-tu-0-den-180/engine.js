/**
 * Logic of the unit half-circle widget: the angle of a point M on the half
 * circle, its four trigonometric values (exact at the book's special angles),
 * the sign of each value and the find-the-angle tasks.
 */
import { approxTex, approxText, cosDeg, cotDeg, sinDeg, tanDeg } from '../_shared/trig.js';

/** The angles of the book's table of special values. */
export const SPECIAL = [0, 30, 45, 60, 90, 120, 135, 150, 180];

/** @typedef {'sin' | 'cos' | 'tan' | 'cot'} Fn */
/** @type {Fn[]} */
export const FNS = ['sin', 'cos', 'tan', 'cot'];

// Exact TeX of the acute and right angles; the obtuse ones follow from 180° − α.
/** @type {Record<number, Record<Fn, string | null>>} */
const ACUTE = {
  0: { sin: '0', cos: '1', tan: '0', cot: null },
  30: {
    sin: '\\dfrac{1}{2}',
    cos: '\\dfrac{\\sqrt{3}}{2}',
    tan: '\\dfrac{\\sqrt{3}}{3}',
    cot: '\\sqrt{3}',
  },
  45: { sin: '\\dfrac{\\sqrt{2}}{2}', cos: '\\dfrac{\\sqrt{2}}{2}', tan: '1', cot: '1' },
  60: {
    sin: '\\dfrac{\\sqrt{3}}{2}',
    cos: '\\dfrac{1}{2}',
    tan: '\\sqrt{3}',
    cot: '\\dfrac{\\sqrt{3}}{3}',
  },
  90: { sin: '1', cos: '0', tan: null, cot: '0' },
};

/** @param {string | null} tex */
const negate = (tex) => (tex === null || tex === '0' ? tex : `-${tex}`);

/**
 * The exact values at a special angle as TeX (null where the value is not
 * defined), or null when the angle is not one of `SPECIAL`.
 * @param {number} alpha
 * @returns {Record<Fn, string | null> | null}
 */
export function exactAt(alpha) {
  if (!SPECIAL.includes(alpha)) return null;
  if (alpha <= 90) return ACUTE[alpha];
  const base = ACUTE[180 - alpha];
  return { sin: base.sin, cos: negate(base.cos), tan: negate(base.tan), cot: negate(base.cot) };
}

/**
 * The four values of `alpha` as numbers, null where not defined.
 * @param {number} alpha
 * @returns {Record<Fn, number | null>}
 */
export function valuesAt(alpha) {
  return { sin: sinDeg(alpha), cos: cosDeg(alpha), tan: tanDeg(alpha), cot: cotDeg(alpha) };
}

/**
 * One readout line per function as TeX: exact at a special angle, otherwise
 * rounded to four decimals.
 * @param {number} alpha
 * @returns {Array<{ fn: Fn, tex: string, defined: boolean }>}
 */
export function readout(alpha) {
  const exact = exactAt(alpha);
  const values = valuesAt(alpha);
  return FNS.map((fn) => {
    const v = values[fn];
    const head = `\\${fn} ${alpha}^\\circ`;
    if (v === null) return { fn, tex: `${head}\\ \\text{không xác định}`, defined: false };
    const approx = approxTex(v);
    const value = exact ? `= ${exact[fn]}` : approx.startsWith('\\approx') ? approx : `= ${approx}`;
    return { fn, tex: `${head} ${value}`, defined: true };
  });
}

/**
 * The integer angle xOM of a point (x, y) in math coordinates; points below
 * the x-axis go to the nearer end of the half circle.
 * @param {{ x: number, y: number }} p
 */
export function angleOfPoint(p) {
  if (p.y <= 0) return p.x >= 0 ? 0 : 180;
  return Math.round((Math.atan2(p.y, p.x) * 180) / Math.PI);
}

/**
 * What the signs of the four values say at `alpha`, as rich text.
 * @param {number} alpha
 */
export function signNote(alpha) {
  if (alpha === 0)
    return 'M trùng điểm $(1; 0)$: $\\sin 0^\\circ = 0$, $\\cos 0^\\circ = 1$, $\\cot 0^\\circ$ không xác định vì tung độ bằng $0$.';
  if (alpha === 180)
    return 'M trùng điểm $(-1; 0)$: $\\sin 180^\\circ = 0$, $\\cos 180^\\circ = -1$, $\\cot 180^\\circ$ không xác định vì tung độ bằng $0$.';
  if (alpha === 90)
    return 'M ở đỉnh nửa đường tròn, toạ độ $(0; 1)$: $\\sin 90^\\circ = 1$, $\\cos 90^\\circ = 0$, nên $\\tan 90^\\circ$ không xác định.';
  if (alpha < 90)
    return `Góc nhọn: M nằm bên phải trục tung nên hoành độ dương, cả bốn giá trị $\\sin$, $\\cos$, $\\tan$, $\\cot$ đều dương.`;
  return `Góc tù: M nằm bên trái trục tung nên $\\cos ${alpha}^\\circ < 0$; $\\sin ${alpha}^\\circ > 0$ còn $\\tan$ và $\\cot$ âm.`;
}

/**
 * The supplement relations at `alpha` with its own numbers, as rich text.
 * @param {number} alpha
 */
export function supplementNote(alpha) {
  const beta = 180 - alpha;
  const s = approxText(sinDeg(alpha));
  const c = approxText(cosDeg(alpha));
  const cb = approxText(cosDeg(beta));
  return `M′ đối xứng với M qua trục tung, ứng với góc $${beta}^\\circ = 180^\\circ - ${alpha}^\\circ$: cùng tung độ nên $\\sin ${beta}^\\circ = \\sin ${alpha}^\\circ$ (${s}), hoành độ đối nhau nên $\\cos ${beta}^\\circ = -\\cos ${alpha}^\\circ$ (${cb} và ${c}).`;
}

/**
 * The find-the-angle tasks: a condition and the one angle from 0° to 180°
 * that satisfies it.
 * @type {Array<{ tex: string, text: string, answer: number }>}
 */
export const TASKS = [
  { tex: '\\cos \\alpha = -\\dfrac{1}{2}', text: 'côsin alpha bằng trừ một phần hai', answer: 120 },
  {
    tex: '\\sin \\alpha = \\dfrac{1}{2},\\ \\alpha \\text{ tù}',
    text: 'sin alpha bằng một phần hai và alpha là góc tù',
    answer: 150,
  },
  { tex: '\\tan \\alpha = -1', text: 'tang alpha bằng trừ 1', answer: 135 },
  { tex: '\\cot \\alpha = \\sqrt{3}', text: 'côtang alpha bằng căn bậc hai của 3', answer: 30 },
  { tex: '\\cos \\alpha = -1', text: 'côsin alpha bằng trừ 1', answer: 180 },
  { tex: '\\tan \\alpha = \\sqrt{3}', text: 'tang alpha bằng căn bậc hai của 3', answer: 60 },
  { tex: '\\cos \\alpha = 0', text: 'côsin alpha bằng 0', answer: 90 },
];

/**
 * Feedback for the current task at the point's angle.
 * @param {number} task index into TASKS
 * @param {number} alpha
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function taskNote(task, alpha) {
  const t = TASKS[task];
  if (alpha === t.answer)
    return { tone: 'ok', text: `Đúng! $\\alpha = ${alpha}^\\circ$ thoả mãn $${t.tex}$.` };
  const near = Math.abs(alpha - t.answer) <= 5;
  return {
    tone: 'info',
    text: near
      ? `Gần rồi, $\\alpha = ${alpha}^\\circ$. Dùng phím mũi tên để chỉnh từng độ.`
      : `Kéo M để $${t.tex}$. Nhìn toạ độ của M: hoành độ là $\\cos \\alpha$, tung độ là $\\sin \\alpha$.`,
  };
}
