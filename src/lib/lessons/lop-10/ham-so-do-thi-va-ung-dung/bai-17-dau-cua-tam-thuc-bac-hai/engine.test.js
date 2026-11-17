import { describe, expect, it } from 'vitest';
import { rootsOf, signTable } from '../_shared/quadratic.js';
import { A_VALUES, caseSentence, testSentence } from './engine.js';

describe('sign of a quadratic trinomial', () => {
  it('names the case of the theorem', () => {
    expect(caseSentence(1, 0, 1)).toContain('cùng dấu với a (dương) với mọi x');
    expect(caseSentence(-1, 2, -1)).toContain('x ≠ 1');
    expect(caseSentence(1, -4, 3)).toContain('x₁ = 1, x₂ = 3');
    expect(caseSentence(-1, 3, -1)).toContain('x₁ = (3 − √5)/2');
  });

  it('builds the sign table the book draws', () => {
    expect(signTable(1, -4, 3)).toEqual({
      x: ['-\\infty', '', '1', '', '3', '', '+\\infty'],
      f: ['', '+', '0', '-', '0', '+', ''],
    });
    expect(signTable(-2, 0, -1)).toEqual({ x: ['-\\infty', '', '+\\infty'], f: ['', '-', ''] });
    expect(signTable(1, -2, 1).f).toEqual(['', '+', '0', '+', '']);
  });

  it('keeps every root of the sliders on the plane', () => {
    const off = [];
    for (const a of A_VALUES)
      for (let b = -4; b <= 4; b++)
        for (let c = -4; c <= 4; c++)
          if (rootsOf(a, b, c).some((r) => Math.abs(r) > 6)) off.push([a, b, c]);
    expect(off).toEqual([]);
  });

  it('reads a test point', () => {
    expect(testSentence(1, -4, 3, 2)).toBe(
      'f(2) = −1 < 0: tại x = 2, tam thức âm, trái dấu với a.',
    );
    expect(testSentence(1, -4, 3, 3)).toContain('là nghiệm');
  });
});
