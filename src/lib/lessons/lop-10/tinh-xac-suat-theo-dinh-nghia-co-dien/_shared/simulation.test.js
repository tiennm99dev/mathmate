import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { strictTexFailures } from '#lib/core/tex-check.js';
import { choose, drawIndices, factorial, probabilityTex } from './counting.js';
import {
  MAX_TRIALS,
  drawBalls,
  emptyRun,
  playTrials,
  probabilityDecimal,
  probabilityTexValue,
  runText,
} from './simulation.js';

/** @type {import('./simulation.js').TrialProblem} */
const coin = {
  id: 'xu',
  title: 'Mặt ngửa',
  prompt: '',
  favourable: 1,
  total: 2,
  method: '',
  trial: (rand) => ({ hit: rand() < 0.5, text: '' }),
};

describe('counting', () => {
  it('counts factorials and combinations', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(5)).toBe(120);
    expect(choose(9, 2)).toBe(36);
    expect(choose(12, 3)).toBe(220);
    expect(choose(45, 6)).toBe(8145060);
    expect(choose(5, 7)).toBe(0);
  });

  it('draws different indices', () => {
    const r = rng(1);
    const bad = [];
    for (let t = 0; t < 200; t++) {
      const d = drawIndices(r, 10, 4);
      if (new Set(d).size !== 4 || d.some((i) => i < 0 || i > 9)) bad.push(d);
    }
    expect(bad).toEqual([]);
    expect(drawBalls(rng(2), [['đỏ', 2]], 2)).toEqual(['đỏ', 'đỏ']);
  });

  it('writes P(E) in lowest terms', () => {
    expect(probabilityTex(6, 36)).toBe('P(E) = \\dfrac{6}{36} = \\dfrac{1}{6}');
    expect(probabilityTex(0, 36, 'B')).toBe('P(B) = \\dfrac{0}{36} = 0');
    expect(probabilityTex(36, 36)).toBe('P(E) = \\dfrac{36}{36} = 1');
  });
});

describe('simulated trials', () => {
  it('keeps count and a light trace', () => {
    const run = playTrials(coin, emptyRun(), 1000, rng(4));
    expect(run.trials).toBe(1000);
    expect(run.trace).toHaveLength(109);
    expect(run.trace.at(-1)).toEqual([1000, run.hits / 1000]);
    expect(playTrials(coin, run, MAX_TRIALS, rng(5)).trials).toBe(MAX_TRIALS);
  });

  it('writes probabilities the Vietnamese way', () => {
    expect(probabilityDecimal(0.5)).toBe('0,5');
    expect(probabilityDecimal(41 / 55)).toBe('0,7455');
    expect(probabilityDecimal(1 / 8145060)).toBe('0,000000123');
    expect(probabilityTexValue(0.5)).toBe('= 0{,}5');
    expect(probabilityTexValue(1 / 3)).toBe('\\approx 0{,}3333');
  });

  it('describes the run', () => {
    expect(runText(coin, emptyRun())).toContain('Thử 1 lần');
    const many = playTrials(coin, emptyRun(), 10000, rng(9));
    expect(runText(coin, many)).toContain('Sau 10');
    const rare = { ...coin, favourable: 1, total: 8145060 };
    expect(runText(rare, many)).toContain('nguyên lí xác suất bé');
    expect(strictTexFailures([runText(coin, many), runText(rare, emptyRun())])).toEqual([]);
  });
});
