import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { strictTexFailures } from '#lib/core/tex-check.js';
import { emptyRun, playTrials } from '../_shared/simulation.js';
import { PROBLEMS } from './engine.js';

/** @param {string} id */
const problem = (id) => PROBLEMS.find((p) => p.id === id) ?? PROBLEMS[0];

describe('practice experiments', () => {
  it('counts n(E) and n(Ω) by combinations', () => {
    const exact = PROBLEMS.map((p) => [p.id, p.favourable, p.total]);
    expect(exact).toEqual([
      ['bi-trang-den', 18, 36],
      ['ba-dong-xu', 7, 8],
      ['bi-xanh', 164, 220],
      ['xep-hang', 2, 6],
      ['hai-mat-sau', 1, 36],
      ['xo-so', 1, 8145060],
    ]);
  });

  it('simulates frequencies close to the probabilities', () => {
    const far = PROBLEMS.filter((p) => p.id !== 'xo-so').filter((p) => {
      const run = playTrials(p, emptyRun(), 20000, rng(7));
      return Math.abs(run.hits / run.trials - p.favourable / p.total) > 0.015;
    });
    expect(far.map((p) => p.id)).toEqual([]);
  });

  it('almost never wins the lottery', () => {
    const run = playTrials(problem('xo-so'), emptyRun(), 20000, rng(3));
    expect(run.hits).toBe(0);
    expect(run.last).toMatch(/^chọn được (\d+, ){5}\d+\.$/);
  });

  it('writes valid TeX', () => {
    expect(strictTexFailures(PROBLEMS.flatMap((p) => [p.prompt, p.method]))).toEqual([]);
  });
});
