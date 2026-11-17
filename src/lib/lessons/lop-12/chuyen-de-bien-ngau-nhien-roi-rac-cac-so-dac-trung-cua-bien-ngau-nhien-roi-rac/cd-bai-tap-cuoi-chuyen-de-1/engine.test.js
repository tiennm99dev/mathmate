import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { strictTexFailures } from '#lib/core/tex-check.js';
import {
  GAMES,
  expectedGain,
  expectedTex,
  fairValue,
  playRound,
  playSummary,
  verdict,
} from './engine.js';

/** @param {string} id */
const game = (id) => {
  const g = GAMES.find((x) => x.id === id);
  if (!g) throw new Error(id);
  return g;
};

describe('games of chance', () => {
  it('has probabilities adding up to 1 at every slider value', () => {
    const bad = [];
    for (const g of GAMES) {
      for (let v = g.min; v <= g.max; v += g.step) {
        const s = g.outcomes(v).reduce((a, o) => a + o.num / o.den, 0);
        if (Math.abs(s - 1) > 1e-12) bad.push(`${g.id} ${v}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('computes the expected gains and the fair rules', () => {
    expect(expectedGain(game('bau-cua').outcomes(30))).toBeCloseTo(-170 / 216, 9);
    expect(fairValue(game('bau-cua'))).toBe(200);
    expect(expectedGain(game('rut-tham').outcomes(12))).toBe(-3);
    expect(fairValue(game('rut-tham'))).toBe(9);
    expect(expectedGain(game('tong-bay').outcomes(40))).toBeCloseTo(-10 / 6, 9);
    expect(fairValue(game('tong-bay'))).toBe(50);
  });

  it('plays rounds whose mean gain settles near E(X)', () => {
    const outcomes = game('rut-tham').outcomes(9);
    const rand = rng(11);
    let sum = 0;
    for (let i = 0; i < 20000; i += 1) sum += outcomes[playRound(outcomes, rand)].gain;
    expect(Math.abs(sum / 20000)).toBeLessThan(0.5);
  });

  it('judges the game and writes valid TeX', () => {
    expect(verdict(game('rut-tham').outcomes(9)).tone).toBe('ok');
    expect(verdict(game('rut-tham').outcomes(12)).text).toContain('lỗ khoảng $3$');
    expect(verdict(game('rut-tham').outcomes(5)).tone).toBe('info');
    expect(expectedTex(game('tong-bay').outcomes(40))).toBe(
      '\\begin{aligned} E(X) &= 40 \\cdot \\dfrac{6}{36} + (-10) \\cdot \\dfrac{30}{36} \\\\ &\\approx -1{,}67 \\end{aligned}',
    );
    const texts = [];
    for (const g of GAMES) {
      texts.push(g.story);
      for (let v = g.min; v <= g.max; v += g.step) {
        const o = g.outcomes(v);
        texts.push(`$${expectedTex(o)}$`, verdict(o).text);
        texts.push(playSummary(1000, -787, expectedGain(o), o[0].label));
      }
    }
    expect(strictTexFailures(texts)).toEqual([]);
    expect(playSummary(0, 0, -3, null)).toContain('Bấm chơi');
    expect(playSummary(100, -310, -3, 'Không trúng')).toBe(
      'Ván cuối: không trúng. Sau $100$ ván, tổng tiền lời là $-310$ nghìn đồng, trung bình $-3{,}1$ nghìn đồng mỗi ván (so với $E(X) = -3$).',
    );
  });
});
