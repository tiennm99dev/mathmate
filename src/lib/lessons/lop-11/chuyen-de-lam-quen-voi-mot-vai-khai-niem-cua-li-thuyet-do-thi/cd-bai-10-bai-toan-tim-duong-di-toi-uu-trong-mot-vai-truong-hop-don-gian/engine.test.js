import { describe, expect, it } from 'vitest';
import { badgeText, routeText, runFrom, stateAt, stepNote, tableRows } from './engine.js';

describe('labelling algorithm on the city map', () => {
  const steps = runFrom(0);

  it('fixes the labels in order and lowers temporary labels', () => {
    expect(steps.map((s) => s.fixed)).toEqual([0, 2, 1, 3, 4, 5]);
    expect(stateAt(steps, 0, 6, 0).label).toEqual([
      0,
      Infinity,
      Infinity,
      Infinity,
      Infinity,
      Infinity,
    ]);
    expect(badgeText(steps[1], 1)).toBe('3');
    expect(badgeText(steps[1], 2)).toBe('l = 2');
    expect(badgeText(steps[0], 3)).toBe('∞');
  });

  it('explains each step', () => {
    expect(stepNote(steps, 0, 6, 0)).toContain('nhãn tạm thời $0$');
    const two = stepNote(steps, 2, 6, 0);
    expect(two).toContain('$l(C) = 2$');
    expect(two).toContain('B: $4 \\to 2 + 1 = 3$');
    expect(two).toContain('D: $\\infty \\to 2 + 8 = 10$');
    expect(stepNote(steps, 6, 6, 0)).toContain('thuật toán dừng');
  });

  it('builds the table of labels', () => {
    const rows = tableRows(steps, 2, 6, 0);
    expect(rows).toHaveLength(3);
    expect(rows[2].cells.map((c) => c.text)).toEqual([
      '',
      '3 (C)',
      '2 (A)',
      '10 (C)',
      '12 (C)',
      '∞',
    ]);
    expect(rows[2].cells[2].fixed).toBe(true);
  });

  it('reads the shortest path back', () => {
    const end = steps[steps.length - 1];
    const r = routeText(end, 0, 5);
    expect(r?.text).toContain('$ACBDEF$');
    expect(r?.text).toContain('$2 + 1 + 5 + 2 + 3 = 13$');
    expect(routeText(steps[0], 0, 5)).toBeNull();
  });
});
