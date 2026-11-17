import { describe, expect, it } from 'vitest';
import { commonOf } from '../_shared/fractions.js';
import { TASKS, cutState, diffNote, diffTex, maxCut } from './engine.js';

describe('subtracting two fractions on strips', () => {
  it('has a reachable common denominator and a positive difference in every task', () => {
    const bad = TASKS.filter((t) => {
      const D = commonOf(t.b, t.d);
      return D === null || D / t.b > maxCut(t.b) || D / t.d > maxCut(t.d) || t.a * t.d <= t.c * t.b;
    });
    expect(bad).toEqual([]);
  });

  it('is done only when the struck pieces match the bottom strip', () => {
    const t = TASKS[1]; // 3/4 − 1/8
    expect(cutState(t, 1, 1).same).toBe(false);
    expect(diffNote(t, 1, 1, 0).tone).toBe('info');
    expect(diffNote(t, 2, 1, 0).tone).toBe('info');
    expect(diffNote(t, 2, 1, 2).tone).toBe('warn');
    expect(diffNote(t, 2, 1, 1)).toEqual({
      tone: 'ok',
      text: 'Đúng rồi! Có 6 mảnh, gạch bớt 1 mảnh, còn lại 5 mảnh: $\\dfrac{3}{4} - \\dfrac{1}{8} = \\dfrac{6}{8} - \\dfrac{1}{8} = \\dfrac{5}{8}$. Trừ hai tử số, giữ nguyên mẫu số.',
    });
  });

  it('writes the working the book way and reduces the result', () => {
    expect(diffTex(TASKS[0], 5)).toBe('\\dfrac{4}{5} - \\dfrac{1}{5} = \\dfrac{3}{5}');
    expect(diffTex(TASKS[7], 20)).toBe(
      '\\dfrac{2}{5} - \\dfrac{3}{20} = \\dfrac{8}{20} - \\dfrac{3}{20} = \\dfrac{5}{20} = \\dfrac{1}{4}',
    );
    expect(diffTex(TASKS[5], 4)).toBe('\\dfrac{10}{4} - \\dfrac{5}{4} = \\dfrac{5}{4}');
  });
});
