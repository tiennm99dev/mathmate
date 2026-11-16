import { describe, expect, it } from 'vitest';
import { QUIZ, ROUNDINGS, checkPick, fineText, marksAround, roundNote } from './engine.js';

describe('rounding between marks', () => {
  it('finds the marks around a number', () => {
    expect(marksAround('3,47', 1)).toEqual({ low: '3,4', high: '3,5' });
    expect(marksAround('12,6', 0)).toEqual({ low: '12', high: '13' });
    expect(marksAround('1,996', 2)).toEqual({ low: '1,99', high: '2,00' });
  });

  it('accepts exactly one mark for every quiz number', () => {
    const bad = [];
    for (const { places } of ROUNDINGS) {
      for (const t of QUIZ[places]) {
        const picks = /** @type {const} */ (['low', 'high']).filter(
          (p) => checkPick(t, places, p).ok,
        );
        if (picks.length !== 1) bad.push(`${t}/${places}`);
      }
    }
    expect(bad).toEqual([]);
    expect(checkPick('2,96', 1, 'high').text).toContain('được 3,0.');
    expect(checkPick('7,5', 0, 'high').ok).toBe(true);
    expect(checkPick('0,555', 2, 'high').ok).toBe(true);
    expect(checkPick('3,4051', 2, 'high').ok).toBe(true);
  });

  it('describes the dragged number', () => {
    expect(fineText(340, 1)).toBe('3,4');
    expect(roundNote('3,4', 1)).toBe('3,4 nằm đúng mốc 3,4, làm tròn vẫn được 3,4.');
    expect(roundNote('3,45', 1)).toContain('ở chính giữa 3,4 và 3,5.');
    expect(roundNote('3,42', 1)).toContain('3,42 gần 3,4 hơn.');
  });
});
