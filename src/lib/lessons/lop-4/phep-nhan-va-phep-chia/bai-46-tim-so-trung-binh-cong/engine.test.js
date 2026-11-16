import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  FIRST,
  MAX,
  averageOf,
  averageText,
  drawColumns,
  isLevel,
  messageOf,
  move,
  movesLeft,
  totalOf,
} from './engine.js';

describe('levelling the columns', () => {
  it('keeps the total while blocks move', () => {
    const cols = move([6, 4], 0, 1);
    expect(cols).toEqual([5, 5]);
    expect(totalOf(cols)).toBe(10);
    expect(isLevel(cols)).toBe(true);
    expect(messageOf([6, 4], cols)).toBe(
      'Các cột đều có 5 khối. Tổng 10 khối, 2 cột: 10 : 2 = 5. Số trung bình cộng của 6 và 4 là 5.',
    );
  });

  it('refuses a move from an empty column or into a full one', () => {
    expect(move([0, 4], 0, 1)).toEqual([0, 4]);
    expect(move([3, MAX], 0, 1)).toEqual([3, MAX]);
    expect(move([3, 4], 1, 1)).toEqual([3, 4]);
  });

  it('writes the average the book way', () => {
    expect(averageText([3, 8, 4])).toBe('(3 + 8 + 4) : 3 = 5');
    expect(movesLeft([5, 2, 7, 6])).toBe(3);
  });

  it('only gives sets with a whole average', () => {
    const bad = [];
    const rand = rng(4);
    for (let i = 0; i < 300; i++) {
      const cols = drawColumns(rand);
      if (!Number.isInteger(averageOf(cols)) || isLevel(cols) || cols.length < 2) bad.push(cols);
    }
    for (const cols of FIRST) if (!Number.isInteger(averageOf(cols))) bad.push(cols);
    expect(bad).toEqual([]);
  });
});
