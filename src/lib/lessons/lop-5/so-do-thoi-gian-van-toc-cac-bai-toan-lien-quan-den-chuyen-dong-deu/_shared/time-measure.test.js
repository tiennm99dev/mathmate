import { describe, expect, it } from 'vitest';
import {
  PAIRS,
  addWorking,
  divWorking,
  inSmall,
  measureText,
  mulWorking,
  normalize,
  numberChoices,
  subWorking,
  workingText,
} from './time-measure.js';

const { gioPhut, phutGiay, namThang } = PAIRS;

/**
 * The options a child must tap, step by step.
 * @param {import('./time-measure.js').Working} w
 */
const path = (w) => w.steps.map((s) => s.options[s.answer]);

/**
 * Steps whose right option is missing or listed twice.
 * @param {import('./time-measure.js').Working} w
 */
const broken = (w) =>
  w.steps.filter(
    (s) =>
      s.answer < 0 ||
      s.answer >= s.options.length ||
      new Set(s.options).size !== s.options.length ||
      s.options.length < 2,
  );

describe('time measures', () => {
  it('writes and normalises measures', () => {
    expect(measureText({ big: 3, small: 15 }, gioPhut)).toBe('3 giờ 15 phút');
    expect(measureText({ big: 0, small: 35 }, phutGiay)).toBe('35 giây');
    expect(measureText({ big: 4, small: 0 }, gioPhut)).toBe('4 giờ');
    expect(normalize({ big: 5, small: 80 }, gioPhut)).toEqual({ big: 6, small: 20 });
    expect(normalize({ big: 2, small: 15 }, namThang)).toEqual({ big: 3, small: 3 });
    expect(inSmall({ big: 2, small: 15 }, gioPhut)).toBe(135);
  });

  it('lists number options in order with the right one among them', () => {
    expect(numberChoices(80, [90, 70, 20], 'phút')).toEqual({
      options: ['20 phút', '70 phút', '80 phút', '90 phút'],
      answer: 2,
    });
    expect(numberChoices(0, [-1, 1, 1, 2], 'giờ').options).toEqual(['0 giờ', '1 giờ', '2 giờ']);
  });

  it('adds and changes 60 minutes into an hour', () => {
    const w = addWorking({ big: 3, small: 45 }, { big: 2, small: 35 }, gioPhut);
    expect(path(w)).toEqual(['80 phút', '5 giờ', 'Đổi phút ra giờ']);
    expect(workingText(w)).toBe('3 giờ 45 phút + 2 giờ 35 phút = 6 giờ 20 phút');
    expect(w.steps[2].done).toBe('80 phút = 1 giờ 20 phút. Vậy 5 giờ 80 phút = 6 giờ 20 phút.');
    const plain = addWorking({ big: 3, small: 15 }, { big: 2, small: 35 }, gioPhut);
    expect(path(plain)[2]).toBe('Giữ nguyên 50 phút');
    expect(workingText(plain)).toBe('3 giờ 15 phút + 2 giờ 35 phút = 5 giờ 50 phút');
  });

  it('subtracts and borrows an hour when the minutes are too few', () => {
    const w = subWorking({ big: 3, small: 20 }, { big: 2, small: 45 }, phutGiay);
    expect(path(w)).toEqual(['Đổi 1 phút ra 60 giây rồi mới trừ', '35 giây', '0 phút']);
    expect(w.steps[0].top).toEqual({ big: 2, small: 80 });
    expect(workingText(w)).toBe('3 phút 20 giây − 2 phút 45 giây = 35 giây');
    const plain = subWorking({ big: 15, small: 55 }, { big: 13, small: 10 }, gioPhut);
    expect(path(plain)[0]).toBe('Trừ được, em trừ luôn');
    expect(workingText(plain)).toBe('15 giờ 55 phút − 13 giờ 10 phút = 2 giờ 45 phút');
  });

  it('multiplies each unit, then changes units', () => {
    const w = mulWorking({ big: 3, small: 15 }, 5, gioPhut);
    expect(path(w)).toEqual(['75 phút', '15 giờ', 'Đổi phút ra giờ']);
    expect(workingText(w)).toBe('3 giờ 15 phút × 5 = 16 giờ 15 phút');
  });

  it('divides the big unit and carries the remainder into the small one', () => {
    const w = divWorking({ big: 7, small: 40 }, 4, gioPhut);
    expect(path(w)).toEqual(['1 giờ, dư 3 giờ', '180 phút', '220 phút', '55 phút']);
    expect(workingText(w)).toBe('7 giờ 40 phút : 4 = 1 giờ 55 phút');
    const exact = divWorking({ big: 42, small: 30 }, 3, phutGiay);
    expect(path(exact)).toEqual(['14 phút, không dư', '10 giây']);
    expect(() => divWorking({ big: 1, small: 1 }, 2, gioPhut)).toThrow();
  });

  it('builds sound steps for many operations', () => {
    const bad = [];
    for (let a = 0; a < 60; a += 7) {
      for (let b = 0; b < 60; b += 11) {
        const x = { big: 9, small: a };
        const y = { big: 4, small: b };
        for (const w of [
          addWorking(x, y, gioPhut),
          subWorking(x, y, gioPhut),
          mulWorking(x, 3, gioPhut),
        ]) {
          if (broken(w).length) bad.push(workingText(w));
          if (inSmall(w.result, gioPhut) !== directValue(w)) bad.push(`value ${workingText(w)}`);
        }
      }
    }
    for (const n of [2, 3, 4, 5]) {
      const w = divWorking({ big: 7, small: 20 * (n % 3) + n * 4 }, n, gioPhut);
      if (broken(w).length) bad.push(workingText(w));
    }
    expect(bad).toEqual([]);
  });
});

/**
 * The value of an operation in minutes, worked out directly.
 * @param {import('./time-measure.js').Working} w
 */
function directValue(w) {
  const a = inSmall(w.a, w.pair);
  if (typeof w.b === 'number') return w.op === '×' ? a * w.b : a / w.b;
  const b = inSmall(w.b, w.pair);
  return w.op === '+' ? a + b : a - b;
}
