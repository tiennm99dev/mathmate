import { describe, expect, it } from 'vitest';
import { run, screenValue } from '../_shared/calc.js';
import { CHALLENGES, handInText, isRight } from './engine.js';

describe('shopping challenge', () => {
  it('reaches every answer with its hint keys on the calculator', () => {
    const bad = [];
    for (const c of CHALLENGES) {
      for (const step of c.steps) {
        const shown = screenValue(run(step.keys));
        if (!isRight(step, shown)) bad.push([c.title, step.ask, shown]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('checks the bracelet answers of the book', () => {
    const values = CHALLENGES.flatMap((c) => c.steps.map((s) => s.value));
    expect(values).toEqual([
      175000, 450000, 90000, 360000, 40000, 3535000, 707000, 4242000, 78000, 572000,
    ]);
    expect(25000 * 7).toBe(175000);
    expect(3000000 / (100 - 7 - 18)).toBe(40000);
    expect((650000 * 12) / 100).toBe(78000);
  });

  it('answers a hand-in', () => {
    const step = CHALLENGES[0].steps[0];
    expect(handInText(step, null, 0)).toContain('ON/C');
    expect(handInText(step, 175000, 0).replace(/\u202f/g, ' ')).toBe(
      'Đúng rồi! Đáp số: 175 000 đồng.',
    );
    expect(handInText(step, 17500, 1)).toBe('Chưa đúng. Em thử bấm: 25000 × 7 =');
  });
});
