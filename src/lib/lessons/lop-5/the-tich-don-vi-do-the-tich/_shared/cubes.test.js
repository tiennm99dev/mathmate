import { describe, expect, it } from 'vitest';
import {
  allShow,
  cubesOf,
  drawOrder,
  extentOf,
  fillBoxes,
  fillNote,
  fillWords,
  project,
} from './cubes.js';

/** @param {string} s */
const g = (s) => s.replace(/(\d) (?=\d{3})/g, '$1 ');

/** @param {import('./cubes.js').Box} b */
const size = (b) => (b.x1 - b.x0) * (b.y1 - b.y0) * (b.z1 - b.z0);

describe('cube pictures', () => {
  it('shifts far points right and up', () => {
    const near = project(0, 0, 0);
    const far = project(0, 1, 0);
    expect(far.x).toBeGreaterThan(near.x);
    expect(far.y).toBeLessThan(near.y);
    expect(project(0, 0, 1).y).toBe(-1);
  });

  it('builds cubes from column heights, back row first', () => {
    const cubes = cubesOf([
      [1, 0],
      [2, 1],
    ]);
    expect(cubes).toHaveLength(4);
    expect(cubes).toContainEqual({ x: 0, y: 1, z: 0 });
    expect(cubes).toContainEqual({ x: 0, y: 0, z: 1 });
    expect(extentOf(cubes)).toEqual({ nx: 2, ny: 2, nz: 2 });
  });

  it('draws far, low and left cubes first', () => {
    const order = drawOrder([
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 },
    ]);
    expect(order[0]).toEqual({ x: 0, y: 1, z: 0 });
    expect(order.indexOf(order.find((c) => c.x === 1) ?? order[0])).toBeGreaterThan(1);
    expect(order.findIndex((c) => c.z === 1)).toBeGreaterThan(
      order.findIndex((c) => c.x === 0 && c.y === 0 && c.z === 0),
    );
  });

  it('knows when a cube is hidden behind a nearer one', () => {
    expect(allShow(cubesOf([[3, 2, 1]]))).toBe(true);
    expect(
      allShow(
        cubesOf([
          [0, 2],
          [3, 0],
        ]),
      ),
    ).toBe(true);
    // a back cube level with a front cube of the same column is covered
    expect(
      allShow(
        cubesOf([
          [1, 0],
          [1, 0],
        ]),
      ),
    ).toBe(false);
    // a taller back column still hides its cubes behind the front column
    expect(
      allShow(
        cubesOf([
          [3, 0],
          [2, 0],
        ]),
      ),
    ).toBe(false);
  });
});

describe('filling the big cube', () => {
  it('holds exactly the cubes put in', () => {
    const bad = [0, 1, 9, 10, 99, 100, 345, 999, 1000].filter(
      (n) => fillBoxes(n).reduce((s, b) => s + size(b), 0) !== n,
    );
    expect(bad).toEqual([]);
  });

  it('fills rows from the back and loose cubes in front of them', () => {
    expect(fillBoxes(125)).toEqual([
      { x0: 0, x1: 10, y0: 0, y1: 10, z0: 0, z1: 1 },
      { x0: 0, x1: 10, y0: 8, y1: 10, z0: 1, z1: 2 },
      { x0: 0, x1: 5, y0: 7, y1: 8, z0: 1, z1: 2 },
    ]);
  });

  it('says the count in layers, rows and cubes', () => {
    expect(fillWords(345)).toBe('3 lớp, 4 hàng và 5 khối');
    expect(fillWords(300)).toBe('3 lớp');
    expect(fillWords(7)).toBe('7 khối');
    expect(fillWords(40)).toBe('4 hàng');
    expect(fillWords(0)).toBe('0 khối');
  });

  it('says 1 big unit is 1 000 small units once full', () => {
    expect(fillNote(1000, 'cm³', 'dm³')).toEqual({
      tone: 'ok',
      text: g('1 000 khối 1 cm³ xếp đầy khối 1 dm³. Vậy 1 dm³ = 1 000 cm³.'),
    });
    expect(fillNote(250, 'dm³', 'm³').text).toBe(
      'Em đã xếp 250 khối 1 dm³ (2 lớp và 5 hàng). Thể tích phần đã xếp là 250 dm³.',
    );
  });
});
