import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { add, div, equals, fraction, fromMixed, mul, sub } from '#lib/fraction-engine/index.js';
import { KIND_LABELS, buildRound } from './engine.js';

/** @typedef {import('./engine.js').Question} Question */

/**
 * The value of a fraction option, or null for a text option.
 * @param {import('#lib/core/kid/quiz.js').KidOption} o
 */
const fracOf = (o) => (typeof o === 'object' && 'n' in o ? fraction(o.n, o.d) : null);

/** The number in a text option ('1 250 kg' → 1250). @param {string} text */
const numberOf = (text) => Number(text.replace(/[^\d]/g, ''));

/**
 * The value an expression question asks for, worked out by the fraction
 * engine.
 * @param {Question} q
 */
function expected(q) {
  const t = /** @type {NonNullable<Question['visual']>} */ (q.visual).terms;
  const first = /** @type {{ n: number, d: number, whole?: number }} */ (t[0]);
  if (first.whole !== undefined) return fromMixed(first.whole, first.n, first.d);
  if (t.length === 2) return fraction(first.n, first.d);
  const second = /** @type {{ n: number, d: number }} */ (t[2]);
  const x = fraction(first.n, first.d);
  const y = fraction(second.n, second.d);
  const op = { '+': add, '−': sub, '×': mul, ':': div }[/** @type {string} */ (t[1])];
  return /** @type {NonNullable<typeof op>} */ (op)(x, y);
}

describe('mixed practice of the review chapter', () => {
  it('asks one question of each part with a single right answer', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const round = buildRound(seed);
      const kinds = round.map((q) => q.kind).sort();
      if (kinds.join() !== Object.keys(KIND_LABELS).sort().join()) bad.push(seed);
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (texts.length < 3 || new Set(texts).size !== texts.length) bad.push([seed, q]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([seed, q]);
        if (!q.hint || !q.solution) bad.push([seed, q]);
        if (q.visual) {
          const want = expected(q);
          const right = fracOf(q.options[q.answer]);
          if (!right || !equals(right, want)) bad.push([seed, q.kind, q.visual, texts, q.answer]);
          // For the exercises judged by value, no other option has the same value.
          if (q.kind === 'nhan-chia' || q.kind === 'cong-tru') {
            const same = q.options.filter((o) => {
              const f = fracOf(o);
              return f && equals(f, want);
            });
            if (same.length !== 1) bad.push([seed, q.kind, texts]);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('writes answers the solution agrees with', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]);
        const flat = q.solution.replace(/[\s\u202f]/g, '');
        const key = fracOf(q.options[q.answer]) ? right : String(numberOf(right));
        if (!flat.includes(key)) bad.push([q.kind, right, q.solution]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('checks the value of a digit and the convenient calculations', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const right = numberOf(optionText(q.options[q.answer]));
        if (q.kind === 'gia-tri') {
          const m = q.prompt.match(/số ([\d\u202f]+), chữ số (\d)/);
          const digits = (m?.[1] ?? '').replace(/\u202f/g, '');
          const at = digits.indexOf(m?.[2] ?? '');
          const value = Number(m?.[2]) * 10 ** (digits.length - 1 - at);
          if (digits.split(m?.[2] ?? '').length !== 2 || value !== right) bad.push(q.prompt);
        }
        if (q.kind === 'tinh-nhanh') {
          const expr = q.prompt.split(': ')[1].replace(' = ?', '').replace(/×/g, '*');
          if (Function(`return ${expr}`)() !== right) bad.push(q.prompt);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('writes the fraction part of a mixed number in lowest terms', () => {
    const bad = [];
    for (let seed = 1; seed <= 200; seed++) {
      const q = buildRound(seed).find((x) => x.kind === 'hon-so');
      const m = /** @type {{ n: number, d: number }} */ (q?.visual?.terms[0]);
      const g = (/** @type {number} */ a, /** @type {number} */ b) => {
        while (b) [a, b] = [b, a % b];
        return a;
      };
      if (g(m.n, m.d) !== 1) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });
});
