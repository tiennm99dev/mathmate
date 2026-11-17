import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { KIND_LABELS, buildRound } from './engine.js';

/** @param {string} text '1 024 cm³' */
const read = (text) => Number(text.replace(/\s/g, '').replace(/[^\d]+$/u, ''));

/** @param {string} prompt */
const numbers = (prompt) => [...prompt.matchAll(/(\d+) (?:cm|dm|m)\b/gu)].map((m) => Number(m[1]));

/**
 * The right answer worked out again from the prompt alone.
 * @param {import('./engine.js').Question} q
 */
function expected(q) {
  const n = numbers(q.prompt);
  switch (q.kind) {
    case 'sxq-hop':
      return (n[0] + n[1]) * 2 * n[2];
    case 'stp-hop':
      return (n[0] + n[1]) * 2 * n[2] + 2 * n[0] * n[1];
    case 'dien-tich-lp':
      return n[0] * n[0] * (q.prompt.includes('xung quanh') ? 4 : 6);
    case 'the-tich-hop':
      return n[0] * n[1] * n[2];
    case 'the-tich-lp':
      return n[0] ** 3;
    case 'doi-don-vi':
      return n[0] * 10 * n[1] * n[2];
    case 'xep-hop':
      return Math.floor(n[0] / n[3]) * Math.floor(n[1] / n[3]) * Math.floor(n[2] / n[3]);
    case 'phan-con-lai':
      return n[0] * n[1] * n[2] - n[3] ** 3;
    default:
      return NaN;
  }
}

const rounds = Array.from({ length: 80 }, (_, i) => buildRound(i + 1));

describe('chapter practice round', () => {
  it('asks one question of each part', () => {
    const bad = rounds.filter(
      (r) =>
        r.length !== Object.keys(KIND_LABELS).length ||
        new Set(r.map((q) => q.kind)).size !== r.length,
    );
    expect(bad).toEqual([]);
  });

  it('gives four distinct options with the answer among them', () => {
    const bad = rounds.flat().filter((q) => {
      const texts = q.options.map(optionText);
      return new Set(texts).size !== 4 || !(q.answer >= 0 && q.answer < texts.length);
    });
    expect(bad.map((q) => q.prompt)).toEqual([]);
  });

  it('marks the right answer', () => {
    const bad = rounds
      .flat()
      .filter((q) => read(optionText(q.options[q.answer])) !== expected(q))
      .map((q) => `${q.prompt} → ${optionText(q.options[q.answer])}`);
    expect(bad).toEqual([]);
  });

  it('ends the solution with the answer', () => {
    const bad = rounds
      .flat()
      .filter(
        (q) =>
          !q.solution.includes(
            `= ${optionText(q.options[q.answer]).split(' ').slice(0, -1).join(' ')} (`,
          ),
      )
      .map((q) => q.solution);
    expect(bad).toEqual([]);
  });

  it('never makes a box or crate wider than it is long', () => {
    const bad = rounds
      .flat()
      .filter((q) => q.visual && q.visual.b > q.visual.a)
      .map((q) => q.prompt);
    expect(bad).toEqual([]);
  });

  it('builds the same first round every time', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
  });
});
