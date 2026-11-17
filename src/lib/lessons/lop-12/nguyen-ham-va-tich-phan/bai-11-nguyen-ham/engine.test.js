import { describe, it, expect } from 'vitest';
import { CASES, FAMILY, constantFor, passesTarget, slopeOf } from './engine.js';

describe('antiderivative cases', () => {
  it('each F has derivative f, so every curve F + C has the same slope', () => {
    const bad = [];
    for (const c of CASES) {
      for (let x = c.lo; x <= c.hi; x += 0.37) {
        for (const C of FAMILY) {
          const slope = slopeOf((t) => c.F(t) + C, x);
          if (Math.abs(slope - c.f(x)) > 1e-4) bad.push(`${c.id} x=${x} C=${C}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('the target point is met by exactly one constant on the slider grid', () => {
    for (const c of CASES) {
      expect(constantFor(c)).toBe(c.target.c);
      expect(passesTarget(c, c.target.c)).toBe(true);
      expect(passesTarget(c, c.target.c + 0.5)).toBe(false);
      expect(c.target.c).toBeGreaterThanOrEqual(-3);
      expect(c.target.c).toBeLessThanOrEqual(3);
    }
  });
});
