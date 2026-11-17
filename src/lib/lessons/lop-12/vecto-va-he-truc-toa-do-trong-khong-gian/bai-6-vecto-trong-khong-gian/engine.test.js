import { describe, it, expect } from 'vitest';
import { add3 } from '#lib/geom-engine/solid.js';
import {
  BOX_EDGES,
  U_CHOICES,
  V_CHOICES,
  VERTEX,
  boxPoints,
  chain,
  dotOf,
  sumTex,
  why,
} from './engine.js';

describe('parallelepiped rule', () => {
  it('lands every sum of edge vectors on its vertex, for any shape', () => {
    const bad = [];
    for (const [base, lean] of [
      [70, 0.6],
      [40, -1],
      [120, 1.5],
    ]) {
      const p = boxPoints(base, lean);
      for (let mask = 1; mask < 8; mask++) {
        let s = p.A;
        if (mask & 1) s = add3(s, p.B);
        if (mask & 2) s = add3(s, p.D);
        if (mask & 4) s = add3(s, p["A'"]);
        const v = p[VERTEX[mask]];
        if (Math.hypot(s.x - v.x, s.y - v.y, s.z - v.z) > 1e-9) bad.push([base, lean, mask]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('has twelve edges and a head-to-tail path', () => {
    expect(BOX_EDGES).toHaveLength(12);
    expect(chain(7).map((s) => VERTEX[s.to])).toEqual(['B', 'C', "C'"]);
    expect(sumTex(7)).toBe(
      "\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = \\overrightarrow{AC'}",
    );
    expect(sumTex(0)).toBeNull();
    expect(why(5)).toContain("\\overrightarrow{BB'} = \\overrightarrow{AA'}");
    expect(why(1)).toBe('');
  });

  it('works out every dot product of the cube choices', () => {
    const rows = U_CHOICES.flatMap((u) => V_CHOICES.map((v) => dotOf(u, v)));
    expect(rows.every((r) => Number.isInteger(r.k))).toBe(true);
    const ac = dotOf(['A', 'C'], ['C', 'A']);
    expect(ac.angle).toBeCloseTo(180);
    expect(ac.moved).toBe('E');
    expect(dotOf(['A', "C'"], ["A'", 'C']).cos).toBe('\\dfrac{1}{3}');
  });
});
