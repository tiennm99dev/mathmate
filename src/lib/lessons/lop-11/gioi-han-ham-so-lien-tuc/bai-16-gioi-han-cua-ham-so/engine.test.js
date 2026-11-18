import { describe, it, expect } from 'vitest';
import { ZOOM_STEPS as STEPS } from '../_shared/approach.js';
import { CASES, zoomWindow } from './engine.js';

describe('one-sided limit cases', () => {
  it('approach their stated one-sided limits', () => {
    const bad = [];
    for (const c of CASES) {
      const l = c.f(c.x0 - 1e-6);
      const r = c.f(c.x0 + 1e-6);
      const near = (/** @type {number} */ v, /** @type {number} */ lim) =>
        Number.isFinite(lim)
          ? Math.abs(v - lim) < 1e-4
          : Math.sign(v) === Math.sign(lim) && Math.abs(v) > 1e5;
      if (!near(l, c.left)) bad.push(`${c.id} left ${l}`);
      if (!near(r, c.right)) bad.push(`${c.id} right ${r}`);
    }
    expect(bad).toEqual([]);
  });

  it('leave the holes undefined and give the jump its value', () => {
    expect(CASES.find((c) => c.id === 'hole')?.f(1)).toBeNaN();
    expect(CASES.find((c) => c.id === 'root')?.f(0)).toBeNaN();
    expect(CASES.find((c) => c.id === 'jump')?.f(1)).toBe(3);
  });

  it('zoom to a window around x₀ that holds both sides', () => {
    const bad = [];
    for (const c of CASES) {
      for (const h of STEPS) {
        const w = zoomWindow(c, h);
        if (!(w.xMin < c.x0 - h && w.xMax > c.x0 + h)) bad.push(`${c.id} ${h} x`);
        for (const x of [c.x0 - h, c.x0 + h]) {
          const y = c.f(x);
          if (!(y >= w.yMin && y <= w.yMax)) bad.push(`${c.id} ${h} y ${y}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
