import { describe, it, expect } from 'vitest';
import { PROBLEMS, isRight, miss } from './engine.js';

describe('zoom-check limits', () => {
  it('are undefined at x₀ and approach the stated limit', () => {
    const bad = [];
    for (const p of PROBLEMS) {
      if (!Number.isNaN(p.f(p.x0))) bad.push(`${p.id} defined at x0`);
      if (miss(p, p.limit, 1e-6) > 1e-4) bad.push(`${p.id} limit`);
    }
    expect(bad).toEqual([]);
  });

  it('shrink the miss only for the right value', () => {
    const p = PROBLEMS[0];
    expect(miss(p, 12, 0.001)).toBeLessThan(miss(p, 12, 0.1));
    expect(miss(p, 11, 0.001)).toBeGreaterThan(0.9);
  });

  it('accept the limit typed as a decimal or a fraction', () => {
    const root = PROBLEMS.find((p) => p.id === 'root');
    if (!root) throw new Error('root');
    expect(isRight(root, 0.5)).toBe(true);
    expect(isRight(root, 1 / 2)).toBe(true);
    expect(isRight(root, 0.25)).toBe(false);
  });
});
