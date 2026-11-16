import { describe, expect, it } from 'vitest';
import { centroidChain, kTex, lengthLine, scaleNote } from './engine.js';

const p = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('scaling a vector', () => {
  it('describes k·a for each sign and size of k', () => {
    expect(kTex(-1.5)).toBe('-1{,}5');
    expect(scaleNote(p(2, 1), 2)).toContain('cùng hướng');
    expect(scaleNote(p(2, 1), 2)).toContain('dài gấp $2$ lần');
    expect(scaleNote(p(2, 1), -0.5)).toContain('ngược hướng');
    expect(scaleNote(p(2, 1), -0.5)).toContain('$0{,}5$ lần độ dài');
    expect(scaleNote(p(2, 1), 0)).toContain('\\vec 0');
    expect(scaleNote(p(0, 0), 3)).toContain('với mọi $k$');
  });

  it('writes |k a| = |k| |a|', () => {
    expect(lengthLine(p(3, 4), -2)).toBe('|-2\\vec a| = |-2| \\cdot |\\vec a| = 10');
    expect(lengthLine(p(1, 1), 1.5)).toContain('\\approx 2{,}12');
  });
});

describe('centroid identity', () => {
  it('ends the chain MA + MB + MC where 3MG ends', () => {
    const cases = [
      [p(-4, -3), p(2, -3), p(-1, 2), p(4, 2)],
      [p(0, 0), p(3, 0), p(0, 3), p(-2, 1)],
      [p(1, 1), p(1, 1), p(1, 1), p(0, 0)],
    ];
    const misses = cases.filter(([A, B, C, M]) => {
      const c = centroidChain(A, B, C, M);
      return Math.abs(c.end.x - c.triple.x) > 1e-9 || Math.abs(c.end.y - c.triple.y) > 1e-9;
    });
    expect(misses).toEqual([]);
    expect(centroidChain(p(0, 0), p(3, 0), p(0, 3), p(5, 5)).G).toEqual(p(1, 1));
  });
});
