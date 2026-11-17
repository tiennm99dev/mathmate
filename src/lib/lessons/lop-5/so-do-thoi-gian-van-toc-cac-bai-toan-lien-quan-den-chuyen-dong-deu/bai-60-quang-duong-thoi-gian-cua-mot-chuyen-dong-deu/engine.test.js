import { describe, expect, it } from 'vitest';
import { formatNumber } from '#lib/core/number-format.js';
import { FORMULAS, TASKS, answerText, coverSlip, solve, workText } from './engine.js';

describe('the formula triangle', () => {
  it('solves for each quantity', () => {
    expect(solve('s', { v: 42.5, t: 4 })).toBe(170);
    expect(solve('v', { s: 105, t: 2.5 })).toBe(42);
    expect(solve('t', { s: 42, v: 36 })).toBeCloseTo(7 / 6);
    expect(FORMULAS.t).toBe('t = s : v');
  });

  it('stores answers that match the computed value', () => {
    const bad = TASKS.filter((t) => {
      const right = `${formatNumber(solve(t.unknown, t.known))} ${t.units[t.unknown]}`;
      const distinct = new Set(t.options).size === t.options.length;
      return t.options[t.answer] !== right || t.result !== right || !distinct;
    }).map((t) => t.story);
    expect(bad).toEqual([]);
  });

  it('gives each task exactly the two other quantities', () => {
    const bad = TASKS.filter((t) => t.unknown in t.known || Object.keys(t.known).length !== 2).map(
      (t) => t.story,
    );
    expect(bad).toEqual([]);
  });

  it('writes the working and the slips', () => {
    expect(workText(TASKS[0])).toBe('s = v × t = 42,5 × 4');
    expect(workText(TASKS[1])).toBe('t = s : v = 10 : 5');
    expect(workText(TASKS[2])).toBe('v = s : t = 24 : 2');
    expect(answerText(TASKS[4])).toBe('thời gian 2,5 giờ');
    expect(coverSlip('v')).toBe(
      'Đề bài đã cho biết vận tốc. Em che đại lượng cần tìm: đề bài hỏi gì?',
    );
  });
});
