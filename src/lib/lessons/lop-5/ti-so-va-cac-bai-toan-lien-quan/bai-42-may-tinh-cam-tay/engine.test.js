import { describe, expect, it } from 'vitest';
import { run } from '../_shared/calc.js';
import { TASKS, guide, keysText, nextText, resultText } from './engine.js';

describe('guided calculator tour', () => {
  it('ends every task on the stated result', () => {
    const bad = TASKS.filter((t) => Number(run(t.keys).entry) !== t.value).map((t) => t.title);
    expect(bad).toEqual([]);
    expect(resultText(TASKS[1])).toBe('8,5');
    expect(keysText(TASKS[4])).toBe('ON/C 3 5 × 8 %');
  });

  it('takes only the next key and finishes on the last one', () => {
    const t = TASKS[4];
    expect(nextText(t, 0)).toBe('Tìm 8% của 35. Bấm phím ON/C (bật máy, xoá hết).');
    expect(guide(t, 0, '3')).toMatchObject({ take: false, done: 0, finished: false });
    expect(guide(t, 0, 'ON/C')).toMatchObject({ take: true, done: 1, finished: false });
    const last = guide(t, t.keys.length - 1, '%');
    expect(last).toMatchObject({ take: true, done: t.keys.length, finished: true, text: t.after });
  });
});
