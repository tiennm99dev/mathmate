import { describe, it, expect } from 'vitest';
import { SOLIDS, regionAt, sectionArea, sliceAt, turned } from './engine.js';
import { simpson } from '../_shared/plot.js';

describe('solids of revolution', () => {
  it('the stated volume is π times the integral of f²', () => {
    for (const s of SOLIDS) {
      expect(simpson((x) => sectionArea(s, x), s.a, s.b)).toBeCloseTo(s.volume, 6);
    }
  });

  it('turning keeps the distance to the axis', () => {
    const p = turned(1, 3, 125);
    expect(Math.hypot(p.y, p.z)).toBeCloseTo(3, 12);
    expect(turned(1, 3, 0)).toEqual({ x: 1, y: 0, z: 3 });
  });

  it('closes the region on the axis and the slice at the centre until a full turn', () => {
    const s = SOLIDS[1];
    const region = regionAt(s, 90);
    expect(region[0]).toMatchObject({ x: 0, z: 0 });
    expect(Math.abs(region[0].y)).toBeLessThan(1e-12);
    expect(sliceAt(s, 2, 180)[0]).toEqual({ x: 2, y: 0, z: 0 });
    const full = sliceAt(s, 2, 360);
    expect(full.every((p) => Math.abs(Math.hypot(p.y, p.z) - 1) < 1e-12)).toBe(true);
  });
});
