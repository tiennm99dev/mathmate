import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { KIND_LABELS, buildRound, choices } from './engine.js';

/** @typedef {import('./engine.js').Question} Question */

/** A number written the book's way: '1 234,5 cm²' gives 1234.5. @param {string} text */
const valueOf = (text) =>
  Number(
    text
      .replace(/[\u202f ]/g, '')
      .replace(/[^\d,]+$/, '')
      .replace(',', '.'),
  );

/** The numbers in a prompt, in order. @param {string} text */
const numbersIn = (text) =>
  [...text.matchAll(/\d+(?:,\d+)?/g)].map((m) => Number(m[0].replace(',', '.')));

/**
 * The right answer worked out again from the prompt alone.
 * @param {Question} q
 */
function expected(q) {
  const n = numbersIn(q.prompt);
  const p = q.prompt;
  switch (q.kind) {
    case 'tam-giac':
      return (n[0] * n[1]) / 2;
    case 'hinh-thang':
      return ((n[0] + n[1]) * n[2]) / 2;
    case 'ban-kinh':
      return p.includes('có bán kính') ? n[0] * 2 : n[0] / 2;
    case 'chu-vi':
      return p.includes('đường kính') ? n[0] * 3.14 : n[0] * 2 * 3.14;
    case 'dien-tich-tron': {
      const r = p.includes('đường kính') ? n[0] / 2 : n[0];
      return r * r * 3.14;
    }
    case 'ghep-hinh':
      return n[0] * n[1] + (n[1] * n[2]) / 2;
    case 'thuc-te':
      return p.includes('phần tư') ? (n[0] * 2 * 3.14) / 4 + 2 * n[0] : n[0] * 3.14 * n[1];
    default:
      return NaN;
  }
}

describe('mixed practice of the chapter on plane figures', () => {
  it('asks one question of each part with a single right answer', () => {
    const bad = [];
    for (let seed = 1; seed <= 120; seed++) {
      const round = buildRound(seed);
      const kinds = round.map((q) => q.kind).sort();
      if (kinds.join() !== Object.keys(KIND_LABELS).sort().join()) bad.push(seed);
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([seed, q.kind, 'answer']);
        if (!q.hint || !q.solution) bad.push([seed, q.kind, 'text']);
        if (new Set(texts).size !== texts.length) bad.push([seed, q.kind, 'repeat', texts]);
        if (texts.some((t) => /\d\.\d/.test(t))) bad.push([seed, q.kind, 'decimal point', texts]);
        const right = texts[q.answer];
        if (q.kind === 'so-sanh') {
          if (!q.solution.endsWith(`${right} có diện tích lớn nhất.`))
            bad.push([seed, 'so-sanh', q.solution]);
          continue;
        }
        const values = texts.map(valueOf);
        if (texts.length !== 4 || new Set(values).size !== 4 || values.some((v) => !(v > 0)))
          bad.push([seed, q.kind, 'options', texts]);
        const want = expected(q);
        if (!(Math.abs(valueOf(right) - want) < 1e-6))
          bad.push([seed, q.kind, q.prompt, texts, want]);
        const shown = right.replace(/ \S+$/, '');
        if (!q.solution.includes(`= ${shown} (`))
          bad.push([seed, q.kind, 'solution', q.solution, right]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('checks the largest area in the comparison question', () => {
    const bad = [];
    for (let seed = 1; seed <= 120; seed++) {
      const q = buildRound(seed).find((x) => x.kind === 'so-sanh');
      if (!q) continue;
      const n = numbersIn(q.prompt);
      const areas = {
        'Hình tròn': n[0] * n[0] * 3.14,
        'Hình tam giác': (n[1] * n[2]) / 2,
        'Hình thang': ((n[3] + n[4]) * n[5]) / 2,
      };
      const best = Object.entries(areas).sort((x, y) => y[1] - x[1])[0][0];
      if (optionText(q.options[q.answer]) !== best) bad.push([seed, q.prompt]);
    }
    expect(bad).toEqual([]);
  });

  it('fills up the options when slips coincide with the answer', () => {
    const { options, answer } = choices(() => 0.3, 12.56, [12.56, 12.56, 0], 'cm²');
    expect(options).toHaveLength(4);
    expect(options[answer]).toBe('12,56 cm²');
    expect(new Set(options).size).toBe(4);
  });

  it('gives the same first round every time', () => {
    expect(buildRound(1).map((q) => q.prompt)).toEqual(buildRound(1).map((q) => q.prompt));
  });
});
