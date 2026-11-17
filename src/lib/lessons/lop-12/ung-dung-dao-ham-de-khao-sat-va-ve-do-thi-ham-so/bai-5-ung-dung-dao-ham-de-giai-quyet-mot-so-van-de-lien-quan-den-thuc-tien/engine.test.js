import { describe, it, expect } from 'vitest';
import { SHEETS, best, boxFaces, slope, volume } from './engine.js';

describe('open box from a square sheet', () => {
  it('finds the largest volume 2a³/27 at x = a/6', () => {
    expect(best(12)).toEqual({ x: 2, v: 128 });
    expect(best(30)).toEqual({ x: 5, v: 2000 });
    /** @type {string[]} */
    const bad = [];
    for (const a of SHEETS) {
      const { x, v } = best(a);
      if (Math.abs(volume(a, x) - v) > 1e-9) bad.push(`${a} value`);
      for (let i = 1; i < 100; i++) {
        const t = (a / 2) * (i / 100);
        if (volume(a, t) > v + 1e-9) bad.push(`${a} beaten at ${t}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('has the derivative (a − 2x)(a − 6x)', () => {
    /** @type {string[]} */
    const bad = [];
    for (const a of SHEETS) {
      for (const x of [0.5, 1.7, a / 6, a / 3, a / 2 - 0.3]) {
        const h = 1e-6;
        const num = (volume(a, x + h) - volume(a, x - h)) / (2 * h);
        if (Math.abs(num - slope(a, x)) > 1e-4) bad.push(`${a} ${x}`);
      }
    }
    expect(bad).toEqual([]);
    expect(slope(12, 1)).toBeGreaterThan(0);
    expect(slope(12, 2)).toBe(0);
    expect(slope(12, 3)).toBeLessThan(0);
  });

  it('draws a box whose front face is s wide and h tall', () => {
    const f = boxFaces(10, 4, { x: 0, y: 100 });
    expect(f.front).toEqual([
      { x: 0, y: 100 },
      { x: 10, y: 100 },
      { x: 10, y: 96 },
      { x: 0, y: 96 },
    ]);
    expect(f.back[0]).toEqual({ x: 4.5, y: 97 });
  });
});
