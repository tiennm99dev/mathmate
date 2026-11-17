import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  ITEMS,
  MAX_OFF,
  STEP_OFF,
  STORIES,
  discount,
  discountLines,
  percentValue,
  quizAt,
  shopNote,
  storyLine,
} from './engine.js';

/** Narrow spaces back to plain ones, to compare with readable strings. @param {string} t */
const plain = (t) => t.replace(/\u202f/g, ' ');

describe('a percentage of a number', () => {
  it('multiplies by a and divides by 100', () => {
    expect(percentValue(800, 52.5)).toBe(420);
    expect(percentValue(2, 24.5)).toBe(0.49);
    expect(percentValue(15000000, 0.8)).toBe(120000);
    expect(percentValue(35000000, 7.4)).toBe(2590000);
    expect(discount(250000, 15)).toEqual({ off: 37500, pay: 212500 });
    expect(discountLines(250000, 15).map(plain)).toEqual([
      'Số tiền được giảm: 250 000 × 15 : 100 = 37 500 (đồng)',
      'Giá sau khi giảm: 250 000 − 37 500 = 212 500 (đồng)',
    ]);
    expect(plain(storyLine(STORIES[0]))).toBe('800 × 52,5 : 100 = 420 học sinh');
  });

  it('keeps every discount in the shop a whole number of đồng', () => {
    const bad = [];
    for (const item of ITEMS) {
      for (let a = 0; a <= MAX_OFF; a += STEP_OFF) {
        const { off, pay } = discount(item.price, a);
        if (!Number.isInteger(off) || off + pay !== item.price) bad.push([item.name, a]);
      }
    }
    expect(bad).toEqual([]);
    expect(plain(shopNote(ITEMS[0], 15))).toBe('Giảm 15%: bớt 18 000 đồng, còn 102 000 đồng.');
  });

  it('asks every story with four distinct options and the right one among them', () => {
    const rand = rng(3);
    const bad = [];
    for (let i = 0; i < STORIES.length; i++) {
      const q = quizAt(i, rand);
      const want = (q.b * q.a) / 100;
      if (new Set(q.options).size !== 4) bad.push([i, 'options', q.options]);
      if (Math.abs(q.value - want) > 1e-9) bad.push([i, 'value']);
      if (
        !q.options[q.answer].startsWith(
          String(want)
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+$)/g, '\u202f'),
        )
      )
        bad.push([i, 'answer', q.options[q.answer]]);
    }
    expect(bad).toEqual([]);
  });
});
