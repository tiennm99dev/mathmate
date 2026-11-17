import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { buildSet, rng } from '#lib/core/drill.js';
import { readProbability } from '#lib/core/fractions.js';
import { richParts } from '#lib/core/rich-parts.js';
import { CHAPTER_SKILLS, cardCounts } from './skills.js';
import {
  countTex,
  isShortDecimal,
  percentText,
  probTex,
  probText,
  runTrials,
} from './probability.js';

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

describe('probability writing', () => {
  it('writes short decimals and fractions the book way', () => {
    expect(probText(0.56)).toBe('0,56');
    expect(probText(11 / 36)).toBe('11/36');
    expect(probText(1)).toBe('1');
    expect(probTex(0.94)).toBe('0{,}94');
    expect(probTex(5 / 18)).toBe('\\dfrac{5}{18}');
    expect(countTex(6, 36)).toBe('\\dfrac{6}{36} = \\dfrac{1}{6}');
    expect(countTex(0, 36)).toBe('\\dfrac{0}{36} = 0');
    expect(isShortDecimal(0.125)).toBe(true);
    expect(percentText(563, 1000)).toBe('56,3%');
    expect(percentText(0, 0)).toBe('—');
  });

  it('counts trial results', () => {
    const m = runTrials(rng(3), 100, (r) => (r() < 0.5 ? 'a' : 'b'));
    expect((m.get('a') ?? 0) + (m.get('b') ?? 0)).toBe(100);
  });
});

describe('chapter drill skills', () => {
  it('counts card events', () => {
    expect(cardCounts(30, 2, 3)).toEqual({ p: 15, q: 10, pq: 5, l: 6 });
    expect(cardCounts(40, 4, 6)).toEqual({ p: 10, q: 6, pq: 3, l: 12 });
  });

  it('makes valid questions whose typed answers are accepted', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildSet(CHAPTER_SKILLS, 3, seed)) {
        const typed = probText(q.answer);
        if (!(q.answer >= 0 && (q.answer <= 1 || Number.isInteger(q.answer)))) bad.push(q.prompt);
        if (readProbability(typed) !== q.answer) bad.push(`${q.prompt} → ${typed}`);
        for (const t of [q.prompt, ...q.steps, ...(q.hints ?? [])]) bad.push(...texErrors(t));
      }
    }
    expect(bad).toEqual([]);
  });
});
