import { describe, it, expect } from 'vitest';
import { atHit, mass, population, timeToFall, timeToGrow, yearsShown } from './engine.js';

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

describe('time window and slider', () => {
  it('shows the time the target is reached for every rate and target', () => {
    const bad = [];
    for (let rate = 0.5; rate <= 3.001; rate += 0.1) {
      for (const k of [1.5, 2, 3]) {
        const hit = timeToGrow(rate / 100, k);
        if (!(yearsShown(hit, 80) > hit)) bad.push(`${rate} ${k}`);
      }
    }
    expect(bad).toEqual([]);
    expect(yearsShown(10, 80)).toBe(80);
  });

  it('counts the nearest slider step as the hit', () => {
    expect(atHit(46, 46.5, 1)).toBe(true);
    expect(atHit(45, 46.5, 1)).toBe(false);
    expect(atHit(20, 20.2, 0.5)).toBe(true);
  });
});
