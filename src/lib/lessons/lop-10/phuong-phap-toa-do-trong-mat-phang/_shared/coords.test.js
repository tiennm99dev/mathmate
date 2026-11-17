import { describe, expect, it } from 'vitest';
import {
  angleOf,
  circleTex,
  clipLine,
  distance,
  expandedTex,
  footOn,
  intersect,
  latticeOnCircle,
  lineTex,
  lineText,
  lineThrough,
  normLine,
  paramTex,
  relationOf,
  sqrtTex,
  tangentAt,
  tangentSubTex,
  termsTex,
  valueTex,
  valueText,
} from './coords.js';

const v = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('lines', () => {
  it('keeps whole coefficients in lowest terms with a positive lead', () => {
    expect(normLine(-4, 6, -2)).toEqual({ a: 2, b: -3, c: 1 });
    expect(normLine(0, -3, 6)).toEqual({ a: 0, b: 1, c: -2 });
  });

  it('finds the line through two points', () => {
    // A(1; 2), B(3; 6): AB = (2; 4), n = (2; -1), 2x - y = 0.
    expect(lineThrough(v(1, 2), v(3, 6))).toEqual({ a: 2, b: -1, c: 0 });
    expect(lineThrough(v(2, -1), v(2, 5))).toEqual({ a: 1, b: 0, c: -2 });
    expect(lineThrough(v(-3, 4), v(5, 4))).toEqual({ a: 0, b: 1, c: -4 });
  });

  it('writes equations the book way', () => {
    expect(lineTex({ a: 2, b: -3, c: 5 })).toBe('2x - 3y + 5 = 0');
    expect(lineTex({ a: 1, b: 0, c: -2 })).toBe('x - 2 = 0');
    expect(lineTex({ a: 0, b: 1, c: 0 })).toBe('y = 0');
    expect(lineText({ a: 1, b: -1, c: -1 })).toBe('x − y − 1 = 0');
    expect(termsTex([[0, 'x']])).toBe('0');
    expect(paramTex(v(1, -2), v(3, -1))).toBe(
      '\\begin{cases} x = 1 + 3t \\\\ y = -2 - t \\end{cases}',
    );
    expect(paramTex(v(0, 0), v(0, 2))).toBe('\\begin{cases} x = 0 \\\\ y = 2t \\end{cases}');
  });

  it('tells crossing, parallel and equal lines apart', () => {
    const l = { a: 1, b: -1, c: 1 };
    expect(relationOf(l, { a: 2, b: -2, c: 2 })).toBe('trung');
    expect(relationOf(l, { a: 1, b: -1, c: 5 })).toBe('song-song');
    expect(relationOf(l, { a: 1, b: 1, c: -3 })).toBe('cat');
    expect(intersect(l, { a: 1, b: 1, c: -3 })).toEqual({ x: 1, y: 2 });
    expect(intersect(l, { a: 1, b: -1, c: 5 })).toBeNull();
  });

  it('measures the angle between lines and the distance to a line', () => {
    expect(angleOf({ a: 1, b: -1, c: 0 }, { a: 1, b: 1, c: 0 })).toBe(90);
    expect(angleOf({ a: 1, b: 0, c: 0 }, { a: 1, b: -1, c: 3 })).toBeCloseTo(45, 9);
    expect(angleOf({ a: 2, b: -1, c: 0 }, { a: 2, b: -1, c: 7 })).toBe(0);
    expect(distance(v(1, 2), { a: 3, b: 4, c: -1 })).toBeCloseTo(2, 12);
    expect(footOn(v(0, 0), { a: 1, b: 1, c: -2 })).toEqual({ x: 1, y: 1 });
  });

  it('clips a line to a box', () => {
    const box = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
    expect(clipLine({ a: 1, b: -1, c: 0 }, box)).toEqual([v(-5, -5), v(5, 5)]);
    expect(clipLine({ a: 1, b: 0, c: -2 }, box)).toEqual([v(2, -5), v(2, 5)]);
    expect(clipLine({ a: 1, b: 0, c: -9 }, box)).toBeNull();
  });
});

describe('numbers', () => {
  it('simplifies square roots and writes values', () => {
    expect(sqrtTex(8)).toBe('2\\sqrt{2}');
    expect(sqrtTex(9)).toBe('3');
    expect(sqrtTex(13)).toBe('\\sqrt{13}');
    expect(valueTex(2.5)).toBe('= 2{,}5');
    expect(valueTex(Math.sqrt(13))).toBe('\\approx 3{,}61');
    expect(valueText(Math.sqrt(2))).toBe('≈ 1,41');
  });
});

describe('circles', () => {
  it('writes both forms of the equation', () => {
    expect(circleTex(v(1, -2), 9)).toBe('(x - 1)^2 + (y + 2)^2 = 9');
    expect(circleTex(v(0, 3), 4)).toBe('x^2 + (y - 3)^2 = 4');
    expect(expandedTex(v(1, -2), 9)).toBe('x^2 + y^2 - 2x + 4y - 4 = 0');
  });

  it('lists the whole-number points of a circle in turn', () => {
    expect(latticeOnCircle(v(0, 0), 5)).toHaveLength(8);
    expect(latticeOnCircle(v(1, 1), 25)).toHaveLength(12);
    expect(latticeOnCircle(v(0, 0), 4)).toEqual([v(2, 0), v(0, 2), v(-2, 0), v(0, -2)]);
  });

  it('finds the tangent at a point of the circle', () => {
    // (C): (x - 1)^2 + (y - 2)^2 = 25 at M(4; 6): (-3)(x - 4) + (-4)(y - 6) = 0.
    expect(tangentAt(v(1, 2), v(4, 6))).toEqual({ a: 3, b: 4, c: -36 });
    expect(tangentSubTex(v(1, 2), v(4, 6))).toBe('(1 - 4)(x - 4) + (2 - 6)(y - 6) = 0');
  });
});
