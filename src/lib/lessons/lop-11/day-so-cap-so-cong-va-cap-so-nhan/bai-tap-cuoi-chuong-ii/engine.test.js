import { describe, it, expect } from 'vitest';
import { tidy } from '#lib/core/number-format.js';
import { balances, doublingYears } from './engine.js';

describe('simple and compound interest', () => {
  it('grows by a fixed amount or by a fixed ratio', () => {
    const { simple, compound } = balances(100, 6, 5);
    expect(simple.map((v) => tidy(v))).toEqual([100, 106, 112, 118, 124, 130]);
    expect(compound[1]).toBeCloseTo(106, 9);
    expect(compound[5]).toBeCloseTo(133.8225578, 6);
    const fails = [];
    for (let n = 1; n <= 5; n++) {
      if (Math.abs(simple[n] - simple[n - 1] - 6) > 1e-9) fails.push(`simple ${n}`);
      if (Math.abs(compound[n] / compound[n - 1] - 1.06) > 1e-12) fails.push(`compound ${n}`);
    }
    expect(fails).toEqual([]);
  });

  it('never lets simple interest overtake compound interest', () => {
    const { simple, compound } = balances(50, 8, 30);
    expect(simple.every((s, n) => compound[n] >= s - 1e-9)).toBe(true);
  });

  it('finds the years needed to double the deposit', () => {
    expect(doublingYears(6)).toEqual({ simple: 17, compound: 12 });
    expect(doublingYears(10)).toEqual({ simple: 10, compound: 8 });
    expect(doublingYears(5)).toEqual({ simple: 20, compound: 15 });
  });
});
