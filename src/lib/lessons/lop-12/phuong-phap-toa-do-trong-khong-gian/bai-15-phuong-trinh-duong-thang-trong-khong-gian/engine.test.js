import { describe, it, expect } from 'vitest';
import { cross3, sub3 } from '#lib/geom-engine/solid.js';
import { P } from '#lib/geom-engine/space.js';
import { LIMIT, PRESETS, relate } from './engine.js';

const M = P(0, 0, 0);
const U = P(1, 0, 1);

describe('relative position of two lines', () => {
  it('names every preset by its own position', () => {
    const got = Object.entries(PRESETS).map(([k, p]) => [k, relate(M, U, p.m, p.u)?.relation]);
    expect(got).toEqual(Object.keys(PRESETS).map((k) => [k, k]));
  });

  it('finds the common point of crossing lines on both lines', () => {
    const bad = [];
    const r = [-LIMIT, -1, 0, 1, LIMIT];
    for (const a of r)
      for (const b of r)
        for (const c of r)
          for (const d of [-1, 0, 2]) {
            const m2 = P(a, d, b);
            const u2 = P(c, a, d);
            const w = relate(P(1, 0, -1), P(1, 2, 0), m2, u2);
            if (!w || w.relation !== 'cat' || !w.meet) continue;
            const off1 = cross3(sub3(w.meet, P(1, 0, -1)), P(1, 2, 0));
            const off2 = cross3(sub3(w.meet, m2), u2);
            const offs = [off1, off2].flatMap((o) => [o.x, o.y, o.z]);
            if (offs.some((v) => Math.abs(v) > 1e-9)) bad.push([m2, u2]);
          }
    expect(bad).toEqual([]);
  });

  it('has no line for the zero vector and spots perpendicular directions', () => {
    expect(relate(M, P(), P(1, 1, 1), U)).toBeNull();
    expect(relate(M, U, P(0, 1, 0), P(1, 0, -1))?.perpendicular).toBe(true);
  });
});
