import { describe, expect, it } from 'vitest';
import { TASKS, divideNote, flipOptions, measureOf, stripLabel } from './engine.js';

describe('dividing fractions by measuring on a strip', () => {
  it('fits a whole number of pieces, equal to a/b × d/c', () => {
    const bad = TASKS.filter((t) => {
      const { D, M, q, L } = measureOf(t);
      return (
        !Number.isInteger(D) ||
        !Number.isInteger(M) ||
        !Number.isInteger(q) ||
        q < 2 ||
        q * t.b * t.c !== t.a * t.d ||
        L > 10
      );
    });
    expect(bad).toEqual([]);
    expect(measureOf(TASKS[3])).toEqual({ L: 8, D: 12, M: 1, q: 12, wholes: 2 });
  });

  it('offers the reversed fraction once among other values', () => {
    const bad = [];
    for (const t of TASKS) {
      const { options, answer } = flipOptions(t);
      const right = options[answer];
      const twins = options.filter((f) => f.n * t.c === t.d * f.d);
      if (options.length !== 3 || right.n !== t.d || right.d !== t.c || twins.length !== 1)
        bad.push([t, options]);
    }
    expect(bad).toEqual([]);
  });

  it('counts the pieces, then shows the division as a product by the reversed fraction', () => {
    const t = TASKS[0]; // 3/4 : 1/8
    expect(divideNote(t, 0, 'lay').text).toContain('Đặt thêm 1 đoạn');
    expect(divideNote(t, 6, 'flip').text).toContain('Vừa đúng 6 đoạn');
    expect(divideNote(t, 6, 'flipWrong').text).toContain('tử số là 8, mẫu số là 1');
    expect(divideNote(t, 6, 'done')).toEqual({
      tone: 'ok',
      text: 'Đúng rồi! Lấy $\\dfrac{3}{4}$ nhân với phân số đảo ngược của $\\dfrac{1}{8}$: $\\dfrac{3}{4} : \\dfrac{1}{8} = \\dfrac{3}{4} \\times 8 = \\dfrac{24}{4} = 6$. Cũng là 6 đoạn!',
    });
    expect(stripLabel(t, 2)).toContain('đã đặt 2 đoạn');
  });
});
