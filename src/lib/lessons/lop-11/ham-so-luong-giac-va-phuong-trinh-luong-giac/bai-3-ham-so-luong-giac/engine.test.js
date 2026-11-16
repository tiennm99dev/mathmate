import { describe, it, expect } from 'vitest';
import { FACTS, X_MAX, X_MIN, partnerOf, propertyHolds } from './engine.js';
import { TRIG_NAMES } from '../_shared/trig.js';

describe('graph tracer facts', () => {
  it('keeps the shifted partner inside the traced range', () => {
    const fails = [];
    for (const name of TRIG_NAMES) {
      for (let x = X_MIN; x <= X_MAX; x += 5) {
        const p = /** @type {number} */ (partnerOf(name, x, 'period'));
        if (p < X_MIN || p > X_MAX || Math.abs(Math.abs(p - x) - FACTS[name].period) > 1e-9) {
          fails.push(`${name} ${x}`);
        }
      }
    }
    expect(fails).toEqual([]);
    expect(partnerOf('sin', 30, 'none')).toBeNull();
    expect(partnerOf('sin', 30, 'mirror')).toBe(-30);
  });

  it('confirms parity and period at every traced point', () => {
    const fails = [];
    for (const name of TRIG_NAMES) {
      for (let x = X_MIN; x <= X_MAX; x += 5) {
        for (const mode of /** @type {const} */ (['mirror', 'period'])) {
          if (!propertyHolds(name, x, mode)) fails.push(`${name} ${x} ${mode}`);
        }
      }
    }
    expect(fails).toEqual([]);
  });
});
