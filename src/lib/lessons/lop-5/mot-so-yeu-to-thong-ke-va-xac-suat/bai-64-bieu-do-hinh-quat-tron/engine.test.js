import { describe, expect, it } from 'vitest';
import {
  SURVEYS,
  checkMessage,
  startCounts,
  stepPercent,
  targetPercents,
  totalOf,
} from './engine.js';

describe('the pie chart surveys', () => {
  it('gives whole percentages that add up to 100', () => {
    const bad = [];
    for (const s of SURVEYS) {
      const p = targetPercents(s);
      if (p.reduce((a, b) => a + b, 0) !== 100 || p.some((x) => !Number.isInteger(x)))
        bad.push(s.id);
    }
    expect(bad).toEqual([]);
    expect(targetPercents(SURVEYS[0])).toEqual([65, 10, 25]);
    expect(targetPercents(SURVEYS[1])).toEqual([40, 30, 20, 10]);
    expect(targetPercents(SURVEYS[2])).toEqual([50, 25, 15, 10]);
  });

  it('starts from an even share that is not yet the answer', () => {
    const bad = [];
    for (const s of SURVEYS) {
      const start = startCounts(s);
      if (start.reduce((a, b) => a + b, 0) !== totalOf(s)) bad.push([s.id, 'total']);
      if (checkMessage(s, start).done) bad.push([s.id, 'done']);
    }
    expect(bad).toEqual([]);
    expect(startCounts(SURVEYS[0])).toEqual([7, 7, 6]);
    expect(stepPercent(SURVEYS[0])).toBe(5);
  });

  it('checks the chart part by part', () => {
    const s = SURVEYS[0];
    const first = checkMessage(s, [7, 7, 6]);
    expect(first.done).toBe(false);
    expect(first.text).toContain('13 : 20 = 0,65 = 65%');
    expect(first.text).toContain('rộng ra');
    expect(checkMessage(s, [13, 4, 3]).text).toContain('hẹp lại');
    expect(checkMessage(s, [13, 2, 5]).done).toBe(true);
    expect(checkMessage(SURVEYS[1], [12, 9, 6, 3]).done).toBe(true);
  });
});
