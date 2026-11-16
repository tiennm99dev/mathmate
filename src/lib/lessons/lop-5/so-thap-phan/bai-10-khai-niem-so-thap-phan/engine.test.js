import { describe, expect, it } from 'vitest';
import { TARGETS, checkTap, choicesOf, digitsOf, levelsOf, marksOf } from './engine.js';

describe('zooming ruler', () => {
  it('blows up the right gap at each level', () => {
    expect(marksOf('1,46', 0)).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    expect(marksOf('1,46', 1)[0]).toBe('1,0');
    expect(marksOf('1,46', 1)[10]).toBe('2,0');
    expect(marksOf('1,46', 2)[0]).toBe('1,40');
    expect(marksOf('1,46', 2)[6]).toBe('1,46');
    expect(marksOf('1,46', 2)[10]).toBe('1,50');
  });

  it('finds every target, one digit per level', () => {
    const bad = [];
    for (const t of TARGETS) {
      const digits = digitsOf(t);
      for (let level = 0; level < levelsOf(t); level++) {
        const choices = choicesOf(t, level);
        const right = choices.filter((c) => checkTap(t, level, c.digit).ok);
        if (right.length !== 1 || right[0].digit !== digits[level]) bad.push(`${t}@${level}`);
      }
      const last = levelsOf(t) - 1;
      const mark = choicesOf(t, last).find((c) => c.digit === digits[last]);
      if (mark?.label !== t) bad.push(`${t} mark ${mark?.label}`);
    }
    expect(bad).toEqual([]);
  });

  it('says the parts once found', () => {
    expect(checkTap('3,08', 2, 8).text).toContain('Đọc là: ba phẩy không tám.');
    expect(checkTap('3,08', 0, 4)).toEqual({
      ok: false,
      text: 'Chưa đúng. Đó là khoảng từ 4 đến 5. Em nhìn các chữ số đứng trước dấu phẩy.',
    });
  });
});
