import { describe, it, expect } from 'vitest';
import { CASES, H_SIZES, firstStart, gap, secantSlope } from './engine.js';

describe('secant slopes', () => {
  it('give the exact quotient for x² (2x₀ + h)', () => {
    const sq = CASES[0];
    expect(secantSlope(sq.f, 1, 0.5)).toBeCloseTo(2.5, 12);
    expect(secantSlope(sq.f, 1, -0.5)).toBeCloseTo(1.5, 12);
  });

  it('close in on the derivative as h shrinks, from both sides', () => {
    const bad = [];
    for (const c of CASES) {
      for (const x0 of c.starts) {
        for (const s of [1, -1]) {
          const gaps = H_SIZES.map((h) => gap(c, x0, s * h));
          const last = gaps[gaps.length - 1];
          if (!(last < 0.02)) bad.push(`${c.id} ${x0} ${s} ${last}`);
          if (!(gaps[0] >= last)) bad.push(`${c.id} ${x0} ${s} not shrinking`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('start every case on a point with a slanted tangent', () => {
    const bad = CASES.filter((c) => c.df(c.starts[firstStart(c)]) === 0);
    expect(bad.map((c) => c.id)).toEqual([]);
  });

  it('keep both points of every secant inside the window', () => {
    const bad = [];
    for (const c of CASES) {
      for (const x0 of c.starts) {
        for (const h of [H_SIZES[0], -H_SIZES[0]]) {
          for (const x of [x0, x0 + h]) {
            const y = c.f(x);
            const v = c.view;
            if (!(x > v.xMin && x < v.xMax && y > v.yMin && y < v.yMax)) bad.push(`${c.id} ${x}`);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
