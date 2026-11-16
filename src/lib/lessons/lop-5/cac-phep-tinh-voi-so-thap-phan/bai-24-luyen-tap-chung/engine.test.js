import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { KIND_LABELS, buildRound } from './engine.js';

/** @typedef {import('./engine.js').Question} Question */

/** A decimal written the book's way as a number: '314 000' or '4,745 mm'. @param {string} text */
const valueOf = (text) =>
  Number(
    text
      .replace(/[\u202f ]/g, '')
      .replace(/[^\d,]+$/, '')
      .replace(',', '.'),
  );

/** Decimals in a text, as numbers. @param {string} text */
const decimalsIn = (text) => [...text.matchAll(/\d+(?:,\d+)?/g)].map((m) => valueOf(m[0]));

/**
 * The value of a calculation as the book writes it, worked out in JS.
 * @param {string} expr
 */
function evaluate(expr) {
  const js = expr
    .replace(/\u202f/g, '')
    .replace(/(\d),(\d)/g, '$1.$2')
    .replace(/×/g, '*')
    .replace(/:/g, '/')
    .replace(/−/g, '-');
  return Number(new Function(`return (${js});`)());
}

/**
 * The right answer worked out again without the engine's helpers.
 * @param {Question} q
 * @param {string} right the text of the option marked right
 */
function expected(q, right) {
  const expr = q.visual?.expr;
  if (q.kind === 'tim-so') {
    const [lhs, rhs] = /** @type {string} */ (expr).split(' = ');
    return Math.abs(evaluate(lhs.replace('?', right)) - evaluate(rhs)) < 1e-9
      ? valueOf(right)
      : NaN;
  }
  if (expr) return evaluate(expr);
  const n = decimalsIn(q.prompt);
  if (q.kind === 'trung-binh') return (n[0] + n[1] + n[2]) / 3;
  if (q.prompt.includes('trang trại')) return (n[0] - n[1]) / 2;
  // The garden: area and width, then (length + width) × 2.
  return (n[0] / n[1] + n[1]) * 2;
}

describe('mixed practice of the chapter on operations with decimals', () => {
  it('asks one question of each part with a single right answer', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const round = buildRound(seed);
      const kinds = round.map((q) => q.kind).sort();
      if (kinds.join() !== Object.keys(KIND_LABELS).sort().join()) bad.push(seed);
      for (const q of round) {
        const texts = q.options.map(optionText);
        const values = texts.map(valueOf);
        if (texts.length < 3 || new Set(values).size !== values.length)
          bad.push([seed, q.kind, texts]);
        if (values.some((v) => !(v > 0))) bad.push([seed, q.kind, 'value', texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([seed, q.kind, 'answer']);
        if (!q.hint || !q.solution) bad.push([seed, q.kind, 'text']);
        if (texts.some((t) => /\.|,\d*0(?!\d)/.test(t))) bad.push([seed, q.kind, 'written', texts]);
        const right = texts[q.answer];
        const want = expected(q, right);
        if (!(Math.abs(valueOf(right) - want) < 1e-9))
          bad.push([seed, q.kind, q.prompt, q.visual, texts, q.answer, want]);
        if (!q.solution.includes(right.replace(/ (mm|m|tấn)$/, '')))
          bad.push([seed, q.kind, 'solution', q.solution, right]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('gives the same first round every time', () => {
    expect(buildRound(1).map((q) => q.prompt)).toEqual(buildRound(1).map((q) => q.prompt));
  });
});
