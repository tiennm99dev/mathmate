import { describe, it, expect } from 'vitest';
import { circleHits, mRange, solutionChips, solutionText } from './engine.js';

describe('line y = m widget', () => {
  it('lets sin and cos go past ±1 so there can be no solution', () => {
    expect(mRange('sin').max).toBeGreaterThan(1);
    expect(circleHits('sin', 1.2)).toEqual([]);
    expect(solutionChips('cos', -1.3)).toEqual([]);
  });

  it('finds two points on the circle for sin x = 1/2', () => {
    expect(circleHits('sin', 0.5).map((h) => [h.x, h.family])).toEqual([
      [30, 0],
      [150, 1],
    ]);
    expect(circleHits('sin', 1).map((h) => h.x)).toEqual([90]);
    expect(circleHits('tan', 1).map((h) => h.x)).toEqual([45, 225]);
    expect(circleHits('cos', 0.5).map((h) => h.x)).toEqual([60, 300]);
  });

  it('lists the solutions on [−2π; 2π]', () => {
    expect(solutionChips('sin', 0.5).map((c) => c.text)).toEqual([
      '−11π/6',
      '−7π/6',
      'π/6',
      '5π/6',
    ]);
    expect(solutionChips('cos', 1).map((c) => c.text)).toEqual(['−2π', '0', '2π']);
    expect(solutionText(19.47)).toBe('≈ 0,34');
  });
});
