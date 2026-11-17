import { describe, expect, it } from 'vitest';
import { rayAngle, rays, verdict } from './engine.js';

describe('the dihedral angle of an open book', () => {
  it('equals xOy when both rays are perpendicular to the spine', () => {
    const wrong = [];
    for (let open = 10; open <= 170; open += 5) {
      if (Math.abs(rayAngle(open, 90) - open) > 1e-6) wrong.push(open);
    }
    expect(wrong).toEqual([]);
  });

  it('gives a smaller angle when the rays are slanted', () => {
    // cos xOy = cos²α + sin²α cos φ: α = 45°, φ = 90° gives cos xOy = 1/2.
    expect(rayAngle(90, 45)).toBeCloseTo(60);
    expect(verdict(90, 45).tone).toBe('warn');
    expect(verdict(90, 45).text).toContain('\\approx 60^\\circ');
  });

  it('names the kind of dihedral angle and the angle between the planes', () => {
    expect(verdict(90, 90).tone).toBe('ok');
    expect(verdict(120, 90).text).toContain('góc nhị diện tù');
    expect(verdict(120, 90).text).toContain('là $60^\\circ$');
    expect(verdict(40, 90).text).toContain('góc nhị diện nhọn');
    const { O, x } = rays(60, 90, 2, 1);
    expect(x.x - O.x).toBeCloseTo(0);
  });
});
