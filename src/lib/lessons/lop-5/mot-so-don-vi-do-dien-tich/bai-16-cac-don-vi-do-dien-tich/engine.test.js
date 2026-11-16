import { describe, expect, it } from 'vitest';
import { TASKS, noteAt, startCol, stepLines, unitAt, valueAt } from './engine.js';
import { unitIndex } from '../_shared/area-units.js';

/** @param {string} s */
const g = (s) => s.replace(/(\d) (?=\d{3})/g, '$1 ');

describe('area unit table', () => {
  it('writes each task in the unit asked for', () => {
    const got = TASKS.map((t) => `${valueAt(t, unitIndex(t.to))} ${unitAt(t, unitIndex(t.to))}`);
    expect(got).toEqual(
      [
        '500 ha',
        '1 200 dm²',
        '9 dm²',
        '6 km²',
        '700 mm²',
        '25 m²',
        '30 000 m²',
        '0,3 m²',
        '1 000 000 m²',
        '0,0054 ha',
      ].map(g),
    );
  });

  it('explains each column it crosses', () => {
    expect(stepLines(TASKS[6], unitIndex('m²'))).toEqual(
      ['3 ha × 100 = 300 dam²', '300 dam² × 100 = 30 000 m²'].map(g),
    );
    expect(stepLines(TASKS[3], unitIndex('km²'))).toEqual(['600 ha : 100 = 6 km²']);
    expect(stepLines(TASKS[0], startCol(TASKS[0]))).toEqual([]);
  });

  it('says where the asked column is', () => {
    expect(noteAt(TASKS[2], unitIndex('mm²'))).toEqual({
      tone: 'info',
      text: g('900 cm² = 90 000 mm². Cột dm² còn ở bên trái.'),
    });
    expect(noteAt(TASKS[2], unitIndex('dm²')).tone).toBe('ok');
  });
});
