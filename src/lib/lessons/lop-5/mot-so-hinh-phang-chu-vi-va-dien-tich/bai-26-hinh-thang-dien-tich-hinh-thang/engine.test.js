import { describe, expect, it } from 'vitest';
import { polygonArea } from '#lib/geom-engine/plane.js';
import {
  COLS,
  GOALS,
  START,
  areaOf,
  boardLabel,
  copyOf,
  cornersOf,
  dragTo,
  goalNote,
  isRight,
  normalize,
} from './engine.js';

describe('trapezoid board', () => {
  it('keeps the short base shorter and the copy on the board', () => {
    expect(normalize({ a: 5, b: 9, h: 3, dx: 0 }).b).toBe(4);
    expect(normalize({ a: 20, b: 2, h: 0, dx: -5 })).toEqual({ a: 8, b: 2, h: 1, dx: -1 });
    const misses = [];
    for (let a = 3; a <= 8; a++)
      for (let b = 1; b < a; b++)
        for (let dx = -3; dx <= 12; dx++) {
          const t = normalize({ a, b, h: 4, dx });
          const right = Math.max(copyOf(t).A.x, copyOf(t).D.x);
          if (right > COLS - 1 || cornersOf(t).A.x < 0) misses.push(t);
        }
    expect(misses).toEqual([]);
  });

  it('moves a corner to a grid point', () => {
    expect(dragTo(START, 'C', { x: 7, y: 10 }).a).toBe(6);
    expect(dragTo(START, 'B', { x: 6, y: 3 }).b).toBe(3);
    expect(dragTo(START, 'A', { x: 1, y: 5 })).toEqual({ a: 8, b: 4, h: 5, dx: 0 });
  });

  it('joins two equal trapezoids into a parallelogram twice as big', () => {
    const t = START;
    const { A, B, C, D } = cornersOf(t);
    const copy = copyOf(t);
    expect(copy.A).toEqual({ x: D.x + t.a + t.b, y: D.y });
    expect(copy.D).toEqual({ x: A.x + t.a + t.b, y: A.y });
    const trapezoid = Math.abs(polygonArea([A, B, C, D]));
    const parallelogram = Math.abs(polygonArea([D, copy.A, copy.D, A]));
    expect(trapezoid).toBe(areaOf(t));
    expect(parallelogram).toBe((t.a + t.b) * t.h);
  });

  it('spots a right trapezoid', () => {
    expect(isRight({ a: 8, b: 4, h: 3, dx: 0 })).toBe(true);
    expect(isRight({ a: 8, b: 4, h: 3, dx: 4 })).toBe(true);
    expect(isRight(START)).toBe(false);
    expect(boardLabel({ a: 8, b: 4, h: 3, dx: 0 }, false)).toContain('Hình thang vuông');
  });

  it('can reach every challenge', () => {
    const misses = [];
    for (const goal of GOALS) {
      let found = false;
      for (let a = 3; a <= 8 && !found; a++)
        for (let b = 1; b < a && !found; b++)
          for (let h = 1; h <= 7 && !found; h++)
            for (let dx = -1; dx <= 3 && !found; dx++)
              found = goalNote(goal, normalize({ a, b, h, dx }), true).tone === 'ok';
      if (!found) misses.push(goal);
    }
    expect(misses).toEqual([]);
    expect(goalNote(GOALS[0], START, false).tone).toBe('info');
  });
});
