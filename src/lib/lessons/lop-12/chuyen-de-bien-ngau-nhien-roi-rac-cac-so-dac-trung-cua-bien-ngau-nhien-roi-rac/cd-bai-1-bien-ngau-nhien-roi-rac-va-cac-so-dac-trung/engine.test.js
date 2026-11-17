import { describe, expect, it } from 'vitest';
import { strictTexFailures } from '#lib/core/tex-check.js';
import {
  MAX_TILT,
  PRESETS,
  STEPS,
  balanceText,
  expectationTex,
  feedback,
  summary,
  tiltOf,
  torque,
  varianceTex,
} from './engine.js';

describe('distribution chart', () => {
  it('starts every preset as a valid distribution table', () => {
    const bad = PRESETS.filter(
      (p) => p.values.length !== p.units.length || !summary(p.values, p.units).valid,
    ).map((p) => p.id);
    expect(bad).toEqual([]);
  });

  it('reads the traffic table the book way', () => {
    const p = PRESETS[0];
    const s = summary(p.values, p.units);
    expect(s.e).toBe(2.3);
    expect(s.v).toBe(1.81);
    expect(expectationTex(p.values, p.units)).toBe(
      '\\begin{aligned} E(X) &= 0 \\cdot 0{,}1 + 1 \\cdot 0{,}2 \\\\ &\\quad + 2 \\cdot 0{,}25 + 3 \\cdot 0{,}25 \\\\ &\\quad + 4 \\cdot 0{,}15 + 5 \\cdot 0{,}05 \\\\ &= 2{,}3 \\end{aligned}',
    );
    expect(varianceTex(p.values, p.units)).toBe(
      '\\begin{aligned} V(X) &= 7{,}1 - 2{,}3^2 = 1{,}81 \\\\ \\sigma(X) &= \\sqrt{1{,}81} \\approx 1{,}35 \\end{aligned}',
    );
    expect(feedback(p.values, p.units).tone).toBe('ok');
  });

  it('balances two fair coins at 1', () => {
    const p = PRESETS[1];
    const s = summary(p.values, p.units);
    expect([s.e, s.v]).toEqual([1, 0.5]);
  });

  it('refuses a table that does not add up to 1', () => {
    const values = [0, 1, 2];
    const low = feedback(values, [5, 9, 5]);
    expect(low.tone).toBe('warn');
    expect(low.text).toContain('tăng thêm $0{,}05$');
    expect(feedback(values, [5, 11, 6]).text).toContain('giảm bớt $0{,}1$');
    expect(summary(values, [5, 9, 5]).e).toBeNull();
    expect(feedback(values, [0, STEPS, 0]).tone).toBe('info');
  });

  it('writes TeX that KaTeX accepts', () => {
    const texts = [];
    for (const p of PRESETS) {
      texts.push(p.story, feedback(p.values, p.units).text);
      texts.push(`$${expectationTex(p.values, p.units)}$`, `$${varianceTex(p.values, p.units)}$`);
    }
    texts.push(feedback([0, 1, 2], [5, 9, 5]).text, feedback([0, 1, 2], [0, 20, 0]).text);
    expect(strictTexFailures(texts)).toEqual([]);
  });
});

describe('seesaw', () => {
  it('balances exactly at E(X) and tips toward the heavier side', () => {
    const p = PRESETS[0];
    expect(torque(p.values, p.units, 2.3)).toBe(0);
    expect(balanceText(p.values, p.units, 2.3).tone).toBe('ok');
    expect(torque(p.values, p.units, 0)).toBe(2.3);
    expect(tiltOf(p.values, p.units, 0)).toBe(MAX_TILT);
    expect(tiltOf(p.values, p.units, 2.5)).toBeCloseTo(-2);
    expect(balanceText(p.values, p.units, 3).text).toContain('bên trái');
    expect(balanceText(p.values, [1, 4, 5, 5, 3, 1], 2).tone).toBe('info');
  });

  it('writes TeX that KaTeX accepts', () => {
    const p = PRESETS[0];
    const texts = [0, 2.3, 4.5].map((g) => balanceText(p.values, p.units, g).text);
    expect(strictTexFailures(texts)).toEqual([]);
  });
});
