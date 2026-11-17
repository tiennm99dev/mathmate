import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { rng } from '#lib/core/drill.js';
import { readProbability } from '#lib/core/fractions.js';
import { richParts } from '#lib/core/rich-parts.js';
import { probText } from './conditional.js';
import { CHAPTER_SKILLS, bayes, drawTree, toanPhan } from './skills.js';

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

describe('the chapter drill skills', () => {
  it('give probabilities that read back from their own written answer', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (let seed = 1; seed <= 60; seed++) {
        const q = skill.make(rng(seed));
        const back = readProbability(probText(q.answer));
        if (!(q.answer > 0 && q.answer <= 1) || back !== q.answer) {
          bad.push(`${skill.id} ${seed}: ${q.answer}`);
        }
        for (const text of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
          bad.push(...texErrors(text).map((t) => `${skill.id} ${seed}: ${t}`));
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('match the total probability and Bayes formulas', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const t = drawTree(rng(seed));
      const pA = t.a / 10;
      const pB = pA * (t.u / 20) + (1 - pA) * (t.v / 20);
      if (t.u === t.v) bad.push(`independent tree ${seed}`);
      if (Math.abs(toanPhan.make(rng(seed)).answer - pB) > 1e-12) bad.push(`total ${seed}`);
      if (Math.abs(bayes.make(rng(seed)).answer - (pA * (t.u / 20)) / pB) > 1e-12) {
        bad.push(`bayes ${seed}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('accepts a typed decimal for an exact decimal answer', () => {
    const q = toanPhan.make(rng(3));
    expect(readProbability(probText(q.answer).replace('.', ','))).toBe(q.answer);
  });
});
