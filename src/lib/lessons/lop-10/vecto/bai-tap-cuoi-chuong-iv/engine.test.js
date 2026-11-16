import { describe, expect, it } from 'vitest';
import { crossV } from '../_shared/vectors.js';
import { comboTex, landTex, mRange, makeRound, onBoard, same, systemTex, walk } from './engine.js';

const p = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('rounds', () => {
  it('builds solvable rounds on the board for many seeds', () => {
    const bad = [];
    for (let seed = 1; seed <= 300; seed += 1) {
      const r = makeRound(seed);
      const { P, M } = walk(r.A, r.a, r.b, r.m, r.n);
      const range = mRange(r.A, r.a);
      const ok =
        crossV(r.a, r.b) !== 0 &&
        r.m !== 0 &&
        r.n !== 0 &&
        onBoard(r.A) &&
        onBoard(P) &&
        same(M, r.T) &&
        !same(r.T, r.A) &&
        r.m >= range.lo &&
        r.m <= range.hi;
      if (!ok) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('is the same round for the same seed', () => {
    expect(makeRound(7)).toEqual(makeRound(7));
  });
});

describe('walking', () => {
  it('walks m steps of a, then n steps of b', () => {
    expect(walk(p(0, 0), p(1, 2), p(2, -1), 2, -1)).toEqual({ P: p(2, 4), M: p(0, 5) });
  });

  it('keeps the steps of a on the board', () => {
    expect(mRange(p(5, 0), p(1, 0))).toEqual({ lo: -4, hi: 1 });
    expect(mRange(p(0, 0), p(2, 2))).toEqual({ lo: -2, hi: 2 });
  });
});

describe('TeX', () => {
  it('writes combinations the book way', () => {
    expect(comboTex(2, -3)).toBe('2\\vec a - 3\\vec b');
    expect(comboTex(-1, 1)).toBe('-\\vec a + \\vec b');
    expect(comboTex(0, 0)).toBe('\\vec 0');
    expect(comboTex(0, -1)).toBe('-\\vec b');
    expect(comboTex(3, 0)).toBe('3\\vec a');
    expect(landTex(p(1, 1), p(3, -2), 1, 1)).toBe(
      '\\overrightarrow{AM} = \\vec a + \\vec b = (2;\\ -3)',
    );
  });

  it('writes the system of the hint', () => {
    const r = { A: p(0, 0), a: p(1, 0), b: p(-1, 2), m: 2, n: 1, T: p(1, 2) };
    expect(systemTex(r)).toBe(
      '\\overrightarrow{AT} = (1;\\ 2) = m\\vec a + n\\vec b \\iff \\begin{cases} m - n = 1 \\\\ 2n = 2 \\end{cases}',
    );
  });
});
