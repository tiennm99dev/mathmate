import { describe, it, expect } from 'vitest';
import { EPSILONS, LEVELS, SEQUENCES, SHOWN, firstInside, isInside } from './engine.js';

/** @param {string} id */
const seq = (id) => {
  const s = SEQUENCES.find((x) => x.id === id);
  if (!s) throw new Error(id);
  return s;
};

describe('first index inside the band', () => {
  it('matches the inequalities solved by hand', () => {
    expect(EPSILONS.map((e) => firstInside(seq('inv'), e))).toEqual([3, 4, 6, 11, 21]);
    expect(EPSILONS.map((e) => firstInside(seq('alt'), e))).toEqual([3, 4, 6, 11, 21]);
    expect(EPSILONS.map((e) => firstInside(seq('frac'), e))).toEqual([2, 3, 5, 10, 20]);
    expect(EPSILONS.map((e) => firstInside(seq('sum'), e))).toEqual([3, 3, 4, 5, 6]);
    expect(LEVELS.map((m) => firstInside(seq('sqrt'), m))).toEqual([2, 5, 10, 17, 26]);
  });

  it('keeps every later shown term inside', () => {
    const bad = [];
    for (const s of SEQUENCES) {
      for (const tol of s.gap ? EPSILONS : LEVELS) {
        const n0 = firstInside(s, tol);
        if (n0 > SHOWN) bad.push(`${s.id} ${tol} starts after the chart`);
        for (let n = n0; n <= SHOWN; n++) if (!isInside(s, n, tol)) bad.push(`${s.id} ${tol} ${n}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('agrees with the terms themselves', () => {
    const bad = [];
    for (const s of SEQUENCES) {
      if (!s.gap) continue;
      for (let n = 1; n <= SHOWN; n++) {
        if (Math.abs(Math.abs(s.term(n) - s.limit) - s.gap(n)) > 1e-12) bad.push(`${s.id} ${n}`);
      }
    }
    expect(bad).toEqual([]);
  });
});
