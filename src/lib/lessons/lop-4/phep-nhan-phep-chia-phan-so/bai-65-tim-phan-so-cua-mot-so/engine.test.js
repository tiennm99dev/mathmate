import { describe, expect, it } from 'vitest';
import { MAX_GROUPS, TASKS, groupLabel, partNote, partOf } from './engine.js';

describe('finding a fraction of a number with things', () => {
  it('shares every task evenly within the groups the child can make', () => {
    const bad = TASKS.filter(
      (t) => t.N % t.d !== 0 || t.d > MAX_GROUPS || t.n >= t.d || t.n < 1 || t.N > 24,
    );
    expect(bad).toEqual([]);
  });

  it('gives (N : d) × n, which is N × n/d', () => {
    const bad = TASKS.filter((t) => partOf(t) !== (t.N * t.n) / t.d);
    expect(bad).toEqual([]);
    expect(partOf(TASKS[0])).toBe(8);
    expect(partOf(TASKS[1])).toBe(12);
  });

  it('guides the sharing, then the tapping', () => {
    const t = TASKS[0]; // 2/3 of 12 oranges
    expect(partNote(t, 5, 0).text).toContain('5 nhóm, không đều');
    expect(partNote(t, 3, 1).text).toContain('12 : 3 = 4 quả cam');
    expect(partNote(t, 3, 3).tone).toBe('warn');
    expect(partNote(t, 3, 2)).toEqual({
      tone: 'ok',
      text: 'Đúng rồi! 2 nhóm có 4 × 2 = 8 quả cam. Vậy $\\dfrac{2}{3}$ của 12 là $12 \\times \\dfrac{2}{3} = 8$ quả cam.',
    });
    expect(groupLabel(t, 3, 0, true)).toBe('Nhóm 1: 4 quả cam, đã tô màu');
  });
});
