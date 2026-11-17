import { describe, expect, it } from 'vitest';
import {
  FORMS,
  TOP_ROW,
  binomialTex,
  choose,
  coefSum,
  expansionTex,
  feedbackText,
  generalTermTex,
  pascalRow,
  termCoef,
} from './engine.js';

/** @param {string} id */
const form = (id) => {
  const f = FORMS.find((x) => x.id === id);
  if (!f) throw new Error(id);
  return f;
};

describe('Pascal triangle', () => {
  it('builds rows by adding the two numbers above', () => {
    const bad = [];
    for (let n = 1; n <= TOP_ROW; n += 1) {
      const row = pascalRow(n);
      const above = pascalRow(n - 1);
      for (let k = 1; k < n; k += 1) if (row[k] !== above[k - 1] + above[k]) bad.push(`${n},${k}`);
      if (row.reduce((a, b) => a + b, 0) !== 2 ** n) bad.push(`sum ${n}`);
    }
    expect(bad).toEqual([]);
    expect(pascalRow(6)).toEqual([1, 6, 15, 20, 15, 6, 1]);
    expect(choose(10, 3)).toBe(120);
    expect(choose(5, 7)).toBe(0);
  });
});

describe('binomial expansions', () => {
  it('matches the book examples', () => {
    const f = form('x-2y');
    expect(Array.from({ length: 7 }, (_, k) => termCoef(f, 6, k))).toEqual([
      1, -12, 60, -160, 240, -192, 64,
    ]);
    expect(termCoef(form('2-3x'), 10, 7)).toBe(-2099520);
  });

  it('coefficients add up to (p + q)^n', () => {
    const bad = [];
    for (const f of FORMS) {
      for (let n = 0; n <= TOP_ROW; n += 1) {
        let s = 0;
        for (let k = 0; k <= n; k += 1) s += termCoef(f, n, k);
        if (s !== coefSum(f, n)) bad.push(`${f.id} ${n}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('writes the binomials, expansions and general terms', () => {
    expect(FORMS.map(binomialTex)).toEqual(['(a + b)', '(x - 2y)', '(2x + 1)', '(2 - 3x)']);
    expect(expansionTex(form('ab'), 2)).toBe('(a + b)^{2} = a^{2} + 2ab + b^{2}');
    expect(expansionTex(form('2x+1'), 2)).toBe('(2x + 1)^{2} = 4x^{2} + 4x + 1');
    expect(generalTermTex(form('x-2y'), 6, 2)).toBe(
      'T_{3} = C_{6}^{2} \\cdot x^{4} \\cdot (-2y)^{2} = 60x^{4}y^{2}',
    );
    expect(generalTermTex(form('2-3x'), 10, 7)).toBe(
      'T_{8} = C_{10}^{7} \\cdot 2^{3} \\cdot (-3x)^{7} = -2\\,099\\,520x^{7}',
    );
    expect(generalTermTex(form('ab'), 3, 0)).toBe('T_{1} = C_{3}^{0} \\cdot a^{3} = a^{3}');
    expect(expansionTex(form('ab'), 0)).toBe('(a + b)^{0} = 1');
  });

  it('explains the chosen number', () => {
    expect(feedbackText(form('ab'), 4, 2)).toContain('C_{3}^{1} + C_{3}^{2} = 3 + 3 = 6');
    expect(feedbackText(form('2x+1'), 3, 0)).toContain('= 27');
  });
});
