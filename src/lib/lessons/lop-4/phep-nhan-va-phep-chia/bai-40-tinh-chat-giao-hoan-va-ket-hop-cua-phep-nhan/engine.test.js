import { describe, expect, it } from 'vitest';
import { SIDE, boxLabel, countOf, totalOf, turnText, turned } from './engine.js';

describe('the box of dots', () => {
  it('counts tray by tray and row by row to the same total', () => {
    const box = { rows: 2, cols: 3, layers: 4 };
    expect(countOf(box, 'tray')).toEqual({
      expression: '(2 × 3) × 4 = 24',
      lines: ['Mỗi tầng có 2 × 3 = 6 chấm.', '4 tầng có 6 × 4 = 24 chấm.'],
    });
    expect(countOf(box, 'row')).toEqual({
      expression: '2 × (3 × 4) = 24',
      lines: [
        'Mỗi hàng cùng màu đi qua 4 tầng, có 3 × 4 = 12 chấm.',
        '2 hàng như thế có 2 × 12 = 24 chấm.',
      ],
    });
  });

  it('keeps the total whatever the sizes and turns', () => {
    const bad = [];
    for (let rows = SIDE.min; rows <= SIDE.max; rows++) {
      for (let cols = SIDE.min; cols <= SIDE.max; cols++) {
        for (let layers = SIDE.min; layers <= SIDE.max; layers++) {
          const box = { rows, cols, layers };
          const total = rows * cols * layers;
          if (totalOf(turned(box)) !== total) bad.push(box);
          for (const g of /** @type {const} */ (['tray', 'row'])) {
            if (!countOf(box, g).expression.endsWith(`= ${total}`)) bad.push(box);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('turns a tray by swapping rows and columns', () => {
    expect(turned({ rows: 2, cols: 5, layers: 3 })).toEqual({ rows: 5, cols: 2, layers: 3 });
    expect(turnText({ rows: 2, cols: 5, layers: 3 })).toBe(
      'Mỗi tầng xoay đi: 2 hàng thành 5 hàng. 2 × 5 = 5 × 2 = 10. Số chấm không đổi.',
    );
    expect(turnText({ rows: 3, cols: 3, layers: 2 })).toContain('3 × 3 = 3 × 3');
  });

  it('describes the box', () => {
    expect(boxLabel({ rows: 2, cols: 3, layers: 4 })).toBe(
      'Hộp chấm có 4 tầng, mỗi tầng 2 hàng, mỗi hàng 3 chấm.',
    );
  });
});
