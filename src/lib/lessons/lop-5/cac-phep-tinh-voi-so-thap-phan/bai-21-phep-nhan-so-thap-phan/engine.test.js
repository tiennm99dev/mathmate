import { describe, expect, it } from 'vitest';
import { productPlan } from '../_shared/decimal-ops.js';
import { AREA_QUIZ, COMMA_TASKS, areaNote, areaOptions, checkComma, commaTask } from './engine.js';

describe('area model', () => {
  it('counts hundredths', () => {
    expect(areaNote(3, 7)).toContain('Vậy 0,3 × 0,7 = 0,21.');
    expect(areaNote(10, 6)).toContain('Vậy 1 × 0,6 = 0,6.');
  });

  it('offers distinct answers with the right one first', () => {
    const bad = AREA_QUIZ.filter(([c, r]) => new Set(areaOptions(c, r)).size !== 3);
    expect(bad).toEqual([]);
    expect(areaOptions(4, 6)).toEqual(['0,24', '2,4', '24']);
  });
});

describe('comma board', () => {
  it('finds the gap of the comma', () => {
    expect(commaTask('2,5', '1,3')).toMatchObject({ digits: '325', gap: 1 });
    expect(checkComma('2,5', '1,3', 1).ok).toBe(true);
    expect(checkComma('2,5', '1,3', 2).ok).toBe(false);
  });

  it('only asks products whose comma has digits on both sides and no zero at the end', () => {
    const bad = COMMA_TASKS.filter(([a, b]) => {
      const t = commaTask(a, b);
      return t.gap < 1 || t.gap >= t.digits.length || t.full !== productPlan(a, b).product;
    });
    expect(bad).toEqual([]);
  });
});
