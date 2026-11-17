import { describe, it, expect } from 'vitest';
import { dot3 } from '#lib/geom-engine/solid.js';
import { P, len3 } from '../_shared/space.js';
import { LIMIT, MAX_DRAWN, drawnCross, work } from './engine.js';

describe('coordinate formulas', () => {
  it('works out the example of the widget', () => {
    const w = work(P(2, 0, 1), P(1, 2, 0));
    expect(w.sum).toEqual(P(3, 2, 1));
    expect(w.dot).toBe(2);
    expect(w.cross).toEqual(P(-2, 1, 4));
    expect(w.sumTex).toBe('\\vec{u} + \\vec{v} = (2 + 1; 0 + 2; 1 + 0) = (3; 2; 1)');
    expect(w.diffTex).toBe('\\vec{u} - \\vec{v} = (2 - 1; 0 - 2; 1 - 0) = (1; -2; 1)');
    expect(w.areaTex).toBe('S = \\left|[\\vec{u}, \\vec{v}]\\right| = \\sqrt{21}');
  });

  it('keeps the cross product perpendicular to both vectors for every whole pair', () => {
    const bad = [];
    const r = [-LIMIT, -1, 0, 2, LIMIT];
    for (const a of r)
      for (const b of r)
        for (const c of r)
          for (const d of [-2, 0, 3]) {
            const u = P(a, b, c);
            const v = P(d, c, a);
            const w = work(u, v);
            if (dot3(w.cross, u) !== 0 || dot3(w.cross, v) !== 0) bad.push([u, v]);
            const s = len3(u) * len3(v);
            const sin = w.angle === null ? 0 : Math.sin((w.angle * Math.PI) / 180);
            if (Math.abs(w.area - s * sin) > 1e-9) bad.push([u, v, 'area']);
          }
    expect(bad).toEqual([]);
  });

  it('writes negative coordinates in brackets and the exact cosine', () => {
    const w = work(P(1, -1, 0), P(-1, 0, 1));
    expect(w.dotTex).toBe(
      '\\vec{u} \\cdot \\vec{v} = 1 \\cdot (-1) + (-1) \\cdot 0 + 0 \\cdot 1 = -1',
    );
    expect(w.cosTex).toContain('= -\\dfrac{1}{2}');
    expect(work(P(0, 0, 0), P(1, 0, 0)).cosTex).toBeNull();
  });

  it('shrinks only a long cross product', () => {
    expect(drawnCross(P(1, 2, 2)).shrink).toBe(1);
    const d = drawnCross(P(0, -8, 6));
    expect(d.shrink).toBeCloseTo(10 / MAX_DRAWN);
    expect(len3(d.vec)).toBeCloseTo(MAX_DRAWN);
  });
});
