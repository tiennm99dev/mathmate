import { describe, expect, it } from 'vitest';
import { SCENARIOS } from './scenarios.js';
import { checkValues, classify, systemOf, tupleTex } from '../_shared/system3.js';

describe('set-up scenarios', () => {
  for (const s of SCENARIOS) {
    it(`${s.id}: the stated solution satisfies every equation`, () => {
      expect(checkValues(s.equations, s.solution).every((r) => r.ok)).toBe(true);
    });

    it(`${s.id}: the solution is the only one`, () => {
      // Scale decimal rows to integers before solving exactly.
      const rows = s.equations.map((e) => [...e.coeffs, e.rhs].map((v) => Math.round(v * 10)));
      const sol = classify(systemOf(rows));
      expect(sol.kind === 'unique' && tupleTex(sol.values)).toBe(`(${s.solution.join('; ')})`);
    });

    it(`${s.id}: the solution sits on the sliders' steps and ranges`, () => {
      s.unknowns.forEach((u, i) => {
        const v = s.solution[i];
        expect(v).toBeGreaterThanOrEqual(u.min);
        expect(v).toBeLessThanOrEqual(u.max);
        expect((v - u.min) % u.step).toBe(0);
      });
    });

    it(`${s.id}: the starting values are not already the answer`, () => {
      const start = s.unknowns.map((u) => u.start);
      expect(checkValues(s.equations, start).every((r) => r.ok)).toBe(false);
    });
  }
});
