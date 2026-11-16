import { describe, expect, it } from 'vitest';
import { add, equals, fraction, sub } from '#lib/fraction-engine/index.js';
import {
  MAX_PARTS,
  TASKS,
  candidates,
  exprText,
  isCommon,
  isRight,
  optionsOf,
  resultOf,
  resultStep,
  tryDenominator,
} from './engine.js';

/** @param {import('./engine.js').Task} t */
function engineResult(t) {
  const x = fraction(t.a, t.b);
  const y = fraction(t.c, t.d);
  return t.op === '+' ? add(x, y) : sub(x, y);
}

describe('adding and subtracting fractions with different denominators', () => {
  it('keeps every task a real case of different denominators within one whole', () => {
    const bad = [];
    for (const t of TASKS) {
      const v = resultOf(t);
      if (!equals(v, engineResult(t))) bad.push(exprText(t));
      if (v.n <= 0 || v.n > v.d) bad.push(exprText(t));
      if (t.b % t.d === 0 || t.d % t.b === 0) bad.push(exprText(t));
    }
    expect(bad).toEqual([]);
  });

  it('offers denominators with the product and at least one that fails', () => {
    const bad = [];
    for (const t of TASKS) {
      const c = candidates(t);
      if (!c.includes(t.b * t.d) || c.some((m) => m > MAX_PARTS)) bad.push(exprText(t));
      if (!c.some((m) => !isCommon(t, m))) bad.push(exprText(t));
    }
    expect(bad).toEqual([]);
  });

  it('cuts the strips only for a common denominator', () => {
    const t = TASKS[0];
    expect(tryDenominator(t, 6).ok).toBe(true);
    expect(tryDenominator(t, 6).bars.map((b) => b.label)).toEqual(['3/6', '2/6']);
    const miss = tryDenominator(t, 5);
    expect(miss.ok).toBe(false);
    expect(miss.text).toContain('5 không chia hết cho 2, 5 không chia hết cho 3');
    expect(tryDenominator(t, 3).text).toContain('3 không chia hết cho 2');
  });

  it('offers three different results with exactly one right, for every common denominator', () => {
    const bad = [];
    for (const t of TASKS) {
      for (const m of candidates(t).filter((x) => isCommon(t, x))) {
        const options = optionsOf(t, m, 2);
        const values = new Set(options.map((o) => o.n / o.d));
        if (options.length !== 3 || values.size !== 3) bad.push(`${exprText(t)} / ${m}`);
        if (options.filter((o) => isRight(t, o)).length !== 1) bad.push(`${exprText(t)} / ${m}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('writes the result step the book way', () => {
    expect(resultStep(TASKS[0], 6).text).toBe(
      'Gộp các phần: $\\dfrac{1}{2}$ + $\\dfrac{1}{3}$ = $\\dfrac{3}{6}$ + $\\dfrac{2}{6}$ = $\\dfrac{5}{6}$.',
    );
    expect(resultStep(TASKS[7], 6).text).toBe(
      'Bớt các phần: $\\dfrac{2}{3}$ − $\\dfrac{1}{2}$ = $\\dfrac{4}{6}$ − $\\dfrac{3}{6}$ = $\\dfrac{1}{6}$.',
    );
  });
});
