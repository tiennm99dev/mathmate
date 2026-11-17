import { describe, expect, it } from 'vitest';
import { dist } from '#lib/geom-engine/plane.js';
import {
  ellipse,
  focalRadii,
  focusDirectrixConic,
  hyperbola,
  kindOf,
  parabola,
  parabolaRadius,
  parallelRayHit,
  ratioToDirectrix,
  sampleBranch,
  sampleEllipse,
  sampleParabola,
  valueTex,
} from './conic.js';

describe('ellipse', () => {
  it('has the book values for x²/25 + y²/16 = 1', () => {
    const E = ellipse(5, 4);
    expect(E.c).toBe(3);
    expect(E.e).toBe(0.6);
    expect(E.directrix).toBeCloseTo(25 / 3, 9);
  });

  it('keeps MF₁ + MF₂ = 2a and MF/d(M, Δ) = e at every point', () => {
    const E = ellipse(6, 4);
    const bad = [];
    for (const M of sampleEllipse(6, 4, 48)) {
      const [r1, r2] = focalRadii(E, M.x);
      if (Math.abs(r1 - dist(M, E.foci[0])) > 1e-9) bad.push(['r1', M]);
      if (Math.abs(r2 - dist(M, E.foci[1])) > 1e-9) bad.push(['r2', M]);
      if (Math.abs(r1 + r2 - 12) > 1e-9) bad.push(['sum', M]);
      if (Math.abs(r2 / (E.directrix - M.x) - E.e) > 1e-9) bad.push(['ratio', M]);
    }
    expect(bad).toEqual([]);
  });

  it('is a circle with no directrix when a = b', () => {
    expect(ellipse(4, 4).directrix).toBe(Infinity);
    expect(kindOf(ellipse(4, 4).e)).toBe('duong-tron');
  });
});

describe('hyperbola', () => {
  it('keeps |MF₁ − MF₂| = 2a on both branches', () => {
    const H = hyperbola(3, 4);
    expect(H.c).toBe(5);
    expect(H.e).toBeCloseTo(5 / 3, 12);
    const bad = [];
    for (const sign of /** @type {const} */ ([1, -1])) {
      for (const M of sampleBranch(3, 4, sign, 9, 7, 21)) {
        const [r1, r2] = focalRadii(H, M.x, true);
        if (Math.abs(r1 - dist(M, H.foci[0])) > 1e-9) bad.push(['r1', M]);
        if (Math.abs(r2 - dist(M, H.foci[1])) > 1e-9) bad.push(['r2', M]);
        if (Math.abs(Math.abs(r1 - r2) - 6) > 1e-9) bad.push(['diff', M]);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('parabola', () => {
  it('keeps MF = x + p/2 = d(M, Δ)', () => {
    const P = parabola(3);
    const bad = [];
    for (const M of sampleParabola(3, 8, 6, 21)) {
      if (Math.abs(dist(M, P.focus) - parabolaRadius(3, M.x)) > 1e-9) bad.push(M);
      if (Math.abs(M.x - P.directrix - parabolaRadius(3, M.x)) > 1e-9) bad.push(M);
    }
    expect(bad).toEqual([]);
  });

  it('reflects rays parallel to the axis through the focus', () => {
    const bad = [];
    for (const p of [1, 2, 3.5]) {
      for (const y of [-5, -2, -0.5, 0.5, 1, 3, 6]) {
        const { M, dir } = parallelRayHit(p, y);
        const toF = { x: p / 2 - M.x, y: -M.y };
        const crossed = dir.x * toF.y - dir.y * toF.x;
        const dot = dir.x * toF.x + dir.y * toF.y;
        if (Math.abs(crossed) > 1e-9 || dot <= 0) bad.push([p, y]);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('focus and directrix', () => {
  it('names the kind from the eccentricity', () => {
    expect([0, 0.5, 1, 1.0000000001, 1.5].map(kindOf)).toEqual([
      'duong-tron',
      'elip',
      'parabol',
      'parabol',
      'hypebol',
    ]);
  });

  it('samples points with MF = e·d(M, Δ), the first branch round F', () => {
    const bad = [];
    for (const e of [0.4, 0.8, 1, 1.5, 2]) {
      const runs = focusDirectrixConic(e, 3, 12);
      if (runs.length === 0) bad.push(['empty', e]);
      if (e < 1 && runs.length !== 1) bad.push(['pieces', e, runs.length]);
      if (e > 1 && runs.length !== 2) bad.push(['branches', e, runs.length]);
      for (const run of runs)
        for (const M of run)
          if (Math.abs(ratioToDirectrix(M, 3) - e) > 1e-9) bad.push(['ratio', e, M]);
      // The first branch holds the vertex between F and Δ.
      const vx = (-3 * e) / (1 + e);
      if (!runs[0].some((M) => Math.abs(M.x - vx) < 1e-6 && Math.abs(M.y) < 1e-6))
        bad.push(['vertex', e]);
    }
    expect(bad).toEqual([]);
  });
});

describe('valueTex', () => {
  it('writes exact values with = and others with ≈', () => {
    expect(valueTex(2.5)).toBe('= 2{,}5');
    expect(valueTex(Math.sqrt(12))).toBe('\\approx 3{,}46');
    expect(valueTex(4)).toBe('= 4');
  });
});
