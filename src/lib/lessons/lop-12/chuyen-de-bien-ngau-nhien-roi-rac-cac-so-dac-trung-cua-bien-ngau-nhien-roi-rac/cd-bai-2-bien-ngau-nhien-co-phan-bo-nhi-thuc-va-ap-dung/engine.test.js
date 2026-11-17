import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { strictTexFailures } from '#lib/core/tex-check.js';
import { binomialPmf } from '../_shared/distribution.js';
import {
  MAX_ROWS,
  binOf,
  dropMany,
  dropPath,
  feedback,
  momentsTex,
  observedMean,
  pmfTex,
} from './engine.js';

describe('Galton board', () => {
  it('counts right turns', () => {
    expect(binOf([true, false, true, true])).toBe(3);
    expect(dropPath(5, 0, rng(1))).toEqual([false, false, false, false, false]);
    expect(binOf(dropPath(5, 1, rng(1)))).toBe(5);
  });

  it('fills the bins close to the binomial distribution', () => {
    const n = 8;
    const p = 0.3;
    const { counts, last } = dropMany(Array(n + 1).fill(0), n, p, 20000, rng(7));
    expect(last).toHaveLength(n);
    expect(counts.reduce((s, c) => s + c, 0)).toBe(20000);
    const pmf = binomialPmf(n, p);
    const far = counts.filter((c, k) => Math.abs(c / 20000 - pmf[k]) > 0.015);
    expect(far).toEqual([]);
    expect(Math.abs(/** @type {number} */ (observedMean(counts)) - n * p)).toBeLessThan(0.05);
    expect(observedMean([0, 0, 0])).toBeNull();
  });

  it('writes the formulas', () => {
    expect(pmfTex(6, 0.5, 3)).toBe(
      '\\begin{aligned} P(X = 3) &= C_{6}^{3} \\cdot 0{,}5^{3} \\cdot 0{,}5^{3} \\\\ &= 20 \\cdot 0{,}5^{3} \\cdot 0{,}5^{3} \\\\ &= 0{,}3125 \\end{aligned}',
    );
    expect(pmfTex(10, 0.25, 3)).toContain('\\approx 0{,}2503');
    expect(momentsTex(10, 0.3)).toBe(
      '\\begin{aligned} E(X) &= np = 10 \\cdot 0{,}3 = 3 \\\\ V(X) &= np(1 - p) = 2{,}1 \\end{aligned}',
    );
  });

  it('gives feedback in valid TeX', () => {
    const texts = [];
    for (let n = 1; n <= MAX_ROWS; n += 1) {
      for (const p of [0.1, 0.35, 0.5, 0.9]) {
        const z = Array(n + 1).fill(0);
        texts.push(feedback(z, n, p).text);
        texts.push(feedback(dropMany(z, n, p, 30, rng(n)).counts, n, p).text);
        texts.push(feedback(dropMany(z, n, p, 200, rng(n)).counts, n, p).text);
        for (let k = 0; k <= n; k += 1) texts.push(`$${pmfTex(n, p, k)}$`);
        texts.push(`$${momentsTex(n, p)}$`);
      }
    }
    expect(strictTexFailures(texts)).toEqual([]);
    expect(feedback(dropMany(Array(4).fill(0), 3, 0.5, 200, rng(3)).counts, 3, 0.5).tone).toBe(
      'ok',
    );
  });
});
