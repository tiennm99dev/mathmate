import { describe, it, expect } from 'vitest';
import { FAMILIES, familyOf, pointText, polyText, survey } from './engine.js';

/** @param {import('./engine.js').Extremum[]} list */
const rounded = (list) => list.map((e) => [e.kind, +e.x.toFixed(4), +e.y.toFixed(4)]);

describe('functions written the GeoGebra way', () => {
  it('writes polynomials with the book signs and decimal comma', () => {
    expect(
      polyText([
        [1, 3],
        [-4.5, 1],
        [1, 0],
      ]),
    ).toBe('x³ − 4,5x + 1');
    expect(
      polyText([
        [1, 4],
        [0, 2],
        [1, 0],
      ]),
    ).toBe('x⁴ + 1');
    expect(
      polyText([
        [-1, 1],
        [1, 0],
      ]),
    ).toBe('−x + 1');
    expect(pointText(-Math.SQRT2, -3)).toBe('(−1,41; −3)');
  });

  it('keeps each start value inside its slider range', () => {
    const bad = FAMILIES.filter((f) => f.start < f.range.min || f.start > f.range.max);
    expect(bad).toEqual([]);
    expect(familyOf('nope').id).toBe('cubic');
  });
});

describe('extrema of the families', () => {
  it('cubic y = x³ − 3mx + 1', () => {
    expect(rounded(survey('cubic', 1).extrema)).toEqual([
      ['max', -1, 3],
      ['min', 1, -1],
    ]);
    expect(survey('cubic', 4).extrema.map((e) => e.y)).toEqual([17, -15]);
    expect(survey('cubic', 0).extrema).toEqual([]);
    expect(survey('cubic', -1).extrema).toEqual([]);
    expect(survey('cubic', 1.5).input).toBe('x³ − 4,5x + 1');
    expect(survey('cubic', 1.5).derivative).toBe('3x² − 4,5');
  });

  it('places every cubic and quartic extremum on its locus', () => {
    const off = [];
    for (const id of /** @type {const} */ (['cubic', 'quartic'])) {
      const fam = familyOf(id);
      for (let m = 0.25; m <= 2; m += 0.25) {
        for (const e of survey(id, m).extrema) {
          if (id === 'quartic' && e.kind === 'max') continue;
          if (Math.abs((fam.locusF?.(e.x) ?? NaN) - e.y) > 1e-9) off.push([id, m, e.x]);
        }
      }
    }
    expect(off).toEqual([]);
  });

  it('quartic y = x⁴ − 2mx² + 1', () => {
    expect(rounded(survey('quartic', 2).extrema)).toEqual([
      ['min', -1.4142, -3],
      ['max', 0, 1],
      ['min', 1.4142, -3],
    ]);
    expect(rounded(survey('quartic', -0.5).extrema)).toEqual([['min', 0, 1]]);
  });

  it('rational y = (mx + 1)/(x − 1)', () => {
    const s = survey('rational', 2);
    expect(s.asymptotes).toEqual({ vertical: 1, horizontal: 2 });
    expect(s.input).toBe('(2x + 1)/(x − 1)');
    expect(s.derivative).toBe('−3/(x − 1)²');
    expect(s.f(2)).toBe(5);
    const flat = survey('rational', -1);
    expect(flat.asymptotes).toBeNull();
    expect(flat.hole).toEqual({ x: 1, y: -1 });
    expect(flat.f(3)).toBe(-1);
    expect(survey('rational', -2).verdict).toContain('đồng biến');
  });
});
