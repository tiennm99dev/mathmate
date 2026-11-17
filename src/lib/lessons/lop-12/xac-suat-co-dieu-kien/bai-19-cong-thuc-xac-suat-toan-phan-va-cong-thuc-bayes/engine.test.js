import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { richParts } from '#lib/core/rich-parts.js';
import { GROUP_SIZE, PREVALENCES, countStory, explain, groupCounts } from './engine.js';

/** @param {string} text */
function texErrors(text) {
  const bad = [];
  for (const part of richParts(text)) {
    if (part.kind !== 'tex') continue;
    try {
      katex.renderToString(part.tex, { throwOnError: true, strict: 'error' });
    } catch {
      bad.push(part.tex);
    }
  }
  return bad;
}

const book = { pA: 0.002, pBA: 0.95, pBnA: 0.01 };

describe('the medical-test tree', () => {
  it('gives the book result for a positive test', () => {
    const text = explain(book, 'pos');
    expect(text).toContain('= 0{,}01188');
    expect(text).toContain('\\approx 0{,}1599');
  });

  it('gives the chance of being ill after a negative test', () => {
    const text = explain(book, 'neg');
    expect(text).toContain('= 0{,}98812');
    expect(text).toContain('\\approx 0{,}0001');
  });

  it('tells the same story in counts that add up to the group', () => {
    const c = groupCounts(book);
    expect(c).toEqual({ AB: 190, AnB: 10, nAB: 998, nAnB: 98802 });
    expect(c.AB + c.AnB + c.nAB + c.nAnB).toBe(GROUP_SIZE);
    expect(countStory(book, 'pos')).toContain('190/1\u202f188');
  });

  it('handles a perfect test and writes valid TeX everywhere', () => {
    expect(explain({ pA: 0.5, pBA: 1, pBnA: 0 }, 'pos')).toContain('\\approx 1');
    const bad = [];
    for (const pA of PREVALENCES) {
      for (const pBA of [0.5, 0.73, 1]) {
        for (const pBnA of [0, 0.005, 0.3]) {
          for (const r of /** @type {const} */ (['pos', 'neg'])) {
            bad.push(...texErrors(explain({ pA, pBA, pBnA }, r)));
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
