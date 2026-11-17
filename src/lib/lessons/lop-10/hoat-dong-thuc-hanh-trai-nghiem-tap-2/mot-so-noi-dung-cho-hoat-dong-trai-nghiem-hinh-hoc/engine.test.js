import { describe, it, expect } from 'vitest';
import { dist } from '#lib/geom-engine/plane.js';
import {
  R,
  angleOf,
  branch,
  circlesMeet,
  conicOf,
  kindOf,
  locusNote,
  locusPoint,
  onCircle,
  ripples,
} from './engine.js';

const A = { x: -1, y: 0 };

describe('locus of M', () => {
  it('keeps MB = MC and M on line AC', () => {
    const B = { x: 1, y: 0.5 };
    for (let deg = 0; deg < 360; deg += 17) {
      const { C, M } = locusPoint(A, B, R, deg);
      expect(M).not.toBeNull();
      if (!M) continue;
      expect(dist(M, B)).toBeCloseTo(dist(M, C), 9);
      const cross = (C.x - A.x) * (M.y - A.y) - (C.y - A.y) * (M.x - A.x);
      expect(cross).toBeCloseTo(0, 9);
    }
  });
  it('gives MA + MB = R when B is inside the circle', () => {
    const B = { x: 1, y: 0 };
    expect(kindOf(A, B, R)).toBe('ellipse');
    for (let deg = 0; deg < 360; deg += 23) {
      const { M } = locusPoint(A, B, R, deg);
      if (!M) throw new Error('no M');
      expect(dist(M, A) + dist(M, B)).toBeCloseTo(R, 9);
    }
  });
  it('gives |MA − MB| = R when B is outside the circle', () => {
    const B = { x: 3, y: 0 };
    expect(kindOf(A, B, R)).toBe('hyperbola');
    for (let deg = 0; deg < 360; deg += 23) {
      const { M } = locusPoint(A, B, R, deg);
      if (!M) continue;
      expect(Math.abs(dist(M, A) - dist(M, B))).toBeCloseTo(R, 9);
    }
  });
  it('has no M when AC is parallel to the bisector', () => {
    // A = (0; 0), B = (6; 0), r = 3: r + w = 0 when cos t = 1/2.
    expect(locusPoint({ x: 0, y: 0 }, { x: 6, y: 0 }, 3, 60).M).toBeNull();
  });
  it('sees B on the circle', () => {
    expect(kindOf(A, { x: 2, y: 0 }, R)).toBe('on');
    expect(locusNote(A, { x: 2, y: 0 }, R, null)).toContain('trùng $A$');
  });
  it('keeps a snapped B just off the circle as a real conic', () => {
    // A = (−1; 0): B = (2; 0,5) is √9,25 ≈ 3,04 cm away, B = (1,5; 1,5) √8,5 ≈ 2,92 cm.
    expect(kindOf(A, { x: 2, y: 0.5 }, R)).toBe('hyperbola');
    expect(kindOf(A, { x: 1.5, y: 1.5 }, R)).toBe('ellipse');
  });
  it('writes the note with the decimal comma', () => {
    const B = { x: 1, y: 0 };
    const { M } = locusPoint(A, B, R, 90);
    expect(locusNote(A, B, R, M)).toContain('= 3{,}00 = R');
  });
});

describe('conic of the construction', () => {
  it('has 2a = R and 2c = AB', () => {
    expect(conicOf(2, 3)).toEqual({ a: 1.5, b: Math.sqrt(1.25), c: 1 });
    expect(conicOf(5, 3)).toEqual({ a: 1.5, b: 2, c: 2.5 });
  });
});

describe('circle helpers', () => {
  it('turns angles and points both ways', () => {
    const P = onCircle(A, 3, 120);
    expect(angleOf(A, P)).toBeCloseTo(120, 9);
    expect(angleOf(A, onCircle(A, 3, 300))).toBeCloseTo(300, 9);
  });
  it('meets two circles', () => {
    const pts = circlesMeet({ x: 0, y: 0 }, 3, { x: 5, y: 0 }, 4);
    expect(pts).toHaveLength(2);
    expect(pts[0].x).toBeCloseTo(1.8, 9);
    expect(Math.abs(pts[0].y)).toBeCloseTo(2.4, 9);
    expect(circlesMeet({ x: 0, y: 0 }, 1, { x: 5, y: 0 }, 1)).toEqual([]);
    expect(circlesMeet({ x: 0, y: 0 }, 2, { x: 5, y: 0 }, 3)).toHaveLength(1);
  });
});

describe('ripples', () => {
  const O1 = { x: -2.5, y: 0 };
  const O2 = { x: 2.5, y: 0 };
  it('meets rings of the same rank where PO₂ − PO₁ = R₂ − R₁', () => {
    const rings = ripples(O1, O2, 3, 4, 2, 4);
    expect(rings.map((r) => [r.r1, r.r2])).toEqual([
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
    ]);
    for (const ring of rings) {
      expect(ring.points).toHaveLength(2);
      for (const P of ring.points) expect(dist(P, O2) - dist(P, O1)).toBeCloseTo(1, 9);
    }
  });
  it('draws the branch nearer O₁', () => {
    const pts = branch(O1, O2, 1);
    expect(pts.length).toBeGreaterThan(10);
    for (const P of pts) {
      expect(P.x).toBeLessThan(0);
      expect(dist(P, O2) - dist(P, O1)).toBeCloseTo(1, 9);
    }
    expect(branch(O1, O2, 6)).toEqual([]);
  });
});
