import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { richParts } from '#lib/core/rich-parts.js';
import { FIELDS, SCENARIOS, expected, judge, readTyped, solution } from './engine.js';

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

const byId = (/** @type {string} */ id) => SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];

describe('the review situations', () => {
  it('compute the hand-checked answers', () => {
    const got = SCENARIOS.map((s) => [
      s.id,
      expected(s, 'pB'),
      Number(expected(s, 'post').toFixed(3)),
    ]);
    expect(got).toEqual([
      ['mua', 0.19, 0.632],
      ['thu-rac', 0.392, 0.969],
      ['xet-nghiem', 0.087, 0.563],
      ['may', 0.024, 0.5],
      ['ban-sung', 0.81, 0.778],
    ]);
  });

  it('reads decimals, fractions and percentages', () => {
    expect(readTyped('0,3')).toBe(0.3);
    expect(readTyped('3/10')).toBe(0.3);
    expect(readTyped('2%')).toBe(0.02);
    expect(readTyped('40 %')).toBe(0.4);
    expect(readTyped('abc')).toBeNull();
  });

  it('judges each box', () => {
    const s = byId('mua');
    expect(judge(s, 'pA', '')).toBe('empty');
    expect(judge(s, 'pA', '0,3')).toBe('right');
    expect(judge(s, 'pBnA', '0,9')).toBe('wrong');
    expect(judge(s, 'pB', '0,19')).toBe('right');
    expect(judge(s, 'post', '12/19')).toBe('right');
    expect(judge(s, 'post', '0,632')).toBe('right');
    expect(judge(s, 'post', '0,63')).toBe('wrong');
    expect(judge(s, 'pA', '3')).toBe('invalid');
  });

  it('accepts every exact answer and writes valid TeX', () => {
    const bad = [];
    for (const s of SCENARIOS) {
      for (const f of FIELDS) {
        const v = expected(s, f.id);
        if (judge(s, f.id, String(v).replace('.', ',')) !== 'right') bad.push(`${s.id} ${f.id}`);
      }
      for (const text of [s.story, ...solution(s)]) bad.push(...texErrors(text));
    }
    expect(bad).toEqual([]);
  });
});
