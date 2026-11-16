import { describe, it, expect } from 'vitest';
import { FAMILIES, M_MAX, M_MIN, M_STEP, bisect, isContinuous, ivtF } from './engine.js';

describe('joining families', () => {
  it('are continuous only at the fitting parameter', () => {
    const bad = [];
    for (const fam of FAMILIES) {
      for (let m = M_MIN; m <= M_MAX; m += M_STEP) {
        if (isContinuous(fam, m) !== (m === fam.fit)) bad.push(`${fam.id} ${m}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('match their formulas near the joining point', () => {
    const bad = [];
    for (const fam of FAMILIES) {
      for (const m of [M_MIN, 0, fam.fit, M_MAX]) {
        const f = fam.at(m);
        const j = fam.join(m);
        if (Math.abs(f(fam.x0 - 1e-7) - j.left) > 1e-5) bad.push(`${fam.id} ${m} left`);
        if (Math.abs(f(fam.x0 + 1e-7) - j.right) > 1e-5) bad.push(`${fam.id} ${m} right`);
        if (f(fam.x0) !== j.value) bad.push(`${fam.id} ${m} value`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('write the parameter the book way', () => {
    const pieces = FAMILIES[1];
    expect(pieces.tex(3)).toContain('-x^2 + 3 &');
    expect(pieces.tex(-1.5)).toContain('-x^2 - 1{,}5 &');
    expect(pieces.tex(0)).toContain('-x^2 &');
    expect(FAMILIES[0].tex(-2)).toContain('\\\\ -2 &');
  });
});

describe('halving an interval', () => {
  it('keeps the root of x³ + x − 1 inside', () => {
    let [a, b] = [0, 1];
    for (let i = 0; i < 12; i++) [a, b] = bisect(ivtF, a, b).next;
    expect(a).toBeLessThan(0.6823278);
    expect(b).toBeGreaterThan(0.6823278);
    expect(b - a).toBeCloseTo(1 / 4096, 12);
  });

  it('keeps the half on which the sign changes', () => {
    const step = bisect(ivtF, 0, 1);
    expect(step.c).toBe(0.5);
    expect(step.fc).toBe(-0.375);
    expect(step.next).toEqual([0.5, 1]);
  });
});
