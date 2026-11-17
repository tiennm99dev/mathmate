import { describe, it, expect } from 'vitest';
import { ROUNDS, checkArea } from './engine.js';
import { simpson } from '../_shared/plot.js';

describe('shaded-region rounds', () => {
  it('the stated area is the integral of |f − g| over the region', () => {
    for (const r of ROUNDS) {
      const g = r.g ?? (() => 0);
      const value = simpson((x) => Math.abs(r.f(x) - g(x)), r.from, r.to, 4000);
      expect(value).toBeCloseTo(r.area, 5);
    }
  });

  it('the curves meet at the ends of a region bounded by two graphs', () => {
    for (const r of ROUNDS.filter((k) => k.g)) {
      const g = /** @type {(x: number) => number} */ (r.g);
      expect(r.f(r.from)).toBeCloseTo(g(r.from), 12);
      expect(r.f(r.to)).toBeCloseTo(g(r.to), 12);
    }
  });

  it('reads integers, fractions and decimal commas', () => {
    const [axis, small, , last] = ROUNDS;
    expect(checkArea(axis, '2')).toBe(true);
    expect(checkArea(small, '1/6')).toBe(true);
    expect(checkArea(small, '2/12')).toBe(true);
    expect(checkArea(last, '4,5')).toBe(true);
    expect(checkArea(last, '9/2')).toBe(true);
    expect(checkArea(axis, '2/3')).toBe(false);
    expect(checkArea(axis, 'hai')).toBe(null);
  });
});
