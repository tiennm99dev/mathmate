import { describe, it, expect } from 'vitest';
import { P } from '../_shared/space.js';
import { eventTimes, planeSide, position, radarSquare } from './engine.js';

describe('drone flight', () => {
  it('flies along M(t) = A + t·v', () => {
    expect(position(0)).toEqual(P(-4, -4, 0));
    expect(position(2.5)).toEqual(P(1, 1, 2.5));
  });

  it('enters the radar at t = 1, meets (P) at t = 2,5 and leaves at t = 3', () => {
    expect(eventTimes()).toEqual({ vao: [1], cham: [2.5], ra: [3] });
    expect(radarSquare(2)).toBe(0);
    expect(planeSide(0)).toBeLessThan(0);
    expect(planeSide(4)).toBeGreaterThan(0);
  });
});
