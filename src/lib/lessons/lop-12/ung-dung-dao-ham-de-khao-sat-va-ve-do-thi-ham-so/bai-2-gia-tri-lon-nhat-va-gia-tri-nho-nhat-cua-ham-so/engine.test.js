import { describe, it, expect } from 'vitest';
import { CASES, candidates, extreme } from './engine.js';

const [cubic, quartic, hyper] = CASES;

describe('range cases', () => {
  it('keep the graph inside the window over the whole range', () => {
    /** @type {string[]} */
    const bad = [];
    for (const c of CASES) {
      for (let i = 0; i <= 100; i++) {
        const x = c.range.lo + ((c.range.hi - c.range.lo) * i) / 100;
        const y = c.f(x);
        if (y < c.win.yMin || y > c.win.yMax) bad.push(`${c.id} ${x}`);
      }
      if (!(c.start.a < c.start.b)) bad.push(`${c.id} start`);
    }
    expect(bad).toEqual([]);
  });

  it('list the critical points where f′ vanishes', () => {
    /** @type {string[]} */
    const bad = [];
    for (const c of CASES) {
      for (const z of c.crit) {
        const h = 1e-6;
        const slope = (c.f(z + h) - c.f(z - h)) / (2 * h);
        if (Math.abs(slope) > 1e-6) bad.push(`${c.id} ${z}`);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('largest and smallest values', () => {
  it('compares the ends with the critical points inside a segment', () => {
    const list = candidates(cubic, -2, 1.5);
    expect(list.map((p) => p.x)).toEqual([-2, -1, 1, 1.5]);
    expect(extreme(list, 1, false)).toEqual({ value: 3, xs: [-1] });
    expect(extreme(list, -1, false)).toEqual({ value: -1, xs: [-2, 1] });
  });

  it('reaches a value at an end of a segment', () => {
    const list = candidates(quartic, -0.5, 1.5);
    expect(extreme(list, 1, false).xs).toEqual([1.5]);
    expect(extreme(list, -1, false)).toEqual({ value: 1, xs: [1] });
  });

  it('drops the ends of an open interval', () => {
    const list = candidates(quartic, -0.5, 1.5);
    const max = extreme(list, 1, true);
    expect(max.value).toBeNull();
    expect(max.xs).toEqual([1.5]);
    expect(extreme(list, -1, true)).toEqual({ value: 1, xs: [1] });
  });

  it('finds the minimum 4 of x + 4/x on an open interval around 2', () => {
    const list = candidates(hyper, 1, 5);
    expect(extreme(list, -1, true)).toEqual({ value: 4, xs: [2] });
    expect(extreme(list, 1, true).value).toBeNull();
  });

  it('has no inner point when no critical point lies inside', () => {
    const list = candidates(cubic, -0.5, 0.5);
    expect(list).toHaveLength(2);
    expect(extreme(list, 1, true).value).toBeNull();
    expect(extreme(list, 1, false)).toEqual({ value: 2.375, xs: [-0.5] });
  });
});
