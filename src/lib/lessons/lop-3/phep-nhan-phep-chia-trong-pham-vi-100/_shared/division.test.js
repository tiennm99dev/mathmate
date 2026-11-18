import { describe, expect, it } from 'vitest';
import { cells, oneStepRows } from './division.js';

describe('a division written the book’s way', () => {
  it('puts each digit in its column', () => {
    expect(cells(7)).toEqual({ t: '', o: '7' });
    expect(cells(34)).toEqual({ t: '3', o: '4' });
  });

  it('sets out one step: dividend, what was shared, what is left', () => {
    expect(oneStepRows(34, 6)).toEqual([
      { t: '3', o: '4' },
      { t: '3', o: '0', line: true },
      { t: '', o: '4' },
    ]);
  });
});
