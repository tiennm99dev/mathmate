import { describe, it, expect } from 'vitest';
import { CASES, ZOOMS, ceilOneDigit, probe, windowAt } from './engine.js';

describe('asymptote cases', () => {
  it('have the stated asymptotes', () => {
    /** @type {string[]} */
    const bad = [];
    for (const c of CASES) {
      const { a, b } = c.line;
      for (const x of [1e6, -1e6]) {
        if (Math.abs(c.f(x) - (a * x + b)) > 1e-4) bad.push(`${c.id} at ${x}`);
      }
      for (const p of c.poles) {
        if (Math.abs(c.f(p + 1e-7)) < 1e5 || Math.abs(c.f(p - 1e-7)) < 1e5)
          bad.push(`${c.id} ${p}`);
      }
      for (const h of c.holes) {
        if (!Number.isNaN(c.f(h.x))) bad.push(`${c.id} hole defined`);
        if (Math.abs(c.f(h.x + 1e-7) - h.y) > 1e-5) bad.push(`${c.id} hole value`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('simplify the gap to the asymptote correctly', () => {
    /** @type {Record<string, (x: number) => number>} */
    const gaps = {
      hyper: (x) => -3 / (x + 1),
      slant: (x) => 3 / (x - 1),
      hole: (x) => -3 / (x + 1),
      two: (x) => (x + 1) / (x * x - 4),
    };
    /** @type {string[]} */
    const bad = [];
    for (const c of CASES) {
      for (const x of [-7.5, -0.3, 0.6, 3.7, 12]) {
        const g = c.f(x) - (c.line.a * x + c.line.b);
        if (Number.isFinite(g) && Math.abs(g - gaps[c.id](x)) > 1e-9) bad.push(`${c.id} ${x}`);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('zooming out', () => {
  it('keeps every probe inside its window', () => {
    /** @type {string[]} */
    const bad = [];
    for (const c of CASES) {
      for (const k of ZOOMS) {
        const w = windowAt(c, k);
        for (const mode of /** @type {const} */ (['right', 'left', 'pole'])) {
          const p = probe(c, mode, k);
          const ok =
            Number.isFinite(p.y) && p.x > w.xMin && p.x < w.xMax && p.y > w.yMin && p.y < w.yMax;
          if (!ok) bad.push(`${c.id} ${k} ${mode} (${p.x}; ${p.y})`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('shrinks the gap towards ±∞ and grows |f| near the pole', () => {
    /** @type {string[]} */
    const bad = [];
    for (const c of CASES) {
      for (const mode of /** @type {const} */ (['right', 'left'])) {
        const gaps = ZOOMS.map((k) => Math.abs(probe(c, mode, k).gap));
        if (gaps.some((g, i) => i > 0 && g >= gaps[i - 1])) bad.push(`${c.id} ${mode}`);
      }
      const far = ZOOMS.map((k) => Math.abs(probe(c, 'pole', k).gap));
      if (far.some((g, i) => i > 0 && g < far[i - 1])) bad.push(`${c.id} pole`);
      if (far[far.length - 1] < 100) bad.push(`${c.id} pole end`);
    }
    expect(bad).toEqual([]);
  });

  it('rounds the distance to the pole up to one digit', () => {
    expect(ceilOneDigit(0.0137)).toBe(0.02);
    expect(ceilOneDigit(0.3)).toBeCloseTo(0.3, 12);
    expect(ceilOneDigit(1.67)).toBe(2);
  });
});
