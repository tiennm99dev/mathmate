import { describe, it, expect } from 'vitest';
import { EQUATIONS, checkMarks, solutionPoints } from './engine.js';

/** @type {Record<string, number[]>} */
const EXPECTED = {
  'sin-half': [30, 150],
  'cos-root2': [135, 225],
  'tan-root3': [60, 240],
  'cot-minus1': [135, 315],
  'sin-minus1': [270],
  'cos2x-half': [30, 150, 210, 330],
  'sin2x-zero': [0, 90, 180, 270],
  'tan3x-one': [15, 75, 135, 195, 255, 315],
};

describe('marking solutions on the circle', () => {
  it('finds the points of every equation', () => {
    const got = Object.fromEntries(EQUATIONS.map((e) => [e.id, solutionPoints(e)]));
    expect(got).toEqual(EXPECTED);
  });

  it('reports missing and extra marks', () => {
    const eq = EQUATIONS[0];
    expect(checkMarks(eq, [150, 30]).ok).toBe(true);
    const r = checkMarks(eq, [30, 210]);
    expect(r.ok).toBe(false);
    expect(r.missing).toEqual([150]);
    expect(r.extra).toEqual([210]);
  });
});
