import { describe, it, expect } from 'vitest';
import { CASES, exactOf, sumOf } from './engine.js';
import { simpson } from '../_shared/plot.js';

describe('integral cases', () => {
  it('F(b) − F(a) matches a numeric integral and the stated value', () => {
    const values = { square: 8 / 3, sin: 2, inverse: Math.log(3), signed: 2 / 3 };
    for (const c of CASES) {
      expect(exactOf(c)).toBeCloseTo(values[/** @type {keyof typeof values} */ (c.id)], 10);
      expect(simpson(c.f, c.a, c.b)).toBeCloseTo(exactOf(c), 8);
    }
  });

  it('Riemann sums close in on the integral as n grows', () => {
    const bad = [];
    for (const c of CASES) {
      for (const rule of /** @type {const} */ (['left', 'mid', 'right'])) {
        const e4 = sumOf(c, 4, rule).error;
        const e64 = sumOf(c, 64, rule).error;
        if (!(e64 < 0.1 && e64 <= e4)) bad.push(`${c.id} ${rule}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('the left sum of x² on [0; 2] with 4 rectangles is 7/4', () => {
    const c = CASES[0];
    const s = sumOf(c, 4, 'left');
    expect(s.rects).toHaveLength(4);
    expect(s.sum).toBeCloseTo(1.75, 12);
  });
});
