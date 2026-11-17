import { describe, expect, it } from 'vitest';
import { planeScale } from '#lib/core/visuals/svg-math.js';
import { arcPath, degTex, imageTex, rotationNote, turned } from './engine.js';

const p = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('rotation board', () => {
  it('turns the triangle about the centre', () => {
    expect(turned(p(0, 0), 90)).toEqual([p(-1, 1), p(-1, 4), p(-3, 1)]);
    expect(turned(p(1, 1), 180)).toEqual([p(1, 1), p(-2, 1), p(1, -1)]);
  });

  it('writes images exactly or approximately', () => {
    expect(imageTex("A'", p(-1, 6))).toBe("A'(-1;\\ 6)");
    expect(imageTex("A'", p(0.5, 1.732))).toBe("A' \\approx (0{,}5;\\ 1{,}73)");
    expect(degTex(-45)).toBe('-45^\\circ');
  });

  it('names the special angles', () => {
    expect(rotationNote(p(0, 0), 0)).toContain('đồng nhất');
    expect(rotationNote(p(0, 0), -180)).toContain('đối xứng tâm');
    expect(rotationNote(p(0, 0), 45)).toContain('ngược chiều kim đồng hồ');
    expect(rotationNote(p(0, 0), -30)).toContain('cùng chiều kim đồng hồ');
  });

  it('draws the arc in the direction of the turn', () => {
    const plane = planeScale({ xMin: -5, xMax: 5, yMin: -5, yMax: 5 });
    expect(arcPath(plane, p(0, 0), p(1, 0), 90)).toMatch(/ 0 0 0 /);
    expect(arcPath(plane, p(0, 0), p(1, 0), -90)).toMatch(/ 0 0 1 /);
    expect(arcPath(plane, p(1, 1), p(1, 1), 90)).toBe('');
  });
});
