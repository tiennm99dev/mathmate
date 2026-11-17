import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { FIRST, drawTask, solve, stepLines, stepOptions } from './tape.js';

describe('two numbers from a sum or difference and a ratio', () => {
  it('solves the book examples', () => {
    expect(solve('sum', FIRST.sum)).toEqual({ parts: 8, unit: 12, small: 36, big: 60 });
    expect(solve('diff', FIRST.diff)).toEqual({ parts: 2, unit: 12, small: 36, big: 60 });
    expect(stepLines('sum', FIRST.sum)).toEqual([
      'Theo sơ đồ, tổng số phần bằng nhau là: 3 + 5 = 8 (phần)',
      'Giá trị của một phần là: 96 : 8 = 12',
      'Số bé là: 12 × 3 = 36',
      'Số lớn là: 96 − 36 = 60',
    ]);
    expect(stepLines('diff', FIRST.diff)[0]).toBe(
      'Theo sơ đồ, hiệu số phần bằng nhau là: 5 − 3 = 2 (phần)',
    );
    expect(stepLines('diff', FIRST.diff)[3]).toBe('Số lớn là: 36 + 24 = 60');
  });

  it('draws whole-number tasks with four distinct options holding the answer', () => {
    const rand = rng(7);
    const bad = [];
    for (const kind of /** @type {const} */ (['sum', 'diff'])) {
      for (let t = 0; t < 200; t++) {
        const task = drawTask(rand, kind);
        const s = solve(kind, task);
        const whole = [s.unit, s.small, s.big].every(Number.isInteger);
        const ratioOk = s.small * task.n === s.big * task.m;
        const totalOk =
          kind === 'sum' ? s.small + s.big === task.given : s.big - s.small === task.given;
        if (!whole || !ratioOk || !totalOk) bad.push(`${kind} ${JSON.stringify(task)}`);
        for (let i = 0; i < 4; i++) {
          const { options, answer } = stepOptions(kind, task, i);
          const right = [s.parts, s.unit, s.small, s.big][i];
          if (
            options.length !== 4 ||
            new Set(options).size !== 4 ||
            options[answer] !== String(right)
          )
            bad.push(`${kind} ${JSON.stringify(task)} step ${i}: ${options.join('|')}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('never draws the same task twice in a row', () => {
    const rand = rng(3);
    let prev = FIRST.sum;
    for (let t = 0; t < 50; t++) {
      const next = drawTask(rand, 'sum', prev);
      expect(next).not.toEqual(prev);
      prev = next;
    }
  });
});
