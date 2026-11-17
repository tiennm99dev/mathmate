import { describe, expect, it } from 'vitest';
import {
  clipLine,
  halfTurn,
  isLattice,
  lineTex,
  ptTex,
  ptText,
  reflect,
  rotate,
  sameFigure,
  signedTex,
  translate,
} from './transform.js';

const p = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('plane transformations', () => {
  it('translates by a vector', () => {
    expect(translate(p(1, -2), p(3, 4))).toEqual(p(4, 2));
  });

  it('reflects in the four lines through O', () => {
    expect(reflect(p(2, 3), 'Ox')).toEqual(p(2, -3));
    expect(reflect(p(2, 3), 'Oy')).toEqual(p(-2, 3));
    expect(reflect(p(2, 3), 'y=x')).toEqual(p(3, 2));
    expect(reflect(p(2, 3), 'y=-x')).toEqual(p(-3, -2));
  });

  it('rotates counterclockwise for a positive angle, exactly on quarter turns', () => {
    expect(rotate(p(1, 0), p(0, 0), 90)).toEqual(p(0, 1));
    expect(rotate(p(3, 1), p(0, 0), -90)).toEqual(p(1, -3));
    expect(rotate(p(3, 1), p(1, 1), 180)).toEqual(p(-1, 1));
    expect(rotate(p(2, 5), p(1, 1), 360)).toEqual(p(2, 5));
    const r = rotate(p(2, 0), p(0, 0), 60);
    expect(r.x).toBeCloseTo(1, 9);
    expect(r.y).toBeCloseTo(Math.sqrt(3), 9);
  });

  it('turns a half turn into a central symmetry', () => {
    expect(halfTurn(p(3, -2), p(1, 2))).toEqual(p(-1, 6));
    expect(halfTurn(p(3, -2), p(1, 2))).toEqual(rotate(p(3, -2), p(1, 2), 180));
  });

  it('compares figures as point sets', () => {
    expect(sameFigure([p(0, 0), p(1, 0), p(0, 1)], [p(0, 1), p(0, 0), p(1, 0)])).toBe(true);
    expect(sameFigure([p(0, 0), p(1, 0), p(0, 1)], [p(0, 0), p(1, 0), p(1, 1)])).toBe(false);
  });
});

describe('writing points and lines', () => {
  it('writes coordinates the book way', () => {
    expect(ptText(p(2, -1))).toBe('(2; −1)');
    expect(ptText(p(1.5, 0))).toBe('(1,5; 0)');
    expect(ptTex(p(-2.5, 3))).toBe('(-2{,}5;\\ 3)');
    expect(isLattice(p(2, -1))).toBe(true);
    expect(isLattice(p(1.5, 0))).toBe(false);
    expect(signedTex(3)).toBe(' + 3');
    expect(signedTex(-2)).toBe(' - 2');
    expect(signedTex(0)).toBe('');
  });

  it('writes a line equation with unit coefficients dropped', () => {
    expect(lineTex({ a: 1, b: -2, c: 3 })).toBe('x - 2y + 3 = 0');
    expect(lineTex({ a: -1, b: 1, c: 0 })).toBe('-x + y = 0');
    expect(lineTex({ a: 0, b: 2, c: -1 })).toBe('2y - 1 = 0');
  });

  it('clips a line to the board', () => {
    const box = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 };
    expect(clipLine({ a: 0, b: 1, c: -2 }, box)).toEqual([p(-6, 2), p(6, 2)]);
    expect(clipLine({ a: 1, b: -1, c: 0 }, box)).toEqual([p(-6, -6), p(6, 6)]);
    expect(clipLine({ a: 1, b: 0, c: -10 }, box)).toBeNull();
  });
});
