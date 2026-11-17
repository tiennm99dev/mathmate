import { describe, expect, it } from 'vitest';
import { fillBoxes, fillOf, fillWords, project } from './stack.js';

/** @param {import('./stack.js').Box} b */
const size = (b) => (b.x1 - b.x0) * (b.y1 - b.y0) * (b.z1 - b.z0);

describe('filling a box with unit cubes', () => {
  it('shifts far points right and up', () => {
    expect(project(0, 1, 0).x).toBeGreaterThan(project(0, 0, 0).x);
    expect(project(0, 1, 0).y).toBeLessThan(project(0, 0, 0).y);
  });

  it('splits a count into layers, rows and loose cubes', () => {
    expect(fillOf(4, 3, 2, 17)).toEqual({ count: 17, layers: 1, rows: 1, loose: 1 });
    expect(fillOf(4, 3, 2, 99)).toEqual({ count: 24, layers: 2, rows: 0, loose: 0 });
    expect(fillWords(4, 3, 2, 17)).toBe('1 lớp, 1 hàng và 1 khối');
    expect(fillWords(4, 3, 2, 12)).toBe('1 lớp');
    expect(fillWords(4, 3, 2, 0)).toBe('0 khối');
  });

  it('draws exactly the cubes put in, inside the box', () => {
    const bad = [];
    for (const [a, b, c] of [
      [4, 3, 2],
      [5, 2, 3],
      [1, 1, 1],
      [6, 6, 6],
    ]) {
      for (let n = 0; n <= a * b * c; n++) {
        const boxes = fillBoxes(a, b, c, n);
        const total = boxes.reduce((s, x) => s + size(x), 0);
        const inside = boxes.every(
          (x) => x.x0 >= 0 && x.x1 <= a && x.y0 >= 0 && x.y1 <= b && x.z1 <= c,
        );
        if (total !== n || !inside) bad.push([a, b, c, n]);
      }
    }
    expect(bad).toEqual([]);
  });
});
