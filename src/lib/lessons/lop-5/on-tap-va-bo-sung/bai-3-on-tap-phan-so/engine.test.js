import { describe, expect, it } from 'vitest';
import { TASKS, answerCut, baseOf, cutFraction, cutNote, maxCut, startCut } from './engine.js';

describe('equal fractions on strips', () => {
  it('reduces the given fraction to lowest terms', () => {
    expect(baseOf({ n: 12, d: 20, want: 5 })).toEqual({ n: 3, d: 5 });
    expect(baseOf({ n: 18, d: 24, want: 4 })).toEqual({ n: 3, d: 4 });
  });

  it('cuts every part into k parts', () => {
    expect(cutFraction({ n: 3, d: 5, want: 10 }, 2)).toEqual({ n: 6, d: 10 });
    expect(cutFraction({ n: 1, d: 3, want: 12 }, 4)).toEqual({ n: 4, d: 12 });
  });

  it('has a whole answer within reach for every task, equal to the given fraction', () => {
    const bad = [];
    for (const t of TASKS) {
      const k = answerCut(t);
      const f = cutFraction(t, k);
      if (!Number.isInteger(k) || k < 1 || k > maxCut(t)) bad.push(t);
      if (f.n * t.d !== t.n * f.d || f.d !== t.want) bad.push(t);
      if (cutNote(t, k).tone !== 'ok') bad.push(t);
      if (cutNote(t, startCut(t)).tone === 'ok' || startCut(t) > maxCut(t)) bad.push(t);
    }
    expect(bad).toEqual([]);
  });

  it('says how the fractions are linked', () => {
    expect(cutNote({ n: 12, d: 20, want: 5 }, 1).text).toBe(
      'Đúng rồi! $\\dfrac{12}{20}$ = $\\dfrac{3}{5}$. Chia cả tử số và mẫu số cho 4.',
    );
    expect(cutNote({ n: 3, d: 5, want: 10 }, 1).text).toMatch(/phân số tối giản.*chia nhỏ thêm/);
    expect(cutNote({ n: 3, d: 5, want: 10 }, 3).text).toMatch(/bớt chia nhỏ/);
  });
});
