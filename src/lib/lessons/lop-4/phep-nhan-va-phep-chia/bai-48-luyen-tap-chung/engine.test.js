import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { GROUP } from '#lib/core/number-format.js';
import { KIND_LABELS, buildRound, dropZeros } from './engine.js';

/** @param {string} text */
const numbersIn = (text) =>
  (text.match(new RegExp(`\\d+(?:${GROUP}\\d{3})*`, 'g')) ?? []).map((s) =>
    Number(s.replaceAll(GROUP, '')),
  );

const SEEDS = Array.from({ length: 60 }, (_, i) => i * 7919 + 1);

/**
 * The value the question asks for, worked out from the numbers in its prompt.
 * @param {import('#lib/core/kid/quiz.js').KidQuestion} q
 * @returns {number[]}
 */
function expected(q) {
  const n = numbersIn(q.prompt);
  switch (q.kind) {
    case 'nham-10':
    case 'tron-chuc':
    case 'chia':
      return [q.prompt.includes('×') ? n[0] * n[1] : n[0] / n[1]];
    case 'nhan':
      return [n[0] * n[1]];
    case 'thuan-tien':
      return [n[0] * n[1] * n[2]];
    case 'phan-phoi':
      return [n[0] * n[1] + n[2] * n[3]];
    case 'trung-binh':
      return [n.reduce((s, v) => s + v, 0) / n.length];
    case 'don-vi':
      return [(n[1] / n[0]) * n[2]];
    case 'co-du':
      return [Math.floor(n[0] / n[1]), n[0] % n[1]];
    default:
      return [];
  }
}

describe('mixed practice round', () => {
  it('asks one question of each part', () => {
    const round = buildRound(3);
    expect(round.map((q) => q.kind).sort()).toEqual(Object.keys(KIND_LABELS).sort());
  });

  it('has distinct options with the right one among them and no answer in the hint', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const texts = q.options.map(optionText);
        if (new Set(texts).size !== texts.length || texts.length < 3) bad.push(`${seed} ${q.kind}`);
        if (q.answer < 0 || q.answer >= texts.length) bad.push(`${seed} ${q.kind} answer`);
        const right = numbersIn(texts[q.answer]);
        if (q.kind !== 'co-du' && numbersIn(q.hint).includes(right[0]))
          bad.push(`${seed} ${q.kind} hint`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('marks the right result of every question', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const right = numbersIn(optionText(q.options[q.answer]));
        const want = expected(q);
        if (want.some((v, i) => v !== right[i])) bad.push(`${q.kind}: ${q.prompt}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps every whole number within the grade', () => {
    const bad = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        for (const v of [
          ...numbersIn(q.prompt),
          ...q.options.flatMap((o) => numbersIn(optionText(o))),
        ])
          if (!Number.isInteger(v) || v > 999999999) bad.push(`${q.kind}: ${v}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('drops the 0 digits of a quotient as a forgotten 0 would', () => {
    expect(dropZeros(2106)).toBe(216);
    expect(dropZeros(5026)).toBe(526);
  });
});
