import { describe, expect, it } from 'vitest';
import { measure, planeText, threeText } from './engine.js';

describe('an oblique line, its projection and the three perpendiculars', () => {
  it('reads the angle with the plane from tan SAH = SH / AH', () => {
    expect(measure(2, 2, 30, 0).withPlane).toBeCloseTo(45);
    expect(measure(3, 1.5, 0, 0).withPlane).toBeCloseTo(63.43, 2);
    expect(planeText(2, 2)).toContain('\\widehat{SAH} = 45^\\circ');
    expect(planeText(3, 1.5)).toContain('\\dfrac{3}{1{,}5}');
    expect(planeText(3, 1.5)).toContain('\\approx 63{,}4^\\circ');
    expect(planeText(3, 0)).toContain('90^\\circ');
  });

  it('makes d perpendicular to a exactly when it is perpendicular to the projection', () => {
    const wrong = [];
    for (let turn = 0; turn < 360; turn += 25) {
      for (let dTurn = 0; dTurn < 180; dTurn += 5) {
        const m = measure(2.5, 2, turn, dTurn);
        const a = Math.abs(/** @type {number} */ (m.dProj) - 90) < 1e-6;
        const b = Math.abs(m.dLine - 90) < 1e-6;
        if (a !== b) wrong.push(`${turn} ${dTurn}`);
      }
    }
    expect(wrong).toEqual([]);
    expect(threeText(measure(2, 2, 0, 90)).tone).toBe('ok');
    expect(threeText(measure(2, 2, 0, 40)).tone).toBe('info');
    expect(threeText(measure(2, 0, 0, 40)).tone).toBe('warn');
  });
});
