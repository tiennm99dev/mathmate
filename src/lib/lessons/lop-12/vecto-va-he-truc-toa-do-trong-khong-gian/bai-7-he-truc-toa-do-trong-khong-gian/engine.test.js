import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { P } from '#lib/geom-engine/space.js';
import { LIMIT, boxEdges, makeTarget, project, wrongCoords } from './engine.js';

describe('coordinates of a point', () => {
  it('projects on the coordinate planes', () => {
    const m = P(2, -5, 4);
    expect(project(m, 'Oxy')).toEqual(P(2, -5, 0));
    expect(project(m, 'Oyz')).toEqual(P(0, -5, 4));
    expect(project(m, 'Ozx')).toEqual(P(2, 0, 4));
  });

  it('draws the nine box edges off the axes, fewer when a coordinate is 0', () => {
    expect(boxEdges(P(1, 2, 3))).toHaveLength(9);
    expect(boxEdges(P(1, 2, 0))).toHaveLength(2);
  });

  it('makes targets in range with at most one zero coordinate', () => {
    const r = rng(1);
    const bad = [];
    let prev;
    for (let i = 0; i < 300; i++) {
      const t = makeTarget(r, prev);
      const zeros = [t.x, t.y, t.z].filter((v) => v === 0).length;
      if (zeros > 1 || [t.x, t.y, t.z].some((v) => Math.abs(v) > LIMIT)) bad.push(t);
      if (prev && t.x === prev.x && t.y === prev.y && t.z === prev.z) bad.push(t);
      prev = t;
    }
    expect(bad).toEqual([]);
  });

  it('names the wrong coordinates', () => {
    expect(wrongCoords(P(1, 2, 3), P(1, 0, 0))).toEqual(['tung độ', 'cao độ']);
  });
});
