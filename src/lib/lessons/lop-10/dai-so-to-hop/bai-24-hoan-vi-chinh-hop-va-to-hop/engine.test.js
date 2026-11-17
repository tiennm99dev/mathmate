import { describe, expect, it } from 'vitest';
import { allKeys, formulaTex, keyOf, labelOf, reasonText, record, totalOf } from './engine.js';

describe('student cards on chairs', () => {
  it('tells ordered seats from groups', () => {
    expect(keyOf([1, 0], 'xep')).toBe('1,0');
    expect(keyOf([1, 0], 'chon')).toBe('0,1');
    expect(labelOf('1,0', 'xep')).toBe('Bình – An');
    expect(labelOf('0,1', 'chon')).toBe('{An, Bình}');
  });

  it('counts P, A and C', () => {
    expect(totalOf(5, 5, 'xep')).toBe(120);
    expect(totalOf(5, 2, 'xep')).toBe(20);
    expect(totalOf(5, 2, 'chon')).toBe(10);
    expect(formulaTex(4, 4, 'xep')).toBe('P_{4} = 4! = 4 \\cdot 3 \\cdot 2 \\cdot 1 = 24');
    expect(formulaTex(5, 3, 'xep')).toBe('A_{5}^{3} = 5 \\cdot 4 \\cdot 3 = 60');
    expect(formulaTex(5, 3, 'chon')).toBe(
      'C_{5}^{3} = \\dfrac{A_{5}^{3}}{3!} = \\dfrac{60}{6} = 10',
    );
  });

  it('lists exactly the counted ways', () => {
    const bad = [];
    for (let n = 2; n <= 5; n++)
      for (let k = 1; k <= n; k++)
        for (const mode of /** @type {const} */ (['xep', 'chon'])) {
          const keys = allKeys(n, k, mode);
          if (keys.length !== totalOf(n, k, mode) || new Set(keys).size !== keys.length)
            bad.push([n, k, mode]);
        }
    expect(bad).toEqual([]);
  });

  it('turns away a group seated in another order', () => {
    const first = record([], [0, 1], 'chon', 10);
    expect(first.fresh).toBe(true);
    const again = record(first.found, [1, 0], 'chon', 10);
    expect(again.fresh).toBe(false);
    expect(again.text).toContain('cùng một nhóm');
    const ordered = record(['0,1'], [1, 0], 'xep', 20);
    expect(ordered.fresh).toBe(true);
    expect(record(['0'], [1], 'xep', 2).text).toContain('Đã tìm đủ cả 2 cách');
  });

  it('names the kind of way', () => {
    expect(reasonText(3, 3, 'xep')).toContain('hoán vị');
    expect(reasonText(5, 2, 'xep')).toContain('chỉnh hợp chập 2 của 5');
    expect(reasonText(5, 2, 'chon')).toContain('tổ hợp chập 2 của 5');
  });
});
