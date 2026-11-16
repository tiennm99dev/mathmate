import { describe, expect, it } from 'vitest';
import { fromMixed, toMixed } from '#lib/fraction-engine/index.js';
import {
  CIRCLES,
  TASKS,
  circleNote,
  fractionWords,
  mixedWords,
  nudge,
  partsOf,
  shadedText,
  tapAt,
  toFractionText,
} from './engine.js';

describe('mixed numbers on circles', () => {
  it('asks only real mixed numbers that fit on the circles', () => {
    const bad = [];
    for (const t of TASKS) {
      if (t.n <= 0 || t.n >= t.d || t.whole < 1) bad.push(t);
      if (partsOf(t) > CIRCLES * t.d) bad.push(t);
      const f = fromMixed(t.whole, t.n, t.d);
      if (f.n !== partsOf(t) || f.d !== t.d) bad.push(t);
      const back = toMixed(f);
      if (back.whole !== t.whole || back.n * t.d !== t.n * back.d) bad.push(t);
    }
    expect(bad).toEqual([]);
  });

  it('reads mixed numbers the book way', () => {
    expect(fractionWords(3, 4)).toBe('ba phần tư');
    expect(fractionWords(7, 10)).toBe('bảy phần mười');
    expect(mixedWords(2, 3, 4)).toBe('hai và ba phần tư');
    expect(mixedWords(1, 5, 8)).toBe('một và năm phần tám');
  });

  it('writes the shading as parts and as a mixed number', () => {
    expect(shadedText(0, 4)).toBe('Em chưa tô phần nào.');
    expect(shadedText(3, 4)).toContain('chưa đủ một hình tròn');
    expect(shadedText(8, 4)).toContain('đúng 2 hình tròn');
    expect(shadedText(11, 4)).toContain('bằng $2\\,\\dfrac{3}{4}$ hình tròn (phần nguyên 2');
    expect(toFractionText(2, 3, 4)).toBe(
      '$2\\,\\dfrac{3}{4}$ = $\\dfrac{2 \\times 4 + 3}{4}$ = $\\dfrac{11}{4}$',
    );
    expect(circleNote(11, TASKS[0]).tone).toBe('ok');
    expect(circleNote(10, TASKS[0]).text).toContain('Em tô thêm.');
    expect(circleNote(12, TASKS[0]).text).toContain('bớt đi');
  });

  it('taps and steps within the circles', () => {
    expect(tapAt(0, 1, 2, 4)).toBe(7);
    expect(tapAt(7, 1, 2, 4)).toBe(6);
    expect(nudge(15, 4, 4)).toBe(16);
    expect(nudge(2, -4, 4)).toBe(0);
  });
});
