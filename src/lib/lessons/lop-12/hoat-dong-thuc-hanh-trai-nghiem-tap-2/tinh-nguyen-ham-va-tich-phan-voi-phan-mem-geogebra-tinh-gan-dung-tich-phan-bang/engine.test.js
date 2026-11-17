import { describe, expect, it } from 'vitest';
import { TASKS, errorBound, leastN, nodes, trapezoid, trapezoidFromValues } from './engine.js';

describe('trapezoid rule', () => {
  it('gives the book result for e^x/x on [1; 2] with n = 5', () => {
    const { sum, xs } = trapezoid((x) => Math.exp(x) / x, 1, 2, 5);
    expect(xs).toHaveLength(6);
    expect(sum).toBeCloseTo(3.065, 3);
  });

  it('is exact for a linear function and has n trapezoids', () => {
    const { sum, traps } = trapezoid((x) => 2 * x + 1, 0, 3, 4);
    expect(sum).toBeCloseTo(12, 12);
    expect(traps).toHaveLength(4);
    expect(traps[3].x1).toBe(3);
  });

  it('ends the nodes exactly at b', () => {
    expect(nodes(0, Math.PI, 7).at(-1)).toBe(Math.PI);
  });

  it('keeps every error under the bound, for every task', () => {
    const bad = [];
    for (const t of TASKS) {
      for (const n of [1, 2, 3, 5, 8, 13, 40]) {
        const err = Math.abs(trapezoid(t.f, t.a, t.b, n).sum - t.exact);
        if (err > errorBound(t.a, t.b, t.m, n) + 1e-12) bad.push(`${t.id} n=${n}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('has M at least max |f″| on the interval', () => {
    const bad = [];
    for (const t of TASKS) {
      const h = 1e-4;
      for (let i = 0; i <= 200; i++) {
        const x = t.a + ((t.b - t.a) * i) / 200;
        const d2 = (t.f(x + h) - 2 * t.f(x) + t.f(x - h)) / (h * h);
        if (Math.abs(d2) > t.m + 1e-3) bad.push(`${t.id} x=${x}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('finds the least n for an accuracy', () => {
    expect(leastN(1, 2, Math.E, 0.01)).toBe(5);
    expect(errorBound(1, 2, Math.E, 4)).toBeGreaterThanOrEqual(0.01);
    expect(leastN(0, 2, 2, 0.01)).toBe(12);
  });

  it('adds measured values the book way', () => {
    expect(trapezoidFromValues([240, 248, 256, 260, 264, 272, 298, 316, 320], 60)).toBe(131640);
  });

  it('knows the exact values', () => {
    const byId = Object.fromEntries(TASKS.map((t) => [t.id, t]));
    expect(byId['exp-over-x'].exact).toBeCloseTo(3.059116, 5);
    expect(byId.gauss.exact).toBeCloseTo(0.746824, 5);
  });
});
