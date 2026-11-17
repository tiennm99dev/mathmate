import { describe, expect, it } from 'vitest';
import {
  TASKS,
  cellsAt,
  isTaught,
  noteAt,
  slideFrom,
  startCol,
  unitsOf,
  valueIn,
} from './engine.js';

describe('sliding comma', () => {
  it('writes each task in the unit asked for', () => {
    const got = TASKS.map((t) => `${valueIn(t, unitsOf(t).indexOf(t.target))} ${t.target}`);
    expect(got).toEqual([
      '3,05 m',
      '6,4 m',
      '5,08 m',
      '15,9 cm',
      '2,075 km',
      '0,7 cm',
      '5,95 kg',
      '3,2 tấn',
      '0,45 kg',
      '2,5 tạ',
      '6,195 kg',
    ]);
  });

  it('fills the table with zeros up to the comma', () => {
    const t = TASKS[0];
    expect(startCol(t)).toBe(5);
    expect(cellsAt(t, 5)).toEqual(['', '', '', '3', '0', '5', '']);
    expect(cellsAt(t, 3)).toEqual(['', '', '', '3', '0', '5', '']);
    expect(cellsAt(t, 6)).toEqual(['', '', '', '3', '0', '5', '0']);
    expect(cellsAt(TASKS[8], 3)).toEqual(['', '', '', '0', '4', '5', '0']);
    expect(valueIn(t, 6)).toBe('3\u202f050');
    expect(valueIn(TASKS[8], 2)).toBe('0,045');
  });

  it('says which way to slide', () => {
    expect(noteAt(TASKS[0], 5)).toEqual({
      ok: false,
      text: '3 m 5 cm = 305 cm. Em cần viết theo m: dời dấu phẩy sang trái.',
    });
    expect(noteAt(TASKS[0], 3).ok).toBe(true);
  });
});

describe('untaught units', () => {
  it('steps the comma over hm, dam, hg and dag', () => {
    const length = TASKS[0];
    expect(slideFrom(length, 3, -1)).toBe(0);
    expect(slideFrom(length, 0, 1)).toBe(3);
    expect(slideFrom(length, 0, -1)).toBe(0);
    const mass = TASKS[6];
    expect(slideFrom(mass, 3, 1)).toBe(6);
    expect(slideFrom(mass, 6, -1)).toBe(3);
    expect(slideFrom(mass, 6, 1)).toBe(6);
  });

  it('never rests on or writes an untaught unit', () => {
    for (const t of TASKS) {
      const seen = new Set([startCol(t)]);
      for (let k = 0; k < 20; k++) {
        for (const c of [...seen]) {
          seen.add(slideFrom(t, c, -1));
          seen.add(slideFrom(t, c, 1));
        }
      }
      for (const c of seen) {
        expect(isTaught(t, c)).toBe(true);
        expect(noteAt(t, c).text).not.toMatch(/\b(hm|dam|hg|dag)\b/);
      }
      expect(isTaught(t, unitsOf(t).indexOf(t.target))).toBe(true);
    }
  });
});
