import { describe, expect, it } from 'vitest';
import {
  TOWER_HEIGHT,
  judge,
  realDistance,
  riverDistance,
  riverReadings,
  towerHeight,
  towerReadings,
} from './engine.js';

describe('virtual clinometer', () => {
  it('reads the tower angles to the degree', () => {
    // atan(45/90) ≈ 26,57°, atan(45/40) ≈ 48,37°.
    expect(towerReadings(90, 40)).toEqual({ d: 50, alpha: 27, beta: 48 });
  });

  it('works out the height with the law of sines', () => {
    expect(towerHeight({ d: 24, alpha: 35, beta: 50 })).toBeCloseTo(40.7437, 3);
    expect(towerHeight({ d: 30, alpha: 30, beta: 45 })).toBeCloseTo(15 * (Math.sqrt(3) + 1), 9);
    expect(Math.abs(towerHeight(towerReadings(60, 25)) - TOWER_HEIGHT)).toBeLessThan(0.3);
    // Readings rounded to the degree can be 2 m off when the angle at the top is small.
    expect(Math.abs(towerHeight(towerReadings(90, 40)) - TOWER_HEIGHT)).toBeLessThan(2.1);
  });

  it('works out the distance across the river', () => {
    expect(riverDistance({ d: 40, angA: 70, angB: 60 })).toBeCloseTo(45.2206, 3);
    const r = riverReadings(5, 80);
    expect(r.d).toBe(75);
    expect(Math.abs(riverDistance(r) - realDistance(5))).toBeLessThan(2);
  });

  it('judges the typed answer', () => {
    expect(judge('40,7', 40.7437, 45, 'chiều cao h', 'Cách làm.').tone).toBe('ok');
    expect(judge('40,8', 40.7437, 45, 'chiều cao h', 'Cách làm.').tone).toBe('ok');
    expect(judge('42', 40.7437, 45, 'chiều cao h', 'Cách làm.')).toEqual({
      tone: 'warn',
      text: 'Chưa đúng. Cách làm.',
    });
    expect(judge('abc', 1, 1, 'h', '').text).toContain('dấu phẩy');
  });
});
