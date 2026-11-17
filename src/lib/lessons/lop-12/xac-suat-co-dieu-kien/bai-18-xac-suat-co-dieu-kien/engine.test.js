import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { richParts } from '#lib/core/rich-parts.js';
import { EVENTS, PRESETS, countWhere, explain, tally } from './engine.js';

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

const club = PRESETS[0].counts;

describe('the two-way table', () => {
  it('counts an event and an intersection', () => {
    expect(countWhere(club, ['none'])).toBe(40);
    expect(countWhere(club, ['r0'])).toBe(22);
    expect(countWhere(club, ['c0'])).toBe(20);
    expect(countWhere(club, ['c0', 'r1'])).toBe(5);
    expect(countWhere(club, ['r0', 'r1'])).toBe(0);
  });

  it('shrinks the sample space to the condition', () => {
    expect(tally(club, 'c0', 'r0')).toEqual({ n: 40, nA: 20, nB: 22, nAB: 15 });
    const text = explain(club, 'c0', 'r0').text;
    expect(text).toContain('\\dfrac{15}{22}');
    expect(text).toContain('P(A|B) > P(A)');
  });

  it('spots independence and a condition that cannot happen', () => {
    const even = [
      [6, 4],
      [9, 6],
    ];
    expect(explain(even, 'c0', 'r0').text).toContain('độc lập');
    const empty = [
      [0, 0],
      [3, 2],
    ];
    expect(explain(empty, 'c0', 'r0').tone).toBe('warn');
    expect(explain(empty, 'c0', 'none').tone).toBe('info');
  });

  it('writes valid TeX for every choice', () => {
    const bad = [];
    for (const p of PRESETS) {
      for (const a of EVENTS) {
        for (const b of /** @type {const} */ (['none', ...EVENTS])) {
          bad.push(...texErrors(explain(p.counts, a, b).text));
        }
      }
      bad.push(...texErrors(p.story));
    }
    expect(bad).toEqual([]);
  });
});
