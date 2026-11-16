import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import {
  KIND_LABELS,
  buildRound,
  judgeQuestion,
  productQuestion,
  quotientQuestion,
  reasonableQuestion,
  sumQuestion,
} from './engine.js';

/** @param {string} text */
const value = (text) => Number(text.replace(/\D/g, ''));

/** @param {number} n */
const roundTens = (n) => Math.round(n / 10) * 10;

/** @param {number} n */
const roundThousands = (n) => Math.round(n / 1000) * 1000;

/**
 * The numbers of a prompt, as written.
 * @param {string} prompt
 */
const numbersOf = (prompt) =>
  (prompt.match(/\d[\d\u202f]*/g) ?? []).map((t) => Number(t.replace(/\u202f/g, '')));

describe('the estimating questions', () => {
  it('store the rounded estimate as the answer', () => {
    const bad = [];
    const rand = rng(11);
    for (let i = 0; i < 200; i++) {
      for (const kind of /** @type {const} */ (['cong', 'tru'])) {
        const q = sumQuestion(rand, kind);
        const [a, b] = numbersOf(q.prompt);
        const want =
          kind === 'cong'
            ? roundThousands(a) + roundThousands(b)
            : roundThousands(a) - roundThousands(b);
        if (value(optionText(q.options[q.answer])) !== want || want <= 0) bad.push(q.prompt);
      }
      const p = productQuestion(rand);
      const [x, y] = numbersOf(p.prompt);
      if (value(optionText(p.options[p.answer])) !== roundTens(x) * roundTens(y)) {
        bad.push(p.prompt);
      }
      const d = quotientQuestion(rand);
      const [n, by] = numbersOf(d.prompt);
      const got = value(optionText(d.options[d.answer]));
      if (Math.abs(n / by - got) > got * 0.15) bad.push(d.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('keep the exact product among the options of the reasonable result', () => {
    const bad = [];
    const rand = rng(5);
    for (let i = 0; i < 200; i++) {
      const q = reasonableQuestion(rand);
      const [a, b] = numbersOf(q.prompt);
      const options = q.options.map((o) => value(optionText(o)));
      if (options[q.answer] !== a * b || new Set(options).size !== 3) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('judge each statement by the exact product', () => {
    const bad = [];
    const rand = rng(9);
    for (let i = 0; i < 200; i++) {
      const q = judgeQuestion(rand);
      const [a, b, bound] = numbersOf(q.prompt);
      const holds = q.prompt.includes('>') ? a * b > bound : a * b < bound;
      if (q.answer !== (holds ? 0 : 1) || roundTens(a) * roundTens(b) !== bound) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});

describe('the round', () => {
  it('has one question of each part', () => {
    const bad = [];
    for (let seed = 1; seed <= 50; seed++) {
      const kinds = buildRound(seed).map((q) => q.kind ?? '');
      if (kinds.toSorted().join() !== Object.keys(KIND_LABELS).toSorted().join()) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });
});
