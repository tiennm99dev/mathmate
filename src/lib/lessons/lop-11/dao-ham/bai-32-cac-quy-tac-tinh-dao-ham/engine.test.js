import { describe, it, expect } from 'vitest';
import katex from 'katex';
import {
  PRESETS,
  RULES,
  WHY,
  X,
  add,
  apow,
  derive,
  evaluate,
  fn,
  isBasic,
  log,
  mul,
  num,
  pow,
  sqrt,
  stepsOf,
  sub,
  tex,
} from './engine.js';

/** @param {import('./engine.js').Node} n @param {number} x */
const slope = (n, x) => (evaluate(n, x + 1e-6) - evaluate(n, x - 1e-6)) / 2e-6;

/** @param {string} s */
const renders = (s) => {
  katex.renderToString(s, { throwOnError: true, strict: 'error' });
  return true;
};

const XS = [0.3, 0.7, 1.4, 2.1];

describe('derivative calculator', () => {
  it('differentiates every worked expression correctly', () => {
    const bad = [];
    for (const p of PRESETS) {
      const d = derive(p.expr);
      for (const x of XS) {
        const want = slope(p.expr, x);
        const scale = Math.max(1, Math.abs(want));
        if (Math.abs(evaluate(d, x) - want) > 1e-4 * scale) bad.push(`${p.id} raw at ${x}`);
        if (Math.abs(p.check(x) - want) > 1e-4 * scale) bad.push(`${p.id} final at ${x}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('knows the basic derivatives of the table', () => {
    const cases = [
      pow(X, 5),
      sqrt(X),
      fn('sin', X),
      fn('cos', X),
      fn('tan', X),
      fn('cot', X),
      fn('exp', X),
      fn('ln', X),
      apow(3, X),
      log(2, X),
    ];
    const bad = [];
    for (const c of cases) {
      if (!isBasic(c)) bad.push(`${tex(c)} not basic`);
      if (Math.abs(evaluate(derive(c), 0.8) - slope(c, 0.8)) > 1e-5) bad.push(tex(c));
    }
    expect(bad).toEqual([]);
  });

  it('writes expressions the book way', () => {
    expect(tex(sub(add(mul(num(2), pow(X, 3)), X), num(1)))).toBe('2x^3 + x - 1');
    expect(tex(derive(pow(fn('cos', mul(num(3), X)), 3)))).toBe('-9\\sin 3x \\cdot \\cos^2 3x');
    expect(tex(derive(fn('cot', X)))).toBe('-\\dfrac{1}{\\sin^2 x}');
    expect(tex(derive(apow(3, X)))).toBe('3^{x}\\ln 3');
  });

  it('names the outermost rule first and ends with the table', () => {
    const first = Object.fromEntries(PRESETS.map((p) => [p.id, stepsOf(p.expr)[0].rule]));
    expect(first).toEqual({
      poly: 'sum',
      product: 'product',
      quotient: 'quotient',
      power: 'chain',
      root: 'chain',
      trig: 'chain',
      exp: 'product',
      log: 'chain',
    });
    const bad = PRESETS.filter((p) => {
      const last = stepsOf(p.expr).at(-1)?.rule;
      return last !== 'basic' && last !== 'const';
    });
    expect(bad.map((p) => p.id)).toEqual([]);
  });

  it('writes every step, result and rule as valid TeX', () => {
    const all = [
      ...PRESETS.flatMap((p) => [
        tex(p.expr),
        tex(derive(p.expr)),
        p.final,
        ...stepsOf(p.expr).flatMap((s) => [s.tex, s.note ?? 'x']),
      ]),
      ...RULES.map((r) => r.tex),
    ];
    expect(all.every(renders)).toBe(true);
    expect(Object.keys(WHY).sort()).toEqual(RULES.map((r) => r.id).sort());
  });
});
