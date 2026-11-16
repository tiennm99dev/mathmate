/**
 * The child's side of a column addition or subtraction of decimals: setting
 * the numbers out (lined up at the comma, not at the right edge), writing
 * each result digit from the right, then putting the comma in the result.
 * Pure and DOM-free; `decimal-column.svelte` draws it.
 */
import { columnPlan, partsOf } from './decimal-ops.js';

/** @typedef {import('./decimal-ops.js').ColumnStep} ColumnStep */

/**
 * The two numbers written one under the other, as lines of equal width:
 * lined up at the comma (the right way) or at the right edge (the slip).
 * Spaces fill the empty places.
 * @param {string} a
 * @param {string} b
 * @param {'comma' | 'right'} how
 */
export function layoutLines(a, b, how) {
  if (how === 'right') {
    const width = Math.max(a.length, b.length);
    return [a.padStart(width), b.padStart(width)];
  }
  const [pa, pb] = [partsOf(a), partsOf(b)];
  const w = Math.max(pa.whole.length, pb.whole.length);
  const f = Math.max(pa.frac.length, pb.frac.length);
  /** @param {{ whole: string, frac: string }} p */
  const line = (p) =>
    `${p.whole.padStart(w)}${p.frac === '' ? (f > 0 ? ' ' : '') : ','}${p.frac.padEnd(f)}`;
  return [line(pa), line(pb)];
}

/**
 * Whether the two layouts look different; when the numbers have as many
 * digits after the comma, lining up at the right edge is right too.
 * @param {string} a
 * @param {string} b
 */
export const layoutsDiffer = (a, b) =>
  layoutLines(a, b, 'comma').join('|') !== layoutLines(a, b, 'right').join('|');

/**
 * A nudge for a column, without its answer.
 * @param {ColumnStep} step
 * @param {'+' | '-'} op
 */
export function askOf(step, op) {
  const { top, bottom, carryIn } = step;
  if (op === '+') {
    if (top === null || bottom === null) {
      const one = /** @type {number} */ (top ?? bottom);
      return carryIn > 0
        ? `Cột này có ${one} và nhớ ${carryIn}. ${one} thêm ${carryIn} bằng mấy?`
        : `Cột này chỉ có chữ số ${one}. Em hạ ${one} xuống.`;
    }
    return carryIn > 0
      ? `${top} cộng ${bottom} bằng mấy? Nhớ thêm ${carryIn} nữa nhé.`
      : `${top} cộng ${bottom} bằng mấy?`;
  }
  const t = /** @type {number} */ (top);
  const need = (bottom ?? 0) + carryIn;
  if (bottom === null && carryIn === 0) return `Cột này chỉ có chữ số ${t}. Em hạ ${t} xuống.`;
  const lead = carryIn > 0 && bottom !== null ? `${bottom} thêm ${carryIn} bằng ${need}. ` : '';
  return t < need
    ? `${lead}${t} không trừ được ${need}. Em lấy ${t + 10} trừ ${need}.`
    : `${lead}${t} trừ ${need} bằng mấy?`;
}

/**
 * Where the child is in a calculation: `step` is the column being written,
 * `entered` how many of its digits are written already.
 * @typedef {object} Progress
 * @property {number} step
 * @property {number} entered
 */

/**
 * The digit the child must tap next: a sum's last column may write two
 * digits, the right one first. Null when every column is written.
 * @param {ColumnStep[]} steps
 * @param {Progress} at
 */
export function expectedDigit(steps, at) {
  const step = steps[at.step];
  if (!step) return null;
  return Number(step.write[step.write.length - 1 - at.entered]);
}

/**
 * Moves on after a right digit, skipping columns with nothing to write (a
 * leading 0 of a difference).
 * @param {ColumnStep[]} steps
 * @param {Progress} at
 * @returns {Progress}
 */
export function advance(steps, at) {
  const step = steps[at.step];
  if (at.entered + 1 < step.write.length) return { step: at.step, entered: at.entered + 1 };
  return skipBlank(steps, { step: at.step + 1, entered: 0 });
}

/**
 * Skips columns that write nothing.
 * @param {ColumnStep[]} steps
 * @param {Progress} at
 * @returns {Progress}
 */
export function skipBlank(steps, at) {
  let i = at.step;
  while (i < steps.length && steps[i].write === '') i += 1;
  return { step: i, entered: i === at.step ? at.entered : 0 };
}

/**
 * The digits written under the line so far, by place (10^exp → text).
 * @param {ColumnStep[]} steps
 * @param {Progress} at
 */
export function writtenAt(steps, at) {
  /** @type {Map<number, string>} */
  const out = new Map();
  steps.forEach((s, i) => {
    const count = i < at.step ? s.write.length : i === at.step ? at.entered : 0;
    for (let k = 0; k < count; k++) {
      out.set(s.exp + k, s.write[s.write.length - 1 - k]);
    }
  });
  return out;
}

/**
 * Checks a tapped digit.
 * @param {ColumnStep[]} steps
 * @param {Progress} at
 * @param {number} digit
 * @param {'+' | '-'} op
 * @param {number} misses wrong taps on this digit before
 * @returns {{ ok: boolean, text: string }}
 */
export function checkDigit(steps, at, digit, op, misses) {
  const step = steps[at.step];
  const want = expectedDigit(steps, at);
  if (digit === want) {
    const more = at.entered + 1 < step.write.length;
    return {
      ok: true,
      text: more ? `Đúng! Viết tiếp chữ số ${step.write[0]} bên trái.` : `${step.say}.`,
    };
  }
  return {
    ok: false,
    text: misses > 0 ? `Chưa đúng. ${step.say}.` : `Chưa đúng. ${askOf(step, op)}`,
  };
}

/**
 * Everything a task needs.
 * @param {string} a
 * @param {string} b
 * @param {'+' | '-'} op
 */
export function taskOf(a, b, op) {
  const plan = columnPlan(a, b, op);
  const start = skipBlank(plan.steps, { step: 0, entered: 0 });
  return { ...plan, start };
}
