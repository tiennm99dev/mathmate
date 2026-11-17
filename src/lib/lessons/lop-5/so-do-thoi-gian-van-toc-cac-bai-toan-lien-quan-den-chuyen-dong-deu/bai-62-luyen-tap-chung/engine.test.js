import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { PAIRS } from '../_shared/time-measure.js';
import { KIND_LABELS, buildRound, measureOptions } from './engine.js';

/** @param {string} text a number written the book's way: '1 200', '1,5' */
const num = (text) => Number(text.replace(/\u202f/g, '').replace(',', '.'));

/** @param {string} text */
const numbers = (text) =>
  [...text.matchAll(/\d+(?:\u202f\d{3})*(?:,\d+)?/gu)].map((m) => num(m[0]));

/**
 * A time measure in its small unit: giây when the text has giây, else phút.
 * @param {string} text '3 giờ 15 phút', '4 phút 5 giây'
 * @param {boolean} [seconds] whether the small unit is giây
 */
function total(text, seconds = text.includes('giây')) {
  const weight = seconds ? { phút: 60, giây: 1, giờ: 3600 } : { giờ: 60, phút: 1, giây: 0 };
  let sum = 0;
  for (const m of text.matchAll(/(\d+) (giờ|phút|giây)/gu)) {
    sum += Number(m[1]) * weight[/** @type {'giờ' | 'phút' | 'giây'} */ (m[2])];
  }
  return sum;
}

/**
 * The right answer worked out again from the prompt alone, and the value of
 * the marked option, in the same unit.
 * @param {import('./engine.js').Question} q
 * @returns {[number, number]}
 */
function check(q) {
  const chosen = optionText(q.options[q.answer]);
  const n = numbers(q.prompt);
  switch (q.kind) {
    case 'doi-don-vi': {
      const left = q.prompt.split('=')[0];
      return [left.includes(',') ? n[0] * 60 : total(left), num(chosen.split(' ')[0])];
    }
    case 'cong-tru':
    case 'nhan-chia': {
      const [left, right] = q.prompt.replace(' = ?', '').split(/ [+−×:] /u);
      const op = q.prompt.match(/ ([+−×:]) /u)?.[1];
      const seconds = q.prompt.includes('giây') || chosen.includes('giây');
      const a = total(left, seconds);
      const b = op === '+' || op === '−' ? total(right, seconds) : Number(right);
      const value = { '+': a + b, '−': a - b, '×': a * b, ':': a / b }[op ?? '+'];
      return [value ?? NaN, total(chosen, seconds)];
    }
    case 'van-toc':
      return [n[0] / n[1], num(chosen.split(' ')[0])];
    case 'doi-van-toc':
      return [
        q.prompt.includes('m/giây') ? n[0] / 3.6 : (n[0] * 1000) / 60,
        num(chosen.split(' ')[0]),
      ];
    case 'quang-duong':
      return [(n[0] * n[1]) / 60, num(chosen.split(' ')[0])];
    case 'thoi-gian':
      return [(n[0] / n[1]) * 60, total(chosen)];
    case 'gio-den': {
      const start = total(q.prompt.match(/lúc (.*?), đi/u)?.[1] ?? '');
      const [s, v] = numbers(q.prompt.split('quãng đường')[1]);
      return [start + (s / v) * 60, total(chosen)];
    }
    default:
      return [NaN, NaN];
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
    expect(bad.map((q) => `${q.prompt} ${q.options.join(' | ')}`)).toEqual([]);
  });

  it('marks the right answer', () => {
    const bad = rounds
      .flat()
      .filter((q) => {
        const [want, got] = check(q);
        return !(Math.abs(want - got) < 1e-9);
      })
      .map((q) => `${q.prompt} → ${optionText(q.options[q.answer])}`);
    expect(bad).toEqual([]);
  });

  it('never offers a badly written measure or one worth the same as the answer', () => {
    const bad = rounds
      .flat()
      .filter((q) => ['cong-tru', 'nhan-chia', 'thoi-gian', 'gio-den'].includes(q.kind ?? ''))
      .filter((q) => {
        const texts = q.options.map(optionText);
        const seconds = [q.prompt, ...texts].some((t) => t.includes('giây'));
        const values = texts.map((t) => total(t, seconds));
        const tooBig = texts.some((t) =>
          [...t.matchAll(/(\d+) (phút|giây)/gu)].some((m) => {
            const isSmall = seconds ? m[2] === 'giây' : m[2] === 'phút';
            return isSmall && Number(m[1]) >= 60;
          }),
        );
        return tooBig || new Set(values).size !== values.length;
      })
      .map((q) => q.options.join(' | '));
    expect(bad).toEqual([]);
  });

  it('ends the solution with the answer', () => {
    const bad = rounds
      .flat()
      .filter((q) => !q.solution.includes(optionText(q.options[q.answer]).split(' ')[0]))
      .map((q) => q.solution);
    expect(bad).toEqual([]);
  });

  it('orders measure options from the shortest time', () => {
    const { options, answer } = measureOptions(
      { big: 2, small: 15 },
      [{ big: 2, small: 25 }],
      PAIRS.gioPhut,
    );
    expect(options).toEqual(['2 giờ 5 phút', '2 giờ 15 phút', '2 giờ 25 phút', '3 giờ 15 phút']);
    expect(answer).toBe(1);
  });

  it('builds the same first round every time', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
  });
});

describe('the mover picture', () => {
  it('draws the mover the question names', () => {
    const kinds = { 'Ô tô': 'car', 'Xe máy': 'motorbike', 'Người đi xe đạp': 'bicycle' };
    const visuals = rounds.flat().flatMap((q) => (q.visual ? [q.visual] : []));
    expect(visuals.length).toBeGreaterThan(0);
    for (const v of visuals)
      expect(v.kind).toBe(kinds[/** @type {keyof typeof kinds} */ (v.mover)]);
  });
});
