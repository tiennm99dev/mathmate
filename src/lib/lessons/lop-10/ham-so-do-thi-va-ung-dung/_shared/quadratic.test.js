import { describe, expect, it } from 'vitest';
import {
  discriminant,
  exactRoots,
  quadAt,
  quadText,
  rootsOf,
  signParts,
  simplifySqrt,
  solutionTex,
  valText,
  vertexOf,
} from './quadratic.js';

describe('quadratic trinomial', () => {
  it('writes and evaluates the trinomial', () => {
    expect(quadText(2, -5, 3)).toBe('2x² − 5x + 3');
    expect(quadText(-1, 0, 4)).toBe('−x² + 4');
    expect(quadAt(0.5, -1, 0.1, 0.2)).toBe(-0.08);
    expect(discriminant(1, -4, 3)).toBe(4);
  });

  it('finds the vertex', () => {
    expect(vertexOf(1, -4, 3)).toEqual({ x: 2, y: -1 });
    expect(vertexOf(-2, 4, 1)).toEqual({ x: 1, y: 3 });
  });

  it('lists the roots in increasing order', () => {
    expect(rootsOf(1, -4, 3)).toEqual([1, 3]);
    expect(rootsOf(-1, 4, -3)).toEqual([1, 3]);
    expect(rootsOf(1, -2, 1)).toEqual([1]);
    expect(rootsOf(1, 0, 1)).toEqual([]);
  });

  it('writes roots exactly', () => {
    expect(exactRoots(2, -3, 1).map((r) => r.tex)).toEqual(['\\frac{1}{2}', '1']);
    expect(exactRoots(1, -2, -1).map((r) => r.tex)).toEqual(['1 - \\sqrt{2}', '1 + \\sqrt{2}']);
    expect(exactRoots(-1, 3, -1).map((r) => r.tex)).toEqual([
      '\\frac{3 - \\sqrt{5}}{2}',
      '\\frac{3 + \\sqrt{5}}{2}',
    ]);
    expect(exactRoots(1, 0, -8).map((r) => r.text)).toEqual(['−2√2', '2√2']);
    const [r1, r2] = exactRoots(-1, 3, -1);
    expect(r1.value).toBeLessThan(r2.value);
    expect(simplifySqrt(72)).toEqual({ k: 6, m: 2 });
  });

  it('writes values exactly or rounded', () => {
    expect(valText(-2.5)).toBe('−2,5');
    expect(valText(0.125)).toBe('0,125');
    expect(valText(Math.SQRT2)).toBe('≈ 1,41');
  });
});

describe('sign of the trinomial', () => {
  it('follows the sign theorem', () => {
    expect(signParts(1, 0, 1)).toEqual([
      { kind: 'interval', from: -Infinity, to: Infinity, sign: 1 },
    ]);
    const parts = signParts(-1, 4, -3);
    expect(parts.map((p) => (p.kind === 'zero' ? 0 : p.sign))).toEqual([-1, 0, 1, 0, -1]);
  });

  it('writes the solution set of every inequality', () => {
    const cases = [
      [1, -4, 3, '>', 'S = (-\\infty; 1) \\cup (3; +\\infty)'],
      [1, -4, 3, '<=', 'S = [1; 3]'],
      [-1, 4, -3, '>=', 'S = [1; 3]'],
      [1, -2, 1, '>', 'S = \\mathbb{R} \\setminus \\{1\\}'],
      [1, -2, 1, '>=', 'S = \\mathbb{R}'],
      [1, -2, 1, '<=', 'S = \\{1\\}'],
      [1, -2, 1, '<', 'S = \\varnothing'],
      [1, 0, 1, '<', 'S = \\varnothing'],
      [-1, 0, -1, '<', 'S = \\mathbb{R}'],
      [1, -2, -1, '<', 'S = (1 - \\sqrt{2}; 1 + \\sqrt{2})'],
    ];
    const wrong = cases.filter(
      ([a, b, c, op, want]) =>
        solutionTex(
          /** @type {number} */ (a),
          /** @type {number} */ (b),
          /** @type {number} */ (c),
          /** @type {import('./quadratic.js').Op} */ (op),
        ) !== want,
    );
    expect(wrong).toEqual([]);
  });
});
