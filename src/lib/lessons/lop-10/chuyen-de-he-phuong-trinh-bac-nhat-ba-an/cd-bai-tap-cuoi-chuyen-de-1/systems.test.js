import { describe, expect, it } from 'vitest';
import { SYSTEMS } from './systems.js';
import { checkValues, classify, systemOf } from '../_shared/system3.js';
import { toNumber } from '#lib/fraction-engine/index.js';

describe('self-check systems', () => {
  for (const s of SYSTEMS) {
    it(`${s.id}: the solution satisfies every equation and is the only one`, () => {
      expect(checkValues(s.equations, s.solution).every((r) => r.ok)).toBe(true);
      const sol = classify(systemOf(s.equations.map((e) => [...e.coeffs, e.rhs])));
      expect(sol.kind).toBe('unique');
      if (sol.kind === 'unique') {
        sol.values.forEach((v, i) => expect(toNumber(v)).toBeCloseTo(s.solution[i], 12));
      }
    });
  }
});
