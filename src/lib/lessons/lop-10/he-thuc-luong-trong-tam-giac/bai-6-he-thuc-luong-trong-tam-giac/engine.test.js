import { describe, expect, it } from 'vitest';
import {
  UNIT,
  areaCheck,
  cosineCheck,
  describe as say,
  isFat,
  measure,
  sineCheck,
} from './engine.js';

const at = (/** @type {number} */ x, /** @type {number} */ y) => ({ x: x * UNIT, y: y * UNIT });
// Right angle at A, AB = 4, AC = 3, BC = 5 (in cm).
const A = at(2, 6);
const B = at(2, 2);
const C = at(5, 6);

describe('triangle measures', () => {
  it('measures the 3-4-5 triangle', () => {
    const m = measure(A, B, C);
    expect(m.a).toBeCloseTo(5, 9);
    expect(m.b).toBeCloseTo(3, 9);
    expect(m.c).toBeCloseTo(4, 9);
    expect(m.A).toBeCloseTo(90, 9);
    expect(m.R).toBeCloseTo(2.5, 9);
    expect(m.r).toBeCloseTo(1, 9);
    expect(m.S).toBeCloseTo(6, 9);
    expect(m.p).toBeCloseTo(6, 9);
    expect(say(m)).toContain('a ≈ 5 cm');
  });

  it('checks the law of cosines and names the angle kind', () => {
    const m = measure(A, B, C);
    expect(cosineCheck(m, 'A').note).toContain('định lí Pythagore');
    expect(cosineCheck(m, 'B').note).toContain('nhọn');
    const obtuse = measure(at(4, 5), at(1, 6.5), at(9, 6.25));
    expect(obtuse.A).toBeGreaterThan(90);
    expect(cosineCheck(obtuse, 'A').note).toContain('tù');
    expect(cosineCheck(m, 'A').right).toContain('\\approx 25{,}00');
  });

  it('gives equal sine ratios and areas on many triangles', () => {
    const bad = [];
    for (let i = 0; i < 40; i++) {
      const P = at(1 + (i % 7), 1 + ((i * 3) % 5));
      const Q = at(9 - (i % 4), 2 + ((i * 5) % 4));
      const R = at(2 + ((i * 2) % 6), 7);
      if (!isFat(P, Q, R)) continue;
      const m = measure(P, Q, R);
      const ratios = [m.a / Math.sin((m.A * Math.PI) / 180), m.b / Math.sin((m.B * Math.PI) / 180)];
      if (Math.abs(ratios[0] - 2 * m.R) > 1e-6 || Math.abs(ratios[1] - 2 * m.R) > 1e-6) bad.push(i);
      if (Math.abs((m.a * m.b * m.c) / (4 * m.R) - m.S) > 1e-6) bad.push(i);
      if (Math.abs(m.p * m.r - m.S) > 1e-6) bad.push(i);
      if (Math.abs(m.A + m.B + m.C - 180) > 1e-6) bad.push(i);
    }
    expect(bad).toEqual([]);
  });

  it('writes the sine and area lines', () => {
    const m = measure(A, B, C);
    expect(sineCheck(m).lines[3]).toBe('2R = 2 \\cdot 2{,}50 \\approx 5{,}00');
    expect(areaCheck(m).lines[3]).toBe('pr = 6{,}00 \\cdot 1{,}00 \\approx 6{,}00');
    expect(areaCheck(m).note).toContain('S \\approx 6{,}00');
  });

  it('refuses a flat triangle', () => {
    expect(isFat(at(1, 1), at(5, 1), at(9, 1.1))).toBe(false);
    expect(isFat(A, B, C)).toBe(true);
  });
});

describe('area readout', () => {
  it('rounds every formula to the same hundredth', () => {
    const m = measure(at(4.25, 0.5), at(2.75, 4.75), at(9.75, 4.75));
    const values = areaCheck(m).lines.map((l) => l.split('\\approx ')[1].split(' ')[0]);
    expect(values[0]).toBe('14{,}88');
    expect(new Set(values).size).toBe(1);
  });
});
