import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { tidy } from '#lib/core/number-format.js';
import { STORIES, WHOLES, barNote, percentOf, percentSteps, quizAt } from './engine.js';

describe('percentage of two numbers', () => {
  it('divides, multiplies by 100 and writes %', () => {
    expect(percentOf(315, 600)).toEqual({ q: 0.525, p: 52.5 });
    expect(percentSteps(315, 600)).toEqual([
      'Tìm thương: 315 : 600 = 0,525',
      'Nhân thương với 100: 0,525 × 100 = 52,5',
      'Viết thêm kí hiệu %: 52,5%',
    ]);
    expect(percentOf(2.8, 80).p).toBe(3.5);
    expect(percentSteps(2.8, 80)[0]).toBe('Tìm thương: 2,8 : 80 = 0,035');
    expect(barNote(18, 40)).toBe('18 là 45% của 40. Cả thanh 40 là 100%.');
  });

  it('keeps every quotient on the bars short', () => {
    const bad = [];
    for (const b of WHOLES) {
      for (let a = 0; a <= b; a++) {
        const { p } = percentOf(a, b);
        if (!Number.isInteger(tidy(p * 1000))) bad.push(`${a}/${b}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('asks every story with four distinct options and the right one among them', () => {
    const rand = rng(5);
    /** @type {string[]} */
    const bad = [];
    STORIES.forEach((_, i) => {
      const q = quizAt(i, rand);
      const right = `${String(percentOf(q.a, q.b).p).replace('.', ',')}%`;
      if (new Set(q.options).size !== 4 || q.options[q.answer] !== right) bad.push(q.story);
    });
    expect(bad).toEqual([]);
  });
});
