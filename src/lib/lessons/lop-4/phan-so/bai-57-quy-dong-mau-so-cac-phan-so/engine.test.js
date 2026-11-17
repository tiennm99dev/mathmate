import { describe, expect, it } from 'vitest';
import { TASKS, commonNote, cutTex, isGivenCommon, maxCut, neededCuts } from './engine.js';

describe('two strips cut to a common denominator', () => {
  it('can reach the common denominator of every task', () => {
    const bad = TASKS.filter((t) => {
      const { first, second } = neededCuts(t);
      return (
        !Number.isInteger(first) ||
        !Number.isInteger(second) ||
        first > maxCut(t.b) ||
        second > maxCut(t.d) ||
        (!isGivenCommon(t) && t.common !== Math.max(t.b, t.d))
      );
    });
    expect(bad).toEqual([]);
  });

  it('keeps each fraction equal while cutting', () => {
    expect(cutTex(3, 4, 2)).toBe(
      '\\dfrac{3}{4} = \\dfrac{3 \\times 2}{4 \\times 2} = \\dfrac{6}{8}',
    );
    expect(cutTex(5, 8, 1)).toBe('\\dfrac{5}{8}');
  });

  it('says when both strips have the same number of parts', () => {
    const t = TASKS[0];
    expect(commonNote(t, 1, 1).tone).toBe('info');
    expect(commonNote(t, 2, 1)).toEqual({
      tone: 'ok',
      text: 'Hai băng cùng có 8 phần. Quy đồng mẫu số được $\\dfrac{6}{8}$ và $\\dfrac{5}{8}$, mẫu số chung là 8.',
    });
    expect(commonNote(t, 4, 2).text).toContain('Mẫu số chung bé hơn là 8');
  });

  it('marks the given common denominators', () => {
    expect(TASKS.filter(isGivenCommon).map((t) => t.common)).toEqual([12, 12]);
  });
});
