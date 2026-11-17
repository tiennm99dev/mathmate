import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { strictTexFailures } from '#lib/core/tex-check.js';
import { emptyRun, playTrials } from '../_shared/simulation.js';
import { REVIEW_PROBLEMS } from './engine.js';

describe('review problems checked by simulation', () => {
  it('counts the probabilities', () => {
    expect(REVIEW_PROBLEMS.map((p) => [p.id, p.favourable, p.total])).toEqual([
      ['tong-8', 5, 36],
      ['tong-chan', 16, 36],
      ['nam-nu', 70, 84],
      ['canh-nhau', 12, 24],
      ['bon-dong-xu', 6, 16],
    ]);
  });

  it('simulates frequencies close to them', () => {
    const far = REVIEW_PROBLEMS.filter((p) => {
      const run = playTrials(p, emptyRun(), 20000, rng(11));
      return Math.abs(run.hits / run.trials - p.favourable / p.total) > 0.015;
    });
    expect(far.map((p) => p.id)).toEqual([]);
  });

  it('writes valid TeX', () => {
    expect(strictTexFailures(REVIEW_PROBLEMS.flatMap((p) => [p.prompt, p.method]))).toEqual([]);
  });
});
