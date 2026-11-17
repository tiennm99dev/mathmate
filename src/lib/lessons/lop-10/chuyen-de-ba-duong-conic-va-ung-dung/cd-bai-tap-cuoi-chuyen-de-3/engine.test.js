import { describe, expect, it } from 'vitest';
import {
  DISH,
  ORBITS,
  dishLines,
  dishOf,
  millionKm,
  orbitLines,
  orbitOf,
  sunDistance,
} from './engine.js';

describe('orbits', () => {
  it('gives the nearest and farthest distances a ∓ c', () => {
    const halley = orbitOf(2667, 0.967);
    expect(halley.nearest).toBeCloseTo(88.0, 0);
    expect(halley.farthest).toBeCloseTo(5245.9, 0);
    const earth = orbitOf(149.6, 0.0167);
    expect(earth.nearest).toBeCloseTo(147.1, 1);
    expect(earth.farthest).toBeCloseTo(152.1, 1);
  });

  it('measures the focal radius to the Sun at F₁', () => {
    const bad = [];
    for (const { a, e } of ORBITS) {
      if (Math.abs(sunDistance(a, e, a) - orbitOf(a, e).farthest) > 1e-9) bad.push([a, 'far']);
      if (Math.abs(sunDistance(a, e, -a) - orbitOf(a, e).nearest) > 1e-9) bad.push([a, 'near']);
    }
    expect(bad).toEqual([]);
  });

  it('writes distances the book way', () => {
    expect(millionKm(147.1)).toBe('147,1 triệu km');
    expect(millionKm(5906)).toBe('5 906 triệu km');
    expect(orbitLines(149.6, 0.0167, 0)[0]).toContain('0{,}0167');
  });
});

describe('dish antenna', () => {
  it('puts the receiver at D²/(16h) from the vertex', () => {
    expect(dishOf(120, 20)).toEqual({ p: 90, f: 45, inside: false });
    expect(dishOf(80, 20).f).toBe(20);
    expect(dishOf(80, 20).inside).toBe(true);
    expect(dishLines(120, 20)[1]).toContain('= 45$ cm, nằm ngoài miệng chảo');
    expect(dishLines(120, 20)[0]).toContain('$60^2 = 2p \\cdot 20$');
  });

  it('keeps every allowed dish on the picture', () => {
    const big = dishOf(DISH.D[1], DISH.h[0]).f;
    expect(big).toBe(240);
  });
});
