import { describe, it, expect } from 'vitest';
import { P } from '../_shared/space.js';
import { formula, measure } from './engine.js';

describe('angles in space', () => {
  it('works out the book examples exactly', () => {
    expect(formula('ll', P(1, 0, 1), P(0, 1, 1))?.tex.endsWith('= \\dfrac{1}{2}')).toBe(true);
    expect(formula('ll', P(1, 0, 1), P(0, 1, 1))?.angleTex).toBe("(\\Delta, \\Delta') = 60^\\circ");
    const lp = formula('lp', P(1, 1, 0), P(0, 1, 1));
    expect(lp?.angleTex).toBe('(\\Delta, (P)) = 30^\\circ');
    expect(formula('pp', P(1, 0, 0), P(1, 1, 0))?.angleTex).toBe("((P), (P')) = 45^\\circ");
  });

  it('measures on the figure the same angle the formula gives', () => {
    const bad = [];
    const r = [-3, -1, 0, 2];
    for (const mode of /** @type {const} */ (['ll', 'lp', 'pp']))
      for (const a of r)
        for (const b of r)
          for (const c of r)
            for (const d of [-2, 1, 3]) {
              const u = P(a, b, c);
              const v = P(d, a, b - c);
              const f = formula(mode, u, v);
              if (!f) continue;
              const m = measure(mode, u, v);
              if (Math.abs(f.deg - m.deg) > 1e-6) bad.push([mode, u, v, f.deg, m.deg]);
            }
    expect(bad).toEqual([]);
  });

  it('has no angle for a zero vector', () => {
    expect(formula('pp', P(), P(1, 0, 0))).toBeNull();
  });
});
