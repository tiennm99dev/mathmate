import { describe, expect, it } from 'vitest';
import { FORMS, binomialTex, expansionTex, feedbackText, pascalText, termTex } from './engine.js';

/** @param {string} id */
const form = (id) => FORMS.find((f) => f.id === id) ?? FORMS[0];

describe('binomial expansions', () => {
  it('writes the binomials', () => {
    expect(FORMS.map(binomialTex)).toEqual([
      '(a + b)',
      '(x + 1)',
      '(x - 2)',
      '(2x + 1)',
      '(3x - 1)',
    ]);
  });

  it('expands as in the worked examples', () => {
    expect(expansionTex(form('ab'), 4)).toBe('(a + b)^{4} = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4');
    expect(expansionTex(form('x-2'), 4)).toBe('(x - 2)^{4} = x^4 - 8x^3 + 24x^2 - 32x + 16');
    expect(expansionTex(form('2x+1'), 5)).toBe(
      '(2x + 1)^{5} = 32x^5 + 80x^4 + 80x^3 + 40x^2 + 10x + 1',
    );
    expect(expansionTex(form('x+1'), 2, 1)).toBe(
      '(x + 1)^{2} = x^2 + \\textcolor{#4338ca}{2x} + 1',
    );
  });

  it('works out a single term', () => {
    expect(termTex(form('x-2'), 4, 1)).toBe('C_{4}^{1} \\cdot x^{3} \\cdot (-2) = -8x^3');
    expect(termTex(form('3x-1'), 5, 1)).toBe('C_{5}^{1} \\cdot (3x)^{4} \\cdot (-1) = -405x^4');
    expect(termTex(form('2x+1'), 5, 5)).toBe('C_{5}^{5} \\cdot 1^{5} = 1');
    expect(termTex(form('ab'), 5, 2)).toBe('C_{5}^{2}a^3b^2 = 10a^3b^2');
  });

  it('explains Pascal triangle', () => {
    expect(pascalText(5, 2)).toContain('= 4 + 6 = 10');
    expect(pascalText(4, 0)).toContain('Hai đầu');
    expect(feedbackText(form('ab'), 4, 2)).toContain('2^{4} = 16');
    expect(feedbackText(form('ab'), 0, 0)).toContain('Hàng $0$');
  });
});
