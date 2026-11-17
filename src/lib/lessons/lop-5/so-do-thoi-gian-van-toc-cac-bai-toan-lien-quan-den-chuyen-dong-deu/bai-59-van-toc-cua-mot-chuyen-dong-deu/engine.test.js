import { describe, expect, it } from 'vitest';
import {
  MAX_HOURS,
  MAX_SPEED,
  MIN_SPEED,
  ROAD_KM,
  ROUNDS,
  clampSpeed,
  distance,
  hourly,
  noteFor,
  roadLabel,
} from './engine.js';

describe('two cars racing', () => {
  it('keeps every blue car reachable and on the road', () => {
    expect(ROUNDS.filter((v) => v < MIN_SPEED || v > MAX_SPEED)).toEqual([]);
    expect(distance(MAX_SPEED, MAX_HOURS)).toBeLessThanOrEqual(ROAD_KM);
  });

  it('keeps the red speed in range', () => {
    expect(clampSpeed(3)).toBe(MIN_SPEED);
    expect(clampSpeed(99)).toBe(MAX_SPEED);
    expect(clampSpeed(41)).toBe(41);
  });

  it('goes the same distance each hour', () => {
    expect(hourly(45, 3)).toEqual([45, 90, 135]);
    expect(hourly(45, 0)).toEqual([]);
  });

  it('tells the child how to find the speed', () => {
    expect(noteFor(45, 30, 0).tone).toBe('info');
    expect(noteFor(45, 30, 3)).toEqual({
      tone: 'warn',
      text: 'Sau 3 giờ, xe xanh đi được 135 km, xe đỏ đi được 90 km. Xe đỏ chậm hơn. Em tính 135 : 3 để biết mỗi giờ xe xanh đi được bao nhiêu ki-lô-mét.',
    });
    expect(noteFor(45, 45, 3)).toEqual({
      tone: 'ok',
      text: 'Hai xe luôn ngang nhau! Vận tốc xe xanh là 135 : 3 = 45 km/giờ: mỗi giờ xe đi được 45 km.',
    });
    expect(noteFor(45, 50, 1).text).toContain('nhanh hơn');
  });

  it('keeps the hidden speed out of the road label until found', () => {
    expect(roadLabel(40, 30, 2, false)).toBe(
      'Sau 2 giờ: xe xanh, chưa biết vận tốc, đi được 80 km; xe đỏ, 30 km/giờ, đi được 60 km.',
    );
    expect(roadLabel(40, 40, 2, true)).toContain('40 km/giờ');
  });
});
