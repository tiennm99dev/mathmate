import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { buildSet, rng } from '#lib/core/drill.js';
import {
  CHAPTER_SKILLS,
  drawTable,
  iqrQuestion,
  rangeQuestion,
  stdQuestion,
  varianceQuestion,
} from './skills.js';
import { groupedIqr, groupedStd, groupedVariance, makeGroups } from './grouped.js';

/** @param {string} text */
const texParts = (text) => [...text.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);

describe('spread drill skills', () => {
  it('draws a set of four skills with readable TeX', () => {
    const bad = [];
    for (const seed of [1, 7, 42, 2026]) {
      const set = buildSet(CHAPTER_SKILLS, 3, seed);
      expect(set).toHaveLength(12);
      for (const q of set) {
        for (const t of [q.prompt, ...(q.hints ?? []), ...q.steps].flatMap(texParts)) {
          try {
            katex.renderToString(t, { strict: 'error', throwOnError: true });
          } catch {
            bad.push(t);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('stores the measures of a known table', () => {
    const heights = makeGroups(150, 5, [3, 7, 12, 10, 5, 3]);
    expect(rangeQuestion(heights).answer).toBe(30);
    expect(iqrQuestion(heights)?.answer).toBe(9);
    expect(varianceQuestion(heights)?.answer).toBe(43.5);
    expect(stdQuestion(heights)?.answer).toBe(6.6);
    expect(iqrQuestion(makeGroups(0, 5, [6, 14, 10, 7, 3]))?.answer).toBe(8.57);
  });

  it('stores answers within half a hundredth of the drawn table', () => {
    const wrong = [];
    for (let seed = 1; seed <= 40; seed++) {
      const table = drawTable(rng(seed));
      /** @type {Array<{ q: { answer: number } | null, exact: number }>} */
      const pairs = [
        { q: iqrQuestion(table), exact: groupedIqr(table).value },
        { q: varianceQuestion(table), exact: groupedVariance(table) },
        { q: stdQuestion(table), exact: groupedStd(table) },
      ];
      for (const { q, exact } of pairs) {
        if (q && Math.abs(q.answer - exact) > 0.005 + 1e-9) wrong.push({ seed, exact });
      }
    }
    expect(wrong).toEqual([]);
  });

  it('takes an interquartile range one hundredth off, from rounded quartiles', () => {
    // Q1 = 45/7 ≈ 6,43 and Q3 = 15: 15 − 6,43 = 8,57, and 8,56 or 8,58 also pass
    const q = iqrQuestion(makeGroups(0, 5, [6, 14, 10, 7, 3]));
    const read = q?.read;
    expect(read && ['8,57', '8,56', '8.58', '8,6', 'x'].map(read)).toEqual([
      8.57,
      8.57,
      8.57,
      8.6,
      null,
    ]);
  });

  it('warns to keep a long mean exact in the variance hints', () => {
    const long = varianceQuestion(makeGroups(40, 10, [2, 5, 9, 10, 3, 1]));
    const short = varianceQuestion(makeGroups(150, 5, [3, 7, 12, 10, 5, 3]));
    expect(long?.hints?.join(' ')).toContain('dạng phân số');
    expect(short?.hints?.join(' ')).not.toContain('dạng phân số');
  });

  it('rounds every answer to hundredths', () => {
    const odd = buildSet(CHAPTER_SKILLS, 3, 99).filter(
      (q) => Math.abs(q.answer * 100 - Math.round(q.answer * 100)) > 1e-6,
    );
    expect(odd).toEqual([]);
  });
});
