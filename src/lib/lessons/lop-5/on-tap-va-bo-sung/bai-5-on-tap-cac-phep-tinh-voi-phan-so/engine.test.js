import { describe, expect, it } from 'vitest';
import { add, div, equals, fraction, mul, sub } from '#lib/fraction-engine/index.js';
import {
  TASKS,
  exprText,
  isRight,
  optionsOf,
  rawResult,
  resultOf,
  resultStep,
  stepsOf,
} from './engine.js';

/** @param {import('./engine.js').Task} t */
function engineResult(t) {
  const x = fraction(t.a, t.b);
  const y = fraction(t.c, t.d);
  if (t.op === '+') return add(x, y);
  if (t.op === '−') return sub(x, y);
  if (t.op === ':n') return div(x, y);
  return mul(x, y);
}

describe('fraction strips for each operation', () => {
  it('agrees with the fraction engine and keeps every strip within one whole', () => {
    const bad = [];
    for (const t of TASKS) {
      const raw = rawResult(t);
      if (!equals(raw, engineResult(t))) bad.push(exprText(t));
      if (raw.n <= 0 || raw.n > raw.d) bad.push(exprText(t));
      if ((t.op === '+' || t.op === '−') && t.d % t.b !== 0 && t.b % t.d !== 0)
        bad.push(exprText(t));
      const strips = [...stepsOf(t), resultStep(t)].flatMap((s) => s.bars);
      if (strips.some((b) => b.numerator > b.denominator || b.denominator > 48)) {
        bad.push(exprText(t));
      }
    }
    expect(bad).toEqual([]);
  });

  it('offers three different results with exactly one right', () => {
    const bad = [];
    for (const t of TASKS) {
      const options = optionsOf(t, 1);
      if (options.filter((o) => isRight(t, o)).length !== 1) bad.push(exprText(t));
    }
    expect(bad).toEqual([]);
  });

  it('writes the steps the book way', () => {
    const t = TASKS[0];
    expect(exprText(t)).toBe('$\\dfrac{1}{4}$ + $\\dfrac{3}{8}$');
    expect(stepsOf(t)[1].text).toMatch(/Quy đồng mẫu số.*\$\\dfrac\{2\}\{8\}\$/);
    expect(resultStep(t).text).toBe(
      'Gộp các phần: $\\dfrac{2}{8}$ + $\\dfrac{3}{8}$ = $\\dfrac{5}{8}$.',
    );
    const half = TASKS.find((x) => x.op === ':n' && x.a === 4);
    expect(resultStep(/** @type {import('./engine.js').Task} */ (half)).text).toBe(
      'Giữ nguyên tử số, nhân mẫu số với 2: $\\dfrac{4}{5}$ : 2 = $\\dfrac{4}{10}$ = $\\dfrac{2}{5}$.',
    );
    expect(resultOf(TASKS[4])).toEqual({ n: 1, d: 2 });
  });
});
