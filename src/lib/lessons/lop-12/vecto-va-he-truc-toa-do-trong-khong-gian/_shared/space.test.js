import { describe, it, expect } from 'vitest';
import {
  CUBE,
  P,
  angleDeg,
  angleFan,
  coordTex,
  coordText,
  cubeDot,
  cubeVector,
  degreeTex,
  overSqrtTex,
  sqrtTex,
} from './space.js';

describe('space helpers', () => {
  it('writes coordinates the book way', () => {
    expect(coordTex(P(1, -2, 0.5))).toBe('(1; -2; 0{,}5)');
    expect(coordText(P(1, -2, 0.5))).toBe('(1; −2; 0,5)');
  });

  it('simplifies square roots and rationalises d/√m', () => {
    expect(sqrtTex(12)).toBe('2\\sqrt{3}');
    expect(sqrtTex(9)).toBe('3');
    expect(sqrtTex(2)).toBe('\\sqrt{2}');
    expect(overSqrtTex(1, 3)).toBe('\\dfrac{\\sqrt{3}}{3}');
    expect(overSqrtTex(-1, 4)).toBe('-\\dfrac{1}{2}');
    expect(overSqrtTex(2, 4)).toBe('1');
    expect(overSqrtTex(2, 6)).toBe('\\dfrac{\\sqrt{6}}{3}');
    expect(overSqrtTex(0, 6)).toBe('0');
  });

  it('measures angles and writes them', () => {
    expect(angleDeg(P(1, 0, 0), P(0, 1, 0))).toBeCloseTo(90);
    expect(angleDeg(P(1, 0, 0), P(0, 0, 0))).toBeNull();
    expect(degreeTex(45.0000001)).toBe('= 45^\\circ');
    expect(degreeTex(54.7356)).toBe('\\approx 54{,}7^\\circ');
  });

  it('gives exact angles for equal and opposite vectors of irrational length', () => {
    expect(degreeTex(/** @type {number} */ (angleDeg(P(2, 0, 1), P(2, 0, 1))))).toBe('= 0^\\circ');
    expect(degreeTex(/** @type {number} */ (angleDeg(P(1, 2, 3), P(-2, -4, -6))))).toBe(
      '= 180^\\circ',
    );
  });

  it('computes dot products in the cube of edge a', () => {
    const d = cubeDot(cubeVector('A', 'B'), cubeVector("A'", "C'"));
    expect(d.k).toBe(1);
    expect(d.cos).toBe('\\dfrac{\\sqrt{2}}{2}');
    expect(d.lenV).toBe('a\\sqrt{2}');
    expect(d.product).toBe('a^2');
    expect(d.angle).toBeCloseTo(45);
    expect(cubeDot(cubeVector('A', 'C'), cubeVector('C', 'A')).product).toBe('-2a^2');
  });

  it('draws angle fans, also for a straight angle', () => {
    expect(angleFan(CUBE.A, P(1, 0, 0), P(1, 0, 0), 1)).toEqual([]);
    expect(angleFan(CUBE.A, P(1, 0, 0), P(-1, 0, 0), 1).length).toBeGreaterThan(2);
  });
});
