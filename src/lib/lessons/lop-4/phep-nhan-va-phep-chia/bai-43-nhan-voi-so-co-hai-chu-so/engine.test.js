import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  FIRST,
  cellsOf,
  doneMessage,
  drawTask,
  partialsOf,
  rowMessage,
  sharesOf,
  sheetOf,
} from './engine.js';

describe('the area model', () => {
  it('cuts 36 × 23 into four cells', () => {
    expect(cellsOf(FIRST).map((c) => c.value)).toEqual([90, 18, 600, 120]);
  });

  it('adds each row up to a partial product', () => {
    expect(partialsOf(FIRST)).toEqual({ first: 108, second: 72, product: 828 });
    expect(rowMessage(FIRST, 0)).toBe(
      'Hàng trên: 30 × 3 + 6 × 3 = 90 + 18 = 108. Đó là 36 × 3 = 108, tích riêng thứ nhất.',
    );
    expect(rowMessage(FIRST, 1)).toBe(
      'Hàng dưới: 30 × 20 + 6 × 20 = 600 + 120 = 720. Đó là 36 × 2 chục = 72 chục, tích riêng thứ hai.',
    );
    expect(doneMessage(FIRST)).toBe('Cộng hai tích riêng: 108 + 720 = 828. Vậy 36 × 23 = 828.');
  });

  it('keeps the four cells equal to the product for drawn tasks', () => {
    const bad = [];
    const rand = rng(7);
    for (let i = 0; i < 300; i++) {
      const task = drawTask(rand);
      const sum = cellsOf(task).reduce((s, c) => s + c.value, 0);
      const { first, second, product } = partialsOf(task);
      if (sum !== product || first + second * 10 !== product || task.a % 10 === 0) bad.push(task);
    }
    expect(bad).toEqual([]);
  });

  it('draws a small ones part at least 30% wide', () => {
    expect(sharesOf(91)[1]).toBe(0.3);
    expect(sharesOf(15)[1]).toBeCloseTo(1 / 3);
  });
});

describe('the column sheet', () => {
  it('writes the second partial product one column to the left', () => {
    const rows = sheetOf({ a: 56, b: 23 }).map((r) => r.cells.join('.'));
    expect(rows).toEqual(['..5.6', '..2.3', '.1.6.8', '1.1.2.', '1.2.8.8']);
  });
});
