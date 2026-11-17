import { describe, expect, it } from 'vitest';
import { commonOf, workingTex } from '../_shared/fractions.js';
import { TASKS, cutState, maxCut, sumNote, sumOptions, sumTex } from './engine.js';

describe('adding two fractions on strips', () => {
  it('can bring every task to the book common denominator', () => {
    const bad = TASKS.filter((t) => {
      const D = commonOf(t.b, t.d);
      return D === null || D / t.b > maxCut(t.b) || D / t.d > maxCut(t.d);
    });
    expect(bad).toEqual([]);
  });

  it('joins the pieces only once they are the same size', () => {
    const t = TASKS[1]; // 3/5 + 1/10
    expect(cutState(t, 1, 1).same).toBe(false);
    expect(cutState(t, 2, 1)).toEqual({ d1: 10, d2: 10, A: 6, C: 1, same: true });
    expect(sumNote(t, 1, 1, 'read').tone).toBe('info');
    expect(sumNote(t, 2, 1, 'wrong').text).toContain('không cộng');
    expect(sumNote(t, 2, 1, 'miscount').text).toContain('6 mảnh và 1 mảnh. Mẫu số vẫn là 10');
    expect(sumNote(t, 2, 1, 'right')).toEqual({
      tone: 'ok',
      text: 'Đúng rồi! 6 mảnh và 1 mảnh ghép lại được 7 mảnh: $\\dfrac{3}{5} + \\dfrac{1}{10} = \\dfrac{6}{10} + \\dfrac{1}{10} = \\dfrac{7}{10}$. Cộng hai tử số, giữ nguyên mẫu số.',
    });
  });

  it('offers the sum once among slips of other values', () => {
    const bad = [];
    for (const t of TASKS) {
      for (let k = 1; k <= 2; k++) {
        const D = (commonOf(t.b, t.d) ?? 0) * k;
        const A = (t.a * D) / t.b;
        const C = (t.c * D) / t.d;
        const { options, answer } = sumOptions(t, A, C, D);
        const right = options[answer];
        const sum = t.a / t.b + t.c / t.d;
        const sameValue = options.filter((f) => Math.abs(f.n / f.d - sum) < 1e-9);
        if (options.length !== 3 || right.n !== A + C || right.d !== D || sameValue.length !== 1)
          bad.push([t, k, options]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('does not always put the sum on the same button', () => {
    const places = new Set();
    for (const t of TASKS) {
      const D = commonOf(t.b, t.d) ?? 0;
      places.add(sumOptions(t, (t.a * D) / t.b, (t.c * D) / t.d, D).answer);
    }
    expect(places.size).toBeGreaterThan(1);
  });

  it('writes the working the book way and reduces the result', () => {
    expect(sumTex(TASKS[0], 8)).toBe('\\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{5}{8}');
    expect(sumTex(TASKS[5], 7)).toBe('\\dfrac{4}{7} + \\dfrac{3}{7} = \\dfrac{7}{7} = 1');
    expect(workingTex({ n: 3, d: 10 }, { n: 1, d: 5 }, '+', 10)).toBe(
      '\\dfrac{3}{10} + \\dfrac{1}{5} = \\dfrac{3}{10} + \\dfrac{2}{10} = \\dfrac{5}{10} = \\dfrac{1}{2}',
    );
  });
});
