import { describe, expect, it } from 'vitest';
import { dist3, lineRelation } from '#lib/geom-engine/space.js';
import { SOLID, pieces, sectionAt } from './engine.js';

describe('the section of the box parallel to its bases', () => {
  it('is a parallelogram equal to the base, at one height', () => {
    const wrong = [];
    for (const t of [0.1, 0.35, 0.5, 0.8]) {
      const { M, N, P, Q } = sectionAt(t);
      if (Math.abs(dist3(M, N) - dist3(SOLID.A, SOLID.B)) > 1e-9) wrong.push(`MN ${t}`);
      if (Math.abs(dist3(N, P) - dist3(SOLID.B, SOLID.C)) > 1e-9) wrong.push(`NP ${t}`);
      if (lineRelation(M, N, SOLID.A, SOLID.B) !== 'song-song') wrong.push(`MN // AB ${t}`);
      if (lineRelation(M, N, P, Q) !== 'song-song') wrong.push(`MN // PQ ${t}`);
      if (new Set([M.z, N.z, P.z, Q.z].map((z) => z.toFixed(9))).size !== 1) wrong.push(`z ${t}`);
    }
    expect(wrong).toEqual([]);
  });

  it('cuts AA′ and AC′ in proportional pieces', () => {
    const wrong = [];
    for (const t of [0.2, 0.45, 0.75]) {
      const p = pieces(t);
      if (Math.abs(p.AM / p.MA - p.AK / p.KC) > 1e-9) wrong.push(t);
      if (Math.abs(sectionAt(t).K.z - sectionAt(t).M.z) > 1e-9) wrong.push(`K ${t}`);
    }
    expect(wrong).toEqual([]);
  });
});
