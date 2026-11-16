import { describe, expect, it } from 'vitest';
import { CANDIDATES, POINTS, TASKS, answerText, judge, liesOn, reasonOn } from './engine.js';

describe('the pyramid of the giao tuyến widget', () => {
  it('has its constructed points inside the frame', () => {
    const far = Object.entries(POINTS).filter(([, p]) => Math.hypot(p.x, p.y, p.z) > 6.5);
    expect(far).toEqual([]);
    expect(POINTS.E.z).toBeCloseTo(0);
    expect(POINTS.F.z).toBeCloseTo(0);
  });

  it('gives a reason exactly when the point lies on the plane', () => {
    const planes = [...new Set(TASKS.flatMap((t) => t.planes))];
    const wrong = [];
    for (const plane of planes) {
      for (const p of CANDIDATES) {
        if ((reasonOn(p, plane) !== null) !== liesOn(p, plane)) wrong.push(`${p} ${plane}`);
      }
    }
    expect(wrong).toEqual([]);
  });

  it('finds the common line of each task through two common points', () => {
    const wrong = [];
    for (const task of TASKS) {
      const common = CANDIDATES.filter((p) => judge(p, task.planes).common);
      const [a, b] = [...task.line];
      if (!common.includes(a) || !common.includes(b)) wrong.push(task.line);
    }
    expect(wrong).toEqual([]);
    expect(answerText(TASKS[1])).toBe('$(SAC) \\cap (SBD) = SO$');
    expect(judge('A', ['SAC', 'SBD']).common).toBe(false);
    expect(judge('O', ['SAC', 'SBD']).text).toContain('O \\in AC');
  });
});
