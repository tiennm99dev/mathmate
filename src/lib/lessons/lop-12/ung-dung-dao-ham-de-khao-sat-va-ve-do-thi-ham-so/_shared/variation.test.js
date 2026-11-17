import { describe, it, expect } from 'vitest';
import { extremaOf, variationOf, variationText } from './variation.js';

describe('variation table', () => {
  it('places the values of a cubic with a maximum and a minimum', () => {
    const v = variationOf(
      [
        { x: '−∞', kind: 'end', y: '−∞' },
        { x: '−1', kind: 'zero', y: '2' },
        { x: '1', kind: 'zero', y: '−2' },
        { x: '+∞', kind: 'end', y: '+∞' },
      ],
      ['+', '-', '+'],
    );
    expect(v.cells.map((c) => c.level)).toEqual(['bottom', 'top', 'bottom', 'top']);
    expect(v.arrows).toEqual([
      { from: 'bottom', to: 'top' },
      { from: 'top', to: 'bottom' },
      { from: 'bottom', to: 'top' },
    ]);
    expect(extremaOf(v)).toEqual([
      { index: 1, kind: 'max' },
      { index: 2, kind: 'min' },
    ]);
    expect(variationText(v)).toContain('từ −1 đến 1: y′ âm, hàm số nghịch biến');
  });

  it('keeps a zero of y′ without a sign change in the middle', () => {
    const v = variationOf(
      [
        { x: '−∞', kind: 'end', y: '−∞' },
        { x: '0', kind: 'zero', y: '0' },
        { x: '+∞', kind: 'end', y: '+∞' },
      ],
      ['+', '+'],
    );
    expect(v.cells[1].level).toBe('mid');
    expect(extremaOf(v)).toEqual([]);
  });

  it('splits the values at a pole', () => {
    const v = variationOf(
      [
        { x: '−∞', kind: 'end', y: '2' },
        { x: '−1', kind: 'pole', yl: '+∞', yr: '−∞' },
        { x: '+∞', kind: 'end', y: '2' },
      ],
      ['+', '+'],
    );
    expect(v.cells[1]).toMatchObject({ mark: '||', levelL: 'top', levelR: 'bottom' });
    expect(v.arrows).toEqual([
      { from: 'bottom', to: 'top' },
      { from: 'bottom', to: 'top' },
    ]);
  });

  it('rejects a sign list of the wrong length', () => {
    expect(() => variationOf([{ x: '0', kind: 'end' }], ['+'])).toThrow();
  });
});
