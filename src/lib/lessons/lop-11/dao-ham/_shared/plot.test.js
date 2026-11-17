import { describe, it, expect } from 'vitest';
import { lineTex, lineThrough, ticksIn } from './plot.js';

describe('chapter plot helpers', () => {
  it('write lines the book way', () => {
    expect(lineTex(2, -1)).toBe('y = 2x - 1');
    expect(lineTex(-1, 0)).toBe('y = -x');
    expect(lineTex(0, 3)).toBe('y = 3');
    expect(lineTex(0, 0)).toBe('y = 0');
    expect(lineTex(1, 2.5)).toBe('y = x + 2{,}5');
    expect(lineTex(-0.25, 1)).toBe('y = -0{,}25x + 1');
  });

  it('draw the line through a point with a given slope', () => {
    expect(lineThrough(1, 2, 3)(2)).toBe(5);
  });

  it('give round ticks inside the range', () => {
    expect(ticksIn(0, 10, 5)).toEqual([0, 2, 4, 6, 8, 10]);
  });
});
