import { describe, expect, it } from 'vitest';
import {
  acosDeg,
  approxTex,
  approxText,
  asinDeg,
  cosDeg,
  cotDeg,
  degMinText,
  sinDeg,
  tanDeg,
} from './trig.js';

describe('trigonometry in degrees', () => {
  it('gives exact values without binary noise', () => {
    expect(cosDeg(90)).toBe(0);
    expect(sinDeg(180)).toBe(0);
    expect(sinDeg(30)).toBe(0.5);
    expect(cosDeg(120)).toBe(-0.5);
    expect(tanDeg(135)).toBe(-1);
  });

  it('leaves tan at 90° and cot at 0° and 180° undefined', () => {
    expect(tanDeg(90)).toBeNull();
    expect(cotDeg(0)).toBeNull();
    expect(cotDeg(180)).toBeNull();
    expect(cotDeg(90)).toBe(0);
  });

  it('finds angles back from values', () => {
    expect(acosDeg(-0.5)).toBeCloseTo(120, 9);
    expect(asinDeg(0.5)).toBeCloseTo(30, 9);
  });

  it('writes exact and approximate values the book way', () => {
    expect(approxText(0.5)).toBe('0,5');
    expect(approxText(sinDeg(40))).toBe('≈ 0,6428');
    expect(approxText(cosDeg(100))).toBe('≈ −0,1736');
    expect(approxTex(0.5)).toBe('0{,}5');
    expect(approxTex(cosDeg(100))).toBe('\\approx -0{,}1736');
    expect(approxTex(sinDeg(80))).toBe('\\approx 0{,}9848');
  });

  it('writes degrees and minutes', () => {
    expect(degMinText(14.508)).toBe('14°30′');
    expect(degMinText(29.999)).toBe('30°');
    expect(degMinText(60)).toBe('60°');
  });
});
