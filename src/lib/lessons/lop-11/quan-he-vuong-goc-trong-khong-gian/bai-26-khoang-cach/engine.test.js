import { describe, expect, it } from 'vitest';
import { PRESETS, RANGE, STEPS, best, presetOf, placeOf, verdict } from './engine.js';

describe('the distance between two skew lines of a cube', () => {
  it('has the common perpendicular of every pair on the slider grid', () => {
    const wrong = [];
    for (const p of PRESETS) {
      const c = best(p);
      if (Math.abs(c.s * STEPS - c.m) > 1e-9 || Math.abs(c.t * STEPS - c.n) > 1e-9)
        wrong.push(p.id);
      if (c.m < RANGE.min || c.m > RANGE.max || c.n < RANGE.min || c.n > RANGE.max)
        wrong.push(p.id);
    }
    expect(wrong).toEqual([]);
  });

  it('finds the book distances', () => {
    const d = Object.fromEntries(PRESETS.map((p) => [p.id, best(p).d / 3]));
    expect(d['ab-cc']).toBeCloseTo(1);
    expect(d['aa-bd']).toBeCloseTo(Math.SQRT2 / 2);
    expect(d['ac-bd']).toBeCloseTo(1);
    expect(d['bd-cd']).toBeCloseTo(Math.sqrt(3) / 3);
  });

  it('is shortest only at the common perpendicular, perpendicular to both lines', () => {
    const wrong = [];
    for (const p of PRESETS) {
      const c = best(p);
      const s = placeOf(p, c.m, c.n);
      if (!s.least || Math.abs(s.withA - 90) > 1e-6 || Math.abs(s.withB - 90) > 1e-6)
        wrong.push(p.id);
      for (let m = RANGE.min; m <= RANGE.max; m += 3) {
        for (let n = RANGE.min; n <= RANGE.max; n += 3) {
          const t = placeOf(p, m, n);
          if (t.length < s.length - 1e-9 || (t.least && (m !== c.m || n !== c.n)))
            wrong.push(`${p.id} ${m} ${n}`);
        }
      }
    }
    expect(wrong).toEqual([]);
  });

  it('reads the result', () => {
    const p = presetOf('bd-cd');
    expect(verdict(p, placeOf(p, 16, 8)).text).toContain('\\approx 0{,}58a');
    expect(verdict(p, placeOf(p, 0, 0)).tone).toBe('info');
    const q = presetOf('ab-cc');
    expect(verdict(q, placeOf(q, 24, 0)).text).toContain('= a$.');
  });
});
