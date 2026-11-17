import { describe, it, expect } from 'vitest';
import { P } from '../_shared/space.js';
import { HOUSES, bestRadius, covered, distanceTex, groundRadius, placeOf } from './engine.js';

describe('coverage of a station', () => {
  it('places points inside, on and outside the sphere exactly', () => {
    expect(placeOf(P(0, 0, 0), 3, P(1, 2, 2)).where).toBe('tren');
    expect(placeOf(P(0, 0, 0), 3, P(1, 2, 1)).where).toBe('trong');
    expect(placeOf(P(1, 0, 0), 2, P(3, 1, 0)).where).toBe('ngoai');
  });

  it('writes IM² with brackets for negative coordinates', () => {
    expect(distanceTex(P(1, -1, 2), P(2, 1, 0))).toBe(
      'IM^2 = (2 - 1)^2 + (1 - (-1))^2 + (0 - 2)^2 = 9',
    );
  });

  it('needs radius 4 to cover the whole village, and 4 from the origin is enough', () => {
    expect(bestRadius()).toBe(4);
    expect(covered(P(0, 0, 2), 4)).toBe(HOUSES.length);
    expect(covered(P(0, 0, 0), 3)).toBeLessThan(HOUSES.length);
  });

  it('cuts the ground in a circle of radius √(R² − c²)', () => {
    expect(groundRadius(P(0, 0, 3), 5)?.tex).toBe('\\sqrt{5^2 - 3^2} = 4');
    expect(groundRadius(P(0, 0, 3), 2)).toBeNull();
  });
});
