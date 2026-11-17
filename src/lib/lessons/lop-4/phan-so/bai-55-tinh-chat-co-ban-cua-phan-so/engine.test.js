import { describe, expect, it } from 'vitest';
import {
  TASKS,
  answerCut,
  baseOf,
  cutFraction,
  cutNote,
  maxCut,
  relationTex,
  startCut,
} from './engine.js';

describe('equal fractions on two strips', () => {
  it('can reach every task', () => {
    const bad = TASKS.filter((t) => {
      const k = answerCut(t);
      return !Number.isInteger(k) || k < 1 || k > maxCut(t) || !Number.isInteger(startCut(t));
    });
    expect(bad).toEqual([]);
  });

  it('keeps the value while cutting', () => {
    const bad = [];
    for (const t of TASKS) {
      for (let k = 1; k <= maxCut(t); k += 1) {
        const f = cutFraction(t, k);
        if (f.n * t.d !== t.n * f.d) bad.push(`${t.n}/${t.d} k=${k}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('starts like the top strip', () => {
    const t = TASKS[2];
    expect(baseOf(t)).toEqual({ n: 3, d: 4 });
    expect(cutFraction(t, startCut(t))).toEqual({ n: 6, d: 8 });
  });

  it('writes the step by multiplying, dividing or through lowest terms', () => {
    expect(relationTex(TASKS[0], 2)).toBe(
      '\\dfrac{3}{4} = \\dfrac{3 \\times 2}{4 \\times 2} = \\dfrac{6}{8}',
    );
    expect(relationTex(TASKS[2], 1)).toBe('\\dfrac{6}{8} = \\dfrac{6 : 2}{8 : 2} = \\dfrac{3}{4}');
    // 8/12 and 6/9: neither denominator divides the other.
    expect(relationTex(TASKS[6], 3)).toBe('\\dfrac{8}{12} = \\dfrac{2}{3} = \\dfrac{6}{9}');
  });

  it('says when the wanted denominator is found', () => {
    expect(cutNote(TASKS[0], 2).tone).toBe('ok');
    expect(cutNote(TASKS[0], 1).text).toContain('Hai băng giống nhau');
    expect(cutNote(TASKS[0], 3).text).toContain('bây giờ có 12 phần');
  });
});
