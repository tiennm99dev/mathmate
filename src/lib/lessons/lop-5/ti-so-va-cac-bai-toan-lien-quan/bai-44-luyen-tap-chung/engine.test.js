import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { run, screenValue } from '../_shared/calc.js';
import { KIND_LABELS, buildRound } from './engine.js';

/** @typedef {import('./engine.js').Question} Question */

/** A number written the book's way: '12 345,5 kg' → 12345.5. @param {string} text */
const valueOf = (text) =>
  Number(
    text
      .replace(/[\u202f ]/g, '')
      .replace(/[^\d,]+$/, '')
      .replace(',', '.'),
  );

/** Numbers in a sentence, as numbers ('1 : 10 000' gives 1 and 10000). @param {string} text */
const numbersIn = (text) =>
  [...text.matchAll(/\d+(?:\u202f\d{3})*(?:,\d+)?/g)].map((m) => valueOf(m[0]));

/**
 * The right answer worked out again from the prompt alone.
 * @param {Question} q
 */
function expected(q) {
  const n = numbersIn(q.prompt);
  switch (q.kind) {
    case 'ti-so-phan-tram':
      return (n[0] / n[1]) * 100;
    case 'ti-le-ban-do': {
      const cm = n[1] * n[2];
      return n[1] >= 100000 ? cm / 100000 : cm / 100;
    }
    case 'tong-ti':
      // sum, m, n
      return (n[0] / (n[1] + n[2])) * n[1];
    case 'hieu-ti':
      // difference, m, n
      return (n[0] / (n[2] - n[1])) * n[2];
    case 'gia-tri-phan-tram':
      return (n[1] * n[0]) / 100;
    case 'giam-gia':
      return n[0] - (n[0] * n[1]) / 100;
    case 'bai-toan':
      return n[0] - (n[0] * n[1]) / 100;
    default:
      return NaN;
  }
}

describe('mixed practice of the chapter on ratios', () => {
  it('asks one question of each part with a single right answer', () => {
    const bad = [];
    for (let seed = 1; seed <= 120; seed++) {
      const round = buildRound(seed);
      const kinds = round.map((q) => q.kind).sort();
      if (kinds.join() !== Object.keys(KIND_LABELS).sort().join()) bad.push(seed);
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (texts.length !== 4 || new Set(texts).size !== 4) bad.push([seed, q.kind, texts]);
        if (!q.hint || !q.solution) bad.push([seed, q.kind, 'text']);
        if (texts.some((t) => t.includes('.'))) bad.push([seed, q.kind, 'decimal point', texts]);
        const right = texts[q.answer];
        if (q.kind === 'may-tinh') {
          // Pressing the right keys gives what the solution says the screen shows.
          const shown = screenValue(run(right.replace(/ /g, '')));
          if (shown === null || !q.solution.includes(String(shown)))
            bad.push([seed, right, q.solution]);
          continue;
        }
        const values = texts.map(valueOf);
        if (new Set(values).size !== 4 || values.some((v) => !(v > 0)))
          bad.push([seed, q.kind, 'values', texts]);
        if (!(Math.abs(valueOf(right) - expected(q)) < 1e-9))
          bad.push([seed, q.kind, q.prompt, texts, q.answer, expected(q)]);
        if (!q.solution.includes(right.replace(/ (kg|km|m|cây|cái|đồng)$/, '').replace(/%$/, '')))
          bad.push([seed, q.kind, 'solution', q.solution, right]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('gives the same first round every time', () => {
    expect(buildRound(1).map((q) => q.prompt)).toEqual(buildRound(1).map((q) => q.prompt));
  });
});
