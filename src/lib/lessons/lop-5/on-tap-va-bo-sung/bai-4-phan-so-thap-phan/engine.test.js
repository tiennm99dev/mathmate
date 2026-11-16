import { describe, expect, it } from 'vitest';
import { CELLS, TASKS, cellsFor, gridNote, nudge, shadedText, tapAt } from './engine.js';

describe('the 10 × 10 grid', () => {
  it('asks for a whole number of cells in every task', () => {
    const bad = TASKS.filter((t) => {
      const c = cellsFor(t);
      return !Number.isInteger(c) || c <= 0 || c > CELLS || c * t.d !== CELLS * t.n;
    });
    expect(bad).toEqual([]);
  });

  it('writes the shading as decimal fractions', () => {
    expect(shadedText(30)).toBe('$\\dfrac{3}{10}$ = $\\dfrac{30}{100}$');
    expect(shadedText(45)).toBe('$\\dfrac{45}{100}$');
  });

  it('shades columns or cells by tapping, and takes the last one away on a second tap', () => {
    expect(tapAt(0, 'columns', 2, 7)).toBe(30);
    expect(tapAt(30, 'columns', 2, 0)).toBe(20);
    expect(tapAt(0, 'cells', 4, 4)).toBe(45);
    expect(tapAt(45, 'cells', 4, 4)).toBe(44);
    expect(nudge(98, 10)).toBe(100);
    expect(nudge(3, -10)).toBe(0);
  });

  it('links the asked fraction to its decimal fractions', () => {
    expect(gridNote(60, { n: 3, d: 5 }).text).toBe(
      'Đúng rồi! $\\dfrac{3}{5}$ = $\\dfrac{6}{10}$ = $\\dfrac{60}{100}$.',
    );
    expect(gridNote(30, { n: 3, d: 10 }).text).toBe(
      'Đúng rồi! $\\dfrac{3}{10}$ = $\\dfrac{30}{100}$.',
    );
    expect(gridNote(25, { n: 1, d: 4 }).tone).toBe('ok');
    expect(gridNote(20, { n: 1, d: 4 }).text).toMatch(/tô thêm/);
    expect(gridNote(0, { n: 1, d: 4 }).text).toMatch(/chưa tô/);
    expect(gridNote(40, { n: 7, d: 20 }).text).toMatch(/bớt đi/);
  });
});
