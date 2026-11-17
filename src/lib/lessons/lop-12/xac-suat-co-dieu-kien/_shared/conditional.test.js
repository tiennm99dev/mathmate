import { describe, it, expect } from 'vitest';
import { bayes, bayesNot, leafProbs, probTex, probText, totalProb } from './conditional.js';

describe('the two-level tree', () => {
  const t = { pA: 0.4, pBA: 0.3, pBnA: 0.4 };

  it('multiplies along each branch and adds up to one', () => {
    const l = leafProbs(t);
    expect(l).toEqual({ AB: 0.12, AnB: 0.28, nAB: 0.24, nAnB: 0.36 });
    expect(l.AB + l.AnB + l.nAB + l.nAnB).toBeCloseTo(1, 12);
  });

  it('gives the total probability and both Bayes quotients', () => {
    expect(totalProb(t)).toBe(0.36);
    expect(bayes(t)).toBeCloseTo(1 / 3, 12);
    expect(bayesNot(t)).toBeCloseTo(0.28 / 0.64, 12);
    expect(bayes({ pA: 0.5, pBA: 0, pBnA: 0 })).toBeNull();
    expect(bayesNot({ pA: 0.5, pBA: 1, pBnA: 1 })).toBeNull();
  });
});

describe('writing a probability', () => {
  it('uses a decimal when short and a fraction otherwise', () => {
    expect(probText(0.36)).toBe('0,36');
    expect(probText(12 / 19)).toBe('12/19');
    expect(probTex(0.0095)).toBe('0{,}0095');
    expect(probTex(12 / 19)).toBe('\\dfrac{12}{19}');
    expect(probTex(1)).toBe('1');
  });
});
