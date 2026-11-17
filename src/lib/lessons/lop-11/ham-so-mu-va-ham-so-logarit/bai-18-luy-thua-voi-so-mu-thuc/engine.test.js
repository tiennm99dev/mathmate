import { describe, it, expect } from 'vitest';
import { BASES } from '../_shared/plot.js';
import {
  IRRATIONALS,
  approximations,
  exactTex,
  integerTex,
  rationalTex,
  truncate,
  windowFor,
} from './engine.js';

describe('integer powers', () => {
  it('write the product, the zero power and the reciprocal', () => {
    expect(integerTex(BASES[2], 3)).toBe('2^{3} = 2 \\cdot 2 \\cdot 2 = 8');
    expect(integerTex(BASES[3], 0)).toBe('3^0 = 1');
    expect(integerTex(BASES[2], -2)).toBe('2^{-2} = \\dfrac{1}{2^{2}} = \\dfrac{1}{4}');
    expect(integerTex(BASES.half, -3)).toBe(
      '\\left(\\dfrac{1}{2}\\right)^{-3} = \\dfrac{1}{\\left(\\dfrac{1}{2}\\right)^{3}} = 8',
    );
  });

  it('write exact values', () => {
    expect(exactTex(0.125)).toBe('\\dfrac{1}{8}');
    expect(exactTex(1 / 27)).toBe('\\dfrac{1}{27}');
    expect(exactTex(-2)).toBe('-2');
  });
});

describe('rational powers', () => {
  it('use the n-th root of a^m', () => {
    expect(rationalTex(BASES[2], 3, 2)).toBe('2^{\\frac{3}{2}} = \\sqrt{2^{3}} \\approx 2{,}8284');
    expect(rationalTex(BASES[3], -1, 3)).toBe(
      '3^{-\\frac{1}{3}} = \\sqrt[3]{3^{-1}} \\approx 0{,}6934',
    );
  });

  it('reduce the fraction first', () => {
    expect(rationalTex(BASES[2], 2, 4)).toBe(
      '2^{\\frac{2}{4}} = 2^{\\frac{1}{2}} = \\sqrt{2^{1}} \\approx 1{,}4142',
    );
    expect(rationalTex(BASES[2], 4, 2)).toBe('2^{\\frac{4}{2}} = 2^{2} = 4');
    expect(rationalTex(BASES[3], 3, 3)).toBe('3^{\\frac{3}{3}} = 3^{1} = 3');
    expect(rationalTex(BASES[2], 0, 3)).toBe('2^{\\frac{0}{3}} = 2^{0} = 1');
  });
});

describe('real powers', () => {
  it('truncate the irrational exponent', () => {
    expect(truncate(Math.SQRT2, 0)).toBe(1);
    expect(truncate(Math.SQRT2, 3)).toBe(1.414);
    expect(truncate(Math.PI, 4)).toBe(3.1415);
  });

  it('close in on a^α', () => {
    const bad = [];
    for (const b of [BASES[2], BASES[3], BASES.half]) {
      for (const alpha of IRRATIONALS) {
        const list = approximations(b, alpha.value, 6);
        const target = b.value ** alpha.value;
        const gaps = list.map((s) => Math.abs(s.value - target));
        if (gaps[6] > 1e-4) bad.push(`${b.id} ${alpha.id} far`);
        for (let i = 1; i < gaps.length; i++) {
          if (gaps[i] > gaps[i - 1] + 1e-12) bad.push(`${b.id} ${alpha.id} ${i}`);
        }
        const win = windowFor(b);
        if (target > win.yMax || alpha.value > win.xMax) bad.push(`${b.id} ${alpha.id} window`);
      }
    }
    expect(bad).toEqual([]);
  });
});
