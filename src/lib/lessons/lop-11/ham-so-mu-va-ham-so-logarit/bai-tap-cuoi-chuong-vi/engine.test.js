import { describe, it, expect } from 'vitest';
import { mass, population, timeToFall, timeToGrow } from './engine.js';

describe('growth and decay models', () => {
  it('double the population after ln 2 / r years', () => {
    const bad = [];
    for (const r of [0.005, 0.011, 0.02, 0.03]) {
      for (const k of [1.5, 2, 3]) {
        const t = timeToGrow(r, k);
        if (Math.abs(population(100, r, t) - 100 * k) > 1e-9) bad.push(`${r} ${k}`);
      }
    }
    expect(bad).toEqual([]);
    expect(timeToGrow(0.02, 2)).toBeCloseTo(34.657, 3);
  });

  it('halve the mass every half-life', () => {
    expect(mass(100, 5730, 5730)).toBeCloseTo(50, 9);
    expect(mass(100, 10, 30)).toBeCloseTo(12.5, 9);
    expect(timeToFall(10, 25)).toBeCloseTo(20, 9);
    expect(mass(100, 8, timeToFall(8, 40))).toBeCloseTo(40, 9);
  });
});
