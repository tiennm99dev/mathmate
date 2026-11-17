import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { richParts } from '#lib/core/rich-parts.js';
import { N, cells, checkUnion, fitOverlap, formulaText, overlapRange } from './engine.js';

/** @param {string} text */
function texErrors(text) {
  const bad = [];
  for (const part of richParts(text)) {
    if (part.kind !== 'tex') continue;
    try {
      katex.renderToString(part.tex, { throwOnError: true });
    } catch {
      bad.push(part.tex);
    }
  }
  return bad;
}

describe('the 100-family picture', () => {
  it('keeps n(AB) possible', () => {
    expect(overlapRange(70, 50)).toEqual({ min: 20, max: 50 });
    expect(fitOverlap(70, 50, 0)).toBe(20);
    expect(fitOverlap(30, 20, 25)).toBe(20);
    expect(fitOverlap(30, 20, 5)).toBe(5);
  });

  it('lays out one cell per outcome in four blocks', () => {
    const c = cells(70, 50, 30);
    expect(c).toHaveLength(N);
    const count = (/** @type {string} */ r) => c.filter((x) => x === r).length;
    expect([count('onlyA'), count('both'), count('onlyB'), count('neither')]).toEqual([
      40, 30, 20, 10,
    ]);
  });
});

describe('the addition formula', () => {
  it('writes the formula with the numbers', () => {
    expect(formulaText(70, 50, 30)).toContain('0{,}7 + 0{,}5 - 0{,}3 = 0{,}9');
    expect(formulaText(40, 35, 0)).toContain('xung khắc');
    expect(formulaText(60, 40, 0)).toContain('= 1$');
  });

  it('checks a typed P(A ∪ B)', () => {
    expect(checkUnion('0,9', 70, 50, 30).tone).toBe('ok');
    expect(checkUnion('9/10', 70, 50, 30).tone).toBe('ok');
    expect(checkUnion('1,2', 70, 50, 30).text).toContain('đếm hai lần');
    expect(checkUnion('0,5', 70, 50, 30).tone).toBe('warn');
    expect(checkUnion('abc', 70, 50, 30).tone).toBe('warn');
    expect(checkUnion('', 70, 50, 30).tone).toBe('info');
  });

  it('writes valid TeX for every setting', () => {
    const bad = [];
    for (let a = 0; a <= N; a += 10) {
      for (let b = 0; b <= N; b += 10) {
        const r = overlapRange(a, b);
        for (const ab of [r.min, r.max]) {
          bad.push(...texErrors(formulaText(a, b, ab)));
          bad.push(...texErrors(checkUnion('0,1', a, b, ab).text));
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
