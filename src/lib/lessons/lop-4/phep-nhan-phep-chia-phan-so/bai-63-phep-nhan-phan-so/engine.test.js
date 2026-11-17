import { describe, expect, it } from 'vitest';
import { TASKS, cellKind, productNote, productOptions, squareLabel } from './engine.js';

describe('multiplying two fractions on the unit square', () => {
  it('shades a cell by its column, its row or both', () => {
    expect(cellKind(0, 0, 4, 2)).toBe('both');
    expect(cellKind(3, 2, 4, 2)).toBe('col');
    expect(cellKind(4, 1, 4, 2)).toBe('row');
    expect(cellKind(4, 2, 4, 2)).toBe('none');
  });

  it('counts a × c twice-shaded cells among b × d', () => {
    const bad = [];
    for (const t of TASKS) {
      let both = 0;
      for (let c = 0; c < t.b; c++)
        for (let r = 0; r < t.d; r++) if (cellKind(c, r, t.a, t.c) === 'both') both += 1;
      if (both !== t.a * t.c) bad.push(t);
    }
    expect(bad).toEqual([]);
  });

  it('offers the product once among slips of other values', () => {
    const bad = [];
    for (const t of TASKS) {
      const { options, answer } = productOptions(t);
      const value = (t.a / t.b) * (t.c / t.d);
      const twins = options.filter((f) => Math.abs(f.n / f.d - value) < 1e-9);
      const right = options[answer];
      if (
        options.length !== 3 ||
        right.n !== t.a * t.c ||
        right.d !== t.b * t.d ||
        twins.length !== 1
      )
        bad.push([t, options]);
    }
    expect(bad).toEqual([]);
    expect(new Set(TASKS.map((t) => productOptions(t).answer)).size).toBeGreaterThan(1);
  });

  it('guides the shading, then tells the rule', () => {
    const t = TASKS[0]; // 4/5 × 2/3
    expect(productNote(t, 2, 0, 'read').text).toContain('tô 4 cột');
    expect(productNote(t, 4, 1, 'read').text).toContain('tô 2 hàng');
    expect(productNote(t, 4, 2, 'wrong').text).toContain('không phải 5 + 3');
    expect(productNote(t, 4, 2, 'right')).toEqual({
      tone: 'ok',
      text: 'Đúng rồi! Có 4 × 2 = 8 ô tô cả hai màu, trong 5 × 3 = 15 ô của hình vuông: $\\dfrac{4}{5} \\times \\dfrac{2}{3} = \\dfrac{4 \\times 2}{5 \\times 3} = \\dfrac{8}{15}$. Tử số nhân tử số, mẫu số nhân mẫu số.',
    });
  });

  it('tells the product to screen readers only once it is found', () => {
    const t = TASKS[0];
    expect(squareLabel(t, 4, 2, false)).not.toContain('tám phần');
    expect(squareLabel(t, 4, 2, true)).toContain('tám phần mười lăm');
  });
});
