import { describe, it, expect } from 'vitest';
import {
  angleAt,
  circlePoint,
  degToPi,
  exactTex,
  piTex,
  quadrantOf,
  radTex,
  referenceAngle,
  trigValue,
  turnsTex,
  unwrap,
  valueText,
} from './trig.js';
import { SPECIAL_VALUES, baseAngle, families, solutionTex, solutionsIn } from './equations.js';

/** Numeric value of the TeX this module writes for exact values. */
function texValue(/** @type {string} */ tex) {
  const sign = tex.startsWith('-') ? -1 : 1;
  const t = tex.replace(/^-/, '');
  /** @type {Record<string, number>} */
  const known = {
    0: 0,
    1: 1,
    '\\dfrac{1}{2}': 0.5,
    '\\dfrac{\\sqrt{2}}{2}': Math.SQRT2 / 2,
    '\\dfrac{\\sqrt{3}}{2}': Math.sqrt(3) / 2,
    '\\dfrac{\\sqrt{3}}{3}': Math.sqrt(3) / 3,
    '\\sqrt{3}': Math.sqrt(3),
  };
  if (!(t in known)) throw new Error(tex);
  return sign * known[t];
}

describe('angles', () => {
  it('converts degrees to fractions of π', () => {
    expect(degToPi(150)).toEqual([5, 6]);
    expect(degToPi(-90)).toEqual([-1, 2]);
    expect(degToPi(0)).toEqual([0, 1]);
    expect(degToPi(720)).toEqual([4, 1]);
    expect(degToPi(7.5)).toEqual([1, 24]);
  });

  it('writes multiples of π the book way', () => {
    expect(piTex(5, 6)).toBe('\\dfrac{5\\pi}{6}');
    expect(piTex(-1, 3)).toBe('-\\dfrac{\\pi}{3}');
    expect(piTex(2, 1)).toBe('2\\pi');
    expect(piTex(1, 1)).toBe('\\pi');
    expect(piTex(0, 1)).toBe('0');
    expect(piTex(4, 6)).toBe('\\dfrac{2\\pi}{3}');
    expect(radTex(-135)).toBe('-\\dfrac{3\\pi}{4}');
    expect(radTex(50)).toBe('\\approx 0{,}873');
  });

  it('places and reads points on the circle', () => {
    const c = { x: 100, y: 100 };
    const fails = [];
    for (let d = 0; d < 360; d += 7) {
      const back = angleAt(c, circlePoint(c, 50, d));
      if (Math.abs(back - d) > 1e-9) fails.push(d);
    }
    expect(fails).toEqual([]);
    expect(circlePoint(c, 50, 90).y).toBeCloseTo(50);
  });

  it('unwraps a drag into whole turns', () => {
    expect(unwrap(350, 10)).toBe(370);
    expect(unwrap(370, 350)).toBe(350);
    expect(unwrap(-10, 340)).toBe(-20);
    expect(unwrap(725, 10)).toBe(730);
  });

  it('finds quadrants and reference angles', () => {
    expect(quadrantOf(30)).toBe(1);
    expect(quadrantOf(-30)).toBe(4);
    expect(quadrantOf(480)).toBe(2);
    expect(quadrantOf(-180)).toBe(0);
    expect(referenceAngle(150)).toBe(30);
    expect(referenceAngle(-120)).toBe(60);
  });

  it('writes whole turns', () => {
    expect(turnsTex(0)).toBe('');
    expect(turnsTex(1)).toBe(' + 2\\pi');
    expect(turnsTex(-2)).toBe(' - 4\\pi');
    expect(turnsTex(2, true)).toBe(' + 2 \\cdot 360^\\circ');
  });
});

describe('values', () => {
  it('gives exact values that match the functions at every special angle', () => {
    const fails = [];
    for (let d = -720; d <= 720; d += 15) {
      for (const name of /** @type {const} */ (['sin', 'cos', 'tan', 'cot'])) {
        const v = trigValue(name, d);
        const ex = exactTex(name, d);
        const special = d % 30 === 0 || d % 45 === 0;
        if (Number.isNaN(v)) {
          if (ex !== null) fails.push(`${name} ${d} should be undefined`);
          continue;
        }
        if (!special) {
          if (ex !== null) fails.push(`${name} ${d} is not special`);
          continue;
        }
        if (ex === null || Math.abs(texValue(ex) - v) > 1e-9) fails.push(`${name} ${d}: ${ex}`);
      }
    }
    expect(fails).toEqual([]);
  });

  it('marks undefined values', () => {
    expect(trigValue('tan', 90)).toBeNaN();
    expect(trigValue('cot', -180)).toBeNaN();
    expect(valueText('tan', 270)).toBe('không xác định');
    expect(valueText('sin', 150)).toBe('$\\dfrac{1}{2}$');
    expect(valueText('sin', 20)).toBe('$\\approx 0{,}342$');
  });
});

describe('basic equations', () => {
  it('picks α in the book’s range', () => {
    expect(baseAngle('sin', 0.5)).toBe(30);
    expect(baseAngle('sin', -1)).toBe(-90);
    expect(baseAngle('cos', -0.5)).toBe(120);
    expect(baseAngle('tan', -1)).toBe(-45);
    expect(baseAngle('cot', -1)).toBe(135);
    expect(baseAngle('cot', 0)).toBe(90);
    expect(baseAngle('sin', 1.2)).toBeNull();
  });

  it('merges the two families when they coincide', () => {
    expect(families('sin', 1)).toHaveLength(1);
    expect(families('sin', -1)).toHaveLength(1);
    expect(families('cos', 1)).toHaveLength(1);
    expect(families('cos', -1)).toHaveLength(1);
    expect(families('sin', 0.3)).toHaveLength(2);
    expect(families('cos', 2)).toEqual([]);
  });

  it('lists solutions that really solve the equation', () => {
    const fails = [];
    for (const name of /** @type {const} */ (['sin', 'cos', 'tan', 'cot'])) {
      for (const m of [...SPECIAL_VALUES[name].map((v) => v.value), 0.3, -0.71, 2.4]) {
        for (const s of solutionsIn(name, m, -360, 720)) {
          const v = trigValue(name, s.x);
          if (Number.isNaN(v) || Math.abs(v - m) > 1e-6) fails.push(`${name} ${m} ${s.x}`);
        }
        // Every solution on a fine grid of the interval is listed.
        const listed = solutionsIn(name, m, 0, 359.75).map((s) => s.x);
        for (let x = 0; x < 360; x += 0.25) {
          const v = trigValue(name, x);
          if (!Number.isNaN(v) && Math.abs(v - m) < 1e-12 && !listed.includes(x)) {
            fails.push(`missed ${name} ${m} ${x}`);
          }
        }
      }
    }
    expect(fails).toEqual([]);
    expect(solutionsIn('sin', 0.5, 0, 360).map((s) => s.x)).toEqual([30, 150]);
    expect(solutionsIn('cos', 0, 0, 360).map((s) => s.x)).toEqual([90, 270]);
    expect(solutionsIn('tan', 1, -180, 180).map((s) => s.x)).toEqual([-135, 45]);
  });

  it('writes the solution formulas', () => {
    expect(solutionTex('sin', 0.5)).toEqual([
      'x = \\dfrac{\\pi}{6} + k2\\pi',
      'x = \\dfrac{5\\pi}{6} + k2\\pi',
    ]);
    expect(solutionTex('sin', 0)).toEqual(['x = k\\pi']);
    expect(solutionTex('sin', -1)).toEqual(['x = -\\dfrac{\\pi}{2} + k2\\pi']);
    expect(solutionTex('cos', Math.SQRT2 / 2)).toEqual(['x = \\pm \\dfrac{\\pi}{4} + k2\\pi']);
    expect(solutionTex('cos', 0)).toEqual(['x = \\dfrac{\\pi}{2} + k\\pi']);
    expect(solutionTex('cos', -1)).toEqual(['x = \\pi + k2\\pi']);
    expect(solutionTex('cos', 1)).toEqual(['x = k2\\pi']);
    expect(solutionTex('tan', -Math.sqrt(3))).toEqual(['x = -\\dfrac{\\pi}{3} + k\\pi']);
    expect(solutionTex('cot', 0)).toEqual(['x = \\dfrac{\\pi}{2} + k\\pi']);
    expect(solutionTex('tan', 0)).toEqual(['x = k\\pi']);
    expect(solutionTex('sin', 0.3)).toEqual([
      'x = \\alpha + k2\\pi',
      'x = \\pi - \\alpha + k2\\pi',
    ]);
    expect(solutionTex('sin', 3)).toEqual([]);
  });
});
