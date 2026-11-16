import { describe, expect, it } from 'vitest';
import { TASKS, keepInside, moveText, supports } from './engine.js';

/** @param {'a' | 'b' | 'c'} name @param {number[]} t @param {number[]} d */
const arrow = (name, [tx, ty], [dx, dy]) => ({ name, tail: { x: tx, y: ty }, d: { x: dx, y: dy } });
const done = (/** @type {any[]} */ arrows) => TASKS.filter((t) => t.done(arrows)).map((t) => t.id);

describe('three vectors on a grid', () => {
  it('reads a vector as moves on the grid', () => {
    expect(moveText({ x: 3, y: -1 })).toBe('sang phải 3 ô, xuống 1 ô');
    expect(moveText({ x: 0, y: 0 })).toContain('vectơ-không');
  });

  it('places the supports of two vectors', () => {
    expect(supports(arrow('a', [0, 0], [2, 1]), arrow('b', [4, 2], [-2, -1]))).toBe('trùng nhau');
    expect(supports(arrow('a', [0, 0], [2, 1]), arrow('b', [0, 3], [4, 2]))).toBe('song song');
    expect(supports(arrow('a', [0, 0], [2, 1]), arrow('b', [0, 3], [1, 2]))).toBe('cắt nhau');
    expect(supports(arrow('a', [0, 0], [0, 0]), arrow('b', [0, 3], [1, 2]))).toBeNull();
  });

  it('checks each task', () => {
    expect(
      done([arrow('a', [1, 5], [3, 1]), arrow('b', [2, 1], [2, 2]), arrow('c', [6, 2], [0, 3])]),
    ).toEqual([]);
    expect(
      done([arrow('a', [1, 5], [3, 1]), arrow('b', [2, 1], [-6, -2]), arrow('c', [6, 2], [3, 1])]),
    ).toEqual(['opposite', 'equal']);
    expect(
      done([arrow('a', [1, 5], [3, 1]), arrow('b', [2, 1], [1, 1]), arrow('c', [6, 2], [2, 2])]),
    ).toEqual(['same']);
    expect(
      done([arrow('a', [1, 5], [3, 1]), arrow('b', [2, 1], [0, 0]), arrow('c', [1, 5], [3, 1])]),
    ).toEqual(['zero']);
  });

  it('keeps a moved vector on the board', () => {
    const box = { xMin: 0, xMax: 10, yMin: 0, yMax: 7 };
    expect(keepInside({ x: 9, y: 6 }, { x: 3, y: 1 }, box)).toEqual({ x: 7, y: 6 });
    expect(keepInside({ x: 0, y: 0 }, { x: -2, y: -1 }, box)).toEqual({ x: 2, y: 1 });
  });
});
