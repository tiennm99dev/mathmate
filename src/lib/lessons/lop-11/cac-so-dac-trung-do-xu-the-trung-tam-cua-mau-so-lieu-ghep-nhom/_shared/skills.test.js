import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { numberText, readNumber } from '#lib/core/decimal.js';
import { rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, drawTable, tableText } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 200) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** @param {string} text */
const texParts = (text) => [...text.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);

describe('chapter drill skills', () => {
  it('draws tables of five equal groups', () => {
    const t = drawTable(rng(1));
    expect(t).toHaveLength(5);
    expect(new Set(t.map((g) => g.hi - g.lo)).size).toBe(1);
    expect(tableText(t)).toMatch(/^\$\[\d+; \d+\)\$: \$\d+\$/);
  });

  it('gives answers a learner can type back exactly', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        if (readNumber(numberText(q.answer)) !== q.answer) bad.push([skill.id, q.answer]);
        if (Math.round(q.answer * 100) / 100 !== q.answer) bad.push([skill.id, q.answer]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('writes only TeX that KaTeX renders strictly', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill, 60)) {
        for (const t of [q.prompt, ...q.steps, ...(q.hints ?? [])].flatMap(texParts)) {
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

  it('ends every solution with the rounded answer', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill, 60)) {
        const last = q.steps.at(-1) ?? '';
        const shown = /(?:=|\\approx) (-?[\d{},]+)\$\.$/.exec(last);
        const value = shown ? Number(shown[1].replace('{,}', '.')) : NaN;
        if (value !== q.answer) bad.push([skill.id, last, q.answer]);
      }
    }
    expect(bad).toEqual([]);
  });
});
