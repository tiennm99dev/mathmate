import { describe, expect, it } from 'vitest';
import { fracWords, productTex, quotientTex, reduce, sameValue } from './fractions.js';

describe('fractions for multiplying and dividing', () => {
  it('reads and reduces fractions the book way', () => {
    expect(fracWords(3, 4)).toBe('ba phần tư');
    expect(fracWords(5, 6)).toBe('năm phần sáu');
    expect(reduce(6, 8)).toEqual({ n: 3, d: 4 });
    expect(sameValue({ n: 2, d: 4 }, { n: 1, d: 2 })).toBe(true);
  });

  it('writes a product as numerator times numerator over denominator times denominator', () => {
    expect(productTex({ n: 4, d: 5 }, { n: 2, d: 3 })).toBe(
      '\\dfrac{4}{5} \\times \\dfrac{2}{3} = \\dfrac{4 \\times 2}{5 \\times 3} = \\dfrac{8}{15}',
    );
    expect(productTex({ n: 2, d: 5 }, { n: 3, d: 1 })).toBe(
      '\\dfrac{2}{5} \\times 3 = \\dfrac{2 \\times 3}{5 \\times 1} = \\dfrac{6}{5}',
    );
    expect(productTex({ n: 1, d: 2 }, { n: 2, d: 3 })).toBe(
      '\\dfrac{1}{2} \\times \\dfrac{2}{3} = \\dfrac{1 \\times 2}{2 \\times 3} = \\dfrac{2}{6} = \\dfrac{1}{3}',
    );
  });

  it('writes a quotient as a product by the reversed fraction', () => {
    expect(quotientTex({ n: 3, d: 7 }, { n: 5, d: 8 })).toBe(
      '\\dfrac{3}{7} : \\dfrac{5}{8} = \\dfrac{3}{7} \\times \\dfrac{8}{5} = \\dfrac{24}{35}',
    );
    expect(quotientTex({ n: 3, d: 2 }, { n: 1, d: 8 })).toBe(
      '\\dfrac{3}{2} : \\dfrac{1}{8} = \\dfrac{3}{2} \\times 8 = \\dfrac{24}{2} = 12',
    );
  });
});
