import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { BASES } from '../_shared/bases.js';
import {
  challenge,
  convertTex,
  exponentTex,
  isLog,
  powerValueTex,
  ruleX,
  scaleMarks,
  slide,
} from './engine.js';

describe('the converter', () => {
  it('writes both sides', () => {
    expect(convertTex(BASES[2], 3)).toEqual({ pow: '2^{3} = 8', log: '\\log_{2} 8 = 3' });
    expect(convertTex(BASES[10], -2)).toEqual({
      pow: '10^{-2} = \\dfrac{1}{100}',
      log: '\\log \\dfrac{1}{100} = -2',
    });
    expect(convertTex(BASES.half, 2).log).toBe('\\log_{\\frac{1}{2}} \\dfrac{1}{4} = 2');
    expect(convertTex(BASES[3], 1.5)).toEqual({
      pow: '3^{\\frac{3}{2}} = \\sqrt{27}',
      log: '\\log_{3} \\sqrt{27} = \\dfrac{3}{2}',
    });
  });

  it('writes exponents and roots', () => {
    expect(exponentTex(-0.5)).toBe('-\\dfrac{1}{2}');
    expect(powerValueTex(BASES[2], -1.5)).toBe('\\sqrt{\\dfrac{1}{8}}');
    expect(powerValueTex(BASES[10], 0)).toBe('1');
  });

  it('asks questions whose value really is the power', () => {
    const r = rng(7);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const q = challenge(r, [BASES[2], BASES[3], BASES[10], BASES.half]);
      if (!q.log.endsWith(`= ${exponentTex(q.alpha)}`)) bad.push(q.log);
      if (!isLog(q.alpha, q.alpha) || isLog(q.alpha + 0.5, q.alpha)) bad.push(`check ${q.alpha}`);
    }
    expect(bad).toEqual([]);
    expect(isLog(null, 2)).toBe(false);
  });
});

describe('the slide rule', () => {
  it('adds lengths to multiply', () => {
    const s = slide(2, 3);
    expect(s.product).toBe(6);
    expect(s.at).toBeCloseTo(ruleX(6), 9);
    expect(slide(4, 2.5).at).toBeCloseTo(ruleX(10), 9);
    expect(slide(10, 10).at).toBeCloseTo(ruleX(100), 9);
  });

  it('marks every half number on each decade', () => {
    const one = scaleMarks(1);
    expect(one.length).toBe(19);
    expect(one[0]).toEqual({ v: 1, major: true });
    expect(one.at(-1)).toEqual({ v: 10, major: true });
    const two = scaleMarks(2).map((m) => m.v);
    expect(new Set(two).size).toBe(two.length);
    expect(two).toContain(95);
  });
});
