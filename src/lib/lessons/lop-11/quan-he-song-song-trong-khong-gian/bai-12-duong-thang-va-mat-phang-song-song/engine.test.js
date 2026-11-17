import { describe, expect, it } from 'vitest';
import { lineRelation, meetPlane, planeThrough, onPlane } from '#lib/geom-engine/space.js';
import { cutBy, lineOf } from './engine.js';

const GROUND = /** @type {import('#lib/geom-engine/space.js').Plane} */ (
  planeThrough({ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 })
);

describe('a line against the plane (P)', () => {
  it('lies in (P), is parallel to it or cuts it', () => {
    expect(lineOf(0, 0, 30).place).toBe('nam-trong');
    expect(lineOf(2, 2, 30).place).toBe('song-song');
    const cut = lineOf(2, -1, 45);
    expect(cut.place).toBe('cat');
    expect(cut.t).toBeCloseTo(2 / 3);
    expect(cut.M?.z).toBe(0);
    expect(cut.seen).toBe(true);
    expect(lineOf(3, 2.5, 0).seen).toBe(false);
  });

  it('puts M where the line meets the ground', () => {
    const wrong = [];
    for (const [hA, hB, turn] of [
      [1, -2, 0],
      [3, 0.5, 75],
      [-1.5, 2, 150],
    ]) {
      const s = lineOf(hA, hB, turn);
      const hit = meetPlane(s.A, s.B, GROUND);
      if (!hit || !s.M || Math.hypot(hit.point.x - s.M.x, hit.point.y - s.M.y) > 1e-9)
        wrong.push([hA, hB, turn]);
    }
    expect(wrong).toEqual([]);
  });

  it('cuts (P) along a line parallel to a, for every turn of (Q)', () => {
    const { A, B } = lineOf(2, 2, 60);
    const wrong = [];
    for (const tilt of [-60, -30, 0, 15, 45, 60]) {
      const { b1, b2 } = cutBy(A, B, tilt);
      const q = planeThrough(A, B, b1);
      if (!q || !onPlane(b2, q) || lineRelation(A, B, b1, b2) !== 'song-song') wrong.push(tilt);
    }
    expect(wrong).toEqual([]);
    expect(cutBy(A, B, 0).shift).toBe(0);
  });
});
