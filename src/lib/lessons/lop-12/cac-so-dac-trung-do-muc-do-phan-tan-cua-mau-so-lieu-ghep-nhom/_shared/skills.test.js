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

  it('rounds every answer to hundredths', () => {
    const odd = buildSet(CHAPTER_SKILLS, 3, 99).filter(
      (q) => Math.abs(q.answer * 100 - Math.round(q.answer * 100)) > 1e-6,
    );
    expect(odd).toEqual([]);
  });
});
