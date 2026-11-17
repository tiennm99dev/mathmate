import { describe, it, expect } from 'vitest';
import { CASES, locate, pieces, zeroKind } from './engine.js';

describe('monotonicity cases', () => {
  it('list true zeros of the derivative', () => {
    /** @type {string[]} */
    const bad = [];
    for (const c of CASES) {
      for (const z of c.crit) if (Math.abs(c.df(z)) > 1e-12) bad.push(`${c.id} ${z}`);
    }
    expect(bad).toEqual([]);
  });

  it('have table signs that match f′ between the zeros', () => {
    /** @type {string[]} */
    const bad = [];
    for (const c of CASES) {
      const cuts = [-1e3, ...c.crit, 1e3];
      c.table.signs.forEach((s, i) => {
        const mid = (cuts[i] + cuts[i + 1]) / 2;
        if ((c.df(mid) > 0 ? '+' : '-') !== s) bad.push(`${c.id} ${i}`);
      });
    }
    expect(bad).toEqual([]);
  });

  it('have table values equal to f at the zeros', () => {
    /** @type {string[]} */
    const bad = [];
    for (const c of CASES) {
      c.crit.forEach((z, i) => {
        const shown = Number(c.table.cells[i + 1].y?.replace('−', '-'));
        if (shown !== c.f(z) + 0) bad.push(`${c.id} ${z}`);
      });
    }
    expect(bad).toEqual([]);
  });

  it('keep the point inside both windows', () => {
    /** @type {string[]} */
    const bad = [];
    for (const c of CASES) {
      for (const x of [c.range.lo, c.range.hi, ...c.crit]) {
        const y = c.f(x);
        const d = c.df(x);
        if (y < c.win.yMin || y > c.win.yMax) bad.push(`${c.id} f(${x})`);
        if (d < c.dwin.yMin || d > c.dwin.yMax) bad.push(`${c.id} f′(${x})`);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('reading the point', () => {
  const cubic = CASES[0];
  const cube = CASES[2];
  it('finds the interval or the zero under x', () => {
    expect(locate(cubic, -2)).toEqual({ interval: 0 });
    expect(locate(cubic, 0.5)).toEqual({ interval: 1 });
    expect(locate(cubic, 1)).toEqual({ zero: 1 });
  });

  it('tells a maximum, a minimum and a zero without extremum apart', () => {
    expect(zeroKind(cubic, 0)).toBe('max');
    expect(zeroKind(cubic, 1)).toBe('min');
    expect(zeroKind(cube, 0)).toBe('none');
  });

  it('colours the pieces between the zeros', () => {
    expect(pieces(cubic, -2, 2)).toEqual([
      { from: -2, to: -1, up: true },
      { from: -1, to: 1, up: false },
      { from: 1, to: 2, up: true },
    ]);
  });
});
