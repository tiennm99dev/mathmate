import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { stepsOf } from '../_shared/division.js';
import { FIRST, drawTask, estimateOf, estimateText, promptOf, trialOf } from './engine.js';

describe('estimating a quotient digit', () => {
  it('covers the last digits, as the book does', () => {
    expect(estimateOf(21, 12)).toBe(2);
    expect(estimateOf(96, 12)).toBe(9);
    expect(estimateOf(134, 64)).toBe(2);
    expect(estimateOf(15, 43)).toBe(0);
    expect(estimateOf(189, 19)).toBe(9);
    expect(estimateText(134, 64)).toBe(
      'Ước lượng: 134 : 64, em che chữ số cuối, được 13 : 6 = 2. Em thử 2.',
    );
  });

  it('never estimates below the true digit', () => {
    const bad = [];
    for (let d = 11; d <= 99; d++) {
      for (let partial = d; partial < 10 * d; partial++) {
        if (estimateOf(partial, d) < Math.floor(partial / d)) bad.push([partial, d]);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('trying a digit', () => {
  it('tells too big, too small and right apart', () => {
    expect(trialOf(21, 12, 2).verdict).toBe('big');
    expect(trialOf(77, 18, 3).verdict).toBe('small');
    expect(trialOf(77, 18, 4)).toEqual({
      verdict: 'right',
      text: 'Thử 4: 4 × 18 = 72, 77 − 72 = 5, bé hơn 18. Đúng rồi, viết 4.',
    });
  });
});

describe('the rounds', () => {
  it('works out the book examples', () => {
    expect(
      stepsOf(FIRST.exact)
        .filter((s) => s.kind === 'digit')
        .map((s) => s.digit),
    ).toEqual([1, 8]);
    expect(promptOf(FIRST.exact, 0)).toBe(
      '2 bé hơn 12, nên em lấy 21 chia cho 12. Ước lượng: 21 : 12, em che chữ số cuối, được 2 : 1 = 2. Em thử 2.',
    );
    expect(promptOf(FIRST.rest, stepsOf(FIRST.rest).length)).toBe(
      'Vậy 779 : 18 = 43 (dư 5). Thử lại: 43 × 18 = 774, 774 + 5 = 779.',
    );
  });

  it('draws tasks of the asked kind', () => {
    const bad = [];
    const rand = rng(3);
    for (const kind of /** @type {const} */ (['exact', 'rest', 'big'])) {
      for (let i = 0; i < 100; i++) {
        const { n, d } = drawTask(rand, kind);
        const ok =
          d >= 11 &&
          d <= 99 &&
          (kind === 'exact' ? n % d === 0 && n < 1000 : true) &&
          (kind === 'rest' ? n % d > 0 && n < 1000 : true) &&
          (kind === 'big' ? n >= 1000 && n <= 99999 : n >= 100);
        if (!ok) bad.push({ kind, n, d });
      }
    }
    expect(bad).toEqual([]);
  });
});
