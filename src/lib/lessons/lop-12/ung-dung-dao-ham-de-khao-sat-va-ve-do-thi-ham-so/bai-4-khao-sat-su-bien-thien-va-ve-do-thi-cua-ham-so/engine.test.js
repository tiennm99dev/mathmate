import { describe, it, expect } from 'vitest';
import { FAMILIES, crossings, survey } from './engine.js';
import { asFraction, num, polyTex, polyText, quadRoots, surd } from './numbers.js';

describe('exact numbers', () => {
  it('writes integers and fractions exactly, others rounded', () => {
    expect(num(2)).toMatchObject({ tex: '2', text: '2', exact: true });
    expect(num(-1 / 3)).toMatchObject({ tex: '-\\frac{1}{3}', text: '−1/3', exact: true });
    expect(num(Math.SQRT2)).toMatchObject({ text: '1,41', exact: false });
    expect(asFraction(Math.PI)).toBeNull();
  });

  it('simplifies square roots and writes quadratic roots', () => {
    expect(surd(12)).toEqual([2, 3]);
    expect(surd(7)).toEqual([1, 7]);
    expect(quadRoots(3, -6, 0).map((r) => r.tex)).toEqual(['0', '2']);
    expect(quadRoots(1, -2, 1).map((r) => r.tex)).toEqual(['1']);
    expect(quadRoots(1, 0, 1)).toEqual([]);
    // 3x² − 6x + 1: x = (3 ± √6)/3
    const r = quadRoots(3, -6, 1);
    expect(r.map((v) => v.tex)).toEqual(['\\dfrac{3 - \\sqrt{6}}{3}', '\\dfrac{3 + \\sqrt{6}}{3}']);
    expect(r[0].value).toBeCloseTo((3 - Math.sqrt(6)) / 3, 12);
    // x² − 2 = 0: ±√2
    expect(quadRoots(1, 0, -2).map((v) => v.tex)).toEqual(['-\\sqrt{2}', '\\sqrt{2}']);
  });

  it('writes polynomials the book way', () => {
    expect(polyTex([1, -3, 0, 2])).toBe('x^3 - 3x^2 + 2');
    expect(polyTex([-1, 0, 1, 0])).toBe('-x^3 + x');
    expect(polyText([2, -1])).toBe('2x − 1');
    expect(polyTex([0, 0])).toBe('0');
  });
});

describe('surveying a cubic', () => {
  it('finds the extrema and the centre of y = x³ − 3x² + 2', () => {
    const s = survey('cubic', [1, -3, 0, 2]);
    expect(s.ok).toBe(true);
    expect(s.table.cells.map((c) => c.y)).toEqual(['−∞', '2', '−2', '+∞']);
    expect(s.table.signs).toEqual(['+', '-', '+']);
    expect(s.specials.filter((p) => p.kind === 'max')).toEqual([{ x: 0, y: 2, kind: 'max' }]);
    expect(s.specials.find((p) => p.kind === 'center')).toEqual({ x: 1, y: 0, kind: 'center' });
    expect(s.steps[3]).toContain('đồng biến trên mỗi khoảng $(-\\infty; 0)$ và $(2; +\\infty)$');
    expect(s.steps[3]).toContain('$y_{\\text{CĐ}} = 2$');
  });

  it('handles a decreasing cubic without extrema', () => {
    const s = survey('cubic', [-1, 0, -3, 1]);
    expect(s.table.signs).toEqual(['-']);
    expect(s.steps[3]).toContain('nghịch biến trên $\\mathbb{R}$');
    expect(s.steps[3]).toContain('không có cực trị');
  });

  it('handles a double root of y′', () => {
    const s = survey('cubic', [1, -3, 3, 0]);
    expect(s.table.signs).toEqual(['+', '+']);
    expect(s.table.cells[1].level).toBe('mid');
  });

  it('rejects a = 0', () => {
    expect(survey('cubic', [0, 1, 0, 0]).ok).toBe(false);
  });

  it('marks real x-axis crossings', () => {
    const s = survey('cubic', [1, 0, -3, 0]);
    const ox = s.specials.filter((p) => p.kind === 'ox').map((p) => p.x);
    expect(ox).toHaveLength(3);
    expect(ox[2]).toBeCloseTo(Math.sqrt(3), 6);
  });
});

describe('surveying fractions', () => {
  it('surveys y = (2x − 1)/(x + 1)', () => {
    const s = survey('linear', [2, -1, 1, 1]);
    expect(s.ok).toBe(true);
    expect(s.table.signs).toEqual(['+', '+']);
    expect(s.table.cells[1]).toMatchObject({ kind: 'pole', yl: '+∞', yr: '−∞' });
    expect(s.asymptotes).toEqual([
      { c: -1, vertical: true },
      { a: 0, b: 2 },
    ]);
    expect(s.steps[2]).toContain('x \\to -1^-');
  });

  it('rejects ad − bc = 0 and c = 0', () => {
    expect(survey('linear', [2, 4, 1, 2]).ok).toBe(false);
    expect(survey('linear', [2, 4, 0, 2]).ok).toBe(false);
  });

  it('surveys y = (x² + x + 1)/(x − 1)', () => {
    const s = survey('quad', [1, 1, 1, 1, -1]);
    expect(s.ok).toBe(true);
    expect(s.table.signs).toEqual(['+', '-', '-', '+']);
    expect(s.table.cells.map((c) => c.x)).toEqual(['−∞', '≈ −0,73', '1', '≈ 2,73', '+∞']);
    const max = s.specials.find((p) => p.kind === 'max');
    expect(max?.x).toBeCloseTo(1 - Math.sqrt(3), 12);
    expect(max?.y).toBeCloseTo(3 - 2 * Math.sqrt(3), 12);
    expect(s.steps[1]).toContain('x = 1 - \\sqrt{3}');
    expect(s.asymptotes[1]).toEqual({ a: 1, b: 2 });
    expect(s.steps[2]).toContain('y = x + 2');
  });

  it('rejects a numerator with the factor of the denominator', () => {
    expect(survey('quad', [1, -3, 2, 1, -1]).ok).toBe(false);
  });

  it('keeps every survey of the start values consistent with f', () => {
    /** @type {string[]} */
    const bad = [];
    for (const fam of FAMILIES) {
      const s = survey(fam.id, fam.start);
      if (!s.ok) bad.push(`${fam.id} not ok`);
      for (const p of s.specials) {
        if (p.kind !== 'center' && Math.abs(s.f(p.x) - p.y) > 1e-6) bad.push(`${fam.id} ${p.kind}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('sweeps many coefficients without a broken table', () => {
    /** @type {string[]} */
    const bad = [];
    const vals = [-2, -1, 0, 1, 3];
    for (const fam of FAMILIES) {
      for (const a of vals)
        for (const b of vals)
          for (const c of vals)
            for (const d of vals) {
              const k = fam.id === 'quad' ? [a, b, c, d, 2] : [a, b, c, d];
              const s = survey(fam.id, k);
              if (!s.ok) continue;
              const inner = s.specials
                .filter((p) => p.kind === 'max' || p.kind === 'min')
                .map((p) => p.x);
              for (const p of inner) {
                const h = 1e-4;
                const left = s.f(p - h);
                const right = s.f(p + h);
                const y = s.f(p);
                const isMax = s.specials.find((q) => q.x === p)?.kind === 'max';
                if (isMax ? !(y >= left && y >= right) : !(y <= left && y <= right)) {
                  bad.push(`${fam.id} ${k} ${p}`);
                }
              }
              if (!s.steps.every((t) => (t.match(/\$/g)?.length ?? 0) % 2 === 0))
                bad.push(`${fam.id} ${k} tex`);
            }
    }
    expect(bad).toEqual([]);
  });
});

describe('x-axis crossings', () => {
  it('skips a sign change through a pole', () => {
    expect(crossings((x) => 1 / x, -2, 2, [0])).toEqual([]);
  });
});
