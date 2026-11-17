import { describe, expect, it } from 'vitest';
import { GROUP } from '#lib/core/number-format.js';
import { boxAreas, boxVolume, cubeAreas } from './measures.js';

/** Writes the narrow group space as a plain one, to compare. @param {string} s */
const plain = (s) => s.split(GROUP).join(' ');

describe('areas and volumes of the chapter', () => {
  it('works out the surface of a box the book way', () => {
    const s = boxAreas(5, 4, 3);
    expect([s.perimeter, s.lateral, s.base, s.total]).toEqual([18, 54, 20, 94]);
    expect(s.steps.perimeter).toBe('(5 + 4) × 2 = 18');
    expect(s.steps.lateral).toBe('18 × 3 = 54');
    expect(s.steps.total).toBe('54 + 20 × 2 = 94');
  });

  it('works out the surface of a cube as one face times 4 and times 6', () => {
    const s = cubeAreas(5);
    expect([s.face, s.lateral, s.total]).toEqual([25, 100, 150]);
    expect(s.steps.total).toBe('25 × 6 = 150');
  });

  it('agrees with the box formulas when the box is a cube', () => {
    const misses = [1, 2, 3, 7, 10].filter((a) => {
      const box = boxAreas(a, a, a);
      const cube = cubeAreas(a);
      return box.lateral !== cube.lateral || box.total !== cube.total;
    });
    expect(misses).toEqual([]);
  });

  it('counts the volume as layers of unit cubes', () => {
    const v = boxVolume(20, 16, 10);
    expect(v.layer).toBe(320);
    expect(v.volume).toBe(3200);
    expect(plain(v.steps.volume)).toBe('20 × 16 × 10 = 3 200');
  });
});
