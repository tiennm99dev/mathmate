import { describe, expect, it } from 'vitest';
import { allShow, cubesOf, extentOf } from '../_shared/cubes.js';
import {
  PLAN,
  TALLEST,
  TASKS,
  bump,
  cellLabel,
  countOf,
  emptyPlan,
  meets,
  noteFor,
} from './engine.js';

describe('building a shape to compare volumes', () => {
  it('draws every model so each cube can be counted, inside the shared frame', () => {
    const bad = TASKS.filter((t) => {
      const cubes = cubesOf(t.rows);
      const e = extentOf(cubes);
      return !allShow(cubes) || e.nx > 4 || e.ny > 3 || e.nz > 3;
    }).map((t) => t.name);
    expect(bad).toEqual([]);
    expect(TASKS.map((t) => countOf(t.rows))).toEqual([6, 6, 5, 5, 9]);
  });

  it('lets every task be met on the plan', () => {
    const most = PLAN * PLAN * TALLEST;
    const bad = TASKS.filter((t) => {
      const m = countOf(t.rows);
      return ![...Array(most + 1).keys()].some((n) => meets(t.goal, n, m));
    });
    expect(bad).toEqual([]);
  });

  it('adds a cube per tap and empties a full column', () => {
    let plan = emptyPlan();
    plan = bump(plan, 2, 0);
    plan = bump(plan, 2, 0);
    expect(plan[2][0]).toBe(2);
    plan = bump(bump(plan, 2, 0), 2, 0);
    expect(plan[2][0]).toBe(0);
  });

  it('compares the numbers of cubes', () => {
    const plan = [
      [0, 0, 0],
      [0, 0, 0],
      [2, 2, 2],
    ];
    expect(noteFor(TASKS[0], plan)).toEqual({
      tone: 'ok',
      text: 'Đúng rồi! Hình của em có 6 khối, hình A có 6 khối. Thể tích hình của em bằng thể tích hình A. Hai hình khác dạng nhưng có cùng số khối nên thể tích bằng nhau.',
    });
    expect(noteFor(TASKS[2], plan)).toEqual({
      tone: 'info',
      text: 'Hình của em có 6 khối, hình C có 5 khối. Thể tích hình của em lớn hơn thể tích hình C. Em cần hình có thể tích bé hơn thể tích hình C.',
    });
    expect(noteFor(TASKS[0], emptyPlan()).tone).toBe('info');
    expect(
      noteFor(TASKS[0], [
        [0, 0, 0],
        [0, 0, 0],
        [3, 2, 1],
      ]).text,
    ).not.toContain('khác dạng');
  });

  it('names each cell for screen readers', () => {
    expect(cellLabel(0, 1, 2)).toBe('Hàng sau, cột 2: 2 khối. Chạm để thêm một khối.');
    expect(cellLabel(2, 0, 3)).toBe('Hàng trước, cột 1: 3 khối. Chạm để bỏ hết khối ở ô này.');
  });
});
