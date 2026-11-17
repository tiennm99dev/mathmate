import { describe, it, expect } from 'vitest';
import { P, planeValue } from '../_shared/space.js';
import { LIMIT, planeWork } from './engine.js';

describe('plane through a point with a normal vector', () => {
  it('writes the equation and the distance of the book example', () => {
    const w = planeWork(P(2, -1, 2), P(1, 0, -1), P(3, 1, 2));
    expect(w).not.toBeNull();
    if (!w) return;
    expect(w.D).toBe(0);
    expect(w.pointNormalTex).toBe('2(x - 1) - y + 2(z + 1) = 0');
    expect(w.generalTex).toBe('2x - y + 2z = 0');
    expect(w.value).toBe(9);
    expect(w.distance).toBe(3);
    expect(w.distanceTex.endsWith('= \\dfrac{9}{3} = 3')).toBe(true);
  });

  it('has no plane for the zero vector', () => {
    expect(planeWork(P(0, 0, 0), P(1, 1, 1), P())).toBeNull();
  });

  it('keeps M0 on the plane and the foot of Q on the plane for every whole choice', () => {
    const bad = [];
    const r = [-LIMIT, -1, 0, 2];
    for (const a of r)
      for (const b of r)
        for (const c of r) {
          const n = P(a, b, c);
          const m0 = P(b, 1, -a);
          const q = P(c, a, 2);
          const w = planeWork(n, m0, q);
          if (!w) continue;
          if (planeValue(n, w.D, m0) !== 0) bad.push(['M0', n]);
          if (Math.abs(planeValue(n, w.D, w.foot)) > 1e-9) bad.push(['foot', n]);
          const d = Math.hypot(q.x - w.foot.x, q.y - w.foot.y, q.z - w.foot.z);
          if (Math.abs(d - w.distance) > 1e-9) bad.push(['distance', n]);
        }
    expect(bad).toEqual([]);
  });
});
