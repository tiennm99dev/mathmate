import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { FIRST, answerOf, drawTask, problemText, stepQuestion, tableRows } from './engine.js';

describe('going back to one unit', () => {
  it('works out the first problem in two steps', () => {
    expect(problemText(FIRST)).toBe(
      'Có 3 đĩa như nhau đựng 24 quả cam. Hỏi 5 đĩa như thế có bao nhiêu quả cam?',
    );
    expect(stepQuestion(FIRST, 0).sentence).toBe('24 : 3 = 8 (quả cam)');
    expect(stepQuestion(FIRST, 1).sentence).toBe('8 × 5 = 40 (quả cam)');
    expect(tableRows(FIRST, 1)[2]).toEqual(['5', '?', '8 × 5']);
  });

  it('stores the right option at each step', () => {
    const bad = [];
    const rand = rng(2);
    for (let i = 0; i < 300; i++) {
      const task = drawTask(rand);
      const one = stepQuestion(task, 0);
      const two = stepQuestion(task, 1);
      const okOne = Number(one.options[one.answer]) === task.per && one.options.length >= 3;
      const okTwo =
        Number(two.options[two.answer]) === answerOf(task) &&
        two.options.length === 4 &&
        new Set(two.options).size === 4;
      if (!okOne || !okTwo || task.ask === task.units) bad.push(task);
    }
    expect(bad).toEqual([]);
  });
});
