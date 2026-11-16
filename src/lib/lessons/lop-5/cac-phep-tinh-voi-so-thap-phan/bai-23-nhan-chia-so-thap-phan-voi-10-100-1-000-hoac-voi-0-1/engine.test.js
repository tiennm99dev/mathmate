import { describe, expect, it } from 'vitest';
import { readStrip, shiftComma, shiftOf, stripOf } from '../_shared/decimal-ops.js';
import { NUMBERS, PAD, QUIZ, checkComma, resultNote, target } from './engine.js';

describe('moving the comma', () => {
  it('gives the book results', () => {
    expect(resultNote('5,73', '×', '10')).toBe(
      'Nhân với 10: chuyển dấu phẩy sang bên phải một chữ số. 5,73 × 10 = 57,3.',
    );
    expect(resultNote('4,3', '×', '0,01')).toContain('= 0,043.');
    expect(resultNote('6,3', ':', '0,01')).toContain('= 630.');
    expect(resultNote('31,4', ':', '100')).toContain('= 0,314.');
  });

  it('keeps every quiz target on the strip and reads it back', () => {
    const bad = QUIZ.filter(([text, op, factor]) => {
      const { digits } = stripOf(text, PAD);
      const t = target(text, op, factor);
      return (
        t < 1 || t > digits.length || readStrip(digits, t) !== shiftComma(text, shiftOf(op, factor))
      );
    });
    expect(bad).toEqual([]);
    expect(NUMBERS.every((n) => n.replace(',', '').length <= 3)).toBe(true);
  });

  it('explains a wrong comma', () => {
    const start = stripOf('5,73', PAD).comma;
    expect(checkComma('5,73', '×', '10', start + 1).ok).toBe(true);
    expect(checkComma('5,73', '×', '10', start - 1).text).toContain('sai chiều');
    expect(checkComma('5,73', '×', '10', start + 2).text).toContain('sai số chữ số');
    expect(checkComma('5,73', '×', '10', start).text).toContain('chưa dời');
  });
});
